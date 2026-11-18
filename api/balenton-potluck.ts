import { randomInt, randomUUID } from 'node:crypto';
import { get, put } from '@vercel/blob';

// Seven unique draws for seven family members. Draws are permanent.
// A category can change only after a two-person trade.
const PEOPLE = ['Teng', 'Mike', 'Mark', 'Christine', 'Paulo', 'Gab', 'Geneva'] as const;
const DISHES = [
  'Pork dish',
  'Chicken dish',
  'Beef dish',
  'Seafood or fish',
  'Pasta, noodles or salad greens',
  'Dessert: cake or ice cream',
  'Drinks, ice and utensils',
] as const;

type Name = typeof PEOPLE[number];
type Trade = {
  id: string;
  from: Name;
  to: Name;
  status: 'pending' | 'accepted' | 'declined' | 'cancelled';
  createdAt: string;
};
type State = {
  version: 1;
  dishes: string[];
  revealed: Name[];
  trades: Trade[];
  updatedAt: string;
};

const PATH = 'family/balenton-christmas-2026/potluck.json';
const allowed = (value: unknown): value is Name =>
  typeof value === 'string' && PEOPLE.includes(value as Name);

function createState(): State {
  const dishes = [...DISHES];
  for (let i = dishes.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [dishes[i], dishes[j]] = [dishes[j], dishes[i]];
  }
  return {
    version: 1,
    dishes,
    revealed: [],
    trades: [],
    updatedAt: new Date().toISOString(),
  };
}

async function readState(): Promise<State | null> {
  const blob = await get(PATH, { access: 'private', useCache: false });
  if (blob?.statusCode !== 200 || !blob.stream) return null;
  const parsed = JSON.parse(await new Response(blob.stream).text());
  if (parsed?.version !== 1 || !Array.isArray(parsed.dishes) || parsed.dishes.length !== PEOPLE.length) {
    throw new Error('Unexpected potluck data format');
  }
  return parsed as State;
}

async function writeState(state: State, overwrite = true) {
  await put(PATH, JSON.stringify(state), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: overwrite,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
  });
}

async function loadState(): Promise<State> {
  const existing = await readState();
  if (existing) return existing;
  const fresh = createState();
  try {
    await writeState(fresh, false);
    return fresh;
  } catch {
    // A concurrent visitor may have initialized the same one-time draw.
    const other = await readState();
    if (other) return other;
    throw new Error('Unable to initialize the potluck');
  }
}

function publicState(state: State) {
  return {
    people: PEOPLE.map((name, i) => ({
      name,
      drawn: state.revealed.includes(name),
      assignment: state.revealed.includes(name) ? state.dishes[i] : null,
    })),
    trades: state.trades.filter((trade) => trade.status === 'pending'),
    drawnCount: state.revealed.length,
    total: PEOPLE.length,
    updatedAt: state.updatedAt,
  };
}

function respondError(res: any, status: number, message: string) {
  return res.status(status).json({ error: message });
}

let queue = Promise.resolve();
async function serial<T>(callback: () => Promise<T>): Promise<T> {
  const previous = queue;
  let release: () => void = () => {};
  queue = new Promise<void>((resolve) => { release = resolve; });
  await previous;
  try {
    return await callback();
  } finally {
    release();
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return respondError(res, 405, 'Method not allowed');
  }

  try {
    if (req.method === 'GET') {
      return res.status(200).json(publicState(await loadState()));
    }

    return await serial(async () => {
      const state = await loadState();
      const { action, name, to, tradeId } = req.body || {};
      if (!allowed(name)) return respondError(res, 400, 'Choose a name from the list.');

      if (action === 'draw') {
        if (!state.revealed.includes(name)) {
          state.revealed.push(name);
          state.updatedAt = new Date().toISOString();
          await writeState(state);
        }
        const index = PEOPLE.indexOf(name);
        return res.status(200).json({
          message: 'Your potluck assignment is ready.',
          assignment: state.dishes[index],
          ...publicState(state),
        });
      }

      if (action === 'offer') {
        if (!allowed(to) || to === name) return respondError(res, 400, 'Choose someone else to trade with.');
        if (!state.revealed.includes(name) || !state.revealed.includes(to)) {
          return respondError(res, 400, 'Both people must draw first.');
        }
        if (state.trades.some((t) => t.status === 'pending' && [t.from, t.to].includes(name))) {
          return respondError(res, 409, 'You already have a pending trade. Finish it first.');
        }
        if (state.trades.some((t) => t.status === 'pending' && [t.from, t.to].includes(to))) {
          return respondError(res, 409, 'That person already has a pending trade.');
        }
        state.trades.push({
          id: randomUUID(),
          from: name,
          to,
          status: 'pending',
          createdAt: new Date().toISOString(),
        });
      } else if (['accept', 'decline', 'cancel'].includes(action)) {
        const trade = state.trades.find((t) => t.id === tradeId && t.status === 'pending');
        if (!trade) return respondError(res, 404, 'This trade is no longer pending.');
        if (action === 'cancel') {
          if (trade.from !== name) return respondError(res, 403, 'Only the requester can cancel.');
          trade.status = 'cancelled';
        } else {
          if (trade.to !== name) return respondError(res, 403, 'Only the requested person can respond.');
          trade.status = action === 'accept' ? 'accepted' : 'declined';
          if (action === 'accept') {
            const a = PEOPLE.indexOf(trade.from);
            const b = PEOPLE.indexOf(trade.to);
            [state.dishes[a], state.dishes[b]] = [state.dishes[b], state.dishes[a]];
          }
        }
      } else {
        return respondError(res, 400, 'Unknown action.');
      }

      state.updatedAt = new Date().toISOString();
      await writeState(state);
      return res.status(200).json({
        message: action === 'offer' ? 'Trade request sent.' :
          action === 'accept' ? 'Trade accepted. Assignments swapped.' :
          action === 'decline' ? 'Trade declined.' : 'Trade cancelled.',
        ...publicState(state),
      });
    });
  } catch (error) {
    console.error('Balenton potluck error:', error);
    return respondError(res, 500, 'Potluck service is temporarily unavailable.');
  }
}

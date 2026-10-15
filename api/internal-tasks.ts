import crypto from 'node:crypto';
import { get, put } from '@vercel/blob';
import { isInternalAuthorized } from '../server/internal-session.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Res = any;

type Cadence = 'Weekly' | 'Monthly' | 'Quarterly' | 'One-off';
type Priority = 'P1' | 'P2' | 'P3';
type Status = 'Active' | 'Paused' | 'Done';

type Task = {
  id: string;
  title: string;
  area: string;
  cadence: Cadence;
  day?: string;
  schedule?: string;
  priority: Priority;
  estimateMinutes?: number;
  status: Status;
  notes?: string;
  lastCompleted?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

const TASKS_PATH = 'internal/life-os/tasks.json';
const CADENCES = new Set<Cadence>(['Weekly', 'Monthly', 'Quarterly', 'One-off']);
const PRIORITIES = new Set<Priority>(['P1', 'P2', 'P3']);
const STATUSES = new Set<Status>(['Active', 'Paused', 'Done']);

function cleanText(value: unknown, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function sanitizeTask(input: any, existing?: Task): Task {
  const now = new Date().toISOString();
  const cadence = CADENCES.has(input?.cadence) ? input.cadence : existing?.cadence || 'Weekly';
  const priority = PRIORITIES.has(input?.priority) ? input.priority : existing?.priority || 'P2';
  const status = STATUSES.has(input?.status) ? input.status : existing?.status || 'Active';
  const title = cleanText(input?.title ?? existing?.title, 180);

  if (!title) throw new Error('Task title is required');

  return {
    id: existing?.id || crypto.randomUUID(),
    title,
    area: cleanText(input?.area ?? existing?.area, 80) || 'Personal / Admin',
    cadence,
    day: cleanText(input?.day ?? existing?.day, 24),
    schedule: cleanText(input?.schedule ?? existing?.schedule, 120),
    priority,
    estimateMinutes: Number.isFinite(Number(input?.estimateMinutes ?? existing?.estimateMinutes))
      ? Math.max(0, Math.min(1440, Number(input?.estimateMinutes ?? existing?.estimateMinutes)))
      : undefined,
    status,
    notes: cleanText(input?.notes ?? existing?.notes, 2000),
    lastCompleted: input?.lastCompleted === null
      ? null
      : cleanText(input?.lastCompleted ?? existing?.lastCompleted, 64) || null,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
}

async function saveTasks(tasks: Task[]) {
  await put(TASKS_PATH, JSON.stringify(tasks), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
  });
}

async function loadTasks(): Promise<Task[]> {
  const blob = await get(TASKS_PATH, { access: 'private', useCache: false });
  if (blob?.statusCode === 200 && blob.stream) {
    const raw = await new Response(blob.stream).text();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  }

  let seed: Task[] = [];
  try {
    const parsed = JSON.parse(process.env.INTERNAL_TASK_SEED || '[]');
    if (Array.isArray(parsed)) {
      seed = parsed.map((task) => sanitizeTask(task));
    }
  } catch {
    seed = [];
  }

  await saveTasks(seed);
  return seed;
}

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (!isInternalAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      const tasks = await loadTasks();
      return res.status(200).json({ tasks });
    }

    if (req.method === 'POST') {
      const tasks = await loadTasks();
      const task = sanitizeTask(req.body || {});
      tasks.push(task);
      await saveTasks(tasks);
      return res.status(201).json({ task });
    }

    if (req.method === 'PATCH') {
      const tasks = await loadTasks();
      const id = cleanText(req.body?.id, 100);
      const index = tasks.findIndex((task) => task.id === id);
      if (index < 0) return res.status(404).json({ error: 'Task not found' });

      const current = tasks[index];
      const action = req.body?.action;
      let updates: any = req.body?.updates || {};

      if (action === 'complete') {
        updates = current.cadence === 'One-off'
          ? { status: 'Done', lastCompleted: new Date().toISOString() }
          : { status: 'Active', lastCompleted: new Date().toISOString() };
      } else if (action === 'undo') {
        updates = current.cadence === 'One-off'
          ? { status: 'Active', lastCompleted: null }
          : { lastCompleted: null };
      } else if (action === 'pause') {
        updates = { status: current.status === 'Paused' ? 'Active' : 'Paused' };
      }

      const task = sanitizeTask({ ...current, ...updates }, current);
      tasks[index] = task;
      await saveTasks(tasks);
      return res.status(200).json({ task });
    }

    if (req.method === 'DELETE') {
      const tasks = await loadTasks();
      const id = cleanText(req.query?.id ?? req.body?.id, 100);
      const next = tasks.filter((task) => task.id !== id);
      if (next.length === tasks.length) return res.status(404).json({ error: 'Task not found' });
      await saveTasks(next);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST, PATCH, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Internal task API error:', error);
    return res.status(500).json({ error: 'Internal task service unavailable' });
  }
}

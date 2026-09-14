import assert from 'node:assert/strict';
import test from 'node:test';
import { categoriesOverlap, exactCooldownKeys, isOnExactCooldown, selectWeeklyRecommendations, type Candidate, type HistoryEntry } from '../src/data/fpxRecommendationEngine.ts';
import { CURRENT_OFFERS, BASELINE_HISTORY } from '../src/data/fpxWeek10Data.ts';
import { CURRENT_STOCK_CANDIDATES } from '../src/data/fpxCurrentStockSnapshot.ts';

const week10: HistoryEntry = {
  weekLabel: 'Week 10',
  green: {
    name: '300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (4.200m)',
    stockLineId: 'recdrMHARaWqP1UrG',
  },
  blue: {
    name: '200x50 2Frame H4 Treated Wet Tongue & Groove (4.800m)',
    stockLineId: 'rec429fznsKgup8Ob',
  },
  orange: {
    name: '50x50 (45x45) 2Frame H3.2 Treated Wet Machine Gauged (4.200m)',
    stockLineId: 'recf6HJNc8PFv7ETZ',
  },
};

const history = [week10, ...BASELINE_HISTORY];

test('Week 11 current stock produces a complete valid recommendation trio', () => {
  const selected = selectWeeklyRecommendations(CURRENT_STOCK_CANDIDATES, CURRENT_OFFERS, history, 'Week 11');

  assert.equal(selected.green?.stockLineId, 'recXFcV4f9uTHDTsO');
  assert.equal(selected.blue?.stockLineId, 'recCH7KdpPLD5XKDj');
  assert.equal(selected.orange?.stockLineId, 'rec2f7DAb0e9RL6lM');
});

test('Week 11 recommendations obey same-week category separation', () => {
  const selected = selectWeeklyRecommendations(CURRENT_STOCK_CANDIDATES, CURRENT_OFFERS, history, 'Week 11');
  const candidates = [selected.green, selected.blue, selected.orange].filter(Boolean);

  assert.equal(candidates.length, 3);
  assert.equal(categoriesOverlap(selected.green!, selected.blue!), false);
  assert.equal(categoriesOverlap(selected.green!, selected.orange!), false);
  assert.equal(categoriesOverlap(selected.blue!, selected.orange!), false);
});

test('relisted same visible product and length stays on cooldown even with a new Airtable stock-line ID', () => {
  const relisted = CURRENT_STOCK_CANDIDATES.find(candidate => candidate.stockLineId === 'recBuG0wNBISW2itO')!;
  assert.equal(isOnExactCooldown(relisted, exactCooldownKeys(history, 'Week 11')), true);
});

test('same product at a different length can still qualify', () => {
  const candidate = CURRENT_STOCK_CANDIDATES.find(item => item.stockLineId === 'rec2f7DAb0e9RL6lM')! as Candidate;
  assert.equal(isOnExactCooldown(candidate, exactCooldownKeys(history, 'Week 11')), false);
});

test('Week 9 and Week 10 visible listing names are excluded from Week 11', () => {
  const selected = selectWeeklyRecommendations(CURRENT_STOCK_CANDIDATES, CURRENT_OFFERS, history, 'Week 11');
  const selectedNames = new Set([selected.green?.name, selected.blue?.name, selected.orange?.name]);
  const recentNames = new Set([
    week10.green?.name,
    week10.blue?.name,
    week10.orange?.name,
    BASELINE_HISTORY[0].green?.name,
    BASELINE_HISTORY[0].blue?.name,
    BASELINE_HISTORY[0].orange?.name,
  ]);

  for (const name of selectedNames) assert.equal(recentNames.has(name), false);
});

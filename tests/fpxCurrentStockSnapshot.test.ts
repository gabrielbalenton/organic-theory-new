import assert from 'node:assert/strict';
import test from 'node:test';
import { categoriesOverlap, selectWeeklyRecommendations, type HistoryEntry } from '../src/data/fpxRecommendationEngine.ts';
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

test('Week 11 current stock produces all three recommendations', () => {
  const selected = selectWeeklyRecommendations(CURRENT_STOCK_CANDIDATES, CURRENT_OFFERS, history, 'Week 11');

  assert.equal(selected.green?.stockLineId, 'recBuG0wNBISW2itO');
  assert.equal(selected.blue?.stockLineId, 'rec4j0C5tteNxPfif');
  assert.equal(selected.orange?.stockLineId, 'recgmPGN70Bm6WUll');
});

test('Week 11 recommendations obey same-week category separation', () => {
  const selected = selectWeeklyRecommendations(CURRENT_STOCK_CANDIDATES, CURRENT_OFFERS, history, 'Week 11');
  const candidates = [selected.green, selected.blue, selected.orange].filter(Boolean);

  assert.equal(candidates.length, 3);
  assert.equal(categoriesOverlap(selected.green!, selected.blue!), false);
  assert.equal(categoriesOverlap(selected.green!, selected.orange!), false);
  assert.equal(categoriesOverlap(selected.blue!, selected.orange!), false);
});

test('Week 10 exact stock lines remain on cooldown while replacement stock lines can qualify', () => {
  const selected = selectWeeklyRecommendations(CURRENT_STOCK_CANDIDATES, CURRENT_OFFERS, history, 'Week 11');
  const selectedIds = new Set([selected.green?.stockLineId, selected.blue?.stockLineId, selected.orange?.stockLineId]);

  assert.equal(selectedIds.has('recdrMHARaWqP1UrG'), false);
  assert.equal(selectedIds.has('rec429fznsKgup8Ob'), false);
  assert.equal(selectedIds.has('recf6HJNc8PFv7ETZ'), false);
});

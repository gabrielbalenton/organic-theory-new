import assert from 'node:assert/strict';
import test from 'node:test';
import {
  categoriesOverlap,
  exactCooldownKeys,
  hasSentWeek,
  isOnExactCooldown,
  offerMatchesCandidate,
  selectWeeklyRecommendations,
  type Candidate,
  type HistoryEntry,
} from '../src/data/fpxRecommendationEngine.ts';
import { BASELINE_HISTORY, CURRENT_OFFERS, WEEK_10_CANDIDATES } from '../src/data/fpxWeek10Data.ts';

test('approved Week 10 selection is reproduced', () => {
  const selected = selectWeeklyRecommendations(WEEK_10_CANDIDATES, CURRENT_OFFERS, BASELINE_HISTORY, 'Week 10');
  assert.equal(selected.green?.stockLineId, 'recdrMHARaWqP1UrG');
  assert.equal(selected.blue?.stockLineId, 'rec429fznsKgup8Ob');
  assert.equal(selected.orange?.stockLineId, 'recf6HJNc8PFv7ETZ');
});

test('same FPX product at another length is not on cooldown', () => {
  const green = WEEK_10_CANDIDATES.find(candidate => candidate.stockLineId === 'recdrMHARaWqP1UrG')!;
  const keys = exactCooldownKeys(BASELINE_HISTORY, 'Week 10');
  assert.equal(isOnExactCooldown(green, keys), false);
});

test('legacy history falls back to full normalized listing name including length', () => {
  const green = WEEK_10_CANDIDATES.find(candidate => candidate.stockLineId === 'recdrMHARaWqP1UrG')!;
  const sameLength: HistoryEntry[] = [{ weekLabel:'Week 9', green:{name:'  300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (4.200m) '} }];
  const otherLength: HistoryEntry[] = [{ weekLabel:'Week 9', green:{name:'300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (5.400m)'} }];
  assert.equal(isOnExactCooldown(green, exactCooldownKeys(sameLength, 'Week 10')), true);
  assert.equal(isOnExactCooldown(green, exactCooldownKeys(otherLength, 'Week 10')), false);
});

test('stock-line ID is the primary cooldown key', () => {
  const green = WEEK_10_CANDIDATES.find(candidate => candidate.stockLineId === 'recdrMHARaWqP1UrG')!;
  const history: HistoryEntry[] = [{ weekLabel:'Week 9', green:{stockLineId:green.stockLineId,name:'A deliberately different legacy name'} }];
  assert.equal(isOnExactCooldown(green, exactCooldownKeys(history, 'Week 10')), true);
});

test('all attached categories participate in same-week overlap checks', () => {
  const green = WEEK_10_CANDIDATES.find(candidate => candidate.slot === 'green')!;
  const candidate = { ...green, categories:['Unrelated','Internal Framing'] };
  assert.equal(categoriesOverlap(green, candidate), true);
});

test('Offers match structured attributes with TW and D4S normalization', () => {
  const candidate = WEEK_10_CANDIDATES.find(item => item.productId === 'recZT1wJlKohtcVdV')!;
  assert.equal(offerMatchesCandidate(CURRENT_OFFERS[0], candidate), true);
});

test('Offer length is not required and a different nominal size does not collide', () => {
  const fiftyByTwentyFive = WEEK_10_CANDIDATES.find(item => item.productId === 'recqu3Cmfx3TOFcFL')!;
  assert.equal(offerMatchesCandidate(CURRENT_OFFERS[0], fiftyByTwentyFive), false);
});

test('Orange rejects availability below two or below MOQ', () => {
  const base = WEEK_10_CANDIDATES.find(item => item.stockLineId === 'recf6HJNc8PFv7ETZ')!;
  const invalid: Candidate[] = [
    { ...base, stockLineId:'one-unit', available:1, moq:1, discountPct:99 },
    { ...base, stockLineId:'below-moq', available:2, moq:3, discountPct:98 },
    base,
  ];
  const selected = selectWeeklyRecommendations([
    WEEK_10_CANDIDATES.find(item => item.slot === 'green')!,
    WEEK_10_CANDIDATES.find(item => item.stockLineId === 'rec429fznsKgup8Ob')!,
    ...invalid,
  ], [], [], 'Week 10');
  assert.equal(selected.orange?.stockLineId, base.stockLineId);
});

test('email-facing URLs are clean product URLs without a modal query', () => {
  const selected = selectWeeklyRecommendations(WEEK_10_CANDIDATES, CURRENT_OFFERS, BASELINE_HISTORY, 'Week 10');
  for (const candidate of [selected.green, selected.blue, selected.orange]) {
    assert.match(candidate!.productUrl, /^https:\/\/app\.fpx\.nz\/products-details\?recordId=rec/);
    assert.equal(candidate!.productUrl.includes('&modal='), false);
  }
});

test('historical categories never block a new week', () => {
  const history: HistoryEntry[] = [{ weekLabel:'Week 9', green:{name:'Different listing (5.400m)',categories:['Structural (Stress Graded)','Internal Framing']} }];
  const selected = selectWeeklyRecommendations(WEEK_10_CANDIDATES, CURRENT_OFFERS, history, 'Week 10');
  assert.equal(selected.green?.stockLineId, 'recdrMHARaWqP1UrG');
});

test('Selling Fast uses scarcity only as the discount tie-breaker', () => {
  const orange = WEEK_10_CANDIDATES.find(item => item.stockLineId === 'recf6HJNc8PFv7ETZ')!;
  const abundant = { ...orange, stockLineId:'abundant', available:5 };
  const scarce = { ...orange, stockLineId:'scarce', available:2 };
  const selected = selectWeeklyRecommendations([abundant,scarce], [], [], 'Week 10');
  assert.equal(selected.orange?.stockLineId, 'scarce');
});

test('a week can be marked as sent only once', () => {
  assert.equal(hasSentWeek(BASELINE_HISTORY, ' week 9 '), true);
  assert.equal(hasSentWeek(BASELINE_HISTORY, 'Week 10'), false);
});

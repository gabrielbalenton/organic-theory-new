import type { Candidate } from './fpxRecommendationEngine.ts';

export const CURRENT_STOCK_SNAPSHOT_DATE = '2026-09-14';

const productUrl = (productId: string) => `https://app.fpx.nz/products-details?recordId=${productId}`;
const listingUrl = (productId: string, stockLineId: string) =>
  `${productUrl(productId)}&modal=%2Flisting-details%3FrecordId%3D${stockLineId}&modalSize=M&modalPlacement=end`;

function candidate(input: Omit<Candidate, 'productUrl' | 'listingUrl'>): Candidate {
  return {
    ...input,
    productUrl: productUrl(input.productId),
    listingUrl: listingUrl(input.productId, input.stockLineId),
  };
}

const structuralInternal = ['Structural (Stress Graded)', 'Internal Framing'];
const structuralExternal = ['Structural (Stress Graded)', 'External Framing'];
const MAX_BIRT_DISPATCH = '🚀 Dispatches in 1-3 days';

/**
 * Current FPX recommendation pool captured from the authoritative Airtable
 * Packet Deals, Bulk Deals and Selling Fast interface views on 2026-09-14.
 *
 * This is deliberately not named by week. The recommendation engine applies
 * week-specific cooldown/history rules at runtime, so the stock source can be
 * refreshed without creating another WEEK_N_CANDIDATES dependency.
 */
export const CURRENT_STOCK_CANDIDATES: Candidate[] = [
  // Packet Deals / Green
  candidate({
    slot: 'green',
    name: '300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (4.200m)',
    stockLineId: 'recBuG0wNBISW2itO',
    productId: 'reck5Iu0QOHNujERO',
    discountPct: 36.507936507936506,
    moq: 1,
    available: 5,
    categories: structuralInternal,
    imageUrl: 'https://v5.airtableusercontent.com/v3/u/57/57/1789358400000/kzieQiQsNgxgXdN-1uCBGw/sE2m27NciaYC-LmOaUgIWVBgsStJTDva82y9vjfHsm_T-FuFqhrnb3J82N-HbAvl7DoTH7oMsH7X3i8cOlbNQh3jcUi-a73upjff9YD1eTPCBTYDd8SW6mE9Wa4DkopKPdYkIY_cqnwomSgEY5MvSA/ted9kOOokO8xdqAZ-BmRuCH9DECybpxBolUjfEsj3Dk',
    price: '$600/M3',
    pcsPerPack: 36,
    source: 'Packet Deals',
    characteristics: { nominalSizes: ['300x50'], gaugedSize: '290x45', grade: 'SG8', treatment: 'H1.2', condition: 'Kiln Dried', profile: 'Machine Gauged' },
  }),
  candidate({
    slot: 'green',
    name: '50x25 Merch H3.2 Treated Wet Dressed 4 Sides (3.600m)',
    stockLineId: 'rec1tmkEe6EKu3ab8',
    productId: 'recqu3Cmfx3TOFcFL',
    discountPct: 31.70731707317073,
    moq: 1,
    available: 4,
    categories: ['Outdoor'],
    imageUrl: '',
    price: '$616/M3',
    pcsPerPack: 200,
    source: 'Packet Deals',
    characteristics: { nominalSizes: ['50x25'], grade: 'Merch', treatment: 'H3.2', condition: 'Treated Wet', profile: 'Dressed 4 Sides' },
  }),
  candidate({
    slot: 'green',
    name: '300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (5.400m)',
    stockLineId: 'recU5oeG8gQP7SZ1g',
    productId: 'reck5Iu0QOHNujERO',
    discountPct: 31.21693121693122,
    moq: 1,
    available: 38,
    categories: structuralInternal,
    imageUrl: '',
    price: '$715/M3',
    pcsPerPack: 36,
    source: 'Packet Deals',
    characteristics: { nominalSizes: ['300x50'], gaugedSize: '290x45', grade: 'SG8', treatment: 'H1.2', condition: 'Kiln Dried', profile: 'Machine Gauged' },
  }),
  candidate({
    slot: 'green',
    name: '100x25 Merch H3.2 Treated Wet Dressed 4 Sides (3.600m)',
    stockLineId: 'recjcDyxx6VxTQUoe',
    productId: 'recZT1wJlKohtcVdV',
    discountPct: 23.076923076923077,
    moq: 1,
    available: 4,
    categories: ['Outdoor'],
    imageUrl: 'https://v5.airtableusercontent.com/v3/u/57/57/1789358400000/jdqJz6GWt77qFPXemiTeNQ/bLZXsgwuvAIUdq6YVjnsBhtFm-hI3nByBfPxFnnHNZTdQk0u4HyS1jQW4PUU0F_TIX9G2beqx4LSBTalqOY1dRJhtsYxW-9Z1_KVHxZHgfR1q0tSR5xAlRw96JSJdW6wZpcqkqQT0Y-shBAxYTtf9w/850JgIQMi3DakZ8mQEjcysJk4r-MRT4PwPi9qdIF7t4',
    price: '$605/M3',
    pcsPerPack: 100,
    dispatch: MAX_BIRT_DISPATCH,
    source: 'Packet Deals',
    characteristics: { nominalSizes: ['100x25'], grade: 'Merch', treatment: 'H3.2', condition: 'Treated Wet', profile: 'Dressed 4 Sides' },
  }),

  // Bulk Deals / Blue
  candidate({
    slot: 'blue',
    name: '150x50 (140x45) SG8 H3.2 Treated Wet Machine Gauged (5.400m)',
    stockLineId: 'recCH7KdpPLD5XKDj',
    productId: 'recPDQoh9dJZBZVeC',
    discountPct: 31.19266055045872,
    moq: 2,
    available: 5,
    categories: structuralExternal,
    imageUrl: 'https://v5.airtableusercontent.com/v3/u/57/57/1789358400000/_JhfAhvlGxUadfcpk0UDtA/guJkjnxovkNpgPedQyzH1IOfdwO1LGAXrHxN6HWIUgfqDHlbj1ElBcvrbPQ-9HpmODedPDOEF8aQFNdB31fdcpVLmv4jMSBaYu_UPogHED6CJjgC6dZAM-uiG0Aqc4L0jgToPBQWX9j6ZPxMEytjXw/6BSzWeBprcPXs5OnM2MI3AO2G_zdud1yZO694cVrISM',
    price: '$715/M3',
    pcsPerPack: 0,
    dispatch: MAX_BIRT_DISPATCH,
    source: 'Bulk Deals',
    characteristics: { nominalSizes: ['150x50'], gaugedSize: '140x45', grade: 'SG8', treatment: 'H3.2', condition: 'Treated Wet', profile: 'Machine Gauged' },
  }),
  candidate({
    slot: 'blue',
    name: '200x50 (190x45) SG8 H1.2 Kiln Dried Machine Gauged (5.400m)',
    stockLineId: 'recmHxZeHnFesgzi0',
    productId: 'rechqRdpgamG6uPWp',
    discountPct: 26.94610778443114,
    moq: 4,
    available: 22,
    categories: structuralInternal,
    imageUrl: '',
    price: '$671/M3',
    pcsPerPack: 60,
    source: 'Bulk Deals',
    characteristics: { nominalSizes: ['200x50'], gaugedSize: '190x45', grade: 'SG8', treatment: 'H1.2', condition: 'Kiln Dried', profile: 'Machine Gauged' },
  }),
  candidate({
    slot: 'blue',
    name: '200x50 (190x45) SG8 H1.2 Kiln Dried Machine Gauged (6.000m)',
    stockLineId: 'recNAsSoLDkNmGVAj',
    productId: 'rechqRdpgamG6uPWp',
    discountPct: 26.94610778443114,
    moq: 4,
    available: 11,
    categories: structuralInternal,
    imageUrl: '',
    price: '$671/M3',
    pcsPerPack: 60,
    source: 'Bulk Deals',
    characteristics: { nominalSizes: ['200x50'], gaugedSize: '190x45', grade: 'SG8', treatment: 'H1.2', condition: 'Kiln Dried', profile: 'Machine Gauged' },
  }),
  candidate({
    slot: 'blue',
    name: '200x50 2Frame H4 Treated Wet Tongue & Groove (4.800m)',
    stockLineId: 'rec4j0C5tteNxPfif',
    productId: 'recGgdFiUK04RUf2c',
    discountPct: 23.77952755905512,
    moq: 2,
    available: 39,
    categories: ['Retaining'],
    imageUrl: 'https://v5.airtableusercontent.com/v3/u/57/57/1789358400000/XZZTst9TwexhYJnQorSayw/AQZbxulK-lKNaBdeDweFmHBPvX7b2l-20--Qly8-Kf1AonoSBTykq1UaClIIQsIBM688S8c7fJhsZYFy2n0oWFlRrk0NdXnp4EL1ofFkfci-lprYDFYepxCryqwVvfQVIga-J28poXjSXmeZJZnejA/lkGIC0sl2A3Ei95iLX6GQ-B0OfcprNQb2Hvm2EangDs',
    price: '$484/M3',
    pcsPerPack: 60,
    source: 'Bulk Deals',
    characteristics: { nominalSizes: ['200x50'], grade: '2Frame', treatment: 'H4', condition: 'Treated Wet', profile: 'Tongue & Groove' },
  }),

  // Selling Fast / Orange
  candidate({
    slot: 'orange',
    name: '50x25 Merch H3.2 Treated Wet Dressed 4 Sides (3.600m)',
    stockLineId: 'rec1tmkEe6EKu3ab8',
    productId: 'recqu3Cmfx3TOFcFL',
    discountPct: 31.70731707317073,
    moq: 1,
    available: 4,
    categories: ['Outdoor'],
    imageUrl: '',
    price: '$616/M3',
    pcsPerPack: 200,
    source: 'Selling Fast',
    characteristics: { nominalSizes: ['50x25'], grade: 'Merch', treatment: 'H3.2', condition: 'Treated Wet', profile: 'Dressed 4 Sides' },
  }),
  candidate({
    slot: 'orange',
    name: '100x25 Merch H3.2 Treated Wet Dressed 4 Sides (3.600m)',
    stockLineId: 'recjcDyxx6VxTQUoe',
    productId: 'recZT1wJlKohtcVdV',
    discountPct: 23.076923076923077,
    moq: 1,
    available: 4,
    categories: ['Outdoor'],
    imageUrl: '',
    price: '$605/M3',
    pcsPerPack: 100,
    source: 'Selling Fast',
    characteristics: { nominalSizes: ['100x25'], grade: 'Merch', treatment: 'H3.2', condition: 'Treated Wet', profile: 'Dressed 4 Sides' },
  }),
  candidate({
    slot: 'orange',
    name: '200x50 2Frame H4 Treated Wet Tongue & Groove (3.600m)',
    stockLineId: 'rec2f7DAb0e9RL6lM',
    productId: 'recGgdFiUK04RUf2c',
    discountPct: 20.62992125984252,
    moq: 1,
    available: 4,
    categories: ['Retaining'],
    imageUrl: 'https://v5.airtableusercontent.com/v3/u/57/57/1789358400000/XZZTst9TwexhYJnQorSayw/AQZbxulK-lKNaBdeDweFmHBPvX7b2l-20--Qly8-Kf1AonoSBTykq1UaClIIQsIBM688S8c7fJhsZYFy2n0oWFlRrk0NdXnp4EL1ofFkfci-lprYDFYepxCryqwVvfQVIga-J28poXjSXmeZJZnejA/lkGIC0sl2A3Ei95iLX6GQ-B0OfcprNQb2Hvm2EangDs',
    price: '$554/M3',
    pcsPerPack: 65,
    dispatch: MAX_BIRT_DISPATCH,
    source: 'Selling Fast',
    characteristics: { nominalSizes: ['200x50'], grade: '2Frame', treatment: 'H4', condition: 'Treated Wet', profile: 'Tongue & Groove' },
  }),
  candidate({
    slot: 'orange',
    name: '50x50 (45x45) 2Frame H3.2 Treated Wet Machine Gauged (4.200m)',
    stockLineId: 'recgmPGN70Bm6WUll',
    productId: 'reczhxQn7K6RXRvHX',
    discountPct: 14.285714285714285,
    moq: 1,
    available: 2,
    categories: ['Pegs', 'Outdoor', 'Balustrades'],
    imageUrl: 'https://v5.airtableusercontent.com/v3/u/57/57/1789358400000/dOTwqK6y9pbjDreBnHlcGw/apRexxg-i_ZMvS0JidY5BjgzeC0qtpA0hJuCffZo956xzDqHtfDQBqgqIOZ0mVRbwNsHfq0B0bTJq97Kdk5Xm1v_HE1PEn0pF3ppy1ivjVybMCzU2IUhW_xqxcvYymo5J84L0BV-r76xVvU0XBe52g/myxKy01vxoQ3c3qfsXyiOo946tjot99bFwWUK5rrFaQ',
    price: '$720/M3',
    pcsPerPack: 200,
    source: 'Selling Fast',
    characteristics: { nominalSizes: ['50x50'], gaugedSize: '45x45', grade: '2Frame', treatment: 'H3.2', condition: 'Treated Wet', profile: 'Machine Gauged' },
  }),
];

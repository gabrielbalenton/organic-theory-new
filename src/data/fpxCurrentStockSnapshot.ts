import type { Candidate } from './fpxRecommendationEngine.ts';

export const CURRENT_STOCK_SNAPSHOT_DATE = '2026-09-28';

const productUrl = (productId: string) => `https://app.fpx.nz/products-details?recordId=${productId}`;
const listingUrl = (productId: string, stockLineId: string) =>
  `${productUrl(productId)}&modal=%2Flisting-details%3FrecordId%3D${stockLineId}&modalSize=M&modalPlacement=end`;
function candidate(input: Omit<Candidate, 'productUrl' | 'listingUrl'>): Candidate { return { ...input, productUrl: productUrl(input.productId), listingUrl: listingUrl(input.productId, input.stockLineId) }; }
const structuralInternal = ['Structural (Stress Graded)', 'Internal Framing'];
const structuralExternal = ['Structural (Stress Graded)', 'External Framing'];
const outdoor = ['Outdoor'];
const retaining = ['Retaining'];
const pegsOutdoor = ['Pegs', 'Outdoor', 'Balustrades'];
const MAX_BIRT_DISPATCH = '🚀 Dispatches in 1-3 days';

/** Current FPX pool refreshed from the live Airtable Packet Deals, Bulk Deals and Selling Fast interface views. */
export const CURRENT_STOCK_CANDIDATES: Candidate[] = [
  candidate({ slot:'green', name:'300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (4.200m)', stockLineId:'recd3wtVLwfy2sIGT', productId:'reck5Iu0QOHNujERO', discountPct:36.507936507936506, moq:1, available:3, categories:structuralInternal, imageUrl:'', price:'$660/M3', pcsPerPack:36, dispatch:MAX_BIRT_DISPATCH, source:'Packet Deals', characteristics:{ nominalSizes:['300x50'], gaugedSize:'290x45', grade:'SG8', treatment:'H1.2', condition:'Kiln Dried', profile:'Machine Gauged' } }),
  candidate({ slot:'green', name:'150x40 (140x35) SG8 H1.2 Kiln Dried Machine Gauged (3.600m)', stockLineId:'recV2643WW0meLtjj', productId:'rec0ssyA16x1UymYF', discountPct:19.689119170984457, moq:1, available:3, categories:structuralInternal, imageUrl:'', price:'$682/M3', pcsPerPack:0, dispatch:MAX_BIRT_DISPATCH, source:'Packet Deals', characteristics:{ nominalSizes:['150x40'], gaugedSize:'140x35', grade:'SG8', treatment:'H1.2', condition:'Kiln Dried', profile:'Machine Gauged' } }),
  candidate({ slot:'green', name:'200x50 (190x45) SG8 H1.2 Kiln Dried Machine Gauged (6.000m)', stockLineId:'rec133aQsJTM0nZTm', productId:'rechqRdpgamG6uPWp', discountPct:17.365269461077845, moq:1, available:10, categories:structuralInternal, imageUrl:'', price:'$759/M3', pcsPerPack:60, dispatch:MAX_BIRT_DISPATCH, source:'Packet Deals', characteristics:{ nominalSizes:['200x50'], gaugedSize:'190x45', grade:'SG8', treatment:'H1.2', condition:'Kiln Dried', profile:'Machine Gauged' } }),
  candidate({ slot:'blue', name:'150x50 (140x45) SG8 H3.2 Treated Wet Machine Gauged (5.400m)', stockLineId:'reci2WfeRnweztohX', productId:'recPDQoh9dJZBZVeC', discountPct:31.19266055045872, moq:2, available:9, categories:structuralExternal, imageUrl:'', price:'$660/M3', pcsPerPack:0, dispatch:MAX_BIRT_DISPATCH, source:'Bulk Deals', characteristics:{ nominalSizes:['150x50'], gaugedSize:'140x45', grade:'SG8', treatment:'H3.2', condition:'Treated Wet', profile:'Machine Gauged' } }),
  candidate({ slot:'blue', name:'200x50 2Frame H4 Treated Wet Tongue & Groove (4.800m)', stockLineId:'rec5POLBYDbD6pnJ9', productId:'recGgdFiUK04RUf2c', discountPct:23.77952755905512, moq:2, available:38, categories:retaining, imageUrl:'', price:'$532.40/M3', pcsPerPack:60, dispatch:MAX_BIRT_DISPATCH, source:'Bulk Deals', characteristics:{ nominalSizes:['200x50'], grade:'2Frame', treatment:'H4', condition:'Treated Wet', profile:'Tongue & Groove' } }),
  candidate({ slot:'orange', name:'300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (4.200m)', stockLineId:'recd3wtVLwfy2sIGT', productId:'reck5Iu0QOHNujERO', discountPct:36.507936507936506, moq:1, available:3, categories:structuralInternal, imageUrl:'', price:'$660/M3', pcsPerPack:36, dispatch:MAX_BIRT_DISPATCH, source:'Selling Fast', characteristics:{ nominalSizes:['300x50'], gaugedSize:'290x45', grade:'SG8', treatment:'H1.2', condition:'Kiln Dried', profile:'Machine Gauged' } }),
  candidate({ slot:'orange', name:'100x50 (90x45) SG12 H3.2 Kiln Dried Machine Gauged (5.400m)', stockLineId:'rec5ErpuXIidGAahF', productId:'rec0sATKosy93U4kV', discountPct:28.25112107623318, moq:2, available:3, categories:structuralExternal, imageUrl:'', price:'$880/M3', pcsPerPack:0, dispatch:MAX_BIRT_DISPATCH, source:'Selling Fast', characteristics:{ nominalSizes:['100x50'], gaugedSize:'90x45', grade:'SG12', treatment:'H3.2', condition:'Kiln Dried', profile:'Machine Gauged' } }),
  candidate({ slot:'orange', name:'250x50 (240x45) SG8 H3.2 Treated Wet Machine Gauged (6.000m)', stockLineId:'recPn9PGQSTqOSyoY', productId:'recQKvBGUM2xpPKHS', discountPct:9.191583610188261, moq:2, available:2, categories:structuralExternal, imageUrl:'', price:'$902/M3', pcsPerPack:0, dispatch:MAX_BIRT_DISPATCH, source:'Selling Fast', characteristics:{ nominalSizes:['250x50'], gaugedSize:'240x45', grade:'SG8', treatment:'H3.2', condition:'Treated Wet', profile:'Machine Gauged' } }),
];

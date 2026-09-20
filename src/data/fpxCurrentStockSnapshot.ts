import type { Candidate } from './fpxRecommendationEngine.ts';

export const CURRENT_STOCK_SNAPSHOT_DATE = '2026-09-21';

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

const img150h12 = 'https://v5.airtableusercontent.com/v3/u/57/57/1789956000000/JGkLyr3uhF_GnPjgzEoGNQ/HxUGMvFKQ8-YjnbnnB4s3TNhReax36r_9PGkEPqcXcuYnX6aO_JngwPXfBQQI-NVDSBpT6rJ629KXRUpf1J19NXvLDgGRyHw8RiK-knMoYoeS_x-g3OHAP8qweTZsQlP7R7HVt4jQDw87XeNX_osEA/DiMBZopP1GGEgyelZQshI3BlthiLT7gqDxPeTu1BAUw';
const img150h32 = 'https://v5.airtableusercontent.com/v3/u/57/57/1789956000000/Q11tw_2WphQi2Ls9wNiTsA/ThOyoK669I5plDfjKMd43XKofWOlpy4ncfpBCbO68soCOtTVFn7X5t_eeyLBgK97t8_8CifTOeGymg6_faJmzwwFiXNTZU-fZaGil5Eh2fYj4hatTpgVY93zcXSchl-9-xARiKwjmeT43Ze1sqsgrA/rH5zBhNLFCLkcxMlCLumVg32hsAvvcUvauKhEOhNCz4';
const img100h4 = 'https://v5.airtableusercontent.com/v3/u/57/57/1789956000000/Bqxh8eLuvFnVV1xo3Aj2-g/PeCx4Glqj5cjI6bVJl3OepSFZTtV5MPDQZVGhmma0kigUvPwAHRRSwXd9sIp-xak8PzLraUTh0aBOEeqlLxdnSMAn79VtGL0zk9McuHydzDjA6YhVJSVWn9KcZPhTbd-tPYDPCEfElbYPLY0AjjxIQ/C_p_29AUF0hF613cduBoEEU0iuz6nA4StpTM2UUFx5E';
const img200tg = 'https://v5.airtableusercontent.com/v3/u/57/57/1789956000000/4nu_ns-BjMUYGpLEcay-2g/17RvbzhgQpclxp6b50Hc-UxkSvXdkT6RFNGOXCO0WjaBl4LNsHbPp4S9HPi3SG4wJ4v3kTavS5PlGiqvRSzktHXdvynTnu-QQmctKkQG45DmHCeHlrJpTnNu8Xqm8jB5-WIS6B7FlKDc2TwZAYCS4w/CKe6K55jb8uC3EsjPGqQ_HJ3fzwI480MICrUmkxUS7w';
const img50x50 = 'https://v5.airtableusercontent.com/v3/u/57/57/1789956000000/yz-3fvy03CVG4mk7rnOkPg/_tnqHbDcD00l83d-uzXJSbwUBnvigpIHZWxIU-6Vo3xxk_4xj4BITAD3BssAF5DyCu8h-1d4iMCZ4Ft1kzTRyDlg915NrCRr_vdfr2bkoTUUkZvbhCdzTJuWJK_0-OTq9KIwF5n9VHgHyHeT7_dD-A/U1XVsMD_2NpY0FBKLE6Jp5mbK9LjkxNmaczCpWmZTkQ';

/**
 * Week 13 snapshot refreshed from the FPX Airtable interface on 2026-09-21.
 * Packet Deals is currently empty, so the most recent authoritative Packet Deals
 * candidates are retained as the Green fallback only. Blue and Orange are refreshed
 * from the current Bulk Deals / Selling Fast interface records.
 */
export const CURRENT_STOCK_CANDIDATES: Candidate[] = [
  candidate({ slot:'green', name:'50x25 Merch H3.2 Treated Wet Dressed 4 Sides (4.200m)', stockLineId:'recfC5ZsQ99G8X1Fz', productId:'recqu3Cmfx3TOFcFL', discountPct:31.70731707317073, moq:1, available:14, categories:outdoor, imageUrl:'', price:'$616/M3', pcsPerPack:200, dispatch:MAX_BIRT_DISPATCH, source:'Packet Deals', characteristics:{ nominalSizes:['50x25'], grade:'Merch', treatment:'H3.2', condition:'Treated Wet', profile:'Dressed 4 Sides' } }),
  candidate({ slot:'green', name:'300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (5.400m)', stockLineId:'recbdb6FG6Qk0H9T0', productId:'reck5Iu0QOHNujERO', discountPct:31.216931216931215, moq:1, available:38, categories:structuralInternal, imageUrl:'', price:'$715/M3', pcsPerPack:36, dispatch:MAX_BIRT_DISPATCH, source:'Packet Deals', characteristics:{ nominalSizes:['300x50'], gaugedSize:'290x45', grade:'SG8', treatment:'H1.2', condition:'Kiln Dried', profile:'Machine Gauged' } }),
  candidate({ slot:'green', name:'100x25 Merch H3.2 Treated Wet Dressed 4 Sides (4.200m)', stockLineId:'recUH7IYzPJWaIS8u', productId:'recZT1wJlKohtcVdV', discountPct:23.076923076923077, moq:1, available:21, categories:outdoor, imageUrl:'', price:'$605/M3', pcsPerPack:100, dispatch:MAX_BIRT_DISPATCH, source:'Packet Deals', characteristics:{ nominalSizes:['100x25'], grade:'Merch', treatment:'H3.2', condition:'Treated Wet', profile:'Dressed 4 Sides' } }),
  candidate({ slot:'green', name:'200x50 2Frame H4 Treated Wet Tongue & Groove (5.400m)', stockLineId:'recj6mZ8Pnb8dcjDw', productId:'recGgdFiUK04RUf2c', discountPct:20.62992125984252, moq:1, available:6, categories:retaining, imageUrl:img200tg, price:'$554.40/M3', pcsPerPack:60, dispatch:MAX_BIRT_DISPATCH, source:'Packet Deals', characteristics:{ nominalSizes:['200x50'], grade:'2Frame', treatment:'H4', condition:'Treated Wet', profile:'Tongue & Groove' } }),

  candidate({ slot:'blue', name:'150x50 (140x45) SG8 H3.2 Treated Wet Machine Gauged (5.400m)', stockLineId:'recsNDAErxd3SyzpS', productId:'recPDQoh9dJZBZVeC', discountPct:31.19266055045872, moq:2, available:9, categories:structuralExternal, imageUrl:img150h32, price:'$660/M3', pcsPerPack:0, dispatch:MAX_BIRT_DISPATCH, source:'Bulk Deals', characteristics:{ nominalSizes:['150x50'], gaugedSize:'140x45', grade:'SG8', treatment:'H3.2', condition:'Treated Wet', profile:'Machine Gauged' } }),
  candidate({ slot:'blue', name:'200x50 (190x45) SG8 H1.2 Kiln Dried Machine Gauged (6.000m)', stockLineId:'recSt5FC3UvgKG822', productId:'rechqRdpgamG6uPWp', discountPct:26.94610778443114, moq:4, available:13, categories:structuralInternal, imageUrl:img150h12, price:'$671/M3', pcsPerPack:60, dispatch:MAX_BIRT_DISPATCH, source:'Bulk Deals', characteristics:{ nominalSizes:['200x50'], gaugedSize:'190x45', grade:'SG8', treatment:'H1.2', condition:'Kiln Dried', profile:'Machine Gauged' } }),
  candidate({ slot:'blue', name:'200x50 (190x45) SG8 H1.2 Kiln Dried Machine Gauged (5.400m)', stockLineId:'recctBOWTux5Xep21', productId:'rechqRdpgamG6uPWp', discountPct:26.94610778443114, moq:4, available:22, categories:structuralInternal, imageUrl:img150h12, price:'$671/M3', pcsPerPack:60, dispatch:MAX_BIRT_DISPATCH, source:'Bulk Deals', characteristics:{ nominalSizes:['200x50'], gaugedSize:'190x45', grade:'SG8', treatment:'H1.2', condition:'Kiln Dried', profile:'Machine Gauged' } }),
  candidate({ slot:'blue', name:'150x50 (140x45) SG8 H1.2 Kiln Dried Machine Gauged (4.200m)', stockLineId:'recRGtf3r7mhPs4Xd', productId:'recD8B5I6fOX4IFRS', discountPct:23.78048780487805, moq:4, available:26, categories:structuralInternal, imageUrl:img150h12, price:'$550/M3', pcsPerPack:0, dispatch:MAX_BIRT_DISPATCH, source:'Bulk Deals', characteristics:{ nominalSizes:['150x50'], gaugedSize:'140x45', grade:'SG8', treatment:'H1.2', condition:'Kiln Dried', profile:'Machine Gauged' } }),
  candidate({ slot:'blue', name:'200x50 2Frame H4 Treated Wet Tongue & Groove (5.400m)', stockLineId:'recYSaIewdSMb3q00', productId:'recGgdFiUK04RUf2c', discountPct:23.77952755905512, moq:2, available:6, categories:retaining, imageUrl:img200tg, price:'$532.40/M3', pcsPerPack:60, dispatch:MAX_BIRT_DISPATCH, source:'Bulk Deals', characteristics:{ nominalSizes:['200x50'], grade:'2Frame', treatment:'H4', condition:'Treated Wet', profile:'Tongue & Groove' } }),
  candidate({ slot:'blue', name:'100x50 2Frame H4 Treated Wet Rough Sawn (4.800m)', stockLineId:'recBsngnB2wzNme5w', productId:'rec3k6VlSaoCt1zjN', discountPct:20.8955223880597, moq:2, available:9, categories:retaining, imageUrl:img100h4, price:'$583/M3', pcsPerPack:0, dispatch:MAX_BIRT_DISPATCH, source:'Bulk Deals', characteristics:{ nominalSizes:['100x50'], grade:'2Frame', treatment:'H4', condition:'Treated Wet', profile:'Rough Sawn' } }),
  candidate({ slot:'blue', name:'50x50 (45x45) 2Frame H3.2 Treated Wet Machine Gauged (5.400m)', stockLineId:'rec6TQZ934ZKCgDBr', productId:'reczhxQn7K6RXRvHX', discountPct:20.238095238095237, moq:4, available:46, categories:pegsOutdoor, imageUrl:img50x50, price:'$737/M3', pcsPerPack:200, dispatch:MAX_BIRT_DISPATCH, source:'Bulk Deals', characteristics:{ nominalSizes:['50x50'], gaugedSize:'45x45', grade:'2Frame', treatment:'H3.2', condition:'Treated Wet', profile:'Machine Gauged' } }),

  candidate({ slot:'orange', name:'150x50 (140x45) SG8 H1.2 Kiln Dried Machine Gauged (3.600m)', stockLineId:'recrMBAAeVWbuRZ6w', productId:'recD8B5I6fOX4IFRS', discountPct:17.682926829268293, moq:2, available:3, categories:structuralInternal, imageUrl:img150h12, price:'$594/M3', pcsPerPack:0, dispatch:MAX_BIRT_DISPATCH, source:'Selling Fast', characteristics:{ nominalSizes:['150x50'], gaugedSize:'140x45', grade:'SG8', treatment:'H1.2', condition:'Kiln Dried', profile:'Machine Gauged' } }),
];

export const CURRENT_STOCK_REFRESH_NOTE = 'Packet Deals returned no current records on 2026-09-21; Green retains the last authoritative Packet Deals pool. Bulk Deals and Selling Fast were refreshed from the live interface.';

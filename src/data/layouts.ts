import type { BoothLayout } from '../types';
export const LAYOUTS: BoothLayout[] = [
 {id:'strip-3',name:'Classic Three',short:'03',poses:3,width:600,height:1800,kind:'strip',description:'2 × 6 in strip'},
 {id:'strip-4',name:'Classic Four',short:'04',poses:4,width:600,height:1800,kind:'strip',description:'2 × 6 in strip'},
 {id:'strip-2',name:'Sweet Pair',short:'02',poses:2,width:600,height:1800,kind:'strip',description:'2 × 6 in strip'},
 {id:'grid-4',name:'Double Date',short:'2×2',poses:4,width:1200,height:1200,kind:'grid',description:'4 × 4 in square'},
 {id:'grid-6',name:'Six Stories',short:'06',poses:6,width:1800,height:1200,kind:'grid',description:'6 × 4 in collage'},
 {id:'single',name:'The Portrait',short:'01',poses:1,width:1200,height:1800,kind:'single',description:'4 × 6 in portrait'},
 {id:'album-square',name:'Album Cover',short:'LP',poses:1,width:1600,height:1600,kind:'single',description:'Square album artwork'},
];

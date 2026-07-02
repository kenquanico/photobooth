import {describe,expect,it} from 'vitest';
import {createRoomCode} from './PairDevice';

describe('paired room codes',()=>{it('always creates four letters accepted by the join input',()=>{for(let i=0;i<50;i++)expect(createRoomCode()).toMatch(/^[A-Z]{4}$/)})});

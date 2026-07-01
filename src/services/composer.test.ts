import {describe,expect,it} from 'vitest';import {getSlots} from './composer';import {LAYOUTS} from '../data/layouts';
describe('layout composition',()=>{it('creates one bounded slot per pose',()=>{for(const l of LAYOUTS){const s=getSlots(l,12);expect(s).toHaveLength(l.poses);expect(s.every(v=>v.x>=0&&v.y>=0&&v.x+v.w<=l.width&&v.y+v.h<=l.height)).toBe(true)}})});

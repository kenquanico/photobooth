export const countdownRemaining=(target:number,now=Date.now())=>Math.max(0,Math.ceil((target-now)/1000));
export type RoomState='idle'|'waiting'|'connecting'|'connected'|'disconnected';
export function nextRoomState(current:RoomState,event:'create'|'join'|'connected'|'left'):RoomState{if(event==='create')return'waiting';if(event==='join')return'connecting';if(event==='connected')return'connected';if(event==='left')return'disconnected';return current}

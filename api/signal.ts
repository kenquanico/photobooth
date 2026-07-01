import {experimental_upgradeWebSocket,type WebSocketData} from '@vercel/functions';
import type WebSocket from 'ws';

type ClientMessage={type:'create'|'join'|'signal';room:string;data?:unknown};
const rooms=new Map<string,Set<WebSocket>>();

export function GET(){return experimental_upgradeWebSocket((socket)=>{let roomId='';socket.on('message',(raw:WebSocketData)=>{let message:ClientMessage;try{message=JSON.parse(raw.toString())}catch{return}roomId=message.room?.toUpperCase();if(!/^[A-Z0-9]{4}$/.test(roomId))return;
    if(message.type==='create'){rooms.set(roomId,new Set([socket]));return}
    if(message.type==='join'){const room=rooms.get(roomId);if(!room||room.size>=2){socket.send(JSON.stringify({type:'error',message:'That room is unavailable or full.'}));return}room.add(socket);for(const peer of room)if(peer!==socket&&peer.readyState===peer.OPEN)peer.send(JSON.stringify({type:'peer-joined'}));return}
    if(message.type==='signal')for(const peer of rooms.get(roomId)||[])if(peer!==socket&&peer.readyState===peer.OPEN)peer.send(JSON.stringify(message));
  });const close=()=>{const room=rooms.get(roomId);room?.delete(socket);if(!room?.size)rooms.delete(roomId);else for(const peer of room)if(peer.readyState===peer.OPEN)peer.send(JSON.stringify({type:'peer-left'}))};socket.on('close',close);socket.on('error',close)})}

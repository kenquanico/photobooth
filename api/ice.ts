import {createHmac} from 'node:crypto';

export function GET(){
 const host=process.env.TURN_HOST||'staticauth.openrelay.metered.ca';
 const secret=process.env.TURN_SECRET||'openrelayprojectsecret';
 const username=String(Math.floor(Date.now()/1000)+3600);
 const credential=createHmac('sha1',secret).update(username).digest('base64');
 return new Response(JSON.stringify({iceServers:[
  {urls:['stun:stun.l.google.com:19302','stun:stun1.l.google.com:19302']},
  {urls:[`turn:${host}:80?transport=udp`,`turn:${host}:80?transport=tcp`,`turns:${host}:443?transport=tcp`],username,credential}
 ]}),{headers:{'content-type':'application/json','cache-control':'no-store'}});
}

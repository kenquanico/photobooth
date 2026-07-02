const STUN_ONLY:RTCIceServer[]=[{urls:['stun:stun.l.google.com:19302','stun:stun1.l.google.com:19302']}];
const OPEN_RELAY_ENDPOINT='https://photobooth-kq.metered.live/api/v1/turn/credentials?apiKey=69c12ab4c97eaa9ed422646b20c28860acff';

export async function getIceServers():Promise<RTCIceServer[]>{
 try{
  const response=await fetch(OPEN_RELAY_ENDPOINT,{cache:'no-store'});
  if(!response.ok)throw new Error('ICE configuration unavailable');
  const iceServers=await response.json() as RTCIceServer[];
  return iceServers.some(server=>String(server.urls).startsWith('turn'))?iceServers:STUN_ONLY;
 }catch{return STUN_ONLY}
}

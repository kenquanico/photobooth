const STUN_ONLY:RTCIceServer[]=[{urls:['stun:stun.l.google.com:19302','stun:stun1.l.google.com:19302']}];

export async function getIceServers():Promise<RTCIceServer[]>{
 try{
  const response=await fetch('/api/ice',{cache:'no-store'});
  if(!response.ok)throw new Error('ICE configuration unavailable');
  const body=await response.json() as {iceServers?:RTCIceServer[]};
  return body.iceServers?.length?body.iceServers:STUN_ONLY;
 }catch{return STUN_ONLY}
}

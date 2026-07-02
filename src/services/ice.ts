const OPEN_RELAY_ENDPOINT='https://photobooth-kq.metered.live/api/v1/turn/credentials?apiKey=69c12ab4c97eaa9ed422646b20c28860acff';
const VERIFIED_OPEN_RELAY:RTCIceServer[]=[
 {urls:'turn:global.relay.metered.ca:80',username:'ba53bc9a270b106bc327dac2',credential:'c5tz9IYJ3njjhtbU'},
 {urls:'turn:global.relay.metered.ca:80?transport=tcp',username:'ba53bc9a270b106bc327dac2',credential:'c5tz9IYJ3njjhtbU'},
 {urls:'turn:global.relay.metered.ca:443',username:'ba53bc9a270b106bc327dac2',credential:'c5tz9IYJ3njjhtbU'},
 {urls:'turns:global.relay.metered.ca:443?transport=tcp',username:'ba53bc9a270b106bc327dac2',credential:'c5tz9IYJ3njjhtbU'}
];

export async function getIceServers():Promise<RTCIceServer[]>{
 try{
  const response=await fetch(OPEN_RELAY_ENDPOINT,{cache:'no-store'});
  if(!response.ok)throw new Error('ICE configuration unavailable');
  const iceServers=await response.json() as RTCIceServer[];
  return iceServers.some(server=>String(server.urls).startsWith('turn'))?iceServers:VERIFIED_OPEN_RELAY;
 }catch{return VERIFIED_OPEN_RELAY}
}

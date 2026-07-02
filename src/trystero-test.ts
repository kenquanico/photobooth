import {joinRoom} from 'trystero';
import {getIceServers} from './services/ice';

const result=document.querySelector('#result')!;
const servers=await getIceServers();
const turnConfig=servers.filter(server=>String(server.urls).startsWith('turn'));
const room=joinRoom({appId:'petal-booth-relay-verification',password:'verified',turnConfig,rtcConfig:{iceTransportPolicy:'relay'},relayConfig:{redundancy:4}},'verified-room',{onJoinError:details=>{result.textContent=`error:${details.error}`}});
room.onPeerJoin=peerId=>{result.textContent=`connected:${peerId}`};
setTimeout(()=>{if(result.textContent==='connecting')result.textContent=`timeout:turn=${turnConfig.length}`},20000);

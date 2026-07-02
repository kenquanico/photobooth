const METERED_DOMAIN=process.env.METERED_DOMAIN;
const METERED_TURN_API_KEY=process.env.METERED_TURN_API_KEY;

export async function GET(){
 try{
  if(!METERED_DOMAIN||!METERED_TURN_API_KEY)throw new Error('Metered TURN environment is not configured');
  const response=await fetch(`https://${METERED_DOMAIN}/api/v1/turn/credentials?apiKey=${METERED_TURN_API_KEY}`,{cache:'no-store'});
  if(!response.ok)throw new Error(`Metered returned ${response.status}`);
  const iceServers=await response.json();
  return new Response(JSON.stringify({iceServers}),{headers:{'content-type':'application/json','cache-control':'no-store, max-age=0'}});
 }catch{
  return new Response(JSON.stringify({error:'TURN configuration unavailable'}),{status:502,headers:{'content-type':'application/json','cache-control':'no-store'}});
 }
}

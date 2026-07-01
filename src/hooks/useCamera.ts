import { useCallback, useEffect, useRef, useState } from 'react';
export function useCamera(){const stream=useRef<MediaStream|null>(null);const [status,setStatus]=useState<'idle'|'loading'|'ready'|'error'>('idle');const [facing,setFacing]=useState<'user'|'environment'>('user');const [error,setError]=useState('');
 const stop=useCallback(()=>{stream.current?.getTracks().forEach(t=>t.stop());stream.current=null;setStatus('idle')},[]);
 const start=useCallback(async(next=facing)=>{stop();setStatus('loading');try{stream.current=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:next},width:{ideal:1920},height:{ideal:1080}},audio:false});setFacing(next);setStatus('ready');return stream.current}catch(e){setError(e instanceof Error?e.message:'Camera access was denied.');setStatus('error');return null}},[facing,stop]);
 useEffect(()=>stop,[stop]);return{stream,status,error,facing,start,stop,switchCamera:()=>start(facing==='user'?'environment':'user')};}

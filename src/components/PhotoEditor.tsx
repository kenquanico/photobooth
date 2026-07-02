import {Download,Printer,Share2} from 'lucide-react';
import {useEffect,useMemo,useState} from 'react';
import type {BoothLayout,BoothSettings,CropState} from '../types';
import {compose} from '../services/composer';
import {CustomizationPanel} from './CustomizationPanel';

const blank=():CropState=>({zoom:1,x:0,y:0,brightness:100,contrast:100,filter:'none'});

export function PhotoEditor({layout,photos,settings,onRetake,onSettings}:{layout:BoothLayout;photos:string[];settings:BoothSettings;onRetake:()=>void;onSettings:(settings:BoothSettings)=>void}){
 const crops=useMemo(()=>Array.from({length:layout.poses},()=>({...blank(),filter:settings.photoFilter||'none'})),[layout.poses,settings.photoFilter]);
 const working=useMemo(()=>Array.from({length:layout.poses},(_,index)=>photos[index%photos.length]),[photos,layout.poses]);
 const [preview,setPreview]=useState('');
 useEffect(()=>{let live=true;compose(layout,working,settings,crops).then(canvas=>live&&setPreview(canvas.toDataURL('image/jpeg',.9)));return()=>{live=false}},[layout,working,settings,crops]);
 const download=async(type:'png'|'jpeg')=>{const canvas=await compose(layout,working,settings,crops),link=document.createElement('a');link.download=`petal-booth-${Date.now()}.${type==='png'?'png':'jpg'}`;link.href=canvas.toDataURL(`image/${type}`,.96);link.click()};
 const share=async()=>{const canvas=await compose(layout,working,settings,crops);canvas.toBlob(async blob=>{if(!blob)return;const file=new File([blob],'petal-booth.png',{type:'image/png'});if(navigator.canShare?.({files:[file]}))await navigator.share({files:[file],title:'My Petal Booth photo'})},'image/png')};
 return <main className="editor-page"><div className="editor-head"><div><span className="eyebrow">PHOTOS CAPTURED — NOW MAKE THEM YOURS</span><h1>Design your final layout</h1></div><button className="secondary" onClick={onRetake}>Retake session</button></div><div className="editor-workspace"><div className="result-stage">{preview&&<img src={preview} alt="Composed photobooth result"/>}</div><div className="editor-side"><CustomizationPanel layout={layout} settings={settings} onChange={onSettings}/><aside className="edit-panel export-panel"><h2>Save your photo</h2><p>Your selected filter and design are included in every export.</p><div className="export"><button className="primary" onClick={()=>download('png')}><Download size={17}/> PNG</button><button onClick={()=>download('jpeg')}><Download size={17}/> JPEG</button>{'share' in navigator&&<button onClick={share}><Share2 size={17}/> Share</button>}<button onClick={()=>window.print()}><Printer size={17}/> Print</button></div></aside></div></div></main>
}

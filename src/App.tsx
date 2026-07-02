import {lazy,Suspense,useEffect,useState} from 'react';
import {ArrowRight,Camera,Heart,Link2,LockKeyhole,Sparkles} from 'lucide-react';
import {CameraBooth} from './components/CameraBooth';
import {Header} from './components/Header';
import {LayoutGallery} from './components/LayoutGallery';
import {LayoutPreview} from './components/LayoutPreview';
import {LAYOUTS} from './data/layouts';
import type {BoothLayout,BoothSettings,Page} from './types';

const PairDevice=lazy(()=>import('./components/PairDevice').then(module=>({default:module.PairDevice})));
const PhotoEditor=lazy(()=>import('./components/PhotoEditor').then(module=>({default:module.PhotoEditor})));
const Loading=()=> <main className="route-loading" aria-live="polite"><span/><p>Preparing your studio…</p></main>;

export function App(){
 const [page,setPage]=useState<Page>('home'),[layout,setLayout]=useState<BoothLayout>(LAYOUTS[0]),[photos,setPhotos]=useState<string[]>([]);
 const [settings,setSettings]=useState<BoothSettings>({frame:'#fff8fa',background:'#ead3d9',gap:14,caption:'made with love',countdown:3,frameStyle:'solid',frameEffect:'natural',photoFilter:'none',photoShape:'square',sticker:'',stickers:[],decorationPlacements:{},titleText:'forever, us',footerText:'made with petal booth',dateText:new Date().toLocaleDateString(),textColor:'#352a2e',fontStyle:'script'});
 useEffect(()=>{if(new URLSearchParams(location.search).get('room'))setPage('pair')},[]);
 const go=(next:Page)=>{setPage(next);scrollTo({top:0,behavior:'smooth'})};
 return <div className="app">
  <Header go={go} page={page}/>{page==='home'&&<main className="home"><section className="hero"><div className="hero-copy"><span className="eyebrow"><Sparkles size={14}/> YOUR MOMENTS, BEAUTIFULLY FRAMED</span><h1>My baby want<br/><em>SILVANAS</em></h1><p>A private, playful photobooth that lives right in your browser. Pose, personalize, and keep every frame.</p><div className="hero-actions"><button className="primary" onClick={()=>go('layouts')}><Camera size={18}/> Start solo session</button><button className="secondary" onClick={()=>go('pair')}><Link2 size={18}/> Connect another device</button></div><div className="privacy"><LockKeyhole size={15}/> No account. No uploads. Your photos stay yours.</div></div><div className="hero-art"><div className="blob one"/><div className="blob two"/><div className="strip-card back"><LayoutPreview layout={LAYOUTS[1]}/></div><div className="strip-card front"><LayoutPreview layout={LAYOUTS[0]}/></div><Heart className="doodle-heart" fill="currentColor"/><span className="doodle">say cheese!</span></div></section><section className="how"><span className="eyebrow">AS EASY AS 1, 2, 3</span><h2>Your keepsake in a few clicks</h2><div><article><b>01</b><Camera/><h3>Choose & pose</h3><p>Pick a capture format and follow the friendly countdown.</p></article><article><b>02</b><Sparkles/><h3>Design after capture</h3><p>Choose the final layout, material, text, effects, shapes and decorations.</p></article><article><b>03</b><Heart/><h3>Save the memory</h3><p>Download a crisp print-ready image or share it from your device.</p></article></div><button className="text-link" onClick={()=>go('layouts')}>Start your session <ArrowRight size={16}/></button></section></main>}
 {page==='layouts'&&<LayoutGallery selected={layout} onSelect={setLayout} settings={settings} setSettings={setSettings} onContinue={()=>go('camera')}/>} 
 {page==='camera'&&<CameraBooth layout={layout} settings={settings} onExit={()=>go('layouts')} onDone={captured=>{setPhotos(captured);go('editor')}}/>}
 <Suspense fallback={<Loading/>}>{page==='editor'&&<PhotoEditor layout={layout} photos={photos} settings={settings} onRetake={()=>go('camera')} onSettings={setSettings}/>} {page==='pair'&&<PairDevice/>}</Suspense>
 <footer><button className="brand" onClick={()=>go('home')} aria-label="Petal Booth home"><img src="/pb2-logo.png" alt=""/></button><p>Made for moments worth keeping.</p><small>© {new Date().getFullYear()} Petal Booth · Photos never leave your browser.</small></footer></div>;
}

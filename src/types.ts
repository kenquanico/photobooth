export type Page = 'home' | 'layouts' | 'camera' | 'editor' | 'pair';
export type FilterName = 'none' | 'warm' | 'vintage' | 'mono' | 'cinematic' | 'grainy' | 'cool' | 'fade';
export type FrameStyle = 'solid'|'blush-grid'|'gingham'|'checker'|'disco'|'cow'|'leopard'|'waves'|'denim'|'floral'|'night'|'sparkle'|'aurora-blue'|'molten-red'|'golden-brush'|'espresso-silk'|'forest-light'|'violet-satin'|'silver-flow'|'ember-chrome'|'dream-flora'|'cosmic-violet'|'ethereal-aura'|'arctic-monkeys'|'1989'|'portrait-noir'|'ocean-blue'|'fearless-tv'|'blonde'|'silk-sonic'|'after-hours'|'1975-self-titled'|'reputation'|'the-1975'|'folklore';
export type PhotoShape = 'square'|'rounded'|'circle'|'heart'|'arch';
export type FrameEffect = 'natural'|'vivid'|'mono'|'vintage'|'midnight'|'soft';
export type DecorationZone = 'top-left'|'top-center'|'top-right'|'bottom-left'|'bottom-center'|'bottom-right';
export interface DecorationPlacement { zone:DecorationZone; scale:number; rotation:number; }
export interface BoothLayout { id:string; name:string; short:string; poses:number; width:number; height:number; kind:'strip'|'grid'|'single'; description:string; }
export interface BoothSettings { frame:string; background:string; gap:number; caption:string; countdown:3|5|10; frameStyle?:FrameStyle; frameEffect?:FrameEffect; photoFilter?:FilterName; photoShape?:PhotoShape; layoutLocked?:boolean; sticker?:string; stickers?:string[]; decorationPlacements?:Record<string,DecorationPlacement>; titleText?:string; footerText?:string; dateText?:string; textColor?:string; fontStyle?:'script'|'editorial'|'clean'|'signature'|'fashion'; }
export interface CropState { zoom:number; x:number; y:number; brightness:number; contrast:number; filter:FilterName; }

import{o as m,p as y,q as f,t as x,r as i,_ as g,n as t,M as S,L as w,O as j,S as k,v as M}from"./components-Dcz7_8s9.js";/**
 * @remix-run/react v2.16.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function O({getKey:o,...l}){let{isSpaMode:c}=m(),r=y(),p=f();x({getKey:o,storageKey:a});let h=i.useMemo(()=>{if(!o)return null;let e=o(r,p);return e!==r.key?e:null},[]);if(c)return null;let u=((e,d)=>{if(!window.history.state||!window.history.state.key){let s=Math.random().toString(32).slice(2);window.history.replaceState({key:s},"")}try{let n=JSON.parse(sessionStorage.getItem(e)||"{}")[d||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(s){console.error(s),sessionStorage.removeItem(e)}}).toString();return i.createElement("script",g({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${u})(${JSON.stringify(a)}, ${JSON.stringify(h)})`}}))}const L=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"}];function R(){return t.jsxs("html",{lang:"en",children:[t.jsxs("head",{children:[t.jsx("meta",{charSet:"utf-8"}),t.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),t.jsx(S,{}),t.jsx(w,{})]}),t.jsxs("body",{children:[t.jsx(j,{}),t.jsx(O,{}),t.jsx(k,{}),t.jsx(M,{})]})]})}export{R as default,L as links};

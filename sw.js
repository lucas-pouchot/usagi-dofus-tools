if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let t={};const o=e=>i(e,l),c={module:{uri:l},exports:t,require:o};s[l]=Promise.all(r.map((e=>c[e]||o(e)))).then((e=>(n(...e),t)))}}define(["./workbox-ab24e45d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/404-20c057c8.js",revision:null},{url:"assets/404-6beba7f1.js",revision:null},{url:"assets/auto-ba5ecab5.js",revision:null},{url:"assets/index-60e82dc3.js",revision:null},{url:"assets/index-907b76ec.css",revision:null},{url:"assets/virtual_pwa-register-3d874fea.js",revision:null},{url:"assets/workbox-window.prod.es5-dc90f814.js",revision:null},{url:"index.html",revision:"941796f0f6e9fd4ece638f656a2cc0c5"},{url:"theme/dark.css",revision:"4dc52aaf8648e3925d9a870022fcb931"},{url:"theme/light.css",revision:"9929cc5d0f50423312fcbde493444fd5"},{url:"favicon.svg",revision:"2ad437d90e863668eef3b94561ed627c"},{url:"safari-pinned-tab.svg",revision:"2ad437d90e863668eef3b94561ed627c"},{url:"manifest.webmanifest",revision:"1e1bd40ccbf23d3900df5547db2c98ce"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));

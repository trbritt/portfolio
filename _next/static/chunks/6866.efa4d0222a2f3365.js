"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6866],{6866:function(e,t,r){r.d(t,{upload:function(){return u}});var n=r(7946),i=r(12305),a=r(24197),o=r(87214);function f(e){return globalThis.File&&e instanceof File}function l(e){return!!(e&&(0,a.L)(e,["data","name"]))&&!!("string"==typeof e.name&&("string"==typeof e.data||(0,o.lq)(e.data)))}function s(e){return f(e)||(0,o.lq)(e)||l(e)}async function u(e){let t;if(0===e.files.length)return null;if(e.files.map(e=>s(e)||"string"==typeof e).every(e=>!!e))t=e.files;else{let r=e.files,n=function e(t,r=[]){if(s(t))return r.push(t),r;if("object"==typeof t){if(!t)return r;if(Array.isArray(t))for(let n of t)e(n,r);else Object.keys(t).map(n=>e(t[n],r))}return r}(r=function e(t){return"string"==typeof t?function(e){if(e.includes("/ipfs/")){let t=e.split("/ipfs/")[1];return`ipfs://${t}`}return e}(t):"object"==typeof t?!t||s(t)?t:Array.isArray(t)?t.map(t=>e(t)):Object.fromEntries(Object.entries(t).map(([t,r])=>[t,e(r)])):t}(r));if(n.length){let t=await u({...e,files:n});r=function e(t,r){if(s(t)){if(r.length)return r.shift();console.warn("Not enough URIs to replace all files in object.")}return"object"==typeof t&&t?Array.isArray(t)?t.map(t=>e(t,r)):Object.fromEntries(Object.entries(t).map(([t,n])=>[t,e(n,r)])):t}(r,Array.isArray(t)?t:[t])}t=r.map(e=>"string"==typeof e?e:(0,i.P)(e))}let{fileNames:a,form:c}=function(e,t,r){let n=new Map,i=[];for(let a=0;a<t.length;a++){let s=t[a],u="",c=s;if(f(s)){if(r?.rewriteFileNames){let e="";if(s.name){let t=s.name.lastIndexOf(".");t>-1&&(e=s.name.substring(t))}u=`${a+r.rewriteFileNames.fileStartNumber}${e}`}else u=`${s.name}`}else l(s)?(c=s.data,u=r?.rewriteFileNames?`${a+r.rewriteFileNames.fileStartNumber}`:`${s.name}`):u=r?.rewriteFileNames?`${a+r.rewriteFileNames.fileStartNumber}`:`${a}`;let p=r?.uploadWithoutDirectory?"files":`files/${u}`;if(n.has(u)){if(function(e,t){if(f(e)&&f(t)){if(e.name===t.name&&e.lastModified===t.lastModified&&e.size===t.size)return!0}else if((0,o.lq)(e)&&(0,o.lq)(t))return(0,o.AY)(e,t);else if(l(e)&&l(t)&&e.name===t.name){if("string"==typeof e.data&&"string"==typeof t.data)return e.data===t.data;if((0,o.lq)(e.data)&&(0,o.lq)(t.data))return(0,o.AY)(e.data,t.data)}return!1}(n.get(u),s)){i.push(u);continue}throw Error(`[DUPLICATE_FILE_NAME_ERROR] File name ${u} was passed for more than one different file.`)}n.set(u,s),i.push(u),e.append("file",new Blob([c]),p)}let a={name:"Storage SDK",keyvalues:{...r?.metadata}};return e.append("pinataMetadata",JSON.stringify(a)),r?.uploadWithoutDirectory&&e.append("pinataOptions",JSON.stringify({wrapWithDirectory:!1})),{form:e,fileNames:i.map(e=>encodeURIComponent(e))}}(new FormData,t,e),p=(0,n.t)();if("browser"===p||"node"===p){let{uploadBatch:t}=await r.e(49422).then(r.bind(r,49422)),n=await t(e.client,c,a,e);return 1===e.files.length?n[0]:n}throw Error("Please, use the uploadMobile function in mobile environments.")}},87214:function(e,t,r){let n;function i(e){if(!a(e))throw TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``)}function a(e){return!!e&&(e.constructor===Uint8Array||"[object Uint8Array]"===Object.prototype.toString.call(e))}function o(e,t){if(i(e),i(t),e===t)return!0;if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}function f(e){if("string"!=typeof e)throw TypeError(`Expected \`string\`, got \`${typeof e}\``)}function l(e){var t;return f(e),i((f(e),t=Uint8Array.from(globalThis.atob(e.replaceAll("-","+").replaceAll("_","/")),e=>e.codePointAt(0)))),(n||(n=new TextDecoder),n).decode(t)}r.d(t,{AY:function(){return o},Vy:function(){return l},lq:function(){return a}})}}]);
"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[53947],{14226:function(e,t,n){n.d(t,{y:function(){return q},k:function(){return A}});var o=n(57437),a=n(80077),i=n(2265),r=n(23522),l=n(83602),s=n(88737),d=n(94919),c=n(32019),h=n(46290),u=n(97533),m=n(34650),g=n(96974),p=n(43384),x=n(24037),f=n(72413),y=n(15934),w=n(81757),b=n(51233),j=n(75080),k=n(69394),v=n(94521),C=n(42008),S=n(94152),E=n(90692);function W({countryCode:e,setCountryCode:t}){let a=(0,i.useRef)(null),{data:r}=(0,S.useQuery)({queryKey:["supported-sms-countries"],queryFn:async()=>{let{supportedSmsCountries:e}=await n.e(88964).then(n.bind(n,88964));return e}});return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)($,{ref:a,name:"countries",id:"countries",value:e,onChange:e=>{t(e.target.value)},style:{paddingLeft:s.W0.md,paddingRight:"0"},children:[(0,o.jsx)(I,{style:{display:"none"},value:e,children:e}),(r??[{countryIsoCode:"US",countryName:"United States",phoneNumberCode:1}]).map(e=>(0,o.jsxs)(I,{value:`${e.countryIsoCode} +${e.phoneNumberCode}`,children:[e.countryName," +",e.phoneNumberCode," "]},e.countryIsoCode))]})})}let I=(0,E.o3)(()=>{let e=(0,l.useCustomTheme)();return{color:e.colors.primaryText,background:e.colors.modalBg,transition:"background 0.3s ease","&:hover":{background:e.colors.tertiaryBg}}}),$=(0,E.Qr)(()=>{let e=(0,l.useCustomTheme)();return{fontSize:s.JB.sm,display:"block",padding:s.W0.sm,boxSizing:"border-box",outline:"none",border:"none",borderRadius:s.q0.lg,color:e.colors.primaryText,WebkitAppearance:"none",appearance:"none",cursor:"pointer",background:"transparent","&::placeholder":{color:e.colors.secondaryText},"&[disabled]":{cursor:"not-allowed"},minWidth:"0px",maxWidth:"90px",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}});function L(e){let[t,n]=(0,i.useState)("US +1"),[a,r]=(0,i.useState)(""),[l,d]=(0,i.useState)(),[c,h]=(0,i.useState)(!1),u=()=>{h(!0),a&&!l&&e.onSelect("phone"===e.format?`+${t.split("+")[1]}${a}`:a)},m=c&&!!l||!a&&!!e.emptyErrorMessage&&c;return(0,o.jsxs)("div",{style:{width:"100%"},children:[(0,o.jsxs)(v.InputContainer,{style:{position:"relative",display:"flex",flexDirection:"row"},"data-error":m,children:["phone"===e.format&&(0,o.jsx)(W,{countryCode:t,setCountryCode:n}),(0,o.jsx)(v.Input,{tabIndex:-1,placeholder:e.placeholder,style:{flexGrow:1,padding:`${s.W0.md} ${"phone"===e.format?0:s.W0.md}`},variant:"transparent",type:e.type,name:e.name,value:a,onChange:t=>{r(t.target.value),e.errorMessage?d(e.errorMessage(t.target.value)):d(void 0)},onKeyDown:e=>{"Enter"===e.key&&u()}}),(0,o.jsx)(b.IconButton,{onClick:u,style:{padding:s.W0.md,borderRadius:`0 ${s.q0.lg} ${s.q0.lg} 0`},children:(0,o.jsx)(k.LZ3,{width:s.EA.md,height:s.EA.md})})]}),c&&l&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(f.L,{y:"xs"}),(0,o.jsx)(C.Text,{color:"danger",size:"sm",children:l})]}),!(c&&l)&&!a&&e.emptyErrorMessage&&c&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(f.L,{y:"xs"}),(0,o.jsx)(C.Text,{color:"danger",size:"sm",children:e.emptyErrorMessage})]})]})}var B=n(99941),T=n(84996);let F={google:T.Yh,apple:T.G8,facebook:T.L6};var M=n(32281);let P=["email","phone","google","apple","facebook","passkey"],q=e=>{let t=e.locale,{chain:n,client:a,connectModal:h}=(0,d.Z)(),{wallet:u}=e,m=(0,c.useSetSelectionData)(),f=(0,l.useCustomTheme)(),b={google:t.signInWithGoogle,facebook:t.signInWithFacebook,apple:t.signInWithApple},j=e.wallet.getConfig(),k=j?.auth?.options||P,v=k.includes("passkey"),C=k.indexOf("email"),S=-1!==C,E=k.indexOf("phone"),W=-1!==E,[I,$]=(0,i.useState)(()=>S&&W?C<E?"email":"phone":S?"email":W?"phone":"none"),T="email"===I?t.emailPlaceholder:t.phonePlaceholder,q="email"===I?t.emailRequired:t.phoneRequired,A="text";"email"===I?A="email":"phone"===I&&(A="tel");let U=k.filter(e=>"google"===e||"apple"===e||"facebook"===e),_=U.length>0,H=async t=>{try{let o=(0,B.P)(t,f);if(!o)throw Error("Failed to open login window");let i=u.connect({chain:n,client:a,strategy:t,openedWindow:o,closeOpenedWindow:e=>{e.close()}});await (0,M.F)(t,r.x),m({socialLogin:{type:t,connectionPromise:i}}),e.select()}catch(e){console.error(`Error sign in with ${t}`,e)}},z=U.length>1;return!j?.metadata?.image||j.metadata.image.height&&j.metadata.image.width||console.warn("Image is not properly configured. Please set height and width.",j.metadata.image),(0,o.jsxs)(w.Container,{flex:"column",gap:"md",style:{position:"relative"},children:[j?.metadata?.image&&(0,o.jsx)(w.Container,{flex:"row",center:"both",children:(0,o.jsx)(x.Img,{loading:"eager",client:a,style:{maxHeight:"100px",maxWidth:"300px"},src:j.metadata.image.src,alt:j.metadata.image.alt,width:Math.min(j.metadata.image.width??300,300)?.toString(),height:Math.min(j.metadata.image.height??100,100)?.toString()})}),_&&(0,o.jsx)(w.Container,{flex:z?"row":"column",center:"x",gap:"sm",style:{justifyContent:"space-between"},children:U.map(e=>{let t=z?s.EA.lg:s.EA.md;return(0,o.jsxs)(O,{"aria-label":`Login with ${e}`,"data-variant":z?"icon":"full",variant:"outline",fullWidth:!z,onClick:()=>{H(e)},children:[(0,o.jsx)(x.Img,{src:F[e],width:t,height:t,client:a}),!z&&b[e]]},e)})}),"wide"===h.size&&_&&(S||W)&&(0,o.jsx)(y.B,{text:t.or}),S&&(0,o.jsx)(o.Fragment,{children:"email"===I?(0,o.jsx)(L,{type:A,onSelect:t=>{m({emailLogin:t}),e.select()},placeholder:T,name:"email",errorMessage:e=>{var n;if(n=e.toLowerCase(),!/^\S+@\S+\.\S+$/.test(n.replace(/\+/g,"")))return t.invalidEmail},emptyErrorMessage:q,submitButtonText:t.submitEmail}):(0,o.jsx)(g._,{client:a,icon:p.J2,onClick:()=>{$("email")},title:"Email address"})}),W&&(0,o.jsx)(o.Fragment,{children:"phone"===I?(0,o.jsx)(L,{format:"phone",type:A,onSelect:t=>{m({phoneLogin:t.replace(/[-\(\) ]/g,"")}),e.select()},placeholder:T,name:"phone",errorMessage:e=>{let n=e.replace(/[-\(\) ]/g,"");if(!/^[0-9]+$/.test(n)&&W)return t.invalidPhone},emptyErrorMessage:q,submitButtonText:t.submitEmail}):(0,o.jsx)(g._,{client:a,icon:p.T0,onClick:()=>{$("phone")},title:"Phone number"})}),v&&(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(g._,{client:a,icon:p.jH,onClick:()=>{m({passkeyLogin:!0}),e.select()},title:"Passkey"})})]})};function A(e){let t=e.locale.emailLoginScreen,{connectModal:n,client:a}=(0,d.Z)(),i="compact"===n.size,{initialScreen:r,screen:l}=(0,u.q7)(),c=l===e.wallet&&r===e.wallet?void 0:e.goBack;return(0,o.jsxs)(w.Container,{fullHeight:!0,flex:"column",p:"lg",animate:"fadein",style:{minHeight:"250px"},children:[i?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(w.ModalHeader,{onBack:c,title:(0,o.jsxs)(o.Fragment,{children:[n.titleIcon?(0,o.jsx)(x.Img,{src:n.titleIcon,width:s.EA.md,height:s.EA.md,client:a}):null,(0,o.jsx)(j.r,{children:n.title??t.title})]})}),(0,o.jsx)(f.L,{y:"lg"})]}):null,(0,o.jsx)(w.Container,{expand:!0,flex:"column",center:"y",p:i?void 0:"lg",children:(0,o.jsx)(q,{...e})}),i&&(!1!==n.showThirdwebBranding||n.termsOfServiceUrl||n.privacyPolicyUrl)&&(0,o.jsx)(f.L,{y:"xl"}),(0,o.jsxs)(w.Container,{flex:"column",gap:"lg",children:[(0,o.jsx)(h.O,{termsOfServiceUrl:n.termsOfServiceUrl,privacyPolicyUrl:n.privacyPolicyUrl}),!1!==n.showThirdwebBranding&&(0,o.jsx)(m.a,{})]})]})}let O=(0,a.Z)(b.Button)({"&[data-variant='full']":{display:"flex",justifyContent:"flex-start",padding:s.W0.md,gap:s.W0.md,fontSize:s.JB.md,fontWeight:500,transition:"background-color 0.2s ease","&:active":{boxShadow:"none"}},"&[data-variant='icon']":{padding:s.W0.sm,flexGrow:1}})},99941:function(e,t,n){function o(e,t){let{height:n,width:o}="facebook"===e?{width:715,height:555}:{width:350,height:500},i=(window.innerHeight-n)/2,r=(window.innerWidth-o)/2,l=window.open("",void 0,`width=${o}, height=${n}, top=${i}, left=${r}`);if(l){let n="google"===e?"Sign In - Google Accounts":`Sign In - ${e.slice(0,1).toUpperCase()}${e.slice(1)}`;l.document.title=n,l.document.body.innerHTML=a,l.document.body.style.background=t.colors.modalBg,l.document.body.style.color=t.colors.accentText}return l&&window.addEventListener("beforeunload",()=>{l?.close()}),l}n.d(t,{P:function(){return o}});let a=`
<svg class="loader" viewBox="0 0 50 50">
  <circle
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke="currentColor"
    stroke-width="4"
  />
</svg>

<style>
  body,
  html {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader {
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }

  .loader circle {
    animation: loading 1.5s linear infinite;
  }

  @keyframes loading {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
`},2052:function(e,t,n){n.d(t,{u:function(){return r}});var o=n(94152),a=n(94919);async function i(e){switch(e){case"es_ES":return(await n.e(34824).then(n.bind(n,34824))).default;case"ja_JP":return(await n.e(39356).then(n.bind(n,39356))).default;case"tl_PH":return(await n.e(38313).then(n.bind(n,38313))).default;default:return(await n.e(13368).then(n.bind(n,13368))).default}}function r(){let e=(0,a.Z)().locale;return(0,o.useQuery)({queryKey:["inAppWalletLocale",e],queryFn:()=>i(e),refetchOnMount:!1,refetchOnWindowFocus:!1})}}}]);
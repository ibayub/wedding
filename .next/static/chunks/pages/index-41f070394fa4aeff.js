(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(578)}])},578:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return h}});var s=n(5893),r=n(7294);let l=e=>{let{children:t,...n}=e;return(0,s.jsx)("button",{...n,className:"bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",children:t})},a=e=>(0,s.jsx)("input",{...e,className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}),c=e=>{let{children:t,...n}=e;return(0,s.jsx)("label",{...n,className:"block text-gray-700 text-sm font-bold mb-2",children:t})},o=e=>{let{children:t,className:n,...r}=e;return(0,s.jsx)("div",{className:"rounded overflow-hidden shadow-lg bg-white p-6 ".concat(n),...r,children:t})},i=e=>{let{children:t,className:n,...r}=e;return(0,s.jsx)("div",{className:"font-bold text-xl mb-4 ".concat(n),...r,children:t})},d=e=>{let{children:t,className:n,...r}=e;return(0,s.jsx)("h2",{className:"text-2xl font-bold mb-4 ".concat(n),...r,children:t})},u=e=>{let{children:t,className:n,...r}=e;return(0,s.jsx)("div",{className:"text-gray-700 text-base ".concat(n),...r,children:t})},m=e=>{let{children:t,className:n,...r}=e;return(0,s.jsx)("div",{className:"mt-4 ".concat(n),...r,children:t})};function h(){let[e,t]=(0,r.useState)(""),[n,h]=(0,r.useState)(null),[x,b]=(0,r.useState)([]),[f,g]=(0,r.useState)([]),[p,N]=(0,r.useState)(!1),[j,w]=(0,r.useState)(null);(0,r.useEffect)(()=>{!async function(){try{let e=await fetch("/api/getNames"),t=await e.json();console.log("Fetched names:",t.names),b(t.names||[])}catch(e){console.error("Error fetching names:",e)}}()},[]);let y=async t=>{if(t.preventDefault(),""===e.trim()){h(null);return}N(!0),w(null);try{let t=await fetch("/api/getTableNumber?name=".concat(encodeURIComponent(e))),n=await t.json();t.ok?h(n.tableNumber):w(n.message||"An error occurred while fetching your table number.")}catch(e){console.error("Error fetching table number:",e),w("An error occurred while fetching your table number. Please try again.")}finally{N(!1)}},v=e=>{t(e),g([])};return(0,s.jsx)("div",{className:"min-h-screen bg-cover bg-center bg-custom-image flex items-center justify-center p-4",children:(0,s.jsxs)(o,{className:"w-full max-w-md",children:[(0,s.jsx)(i,{children:(0,s.jsx)(d,{className:"text-2xl font-bold text-center",children:"Neishay & Hussain Wedding"})}),(0,s.jsxs)(u,{className:"space-y-6",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h2",{className:"text-xl font-semibold mb-4 text-center",children:"Find my Table"}),(0,s.jsxs)("form",{onSubmit:y,className:"space-y-4",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(c,{htmlFor:"name",children:"Your Name"}),(0,s.jsx)(a,{id:"name",type:"text",placeholder:"Enter your name",value:e,onChange:e=>{let n=e.target.value;t(n),n.length>=3&&x.length>0?g(x.filter(e=>e.toLowerCase().startsWith(n.toLowerCase()))):g([]),h(null),w(null)},disabled:p,autoComplete:"off"}),f.length>0&&(0,s.jsx)("ul",{className:"border rounded bg-white max-h-40 overflow-y-auto",children:f.map((e,t)=>(0,s.jsx)("li",{onClick:()=>v(e),className:"p-2 hover:bg-gray-200 cursor-pointer",children:e},t))})]}),(0,s.jsx)(l,{type:"submit",className:"w-full",disabled:p,children:p?"Finding Table...":"Find Table"})]})]}),n&&(0,s.jsxs)("div",{className:"text-center p-4 bg-green-100 rounded-md",children:[(0,s.jsxs)("p",{className:"font-semibold",children:["Welcome, ",e,"!"]}),(0,s.jsxs)("p",{className:"text-sm text-gray-700",children:["Your table number is: ",n]})]}),j&&(0,s.jsx)("div",{className:"text-center p-4 bg-red-100 rounded-md",children:(0,s.jsx)("p",{className:"text-sm text-red-700",children:j})})]}),(0,s.jsx)(m,{className:"text-center text-sm text-gray-500",children:"Share your wedding memories"})]})})}}},function(e){e.O(0,[888,774,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);
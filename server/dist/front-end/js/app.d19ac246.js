(function(e){function t(t){for(var r,o,a=t[0],s=t[1],l=t[2],u=0,d=[];u<a.length;u++)o=a[u],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&d.push(c[o][0]),c[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var a=n[o];0!==c[a]&&(r=!1)}r&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},o={app:0},c={app:0},i=[];function a(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-28367830":"51086b9c","chunk-2d0b6cf7":"244e9e78","chunk-2d222784":"55bd17df","chunk-31c7f380":"0a34d3cf","chunk-52f3b991":"5aa2a96f","chunk-77cc5688":"053ae96c","chunk-cd1d39a0":"341af052"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-28367830":1,"chunk-31c7f380":1,"chunk-52f3b991":1,"chunk-77cc5688":1,"chunk-cd1d39a0":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-28367830":"ef055a2b","chunk-2d0b6cf7":"31d6cfe0","chunk-2d222784":"31d6cfe0","chunk-31c7f380":"66877c7b","chunk-52f3b991":"62962427","chunk-77cc5688":"d02ca4c0","chunk-cd1d39a0":"3cde90d6"}[e]+".css",c=s.p+r,i=document.getElementsByTagName("link"),a=0;a<i.length;a++){var l=i[a],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===r||u===c))return t()}var d=document.getElementsByTagName("style");for(a=0;a<d.length;a++){l=d[a],u=l.getAttribute("data-href");if(u===r||u===c)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||c,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],f.parentNode.removeChild(f),n(i)},f.href=c;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){o[e]=0})));var r=c[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=c[e]=[t,n]}));t.push(r[2]=i);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=a(e);var d=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(f);var n=c[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}c[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var f=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"3fe5":function(e,t,n){"use strict";var r=n("f5cb"),o=n.n(r);o.a},adc5:function(e,t,n){e.exports=n.p+"img/smallogo.9323bd9d.svg"},b00b:function(e,t,n){e.exports=n.p+"img/largelogo.a552ecd0.svg"},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"app-main"},[n("navbar"),n("router-view"),n("qrfooter")],1)},c=[],i=(n("a4d3"),n("4de4"),n("e439"),n("dbb4"),n("b64b"),n("159b"),n("ade3")),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"navbar-con"},[r("transition",{attrs:{name:"fade",mode:"in-out"}},["home"===e.$route.name||e.scrolledTop?r("div",{staticClass:"navbar-left"},[r("div",{staticClass:"logo-con",on:{click:e.routehome}},[r("img",{attrs:{src:n("adc5")}})])]):e._e()]),r("div",{staticClass:"spacer"}),r("div",{staticClass:"hamburger",on:{click:e.togglecanvas}},[r("div",{staticClass:"line"}),r("div",{staticClass:"line"}),r("div",{staticClass:"line"})]),e.canvasopen?r("div",{staticClass:"canvas-nav"},[r("div",{staticClass:"canvas-text-con"},[r("div",{staticClass:"big-x",on:{click:e.togglecanvas}},[r("div",{staticClass:"line"}),r("div",{staticClass:"line"})]),r("div",{staticClass:"canvas-item",on:{click:e.togglecanvas}},[r("router-link",{attrs:{to:{path:"/"}}},[e._v("home")])],1),r("div",{staticClass:"canvas-item",on:{click:e.togglecanvas}},[r("router-link",{attrs:{to:{path:"/pricing"}}},[e._v("pricing")])],1),r("div",{staticClass:"canvas-item",on:{click:e.togglecanvas}},[r("router-link",{attrs:{to:{path:"/create"}}},[e._v("Try For Free")])],1)])]):e._e()],1)},s=[],l=n("2f62");function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){Object(i["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var f,p={name:"navbar",data:function(){return{canvasopen:!1,scrolledTop:!0}},methods:{togglecanvas:function(){this.canvasopen=!this.canvasopen},routehome:function(){this.$router.push({path:"/"})}},computed:d({},Object(l["b"])(["scrollY"])),watch:{scrollY:function(e){this.scrolledTop=e<90}}},h=p,v=(n("d4f0"),n("2877")),m=Object(v["a"])(h,a,s,!1,null,"a40814e6",null),b=m.exports,g=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},w=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("footer",{staticClass:"qr-footer"},[r("figure",{staticClass:"logo-container"},[r("img",{attrs:{src:n("b00b"),alt:"Welcome QR logo",width:"100%"}})]),r("div",{staticClass:"tilde-spacer"},[e._v("~")]),r("div",{staticClass:"text-container"},[r("h4",{staticClass:"h4"},[e._v("Welcome QR Codes")])]),r("div",{staticClass:"tilde-spacer"},[e._v("~")]),r("div",{staticClass:"text-container sub"},[r("h4",{staticClass:"h4"},[e._v("Be modern")])])])}],O={name:"qrfooter"},y=O,C=(n("3fe5"),Object(v["a"])(y,g,w,!1,null,"5ac7f5e0",null)),k=C.exports,_=arguments,E=void 0,j=function(e,t){var n,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return function(){var o=E,c=_,i=function(){n=null,r||e.apply(o,c)},a=r&&!n;clearTimeout(n),n=setTimeout(i,t),a&&e.apply(o,c)}},S=j;function T(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?T(Object(n),!0).forEach((function(t){Object(i["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):T(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var x={name:"app",components:{navbar:b,qrfooter:k},mounted:function(){f=this,window.addEventListener("resize",S(this.sizeChange,500)),window.addEventListener("scroll",S(this.scrollChange,100))},methods:P({},Object(l["c"])(["SET_WINDOW_SIZE","SET_SCROLL_LOCATION"]),{sizeChange:function(){f.SET_WINDOW_SIZE()},scrollChange:function(){f.SET_SCROLL_LOCATION()}})},N=x,L=Object(v["a"])(N,o,c,!1,null,null,null),W=L.exports,D=n("9483");Object(D["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n("d3b7");var A=n("8c4f"),I=(n("e01a"),n("b0c0"),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0,n=document.getElementById("__meta_description"),r=document.getElementsByTagName("title")[0];if(e)if(r.text=e.title,n.content=e.description,e.noindex){var o=document.createElement("meta");o.name="robots",o.content="noindex",document.getElementsByTagName("head")[0].appendChild(o)}else try{for(var c=document.getElementsByTagName("meta"),i=0;i<c.length;i+=1)c[i]&&c[i].parentNode&&"robots"===c[i].name&&c[i].parentNode.removeChild(c[i])}catch(a){t&&t()}return!!t&&t()}),R=I,B=function(){return n.e("chunk-cd1d39a0").then(n.bind(null,"6511"))},H=function(){return n.e("chunk-31c7f380").then(n.bind(null,"b7d4"))},q=function(){return n.e("chunk-28367830").then(n.bind(null,"2b73"))},Q=function(){return n.e("chunk-52f3b991").then(n.bind(null,"c34d"))},Y=function(){return n.e("chunk-2d222784").then(n.bind(null,"cf6a"))},$=function(){return n.e("chunk-77cc5688").then(n.bind(null,"9daa"))},F=function(){return n.e("chunk-2d0b6cf7").then(n.bind(null,"1f6b"))};r["a"].use(A["a"]);var U=[{path:"/",name:"home",component:B,beforeEnter:function(e,t,n){R({title:"Welcome QR | Description",description:"Brief description of how the product functions. Feature list, \n        benefits, small explanation of pricing and other info",noindex:!0},n)}},{path:"/pricing",name:"pricing",component:$,beforeEnter:function(e,t,n){R({title:"Welcome QR | Pricing",description:"Breif description of how Welcome QR Codes is priced, what \n        different plans and tiers are offered and the services included in each tier and plan.",noindex:!0},n)}},{path:"/create",name:"create",component:H,redirect:"/create/details",beforeEnter:function(e,t,n){R({title:"Welcome QR | Create New QR",description:"Where the magic happens, create a new dowmloadable QR code and \n        associate website and content",noindex:!0},n)},children:[{path:"/create/details",name:"qrdetails",component:Q},{path:"/create/editor",name:"editor",component:q},{path:"/create/preview",name:"preview",component:Y}]},{path:"*",name:"notfound",component:F,beforeEnter:function(e,t,n){R({title:"",description:"",noindex:!0},n)}}],M=new A["a"]({mode:"history",base:"/",routes:U}),z=M,Z={windowWidth:0,windowHeight:0,scrollY:0,isauthed:!1},J=Z,G={windowWidth:function(e){return e.windowWidth},windowHeight:function(e){return e.windowHeight},scrollY:function(e){return e.scrollY},isauthed:function(e){return e.isauthed}},K=G,V={IS_AUTHED:function(e,t){e.isauthed=t},SET_WINDOW_SIZE:function(e){e.windowWidth=window.innerWidth,e.windowHeight=window.innerHeight},SET_SCROLL_LOCATION:function(e){e.scrollY=window.scrollY}},X=V,ee=n("bc3a"),te=n.n(ee);te.a.defaults.withCredentials=!0;var ne=window.location.origin,re=te.a.create({baseURL:ne,withCredentials:!0}),oe=re,ce={SESSION_CHALLENGE:function(e){var t=e.commit;oe.get("/user/session_challenge").then((function(){t("IS_AUTHED",!0)})).catch((function(){t("IS_AUTHED",!1)}))}},ie=ce;r["a"].use(l["a"]);var ae=new l["a"].Store({state:J,actions:ie,getters:K,mutations:X});r["a"].config.productionTip=!1,new r["a"]({router:z,store:ae,render:function(e){return e(W)}}).$mount("#app")},d4f0:function(e,t,n){"use strict";var r=n("de89"),o=n.n(r);o.a},de89:function(e,t,n){},f5cb:function(e,t,n){}});
//# sourceMappingURL=app.d19ac246.js.map
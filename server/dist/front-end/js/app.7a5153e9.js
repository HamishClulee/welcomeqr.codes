(function(e){function t(t){for(var o,a,c=t[0],s=t[1],u=t[2],l=0,d=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&d.push(r[a][0]),r[a]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);h&&h(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,a=1;a<n.length;a++){var c=n[a];0!==r[c]&&(o=!1)}o&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},a={app:0},r={app:0},i=[];function c(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-09c83dce":"c10952e5","chunk-09e35f85":"2d09a5b5","chunk-0b02b394":"86c2673d","chunk-0bfa44e3":"57005b56","chunk-1aba49fc":"14d2f661","chunk-1dd17d68":"e4586338","chunk-21675810":"5cbdb3a3","chunk-253ebe8d":"bd9a7be4","chunk-2bd86bec":"42763188","chunk-2d0e97b4":"22ff255d","chunk-1323e223":"6772b435","chunk-4e26cf50":"adc6b595","chunk-bbfe1080":"328a1c0e","chunk-2d2288b7":"0b41ffac","chunk-31caa9cc":"9be826b1","chunk-356ebd1e":"dde0cd0c","chunk-40ca2e98":"143c79c9","chunk-4d324e47":"5839cf58","chunk-59ad979e":"60722cd4","chunk-cc4e0498":"28af79d9","chunk-d5432414":"0e84909f","chunk-e1ee1db0":"eb8cd0a4"}[e]+".js"}function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-09c83dce":1,"chunk-09e35f85":1,"chunk-0b02b394":1,"chunk-0bfa44e3":1,"chunk-1aba49fc":1,"chunk-1dd17d68":1,"chunk-21675810":1,"chunk-253ebe8d":1,"chunk-2bd86bec":1,"chunk-1323e223":1,"chunk-4e26cf50":1,"chunk-bbfe1080":1,"chunk-356ebd1e":1,"chunk-40ca2e98":1,"chunk-4d324e47":1,"chunk-59ad979e":1,"chunk-cc4e0498":1,"chunk-d5432414":1,"chunk-e1ee1db0":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var o="css/"+({}[e]||e)+"."+{"chunk-09c83dce":"39be2402","chunk-09e35f85":"a3b5e553","chunk-0b02b394":"a8a23fab","chunk-0bfa44e3":"98176866","chunk-1aba49fc":"e2c94107","chunk-1dd17d68":"c3f7fb20","chunk-21675810":"e81def40","chunk-253ebe8d":"8132ba66","chunk-2bd86bec":"7bd313f7","chunk-2d0e97b4":"31d6cfe0","chunk-1323e223":"015147eb","chunk-4e26cf50":"fd6c3e6d","chunk-bbfe1080":"5dbee762","chunk-2d2288b7":"31d6cfe0","chunk-31caa9cc":"31d6cfe0","chunk-356ebd1e":"a50948e0","chunk-40ca2e98":"5facd3b9","chunk-4d324e47":"2313e988","chunk-59ad979e":"1b67fb00","chunk-cc4e0498":"6fc5e57b","chunk-d5432414":"491aa389","chunk-e1ee1db0":"1e6b69dd"}[e]+".css",r=s.p+o,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var u=i[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===o||l===r))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){u=d[c],l=u.getAttribute("data-href");if(l===o||l===r)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var o=t&&t.target&&t.target.src||r,i=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=o,delete a[e],h.parentNode.removeChild(h),n(i)},h.href=r;var f=document.getElementsByTagName("head")[0];f.appendChild(h)})).then((function(){a[e]=0})));var o=r[e];if(0!==o)if(o)t.push(o[2]);else{var i=new Promise((function(t,n){o=r[e]=[t,n]}));t.push(o[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=c(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(h);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+o+": "+a+")",d.name="ChunkLoadError",d.type=o,d.request=a,n[1](d)}r[e]=void 0}};var h=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var h=l;i.push(["7f78","chunk-vendors"]),n()})({"0c6b":function(e,t,n){},"19b8":function(e,t,n){e.exports={primary:"#f57c00",secondary:"#009688",tertiary:"#f44336",highlight:"#f4a236",link:"#1976d2",font:"#212121",darkgray:"dimgray",mediumgray:"#a9a9a9","light-gray":"#d3d3d3",verylightgray:"#f4f4f4"}},3186:function(e,t,n){"use strict";var o=n("19b8"),a=n.n(o);a.a},"493d":function(e,t,n){"use strict";var o=n("98c1"),a=n.n(o);a.a},5914:function(e,t,n){},"6f34":function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return r}));var o=function(e){localStorage.setItem("QToken",e)},a=function(){localStorage.setItem("QToken","")},r=function(){return!!localStorage.getItem("QToken")&&""!==localStorage.getItem("QToken")}},"7f78":function(e,t,n){"use strict";n.r(t);n("e607");var o,a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"app-main"},[n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.showGlobalSpinner,expression:"showGlobalSpinner"}],staticClass:"global-spinner-con"},[n("loading")],1)]),n("transition-group",{attrs:{name:"fade",mode:"out-in"}},[[e.showsitemodal?n("sitemodal",e._b({key:1},"sitemodal",{contains:e.contains},!1)):e._e(),e.checkroute?n("navbar",{key:2}):e._e(),n("router-view",{key:3}),e.loadPushed&&e.showfooter?n("qrfooter",{key:4}):e._e()]],2),e.showUserMessage?n("usermessages",e._b({},"usermessages",{msg:e.msg,black:e.black,sass:e.sass},!1)):e._e(),e.windowWidth<620?n("sitemodal",{attrs:{contains:"smallscreen"}}):e._e()],1)},i=[],c=(n("c975"),n("b0c0"),n("d3b7"),n("ac1f"),n("3ca3"),n("841c"),n("ddb0"),n("2b3d"),n("5530")),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"navbar-con"},[n("transition",{attrs:{name:"fade",mode:"in-out"}},["home"===e.$route.name||e.scrolledTop?n("div",{staticClass:"navbar-left"},[n("div",{staticClass:"logo-con",on:{click:e.routehome}},[n("img",{attrs:{src:"/svg/smallogo.svg"}})])]):e._e()]),n("div",{staticClass:"spacer"}),e.isauthed?n("div",{staticClass:"account-active-indic",on:{click:e.togglecanvas}},[e._m(0),n("h6",{staticClass:"small-6"},[e._v("ACCOUNT")])]):e._e(),n("div",{staticClass:"hamburger",on:{click:e.togglecanvas}},[n("div",{staticClass:"line"}),n("div",{staticClass:"line"}),n("div",{staticClass:"line"})]),n("transition",{attrs:{name:"fade",mode:"in-out"}},[e.canvasopen?n("div",{staticClass:"canvas-nav"},[n("div",{staticClass:"canvas-text-con"},[n("div",{staticClass:"big-x",on:{click:e.togglecanvas}},[n("div",{staticClass:"line"}),n("div",{staticClass:"line"})]),n("div",{staticClass:"canvas-item",on:{click:e.togglecanvas}},[n("router-link",{attrs:{to:{path:"/"}}},[e._v("home")])],1),n("div",{staticClass:"canvas-item",on:{click:e.togglecanvas}},[n("router-link",{attrs:{to:{path:"/pricing"}}},[e._v("pricing")])],1),n("div",{staticClass:"canvas-item",on:{click:e.togglecanvas}},[n("router-link",{attrs:{to:{path:"/app"}}},[e._v(e._s(e.isauthed?"Your Websites":"Try For Free"))])],1),n("div",{staticClass:"canvas-item",on:{click:e.togglecanvas}},[n("router-link",{attrs:{to:{path:"/auth/login"}}},[e._v("Login / SignUp")])],1),e.isauthed?n("div",{staticClass:"account-settings"},[n("div",{staticClass:"canvas-item account",on:{click:e.togglecanvas}},[n("div",{staticClass:"avatar-icon"},[n("img",{attrs:{width:"40",src:"/svg/avatar.svg"}})]),n("router-link",{attrs:{to:{path:"/account"}}},[e._v("Account")])],1),n("div",{staticClass:"canvas-item account",on:{click:e.togglecanvas}},[n("button",{staticClass:"button",on:{click:e.logout}},[e._v("LOGOUT")])])]):e._e()])]):e._e()])],1)},u=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"avatar-icon"},[n("img",{attrs:{src:"/svg/avatar.svg"}})])}],l=n("2f62"),d=n("9109"),h={name:"navbar",data:function(){return{canvasopen:!1,scrolledTop:!0}},methods:{togglecanvas:function(){var e=this;setTimeout((function(){e.canvasopen=!e.canvasopen}),200)},routehome:function(){this.$router.push({path:"/"})},logout:function(){var e=this;this.$QAuth.logout().then((function(t){e.$store.commit("IS_AUTHED",t.data.user),d["c"].$emit(d["g"],d["f"]),"/"!==e.$route.path&&e.$router.push({path:"/"})}))}},computed:Object(c["a"])({},Object(l["b"])(["scrollY","isauthed"])),watch:{scrollY:function(e){this.scrolledTop=e<90}}},f=h,m=(n("493d"),n("2877")),g=Object(m["a"])(f,s,u,!1,null,"420caf1a",null),p=g.exports,b=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},v=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"qr-footer"},[n("figure",{staticClass:"logo-container"},[n("img",{attrs:{src:"https://welcomeqr.codes/svg/largelogo.svg",alt:"Welcome QR logo",width:"100%"}})]),n("div",{staticClass:"tilde-spacer"},[e._v("~")]),n("div",{staticClass:"text-container"},[n("h4",{staticClass:"h4"},[e._v("Welcome QR Codes")])]),n("div",{staticClass:"tilde-spacer"},[e._v("~")]),n("div",{staticClass:"text-container sub"},[n("h4",{staticClass:"h4"},[e._v("Be modern")])])])}],k={name:"qrfooter"},y=k,w=(n("bf4a"),Object(m["a"])(y,b,v,!1,null,"77ce7d6a",null)),_=w.exports,E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("div",{staticClass:"message-container",class:e.sass,style:e.black?{color:"black"}:{color:"white"}},[e._v(" "+e._s(e.msg)+" ")])])},S=[],C={name:"usermessages",props:{sass:{type:String,validator:function(e){return-1!==["primary","secondary","tertiary","highlight","white",""].indexOf(e)}},msg:{required:!0,type:String},black:{type:Boolean,required:!0}},mounted:function(){setTimeout((function(){d["c"].$emit(d["g"],{is:!1})}),7e3)}},O=C,x=(n("a6b7"),Object(m["a"])(O,E,S,!1,null,"03252014",null)),T=x.exports,A=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},R=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"loading-container"},[n("div",{attrs:{id:"square5"}},[n("span"),n("span"),n("span"),n("span")])])}],L={name:"loading"},j=L,Q=(n("ed24"),Object(m["a"])(j,A,R,!1,null,"44895768",null)),$=Q.exports,I=arguments,W=void 0,B=function(e,t){var n,o=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return function(){var a=W,r=I,i=function(){n=null,o||e.apply(a,r)},c=o&&!n;clearTimeout(n),n=setTimeout(i,t),c&&e.apply(a,r)}},q=B,D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"modal-container"},[n("div",{staticClass:"modal-background",on:{click:e.closeModal,keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.closeModal(t)}}}),n("div",{staticClass:"modal-card"},[n("div",{staticClass:"modal-card-content"},["smallscreen"===e.contains?n("smallscreenmodal"):e._e()],1)])])},P=[],N=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},U=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"small-screen-container"},[n("h4",[e._v(" Welcome QR isn't ready for mobile users yet! ")]),n("h4",[e._v(" Check back soon, or switch to a device with a larger screen! ")]),n("img",{attrs:{src:"/svg/smallogo.svg"}})])}],M={name:"smallscreen",mounted:function(){var e=document.querySelector("body");e&&(e.style.overflowY="hidden")},beforeDestroy:function(){var e=document.querySelector("body");e&&(e.style.overflowY="")}},Y=M,G=(n("821c"),Object(m["a"])(Y,N,U,!1,null,"d7626556",null)),H=G.exports,z={name:"sitemodal",components:{smallscreenmodal:H},props:{contains:{type:String||null,required:!0}},methods:{closeModal:function(){d["c"].$emit(d["l"],!1)}}},V=z,F=(n("f8b0"),Object(m["a"])(V,D,P,!1,null,"4cbf85de",null)),Z=F.exports,J={name:"app",components:{navbar:p,qrfooter:_,sitemodal:Z,loading:$,usermessages:T},data:function(){return{showsitemodal:!1,showGlobalSpinner:!1,contains:null,loadPushed:!1,showUserMessage:!1,msg:"",sass:"",black:""}},created:function(){this.SET_WINDOW_SIZE(),this.SET_SCROLL_LOCATION()},mounted:function(){var e=this;d["c"].$on(d["d"],(function(t){e.showGlobalSpinner=t})),d["c"].$on(d["g"],(function(t){e.showUserMessage=t.is,e.msg=t.msg,e.sass=t.color,e.black=t.black||!1})),d["c"].$on(d["l"],(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;t?(e.contains=t,e.showsitemodal=!0):e.showsitemodal=!1})),d["c"].$on(d["a"],(function(){e.showUserMessage=!0,e.msg="Something went wrong, we have been notified, try again soon!",e.sass="primary",e.black=!1}));var t=new URLSearchParams(window.location.search);"true"===t.get("redirect")&&(d["c"].$emit(d["g"],NEED_TO_BE_LOGGED_IN),this.$router.push({path:"/auth/login?redirect=true"})),"true"===t.get("googleauth")&&(d["c"].$emit(d["g"],d["e"]),this.$router.push({path:"/app/manage"})),o=this,window.addEventListener("resize",q(this.sizeChange,500)),window.addEventListener("scroll",q(this.scrollChange,100)),setTimeout((function(){return e.loadPushed=!0}),1500)},methods:Object(c["a"])(Object(c["a"])({},Object(l["c"])(["SET_WINDOW_SIZE","SET_SCROLL_LOCATION"])),{},{sizeChange:function(){o.SET_WINDOW_SIZE()},scrollChange:function(){o.SET_SCROLL_LOCATION()}}),computed:Object(c["a"])({checkroute:function(){return-1===["create","wapp","preview"].indexOf(this.$route.name)},showfooter:function(){return-1===["auth"].indexOf(this.$route.name)}},Object(l["b"])(["windowWidth"]))},K=J,X=(n("3186"),Object(m["a"])(K,r,i,!1,null,null,null)),ee=X.exports,te=n("8c4f"),ne=(n("a4d3"),n("e01a"),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;var n=document.getElementById("__meta_description"),o=document.getElementsByTagName("title")[0];if(e)if(o.text=e.title?e.title:"",n.content=e.description?e.description:"",!1===e.index){var a=document.createElement("meta");a.name="robots",a.content="noindex",document.getElementsByTagName("head")[0].appendChild(a)}else try{for(var r=document.getElementsByTagName("meta"),i=0;i<r.length;i+=1)r[i]&&r[i].parentNode&&"robots"===r[i].name&&r[i].parentNode.removeChild(r[i])}catch(c){if(t)return t()}return!!t&&t()}),oe=ne,ae=function(){return n.e("chunk-356ebd1e").then(n.bind(null,"ae9d"))},re=function(){return n.e("chunk-09e35f85").then(n.bind(null,"4889"))},ie=function(){return n.e("chunk-59ad979e").then(n.bind(null,"9d8e"))},ce=function(){return Promise.all([n.e("chunk-2d0e97b4"),n.e("chunk-bbfe1080")]).then(n.bind(null,"297c"))},se=function(){return n.e("chunk-e1ee1db0").then(n.bind(null,"aeb7"))},ue=function(){return n.e("chunk-253ebe8d").then(n.bind(null,"0320"))},le=function(){return n.e("chunk-09c83dce").then(n.bind(null,"2102"))},de=function(){return n.e("chunk-21675810").then(n.bind(null,"c99c"))},he=function(){return n.e("chunk-cc4e0498").then(n.bind(null,"9294"))},fe=function(){return n.e("chunk-4d324e47").then(n.bind(null,"6ed4"))},me=function(){return n.e("chunk-1aba49fc").then(n.bind(null,"eca8"))},ge=function(){return n.e("chunk-2bd86bec").then(n.bind(null,"6e24"))},pe=function(){return n.e("chunk-2d2288b7").then(n.bind(null,"da48"))},be=function(){return Promise.all([n.e("chunk-2d0e97b4"),n.e("chunk-1323e223")]).then(n.bind(null,"a0c6"))},ve=function(){return n.e("chunk-1dd17d68").then(n.bind(null,"efe4"))},ke=function(){return n.e("chunk-0b02b394").then(n.bind(null,"b97e"))},ye=function(){return n.e("chunk-0bfa44e3").then(n.bind(null,"9d86"))},we=function(){return n.e("chunk-40ca2e98").then(n.bind(null,"03e3"))},_e=function(){return Promise.all([n.e("chunk-2d0e97b4"),n.e("chunk-4e26cf50")]).then(n.bind(null,"ecc4"))},Ee=function(){return n.e("chunk-d5432414").then(n.bind(null,"292b"))},Se=function(){return n.e("chunk-2bd86bec").then(n.bind(null,"6e24"))},Ce=function(){return n.e("chunk-31caa9cc").then(n.bind(null,"d313"))};a["a"].use(te["a"]);var Oe=[{path:"/",name:"home",component:ae,beforeEnter:function(e,t,n){oe({title:"Welcome QR | Description",description:"Brief description of how Welcome QR functions and the benefits it can provide to customers.",index:!0},n)}},{path:"/pricing",name:"pricing",component:re,beforeEnter:function(e,t,n){oe({title:"Welcome QR | Pricing",description:"Brief description of how Welcome QR Codes prices it's products. Gives details of different plans and tiers offered and the services included in each tier.",index:!0},n)}},{path:"/contact",name:"contact",component:_e,beforeEnter:function(e,t,n){oe({title:"Welcome QR | Contact Us",description:"Get in touch with us about; bug reports, feature requests, account queries or kind words of encoragement. We would love to hear from you!",index:!0},n)}},{path:"/admin",name:"adminmain",redirect:{name:"serverlogs"},meta:{requiresAuth:!0,requiresAdmin:!0},component:ie,beforeEnter:function(e,t,n){oe({index:!1},n)},children:[{path:"/admin/server-logs",name:"serverlogs",meta:{requiresAuth:!0,requiresAdmin:!0},component:ce,beforeEnter:function(e,t,n){oe({index:!1},n)}}]},{path:"/account",name:"account",meta:{requiresAuth:!0},component:me,beforeEnter:function(e,t,n){oe({title:"Welcome QR | Account",description:"Manage all the information we need to keep your account working as intended",index:!0},n)}},{path:"/authcb",name:"authcb",meta:{requiresAuth:!1},component:Ce,beforeEnter:function(e,t,n){oe({index:!1},n)}},{path:"/auth",name:"auth",component:se,redirect:{name:"login"},children:[{path:"/auth/login",name:"login",component:ue,beforeEnter:function(e,t,n){oe({title:"Login ~ Signup",description:"Login and Signup here!",index:!0},n)}},{path:"/auth/signup",name:"signup",component:le,beforeEnter:function(e,t,n){oe({title:"Login ~ Signup",description:"Login and Signup here!",index:!0},n)}},{path:"/auth/reset",name:"reset",component:de,beforeEnter:function(e,t,n){oe({title:"Login ~ Signup",description:"Login and Signup here!",index:!0},n)}},{path:"/auth/forgot",name:"forgot",component:he,beforeEnter:function(e,t,n){oe({title:"Login ~ Signup",description:"Login and Signup here!",index:!0},n)}}]},{path:"/app",name:"wapp",meta:{requiresAuth:!0},component:pe,redirect:"/app/manage",beforeEnter:function(e,t,n){oe({index:!1},n)},children:[{path:"/app/manage",name:"manage",component:ve,meta:{requiresAuth:!0},beforeEnter:function(e,t,n){oe({title:"Welcome QR | Manage",description:"Where the magic happens, create a new downloadable QR code and associate website and content.",index:!0},n)}},{path:"/app/create",name:"create",component:be,meta:{requiresAuth:!0},beforeEnter:function(e,t,n){oe({title:"Welcome QR | Create Your Site",description:"Where the magic happens, create a new downloadable QR code and associate website and content.",index:!0},n)}},{path:"/app/preview",name:"preview",component:ke,meta:{requiresAuth:!0},beforeEnter:function(e,t,n){oe({title:"Welcome QR | Preview",description:"Where the magic happens, create a new downloadable QR code and associate website and content.",index:!0},n)}}]},{path:"/privacy",name:"privacy",component:we,beforeEnter:function(e,t,n){oe({title:"Welcome QR | Privacy Policy",description:"Brief description of how Welcome QR Codesmanages and takes care of your data and your datas security.",index:!0},n)}},{path:"/terms-and-conditions",name:"terms",component:ye,beforeEnter:function(e,t,n){oe({title:"Welcome QR | Terms and Conditions",description:"Brief description of how Welcome QR Codes does business in a legal sense, information on your rights and our methods of operation",index:!0},n)}},{path:"/testhtml",name:"testhtml",component:Se,beforeEnter:function(e,t,n){oe({index:!1},n)}},{path:"/verify-your-email",name:"verifyemail",component:fe,beforeEnter:function(e,t,n){oe({index:!1},n)}},{path:"/testgethtml",name:"testgethtml",component:ge,beforeEnter:function(e,t,n){oe({index:!1},n)}},{path:"*",name:"notfound",component:Ee,beforeEnter:function(e,t,n){oe({index:!1},n)}}],xe=new te["a"]({mode:"history",base:"/",routes:Oe,scrollBehavior:function(e,t,n){return n||{x:0,y:0}}}),Te=function(){return!!localStorage.getItem("QToken")&&""!==localStorage.getItem("QToken")};xe.beforeEach((function(e,t,n){e.meta.requiresAuth&&!Te()?n({name:"login",query:{authRedirect:"true"}}):n()}));var Ae,Re=xe,Le={user:{email:null,id:null,authed:!1,subdom:null,role:null,tier:null},ui:{windowWidth:0,windowHeight:0,scrollY:0}},je=Le,Qe={windowWidth:function(e){return e.ui.windowWidth},windowHeight:function(e){return e.ui.windowHeight},scrollY:function(e){return e.ui.scrollY},isauthed:function(e){return e.user.authed},getuser:function(e){return e.user}},$e=Qe,Ie=n("ade3"),We=n("6f34"),Be="SET_WINDOW_SIZE",qe="SET_SCROLL_LOCATION",De="IS_AUTHED",Pe=(Ae={},Object(Ie["a"])(Ae,De,(function(e,t){e.user.authed=t.authed,e.user.email=t.email,e.user.id=t.id,e.user.subdom=t.subdom,null!==t.token&&t.authed?Object(We["c"])(t.token):Object(We["b"])()})),Object(Ie["a"])(Ae,Be,(function(e){e.ui.windowWidth=window.innerWidth,e.ui.windowHeight=window.innerHeight})),Object(Ie["a"])(Ae,qe,(function(e){e.ui.scrollY=window.scrollY})),Ae),Ne=Pe,Ue={},Me=Ue;a["a"].use(l["a"]);var Ye=new l["a"].Store({state:je,actions:Me,getters:$e,mutations:Ne}),Ge=n("d4ec"),He=n("bee2"),ze=n("bc3a"),Ve=n.n(ze);Ve.a.defaults.headers.common["Authorization"]="Bearer ".concat(localStorage.getItem("QToken"));var Fe=function(){function e(t){Object(Ge["a"])(this,e),this.DEV_SERV="http://localhost:1980",this.DEV_CLIENT="http://localhost:8080",this.PROD_BASE="https://welcomeqr.codes",this.BASE_URL="".concat(this.PROD_BASE,"/auth"),this.ax=Ve.a.create({baseURL:this.BASE_URL,withCredentials:!0,headers:{Authorization:"Bearer ".concat(localStorage.getItem("QToken"))}}),Ve.a.interceptors.request.use((function(e){return e.headers.common["Authorization"]="Bearer ".concat(localStorage.getItem("QToken")),e}),(function(e){return Promise.reject(e)})),this.getuser().then((function(e){null!==e.data.user.token&&e.data.user.token&&Object(We["c"])(e.data.user.token),t.commit("IS_AUTHED",e.data.user),null!==e.data.user.email&&d["c"].$emit(d["g"],Object(d["o"])(e.data.user.email))}))}return Object(He["a"])(e,[{key:"getuser",value:function(){return this.ax.post("user",{})}},{key:"usersettings",value:function(){return this.ax.post("/user_settings",{})}},{key:"togglesubscribe",value:function(e){return this.ax.post("/toggle_subscribe",{subscribe:e})}},{key:"logout",value:function(){return Object(We["b"])(),this.ax.post("/logout")}},{key:"signup",value:function(e,t,n){return this.ax.post("/signup",{email:e,password:t,confirm:n})}},{key:"login",value:function(e,t){return this.ax.post("/login",{email:e,password:t})}},{key:"forgot",value:function(e){return this.ax.post("/forgot",{email:e})}},{key:"reset",value:function(e,t,n){return this.ax.post("/reset",{token:e,password:t,confirm:n})}},{key:"requestverifyemail",value:function(){return this.ax.post("/send_verify_email")}},{key:"verifyemailtoken",value:function(e){return this.ax.post("/verify_email_token",{token:e})}},{key:"contact",value:function(e,t,n,o){return this.ax.post("/contact",{email:e,name:t,message:n,selectval:o})}}]),e}();n("99af"),n("fb6a");Ve.a.defaults.headers.common["Authorization"]="Bearer ".concat(localStorage.getItem("QToken"));var Ze=function(){function e(){Object(Ge["a"])(this,e),this.DEV_SERV="http://localhost:1980",this.DEV_CLIENT="http://localhost:8080",this.PROD_BASE="https://welcomeqr.codes",this.BASE_URL="".concat(this.PROD_BASE,"/admin"),this.ax=Ve.a.create({baseURL:this.BASE_URL,withCredentials:!0,headers:{Authorization:"Bearer ".concat(localStorage.getItem("QToken"))}}),Ve.a.interceptors.request.use((function(e){return e.headers.common["Authorization"]="Bearer ".concat(localStorage.getItem("QToken")),e}),(function(e){return Promise.reject(e)}))}return Object(He["a"])(e,[{key:"ensureTwoDigits",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e=t?e+1:e,("0"+e).slice(-2)}},{key:"getlogbyday",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=new Date;return""===e&&"".concat(t.getFullYear(),"-").concat(this.ensureTwoDigits(t.getMonth(),!0),"-").concat(this.ensureTwoDigits(t.getDate())),this.ax.post("get_log_by_day",{day:e})}},{key:"getalllogfilenames",value:function(){return this.ax.post("get_all_log_filenames")}},{key:"clientsideerror",value:function(e){return this.ax.post("new_client_side_error",{errdeets:e})}}]),e}();Ve.a.defaults.headers.common["Authorization"]="Bearer ".concat(localStorage.getItem("QToken"));var Je=function(){function e(){Object(Ge["a"])(this,e),this.BASE_URL="https://welcomeqr.codes/api",this.ax=Ve.a.create({baseURL:this.BASE_URL,withCredentials:!0,headers:{Authorization:"Bearer ".concat(localStorage.getItem("QToken"))}}),Ve.a.interceptors.request.use((function(e){return e.headers.common["Authorization"]="Bearer ".concat(localStorage.getItem("QToken")),e}),(function(e){return Promise.reject(e)})),this.ax.interceptors.response.use((function(e){return e}),(function(e){return e.response&&e.response.status>=400&&e.response.status<500&&(a["a"].prototype.$router.push({name:"login"}),d["c"].$emit(d["k"],e.response.data.userError),d["c"].$emit(d["d"],!1),Object(We["b"])()),Promise.reject(e)}))}return Object(He["a"])(e,[{key:"buildEmailTemplate",value:function(e){return this.ax.post("/build_email_template",{config:e})}},{key:"submitnew",value:function(e,t,n){var o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return this.ax.post("/submitnew",{intercept:o,html:e,user:t,name:n})}},{key:"getall",value:function(e){return this.ax.post("/getallforuser",{userid:e})}},{key:"checksubdom",value:function(e){return this.ax.post("/checksubdom",{subdom:e,intercept:!1})}},{key:"submitsubdom",value:function(e,t){return this.ax.post("/submitsubdom",{subdom:e,userid:t})}},{key:"getHTML",value:function(){return this.ax.post("/gethtmlforuser")}},{key:"generateRandomSubDom",value:function(){return this.ax.post("/generatesubdom")}},{key:"getHtmlBySub",value:function(e){return this.ax.post("/get_html_by_subdomain",{subdom:e})}}]),e}();a["a"].config.productionTip=!1,a["a"].prototype.$QAdmin=new Ze,a["a"].prototype.$QEdit=new Je,a["a"].config.errorHandler=function(e,t,n){return a["a"].prototype.$QAdmin.clientsideerror({time:new Date,userAgent:navigator.userAgent,error:e,info:n}),!1},window.onerror=function(e,t,n,o,r){return a["a"].prototype.$QAdmin.clientsideerror({time:new Date,userAgent:navigator.userAgent,message:e,url:t,line:n,column:o,error:r}),!1},new a["a"]({router:Re,store:Ye,render:function(e){return e(ee)}}).$mount("#app");var Ke=new Fe(Ye);a["a"].prototype.$QAuth=Ke;t["default"]=Ke},"821c":function(e,t,n){"use strict";var o=n("5914"),a=n.n(o);a.a},9109:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return r})),n.d(t,"g",(function(){return i})),n.d(t,"l",(function(){return c})),n.d(t,"k",(function(){return s})),n.d(t,"a",(function(){return u})),n.d(t,"j",(function(){return l})),n.d(t,"i",(function(){return d})),n.d(t,"f",(function(){return h})),n.d(t,"o",(function(){return f})),n.d(t,"b",(function(){return m})),n.d(t,"h",(function(){return g})),n.d(t,"e",(function(){return p})),n.d(t,"m",(function(){return b})),n.d(t,"n",(function(){return v}));var o=n("2b0e"),a=new o["a"],r="LOADING",i="MESSAGES",c="SITEMODAL",s="SERVER_AUTH_ERROR_MESSAGE",u="EDITOR_ERROR",l={is:!0,msg:"Saved!",color:"secondary",black:!1},d={is:!0,msg:"Published!",color:"highlight",black:!1},h={is:!0,msg:"You are now logged out!",color:"secondary",black:!1},f=function(e){return{is:!0,msg:"Welcome back ".concat(e,"!"),color:"secondary",black:!1}},m={is:!0,msg:"Something went wrong, we have been notified, try again soon!",color:"highlight",black:!1},g={is:!0,msg:"You need to be logged in to view that page!",color:"tertiary",black:!1},p={is:!0,msg:"Logged in with Google!",color:"secondary",black:!1},b=function(e){return{is:!0,msg:"You are already logged in as ".concat(e,"!"),color:"secondary",black:!1}},v=function(e){return{is:!0,msg:"We have sent you an email at ".concat(e,"!"),color:"secondary",black:!1}}},9372:function(e,t,n){},"98c1":function(e,t,n){},a6b7:function(e,t,n){"use strict";var o=n("fde2"),a=n.n(o);a.a},bf4a:function(e,t,n){"use strict";var o=n("c5b9"),a=n.n(o);a.a},c5b9:function(e,t,n){},ed24:function(e,t,n){"use strict";var o=n("0c6b"),a=n.n(o);a.a},f8b0:function(e,t,n){"use strict";var o=n("9372"),a=n.n(o);a.a},fde2:function(e,t,n){}});
//# sourceMappingURL=app.7a5153e9.js.map
(function(e){function t(t){for(var a,o,c=t[0],s=t[1],u=t[2],l=0,d=[];l<c.length;l++)o=c[l],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);h&&h(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,o=1;o<n.length;o++){var c=n[o];0!==r[c]&&(a=!1)}a&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},o={app:0},r={app:0},i=[];function c(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-1611ae38":"5c9a00b8","chunk-16adaf86":"3805c480","chunk-2d0daf4e":"53cd2107","chunk-2ef61d56":"3dcfadb6","chunk-3c3142f5":"8b565374","chunk-3dba262e":"ac56bf90","chunk-4d693c3f":"fd9ef3b5","chunk-5592a6d7":"c0e92bb1","chunk-5b57faa9":"16cc6a9c","chunk-5eb66cd8":"4d09f0d7","chunk-72e08f6e":"d20d20e5","chunk-79b513dd":"f4bee94e","chunk-7ac4a64c":"60b8244c","chunk-7c64a210":"6dd97895","chunk-8085e76e":"538270cf","chunk-9d34e4fe":"234bf51e","chunk-b26048b0":"4f827a15","chunk-11fec93c":"7409c426","chunk-2fe27126":"c2e45886","chunk-fe9e4ffa":"6939f95b"}[e]+".js"}function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-1611ae38":1,"chunk-16adaf86":1,"chunk-2ef61d56":1,"chunk-3c3142f5":1,"chunk-3dba262e":1,"chunk-4d693c3f":1,"chunk-5592a6d7":1,"chunk-5eb66cd8":1,"chunk-72e08f6e":1,"chunk-79b513dd":1,"chunk-7ac4a64c":1,"chunk-7c64a210":1,"chunk-8085e76e":1,"chunk-9d34e4fe":1,"chunk-b26048b0":1,"chunk-11fec93c":1,"chunk-2fe27126":1,"chunk-fe9e4ffa":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-1611ae38":"27aec4ae","chunk-16adaf86":"1b32d064","chunk-2d0daf4e":"31d6cfe0","chunk-2ef61d56":"ef996475","chunk-3c3142f5":"374c059f","chunk-3dba262e":"466c397a","chunk-4d693c3f":"7ee6d47c","chunk-5592a6d7":"eff2fb01","chunk-5b57faa9":"31d6cfe0","chunk-5eb66cd8":"a62f7d5f","chunk-72e08f6e":"ff5ebead","chunk-79b513dd":"caf07df7","chunk-7ac4a64c":"d750cc0d","chunk-7c64a210":"15bffd7d","chunk-8085e76e":"2d44db54","chunk-9d34e4fe":"85984577","chunk-b26048b0":"96a655cf","chunk-11fec93c":"1fe687ae","chunk-2fe27126":"27469366","chunk-fe9e4ffa":"a6cc5fc7"}[e]+".css",r=s.p+a,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var u=i[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===a||l===r))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){u=d[c],l=u.getAttribute("data-href");if(l===a||l===r)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var a=t&&t.target&&t.target.src||r,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete o[e],h.parentNode.removeChild(h),n(i)},h.href=r;var f=document.getElementsByTagName("head")[0];f.appendChild(h)})).then((function(){o[e]=0})));var a=r[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise((function(t,n){a=r[e]=[t,n]}));t.push(a[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=c(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(h);var n=r[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+o+")",d.name="ChunkLoadError",d.type=a,d.request=o,n[1](d)}r[e]=void 0}};var h=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var h=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"347e":function(e,t,n){"use strict";var a=n("ccfc"),o=n.n(a);o.a},4889:function(e,t,n){e.exports={primary:"#f57c00",secondary:"#009688",tertiary:"#f44336",highlight:"#f4a236",link:"#1976d2",font:"#212121",darkgray:"dimgray",mediumgray:"#a9a9a9","light-gray":"#d3d3d3",verylightgray:"#f4f4f4"}},"498c":function(e,t,n){"use strict";var a=n("c3b0"),o=n.n(a);o.a},"695e":function(e,t,n){},"698f":function(e,t,n){"use strict";var a=n("c3a3"),o=n.n(a);o.a},"6dcd":function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return r}));var a=function(e){localStorage.setItem("QToken",e)},o=function(){localStorage.setItem("QToken","")},r=function(){return!!localStorage.getItem("QToken")&&""!==localStorage.getItem("QToken")}},8407:function(e,t,n){"use strict";var a=n("dd1b"),o=n.n(a);o.a},"9a67":function(e,t,n){},b143:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return r})),n.d(t,"e",(function(){return i})),n.d(t,"i",(function(){return c})),n.d(t,"h",(function(){return s})),n.d(t,"a",(function(){return u})),n.d(t,"g",(function(){return l})),n.d(t,"f",(function(){return d})),n.d(t,"d",(function(){return h})),n.d(t,"j",(function(){return f}));var a=n("2b0e"),o=new a["a"],r="LOADING",i="MESSAGES",c="SITEMODAL",s="SERVER_AUTH_ERROR_MESSAGE",u="EDITOR_ERROR",l={is:!0,msg:"Saved!",color:"secondary",black:!1},d={is:!0,msg:"Published!",color:"highlight",black:!1},h={is:!0,msg:"You are now logged out!",color:"secondary",black:!1},f=function(e){return{is:!0,msg:"Welcome back ".concat(e,"!"),color:"secondary",black:!1}}},b23e:function(e,t,n){"use strict";var a=n("695e"),o=n.n(a);o.a},b571:function(e,t,n){"use strict";var a=n("9a67"),o=n.n(a);o.a},c3a3:function(e,t,n){},c3b0:function(e,t,n){},ccfc:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a,o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"app-main"},[n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.showGlobalSpinner,expression:"showGlobalSpinner"}],staticClass:"global-spinner-con"},[n("loading")],1)]),n("transition-group",{attrs:{name:"fade",mode:"out-in"}},[[e.showsitemodal?n("sitemodal",e._b({key:1},"sitemodal",{contains:e.contains},!1)):e._e(),e.checkroute?n("navbar",{key:2}):e._e(),n("router-view",{key:3}),e.loadPushed&&e.showfooter?n("qrfooter",{key:4}):e._e()]],2),e.showUserMessage?n("usermessages",e._b({},"usermessages",{msg:e.msg,black:e.black,sass:e.sass},!1)):e._e(),e.windowWidth<620?n("sitemodal",{attrs:{contains:"smallscreen"}}):e._e()],1)},i=[],c=(n("c975"),n("b0c0"),n("d3b7"),n("ac1f"),n("3ca3"),n("841c"),n("ddb0"),n("2b3d"),n("5530")),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"navbar-con"},[n("transition",{attrs:{name:"fade",mode:"in-out"}},["home"===e.$route.name||e.scrolledTop?n("div",{staticClass:"navbar-left"},[n("div",{staticClass:"logo-con",on:{click:e.routehome}},[n("img",{attrs:{src:"/svg/smallogo.svg"}})])]):e._e()]),n("div",{staticClass:"spacer"}),e.isauthed?n("div",{staticClass:"account-active-indic",on:{click:e.togglecanvas}},[e._m(0),n("h6",{staticClass:"small-6"},[e._v("ACCOUNT")])]):e._e(),n("div",{staticClass:"hamburger",on:{click:e.togglecanvas}},[n("div",{staticClass:"line"}),n("div",{staticClass:"line"}),n("div",{staticClass:"line"})]),n("transition",{attrs:{name:"fade",mode:"in-out"}},[e.canvasopen?n("div",{staticClass:"canvas-nav"},[n("div",{staticClass:"canvas-text-con"},[n("div",{staticClass:"big-x",on:{click:e.togglecanvas}},[n("div",{staticClass:"line"}),n("div",{staticClass:"line"})]),n("div",{staticClass:"canvas-item",on:{click:e.togglecanvas}},[n("router-link",{attrs:{to:{path:"/"}}},[e._v("home")])],1),n("div",{staticClass:"canvas-item",on:{click:e.togglecanvas}},[n("router-link",{attrs:{to:{path:"/pricing"}}},[e._v("pricing")])],1),n("div",{staticClass:"canvas-item",on:{click:e.togglecanvas}},[n("router-link",{attrs:{to:{path:"/app"}}},[e._v(e._s(e.isauthed?"Your Websites":"Try For Free"))])],1),n("div",{staticClass:"canvas-item",on:{click:e.togglecanvas}},[n("router-link",{attrs:{to:{path:"/auth/login"}}},[e._v("Login / SignUp")])],1),e.isauthed?n("div",{staticClass:"account-settings"},[n("div",{staticClass:"canvas-item account",on:{click:e.togglecanvas}},[n("div",{staticClass:"avatar-icon"},[n("img",{attrs:{width:"40",src:"/svg/avatar.svg"}})]),n("router-link",{attrs:{to:{path:"/account"}}},[e._v("Account")])],1),n("div",{staticClass:"canvas-item account",on:{click:e.togglecanvas}},[n("button",{staticClass:"button",on:{click:e.logout}},[e._v("LOGOUT")])])]):e._e()])]):e._e()])],1)},u=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"avatar-icon"},[n("img",{attrs:{src:"/svg/avatar.svg"}})])}],l=n("2f62"),d=n("b143"),h={name:"navbar",data:function(){return{canvasopen:!1,scrolledTop:!0}},methods:{togglecanvas:function(){var e=this;setTimeout((function(){e.canvasopen=!e.canvasopen}),200)},routehome:function(){this.$router.push({path:"/"})},logout:function(){var e=this;this.$QAuth.logout().then((function(t){e.$store.commit("IS_AUTHED",t.data.user),d["b"].$emit(d["e"],d["d"]),"/"!==e.$route.path&&e.$router.push({path:"/"})}))}},computed:Object(c["a"])({},Object(l["b"])(["scrollY","isauthed"])),watch:{scrollY:function(e){this.scrolledTop=e<90}}},f=h,m=(n("8407"),n("2877")),p=Object(m["a"])(f,s,u,!1,null,"bacbe56e",null),g=p.exports,b=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},v=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"qr-footer"},[n("figure",{staticClass:"logo-container"},[n("img",{attrs:{src:"/svg/largelogo.svg",alt:"Welcome QR logo",width:"100%"}})]),n("div",{staticClass:"tilde-spacer"},[e._v("~")]),n("div",{staticClass:"text-container"},[n("h4",{staticClass:"h4"},[e._v("Welcome QR Codes")])]),n("div",{staticClass:"tilde-spacer"},[e._v("~")]),n("div",{staticClass:"text-container sub"},[n("h4",{staticClass:"h4"},[e._v("Be modern")])])])}],k={name:"qrfooter"},w=k,y=(n("698f"),Object(m["a"])(w,b,v,!1,null,"3d2f8173",null)),_=y.exports,E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("div",{staticClass:"message-container",class:e.sass,style:e.black?{color:"black"}:{color:"white"}},[e._v(" "+e._s(e.msg)+" ")])])},S=[],C={name:"usermessages",props:{sass:{type:String,validator:function(e){return-1!==["primary","secondary","tertiary","highlight","white",""].indexOf(e)}},msg:{required:!0,type:String},black:{type:Boolean,required:!0}},mounted:function(){setTimeout((function(){d["b"].$emit(d["e"],{is:!1})}),7e3)}},O=C,x=(n("347e"),Object(m["a"])(O,E,S,!1,null,"5f258915",null)),T=x.exports,R=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},j=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"square5"}},[n("span"),n("span"),n("span"),n("span")])}],A={name:"loading"},L=A,W=(n("b23e"),Object(m["a"])(L,R,j,!1,null,"0e48176e",null)),$=W.exports,I=arguments,Q=void 0,q=function(e,t){var n,a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return function(){var o=Q,r=I,i=function(){n=null,a||e.apply(o,r)},c=a&&!n;clearTimeout(n),n=setTimeout(i,t),c&&e.apply(o,r)}},B=q,P=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"modal-container"},[n("div",{staticClass:"modal-background",on:{click:e.closeModal,keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.closeModal(t)}}}),n("div",{staticClass:"modal-card"},[n("div",{staticClass:"modal-card-content"},["smallscreen"===e.contains?n("smallscreenmodal"):e._e()],1)])])},N=[],U=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},D=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"small-screen-container"},[n("h4",[e._v(" Welcome QR isn't ready for mobile users yet! ")]),n("h4",[e._v(" Check back soon, or switch to a device with a larger screen! ")]),n("img",{attrs:{src:"/svg/smallogo.svg"}})])}],M={name:"smallscreen",mounted:function(){var e=document.querySelector("body");e&&(e.style.overflowY="hidden")},beforeDestroy:function(){var e=document.querySelector("body");e&&(e.style.overflowY="")}},Y=M,H=(n("b571"),Object(m["a"])(Y,U,D,!1,null,"02bfb12b",null)),G=H.exports,z={name:"sitemodal",components:{smallscreenmodal:G},props:{contains:{type:String||null,required:!0}},methods:{closeModal:function(){d["b"].$emit(d["i"],!1)}}},V=z,Z=(n("498c"),Object(m["a"])(V,P,N,!1,null,"4a8ac90a",null)),F=Z.exports,J={name:"app",components:{navbar:g,qrfooter:_,sitemodal:F,loading:$,usermessages:T},data:function(){return{showsitemodal:!1,showGlobalSpinner:!1,contains:null,loadPushed:!1,showUserMessage:!1,msg:"",sass:"",black:""}},created:function(){this.SET_WINDOW_SIZE(),this.SET_SCROLL_LOCATION()},mounted:function(){var e=this;d["b"].$on(d["c"],(function(t){e.showGlobalSpinner=t})),d["b"].$on(d["e"],(function(t){e.showUserMessage=t.is,e.msg=t.msg||"",e.sass=t.color||"",e.black=t.black||!1})),d["b"].$on(d["i"],(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;t?(e.contains=t,e.showsitemodal=!0):e.showsitemodal=!1})),d["b"].$on(d["a"],(function(){e.showUserMessage=!0,e.msg="Something went wrong, we have been notified, try again soon!",e.sass="primary",e.black=!1}));var t=new URLSearchParams(window.location.search);"true"===t.get("redirect")&&(d["b"].$emit(d["e"],{is:!0,msg:"You need to be logged in to view that page!",color:"tertiary",black:!1}),this.$router.push({path:"/auth/login?redirect=true"})),"true"===t.get("googleauth")&&(d["b"].$emit(d["e"],{is:!0,msg:"Logged in with Google!",color:"secondary",black:!1}),this.$router.push({path:"/app/manage"})),a=this,window.addEventListener("resize",B(this.sizeChange,500)),window.addEventListener("scroll",B(this.scrollChange,100)),setTimeout((function(){return e.loadPushed=!0}),1500)},methods:Object(c["a"])(Object(c["a"])({},Object(l["c"])(["SET_WINDOW_SIZE","SET_SCROLL_LOCATION"])),{},{sizeChange:function(){a.SET_WINDOW_SIZE()},scrollChange:function(){a.SET_SCROLL_LOCATION()}}),computed:Object(c["a"])({checkroute:function(){return-1===["create","wapp","preview"].indexOf(this.$route.name)},showfooter:function(){return-1===["auth"].indexOf(this.$route.name)}},Object(l["b"])(["windowWidth"]))},K=J,X=(n("cf25"),Object(m["a"])(K,r,i,!1,null,null,null)),ee=X.exports,te=n("8c4f"),ne=(n("a4d3"),n("e01a"),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0,n=document.getElementById("__meta_description"),a=document.getElementsByTagName("title")[0];if(e)if(a.text=e.title?e.title:"",n.content=e.description?e.description:"",!1===e.index){var o=document.createElement("meta");o.name="robots",o.content="noindex",document.getElementsByTagName("head")[0].appendChild(o)}else try{for(var r=document.getElementsByTagName("meta"),i=0;i<r.length;i+=1)r[i]&&r[i].parentNode&&"robots"===r[i].name&&r[i].parentNode.removeChild(r[i])}catch(c){t&&t()}return!!t&&t()}),ae=ne,oe=function(){return n.e("chunk-3c3142f5").then(n.bind(null,"6511"))},re=function(){return n.e("chunk-7ac4a64c").then(n.bind(null,"9daa"))},ie=function(){return n.e("chunk-5eb66cd8").then(n.bind(null,"6ecd"))},ce=function(){return n.e("chunk-4d693c3f").then(n.bind(null,"bd01"))},se=function(){return n.e("chunk-1611ae38").then(n.bind(null,"6634"))},ue=function(){return n.e("chunk-5592a6d7").then(n.bind(null,"8a71"))},le=function(){return n.e("chunk-7c64a210").then(n.bind(null,"2e45"))},de=function(){return n.e("chunk-fe9e4ffa").then(n.bind(null,"2b12"))},he=function(){return n.e("chunk-79b513dd").then(n.bind(null,"d3a7"))},fe=function(){return n.e("chunk-2d0daf4e").then(n.bind(null,"6e8a"))},me=function(){return Promise.all([n.e("chunk-b26048b0"),n.e("chunk-2fe27126")]).then(n.bind(null,"7a47"))},pe=function(){return n.e("chunk-3dba262e").then(n.bind(null,"b8c7"))},ge=function(){return n.e("chunk-72e08f6e").then(n.bind(null,"43a0"))},be=function(){return n.e("chunk-9d34e4fe").then(n.bind(null,"441b"))},ve=function(){return n.e("chunk-2ef61d56").then(n.bind(null,"0fe0"))},ke=function(){return Promise.all([n.e("chunk-b26048b0"),n.e("chunk-11fec93c")]).then(n.bind(null,"4fe8"))},we=function(){return n.e("chunk-8085e76e").then(n.bind(null,"1f6b"))},ye=function(){return n.e("chunk-16adaf86").then(n.bind(null,"b173"))},_e=function(){return n.e("chunk-5b57faa9").then(n.bind(null,"cc05"))};o["a"].use(te["a"]);var Ee=[{path:"/",name:"home",component:oe,beforeEnter:function(e,t,n){ae({title:"Welcome QR | Description",description:"Brief description of how Welcome QR functions and the benefits it can provide to customers.",index:!0},n)}},{path:"/pricing",name:"pricing",component:re,beforeEnter:function(e,t,n){ae({title:"Welcome QR | Pricing",description:"Brief description of how Welcome QR Codes prices it's products. Gives details of different plans and tiers offered and the services included in each tier.",index:!0},n)}},{path:"/contact",name:"contact",component:ke,beforeEnter:function(e,t,n){ae({title:"Welcome QR | Contact Us",description:"Get in touch with us about; bug reports, feature requests, account queries or kind words of encoragement. We would love to hear from you!",index:!0},n)}},{path:"/account",name:"account",meta:{requiresAuth:!0},component:de,beforeEnter:function(e,t,n){ae({title:"Welcome QR | Account",description:"Manage all the information we need to keep your account working as intended",index:!0},n)}},{path:"/authcb",name:"authcb",meta:{requiresAuth:!1},component:_e,beforeEnter:function(e,t,n){ae({index:!1},n)}},{path:"/auth",name:"auth",component:ie,redirect:{name:"login"},children:[{path:"/auth/login",name:"login",component:ce,beforeEnter:function(e,t,n){ae({title:"Login ~ Signup",description:"Login and Signup here!",index:!0},n)}},{path:"/auth/signup",name:"signup",component:se,beforeEnter:function(e,t,n){ae({title:"Login ~ Signup",description:"Login and Signup here!",index:!0},n)}},{path:"/auth/reset",name:"reset",component:ue,beforeEnter:function(e,t,n){ae({title:"Login ~ Signup",description:"Login and Signup here!",index:!0},n)}},{path:"/auth/forgot",name:"forgot",component:le,beforeEnter:function(e,t,n){ae({title:"Login ~ Signup",description:"Login and Signup here!",index:!0},n)}}]},{path:"/app",name:"wapp",meta:{requiresAuth:!0},component:fe,redirect:"/app/manage",beforeEnter:function(e,t,n){ae({index:!1},n)},children:[{path:"/app/manage",name:"manage",component:pe,meta:{requiresAuth:!0},beforeEnter:function(e,t,n){ae({title:"Welcome QR | Manage",description:"Where the magic happens, create a new downloadable QR code and associate website and content.",index:!0},n)}},{path:"/app/create",name:"create",component:me,meta:{requiresAuth:!0},beforeEnter:function(e,t,n){ae({title:"Welcome QR | Create Your Site",description:"Where the magic happens, create a new downloadable QR code and associate website and content.",index:!0},n)}},{path:"/app/preview",name:"preview",component:ge,meta:{requiresAuth:!0},beforeEnter:function(e,t,n){ae({title:"Welcome QR | Preview",description:"Where the magic happens, create a new downloadable QR code and associate website and content.",index:!0},n)}}]},{path:"/privacy",name:"privacy",component:ve,beforeEnter:function(e,t,n){ae({title:"Welcome QR | Privacy Policy",description:"Brief description of how Welcome QR Codesmanages and takes care of your data and your datas security.",index:!0},n)}},{path:"/terms-and-conditions",name:"terms",component:be,beforeEnter:function(e,t,n){ae({title:"Welcome QR | Terms and Conditions",description:"Brief description of how Welcome QR Codes does business in a legal sense, information on your rights and our methods of operation",index:!0},n)}},{path:"/testhtml",name:"testhtml",component:ye,beforeEnter:function(e,t,n){ae({index:!1},n)}},{path:"/testgethtml",name:"testgethtml",component:he,beforeEnter:function(e,t,n){ae({title:"",description:"",index:!1},n)}},{path:"*",name:"notfound",component:we,beforeEnter:function(e,t,n){ae({title:"",description:"",index:!1},n)}}],Se=new te["a"]({mode:"history",base:"/",routes:Ee,scrollBehavior:function(e,t,n){return n||{x:0,y:0}}}),Ce=function(){return!!localStorage.getItem("QToken")&&""!==localStorage.getItem("QToken")};Se.beforeEach((function(e,t,n){e.meta.requiresAuth&&!Ce()?n({name:"login",query:{authRedirect:"true"}}):n()}));var Oe,xe=Se,Te={user:{email:null,id:null,authed:!1,subdom:null,role:null,tier:null},ui:{windowWidth:0,windowHeight:0,scrollY:0}},Re=Te,je={windowWidth:function(e){return e.ui.windowWidth},windowHeight:function(e){return e.ui.windowHeight},scrollY:function(e){return e.ui.scrollY},isauthed:function(e){return e.user.authed},getuser:function(e){return e.user}},Ae=je,Le=n("ade3"),We=n("6dcd"),$e="SET_WINDOW_SIZE",Ie="SET_SCROLL_LOCATION",Qe="IS_AUTHED",qe=(Oe={},Object(Le["a"])(Oe,Qe,(function(e,t){e.user.authed=t.authed,e.user.email=t.email,e.user.id=t.id,e.user.subdom=t.subdom,null!==t.token&&t.authed?Object(We["c"])(t.token):Object(We["b"])()})),Object(Le["a"])(Oe,$e,(function(e){e.ui.windowWidth=window.innerWidth,e.ui.windowHeight=window.innerHeight})),Object(Le["a"])(Oe,Ie,(function(e){e.ui.scrollY=window.scrollY})),Oe),Be=qe,Pe={},Ne=Pe;o["a"].use(l["a"]);var Ue=new l["a"].Store({state:Re,actions:Ne,getters:Ae,mutations:Be}),De=n("d4ec"),Me=n("bee2"),Ye=n("bc3a"),He=n.n(Ye);He.a.defaults.headers.common["Authorization"]="Bearer ".concat(localStorage.getItem("QToken"));var Ge=function(){function e(t){Object(De["a"])(this,e),this.DEV_SERV="http://localhost:1980",this.DEV_CLIENT="http://localhost:8080",this.PROD_BASE="https://welcomeqr.codes",this.BASE_URL="".concat(this.PROD_BASE,"/auth"),this.ax=He.a.create({baseURL:this.BASE_URL,withCredentials:!0,headers:{Authorization:"Bearer ".concat(localStorage.getItem("QToken"))}}),He.a.interceptors.request.use((function(e){return e.headers.common["Authorization"]="Bearer ".concat(localStorage.getItem("QToken")),e}),(function(e){return Promise.reject(e)})),this.getuser().then((function(e){null!==e.data.user.token&&e.data.user.token&&Object(We["c"])(e.data.user.token),t.commit("IS_AUTHED",e.data.user),null!==e.data.user.email&&d["b"].$emit(d["e"],Object(d["j"])(e.data.user.email))}))}return Object(Me["a"])(e,[{key:"getuser",value:function(){return this.ax.post("user",{})}},{key:"usersettings",value:function(){return this.ax.post("/user_settings",{})}},{key:"togglesubscribe",value:function(e){return this.ax.post("/toggle_subscribe",{subscribe:e})}},{key:"logout",value:function(){return Object(We["b"])(),this.ax.post("/logout")}},{key:"signup",value:function(e,t,n){return this.ax.post("/signup",{email:e,password:t,confirm:n})}},{key:"login",value:function(e,t){return this.ax.post("/login",{email:e,password:t})}},{key:"forgot",value:function(e){return this.ax.post("/forgot",{email:e})}},{key:"reset",value:function(e,t,n){return this.ax.post("/reset",{token:e,password:t,confirm:n})}},{key:"verifyemail",value:function(e){return this.ax.post("/verify_email",{token:e})}},{key:"contact",value:function(e,t,n,a){return this.ax.post("/contact",{email:e,name:t,message:n,selectval:a})}}]),e}();He.a.defaults.headers.common["Authorization"]="Bearer ".concat(localStorage.getItem("QToken"));var ze=function(){function e(){Object(De["a"])(this,e),this.BASE_URL="https://welcomeqr.codes/api",this.ax=He.a.create({baseURL:this.BASE_URL,withCredentials:!0,headers:{Authorization:"Bearer ".concat(localStorage.getItem("QToken"))}}),He.a.interceptors.request.use((function(e){return e.headers.common["Authorization"]="Bearer ".concat(localStorage.getItem("QToken")),console.log("AXIOS req intercept =====> ",e),e}),(function(e){return Promise.reject(e)})),this.ax.interceptors.response.use((function(e){return e}),(function(e){return e.response&&e.response.status>=400&&e.response.status<500&&(o["a"].prototype.$router.push({name:"login"}),d["b"].$emit(d["h"],e.response.data.userError),d["b"].$emit(d["c"],!1),Object(We["b"])()),Promise.reject(e)}))}return Object(Me["a"])(e,[{key:"submitnew",value:function(e,t,n){var a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return this.ax.post("/submitnew",{intercept:a,html:e,user:t,name:n})}},{key:"getall",value:function(e){return this.ax.post("/getallforuser",{userid:e})}},{key:"checksubdom",value:function(e){return this.ax.post("/checksubdom",{subdom:e,intercept:!1})}},{key:"submitsubdom",value:function(e,t){return this.ax.post("/submitsubdom",{subdom:e,userid:t})}},{key:"getHTML",value:function(){return this.ax.post("/gethtmlforuser")}},{key:"generateRandomSubDom",value:function(){return this.ax.post("/generatesubdom")}},{key:"getHtmlBySub",value:function(){return this.ax.post("/get_html_by_subdomain")}}]),e}();o["a"].config.productionTip=!1,new o["a"]({router:xe,store:Ue,render:function(e){return e(ee)}}).$mount("#app");var Ve=new Ge(Ue);o["a"].prototype.$QAuth=Ve,o["a"].prototype.$QEdit=new ze;t["default"]=Ve},cf25:function(e,t,n){"use strict";var a=n("4889"),o=n.n(a);o.a},dd1b:function(e,t,n){}});
//# sourceMappingURL=app.c1915169.js.map
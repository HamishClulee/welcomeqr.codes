(function(e){function t(t){for(var a,o,s=t[0],c=t[1],u=t[2],l=0,d=[];l<s.length;l++)o=s[l],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&d.push(i[o][0]),i[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);f&&f(t);while(d.length)d.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,o=1;o<n.length;o++){var s=n[o];0!==i[s]&&(a=!1)}a&&(r.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},o={app:0},i={app:0},r=[];function s(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-22e8a7e4":"32dc9c90","chunk-2d0daf4e":"38b94986","chunk-2ef61d56":"0210c439","chunk-6096a9e4":"35526a9c","chunk-7ac4a64c":"53720775","chunk-8085e76e":"d00c74be","chunk-9d34e4fe":"373809ab","chunk-afd14b86":"ccfd481b","chunk-bd3af8f6":"ca0c6861","chunk-d13b04ae":"dee89982","chunk-e9fa01c0":"ce28dfb8"}[e]+".js"}function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-22e8a7e4":1,"chunk-2ef61d56":1,"chunk-6096a9e4":1,"chunk-7ac4a64c":1,"chunk-8085e76e":1,"chunk-9d34e4fe":1,"chunk-afd14b86":1,"chunk-bd3af8f6":1,"chunk-d13b04ae":1,"chunk-e9fa01c0":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-22e8a7e4":"ddc732ec","chunk-2d0daf4e":"31d6cfe0","chunk-2ef61d56":"206b2660","chunk-6096a9e4":"368ec176","chunk-7ac4a64c":"3770a038","chunk-8085e76e":"509cfea7","chunk-9d34e4fe":"5a5d878e","chunk-afd14b86":"2588fc3e","chunk-bd3af8f6":"44787be2","chunk-d13b04ae":"e375aa9d","chunk-e9fa01c0":"9b0f14d2"}[e]+".css",i=c.p+a,r=document.getElementsByTagName("link"),s=0;s<r.length;s++){var u=r[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===a||l===i))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){u=d[s],l=u.getAttribute("data-href");if(l===a||l===i)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var a=t&&t.target&&t.target.src||i,r=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=a,delete o[e],f.parentNode.removeChild(f),n(r)},f.href=i;var h=document.getElementsByTagName("head")[0];h.appendChild(f)})).then((function(){o[e]=0})));var a=i[e];if(0!==a)if(a)t.push(a[2]);else{var r=new Promise((function(t,n){a=i[e]=[t,n]}));t.push(a[2]=r);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=s(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=i[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+o+")",d.name="ChunkLoadError",d.type=a,d.request=o,n[1](d)}i[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var f=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},2045:function(e,t,n){},2133:function(e,t,n){"use strict";var a=n("facd"),o=n.n(a);o.a},"33da":function(e,t,n){"use strict";var a=n("70f2"),o=n.n(a);o.a},4889:function(e,t,n){e.exports={primary:"#f57c00",secondary:"#009688",tertiary:"#f44336",highlight:"#f4a236",link:"#1976d2",font:"#212121",darkgray:"dimgray",mediumgray:"#a9a9a9","light-gray":"#d3d3d3",verylightgray:"#f4f4f4"}},"4e23":function(e,t,n){"use strict";var a=n("79de"),o=n.n(a);o.a},"698f":function(e,t,n){"use strict";var a=n("c3a3"),o=n.n(a);o.a},"70f2":function(e,t,n){},"79de":function(e,t,n){},"79f6":function(e,t,n){"use strict";var a=n("bc3a"),o=n.n(a);o.a.defaults.withCredentials=!0;var i="https://welcomeqr.codes",r=o.a.create({baseURL:i,withCredentials:!0});t["a"]=r},b143:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"e",(function(){return s})),n.d(t,"d",(function(){return c}));var a=n("2b0e"),o=new a["a"],i="globalspinner",r="usermessages",s="sitemodal",c="SERVER_AUTH_ERROR_MESSAGE"},c3a3:function(e,t,n){},caaa:function(e,t,n){"use strict";var a=n("2045"),o=n.n(a);o.a},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a,o=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"app-main"},[n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.showGlobalSpinner,expression:"showGlobalSpinner"}],staticClass:"global-spinner-con"},[n("loading")],1)]),n("transition-group",{attrs:{name:"fade",mode:"out-in"}},[[e.showsitemodal?n("sitemodal",e._b({key:1},"sitemodal",{contains:e.contains},!1)):e._e(),e.checkroute?n("navbar",{key:2}):e._e(),n("router-view",{key:3}),e.loadPushed&&e.showfooter?n("qrfooter",{key:4}):e._e()]],2),e.showUserMessage?n("usermessages",e._b({},"usermessages",{msg:e.msg,black:e.black,sass:e.sass},!1)):e._e()],1)},r=[],s=(n("c975"),n("b0c0"),n("d3b7"),n("ac1f"),n("3ca3"),n("841c"),n("ddb0"),n("2b3d"),n("5530")),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"navbar-con"},[n("transition",{attrs:{name:"fade",mode:"in-out"}},["home"===e.$route.name||e.scrolledTop?n("div",{staticClass:"navbar-left"},[n("div",{staticClass:"logo-con",on:{click:e.routehome}},[n("img",{attrs:{src:"/svg/smallogo.svg"}})])]):e._e()]),n("div",{staticClass:"spacer"}),e.isauthed?n("div",{staticClass:"account-active-indic",on:{click:e.togglecanvas}},[e._m(0),n("h6",{staticClass:"small-6"},[e._v("ACCOUNT")])]):e._e(),n("div",{staticClass:"hamburger",on:{click:e.togglecanvas}},[n("div",{staticClass:"line"}),n("div",{staticClass:"line"}),n("div",{staticClass:"line"})]),n("transition",{attrs:{name:"fade",mode:"in-out"}},[e.canvasopen?n("div",{staticClass:"canvas-nav"},[n("div",{staticClass:"canvas-text-con"},[n("div",{staticClass:"big-x",on:{click:e.togglecanvas}},[n("div",{staticClass:"line"}),n("div",{staticClass:"line"})]),n("div",{staticClass:"canvas-item",on:{click:e.togglecanvas}},[n("router-link",{attrs:{to:{path:"/"}}},[e._v("home")])],1),n("div",{staticClass:"canvas-item",on:{click:e.togglecanvas}},[n("router-link",{attrs:{to:{path:"/pricing"}}},[e._v("pricing")])],1),n("div",{staticClass:"canvas-item",on:{click:e.togglecanvas}},[n("router-link",{attrs:{to:{path:"/app"}}},[e._v(e._s(e.isauthed?"Your Websites":"Try For Free"))])],1),n("div",{staticClass:"canvas-item",on:{click:e.togglecanvas}},[n("router-link",{attrs:{to:{path:"/auth"}}},[e._v("Login / SignUp")])],1),e.isauthed?n("div",{staticClass:"account-settings"},[n("div",{staticClass:"canvas-item account",on:{click:e.togglecanvas}},[n("div",{staticClass:"avatar-icon"},[n("img",{attrs:{width:"40",src:"/svg/avatar.svg"}})]),n("router-link",{attrs:{to:{path:"/account"}}},[e._v("Account")])],1),n("div",{staticClass:"canvas-item account",on:{click:e.togglecanvas}},[n("button",{staticClass:"button",on:{click:e.logout}},[e._v("LOGOUT")])])]):e._e()])]):e._e()])],1)},u=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"avatar-icon"},[n("img",{attrs:{src:"/svg/avatar.svg"}})])}],l=n("2f62"),d=n("b143"),f={name:"navbar",data:function(){return{canvasopen:!1,scrolledTop:!0}},methods:{togglecanvas:function(){var e=this;setTimeout((function(){e.canvasopen=!e.canvasopen}),200)},routehome:function(){this.$router.push({path:"/"})},logout:function(){var e=this;this.$QAuth.logout().then((function(t){e.$store.commit("IS_AUTHED",t.data.user),d["a"].$emit(d["c"],{is:!0,msg:"You are now logged out!",color:"secondary",black:!1}),e.$router.push({path:"/auth"})}))}},computed:Object(s["a"])({},Object(l["b"])(["scrollY","isauthed"])),watch:{scrollY:function(e){this.scrolledTop=e<90}}},h=f,m=(n("4e23"),n("2877")),p=Object(m["a"])(h,c,u,!1,null,"5c841c93",null),v=p.exports,g=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},b=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"qr-footer"},[n("figure",{staticClass:"logo-container"},[n("img",{attrs:{src:"/svg/largelogo.svg",alt:"Welcome QR logo",width:"100%"}})]),n("div",{staticClass:"tilde-spacer"},[e._v("~")]),n("div",{staticClass:"text-container"},[n("h4",{staticClass:"h4"},[e._v("Welcome QR Codes")])]),n("div",{staticClass:"tilde-spacer"},[e._v("~")]),n("div",{staticClass:"text-container sub"},[n("h4",{staticClass:"h4"},[e._v("Be modern")])])])}],k={name:"qrfooter"},w=k,_=(n("698f"),Object(m["a"])(w,g,b,!1,null,"3d2f8173",null)),y=_.exports,C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"modal-container"},[n("div",{staticClass:"modal-background",on:{click:e.closeModal,keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.closeModal(t)}}}),n("div",{staticClass:"modal-card"},[n("div",{staticClass:"modal-card-head"},[n("div",{staticClass:"close-icon",attrs:{"aria-label":"close"},on:{click:e.closeModal}})]),n("div",{staticClass:"modal-card-content"},["details"===e.contains?n("detailsmodal"):e._e(),"editor"===e.contains?n("editormodal"):e._e(),"preview"===e.contains?n("previewmodal"):e._e()],1)])])},E=[],x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v("DETAILS")])},S=[],O={name:"detailsmodal"},T=O,R=Object(m["a"])(T,x,S,!1,null,"48e4701a",null),j=R.exports,L=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v("EDITOR")])},A=[],$={name:"editormodal"},W=$,Q=Object(m["a"])(W,L,A,!1,null,"79945847",null),I=Q.exports,U=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v("PREVIEW")])},N=[],P={name:"previewmodal"},B=P,q=Object(m["a"])(B,U,N,!1,null,"756bdf14",null),H=q.exports,D={name:"sitemodal",components:{detailsmodal:j,editormodal:I,previewmodal:H},props:{contains:{type:String||null,required:!0}},methods:{closeModal:function(){d["a"].$emit(d["e"],!1)}}},M=D,Y=(n("33da"),Object(m["a"])(M,C,E,!1,null,"dbf3f864",null)),G=Y.exports,F=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("div",{staticClass:"message-container",class:e.sass,style:e.black?{color:"black"}:{color:"white"}},[e._v(" "+e._s(e.msg)+" ")])])},z=[],Z={name:"usermessages",props:{sass:{type:String,validator:function(e){return-1!==["primary","secondary","tertiary","highlight","white",""].indexOf(e)}},msg:{required:!0,type:String},black:{type:Boolean,required:!0}},mounted:function(){setTimeout((function(){d["a"].$emit(d["c"],{is:!1})}),7e3)}},J=Z,V=(n("2133"),Object(m["a"])(J,F,z,!1,null,"544c24b2",null)),K=V.exports,X=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},ee=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"square5"}},[n("span"),n("span"),n("span"),n("span")])}],te={name:"loading"},ne=te,ae=(n("caaa"),Object(m["a"])(ne,X,ee,!1,null,"b0ea3024",null)),oe=ae.exports,ie=arguments,re=void 0,se=function(e,t){var n,a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return function(){var o=re,i=ie,r=function(){n=null,a||e.apply(o,i)},s=a&&!n;clearTimeout(n),n=setTimeout(r,t),s&&e.apply(o,i)}},ce=se,ue={name:"app",components:{navbar:v,qrfooter:y,sitemodal:G,loading:oe,usermessages:K},data:function(){return{showsitemodal:!1,showGlobalSpinner:!1,contains:null,loadPushed:!1,showUserMessage:!1,msg:"",sass:"",black:""}},beforeCreate:function(){var e=this;this.$QAuth.checktoken()&&this.$QAuth.authenticate(!1).then((function(t){e.$store.commit("IS_AUTHED",t.data.user)}))},created:function(){this.SET_WINDOW_SIZE(),this.SET_SCROLL_LOCATION()},mounted:function(){var e=this;d["a"].$on(d["b"],(function(t){e.showGlobalSpinner=t})),d["a"].$on(d["c"],(function(t){e.showUserMessage=t.is,e.msg=t.msg||"",e.sass=t.color||"",e.black=t.black||!1})),d["a"].$on(d["e"],(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;t?(e.contains=t,e.showsitemodal=!0):e.showsitemodal=!1}));var t=new URLSearchParams(window.location.search);"true"===t.get("redirect")&&(d["a"].$emit(d["c"],{is:!0,msg:"You need to be logged in to view that page!",color:"tertiary",black:!1}),this.$router.push({path:"/auth"})),a=this,window.addEventListener("resize",ce(this.sizeChange,500)),window.addEventListener("scroll",ce(this.scrollChange,100)),setTimeout((function(){return e.loadPushed=!0}),1500)},methods:Object(s["a"])(Object(s["a"])({},Object(l["c"])(["SET_WINDOW_SIZE","SET_SCROLL_LOCATION"])),{},{sizeChange:function(){a.SET_WINDOW_SIZE()},scrollChange:function(){a.SET_SCROLL_LOCATION()}}),computed:{checkroute:function(){return-1===["create","wapp","preview"].indexOf(this.$route.name)},showfooter:function(){return-1===["auth"].indexOf(this.$route.name)}}},le=ue,de=(n("cf25"),Object(m["a"])(le,i,r,!1,null,null,null)),fe=de.exports,he=n("9483");Object(he["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var me=n("8c4f"),pe=(n("a4d3"),n("e01a"),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0,n=document.getElementById("__meta_description"),a=document.getElementsByTagName("title")[0];if(e)if(a.text=e.title,n.content=e.description,e.noindex){var o=document.createElement("meta");o.name="robots",o.content="noindex",document.getElementsByTagName("head")[0].appendChild(o)}else try{for(var i=document.getElementsByTagName("meta"),r=0;r<i.length;r+=1)i[r]&&i[r].parentNode&&"robots"===i[r].name&&i[r].parentNode.removeChild(i[r])}catch(s){t&&t()}return!!t&&t()}),ve=pe,ge=function(){return n.e("chunk-bd3af8f6").then(n.bind(null,"6511"))},be=function(){return n.e("chunk-7ac4a64c").then(n.bind(null,"9daa"))},ke=function(){return n.e("chunk-6096a9e4").then(n.bind(null,"6ecd"))},we=function(){return n.e("chunk-22e8a7e4").then(n.bind(null,"b5c4"))},_e=function(){return n.e("chunk-2d0daf4e").then(n.bind(null,"6e8a"))},ye=function(){return n.e("chunk-e9fa01c0").then(n.bind(null,"7a47"))},Ce=function(){return n.e("chunk-d13b04ae").then(n.bind(null,"b8c7"))},Ee=function(){return n.e("chunk-afd14b86").then(n.bind(null,"43a0"))},xe=function(){return n.e("chunk-9d34e4fe").then(n.bind(null,"441b"))},Se=function(){return n.e("chunk-2ef61d56").then(n.bind(null,"0fe0"))},Oe=function(){return n.e("chunk-8085e76e").then(n.bind(null,"1f6b"))};o["a"].use(me["a"]);var Te,Re=[{path:"/",name:"home",component:ge,beforeEnter:function(e,t,n){ve({title:"Welcome QR | Description",description:"Brief description of how Welcome QR functions and the benefits it can provide to customers.",noindex:!0},n)}},{path:"/auth",name:"auth",component:ke,beforeEnter:function(e,t,n){ve({title:"Login ~ Signup",description:"Login and Signup here!",noindex:!0},n)}},{path:"/pricing",name:"pricing",component:be,beforeEnter:function(e,t,n){ve({title:"Welcome QR | Pricing",description:"Brief description of how Welcome QR Codes prices it's products. Gives details of different plans and tiers offered and the services included in each tier.",noindex:!0},n)}},{path:"/app",name:"wapp",component:_e,redirect:"/app/manage",beforeEnter:function(e,t,n){ve({title:"Welcome QR | Create New QR",description:"Where the magic happens, create a new dowmloadable QR code and associate website and content",noindex:!0},n)},children:[{path:"/app/manage",name:"manage",component:Ce,beforeEnter:function(e,t,n){ve({title:"Welcome QR | Manage",description:"Where the magic happens, create a new downloadable QR code and associate website and content.",noindex:!0},n)}},{path:"/app/create",name:"create",component:ye,beforeEnter:function(e,t,n){ve({title:"Welcome QR | Create Your Site",description:"Where the magic happens, create a new downloadable QR code and associate website and content.",noindex:!0},n)}},{path:"/app/preview",name:"preview",component:Ee,beforeEnter:function(e,t,n){ve({title:"Welcome QR | Preview",description:"Where the magic happens, create a new downloadable QR code and associate website and content.",noindex:!0},n)}},{path:"/account",name:"account",component:we,beforeEnter:function(e,t,n){ve({title:"Welcome QR | Account",description:"Manage all the information we need to keep your account working as intened",noindex:!0},n)}}]},{path:"/privacy",name:"privacy",component:Se,beforeEnter:function(e,t,n){ve({title:"Welcome QR |Privacy Policy",description:"Brief description of how Welcome QR Codesmanages and takes care of your data and your datas security.",noindex:!0},n)}},{path:"/terms-and-conditions",name:"terms",component:xe,beforeEnter:function(e,t,n){ve({title:"Welcome QR | Terms and Conditions",description:"Brief description of how Welcome QR Codes does business in a legal sense, information on your rights and our methods of operation",noindex:!0},n)}},{path:"*",name:"notfound",component:Oe,beforeEnter:function(e,t,n){ve({title:"",description:"",noindex:!0},n)}}],je=new me["a"]({mode:"history",base:"/",routes:Re,scrollBehavior:function(e,t,n){return n||{x:0,y:0}}}),Le=je,Ae={user:{email:null,id:null,authed:!1,subdom:null},ui:{windowWidth:0,windowHeight:0,scrollY:0}},$e=Ae,We={windowWidth:function(e){return e.ui.windowWidth},windowHeight:function(e){return e.ui.windowHeight},scrollY:function(e){return e.ui.scrollY},isauthed:function(e){return e.user.authed},getuser:function(e){return e.user}},Qe=We,Ie=n("ade3"),Ue="SET_WINDOW_SIZE",Ne="SET_SCROLL_LOCATION",Pe="IS_AUTHED",Be=(Te={},Object(Ie["a"])(Te,Pe,(function(e,t){e.user.authed=t.authed,e.user.email=t.email,e.user.id=t.id,e.user.subdom=t.subdom,null!==t.id&&t.authed?et.settoken(t.id):et.removetoken()})),Object(Ie["a"])(Te,Ue,(function(e){e.ui.windowWidth=window.innerWidth,e.ui.windowHeight=window.innerHeight})),Object(Ie["a"])(Te,Ne,(function(e){e.ui.scrollY=window.scrollY})),Te),qe=Be,He=n("79f6"),De={SESSION_CHALLENGE:function(e){var t=e.commit;He["a"].get("/user/session_challenge").then((function(){t("IS_AUTHED",!0)})).catch((function(){t("IS_AUTHED",!1)}))}},Me=De;o["a"].use(l["a"]);var Ye=new l["a"].Store({state:$e,actions:Me,getters:Qe,mutations:qe}),Ge=n("d4ec"),Fe=n("bee2"),ze=n("bc3a"),Ze=n.n(ze);var Je=function(){function e(){var t=this;Object(Ge["a"])(this,e),this.BASE_URL="https://welcomeqr.codes/auth",this.AUTH_URL="https://welcomeqr.codes/?redirect=true",this.ax=Ze.a.create({baseURL:this.BASE_URL,withCredentials:!0}),this.ax.interceptors.response.use((function(e){return e}),(function(e){return e.response&&e.response.data.userError&&d["a"].$emit(d["d"],e.response.data.userError),e.response&&e.response.status>400&&e.response.data.intercept&&(window.location.href=t.AUTH_URL,d["a"].$emit(d["b"],!1)),t.removetoken(),Promise.reject(e)}))}return Object(Fe["a"])(e,[{key:"settoken",value:function(e){localStorage.setItem("QToken",e)}},{key:"removetoken",value:function(){localStorage.removeItem("QToken")}},{key:"checktoken",value:function(){return!!localStorage.getItem("QToken")&&""!==localStorage.getItem("QToken")}},{key:"authenticate",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return this.ax.post("/session_challenge",{intercept:e})}},{key:"confirm",value:function(e,t){return this.ax.post("/confirm",{email:e,token:t})}},{key:"logout",value:function(){return this.ax.post("/logout")}},{key:"info",value:function(){return this.ax.post("/info")}},{key:"signup",value:function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return this.ax.post("/signup",{email:e,password:t,confirm:n,intercept:a})}},{key:"login",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return this.ax.post("/login",{email:e,password:t,intercept:n})}},{key:"reconfirm",value:function(e){return this.ax.post("/reconfirm",{email:e})}},{key:"startrecovery",value:function(e){return this.ax.post("/startrecovery",{email:e})}},{key:"recover",value:function(e,t,n){return this.ax.post("/recover",{email:e,token:t,password:n})}},{key:"googleSignUp",value:function(e){return this.ax.get("/google",{headers:{Authorization:"Bearer ".concat(e.code)}})}}]),e}();var Ve=function(){function e(){Object(Ge["a"])(this,e),this.BASE_URL="https://welcomeqr.codes/api",this.ax=Ze.a.create({baseURL:this.BASE_URL,withCredentials:!0}),this.ax.interceptors.response.use((function(e){return e}),(function(e){return e.response&&e.response.status>400&&e.response.status<500&&e.response.data.intercept,Promise.reject(e)}))}return Object(Fe["a"])(e,[{key:"submitnew",value:function(e,t,n){var a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return this.ax.post("/submitnew",{intercept:a,html:e,user:t,name:n})}},{key:"getall",value:function(e){return this.ax.post("/getallforuser",{userid:e})}},{key:"checksubdom",value:function(e){return this.ax.post("/checksubdom",{subdom:e,intercept:!1})}},{key:"submitsubdom",value:function(e,t){return this.ax.post("/submitsubdom",{subdom:e,userid:t})}},{key:"getHTML",value:function(){return this.ax.post("/gethtmlforuser")}},{key:"generateRandomSubDom",value:function(){return this.ax.post("/generatesubdom")}}]),e}(),Ke=n("c9bf");o["a"].use(Ke["a"],{clientId:"".concat("1088480820060-jqd7a1hula2a8j3nl7grootg3k0qe3hm",".apps.googleusercontent.com"),scope:"profile email",prompt:"select_account"}),o["a"].config.productionTip=!1;var Xe=new Je;o["a"].prototype.$QAuth=Xe,o["a"].prototype.$QEdit=new Ve,new o["a"]({router:Le,store:Ye,render:function(e){return e(fe)}}).$mount("#app");var et=t["default"]=Xe},cf25:function(e,t,n){"use strict";var a=n("4889"),o=n.n(a);o.a},facd:function(e,t,n){}});
//# sourceMappingURL=app.c07765c3.js.map
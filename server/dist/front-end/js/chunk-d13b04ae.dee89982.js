(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d13b04ae"],{"201f":function(t,e,a){},"2b2d":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"field-container",style:{width:t.fullwidth?"100%":"auto"}},[a("span",{staticClass:"input-row"},["checkbox"===t.localtype?a("input",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticClass:"form-input",style:{width:t.setwidth},attrs:{placeholder:" ",autocomplete:t.hasautocomplete,required:t.isrequired,type:"checkbox"},domProps:{checked:Array.isArray(t.val)?t._i(t.val,null)>-1:t.val},on:{focus:function(e){t.touched=!0},blur:t.onBlur,input:function(e){t.touched=!0},change:function(e){var a=t.val,i=e.target,s=!!i.checked;if(Array.isArray(a)){var n=null,o=t._i(a,n);i.checked?o<0&&(t.val=a.concat([n])):o>-1&&(t.val=a.slice(0,o).concat(a.slice(o+1)))}else t.val=s}}}):"radio"===t.localtype?a("input",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticClass:"form-input",style:{width:t.setwidth},attrs:{placeholder:" ",autocomplete:t.hasautocomplete,required:t.isrequired,type:"radio"},domProps:{checked:t._q(t.val,null)},on:{focus:function(e){t.touched=!0},blur:t.onBlur,input:function(e){t.touched=!0},change:function(e){t.val=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticClass:"form-input",style:{width:t.setwidth},attrs:{placeholder:" ",autocomplete:t.hasautocomplete,required:t.isrequired,type:t.localtype},domProps:{value:t.val},on:{focus:function(e){t.touched=!0},blur:t.onBlur,input:[function(e){e.target.composing||(t.val=e.target.value)},function(e){t.touched=!0}]}}),"password"===t.inptype?a("img",{attrs:{src:"password"===t.localtype?"/svg/eye.svg":"/svg/eye-slash.svg"},on:{click:t.toggletype}}):t._e()]),a("label",{class:t.stayactive?"stay-active":"placey-text",on:{click:t.setInputActive}},[t._v(" "+t._s(t.placey)+" ")]),a("div",{staticClass:"error-text-con"},[""!==t.errortxt?a("div",{staticClass:"error-icon"}):t._e(),a("p",{staticClass:"error-text"},[t._v(t._s(t.errortxt))])])])},s=[],n={name:"qinput",props:{fullwidth:{default:!0,type:Boolean},setwidth:{default:"100%",type:String},placey:{type:String,required:!0},errortxt:{type:String,required:!0},eventname:{type:String,required:!0},isrequired:{type:Boolean,required:!1,default:!1},hasautocomplete:{type:Boolean,required:!1,default:!1},inptype:{type:String,required:!0}},data:function(){return{val:"",touched:!1,localtype:""}},created:function(){this.localtype=this.inptype},mounted:function(){var t=this;this.$nextTick((function(){t.$el.firstChild.firstChild.focus()}))},methods:{setInputActive:function(){this.touched=!0,this.$el.firstChild.firstChild.focus()},onBlur:function(t){this.touched=!1,t&&this.email!==t.target.value&&(this.email=t.target.value)},toggletype:function(){this.localtype="password"===this.localtype?"text":"password"}},computed:{stayactive:function(){return""!==this.val||this.touched}},watch:{val:function(t,e){t.length-e.length>5&&(this.touched=!0),this.$emit(this.eventname,this.val)}}},o=n,r=(a("eb1e"),a("2877")),c=Object(r["a"])(o,i,s,!1,null,"827b4cca",null);e["a"]=c.exports},"307f":function(t,e,a){},"90c2":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:t.getSize,height:t.getSize,viewBox:"0 0 24 24",fill:t.vars[t.color]}},["cloud-up"===t.icon?a("cloudup"):t._e(),"eye"===t.icon?a("eye"):t._e(),"file-tick"===t.icon?a("filetick"):t._e(),"cog"===t.icon?a("cog"):t._e()],1)},s=[],n=(a("c975"),a("b64b"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("path",{attrs:{d:"M18.42,8.22A7,7,0,0,0,5.06,10.11,4,4,0,0,0,6,18a1,1,0,0,0,0-2,2,2,0,0,1,0-4,1,1,0,0,0,1-1,5,5,0,0,1,9.73-1.61,1,1,0,0,0,.78.67,3,3,0,0,1,.24,5.84,1,1,0,0,0,.5,1.94,5,5,0,0,0,.17-9.62Zm-5.71,2.07a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L11,13.41V19a1,1,0,0,0,2,0V13.41l1.29,1.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"}})}),o=[],r={name:"cloudup"},c=r,u=a("2877"),l=Object(u["a"])(c,n,o,!1,null,null,null),d=l.exports,h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("path",{attrs:{d:"M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"}})},p=[],m={name:"eye"},f=m,v=Object(u["a"])(f,h,p,!1,null,null,null),b=v.exports,g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("path",{attrs:{d:"M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Zm9.71-2.71L19.36,9V5.64a1,1,0,0,0-1-1H15.05L12.71,2.29a1,1,0,0,0-1.42,0L9,4.64H5.64a1,1,0,0,0-1,1V9L2.29,11.29a1,1,0,0,0,0,1.42l2.35,2.34v3.31a1,1,0,0,0,1,1H9l2.34,2.35a1,1,0,0,0,1.42,0l2.34-2.35h3.31a1,1,0,0,0,1-1V15.05l2.35-2.34A1,1,0,0,0,21.71,11.29Zm-4.05,2.64a1,1,0,0,0-.3.71v2.72H14.64a1,1,0,0,0-.71.3L12,19.59l-1.93-1.93a1,1,0,0,0-.71-.3H6.64V14.64a1,1,0,0,0-.3-.71L4.41,12l1.93-1.93a1,1,0,0,0,.3-.71V6.64H9.36a1,1,0,0,0,.71-.3L12,4.41l1.93,1.93a1,1,0,0,0,.71.3h2.72V9.36a1,1,0,0,0,.3.71L19.59,12Z"}})},y=[],_={name:"cog"},w=_,k=Object(u["a"])(w,g,y,!1,null,null,null),x=k.exports,C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("path",{attrs:{d:"M11.5,20h-6a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1h5V7a3,3,0,0,0,3,3h3v5a1,1,0,0,0,2,0V9s0,0,0-.06a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.29.29,0,0,0-.1,0A1.1,1.1,0,0,0,11.56,2H5.5a3,3,0,0,0-3,3V19a3,3,0,0,0,3,3h6a1,1,0,0,0,0-2Zm1-14.59L15.09,8H13.5a1,1,0,0,1-1-1ZM7.5,14h6a1,1,0,0,0,0-2h-6a1,1,0,0,0,0,2Zm4,2h-4a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm-4-6h1a1,1,0,0,0,0-2h-1a1,1,0,0,0,0,2Zm13.71,6.29a1,1,0,0,0-1.42,0l-3.29,3.3-1.29-1.3a1,1,0,0,0-1.42,1.42l2,2a1,1,0,0,0,1.42,0l4-4A1,1,0,0,0,21.21,16.29Z"}})},q=[],$={name:"file-up"},A=$,S=Object(u["a"])(A,C,q,!1,null,null,null),Z=S.exports,O=a("e4c9"),E=a.n(O),j=["cloud-up","eye","file-tick","cog"],V={small:26,medium:42,large:62,xlarge:78},H={name:"qicon",components:{cloudup:d,eye:b,filetick:Z,cog:x},props:{color:{type:String,required:!0,validator:function(t){return-1!==Object.keys(E.a).indexOf(t)}},icon:{type:String,required:!0,validator:function(t){return-1!==j.indexOf(t)}},size:{type:String,required:!1,default:"small",validator:function(t){return-1!==Object.keys(V).indexOf(t)}}},data:function(){return{vars:E.a,sizemap:V}},computed:{getSize:function(){return this.sizemap[this.size]}}},L=H,z=Object(u["a"])(L,i,s,!1,null,null,null);e["a"]=z.exports},"9d26":function(t,e,a){"use strict";var i=a("201f"),s=a.n(i);s.a},b8c7:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{directives:[{name:"show",rawName:"v-show",value:!t.authinprog,expression:"!authinprog"}],staticClass:"manage-container"},[t.getuser.subdom?t._e():a("h6",{staticClass:"h6"},[t._v("We need some details before you can get started")]),a("qicon",{attrs:{color:"link",icon:"eye",size:"xlarge"}}),t.getuser.subdom?[a("h4",{staticClass:"h4"},[t._v("Your subdomain is")]),a("h5",{staticClass:"h5"},[t._v("https://"+t._s(t.getuser.subdom)+".welcomeqr.codes")]),a("h6",{staticClass:"h6"},[t._v("Any websites you publish will be hosted at that address")]),a("router-link",{staticClass:"button",attrs:{tag:"button",to:{path:"/app/create"}}},[t._v("Start editing")])]:[a("div",{staticClass:"subdom-input-container"},[a("span",{staticClass:"pre"},[t._v("https://")]),t.getuser.subdom?t._e():a("qinput",{ref:"subdom",attrs:{fullwidth:!1,setwidth:"350px",inptype:"text",placey:"Your unique sub domain...",errortxt:"",eventname:"subdominput",isrequired:!0,hasautocomplete:!1},on:{subdominput:t.checksubdom}}),a("span",{staticClass:"suf"},[t._v(".welcomeqr.codes")]),t.subdomok?a("span",{staticClass:"icon tick"}):a("span",{staticClass:"icon bigx"}),t.checking?a("loadinginline",{staticClass:"icon"}):t._e()],1),a("div",{staticClass:"subdom-button-container"},[a("button",{staticClass:"button-small subsubmit first",on:{click:t.submitsubdom}},[t._v("I'm Happy With My Sub Domain!")]),a("button",{staticClass:"button-small subsubmit second",on:{click:t.getrandomsubdom}},[t._v("Generate Random Sub Domain!")])])],t._l(t.editors,(function(e,i){return a("div",{key:i},[a("router-link",{attrs:{to:{path:"/app/create"}}},[t._v(" "+t._s(e._id)+" ")])],1)}))],2)},s=[],n=a("5530"),o=a("b143"),r=a("2f62"),c=a("2b2d"),u=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},l=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"square5"}},[a("span"),a("span"),a("span"),a("span")])}],d={name:"loadinginline"},h=d,p=(a("9d26"),a("2877")),m=Object(p["a"])(h,u,l,!1,null,"25003c31",null),f=m.exports,v=a("90c2"),b={name:"manage",components:{qinput:c["a"],loadinginline:f,qicon:v["a"]},data:function(){return{editors:[],subdom:"",checking:!1,subdomok:!1,proceed:!1,authinprog:!0}},created:function(){var t=this;o["a"].$emit(o["b"],!0),this.$QAuth.authenticate().then((function(e){t.$store.commit("IS_AUTHED",e.data.user),e.data.user.subdom&&(t.subdom=e.data.user.subdom),o["a"].$emit(o["b"],!1),t.authinprog=!1}))},methods:{getrandomsubdom:function(){var t=this;this.$QEdit.generateRandomSubDom().then((function(e){t.$refs["subdom"].$data.val=e.data.subdom}))},checksubdom:function(t){var e=this;this.checking=!0,t&&(this.subdom=t),this.$QEdit.checksubdom(this.subdom).then((function(t){e.checking=!1,e.subdomok=t.data.okay}))},submitsubdom:function(){var t=this;this.$QEdit.submitsubdom(this.subdom,this.getuser.id).then((function(e){e.data.user.subdom&&(t.proceed=!0,t.$store.commit("IS_AUTHED",e.data.user))}))}},computed:Object(n["a"])({},Object(r["b"])(["getuser"]))},g=b,y=(a("c4e0"),Object(p["a"])(g,i,s,!1,null,"926918b6",null));e["default"]=y.exports},c1fd:function(t,e,a){},c4e0:function(t,e,a){"use strict";var i=a("307f"),s=a.n(i);s.a},e4c9:function(t,e,a){t.exports={primary:"#f57c00",secondary:"#009688",tertiary:"#f44336",highlight:"#f4a236",link:"#1976d2",font:"#212121",darkgray:"dimgray",mediumgray:"#a9a9a9","light-gray":"#d3d3d3",verylightgray:"#f4f4f4"}},eb1e:function(t,e,a){"use strict";var i=a("c1fd"),s=a.n(i);s.a}}]);
//# sourceMappingURL=chunk-d13b04ae.dee89982.js.map
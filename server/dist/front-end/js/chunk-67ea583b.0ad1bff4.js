(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67ea583b"],{"23d6":function(t,e,a){},"2b2d":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"field-container",style:{width:t.fullwidth?"100%":"auto"}},[a("span",{staticClass:"input-row"},["checkbox"===t.localtype?a("input",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticClass:"form-input",style:{width:t.setwidth},attrs:{placeholder:" ",autocomplete:t.hasautocomplete,required:t.isrequired,type:"checkbox"},domProps:{checked:Array.isArray(t.val)?t._i(t.val,null)>-1:t.val},on:{focus:function(e){t.touched=!0},blur:t.onBlur,input:function(e){t.touched=!0},change:function(e){var a=t.val,s=e.target,i=!!s.checked;if(Array.isArray(a)){var r=null,o=t._i(a,r);s.checked?o<0&&(t.val=a.concat([r])):o>-1&&(t.val=a.slice(0,o).concat(a.slice(o+1)))}else t.val=i}}}):"radio"===t.localtype?a("input",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticClass:"form-input",style:{width:t.setwidth},attrs:{placeholder:" ",autocomplete:t.hasautocomplete,required:t.isrequired,type:"radio"},domProps:{checked:t._q(t.val,null)},on:{focus:function(e){t.touched=!0},blur:t.onBlur,input:function(e){t.touched=!0},change:function(e){t.val=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticClass:"form-input",style:{width:t.setwidth},attrs:{placeholder:" ",autocomplete:t.hasautocomplete,required:t.isrequired,type:t.localtype},domProps:{value:t.val},on:{focus:function(e){t.touched=!0},blur:t.onBlur,input:[function(e){e.target.composing||(t.val=e.target.value)},function(e){t.touched=!0}]}}),"password"===t.inptype?a("img",{attrs:{src:"password"===t.localtype?"/svg/eye.svg":"/svg/eye-slash.svg"},on:{click:t.toggletype}}):t._e()]),a("label",{class:t.stayactive?"stay-active":"placey-text",on:{click:t.setInputActive}},[t._v(" "+t._s(t.placey)+" ")]),a("div",{staticClass:"error-text-con"},[""!==t.errortxt?a("div",{staticClass:"error-icon"}):t._e(),a("p",{staticClass:"error-text"},[t._v(t._s(t.errortxt))])])])},i=[],r={name:"qinput",props:{fullwidth:{default:!0,type:Boolean},setwidth:{default:"100%",type:String},placey:{type:String,required:!0},errortxt:{type:String,required:!0},eventname:{type:String,required:!0},isrequired:{type:Boolean,required:!1,default:!1},hasautocomplete:{type:Boolean,required:!1,default:!1},inptype:{type:String,required:!0}},data:function(){return{val:"",touched:!1,localtype:""}},created:function(){this.localtype=this.inptype},mounted:function(){var t=this;this.$nextTick((function(){t.$el.firstChild.firstChild.focus()}))},methods:{setInputActive:function(){this.touched=!0,this.$el.firstChild.firstChild.focus()},onBlur:function(t){this.touched=!1,t&&this.email!==t.target.value&&(this.email=t.target.value)},toggletype:function(){this.localtype="password"===this.localtype?"text":"password"}},computed:{stayactive:function(){return""!==this.val||this.touched}},watch:{val:function(t,e){t.length-e.length>5&&(this.touched=!0),this.$emit(this.eventname,this.val)}}},o=r,n=(a("c778"),a("2877")),l=Object(n["a"])(o,s,i,!1,null,"0e737ed6",null);e["a"]=l.exports},"6eae":function(t,e,a){},7409:function(t,e,a){"use strict";var s=a("6eae"),i=a.n(s);i.a},bd01:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"auth-item-container"},[a("h2",{staticClass:"h2"},[t._v("Login")]),a("h6",{staticClass:"error-h6"},[t._v(t._s(t.servermsg))]),a("qinput",{attrs:{inptype:"email",placey:"Email",errortxt:t.emailerror,eventname:"emailinput",isrequired:!0,hasautocomplete:!0},on:{emailinput:t.validateemail}}),a("qinput",{attrs:{inptype:"password",placey:"Password",errortxt:t.passerror,eventname:"passwordinput",isrequired:!0,hasautocomplete:!0},on:{passwordinput:t.validatepassword}}),a("div",{staticClass:"button-container"},[a("a",{attrs:{href:t.buildLink}},[t._m(0)]),a("button",{staticClass:"button submit",class:{disabled:!t.validated},attrs:{disabled:!t.validated,type:"submit"},on:{click:t.submit}},[t._v(" SUBMIT ")]),a("p",[t._v("Don't have an account? "),a("router-link",{attrs:{to:{path:"/auth/signup"}}},[t._v("Sign Up here.")])],1),a("p",[a("router-link",{attrs:{to:{path:"/auth/forgot"}}},[t._v("Trouble logging in?")])],1)])],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"google-btn",staticStyle:{width:"100%"}},[a("div",{staticClass:"google-icon-wrapper"},[a("img",{staticClass:"google-icon-svg",attrs:{src:"/svg/google.svg"}})]),a("p",{staticClass:"btn-text"},[a("b",[t._v("Continue with Google")])])])}],r=a("2b2d"),o=a("b143"),n={name:"login",components:{qinput:r["a"]},data:function(){return{email:"",password:"",emailerror:"",passerror:"",servermsg:"",googleSignInParams:{client_id:"".concat("1088480820060-jqd7a1hula2a8j3nl7grootg3k0qe3hm",".apps.googleusercontent.com")}}},mounted:function(){var t=this;o["b"].$on(o["e"],(function(e){t.servermsg=e}))},methods:{submit:function(t){var e=this;t.preventDefault(),this.validated&&(this.servermsg="",this.$QAuth.login(this.email,this.password).then((function(t){e.success(t)})))},validateemail:function(t){var e=/^\S+@\S+$/;this.email=t,e.test(this.email)?(this.email,this.emailerror=""):this.emailerror="That email address looks funny, did you type it correctly?"},validatepassword:function(t){this.password=t,this.password.length<8?this.passerror="Password needs to be at least 8 characters long...":(this.password,this.passerror="")},success:function(t){t.data.userError?this.servermsg=t.data.userError:(this.$QAuth.settoken(t.data.user.token),this.$store.commit("IS_AUTHED",t.data.user),o["b"].$emit(o["d"],{is:!0,msg:"You are now logged in! Welcome ".concat(t.data.user.email,"!"),color:"secondary",black:!1}),this.$router.push({path:"/app/manage"}))}},computed:{buildLink:function(){return"/auth/google"},validated:function(){return""===this.emailerror&&""===this.passerror&&""!==this.email&&""!==this.password}}},l=n,c=(a("7409"),a("2877")),u=Object(c["a"])(l,s,i,!1,null,"d1fac768",null);e["default"]=u.exports},c778:function(t,e,a){"use strict";var s=a("23d6"),i=a.n(s);i.a}}]);
//# sourceMappingURL=chunk-67ea583b.0ad1bff4.js.map
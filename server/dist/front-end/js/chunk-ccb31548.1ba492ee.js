(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ccb31548"],{"2b2d":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"field-container",style:{width:t.fullwidth?"100%":"auto"}},[a("span",{staticClass:"input-row"},["checkbox"===t.localtype?a("input",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticClass:"form-input",style:{width:t.setwidth},attrs:{placeholder:" ",autocomplete:t.hasautocomplete,required:t.isrequired,type:"checkbox"},domProps:{checked:Array.isArray(t.val)?t._i(t.val,null)>-1:t.val},on:{focus:function(e){t.touched=!0},blur:t.onBlur,input:function(e){t.touched=!0},change:function(e){var a=t.val,i=e.target,s=!!i.checked;if(Array.isArray(a)){var r=null,o=t._i(a,r);i.checked?o<0&&(t.val=a.concat([r])):o>-1&&(t.val=a.slice(0,o).concat(a.slice(o+1)))}else t.val=s}}}):"radio"===t.localtype?a("input",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticClass:"form-input",style:{width:t.setwidth},attrs:{placeholder:" ",autocomplete:t.hasautocomplete,required:t.isrequired,type:"radio"},domProps:{checked:t._q(t.val,null)},on:{focus:function(e){t.touched=!0},blur:t.onBlur,input:function(e){t.touched=!0},change:function(e){t.val=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticClass:"form-input",style:{width:t.setwidth},attrs:{placeholder:" ",autocomplete:t.hasautocomplete,required:t.isrequired,type:t.localtype},domProps:{value:t.val},on:{focus:function(e){t.touched=!0},blur:t.onBlur,input:[function(e){e.target.composing||(t.val=e.target.value)},function(e){t.touched=!0}]}}),"password"===t.inptype?a("img",{attrs:{src:"password"===t.localtype?"/svg/eye.svg":"/svg/eye-slash.svg"},on:{click:t.toggletype}}):t._e()]),a("label",{class:t.stayactive?"stay-active":"placey-text",on:{click:t.setInputActive}},[t._v(" "+t._s(t.placey)+" ")]),a("div",{staticClass:"error-text-con"},[""!==t.errortxt?a("div",{staticClass:"error-icon"}):t._e(),a("p",{staticClass:"error-text"},[t._v(t._s(t.errortxt))])])])},s=[],r={name:"qinput",props:{fullwidth:{default:!0,type:Boolean},setwidth:{default:"100%",type:String},placey:{type:String,required:!0},errortxt:{type:String,required:!0},eventname:{type:String,required:!0},isrequired:{type:Boolean,required:!1,default:!1},hasautocomplete:{type:Boolean,required:!1,default:!1},inptype:{type:String,required:!0}},data:function(){return{val:"",touched:!1,localtype:""}},created:function(){this.localtype=this.inptype},mounted:function(){var t=this;this.$nextTick((function(){t.$el.firstChild.firstChild.focus()}))},methods:{setInputActive:function(){this.touched=!0,this.$el.firstChild.firstChild.focus()},onBlur:function(t){this.touched=!1,t&&this.email!==t.target.value&&(this.email=t.target.value)},toggletype:function(){this.localtype="password"===this.localtype?"text":"password"}},computed:{stayactive:function(){return""!==this.val||this.touched}},watch:{val:function(t,e){t.length-e.length>5&&(this.touched=!0),this.$emit(this.eventname,this.val)}}},o=r,n=(a("eb1e"),a("2877")),c=Object(n["a"])(o,i,s,!1,null,"827b4cca",null);e["a"]=c.exports},"38c6":function(t,e,a){"use strict";var i=a("9f09"),s=a.n(i);s.a},"4d5b":function(t,e,a){},"6ecd":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",{staticClass:"auth-container"},[a("section",{staticClass:"active-component-container"},[a("login",{directives:[{name:"show",rawName:"v-show",value:"login"===t.active,expression:"active === 'login'"}],on:{wantssignup:function(e){t.active="signup"}}}),a("signup",{directives:[{name:"show",rawName:"v-show",value:"signup"===t.active,expression:"active === 'signup'"}],on:{wantslogin:function(e){t.active="login"}}}),a("forgot",{directives:[{name:"show",rawName:"v-show",value:"forgot"===t.active,expression:"active === 'forgot'"}]})],1)])},s=[],r=(a("d3b7"),a("ac1f"),a("3ca3"),a("841c"),a("ddb0"),a("2b3d"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"auth-item-container"},[a("h2",{staticClass:"h2"},[t._v("Sign Up")]),a("h6",{staticClass:"error-h6"},[t._v(t._s(t.servermsg))]),a("qinput",{attrs:{inptype:"email",placey:"Email",errortxt:t.emailerror,eventname:"emailinput",isrequired:!0,hasautocomplete:!0},on:{emailinput:t.validateemail}}),a("qinput",{attrs:{inptype:"password",placey:"Password",errortxt:t.passerror,eventname:"passwordinput",isrequired:!0,hasautocomplete:!0},on:{passwordinput:t.validatepassword}}),a("qinput",{attrs:{inptype:"password",placey:"Confirm Password",errortxt:t.confirmerror,eventname:"confirminput",isrequired:!0,hasautocomplete:!0},on:{confirminput:t.validateconfirm}}),a("div",{staticClass:"button-container"},[a("a",{attrs:{href:t.buildLink}},[t._m(0)]),a("button",{staticClass:"button submit",class:{disabled:!t.validated},attrs:{disabled:!t.validated,type:"submit"},on:{click:t.submit}},[t._v(" SUBMIT ")]),a("p",{on:{click:function(e){return t.$emit("wantslogin")}}},[t._v("Already have an account? "),a("a",[t._v("Login here.")])])])],1)}),o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"google-btn",staticStyle:{width:"100%"}},[a("div",{staticClass:"google-icon-wrapper"},[a("img",{staticClass:"google-icon-svg",attrs:{src:"/svg/google.svg"}})]),a("p",{staticClass:"btn-text"},[a("b",[t._v("Continue with Google")])])])}],n=(a("79f6"),a("2b2d")),c=a("b143"),l={name:"signup",components:{qinput:n["a"]},data:function(){return{emailerror:"",passerror:"",confirmerror:"",email:"",password:"",confirm:"",servermsg:""}},mounted:function(){var t=this;c["a"].$on(c["d"],(function(e){t.servermsg=e}))},created:function(){var t=this;this.$QAuth.authenticate(!1).then((function(e){t.$store.commit("IS_AUTHED",e.data.user),c["a"].$emit(c["c"],{is:!0,msg:"You are now already logged in as ".concat(e.data.user.email,"!"),color:"secondary",black:!1}),t.$router.push({path:"/app/manage"})}))},methods:{submit:function(t){var e=this;t.preventDefault(),this.validated&&(this.servermsg="",this.$QAuth.signup(this.email,this.password,this.confirm).then((function(t){t.data.userError?e.servermsg=t.data.userError:(e.$store.commit("IS_AUTHED",t.data.user),c["a"].$emit(c["c"],{is:!0,msg:"You are now logged in! Welcome ".concat(t.data.user.email,"!"),color:"secondary",black:!1}),e.$router.push({path:"/app/manage"}))})))},validateemail:function(t){var e=/^\S+@\S+$/;this.email=t,e.test(this.email)?this.emailerror="":this.emailerror="That email address looks funny, did you type if correctly?"},validatepassword:function(t){this.password=t,this.password.length<8?this.passerror="Password needs to be at least 8 characters long":this.passerror=""},validateconfirm:function(t){this.confirm=t,this.password!==this.confirm?this.confirmerror="Passwords don't match":this.confirmerror=""}},computed:{buildLink:function(){return"/auth/google"},validated:function(){return""===this.emailerror&&""===this.passerror&&""===this.confirmerror&&""!==this.email&&""!==this.password&&""!==this.confirm}}},u=l,d=(a("7a3f"),a("2877")),p=Object(d["a"])(u,r,o,!1,null,"6d639119",null),h=p.exports,m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"auth-item-container"},[a("h2",{staticClass:"h2"},[t._v("Login")]),a("h6",{staticClass:"error-h6"},[t._v(t._s(t.servermsg))]),a("qinput",{attrs:{inptype:"email",placey:"Email",errortxt:t.emailerror,eventname:"emailinput",isrequired:!0,hasautocomplete:!0},on:{emailinput:t.validateemail}}),a("qinput",{attrs:{inptype:"password",placey:"Password",errortxt:t.passerror,eventname:"passwordinput",isrequired:!0,hasautocomplete:!0},on:{passwordinput:t.validatepassword}}),a("div",{staticClass:"button-container"},[a("a",{attrs:{href:t.buildLink}},[t._m(0)]),a("button",{staticClass:"button submit",class:{disabled:!t.validated},attrs:{disabled:!t.validated,type:"submit"},on:{click:t.submit}},[t._v(" SUBMIT ")]),a("p",{on:{click:function(e){return t.$emit("wantssignup")}}},[t._v("Don't have an account? "),a("a",[t._v("Sign Up here.")])])])],1)},v=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"google-btn",staticStyle:{width:"100%"}},[a("div",{staticClass:"google-icon-wrapper"},[a("img",{staticClass:"google-icon-svg",attrs:{src:"/svg/google.svg"}})]),a("p",{staticClass:"btn-text"},[a("b",[t._v("Continue with Google")])])])}],f={name:"login",components:{qinput:n["a"]},data:function(){return{email:"",password:"",emailerror:"",passerror:"",servermsg:"",googleSignInParams:{client_id:"".concat("1088480820060-jqd7a1hula2a8j3nl7grootg3k0qe3hm",".apps.googleusercontent.com")}}},created:function(){var t=this;this.$QAuth.authenticate(!1).then((function(e){t.$store.commit("IS_AUTHED",e.data.user),c["a"].$emit(c["c"],{is:!0,msg:"You are now already logged in as ".concat(e.data.user.email,"!"),color:"secondary",black:!1}),t.$router.push({path:"/app/manage"})}))},mounted:function(){var t=this;c["a"].$on(c["d"],(function(e){t.servermsg=e}))},methods:{submit:function(t){var e=this;t.preventDefault(),this.validated&&(this.servermsg="",this.$QAuth.login(this.email,this.password).then((function(t){e.success(t)})))},validateemail:function(t){var e=/^\S+@\S+$/;this.email=t,e.test(this.email)?(this.email,this.emailerror=""):this.emailerror="That email address looks funny, did you type if correctly?"},validatepassword:function(t){this.password=t,this.password.length<8?this.passerror="Password needs to be at least 8 characters long...":(this.password,this.passerror="")},success:function(t){t.data.userError?(googleSignUp,this.servermsg=t.data.userError):(this.$store.commit("IS_AUTHED",t.data.user),c["a"].$emit(c["c"],{is:!0,msg:"You are now logged in! Welcome ".concat(t.data.user.email,"!"),color:"secondary",black:!1}),this.$router.push({path:"/app/manage"}))}},computed:{buildLink:function(){return"/auth/google"},validated:function(){return""===this.emailerror&&""===this.passerror&&""!==this.email&&""!==this.password}}},g=f,w=(a("da5d"),Object(d["a"])(g,m,v,!1,null,"1bb264c0",null)),y=w.exports,b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._v("PLace holder forgot")])},_=[],C={name:"forgot"},$=C,q=Object(d["a"])($,b,_,!1,null,"a895a8b4",null),k=q.exports,x={name:"auth",components:{signup:h,login:y,forgot:k},data:function(){return{active:"login"}},created:function(){var t=new URLSearchParams(window.location.search);"true"===t.get("redirect")&&c["a"].$emit(c["c"],{is:!0,msg:"You need to be logged in to view that page!",color:"tertiary",black:!1})}},S=x,E=(a("38c6"),Object(d["a"])(S,i,s,!1,null,"72cd1f48",null));e["default"]=E.exports},"7a3f":function(t,e,a){"use strict";var i=a("a88a"),s=a.n(i);s.a},"9f09":function(t,e,a){},a88a:function(t,e,a){},c1fd:function(t,e,a){},da5d:function(t,e,a){"use strict";var i=a("4d5b"),s=a.n(i);s.a},eb1e:function(t,e,a){"use strict";var i=a("c1fd"),s=a.n(i);s.a}}]);
//# sourceMappingURL=chunk-ccb31548.1ba492ee.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5592a6d7"],{"23d6":function(t,e,s){},"2b2d":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"field-container",style:{width:t.fullwidth?"100%":"auto"}},[s("span",{staticClass:"input-row"},["checkbox"===t.localtype?s("input",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticClass:"form-input",style:{width:t.setwidth},attrs:{placeholder:" ",autocomplete:t.hasautocomplete,required:t.isrequired,type:"checkbox"},domProps:{checked:Array.isArray(t.val)?t._i(t.val,null)>-1:t.val},on:{focus:function(e){t.touched=!0},blur:t.onBlur,input:function(e){t.touched=!0},change:function(e){var s=t.val,a=e.target,r=!!a.checked;if(Array.isArray(s)){var i=null,o=t._i(s,i);a.checked?o<0&&(t.val=s.concat([i])):o>-1&&(t.val=s.slice(0,o).concat(s.slice(o+1)))}else t.val=r}}}):"radio"===t.localtype?s("input",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticClass:"form-input",style:{width:t.setwidth},attrs:{placeholder:" ",autocomplete:t.hasautocomplete,required:t.isrequired,type:"radio"},domProps:{checked:t._q(t.val,null)},on:{focus:function(e){t.touched=!0},blur:t.onBlur,input:function(e){t.touched=!0},change:function(e){t.val=null}}}):s("input",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticClass:"form-input",style:{width:t.setwidth},attrs:{placeholder:" ",autocomplete:t.hasautocomplete,required:t.isrequired,type:t.localtype},domProps:{value:t.val},on:{focus:function(e){t.touched=!0},blur:t.onBlur,input:[function(e){e.target.composing||(t.val=e.target.value)},function(e){t.touched=!0}]}}),"password"===t.inptype?s("img",{attrs:{src:"password"===t.localtype?"/svg/eye.svg":"/svg/eye-slash.svg"},on:{click:t.toggletype}}):t._e()]),s("label",{class:t.stayactive?"stay-active":"placey-text",on:{click:t.setInputActive}},[t._v(" "+t._s(t.placey)+" ")]),s("div",{staticClass:"error-text-con"},[""!==t.errortxt?s("div",{staticClass:"error-icon"}):t._e(),s("p",{staticClass:"error-text"},[t._v(t._s(t.errortxt))])])])},r=[],i={name:"qinput",props:{fullwidth:{default:!0,type:Boolean},setwidth:{default:"100%",type:String},placey:{type:String,required:!0},errortxt:{type:String,required:!0},eventname:{type:String,required:!0},isrequired:{type:Boolean,required:!1,default:!1},hasautocomplete:{type:Boolean,required:!1,default:!1},inptype:{type:String,required:!0}},data:function(){return{val:"",touched:!1,localtype:""}},created:function(){this.localtype=this.inptype},mounted:function(){var t=this;this.$nextTick((function(){t.$el.firstChild.firstChild.focus()}))},methods:{setInputActive:function(){this.touched=!0,this.$el.firstChild.firstChild.focus()},onBlur:function(t){this.touched=!1,t&&this.email!==t.target.value&&(this.email=t.target.value)},toggletype:function(){this.localtype="password"===this.localtype?"text":"password"}},computed:{stayactive:function(){return""!==this.val||this.touched}},watch:{val:function(t,e){t.length-e.length>5&&(this.touched=!0),this.$emit(this.eventname,this.val)}}},o=i,n=(s("c778"),s("2877")),c=Object(n["a"])(o,a,r,!1,null,"0e737ed6",null);e["a"]=c.exports},"8a71":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"auth-item-container"},[s("h2",{staticClass:"h2"},[t._v("Reset Password")]),s("h6",{staticClass:"error-h6"},[t._v(t._s(t.servermsg))]),s("qinput",{attrs:{inptype:"password",placey:"Password",errortxt:t.passerror,eventname:"passwordinput",isrequired:!0,hasautocomplete:!0},on:{passwordinput:t.validatepassword}}),s("qinput",{attrs:{inptype:"password",placey:"Confirm Password",errortxt:t.confirmerror,eventname:"confirminput",isrequired:!0,hasautocomplete:!0},on:{confirminput:t.validateconfirm}}),s("div",{staticClass:"button-container"},[s("button",{staticClass:"button submit",class:{disabled:!t.validated},attrs:{disabled:!t.validated,type:"submit"},on:{click:t.submit}},[t._v(" SUBMIT ")]),s("p",[t._v(" Already have an account? "),s("router-link",{attrs:{to:{path:"/auth/login"}}},[t._v("Login")]),t._v(" or "),s("router-link",{attrs:{to:{path:"/auth/signup"}}},[t._v("Signup")]),t._v(". ")],1)])],1)},r=[],i=(s("d3b7"),s("ac1f"),s("3ca3"),s("841c"),s("ddb0"),s("2b3d"),s("2b2d")),o=s("b143"),n={name:"reset",components:{qinput:i["a"]},data:function(){return{servermsg:"",passerror:"",confirmerror:"",password:"",confirm:""}},mounted:function(){var t=this;o["b"].$on(o["h"],(function(e){t.servermsg=e}))},created:function(){var t=this;this.$QAuth.authenticate(!1).then((function(e){t.$store.commit("IS_AUTHED",e.data.user),o["b"].$emit(o["e"],{is:!0,msg:"You are already logged in as ".concat(e.data.user.email,"!"),color:"secondary",black:!1})}))},methods:{submit:function(t){var e=this;t.preventDefault(),this.validated&&(this.servermsg="");var s=new URLSearchParams(window.location.search);this.$QAuth.reset(s.get("token"),this.password,this.confirm).then((function(t){e.success(t)}))},validatepassword:function(t){this.password=t,this.password.length<8?this.passerror="Password needs to be at least 8 characters long":this.passerror=""},validateconfirm:function(t){this.confirm=t,this.password!==this.confirm?this.confirmerror="Passwords don't match":this.confirmerror=""},success:function(t){t.data.userError?this.servermsg=t.data.userError:(o["b"].$emit(o["e"],{is:!0,msg:"Password reset, you are now logged in!",color:"secondary",black:!1}),this.servermsg="Password reset successfully! You are now logged in!",this.$store.commit("IS_AUTHED",t.data.user),this.$router.push({path:"/app/manage"}))}},computed:{validated:function(){return""===this.passerror&&""===this.confirmerror&&""!==this.password&&""!==this.confirm}}},c=n,l=(s("fa61"),s("2877")),u=Object(l["a"])(c,a,r,!1,null,"cfb3ef4e",null);e["default"]=u.exports},c778:function(t,e,s){"use strict";var a=s("23d6"),r=s.n(a);r.a},ca01:function(t,e,s){},fa61:function(t,e,s){"use strict";var a=s("ca01"),r=s.n(a);r.a}}]);
//# sourceMappingURL=chunk-5592a6d7.1b21f1a8.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18aa74df"],{"43a0":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",{staticClass:"preview-container"},[a("section",{staticClass:"preview-html-container",domProps:{innerHTML:t._s(t.html)}}),a("button",{staticClass:"floating-fixed",on:{click:t.backtoedit}})])},i=[],c=a("b143"),o={name:"preview",data:function(){return{html:"<h1 class='h1'>Nothing saved yet</h1>"}},created:function(){var t=this;c["a"].$emit(c["b"],!0),this.$QAuth.authenticate().then((function(e){t.$store.commit("IS_AUTHED",e.data.user),c["a"].$emit(c["b"],!1),t.$QEdit.getHTML().then((function(e){e.data.editor&&e.data.editor.html&&(t.html=e.data.editor.html)}))}))},methods:{backtoedit:function(){this.$router.push({path:"/app/create"})}}},s=o,r=(a("607f"),a("2877")),u=Object(r["a"])(s,n,i,!1,null,"3e803ce8",null);e["default"]=u.exports},"607f":function(t,e,a){"use strict";var n=a("7d11"),i=a.n(n);i.a},"7d11":function(t,e,a){}}]);
//# sourceMappingURL=chunk-18aa74df.ccbf7cb5.js.map
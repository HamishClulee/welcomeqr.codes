(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33c8a158"],{"5baf":function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("main",{staticClass:"create-con"},[e("div",{staticClass:"squire-ui-con"},[e("h4",[t._v("ToolBox")]),e("div",{staticClass:"squire-row",attrs:{contenteditable:"false"}},[e("div",{staticClass:"button-group"},[e("div",{staticClass:"button-manager"},[e("div",{staticClass:"sqiure-item",attrs:{"data-action":"bold"},on:{click:function(i){return t.togglebold()}}},[e("div",{staticClass:"button-bkgrnd bold"})]),e("div",{staticClass:"indic",class:t.isBold?"active":"inactive"})]),e("div",{staticClass:"button-manager"},[e("div",{staticClass:"sqiure-item",attrs:{"data-action":"italic"},on:{click:function(i){return t.toggleitalic()}}},[e("div",{staticClass:"button-bkgrnd italic"})]),e("div",{staticClass:"indic",class:t.isItalic?"active":"inactive"})])])])]),e("h4",[t._v("Editor")]),e("div",{staticClass:"squire-container"},[e("iframe",{attrs:{id:"squire",frameborder:"0",src:t.base+"/squire/index.html",scrolling:"no"},on:{load:function(i){return t.frameloaded()}}})])])},s=[],a=(e("cc71"),arguments),o=void 0,c=function(t,i){var e,n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(){var s=o,c=a,r=function(){e=null,n||t.apply(s,c)},l=n&&!e;clearTimeout(e),e=setTimeout(r,i),l&&t.apply(s,c)}},r={name:"create",data:function(){return{editor:null,base:"https://welcomeqr.codes",isBold:!1,isItalic:!1,isFocused:!1}},mounted:function(){},methods:{frameloaded:function(){var t=this;this.editor=document.getElementById("squire").contentWindow.editor,this.isFocused=!0,this.editor.focus(),this.editor.addEventListener("input",c((function(){t.handleInput()}),300)),this.editor.addEventListener("select",c((function(){t.handleSelect()}),500))},handleInput:function(){},handleSelect:function(){},togglebold:function(){this.isBold?this.editor.bold():this.editor.removeBold(),this.isBold=!this.isBold},toggleitalic:function(){this.isItalic?this.editor.italic():this.editor.removeItalic(),this.isItalic=!this.isItalic}}},l=r,d=(e("a7fc"),e("2877")),u=Object(d["a"])(l,n,s,!1,null,"94c0e7f8",null);i["default"]=u.exports},"857a":function(t,i,e){var n=e("1d80"),s=/"/g;t.exports=function(t,i,e,a){var o=String(n(t)),c="<"+i;return""!==e&&(c+=" "+e+'="'+String(a).replace(s,"&quot;")+'"'),c+">"+o+"</"+i+">"}},a7fc:function(t,i,e){"use strict";var n=e("d2ce"),s=e.n(n);s.a},cc71:function(t,i,e){"use strict";var n=e("23e7"),s=e("857a"),a=e("eae9");n({target:"String",proto:!0,forced:a("bold")},{bold:function(){return s(this,"b","","")}})},d2ce:function(t,i,e){},eae9:function(t,i,e){var n=e("d039");t.exports=function(t){return n((function(){var i=""[t]('"');return i!==i.toLowerCase()||i.split('"').length>3}))}}}]);
//# sourceMappingURL=chunk-33c8a158.8e2c4e25.js.map
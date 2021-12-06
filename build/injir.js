/*!
 * 
 *   @rakot/injir v0.0.1
 *   git+https://github.com/rakot/Injir.git
 *
 *   Copyright (c) Sergey Vardanyan (https://github.com/rakot) and project contributors.
 *
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 *
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jQuery")):"function"==typeof define&&define.amd?define(["jQuery"],t):"object"==typeof exports?exports.Injir=t(require("jQuery")):e.Injir=t(e.jQuery)}(self,(function(e){return(()=>{"use strict";var t={145:t=>{t.exports=e}},r={};function n(e){var a=r[e];if(void 0!==a)return a.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};return(()=>{n.r(a),n.d(a,{default:()=>W});var e=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"FIRST";return"LAST"===t?e[e.length-1]:Number.isInteger(t)?e[t]:e[0]};function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){o(e,t),t.add(e)}function i(e,t,r){o(e,t),t.set(e,r)}function o(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function l(e,t){return function(e,t){if(t.get)return t.get.call(e);return t.value}(e,c(e,t,"get"))}function u(e,t,r){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return r}function s(e,t,r){return function(e,t,r){if(t.set)t.set.call(e,r);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=r}}(e,c(e,t,"set"),r),r}function c(e,t,r){if(!t.has(e))throw new TypeError("attempted to "+r+" private field on non-instance");return t.get(e)}var f=new WeakMap,p=new WeakMap,d=new WeakMap,v=new WeakMap,h=new WeakMap,y=new WeakSet,w=new WeakSet,m=new WeakSet,b=new WeakSet,g=new WeakSet;function j(){var e=this;l(e,p).alreadyCaptured&&s(e,h,l(e,p).alreadyCaptured),l(e,p).container&&(u(e,w,T).call(e,l(e,p).container),l(e,p).pollInTimeout&&s(e,f,setInterval((function(){u(e,w,T).call(e,l(e,p).container)}),l(e,p).pollInTimeout)))}function T(e){var t=this,r=l(t,v);r(e).each((function(){var e=r(this);u(t,m,x).call(t,e)||u(t,b,S).call(t,e)}))}function x(e){var t=this;l(t,v);if("data"===l(t,h).type){if(e.data(l(t,h).name)===l(t,h).value)return!0}else if("class"===l(t,h).type){if(e.hasClass(l(t,h).value))return!0}else if("content"===l(t,h).type&&e.find(l(t,h).value).length)return!0;return!1}function S(e){var t=this;l(t,v);"data"===l(t,h).type?e.data(l(t,h).name,l(t,h).value):"class"===l(t,h).type&&e.addClass(l(t,h).value);var r=u(t,g,k).call(t,e),n={container:e,data:r};t.result.push(n),l(t,d)&&l(t,d).call(t,e,r)}function k(t){var r=this,n=(l(r,v),{});return Array.isArray(l(r,p).dataToParse)&&l(r,p).dataToParse.length&&l(r,p).dataToParse.forEach((function(r){var a=t;r.container&&(a=t.find(r.container));var i="";if(r.textNode){var o=function(e){return e.contents().filter((function(){return!(3!==this.nodeType||!this.nodeValue.trim())}))}(a);i=o.length?e(o,r.textNode.position).nodeValue:""}else i=a.text();if(i&&i.trim&&(i=i.trim()),r.replaceFix&&r.replaceFix.forEach((function(e){i=i.replace(e.from,e.to)})),r.separator){var l=r.separator.separator;"SPACE"===l&&(l=/\s+/);var u=i.split(l);i=e(u,r.separator.position)}n[r.key]=i})),n}const W=function e(a){var o=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t(this,e),r(this,g),r(this,b),r(this,m),r(this,w),r(this,y),i(this,f,{writable:!0,value:void 0}),i(this,p,{writable:!0,value:void 0}),i(this,d,{writable:!0,value:void 0}),i(this,v,{writable:!0,value:void 0}),i(this,h,{writable:!0,value:{type:"data",name:"injir-captured",value:"yes"}});var l=this;s(l,v,n(145)),s(l,p,a),s(l,d,o),l.result=[],u(l,y,j).call(l)}})(),a})()}));
//# sourceMappingURL=injir.js.map
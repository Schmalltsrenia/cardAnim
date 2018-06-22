require=function r(t,e,i){function a(c,n){if(!e[c]){if(!t[c]){var s="function"==typeof require&&require;if(!n&&s)return s(c,!0);if(o)return o(c,!0);var l=new Error("Cannot find module '"+c+"'");throw l.code="MODULE_NOT_FOUND",l}var u=e[c]={exports:{}};t[c][0].call(u.exports,function(r){var e=t[c][1][r];return a(e||r)},u,u.exports,r,t,e,i)}return e[c].exports}for(var o="function"==typeof require&&require,c=0;c<i.length;c++)a(i[c]);return a}({flipCard:[function(r,t,e){"use strict";function i(r,t,e,i){e&&Object.defineProperty(r,t,{enumerable:e.enumerable,configurable:e.configurable,writable:e.writable,value:e.initializer?e.initializer.call(i):void 0})}function a(r,t){if(!(r instanceof t))throw new TypeError("Cannot call a class as a function")}function o(r,t){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?r:t}function c(r,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);r.prototype=Object.create(t&&t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(r,t):r.__proto__=t)}function n(r,t,e,i,a){var o={};return Object.keys(i).forEach(function(r){o[r]=i[r]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=e.slice().reverse().reduce(function(e,i){return i(r,t,e)||e},o),a&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(a):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(r,t,o),o=null),o}cc._RF.push(t,"6e5d6IpSYxOLIAbfkJgLuxz","flipCard");var s,l,u,f,_,p,h,m,d=function(){function r(r,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(r,i.key,i)}}return function(t,e,i){return e&&r(t.prototype,e),i&&r(t,i),t}}(),g=cc._decorator,T=g.ccclass,b=g.property;s=b(cc.SpriteFrame),l=b(cc.SpriteFrame),u=b(cc.Sprite),T((_=function(r){function t(){var r,e,c,n;a(this,t);for(var s=arguments.length,l=Array(s),u=0;u<s;u++)l[u]=arguments[u];return e=c=o(this,(r=t.__proto__||Object.getPrototypeOf(t)).call.apply(r,[this].concat(l))),i(c,"back",p,c),i(c,"front",h,c),i(c,"sprite",m,c),c.default_vert="default_vert.vs",c.default_frag="card.fs",c.playAnim=!1,c.stat=!1,c.scale=1,n=e,o(c,n)}return c(t,cc.Component),d(t,[{key:"onLoad",value:function(){var r=this;cc.loader.loadRes("shader/"+this.default_vert,function(t,e){t?cc.log(t):(r._default_vert=e,cc.loader.loadRes("shader/"+r.default_frag,function(t,e){t?cc.log(t):(r._card_frag=e,r.node.opacity=255,r._use())}))})}},{key:"flip",value:function(){var r=this;this.playAnim||(this.playAnim=!0,this.node.runAction(cc.sequence(cc.scaleTo(1,0,1),cc.callFunc(function(){r.sprite.spriteFrame=r.stat?r.back:r.front,r.stat=!r.stat}),cc.scaleTo(1,1,1),cc.callFunc(function(){r.playAnim=!1}))))}},{key:"_use",value:function(){this._program=new cc.GLProgram,cc.sys.isNative?(cc.log("use native GLProgram"),this._program.initWithString(this._default_vert,this._card_frag),this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION,cc.macro.VERTEX_ATTRIB_POSITION),this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR,cc.macro.VERTEX_ATTRIB_COLOR),this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD,cc.macro.VERTEX_ATTRIB_TEX_COORDS),this._program.link(),this._program.updateUniforms(),cc.GLProgramState.getOrCreateWithGLProgram(this._program).setUniformFloat("scale",this.scale)):(this._program.initWithVertexShaderByteArray(this._default_vert,this._card_frag),this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION,cc.macro.VERTEX_ATTRIB_POSITION),this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR,cc.macro.VERTEX_ATTRIB_COLOR),this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD,cc.macro.VERTEX_ATTRIB_TEX_COORDS),this._program.link(),this._program.updateUniforms(),this._scale=this._program.getUniformLocationForName("scale"),this._program.setUniformLocationWith1f(this._scale,this.scale)),this.setProgram(this.node._sgNode,this._program)}},{key:"setProgram",value:function(r,t){if(cc.sys.isNative){var e=cc.GLProgramState.getOrCreateWithGLProgram(t);r.setGLProgramState(e)}else r.setShaderProgram(t);var i=r.children;if(i)for(var a=0;a<i.length;a++)this.setProgram(i[a],t)}},{key:"update",value:function(){this.playAnim&&(this.scale=.2*this.node.scaleX+.8,this.stat&&(this.scale*=-1),this._program&&(this._program.use(),cc.sys.isNative?cc.GLProgramState.getOrCreateWithGLProgram(this._program).setUniformFloat("scale",this.scale):this._program.setUniformLocationWith1f(this._scale,this.scale),this.setProgram(this.node._sgNode,this._program)))}}]),t}(),p=n(_.prototype,"back",[s],{enumerable:!0,initializer:function(){return null}}),h=n(_.prototype,"front",[l],{enumerable:!0,initializer:function(){return null}}),m=n(_.prototype,"sprite",[u],{enumerable:!0,initializer:function(){return null}}),f=_));cc._RF.pop()},{}]},{},["flipCard"]);
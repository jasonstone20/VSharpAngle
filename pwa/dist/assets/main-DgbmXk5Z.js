(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const ge="modulepreload",me=function(r){return"/"+r},G={},K=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),l=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));s=Promise.allSettled(t.map(o=>{if(o=me(o),o in G)return;G[o]=!0;const h=o.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${d}`))return;const c=document.createElement("link");if(c.rel=h?"stylesheet":ge,h||(c.as="script"),c.crossOrigin="",c.href=o,l&&c.setAttribute("nonce",l),document.head.appendChild(c),h)return new Promise((u,m)=>{c.addEventListener("load",u),c.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${o}`)))})}))}function a(n){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=n,window.dispatchEvent(l),!l.defaultPrevented)throw n}return s.then(n=>{for(const l of n||[])l.status==="rejected"&&a(l.reason);return e().catch(a)})};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const U=globalThis,V=U.ShadowRoot&&(U.ShadyCSS===void 0||U.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),Z=new WeakMap;let ae=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(V&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Z.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Z.set(t,e))}return e}toString(){return this.cssText}};const fe=r=>new ae(typeof r=="string"?r:r+"",void 0,W),ve=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((i,s,a)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[a+1],r[0]);return new ae(t,r,W)},be=(r,e)=>{if(V)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=U.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,r.appendChild(i)}},J=V?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return fe(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:$e,defineProperty:_e,getOwnPropertyDescriptor:ye,getOwnPropertyNames:we,getOwnPropertySymbols:Ae,getPrototypeOf:Se}=Object,v=globalThis,X=v.trustedTypes,xe=X?X.emptyScript:"",z=v.reactiveElementPolyfillSupport,C=(r,e)=>r,q={toAttribute(r,e){switch(e){case Boolean:r=r?xe:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},oe=(r,e)=>!$e(r,e),Q={attribute:!0,type:String,converter:q,reflect:!1,useDefault:!1,hasChanged:oe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),v.litPropertyMetadata??(v.litPropertyMetadata=new WeakMap);let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Q){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&_e(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:a}=ye(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){const l=s==null?void 0:s.call(this);a==null||a.call(this,n),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Q}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const e=Se(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const t=this.properties,i=[...we(t),...Ae(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(J(s))}else e!==void 0&&t.push(J(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return be(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var a;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const n=(((a=i.converter)==null?void 0:a.toAttribute)!==void 0?i.converter:q).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){var a,n;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const l=i.getPropertyOptions(s),o=typeof l.converter=="function"?{fromAttribute:l.converter}:((a=l.converter)==null?void 0:a.fromAttribute)!==void 0?l.converter:q;this._$Em=s;const h=o.fromAttribute(t,l.type);this[s]=h??((n=this._$Ej)==null?void 0:n.get(s))??h,this._$Em=null}}requestUpdate(e,t,i){var s;if(e!==void 0){const a=this.constructor,n=this[e];if(i??(i=a.getPropertyOptions(e)),!((i.hasChanged??oe)(n,t)||i.useDefault&&i.reflect&&n===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:a},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),a!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[a,n]of this._$Ep)this[a]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[a,n]of s){const{wrapped:l}=n,o=this[a];l!==!0||this._$AL.has(a)||o===void 0||this.C(a,void 0,n,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(s=>{var a;return(a=s.hostUpdate)==null?void 0:a.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[C("elementProperties")]=new Map,w[C("finalized")]=new Map,z==null||z({ReactiveElement:w}),(v.reactiveElementVersions??(v.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=globalThis,O=E.trustedTypes,Y=O?O.createPolicy("lit-html",{createHTML:r=>r}):void 0,le="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,ce="?"+f,Ce=`<${ce}>`,y=document,P=()=>y.createComment(""),M=r=>r===null||typeof r!="object"&&typeof r!="function",F=Array.isArray,Ee=r=>F(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",D=`[ 	
\f\r]`,x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ee=/-->/g,te=/>/g,b=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),se=/'/g,ie=/"/g,he=/^(?:script|style|textarea|title)$/i,ke=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),g=ke(1),A=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),re=new WeakMap,$=y.createTreeWalker(y,129);function de(r,e){if(!F(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Y!==void 0?Y.createHTML(e):e}const Pe=(r,e)=>{const t=r.length-1,i=[];let s,a=e===2?"<svg>":e===3?"<math>":"",n=x;for(let l=0;l<t;l++){const o=r[l];let h,d,c=-1,u=0;for(;u<o.length&&(n.lastIndex=u,d=n.exec(o),d!==null);)u=n.lastIndex,n===x?d[1]==="!--"?n=ee:d[1]!==void 0?n=te:d[2]!==void 0?(he.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=b):d[3]!==void 0&&(n=b):n===b?d[0]===">"?(n=s??x,c=-1):d[1]===void 0?c=-2:(c=n.lastIndex-d[2].length,h=d[1],n=d[3]===void 0?b:d[3]==='"'?ie:se):n===ie||n===se?n=b:n===ee||n===te?n=x:(n=b,s=void 0);const m=n===b&&r[l+1].startsWith("/>")?" ":"";a+=n===x?o+Ce:c>=0?(i.push(h),o.slice(0,c)+le+o.slice(c)+f+m):o+f+(c===-2?l:m)}return[de(r,a+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class T{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let a=0,n=0;const l=e.length-1,o=this.parts,[h,d]=Pe(e,t);if(this.el=T.createElement(h,i),$.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=$.nextNode())!==null&&o.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(le)){const u=d[n++],m=s.getAttribute(c).split(f),R=/([.?@])?(.*)/.exec(u);o.push({type:1,index:a,name:R[2],strings:m,ctor:R[1]==="."?Te:R[1]==="?"?Ne:R[1]==="@"?Re:L}),s.removeAttribute(c)}else c.startsWith(f)&&(o.push({type:6,index:a}),s.removeAttribute(c));if(he.test(s.tagName)){const c=s.textContent.split(f),u=c.length-1;if(u>0){s.textContent=O?O.emptyScript:"";for(let m=0;m<u;m++)s.append(c[m],P()),$.nextNode(),o.push({type:2,index:++a});s.append(c[u],P())}}}else if(s.nodeType===8)if(s.data===ce)o.push({type:2,index:a});else{let c=-1;for(;(c=s.data.indexOf(f,c+1))!==-1;)o.push({type:7,index:a}),c+=f.length-1}a++}}static createElement(e,t){const i=y.createElement("template");return i.innerHTML=e,i}}function S(r,e,t=r,i){var n,l;if(e===A)return e;let s=i!==void 0?(n=t._$Co)==null?void 0:n[i]:t._$Cl;const a=M(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==a&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),a===void 0?s=void 0:(s=new a(r),s._$AT(r,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=S(r,s._$AS(r,e.values),s,i)),e}class Me{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??y).importNode(t,!0);$.currentNode=s;let a=$.nextNode(),n=0,l=0,o=i[0];for(;o!==void 0;){if(n===o.index){let h;o.type===2?h=new N(a,a.nextSibling,this,e):o.type===1?h=new o.ctor(a,o.name,o.strings,this,e):o.type===6&&(h=new Ue(a,this,e)),this._$AV.push(h),o=i[++l]}n!==(o==null?void 0:o.index)&&(a=$.nextNode(),n++)}return $.currentNode=y,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class N{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),M(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ee(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(y.createTextNode(e)),this._$AH=e}$(e){var a;const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=T.createElement(de(i.h,i.h[0]),this.options)),i);if(((a=this._$AH)==null?void 0:a._$AD)===s)this._$AH.p(t);else{const n=new Me(s,this),l=n.u(this.options);n.p(t),this.T(l),this._$AH=n}}_$AC(e){let t=re.get(e.strings);return t===void 0&&re.set(e.strings,t=new T(e)),t}k(e){F(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const a of e)s===t.length?t.push(i=new N(this.O(P()),this.O(P()),this,this.options)):i=t[s],i._$AI(a),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class L{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,a){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(e,t=this,i,s){const a=this.strings;let n=!1;if(a===void 0)e=S(this,e,t,0),n=!M(e)||e!==this._$AH&&e!==A,n&&(this._$AH=e);else{const l=e;let o,h;for(e=a[0],o=0;o<a.length-1;o++)h=S(this,l[i+o],t,o),h===A&&(h=this._$AH[o]),n||(n=!M(h)||h!==this._$AH[o]),h===p?e=p:e!==p&&(e+=(h??"")+a[o+1]),this._$AH[o]=h}n&&!s&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Te extends L{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}}class Ne extends L{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}}class Re extends L{constructor(e,t,i,s,a){super(e,t,i,s,a),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??p)===A)return;const i=this._$AH,s=e===p&&i!==p||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==p&&(i===p||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Ue{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}}const B=E.litHtmlPolyfillSupport;B==null||B(T,N),(E.litHtmlVersions??(E.litHtmlVersions=[])).push("3.3.1");const Oe=(r,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let s=i._$litPart$;if(s===void 0){const a=(t==null?void 0:t.renderBefore)??null;i._$litPart$=s=new N(e.insertBefore(P(),a),a,void 0,t??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _=globalThis;class k extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Oe(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return A}}var ne;k._$litElement$=!0,k.finalized=!0,(ne=_.litElementHydrateSupport)==null||ne.call(_,{LitElement:k});const I=_.litElementPolyfillSupport;I==null||I({LitElement:k});(_.litElementVersions??(_.litElementVersions=[])).push("4.2.1");const He=r=>r*Math.PI/180,pe=r=>r/(Math.PI/180),ue=r=>Math.sin(He(r)),Le=r=>1/ue(r);function ze(r){return Math.asin(Math.min(1,Math.max(-1,r)))}function De(r){return Math.acos(Math.min(1,Math.max(-1,r)))}function Be(r,e){if(!r||!e||e===0)return null;const t=r/2/e;return t<-1||t>1?null:Math.floor(pe(ze(t)))}function Ie(r,e){return r==null||e==null?null:Math.floor((r-e)*.125)}function qe(r,e){if(r==null||e==null)return null;const t=Le(e)*ue(r);return t<-1||t>1?null:Math.floor(pe(De(t)))}function je(r){if(!r||r<1)return{total:0,sequence:[]};const e=r/10+1,t=r*e,i=r*2,s=t+2+i,a=s*2,n=[];for(let l=r;l>=9;l-=10)n.push(l);return n.push(5,3,2,1),{total:s,xStrokes:a,sequence:n}}function Ve(r){const{hardness:e=60,edgeAngle:t=30,CrC:i=0,CrCV:s=0,MC:a=0,M6C:n=0,MN:l=0,CrN:o=0,Fe3C:h=0}=r||{},d=-157+15.8*e-17.8*t+11.2*i+14.6*s+26.2*a+9.5*n+20.9*l+19.4*o+5*h,c=i+s+a+n+l+o+h;let u;return c>15?u="20°-30°dps":c>5?u="12.5°-20°dps":u="8°-12.5°dps",{TCC:Math.round(d),volume:c,stability:u}}const H=class H extends k{constructor(){super(),this.page="home",this.dark=!1,this.width=6,this.height=2,this.desiredAngle=20,this.sharpenerAngle=15,this.rotationAngle=20,this.rotationSharpener=15,this.passes=9,this.hardness=60,this.edgeAngle=30,this.carbides={CrC:0,CrCV:0,MC:5.5,M6C:5,MN:0,CrN:0,Fe3C:0},this.showSteelTable=!1,this.addEventListener("steel-selected",e=>this._onSteelSelected(e)),document.documentElement.classList.remove("dark"),window.addEventListener("hashchange",()=>this._applyRoute()),this._applyRoute();try{localStorage.getItem("vsa-theme")==="dark"&&(document.documentElement.classList.add("dark"),this.dark=!0)}catch{}}_applyRoute(){const e=window.location.hash.replace(/^#\//,"");this.page=e||"home"}_go(e){window.location.hash=`/${e}`,this.page=e}_num(e,t){const i=e.target,s=Number(i.value);this[t]=isNaN(s)?null:s}_carbide(e,t){const i=e.target,s=Number(i.value);this.carbides={...this.carbides,[t]:isNaN(s)?0:s}}render(){return g`
      <header>
        <h1>VSharpAngle</h1>
        <sl-switch
          ?checked=${this.dark}
          @sl-change=${()=>this._toggleTheme()}
          aria-label="Toggle dark mode"
          >Dark Mode</sl-switch
        >
      </header>
      <main>
        ${this.page==="home"?this._renderHome():this._renderPage()}
      </main>
      <footer>
        © ${new Date().getFullYear()} VSharpAngle • PWA Experimental Build
      </footer>
    `}_toggleTheme(){const t=document.documentElement.classList.toggle("dark");try{localStorage.setItem("vsa-theme",t?"dark":"light")}catch{}this.dark=t}_renderHome(){return g`<div class="grid-menu">
      ${[{page:"angle",icon:"rulers",title:"Angle Measure",desc:"Calculate inclusive edge angle from bevel width & height."},{page:"elevation",icon:"arrow-up",title:"Sharpmaker Elevation",desc:"Find required base elevation for desired angle setting."},{page:"rotation",icon:"repeat",title:"Sharpmaker Rotation",desc:"Compute safe rotation angle between rod settings."},{page:"passes",icon:"list",title:"Pass Counter",desc:"Generate stroke sequence totals for progression."},{page:"retention",icon:"graph-up",title:"Edge Retention",desc:"Estimate TCC & volume from carbide & hardness data."},{page:"steels",icon:"database",title:"Steel Database",desc:"Browse carbide composition & derived metrics."}].map(t=>g`<a
          class="card-link"
          @click=${()=>this._go(t.page)}
          role="button"
          tabindex="0"
          aria-label="Open ${t.title} page"
        >
          <div class="card-icon"><sl-icon name="${t.icon}"></sl-icon></div>
          <div class="card-title">${t.title}</div>
          <div class="card-desc">${t.desc}</div>
        </a>`)}
    </div>`}_renderPage(){switch(this.page){case"angle":return this._pageAngle();case"elevation":return this._pageElevation();case"rotation":return this._pageRotation();case"passes":return this._pagePasses();case"retention":return this._pageRetention();case"steels":return this._pageSteels();default:return g`<div class="page">Unknown page.</div>`}}_pageAngle(){const e=Be(this.width,this.height);return g`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>Angle Measurement</h2>
        <div class="output-row">
          <sl-input
            label="Width"
            type="number"
            .value=${String(this.width)}
            @input=${t=>this._num(t,"width")}
          ></sl-input>
          <sl-input
            label="Height"
            type="number"
            .value=${String(this.height)}
            @input=${t=>this._num(t,"height")}
          ></sl-input>
          <sl-badge variant="primary">${e??"—"}° DPS</sl-badge>
        </div>
        ${e==null?g`<div class="danger">Out of range or invalid inputs.</div>`:""}
      </section>
      <div class="help">
        <h2>How It Works</h2>
        <p>
          The inclusive edge angle is derived using basic trigonometry from the
          measured bevel width and the blade thickness at the apex. DPS (degrees
          per side) helps you compare sharpening targets.
        </p>
        <p>
          <strong>Benefit:</strong> Quickly determine whether your current bevel
          matches a target profile for edge performance or durability.
        </p>
        <p>
          <strong>Formula:</strong> angle = rad2deg(asin((width/2)/height)).
        </p>
        <p>
          <strong>References:</strong> Geometry fundamentals – see
          <a
            href="https://en.wikipedia.org/wiki/Trigonometry"
            target="_blank"
            rel="noopener"
            >Trigonometry (Wikipedia)</a
          >.
        </p>
      </div>
    </div>`}_pageElevation(){const e=Ie(this.desiredAngle,this.sharpenerAngle);return g`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>Sharpmaker Elevation</h2>
        <div class="output-row">
          <sl-input
            label="Desired"
            type="number"
            .value=${String(this.desiredAngle)}
            @input=${t=>this._num(t,"desiredAngle")}
          ></sl-input>
          <sl-select
            label="Setting"
            .value=${String(this.sharpenerAngle)}
            @sl-change=${t=>{this.sharpenerAngle=Number(t.target.value)}}
          >
            <sl-option value="15">15°</sl-option>
            <sl-option value="20">20°</sl-option>
            <sl-option value="25">25°</sl-option>
          </sl-select>
          <sl-badge variant="success">${e??"—"} in</sl-badge>
        </div>
      </section>
      <div class="help">
        <h2>Purpose & Formula</h2>
        <p>
          This calculator estimates how much you must raise the base (or shim)
          of the sharpening system to reach a desired edge angle not directly
          provided by the stock rod settings.
        </p>
        <p>
          <strong>Benefit:</strong> Avoid guesswork when micro‑adjusting angles
          for specific steels or cutting tasks.
        </p>
        <p>
          <strong>Formula:</strong> elevation ≈ (desired − setting) × 0.125
          inches (empirical constant).
        </p>
        <p>
          <strong>References:</strong> Manufacturer community notes and
          empirical user measurements on forums such as
          <a href="https://www.bladeforums.com/" target="_blank" rel="noopener"
            >BladeForums</a
          >.
        </p>
      </div>
    </div>`}_pageRotation(){const e=qe(this.rotationAngle,this.rotationSharpener);return g`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>Sharpmaker Rotation</h2>
        <div class="output-row">
          <sl-input
            label="Angle"
            type="number"
            .value=${String(this.rotationAngle)}
            @input=${t=>this._num(t,"rotationAngle")}
          ></sl-input>
          <sl-select
            label="Setting"
            .value=${String(this.rotationSharpener)}
            @sl-change=${t=>{this.rotationSharpener=Number(t.target.value)}}
          >
            <sl-option value="15">15°</sl-option>
            <sl-option value="20">20°</sl-option>
            <sl-option value="25">25°</sl-option>
          </sl-select>
          <sl-badge variant="warning">${e??"—"}° base</sl-badge>
        </div>
        ${e==null?g`<div class="danger">Invalid domain; adjust inputs.</div>`:""}
      </section>
      <div class="help">
        <h2>Rotation Guidance</h2>
        <p>
          Determines the rotational offset required when switching between rod
          angle settings while maintaining a consistent apex geometry.
        </p>
        <p>
          <strong>Benefit:</strong> Minimizes inconsistent bevel shaping when
          changing angles during progression or micro‑bevel application.
        </p>
        <p>
          <strong>Formula:</strong> rotation = acos(csc(setting) × sin(angle)).
          Domain restricted; invalid values are guarded.
        </p>
        <p>
          <strong>References:</strong> Trigonometric identities for right
          triangles – see
          <a
            href="https://en.wikipedia.org/wiki/Inverse_trigonometric_functions"
            target="_blank"
            rel="noopener"
            >Inverse Trig Functions</a
          >.
        </p>
      </div>
    </div>`}_pagePasses(){const e=je(this.passes);return g`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>Pass Counter</h2>
        <div class="output-row">
          <sl-input
            label="Passes"
            type="number"
            .value=${String(this.passes)}
            @input=${t=>this._num(t,"passes")}
          ></sl-input>
          <sl-badge variant="neutral">Total: ${e.total}</sl-badge>
          <sl-badge variant="neutral"
            >X-Strokes: ${e.xStrokes??"—"}</sl-badge
          >
        </div>
        <sl-details summary="Sequence"
          >${e.sequence.map(t=>g`<span class="badge-seq">${t}</span>`)}</sl-details
        >
      </section>
      <div class="help">
        <h2>Why Count Passes?</h2>
        <p>
          Structured alternating stroke counts help maintain symmetry and avoid
          over‑grinding one side of the edge.
        </p>
        <p>
          <strong>Benefit:</strong> Produces more consistent apex geometry and
          repeatable sharpening sessions.
        </p>
        <p>
          <strong>Sequence:</strong> A descending ladder with final refinement
          strokes (X‑strokes) indicated.
        </p>
        <p>
          <strong>References:</strong> Common best practices discussed in
          sharpening communities and guides (e.g.,
          <a
            href="https://www.youtube.com/results?search_query=knife+sharpening+angle+consistency"
            target="_blank"
            rel="noopener"
            >tutorial videos</a
          >).
        </p>
      </div>
    </div>`}_pageRetention(){const e=Ve({hardness:this.hardness,edgeAngle:this.edgeAngle,CrC:this.carbides.CrC,CrV:this.carbides.CrCV,MC:this.carbides.MC,M6C:this.carbides.M6C,MN:this.carbides.MN,CrN:this.carbides.CrN,Fe3C:this.carbides.Fe3C});return g`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>Edge Retention Estimator</h2>
        <div class="output-row">
          <sl-input
            label="Hardness"
            type="number"
            .value=${String(this.hardness)}
            @input=${t=>this._num(t,"hardness")}
          ></sl-input>
          <sl-input
            label="Edge Angle"
            type="number"
            .value=${String(this.edgeAngle)}
            @input=${t=>this._num(t,"edgeAngle")}
          ></sl-input>
          <sl-badge variant="primary">TCC: ${e.TCC}</sl-badge>
        </div>
        <div class="output-row">
          ${["CrC","CrCV","MC","M6C","MN","CrN","Fe3C"].map(t=>g`<sl-input
                label=${t}
                type="number"
                .value=${String(this.carbides[t]||0)}
                @input=${i=>this._carbide(i,t)}
              ></sl-input>`)}
        </div>
        <div class="output-row">
          <sl-progress-bar
            .value=${Math.min(e.volume,30)}
            max="30"
          ></sl-progress-bar>
          <sl-badge variant="success">Vol: ${e.volume.toFixed(1)}</sl-badge>
          <sl-badge variant="warning">${e.stability}</sl-badge>
        </div>
        <sl-button
          size="small"
          class="load-btn"
          variant="neutral"
          @click=${()=>this._toggleSteelTable()}
          >${this.showSteelTable?"Hide":"Show"} Steel Table</sl-button
        >
      </section>
      <div class="help">
        <h2>Interpreting Metrics</h2>
        <p>
          <strong>TCC (Theoretical Carbide Contribution)</strong> is a heuristic
          combining hardness and carbide factors to estimate potential slicing
          endurance.
        </p>
        <p>
          <strong>Volume</strong> approximates aggregate carbide presence;
          higher values may permit a more acute edge angle while retaining
          stability.
        </p>
        <p>
          <strong>Stability Tag</strong> offers qualitative guidance for edge
          toughness expectations at the chosen geometry.
        </p>
        <p>
          <strong>Disclaimer:</strong> These are simplified indicators; real
          performance depends on heat treat, microstructure, and use case.
        </p>
        <p>
          <strong>References:</strong> Metallurgy summaries and alloy datasheets
          (e.g.,
          <a
            href="https://www.crucibleservice.com/"
            target="_blank"
            rel="noopener"
            >Crucible Service</a
          >,
          <a
            href="https://www.bohleredelstahl.com/"
            target="_blank"
            rel="noopener"
            >Böhler</a
          >).
        </p>
      </div>
      ${this.showSteelTable?g`<section class="calc">
            <h2>Steel Database</h2>
            <vsa-steel-table></vsa-steel-table>
          </section>`:""}
    </div>`}_pageSteels(){return customElements.get("vsa-steel-table")||K(()=>import("./vsa-steel-table-BSuhz5hu.js"),[]),g`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>Steel Database</h2>
        <vsa-steel-table></vsa-steel-table>
      </section>
      <div class="help">
        <h2>Browsing Steels</h2>
        <p>
          Use the filter to narrow compositions. Click a row to emit data to the
          retention estimator, pre‑filling carbide values for quick comparison.
        </p>
        <p>
          <strong>Benefit:</strong> Rapidly evaluate how different alloys might
          respond to target geometry and hardness.
        </p>
        <p>
          <strong>Notes:</strong> Values are illustrative; expand dataset for
          production accuracy.
        </p>
        <p>
          <strong>References:</strong> Manufacturer datasheets, community
          compiled tables (e.g.,
          <a
            href="https://zknives.com/knives/steels/"
            target="_blank"
            rel="noopener"
            >ZKnives Steel Guide</a
          >).
        </p>
      </div>
    </div>`}_homeLink(){return g`<sl-button
      size="medium"
      variant="default"
      @click=${()=>this._go("home")}
      style="gap:.4rem"
    >
      <sl-icon name="house" style="font-size:1.1rem"></sl-icon>
      Home
    </sl-button>`}_toggleSteelTable(){this.showSteelTable||K(()=>import("./vsa-steel-table-BSuhz5hu.js"),[]),this.showSteelTable=!this.showSteelTable}_onSteelSelected(e){const{hardness:t,edgeAngle:i,carbides:s}=e.detail;this.hardness=t,this.edgeAngle=i,this.carbides={...s}}};H.styles=ve`
    :host {
      display: block;
      box-sizing: border-box;
    }
    :root,
    :host {
      --vsa-surface: var(--vsa-surface, #ffffff);
      --vsa-border: var(--vsa-border, #d9dde3);
      --vsa-row-alt: var(--vsa-row-alt, #f5f7fa);
      --vsa-row-hover: var(--vsa-row-hover, #eef3f8);
      --vsa-row-focus: var(--vsa-row-focus, #e3eaf1);
      --vsa-card-bg: var(--vsa-card-bg, var(--vsa-surface));
      --vsa-card-border: var(--vsa-card-border, var(--vsa-border));
      --vsa-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.08),
        0 2px 4px rgba(0, 0, 0, 0.06);
      --vsa-shadow-md: 0 2px 4px rgba(0, 0, 0, 0.08),
        0 6px 12px rgba(0, 0, 0, 0.08);
    }
    html.dark :root,
    html.dark :host {
      --vsa-surface: #202428;
      --vsa-border: #353b42;
      --vsa-row-alt: rgba(255, 255, 255, 0.03);
      --vsa-row-hover: #2a3036;
      --vsa-row-focus: #323a42;
      --vsa-card-bg: #1c2125; /* softer off-black grey */
      --vsa-card-border: #353b42;
      --vsa-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4),
        0 2px 6px rgba(0, 0, 0, 0.35);
      --vsa-shadow-md: 0 2px 6px rgba(0, 0, 0, 0.45),
        0 8px 18px rgba(0, 0, 0, 0.4);
    }
    header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      background: var(--vsa-surface);
      position: sticky;
      top: 0;
      z-index: 10;
      border-bottom: 1px solid var(--vsa-border);
    }
    header h1 {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
      letter-spacing: 0.5px;
    }
    .spacer {
      flex: 1;
    }
    main {
      padding: 0.75rem 0.75rem 1.25rem;
    }
    .grid-menu {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
    .card-link {
      background: var(--vsa-card-bg);
      border: 1px solid var(--vsa-card-border);
      border-radius: 14px;
      padding: 0.9rem 0.9rem 0.75rem 0.9rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
    }
    .card-link:hover {
      background: var(--vsa-row-hover);
    }
    .card-icon {
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card-title {
      font-weight: 600;
      font-size: 0.85rem;
      letter-spacing: 0.3px;
    }
    .card-desc {
      font-size: 0.65rem;
      opacity: 0.75;
      line-height: 1.25;
    }
    .page {
      max-width: 880px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 0.75rem; /* reduced gap between sections */
    }
    .page section.calc {
      background: var(--vsa-card-bg);
      border: 1px solid var(--vsa-card-border);
      border-radius: 14px;
      padding: 1.1rem 1.15rem 1.15rem;
      display: flex;
      flex-direction: column;
      gap: 1rem; /* more breathing room between groups */
      box-shadow: var(--vsa-shadow-sm);
      transition: box-shadow 0.15s, background 0.15s, border-color 0.15s;
    }
    .page section.calc:hover {
      box-shadow: var(--vsa-shadow-md);
    }
    .back-link {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.65rem;
    }
    .back-link sl-button::part(base) {
      font-size: 0.75rem;
      padding: 0.6rem 0.95rem;
      font-weight: 600;
    }
    .page .help {
      background: var(--vsa-card-bg);
      border: 1px solid var(--vsa-card-border);
      border-radius: 14px;
      padding: 0.95rem 1.1rem 1.05rem;
      font-size: 0.7rem;
      line-height: 1.4;
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
      box-shadow: var(--vsa-shadow-sm);
    }
    .page .help:hover {
      box-shadow: var(--vsa-shadow-md);
    }
    .output-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem 1rem; /* increase horizontal + vertical spacing */
      align-items: flex-end;
    }
    .calc sl-input::part(base),
    .calc sl-select::part(combobox),
    .calc sl-select::part(base) {
      min-width: 120px;
    }
    .calc sl-badge {
      margin-top: 4px;
    }
    @media (max-width: 640px) {
      .page section.calc {
        padding: 0.95rem 0.9rem 1rem;
      }
      .output-row {
        gap: 0.65rem 0.8rem;
      }
      .calc sl-input::part(base),
      .calc sl-select::part(combobox),
      .calc sl-select::part(base) {
        min-width: 110px;
      }
    }
    .help h2 {
      margin: 0 0 0.25rem;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .help a {
      color: var(--sl-color-primary-600, #4d7cff);
      text-decoration: none;
    }
    .help a:hover {
      text-decoration: underline;
    }
    footer {
      text-align: center;
      font-size: 0.7rem;
      opacity: 0.6;
      padding: 1rem;
    }
  `,H.properties={page:{type:String},width:{type:Number},height:{type:Number},desiredAngle:{type:Number},sharpenerAngle:{type:Number},rotationAngle:{type:Number},rotationSharpener:{type:Number},passes:{type:Number},hardness:{type:Number},edgeAngle:{type:Number},carbides:{type:Object},showSteelTable:{type:Boolean},dark:{type:Boolean}};let j=H;customElements.define("vsa-app-shell",j);"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./service-worker.js").catch(r=>console.error("SW registration failed",r))});export{ve as a,Ve as e,k as i,g as x};

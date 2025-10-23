(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();const Ke="modulepreload",Xe=function(o){return"/"+o},ke={},Je=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),l=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));i=Promise.allSettled(t.map(a=>{if(a=Xe(a),a in ke)return;ke[a]=!0;const d=a.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${h}`))return;const c=document.createElement("link");if(c.rel=d?"stylesheet":Ke,d||(c.as="script"),c.crossOrigin="",c.href=a,l&&c.setAttribute("nonce",l),document.head.appendChild(c),d)return new Promise((u,v)=>{c.addEventListener("load",u),c.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${a}`)))})}))}function n(r){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=r,window.dispatchEvent(l),!l.defaultPrevented)throw r}return i.then(r=>{for(const l of r||[])l.status==="rejected"&&n(l.reason);return e().catch(n)})};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const se=globalThis,ve=se.ShadowRoot&&(se.ShadyCSS===void 0||se.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,fe=Symbol(),Ae=new WeakMap;let De=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==fe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ve&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=Ae.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Ae.set(t,e))}return e}toString(){return this.cssText}};const Qe=o=>new De(typeof o=="string"?o:o+"",void 0,fe),ye=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((s,i,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[n+1],o[0]);return new De(t,o,fe)},et=(o,e)=>{if(ve)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=se.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,o.appendChild(s)}},Ce=ve?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return Qe(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:tt,defineProperty:st,getOwnPropertyDescriptor:it,getOwnPropertyNames:nt,getOwnPropertySymbols:rt,getPrototypeOf:at}=Object,N=globalThis,Se=N.trustedTypes,ot=Se?Se.emptyScript:"",ce=N.reactiveElementPolyfillSupport,G=(o,e)=>o,ie={toAttribute(o,e){switch(e){case Boolean:o=o?ot:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},be=(o,e)=>!tt(o,e),Te={attribute:!0,type:String,converter:ie,reflect:!1,useDefault:!1,hasChanged:be};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),N.litPropertyMetadata??(N.litPropertyMetadata=new WeakMap);let U=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Te){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&st(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:n}=it(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:i,set(r){const l=i==null?void 0:i.call(this);n==null||n.call(this,r),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Te}static _$Ei(){if(this.hasOwnProperty(G("elementProperties")))return;const e=at(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(G("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(G("properties"))){const t=this.properties,s=[...nt(t),...rt(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(Ce(i))}else e!==void 0&&t.push(Ce(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return et(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var n;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const r=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:ie).toAttribute(t,s.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){var n,r;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:ie;this._$Em=i;const d=a.fromAttribute(t,l.type);this[i]=d??((r=this._$Ej)==null?void 0:r.get(i))??d,this._$Em=null}}requestUpdate(e,t,s){var i;if(e!==void 0){const n=this.constructor,r=this[e];if(s??(s=n.getPropertyOptions(e)),!((s.hasChanged??be)(r,t)||s.useDefault&&s.reflect&&r===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,r??t??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,r]of i){const{wrapped:l}=r,a=this[n];l!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,r,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[G("elementProperties")]=new Map,U[G("finalized")]=new Map,ce==null||ce({ReactiveElement:U}),(N.reactiveElementVersions??(N.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const K=globalThis,ne=K.trustedTypes,Be=ne?ne.createPolicy("lit-html",{createHTML:o=>o}):void 0,Re="$lit$",V=`lit$${Math.random().toFixed(9).slice(2)}$`,He="?"+V,lt=`<${He}>`,L=document,X=()=>L.createComment(""),J=o=>o===null||typeof o!="object"&&typeof o!="function",xe=Array.isArray,ht=o=>xe(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",pe=`[ 	
\f\r]`,Z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Me=/-->/g,Ee=/>/g,z=RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ie=/'/g,We=/"/g,Le=/^(?:script|style|textarea|title)$/i,Ye=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),p=Ye(1),W=Ye(2),q=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),Pe=new WeakMap,D=L.createTreeWalker(L,129);function Fe(o,e){if(!xe(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Be!==void 0?Be.createHTML(e):e}const dt=(o,e)=>{const t=o.length-1,s=[];let i,n=e===2?"<svg>":e===3?"<math>":"",r=Z;for(let l=0;l<t;l++){const a=o[l];let d,h,c=-1,u=0;for(;u<a.length&&(r.lastIndex=u,h=r.exec(a),h!==null);)u=r.lastIndex,r===Z?h[1]==="!--"?r=Me:h[1]!==void 0?r=Ee:h[2]!==void 0?(Le.test(h[2])&&(i=RegExp("</"+h[2],"g")),r=z):h[3]!==void 0&&(r=z):r===z?h[0]===">"?(r=i??Z,c=-1):h[1]===void 0?c=-2:(c=r.lastIndex-h[2].length,d=h[1],r=h[3]===void 0?z:h[3]==='"'?We:Ie):r===We||r===Ie?r=z:r===Me||r===Ee?r=Z:(r=z,i=void 0);const v=r===z&&o[l+1].startsWith("/>")?" ":"";n+=r===Z?a+lt:c>=0?(s.push(d),a.slice(0,c)+Re+a.slice(c)+V+v):a+V+(c===-2?l:v)}return[Fe(o,n+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class Q{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let n=0,r=0;const l=e.length-1,a=this.parts,[d,h]=dt(e,t);if(this.el=Q.createElement(d,s),D.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=D.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(Re)){const u=h[r++],v=i.getAttribute(c).split(V),y=/([.?@])?(.*)/.exec(u);a.push({type:1,index:n,name:y[2],strings:v,ctor:y[1]==="."?pt:y[1]==="?"?ut:y[1]==="@"?gt:oe}),i.removeAttribute(c)}else c.startsWith(V)&&(a.push({type:6,index:n}),i.removeAttribute(c));if(Le.test(i.tagName)){const c=i.textContent.split(V),u=c.length-1;if(u>0){i.textContent=ne?ne.emptyScript:"";for(let v=0;v<u;v++)i.append(c[v],X()),D.nextNode(),a.push({type:2,index:++n});i.append(c[u],X())}}}else if(i.nodeType===8)if(i.data===He)a.push({type:2,index:n});else{let c=-1;for(;(c=i.data.indexOf(V,c+1))!==-1;)a.push({type:7,index:n}),c+=V.length-1}n++}}static createElement(e,t){const s=L.createElement("template");return s.innerHTML=e,s}}function O(o,e,t=o,s){var r,l;if(e===q)return e;let i=s!==void 0?(r=t._$Co)==null?void 0:r[s]:t._$Cl;const n=J(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=O(o,i._$AS(o,e.values),i,s)),e}class ct{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??L).importNode(t,!0);D.currentNode=i;let n=D.nextNode(),r=0,l=0,a=s[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new ee(n,n.nextSibling,this,e):a.type===1?d=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(d=new mt(n,this,e)),this._$AV.push(d),a=s[++l]}r!==(a==null?void 0:a.index)&&(n=D.nextNode(),r++)}return D.currentNode=L,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class ee{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=O(this,e,t),J(e)?e===k||e==null||e===""?(this._$AH!==k&&this._$AR(),this._$AH=k):e!==this._$AH&&e!==q&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ht(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==k&&J(this._$AH)?this._$AA.nextSibling.data=e:this.T(L.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Q.createElement(Fe(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(t);else{const r=new ct(i,this),l=r.u(this.options);r.p(t),this.T(l),this._$AH=r}}_$AC(e){let t=Pe.get(e.strings);return t===void 0&&Pe.set(e.strings,t=new Q(e)),t}k(e){xe(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const n of e)i===t.length?t.push(s=new ee(this.O(X()),this.O(X()),this,this.options)):s=t[i],s._$AI(n),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class oe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,n){this.type=1,this._$AH=k,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=k}_$AI(e,t=this,s,i){const n=this.strings;let r=!1;if(n===void 0)e=O(this,e,t,0),r=!J(e)||e!==this._$AH&&e!==q,r&&(this._$AH=e);else{const l=e;let a,d;for(e=n[0],a=0;a<n.length-1;a++)d=O(this,l[s+a],t,a),d===q&&(d=this._$AH[a]),r||(r=!J(d)||d!==this._$AH[a]),d===k?e=k:e!==k&&(e+=(d??"")+n[a+1]),this._$AH[a]=d}r&&!i&&this.j(e)}j(e){e===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class pt extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===k?void 0:e}}class ut extends oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==k)}}class gt extends oe{constructor(e,t,s,i,n){super(e,t,s,i,n),this.type=5}_$AI(e,t=this){if((e=O(this,e,t,0)??k)===q)return;const s=this._$AH,i=e===k&&s!==k||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==k&&(s===k||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class mt{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){O(this,e)}}const ue=K.litHtmlPolyfillSupport;ue==null||ue(Q,ee),(K.litHtmlVersions??(K.litHtmlVersions=[])).push("3.3.1");const vt=(o,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const n=(t==null?void 0:t.renderBefore)??null;s._$litPart$=i=new ee(e.insertBefore(X(),n),n,void 0,t??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R=globalThis;class H extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=vt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return q}}var ze;H._$litElement$=!0,H.finalized=!0,(ze=R.litElementHydrateSupport)==null||ze.call(R,{LitElement:H});const ge=R.litElementPolyfillSupport;ge==null||ge({LitElement:H});(R.litElementVersions??(R.litElementVersions=[])).push("4.2.1");const ft=o=>o*Math.PI/180,Ue=o=>o/(Math.PI/180),qe=o=>Math.sin(ft(o)),yt=o=>1/qe(o);function bt(o){return Math.asin(Math.min(1,Math.max(-1,o)))}function xt(o){return Math.acos(Math.min(1,Math.max(-1,o)))}function _t(o,e){if(o==null||e==null||e===0)return null;const t=o/2/e;return t<-1||t>1?null:Math.floor(Ue(bt(t)))}function wt(o,e){return o==null||e==null?null:Math.floor((o-e)*.125)}function $t(o,e){if(o==null||e==null)return null;const t=yt(e)*qe(o);return t<-1||t>1?null:Math.floor(Ue(xt(t)))}function kt(o){if(!o||o<1)return{total:0,sequence:[]};const e=o/10+1,t=o*e,s=o*2,i=t+2+s,n=i*2,r=[];for(let l=o;l>=9;l-=10)r.push(l);return r.push(5,3,2,1),{total:i,xStrokes:n,sequence:r}}function Oe(o){const{hardness:e=60,edgeAngle:t=30,CrC:s=0,CrV:i=0,MC:n=0,M6C:r=0,MN:l=0,CrN:a=0,Fe3C:d=0}=o||{},h=-157+15.8*e-17.8*t+11.2*s+14.6*i+26.2*n+9.5*r+20.9*l+19.4*a+5*d,c=s+i+n+r+l+a+d;let u;return c>15?u="20°-30°dps":c>5?u="12.5°-20°dps":u="8°-12.5°dps",{TCC:Math.round(h),volume:c,stability:u}}const ae=class ae extends H{constructor(){super(),this.steels=[],this.filter="",this.sortKey="name",this.sortDir="asc",this.hardness=60,this.edgeAngle=30,this.selectedName="",this._load()}async _load(){try{const e=await fetch("./data/steels.json");if(!e.ok)throw new Error("Failed steels.json");const t=await e.json();this.steels=t}catch(e){console.error(e)}}_onFilter(e){this.filter=e.target.value.trim().toLowerCase()}_setHardness(e){this.hardness=Number(e.target.value)}_setEdgeAngle(e){this.edgeAngle=Number(e.target.value)}_toggleSort(e){this.sortKey===e?this.sortDir=this.sortDir==="asc"?"desc":"asc":(this.sortKey=e,this.sortDir="asc")}_filtered(){const e=this.filter;let t=this.steels.map(s=>{const{TCC:i,volume:n,stability:r}=Oe({hardness:this.hardness,edgeAngle:this.edgeAngle,...s});return{...s,TCC:i,volume:n,stability:r}});return e&&(t=t.filter(s=>s.name.toLowerCase().includes(e))),t.sort((s,i)=>{const n=this.sortDir==="asc"?1:-1;return this.sortKey==="name"?s.name.localeCompare(i.name)*n:(s[this.sortKey]-i[this.sortKey])*n}),t}_select(e){this.selectedName=e.name;const t={name:e.name,hardness:this.hardness,edgeAngle:this.edgeAngle,carbides:{CrC:e.CrC||0,CrV:e.CrV||0,MC:e.MC||0,M6C:e.M6C||0,MN:e.MN||0,CrN:e.CrN||0,Fe3C:e.Fe3C||0}};this.dispatchEvent(new CustomEvent("steel-selected",{detail:t,bubbles:!0,composed:!0}))}_onRowKey(e,t){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._select(t))}_headerCell(e,t){const s=this.sortKey===e,i=s?this.sortDir==="asc"?"▲":"▼":"",n=s?this.sortDir==="asc"?"ascending":"descending":"none";return p`<th
      @click=${()=>this._toggleSort(e)}
      aria-sort="${n}"
      role="columnheader"
      tabindex="0"
      @keydown=${r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),this._toggleSort(e))}}
    >
      ${t} ${i}
    </th>`}render(){const e=this._filtered();return p`
      <div class="toolbar">
        <sl-input
          size="small"
          placeholder="Filter steel…"
          @input=${this._onFilter}
        ></sl-input>
        <sl-input
          size="small"
          label="HRC"
          type="number"
          .value=${String(this.hardness)}
          @input=${this._setHardness}
        ></sl-input>
        <sl-input
          size="small"
          label="Angle"
          type="number"
          .value=${String(this.edgeAngle)}
          @input=${this._setEdgeAngle}
        ></sl-input>
        <sl-tooltip content="Click headers to sort"
          ><sl-badge variant="neutral">Sort Tips</sl-badge></sl-tooltip
        >
        <sl-tooltip content="Click a steel row to populate inputs">
          <sl-badge variant="primary">Row Select Tip</sl-badge>
        </sl-tooltip>
      </div>
      ${e.length?p` <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${this._headerCell("name","Steel")}
                  ${this._headerCell("CrC","CrC")}
                  ${this._headerCell("CrV","CrV")}
                  ${this._headerCell("MC","MC")}
                  ${this._headerCell("M6C","M6C")}
                  ${this._headerCell("MN","MN")}
                  ${this._headerCell("CrN","CrN")}
                  ${this._headerCell("Fe3C","Fe3C")}
                  ${this._headerCell("volume","Vol%")}
                  ${this._headerCell("TCC","est.TCC")}
                </tr>
              </thead>
              <tbody>
                ${e.map(t=>{var s;return p` <tr
                    @click=${()=>this._select(t)}
                    @keydown=${i=>this._onRowKey(i,t)}
                    tabindex="0"
                    role="button"
                    aria-label="Select steel ${t.name}"
                    aria-selected="${this.selectedName===t.name?"true":"false"}"
                  >
                    <td class="name">${t.name}</td>
                    <td>${t.CrC||0}</td>
                    <td>${t.CrV||0}</td>
                    <td>${t.MC||0}</td>
                    <td>${t.M6C||0}</td>
                    <td>${t.MN||0}</td>
                    <td>${t.CrN||0}</td>
                    <td>${t.Fe3C||0}</td>
                    <td class="vol-cell">
                      ${(s=t.volume)!=null&&s.toFixed?t.volume.toFixed(1):((t.CrC||0)+(t.CrV||0)+(t.MC||0)+(t.M6C||0)+(t.MN||0)+(t.CrN||0)+(t.Fe3C||0)).toFixed(1)}<br />${t.stability}
                    </td>
                    <td class="tcc">${t.TCC}</td>
                  </tr>`})}
              </tbody>
            </table>
          </div>`:p`<div class="empty">No steels found.</div>`}
    `}};ae.styles=ye`
    :host {
      display: block;
    }
    .table-wrap {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      border: 1px solid var(--vsa-card-border);
      border-radius: 8px;
      background: var(--vsa-card-bg);
      position: relative;
    }
    :host-context(.dark) .table-wrap {
      box-shadow: 0 0 0 1px var(--vsa-border) inset,
        0 2px 6px rgba(0, 0, 0, 0.6);
    }
    /* subtle gradient edge hint for scroll */
    .table-wrap::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 1.5rem;
      height: 100%;
      pointer-events: none;
      background: linear-gradient(to left, var(--vsa-surface), transparent);
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.75rem;
      min-width: 42rem; /* force horizontal scroll on very small screens */
    }
    th,
    td {
      padding: 0.4rem 0.5rem;
      text-align: right;
    }
    th {
      position: sticky;
      top: 0;
      background: var(--vsa-card-bg);
      cursor: pointer;
      font-weight: 600;
    }
    :host-context(.dark) th {
      border-bottom: 1px solid var(--vsa-border);
    }
    tbody tr {
      border-top: 1px solid var(--vsa-border);
    }
    tbody tr:hover {
      background: var(--vsa-row-hover, #262b33);
    }
    /* Selected row (after click) made high contrast */
    tbody tr[aria-selected="true"] {
      background: var(--sl-color-primary-50);
      color: var(--sl-color-neutral-900);
      outline: 2px solid var(--sl-color-primary-500);
      outline-offset: -2px;
      font-weight: 600;
    }
    :host-context(.dark) tbody tr[aria-selected="true"] {
      background: var(--sl-color-primary-600);
      color: var(--sl-color-neutral-0);
      outline: 2px solid var(--sl-color-primary-300);
    }
    /* two-tone zebra striping */
    tbody tr:nth-child(even) {
      background: var(--vsa-row-alt, rgba(255, 255, 255, 0.03));
    }
    /* Dark mode zebra striping: use subtle deep neutral instead of near-white */
    :host-context(.dark) tbody tr:nth-child(even) {
      background: var(--vsa-row-alt-dark, rgba(0, 0, 0, 0.35));
    }
    :host-context(.dark) tbody tr:nth-child(odd) {
      background: var(--vsa-row-base-dark, rgba(0, 0, 0, 0.15));
    }
    tbody tr:focus {
      outline: 2px solid var(--sl-color-primary-600, #4d7cff);
      outline-offset: -2px;
      background: var(--vsa-row-focus, #313842);
    }
    td.name {
      text-align: left;
      font-weight: 500;
    }
    .empty {
      padding: 1rem;
      text-align: center;
      opacity: 0.7;
    }
    .vol-cell {
      font-size: 0.65rem;
      line-height: 1.1;
    }
    .tcc {
      font-weight: 600;
    }
    @media (max-width: 600px) {
      table {
        font-size: 0.85rem;
      }
      th,
      td {
        padding: 0.55rem 0.6rem;
      }
      .toolbar {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `,ae.properties={steels:{type:Array},filter:{type:String},sortKey:{type:String},sortDir:{type:String},hardness:{type:Number},edgeAngle:{type:Number},selectedName:{type:String}};let re=ae;customElements.define("vsa-steel-table",re);const At=Object.freeze(Object.defineProperty({__proto__:null,VsaSteelTable:re},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ct={attribute:!0,type:String,converter:ie,reflect:!1,hasChanged:be},St=(o=Ct,e,t)=>{const{kind:s,metadata:i}=t;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((o=Object.create(o)).wrapped=!0),n.set(t.name,o),s==="accessor"){const{name:r}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(r,a,o)},init(l){return l!==void 0&&this.C(r,void 0,o,l),l}}}if(s==="setter"){const{name:r}=t;return function(l){const a=this[r];e.call(this,l),this.requestUpdate(r,a,o)}}throw Error("Unsupported decorator location: "+s)};function m(o){return(e,t)=>typeof t=="object"?St(o,e,t):((s,i,n)=>{const r=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),r?Object.getOwnPropertyDescriptor(i,n):void 0})(o,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function le(o){return m({...o,state:!0,attribute:!1})}var Tt=Object.defineProperty,w=(o,e,t,s)=>{for(var i=void 0,n=o.length-1,r;n>=0;n--)(r=o[n])&&(i=r(e,t,i)||i);return i&&Tt(e,t,i),i};const we=class we extends H{constructor(){super(),this.angleInput=15,this.thicknessInput=.5,this.angleInputB=15,this.thicknessInputB=.5,this.angleInputType="dps",this.angleInputTypeB="dps",this.travelInputType="width",this.travelInputTypeB="width",this.zoom=1,this.pan=0,this.segments=[],this.segmentsB=[],this.warning=null,this._storageKey="vsa-geometry-builder-state",this.units="mm",this.regionZoomActive=!1,this.overlayMode=!0,this.overlayCenter=.5,this.overlayTargetWidth=null,this._fullScreen=!1,this._userAdjustingWidth=!1,this._userAdjustingCenter=!1,this.strokePxMin=5,this.showDebug=!0,this.thinStrokes=!0,this.adaptiveZoomMode="idle",this._activeShrink=!1,this._activeExpand=!1,this._prevOverlayCenter=this.overlayCenter,this._customViewBox=null,this._baseViewBox=null,this._dragPanning=!1,this._dragStart=null,this._lastTapTime=0,this._pendingTap=null,this._onPanMoveBound=e=>this._onPanMove(e),this._onPanEndBound=e=>this._onPanEnd(e)}get fullScreen(){return this._fullScreen}set fullScreen(e){this._fullScreen=e,this._dispatchFullScreenChanged()}connectedCallback(){super.connectedCallback(),this._restore()}disconnectedCallback(){super.disconnectedCallback()}_restore(){try{const e=localStorage.getItem(this._storageKey);if(!e)return;const t=JSON.parse(e);Array.isArray(t.segments)&&(this.segments=t.segments),Array.isArray(t.segmentsB)&&(this.segmentsB=t.segmentsB),typeof t.zoom=="number"&&(this.zoom=t.zoom),typeof t.pan=="number"&&(this.pan=t.pan),typeof t.angleInput=="number"&&(this.angleInput=t.angleInput),typeof t.thicknessInput=="number"&&(this.thicknessInput=t.thicknessInput),typeof t.angleInputB=="number"&&(this.angleInputB=t.angleInputB),typeof t.thicknessInputB=="number"&&(this.thicknessInputB=t.thicknessInputB),(t.angleInputType==="dps"||t.angleInputType==="inclusive")&&(this.angleInputType=t.angleInputType),(t.angleInputTypeB==="dps"||t.angleInputTypeB==="inclusive")&&(this.angleInputTypeB=t.angleInputTypeB),(t.travelInputType==="width"||t.travelInputType==="height")&&(this.travelInputType=t.travelInputType),(t.travelInputTypeB==="width"||t.travelInputTypeB==="height")&&(this.travelInputTypeB=t.travelInputTypeB),(t.units==="mm"||t.units==="in")&&(this.units=t.units),typeof t.overlayMode=="boolean"&&(this.overlayMode=t.overlayMode),typeof t.overlayCenter=="number"&&(this.overlayCenter=t.overlayCenter),typeof t.overlayTargetWidth=="number"&&(this.overlayTargetWidth=t.overlayTargetWidth),typeof t.strokePxMin=="number"&&(this.strokePxMin=t.strokePxMin),typeof t.thinStrokes=="boolean"?this.thinStrokes=t.thinStrokes:typeof t._thinStrokes=="boolean"&&(this.thinStrokes=t._thinStrokes),typeof t.fullScreen=="boolean"&&(this.fullScreen=t.fullScreen),t.customViewBox&&typeof t.customViewBox.x=="number"&&typeof t.customViewBox.y=="number"&&typeof t.customViewBox.w=="number"&&typeof t.customViewBox.h=="number"&&(this._customViewBox=t.customViewBox,this.regionZoomActive=!0)}catch{}}_persist(){try{const e=this.fullScreen,t={angleInput:this.angleInput,thicknessInput:this.thicknessInput,angleInputB:this.angleInputB,thicknessInputB:this.thicknessInputB,segments:this.segments,segmentsB:this.segmentsB,angleInputType:this.angleInputType,angleInputTypeB:this.angleInputTypeB,travelInputType:this.travelInputType,travelInputTypeB:this.travelInputTypeB,units:this.units,overlayMode:this.overlayMode,overlayCenter:this.overlayCenter,overlayTargetWidth:this.overlayTargetWidth,strokePxMin:this.strokePxMin,thinStrokes:this.thinStrokes,customViewBox:this._customViewBox,fullScreen:this.fullScreen};localStorage.setItem(this._storageKey,JSON.stringify(t)),this.fullScreen?(document.documentElement.style.overflow="hidden",document.body.style.overflow="hidden"):(document.documentElement.style.overflow="",document.body.style.overflow=""),e!==this.fullScreen&&this._dispatchFullScreenChanged()}catch{}}_dispatchFullScreenChanged(){this.dispatchEvent(new CustomEvent("geometry-fullscreen-changed",{detail:{fullScreen:this.fullScreen},bubbles:!0,composed:!0}))}_toggleFullScreen(){this.fullScreen=!this.fullScreen,this._customViewBox=null,this.requestUpdate(),this._persist()}_editSegment(e,t,s,i){if(i<=0||Number.isNaN(i))return;const n=e==="A"?[...this.segments]:[...this.segmentsB];n[t]&&(n[t]={...n[t],[s]:i},e==="A"?this.segments=n:this.segmentsB=n,this._baseViewBox=null,this._persist())}_deleteSegment(e,t){const s=e==="A"?[...this.segments]:[...this.segmentsB];s[t]&&(s.splice(t,1),e==="A"?this.segments=s:this.segmentsB=s,this._baseViewBox=null,this._persist())}_add(){const e=this.angleInput,t=this.angleInputType,s=t==="inclusive"?e:e*2,i=this.travelInputType,n=this.thicknessInput,r=this.segments[this.segments.length-1],l=(r==null?void 0:r.derivedWidth)??0,a=(r==null?void 0:r.derivedHeight)??0;if(i==="width"){if(n<=l){const h=this._displayDigits();this.warning=`Width ${this._toDisplayLength(n).toFixed(h)}${this.units} must exceed previous ${this._toDisplayLength(l).toFixed(h)}${this.units}.`,this.requestUpdate();return}if(s===0){this.warning="Zero angle only valid with height travel.",this.requestUpdate();return}}else if(n<=a){const h=this._displayDigits();this.warning=`Height ${this._toDisplayLength(n).toFixed(h)}${this.units} must exceed previous ${this._toDisplayLength(a).toFixed(h)}${this.units}.`,this.requestUpdate();return}if(s<0)return;const d={angleType:t,angleValue:e,travelType:i,travelValue:n};this.warning=null,this.segments=[...this.segments,d],this._baseViewBox=null,this._persist()}_addB(){const e=this.angleInputB,t=this.angleInputTypeB,s=t==="inclusive"?e:e*2,i=this.travelInputTypeB,n=this.thicknessInputB,r=this.segmentsB[this.segmentsB.length-1],l=(r==null?void 0:r.derivedWidth)??0,a=(r==null?void 0:r.derivedHeight)??0;if(i==="width"){if(n<=l){const h=this._displayDigits();this.warning=`Width ${this._toDisplayLength(n).toFixed(h)}${this.units} must exceed previous ${this._toDisplayLength(l).toFixed(h)}${this.units} (B).`,this.requestUpdate();return}if(s===0){this.warning="Zero angle only valid with height travel.";return}}else if(n<=a){const h=this._displayDigits();this.warning=`Height ${this._toDisplayLength(n).toFixed(h)}${this.units} must exceed previous ${this._toDisplayLength(a).toFixed(h)}${this.units} (B).`,this.requestUpdate();return}if(s<0)return;const d={angleType:t,angleValue:e,travelType:i,travelValue:n};this.warning=null,this.segmentsB=[...this.segmentsB,d],this._baseViewBox=null,this._persist()}_getSegments(e){return e==="A"?this.segments:this.segmentsB}_updateAngleType(e,t,s){const n=this._getSegments(e)[t];if(!n||n.angleType===s)return;s==="inclusive"&&n.angleType==="dps"?n.angleValue=n.angleValue*2:s==="dps"&&n.angleType==="inclusive"&&(n.angleValue=n.angleValue/2),n.angleType=s,(n.angleType==="inclusive"?n.angleValue:n.angleValue*2)===0&&n.travelType==="width"?this.warning="Zero angle only allowed when travel type is height.":this.warning="",this._compute()}_updateAngleValue(e,t,s){const i=this._getSegments(e),n=i[t];if(!n||isNaN(s)||s<0)return;if(i[t-1],n.angleValue=s,(n.angleType==="inclusive"?n.angleValue:n.angleValue*2)===0&&n.travelType==="width"){this.warning="Zero angle only allowed with height travel.";return}else this.warning="";this._compute()}_updateTravelType(e,t,s){const i=this._getSegments(e),n=i[t];if(!n||n.travelType===s)return;const l=this._recomputeSegments(i.map(a=>({...a})))[t];if(s==="height")n.travelType="height",n.travelValue=l.derivedHeight??0;else{if((n.angleType==="inclusive"?n.angleValue:n.angleValue*2)===0){this.warning="Cannot switch to width travel with zero angle.";return}n.travelType="width",n.travelValue=l.derivedWidth??0}this.warning="",this._compute()}_updateTravelValue(e,t,s){const i=this._getSegments(e),n=i[t];if(!n||isNaN(s)||s<=0)return;const r=i[t-1];if(n.travelType==="width"){const a=(r==null?void 0:r.derivedWidth)??0;if(s<=a){const d=this._displayDigits();this.warning=`Width must exceed previous width (${this._toDisplayLength(a).toFixed(d)}${this.units}).`;return}}else{const a=(r==null?void 0:r.derivedHeight)??0;if(s<=a){const d=this._displayDigits();this.warning=`Height must exceed previous height (${this._toDisplayLength(a).toFixed(d)}${this.units}).`;return}}if(n.travelValue=s,(n.angleType==="inclusive"?n.angleValue:n.angleValue*2)===0&&n.travelType==="width"){this.warning="Zero angle only allowed with height travel.";return}this.warning="",this._compute()}_toDisplayLength(e){return this.units==="mm"?e:e/25.4}_fromDisplayLength(e){return this.units==="mm"?e:e*25.4}_displayDigits(){return this.units==="mm"?3:4}_formatLen(e,t=this._displayDigits()){return this._toDisplayLength(e).toFixed(t)}_clear(){this.segments=[],this.segmentsB=[],this._baseViewBox=null;try{localStorage.removeItem(this._storageKey)}catch{}}_recomputeSegments(e){let t=0,s=0;return e.map(i=>{const n=i.angleType==="dps"?i.angleValue*2:i.angleValue,r=n*Math.PI/360;let l=t,a=s;if(i.travelType==="width"){const h=i.travelValue;if(n===0)l=t,a=s;else{l=h;const c=t===0?l/2/Math.tan(r):(l-t)/(2*Math.tan(r));a=s+c}}else{const h=i.travelValue;h<s?a=s:a=h;const c=a-s;n===0?l=t:t===0?l=2*a*Math.tan(r):l=t+2*c*Math.tan(r)}const d={...i,angleInclusive:n,derivedWidth:l,derivedHeight:a};return t=l,s=a,d})}_compute(){const e=this._recomputeSegments(this.segments);e!==this.segments&&(this.segments=e);let t=0,s=0;const i=[];for(const n of e){const r=n.derivedWidth??s,l=n.derivedHeight??t;i.push({angleInclusive:n.angleInclusive??(n.angleType==="dps"?n.angleValue*2:n.angleValue),startWidth:s,endWidth:r,startY:t,endY:l}),t=l,s=r}return i}_path(e){if(!e.length)return"";let t="M 0 0";for(const s of e){const i=-s.endWidth/2,n=s.endY;t+=` L ${i} ${n}`}for(let s=e.length-1;s>=0;s--){const i=e[s],n=i.endWidth/2,r=i.endY;t+=` L ${n} ${r}`}return t+=" Z",t}_segmentPaths(e){return e.map(t=>{const{startWidth:s,endWidth:i,startY:n,endY:r}=t;return[`M ${-s/2} ${n}`,`L ${-i/2} ${r}`,`L ${i/2} ${r}`,`L ${s/2} ${n}`,"Z"].join(" ")})}_widthAtY(e,t){if(!e.length||t<=0)return 0;for(const s of e)if(t<=s.endY+1e-9){const i=s.endY-s.startY;if(i<=1e-9)return s.endWidth;const n=(t-s.startY)/i;return s.startWidth+(s.endWidth-s.startWidth)*n}return e[e.length-1].endWidth}_onAngle(e){this.angleInput=Number(e.target.value),this._persist()}_onAngleTypeChange(e){const t=e.target.value;t!==this.angleInputType&&(t==="inclusive"&&this.angleInputType==="dps"?this.angleInput=this.angleInput*2:t==="dps"&&this.angleInputType==="inclusive"&&(this.angleInput=this.angleInput/2),this.angleInputType=t,this._persist())}_onThickness(e){this.thicknessInput=Number(e.target.value),this._persist()}_onAngleB(e){this.angleInputB=Number(e.target.value),this._persist()}_onAngleTypeChangeB(e){const t=e.target.value;t!==this.angleInputTypeB&&(t==="inclusive"&&this.angleInputTypeB==="dps"?this.angleInputB=this.angleInputB*2:t==="dps"&&this.angleInputTypeB==="inclusive"&&(this.angleInputB=this.angleInputB/2),this.angleInputTypeB=t,this._persist())}_onThicknessB(e){this.thicknessInputB=Number(e.target.value),this._persist()}_onTravelTypeChange(e){const t=e.target.value;if(t===this.travelInputType)return;const s=this.segments[this.segments.length-1];if(t==="height"){const i=(s==null?void 0:s.derivedHeight)??0;this.thicknessInput=+(i+.2).toFixed(4)}else{const i=(s==null?void 0:s.derivedWidth)??0;this.thicknessInput=+(i+.1).toFixed(4)}this.travelInputType=t,this._persist()}_onTravelTypeChangeB(e){const t=e.target.value;if(t===this.travelInputTypeB)return;const s=this.segmentsB[this.segmentsB.length-1];if(t==="height"){const i=(s==null?void 0:s.derivedHeight)??0;this.thicknessInputB=+(i+.2).toFixed(4)}else{const i=(s==null?void 0:s.derivedWidth)??0;this.thicknessInputB=+(i+.1).toFixed(4)}this.travelInputTypeB=t,this._persist()}_onZoom(e){this.zoom=Number(e.target.value),this._customViewBox=null,this.regionZoomActive=!1,this._baseViewBox=null,this._persist()}_onPan(e){if(this.pan=Number(e.target.value)/100,this._customViewBox&&this._baseViewBox){const t=this._compute().reduce((n,r)=>Math.max(n,r.endY),0),s=this._customViewBox.h,i=Math.max(0,t-s);this._customViewBox.y=i*this.pan}this._persist()}_toggleOverlay(){this.overlayMode=!this.overlayMode,this._persist()}_changeUnits(e){const t=e.target.value;(t==="mm"||t==="in")&&(this.units=t,this._persist())}_onOverlayCenter(e){this._userAdjustingCenter=!0;const t=Number(e.target.value),s=this._compute().reduce((l,a)=>Math.max(l,a.endY),0)||0,i=this.units==="mm"?t:t*25.4,n=Math.max(0,Math.min(s,i)),r=s===0?0:n/s;this.overlayCenter=r,this._customViewBox=null,this.regionZoomActive=!1,this._prevOverlayCenter=this.overlayCenter,this._triggerAdaptiveZoom(),this.requestUpdate(),this._persist(),this._userAdjustingCenter=!1}_onOverlayWidth(e){this._userAdjustingWidth=!0;const t=1e4,s=Number(e.target.value),i=Math.min(t,Math.max(0,s))/t,n=this._geometryMaxWidthMm(),r=this.units==="mm"?.001:1e-4*25.4,l=r+(n-r)*i;this.overlayTargetWidth=l,this._customViewBox=null,this.regionZoomActive=!1,this.requestUpdate(),this._persist(),this._userAdjustingWidth=!1,this._activeShrink=!1,this._activeExpand=!1,this.adaptiveZoomMode="idle"}_geometryMaxWidthMm(){const e=this._compute(),t=this.segments;this.segments=this.segmentsB;const s=this._compute();this.segments=t;const i=e.length?e[e.length-1].endWidth:1,n=s.length?s[s.length-1].endWidth:1;return Math.max(i,n)*1.1}_onStrokePxMin(e){const t=Number(e.target.value);this.strokePxMin=Math.max(1,Math.min(500,t)),this.requestUpdate(),this._persist()}_syncOverlayFromViewBox(e=!0,t=!1){if(!this._customViewBox)return;const s=this._compute(),i=this.segments;this.segments=this.segmentsB;const n=this._compute();this.segments=i;const r=s.length?s[s.length-1].endY:5,l=n.length?n[n.length-1].endY:5,a=Math.max(r,l),d=this._customViewBox;this.overlayMode&&!t&&!this._userAdjustingWidth&&(this.overlayTargetWidth==null||d.w>this.overlayTargetWidth)&&(this.overlayTargetWidth=d.w);const h=d.y+d.h/2;let c=a>0?h/a:0;c<0?c=0:c>1&&(c=1),c<.001&&(c=0);const u=this.overlayCenter;this.overlayCenter=c,this._autoExpandTargetWidthAtCenter(s,n,a,u),this._prevOverlayCenter=this.overlayCenter,this.requestUpdate(),e&&this._persist()}_autoExpandTargetWidthAtCenter(e,t,s,i){if(!this.overlayMode||i!==void 0&&this.overlayCenter<=i||this.overlayCenter<.02)return;const n=e??this._compute(),r=this.segments;this.segments=this.segmentsB;const l=t??this._compute();this.segments=r;const a=s??Math.max(n.length?n[n.length-1].endY:0,l.length?l[l.length-1].endY:0),d=this.overlayCenter*a;let h=this._widthAtY(n,d),c=this._widthAtY(l,d),u=Math.max(h,c);if(u<1e-6){const y=Math.min(a,d+.001);h=this._widthAtY(n,y),c=this._widthAtY(l,y),u=Math.max(h,c)}const v=this.overlayTargetWidth??0;u>v*1.01&&(this.overlayTargetWidth=u*1.02,this._customViewBox=null,this.regionZoomActive=!1)}_triggerAdaptiveZoom(){if(!this.overlayMode||this._userAdjustingWidth)return;const e=this._compute(),t=this.segments;this.segments=this.segmentsB;const s=this._compute();this.segments=t;const i=Math.max(e.length?e[e.length-1].endY:0,s.length?s[s.length-1].endY:0);if(i<=0)return;const n=this.overlayCenter*i;let r=this._widthAtY(e,n),l=this._widthAtY(s,n),a=Math.max(r,l);if(a<1e-6&&(a=.02),this.overlayTargetWidth==null){this.overlayTargetWidth=a*1.05,this.adaptiveZoomMode="expand",this._activeExpand=!0,this.requestUpdate();return}const d=this.overlayTargetWidth,h=1.01,c=1.005,u=.3,v=.38,y=a/d;let b="idle";if((this._activeExpand||a>d*h)&&(a>d*h||this._activeExpand))if(a>d*c){const S=a*1.03,M=d+(S-d)*.25;this.overlayTargetWidth=M,b="expand",this._activeExpand=a/this.overlayTargetWidth<c}else this._activeExpand=!1;if(b==="idle"&&(this._activeShrink||y<u)&&(y<u||this._activeShrink))if(y<v){const S=a*1.25,M=this.units==="mm"?.001:1e-4*25.4;let x=d+(S-d)*.2;x<a*1.15&&(x=a*1.15),x<M&&(x=M),this.overlayTargetWidth=x,b="shrink",this._activeShrink=a/this.overlayTargetWidth<v}else this._activeShrink=!1;this.adaptiveZoomMode=b,b!=="idle"&&(this._customViewBox=null,this.regionZoomActive=!1,this.requestUpdate(),this._persist())}_dynamicViewportWidth(e){const t=Math.max(e*.4,.4),s=this.units==="mm"?.01:.01*25.4;return Math.max(s,e+t)}_logSampledWidth(){const e=this._compute(),t=this.segments;this.segments=this.segmentsB;const s=this._compute();this.segments=t;const i=Math.max(e.length?e[e.length-1].endY:0,s.length?s[s.length-1].endY:0),n=i>0?Math.min(i*5e-4,.001):.001,r=this.overlayCenter*i,l=r<n*4?n:r,a=this._widthAtY(e,l),d=this._widthAtY(s,l),h=Math.max(a,d),c=this._dynamicViewportWidth(h);console.log(`[Geom] sampled ${h.toFixed(5)}mm centerY=${r.toFixed(5)} viewport=${c.toFixed(5)}mm`)}_onSvgDblClick(e){const t=e.currentTarget,s=t.viewBox.baseVal,i=this._svgPoint(t,e),n=this._compute(),r=this.segments;this.segments=this.segmentsB;const l=this._compute();this.segments=r;const a=Math.max(n.length?n[n.length-1].endY:0,l.length?l[l.length-1].endY:0);if(a>0){let h=i.y/a;h<0&&(h=0),h>1&&(h=1),this.overlayCenter=h}this._applyZoomAtPoint(i.x,i.y,.35,s,t,!1),this._persist()}_onSvgShiftDblClick(e){console.log("[Geom] shift dblclick svg","client",e.clientX,e.clientY);const t=e.currentTarget,s=t.viewBox.baseVal,i=this._svgPoint(t,e),n=1/.35;this._applyZoomAtPoint(i.x,i.y,n,s,t,!0)}_onPointerDownTap(e){if(e.pointerType!=="touch"&&e.pointerType!=="pen")return;const t=performance.now(),s=this.renderRoot.querySelector(".svg-wrap svg");if(!s)return;const i=this._svgPoint(s,e),n=t-this._lastTapTime;if(this._lastTapTime=t,n<320&&this._pendingTap){this._pendingTap=null;const r=new MouseEvent("dblclick",{clientX:e.clientX,clientY:e.clientY,bubbles:!0,cancelable:!0});this._onSvgDblClick(r)}else{this._pendingTap={x:i.x,y:i.y};const r=this._compute(),l=this.segments;this.segments=this.segmentsB;const a=this._compute();this.segments=l;const d=Math.max(r.length?r[r.length-1].endY:0,a.length?a[a.length-1].endY:0);if(d>0){let h=i.y/d;h<0&&(h=0),h>1&&(h=1),this.overlayCenter=h,this.requestUpdate(),this._persist()}setTimeout(()=>{this._pendingTap&&performance.now()-this._lastTapTime>320&&(this._pendingTap=null)},340)}}_applyZoomAtPoint(e,t,s,i,n,r){this._baseViewBox||(this._baseViewBox={x:i.x,y:i.y,w:i.width,h:i.height});let l=i.width*s,a=i.height*s;const d=.0254;if(!r&&l<d){const u=d/l;l=d,a=a*u}if(r&&(l>=this._baseViewBox.w||a>=this._baseViewBox.h)){this._customViewBox=null,this.regionZoomActive=!1,this.requestUpdate();return}const h=e-l/2,c=t-a/2;this._customViewBox={x:h,y:c,w:l,h:a},this.regionZoomActive=!0,this._syncOverlayFromViewBox(!1,!0),this.requestUpdate()}_resetZoom(){console.log("[Geom] reset zoom");const e=this._compute(),t=e.length?e[e.length-1].endY:5,s=e.length?e[e.length-1].endWidth:2,i=t/this.zoom,n=s/this.zoom,r=n*.15,l=i*.05,a=-n/2-r,d=0,h=n+r*2,c=i+l;this._customViewBox={x:a,y:d,w:h,h:c},this._baseViewBox={x:a,y:d,w:h,h:c},this.regionZoomActive=!0,this.requestUpdate()}_svgPoint(e,t){const s=e.getBoundingClientRect(),i=e.viewBox.baseVal.width/s.width,n=e.viewBox.baseVal.height/s.height;let r=e.viewBox.baseVal.x+(t.clientX-s.left)*i,l=e.viewBox.baseVal.y+(t.clientY-s.top)*n;const a=s.height*.03;s.bottom-t.clientY<=a&&(l=0);const h=Math.abs(t.clientX-(s.left+s.width/2));return l===0&&h<=s.width*.03&&(r=0),{x:r,y:l}}_onWheel(e){if(e.preventDefault(),!this.overlayMode)return;const t=this._geometryMaxWidthMm(),s=this.units==="mm"?.001:1e-4*25.4;let i=this.overlayTargetWidth??t;const n=e.deltaY>0?1:-1,r=e.altKey?.01:e.shiftKey?.15:.05,l=t-s,a=Math.min(10,Math.max(1,Math.round(Math.abs(e.deltaY)/100))),d=l*r*a*n*-1;let h=i+d;h<s&&(h=s),h>t&&(h=t),console.log("[Geom] wheel width change",{prev:i,next:h,units:this.units,deltaY:e.deltaY,steps:a,modifier:r}),this.overlayTargetWidth=h,this._customViewBox=null,this.regionZoomActive=!0,this.requestUpdate()}_logEvent(e,t){t instanceof MouseEvent?console.log(`[Geom] ${e}`,"type",t.type,"btn",t.button,"client",t.clientX,t.clientY,"shift",t.shiftKey):console.log(`[Geom] ${e}`,"type",t.type)}_onPanStart(e){if(e.button!==0)return;const t=this.renderRoot.querySelector(".svg-wrap svg");if(!t)return;const s=t.viewBox.baseVal;this._dragPanning=!0,this._dragStart={x:e.clientX,y:e.clientY,vbX:s.x,vbY:s.y,vbW:s.width,vbH:s.height},this._baseViewBox||(this._baseViewBox={x:s.x,y:s.y,w:s.width,h:s.height}),this._customViewBox||(this._customViewBox={x:s.x,y:s.y,w:s.width,h:s.height}),this.regionZoomActive=!0,window.addEventListener("mousemove",this._onPanMoveBound),window.addEventListener("mouseup",this._onPanEndBound),this._logEvent("pan-start",e),e.preventDefault()}_onPanMove(e){if(!this._dragPanning||!this._dragStart)return;const t=this.renderRoot.querySelector(".svg-wrap svg");if(!t)return;const s=this._dragStart,i=t.getBoundingClientRect(),n=s.vbW/i.width,r=s.vbH/i.height,l=Math.max(n,r),a=(e.clientX-s.x)*l,d=(e.clientY-s.y)*l,h=s.vbX-a,c=s.vbY-d;this._customViewBox={x:h,y:c,w:s.vbW,h:s.vbH},this._syncOverlayFromViewBox(),this.requestUpdate(),e.buttons===0&&this._onPanEnd(e)}_onPanEnd(e){this._dragPanning&&(this._dragPanning=!1,this._dragStart=null,window.removeEventListener("mousemove",this._onPanMoveBound),window.removeEventListener("mouseup",this._onPanEndBound),this._logEvent("pan-end",e))}_renderWidthSlider(e){const t=this._geometryMaxWidthMm(),s=this.units==="mm"?.001:1e-4*25.4;let i=this.overlayTargetWidth??t;i=Math.max(s,Math.min(t,i));const n=(i-s)/(t-s),r=1e4,l=Math.round(n*r),a=this._displayDigits(),d=(this.units==="mm"?t:t/25.4).toFixed(a),h=(this.units==="mm"?s:s/25.4).toFixed(a);return p`<div
      class="width-slider-box"
      style="margin-top:.5rem;display:flex;flex-direction:column;gap:.25rem;"
    >
      <div
        style="display:flex;justify-content:space-between;font-size:.55rem;opacity:.7;"
      >
        <span>${h} ${this.units}</span>
        <span>Target Width</span>
        <span>${d} ${this.units}</span>
      </div>
      <div style="display:flex;align-items:center;gap:.4rem;">
        <input
          type="range"
          min="0"
          max="${r}"
          step="1"
          .value=${String(l)}
          @input=${this._onOverlayWidth}
          style="flex:1;"
        />
        <input
          type="number"
          style="width:6.5rem;font-size:.55rem;padding:.2rem;"
          .value=${(this.units==="mm"?i:i/25.4).toFixed(a)}
          @change=${c=>{const u=Number(c.target.value);if(!isFinite(u))return;const v=this.units==="mm"?u:u*25.4,y=Math.max(s,Math.min(t,v));this.overlayTargetWidth=y,this._customViewBox=null,this.requestUpdate()}}
        />
      </div>
      <div style="font-size:.6rem;opacity:.75;text-align:center;">
        Width: ${this._formatLen(this.overlayTargetWidth??i)}
        ${this.units}
      </div>
    </div>`}render(){const e=this._compute(),t=this.segments;this.segments=this.segmentsB;const s=this._compute();this.segments=t,this._path(e),this._path(s);const i=this._segmentPaths(e),n=this._segmentPaths(s),r=e.length?e[e.length-1].endY:5,l=s.length?s[s.length-1].endY:5,a=Math.max(r,l),d=e.length?e[e.length-1].endWidth:2,h=s.length?s[s.length-1].endWidth:2,c=this.overlayMode?0:.4;this.overlayMode?Math.max(d,h):d+c+h;let u=this.overlayCenter*a;const v=a>0?Math.min(a*5e-4,.001):.001;if(this.overlayMode&&this.overlayTargetWidth==null){const $=u<v*4?v:u,g=this._widthAtY(e,$),j=this._widthAtY(s,$),C=Math.max(g,j,Math.max(d,h));this.overlayTargetWidth=C}const y=u<v*4?v:u,b=this._widthAtY(e,y),S=this._widthAtY(s,y),M=Math.max(b,S,1e-5),x=this._dynamicViewportWidth(M);this.overlayTargetWidth=x;const I=this.renderRoot.querySelector(".svg-wrap");let P=1;if(I){const $=I.getBoundingClientRect();$.width>0&&$.height>0&&(P=$.height/$.width)}const _=x*P,E=-x/2;let T;{T=a-u-_/2,T<0&&(T=0);const g=Math.max(0,a-_);T>g&&(T=g)}const te=x,F=_,Ge=this.thinStrokes?.375:5;return this.units==="mm"||1/25.4,this.units,p` <div class="page ${this.fullScreen?"full-screen":""}">
      <h2>Geometry Builder (Knife Cross Section)</h2>
      <div class="controls-bar">
        <label style="display:flex;align-items:center;gap:.25rem">
          <span style="font-size:.55rem">Units</span>
          <select
            @change=${this._changeUnits}
            style="font-size:.6rem;padding:.15rem .3rem;border-radius:4px;background:var(--sl-color-neutral-0);"
          >
            <option value="mm" ?selected=${this.units==="mm"}>mm</option>
            <option value="in" ?selected=${this.units==="in"}>in</option>
          </select>
        </label>
        <label
          style="display:flex;align-items:center;gap:.3rem;font-size:.55rem;"
        >
          <input
            type="checkbox"
            .checked=${this.fullScreen}
            @change=${()=>this._toggleFullScreen()}
          />
          Fullscreen
        </label>
        <label
          style="display:flex;align-items:center;gap:.3rem;font-size:.55rem;"
        >
          <input
            type="checkbox"
            .checked=${this.thinStrokes}
            @change=${()=>{this.thinStrokes=!this.thinStrokes,this._persist()}}
          />
          Thin Strokes
        </label>
        <label
          style="display:flex;align-items:center;gap:.3rem;font-size:.55rem;"
        >
          <input
            type="checkbox"
            .checked=${this.showDebug}
            @change=${()=>{this.showDebug=!this.showDebug,this._persist()}}
          />
          Debug
        </label>
      </div>
      ${this.fullScreen?p``:p` <div class="panels">
            <div class="editor-panel">
              <div class="panel-header">Geometry A</div>
              <div class="row-inline">
                <div style="display:flex;flex-direction:column;gap:.25rem;">
                  <label
                    style="font-size:.55rem;display:flex;gap:.25rem;align-items:center;"
                  >
                    <span>Angle</span>
                    <select
                      style="font-size:.55rem;"
                      @change=${this._onAngleTypeChange}
                    >
                      <option
                        value="dps"
                        ?selected=${this.angleInputType==="dps"}
                      >
                        dps
                      </option>
                      <option
                        value="inclusive"
                        ?selected=${this.angleInputType==="inclusive"}
                      >
                        inc
                      </option>
                    </select>
                    <select
                      style="font-size:.55rem;"
                      @change=${this._onTravelTypeChange}
                    >
                      <option
                        value="width"
                        ?selected=${this.travelInputType==="width"}
                      >
                        width
                      </option>
                      <option
                        value="height"
                        ?selected=${this.travelInputType==="height"}
                      >
                        height
                      </option>
                    </select>
                  </label>
                  <input
                    type="number"
                    class="inline-input"
                    step="${this.units==="mm"?"0.001":"0.0001"}"
                    .value=${this._toDisplayLength(this.thicknessInput).toFixed(this._displayDigits())}
                    @input=${$=>{const g=Number($.target.value);Number.isNaN(g)||(this.thicknessInput=this._fromDisplayLength(parseFloat(g.toFixed(this._displayDigits()))),this._persist())}}
                  />
                </div>
                <sl-button
                  size="small"
                  variant="primary"
                  @click=${()=>this._add()}
                  >Add</sl-button
                >
              </div>
              <div class="seg-table-wrap">
                <table class="segments-edit">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Angle</th>
                      <th>End ${this.units}</th>
                      <th>ΔH</th>
                      <th>End H</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${e.map(($,g)=>{const j=$.endY-$.startY;return p`<tr>
                        <td>${g+1}</td>
                        <td>
                          <select
                            class="inline-input"
                            @change=${C=>this._updateAngleType("A",g,C.target.value)}
                          >
                            <option
                              value="inclusive"
                              ?selected=${this.segments[g].angleType==="inclusive"}
                            >
                              inc
                            </option>
                            <option
                              value="dps"
                              ?selected=${this.segments[g].angleType==="dps"}
                            >
                              dps
                            </option>
                          </select>
                          <input
                            class="inline-input"
                            type="number"
                            style="margin-top:2px;width:3.2rem"
                            .value=${String(this.segments[g].angleValue)}
                            @change=${C=>this._updateAngleValue("A",g,Number(C.target.value))}
                          />
                        </td>
                        <td>
                          <select
                            class="inline-input"
                            @change=${C=>this._updateTravelType("A",g,C.target.value)}
                          >
                            <option
                              value="width"
                              ?selected=${this.segments[g].travelType==="width"}
                            >
                              width
                            </option>
                            <option
                              value="height"
                              ?selected=${this.segments[g].travelType==="height"}
                            >
                              height
                            </option>
                          </select>
                          <input
                            class="inline-input"
                            type="number"
                            style="margin-top:2px;width:3.2rem"
                            .value=${String(this._toDisplayLength(this.segments[g].travelType==="width"?this.segments[g].travelValue:this.segments[g].travelValue))}
                            @change=${C=>{const he=Number(C.target.value),de=this._fromDisplayLength(he);this._updateTravelValue("A",g,de)}}
                          />
                        </td>
                        <td>${this._formatLen(j)}</td>
                        <td>${this._formatLen($.endY)}</td>
                        <td class="actions-cell">
                          <sl-button
                            size="x-small"
                            variant="danger"
                            @click=${()=>this._deleteSegment("A",g)}
                            >✕</sl-button
                          >
                        </td>
                      </tr>`})}
                    ${e.length===0?p`<tr>
                          <td colspan="6" style="text-align:center;opacity:.6">
                            No segments
                          </td>
                        </tr>`:""}
                  </tbody>
                </table>
              </div>
            </div>
            <div class="editor-panel">
              <div class="panel-header">Geometry B</div>
              <div class="row-inline">
                <div style="display:flex;flex-direction:column;gap:.25rem;">
                  <label
                    style="font-size:.55rem;display:flex;gap:.25rem;align-items:center;"
                  >
                    <span>Angle</span>
                    <select
                      style="font-size:.55rem;"
                      @change=${this._onAngleTypeChangeB}
                    >
                      <option
                        value="dps"
                        ?selected=${this.angleInputTypeB==="dps"}
                      >
                        dps
                      </option>
                      <option
                        value="inclusive"
                        ?selected=${this.angleInputTypeB==="inclusive"}
                      >
                        inc
                      </option>
                    </select>
                  </label>
                  <input
                    type="number"
                    class="inline-input"
                    .value=${String(this.angleInputB)}
                    @input=${this._onAngleB}
                  />
                </div>
                <div style="display:flex;flex-direction:column;gap:.25rem;">
                  <label
                    style="font-size:.55rem;display:flex;gap:.25rem;align-items:center;"
                  >
                    <span
                      >${this.travelInputTypeB==="width"?"Width":"Height"}
                      (${this.units})</span
                    >
                    <select
                      style="font-size:.55rem;"
                      @change=${this._onTravelTypeChangeB}
                    >
                      <option
                        value="width"
                        ?selected=${this.travelInputTypeB==="width"}
                      >
                        width
                      </option>
                      <option
                        value="height"
                        ?selected=${this.travelInputTypeB==="height"}
                      >
                        height
                      </option>
                    </select>
                  </label>
                  <input
                    type="number"
                    class="inline-input"
                    step="${this.units==="mm"?"0.001":"0.0001"}"
                    .value=${this._toDisplayLength(this.thicknessInputB).toFixed(this._displayDigits())}
                    @input=${$=>{const g=Number($.target.value);Number.isNaN(g)||(this.thicknessInputB=this._fromDisplayLength(parseFloat(g.toFixed(this._displayDigits()))),this._persist())}}
                  />
                </div>
                <sl-button
                  size="small"
                  variant="primary"
                  @click=${()=>this._addB()}
                  >Add</sl-button
                >
              </div>
              <div class="seg-table-wrap">
                <table class="segments-edit">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Angle</th>
                      <th>End ${this.units}</th>
                      <th>ΔH</th>
                      <th>End H</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${s.map(($,g)=>{const j=$.endY-$.startY;return p`<tr>
                        <td>${g+1}</td>
                        <td>
                          <select
                            class="inline-input"
                            @change=${C=>this._updateAngleType("B",g,C.target.value)}
                          >
                            <option
                              value="inclusive"
                              ?selected=${this.segmentsB[g].angleType==="inclusive"}
                            >
                              inc
                            </option>
                            <option
                              value="dps"
                              ?selected=${this.segmentsB[g].angleType==="dps"}
                            >
                              dps
                            </option>
                          </select>
                          <input
                            class="inline-input"
                            type="number"
                            style="margin-top:2px;width:3.2rem"
                            .value=${String(this.segmentsB[g].angleValue)}
                            @change=${C=>this._updateAngleValue("B",g,Number(C.target.value))}
                          />
                        </td>
                        <td>
                          <select
                            class="inline-input"
                            @change=${C=>this._updateTravelType("B",g,C.target.value)}
                          >
                            <option
                              value="width"
                              ?selected=${this.segmentsB[g].travelType==="width"}
                            >
                              width
                            </option>
                            <option
                              value="height"
                              ?selected=${this.segmentsB[g].travelType==="height"}
                            >
                              height
                            </option>
                          </select>
                          <input
                            class="inline-input"
                            type="number"
                            style="margin-top:2px;width:3.2rem"
                            .value=${String(this._toDisplayLength(this.segmentsB[g].travelType==="width"?this.segmentsB[g].travelValue:this.segmentsB[g].travelValue))}
                            @change=${C=>{const he=Number(C.target.value),de=this._fromDisplayLength(he);this._updateTravelValue("B",g,de)}}
                          />
                        </td>
                        <td>${this._formatLen(j)}</td>
                        <td>${this._formatLen($.endY)}</td>
                        <td class="actions-cell">
                          <sl-button
                            size="x-small"
                            variant="danger"
                            @click=${()=>this._deleteSegment("B",g)}
                            >✕</sl-button
                          >
                        </td>
                      </tr>`})}
                    ${s.length===0?p`<tr>
                          <td colspan="6" style="text-align:center;opacity:.6">
                            No segments
                          </td>
                        </tr>`:""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>`}
      ${this.warning?p`<div class="warn">${this.warning}</div>`:""}
      <div
        class="svg-wrap"
        style="${this.fullScreen?"height:100vh;width:100vw;":""}"
      >
        <div
          style="display:flex;align-items:stretch;gap:.75rem;${this.fullScreen?this.showDebug?"height:calc(100vh - 120px);":"height:100vh;":""}"
        >
          <div style="flex:0 0 60px;display:flex;flex-direction:column;">
            ${this._renderVerticalSlider(a)}
          </div>
          <div
            style="flex:1;position:relative;display:flex;flex-direction:column;"
          >
            ${this._renderSvg(e,s,i,n,a,d,h,Ge,v,E,T,te,F)}
          </div>
        </div>
      </div>
      ${this.showDebug?p`<div style="height:120px;overflow:auto;">
            ${this._renderDebug(v)}
          </div>`:""}
    </div>`}_renderVerticalSlider(e){const t=this._displayDigits(),s=this.units,i=this.overlayCenter*e,n=(this.units==="mm"?i:i/25.4).toFixed(t),r=(this.units==="mm"?e:e/25.4).toFixed(t),l=Math.round((e>0?i/e:0)*1e4);return p`<div
      class="vertical-slider-box"
      style="flex:0 0 60px;display:flex;flex-direction:column;align-items:center;${this.fullScreen?"height:100%;":""}"
    >
      <span style="font-size:.5rem;opacity:.7;">Height (${s})</span>
      <input
        type="range"
        min="0"
        max="10000"
        step="1"
        .value=${String(l)}
        @input=${a=>{const h=Number(a.target.value)/1e4;this.overlayCenter=e>0?h:0,this._customViewBox=null,this.requestUpdate()}}
        style="width:100%;flex:1 1 auto;"
      />
      <div
        style="font-size:.5rem;opacity:.65;text-align:center;line-height:1.2;"
      >
        y: ${n} ${s}<br />max: ${r} ${s}
      </div>
    </div>`}_renderControls(){return p``}_renderDebug(e){const t=this._compute(),s=this.segments;this.segments=this.segmentsB;const i=this._compute();this.segments=s;const n=Math.max(t.length?t[t.length-1].endY:0,i.length?i[i.length-1].endY:0),r=this.overlayCenter*n,l=r<e*4?e:r,a=this._widthAtY(t,l),d=this._widthAtY(i,l),h=this._displayDigits(),c=this.units,u=(this.units==="mm"?r:r/25.4).toFixed(h),v=(this.units==="mm"?a:a/25.4).toFixed(h),y=(this.units==="mm"?d:d/25.4).toFixed(h),b=a**3,S=d**3;let M,x;b===0&&S===0?(M=1,x="equal"):b>=S?(M=b/(S===0?Number.EPSILON:S),x=`A stronger x${M.toFixed(3)}`):(M=S/(b===0?Number.EPSILON:b),x=`B stronger x${M.toFixed(3)}`);const I=Math.abs(b-S)/Math.max(b,S||1)*100;return p`<div
      style="margin-top:.4rem;font-size:.6rem;background:rgba(0,0,0,0.05);padding:.55rem .7rem;border-radius:6px;line-height:1.2;"
    >
      <div style="font-weight:600;margin-bottom:.35rem;">
        Cross Section Metrics
      </div>
      <div>Height from apex: <strong>${u} ${c}</strong></div>
      <div>Thickness A: <strong>${v} ${c}</strong></div>
      <div>Thickness B: <strong>${y} ${c}</strong></div>
      <div style="margin-top:.35rem;font-weight:600;">
        Strength (thickness^3)
      </div>
      <div>A^3: ${b.toFixed(6)}</div>
      <div>B^3: ${S.toFixed(6)}</div>
      <div>Relative: ${x}</div>
      <div>Difference: ${I.toFixed(2)}%</div>
    </div>`}_renderSvg(e,t,s,i,n,r,l,a,d,h,c,u,v){const y=this._path(e),b=this._path(t),S=this.overlayMode?p`
          ${y?W`<path d="${y}" fill="none" stroke="#0a58ca" stroke-width="${a}" vector-effect="non-scaling-stroke"></path>`:""}
          ${b?W`<path d="${b}" fill="none" stroke="#c92a2a" stroke-width="${a}" vector-effect="non-scaling-stroke"></path>`:""}
          ${(()=>{const x=a*.6,I=`${(a*.7).toFixed(0)} ${(a*.5).toFixed(0)}`,P=Array.from(new Set([...e.map(_=>_.endY),...t.map(_=>_.endY)])).sort((_,E)=>_-E);return W`${P.map(_=>{if(_<=0||_>=n-1e-9)return"";const E=this._widthAtY(e,_),T=this._widthAtY(t,_),F=Math.max(E,T)/2;return W`<line x1="${-F}" y1="${_}" x2="${F}" y2="${_}" stroke="#444" stroke-width="${x}" vector-effect="non-scaling-stroke" stroke-dasharray="${I}" opacity="0.5" />`})}`})()}
        `:p`${(()=>{const I=-(r/2+.3),P=l/2+.6/2,_=["#ffdd57","#74c0fc","#ffc9c9","#b197fc","#a9e34b","#ffa94d","#ffd8a8","#e599f7","#63e6be","#ff6b6b"];return W`
            <g transform="translate(${I},0)">
              ${s.map((E,T)=>W`<path d="${E}" fill="${_[T%_.length]}" stroke="#000" stroke-width="${a}" vector-effect="non-scaling-stroke" opacity="0.95"></path>`)}
              ${y?W`<path d="${y}" fill="none" stroke="#0a58ca" stroke-width="${a}" vector-effect="non-scaling-stroke"></path>`:""}
            </g>
            <g transform="translate(${P},0)">
              ${i.map((E,T)=>W`<path d="${E}" fill="${_[T%_.length]}" stroke="#000" stroke-width="${a}" vector-effect="non-scaling-stroke" opacity="0.95"></path>`)}
              ${b?W`<path d="${b}" fill="none" stroke="#c92a2a" stroke-width="${a}" vector-effect="non-scaling-stroke"></path>`:""}
            </g>`})()}`,M=(()=>{const x=this.overlayCenter*n,I=x<d*4?d:x;let P=this._widthAtY(e,I),_=this._widthAtY(t,I),E=Math.max(P,_);E<1e-9&&(E=.02);const T=E*1.05/2,te=(a*.6).toFixed(0),F=(a*.4).toFixed(0);return W`<g class="center-line-group" pointer-events="none">
        <line x1="${-T}" y1="${x}" x2="${T}" y2="${x}" stroke="#000" stroke-width="${a}" vector-effect="non-scaling-stroke" stroke-dasharray="${te} ${F}" />
      </g>`})();return p`${y||b?W`<svg viewBox="${this._customViewBox?this._customViewBox.x:h} ${this._customViewBox?this._customViewBox.y:c} ${this._customViewBox?this._customViewBox.w:u} ${this._customViewBox?this._customViewBox.h:v}" preserveAspectRatio="xMidYMin meet">
      <g class="geom" transform="translate(0, ${n}) scale(1,-1)">
        ${S}
        ${M}
      </g>
    </svg>`:p`<div class="empty">Add segments to visualize cross section.</div>`}
    ${y||b?p`<div class="drag-overlay"></div>`:""}`}};we.styles=ye`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      --vsa-border: #4a2d00;
      --vsa-row-alt: #f3efe7;
      --vsa-card-bg: #fffefa;
    }
    h2 {
      margin: 0 0 0.6rem;
      font-size: 0.9rem;
      font-weight: 600;
    }
    .page {
      padding: 0.6rem 0.75rem 1.2rem;
      box-sizing: border-box;
    }
    .controls-bar {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .panels {
      display: flex;
      gap: 0.75rem;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .editor-panel {
      flex: 1 1 320px;
      background: var(--vsa-card-bg);
      border: 1px solid var(--vsa-border);
      border-radius: 6px;
      padding: 0.5rem 0.6rem 0.7rem;
      min-width: 260px;
    }
    .panel-header {
      font-size: 0.65rem;
      font-weight: 600;
      margin-bottom: 0.4rem;
      letter-spacing: 0.5px;
    }
    .row-inline {
      display: flex;
      align-items: flex-end;
      gap: 0.6rem;
      flex-wrap: wrap;
    }
    .inline-input {
      font-size: 0.55rem;
      padding: 0.22rem 0.3rem;
      border-radius: 4px;
      border: 1px solid var(--vsa-border);
      background: #fff;
      box-sizing: border-box;
    }
    table.segments-edit {
      width: 100%;
      border-collapse: collapse;
    }
    table.segments-edit th,
    table.segments-edit td {
      border: 1px solid var(--vsa-border);
      padding: 0.25rem 0.35rem;
      font-size: 0.55rem;
      text-align: right;
    }
    table.segments-edit th {
      background: var(--vsa-row-alt);
      position: sticky;
      top: 0;
      z-index: 1;
    }
    .seg-table-wrap {
      max-height: 150px;
      overflow: auto;
      border: 1px solid var(--vsa-border);
      border-radius: 6px;
      background: #fff;
    }
    .actions-cell {
      text-align: center;
    }
    .warn {
      color: #c92a2a;
      font-size: 0.6rem;
      margin: 0.4rem 0;
    }
    .svg-wrap {
      border: 2px solid #4a2d00;
      background: var(--vsa-card-bg);
      padding: 0.55rem 0.6rem 0.7rem;
      border-radius: 8px;
      position: relative;
      margin-top: 0.7rem;
    }
    .full-screen .svg-wrap {
      margin-top: 0;
      border-radius: 0;
      border-left: none;
      border-right: none;
      border-bottom: none;
      width: 100vw;
      height: 100vh;
      max-height: 100vh;
      padding: 0.4rem 0.6rem 0.6rem 0.6rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0.4rem;
    }
    .full-screen.page,
    .full-screen.page * {
      overscroll-behavior: contain;
    }
    .full-screen.page {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      max-height: 100vh;
      overflow: hidden;
      z-index: 9999;
    }
    svg {
      width: 100%;
      height: 60vh;
      min-height: 340px;
      display: block;
    }
    .full-screen svg {
      height: 100%;
      min-height: 0;
    }
    .drag-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      cursor: crosshair;
      z-index: 4;
      background: transparent;
      touch-action: none;
      pointer-events: none; /* disable interactions for now */
    }
    .empty {
      font-size: 0.65rem;
      opacity: 0.7;
      padding: 2rem 0;
      text-align: center;
    }
    .vertical-slider-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
      border: 2px solid #4a2d00;
      padding: 0.4rem 0.35rem 0.45rem;
      border-radius: 6px;
      background: var(--vsa-card-bg);
      height: 60vh;
      box-sizing: border-box;
    }
    .full-screen .vertical-slider-box {
      height: 100%; /* match svg-column height by flex */
    }
    .vertical-slider-box input[type="range"] {
      writing-mode: bt-lr;
      -webkit-appearance: slider-vertical;
      flex: 1 1 auto;
      height: 100%;
      min-height: 0; /* allow flex shrink */
    }
    button {
      cursor: pointer;
    }
    .fs-seglist {
      margin-top: 0.4rem;
      max-height: 24vh;
      overflow: auto;
      border: 1px solid #4a2d00;
      border-radius: 6px;
      background: var(--vsa-card-bg);
    }
    .fs-seglist table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.55rem;
    }
    .fs-seglist th,
    .fs-seglist td {
      padding: 0.25rem 0.4rem;
      border: 1px solid var(--vsa-border);
      text-align: left;
    }
    .fs-seglist thead {
      position: sticky;
      top: 0;
      background: #4a2d00;
      color: #fff;
    }
    .metrics {
      margin-top: 0.35rem;
      font-size: 0.58rem;
      background: rgba(0, 0, 0, 0.05);
      padding: 0.5rem 0.6rem;
      border-radius: 6px;
      line-height: 1.2;
    }
    .full-screen .main-flex-row {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: 0.6rem;
      flex: 1 1 auto;
      min-height: 0;
    }
    .full-screen .slider-column {
      flex: 0 0 60px;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .full-screen .slider-column .vertical-slider-box {
      flex: 1 1 auto;
      height: auto;
    }
    .full-screen .svg-column {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      min-height: 0;
      position: relative;
    }
    .full-screen .svg-column svg {
      flex: 1 1 auto;
      height: auto;
      min-height: 0;
    }
    .metrics h4 {
      margin: 0.1rem 0 0.4rem;
      font-size: 0.6rem;
      font-weight: 600;
    }
    .toggles {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-top: 0.6rem;
    }
    .toggles button {
      font-size: 0.55rem;
      padding: 0.25rem 0.45rem;
      border: 1px solid var(--vsa-border);
      background: #fff;
      border-radius: 4px;
    }
  `;let f=we;w([m({type:Number})],f.prototype,"angleInput");w([m({type:Number})],f.prototype,"thicknessInput");w([m({type:Number})],f.prototype,"angleInputB");w([m({type:Number})],f.prototype,"thicknessInputB");w([m({type:String})],f.prototype,"angleInputType");w([m({type:String})],f.prototype,"angleInputTypeB");w([m({type:String})],f.prototype,"travelInputType");w([m({type:String})],f.prototype,"travelInputTypeB");w([m({type:Number})],f.prototype,"zoom");w([m({type:Number})],f.prototype,"pan");w([m({type:Array,attribute:!1})],f.prototype,"segments");w([m({type:Array,attribute:!1})],f.prototype,"segmentsB");w([le()],f.prototype,"warning");w([m({type:String})],f.prototype,"units");w([m({type:Boolean})],f.prototype,"regionZoomActive");w([m({type:Boolean})],f.prototype,"overlayMode");w([m({type:Number})],f.prototype,"overlayCenter");w([m({type:Number})],f.prototype,"overlayTargetWidth");w([le()],f.prototype,"_fullScreen");w([m({type:Number})],f.prototype,"strokePxMin");w([m({type:Boolean})],f.prototype,"showDebug");w([le()],f.prototype,"thinStrokes");w([le()],f.prototype,"adaptiveZoomMode");customElements.define("vsa-geometry-builder",f);var Bt=Object.defineProperty,B=(o,e,t,s)=>{for(var i=void 0,n=o.length-1,r;n>=0;n--)(r=o[n])&&(i=r(e,t,i)||i);return i&&Bt(e,t,i),i};const $e=class $e extends H{constructor(){super(),this.page="home",this.width=3,this.height=2,this.desiredAngle=20,this.sharpenerAngle=15,this.rotationAngle=12,this.rotationSharpener=15,this.passes=19,this.hardness=60,this.edgeAngle=30,this.carbides={CrC:0,CrCV:0,MC:5.5,M6C:5,MN:0,CrN:0,Fe3C:0},this.dark=!1,this.online=navigator.onLine,this.updateReady=!1,this.geometryFullScreen=!1,this.addEventListener("steel-selected",e=>this._onSteelSelected(e)),document.documentElement.classList.remove("dark"),window.addEventListener("hashchange",()=>this._applyRoute()),this._applyRoute();try{localStorage.getItem("vsa-theme")==="dark"&&(document.documentElement.classList.add("dark"),this.dark=!0)}catch{}window.addEventListener("online",()=>{this.online=!0,this.requestUpdate()}),window.addEventListener("offline",()=>{this.online=!1,this.requestUpdate()}),"serviceWorker"in navigator&&(navigator.serviceWorker.getRegistration().then(e=>{e&&e.addEventListener("updatefound",()=>{const t=e.installing;t&&t.addEventListener("statechange",()=>{t.state==="installed"&&navigator.serviceWorker.controller&&(this.updateReady=!0,this.requestUpdate())})})}),navigator.serviceWorker.addEventListener("controllerchange",()=>{window.__vsaReloaded||(window.__vsaReloaded=!0,requestAnimationFrame(()=>window.location.reload()))})),this.addEventListener("geometry-fullscreen-changed",e=>{const t=e.detail;this.geometryFullScreen=!!(t!=null&&t.fullScreen),this.requestUpdate()})}_applyRoute(){const e=window.location.hash.replace(/^#\//,"");this.page=e||"home"}_go(e){window.location.hash=`/${e}`,this.page=e}_num(e,t){const s=e.target,i=Number(s.value);this[t]=i}_carbide(e,t){const s=e.target,i=Number(s.value);this.carbides={...this.carbides,[t]:i}}render(){return p`${this.geometryFullScreen?p``:p`<header
            class="app-header ${this.geometryFullScreen?"hidden":""}"
          >
            <h1>VSharpAngle</h1>
            <sl-switch
              ?checked=${this.dark}
              @sl-change=${()=>this._toggleTheme()}
              aria-label="Toggle dark mode"
              >Dark Mode</sl-switch
            >
            ${this.online?p`<sl-badge variant="success" pill>Online</sl-badge>`:p`<sl-badge variant="danger" pill>Offline</sl-badge>`}
            ${this.updateReady?p`<sl-button
                  size="small"
                  variant="primary"
                  @click=${()=>this._updateSw()}
                  aria-label="Update available"
                >
                  Update Available
                </sl-button>`:""}
          </header>`}
      <main>
        ${this.page==="home"?this._renderHome():this._renderPage()}
      </main>
      <footer>
        © ${new Date().getFullYear()} VSharpAngle • (C) J.D Stone,
        ShaperAndMower, All Rights Reserved. Converted to PWA and Geometry
        Builder by Kyley Harris.
      </footer>`}_toggleTheme(){const t=document.documentElement.classList.toggle("dark");try{localStorage.setItem("vsa-theme",t?"dark":"light")}catch{}this.dark=t}_renderHome(){return p` <div class="intro-banner">
        <h2>VSharpAngle</h2>
        <p>
          A focused, installable sharpening companion for V‑stick / Crock Stick
          systems. Convert desired edge angles into rod adjustments, measure
          existing bevel geometry, plan progressive stroke counts, and
          approximate edge retention from steel data—all offline once loaded.
          Geometry Builder included for visualizing compound angles.
        </p>
        <sl-button
          size="small"
          variant="primary"
          @click=${()=>this._go("intro")}
        >
          Read Full Introduction
        </sl-button>
      </div>
      <div class="grid-menu">
        ${[{page:"angle",icon:"rulers",title:"Angle Measure",desc:"Calculate inclusive edge angle from bevel width & height."},{page:"elevation",icon:"arrow-up",title:"Sharpmaker Elevation",desc:"Find required base elevation for desired angle setting."},{page:"rotation",icon:"repeat",title:"Sharpmaker Rotation",desc:"Compute safe rotation angle between rod settings."},{page:"passes",icon:"list",title:"Pass Counter",desc:"Generate stroke sequence totals for progression."},{page:"retention",icon:"graph-up",title:"Edge Retention",desc:"Estimate TCC & volume from carbide & hardness data."},{page:"steels",icon:"database",title:"Steel Database",desc:"Browse carbide composition & derived metrics."},{page:"geometry",icon:"triangle",title:"Geometry Builder",desc:"Stack inclusive angle wedges into a cross-section."}].map(t=>p`<a
            class="card-link"
            @click=${()=>this._go(t.page)}
            role="button"
            tabindex="0"
            aria-label="Open ${t.title} page"
          >
            <div class="card-icon"><sl-icon name=${t.icon}></sl-icon></div>
            <div class="card-title">${t.title}</div>
            <div class="card-desc">${t.desc}</div>
          </a>`)}
      </div>`}_renderPage(){switch(this.page){case"angle":return this._pageAngle();case"elevation":return this._pageElevation();case"rotation":return this._pageRotation();case"passes":return this._pagePasses();case"retention":return this._pageRetention();case"steels":return this._pageSteels();case"geometry":return this._pageGeometry();case"intro":return this._pageIntro();default:return p`<div class="page">Unknown page.</div>`}}_pageGeometry(){return p`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <vsa-geometry-builder></vsa-geometry-builder>
    </div>`}_pageIntro(){return p`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>Introduction & Guide</h2>
        <p>
          <strong>VSharpAngle</strong> is a modern Progressive Web App for
          rod-based ("V-stick") knife sharpeners such as Crock Stick and
          Spyderco style systems. It replaces earlier terminal and single‑file
          scripts with a responsive, installable interface, precise math
          helpers, and offline capability.
        </p>
        <h3 style="margin:.75rem 0 .4rem;font-size:.75rem">
          Core Capabilities
        </h3>
        <ul
          style="margin:0;padding-left:1rem;font-size:.65rem;line-height:1.35"
        >
          <li>
            <strong>Rod Angle by Rotation:</strong> Determine the base rotation
            needed to reach a target degrees‑per‑side (DPS).
          </li>
          <li>
            <strong>Rod Angle by Elevation:</strong> Compute how much to lift
            one side of the base to reach the desired DPS.
          </li>
          <li>
            <strong>Rotation Angle Reference:</strong> Generate a quick offset
            chart between common 15° / 20° / 25° settings.
          </li>
          <li>
            <strong>Edge Bevel Measurement:</strong> Convert bevel width &
            height behind the edge into inclusive angle.
          </li>
          <li>
            <strong>Progressive Pass Counter:</strong> Plan descending stroke
            sets (e.g. 30 → 20 → 10) and see totals / X‑strokes.
          </li>
          <li>
            <strong>Edge Retention Estimator:</strong> Approximate CATRA TCC,
            material removal volume, and stability from hardness, edge angle,
            and carbide mix.
          </li>
        </ul>
        <h3 style="margin:.9rem 0 .4rem;font-size:.75rem">Using Each Tool</h3>
        <ul
          style="margin:0;padding-left:1rem;font-size:.65rem;line-height:1.35"
        >
          <li>
            <strong>Rotation:</strong> Enter your target DPS and current rod
            setting (15°/20°/25°). Result = rotation offset.
          </li>
          <li>
            <strong>Elevation:</strong> Provide target DPS and rod setting; app
            returns required lift height. "Near" vs "Far" distinctions are
            abstracted—you just need the angles.
          </li>
          <li>
            <strong>Rotation Chart:</strong> Open the Rotation page and vary
            target DPS to visualize offsets.
          </li>
          <li>
            <strong>Angle Measure:</strong> Measure thickness behind the edge
            (width) and bevel height; app calculates per‑side angle.
          </li>
          <li>
            <strong>Pass Counter:</strong> Enter starting passes (e.g. 30). It
            auto builds descending sets and totals. Use odd numbers for balanced
            X‑strokes.
          </li>
          <li>
            <strong>Edge Retention:</strong> Input hardness (HRC), edge angle
            (DPS), and carbide fractions. Load preset steel data via the table
            for faster comparison.
          </li>
        </ul>
        <h3 style="margin:.9rem 0 .4rem;font-size:.75rem">
          Tips & Expectations
        </h3>
        <ul
          style="margin:0;padding-left:1rem;font-size:.65rem;line-height:1.35"
        >
          <li>
            Keep measurements consistent (mm or inches) within a calculation.
          </li>
          <li>
            Reasonable hardness range: 50–70 HRC; edge angles typically 10–35°
            DPS.
          </li>
          <li>
            Use progressive pass reductions to refine scratch pattern & apex
            without overshooting.
          </li>
          <li>
            Edge retention outputs are comparative indicators, not lab‑grade
            guarantees.
          </li>
          <li>
            Install the PWA (browser menu) for offline workshop use; data caches
            after first load.
          </li>
        </ul>
        <h3 style="margin:.9rem 0 .4rem;font-size:.75rem">Acknowledgments</h3>
        <p style="margin:0;font-size:.65rem;line-height:1.4">
          Thanks to <strong>Larrin Thomas</strong> for the CATRA TCC formula
          guidance and community contributors refining steel data
          representations.
        </p>
      </section>
    </div>`}_pageAngle(){const e=_t(this.width,this.height);let t=null;return e==null&&(this.width==null||this.height==null?t="Width and height are required.":this.height===0?t="Height must be greater than 0.":t="width/2 must be ≤ height (arcsin domain).",queueMicrotask(()=>{var i;const s=(i=this.renderRoot)==null?void 0:i.querySelector(this.width==null?'sl-input[label="Width"]':'sl-input[label="Height"]');s==null||s.focus()})),p`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>
          Angle Measurement
          <sl-tooltip
            content="Convert bevel width & height behind the edge into degrees-per-side."
          >
            <sl-icon
              name="info-circle"
              style="font-size:.9rem; margin-left:.4rem"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <div class="output-row">
          <sl-input
            label="Width"
            type="number"
            .value=${String(this.width)}
            @input=${s=>this._num(s,"width")}
          ></sl-input>
          <sl-input
            label="Height"
            type="number"
            .value=${String(this.height)}
            @input=${s=>this._num(s,"height")}
          ></sl-input>
        </div>
        <div aria-live="polite">
          ${e!=null?p`<div class="result-block" role="status">
                <span>Inclusive Edge Angle (DPS)</span
                ><span class="result-value">${e}°</span>
              </div>`:p`<div class="invalid-msg" role="alert">
                <strong>Angle could not be calculated.</strong
                ><br />${t}<br /><em>Expectation:</em> Positive width &
                height with width/2 ≤ height.
              </div>`}
        </div>
      </section>
      <div class="help" aria-label="Angle Measurement Explanation">
        <h2>How This Angle Is Calculated</h2>
        <p>
          The per‑side edge angle is derived from simple trigonometry: we treat
          the bevel height as the adjacent side of a right triangle and half the
          measured width behind the edge as the opposite side. The ratio
          <code>(width / 2) / height</code> gives <em>sin(θ)</em>. If that ratio
          exceeds 1 the physical measurement is inconsistent (angle cannot
          exist) and you’ll see an invalid message.
        </p>
        <p>
          Use consistent units (mm or inches). Minor measurement error can shift
          a calculated DPS by a degree or two—adequate for sharpening decisions.
        </p>
        <p>
          <strong>Tip:</strong> A smaller height for the same width means a
          blunter (larger) angle.
        </p>
      </div>
    </div>`}_pageElevation(){const e=wt(this.desiredAngle,this.sharpenerAngle);let t=null;return e==null&&(this.desiredAngle==null||this.sharpenerAngle==null?t="Both desired and setting angles required.":t="Unexpected null result; ensure numeric inputs.",queueMicrotask(()=>{var i;const s=(i=this.renderRoot)==null?void 0:i.querySelector(this.desiredAngle==null?'sl-input[label="Desired"]':'sl-select[label="Setting"]');s==null||s.focus()})),p`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>
          Sharpmaker Elevation
          <sl-tooltip
            content="Calculate required base lift to reach a target rod angle."
          >
            <sl-icon
              name="info-circle"
              style="font-size:.9rem; margin-left:.4rem"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <div class="output-row">
          <sl-input
            label="Desired"
            type="number"
            .value=${String(this.desiredAngle)}
            @input=${s=>this._num(s,"desiredAngle")}
          ></sl-input>
          <sl-select
            label="Setting"
            .value=${String(this.sharpenerAngle)}
            @sl-change=${s=>{this.sharpenerAngle=Number(s.target.value)}}
          >
            <sl-option value="15">15°</sl-option
            ><sl-option value="20">20°</sl-option
            ><sl-option value="25">25°</sl-option>
          </sl-select>
        </div>
        <div aria-live="polite">
          ${e!=null?p`<div class="result-block" role="status">
                <span>Required Elevation</span
                ><span class="result-value">${e}"</span>
              </div>`:p`<div class="invalid-msg" role="alert">
                <strong>Elevation could not be estimated.</strong
                ><br />${t}<br /><em>Expectation:</em> Desired angle
                usually within ~10° of setting.
              </div>`}
        </div>
      </section>
      <div class="help" aria-label="Elevation Calculator Explanation">
        <h2>Understanding Elevation Adjustment</h2>
        <p>
          Raising one side of a V‑stick base changes the effective rod angle.
          The approximation here uses the difference between desired
          degrees‑per‑side and the rod’s built‑in setting, scaled by a constant
          that represents typical rod spacing.
        </p>
        <p>
          Small elevation changes (fractions of an inch) can translate into
          several degrees at the edge. Keep lifts modest; extreme elevation may
          compromise stability.
        </p>
        <p>
          <strong>Tip:</strong> If the required elevation rounds to 0, you are
          already at or very near the desired angle.
        </p>
      </div>
    </div>`}_pageRotation(){const e=$t(this.rotationAngle,this.rotationSharpener);let t=null;return e==null&&(this.rotationAngle==null||this.rotationSharpener==null?t="Provide both target and setting angles.":t="csc(setting) * sin(angle) must be between -1 and 1.",queueMicrotask(()=>{var i;const s=(i=this.renderRoot)==null?void 0:i.querySelector(this.rotationAngle==null?'sl-input[label="Angle"]':'sl-select[label="Setting"]');s==null||s.focus()})),p`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>
          Sharpmaker Rotation
          <sl-tooltip
            content="Determine safe rotation offset between common rod angle settings."
          >
            <sl-icon
              name="info-circle"
              style="font-size:.9rem; margin-left:.4rem"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <div class="output-row">
          <sl-input
            label="Angle"
            type="number"
            .value=${String(this.rotationAngle)}
            @input=${s=>this._num(s,"rotationAngle")}
          ></sl-input>
          <sl-select
            label="Setting"
            .value=${String(this.rotationSharpener)}
            @sl-change=${s=>{this.rotationSharpener=Number(s.target.value)}}
          >
            <sl-option value="15">15°</sl-option
            ><sl-option value="20">20°</sl-option
            ><sl-option value="25">25°</sl-option>
          </sl-select>
        </div>
        <div aria-live="polite">
          ${e!=null?p`<div class="result-block" role="status">
                <span>Rotation Offset</span
                ><span class="result-value">${e}°</span>
              </div>`:p`<div class="invalid-msg" role="alert">
                <strong>Rotation offset cannot be computed.</strong
                ><br />${t}<br /><em>Expectation:</em> Choose angle
                compatible with selected setting.
              </div>`}
        </div>
      </section>
      <div class="help" aria-label="Rotation Calculator Explanation">
        <h2>How Rotation Offsets Work</h2>
        <p>
          Rotating the base changes the relative orientation between the knife
          and the rods, allowing intermediate angles without swapping to
          different preset holes. The math multiplies
          <code>sin(target)</code> by <code>csc(setting)</code> and uses
          <code>acos</code> to find the rotation offset. The product must stay
          between -1 and 1 (a domain requirement).
        </p>
        <p>
          If you hit a domain error, pick a target closer to the rod’s native
          setting. Very large deviations may be mechanically awkward or
          inconsistent.
        </p>
        <p>
          <strong>Tip:</strong> Rotate gradually and keep the spine vertical to
          avoid inadvertent angle drift.
        </p>
      </div>
    </div>`}_pagePasses(){const e=kt(this.passes),t=e.total>0;let s=null;return t||(this.passes==null?s="Number of passes is required.":this.passes<1?s="Pass count must be ≥ 1.":s="Invalid pass input.",queueMicrotask(()=>{var n;const i=(n=this.renderRoot)==null?void 0:n.querySelector('sl-input[label="Passes"]');i==null||i.focus()})),p`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>
          Pass Counter
          <sl-tooltip
            content="Plan descending stroke sets and view total plus X-strokes."
          >
            <sl-icon
              name="info-circle"
              style="font-size:.9rem; margin-left:.4rem"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <div class="output-row">
          <sl-input
            label="Passes"
            type="number"
            .value=${String(this.passes)}
            @input=${i=>this._num(i,"passes")}
          ></sl-input>
        </div>
        <div aria-live="polite">
          ${t?p`<div class="result-block" role="status">
                <span>Total / X-Strokes</span
                ><span class="result-value"
                  >${e.total} / ${e.xStrokes}</span
                >
              </div>`:p`<div class="invalid-msg" role="alert">
                <strong>Sequence cannot be generated.</strong
                ><br />${s}<br /><em>Expectation:</em> Enter positive
                integer (e.g., 9, 19, 29).
              </div>`}
        </div>
        <sl-details summary="Sequence"
          >${e.sequence.map(i=>p`<span class="badge-seq">${i}, </span>`)}</sl-details
        >
      </section>
      <div class="help" aria-label="Pass Counter Explanation">
        <h2>Why Track Progressive Passes?</h2>
        <p>
          Progressive pass reduction refines scratch pattern and apex quality
          while limiting over‑grinding. Starting passes define the top sequence;
          each descending step (minus 10) accelerates deburring and polish.
          Final small counts (5, 3, 2, 1) provide controlled finish.
        </p>
        <p>
          The total and X‑stroke count help estimate time investment and
          symmetry. Choose an odd starting number to maintain balanced
          alternation.
        </p>
        <p>
          <strong>Tip:</strong> If steel is hard or wear‑resistant, consider a
          slightly larger starting pass set.
        </p>
      </div>
    </div>`}_pageRetention(){const e=Oe({hardness:this.hardness,edgeAngle:this.edgeAngle,CrC:this.carbides.CrC,CrV:this.carbides.CrCV,MC:this.carbides.MC,M6C:this.carbides.M6C,MN:this.carbides.MN,CrN:this.carbides.CrN,Fe3C:this.carbides.Fe3C}),t=this.hardness!=null&&this.hardness>0,s=this.edgeAngle!=null&&this.edgeAngle>0,i=[];return t||i.push("Hardness must be positive (e.g., 60)."),s||i.push("Edge angle must be positive degrees per side."),i.length&&queueMicrotask(()=>{var l;const n=t?'sl-input[label="Edge Angle"]':'sl-input[label="Hardness"]',r=(l=this.renderRoot)==null?void 0:l.querySelector(n);r==null||r.focus()}),p`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>
          Edge Retention Estimator
          <sl-tooltip
            content="Approximate CATRA TCC, volume, and stability from hardness, edge angle, and carbides."
          >
            <sl-icon
              name="info-circle"
              style="font-size:.9rem; margin-left:.4rem"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <div class="retention-group">
          <div class="input-box">
            <sl-input
              label="Hardness"
              help-text="Rockwell C hardness (HRC). Higher HRC boosts wear resistance but may reduce toughness. Typical 50–70."
              type="number"
              .value=${String(this.hardness)}
              @input=${n=>this._num(n,"hardness")}
            ></sl-input>
          </div>
          <div class="input-box">
            <sl-input
              label="Edge Angle"
              help-text="Degrees per side (DPS). Lower angles slice more efficiently; higher angles increase edge durability."
              type="number"
              .value=${String(this.edgeAngle)}
              @input=${n=>this._num(n,"edgeAngle")}
            ></sl-input>
          </div>
        </div>
        <div class="retention-group">
          ${[{k:"CrC",t:"Chromium carbides (CrC) – moderate wear contribution."},{k:"CrCV",t:"Chromium/Vanadium mixed carbides – added abrasion resistance."},{k:"MC",t:"MC (V/Nb) carbides – very high hardness, strong wear resistance."},{k:"M6C",t:"Complex M6C carbides – balanced secondary contribution."},{k:"MN",t:"Manganese phases – minor influence overall."},{k:"CrN",t:"Chromium nitride – stability & wear support."},{k:"Fe3C",t:"Iron carbide (cementite) – baseline matrix wear component."}].map(({k:n,t:r})=>p`<div class="input-box">
              <sl-input
                label=${n}
                help-text=${r}
                type="number"
                .value=${String(this.carbides[n]||0)}
                @input=${l=>this._carbide(l,n)}
              ></sl-input>
            </div>`)}
        </div>
        <div aria-live="polite">
          ${i.length===0?p`<div class="result-block" role="status">
                <span>TCC / Volume / Stability</span
                ><span class="result-value"
                  >${e.TCC} / ${e.volume.toFixed(1)} /
                  ${e.stability}</span
                >
              </div>`:p`<div class="invalid-msg" role="alert">
                <strong>Cannot compute retention metrics.</strong
                ><br />${i.map(n=>p`<div>${n}</div>`)}<br /><em
                  >Expectation:</em
                >
                Hardness 50–70 HRC; edge angle 10°–35° DPS.
              </div>`}
        </div>
        <div class="output-row">
          <sl-progress-bar
            .value=${Math.min(e.volume,30)}
            max="30"
          ></sl-progress-bar>
        </div>
        <sl-button
          size="small"
          class="load-btn"
          variant="neutral"
          style="display:none"
          aria-hidden="true"
          >Steel Table (replaced by collapsible)</sl-button
        >
      </section>
      <sl-details summary="Steel Database">
        <div style="margin-top:.75rem">
          <vsa-steel-table></vsa-steel-table>
        </div>
      </sl-details>
      <div class="help" aria-label="Edge Retention Estimator Explanation">
        <h2>About The Retention Estimate</h2>
        <p>
          The CATRA‑inspired TCC approximation combines hardness, edge angle,
          and carbide fractions (simplified). Higher hardness generally
          increases TCC; larger edge angle reduces it. Carbides contribute
          differently—MC types often yield greater wear resistance than simple
          chromium carbides.
        </p>
        <p>
          <strong>Volume</strong> is a simple sum of carbide fractions, giving a
          rough sense of alloy complexity. Stability bands indicate suitable
          edge angle ranges for balancing retention vs. toughness.
        </p>
        <p>
          Treat these numbers as comparative guidance, not lab‑grade
          measurements. Real cutting performance depends on heat treatment,
          microstructure, and edge finish.
        </p>
        <p>
          <strong>Tip:</strong> Lower edge angles may outperform higher ones in
          slicing tasks until stability becomes a limiting factor.
        </p>
      </div>
    </div>`}_pageSteels(){return customElements.get("vsa-steel-table")||Je(()=>Promise.resolve().then(()=>At),void 0),p`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>
          Steel Database
          <sl-tooltip
            content="Browse compositions and click a row to load carbide data into the estimator."
          >
            <sl-icon
              name="info-circle"
              style="font-size:.9rem; margin-left:.4rem"
            ></sl-icon>
          </sl-tooltip>
        </h2>
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
    </div>`}_homeLink(){return this.geometryFullScreen?p``:p`<sl-button
          size="medium"
          variant="default"
          @click=${()=>this._go("home")}
          style="gap:.4rem"
        >
          <sl-icon name="house" style="font-size:1.1rem"></sl-icon>
          Home
        </sl-button>`}_toggleSteelTable(){}_updateSw(){navigator.serviceWorker.getRegistration().then(e=>{e&&e.waiting?e.waiting.postMessage("vsa-skip-waiting"):e&&e.update()})}_onSteelSelected(e){const{hardness:t,edgeAngle:s,carbides:i}=e.detail;this.hardness=t,this.edgeAngle=s,this.carbides={...i}}};$e.styles=ye`
    :host {
      display: block;
      box-sizing: border-box;
    }
    :root,
    :host {
      /* Map former custom design tokens to Shoelace system tokens */

      --vsa-border: var(--sl-color-neutral-200);
      --vsa-row-alt: var(--sl-color-neutral-50);
      --vsa-row-hover: var(--sl-color-neutral-100);
      --vsa-row-focus: var(--sl-color-neutral-150);

      --vsa-card-border: var(--sl-color-neutral-200);
      --vsa-card-border-strong: var(--sl-color-neutral-300);
      --vsa-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.08),
        0 2px 4px rgba(0, 0, 0, 0.06);
      --vsa-shadow-md: 0 2px 4px rgba(0, 0, 0, 0.08),
        0 6px 12px rgba(0, 0, 0, 0.08);
      --sl-input-background-color: #faebd7; /* antiquewhite */
    }
    :host-context(.dark) :root,
    :host-context(.dark) :host {
      --vsa-surface: var(--sl-color-neutral-800);
      --vsa-border: var(--sl-color-neutral-700);
      --vsa-row-alt: var(--sl-color-neutral-750, rgba(255, 255, 255, 0.03));
      --vsa-row-hover: hsl(240deg 57.79% 46.1%);
      --vsa-row-focus: var(--sl-color-neutral-650, #323a42);
      /* Darken card background for better contrast (was neutral-800, appeared too light) */
      /* Near-black card background for dark mode */
      --vsa-card-bg: var(--sl-color-neutral-900, #0f1113);
      --vsa-card-border: var(--sl-color-neutral-700);
      --vsa-card-border-strong: var(--sl-color-neutral-600);
      --vsa-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4),
        0 2px 6px rgba(0, 0, 0, 0.35);
      --vsa-shadow-md: 0 2px 6px rgba(0, 0, 0, 0.45),
        0 8px 18px rgba(0, 0, 0, 0.4);
      --sl-input-background-color: #faebd7; /* keep antiquewhite */
    }
    header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      background: var(--vsa-surface);
      background-color: var(--vsa-surface);
      position: sticky;
      top: 0;
      z-index: 10;
      border-bottom: 1px solid var(--vsa-border);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.04);
    }
    :host-context(.dark) header {
      background: var(--vsa-card-bg);
      background-color: var(--vsa-card-bg);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    }
    header h1 {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
      letter-spacing: 0.5px;
    }
    .intro-banner {
      margin: 0 0 1.15rem 0;
      padding: 1rem 1.15rem;
      background: linear-gradient(
        135deg,
        var(--sl-color-primary-600, #4d7cff),
        var(--sl-color-primary-400, #6d92ff)
      );
      color: #fff;
      border-radius: 16px;
      box-shadow: var(--vsa-shadow-md);
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    :host-context(.dark) .intro-banner {
      background: linear-gradient(135deg, #3d63d9, #567ee3);
    }
    .intro-banner h2 {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .intro-banner p {
      margin: 0;
      font-size: 1rem;
      line-height: 1.4;
      opacity: 0.95;
    }
    .intro-banner sl-button::part(base) {
      font-weight: 600;
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
      border: 2px solid var(--vsa-card-border-strong);
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
      background: #6d92ff;
      border-color: var(--sl-color-primary-500);
    }
    .card-link:focus-visible {
      outline: 3px solid var(--sl-color-primary-500);
      outline-offset: 2px;
    }
    html.dark .card-link {
      border-color: var(--vsa-card-border-strong);
    }
    html.dark .card-link:hover {
      border-color: #1b73c5;
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
      font-weight: 600;
    }
    .page .help {
      background: var(--vsa-card-bg);
      border: 1px solid var(--vsa-card-border);
      border-radius: 14px;
      padding: 1rem 1.15rem 1.1rem;
      font-size: 1rem;
      line-height: 1.55;
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
    sl-details::part(base) {
      background: var(--vsa-card-bg);
      border: 1px solid var(--vsa-card-border);
      border-radius: 10px;
      padding: 0.6rem 0.75rem;
    }
    sl-details::part(summary) {
      font-weight: 600;
      letter-spacing: 0.4px;
    }
    :host-context(.dark) sl-details::part(base) {
      background: var(--vsa-card-bg);
      border-color: var(--vsa-border);
      box-shadow: 0 0 0 1px var(--vsa-border) inset,
        0 2px 6px rgba(0, 0, 0, 0.6);
    }
    :host-context(.dark) sl-details::part(summary) {
      color: var(--sl-color-neutral-0);
    }
    .result-block {
      max-width: 100%;
      margin-top: 0.5rem;
      padding: 0.75rem 0.9rem;
      border-radius: 10px;
      background: linear-gradient(
        135deg,
        var(--sl-color-primary-600, #4d7cff) 0%,
        var(--sl-color-primary-400, #6d92ff) 75%
      );
      color: #fff;
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      box-sizing: border-box;
      box-shadow: var(--vsa-shadow-sm);
    }
    :host-context(.dark) .result-block {
      background: linear-gradient(
        135deg,
        rgba(25, 30, 34, 0.95) 0%,
        rgba(25, 30, 34, 0.95) 62%,
        var(--sl-color-primary-600) 100%
      );
      color: var(--sl-color-neutral-0);
      box-shadow: 0 0 0 1px var(--vsa-border) inset,
        0 4px 14px rgba(0, 0, 0, 0.55);
    }
    :host-context(.dark) .result-value {
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      color: var(--sl-color-neutral-0);
    }
    .result-value {
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1;
      margin-left: 0.75rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    }
    @media (max-width: 640px) {
      .result-value {
        font-size: 1.25rem;
        margin-left: 0.5rem;
      }
      .result-block {
        padding: 0.65rem 0.75rem;
      }
    }
    .invalid-msg {
      margin-top: 0.75rem;
      padding: 0.75rem 0.85rem;
      border: 1px solid #d9534f;
      background: #ffe9e8;
      color: #b00000;
      border-radius: 8px;
      font-size: 0.7rem;
      line-height: 1.35;
    }
    /* Edge Retention input grouping */
    .retention-group {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 0.5rem;
    }
    .input-box {
      flex: 1 1 150px;
      background: #f9fafb;
      border: 1px solid var(--vsa-card-border);
      border-radius: 10px;
      padding: 0.55rem 0.6rem 0.5rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    }
    :host-context(.dark) .input-box {
      background: #1e2328; /* requested dark mode input box background */
      border-color: #394149;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
    }
    /* Dark mode near-black backgrounds for editable controls */
    /* Unified edit control background (antique white) in all modes */
    sl-input::part(base),
    sl-select::part(combobox),
    sl-button[variant="default"]::part(base) {
      background: var(--sl-input-background-color) !important;
      color: #222 !important;
    }
    sl-input::part(input),
    sl-select::part(display-input) {
      color: #222;
    }
    sl-input::part(base):focus-within,
    sl-select::part(combobox):focus-within {
      outline: 2px solid var(--sl-color-primary-600);
      outline-offset: 2px;
    }
    .input-box sl-input::part(base) {
      width: 100%;
    }
    /* Shoelace help text part */
    .input-box sl-input::part(help-text) {
      color: #b08400; /* note color */
      font-weight: 500;
      letter-spacing: 0.25px;
    }
    :host-context(.dark) .input-box sl-input::part(help-text) {
      color: hsl(240deg 10.93% 72.35%); /* requested help text color */
    }
    html.dark .invalid-msg {
      background: #432222;
      border-color: #ff6f6b;
      color: #ffb3b0;
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
      font-size: 0.9rem;
      font-weight: 600;
    }
    .help a {
      color: var(--sl-color-primary-600);
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
  `;let A=$e;B([m({type:String})],A.prototype,"page");B([m({type:Number})],A.prototype,"width");B([m({type:Number})],A.prototype,"height");B([m({type:Number})],A.prototype,"desiredAngle");B([m({type:Number})],A.prototype,"sharpenerAngle");B([m({type:Number})],A.prototype,"rotationAngle");B([m({type:Number})],A.prototype,"rotationSharpener");B([m({type:Number})],A.prototype,"passes");B([m({type:Number})],A.prototype,"hardness");B([m({type:Number})],A.prototype,"edgeAngle");B([m({attribute:!1})],A.prototype,"carbides");B([m({type:Boolean})],A.prototype,"dark");B([m({type:Boolean})],A.prototype,"online");B([m({type:Boolean})],A.prototype,"updateReady");B([m({type:Boolean})],A.prototype,"geometryFullScreen");customElements.define("vsa-app-shell",A);const Y=self,_e="v2",je=`vsa-precache-${_e}`,me=`vsa-runtime-${_e}`,Ze=`vsa-data-${_e}`,Mt=["./","./index.html","./manifest.json"];Y.addEventListener("install",o=>{Y.skipWaiting(),o.waitUntil(caches.open(je).then(e=>e.addAll(Mt)))});Y.addEventListener("activate",o=>{o.waitUntil((async()=>{const e=await caches.keys();await Promise.all(e.filter(t=>![je,me,Ze].includes(t)).map(t=>caches.delete(t))),Y.clients.claim()})())});async function Ve(o,e){const t=await caches.open(e),s=await t.match(o);try{const i=await fetch(o);return i&&i.status===200&&t.put(o,i.clone()),i}catch{return s||new Response("Offline",{status:503})}}Y.addEventListener("fetch",o=>{const{request:e}=o;if(e.method!=="GET")return;const t=new URL(e.url);if(e.mode==="navigate"){o.respondWith((async()=>{try{return await fetch(e)}catch{return await caches.match("./index.html")||new Response("Offline",{status:503})}})());return}if(t.pathname.endsWith("/data/steels.json")){o.respondWith(Ve(e,Ze));return}if(t.hostname.includes("cdn.jsdelivr.net")){o.respondWith(Ve(e,me));return}t.origin===self.location.origin&&o.respondWith((async()=>{const s=await caches.open(me),i=await s.match(e);try{const n=await fetch(e);return n&&n.status===200&&s.put(e,n.clone()),n}catch{return i||new Response("Offline",{status:503})}})())});Y.addEventListener("message",o=>{o.data==="vsa-skip-waiting"&&Y.skipWaiting()});const Ne=location.hostname==="localhost"||location.hostname==="127.0.0.1";"serviceWorker"in navigator&&!Ne?window.addEventListener("load",()=>{navigator.serviceWorker.register("./service-worker.js").catch(o=>console.error("SW registration failed",o))}):Ne&&console.info("[VSA] Skipping service worker registration in dev environment.");

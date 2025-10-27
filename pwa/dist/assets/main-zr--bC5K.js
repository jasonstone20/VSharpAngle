(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Qe="modulepreload",et=function(o){return"/"+o},Ae={},tt=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),l=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));s=Promise.allSettled(t.map(a=>{if(a=et(a),a in Ae)return;Ae[a]=!0;const c=a.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${h}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":Qe,c||(d.as="script"),d.crossOrigin="",d.href=a,l&&d.setAttribute("nonce",l),document.head.appendChild(d),c)return new Promise((f,S)=>{d.addEventListener("load",f),d.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${a}`)))})}))}function r(n){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=n,window.dispatchEvent(l),!l.defaultPrevented)throw n}return s.then(n=>{for(const l of n||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ne=globalThis,fe=ne.ShadowRoot&&(ne.ShadyCSS===void 0||ne.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,be=Symbol(),Se=new WeakMap;let Fe=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==be)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(fe&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Se.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Se.set(t,e))}return e}toString(){return this.cssText}};const it=o=>new Fe(typeof o=="string"?o:o+"",void 0,be),ye=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new Fe(t,o,be)},st=(o,e)=>{if(fe)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=ne.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)}},ze=fe?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return it(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:rt,defineProperty:nt,getOwnPropertyDescriptor:at,getOwnPropertyNames:ot,getOwnPropertySymbols:lt,getPrototypeOf:dt}=Object,R=globalThis,Ce=R.trustedTypes,ht=Ce?Ce.emptyScript:"",pe=R.reactiveElementPolyfillSupport,Q=(o,e)=>o,ae={toAttribute(o,e){switch(e){case Boolean:o=o?ht:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},we=(o,e)=>!rt(o,e),Te={attribute:!0,type:String,converter:ae,reflect:!1,useDefault:!1,hasChanged:we};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),R.litPropertyMetadata??(R.litPropertyMetadata=new WeakMap);let G=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Te){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&nt(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:r}=at(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){const l=s==null?void 0:s.call(this);r==null||r.call(this,n),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Te}static _$Ei(){if(this.hasOwnProperty(Q("elementProperties")))return;const e=dt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Q("properties"))){const t=this.properties,i=[...ot(t),...lt(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(ze(s))}else e!==void 0&&t.push(ze(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return st(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var r;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const n=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:ae).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){var r,n;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const l=i.getPropertyOptions(s),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:ae;this._$Em=s;const c=a.fromAttribute(t,l.type);this[s]=c??((n=this._$Ej)==null?void 0:n.get(s))??c,this._$Em=null}}requestUpdate(e,t,i){var s;if(e!==void 0){const r=this.constructor,n=this[e];if(i??(i=r.getPropertyOptions(e)),!((i.hasChanged??we)(n,t)||i.useDefault&&i.reflect&&n===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,n]of s){const{wrapped:l}=n,a=this[r];l!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,n,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[Q("elementProperties")]=new Map,G[Q("finalized")]=new Map,pe==null||pe({ReactiveElement:G}),(R.reactiveElementVersions??(R.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ee=globalThis,oe=ee.trustedTypes,Me=oe?oe.createPolicy("lit-html",{createHTML:o=>o}):void 0,De="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,Le="?"+U,ct=`<${Le}>`,Y=document,te=()=>Y.createComment(""),ie=o=>o===null||typeof o!="object"&&typeof o!="function",xe=Array.isArray,pt=o=>xe(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",ue=`[ 	
\f\r]`,X=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Be=/-->/g,Ve=/>/g,F=RegExp(`>|${ue}(?:([^\\s"'>=/]+)(${ue}*=${ue}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ee=/'/g,We=/"/g,qe=/^(?:script|style|textarea|title)$/i,Ye=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),p=Ye(1),I=Ye(2),Z=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Ie=new WeakMap,D=Y.createTreeWalker(Y,129);function Oe(o,e){if(!xe(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Me!==void 0?Me.createHTML(e):e}const ut=(o,e)=>{const t=o.length-1,i=[];let s,r=e===2?"<svg>":e===3?"<math>":"",n=X;for(let l=0;l<t;l++){const a=o[l];let c,h,d=-1,f=0;for(;f<a.length&&(n.lastIndex=f,h=n.exec(a),h!==null);)f=n.lastIndex,n===X?h[1]==="!--"?n=Be:h[1]!==void 0?n=Ve:h[2]!==void 0?(qe.test(h[2])&&(s=RegExp("</"+h[2],"g")),n=F):h[3]!==void 0&&(n=F):n===F?h[0]===">"?(n=s??X,d=-1):h[1]===void 0?d=-2:(d=n.lastIndex-h[2].length,c=h[1],n=h[3]===void 0?F:h[3]==='"'?We:Ee):n===We||n===Ee?n=F:n===Be||n===Ve?n=X:(n=F,s=void 0);const S=n===F&&o[l+1].startsWith("/>")?" ":"";r+=n===X?a+ct:d>=0?(i.push(c),a.slice(0,d)+De+a.slice(d)+U+S):a+U+(d===-2?l:S)}return[Oe(o,r+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class se{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,n=0;const l=e.length-1,a=this.parts,[c,h]=ut(e,t);if(this.el=se.createElement(c,i),D.currentNode=this.el.content,t===2||t===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=D.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith(De)){const f=h[n++],S=s.getAttribute(d).split(U),u=/([.?@])?(.*)/.exec(f);a.push({type:1,index:r,name:u[2],strings:S,ctor:u[1]==="."?mt:u[1]==="?"?vt:u[1]==="@"?ft:he}),s.removeAttribute(d)}else d.startsWith(U)&&(a.push({type:6,index:r}),s.removeAttribute(d));if(qe.test(s.tagName)){const d=s.textContent.split(U),f=d.length-1;if(f>0){s.textContent=oe?oe.emptyScript:"";for(let S=0;S<f;S++)s.append(d[S],te()),D.nextNode(),a.push({type:2,index:++r});s.append(d[f],te())}}}else if(s.nodeType===8)if(s.data===Le)a.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(U,d+1))!==-1;)a.push({type:7,index:r}),d+=U.length-1}r++}}static createElement(e,t){const i=Y.createElement("template");return i.innerHTML=e,i}}function K(o,e,t=o,i){var n,l;if(e===Z)return e;let s=i!==void 0?(n=t._$Co)==null?void 0:n[i]:t._$Cl;const r=ie(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=K(o,s._$AS(o,e.values),s,i)),e}class gt{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??Y).importNode(t,!0);D.currentNode=s;let r=D.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new re(r,r.nextSibling,this,e):a.type===1?c=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(c=new bt(r,this,e)),this._$AV.push(c),a=i[++l]}n!==(a==null?void 0:a.index)&&(r=D.nextNode(),n++)}return D.currentNode=Y,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class re{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),ie(e)?e===V||e==null||e===""?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==Z&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):pt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&ie(this._$AH)?this._$AA.nextSibling.data=e:this.T(Y.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=se.createElement(Oe(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(t);else{const n=new gt(s,this),l=n.u(this.options);n.p(t),this.T(l),this._$AH=n}}_$AC(e){let t=Ie.get(e.strings);return t===void 0&&Ie.set(e.strings,t=new se(e)),t}k(e){xe(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const r of e)s===t.length?t.push(i=new re(this.O(te()),this.O(te()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class he{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(e,t=this,i,s){const r=this.strings;let n=!1;if(r===void 0)e=K(this,e,t,0),n=!ie(e)||e!==this._$AH&&e!==Z,n&&(this._$AH=e);else{const l=e;let a,c;for(e=r[0],a=0;a<r.length-1;a++)c=K(this,l[i+a],t,a),c===Z&&(c=this._$AH[a]),n||(n=!ie(c)||c!==this._$AH[a]),c===V?e=V:e!==V&&(e+=(c??"")+r[a+1]),this._$AH[a]=c}n&&!s&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class mt extends he{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class vt extends he{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class ft extends he{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=K(this,e,t,0)??V)===Z)return;const i=this._$AH,s=e===V&&i!==V||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class bt{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}}const ge=ee.litHtmlPolyfillSupport;ge==null||ge(se,re),(ee.litHtmlVersions??(ee.litHtmlVersions=[])).push("3.3.1");const yt=(o,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let s=i._$litPart$;if(s===void 0){const r=(t==null?void 0:t.renderBefore)??null;i._$litPart$=s=new re(e.insertBefore(te(),r),r,void 0,t??{})}return s._$AI(o),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=globalThis;class q extends G{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=yt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Z}}var Re;q._$litElement$=!0,q.finalized=!0,(Re=L.litElementHydrateSupport)==null||Re.call(L,{LitElement:q});const me=L.litElementPolyfillSupport;me==null||me({LitElement:q});(L.litElementVersions??(L.litElementVersions=[])).push("4.2.1");const wt=o=>o*Math.PI/180,je=o=>o/(Math.PI/180),Ge=o=>Math.sin(wt(o)),xt=o=>1/Ge(o);function _t(o){return Math.asin(Math.min(1,Math.max(-1,o)))}function $t(o){return Math.acos(Math.min(1,Math.max(-1,o)))}function kt(o,e){if(o==null||e==null||e===0)return null;const t=o/2/e;return t<-1||t>1?null:Math.floor(je(_t(t)))}function At(o,e){return o==null||e==null?null:Math.floor((o-e)*.125)}function St(o,e){if(o==null||e==null)return null;const t=xt(e)*Ge(o);return t<-1||t>1?null:Math.floor(je($t(t)))}function zt(o){if(!o||o<1)return{total:0,sequence:[]};const e=o/10+1,t=o*e,i=o*2,s=t+2+i,r=s*2,n=[];for(let l=o;l>=9;l-=10)n.push(l);return n.push(5,3,2,1),{total:s,xStrokes:r,sequence:n}}function Ze(o){const{hardness:e=60,edgeAngle:t=30,CrC:i=0,CrV:s=0,MC:r=0,M6C:n=0,MN:l=0,CrN:a=0,Fe3C:c=0}=o||{},h=-157+15.8*e-17.8*t+11.2*i+14.6*s+26.2*r+9.5*n+20.9*l+19.4*a+5*c,d=i+s+r+n+l+a+c;return{TCC:Math.round(h),volume:d}}const de=class de extends q{constructor(){super(),this.steels=[],this.filter="",this.sortKey="name",this.sortDir="asc",this.hardnessValues=[60],this.edgeAngleValues=[30],this.selectedName="",this._load()}async _load(){try{const e=await fetch("./data/steels.json");if(!e.ok)throw new Error("Failed steels.json");const t=await e.json();this.steels=t}catch(e){console.error(e)}}_onFilter(e){this.filter=e.target.value.trim().toLowerCase()}_setHardnessValue(e,t){const i=e.target;if(i.value!==""){const s=Number(i.value);if(!isNaN(s)){const r=[...this.hardnessValues];r[t]=s,this.hardnessValues=r}}}_setEdgeAngleValue(e,t){const i=e.target;if(i.value!==""){const s=Number(i.value);if(!isNaN(s)){const r=[...this.edgeAngleValues];r[t]=s,this.edgeAngleValues=r}}}_validateHardnessValue(e,t){const i=e.target,s=Number(i.value),r=[...this.hardnessValues];isNaN(s)||s<=0?(r[t]=60,i.value="60"):r[t]=s,this.hardnessValues=r}_validateEdgeAngleValue(e,t){const i=e.target,s=Number(i.value),r=[...this.edgeAngleValues];isNaN(s)||s<=0?(r[t]=30,i.value="30"):r[t]=s,this.edgeAngleValues=r}_addHardnessInput(){this.hardnessValues.length<3&&(this.hardnessValues=[...this.hardnessValues,60])}_addAngleInput(){this.edgeAngleValues.length<3&&(this.edgeAngleValues=[...this.edgeAngleValues,30])}_removeHardnessInput(e){if(this.hardnessValues.length>1){const t=[...this.hardnessValues];t.splice(e,1),this.hardnessValues=t}}_removeAngleInput(e){if(this.edgeAngleValues.length>1){const t=[...this.edgeAngleValues];t.splice(e,1),this.edgeAngleValues=t}}_toggleSort(e){this.sortKey===e?this.sortDir=this.sortDir==="asc"?"desc":"asc":(this.sortKey=e,this.sortDir="asc")}_filtered(){const e=this.filter;let t=[];const i=this.hardnessValues.filter(r=>r>0),s=this.edgeAngleValues.filter(r=>r>0);i.length===0&&i.push(60),s.length===0&&s.push(30);for(const r of i)for(const n of s)for(const l of this.steels){if(e&&!l.name.toLowerCase().includes(e))continue;const{TCC:a,volume:c}=Ze({hardness:r,edgeAngle:n,...l});t.push({...l,TCC:a,volume:c,hardness:r,edgeAngle:n,combinationId:`${l.name}-${r}-${n}`})}return t.sort((r,n)=>{const l=this.sortDir==="asc"?1:-1;if(this.sortKey==="name"){const a=r.name.localeCompare(n.name);if(a!==0)return a*l;const c=r.hardness-n.hardness;return c!==0?c*l:(r.edgeAngle-n.edgeAngle)*l}return(r[this.sortKey]-n[this.sortKey])*l}),t}_select(e){this.selectedName=e.name;const t={name:e.name,hardness:e.hardness,edgeAngle:e.edgeAngle,carbides:{CrC:e.CrC||0,CrV:e.CrV||0,MC:e.MC||0,M6C:e.M6C||0,MN:e.MN||0,CrN:e.CrN||0,Fe3C:e.Fe3C||0}};this.dispatchEvent(new CustomEvent("steel-selected",{detail:t,bubbles:!0,composed:!0}))}_onRowKey(e,t){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._select(t))}_headerCell(e,t){const i=this.sortKey===e,s=i?this.sortDir==="asc"?"▲":"▼":"",r=i?this.sortDir==="asc"?"ascending":"descending":"none";return p`<th
      @click=${()=>this._toggleSort(e)}
      aria-sort="${r}"
      role="columnheader"
      tabindex="0"
      @keydown=${n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),this._toggleSort(e))}}
    >
      ${t} ${s}
    </th>`}render(){const e=this._filtered();return p`
      <div class="toolbar">
        <div class="control-group">
          <sl-input
            size="small"
            placeholder="Filter steel…"
            @input=${this._onFilter}
          ></sl-input>
        </div>
        <div class="control-group tips">
          <sl-tooltip content="Click headers to sort"
            ><sl-badge variant="neutral">Sort Tips</sl-badge></sl-tooltip
          >
          <sl-tooltip content="Click a steel row to populate inputs">
            <sl-badge variant="primary">Row Select Tip</sl-badge>
          </sl-tooltip>
        </div>
      </div>

      <div class="steel-controls">
        <table class="controls-table">
          <tr>
            <td>Hardness (HRC)</td>
            <td>
              <div class="multi-input">
                ${this.hardnessValues.map((t,i)=>p`
                    <div class="input-row">
                      <sl-input
                        size="small"
                        type="number"
                        value=${String(t)}
                        @input=${s=>this._setHardnessValue(s,i)}
                        @blur=${s=>this._validateHardnessValue(s,i)}
                      ></sl-input>
                      ${this.hardnessValues.length>1?p`
                            <sl-button
                              size="small"
                              variant="default"
                              class="remove-button"
                              @click=${()=>this._removeHardnessInput(i)}
                            >
                              <sl-icon name="x"></sl-icon>
                            </sl-button>
                          `:""}
                    </div>
                  `)}
                ${this.hardnessValues.length<3?p`
                      <sl-button
                        size="small"
                        variant="default"
                        class="add-button"
                        @click=${this._addHardnessInput}
                      >
                        <sl-icon name="plus"></sl-icon>
                      </sl-button>
                    `:""}
              </div>
            </td>
          </tr>
          <tr>
            <td>Edge Angle (DPS)</td>
            <td>
              <div class="multi-input">
                ${this.edgeAngleValues.map((t,i)=>p`
                    <div class="input-row">
                      <sl-input
                        size="small"
                        type="number"
                        value=${String(t)}
                        @input=${s=>this._setEdgeAngleValue(s,i)}
                        @blur=${s=>this._validateEdgeAngleValue(s,i)}
                      ></sl-input>
                      ${this.edgeAngleValues.length>1?p`
                            <sl-button
                              size="small"
                              variant="default"
                              class="remove-button"
                              @click=${()=>this._removeAngleInput(i)}
                            >
                              <sl-icon name="x"></sl-icon>
                            </sl-button>
                          `:""}
                    </div>
                  `)}
                ${this.edgeAngleValues.length<3?p`
                      <sl-button
                        size="small"
                        variant="default"
                        class="add-button"
                        @click=${this._addAngleInput}
                      >
                        <sl-icon name="plus"></sl-icon>
                      </sl-button>
                    `:""}
              </div>
            </td>
          </tr>
        </table>
      </div>

      ${e.length?p` <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${this._headerCell("name","Steel")}
                  ${this._headerCell("hardness","HRC")}
                  ${this._headerCell("edgeAngle","Angle")}
                  ${this._headerCell("TCC","est.TCC")}
                  ${this._headerCell("CrC","CrC")}
                  ${this._headerCell("CrV","CrV")}
                  ${this._headerCell("MC","MC")}
                  ${this._headerCell("M6C","M6C")}
                  ${this._headerCell("MN","MN")}
                  ${this._headerCell("CrN","CrN")}
                  ${this._headerCell("Fe3C","Fe3C")}
                  ${this._headerCell("volume","Vol%")}
                </tr>
              </thead>
              <tbody>
                ${e.map(t=>{var i;return p` <tr
                    @click=${()=>this._select(t)}
                    @keydown=${s=>this._onRowKey(s,t)}
                    tabindex="0"
                    role="button"
                    aria-label="Select steel ${t.name} at ${t.hardness}HRC, ${t.edgeAngle}°"
                    aria-selected="${this.selectedName===t.name?"true":"false"}"
                  >
                    <td class="name">${t.name}</td>
                    <td>${t.hardness}</td>
                    <td>${t.edgeAngle}</td>
                    <td class="tcc">${t.TCC}</td>
                    <td>${t.CrC||0}</td>
                    <td>${t.CrV||0}</td>
                    <td>${t.MC||0}</td>
                    <td>${t.M6C||0}</td>
                    <td>${t.MN||0}</td>
                    <td>${t.CrN||0}</td>
                    <td>${t.Fe3C||0}</td>
                    <td class="vol-cell">
                      ${(i=t.volume)!=null&&i.toFixed?t.volume.toFixed(1):((t.CrC||0)+(t.CrV||0)+(t.MC||0)+(t.M6C||0)+(t.MN||0)+(t.CrN||0)+(t.Fe3C||0)).toFixed(1)}
                    </td>
                  </tr>`})}
              </tbody>
            </table>
          </div>`:p`<div class="empty">No steels found.</div>`}
    `}};de.styles=ye`
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
      flex-direction: column;
      gap: 0.75rem;
      align-items: stretch;
      margin-bottom: 1rem;
    }
    .control-group {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    .control-group.calculation-inputs {
      justify-content: flex-start;
    }
    .control-group.tips {
      justify-content: center;
      gap: 1rem;
    }
    /* Table-style controls similar to retention estimator */
    .steel-controls {
      background: var(--vsa-card-bg);
      border: 1px solid var(--vsa-card-border);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 1rem;
    }
    .controls-table {
      width: 100%;
      border-collapse: collapse;
    }
    .controls-table td {
      border-bottom: 1px solid var(--vsa-border, #e5e7eb);
      padding: 0.5rem 0.75rem;
      vertical-align: middle;
    }
    .controls-table td:first-child {
      font-weight: 500;
      width: 25%;
      background: var(--vsa-surface, #f9fafb);
      border-right: 1px solid var(--vsa-border, #e5e7eb);
    }
    .controls-table td:last-child {
      width: 75%;
    }
    .controls-table tr:last-child td {
      border-bottom: none;
    }
    .multi-input {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: stretch;
    }
    .input-row {
      display: flex;
      gap: 0.4rem;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
    }
    .input-row sl-input {
      flex: 1;
      min-width: 60px;
      max-width: 100px;
    }
    .input-row sl-button {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
    }
    .add-button {
      align-self: flex-start;
      margin-top: 0.25rem;
    }
    .remove-button::part(base) {
      background-color: var(--sl-color-danger-600);
      border-color: var(--sl-color-danger-600);
      color: white;
    }
    .remove-button::part(base):hover {
      background-color: var(--sl-color-danger-700);
      border-color: var(--sl-color-danger-700);
    }
    .add-button::part(base) {
      background-color: var(--sl-color-success-600);
      border-color: var(--sl-color-success-600);
      color: white;
    }
    .add-button::part(base):hover {
      background-color: var(--sl-color-success-700);
      border-color: var(--sl-color-success-700);
    }
    :host-context(.dark) .controls-table td:first-child {
      background: var(--vsa-surface-dark, #1a1d23);
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
      .control-group.calculation-inputs {
        flex-direction: column;
        align-items: stretch;
      }
      .control-group.tips {
        flex-direction: column;
        gap: 0.5rem;
      }
      .controls-table td {
        padding: 0.4rem 0.5rem;
      }
      .controls-table td:first-child {
        width: 25%;
        font-size: 0.85rem;
      }
      .controls-table td:last-child {
        width: 75%;
      }
      .multi-input {
        gap: 0.4rem;
      }
      .input-row {
        gap: 0.3rem;
      }
      .input-row sl-input {
        min-width: 50px;
        max-width: 100px;
        flex: 1;
      }
      .input-row sl-button {
        width: 28px;
        height: 28px;
        flex-shrink: 0;
      }
      .add-button {
        width: 32px;
        height: 32px;
        margin-top: 0.2rem;
      }
    }
  `,de.properties={steels:{type:Array},filter:{type:String},sortKey:{type:String},sortDir:{type:String},hardnessValues:{type:Array},edgeAngleValues:{type:Array},selectedName:{type:String}};let le=de;customElements.define("vsa-steel-table",le);const Ct=Object.freeze(Object.defineProperty({__proto__:null,VsaSteelTable:le},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tt={attribute:!0,type:String,converter:ae,reflect:!1,hasChanged:we},Mt=(o=Tt,e,t)=>{const{kind:i,metadata:s}=t;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),r.set(t.name,o),i==="accessor"){const{name:n}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,o)},init(l){return l!==void 0&&this.C(n,void 0,o,l),l}}}if(i==="setter"){const{name:n}=t;return function(l){const a=this[n];e.call(this,l),this.requestUpdate(n,a,o)}}throw Error("Unsupported decorator location: "+i)};function x(o){return(e,t)=>typeof t=="object"?Mt(o,e,t):((i,s,r)=>{const n=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),n?Object.getOwnPropertyDescriptor(s,r):void 0})(o,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function B(o){return x({...o,state:!0,attribute:!1})}const Bt=/^(mm|in)=>/i,Vt=/^([0-9]*\.?[0-9]+)(h|H|oa)$/i,Et=/^([0-9]*\.?[0-9]+)(dps|d|inc|inclusive|i)-([0-9]*\.?[0-9]+)(h|height|w|width)$/i,Wt=/^([0-9]*\.?[0-9]+)w@([0-9]*\.?[0-9]+)(h|height)$/i,It=/^([0-9]*\.?[0-9]+)w@([0-9]*\.?[0-9]+)cp$/i,Pt=/^([0-9]*\.?[0-9]+)w@([0-9]*\.?[0-9]+)acp$/i;function H(o){return parseFloat(o)}function Nt(o){return o*2}function Pe(o){return o*Math.PI/180}function J(o){return o*180/Math.PI}function Ht(o,e){if(o<=0||e<=0)return null;let t=Math.min(Math.sqrt(o/(2*e)),Math.PI/3);for(let i=0;i<15;i++){const s=Math.sin(t),r=Math.cos(t);if(Math.abs(r)<1e-6)break;const n=2*e*s*s/r-o,l=4*e*s+2*e*s*s*s/(r*r);if(Math.abs(l)<1e-12)break;const a=t-n/l;if(!isFinite(a)||a<=0)break;if(Math.abs(a-t)<1e-9){t=a;break}if(t=a,t>Math.PI/2-1e-4){t=Math.PI/2-1e-4;break}}return!isFinite(t)||t<=0?null:t}function Ut(o){const e=o.match(Bt);return e?{unit:e[1].toLowerCase(),rest:o.slice(e[0].length)}:{unit:null,rest:o}}function j(o,e){const t=[];let i=o.trim();const{unit:s,rest:r}=Ut(i);s&&(i=r.trim());const n=s??null,l=s??e,a=l==="mm"?1:25.4;if(!i)return{segments:[],warnings:t,normalized:"",unit:e,notationUnits:s??void 0};const c=i.split(",").map(u=>u.trim()).filter(Boolean),h=[],d={currWidth:0,currHeight:0,lastInclusiveAngleDeg:null};let f;for(let u=0;u<c.length;u++){const _=c[u];let w=_.match(Vt);if(w){f=H(w[1])*a;continue}if(w=_.match(Et),w){const y=H(w[1]),$=w[2].toLowerCase(),k=H(w[3])*a,T=w[4].toLowerCase(),g=$.startsWith("inc")||$==="i"?"inclusive":"dps",z=g==="dps"?Nt(y):y;if(T.startsWith("h")){if(k<=d.currHeight){t.push(`Segment ${u+1}: height ${k.toFixed(4)} not greater than previous height.`);continue}h.push({angleType:g,angleValue:y,travelType:"height",travelValue:k}),d.lastInclusiveAngleDeg=z}else{if(k<=d.currWidth){t.push(`Segment ${u+1}: width ${k.toFixed(4)} not greater than previous width.`);continue}if(z===0){t.push(`Segment ${u+1}: zero angle with width travel ignored.`);continue}h.push({angleType:g,angleValue:y,travelType:"width",travelValue:k}),d.lastInclusiveAngleDeg=z}if(h[h.length-1].travelType==="height"){d.currHeight=h[h.length-1].travelValue;const A=Pe(z)/2;d.currWidth===0?d.currWidth=2*d.currHeight*Math.tan(A):d.currWidth=d.currWidth+2*(d.currHeight-d.currHeight)*Math.tan(A)}else{const A=h[h.length-1].travelValue,P=Pe(z)/2,N=A-d.currWidth,ce=d.currWidth===0?A/2/Math.tan(P):N/(2*Math.tan(P));d.currHeight+=ce,d.currWidth=A}continue}if(w=_.match(Wt),w){const y=H(w[1])*a,$=H(w[2])*a;if($<=d.currHeight){t.push(`Segment ${u+1}: target height not greater than previous.`);continue}const k=$-d.currHeight,T=y-d.currWidth;if(T<=0){t.push(`Segment ${u+1}: thickness not greater than previous width.`);continue}let g;if(d.currWidth===0&&d.currHeight===0?g=J(2*Math.atan(y/(2*$))):g=J(2*Math.atan(T/(2*k))),!isFinite(g)||g<=0){t.push(`Segment ${u+1}: could not derive angle from thickness@height.`);continue}h.push({angleType:"inclusive",angleValue:g,travelType:"height",travelValue:$}),d.currHeight=$,d.currWidth=y,d.lastInclusiveAngleDeg=g;continue}if(w=_.match(It),w){const y=H(w[1])*a,$=H(w[2])*a;if(y<=d.currWidth){t.push(`Segment ${u+1}: caliper thickness not greater than previous width.`);continue}const k=y-d.currWidth;let T=Ht(k,$);if(!T&&k>0&&$>0&&(T=Math.sqrt(k/(2*$))),!T||!isFinite(T)){t.push(`Segment ${u+1}: failed to solve angle from caliper.`);continue}const g=J(T*2),z=$*Math.sin(T),A=y;h.push({angleType:"inclusive",angleValue:g,travelType:"width",travelValue:A}),d.currWidth=A,d.currHeight+=z,d.lastInclusiveAngleDeg=g;continue}if(w=_.match(Pt),w){const y=H(w[1])*a,$=H(w[2])*a;if(y<=d.currWidth){t.push(`Segment ${u+1}: apex caliper thickness not greater than previous width.`);continue}const k=y/2,T=$*$-k*k;if(T<=0){t.push(`Segment ${u+1}: apex caliper distance ${$.toFixed(4)} too small for thickness ${y.toFixed(4)}.`);continue}const g=Math.sqrt(T);let z;if(d.currWidth===0&&d.currHeight===0){const A=Math.atan(k/g);z=J(A*2)}else{const A=y-d.currWidth,P=g-d.currHeight;if(P<=0){t.push(`Segment ${u+1}: apex caliper target height ${g.toFixed(4)} not greater than current height ${d.currHeight.toFixed(4)}.`);continue}const N=Math.atan(A/(2*P));z=J(N*2)}if(!isFinite(z)||z<=0){t.push(`Segment ${u+1}: could not derive angle from apex caliper measurement.`);continue}h.push({angleType:"inclusive",angleValue:z,travelType:"height",travelValue:g}),d.currHeight=g,d.currWidth=y,d.lastInclusiveAngleDeg=z;continue}t.push(`Token ${u+1} '${_}' not recognized.`)}if(f!==void 0){const u=d.currHeight;f>u+1e-6&&h.push({angleType:"inclusive",angleValue:0,travelType:"height",travelValue:f})}const S=(n?n+"=>":"")+c.join(",");return{segments:h,warnings:t,overallHeight:f,unit:l,notationUnits:n??void 0,normalized:S}}var Rt=Object.defineProperty,Ft=Object.getOwnPropertyDescriptor,b=(o,e,t,i)=>{for(var s=i>1?void 0:i?Ft(e,t):e,r=o.length-1,n;r>=0;r--)(n=o[r])&&(s=(i?n(e,t,s):n(s))||s);return i&&s&&Rt(e,t,s),s};class Ne{constructor(e=[],t=!1,i=3){this.segments=[],this.apexMacro=!1,this.maxApexHeight=3,this.segments=[...e],this.apexMacro=t,this.maxApexHeight=i}setSegments(e){this.segments=[...e]}getSegments(){return[...this.segments]}setApexMacro(e){this.apexMacro=e}_createApexModel(e){if(!e.length||!this.apexMacro)return e;const t=this._recomputeSegments(e),i=[];let s=0;for(let r=0;r<t.length;r++){const n=t[r],l=n.derivedHeight??s;if(s>=this.maxApexHeight)break;if(l<=this.maxApexHeight)i.push({...n}),s=l;else{const a={...n};if(n.travelType==="height")a.travelValue=this.maxApexHeight-s,a.derivedHeight=this.maxApexHeight;else{const c=l-s,d=(this.maxApexHeight-s)/c;a.travelValue=n.travelValue*d}i.push(a);break}}return i}_recomputeSegments(e){let t=0,i=0;return e.map(s=>{const r=s.angleType==="dps"?s.angleValue*2:s.angleValue,n=r*Math.PI/360;let l=t,a=i;if(s.travelType==="width"){const h=s.travelValue;if(r===0)l=t,a=i;else{l=h;const d=t===0?l/2/Math.tan(n):(l-t)/(2*Math.tan(n));a=i+d}}else{const h=s.travelValue;h<i?a=i:a=h;const d=a-i;r===0?l=t:t===0?l=2*a*Math.tan(n):l=t+2*d*Math.tan(n)}const c={...s,angleInclusive:r,derivedWidth:l,derivedHeight:a};return t=l,i=a,c})}compute(){const e=this._createApexModel(this.segments),t=this._recomputeSegments(e);let i=0,s=0;const r=[];for(const n of t){const l=n.derivedWidth??s,a=n.derivedHeight??i;r.push({angleInclusive:n.angleInclusive??(n.angleType==="dps"?n.angleValue*2:n.angleValue),startWidth:s,endWidth:l,startY:i,endY:a}),i=a,s=l}return r}getTotalHeight(){const e=this.compute();return e.length?e[e.length-1].endY:5}getMaxWidth(){const e=this.compute();return e.length?e[e.length-1].endWidth:2}widthAtY(e,t){if(!e.length||t<=0)return 0;for(const i of e)if(t<=i.endY){if(i.startY===i.endY)return i.endWidth;const s=(t-i.startY)/(i.endY-i.startY);return i.startWidth+(i.endWidth-i.startWidth)*s}return e[e.length-1].endWidth}}const $e=class $e extends q{constructor(){super(),this.angleInput=15,this.thicknessInput=.5,this.angleInputB=15,this.thicknessInputB=.5,this.angleInputType="dps",this.angleInputTypeB="dps",this.travelInputType="width",this.travelInputTypeB="width",this.zoom=1,this.pan=0,this._geometryA=new Ne,this._geometryB=new Ne,this.warning=null,this._storageKey="vsa-geometry-builder-state",this.units="mm",this.regionZoomActive=!1,this.overlayMode=!0,this.overlayCenter=.5,this.overlayTargetWidth=null,this.showProfile=!1,this.notationA="",this.notationB="",this.notationAWarnings=[],this.notationBWarnings=[],this._fullScreen=!1,this._userAdjustingWidth=!1,this._userAdjustingCenter=!1,this.strokePxMin=5,this.showDebug=!0,this.thinStrokes=!0,this.adaptiveZoomMode="idle",this._wizardOpen=!1,this._wizardStep="units",this._wizardUnits="mm",this._wizardNotationType="",this._wizardCurrentValueIndex=0,this._wizardValues={},this._wizardSegments=[],this._wizardCurrentSegmentIndex=0,this._wizardEditingExisting=!1,this._wizardSide="A",this._activeShrink=!1,this._activeExpand=!1,this._prevOverlayCenter=this.overlayCenter,this._customViewBox=null,this._baseViewBox=null,this._dragPanning=!1,this._dragStart=null,this._lastTapTime=0,this._pendingTap=null,this._computedA=[],this._computedB=[],this._onPanMoveBound=e=>this._onPanMove(e),this._onPanEndBound=e=>this._onPanEnd(e)}get segments(){return this._geometryA.getSegments()}set segments(e){this._geometryA.setSegments(e)}get segmentsB(){return this._geometryB.getSegments()}set segmentsB(e){this._geometryB.setSegments(e)}get fullScreen(){return this._fullScreen}set fullScreen(e){this._fullScreen=e,this._dispatchFullScreenChanged()}get apexMacro(){return this._geometryA.apexMacro}set apexMacro(e){this._geometryA.setApexMacro(e),this._geometryB.setApexMacro(e),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this._restore(),this._syncSegmentsToModels()}disconnectedCallback(){super.disconnectedCallback()}_restore(){try{const e=localStorage.getItem(this._storageKey);if(!e)return;const t=JSON.parse(e);Array.isArray(t.segments)&&(this.segments=t.segments),Array.isArray(t.segmentsB)&&(this.segmentsB=t.segmentsB),typeof t.zoom=="number"&&(this.zoom=t.zoom),typeof t.pan=="number"&&(this.pan=t.pan),typeof t.angleInput=="number"&&(this.angleInput=t.angleInput),typeof t.thicknessInput=="number"&&(this.thicknessInput=t.thicknessInput),typeof t.angleInputB=="number"&&(this.angleInputB=t.angleInputB),typeof t.thicknessInputB=="number"&&(this.thicknessInputB=t.thicknessInputB),(t.angleInputType==="dps"||t.angleInputType==="inclusive")&&(this.angleInputType=t.angleInputType),(t.angleInputTypeB==="dps"||t.angleInputTypeB==="inclusive")&&(this.angleInputTypeB=t.angleInputTypeB),(t.travelInputType==="width"||t.travelInputType==="height")&&(this.travelInputType=t.travelInputType),(t.travelInputTypeB==="width"||t.travelInputTypeB==="height")&&(this.travelInputTypeB=t.travelInputTypeB),(t.units==="mm"||t.units==="in")&&(this.units=t.units),typeof t.overlayMode=="boolean"&&(this.overlayMode=t.overlayMode),typeof t.overlayCenter=="number"&&(this.overlayCenter=t.overlayCenter),typeof t.overlayTargetWidth=="number"&&(this.overlayTargetWidth=t.overlayTargetWidth),typeof t.strokePxMin=="number"&&(this.strokePxMin=t.strokePxMin),typeof t.thinStrokes=="boolean"?this.thinStrokes=t.thinStrokes:typeof t._thinStrokes=="boolean"&&(this.thinStrokes=t._thinStrokes),typeof t.fullScreen=="boolean"&&(this.fullScreen=t.fullScreen),typeof t.showProfile=="boolean"&&(this.showProfile=t.showProfile),typeof t.apexMacro=="boolean"&&(this.apexMacro=t.apexMacro),t.customViewBox&&typeof t.customViewBox.x=="number"&&typeof t.customViewBox.y=="number"&&typeof t.customViewBox.w=="number"&&typeof t.customViewBox.h=="number"&&(this._customViewBox=t.customViewBox,this.regionZoomActive=!0),typeof t.notationA=="string"&&(this.notationA=t.notationA),typeof t.notationB=="string"&&(this.notationB=t.notationB),this._syncSegmentsToModels()}catch{}}_persist(){try{const e=this.fullScreen,t={angleInput:this.angleInput,thicknessInput:this.thicknessInput,angleInputB:this.angleInputB,thicknessInputB:this.thicknessInputB,segments:this.segments,segmentsB:this.segmentsB,angleInputType:this.angleInputType,angleInputTypeB:this.angleInputTypeB,travelInputType:this.travelInputType,travelInputTypeB:this.travelInputTypeB,units:this.units,overlayMode:this.overlayMode,overlayCenter:this.overlayCenter,overlayTargetWidth:this.overlayTargetWidth,strokePxMin:this.strokePxMin,thinStrokes:this.thinStrokes,customViewBox:this._customViewBox,fullScreen:this.fullScreen,showProfile:this.showProfile,apexMacro:this.apexMacro,notationA:this.notationA,notationB:this.notationB};localStorage.setItem(this._storageKey,JSON.stringify(t)),this.fullScreen?(document.documentElement.style.overflow="hidden",document.body.style.overflow="hidden"):(document.documentElement.style.overflow="",document.body.style.overflow=""),e!==this.fullScreen&&this._dispatchFullScreenChanged()}catch{}}_dispatchFullScreenChanged(){this.dispatchEvent(new CustomEvent("geometry-fullscreen-changed",{detail:{fullScreen:this.fullScreen},bubbles:!0,composed:!0}))}_toggleFullScreen(){this.fullScreen=!this.fullScreen,this._customViewBox=null,this.requestUpdate(),this._persist()}_editSegment(e,t,i,s){if(s<=0||Number.isNaN(s))return;const r=e==="A"?[...this.segments]:[...this.segmentsB];r[t]&&(r[t]={...r[t],[i]:s},e==="A"?this.segments=r:this.segmentsB=r,this._baseViewBox=null,this._persist())}_deleteSegment(e,t){const i=e==="A"?[...this.segments]:[...this.segmentsB];i[t]&&(i.splice(t,1),e==="A"?this.segments=i:this.segmentsB=i,this._baseViewBox=null,this._persist())}_add(){const e=this.angleInput,t=this.angleInputType,i=t==="inclusive"?e:e*2,s=this.travelInputType,r=this.thicknessInput,n=this.segments[this.segments.length-1],l=(n==null?void 0:n.derivedWidth)??0,a=(n==null?void 0:n.derivedHeight)??0;if(s==="width"){if(r<=l){const h=this._displayDigits();this.warning=`Width ${this._toDisplayLength(r).toFixed(h)}${this.units} must exceed previous ${this._toDisplayLength(l).toFixed(h)}${this.units}.`,this.requestUpdate();return}if(i===0){this.warning="Zero angle only valid with height travel.",this.requestUpdate();return}}else if(r<=a){const h=this._displayDigits();this.warning=`Height ${this._toDisplayLength(r).toFixed(h)}${this.units} must exceed previous ${this._toDisplayLength(a).toFixed(h)}${this.units}.`,this.requestUpdate();return}if(i<0)return;const c={angleType:t,angleValue:e,travelType:s,travelValue:r};this.warning=null,this.segments=[...this.segments,c],this._baseViewBox=null,this._persist()}_addB(){const e=this.angleInputB,t=this.angleInputTypeB,i=t==="inclusive"?e:e*2,s=this.travelInputTypeB,r=this.thicknessInputB,n=this.segmentsB[this.segmentsB.length-1],l=(n==null?void 0:n.derivedWidth)??0,a=(n==null?void 0:n.derivedHeight)??0;if(s==="width"){if(r<=l){const h=this._displayDigits();this.warning=`Width ${this._toDisplayLength(r).toFixed(h)}${this.units} must exceed previous ${this._toDisplayLength(l).toFixed(h)}${this.units} (B).`,this.requestUpdate();return}if(i===0){this.warning="Zero angle only valid with height travel.";return}}else if(r<=a){const h=this._displayDigits();this.warning=`Height ${this._toDisplayLength(r).toFixed(h)}${this.units} must exceed previous ${this._toDisplayLength(a).toFixed(h)}${this.units} (B).`,this.requestUpdate();return}if(i<0)return;const c={angleType:t,angleValue:e,travelType:s,travelValue:r};this.warning=null,this.segmentsB=[...this.segmentsB,c],this._baseViewBox=null,this._persist()}_syncSegmentsToModels(){this._geometryA.setSegments(this.segments),this._geometryB.setSegments(this.segmentsB),this._recomputeAll()}_getSegments(e){return e==="A"?this.segments:this.segmentsB}_updateAngleType(e,t,i){const r=this._getSegments(e)[t];if(!r||r.angleType===i)return;i==="inclusive"&&r.angleType==="dps"?r.angleValue=r.angleValue*2:i==="dps"&&r.angleType==="inclusive"&&(r.angleValue=r.angleValue/2),r.angleType=i,(r.angleType==="inclusive"?r.angleValue:r.angleValue*2)===0&&r.travelType==="width"?this.warning="Zero angle only allowed when travel type is height.":this.warning="",this._syncSegmentsToModels(),this.requestUpdate()}_updateAngleValue(e,t,i){const s=this._getSegments(e),r=s[t];if(!r||isNaN(i)||i<0)return;if(s[t-1],r.angleValue=i,(r.angleType==="inclusive"?r.angleValue:r.angleValue*2)===0&&r.travelType==="width"){this.warning="Zero angle only allowed with height travel.";return}else this.warning="";this._syncSegmentsToModels(),this.requestUpdate()}_updateTravelType(e,t,i){const s=this._getSegments(e),r=s[t];if(!r||r.travelType===i)return;const c=(e==="A"?this._geometryA:this._geometryB).compute().map((h,d)=>({...s[d],derivedWidth:h.endWidth,derivedHeight:h.endY}))[t];if(i==="height")r.travelType="height",r.travelValue=c.derivedHeight??0;else{if((r.angleType==="inclusive"?r.angleValue:r.angleValue*2)===0){this.warning="Cannot switch to width travel with zero angle.";return}r.travelType="width",r.travelValue=c.derivedWidth??0}this.warning="",this._syncSegmentsToModels(),this.requestUpdate()}_updateTravelValue(e,t,i){const s=this._getSegments(e),r=s[t];if(!r||isNaN(i)||i<=0)return;const n=s[t-1];if(r.travelType==="width"){const a=(n==null?void 0:n.derivedWidth)??0;if(i<=a){const c=this._displayDigits();this.warning=`Width must exceed previous width (${this._toDisplayLength(a).toFixed(c)}${this.units}).`;return}}else{const a=(n==null?void 0:n.derivedHeight)??0;if(i<=a){const c=this._displayDigits();this.warning=`Height must exceed previous height (${this._toDisplayLength(a).toFixed(c)}${this.units}).`;return}}if(r.travelValue=i,(r.angleType==="inclusive"?r.angleValue:r.angleValue*2)===0&&r.travelType==="width"){this.warning="Zero angle only allowed with height travel.";return}this.warning="",this._syncSegmentsToModels(),this.requestUpdate()}_toDisplayLength(e){return this.units==="mm"?e:e/25.4}_fromDisplayLength(e){return this.units==="mm"?e:e*25.4}_displayDigits(){return this.units==="mm"?3:4}_formatLen(e,t=this._displayDigits()){return this._toDisplayLength(e).toFixed(t)}_clear(){this.segments=[],this.segmentsB=[],this._baseViewBox=null;try{localStorage.removeItem(this._storageKey)}catch{}}_recomputeAll(){this._computedA=this._geometryA.compute(),this._computedB=this._geometryB.compute()}_computeWithCurrentSegments(){return this.segments===this._geometryA.getSegments()?this._computedA:this._computedB}_path(e){if(!e.length)return"";let t="M 0 0";for(const i of e){const s=-i.endWidth/2,r=i.endY;t+=` L ${s} ${r}`}for(let i=e.length-1;i>=0;i--){const s=e[i],r=s.endWidth/2,n=s.endY;t+=` L ${r} ${n}`}return t+=" Z",t}_segmentPaths(e){return e.map(t=>{const{startWidth:i,endWidth:s,startY:r,endY:n}=t;return[`M ${-i/2} ${r}`,`L ${-s/2} ${n}`,`L ${s/2} ${n}`,`L ${i/2} ${r}`,"Z"].join(" ")})}_widthAtY(e,t){if(!e.length||t<=0)return 0;for(const i of e)if(t<=i.endY+1e-9){const s=i.endY-i.startY;if(s<=1e-9)return i.endWidth;const r=(t-i.startY)/s;return i.startWidth+(i.endWidth-i.startWidth)*r}return e[e.length-1].endWidth}_onAngle(e){this.angleInput=Number(e.target.value),this._persist()}_onAngleTypeChange(e){const t=e.target.value;t!==this.angleInputType&&(t==="inclusive"&&this.angleInputType==="dps"?this.angleInput=this.angleInput*2:t==="dps"&&this.angleInputType==="inclusive"&&(this.angleInput=this.angleInput/2),this.angleInputType=t,this._persist())}_onThickness(e){this.thicknessInput=Number(e.target.value),this._persist()}_onAngleB(e){this.angleInputB=Number(e.target.value),this._persist()}_onAngleTypeChangeB(e){const t=e.target.value;t!==this.angleInputTypeB&&(t==="inclusive"&&this.angleInputTypeB==="dps"?this.angleInputB=this.angleInputB*2:t==="dps"&&this.angleInputTypeB==="inclusive"&&(this.angleInputB=this.angleInputB/2),this.angleInputTypeB=t,this._persist())}_onThicknessB(e){this.thicknessInputB=Number(e.target.value),this._persist()}_onTravelTypeChange(e){const t=e.target.value;if(t===this.travelInputType)return;const i=this.segments[this.segments.length-1];if(t==="height"){const s=(i==null?void 0:i.derivedHeight)??0;this.thicknessInput=+(s+.2).toFixed(4)}else{const s=(i==null?void 0:i.derivedWidth)??0;this.thicknessInput=+(s+.1).toFixed(4)}this.travelInputType=t,this._persist()}_onTravelTypeChangeB(e){const t=e.target.value;if(t===this.travelInputTypeB)return;const i=this.segmentsB[this.segmentsB.length-1];if(t==="height"){const s=(i==null?void 0:i.derivedHeight)??0;this.thicknessInputB=+(s+.2).toFixed(4)}else{const s=(i==null?void 0:i.derivedWidth)??0;this.thicknessInputB=+(s+.1).toFixed(4)}this.travelInputTypeB=t,this._persist()}_onZoom(e){this.zoom=Number(e.target.value),this._customViewBox=null,this.regionZoomActive=!1,this._baseViewBox=null,this._persist()}_onPan(e){if(this.pan=Number(e.target.value)/100,this._customViewBox&&this._baseViewBox){const t=this._geometryA.getTotalHeight(),i=this._customViewBox.h,s=Math.max(0,t-i);this._customViewBox.y=s*this.pan}this._persist()}_toggleOverlay(){this.overlayMode=!this.overlayMode,this._persist()}_changeUnits(e){const t=e.target.value;(t==="mm"||t==="in")&&(this.units=t,this._persist())}_onOverlayCenter(e){this._userAdjustingCenter=!0;const t=Number(e.target.value),i=this._geometryA.getTotalHeight(),s=this.units==="mm"?t:t*25.4,r=Math.max(0,Math.min(i,s)),n=i===0?0:r/i;this.overlayCenter=n,this._customViewBox=null,this.regionZoomActive=!1,this._prevOverlayCenter=this.overlayCenter,this._triggerAdaptiveZoom(),this.requestUpdate(),this._persist(),this._userAdjustingCenter=!1}_onOverlayWidth(e){this._userAdjustingWidth=!0;const t=1e4,i=Number(e.target.value),s=Math.min(t,Math.max(0,i))/t,r=this._geometryMaxWidthMm(),n=this.units==="mm"?.001:1e-4*25.4,l=n+(r-n)*s;this.overlayTargetWidth=l,this._customViewBox=null,this.regionZoomActive=!1,this.requestUpdate(),this._persist(),this._userAdjustingWidth=!1,this._activeShrink=!1,this._activeExpand=!1,this.adaptiveZoomMode="idle"}_geometryMaxWidthMm(){const e=this._geometryA.getMaxWidth(),t=this._geometryB.getMaxWidth();return Math.max(e,t)*1.1}_onStrokePxMin(e){const t=Number(e.target.value);this.strokePxMin=Math.max(1,Math.min(500,t)),this.requestUpdate(),this._persist()}_syncOverlayFromViewBox(e=!0,t=!1){if(!this._customViewBox)return;const i=this._geometryA.compute(),s=this._geometryB.compute(),r=this._geometryA.getTotalHeight(),n=this._geometryB.getTotalHeight(),l=Math.max(r,n),a=this._customViewBox;this.overlayMode&&!t&&!this._userAdjustingWidth&&(this.overlayTargetWidth==null||a.w>this.overlayTargetWidth)&&(this.overlayTargetWidth=a.w);const c=a.y+a.h/2;let h=l>0?c/l:0;h<0?h=0:h>1&&(h=1),h<.001&&(h=0);const d=this.overlayCenter;this.overlayCenter=h,this._autoExpandTargetWidthAtCenter(i,s,l,d),this._prevOverlayCenter=this.overlayCenter,this.requestUpdate(),e&&this._persist()}_autoExpandTargetWidthAtCenter(e,t,i,s){if(!this.overlayMode||s!==void 0&&this.overlayCenter<=s||this.overlayCenter<.02)return;const r=e??this._computedA,n=t??this._computedB,l=i??Math.max(r.length?r[r.length-1].endY:0,n.length?n[n.length-1].endY:0),a=this.overlayCenter*l;let c=this._widthAtY(r,a),h=this._widthAtY(n,a),d=Math.max(c,h);if(d<1e-6){const S=Math.min(l,a+.001);c=this._widthAtY(r,S),h=this._widthAtY(n,S),d=Math.max(c,h)}const f=this.overlayTargetWidth??0;d>f*1.01&&(this.overlayTargetWidth=d*1.02,this._customViewBox=null,this.regionZoomActive=!1)}_triggerAdaptiveZoom(){if(!this.overlayMode||this._userAdjustingWidth)return;const e=this._computedA,t=this._computedB,i=Math.max(e.length?e[e.length-1].endY:0,t.length?t[t.length-1].endY:0);if(i<=0)return;const s=this.overlayCenter*i;let r=this._widthAtY(e,s),n=this._widthAtY(t,s),l=Math.max(r,n);if(l<1e-6&&(l=.02),this.overlayTargetWidth==null){this.overlayTargetWidth=l*1.05,this.adaptiveZoomMode="expand",this._activeExpand=!0,this.requestUpdate();return}const a=this.overlayTargetWidth,c=1.01,h=1.005,d=.3,f=.38,S=l/a;let u="idle";if((this._activeExpand||l>a*c)&&(l>a*c||this._activeExpand))if(l>a*h){const _=l*1.03,w=a+(_-a)*.25;this.overlayTargetWidth=w,u="expand",this._activeExpand=l/this.overlayTargetWidth<h}else this._activeExpand=!1;if(u==="idle"&&(this._activeShrink||S<d)&&(S<d||this._activeShrink))if(S<f){const _=l*1.25,w=this.units==="mm"?.001:1e-4*25.4;let y=a+(_-a)*.2;y<l*1.15&&(y=l*1.15),y<w&&(y=w),this.overlayTargetWidth=y,u="shrink",this._activeShrink=l/this.overlayTargetWidth<f}else this._activeShrink=!1;this.adaptiveZoomMode=u,u!=="idle"&&(this._customViewBox=null,this.regionZoomActive=!1,this.requestUpdate(),this._persist())}_dynamicViewportWidth(e){const t=Math.max(e*.4,.4),i=this.units==="mm"?.01:.01*25.4;return Math.max(i,e+t)}_logSampledWidth(){const e=this._computedA,t=this._computedB,i=Math.max(e.length?e[e.length-1].endY:0,t.length?t[t.length-1].endY:0),s=i>0?Math.min(i*5e-4,.001):.001,r=this.overlayCenter*i,n=r<s*4?s:r,l=this._widthAtY(e,n),a=this._widthAtY(t,n),c=Math.max(l,a),h=this._dynamicViewportWidth(c);console.log(`[Geom] sampled ${c.toFixed(5)}mm centerY=${r.toFixed(5)} viewport=${h.toFixed(5)}mm`)}_onSvgDblClick(e){const t=e.currentTarget,i=t.viewBox.baseVal,s=this._svgPoint(t,e),r=this._computedA,n=this._computedB,l=Math.max(r.length?r[r.length-1].endY:0,n.length?n[n.length-1].endY:0);if(l>0){let a=s.y/l;a<0&&(a=0),a>1&&(a=1),this.overlayCenter=a}this.showProfile||this._applyZoomAtPoint(s.x,s.y,.35,i,t,!1),this._persist()}_onSvgShiftDblClick(e){console.log("[Geom] shift dblclick svg","client",e.clientX,e.clientY);const t=e.currentTarget,i=t.viewBox.baseVal,s=this._svgPoint(t,e);this.showProfile||this._applyZoomAtPoint(s.x,s.y,2.857142857142857,i,t,!0)}_onPointerDownTap(e){if(e.pointerType!=="touch"&&e.pointerType!=="pen")return;const t=performance.now(),i=this.renderRoot.querySelector(".svg-wrap svg");if(!i)return;const s=this._svgPoint(i,e),r=t-this._lastTapTime;if(this._lastTapTime=t,r<320&&this._pendingTap){this._pendingTap=null;const n=new MouseEvent("dblclick",{clientX:e.clientX,clientY:e.clientY,bubbles:!0,cancelable:!0});this._onSvgDblClick(n)}else{this._pendingTap={x:s.x,y:s.y};const n=this._computedA,l=this._computedB,a=Math.max(n.length?n[n.length-1].endY:0,l.length?l[l.length-1].endY:0);if(a>0){let c=s.y/a;c<0&&(c=0),c>1&&(c=1),this.overlayCenter=c,this.requestUpdate(),this._persist()}setTimeout(()=>{this._pendingTap&&performance.now()-this._lastTapTime>320&&(this._pendingTap=null)},340)}}_applyZoomAtPoint(e,t,i,s,r,n){this._baseViewBox||(this._baseViewBox={x:s.x,y:s.y,w:s.width,h:s.height});let l=s.width*i,a=s.height*i;const c=.0254;if(!n&&l<c){const f=c/l;l=c,a=a*f}if(n&&(l>=this._baseViewBox.w||a>=this._baseViewBox.h)){this._customViewBox=null,this.regionZoomActive=!1,this.requestUpdate();return}const h=e-l/2,d=t-a/2;this._customViewBox={x:h,y:d,w:l,h:a},this.regionZoomActive=!0,this._syncOverlayFromViewBox(!1,!0),this.requestUpdate()}_resetZoom(){console.log("[Geom] reset zoom");const e=this._computeWithCurrentSegments(),t=e.length?e[e.length-1].endY:5,i=e.length?e[e.length-1].endWidth:2,s=t/this.zoom,r=i/this.zoom,n=r*.15,l=s*.05,a=-r/2-n,c=0,h=r+n*2,d=s+l;this._customViewBox={x:a,y:c,w:h,h:d},this._baseViewBox={x:a,y:c,w:h,h:d},this.regionZoomActive=!0,this.requestUpdate()}_svgPoint(e,t){const i=e.getBoundingClientRect(),s=e.viewBox.baseVal.width/i.width,r=e.viewBox.baseVal.height/i.height;let n=e.viewBox.baseVal.x+(t.clientX-i.left)*s,l=e.viewBox.baseVal.y+(t.clientY-i.top)*r;const a=i.height*.03;i.bottom-t.clientY<=a&&(l=0);const h=Math.abs(t.clientX-(i.left+i.width/2));return l===0&&h<=i.width*.03&&(n=0),{x:n,y:l}}_onWheel(e){if(e.preventDefault(),!this.overlayMode||this.showProfile)return;const t=this._geometryMaxWidthMm(),i=this.units==="mm"?.001:1e-4*25.4;let s=this.overlayTargetWidth??t;const r=e.deltaY>0?1:-1,n=e.altKey?.01:e.shiftKey?.15:.05,l=t-i,a=Math.min(10,Math.max(1,Math.round(Math.abs(e.deltaY)/100))),c=l*n*a*r*-1;let h=s+c;h<i&&(h=i),h>t&&(h=t),console.log("[Geom] wheel width change",{prev:s,next:h,units:this.units,deltaY:e.deltaY,steps:a,modifier:n}),this.overlayTargetWidth=h,this._customViewBox=null,this.regionZoomActive=!0,this.requestUpdate()}_logEvent(e,t){t instanceof MouseEvent?console.log(`[Geom] ${e}`,"type",t.type,"btn",t.button,"client",t.clientX,t.clientY,"shift",t.shiftKey):console.log(`[Geom] ${e}`,"type",t.type)}_onPanStart(e){if(e.button!==0)return;const t=this.renderRoot.querySelector(".svg-wrap svg");if(!t)return;const i=t.viewBox.baseVal;this._dragPanning=!0,this._dragStart={x:e.clientX,y:e.clientY,vbX:i.x,vbY:i.y,vbW:i.width,vbH:i.height},this._baseViewBox||(this._baseViewBox={x:i.x,y:i.y,w:i.width,h:i.height}),this._customViewBox||(this._customViewBox={x:i.x,y:i.y,w:i.width,h:i.height}),this.regionZoomActive=!0,window.addEventListener("mousemove",this._onPanMoveBound),window.addEventListener("mouseup",this._onPanEndBound),this._logEvent("pan-start",e),e.preventDefault()}_onPanMove(e){if(!this._dragPanning||!this._dragStart)return;const t=this.renderRoot.querySelector(".svg-wrap svg");if(!t)return;const i=this._dragStart,s=t.getBoundingClientRect(),r=i.vbW/s.width,n=i.vbH/s.height,l=Math.max(r,n),a=(e.clientX-i.x)*l,c=(e.clientY-i.y)*l,h=i.vbX-a,d=i.vbY-c;this._customViewBox={x:h,y:d,w:i.vbW,h:i.vbH},this._syncOverlayFromViewBox(),this.requestUpdate(),e.buttons===0&&this._onPanEnd(e)}_onPanEnd(e){this._dragPanning&&(this._dragPanning=!1,this._dragStart=null,window.removeEventListener("mousemove",this._onPanMoveBound),window.removeEventListener("mouseup",this._onPanEndBound),this._logEvent("pan-end",e))}_renderWidthSlider(e){const t=this._geometryMaxWidthMm(),i=this.units==="mm"?.001:1e-4*25.4;let s=this.overlayTargetWidth??t;s=Math.max(i,Math.min(t,s));const r=(s-i)/(t-i),n=1e4,l=Math.round(r*n),a=this._displayDigits(),c=(this.units==="mm"?t:t/25.4).toFixed(a),h=(this.units==="mm"?i:i/25.4).toFixed(a);return p`<div
      class="width-slider-box"
      style="margin-top:.5rem;display:flex;flex-direction:column;gap:.25rem;"
    >
      <div
        style="display:flex;justify-content:space-between;font-size:.55rem;opacity:.7;"
      >
        <span>${h} ${this.units}</span>
        <span>Target Width</span>
        <span>${c} ${this.units}</span>
        <div
          style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap;margin-top:.25rem;"
        >
          <input
            type="text"
            placeholder="Notation B (e.g. in=>10dps-1h,0.15w@2h,0.22w@4cp)"
            style="flex:1;min-width:14rem;font-size:.825rem;padding:.375rem .6rem;border:1px solid var(--vsa-border);border-radius:4px;"
            .value=${this.notationB}
            @input=${d=>{this.notationB=d.target.value}}
          />
          <button
            style="font-size:.55rem;padding:.3rem .6rem;border:1px solid var(--vsa-border);background:var(--vsa-input-bg);color:var(--sl-color-neutral-900);border-radius:4px;cursor:pointer;"
            @click=${()=>{const d=j(this.notationB,this.units);this.notationBWarnings=d.warnings,d.segments.length&&(this.segmentsB=d.segments.map(f=>({angleType:f.angleType,angleValue:f.angleValue,travelType:f.travelType,travelValue:f.travelValue})),this._customViewBox=null,this.overlayTargetWidth=null,this.requestUpdate(),this._persist(),d.notationUnits&&d.notationUnits!==this.units&&(this.units=d.notationUnits))}}
          >
            Import B
          </button>
        </div>
        ${this.notationBWarnings.length?p`<div
              style="font-size:.5rem;color:var(--vsa-warning-text-color);line-height:1.2;"
            >
              ${this.notationBWarnings.map(d=>p`<div>⚠ ${d}</div>`)}
            </div>`:""}
      </div>
      <div style="display:flex;align-items:center;gap:.4rem;">
        <input
          type="range"
          min="0"
          max="${n}"
          step="1"
          .value=${String(l)}
          @input=${this._onOverlayWidth}
          style="flex:1;"
        />
        <input
          type="number"
          style="width:6.5rem;font-size:.55rem;padding:.2rem;"
          .value=${(this.units==="mm"?s:s/25.4).toFixed(a)}
          @change=${d=>{const f=Number(d.target.value);if(!isFinite(f))return;const S=this.units==="mm"?f:f*25.4,u=Math.max(i,Math.min(t,S));this.overlayTargetWidth=u,this._customViewBox=null,this.requestUpdate()}}
        />
      </div>
      <div style="font-size:.6rem;opacity:.75;text-align:center;">
        Width: ${this._formatLen(this.overlayTargetWidth??s)}
        ${this.units}
      </div>
    </div>`}render(){const e=this._geometryA.compute(),t=this._geometryB.compute();console.log("Render - computedA:",e),console.log("Render - computedB:",t);const i=this._path(e),s=this._path(t);console.log("Render - pathA:",i),console.log("Render - pathB:",s);const r=this._segmentPaths(e),n=this._segmentPaths(t),l=this._geometryA.getTotalHeight(),a=this._geometryB.getTotalHeight(),c=Math.max(l,a),h=e.length?e[e.length-1].endWidth:2,d=t.length?t[t.length-1].endWidth:2,f=this.overlayMode?0:.4,S=this.overlayMode?Math.max(h,d):h+f+d;let u=this.overlayCenter*c;const _=c>0?Math.min(c*5e-4,.001):.001;if(!this.showProfile&&this.overlayMode&&this.overlayTargetWidth==null){const m=u<_*4?_:u,C=this._widthAtY(e,m),M=this._widthAtY(t,m),Je=Math.max(C,M,Math.max(h,d));this.overlayTargetWidth=Je}const w=u<_*4?_:u;let y;if(this.showProfile)y=S;else{const m=this._widthAtY(e,w),C=this._widthAtY(t,w),M=Math.max(m,C,1e-5);y=this._dynamicViewportWidth(M),this.overlayTargetWidth=y}const $=this.renderRoot.querySelector(".svg-wrap");let k=1;if($){const m=$.getBoundingClientRect();m.width>0&&m.height>0&&(k=m.height/m.width)}const T=y*k;let g=T;this.apexMacro&&!this.showProfile&&(g=T/5);const z=this.showProfile?-S/2:-y/2;let A;if(this.showProfile)A=0;else{A=c-u-g/2,A<0&&(A=0);const C=Math.max(0,c-g);A>C&&(A=C)}const P=this.showProfile?S:y,N=this.showProfile?c:g,ce=this.thinStrokes?.375:5;return this.units==="mm"||1/25.4,this.units,p` <div class="page ${this.fullScreen?"full-screen":""}">
      <h2>Geometry Builder (Knife Cross Section)</h2>
      <div
        style="display:flex;flex-direction:column;gap:.4rem;margin-bottom:.4rem;"
      >
        <div style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap;">
          <input
            type="text"
            placeholder="Notation A (e.g. mm=>15dps-2h,0.3w@3h,0.5w@5cp)"
            style="flex:1;min-width:14rem;font-size:.825rem;padding:.375rem .6rem;border:1px solid var(--vsa-border);border-radius:4px;"
            .value=${this.notationA}
            @input=${m=>{this.notationA=m.target.value}}
          />
          <button
            style="font-size:.55rem;padding:.3rem .6rem;border:1px solid var(--vsa-border);background:var(--vsa-input-bg);color:var(--sl-color-neutral-900);border-radius:4px;cursor:pointer;"
            @click=${()=>{const m=j(this.notationA,this.units);this.notationAWarnings=m.warnings,m.segments.length&&(this.segments=m.segments.map(C=>({angleType:C.angleType,angleValue:C.angleValue,travelType:C.travelType,travelValue:C.travelValue})),this._customViewBox=null,this.overlayTargetWidth=null,this.requestUpdate(),this._persist(),m.notationUnits&&m.notationUnits!==this.units&&(this.units=m.notationUnits))}}
          >
            Import A
          </button>
          <button
            style="font-size:.55rem;padding:.3rem .6rem;border:1px solid var(--vsa-border);background:var(--vsa-input-bg);color:var(--sl-color-neutral-900);border-radius:4px;cursor:pointer;"
            @click=${()=>{this._openWizard("A")}}
          >
            Build A
          </button>
          <input
            type="text"
            placeholder="Notation B (e.g. in=>10dps-1h,0.15w@2h,0.22w@4cp)"
            style="flex:1;min-width:14rem;font-size:.825rem;padding:.375rem .6rem;border:1px solid var(--vsa-border);border-radius:4px;"
            .value=${this.notationB}
            @input=${m=>{this.notationB=m.target.value}}
          />
          <button
            style="font-size:.55rem;padding:.3rem .6rem;border:1px solid var(--vsa-border);background:var(--vsa-input-bg);color:var(--sl-color-neutral-900);border-radius:4px;cursor:pointer;"
            @click=${()=>{const m=j(this.notationB,this.units);this.notationBWarnings=m.warnings,m.segments.length&&(this.segmentsB=m.segments.map(C=>({angleType:C.angleType,angleValue:C.angleValue,travelType:C.travelType,travelValue:C.travelValue})),this._customViewBox=null,this.overlayTargetWidth=null,this.requestUpdate(),this._persist(),m.notationUnits&&m.notationUnits!==this.units&&(this.units=m.notationUnits))}}
          >
            Import B
          </button>
          <button
            style="font-size:.55rem;padding:.3rem .6rem;border:1px solid var(--vsa-border);background:var(--vsa-input-bg);color:var(--sl-color-neutral-900);border-radius:4px;cursor:pointer;"
            @click=${()=>{this._openWizard("B")}}
          >
            Build B
          </button>
        </div>
        ${this.notationAWarnings.length?p`<div
              style="font-size:.5rem;color:var(--vsa-warning-text-color);line-height:1.2;"
            >
              ${this.notationAWarnings.map(m=>p`<div>⚠ ${m}</div>`)}
            </div>`:""}
        ${this.notationBWarnings.length?p`<div
              style="font-size:.5rem;color:var(--vsa-warning-text-color);line-height:1.2;"
            >
              ${this.notationBWarnings.map(m=>p`<div>⚠ ${m}</div>`)}
            </div>`:""}
      </div>
      ${this._renderNotationHelp()}
      <div class="controls-bar">
        <button
          style="font-size:.55rem;padding:.3rem .6rem;border:1px solid var(--vsa-border);background:var(--vsa-input-bg);color:var(--sl-color-neutral-900);border-radius:4px;cursor:pointer;"
          @click=${()=>{this.notationA="mm=>15dps-2h,0.3w@3h,0.5w@5cp,50H",this.notationB="mm=>12dps-2h,0.25w@3h,0.45w@5cp,50H";const m=j(this.notationA,this.units),C=j(this.notationB,this.units);console.log("Example - ResA segments:",m.segments),console.log("Example - ResB segments:",C.segments),m.segments.length&&(this.segments=m.segments.map(M=>({angleType:M.angleType,angleValue:M.angleValue,travelType:M.travelType,travelValue:M.travelValue})),console.log("Example - Set segments A:",this.segments),console.log("Example - GeometryA computed:",this._geometryA.compute())),C.segments.length&&(this.segmentsB=C.segments.map(M=>({angleType:M.angleType,angleValue:M.angleValue,travelType:M.travelType,travelValue:M.travelValue})),console.log("Example - Set segments B:",this.segmentsB),console.log("Example - GeometryB computed:",this._geometryB.compute())),this._customViewBox=null,this.overlayTargetWidth=null,this.requestUpdate(),this._persist()}}
        >
          Load Example
        </button>
        <label style="display:flex;align-items:center;gap:.25rem">
          <span style="font-size:.55rem">Units</span>
          <select
            @change=${this._changeUnits}
            style="font-size:.6rem;padding:.15rem .3rem;border-radius:4px;background:var(--vsa-input-bg);border:1px solid var(--vsa-border);color:var(--sl-color-neutral-900);"
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
        <label
          style="display:flex;align-items:center;gap:.3rem;font-size:.55rem;"
        >
          <input
            type="checkbox"
            .checked=${this.apexMacro}
            @change=${()=>{this.apexMacro=!this.apexMacro,this._customViewBox=null,this.requestUpdate(),this._persist()}}
          />
          Apex Macro
        </label>
        <label
          style="display:flex;align-items:center;gap:.3rem;font-size:.55rem;"
        >
          <input
            type="checkbox"
            .checked=${this.showProfile}
            @change=${()=>{this.showProfile=!this.showProfile,this._customViewBox=null,this.requestUpdate(),this._persist()}}
          />
          Show Profile
        </label>
      </div>
      ${this.fullScreen?p``:p` <div class="panels">
            <div class="editor-panel">
              <div class="panel-header">Geometry A (read-only)</div>
              <div class="seg-table-wrap">
                <table class="segments-edit">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Angle</th>
                      <th>Mode</th>
                      <th>Travel Type</th>
                      <th>Travel End</th>
                      <th>End W</th>
                      <th>End H</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${e.map((m,C)=>{const M=this.segments[C];return p`<tr>
                        <td>${C+1}</td>
                        <td>${M.angleValue}</td>
                        <td>${M.angleType}</td>
                        <td>${M.travelType}</td>
                        <td>${this._formatLen(M.travelValue)}</td>
                        <td>${this._formatLen(m.endWidth)}</td>
                        <td>${this._formatLen(m.endY)}</td>
                      </tr>`})}
                    ${e.length===0?p`<tr>
                          <td colspan="7" style="text-align:center;opacity:.6">
                            No segments
                          </td>
                        </tr>`:""}
                  </tbody>
                </table>
              </div>
            </div>
            <div class="editor-panel">
              <div class="panel-header">Geometry B (read-only)</div>
              <div class="seg-table-wrap">
                <table class="segments-edit">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Angle</th>
                      <th>Mode</th>
                      <th>Travel Type</th>
                      <th>Travel End</th>
                      <th>End W</th>
                      <th>End H</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${t.map((m,C)=>{const M=this.segmentsB[C];return p`<tr>
                        <td>${C+1}</td>
                        <td>${M.angleValue}</td>
                        <td>${M.angleType}</td>
                        <td>${M.travelType}</td>
                        <td>${this._formatLen(M.travelValue)}</td>
                        <td>${this._formatLen(m.endWidth)}</td>
                        <td>${this._formatLen(m.endY)}</td>
                      </tr>`})}
                    ${t.length===0?p`<tr>
                          <td colspan="7" style="text-align:center;opacity:.6">
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
        style="${this.fullScreen?"height:calc(100vh - 290px);width:100vw;":""}"
      >
        <div class="main-flex-row" style="gap:.75rem;">
          <div class="slider-column">
            ${this._renderVerticalSlider(c)}
          </div>
          <div class="svg-column">
            ${this._renderSvg(e,t,r,n,c,h,d,ce,_,z,A,P,N)}
          </div>
        </div>
      </div>
      ${this.showDebug?p`<div style="height:150px;overflow:auto;">
            ${this._renderDebug(_)}
          </div>`:""}
    </div>`}_renderNotationHelp(){return p`${this.fullScreen?"":p`
          <details style="margin-top:1rem;font-size:.58rem;line-height:1.35;">
            <summary style="cursor:pointer;font-weight:600;font-size:.62rem;">
              Notation Help
            </summary>
            <div
              style="margin-top:.5rem;display:flex;flex-direction:column;gap:.55rem;"
            >
              <div>
                <strong>Overview:</strong> A compact, comma-separated language
                describing the same vertical cross-section geometry (apex at
                bottom, spine upward). Tokens build successive segments
                increasing either absolute height or width.
              </div>
              <div>
                <strong>Unit Prefix:</strong> <code>mm=></code> or
                <code>in=></code> (optional). If omitted, current UI units are
                used. Explicit prefix also switches the builder units on import.
              </div>
              <div>
                <strong>Angle Modes:</strong> <code>dps</code> (degrees per
                side) or <code>inc</code>/<code>inclusive</code> (full
                included). Shorthand <code>d</code> or <code>i</code> accepted.
              </div>
              <div>
                <strong>Angle + Travel:</strong>
                <code>{angle}{mode}-{value}{axis}</code> <br />Axes:
                <code>h</code>/<code>height</code> = absolute target height;
                <code>w</code>/<code>width</code> = absolute target width
                (thickness). <br />Examples: <code>15dps-2.5h</code>,
                <code>12inc-0.4w</code>.
              </div>
              <div>
                <strong>Thickness at Height:</strong>
                <code>{thickness}w@{height}h</code> — declares absolute
                thickness at an absolute height. Angle is derived automatically.
                <br />Example: <code>0.25w@3h</code>
              </div>
              <div>
                <strong>Caliper (Face) Measurement:</strong>
                <code>{thickness}w@{slant}cp</code> — thickness after a slant
                distance ("caliper path") along one bevel face from previous
                point. Angle & vertical height increment solved
                trigonometrically. <br />Example: <code>0.22w@4cp</code>
                <br /><em
                  >Assumes linear bevel from last segment end; if no prior
                  angle, it derives a new one directly.</em
                >
              </div>
              <div>
                <strong>Apex Caliper Measurement:</strong>
                <code>{thickness}w@{distance}acp</code> — thickness where total
                caliper distance from apex to outer edge equals the specified
                value. Geometry is calculated to achieve this global measurement
                constraint. <br />Example: <code>0.5w@8acp</code> <br /><em
                  >Useful for working backwards from required caliper
                  specifications to blade geometry.</em
                >
              </div>
              <div>
                <strong>Overall Height:</strong> <code>{value}H</code> or
                <code>{value}oa</code> — optional total height. If larger than
                last segment, a zero-angle height extension is appended (no
                further width increase).
              </div>
              <div>
                <strong>Combined Forms (future expansion):</strong> Planned
                patterns like <code>10dps->0.20w@2.4h</code> (not yet
                implemented in this adapter) will force final thickness at a
                target height overriding supplied angle if inconsistent.
              </div>
              <div>
                <strong>Rules & Validation:</strong>
                <ul style="margin:0.25rem 0 0 1rem;padding:0;list-style:disc;">
                  <li>
                    Heights and widths must strictly increase per segment.
                  </li>
                  <li>
                    Zero angle only valid with height travel (parallel faces).
                  </li>
                  <li>Caliper thickness must exceed previous thickness.</li>
                  <li>Unrecognized tokens are skipped with a warning.</li>
                </ul>
              </div>
              <div>
                <strong>Angle Derivations:</strong>
                <ul style="margin:0.25rem 0 0 1rem;padding:0;list-style:disc;">
                  <li>From thickness@height: ΔW = 2 * ΔH * tan(θ/2).</li>
                  <li>
                    From caliper: ΔW = 2 * s * sin²(α) / cos(α), α = θ/2 (solved
                    numerically).
                  </li>
                  <li>
                    From apex caliper: height = √(distance² - (thickness/2)²),
                    then angle derived from geometry.
                  </li>
                </ul>
              </div>
              <div>
                <strong>Examples:</strong>
                <div style="margin-top:.25rem;">
                  <code>mm=>15dps-2h,0.30w@3h,0.40w@5cp,50H</code><br />
                  <em
                    >Apex to 2mm height via 15 dps, then set thickness 0.30 at
                    3mm, then caliper to 0.40 after 5mm slant, final overall
                    height 50mm.</em
                  >
                </div>
                <div style="margin-top:.35rem;">
                  <code>mm=>0.5w@8acp,0.8w@12cp,25H</code><br />
                  <em
                    >Start with 0.5mm thickness where apex caliper is 8mm, then
                    0.8mm after 12mm face caliper, finish at 25mm height.</em
                  >
                </div>
                <div style="margin-top:.35rem;">
                  <code>in=>12inc-0.05w,0.08w@0.15h,0.10w@3cp</code>
                </div>
              </div>
              <div>
                <strong>Warnings Display:</strong> Any skipped or adjusted
                tokens appear in the debug panel and immediately under the
                notation input fields.
              </div>
            </div>
          </details>
        `}`}_renderVerticalSlider(e){const t=this._displayDigits(),i=this.units,s=this.overlayCenter*e;(this.units==="mm"?s:s/25.4).toFixed(t),(this.units==="mm"?e:e/25.4).toFixed(t);const r=Math.round((e>0?s/e:0)*1e4);return p`<div
      class="vertical-slider-box"
      style="display:flex;flex-direction:column;align-items:center;${this.fullScreen?"height:100%;":""}"
    >
      <span style="font-size:.5rem;opacity:.7;"
        >Height
        (${i})${this.apexMacro?" - Apex Macro (0-3mm)":""}</span
      >
      <input
        type="range"
        min="0"
        max="10000"
        step="1"
        .value=${String(r)}
        @input=${n=>{const a=Number(n.target.value)/1e4;this.overlayCenter=e>0?a:0,this._customViewBox=null,this.requestUpdate()}}
        style="width:100%;flex:1 1 auto;"
      />
    </div>`}_renderControls(){return p``}_renderDebug(e){const t=this._geometryA.compute(),i=this._geometryB.compute(),s=Math.max(this._geometryA.getTotalHeight(),this._geometryB.getTotalHeight()),r=this.overlayCenter*s,n=r<e*4?e:r,l=this._geometryA.widthAtY(t,n),a=this._geometryB.widthAtY(i,n),c=this._displayDigits(),h=this.units,d=(this.units==="mm"?r:r/25.4).toFixed(c),f=(this.units==="mm"?l:l/25.4).toFixed(c),S=(this.units==="mm"?a:a/25.4).toFixed(c),u=l**3,_=a**3;let w,y;u===0&&_===0?(w=1,y="equal"):u>=_?(w=u/(_===0?Number.EPSILON:_),y=`A stronger x${w.toFixed(3)}`):(w=_/(u===0?Number.EPSILON:u),y=`B stronger x${w.toFixed(3)}`);const $=Math.abs(u-_)/Math.max(u,_||1)*100;return p`<div
      style="margin-top:.4rem;font-size:.6rem;background:var(--vsa-metrics-bg);padding:.55rem .7rem;border-radius:6px;line-height:1.2;"
    >
      <div style="font-weight:600;margin-bottom:.35rem;">
        Cross Section Metrics
      </div>
      <div>Height from apex: <strong>${d} ${h}</strong></div>
      <div>Thickness A: <strong>${f} ${h}</strong></div>
      <div>Thickness B: <strong>${S} ${h}</strong></div>
      <div style="margin-top:.35rem;font-weight:600;">
        Strength (thickness^3)
      </div>
      <div>A^3: ${u.toFixed(6)}</div>
      <div>B^3: ${_.toFixed(6)}</div>
      <div>Relative: ${y}</div>
      <div>Difference: ${$.toFixed(2)}%</div>
      ${this.notationA||this.notationB?p`<div style="margin-top:.5rem;font-weight:600;">Notation</div>`:""}
      ${this.notationA?p`<div style="opacity:.85;">
            A: <code style="font-size:.55rem;">${this.notationA}</code>
          </div>`:""}
      ${this.notationB?p`<div style="opacity:.85;">
            B: <code style="font-size:.55rem;">${this.notationB}</code>
          </div>`:""}
      ${this.notationAWarnings.length||this.notationBWarnings.length?p`<div style="margin-top:.35rem;font-weight:600;">Warnings</div>`:""}
      ${this.notationAWarnings.map(k=>p`<div style="color:var(--vsa-warning-text-color);">A ⚠ ${k}</div>`)}
      ${this.notationBWarnings.map(k=>p`<div style="color:var(--vsa-warning-text-color);">B ⚠ ${k}</div>`)}
    </div>`}_renderSvg(e,t,i,s,r,n,l,a,c,h,d,f,S){const u=this._path(e),_=this._path(t),w=this.overlayMode?p`
          ${u?I`<path d="${u}" fill="none" stroke="var(--vsa-path-a-color)" stroke-width="${a}" vector-effect="non-scaling-stroke"></path>`:""}
          ${_?I`<path d="${_}" fill="none" stroke="var(--vsa-path-b-color)" stroke-width="${a}" vector-effect="non-scaling-stroke"></path>`:""}
          ${(()=>{const $=a*.6,k=`${(a*.7).toFixed(0)} ${(a*.5).toFixed(0)}`,T=Array.from(new Set([...e.map(g=>g.endY),...t.map(g=>g.endY)])).sort((g,z)=>g-z);return I`${T.map(g=>{if(g<=0||g>=r-1e-9)return"";const z=this._widthAtY(e,g),A=this._widthAtY(t,g),N=Math.max(z,A)/2;return I`<line x1="${-N}" y1="${g}" x2="${N}" y2="${g}" stroke="var(--vsa-grid-line-color)" stroke-width="${$}" vector-effect="non-scaling-stroke" stroke-dasharray="${k}" opacity="0.5" />`})}`})()}
        `:p`${(()=>{const k=-(n/2+.3),T=l/2+.6/2,g=["#ffdd57","#74c0fc","#ffc9c9","#b197fc","#a9e34b","#ffa94d","#ffd8a8","#e599f7","#63e6be","#ff6b6b"];return I`
            <g transform="translate(${k},0)">
              ${i.map((z,A)=>I`<path d="${z}" fill="${g[A%g.length]}" stroke="var(--vsa-stroke-color)" stroke-width="${a}" vector-effect="non-scaling-stroke" opacity="0.95"></path>`)}
              ${u?I`<path d="${u}" fill="none" stroke="var(--vsa-path-a-color)" stroke-width="${a}" vector-effect="non-scaling-stroke"></path>`:""}
            </g>
            <g transform="translate(${T},0)">
              ${s.map((z,A)=>I`<path d="${z}" fill="${g[A%g.length]}" stroke="var(--vsa-stroke-color)" stroke-width="${a}" vector-effect="non-scaling-stroke" opacity="0.95"></path>`)}
              ${_?I`<path d="${_}" fill="none" stroke="var(--vsa-path-b-color)" stroke-width="${a}" vector-effect="non-scaling-stroke"></path>`:""}
            </g>`})()}`,y=(()=>{const $=this.overlayCenter*r,k=$<c*4?c:$;let T=this._widthAtY(e,k),g=this._widthAtY(t,k),z=Math.max(T,g);z<1e-9&&(z=.02);const A=z*1.05/2,P=(a*.6).toFixed(0),N=(a*.4).toFixed(0);return I`<g class="center-line-group" pointer-events="none">
        <line x1="${-A}" y1="${$}" x2="${A}" y2="${$}" stroke="var(--vsa-center-line-color)" stroke-width="${a}" vector-effect="non-scaling-stroke" stroke-dasharray="${P} ${N}" />
      </g>`})();return p`${u||_?I`<svg viewBox="${this._customViewBox?this._customViewBox.x:h} ${this._customViewBox?this._customViewBox.y:d} ${this._customViewBox?this._customViewBox.w:f} ${this._customViewBox?this._customViewBox.h:S}" preserveAspectRatio="xMidYMin meet">
      <g class="geom" transform="translate(0, ${r}) scale(1,-1)">
        ${w}
        ${y}
      </g>
    </svg>`:p`<div class="empty">
            Add segments to visualize cross section.
          </div>`}
    ${u||_?p`<div class="drag-overlay"></div>`:""}
    ${this._wizardOpen?this._renderWizard():""}
    </div>`}_openWizard(e){this._wizardSide=e,this._wizardOpen=!0,this._wizardNotationType="",this._wizardCurrentValueIndex=0,this._wizardValues={},this._wizardSegments=[],this._wizardEditingExisting=!1,this._wizardCurrentSegmentIndex=0;const t=e==="A"?this.notationA:this.notationB;t&&t.trim()?(this._parseExistingNotation(),this._wizardStep="segment-list"):(this._wizardUnits=this.units||"mm",this._wizardStep="units"),this.requestUpdate()}_closeWizard(){this._wizardOpen=!1,this.requestUpdate()}_wizardNextStep(){const e=["existing-check","segment-list","units","notation-type","value-entry","final-review"],t=e.indexOf(this._wizardStep);t<e.length-1&&(this._wizardStep=e[t+1],this.requestUpdate())}_wizardPrevStep(){switch(this._wizardStep){case"value-entry":this._wizardEditingExisting?this._wizardStep="segment-list":this._wizardStep="notation-type";break;case"notation-type":this._wizardStep="segment-list";break;case"segment-list":this._wizardSegments.length===0&&(this._wizardStep="units");break;default:const e=["units","segment-list","notation-type","value-entry","final-review"],t=e.indexOf(this._wizardStep);t>0&&(this._wizardStep=e[t-1]);break}this.requestUpdate()}_getNotationTypeConfig(e){return{"angle-travel":{name:"Angle + Travel",description:"Create geometry by specifying an angle and either a target height or width.",measurementGuide:"Use a protractor or angle gauge to measure the bevel angle. Measure height with calipers vertically from apex, or width with calipers across the blade thickness.",values:[{key:"angleMode",label:"Angle Mode",type:"select",options:["dps","inclusive"]},{key:"angle",label:"Angle",suffix:"°",type:"number"},{key:"travelMode",label:"Travel Mode",type:"select",options:["height","width"]},{key:"travel",label:"Target Value",suffix:this._wizardUnits,type:"number"}]},"thickness-height":{name:"Thickness @ Height",description:"Specify exact thickness at a specific height. The angle is calculated automatically.",measurementGuide:"Use precision calipers to measure blade thickness at the exact height position. Take photos with a scale for reference.",values:[{key:"thickness",label:"Thickness",suffix:this._wizardUnits,type:"number"},{key:"height",label:"Height",suffix:this._wizardUnits,type:"number"}]},caliper:{name:"Face Caliper",description:"Measure along the bevel face from the previous point to achieve target thickness.",measurementGuide:"Use calipers to measure the slant distance along the bevel face. This is useful for incremental measurements during grinding.",values:[{key:"thickness",label:"Target Thickness",suffix:this._wizardUnits,type:"number"},{key:"distance",label:"Slant Distance",suffix:this._wizardUnits,type:"number"}]},"apex-caliper":{name:"Apex Caliper",description:"Measure total distance from apex to outer edge at target thickness.",measurementGuide:"Use calipers to measure from the very apex (tip) to the outer edge of the blade at the specified thickness. This is a global constraint measurement.",values:[{key:"thickness",label:"Target Thickness",suffix:this._wizardUnits,type:"number"},{key:"distance",label:"Apex Distance",suffix:this._wizardUnits,type:"number"}]}}[e]}_buildNotationFromWizard(e=!1){if(!this._getNotationTypeConfig(this._wizardNotationType))return"";const i=e&&this._wizardUnits!==this.units?`${this._wizardUnits}=>`:"";switch(this._wizardNotationType){case"angle-travel":const s=this._wizardValues.angle,r=this._wizardValues.angleMode==="inclusive"?"inc":"dps",n=this._wizardValues.travel,l=this._wizardValues.travelMode==="height"?"h":"w";return`${i}${s}${r}-${n}${l}`;case"thickness-height":return`${i}${this._wizardValues.thickness}w@${this._wizardValues.height}h`;case"caliper":return`${i}${this._wizardValues.thickness}w@${this._wizardValues.distance}cp`;case"apex-caliper":return`${i}${this._wizardValues.thickness}w@${this._wizardValues.distance}acp`;default:return""}}_applyWizardToGeometry(){const e=this._buildNotationFromWizard();if(!e)return;const t=j(e,this._wizardUnits);if(t.segments.length){const i=t.segments.map(s=>({angleType:s.angleType,angleValue:s.angleValue,travelType:s.travelType,travelValue:s.travelValue}));this._wizardSide==="A"?(this.segments=[...this.segments,...i],this.notationA=this.notationA?`${this.notationA},${e}`:e):(this.segmentsB=[...this.segmentsB,...i],this.notationB=this.notationB?`${this.notationB},${e}`:e),this._customViewBox=null,this.overlayTargetWidth=null,this.requestUpdate(),this._persist()}this._closeWizard()}_renderWizard(){return p`
      <div
        style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: var(--vsa-card-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      "
      >
        <div
          style="
          background: var(--vsa-input-bg);
          border-radius: 8px;
          padding: 2rem;
          max-width: 90vw;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          border: 1px solid var(--vsa-border);
          color: var(--sl-color-neutral-900);
        "
        >
          > ${this._renderWizardStep()}
        </div>
      </div>
    `}_renderWizardStep(){switch(this._wizardStep){case"segment-list":return this._renderSegmentListStep();case"units":return this._renderUnitsStep();case"notation-type":return this._renderNotationTypeStep();case"value-entry":return this._renderValueEntryStep();case"final-review":return this._renderFinalReviewStep();default:return p`<div>Unknown wizard step</div>`}}_renderUnitsStep(){return p`
      <div style="text-align: center;">
        <h2 style="margin-top: 0;">
          Build Geometry for Side ${this._wizardSide}
        </h2>
        <p style="margin-bottom: 2rem; color: var(--sl-color-neutral-900);">
          Welcome to the Geometry Builder Wizard! Let's start by choosing your
          measurement units.
        </p>

        <div
          style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem;"
        >
          <button
            style="
            padding: 1rem 2rem;
            font-size: 1.1rem;
            border: 2px solid ${this._wizardUnits==="mm"?"var(--vsa-path-a-color)":"var(--vsa-border)"};
            background: ${this._wizardUnits==="mm"?"var(--vsa-path-a-color)":"var(--vsa-input-bg)"};
            color: ${this._wizardUnits==="mm"?"white":"var(--sl-color-neutral-900)"};
            border-radius: 8px;
            cursor: pointer;
          "
            @click=${()=>{this._wizardUnits="mm",this._wizardStep="segment-list",this.requestUpdate()}}
          >
            📏 Millimeters (mm)
          </button>

          <button
            style="
            padding: 1rem 2rem;
            font-size: 1.1rem;
            border: 2px solid ${this._wizardUnits==="in"?"var(--vsa-path-a-color)":"var(--vsa-border)"};
            background: ${this._wizardUnits==="in"?"var(--vsa-path-a-color)":"var(--vsa-input-bg)"};
            color: ${this._wizardUnits==="in"?"white":"var(--sl-color-neutral-900)"};
            border-radius: 8px;
            cursor: pointer;
          "
            @click=${()=>{this._wizardUnits="in",this._wizardStep="segment-list",this.requestUpdate()}}
          >
            📐 Inches (in)
          </button>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button
            style="
            padding: 0.75rem 1.5rem;
            border: 1px solid var(--vsa-border);
            background: var(--vsa-input-bg);
            color: var(--sl-color-neutral-900);
            border-radius: 4px;
            cursor: pointer;
          "
            @click=${this._closeWizard}
          >
            Cancel
          </button>

          <button
            style="
            padding: 0.75rem 1.5rem;
            border: 1px solid var(--vsa-path-a-color);
            background: var(--vsa-path-a-color);
            color: white;
            border-radius: 4px;
            cursor: pointer;
          "
            @click=${this._wizardNextStep}
          >
            Next →
          </button>
        </div>
      </div>
    `}_parseExistingNotation(){const e=this._wizardSide==="A"?this.notationA:this.notationB;if(!e)return;let t=e;if(t.includes("=>")){const[i,s]=t.split("=>");this._wizardUnits=i,t=s}else this._wizardUnits=this.units;this._wizardSegments=t.split(",").map(i=>i.trim()).filter(i=>i),this._wizardEditingExisting=!0}_startEditingExisting(){this._parseExistingNotation(),this._wizardStep="segment-list",this.requestUpdate()}_editSegmentFromList(e){const t=this._wizardSegments[e];t&&(this._parseSegmentIntoValues(t),this._wizardCurrentSegmentIndex=e,this._wizardEditingExisting=!0,this._wizardStep="value-entry",this.requestUpdate())}_parseSegmentIntoValues(e){if(this._wizardValues={},this._wizardNotationType="",e.includes("dps-")||e.includes("inc-")){this._wizardNotationType="angle-travel";const t=e.match(/^(\d+(?:\.\d+)?)(dps|inc)-/);t&&(this._wizardValues.angle=parseFloat(t[1]),this._wizardValues.angleMode=t[2]==="dps"?"dps":"inclusive");const i=e.match(/-(\d+(?:\.\d+)?)(h|w)$/);i&&(this._wizardValues.travel=parseFloat(i[1]),this._wizardValues.travelMode=i[2]==="h"?"height":"width")}else if(e.includes("w@")&&e.includes("h")){this._wizardNotationType="thickness-height";const t=e.match(/^(\d+(?:\.\d+)?)w@(\d+(?:\.\d+)?)h$/);t&&(this._wizardValues.thickness=parseFloat(t[1]),this._wizardValues.height=parseFloat(t[2]))}else if(e.includes("w@")&&e.includes("cp")){this._wizardNotationType="caliper";const t=e.match(/^(\d+(?:\.\d+)?)w@(\d+(?:\.\d+)?)cp$/);t&&(this._wizardValues.thickness=parseFloat(t[1]),this._wizardValues.distance=parseFloat(t[2]))}else if(e.includes("w@")&&e.includes("acp")){this._wizardNotationType="apex-caliper";const t=e.match(/^(\d+(?:\.\d+)?)w@(\d+(?:\.\d+)?)acp$/);t&&(this._wizardValues.thickness=parseFloat(t[1]),this._wizardValues.distance=parseFloat(t[2]))}}_addNewSegmentToList(){this._wizardValues={},this._wizardNotationType="",this._wizardCurrentSegmentIndex=this._wizardSegments.length,this._wizardEditingExisting=!1,this._wizardStep="notation-type",this.requestUpdate()}_deleteLastSegment(){this._wizardSegments.length>0&&(this._wizardSegments.pop(),this.requestUpdate())}_renderSegmentListStep(){const e=this._wizardSegments.length>0;return p`
      <div style="text-align: center; max-width: 700px;">
        <h2 style="margin-top: 0;">
          Build Geometry for Side ${this._wizardSide} (${this._wizardUnits})
        </h2>
        <p style="margin-bottom: 1.5rem; color: var(--sl-color-neutral-900);">
          ${e?"Edit existing segments, add new ones, or delete from the end.":"Start building your geometry by adding segments. Each segment defines a cut direction and distance."}
        </p>

        ${e?p`
              <div style="margin-bottom: 1.5rem;">
                <strong>Current Notation:</strong>
                <div
                  style="
              background: var(--vsa-input-bg);
              border: 1px solid var(--vsa-border);
              border-radius: 4px;
              padding: 1rem;
              margin-top: 0.5rem;
              font-family: monospace;
              font-size: 1.1rem;
              word-break: break-all;
            "
                >
                  ${this._wizardUnits}=>${this._wizardSegments.join(",")}
                </div>
              </div>

              <div style="margin-bottom: 2rem;">
                <strong>Segments:</strong>
                <div style="margin-top: 0.5rem; text-align: left;">
                  ${this._wizardSegments.map((t,i)=>p`
                      <div
                        style="
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    padding: 0.75rem; 
                    margin-bottom: 0.5rem; 
                    background: var(--vsa-input-bg); 
                    border: 1px solid var(--vsa-border); 
                    border-radius: 4px;
                  "
                      >
                        <span
                          style="font-family: monospace; font-size: 1.1rem;"
                        >
                          ${i+1}. ${t}
                        </span>
                        <button
                          style="
                      padding: 0.5rem 1rem; 
                      border: 1px solid var(--vsa-path-a-color); 
                      background: rgba(59, 130, 246, 0.1);
                      color: var(--vsa-path-a-color);
                      border-radius: 4px; 
                      cursor: pointer; 
                      font-weight: 600;
                    "
                          @click=${()=>this._editSegmentFromList(i)}
                        >
                          📝 Edit
                        </button>
                      </div>
                    `)}
                </div>
              </div>
            `:""}

        <div
          style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.5rem;"
        >
          <button
            style="
            padding: 0.75rem 1.5rem;
            border: 1px solid var(--vsa-path-a-color);
            background: rgba(59, 130, 246, 0.1);
            color: var(--vsa-path-a-color);
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            font-size: 1.1rem;
          "
            @click=${this._addNewSegmentToList}
          >
            + Add New Segment
          </button>

          ${e?p`
                <button
                  style="
            padding: 0.75rem 1.5rem;
            border: 1px solid var(--vsa-warn-color);
            background: rgba(201, 42, 42, 0.1);
            color: var(--vsa-warn-color);
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
          "
                  @click=${this._deleteLastSegment}
                >
                  🗑️ Delete Last
                </button>
              `:""}
        </div>

        <div
          style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;"
        >
          ${e?"":p`
                <button
                  style="
              padding: 0.75rem 1.5rem;
              border: 1px solid var(--vsa-border);
              background: var(--vsa-input-bg);
              color: var(--sl-color-neutral-900);
              border-radius: 4px;
              cursor: pointer;
            "
                  @click=${()=>{this._wizardStep="units",this.requestUpdate()}}
                >
                  ← Change Units
                </button>
              `}

          <button
            style="
            padding: 0.75rem 1.5rem;
            border: 1px solid var(--vsa-border);
            background: var(--vsa-input-bg);
            color: var(--sl-color-neutral-900);
            border-radius: 4px;
            cursor: pointer;
          "
            @click=${this._closeWizard}
          >
            Cancel
          </button>

          ${e?p`
                <button
                  style="
              padding: 0.75rem 1.5rem;
              border: 1px solid var(--vsa-path-a-color);
              background: var(--vsa-path-a-color);
              color: white;
              border-radius: 4px;
              cursor: pointer;
              font-weight: 600;
            "
                  @click=${()=>{const t=this._wizardUnits+"=>"+this._wizardSegments.join(",");this._wizardSide==="A"?this.notationA=t:this.notationB=t,this._closeWizard()}}
                >
                  ✅ Apply & Close
                </button>
              `:""}
        </div>
      </div>
    `}_renderExistingCheckStep(){const e=this._wizardSide==="A"?this.notationA:this.notationB;return p`
      <div style="text-align: center; max-width: 600px;">
        <h2 style="margin-top: 0;">
          Side ${this._wizardSide} has existing geometry
        </h2>

        <div style="margin-bottom: 2rem;">
          <strong>Current notation:</strong>
          <div
            style="
            background: var(--vsa-input-bg);
            border: 1px solid var(--vsa-border);
            border-radius: 4px;
            padding: 1rem;
            margin-top: 0.5rem;
            font-family: monospace;
            font-size: 1.1rem;
            word-break: break-all;
          "
          >
            ${e}
          </div>
        </div>

        <p style="margin-bottom: 2rem; color: var(--sl-color-neutral-900);">
          What would you like to do?
        </p>

        <div
          style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;"
        >
          <button
            style="
            padding: 1rem 2rem;
            border: 1px solid var(--vsa-path-a-color);
            background: rgba(59, 130, 246, 0.1);
            color: var(--vsa-path-a-color);
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 1.1rem;
          "
            @click=${()=>{this._startEditingExisting()}}
          >
            📝 Edit Existing Geometry
          </button>

          <button
            style="
            padding: 1rem 2rem;
            border: 1px solid var(--vsa-border);
            background: var(--vsa-input-bg);
            color: var(--sl-color-neutral-900);
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 1.1rem;
          "
            @click=${()=>{this._wizardSide==="A"?this.notationA="":this.notationB="",this._wizardStep="units",this.requestUpdate()}}
          >
            🗑️ Start Fresh (Clear & Rebuild)
          </button>
        </div>

        <div style="display: flex; justify-content: center;">
          <button
            style="
            padding: 0.75rem 1.5rem;
            border: 1px solid var(--vsa-border);
            background: var(--vsa-input-bg);
            color: var(--sl-color-neutral-900);
            border-radius: 4px;
            cursor: pointer;
          "
            @click=${this._closeWizard}
          >
            Cancel
          </button>
        </div>
      </div>
    `}_renderNotationTypeStep(){return p`
      <div style="text-align: center;">
        <h2 style="margin-top: 0;">Choose Measurement Type</h2>
        <p style="margin-bottom: 2rem; color: var(--sl-color-neutral-900);">
          Select the type of measurement you want to create:
        </p>

        <div
          style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;"
        >
          ${[{id:"angle-travel",name:"🔺 Angle + Travel",desc:"Specify angle and target height/width"},{id:"thickness-height",name:"📏 Thickness @ Height",desc:"Exact thickness at specific height"},{id:"caliper",name:"📐 Face Caliper",desc:"Measure along bevel face"},{id:"apex-caliper",name:"🎯 Apex Caliper",desc:"Total distance from apex to edge"}].map(t=>p`
              <button
                style="
              padding: 1rem;
              text-align: left;
              border: 2px solid ${this._wizardNotationType===t.id?"var(--vsa-path-a-color)":"var(--vsa-border)"};
              background: ${this._wizardNotationType===t.id?"rgba(59, 130, 246, 0.1)":"var(--vsa-input-bg)"};
              color: var(--sl-color-neutral-900);
              border-radius: 8px;
              cursor: pointer;
            "
                @click=${()=>{this._wizardNotationType=t.id,this.requestUpdate(),setTimeout(()=>this._wizardNextStep(),100)}}
              >
                <div
                  style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.25rem;"
                >
                  ${t.name}
                </div>
                <div style="font-size: 0.9rem; opacity: 0.8;">${t.desc}</div>
              </button>
            `)}
        </div>

        <div style="display: flex; justify-content: center;">
          <button
            style="
            padding: 0.75rem 1.5rem;
            border: 1px solid var(--vsa-border);
            background: var(--vsa-input-bg);
            color: var(--sl-color-neutral-900);
            border-radius: 4px;
            cursor: pointer;
          "
            @click=${this._wizardPrevStep}
          >
            ← Back
          </button>
        </div>
      </div>
    `}_renderValueEntryStep(){const e=this._getNotationTypeConfig(this._wizardNotationType);return e?(this._wizardValues.angleMode||(this._wizardValues.angleMode="dps"),this._wizardValues.travelMode||(this._wizardValues.travelMode="height"),p`
      <div
        style="max-width: 1000px; display: flex; gap: 2rem; flex-wrap: wrap;"
      >
        <!-- Help Panel -->
        <div style="flex: 1; min-width: 300px; max-width: 400px;">
          <h3 style="margin-top: 0; color: var(--vsa-path-a-color);">
            📋 ${e.name} - How to Measure
          </h3>
          <div
            style="
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid var(--vsa-path-a-color);
            border-radius: 8px;
            padding: 1.5rem;
            text-align: left;
          "
          >
            <p
              style="margin: 0; line-height: 1.6; color: var(--sl-color-neutral-900);"
            >
              ${e.measurementGuide}
            </p>
          </div>
          <p
            style="margin-top: 1rem; font-size: 0.9rem; color: var(--sl-color-neutral-700); text-align: left;"
          >
            <strong>Description:</strong> ${e.description}
          </p>
        </div>

        <!-- Entry Panel -->
        <div style="flex: 1; min-width: 300px; max-width: 500px;">
          <h3 style="margin-top: 0;">Enter Measurement Values</h3>
          <p style="margin-bottom: 1.5rem; color: var(--sl-color-neutral-900);">
            Please enter each measurement value:
          </p>

          <div
            style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem;"
          >
            ${e.values.map(t=>p`
                <div style="text-align: left;">
                  <label
                    style="display: block; margin-bottom: 0.5rem; font-weight: 600;"
                  >
                    ${t.label}${t.suffix?` (${t.suffix})`:""}:
                  </label>
                  ${t.key==="angleMode"?p`
                        <!-- Radio buttons for angle mode -->
                        <div
                          style="display: flex; gap: 1rem; margin-bottom: 0.5rem;"
                        >
                          <label
                            style="display: flex; align-items: center; cursor: pointer;"
                          >
                            <input
                              type="radio"
                              name="angleMode"
                              value="dps"
                              .checked=${this._wizardValues.angleMode==="dps"}
                              @change=${i=>{this._wizardValues.angleMode=i.target.value,this.requestUpdate()}}
                              style="margin-right: 0.5rem;"
                            />
                            📐 DPS
                          </label>
                          <label
                            style="display: flex; align-items: center; cursor: pointer;"
                          >
                            <input
                              type="radio"
                              name="angleMode"
                              value="inclusive"
                              .checked=${this._wizardValues.angleMode==="inclusive"}
                              @change=${i=>{this._wizardValues.angleMode=i.target.value,this.requestUpdate()}}
                              style="margin-right: 0.5rem;"
                            />
                            📏 Inclusive
                          </label>
                        </div>
                        <div
                          style="font-size: 0.85rem; color: var(--sl-color-neutral-700); margin-bottom: 0.5rem;"
                        >
                          ${this._wizardValues.angleMode==="dps"?"DPS: Each side's angle from centerline (15° DPS = 30° total)":this._wizardValues.angleMode==="inclusive"?"Inclusive: Total angle between faces (30° inclusive = 15° per side)":"Choose how you want to specify the angle"}
                        </div>
                      `:t.key==="travelMode"?p`
                        <!-- Radio buttons for travel mode -->
                        <div
                          style="display: flex; gap: 1rem; margin-bottom: 0.5rem;"
                        >
                          <label
                            style="display: flex; align-items: center; cursor: pointer;"
                          >
                            <input
                              type="radio"
                              name="travelMode"
                              value="height"
                              .checked=${this._wizardValues.travelMode==="height"}
                              @change=${i=>{this._wizardValues.travelMode=i.target.value,this.requestUpdate()}}
                              style="margin-right: 0.5rem;"
                            />
                            📏 Height
                          </label>
                          <label
                            style="display: flex; align-items: center; cursor: pointer;"
                          >
                            <input
                              type="radio"
                              name="travelMode"
                              value="width"
                              .checked=${this._wizardValues.travelMode==="width"}
                              @change=${i=>{this._wizardValues.travelMode=i.target.value,this.requestUpdate()}}
                              style="margin-right: 0.5rem;"
                            />
                            📐 Width
                          </label>
                        </div>
                        <div
                          style="font-size: 0.85rem; color: var(--sl-color-neutral-700); margin-bottom: 0.5rem;"
                        >
                          ${this._wizardValues.travelMode==="height"?"Height: Vertical distance from apex downward":this._wizardValues.travelMode==="width"?"Width: Thickness of the blade at the target location":"Choose what measurement type to target"}
                        </div>
                      `:t.type==="select"?p`
                        <select
                          style="
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid var(--vsa-border);
                    border-radius: 4px;
                    background: var(--vsa-input-bg);
                    color: var(--sl-color-neutral-900);
                    font-size: 1rem;
                  "
                          @change=${i=>{this._wizardValues[t.key]=i.target.value,this.requestUpdate()}}
                        >
                          <option value="">Choose...</option>
                          ${"options"in t?t.options.map(i=>p`
                                  <option
                                    value="${i}"
                                    ?selected=${this._wizardValues[t.key]===i}
                                  >
                                    ${i==="dps"?"Degrees Per Side (DPS)":i==="inclusive"?"Inclusive Angle":i==="height"?"Height (vertical)":i==="width"?"Width (thickness)":i}
                                  </option>
                                `):""}
                        </select>
                      `:p`
                        <input
                          type="number"
                          step="0.001"
                          style="
                      width: 100%;
                      padding: 0.75rem;
                      border: 1px solid var(--vsa-border);
                      border-radius: 4px;
                      background: var(--vsa-input-bg);
                      color: var(--sl-color-neutral-900);
                      font-size: 1rem;
                    "
                          .value=${String(this._wizardValues[t.key]||"")}
                          @input=${i=>{this._wizardValues[t.key]=Number(i.target.value),this.requestUpdate()}}
                        />
                      `}
                </div>
              `)}
          </div>

          <div style="display: flex; gap: 1rem; justify-content: center;">
            <button
              style="
              padding: 0.75rem 1.5rem;
              border: 1px solid var(--vsa-border);
              background: var(--vsa-input-bg);
              color: var(--sl-color-neutral-900);
              border-radius: 4px;
              cursor: pointer;
            "
              @click=${this._wizardPrevStep}
            >
              ← Back
            </button>

            <button
              style="
              padding: 0.75rem 1.5rem;
              border: 1px solid var(--vsa-path-a-color);
              background: var(--vsa-path-a-color);
              color: white;
              border-radius: 4px;
              cursor: pointer;
            "
              @click=${()=>{this._saveCurrentSegment(),this._wizardStep="segment-list",this.requestUpdate()}}
            >
              Complete Segment →
            </button>
          </div>
        </div>
      </div>
    `):p`<div>Error: Unknown notation type</div>`}_saveCurrentSegment(){const e=this._buildNotationFromWizard();this._wizardEditingExisting&&this._wizardCurrentSegmentIndex<this._wizardSegments.length?this._wizardSegments[this._wizardCurrentSegmentIndex]=e:this._wizardSegments.push(e),this._wizardValues={},this._wizardNotationType=""}_addAnotherSegment(){this._saveCurrentSegment(),this._wizardEditingExisting?this._wizardStep="segment-list":(this._wizardCurrentSegmentIndex=this._wizardSegments.length,this._wizardStep="notation-type"),this.requestUpdate()}_completeGeometry(){if(this._saveCurrentSegment(),this._wizardEditingExisting){const t=(this._wizardUnits!==this.units?`${this._wizardUnits}=>`:"")+this._wizardSegments.join(",");this._wizardSide==="A"?this.notationA=t:this.notationB=t,this._closeWizard()}else this._wizardStep="final-review";this.requestUpdate()}_editWizardSegment(e){console.log("Edit segment",e)}_renderSegmentCompleteStep(){const e=this._buildNotationFromWizard(),i=(this._wizardUnits!==this.units?`${this._wizardUnits}=>`:"")+[...this._wizardSegments,e].join(",");return p`
      <div style="text-align: center; max-width: 700px;">
        <h2 style="margin-top: 0;">Segment Complete</h2>

        <div style="margin-bottom: 1.5rem;">
          <strong>Current Segment:</strong>
          <div
            style="
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid var(--vsa-path-a-color);
            border-radius: 4px;
            padding: 1rem;
            margin-top: 0.5rem;
            font-family: monospace;
            font-size: 1.1rem;
          "
          >
            ${e}
          </div>
        </div>

        ${this._wizardSegments.length>0?p`
              <div style="margin-bottom: 1.5rem;">
                <strong>Building Complete Notation:</strong>
                <div
                  style="
              background: var(--vsa-input-bg);
              border: 1px solid var(--vsa-border);
              border-radius: 4px;
              padding: 1rem;
              margin-top: 0.5rem;
              font-family: monospace;
              font-size: 1.1rem;
              text-align: left;
            "
                >
                  ${this._wizardSegments.map((s,r)=>p`
                      <div style="margin-bottom: 0.25rem;">
                        ${r+1}. ${s}
                      </div>
                    `)}
                  <div
                    style="margin-bottom: 0.25rem; color: var(--vsa-path-a-color); font-weight: bold;"
                  >
                    ${this._wizardSegments.length+1}. ${e} ←
                    current
                  </div>
                  <hr
                    style="margin: 0.5rem 0; border: none; border-top: 1px dashed var(--vsa-border);"
                  />
                  <strong>Full notation: ${i}</strong>
                </div>
              </div>
            `:""}

        <div style="margin-bottom: 2rem;">
          <p style="color: var(--sl-color-neutral-900);">
            What would you like to do next?
          </p>
        </div>

        <div
          style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;"
        >
          <button
            style="
            padding: 0.75rem 1.5rem;
            border: 1px solid var(--vsa-border);
            background: var(--vsa-input-bg);
            color: var(--sl-color-neutral-900);
            border-radius: 4px;
            cursor: pointer;
          "
            @click=${this._wizardPrevStep}
          >
            ← Edit This Segment
          </button>

          <button
            style="
            padding: 0.75rem 1.5rem;
            border: 1px solid var(--vsa-path-a-color);
            background: rgba(59, 130, 246, 0.1);
            color: var(--vsa-path-a-color);
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
          "
            @click=${()=>{this._saveCurrentSegment(),this._wizardStep="segment-list",this.requestUpdate()}}
          >
            ← Back to Segment List
          </button>
        </div>
      </div>
    `}_renderFinalReviewStep(){const t=(this._wizardUnits!==this.units?`${this._wizardUnits}=>`:"")+this._wizardSegments.join(",");return p`
      <div style="text-align: center; max-width: 700px;">
        <h2 style="margin-top: 0;">Final Review</h2>

        <div style="margin-bottom: 1.5rem;">
          <strong>Complete Notation for Side ${this._wizardSide}:</strong>
          <div
            style="
            background: var(--vsa-input-bg);
            border: 2px solid var(--vsa-path-a-color);
            border-radius: 8px;
            padding: 1.5rem;
            margin-top: 0.5rem;
            font-family: monospace;
            font-size: 1.2rem;
            word-break: break-all;
          "
          >
            ${t}
          </div>
        </div>

        <div style="margin-bottom: 1.5rem; text-align: left;">
          <strong>Segments:</strong>
          <div style="margin-top: 0.5rem;">
            ${this._wizardSegments.map((i,s)=>p`
                <div
                  style="
                  display: flex; 
                  justify-content: space-between; 
                  align-items: center; 
                  padding: 0.5rem; 
                  margin-bottom: 0.25rem; 
                  background: var(--vsa-input-bg); 
                  border: 1px solid var(--vsa-border); 
                  border-radius: 4px;
                "
                >
                  <span>${s+1}. ${i}</span>
                  <button
                    style="
                    padding: 0.25rem 0.5rem; 
                    border: 1px solid var(--vsa-border); 
                    background: transparent; 
                    border-radius: 3px; 
                    cursor: pointer; 
                    font-size: 0.8rem;
                  "
                    @click=${()=>this._editWizardSegment(s)}
                  >
                    Edit
                  </button>
                </div>
              `)}
          </div>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button
            style="
            padding: 0.75rem 1.5rem;
            border: 1px solid var(--vsa-border);
            background: var(--vsa-input-bg);
            color: var(--sl-color-neutral-900);
            border-radius: 4px;
            cursor: pointer;
          "
            @click=${this._addAnotherSegment}
          >
            + Add Another Segment
          </button>

          <button
            style="
            padding: 0.75rem 1.5rem;
            border: 1px solid var(--vsa-path-a-color);
            background: var(--vsa-path-a-color);
            color: white;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
          "
            @click=${()=>{this._wizardSide==="A"?this.notationA=t:this.notationB=t,this._closeWizard()}}
          >
            Apply to Side ${this._wizardSide}
          </button>
        </div>
      </div>
    `}};$e.styles=ye`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      --vsa-border: #4a2d00;
      --vsa-row-alt: #f3efe7;
      --vsa-card-bg: #fffefa;
      --vsa-input-bg: #fff;
      --vsa-warn-color: #c92a2a;
      --vsa-grid-line-color: #444;
      --vsa-path-a-color: #0a58ca;
      --vsa-path-b-color: #c92a2a;
      --vsa-warning-text-color: #b08900;
      --vsa-metrics-bg: rgba(0, 0, 0, 0.05);
      --vsa-stroke-color: #000;
      --vsa-center-line-color: #000;
    }

    /* Dark mode overrides */
    :host-context(.dark) {
      --vsa-border: var(--sl-color-neutral-700);
      --vsa-row-alt: var(--sl-color-neutral-800);
      --vsa-card-bg: var(--sl-color-neutral-900);
      --vsa-input-bg: var(--sl-color-neutral-800);
      --vsa-warn-color: #ff6b6b;
      --vsa-grid-line-color: #666;
      --vsa-path-a-color: #4dabf7;
      --vsa-path-b-color: #ff8787;
      --vsa-warning-text-color: #ffd43b;
      --vsa-metrics-bg: rgba(255, 255, 255, 0.05);
      --vsa-stroke-color: #ccc;
      --vsa-center-line-color: #ffd43b;
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
      background: var(--vsa-input-bg);
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
      background: var(--vsa-input-bg);
    }
    .actions-cell {
      text-align: center;
    }
    .warn {
      color: var(--vsa-warn-color);
      font-size: 0.6rem;
      margin: 0.4rem 0;
    }
    .svg-wrap {
      border: 2px solid var(--vsa-border);
      background: var(--vsa-card-bg);
      padding: 0.55rem 0.6rem 0.7rem;
      border-radius: 8px;
      position: relative;
      margin-top: 0.7rem;
      height: 60vh; /* stabilize non-fullscreen height */
      max-height: 60vh;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
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
    /* ensure internal row stretches inside both modes */
    .svg-wrap .main-flex-row {
      flex: 1 1 auto;
      min-height: 0;
    }
    /* Base (non-fullscreen) flex layout for main content row */
    .main-flex-row {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: 0.75rem; /* matches inline gap */
      width: 100%;
      min-height: 0;
    }
    .slider-column {
      flex: 0 0 60px; /* fixed narrow column for vertical slider */
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .slider-column .vertical-slider-box {
      flex: 1 1 auto;
      height: auto;
      min-height: 0;
    }
    .svg-column {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      position: relative;
      min-height: 0;
    }
    .svg-column svg {
      flex: 1 1 auto;
      height: auto;
      min-height: 0;
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
      border: 2px solid var(--vsa-border);
      padding: 0.4rem 0.35rem 0.45rem;
      border-radius: 6px;
      background: var(--vsa-card-bg);
      box-sizing: border-box;
      /* Allow flex parent to dictate height; remove fixed vh sizing */
      flex: 1 1 auto;
      min-height: 0;
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
      border: 1px solid var(--vsa-border);
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
      background: var(--vsa-border);
      color: var(--sl-color-neutral-0, #fff);
    }
    .metrics {
      margin-top: 0.35rem;
      font-size: 0.58rem;
      background: var(--vsa-metrics-bg);
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
      background: var(--vsa-input-bg);
      border-radius: 4px;
    }
  `;let v=$e;b([x({type:Number})],v.prototype,"angleInput",2);b([x({type:Number})],v.prototype,"thicknessInput",2);b([x({type:Number})],v.prototype,"angleInputB",2);b([x({type:Number})],v.prototype,"thicknessInputB",2);b([x({type:String})],v.prototype,"angleInputType",2);b([x({type:String})],v.prototype,"angleInputTypeB",2);b([x({type:String})],v.prototype,"travelInputType",2);b([x({type:String})],v.prototype,"travelInputTypeB",2);b([x({type:Number})],v.prototype,"zoom",2);b([x({type:Number})],v.prototype,"pan",2);b([x({type:Array,attribute:!1})],v.prototype,"segments",1);b([x({type:Array,attribute:!1})],v.prototype,"segmentsB",1);b([B()],v.prototype,"warning",2);b([x({type:String})],v.prototype,"units",2);b([x({type:Boolean})],v.prototype,"regionZoomActive",2);b([x({type:Boolean})],v.prototype,"overlayMode",2);b([x({type:Number})],v.prototype,"overlayCenter",2);b([x({type:Number})],v.prototype,"overlayTargetWidth",2);b([B()],v.prototype,"showProfile",2);b([B()],v.prototype,"notationA",2);b([B()],v.prototype,"notationB",2);b([B()],v.prototype,"notationAWarnings",2);b([B()],v.prototype,"notationBWarnings",2);b([B()],v.prototype,"_fullScreen",2);b([x({type:Number})],v.prototype,"strokePxMin",2);b([x({type:Boolean})],v.prototype,"showDebug",2);b([x({type:Boolean})],v.prototype,"apexMacro",1);b([B()],v.prototype,"thinStrokes",2);b([B()],v.prototype,"adaptiveZoomMode",2);b([B()],v.prototype,"_wizardOpen",2);b([B()],v.prototype,"_wizardStep",2);b([B()],v.prototype,"_wizardUnits",2);b([B()],v.prototype,"_wizardNotationType",2);b([B()],v.prototype,"_wizardCurrentValueIndex",2);b([B()],v.prototype,"_wizardValues",2);b([B()],v.prototype,"_wizardSegments",2);b([B()],v.prototype,"_wizardCurrentSegmentIndex",2);b([B()],v.prototype,"_wizardEditingExisting",2);b([B()],v.prototype,"_wizardSide",2);customElements.define("vsa-geometry-builder",v);var Dt=Object.defineProperty,W=(o,e,t,i)=>{for(var s=void 0,r=o.length-1,n;r>=0;r--)(n=o[r])&&(s=n(e,t,s)||s);return s&&Dt(e,t,s),s};const ke=class ke extends q{constructor(){super(),this.page="home",this.width=3,this.height=2,this.desiredAngle=20,this.sharpenerAngle=15,this.rotationAngle=12,this.rotationSharpener=15,this.passes=19,this.hardness=60,this.edgeAngle=30,this.carbides={CrC:0,CrCV:0,MC:5.5,M6C:5,MN:0,CrN:0,Fe3C:0},this.dark=!1,this.online=navigator.onLine,this.updateReady=!1,this.geometryFullScreen=!1,this.addEventListener("steel-selected",e=>this._onSteelSelected(e)),document.documentElement.classList.remove("dark"),window.addEventListener("hashchange",()=>this._applyRoute()),this._applyRoute();try{localStorage.getItem("vsa-theme")==="dark"&&(document.documentElement.classList.add("dark"),this.dark=!0)}catch{}window.addEventListener("online",()=>{this.online=!0,this.requestUpdate()}),window.addEventListener("offline",()=>{this.online=!1,this.requestUpdate()}),"serviceWorker"in navigator&&(navigator.serviceWorker.getRegistration().then(e=>{e&&e.addEventListener("updatefound",()=>{const t=e.installing;t&&t.addEventListener("statechange",()=>{t.state==="installed"&&navigator.serviceWorker.controller&&(this.updateReady=!0,this.requestUpdate())})})}),navigator.serviceWorker.addEventListener("controllerchange",()=>{window.__vsaReloaded||(window.__vsaReloaded=!0,requestAnimationFrame(()=>window.location.reload()))})),this.addEventListener("geometry-fullscreen-changed",e=>{const t=e.detail;this.geometryFullScreen=!!(t!=null&&t.fullScreen),this.requestUpdate()})}_applyRoute(){const e=window.location.hash.replace(/^#\//,"");this.page=e||"home"}_go(e){window.location.hash=`/${e}`,this.page=e}_num(e,t){const i=e.target,s=Number(i.value);this[t]=s}_carbide(e,t){const i=e.target,s=Number(i.value);this.carbides={...this.carbides,[t]:s}}render(){return p`${this.geometryFullScreen?p``:p`<header
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
      <footer class="${this.geometryFullScreen?"hidden":""}">
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
            <strong>Edge Retention Estimator:</strong> Approximate CATRA TCC and
            material removal volume from hardness, edge angle, and carbide mix.
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
    </div>`}_pageAngle(){const e=kt(this.width,this.height);let t=null;return e==null&&(this.width==null||this.height==null?t="Width and height are required.":this.height===0?t="Height must be greater than 0.":t="width/2 must be ≤ height (arcsin domain).",queueMicrotask(()=>{var s;const i=(s=this.renderRoot)==null?void 0:s.querySelector(this.width==null?'sl-input[label="Width"]':'sl-input[label="Height"]');i==null||i.focus()})),p`<div class="page">
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
            @input=${i=>this._num(i,"width")}
          ></sl-input>
          <sl-input
            label="Height"
            type="number"
            .value=${String(this.height)}
            @input=${i=>this._num(i,"height")}
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
    </div>`}_pageElevation(){const e=At(this.desiredAngle,this.sharpenerAngle);let t=null;return e==null&&(this.desiredAngle==null||this.sharpenerAngle==null?t="Both desired and setting angles required.":t="Unexpected null result; ensure numeric inputs.",queueMicrotask(()=>{var s;const i=(s=this.renderRoot)==null?void 0:s.querySelector(this.desiredAngle==null?'sl-input[label="Desired"]':'sl-select[label="Setting"]');i==null||i.focus()})),p`<div class="page">
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
            @input=${i=>this._num(i,"desiredAngle")}
          ></sl-input>
          <sl-select
            label="Setting"
            .value=${String(this.sharpenerAngle)}
            @sl-change=${i=>{this.sharpenerAngle=Number(i.target.value)}}
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
    </div>`}_pageRotation(){const e=St(this.rotationAngle,this.rotationSharpener);let t=null;return e==null&&(this.rotationAngle==null||this.rotationSharpener==null?t="Provide both target and setting angles.":t="csc(setting) * sin(angle) must be between -1 and 1.",queueMicrotask(()=>{var s;const i=(s=this.renderRoot)==null?void 0:s.querySelector(this.rotationAngle==null?'sl-input[label="Angle"]':'sl-select[label="Setting"]');i==null||i.focus()})),p`<div class="page">
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
            @input=${i=>this._num(i,"rotationAngle")}
          ></sl-input>
          <sl-select
            label="Setting"
            .value=${String(this.rotationSharpener)}
            @sl-change=${i=>{this.rotationSharpener=Number(i.target.value)}}
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
    </div>`}_pagePasses(){const e=zt(this.passes),t=e.total>0;let i=null;return t||(this.passes==null?i="Number of passes is required.":this.passes<1?i="Pass count must be ≥ 1.":i="Invalid pass input.",queueMicrotask(()=>{var r;const s=(r=this.renderRoot)==null?void 0:r.querySelector('sl-input[label="Passes"]');s==null||s.focus()})),p`<div class="page">
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
            @input=${s=>this._num(s,"passes")}
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
                ><br />${i}<br /><em>Expectation:</em> Enter positive
                integer (e.g., 9, 19, 29).
              </div>`}
        </div>
        <sl-details summary="Sequence"
          >${e.sequence.map(s=>p`<span class="badge-seq">${s}, </span>`)}</sl-details
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
    </div>`}_pageRetention(){const e=Ze({hardness:this.hardness,edgeAngle:this.edgeAngle,CrC:this.carbides.CrC,CrV:this.carbides.CrCV,MC:this.carbides.MC,M6C:this.carbides.M6C,MN:this.carbides.MN,CrN:this.carbides.CrN,Fe3C:this.carbides.Fe3C}),t=this.hardness!=null&&this.hardness>0,i=this.edgeAngle!=null&&this.edgeAngle>0,s=[];return t||s.push("Hardness must be positive (e.g., 60)."),i||s.push("Edge angle must be positive degrees per side."),s.length&&queueMicrotask(()=>{var l;const r=t?"tr:nth-child(2) sl-input":"tr:first-child sl-input",n=(l=this.renderRoot)==null?void 0:l.querySelector(r);n==null||n.focus()}),p`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>
          Edge Retention Estimator
          <sl-tooltip
            content="Approximate CATRA TCC and volume from hardness, edge angle, and carbides."
          >
            <sl-icon
              name="info-circle"
              style="font-size:.9rem; margin-left:.4rem"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <p class="section-subtitle">
          Enter custom steel properties to get an estimate, or interact with the
          full steel database below.
        </p>
        <div class="retention-inputs">
          <table class="retention-table">
            <tr>
              <td>
                <div class="label-with-tooltip">
                  <span>Hardness</span>
                  <sl-tooltip
                    content="Rockwell C hardness (HRC). Higher HRC boosts wear resistance but may reduce toughness. Typical 50–70."
                  >
                    <sl-icon
                      name="info-circle"
                      style="font-size: 0.75rem; opacity: 0.7;"
                    ></sl-icon>
                  </sl-tooltip>
                </div>
              </td>
              <td>
                <sl-input
                  type="number"
                  .value=${String(this.hardness)}
                  @input=${r=>this._num(r,"hardness")}
                  size="small"
                ></sl-input>
              </td>
            </tr>
            <tr>
              <td>
                <div class="label-with-tooltip">
                  <span>Edge Angle</span>
                  <sl-tooltip
                    content="Degrees per side (DPS). Lower angles slice more efficiently; higher angles increase edge durability."
                  >
                    <sl-icon
                      name="info-circle"
                      style="font-size: 0.75rem; opacity: 0.7;"
                    ></sl-icon>
                  </sl-tooltip>
                </div>
              </td>
              <td>
                <sl-input
                  type="number"
                  .value=${String(this.edgeAngle)}
                  @input=${r=>this._num(r,"edgeAngle")}
                  size="small"
                ></sl-input>
              </td>
            </tr>
            ${[{k:"CrC",t:"Chromium carbides (CrC) – moderate wear contribution."},{k:"CrCV",t:"Chromium/Vanadium mixed carbides – added abrasion resistance."},{k:"MC",t:"MC (V/Nb) carbides – very high hardness, strong wear resistance."},{k:"M6C",t:"Complex M6C carbides – balanced secondary contribution."},{k:"MN",t:"Manganese phases – minor influence overall."},{k:"CrN",t:"Chromium nitride – stability & wear support."},{k:"Fe3C",t:"Iron carbide (cementite) – baseline matrix wear component."}].map(({k:r,t:n})=>p`<tr>
                <td>
                  <div class="label-with-tooltip">
                    <span>${r}</span>
                    <sl-tooltip content="${n}">
                      <sl-icon
                        name="info-circle"
                        style="font-size: 0.75rem; opacity: 0.7;"
                      ></sl-icon>
                    </sl-tooltip>
                  </div>
                </td>
                <td>
                  <sl-input
                    type="number"
                    .value=${String(this.carbides[r]||0)}
                    @input=${l=>this._carbide(l,r)}
                    size="small"
                  ></sl-input>
                </td>
              </tr>`)}
          </table>
        </div>
        <div aria-live="polite">
          ${s.length===0?p`<div class="result-block" role="status">
                <span>TCC / Volume</span
                ><span class="result-value"
                  >${e.TCC} / ${e.volume.toFixed(1)}</span
                >
              </div>`:p`<div class="invalid-msg" role="alert">
                <strong>Cannot compute retention metrics.</strong
                ><br />${s.map(r=>p`<div>${r}</div>`)}<br /><em
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
          rough sense of alloy complexity.
        </p>
        <p>
          Treat these numbers as comparative guidance, not lab‑grade
          measurements. Real cutting performance depends on heat treatment,
          microstructure, and edge finish.
        </p>
      </div>
    </div>`}_pageSteels(){return customElements.get("vsa-steel-table")||tt(()=>Promise.resolve().then(()=>Ct),void 0),p`<div class="page">
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
        </sl-button>`}_toggleSteelTable(){}_updateSw(){navigator.serviceWorker.getRegistration().then(e=>{e&&e.waiting?e.waiting.postMessage("vsa-skip-waiting"):e&&e.update()})}_onSteelSelected(e){const{hardness:t,edgeAngle:i,carbides:s}=e.detail;this.hardness=t,this.edgeAngle=i,this.carbides={...s}}};ke.styles=ye`
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
    .hidden {
      display: none;
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
    .retention-inputs {
      background: var(--vsa-card-bg);
      border: 1px solid var(--vsa-card-border);
      border-radius: 8px;
      overflow: hidden;
      margin-top: 0.5rem;
    }
    .retention-table {
      width: 100%;
      border-collapse: collapse;
    }
    .retention-table td {
      border-bottom: 1px solid var(--vsa-border, #e5e7eb);
      padding: 0.5rem 0.75rem;
      vertical-align: middle;
    }
    .retention-table td:first-child {
      font-weight: 500;
      width: 30%;
      background: var(--vsa-surface, #f9fafb);
      border-right: 1px solid var(--vsa-border, #e5e7eb);
    }
    .retention-table td:last-child {
      width: 70%;
    }
    .retention-table tr:last-child td {
      border-bottom: none;
    }
    .retention-table sl-input {
      width: 100%;
    }
    .retention-table sl-input::part(form-control) {
      margin-bottom: 0;
    }
    .retention-table sl-input::part(help-text) {
      display: none;
    }
    .label-with-tooltip {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    .label-with-tooltip sl-icon {
      cursor: help;
      color: var(--sl-color-neutral-500);
    }
    .section-subtitle {
      margin: 0.5rem 0 1rem 0;
      color: var(--sl-color-neutral-600);
      font-size: 0.9rem;
      line-height: 1.4;
    }
    :host-context(.dark) .section-subtitle {
      color: var(--sl-color-neutral-400);
    }
    :host-context(.dark) .retention-table td:first-child {
      background: var(--vsa-surface-dark, #1a1d23);
    }
    @media (max-width: 600px) {
      .retention-table td {
        padding: 0.4rem 0.5rem;
      }
      .retention-table td:first-child {
        width: 35%;
        font-size: 0.9rem;
      }
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
  `;let E=ke;W([x({type:String})],E.prototype,"page");W([x({type:Number})],E.prototype,"width");W([x({type:Number})],E.prototype,"height");W([x({type:Number})],E.prototype,"desiredAngle");W([x({type:Number})],E.prototype,"sharpenerAngle");W([x({type:Number})],E.prototype,"rotationAngle");W([x({type:Number})],E.prototype,"rotationSharpener");W([x({type:Number})],E.prototype,"passes");W([x({type:Number})],E.prototype,"hardness");W([x({type:Number})],E.prototype,"edgeAngle");W([x({attribute:!1})],E.prototype,"carbides");W([x({type:Boolean})],E.prototype,"dark");W([x({type:Boolean})],E.prototype,"online");W([x({type:Boolean})],E.prototype,"updateReady");W([x({type:Boolean})],E.prototype,"geometryFullScreen");customElements.define("vsa-app-shell",E);const O=self,_e="v2",Ke=`vsa-precache-${_e}`,ve=`vsa-runtime-${_e}`,Xe=`vsa-data-${_e}`,Lt=["./","./index.html","./manifest.json"];O.addEventListener("install",o=>{O.skipWaiting(),o.waitUntil(caches.open(Ke).then(e=>e.addAll(Lt)))});O.addEventListener("activate",o=>{o.waitUntil((async()=>{const e=await caches.keys();await Promise.all(e.filter(t=>![Ke,ve,Xe].includes(t)).map(t=>caches.delete(t))),O.clients.claim()})())});async function He(o,e){const t=await caches.open(e),i=await t.match(o);try{const s=await fetch(o);return s&&s.status===200&&t.put(o,s.clone()),s}catch{return i||new Response("Offline",{status:503})}}O.addEventListener("fetch",o=>{const{request:e}=o;if(e.method!=="GET")return;const t=new URL(e.url);if(e.mode==="navigate"){o.respondWith((async()=>{try{return await fetch(e)}catch{return await caches.match("./index.html")||new Response("Offline",{status:503})}})());return}if(t.pathname.endsWith("/data/steels.json")){o.respondWith(He(e,Xe));return}if(t.hostname.includes("cdn.jsdelivr.net")){o.respondWith(He(e,ve));return}t.origin===self.location.origin&&o.respondWith((async()=>{const i=await caches.open(ve),s=await i.match(e);try{const r=await fetch(e);return r&&r.status===200&&i.put(e,r.clone()),r}catch{return s||new Response("Offline",{status:503})}})())});O.addEventListener("message",o=>{o.data==="vsa-skip-waiting"&&O.skipWaiting()});const Ue=location.hostname==="localhost"||location.hostname==="127.0.0.1";"serviceWorker"in navigator&&!Ue?window.addEventListener("load",()=>{navigator.serviceWorker.register("./service-worker.js").catch(o=>console.error("SW registration failed",o))}):Ue&&console.info("[VSA] Skipping service worker registration in dev environment.");

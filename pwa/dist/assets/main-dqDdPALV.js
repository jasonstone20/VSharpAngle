(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();const Qe="modulepreload",et=function(a){return"/"+a},ke={},tt=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),l=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));i=Promise.allSettled(t.map(o=>{if(o=et(o),o in ke)return;ke[o]=!0;const c=o.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${d}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":Qe,c||(h.as="script"),h.crossOrigin="",h.href=o,l&&h.setAttribute("nonce",l),document.head.appendChild(h),c)return new Promise((u,_)=>{h.addEventListener("load",u),h.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${o}`)))})}))}function n(r){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=r,window.dispatchEvent(l),!l.defaultPrevented)throw r}return i.then(r=>{for(const l of r||[])l.status==="rejected"&&n(l.reason);return e().catch(n)})};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ne=globalThis,fe=ne.ShadowRoot&&(ne.ShadyCSS===void 0||ne.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ye=Symbol(),Se=new WeakMap;let De=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==ye)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(fe&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=Se.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Se.set(t,e))}return e}toString(){return this.cssText}};const st=a=>new De(typeof a=="string"?a:a+"",void 0,ye),be=(a,...e)=>{const t=a.length===1?a[0]:e.reduce((s,i,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+a[n+1],a[0]);return new De(t,a,ye)},it=(a,e)=>{if(fe)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=ne.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,a.appendChild(s)}},Ce=fe?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return st(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:nt,defineProperty:rt,getOwnPropertyDescriptor:ot,getOwnPropertyNames:at,getOwnPropertySymbols:lt,getPrototypeOf:ht}=Object,z=globalThis,Te=z.trustedTypes,dt=Te?Te.emptyScript:"",ce=z.reactiveElementPolyfillSupport,J=(a,e)=>a,re={toAttribute(a,e){switch(e){case Boolean:a=a?dt:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},xe=(a,e)=>!nt(a,e),Be={attribute:!0,type:String,converter:re,reflect:!1,useDefault:!1,hasChanged:xe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),z.litPropertyMetadata??(z.litPropertyMetadata=new WeakMap);let j=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Be){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&rt(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:n}=ot(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:i,set(r){const l=i==null?void 0:i.call(this);n==null||n.call(this,r),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Be}static _$Ei(){if(this.hasOwnProperty(J("elementProperties")))return;const e=ht(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(J("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(J("properties"))){const t=this.properties,s=[...at(t),...lt(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(Ce(i))}else e!==void 0&&t.push(Ce(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return it(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var n;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const r=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:re).toAttribute(t,s.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){var n,r;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),o=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:re;this._$Em=i;const c=o.fromAttribute(t,l.type);this[i]=c??((r=this._$Ej)==null?void 0:r.get(i))??c,this._$Em=null}}requestUpdate(e,t,s){var i;if(e!==void 0){const n=this.constructor,r=this[e];if(s??(s=n.getPropertyOptions(e)),!((s.hasChanged??xe)(r,t)||s.useDefault&&s.reflect&&r===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,r??t??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,r]of i){const{wrapped:l}=r,o=this[n];l!==!0||this._$AL.has(n)||o===void 0||this.C(n,void 0,r,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};j.elementStyles=[],j.shadowRootOptions={mode:"open"},j[J("elementProperties")]=new Map,j[J("finalized")]=new Map,ce==null||ce({ReactiveElement:j}),(z.reactiveElementVersions??(z.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=globalThis,oe=Q.trustedTypes,Me=oe?oe.createPolicy("lit-html",{createHTML:a=>a}):void 0,Le="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,Fe="?"+N,ct=`<${Fe}>`,q=document,ee=()=>q.createComment(""),te=a=>a===null||typeof a!="object"&&typeof a!="function",we=Array.isArray,pt=a=>we(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function",pe=`[ 	
\f\r]`,K=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ee=/-->/g,We=/>/g,U=RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ve=/'/g,Ie=/"/g,Ye=/^(?:script|style|textarea|title)$/i,qe=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),p=qe(1),I=qe(2),Z=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),Pe=new WeakMap,L=q.createTreeWalker(q,129);function Oe(a,e){if(!we(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return Me!==void 0?Me.createHTML(e):e}const gt=(a,e)=>{const t=a.length-1,s=[];let i,n=e===2?"<svg>":e===3?"<math>":"",r=K;for(let l=0;l<t;l++){const o=a[l];let c,d,h=-1,u=0;for(;u<o.length&&(r.lastIndex=u,d=r.exec(o),d!==null);)u=r.lastIndex,r===K?d[1]==="!--"?r=Ee:d[1]!==void 0?r=We:d[2]!==void 0?(Ye.test(d[2])&&(i=RegExp("</"+d[2],"g")),r=U):d[3]!==void 0&&(r=U):r===U?d[0]===">"?(r=i??K,h=-1):d[1]===void 0?h=-2:(h=r.lastIndex-d[2].length,c=d[1],r=d[3]===void 0?U:d[3]==='"'?Ie:Ve):r===Ie||r===Ve?r=U:r===Ee||r===We?r=K:(r=U,i=void 0);const _=r===U&&a[l+1].startsWith("/>")?" ":"";n+=r===K?o+ct:h>=0?(s.push(c),o.slice(0,h)+Le+o.slice(h)+N+_):o+N+(h===-2?l:_)}return[Oe(a,n+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class se{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let n=0,r=0;const l=e.length-1,o=this.parts,[c,d]=gt(e,t);if(this.el=se.createElement(c,s),L.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=L.nextNode())!==null&&o.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(Le)){const u=d[r++],_=i.getAttribute(h).split(N),g=/([.?@])?(.*)/.exec(u);o.push({type:1,index:n,name:g[2],strings:_,ctor:g[1]==="."?mt:g[1]==="?"?vt:g[1]==="@"?ft:he}),i.removeAttribute(h)}else h.startsWith(N)&&(o.push({type:6,index:n}),i.removeAttribute(h));if(Ye.test(i.tagName)){const h=i.textContent.split(N),u=h.length-1;if(u>0){i.textContent=oe?oe.emptyScript:"";for(let _=0;_<u;_++)i.append(h[_],ee()),L.nextNode(),o.push({type:2,index:++n});i.append(h[u],ee())}}}else if(i.nodeType===8)if(i.data===Fe)o.push({type:2,index:n});else{let h=-1;for(;(h=i.data.indexOf(N,h+1))!==-1;)o.push({type:7,index:n}),h+=N.length-1}n++}}static createElement(e,t){const s=q.createElement("template");return s.innerHTML=e,s}}function G(a,e,t=a,s){var r,l;if(e===Z)return e;let i=s!==void 0?(r=t._$Co)==null?void 0:r[s]:t._$Cl;const n=te(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(a),i._$AT(a,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=G(a,i._$AS(a,e.values),i,s)),e}class ut{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??q).importNode(t,!0);L.currentNode=i;let n=L.nextNode(),r=0,l=0,o=s[0];for(;o!==void 0;){if(r===o.index){let c;o.type===2?c=new ie(n,n.nextSibling,this,e):o.type===1?c=new o.ctor(n,o.name,o.strings,this,e):o.type===6&&(c=new yt(n,this,e)),this._$AV.push(c),o=s[++l]}r!==(o==null?void 0:o.index)&&(n=L.nextNode(),r++)}return L.currentNode=q,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class ie{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),te(e)?e===E||e==null||e===""?(this._$AH!==E&&this._$AR(),this._$AH=E):e!==this._$AH&&e!==Z&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):pt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==E&&te(this._$AH)?this._$AA.nextSibling.data=e:this.T(q.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=se.createElement(Oe(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(t);else{const r=new ut(i,this),l=r.u(this.options);r.p(t),this.T(l),this._$AH=r}}_$AC(e){let t=Pe.get(e.strings);return t===void 0&&Pe.set(e.strings,t=new se(e)),t}k(e){we(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const n of e)i===t.length?t.push(s=new ie(this.O(ee()),this.O(ee()),this,this.options)):s=t[i],s._$AI(n),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class he{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,n){this.type=1,this._$AH=E,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E}_$AI(e,t=this,s,i){const n=this.strings;let r=!1;if(n===void 0)e=G(this,e,t,0),r=!te(e)||e!==this._$AH&&e!==Z,r&&(this._$AH=e);else{const l=e;let o,c;for(e=n[0],o=0;o<n.length-1;o++)c=G(this,l[s+o],t,o),c===Z&&(c=this._$AH[o]),r||(r=!te(c)||c!==this._$AH[o]),c===E?e=E:e!==E&&(e+=(c??"")+n[o+1]),this._$AH[o]=c}r&&!i&&this.j(e)}j(e){e===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class mt extends he{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===E?void 0:e}}class vt extends he{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==E)}}class ft extends he{constructor(e,t,s,i,n){super(e,t,s,i,n),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??E)===Z)return;const s=this._$AH,i=e===E&&s!==E||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==E&&(s===E||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class yt{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}}const ge=Q.litHtmlPolyfillSupport;ge==null||ge(se,ie),(Q.litHtmlVersions??(Q.litHtmlVersions=[])).push("3.3.1");const bt=(a,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const n=(t==null?void 0:t.renderBefore)??null;s._$litPart$=i=new ie(e.insertBefore(ee(),n),n,void 0,t??{})}return i._$AI(a),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const F=globalThis;class Y extends j{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=bt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Z}}var Ue;Y._$litElement$=!0,Y.finalized=!0,(Ue=F.litElementHydrateSupport)==null||Ue.call(F,{LitElement:Y});const ue=F.litElementPolyfillSupport;ue==null||ue({LitElement:Y});(F.litElementVersions??(F.litElementVersions=[])).push("4.2.1");const xt=a=>a*Math.PI/180,je=a=>a/(Math.PI/180),Ze=a=>Math.sin(xt(a)),wt=a=>1/Ze(a);function _t(a){return Math.asin(Math.min(1,Math.max(-1,a)))}function $t(a){return Math.acos(Math.min(1,Math.max(-1,a)))}function At(a,e){if(a==null||e==null||e===0)return null;const t=a/2/e;return t<-1||t>1?null:Math.floor(je(_t(t)))}function kt(a,e){return a==null||e==null?null:Math.floor((a-e)*.125)}function St(a,e){if(a==null||e==null)return null;const t=wt(e)*Ze(a);return t<-1||t>1?null:Math.floor(je($t(t)))}function Ct(a){if(!a||a<1)return{total:0,sequence:[]};const e=a/10+1,t=a*e,s=a*2,i=t+2+s,n=i*2,r=[];for(let l=a;l>=9;l-=10)r.push(l);return r.push(5,3,2,1),{total:i,xStrokes:n,sequence:r}}function Ge(a){const{hardness:e=60,edgeAngle:t=30,CrC:s=0,CrV:i=0,MC:n=0,M6C:r=0,MN:l=0,CrN:o=0,Fe3C:c=0}=a||{},d=-157+15.8*e-17.8*t+11.2*s+14.6*i+26.2*n+9.5*r+20.9*l+19.4*o+5*c,h=s+i+n+r+l+o+c;let u;return h>15?u="20°-30°dps":h>5?u="12.5°-20°dps":u="8°-12.5°dps",{TCC:Math.round(d),volume:h,stability:u}}const le=class le extends Y{constructor(){super(),this.steels=[],this.filter="",this.sortKey="name",this.sortDir="asc",this.hardness=60,this.edgeAngle=30,this.selectedName="",this._load()}async _load(){try{const e=await fetch("./data/steels.json");if(!e.ok)throw new Error("Failed steels.json");const t=await e.json();this.steels=t}catch(e){console.error(e)}}_onFilter(e){this.filter=e.target.value.trim().toLowerCase()}_setHardness(e){this.hardness=Number(e.target.value)}_setEdgeAngle(e){this.edgeAngle=Number(e.target.value)}_toggleSort(e){this.sortKey===e?this.sortDir=this.sortDir==="asc"?"desc":"asc":(this.sortKey=e,this.sortDir="asc")}_filtered(){const e=this.filter;let t=this.steels.map(s=>{const{TCC:i,volume:n,stability:r}=Ge({hardness:this.hardness,edgeAngle:this.edgeAngle,...s});return{...s,TCC:i,volume:n,stability:r}});return e&&(t=t.filter(s=>s.name.toLowerCase().includes(e))),t.sort((s,i)=>{const n=this.sortDir==="asc"?1:-1;return this.sortKey==="name"?s.name.localeCompare(i.name)*n:(s[this.sortKey]-i[this.sortKey])*n}),t}_select(e){this.selectedName=e.name;const t={name:e.name,hardness:this.hardness,edgeAngle:this.edgeAngle,carbides:{CrC:e.CrC||0,CrV:e.CrV||0,MC:e.MC||0,M6C:e.M6C||0,MN:e.MN||0,CrN:e.CrN||0,Fe3C:e.Fe3C||0}};this.dispatchEvent(new CustomEvent("steel-selected",{detail:t,bubbles:!0,composed:!0}))}_onRowKey(e,t){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._select(t))}_headerCell(e,t){const s=this.sortKey===e,i=s?this.sortDir==="asc"?"▲":"▼":"",n=s?this.sortDir==="asc"?"ascending":"descending":"none";return p`<th
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
    `}};le.styles=be`
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
  `,le.properties={steels:{type:Array},filter:{type:String},sortKey:{type:String},sortDir:{type:String},hardness:{type:Number},edgeAngle:{type:Number},selectedName:{type:String}};let ae=le;customElements.define("vsa-steel-table",ae);const Tt=Object.freeze(Object.defineProperty({__proto__:null,VsaSteelTable:ae},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bt={attribute:!0,type:String,converter:re,reflect:!1,hasChanged:xe},Mt=(a=Bt,e,t)=>{const{kind:s,metadata:i}=t;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((a=Object.create(a)).wrapped=!0),n.set(t.name,a),s==="accessor"){const{name:r}=t;return{set(l){const o=e.get.call(this);e.set.call(this,l),this.requestUpdate(r,o,a)},init(l){return l!==void 0&&this.C(r,void 0,a,l),l}}}if(s==="setter"){const{name:r}=t;return function(l){const o=this[r];e.call(this,l),this.requestUpdate(r,o,a)}}throw Error("Unsupported decorator location: "+s)};function f(a){return(e,t)=>typeof t=="object"?Mt(a,e,t):((s,i,n)=>{const r=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),r?Object.getOwnPropertyDescriptor(i,n):void 0})(a,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function P(a){return f({...a,state:!0,attribute:!1})}const Et=/^(mm|in)=>/i,Wt=/^([0-9]*\.?[0-9]+)(h|H|oa)$/i,Vt=/^([0-9]*\.?[0-9]+)(dps|d|inc|inclusive|i)-([0-9]*\.?[0-9]+)(h|height|w|width)$/i,It=/^([0-9]*\.?[0-9]+)w@([0-9]*\.?[0-9]+)(h|height)$/i,Pt=/^([0-9]*\.?[0-9]+)w@([0-9]*\.?[0-9]+)cp$/i;function D(a){return parseFloat(a)}function Ht(a){return a*2}function He(a){return a*Math.PI/180}function me(a){return a*180/Math.PI}function Nt(a,e){if(a<=0||e<=0)return null;let t=Math.min(Math.sqrt(a/(2*e)),Math.PI/3);for(let s=0;s<15;s++){const i=Math.sin(t),n=Math.cos(t);if(Math.abs(n)<1e-6)break;const r=2*e*i*i/n-a,l=4*e*i+2*e*i*i*i/(n*n);if(Math.abs(l)<1e-12)break;const o=t-r/l;if(!isFinite(o)||o<=0)break;if(Math.abs(o-t)<1e-9){t=o;break}if(t=o,t>Math.PI/2-1e-4){t=Math.PI/2-1e-4;break}}return!isFinite(t)||t<=0?null:t}function zt(a){const e=a.match(Et);return e?{unit:e[1].toLowerCase(),rest:a.slice(e[0].length)}:{unit:null,rest:a}}function X(a,e){const t=[];let s=a.trim();const{unit:i,rest:n}=zt(s);i&&(s=n.trim());const r=i??null,l=i??e,o=l==="mm"?1:25.4;if(!s)return{segments:[],warnings:t,normalized:"",unit:e,notationUnits:i??void 0};const c=s.split(",").map(g=>g.trim()).filter(Boolean),d=[],h={currWidth:0,currHeight:0,lastInclusiveAngleDeg:null};let u;for(let g=0;g<c.length;g++){const y=c[g];let b=y.match(Wt);if(b){u=D(b[1])*o;continue}if(b=y.match(Vt),b){const x=D(b[1]),A=b[2].toLowerCase(),k=D(b[3])*o,M=b[4].toLowerCase(),v=A.startsWith("inc")||A==="i"?"inclusive":"dps",B=v==="dps"?Ht(x):x;if(M.startsWith("h")){if(k<=h.currHeight){t.push(`Segment ${g+1}: height ${k.toFixed(4)} not greater than previous height.`);continue}d.push({angleType:v,angleValue:x,travelType:"height",travelValue:k}),h.lastInclusiveAngleDeg=B}else{if(k<=h.currWidth){t.push(`Segment ${g+1}: width ${k.toFixed(4)} not greater than previous width.`);continue}if(B===0){t.push(`Segment ${g+1}: zero angle with width travel ignored.`);continue}d.push({angleType:v,angleValue:x,travelType:"width",travelValue:k}),h.lastInclusiveAngleDeg=B}if(d[d.length-1].travelType==="height"){h.currHeight=d[d.length-1].travelValue;const S=He(B)/2;h.currWidth===0?h.currWidth=2*h.currHeight*Math.tan(S):h.currWidth=h.currWidth+2*(h.currHeight-h.currHeight)*Math.tan(S)}else{const S=d[d.length-1].travelValue,R=He(B)/2,H=S-h.currWidth,de=h.currWidth===0?S/2/Math.tan(R):H/(2*Math.tan(R));h.currHeight+=de,h.currWidth=S}continue}if(b=y.match(It),b){const x=D(b[1])*o,A=D(b[2])*o;if(A<=h.currHeight){t.push(`Segment ${g+1}: target height not greater than previous.`);continue}const k=A-h.currHeight,M=x-h.currWidth;if(M<=0){t.push(`Segment ${g+1}: thickness not greater than previous width.`);continue}let v;if(h.currWidth===0&&h.currHeight===0?v=me(2*Math.atan(x/(2*A))):v=me(2*Math.atan(M/(2*k))),!isFinite(v)||v<=0){t.push(`Segment ${g+1}: could not derive angle from thickness@height.`);continue}d.push({angleType:"inclusive",angleValue:v,travelType:"height",travelValue:A}),h.currHeight=A,h.currWidth=x,h.lastInclusiveAngleDeg=v;continue}if(b=y.match(Pt),b){const x=D(b[1])*o,A=D(b[2])*o;if(x<=h.currWidth){t.push(`Segment ${g+1}: caliper thickness not greater than previous width.`);continue}const k=x-h.currWidth;let M=Nt(k,A);if(!M&&k>0&&A>0&&(M=Math.sqrt(k/(2*A))),!M||!isFinite(M)){t.push(`Segment ${g+1}: failed to solve angle from caliper.`);continue}const v=me(M*2),B=A*Math.sin(M),S=x;d.push({angleType:"inclusive",angleValue:v,travelType:"width",travelValue:S}),h.currWidth=S,h.currHeight+=B,h.lastInclusiveAngleDeg=v;continue}t.push(`Token ${g+1} '${y}' not recognized.`)}if(u!==void 0){const g=h.currHeight;u>g+1e-6&&d.push({angleType:"inclusive",angleValue:0,travelType:"height",travelValue:u})}const _=(r?r+"=>":"")+c.join(",");return{segments:d,warnings:t,overallHeight:u,unit:l,notationUnits:r??void 0,normalized:_}}var Rt=Object.defineProperty,Ut=Object.getOwnPropertyDescriptor,$=(a,e,t,s)=>{for(var i=s>1?void 0:s?Ut(e,t):e,n=a.length-1,r;n>=0;n--)(r=a[n])&&(i=(s?r(e,t,i):r(i))||i);return s&&i&&Rt(e,t,i),i};class Ne{constructor(e=[],t=!1,s=3){this.segments=[],this.apexMacro=!1,this.maxApexHeight=3,this.segments=[...e],this.apexMacro=t,this.maxApexHeight=s}setSegments(e){this.segments=[...e]}getSegments(){return[...this.segments]}setApexMacro(e){this.apexMacro=e}_createApexModel(e){if(!e.length||!this.apexMacro)return e;const t=this._recomputeSegments(e),s=[];let i=0;for(let n=0;n<t.length;n++){const r=t[n],l=r.derivedHeight??i;if(i>=this.maxApexHeight)break;if(l<=this.maxApexHeight)s.push({...r}),i=l;else{const o={...r};if(r.travelType==="height")o.travelValue=this.maxApexHeight-i,o.derivedHeight=this.maxApexHeight;else{const c=l-i,h=(this.maxApexHeight-i)/c;o.travelValue=r.travelValue*h}s.push(o);break}}return s}_recomputeSegments(e){let t=0,s=0;return e.map(i=>{const n=i.angleType==="dps"?i.angleValue*2:i.angleValue,r=n*Math.PI/360;let l=t,o=s;if(i.travelType==="width"){const d=i.travelValue;if(n===0)l=t,o=s;else{l=d;const h=t===0?l/2/Math.tan(r):(l-t)/(2*Math.tan(r));o=s+h}}else{const d=i.travelValue;d<s?o=s:o=d;const h=o-s;n===0?l=t:t===0?l=2*o*Math.tan(r):l=t+2*h*Math.tan(r)}const c={...i,angleInclusive:n,derivedWidth:l,derivedHeight:o};return t=l,s=o,c})}compute(){const e=this._createApexModel(this.segments),t=this._recomputeSegments(e);let s=0,i=0;const n=[];for(const r of t){const l=r.derivedWidth??i,o=r.derivedHeight??s;n.push({angleInclusive:r.angleInclusive??(r.angleType==="dps"?r.angleValue*2:r.angleValue),startWidth:i,endWidth:l,startY:s,endY:o}),s=o,i=l}return n}getTotalHeight(){const e=this.compute();return e.length?e[e.length-1].endY:5}getMaxWidth(){const e=this.compute();return e.length?e[e.length-1].endWidth:2}widthAtY(e,t){if(!e.length||t<=0)return 0;for(const s of e)if(t<=s.endY){if(s.startY===s.endY)return s.endWidth;const i=(t-s.startY)/(s.endY-s.startY);return s.startWidth+(s.endWidth-s.startWidth)*i}return e[e.length-1].endWidth}}const $e=class $e extends Y{constructor(){super(),this.angleInput=15,this.thicknessInput=.5,this.angleInputB=15,this.thicknessInputB=.5,this.angleInputType="dps",this.angleInputTypeB="dps",this.travelInputType="width",this.travelInputTypeB="width",this.zoom=1,this.pan=0,this._geometryA=new Ne,this._geometryB=new Ne,this.warning=null,this._storageKey="vsa-geometry-builder-state",this.units="mm",this.regionZoomActive=!1,this.overlayMode=!0,this.overlayCenter=.5,this.overlayTargetWidth=null,this.showProfile=!1,this.notationA="",this.notationB="",this.notationAWarnings=[],this.notationBWarnings=[],this._fullScreen=!1,this._userAdjustingWidth=!1,this._userAdjustingCenter=!1,this.strokePxMin=5,this.showDebug=!0,this.thinStrokes=!0,this.adaptiveZoomMode="idle",this._activeShrink=!1,this._activeExpand=!1,this._prevOverlayCenter=this.overlayCenter,this._customViewBox=null,this._baseViewBox=null,this._dragPanning=!1,this._dragStart=null,this._lastTapTime=0,this._pendingTap=null,this._computedA=[],this._computedB=[],this._onPanMoveBound=e=>this._onPanMove(e),this._onPanEndBound=e=>this._onPanEnd(e)}get segments(){return this._geometryA.getSegments()}set segments(e){this._geometryA.setSegments(e)}get segmentsB(){return this._geometryB.getSegments()}set segmentsB(e){this._geometryB.setSegments(e)}get fullScreen(){return this._fullScreen}set fullScreen(e){this._fullScreen=e,this._dispatchFullScreenChanged()}get apexMacro(){return this._geometryA.apexMacro}set apexMacro(e){this._geometryA.setApexMacro(e),this._geometryB.setApexMacro(e),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this._restore(),this._syncSegmentsToModels()}disconnectedCallback(){super.disconnectedCallback()}_restore(){try{const e=localStorage.getItem(this._storageKey);if(!e)return;const t=JSON.parse(e);Array.isArray(t.segments)&&(this.segments=t.segments),Array.isArray(t.segmentsB)&&(this.segmentsB=t.segmentsB),typeof t.zoom=="number"&&(this.zoom=t.zoom),typeof t.pan=="number"&&(this.pan=t.pan),typeof t.angleInput=="number"&&(this.angleInput=t.angleInput),typeof t.thicknessInput=="number"&&(this.thicknessInput=t.thicknessInput),typeof t.angleInputB=="number"&&(this.angleInputB=t.angleInputB),typeof t.thicknessInputB=="number"&&(this.thicknessInputB=t.thicknessInputB),(t.angleInputType==="dps"||t.angleInputType==="inclusive")&&(this.angleInputType=t.angleInputType),(t.angleInputTypeB==="dps"||t.angleInputTypeB==="inclusive")&&(this.angleInputTypeB=t.angleInputTypeB),(t.travelInputType==="width"||t.travelInputType==="height")&&(this.travelInputType=t.travelInputType),(t.travelInputTypeB==="width"||t.travelInputTypeB==="height")&&(this.travelInputTypeB=t.travelInputTypeB),(t.units==="mm"||t.units==="in")&&(this.units=t.units),typeof t.overlayMode=="boolean"&&(this.overlayMode=t.overlayMode),typeof t.overlayCenter=="number"&&(this.overlayCenter=t.overlayCenter),typeof t.overlayTargetWidth=="number"&&(this.overlayTargetWidth=t.overlayTargetWidth),typeof t.strokePxMin=="number"&&(this.strokePxMin=t.strokePxMin),typeof t.thinStrokes=="boolean"?this.thinStrokes=t.thinStrokes:typeof t._thinStrokes=="boolean"&&(this.thinStrokes=t._thinStrokes),typeof t.fullScreen=="boolean"&&(this.fullScreen=t.fullScreen),typeof t.showProfile=="boolean"&&(this.showProfile=t.showProfile),typeof t.apexMacro=="boolean"&&(this.apexMacro=t.apexMacro),t.customViewBox&&typeof t.customViewBox.x=="number"&&typeof t.customViewBox.y=="number"&&typeof t.customViewBox.w=="number"&&typeof t.customViewBox.h=="number"&&(this._customViewBox=t.customViewBox,this.regionZoomActive=!0),typeof t.notationA=="string"&&(this.notationA=t.notationA),typeof t.notationB=="string"&&(this.notationB=t.notationB),this._syncSegmentsToModels()}catch{}}_persist(){try{const e=this.fullScreen,t={angleInput:this.angleInput,thicknessInput:this.thicknessInput,angleInputB:this.angleInputB,thicknessInputB:this.thicknessInputB,segments:this.segments,segmentsB:this.segmentsB,angleInputType:this.angleInputType,angleInputTypeB:this.angleInputTypeB,travelInputType:this.travelInputType,travelInputTypeB:this.travelInputTypeB,units:this.units,overlayMode:this.overlayMode,overlayCenter:this.overlayCenter,overlayTargetWidth:this.overlayTargetWidth,strokePxMin:this.strokePxMin,thinStrokes:this.thinStrokes,customViewBox:this._customViewBox,fullScreen:this.fullScreen,showProfile:this.showProfile,apexMacro:this.apexMacro,notationA:this.notationA,notationB:this.notationB};localStorage.setItem(this._storageKey,JSON.stringify(t)),this.fullScreen?(document.documentElement.style.overflow="hidden",document.body.style.overflow="hidden"):(document.documentElement.style.overflow="",document.body.style.overflow=""),e!==this.fullScreen&&this._dispatchFullScreenChanged()}catch{}}_dispatchFullScreenChanged(){this.dispatchEvent(new CustomEvent("geometry-fullscreen-changed",{detail:{fullScreen:this.fullScreen},bubbles:!0,composed:!0}))}_toggleFullScreen(){this.fullScreen=!this.fullScreen,this._customViewBox=null,this.requestUpdate(),this._persist()}_editSegment(e,t,s,i){if(i<=0||Number.isNaN(i))return;const n=e==="A"?[...this.segments]:[...this.segmentsB];n[t]&&(n[t]={...n[t],[s]:i},e==="A"?this.segments=n:this.segmentsB=n,this._baseViewBox=null,this._persist())}_deleteSegment(e,t){const s=e==="A"?[...this.segments]:[...this.segmentsB];s[t]&&(s.splice(t,1),e==="A"?this.segments=s:this.segmentsB=s,this._baseViewBox=null,this._persist())}_add(){const e=this.angleInput,t=this.angleInputType,s=t==="inclusive"?e:e*2,i=this.travelInputType,n=this.thicknessInput,r=this.segments[this.segments.length-1],l=(r==null?void 0:r.derivedWidth)??0,o=(r==null?void 0:r.derivedHeight)??0;if(i==="width"){if(n<=l){const d=this._displayDigits();this.warning=`Width ${this._toDisplayLength(n).toFixed(d)}${this.units} must exceed previous ${this._toDisplayLength(l).toFixed(d)}${this.units}.`,this.requestUpdate();return}if(s===0){this.warning="Zero angle only valid with height travel.",this.requestUpdate();return}}else if(n<=o){const d=this._displayDigits();this.warning=`Height ${this._toDisplayLength(n).toFixed(d)}${this.units} must exceed previous ${this._toDisplayLength(o).toFixed(d)}${this.units}.`,this.requestUpdate();return}if(s<0)return;const c={angleType:t,angleValue:e,travelType:i,travelValue:n};this.warning=null,this.segments=[...this.segments,c],this._baseViewBox=null,this._persist()}_addB(){const e=this.angleInputB,t=this.angleInputTypeB,s=t==="inclusive"?e:e*2,i=this.travelInputTypeB,n=this.thicknessInputB,r=this.segmentsB[this.segmentsB.length-1],l=(r==null?void 0:r.derivedWidth)??0,o=(r==null?void 0:r.derivedHeight)??0;if(i==="width"){if(n<=l){const d=this._displayDigits();this.warning=`Width ${this._toDisplayLength(n).toFixed(d)}${this.units} must exceed previous ${this._toDisplayLength(l).toFixed(d)}${this.units} (B).`,this.requestUpdate();return}if(s===0){this.warning="Zero angle only valid with height travel.";return}}else if(n<=o){const d=this._displayDigits();this.warning=`Height ${this._toDisplayLength(n).toFixed(d)}${this.units} must exceed previous ${this._toDisplayLength(o).toFixed(d)}${this.units} (B).`,this.requestUpdate();return}if(s<0)return;const c={angleType:t,angleValue:e,travelType:i,travelValue:n};this.warning=null,this.segmentsB=[...this.segmentsB,c],this._baseViewBox=null,this._persist()}_syncSegmentsToModels(){this._geometryA.setSegments(this.segments),this._geometryB.setSegments(this.segmentsB),this._recomputeAll()}_getSegments(e){return e==="A"?this.segments:this.segmentsB}_updateAngleType(e,t,s){const n=this._getSegments(e)[t];if(!n||n.angleType===s)return;s==="inclusive"&&n.angleType==="dps"?n.angleValue=n.angleValue*2:s==="dps"&&n.angleType==="inclusive"&&(n.angleValue=n.angleValue/2),n.angleType=s,(n.angleType==="inclusive"?n.angleValue:n.angleValue*2)===0&&n.travelType==="width"?this.warning="Zero angle only allowed when travel type is height.":this.warning="",this._syncSegmentsToModels(),this.requestUpdate()}_updateAngleValue(e,t,s){const i=this._getSegments(e),n=i[t];if(!n||isNaN(s)||s<0)return;if(i[t-1],n.angleValue=s,(n.angleType==="inclusive"?n.angleValue:n.angleValue*2)===0&&n.travelType==="width"){this.warning="Zero angle only allowed with height travel.";return}else this.warning="";this._syncSegmentsToModels(),this.requestUpdate()}_updateTravelType(e,t,s){const i=this._getSegments(e),n=i[t];if(!n||n.travelType===s)return;const c=(e==="A"?this._geometryA:this._geometryB).compute().map((d,h)=>({...i[h],derivedWidth:d.endWidth,derivedHeight:d.endY}))[t];if(s==="height")n.travelType="height",n.travelValue=c.derivedHeight??0;else{if((n.angleType==="inclusive"?n.angleValue:n.angleValue*2)===0){this.warning="Cannot switch to width travel with zero angle.";return}n.travelType="width",n.travelValue=c.derivedWidth??0}this.warning="",this._syncSegmentsToModels(),this.requestUpdate()}_updateTravelValue(e,t,s){const i=this._getSegments(e),n=i[t];if(!n||isNaN(s)||s<=0)return;const r=i[t-1];if(n.travelType==="width"){const o=(r==null?void 0:r.derivedWidth)??0;if(s<=o){const c=this._displayDigits();this.warning=`Width must exceed previous width (${this._toDisplayLength(o).toFixed(c)}${this.units}).`;return}}else{const o=(r==null?void 0:r.derivedHeight)??0;if(s<=o){const c=this._displayDigits();this.warning=`Height must exceed previous height (${this._toDisplayLength(o).toFixed(c)}${this.units}).`;return}}if(n.travelValue=s,(n.angleType==="inclusive"?n.angleValue:n.angleValue*2)===0&&n.travelType==="width"){this.warning="Zero angle only allowed with height travel.";return}this.warning="",this._syncSegmentsToModels(),this.requestUpdate()}_toDisplayLength(e){return this.units==="mm"?e:e/25.4}_fromDisplayLength(e){return this.units==="mm"?e:e*25.4}_displayDigits(){return this.units==="mm"?3:4}_formatLen(e,t=this._displayDigits()){return this._toDisplayLength(e).toFixed(t)}_clear(){this.segments=[],this.segmentsB=[],this._baseViewBox=null;try{localStorage.removeItem(this._storageKey)}catch{}}_recomputeAll(){this._computedA=this._geometryA.compute(),this._computedB=this._geometryB.compute()}_computeWithCurrentSegments(){return this.segments===this._geometryA.getSegments()?this._computedA:this._computedB}_path(e){if(!e.length)return"";let t="M 0 0";for(const s of e){const i=-s.endWidth/2,n=s.endY;t+=` L ${i} ${n}`}for(let s=e.length-1;s>=0;s--){const i=e[s],n=i.endWidth/2,r=i.endY;t+=` L ${n} ${r}`}return t+=" Z",t}_segmentPaths(e){return e.map(t=>{const{startWidth:s,endWidth:i,startY:n,endY:r}=t;return[`M ${-s/2} ${n}`,`L ${-i/2} ${r}`,`L ${i/2} ${r}`,`L ${s/2} ${n}`,"Z"].join(" ")})}_widthAtY(e,t){if(!e.length||t<=0)return 0;for(const s of e)if(t<=s.endY+1e-9){const i=s.endY-s.startY;if(i<=1e-9)return s.endWidth;const n=(t-s.startY)/i;return s.startWidth+(s.endWidth-s.startWidth)*n}return e[e.length-1].endWidth}_onAngle(e){this.angleInput=Number(e.target.value),this._persist()}_onAngleTypeChange(e){const t=e.target.value;t!==this.angleInputType&&(t==="inclusive"&&this.angleInputType==="dps"?this.angleInput=this.angleInput*2:t==="dps"&&this.angleInputType==="inclusive"&&(this.angleInput=this.angleInput/2),this.angleInputType=t,this._persist())}_onThickness(e){this.thicknessInput=Number(e.target.value),this._persist()}_onAngleB(e){this.angleInputB=Number(e.target.value),this._persist()}_onAngleTypeChangeB(e){const t=e.target.value;t!==this.angleInputTypeB&&(t==="inclusive"&&this.angleInputTypeB==="dps"?this.angleInputB=this.angleInputB*2:t==="dps"&&this.angleInputTypeB==="inclusive"&&(this.angleInputB=this.angleInputB/2),this.angleInputTypeB=t,this._persist())}_onThicknessB(e){this.thicknessInputB=Number(e.target.value),this._persist()}_onTravelTypeChange(e){const t=e.target.value;if(t===this.travelInputType)return;const s=this.segments[this.segments.length-1];if(t==="height"){const i=(s==null?void 0:s.derivedHeight)??0;this.thicknessInput=+(i+.2).toFixed(4)}else{const i=(s==null?void 0:s.derivedWidth)??0;this.thicknessInput=+(i+.1).toFixed(4)}this.travelInputType=t,this._persist()}_onTravelTypeChangeB(e){const t=e.target.value;if(t===this.travelInputTypeB)return;const s=this.segmentsB[this.segmentsB.length-1];if(t==="height"){const i=(s==null?void 0:s.derivedHeight)??0;this.thicknessInputB=+(i+.2).toFixed(4)}else{const i=(s==null?void 0:s.derivedWidth)??0;this.thicknessInputB=+(i+.1).toFixed(4)}this.travelInputTypeB=t,this._persist()}_onZoom(e){this.zoom=Number(e.target.value),this._customViewBox=null,this.regionZoomActive=!1,this._baseViewBox=null,this._persist()}_onPan(e){if(this.pan=Number(e.target.value)/100,this._customViewBox&&this._baseViewBox){const t=this._geometryA.getTotalHeight(),s=this._customViewBox.h,i=Math.max(0,t-s);this._customViewBox.y=i*this.pan}this._persist()}_toggleOverlay(){this.overlayMode=!this.overlayMode,this._persist()}_changeUnits(e){const t=e.target.value;(t==="mm"||t==="in")&&(this.units=t,this._persist())}_onOverlayCenter(e){this._userAdjustingCenter=!0;const t=Number(e.target.value),s=this._geometryA.getTotalHeight(),i=this.units==="mm"?t:t*25.4,n=Math.max(0,Math.min(s,i)),r=s===0?0:n/s;this.overlayCenter=r,this._customViewBox=null,this.regionZoomActive=!1,this._prevOverlayCenter=this.overlayCenter,this._triggerAdaptiveZoom(),this.requestUpdate(),this._persist(),this._userAdjustingCenter=!1}_onOverlayWidth(e){this._userAdjustingWidth=!0;const t=1e4,s=Number(e.target.value),i=Math.min(t,Math.max(0,s))/t,n=this._geometryMaxWidthMm(),r=this.units==="mm"?.001:1e-4*25.4,l=r+(n-r)*i;this.overlayTargetWidth=l,this._customViewBox=null,this.regionZoomActive=!1,this.requestUpdate(),this._persist(),this._userAdjustingWidth=!1,this._activeShrink=!1,this._activeExpand=!1,this.adaptiveZoomMode="idle"}_geometryMaxWidthMm(){const e=this._geometryA.getMaxWidth(),t=this._geometryB.getMaxWidth();return Math.max(e,t)*1.1}_onStrokePxMin(e){const t=Number(e.target.value);this.strokePxMin=Math.max(1,Math.min(500,t)),this.requestUpdate(),this._persist()}_syncOverlayFromViewBox(e=!0,t=!1){if(!this._customViewBox)return;const s=this._geometryA.compute(),i=this._geometryB.compute(),n=this._geometryA.getTotalHeight(),r=this._geometryB.getTotalHeight(),l=Math.max(n,r),o=this._customViewBox;this.overlayMode&&!t&&!this._userAdjustingWidth&&(this.overlayTargetWidth==null||o.w>this.overlayTargetWidth)&&(this.overlayTargetWidth=o.w);const c=o.y+o.h/2;let d=l>0?c/l:0;d<0?d=0:d>1&&(d=1),d<.001&&(d=0);const h=this.overlayCenter;this.overlayCenter=d,this._autoExpandTargetWidthAtCenter(s,i,l,h),this._prevOverlayCenter=this.overlayCenter,this.requestUpdate(),e&&this._persist()}_autoExpandTargetWidthAtCenter(e,t,s,i){if(!this.overlayMode||i!==void 0&&this.overlayCenter<=i||this.overlayCenter<.02)return;const n=e??this._computedA,r=t??this._computedB,l=s??Math.max(n.length?n[n.length-1].endY:0,r.length?r[r.length-1].endY:0),o=this.overlayCenter*l;let c=this._widthAtY(n,o),d=this._widthAtY(r,o),h=Math.max(c,d);if(h<1e-6){const _=Math.min(l,o+.001);c=this._widthAtY(n,_),d=this._widthAtY(r,_),h=Math.max(c,d)}const u=this.overlayTargetWidth??0;h>u*1.01&&(this.overlayTargetWidth=h*1.02,this._customViewBox=null,this.regionZoomActive=!1)}_triggerAdaptiveZoom(){if(!this.overlayMode||this._userAdjustingWidth)return;const e=this._computedA,t=this._computedB,s=Math.max(e.length?e[e.length-1].endY:0,t.length?t[t.length-1].endY:0);if(s<=0)return;const i=this.overlayCenter*s;let n=this._widthAtY(e,i),r=this._widthAtY(t,i),l=Math.max(n,r);if(l<1e-6&&(l=.02),this.overlayTargetWidth==null){this.overlayTargetWidth=l*1.05,this.adaptiveZoomMode="expand",this._activeExpand=!0,this.requestUpdate();return}const o=this.overlayTargetWidth,c=1.01,d=1.005,h=.3,u=.38,_=l/o;let g="idle";if((this._activeExpand||l>o*c)&&(l>o*c||this._activeExpand))if(l>o*d){const y=l*1.03,b=o+(y-o)*.25;this.overlayTargetWidth=b,g="expand",this._activeExpand=l/this.overlayTargetWidth<d}else this._activeExpand=!1;if(g==="idle"&&(this._activeShrink||_<h)&&(_<h||this._activeShrink))if(_<u){const y=l*1.25,b=this.units==="mm"?.001:1e-4*25.4;let x=o+(y-o)*.2;x<l*1.15&&(x=l*1.15),x<b&&(x=b),this.overlayTargetWidth=x,g="shrink",this._activeShrink=l/this.overlayTargetWidth<u}else this._activeShrink=!1;this.adaptiveZoomMode=g,g!=="idle"&&(this._customViewBox=null,this.regionZoomActive=!1,this.requestUpdate(),this._persist())}_dynamicViewportWidth(e){const t=Math.max(e*.4,.4),s=this.units==="mm"?.01:.01*25.4;return Math.max(s,e+t)}_logSampledWidth(){const e=this._computedA,t=this._computedB,s=Math.max(e.length?e[e.length-1].endY:0,t.length?t[t.length-1].endY:0),i=s>0?Math.min(s*5e-4,.001):.001,n=this.overlayCenter*s,r=n<i*4?i:n,l=this._widthAtY(e,r),o=this._widthAtY(t,r),c=Math.max(l,o),d=this._dynamicViewportWidth(c);console.log(`[Geom] sampled ${c.toFixed(5)}mm centerY=${n.toFixed(5)} viewport=${d.toFixed(5)}mm`)}_onSvgDblClick(e){const t=e.currentTarget,s=t.viewBox.baseVal,i=this._svgPoint(t,e),n=this._computedA,r=this._computedB,l=Math.max(n.length?n[n.length-1].endY:0,r.length?r[r.length-1].endY:0);if(l>0){let o=i.y/l;o<0&&(o=0),o>1&&(o=1),this.overlayCenter=o}this.showProfile||this._applyZoomAtPoint(i.x,i.y,.35,s,t,!1),this._persist()}_onSvgShiftDblClick(e){console.log("[Geom] shift dblclick svg","client",e.clientX,e.clientY);const t=e.currentTarget,s=t.viewBox.baseVal,i=this._svgPoint(t,e);this.showProfile||this._applyZoomAtPoint(i.x,i.y,2.857142857142857,s,t,!0)}_onPointerDownTap(e){if(e.pointerType!=="touch"&&e.pointerType!=="pen")return;const t=performance.now(),s=this.renderRoot.querySelector(".svg-wrap svg");if(!s)return;const i=this._svgPoint(s,e),n=t-this._lastTapTime;if(this._lastTapTime=t,n<320&&this._pendingTap){this._pendingTap=null;const r=new MouseEvent("dblclick",{clientX:e.clientX,clientY:e.clientY,bubbles:!0,cancelable:!0});this._onSvgDblClick(r)}else{this._pendingTap={x:i.x,y:i.y};const r=this._computedA,l=this._computedB,o=Math.max(r.length?r[r.length-1].endY:0,l.length?l[l.length-1].endY:0);if(o>0){let c=i.y/o;c<0&&(c=0),c>1&&(c=1),this.overlayCenter=c,this.requestUpdate(),this._persist()}setTimeout(()=>{this._pendingTap&&performance.now()-this._lastTapTime>320&&(this._pendingTap=null)},340)}}_applyZoomAtPoint(e,t,s,i,n,r){this._baseViewBox||(this._baseViewBox={x:i.x,y:i.y,w:i.width,h:i.height});let l=i.width*s,o=i.height*s;const c=.0254;if(!r&&l<c){const u=c/l;l=c,o=o*u}if(r&&(l>=this._baseViewBox.w||o>=this._baseViewBox.h)){this._customViewBox=null,this.regionZoomActive=!1,this.requestUpdate();return}const d=e-l/2,h=t-o/2;this._customViewBox={x:d,y:h,w:l,h:o},this.regionZoomActive=!0,this._syncOverlayFromViewBox(!1,!0),this.requestUpdate()}_resetZoom(){console.log("[Geom] reset zoom");const e=this._computeWithCurrentSegments(),t=e.length?e[e.length-1].endY:5,s=e.length?e[e.length-1].endWidth:2,i=t/this.zoom,n=s/this.zoom,r=n*.15,l=i*.05,o=-n/2-r,c=0,d=n+r*2,h=i+l;this._customViewBox={x:o,y:c,w:d,h},this._baseViewBox={x:o,y:c,w:d,h},this.regionZoomActive=!0,this.requestUpdate()}_svgPoint(e,t){const s=e.getBoundingClientRect(),i=e.viewBox.baseVal.width/s.width,n=e.viewBox.baseVal.height/s.height;let r=e.viewBox.baseVal.x+(t.clientX-s.left)*i,l=e.viewBox.baseVal.y+(t.clientY-s.top)*n;const o=s.height*.03;s.bottom-t.clientY<=o&&(l=0);const d=Math.abs(t.clientX-(s.left+s.width/2));return l===0&&d<=s.width*.03&&(r=0),{x:r,y:l}}_onWheel(e){if(e.preventDefault(),!this.overlayMode||this.showProfile)return;const t=this._geometryMaxWidthMm(),s=this.units==="mm"?.001:1e-4*25.4;let i=this.overlayTargetWidth??t;const n=e.deltaY>0?1:-1,r=e.altKey?.01:e.shiftKey?.15:.05,l=t-s,o=Math.min(10,Math.max(1,Math.round(Math.abs(e.deltaY)/100))),c=l*r*o*n*-1;let d=i+c;d<s&&(d=s),d>t&&(d=t),console.log("[Geom] wheel width change",{prev:i,next:d,units:this.units,deltaY:e.deltaY,steps:o,modifier:r}),this.overlayTargetWidth=d,this._customViewBox=null,this.regionZoomActive=!0,this.requestUpdate()}_logEvent(e,t){t instanceof MouseEvent?console.log(`[Geom] ${e}`,"type",t.type,"btn",t.button,"client",t.clientX,t.clientY,"shift",t.shiftKey):console.log(`[Geom] ${e}`,"type",t.type)}_onPanStart(e){if(e.button!==0)return;const t=this.renderRoot.querySelector(".svg-wrap svg");if(!t)return;const s=t.viewBox.baseVal;this._dragPanning=!0,this._dragStart={x:e.clientX,y:e.clientY,vbX:s.x,vbY:s.y,vbW:s.width,vbH:s.height},this._baseViewBox||(this._baseViewBox={x:s.x,y:s.y,w:s.width,h:s.height}),this._customViewBox||(this._customViewBox={x:s.x,y:s.y,w:s.width,h:s.height}),this.regionZoomActive=!0,window.addEventListener("mousemove",this._onPanMoveBound),window.addEventListener("mouseup",this._onPanEndBound),this._logEvent("pan-start",e),e.preventDefault()}_onPanMove(e){if(!this._dragPanning||!this._dragStart)return;const t=this.renderRoot.querySelector(".svg-wrap svg");if(!t)return;const s=this._dragStart,i=t.getBoundingClientRect(),n=s.vbW/i.width,r=s.vbH/i.height,l=Math.max(n,r),o=(e.clientX-s.x)*l,c=(e.clientY-s.y)*l,d=s.vbX-o,h=s.vbY-c;this._customViewBox={x:d,y:h,w:s.vbW,h:s.vbH},this._syncOverlayFromViewBox(),this.requestUpdate(),e.buttons===0&&this._onPanEnd(e)}_onPanEnd(e){this._dragPanning&&(this._dragPanning=!1,this._dragStart=null,window.removeEventListener("mousemove",this._onPanMoveBound),window.removeEventListener("mouseup",this._onPanEndBound),this._logEvent("pan-end",e))}_renderWidthSlider(e){const t=this._geometryMaxWidthMm(),s=this.units==="mm"?.001:1e-4*25.4;let i=this.overlayTargetWidth??t;i=Math.max(s,Math.min(t,i));const n=(i-s)/(t-s),r=1e4,l=Math.round(n*r),o=this._displayDigits(),c=(this.units==="mm"?t:t/25.4).toFixed(o),d=(this.units==="mm"?s:s/25.4).toFixed(o);return p`<div
      class="width-slider-box"
      style="margin-top:.5rem;display:flex;flex-direction:column;gap:.25rem;"
    >
      <div
        style="display:flex;justify-content:space-between;font-size:.55rem;opacity:.7;"
      >
        <span>${d} ${this.units}</span>
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
            @input=${h=>{this.notationB=h.target.value}}
          />
          <button
            style="font-size:.55rem;padding:.3rem .6rem;border:1px solid var(--vsa-border);background:var(--vsa-input-bg);color:var(--sl-color-neutral-900);border-radius:4px;cursor:pointer;"
            @click=${()=>{const h=X(this.notationB,this.units);this.notationBWarnings=h.warnings,h.segments.length&&(this.segmentsB=h.segments.map(u=>({angleType:u.angleType,angleValue:u.angleValue,travelType:u.travelType,travelValue:u.travelValue})),this._customViewBox=null,this.overlayTargetWidth=null,this.requestUpdate(),this._persist(),h.notationUnits&&h.notationUnits!==this.units&&(this.units=h.notationUnits))}}
          >
            Import B
          </button>
        </div>
        ${this.notationBWarnings.length?p`<div
              style="font-size:.5rem;color:var(--vsa-warning-text-color);line-height:1.2;"
            >
              ${this.notationBWarnings.map(h=>p`<div>⚠ ${h}</div>`)}
            </div>`:""}
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
          .value=${(this.units==="mm"?i:i/25.4).toFixed(o)}
          @change=${h=>{const u=Number(h.target.value);if(!isFinite(u))return;const _=this.units==="mm"?u:u*25.4,g=Math.max(s,Math.min(t,_));this.overlayTargetWidth=g,this._customViewBox=null,this.requestUpdate()}}
        />
      </div>
      <div style="font-size:.6rem;opacity:.75;text-align:center;">
        Width: ${this._formatLen(this.overlayTargetWidth??i)}
        ${this.units}
      </div>
    </div>`}render(){const e=this._geometryA.compute(),t=this._geometryB.compute();console.log("Render - computedA:",e),console.log("Render - computedB:",t);const s=this._path(e),i=this._path(t);console.log("Render - pathA:",s),console.log("Render - pathB:",i);const n=this._segmentPaths(e),r=this._segmentPaths(t),l=this._geometryA.getTotalHeight(),o=this._geometryB.getTotalHeight(),c=Math.max(l,o),d=e.length?e[e.length-1].endWidth:2,h=t.length?t[t.length-1].endWidth:2,u=this.overlayMode?0:.4,_=this.overlayMode?Math.max(d,h):d+u+h;let g=this.overlayCenter*c;const y=c>0?Math.min(c*5e-4,.001):.001;if(!this.showProfile&&this.overlayMode&&this.overlayTargetWidth==null){const m=g<y*4?y:g,C=this._widthAtY(e,m),T=this._widthAtY(t,m),Je=Math.max(C,T,Math.max(d,h));this.overlayTargetWidth=Je}const b=g<y*4?y:g;let x;if(this.showProfile)x=_;else{const m=this._widthAtY(e,b),C=this._widthAtY(t,b),T=Math.max(m,C,1e-5);x=this._dynamicViewportWidth(T),this.overlayTargetWidth=x}const A=this.renderRoot.querySelector(".svg-wrap");let k=1;if(A){const m=A.getBoundingClientRect();m.width>0&&m.height>0&&(k=m.height/m.width)}const M=x*k;let v=M;this.apexMacro&&!this.showProfile&&(v=M/5);const B=this.showProfile?-_/2:-x/2;let S;if(this.showProfile)S=0;else{S=c-g-v/2,S<0&&(S=0);const C=Math.max(0,c-v);S>C&&(S=C)}const R=this.showProfile?_:x,H=this.showProfile?c:v,de=this.thinStrokes?.375:5;return this.units==="mm"||1/25.4,this.units,p` <div class="page ${this.fullScreen?"full-screen":""}">
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
            @click=${()=>{const m=X(this.notationA,this.units);this.notationAWarnings=m.warnings,m.segments.length&&(this.segments=m.segments.map(C=>({angleType:C.angleType,angleValue:C.angleValue,travelType:C.travelType,travelValue:C.travelValue})),this._customViewBox=null,this.overlayTargetWidth=null,this.requestUpdate(),this._persist(),m.notationUnits&&m.notationUnits!==this.units&&(this.units=m.notationUnits))}}
          >
            Import A
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
            @click=${()=>{const m=X(this.notationB,this.units);this.notationBWarnings=m.warnings,m.segments.length&&(this.segmentsB=m.segments.map(C=>({angleType:C.angleType,angleValue:C.angleValue,travelType:C.travelType,travelValue:C.travelValue})),this._customViewBox=null,this.overlayTargetWidth=null,this.requestUpdate(),this._persist(),m.notationUnits&&m.notationUnits!==this.units&&(this.units=m.notationUnits))}}
          >
            Import B
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
          @click=${()=>{this.notationA="mm=>15dps-2h,0.3w@3h,0.5w@5cp,50H",this.notationB="mm=>12dps-2h,0.25w@3h,0.45w@5cp,50H";const m=X(this.notationA,this.units),C=X(this.notationB,this.units);console.log("Example - ResA segments:",m.segments),console.log("Example - ResB segments:",C.segments),m.segments.length&&(this.segments=m.segments.map(T=>({angleType:T.angleType,angleValue:T.angleValue,travelType:T.travelType,travelValue:T.travelValue})),console.log("Example - Set segments A:",this.segments),console.log("Example - GeometryA computed:",this._geometryA.compute())),C.segments.length&&(this.segmentsB=C.segments.map(T=>({angleType:T.angleType,angleValue:T.angleValue,travelType:T.travelType,travelValue:T.travelValue})),console.log("Example - Set segments B:",this.segmentsB),console.log("Example - GeometryB computed:",this._geometryB.compute())),this._customViewBox=null,this.overlayTargetWidth=null,this.requestUpdate(),this._persist()}}
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
                    ${e.map((m,C)=>{const T=this.segments[C];return p`<tr>
                        <td>${C+1}</td>
                        <td>${T.angleValue}</td>
                        <td>${T.angleType}</td>
                        <td>${T.travelType}</td>
                        <td>${this._formatLen(T.travelValue)}</td>
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
                    ${t.map((m,C)=>{const T=this.segmentsB[C];return p`<tr>
                        <td>${C+1}</td>
                        <td>${T.angleValue}</td>
                        <td>${T.angleType}</td>
                        <td>${T.travelType}</td>
                        <td>${this._formatLen(T.travelValue)}</td>
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
            ${this._renderSvg(e,t,n,r,c,d,h,de,y,B,S,R,H)}
          </div>
        </div>
      </div>
      ${this.showDebug?p`<div style="height:150px;overflow:auto;">
            ${this._renderDebug(y)}
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
        `}`}_renderVerticalSlider(e){const t=this._displayDigits(),s=this.units,i=this.overlayCenter*e;(this.units==="mm"?i:i/25.4).toFixed(t),(this.units==="mm"?e:e/25.4).toFixed(t);const n=Math.round((e>0?i/e:0)*1e4);return p`<div
      class="vertical-slider-box"
      style="display:flex;flex-direction:column;align-items:center;${this.fullScreen?"height:100%;":""}"
    >
      <span style="font-size:.5rem;opacity:.7;"
        >Height
        (${s})${this.apexMacro?" - Apex Macro (0-3mm)":""}</span
      >
      <input
        type="range"
        min="0"
        max="10000"
        step="1"
        .value=${String(n)}
        @input=${r=>{const o=Number(r.target.value)/1e4;this.overlayCenter=e>0?o:0,this._customViewBox=null,this.requestUpdate()}}
        style="width:100%;flex:1 1 auto;"
      />
    </div>`}_renderControls(){return p``}_renderDebug(e){const t=this._geometryA.compute(),s=this._geometryB.compute(),i=Math.max(this._geometryA.getTotalHeight(),this._geometryB.getTotalHeight()),n=this.overlayCenter*i,r=n<e*4?e:n,l=this._geometryA.widthAtY(t,r),o=this._geometryB.widthAtY(s,r),c=this._displayDigits(),d=this.units,h=(this.units==="mm"?n:n/25.4).toFixed(c),u=(this.units==="mm"?l:l/25.4).toFixed(c),_=(this.units==="mm"?o:o/25.4).toFixed(c),g=l**3,y=o**3;let b,x;g===0&&y===0?(b=1,x="equal"):g>=y?(b=g/(y===0?Number.EPSILON:y),x=`A stronger x${b.toFixed(3)}`):(b=y/(g===0?Number.EPSILON:g),x=`B stronger x${b.toFixed(3)}`);const A=Math.abs(g-y)/Math.max(g,y||1)*100;return p`<div
      style="margin-top:.4rem;font-size:.6rem;background:var(--vsa-metrics-bg);padding:.55rem .7rem;border-radius:6px;line-height:1.2;"
    >
      <div style="font-weight:600;margin-bottom:.35rem;">
        Cross Section Metrics
      </div>
      <div>Height from apex: <strong>${h} ${d}</strong></div>
      <div>Thickness A: <strong>${u} ${d}</strong></div>
      <div>Thickness B: <strong>${_} ${d}</strong></div>
      <div style="margin-top:.35rem;font-weight:600;">
        Strength (thickness^3)
      </div>
      <div>A^3: ${g.toFixed(6)}</div>
      <div>B^3: ${y.toFixed(6)}</div>
      <div>Relative: ${x}</div>
      <div>Difference: ${A.toFixed(2)}%</div>
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
    </div>`}_renderSvg(e,t,s,i,n,r,l,o,c,d,h,u,_){const g=this._path(e),y=this._path(t),b=this.overlayMode?p`
          ${g?I`<path d="${g}" fill="none" stroke="var(--vsa-path-a-color)" stroke-width="${o}" vector-effect="non-scaling-stroke"></path>`:""}
          ${y?I`<path d="${y}" fill="none" stroke="var(--vsa-path-b-color)" stroke-width="${o}" vector-effect="non-scaling-stroke"></path>`:""}
          ${(()=>{const A=o*.6,k=`${(o*.7).toFixed(0)} ${(o*.5).toFixed(0)}`,M=Array.from(new Set([...e.map(v=>v.endY),...t.map(v=>v.endY)])).sort((v,B)=>v-B);return I`${M.map(v=>{if(v<=0||v>=n-1e-9)return"";const B=this._widthAtY(e,v),S=this._widthAtY(t,v),H=Math.max(B,S)/2;return I`<line x1="${-H}" y1="${v}" x2="${H}" y2="${v}" stroke="var(--vsa-grid-line-color)" stroke-width="${A}" vector-effect="non-scaling-stroke" stroke-dasharray="${k}" opacity="0.5" />`})}`})()}
        `:p`${(()=>{const k=-(r/2+.3),M=l/2+.6/2,v=["#ffdd57","#74c0fc","#ffc9c9","#b197fc","#a9e34b","#ffa94d","#ffd8a8","#e599f7","#63e6be","#ff6b6b"];return I`
            <g transform="translate(${k},0)">
              ${s.map((B,S)=>I`<path d="${B}" fill="${v[S%v.length]}" stroke="var(--vsa-stroke-color)" stroke-width="${o}" vector-effect="non-scaling-stroke" opacity="0.95"></path>`)}
              ${g?I`<path d="${g}" fill="none" stroke="var(--vsa-path-a-color)" stroke-width="${o}" vector-effect="non-scaling-stroke"></path>`:""}
            </g>
            <g transform="translate(${M},0)">
              ${i.map((B,S)=>I`<path d="${B}" fill="${v[S%v.length]}" stroke="var(--vsa-stroke-color)" stroke-width="${o}" vector-effect="non-scaling-stroke" opacity="0.95"></path>`)}
              ${y?I`<path d="${y}" fill="none" stroke="var(--vsa-path-b-color)" stroke-width="${o}" vector-effect="non-scaling-stroke"></path>`:""}
            </g>`})()}`,x=(()=>{const A=this.overlayCenter*n,k=A<c*4?c:A;let M=this._widthAtY(e,k),v=this._widthAtY(t,k),B=Math.max(M,v);B<1e-9&&(B=.02);const S=B*1.05/2,R=(o*.6).toFixed(0),H=(o*.4).toFixed(0);return I`<g class="center-line-group" pointer-events="none">
        <line x1="${-S}" y1="${A}" x2="${S}" y2="${A}" stroke="var(--vsa-center-line-color)" stroke-width="${o}" vector-effect="non-scaling-stroke" stroke-dasharray="${R} ${H}" />
      </g>`})();return p`${g||y?I`<svg viewBox="${this._customViewBox?this._customViewBox.x:d} ${this._customViewBox?this._customViewBox.y:h} ${this._customViewBox?this._customViewBox.w:u} ${this._customViewBox?this._customViewBox.h:_}" preserveAspectRatio="xMidYMin meet">
      <g class="geom" transform="translate(0, ${n}) scale(1,-1)">
        ${b}
        ${x}
      </g>
    </svg>`:p`<div class="empty">Add segments to visualize cross section.</div>`}
    ${g||y?p`<div class="drag-overlay"></div>`:""}`}};$e.styles=be`
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
  `;let w=$e;$([f({type:Number})],w.prototype,"angleInput",2);$([f({type:Number})],w.prototype,"thicknessInput",2);$([f({type:Number})],w.prototype,"angleInputB",2);$([f({type:Number})],w.prototype,"thicknessInputB",2);$([f({type:String})],w.prototype,"angleInputType",2);$([f({type:String})],w.prototype,"angleInputTypeB",2);$([f({type:String})],w.prototype,"travelInputType",2);$([f({type:String})],w.prototype,"travelInputTypeB",2);$([f({type:Number})],w.prototype,"zoom",2);$([f({type:Number})],w.prototype,"pan",2);$([f({type:Array,attribute:!1})],w.prototype,"segments",1);$([f({type:Array,attribute:!1})],w.prototype,"segmentsB",1);$([P()],w.prototype,"warning",2);$([f({type:String})],w.prototype,"units",2);$([f({type:Boolean})],w.prototype,"regionZoomActive",2);$([f({type:Boolean})],w.prototype,"overlayMode",2);$([f({type:Number})],w.prototype,"overlayCenter",2);$([f({type:Number})],w.prototype,"overlayTargetWidth",2);$([P()],w.prototype,"showProfile",2);$([P()],w.prototype,"notationA",2);$([P()],w.prototype,"notationB",2);$([P()],w.prototype,"notationAWarnings",2);$([P()],w.prototype,"notationBWarnings",2);$([P()],w.prototype,"_fullScreen",2);$([f({type:Number})],w.prototype,"strokePxMin",2);$([f({type:Boolean})],w.prototype,"showDebug",2);$([f({type:Boolean})],w.prototype,"apexMacro",1);$([P()],w.prototype,"thinStrokes",2);$([P()],w.prototype,"adaptiveZoomMode",2);customElements.define("vsa-geometry-builder",w);var Dt=Object.defineProperty,V=(a,e,t,s)=>{for(var i=void 0,n=a.length-1,r;n>=0;n--)(r=a[n])&&(i=r(e,t,i)||i);return i&&Dt(e,t,i),i};const Ae=class Ae extends Y{constructor(){super(),this.page="home",this.width=3,this.height=2,this.desiredAngle=20,this.sharpenerAngle=15,this.rotationAngle=12,this.rotationSharpener=15,this.passes=19,this.hardness=60,this.edgeAngle=30,this.carbides={CrC:0,CrCV:0,MC:5.5,M6C:5,MN:0,CrN:0,Fe3C:0},this.dark=!1,this.online=navigator.onLine,this.updateReady=!1,this.geometryFullScreen=!1,this.addEventListener("steel-selected",e=>this._onSteelSelected(e)),document.documentElement.classList.remove("dark"),window.addEventListener("hashchange",()=>this._applyRoute()),this._applyRoute();try{localStorage.getItem("vsa-theme")==="dark"&&(document.documentElement.classList.add("dark"),this.dark=!0)}catch{}window.addEventListener("online",()=>{this.online=!0,this.requestUpdate()}),window.addEventListener("offline",()=>{this.online=!1,this.requestUpdate()}),"serviceWorker"in navigator&&(navigator.serviceWorker.getRegistration().then(e=>{e&&e.addEventListener("updatefound",()=>{const t=e.installing;t&&t.addEventListener("statechange",()=>{t.state==="installed"&&navigator.serviceWorker.controller&&(this.updateReady=!0,this.requestUpdate())})})}),navigator.serviceWorker.addEventListener("controllerchange",()=>{window.__vsaReloaded||(window.__vsaReloaded=!0,requestAnimationFrame(()=>window.location.reload()))})),this.addEventListener("geometry-fullscreen-changed",e=>{const t=e.detail;this.geometryFullScreen=!!(t!=null&&t.fullScreen),this.requestUpdate()})}_applyRoute(){const e=window.location.hash.replace(/^#\//,"");this.page=e||"home"}_go(e){window.location.hash=`/${e}`,this.page=e}_num(e,t){const s=e.target,i=Number(s.value);this[t]=i}_carbide(e,t){const s=e.target,i=Number(s.value);this.carbides={...this.carbides,[t]:i}}render(){return p`${this.geometryFullScreen?p``:p`<header
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
    </div>`}_pageAngle(){const e=At(this.width,this.height);let t=null;return e==null&&(this.width==null||this.height==null?t="Width and height are required.":this.height===0?t="Height must be greater than 0.":t="width/2 must be ≤ height (arcsin domain).",queueMicrotask(()=>{var i;const s=(i=this.renderRoot)==null?void 0:i.querySelector(this.width==null?'sl-input[label="Width"]':'sl-input[label="Height"]');s==null||s.focus()})),p`<div class="page">
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
    </div>`}_pageElevation(){const e=kt(this.desiredAngle,this.sharpenerAngle);let t=null;return e==null&&(this.desiredAngle==null||this.sharpenerAngle==null?t="Both desired and setting angles required.":t="Unexpected null result; ensure numeric inputs.",queueMicrotask(()=>{var i;const s=(i=this.renderRoot)==null?void 0:i.querySelector(this.desiredAngle==null?'sl-input[label="Desired"]':'sl-select[label="Setting"]');s==null||s.focus()})),p`<div class="page">
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
    </div>`}_pageRotation(){const e=St(this.rotationAngle,this.rotationSharpener);let t=null;return e==null&&(this.rotationAngle==null||this.rotationSharpener==null?t="Provide both target and setting angles.":t="csc(setting) * sin(angle) must be between -1 and 1.",queueMicrotask(()=>{var i;const s=(i=this.renderRoot)==null?void 0:i.querySelector(this.rotationAngle==null?'sl-input[label="Angle"]':'sl-select[label="Setting"]');s==null||s.focus()})),p`<div class="page">
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
    </div>`}_pagePasses(){const e=Ct(this.passes),t=e.total>0;let s=null;return t||(this.passes==null?s="Number of passes is required.":this.passes<1?s="Pass count must be ≥ 1.":s="Invalid pass input.",queueMicrotask(()=>{var n;const i=(n=this.renderRoot)==null?void 0:n.querySelector('sl-input[label="Passes"]');i==null||i.focus()})),p`<div class="page">
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
    </div>`}_pageRetention(){const e=Ge({hardness:this.hardness,edgeAngle:this.edgeAngle,CrC:this.carbides.CrC,CrV:this.carbides.CrCV,MC:this.carbides.MC,M6C:this.carbides.M6C,MN:this.carbides.MN,CrN:this.carbides.CrN,Fe3C:this.carbides.Fe3C}),t=this.hardness!=null&&this.hardness>0,s=this.edgeAngle!=null&&this.edgeAngle>0,i=[];return t||i.push("Hardness must be positive (e.g., 60)."),s||i.push("Edge angle must be positive degrees per side."),i.length&&queueMicrotask(()=>{var l;const n=t?'sl-input[label="Edge Angle"]':'sl-input[label="Hardness"]',r=(l=this.renderRoot)==null?void 0:l.querySelector(n);r==null||r.focus()}),p`<div class="page">
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
    </div>`}_pageSteels(){return customElements.get("vsa-steel-table")||tt(()=>Promise.resolve().then(()=>Tt),void 0),p`<div class="page">
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
        </sl-button>`}_toggleSteelTable(){}_updateSw(){navigator.serviceWorker.getRegistration().then(e=>{e&&e.waiting?e.waiting.postMessage("vsa-skip-waiting"):e&&e.update()})}_onSteelSelected(e){const{hardness:t,edgeAngle:s,carbides:i}=e.detail;this.hardness=t,this.edgeAngle=s,this.carbides={...i}}};Ae.styles=be`
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
  `;let W=Ae;V([f({type:String})],W.prototype,"page");V([f({type:Number})],W.prototype,"width");V([f({type:Number})],W.prototype,"height");V([f({type:Number})],W.prototype,"desiredAngle");V([f({type:Number})],W.prototype,"sharpenerAngle");V([f({type:Number})],W.prototype,"rotationAngle");V([f({type:Number})],W.prototype,"rotationSharpener");V([f({type:Number})],W.prototype,"passes");V([f({type:Number})],W.prototype,"hardness");V([f({type:Number})],W.prototype,"edgeAngle");V([f({attribute:!1})],W.prototype,"carbides");V([f({type:Boolean})],W.prototype,"dark");V([f({type:Boolean})],W.prototype,"online");V([f({type:Boolean})],W.prototype,"updateReady");V([f({type:Boolean})],W.prototype,"geometryFullScreen");customElements.define("vsa-app-shell",W);const O=self,_e="v2",Ke=`vsa-precache-${_e}`,ve=`vsa-runtime-${_e}`,Xe=`vsa-data-${_e}`,Lt=["./","./index.html","./manifest.json"];O.addEventListener("install",a=>{O.skipWaiting(),a.waitUntil(caches.open(Ke).then(e=>e.addAll(Lt)))});O.addEventListener("activate",a=>{a.waitUntil((async()=>{const e=await caches.keys();await Promise.all(e.filter(t=>![Ke,ve,Xe].includes(t)).map(t=>caches.delete(t))),O.clients.claim()})())});async function ze(a,e){const t=await caches.open(e),s=await t.match(a);try{const i=await fetch(a);return i&&i.status===200&&t.put(a,i.clone()),i}catch{return s||new Response("Offline",{status:503})}}O.addEventListener("fetch",a=>{const{request:e}=a;if(e.method!=="GET")return;const t=new URL(e.url);if(e.mode==="navigate"){a.respondWith((async()=>{try{return await fetch(e)}catch{return await caches.match("./index.html")||new Response("Offline",{status:503})}})());return}if(t.pathname.endsWith("/data/steels.json")){a.respondWith(ze(e,Xe));return}if(t.hostname.includes("cdn.jsdelivr.net")){a.respondWith(ze(e,ve));return}t.origin===self.location.origin&&a.respondWith((async()=>{const s=await caches.open(ve),i=await s.match(e);try{const n=await fetch(e);return n&&n.status===200&&s.put(e,n.clone()),n}catch{return i||new Response("Offline",{status:503})}})())});O.addEventListener("message",a=>{a.data==="vsa-skip-waiting"&&O.skipWaiting()});const Re=location.hostname==="localhost"||location.hostname==="127.0.0.1";"serviceWorker"in navigator&&!Re?window.addEventListener("load",()=>{navigator.serviceWorker.register("./service-worker.js").catch(a=>console.error("SW registration failed",a))}):Re&&console.info("[VSA] Skipping service worker registration in dev environment.");

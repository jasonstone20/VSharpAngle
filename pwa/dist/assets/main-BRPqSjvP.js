(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();const yt="modulepreload",bt=function(r){return"/"+r},Le={},wt=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(t.map(a=>{if(a=bt(a),a in Le)return;Le[a]=!0;const h=a.endsWith(".css"),c=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${c}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":yt,h||(d.as="script"),d.crossOrigin="",d.href=a,l&&d.setAttribute("nonce",l),document.head.appendChild(d),h)return new Promise((b,S)=>{d.addEventListener("load",b),d.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${a}`)))})}))}function n(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return i.then(o=>{for(const l of o||[])l.status==="rejected"&&n(l.reason);return e().catch(n)})};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ge=globalThis,Te=ge.ShadowRoot&&(ge.ShadyCSS===void 0||ge.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Be=Symbol(),qe=new WeakMap;let ot=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==Be)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Te&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=qe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&qe.set(t,e))}return e}toString(){return this.cssText}};const _t=r=>new ot(typeof r=="string"?r:r+"",void 0,Be),L=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new ot(t,r,Be)},xt=(r,e)=>{if(Te)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=ge.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,r.appendChild(s)}},Ye=Te?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return _t(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:$t,defineProperty:St,getOwnPropertyDescriptor:At,getOwnPropertyNames:kt,getOwnPropertySymbols:Ct,getPrototypeOf:Tt}=Object,Y=globalThis,Oe=Y.trustedTypes,Bt=Oe?Oe.emptyScript:"",xe=Y.reactiveElementPolyfillSupport,re=(r,e)=>r,ve={toAttribute(r,e){switch(e){case Boolean:r=r?Bt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Me=(r,e)=>!$t(r,e),Ge={attribute:!0,type:String,converter:ve,reflect:!1,useDefault:!1,hasChanged:Me};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Y.litPropertyMetadata??(Y.litPropertyMetadata=new WeakMap);let J=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ge){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&St(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:n}=At(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){const l=i==null?void 0:i.call(this);n==null||n.call(this,o),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ge}static _$Ei(){if(this.hasOwnProperty(re("elementProperties")))return;const e=Tt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(re("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(re("properties"))){const t=this.properties,s=[...kt(t),...Ct(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(Ye(i))}else e!==void 0&&t.push(Ye(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return xt(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var n;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:ve).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){var n,o;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:ve;this._$Em=i;const h=a.fromAttribute(t,l.type);this[i]=h??((o=this._$Ej)==null?void 0:o.get(i))??h,this._$Em=null}}requestUpdate(e,t,s){var i;if(e!==void 0){const n=this.constructor,o=this[e];if(s??(s=n.getPropertyOptions(e)),!((s.hasChanged??Me)(o,t)||s.useDefault&&s.reflect&&o===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:l}=o,a=this[n];l!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};J.elementStyles=[],J.shadowRootOptions={mode:"open"},J[re("elementProperties")]=new Map,J[re("finalized")]=new Map,xe==null||xe({ReactiveElement:J}),(Y.reactiveElementVersions??(Y.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ae=globalThis,fe=ae.trustedTypes,je=fe?fe.createPolicy("lit-html",{createHTML:r=>r}):void 0,rt="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,at="?"+q,Mt=`<${at}>`,Z=document,le=()=>Z.createComment(""),he=r=>r===null||typeof r!="object"&&typeof r!="function",Ee=Array.isArray,Et=r=>Ee(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",$e=`[ 	
\f\r]`,ne=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ze=/-->/g,Ke=/>/g,O=RegExp(`>|${$e}(?:([^\\s"'>=/]+)(${$e}*=${$e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xe=/'/g,Je=/"/g,lt=/^(?:script|style|textarea|title)$/i,ht=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),p=ht(1),P=ht(2),Q=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Qe=new WeakMap,G=Z.createTreeWalker(Z,129);function dt(r,e){if(!Ee(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return je!==void 0?je.createHTML(e):e}const Nt=(r,e)=>{const t=r.length-1,s=[];let i,n=e===2?"<svg>":e===3?"<math>":"",o=ne;for(let l=0;l<t;l++){const a=r[l];let h,c,d=-1,b=0;for(;b<a.length&&(o.lastIndex=b,c=o.exec(a),c!==null);)b=o.lastIndex,o===ne?c[1]==="!--"?o=Ze:c[1]!==void 0?o=Ke:c[2]!==void 0?(lt.test(c[2])&&(i=RegExp("</"+c[2],"g")),o=O):c[3]!==void 0&&(o=O):o===O?c[0]===">"?(o=i??ne,d=-1):c[1]===void 0?d=-2:(d=o.lastIndex-c[2].length,h=c[1],o=c[3]===void 0?O:c[3]==='"'?Je:Xe):o===Je||o===Xe?o=O:o===Ze||o===Ke?o=ne:(o=O,i=void 0);const S=o===O&&r[l+1].startsWith("/>")?" ":"";n+=o===ne?a+Mt:d>=0?(s.push(h),a.slice(0,d)+rt+a.slice(d)+q+S):a+q+(d===-2?l:S)}return[dt(r,n+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class de{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let n=0,o=0;const l=e.length-1,a=this.parts,[h,c]=Nt(e,t);if(this.el=de.createElement(h,s),G.currentNode=this.el.content,t===2||t===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=G.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(rt)){const b=c[o++],S=i.getAttribute(d).split(q),m=/([.?@])?(.*)/.exec(b);a.push({type:1,index:n,name:m[2],strings:S,ctor:m[1]==="."?Wt:m[1]==="?"?It:m[1]==="@"?Pt:we}),i.removeAttribute(d)}else d.startsWith(q)&&(a.push({type:6,index:n}),i.removeAttribute(d));if(lt.test(i.tagName)){const d=i.textContent.split(q),b=d.length-1;if(b>0){i.textContent=fe?fe.emptyScript:"";for(let S=0;S<b;S++)i.append(d[S],le()),G.nextNode(),a.push({type:2,index:++n});i.append(d[b],le())}}}else if(i.nodeType===8)if(i.data===at)a.push({type:2,index:n});else{let d=-1;for(;(d=i.data.indexOf(q,d+1))!==-1;)a.push({type:7,index:n}),d+=q.length-1}n++}}static createElement(e,t){const s=Z.createElement("template");return s.innerHTML=e,s}}function ee(r,e,t=r,s){var o,l;if(e===Q)return e;let i=s!==void 0?(o=t._$Co)==null?void 0:o[s]:t._$Cl;const n=he(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=ee(r,i._$AS(r,e.values),i,s)),e}class Vt{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??Z).importNode(t,!0);G.currentNode=i;let n=G.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new pe(n,n.nextSibling,this,e):a.type===1?h=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(h=new Ht(n,this,e)),this._$AV.push(h),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=G.nextNode(),o++)}return G.currentNode=Z,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class pe{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ee(this,e,t),he(e)?e===V||e==null||e===""?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==Q&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Et(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&he(this._$AH)?this._$AA.nextSibling.data=e:this.T(Z.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=de.createElement(dt(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(t);else{const o=new Vt(i,this),l=o.u(this.options);o.p(t),this.T(l),this._$AH=o}}_$AC(e){let t=Qe.get(e.strings);return t===void 0&&Qe.set(e.strings,t=new de(e)),t}k(e){Ee(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const n of e)i===t.length?t.push(s=new pe(this.O(le()),this.O(le()),this,this.options)):s=t[i],s._$AI(n),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class we{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(e,t=this,s,i){const n=this.strings;let o=!1;if(n===void 0)e=ee(this,e,t,0),o=!he(e)||e!==this._$AH&&e!==Q,o&&(this._$AH=e);else{const l=e;let a,h;for(e=n[0],a=0;a<n.length-1;a++)h=ee(this,l[s+a],t,a),h===Q&&(h=this._$AH[a]),o||(o=!he(h)||h!==this._$AH[a]),h===V?e=V:e!==V&&(e+=(h??"")+n[a+1]),this._$AH[a]=h}o&&!i&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Wt extends we{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class It extends we{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class Pt extends we{constructor(e,t,s,i,n){super(e,t,s,i,n),this.type=5}_$AI(e,t=this){if((e=ee(this,e,t,0)??V)===Q)return;const s=this._$AH,i=e===V&&s!==V||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Ht{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){ee(this,e)}}const Se=ae.litHtmlPolyfillSupport;Se==null||Se(de,pe),(ae.litHtmlVersions??(ae.litHtmlVersions=[])).push("3.3.1");const zt=(r,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const n=(t==null?void 0:t.renderBefore)??null;s._$litPart$=i=new pe(e.insertBefore(le(),n),n,void 0,t??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j=globalThis;class H extends J{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=zt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Q}}var nt;H._$litElement$=!0,H.finalized=!0,(nt=j.litElementHydrateSupport)==null||nt.call(j,{LitElement:H});const Ae=j.litElementPolyfillSupport;Ae==null||Ae({LitElement:H});(j.litElementVersions??(j.litElementVersions=[])).push("4.2.1");const Dt=r=>r*Math.PI/180,ct=r=>r/(Math.PI/180),pt=r=>Math.sin(Dt(r)),Ft=r=>1/pt(r);function Ut(r){return Math.asin(Math.min(1,Math.max(-1,r)))}function Rt(r){return Math.acos(Math.min(1,Math.max(-1,r)))}function Lt(r,e){if(r==null||e==null||e===0)return null;const t=r/2/e;return t<-1||t>1?null:Math.floor(ct(Ut(t)))}function qt(r,e){return r==null||e==null?null:Math.floor((r-e)*.125)}function Yt(r,e){if(r==null||e==null)return null;const t=Ft(e)*pt(r);return t<-1||t>1?null:Math.floor(ct(Rt(t)))}function Ot(r){if(!r||r<1)return{total:0,sequence:[]};const e=r/10+1,t=r*e,s=r*2,i=t+2+s,n=i*2,o=[];for(let l=r;l>=9;l-=10)o.push(l);return o.push(5,3,2,1),{total:i,xStrokes:n,sequence:o}}function ke(r){const{hardness:e=60,edgeAngle:t=30,CrC:s=0,CrV:i=0,MC:n=0,M6C:o=0,MN:l=0,CrN:a=0,Fe3C:h=0}=r||{},c=-157+15.8*e-17.8*t+11.2*s+14.6*i+26.2*n+9.5*o+20.9*l+19.4*a+5*h,d=s+i+n+o+l+a+h;return{TCC:Math.round(c),volume:d}}const be=class be extends H{constructor(){super(),this.steels=[],this.filter=[],this.sortKey="name",this.sortDir="asc",this.hardnessValues=[60],this.edgeAngleValues=[30],this.selectedName="",this._load()}async _load(){try{const e=await fetch("./data/steels.json");if(!e.ok)throw new Error("Failed steels.json");const t=await e.json();this.steels=t}catch(e){console.error(e)}}_onFilter(e){const t=e.target;this.filter=t.value||[]}_setHardnessValue(e,t){const s=e.target;if(s.value!==""){const i=Number(s.value);if(!isNaN(i)){const n=[...this.hardnessValues];n[t]=i,this.hardnessValues=n}}}_setEdgeAngleValue(e,t){const s=e.target;if(s.value!==""){const i=Number(s.value);if(!isNaN(i)){const n=[...this.edgeAngleValues];n[t]=i,this.edgeAngleValues=n}}}_validateHardnessValue(e,t){const s=e.target,i=Number(s.value),n=[...this.hardnessValues];isNaN(i)||i<=0?(n[t]=60,s.value="60"):n[t]=i,this.hardnessValues=n}_validateEdgeAngleValue(e,t){const s=e.target,i=Number(s.value),n=[...this.edgeAngleValues];isNaN(i)||i<=0?(n[t]=30,s.value="30"):n[t]=i,this.edgeAngleValues=n}_addHardnessInput(){this.hardnessValues.length<3&&(this.hardnessValues=[...this.hardnessValues,60])}_addAngleInput(){this.edgeAngleValues.length<3&&(this.edgeAngleValues=[...this.edgeAngleValues,30])}_removeHardnessInput(e){if(this.hardnessValues.length>1){const t=[...this.hardnessValues];t.splice(e,1),this.hardnessValues=t}}_removeAngleInput(e){if(this.edgeAngleValues.length>1){const t=[...this.edgeAngleValues];t.splice(e,1),this.edgeAngleValues=t}}_toggleSort(e){this.sortKey===e?this.sortDir=this.sortDir==="asc"?"desc":"asc":(this.sortKey=e,this.sortDir="asc")}_filtered(){const e=this.filter;let t=[];const s=this.hardnessValues.filter(n=>n>0),i=this.edgeAngleValues.filter(n=>n>0);s.length===0&&s.push(60),i.length===0&&i.push(30);for(const n of s)for(const o of i)for(const l of this.steels){if(e.length>0&&!e.includes(l.id))continue;const{TCC:a,volume:h}=ke({hardness:n,edgeAngle:o,...l});t.push({...l,TCC:a,volume:h,hardness:n,edgeAngle:o,combinationId:`${l.name}-${n}-${o}`})}return t.sort((n,o)=>{const l=this.sortDir==="asc"?1:-1;if(this.sortKey==="name"){const a=n.name.localeCompare(o.name);if(a!==0)return a*l;const h=n.hardness-o.hardness;return h!==0?h*l:(n.edgeAngle-o.edgeAngle)*l}return(n[this.sortKey]-o[this.sortKey])*l}),t}_select(e){this.selectedName=e.name;const t={id:e.id,name:e.name,hardness:e.hardness,edgeAngle:e.edgeAngle,carbides:{CrC:e.CrC||0,CrV:e.CrV||0,MC:e.MC||0,M6C:e.M6C||0,MN:e.MN||0,CrN:e.CrN||0,Fe3C:e.Fe3C||0}};this.dispatchEvent(new CustomEvent("steel-selected",{detail:t,bubbles:!0,composed:!0}))}_onRowKey(e,t){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._select(t))}_headerCell(e,t){const s=this.sortKey===e,i=s?this.sortDir==="asc"?"▲":"▼":"",n=s?this.sortDir==="asc"?"ascending":"descending":"none";return p`<th
      @click=${()=>this._toggleSort(e)}
      aria-sort="${n}"
      role="columnheader"
      tabindex="0"
      @keydown=${o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),this._toggleSort(e))}}
    >
      ${t} ${i}
    </th>`}render(){const e=this._filtered();return p`
     

         <div class="toolbar">
        <div class="control-group filter-group">
          <label for="steel-filter">Filter Steels</label>
          <sl-select
            id="steel-filter"
            multiple
            clearable
            placeholder="Select steels to compare..."
            size="small"
            .value=${this.filter}
            @sl-change=${this._onFilter}
          >
            ${this.steels.map(t=>p`
                <sl-option value=${t.id}>${t.name}</sl-option>
              `)}
          </sl-select>
        </div>
      </div>

      </div>
      </div>
        <div class="steel-controls">
            <table class="controls-table">
              <tr>
                <td>Hardness (HRC)</td>
                <td>
                  <div class="multi-input">
                    ${this.hardnessValues.map((t,s)=>p`
                        <div class="input-row">
                          <sl-input
                            size="small"
                            type="number"
                            value=${String(t)}
                            @input=${i=>this._setHardnessValue(i,s)}
                            @blur=${i=>this._validateHardnessValue(i,s)}
                          ></sl-input>
                          ${this.hardnessValues.length>1?p`
                                <sl-button
                                  size="small"
                                  variant="default"
                                  class="remove-button"
                                  @click=${()=>this._removeHardnessInput(s)}
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
                    ${this.edgeAngleValues.map((t,s)=>p`
                        <div class="input-row">
                          <sl-input
                            size="small"
                            type="number"
                            value=${String(t)}
                            @input=${i=>this._setEdgeAngleValue(i,s)}
                            @blur=${i=>this._validateEdgeAngleValue(i,s)}
                          ></sl-input>
                          ${this.edgeAngleValues.length>1?p`
                                <sl-button
                                  size="small"
                                  variant="default"
                                  class="remove-button"
                                  @click=${()=>this._removeAngleInput(s)}
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
                        ${this._headerCell("CrV","CrVC")}
                        ${this._headerCell("MC","MC")}
                        ${this._headerCell("M6C","M6C")}
                        ${this._headerCell("MN","MN")}
                        ${this._headerCell("CrN","CrN")}
                        ${this._headerCell("Fe3C","Fe3C")}
                        ${this._headerCell("volume","Vol%")}
                      </tr>
                    </thead>
                    <tbody>
                      ${e.map(t=>p` <tr
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
                          <td class="tcc">${t.TCC.toFixed(0)}</td>
                          <td>${(t.CrC||0).toFixed(1)}</td>
                          <td>${(t.CrV||0).toFixed(1)}</td>
                          <td>${(t.MC||0).toFixed(1)}</td>
                          <td>${(t.M6C||0).toFixed(1)}</td>
                          <td>${(t.MN||0).toFixed(1)}</td>
                          <td>${(t.CrN||0).toFixed(1)}</td>
                          <td>${(t.Fe3C||0).toFixed(1)}</td>
                          <td class="vol-cell">
                            ${((t.CrC||0)+(t.CrV||0)+(t.MC||0)+(t.M6C||0)+(t.MN||0)+(t.CrN||0)+(t.Fe3C||0)).toFixed(1)}
                          </td>
                        </tr>`)}
                    </tbody>
                  </table>
                </div>`:p`<div class="empty">No steels found.</div>`}
        </div>
      
    `}};be.styles=L`
    :host {
      display: block;
      color: var(--sl-color-neutral-900);
    }
    .table-wrap {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 8px;
      background: var(--sl-color-neutral-0);
      position: relative;
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
      background: linear-gradient(
        to left,
        var(--sl-color-neutral-0),
        transparent
      );
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
    .control-group.filter-group {
      flex-direction: column;
      align-items: stretch;
      gap: 0.4rem;
    }
    .control-group.filter-group label {
      font-weight: 500;
      font-size: 0.9rem;
      color: var(--sl-color-neutral-700);
    }
    .control-group.filter-group sl-select {
      width: 100%;
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
      background: var(--sl-color-neutral-0);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 1rem;
    }
    .controls-table {
      width: 100%;
      border-collapse: collapse;
    }
    .controls-table td {
      border-bottom: 1px solid var(--sl-color-neutral-200);
      padding: 0.5rem 0.75rem;
      vertical-align: middle;
    }
    .controls-table td:first-child {
      font-weight: 500;
      width: 25%;
      background: var(--sl-color-neutral-50);
      border-right: 1px solid var(--sl-color-neutral-200);
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
    .dark .controls-table td:first-child {
      background: var(--vsa-surface);
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
    .dark th {
      border-bottom: 1px solid var(--vsa-border);
    }
    tbody tr {
      border-top: 1px solid var(--sl-color-neutral-200);
    }
    tbody tr:hover {
      background: var(--sl-color-neutral-100);
    }

    /* two-tone zebra striping using Shoelace tokens */
    tbody tr:nth-child(even) {
      background: var(--sl-color-neutral-50);
    }
    tbody tr:nth-child(odd) {
      background: transparent;
    }
    tbody tr:focus {
      outline: 2px solid var(--sl-color-primary-600);
      outline-offset: -2px;
      background: var(--sl-color-neutral-150);
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
  `,be.properties={steels:{type:Array},filter:{type:Array},sortKey:{type:String},sortDir:{type:String},hardnessValues:{type:Array},edgeAngleValues:{type:Array},selectedName:{type:String}};let ye=be;customElements.define("vsa-steel-table",ye);const Gt=Object.freeze(Object.defineProperty({__proto__:null,VsaSteelTable:ye},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const jt=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zt={attribute:!0,type:String,converter:ve,reflect:!1,hasChanged:Me},Kt=(r=Zt,e,t)=>{const{kind:s,metadata:i}=t;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(t.name,r),s==="accessor"){const{name:o}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.C(o,void 0,r,l),l}}}if(s==="setter"){const{name:o}=t;return function(l){const a=this[o];e.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function g(r){return(e,t)=>typeof t=="object"?Kt(r,e,t):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function N(r){return g({...r,state:!0,attribute:!1})}const Xt=/^(mm|in)=>/i,Jt=/^([0-9]*\.?[0-9]+)(h|H|oa)$/i,Qt=/^([0-9]*\.?[0-9]+)(dps|d|inc|inclusive|i)-([0-9]*\.?[0-9]+)(h|height|w|width)$/i,es=/^([0-9]*\.?[0-9]+)w@([0-9]*\.?[0-9]+)(h|height)$/i,ts=/^([0-9]*\.?[0-9]+)w@([0-9]*\.?[0-9]+)cp$/i,ss=/^([0-9]*\.?[0-9]+)w@([0-9]*\.?[0-9]+)acp$/i;function R(r){return parseFloat(r)}function is(r){return r*2}function et(r){return r*Math.PI/180}function oe(r){return r*180/Math.PI}function ns(r,e){if(r<=0||e<=0)return null;let t=Math.min(Math.sqrt(r/(2*e)),Math.PI/3);for(let s=0;s<15;s++){const i=Math.sin(t),n=Math.cos(t);if(Math.abs(n)<1e-6)break;const o=2*e*i*i/n-r,l=4*e*i+2*e*i*i*i/(n*n);if(Math.abs(l)<1e-12)break;const a=t-o/l;if(!isFinite(a)||a<=0)break;if(Math.abs(a-t)<1e-9){t=a;break}if(t=a,t>Math.PI/2-1e-4){t=Math.PI/2-1e-4;break}}return!isFinite(t)||t<=0?null:t}function os(r){const e=r.match(Xt);return e?{unit:e[1].toLowerCase(),rest:r.slice(e[0].length)}:{unit:null,rest:r}}function ue(r,e){const t=[];let s=r.trim();const{unit:i,rest:n}=os(s);i&&(s=n.trim());const o=i??null,l=i??e,a=l==="mm"?1:25.4;if(!s)return{segments:[],warnings:t,normalized:"",unit:e,notationUnits:i??void 0};const h=s.split(",").map(m=>m.trim()).filter(Boolean),c=[],d={currWidth:0,currHeight:0,lastInclusiveAngleDeg:null};let b;for(let m=0;m<h.length;m++){const C=h[m];let f=C.match(Jt);if(f){b=R(f[1])*a;continue}if(f=C.match(Qt),f){const u=R(f[1]),y=f[2].toLowerCase(),x=R(f[3])*a,T=f[4].toLowerCase(),v=y.startsWith("inc")||y==="i"?"inclusive":"dps",k=v==="dps"?is(u):u;if(T.startsWith("h")){if(x<=d.currHeight){t.push(`Segment ${m+1}: height ${x.toFixed(4)} not greater than previous height.`);continue}c.push({angleType:v,angleValue:u,travelType:"height",travelValue:x}),d.lastInclusiveAngleDeg=k}else{if(x<=d.currWidth){t.push(`Segment ${m+1}: width ${x.toFixed(4)} not greater than previous width.`);continue}if(k===0){t.push(`Segment ${m+1}: zero angle with width travel ignored.`);continue}c.push({angleType:v,angleValue:u,travelType:"width",travelValue:x}),d.lastInclusiveAngleDeg=k}if(c[c.length-1].travelType==="height"){d.currHeight=c[c.length-1].travelValue;const B=et(k)/2;d.currWidth===0?d.currWidth=2*d.currHeight*Math.tan(B):d.currWidth=d.currWidth+2*(d.currHeight-d.currHeight)*Math.tan(B)}else{const B=c[c.length-1].travelValue,E=et(k)/2,D=B-d.currWidth,_e=d.currWidth===0?B/2/Math.tan(E):D/(2*Math.tan(E));d.currHeight+=_e,d.currWidth=B}continue}if(f=C.match(es),f){const u=R(f[1])*a,y=R(f[2])*a;if(y<=d.currHeight){t.push(`Segment ${m+1}: target height not greater than previous.`);continue}const x=y-d.currHeight,T=u-d.currWidth;if(T<=0){t.push(`Segment ${m+1}: thickness not greater than previous width.`);continue}let v;if(d.currWidth===0&&d.currHeight===0?v=oe(2*Math.atan(u/(2*y))):v=oe(2*Math.atan(T/(2*x))),!isFinite(v)||v<=0){t.push(`Segment ${m+1}: could not derive angle from thickness@height.`);continue}c.push({angleType:"inclusive",angleValue:v,travelType:"height",travelValue:y}),d.currHeight=y,d.currWidth=u,d.lastInclusiveAngleDeg=v;continue}if(f=C.match(ts),f){const u=R(f[1])*a,y=R(f[2])*a;if(u<=d.currWidth){t.push(`Segment ${m+1}: caliper thickness not greater than previous width.`);continue}const x=u-d.currWidth;let T=ns(x,y);if(!T&&x>0&&y>0&&(T=Math.sqrt(x/(2*y))),!T||!isFinite(T)){t.push(`Segment ${m+1}: failed to solve angle from caliper.`);continue}const v=oe(T*2),k=y*Math.sin(T),B=u;c.push({angleType:"inclusive",angleValue:v,travelType:"width",travelValue:B}),d.currWidth=B,d.currHeight+=k,d.lastInclusiveAngleDeg=v;continue}if(f=C.match(ss),f){const u=R(f[1])*a,y=R(f[2])*a;if(u<=d.currWidth){t.push(`Segment ${m+1}: apex caliper thickness not greater than previous width.`);continue}const x=u/2,T=y*y-x*x;if(T<=0){t.push(`Segment ${m+1}: apex caliper distance ${y.toFixed(4)} too small for thickness ${u.toFixed(4)}.`);continue}const v=Math.sqrt(T);let k;if(d.currWidth===0&&d.currHeight===0){const B=Math.atan(x/v);k=oe(B*2)}else{const B=u-d.currWidth,E=v-d.currHeight;if(E<=0){t.push(`Segment ${m+1}: apex caliper target height ${v.toFixed(4)} not greater than current height ${d.currHeight.toFixed(4)}.`);continue}const D=Math.atan(B/(2*E));k=oe(D*2)}if(!isFinite(k)||k<=0){t.push(`Segment ${m+1}: could not derive angle from apex caliper measurement.`);continue}c.push({angleType:"inclusive",angleValue:k,travelType:"height",travelValue:v}),d.currHeight=v,d.currWidth=u,d.lastInclusiveAngleDeg=k;continue}t.push(`Token ${m+1} '${C}' not recognized.`)}if(b!==void 0){const m=d.currHeight;b>m+1e-6&&c.push({angleType:"inclusive",angleValue:0,travelType:"height",travelValue:b})}const S=(o?o+"=>":"")+h.join(",");return{segments:c,warnings:t,overallHeight:b,unit:l,notationUnits:o??void 0,normalized:S}}class rs{constructor(){this.dbName="VSANotationStorage",this.dbVersion=1,this.storeName="notations",this.db=null}async init(){return new Promise((e,t)=>{const s=indexedDB.open(this.dbName,this.dbVersion);s.onerror=()=>{t(new Error("Failed to open IndexedDB"))},s.onsuccess=()=>{this.db=s.result,e()},s.onupgradeneeded=i=>{const n=i.target.result;if(!n.objectStoreNames.contains(this.storeName)){const o=n.createObjectStore(this.storeName,{keyPath:"id",autoIncrement:!0});o.createIndex("name","name",{unique:!1}),o.createIndex("lastModified","lastModified",{unique:!1})}}})}async ensureDB(){if(this.db||await this.init(),!this.db)throw new Error("Database not initialized");return this.db}async saveNotation(e){const t=await this.ensureDB();return new Promise((s,i)=>{const o=t.transaction([this.storeName],"readwrite").objectStore(this.storeName),l={...e,lastModified:new Date},a=o.put(l);a.onsuccess=()=>{s(a.result)},a.onerror=()=>{i(new Error("Failed to save notation"))}})}async getAllNotations(){const e=await this.ensureDB();return new Promise((t,s)=>{const l=e.transaction([this.storeName],"readonly").objectStore(this.storeName).index("lastModified").openCursor(null,"prev"),a=[];l.onsuccess=()=>{const h=l.result;h?(a.push(h.value),h.continue()):t(a)},l.onerror=()=>{s(new Error("Failed to retrieve notations"))}})}async getNotation(e){const t=await this.ensureDB();return new Promise((s,i)=>{const l=t.transaction([this.storeName],"readonly").objectStore(this.storeName).get(e);l.onsuccess=()=>{s(l.result||null)},l.onerror=()=>{i(new Error("Failed to retrieve notation"))}})}async deleteNotation(e){const t=await this.ensureDB();return new Promise((s,i)=>{const l=t.transaction([this.storeName],"readwrite").objectStore(this.storeName).delete(e);l.onsuccess=()=>{s()},l.onerror=()=>{i(new Error("Failed to delete notation"))}})}async searchNotations(e){const t=await this.getAllNotations(),s=e.toLowerCase();return t.filter(i=>i.name.toLowerCase().includes(s))}async getStorageStats(){const e=await this.getAllNotations(),t=e.reduce((s,i)=>s+i.name.length*2+i.notation.length*2+50,0);return{count:e.length,totalSize:t}}async clearAll(){const e=await this.ensureDB();return new Promise((t,s)=>{const o=e.transaction([this.storeName],"readwrite").objectStore(this.storeName).clear();o.onsuccess=()=>{t()},o.onerror=()=>{s(new Error("Failed to clear notations"))}})}async exportNotations(){const e=await this.getAllNotations();return JSON.stringify(e,null,2)}async importNotations(e){try{const t=JSON.parse(e);let s=0;for(const i of t){const{id:n,...o}=i;await this.saveNotation(o),s++}return s}catch{throw new Error("Invalid JSON data for import")}}}const me=new rs;me.init().catch(console.error);var as=Object.defineProperty,ls=Object.getOwnPropertyDescriptor,I=(r,e,t,s)=>{for(var i=s>1?void 0:s?ls(e,t):e,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&as(e,t,i),i};let W=class extends H{constructor(){super(...arguments),this.open=!1,this.side="A",this.units="mm",this.segments=[],this._workingUnits="mm",this._workingSegments=[],this._editingSegmentId=null,this._newSegmentType="",this._newSegmentValues={},this._savedNotations=[],this._showSaveDialog=!1,this._showLoadDialog=!1,this._saveNotationName=""}connectedCallback(){super.connectedCallback(),this._initializeWorkingData()}updated(r){r.has("open")&&this.open&&(this._initializeWorkingData(),this._loadSavedNotations()),r.has("units")&&this.open&&(this._workingUnits=this.units)}_initializeWorkingData(){this._workingUnits=this.units,this._workingSegments=[...this.segments],this._editingSegmentId=null,this._newSegmentType="",this._newSegmentValues={}}async _loadSavedNotations(){try{this._savedNotations=await me.getAllNotations()}catch(r){console.error("Failed to load saved notations:",r),this._savedNotations=[]}}async _saveCurrentNotation(){if(this._saveNotationName.trim())try{let e=this._workingSegments.map(s=>s.notation).join(",");e=`${this._workingUnits}=>${e}`;const t={name:this._saveNotationName.trim(),notation:e,lastModified:new Date};await me.saveNotation(t),await this._loadSavedNotations(),this._showSaveDialog=!1,this._saveNotationName=""}catch(r){console.error("Failed to save notation:",r)}}async _loadNotation(r){try{const e=r.notation;let t=this.units,s=e;const i=e.match(/^(mm|in)=>(.+)$/);i&&(t=i[1],s=i[2]),this._showLoadDialog=!1;const n=new CustomEvent("dialog-apply",{detail:{notation:r.notation,units:t,segments:[]}});this.dispatchEvent(n)}catch(e){console.error("Failed to load notation:",e)}}async _deleteNotation(r){try{await me.deleteNotation(r),await this._loadSavedNotations()}catch(e){console.error("Failed to delete notation:",e)}}_convertValue(r,e,t){return e===t?r:e==="mm"&&t==="in"?Math.round(r/25.4*1e6)/1e6:Math.round(r*25.4*1e4)/1e4}_isAngleValue(r){var e;return r.key==="angle"||r.suffix==="°"||r.key.includes("angle")||((e=r.label)==null?void 0:e.toLowerCase().includes("angle"))}_onUnitsChange(r){var i,n;const e=r.target,t=((i=r.detail)==null?void 0:i.value)||(e==null?void 0:e.value)||((n=e==null?void 0:e.getAttribute)==null?void 0:n.call(e,"value")),s=this._workingUnits;if(!(!t||t===s)){if(console.log("Units changing from",s,"to",t),this._workingSegments=this._workingSegments.map(o=>{const l={...o.values},a=this._getSegmentTypeConfig(o.type);return a&&a.values.forEach(h=>{h.type==="number"&&typeof l[h.key]=="number"&&!this._isAngleValue(h)&&(l[h.key]=this._convertValue(l[h.key],s,t))}),{...o,values:l,notation:this._buildNotationFromValues(o.type,l,t)}}),this._newSegmentType){const o=this._getSegmentTypeConfig(this._newSegmentType);o&&o.values.forEach(l=>{l.type==="number"&&typeof this._newSegmentValues[l.key]=="number"&&!this._isAngleValue(l)&&(this._newSegmentValues[l.key]=this._convertValue(this._newSegmentValues[l.key],s,t))})}this._workingUnits=t}}_handleUnitsChange(r){const e=this._workingUnits;if(!(!r||r===e)){if(console.log("Units changing from",e,"to",r),this._workingSegments=this._workingSegments.map(t=>{const s={...t.values},i=this._getSegmentTypeConfig(t.type);return i&&i.values.forEach(n=>{n.type==="number"&&typeof s[n.key]=="number"&&!this._isAngleValue(n)&&(s[n.key]=this._convertValue(s[n.key],e,r))}),{...t,values:s,notation:this._buildNotationFromValues(t.type,s,r)}}),this._newSegmentType){const t=this._getSegmentTypeConfig(this._newSegmentType);t&&t.values.forEach(s=>{s.type==="number"&&typeof this._newSegmentValues[s.key]=="number"&&!this._isAngleValue(s)&&(this._newSegmentValues[s.key]=this._convertValue(this._newSegmentValues[s.key],e,r))})}this._workingUnits=r}}_getSegmentTypeConfig(r){return{"angle-travel":{name:"Angle + Travel",description:"Create geometry by specifying an angle and either a target height or width.",measurementGuide:"Use a protractor or angle gauge to measure the bevel angle. Measure height with calipers vertically from apex, or width with calipers across the blade thickness.",values:[{key:"angleMode",label:"Angle Mode",type:"select",options:["dps","inclusive"]},{key:"angle",label:"Angle",suffix:"°",type:"number"},{key:"travelMode",label:"Travel Mode",type:"select",options:["height","width"]},{key:"travel",label:"Target Value",suffix:this._workingUnits,type:"number"}]},"thickness-height":{name:"Thickness @ Height",description:"Specify exact thickness at a specific height. The angle is calculated automatically.",measurementGuide:"Use precision calipers to measure blade thickness at the exact height position. Take photos with a scale for reference.",values:[{key:"thickness",label:"Thickness",suffix:this._workingUnits,type:"number"},{key:"height",label:"Height",suffix:this._workingUnits,type:"number"}]},caliper:{name:"Face Caliper",description:"Measure along the bevel face from the previous point to achieve target thickness.",measurementGuide:"Use calipers to measure the slant distance along the bevel face. This is useful for incremental measurements during grinding.",values:[{key:"thickness",label:"Target Thickness",suffix:this._workingUnits,type:"number"},{key:"distance",label:"Slant Distance",suffix:this._workingUnits,type:"number"}]},"apex-caliper":{name:"Apex Caliper",description:"Measure total distance from apex to outer edge at target thickness.",measurementGuide:"Use calipers to measure from the very apex (tip) to the outer edge of the blade at the specified thickness. This is a global constraint measurement.",values:[{key:"thickness",label:"Target Thickness",suffix:this._workingUnits,type:"number"},{key:"distance",label:"Apex Distance",suffix:this._workingUnits,type:"number"}]}}[r]||null}roundAndTrimTrailingZeros(r){return typeof r=="string"?r:(Math.round(r*1e6)/1e6).toString().replace(/\.?0+$/,"")}_buildNotationFromValues(r,e,t){let s="";const i=n=>this.roundAndTrimTrailingZeros(n);switch(r){case"angle-travel":const n=i(e.angle),o=e.angleMode==="inclusive"?"inc":"dps",l=i(e.travel),a=e.travelMode==="height"?"h":"w";s=`${n}${o}-${l}${a}`;break;case"thickness-height":s=`${i(e.thickness)}w@${i(e.height)}h`;break;case"caliper":s=`${i(e.thickness)}w@${i(e.distance)}cp`;break;case"apex-caliper":s=`${i(e.thickness)}w@${i(e.distance)}acp`;break;default:return""}return s}_startAddingSegment(r){this._newSegmentType=r,this._newSegmentValues={},this._editingSegmentId=null;const e=this._getSegmentTypeConfig(r);e&&e.values.forEach(t=>{var s;t.type==="select"&&((s=t.options)!=null&&s.length)?this._newSegmentValues[t.key]=t.options[0]:t.type==="number"&&(this._newSegmentValues[t.key]=0)})}_editSegment(r){this._editingSegmentId=r.id,this._newSegmentType=r.type,this._newSegmentValues={...r.values}}_deleteSegment(r){this._workingSegments=this._workingSegments.filter(e=>e.id!==r)}_saveCurrentSegment(){if(!this._newSegmentType)return;const r=this._buildNotationFromValues(this._newSegmentType,this._newSegmentValues,this._workingUnits);if(this._editingSegmentId)this._workingSegments=this._workingSegments.map(e=>e.id===this._editingSegmentId?{...e,values:{...this._newSegmentValues},notation:r}:e);else{const e={id:Date.now().toString(),type:this._newSegmentType,values:{...this._newSegmentValues},notation:r};this._workingSegments=[...this._workingSegments,e]}this._cancelSegmentEdit()}_cancelSegmentEdit(){this._newSegmentType="",this._newSegmentValues={},this._editingSegmentId=null}_onValueChange(r,e){this._newSegmentValues={...this._newSegmentValues,[r]:e}}_apply(){let e=this._workingSegments.map(s=>s.notation).join(",");e=`${this._workingUnits}=>${e}`;const t=new CustomEvent("dialog-apply",{detail:{notation:e,units:this._workingUnits,segments:this._workingSegments}});this.dispatchEvent(t)}_cancel(){this.dispatchEvent(new CustomEvent("dialog-cancel"))}render(){return p`
      <sl-dialog
        .open=${this.open}
        .label=${"Build Notation Editor - Side "+this.side}
        style="--width: 90vw; --height: 90vh;"
        @sl-hide=${this._cancel}
      >
        <div class="units-selector">
          <label>Measurement Units:</label>
          <sl-radio-group
            .value=${this._workingUnits}
            @sl-change=${r=>{const t=r.target.value;console.log("Radio group value changed to:",t),this._handleUnitsChange(t)}}
          >
            <sl-radio-button value="mm">mm</sl-radio-button>
            <sl-radio-button value="in">in</sl-radio-button>
          </sl-radio-group>
        </div>

        <div class="dialog-body">
          ${this._newSegmentType||this._editingSegmentId?p`
                <!-- Segment form takes priority - hide list while editing -->
                <div class="add-segment-section">
                  <h3>
                    ${this._editingSegmentId?"Edit":"Add New"} Segment
                  </h3>
                  <div class="segment-form">${this._renderSegmentForm()}</div>
                </div>
              `:p`
                <!-- Show segment list and add buttons when not editing -->
                ${this._workingSegments.length===0?p`
                      <div class="empty-state">
                        <sl-icon name="layers"></sl-icon>
                        <h3>No segments defined</h3>
                        <p>Add segments below to build your notation.</p>
                      </div>
                    `:p`
                      <div class="segment-list">
                        ${this._workingSegments.map((r,e)=>{var t;return p`
                            <div class="segment-item">
                              <div class="segment-info">
                                <div class="segment-type">
                                  ${((t=this._getSegmentTypeConfig(r.type))==null?void 0:t.name)||r.type}
                                </div>
                                <div class="segment-notation">
                                  ${r.notation}
                                </div>
                              </div>
                              <div class="segment-actions">
                                <sl-icon-button
                                  name="pencil"
                                  @click=${()=>this._editSegment(r)}
                                  label="Edit segment"
                                ></sl-icon-button>
                                <sl-icon-button
                                  name="trash"
                                  variant="danger"
                                  @click=${()=>this._deleteSegment(r.id)}
                                  label="Delete segment"
                                ></sl-icon-button>
                              </div>
                            </div>
                          `})}
                      </div>
                    `}

                <div class="add-segment-section">
                  <h3>Add New Segment</h3>
                  <div class="add-segment-buttons">
                    ${Object.entries({"angle-travel":"Angle + Travel","thickness-height":"Thickness @ Height",caliper:"Face Caliper","apex-caliper":"Apex Caliper"}).map(([r,e])=>p`
                        <sl-button
                          class="segment-type-button"
                          variant="default"
                          @click=${()=>this._startAddingSegment(r)}
                        >
                          ${e}
                        </sl-button>
                      `)}
                  </div>
                </div>
              `}
        </div>

        <div class="dialog-footer" slot="footer">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span
              style="color: var(--sl-color-neutral-600); font-size: 0.9rem;"
            >
              ${this._workingSegments.length}
              segment${this._workingSegments.length===1?"":"s"} •
              ${this._workingUnits}
            </span>
            ${this._newSegmentType||this._editingSegmentId?p``:p`
                  <!-- Show save/load buttons when not editing segments -->
                  <sl-button
                    size="small"
                    variant="default"
                    @click=${()=>this._showLoadDialog=!0}
                  >
                    Load
                  </sl-button>
                  <sl-button
                    size="small"
                    variant="default"
                    @click=${()=>this._showSaveDialog=!0}
                    .disabled=${this._workingSegments.length===0}
                  >
                    Save
                  </sl-button>
                `}
          </div>
          <div class="footer-actions">
            ${this._newSegmentType||this._editingSegmentId?p`
                  <!-- Show segment-specific buttons when editing -->
                  <sl-button
                    variant="default"
                    @click=${this._cancelSegmentEdit}
                  >
                    Cancel
                  </sl-button>
                  <sl-button
                    variant="primary"
                    @click=${this._saveCurrentSegment}
                  >
                    ${this._editingSegmentId?"Update":"Add"} Segment
                  </sl-button>
                `:p`
                  <!-- Show main dialog buttons when not editing -->
                  <sl-button variant="default" @click=${this._cancel}>
                    Cancel
                  </sl-button>
                  <sl-button variant="primary" @click=${this._apply}>
                    Apply Changes
                  </sl-button>
                `}
          </div>
        </div>
      </sl-dialog>

      <!-- Save Notation Dialog -->
      <sl-dialog
        .open=${this._showSaveDialog}
        label="Save Notation"
        @sl-hide=${()=>this._showSaveDialog=!1}
      >
        <div style="margin-bottom: 1rem;">
          <sl-input
            label="Notation Name"
            placeholder="Enter a name for this notation..."
            .value=${this._saveNotationName}
            @sl-input=${r=>{this._saveNotationName=r.target.value}}
            @keydown=${r=>{r.key==="Enter"&&this._saveNotationName.trim()&&this._saveCurrentNotation()}}
          ></sl-input>
        </div>
        <div slot="footer">
          <sl-button
            variant="default"
            @click=${()=>this._showSaveDialog=!1}
          >
            Cancel
          </sl-button>
          <sl-button
            variant="primary"
            @click=${this._saveCurrentNotation}
            .disabled=${!this._saveNotationName.trim()}
          >
            Save
          </sl-button>
        </div>
      </sl-dialog>

      <!-- Load Notation Dialog -->
      <sl-dialog
        .open=${this._showLoadDialog}
        label="Load Saved Notation"
        style="--width: 600px;"
        @sl-hide=${()=>this._showLoadDialog=!1}
      >
        <div style="max-height: 400px; overflow-y: auto;">
          ${this._savedNotations.length===0?p`
                <div
                  style="text-align: center; padding: 2rem; color: var(--sl-color-neutral-500);"
                >
                  <sl-icon
                    name="inbox"
                    style="font-size: 3rem; margin-bottom: 1rem;"
                  ></sl-icon>
                  <p>No saved notations found.</p>
                </div>
              `:p`
                <div
                  style="display: flex; flex-direction: column; gap: 0.5rem;"
                >
                  ${this._savedNotations.map(r=>p`
                      <div
                        style="display: flex; align-items: center; padding: 0.75rem; border: 1px solid var(--sl-color-neutral-200); border-radius: 6px; background: var(--sl-color-neutral-25);"
                      >
                        <div style="flex: 1;">
                          <div
                            style="font-weight: 500; margin-bottom: 0.25rem;"
                          >
                            ${r.name}
                          </div>
                          <div
                            style="font-size: 0.8rem; color: var(--sl-color-neutral-600); font-family: monospace; background: var(--sl-color-neutral-0); padding: 0.25rem 0.5rem; border-radius: 4px; margin-bottom: 0.25rem;"
                          >
                            ${r.notation}
                          </div>
                          <div
                            style="font-size: 0.75rem; color: var(--sl-color-neutral-500);"
                          >
                            ${new Date(r.lastModified).toLocaleString()}
                          </div>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                          <sl-button
                            size="small"
                            variant="primary"
                            @click=${()=>this._loadNotation(r)}
                          >
                            Load
                          </sl-button>
                          <sl-icon-button
                            name="trash"
                            variant="danger"
                            @click=${()=>this._deleteNotation(r.id)}
                            label="Delete notation"
                          ></sl-icon-button>
                        </div>
                      </div>
                    `)}
                </div>
              `}
        </div>
        <div slot="footer">
          <sl-button
            variant="default"
            @click=${()=>this._showLoadDialog=!1}
          >
            Close
          </sl-button>
        </div>
      </sl-dialog>
    `}_renderSegmentForm(){const r=this._getSegmentTypeConfig(this._newSegmentType);return r?p`
      <h4>${r.name}</h4>
      <div class="form-description">
        ${r.description}<br />
        <strong>Measurement tip:</strong> ${r.measurementGuide}
      </div>

      ${r.values.map(e=>{var t,s;return p`
          <div class="form-field">
            ${e.type==="select"?p`
                  <label class="form-label">${e.label}</label>
                  <sl-radio-group
                    .value=${this._newSegmentValues[e.key]||((t=e.options)==null?void 0:t[0])}
                    @sl-change=${i=>this._onValueChange(e.key,i.detail.value)}
                  >
                    ${(s=e.options)==null?void 0:s.map(i=>p`
                        <sl-radio-button value=${i}>
                          ${i==="dps"?"DPS":i==="inclusive"?"Inclusive":i==="height"?"Height":i==="width"?"Width":i}
                        </sl-radio-button>
                      `)}
                  </sl-radio-group>
                `:p`
                  <sl-input
                    type="number"
                    label=${e.label}
                    .value=${String(this._newSegmentValues[e.key]||0)}
                    @sl-input=${i=>this._onValueChange(e.key,Number(i.target.value))}
                    suffix=${e.suffix||""}
                    step=${e.suffix==="°"?"0.1":this._workingUnits==="mm"?"0.01":"0.001"}
                  ></sl-input>
                `}
          </div>
        `})}
    `:p``}};W.styles=L`
    :host {
      display: contents;
    }

    .units-selector {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .units-selector sl-radio-group {
      --sl-spacing-medium: 0.5rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--sl-color-neutral-700);
    }

    .form-field {
      margin-bottom: 1rem;
    }

    .form-field sl-radio-group {
      --sl-spacing-medium: 0.5rem;
    }

    .units-selector label {
      font-weight: 500;
      color: var(--sl-color-neutral-700);
    }

    .dialog-body {
      max-height: 60vh;
      overflow-y: auto;
    }

    .segment-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .segment-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--sl-color-neutral-50);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 8px;
      transition: border-color 0.15s ease;
    }

    .segment-item:hover {
      border-color: var(--sl-color-primary-300);
    }

    .segment-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .segment-type {
      font-weight: 600;
      color: var(--sl-color-neutral-900);
      font-size: 0.9rem;
    }

    .segment-notation {
      font-family: monospace;
      color: var(--sl-color-primary-600);
      font-size: 0.85rem;
      background: var(--sl-color-neutral-0);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      border: 1px solid var(--sl-color-neutral-300);
    }

    .segment-actions {
      display: flex;
      gap: 0.5rem;
    }

    .add-segment-section {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--sl-color-neutral-200);
    }

    .add-segment-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .segment-type-button {
      flex: 1;
      min-width: 200px;
    }

    .segment-form {
      margin-top: 1.5rem;
      padding: 1.5rem;
      background: var(--sl-color-neutral-25);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 8px;
    }

    .form-field {
      margin-bottom: 1rem;
    }

    .form-field:last-child {
      margin-bottom: 0;
    }

    .form-description {
      font-size: 0.85rem;
      color: var(--sl-color-neutral-600);
      margin-bottom: 1rem;
      line-height: 1.4;
    }

    .dialog-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      border-top: 1px solid var(--sl-color-neutral-200);
      gap: 1rem;
    }

    .footer-actions {
      display: flex;
      gap: 0.75rem;
    }

    .empty-state {
      text-align: center;
      padding: 2rem;
      color: var(--sl-color-neutral-500);
    }

    .empty-state sl-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    @media (max-width: 768px) {
      .units-selector {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .dialog-footer {
        padding: 1rem;
        flex-direction: column;
        align-items: stretch;
      }

      .footer-actions {
        width: 100%;
      }

      .footer-actions sl-button {
        flex: 1;
      }

      .segment-type-button {
        min-width: unset;
      }
    }
  `;I([g({type:Boolean})],W.prototype,"open",2);I([g({type:String})],W.prototype,"side",2);I([g({type:String})],W.prototype,"units",2);I([g({type:Array})],W.prototype,"segments",2);I([N()],W.prototype,"_workingUnits",2);I([N()],W.prototype,"_workingSegments",2);I([N()],W.prototype,"_editingSegmentId",2);I([N()],W.prototype,"_newSegmentType",2);I([N()],W.prototype,"_newSegmentValues",2);I([N()],W.prototype,"_savedNotations",2);I([N()],W.prototype,"_showSaveDialog",2);I([N()],W.prototype,"_showLoadDialog",2);I([N()],W.prototype,"_saveNotationName",2);W=I([jt("vsa-notation-editor-dialog")],W);var hs=Object.defineProperty,ds=Object.getOwnPropertyDescriptor,$=(r,e,t,s)=>{for(var i=s>1?void 0:s?ds(e,t):e,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&hs(e,t,i),i};class tt{constructor(e=[],t=!1,s=3){this.segments=[],this.apexMacro=!1,this.maxApexHeight=3,this.segments=[...e],this.apexMacro=t,this.maxApexHeight=s}setSegments(e){this.segments=[...e]}getSegments(){return[...this.segments]}setApexMacro(e){this.apexMacro=e}_createApexModel(e){if(!e.length||!this.apexMacro)return e;const t=this._recomputeSegments(e),s=[];let i=0;for(let n=0;n<t.length;n++){const o=t[n],l=o.derivedHeight??i;if(i>=this.maxApexHeight)break;if(l<=this.maxApexHeight)s.push({...o}),i=l;else{const a={...o};if(o.travelType==="height")a.travelValue=this.maxApexHeight-i,a.derivedHeight=this.maxApexHeight;else{const h=l-i,d=(this.maxApexHeight-i)/h;a.travelValue=o.travelValue*d}s.push(a);break}}return s}_recomputeSegments(e){let t=0,s=0;return e.map(i=>{const n=i.angleType==="dps"?i.angleValue*2:i.angleValue,o=n*Math.PI/360;let l=t,a=s;if(i.travelType==="width"){const c=i.travelValue;if(n===0)l=t,a=s;else{l=c;const d=t===0?l/2/Math.tan(o):(l-t)/(2*Math.tan(o));a=s+d}}else{const c=i.travelValue;c<s?a=s:a=c;const d=a-s;n===0?l=t:t===0?l=2*a*Math.tan(o):l=t+2*d*Math.tan(o)}const h={...i,angleInclusive:n,derivedWidth:l,derivedHeight:a};return t=l,s=a,h})}compute(){const e=this._createApexModel(this.segments),t=this._recomputeSegments(e);let s=0,i=0;const n=[];for(const o of t){const l=o.derivedWidth??i,a=o.derivedHeight??s;n.push({angleInclusive:o.angleInclusive??(o.angleType==="dps"?o.angleValue*2:o.angleValue),startWidth:i,endWidth:l,startY:s,endY:a}),s=a,i=l}return n}getTotalHeight(){const e=this.compute();return e.length?e[e.length-1].endY:5}getMaxWidth(){const e=this.compute();return e.length?e[e.length-1].endWidth:2}widthAtY(e,t){if(!e.length||t<=0)return 0;for(const s of e)if(t<=s.endY){if(s.startY===s.endY)return s.endWidth;const i=(t-s.startY)/(s.endY-s.startY);return s.startWidth+(s.endWidth-s.startWidth)*i}return e[e.length-1].endWidth}}const Pe=class Pe extends H{constructor(){super(),this.angleInput=15,this.thicknessInput=.5,this.angleInputB=15,this.thicknessInputB=.5,this.angleInputType="dps",this.angleInputTypeB="dps",this.travelInputType="width",this.travelInputTypeB="width",this.zoom=1,this.pan=0,this._geometryA=new tt,this._geometryB=new tt,this.warning=null,this._storageKey="vsa-geometry-builder-state",this.units="mm",this.regionZoomActive=!1,this.overlayMode=!0,this.overlayCenter=.5,this.overlayTargetWidth=null,this.showProfile=!1,this.notationA="",this.notationB="",this.notationAWarnings=[],this.notationBWarnings=[],this._fullScreen=!1,this._userAdjustingWidth=!1,this._userAdjustingCenter=!1,this.strokePxMin=5,this.showDebug=!0,this.showGeometryA=!0,this.showGeometryB=!0,this.thinStrokes=!0,this.adaptiveZoomMode="idle",this._notationDialogOpen=!1,this._notationDialogSide="A",this._notationDialogSegments=[],this._activeShrink=!1,this._activeExpand=!1,this._prevOverlayCenter=this.overlayCenter,this._customViewBox=null,this._baseViewBox=null,this._dragPanning=!1,this._dragStart=null,this._lastTapTime=0,this._pendingTap=null,this._computedA=[],this._computedB=[],this._onPanMoveBound=e=>this._onPanMove(e),this._onPanEndBound=e=>this._onPanEnd(e)}get segments(){return this._geometryA.getSegments()}set segments(e){this._geometryA.setSegments(e)}get segmentsB(){return this._geometryB.getSegments()}set segmentsB(e){this._geometryB.setSegments(e)}get fullScreen(){return this._fullScreen}set fullScreen(e){this._fullScreen=e,this._dispatchFullScreenChanged()}get apexMacro(){return this._geometryA.apexMacro}set apexMacro(e){this._geometryA.setApexMacro(e),this._geometryB.setApexMacro(e),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this._restore(),this._syncSegmentsToModels()}disconnectedCallback(){super.disconnectedCallback()}roundAndTrimTrailingZeros(e){return typeof e=="string"?e:(Math.round(e*1e6)/1e6).toString().replace(/\.?0+$/,"")}_restore(){try{const e=localStorage.getItem(this._storageKey);if(!e)return;const t=JSON.parse(e);Array.isArray(t.segments)&&(this.segments=t.segments),Array.isArray(t.segmentsB)&&(this.segmentsB=t.segmentsB),typeof t.zoom=="number"&&(this.zoom=t.zoom),typeof t.pan=="number"&&(this.pan=t.pan),typeof t.angleInput=="number"&&(this.angleInput=t.angleInput),typeof t.thicknessInput=="number"&&(this.thicknessInput=t.thicknessInput),typeof t.angleInputB=="number"&&(this.angleInputB=t.angleInputB),typeof t.thicknessInputB=="number"&&(this.thicknessInputB=t.thicknessInputB),(t.angleInputType==="dps"||t.angleInputType==="inclusive")&&(this.angleInputType=t.angleInputType),(t.angleInputTypeB==="dps"||t.angleInputTypeB==="inclusive")&&(this.angleInputTypeB=t.angleInputTypeB),(t.travelInputType==="width"||t.travelInputType==="height")&&(this.travelInputType=t.travelInputType),(t.travelInputTypeB==="width"||t.travelInputTypeB==="height")&&(this.travelInputTypeB=t.travelInputTypeB),(t.units==="mm"||t.units==="in")&&(this.units=t.units),typeof t.overlayMode=="boolean"&&(this.overlayMode=t.overlayMode),typeof t.overlayCenter=="number"&&(this.overlayCenter=t.overlayCenter),typeof t.overlayTargetWidth=="number"&&(this.overlayTargetWidth=t.overlayTargetWidth),typeof t.strokePxMin=="number"&&(this.strokePxMin=t.strokePxMin),typeof t.thinStrokes=="boolean"?this.thinStrokes=t.thinStrokes:typeof t._thinStrokes=="boolean"&&(this.thinStrokes=t._thinStrokes),typeof t.fullScreen=="boolean"&&(this.fullScreen=t.fullScreen),typeof t.showProfile=="boolean"&&(this.showProfile=t.showProfile),typeof t.apexMacro=="boolean"&&(this.apexMacro=t.apexMacro),t.customViewBox&&typeof t.customViewBox.x=="number"&&typeof t.customViewBox.y=="number"&&typeof t.customViewBox.w=="number"&&typeof t.customViewBox.h=="number"&&(this._customViewBox=t.customViewBox,this.regionZoomActive=!0),typeof t.notationA=="string"&&(this.notationA=t.notationA),typeof t.notationB=="string"&&(this.notationB=t.notationB),typeof t.showGeometryA=="boolean"&&(this.showGeometryA=t.showGeometryA),typeof t.showGeometryB=="boolean"&&(this.showGeometryB=t.showGeometryB),this.notationA.trim()&&(!this.segments||this.segments.length===0)&&this._importNotation(this.notationA,"A"),this.notationB.trim()&&(!this.segmentsB||this.segmentsB.length===0)&&this._importNotation(this.notationB,"B"),this._syncSegmentsToModels()}catch{}}_persist(){try{const e=this.fullScreen,t={angleInput:this.angleInput,thicknessInput:this.thicknessInput,angleInputB:this.angleInputB,thicknessInputB:this.thicknessInputB,segments:this.segments,segmentsB:this.segmentsB,angleInputType:this.angleInputType,angleInputTypeB:this.angleInputTypeB,travelInputType:this.travelInputType,travelInputTypeB:this.travelInputTypeB,units:this.units,overlayMode:this.overlayMode,overlayCenter:this.overlayCenter,overlayTargetWidth:this.overlayTargetWidth,strokePxMin:this.strokePxMin,thinStrokes:this.thinStrokes,customViewBox:this._customViewBox,fullScreen:this.fullScreen,showProfile:this.showProfile,apexMacro:this.apexMacro,notationA:this.notationA,notationB:this.notationB,showGeometryA:this.showGeometryA,showGeometryB:this.showGeometryB};localStorage.setItem(this._storageKey,JSON.stringify(t)),this.fullScreen?(document.documentElement.style.overflow="hidden",document.body.style.overflow="hidden"):(document.documentElement.style.overflow="",document.body.style.overflow=""),e!==this.fullScreen&&this._dispatchFullScreenChanged()}catch{}}_dispatchFullScreenChanged(){this.dispatchEvent(new CustomEvent("geometry-fullscreen-changed",{detail:{fullScreen:this.fullScreen},bubbles:!0,composed:!0}))}_toggleFullScreen(){this.fullScreen=!this.fullScreen,this._customViewBox=null,this.requestUpdate(),this._persist()}_add(){const e=this.angleInput,t=this.angleInputType,s=t==="inclusive"?e:e*2,i=this.travelInputType,n=this.thicknessInput,o=this.segments[this.segments.length-1],l=(o==null?void 0:o.derivedWidth)??0,a=(o==null?void 0:o.derivedHeight)??0;if(i==="width"){if(n<=l){const c=this._displayDigits();this.warning=`Width ${this._toDisplayLength(n).toFixed(c)}${this.units} must exceed previous ${this._toDisplayLength(l).toFixed(c)}${this.units}.`,this.requestUpdate();return}if(s===0){this.warning="Zero angle only valid with height travel.",this.requestUpdate();return}}else if(n<=a){const c=this._displayDigits();this.warning=`Height ${this._toDisplayLength(n).toFixed(c)}${this.units} must exceed previous ${this._toDisplayLength(a).toFixed(c)}${this.units}.`,this.requestUpdate();return}if(s<0)return;const h={angleType:t,angleValue:e,travelType:i,travelValue:n};this.warning=null,this.segments=[...this.segments,h],this._baseViewBox=null,this._persist()}_addB(){const e=this.angleInputB,t=this.angleInputTypeB,s=t==="inclusive"?e:e*2,i=this.travelInputTypeB,n=this.thicknessInputB,o=this.segmentsB[this.segmentsB.length-1],l=(o==null?void 0:o.derivedWidth)??0,a=(o==null?void 0:o.derivedHeight)??0;if(i==="width"){if(n<=l){const c=this._displayDigits();this.warning=`Width ${this._toDisplayLength(n).toFixed(c)}${this.units} must exceed previous ${this._toDisplayLength(l).toFixed(c)}${this.units} (B).`,this.requestUpdate();return}if(s===0){this.warning="Zero angle only valid with height travel.";return}}else if(n<=a){const c=this._displayDigits();this.warning=`Height ${this._toDisplayLength(n).toFixed(c)}${this.units} must exceed previous ${this._toDisplayLength(a).toFixed(c)}${this.units} (B).`,this.requestUpdate();return}if(s<0)return;const h={angleType:t,angleValue:e,travelType:i,travelValue:n};this.warning=null,this.segmentsB=[...this.segmentsB,h],this._baseViewBox=null,this._persist()}_syncSegmentsToModels(){this._geometryA.setSegments(this.segments),this._geometryB.setSegments(this.segmentsB),this._recomputeAll()}_getSegments(e){return e==="A"?this.segments:this.segmentsB}_updateAngleType(e,t,s){const n=this._getSegments(e)[t];if(!n||n.angleType===s)return;s==="inclusive"&&n.angleType==="dps"?n.angleValue=n.angleValue*2:s==="dps"&&n.angleType==="inclusive"&&(n.angleValue=n.angleValue/2),n.angleType=s,(n.angleType==="inclusive"?n.angleValue:n.angleValue*2)===0&&n.travelType==="width"?this.warning="Zero angle only allowed when travel type is height.":this.warning="",this._syncSegmentsToModels(),this.requestUpdate()}_updateAngleValue(e,t,s){const i=this._getSegments(e),n=i[t];if(!n||isNaN(s)||s<0)return;if(i[t-1],n.angleValue=s,(n.angleType==="inclusive"?n.angleValue:n.angleValue*2)===0&&n.travelType==="width"){this.warning="Zero angle only allowed with height travel.";return}else this.warning="";this._syncSegmentsToModels(),this.requestUpdate()}_updateTravelType(e,t,s){const i=this._getSegments(e),n=i[t];if(!n||n.travelType===s)return;const h=(e==="A"?this._geometryA:this._geometryB).compute().map((c,d)=>({...i[d],derivedWidth:c.endWidth,derivedHeight:c.endY}))[t];if(s==="height")n.travelType="height",n.travelValue=h.derivedHeight??0;else{if((n.angleType==="inclusive"?n.angleValue:n.angleValue*2)===0){this.warning="Cannot switch to width travel with zero angle.";return}n.travelType="width",n.travelValue=h.derivedWidth??0}this.warning="",this._syncSegmentsToModels(),this.requestUpdate()}_updateTravelValue(e,t,s){const i=this._getSegments(e),n=i[t];if(!n||isNaN(s)||s<=0)return;const o=i[t-1];if(n.travelType==="width"){const a=(o==null?void 0:o.derivedWidth)??0;if(s<=a){const h=this._displayDigits();this.warning=`Width must exceed previous width (${this._toDisplayLength(a).toFixed(h)}${this.units}).`;return}}else{const a=(o==null?void 0:o.derivedHeight)??0;if(s<=a){const h=this._displayDigits();this.warning=`Height must exceed previous height (${this._toDisplayLength(a).toFixed(h)}${this.units}).`;return}}if(n.travelValue=s,(n.angleType==="inclusive"?n.angleValue:n.angleValue*2)===0&&n.travelType==="width"){this.warning="Zero angle only allowed with height travel.";return}this.warning="",this._syncSegmentsToModels(),this.requestUpdate()}_toDisplayLength(e){return this.units==="mm"?e:e/25.4}_fromDisplayLength(e){return this.units==="mm"?e:e*25.4}_displayDigits(){return this.units==="mm"?3:4}_formatLen(e,t=this._displayDigits()){return this._toDisplayLength(e).toFixed(t)}_clear(){this.segments=[],this.segmentsB=[],this._baseViewBox=null;try{localStorage.removeItem(this._storageKey)}catch{}}_recomputeAll(){this._computedA=this._geometryA.compute(),this._computedB=this._geometryB.compute()}_computeWithCurrentSegments(){return this.segments===this._geometryA.getSegments()?this._computedA:this._computedB}_path(e){if(!e.length)return"";let t="M 0 0";for(const s of e){const i=-s.endWidth/2,n=s.endY;t+=` L ${i} ${n}`}for(let s=e.length-1;s>=0;s--){const i=e[s],n=i.endWidth/2,o=i.endY;t+=` L ${n} ${o}`}return t+=" Z",t}_segmentPaths(e){return e.map(t=>{const{startWidth:s,endWidth:i,startY:n,endY:o}=t;return[`M ${-s/2} ${n}`,`L ${-i/2} ${o}`,`L ${i/2} ${o}`,`L ${s/2} ${n}`,"Z"].join(" ")})}_widthAtY(e,t){if(!e.length||t<=0)return 0;for(const s of e)if(t<=s.endY+1e-9){const i=s.endY-s.startY;if(i<=1e-9)return s.endWidth;const n=(t-s.startY)/i;return s.startWidth+(s.endWidth-s.startWidth)*n}return e[e.length-1].endWidth}_onAngle(e){this.angleInput=Number(e.target.value),this._persist()}_onAngleTypeChange(e){const t=e.target.value;t!==this.angleInputType&&(t==="inclusive"&&this.angleInputType==="dps"?this.angleInput=this.angleInput*2:t==="dps"&&this.angleInputType==="inclusive"&&(this.angleInput=this.angleInput/2),this.angleInputType=t,this._persist())}_onThickness(e){this.thicknessInput=Number(e.target.value),this._persist()}_onAngleB(e){this.angleInputB=Number(e.target.value),this._persist()}_onAngleTypeChangeB(e){const t=e.target.value;t!==this.angleInputTypeB&&(t==="inclusive"&&this.angleInputTypeB==="dps"?this.angleInputB=this.angleInputB*2:t==="dps"&&this.angleInputTypeB==="inclusive"&&(this.angleInputB=this.angleInputB/2),this.angleInputTypeB=t,this._persist())}_onThicknessB(e){this.thicknessInputB=Number(e.target.value),this._persist()}_onTravelTypeChange(e){const t=e.target.value;if(t===this.travelInputType)return;const s=this.segments[this.segments.length-1];if(t==="height"){const i=(s==null?void 0:s.derivedHeight)??0;this.thicknessInput=+(i+.2).toFixed(4)}else{const i=(s==null?void 0:s.derivedWidth)??0;this.thicknessInput=+(i+.1).toFixed(4)}this.travelInputType=t,this._persist()}_onTravelTypeChangeB(e){const t=e.target.value;if(t===this.travelInputTypeB)return;const s=this.segmentsB[this.segmentsB.length-1];if(t==="height"){const i=(s==null?void 0:s.derivedHeight)??0;this.thicknessInputB=+(i+.2).toFixed(4)}else{const i=(s==null?void 0:s.derivedWidth)??0;this.thicknessInputB=+(i+.1).toFixed(4)}this.travelInputTypeB=t,this._persist()}_onZoom(e){this.zoom=Number(e.target.value),this._customViewBox=null,this.regionZoomActive=!1,this._baseViewBox=null,this._persist()}_onPan(e){if(this.pan=Number(e.target.value)/100,this._customViewBox&&this._baseViewBox){const t=this._geometryA.getTotalHeight(),s=this._customViewBox.h,i=Math.max(0,t-s);this._customViewBox.y=i*this.pan}this._persist()}_toggleOverlay(){this.overlayMode=!this.overlayMode,this._persist()}_changeUnits(e){const t=e.target.value;(t==="mm"||t==="in")&&(this.units=t,this._persist())}_onOverlayCenter(e){this._userAdjustingCenter=!0;const t=Number(e.target.value),s=this._geometryA.getTotalHeight(),i=this.units==="mm"?t:t*25.4,n=Math.max(0,Math.min(s,i)),o=s===0?0:n/s;this.overlayCenter=o,this._customViewBox=null,this.regionZoomActive=!1,this._prevOverlayCenter=this.overlayCenter,this._triggerAdaptiveZoom(),this.requestUpdate(),this._persist(),this._userAdjustingCenter=!1}_onOverlayWidth(e){this._userAdjustingWidth=!0;const t=1e4,s=Number(e.target.value),i=Math.min(t,Math.max(0,s))/t,n=this._geometryMaxWidthMm(),o=this.units==="mm"?.001:1e-4*25.4,l=o+(n-o)*i;this.overlayTargetWidth=l,this._customViewBox=null,this.regionZoomActive=!1,this.requestUpdate(),this._persist(),this._userAdjustingWidth=!1,this._activeShrink=!1,this._activeExpand=!1,this.adaptiveZoomMode="idle"}_geometryMaxWidthMm(){const e=this._geometryA.getMaxWidth(),t=this._geometryB.getMaxWidth();return Math.max(e,t)*1.1}_onStrokePxMin(e){const t=Number(e.target.value);this.strokePxMin=Math.max(1,Math.min(500,t)),this.requestUpdate(),this._persist()}_syncOverlayFromViewBox(e=!0,t=!1){if(!this._customViewBox)return;const s=this._geometryA.compute(),i=this._geometryB.compute(),n=this._geometryA.getTotalHeight(),o=this._geometryB.getTotalHeight();let l=0;this.showGeometryA&&this.showGeometryB?l=Math.max(n,o):this.showGeometryA?l=n:this.showGeometryB?l=o:l=Math.max(n,o,1);const a=this._customViewBox;this.overlayMode&&!t&&!this._userAdjustingWidth&&(this.overlayTargetWidth==null||a.w>this.overlayTargetWidth)&&(this.overlayTargetWidth=a.w);const h=a.y+a.h/2;let c=l>0?h/l:0;c<0?c=0:c>1&&(c=1),c<.001&&(c=0);const d=this.overlayCenter;this.overlayCenter=c,this._autoExpandTargetWidthAtCenter(s,i,l,d),this._prevOverlayCenter=this.overlayCenter,this.requestUpdate(),e&&this._persist()}_autoExpandTargetWidthAtCenter(e,t,s,i){if(!this.overlayMode||i!==void 0&&this.overlayCenter<=i||this.overlayCenter<.02)return;const n=e??this._computedA,o=t??this._computedB,l=s??Math.max(n.length?n[n.length-1].endY:0,o.length?o[o.length-1].endY:0),a=this.overlayCenter*l;let h=this._widthAtY(n,a),c=this._widthAtY(o,a),d=Math.max(h,c);if(d<1e-6){const S=Math.min(l,a+.001);h=this._widthAtY(n,S),c=this._widthAtY(o,S),d=Math.max(h,c)}const b=this.overlayTargetWidth??0;d>b*1.01&&(this.overlayTargetWidth=d*1.02,this._customViewBox=null,this.regionZoomActive=!1)}_triggerAdaptiveZoom(){if(!this.overlayMode||this._userAdjustingWidth)return;const e=this._computedA,t=this._computedB,s=Math.max(e.length?e[e.length-1].endY:0,t.length?t[t.length-1].endY:0);if(s<=0)return;const i=this.overlayCenter*s;let n=this._widthAtY(e,i),o=this._widthAtY(t,i),l=Math.max(n,o);if(l<1e-6&&(l=.02),this.overlayTargetWidth==null){this.overlayTargetWidth=l*1.05,this.adaptiveZoomMode="expand",this._activeExpand=!0,this.requestUpdate();return}const a=this.overlayTargetWidth,h=1.01,c=1.005,d=.3,b=.38,S=l/a;let m="idle";if((this._activeExpand||l>a*h)&&(l>a*h||this._activeExpand))if(l>a*c){const C=l*1.03,f=a+(C-a)*.25;this.overlayTargetWidth=f,m="expand",this._activeExpand=l/this.overlayTargetWidth<c}else this._activeExpand=!1;if(m==="idle"&&(this._activeShrink||S<d)&&(S<d||this._activeShrink))if(S<b){const C=l*1.25,f=this.units==="mm"?.001:1e-4*25.4;let u=a+(C-a)*.2;u<l*1.15&&(u=l*1.15),u<f&&(u=f),this.overlayTargetWidth=u,m="shrink",this._activeShrink=l/this.overlayTargetWidth<b}else this._activeShrink=!1;this.adaptiveZoomMode=m,m!=="idle"&&(this._customViewBox=null,this.regionZoomActive=!1,this.requestUpdate(),this._persist())}_dynamicViewportWidth(e){const t=Math.max(e*.4,.4),s=this.units==="mm"?.01:.01*25.4;return Math.max(s,e+t)}_logSampledWidth(){const e=this._computedA,t=this._computedB,s=Math.max(e.length?e[e.length-1].endY:0,t.length?t[t.length-1].endY:0),i=s>0?Math.min(s*5e-4,.001):.001,n=this.overlayCenter*s,o=n<i*4?i:n,l=this._widthAtY(e,o),a=this._widthAtY(t,o),h=Math.max(l,a),c=this._dynamicViewportWidth(h);console.log(`[Geom] sampled ${h.toFixed(5)}mm centerY=${n.toFixed(5)} viewport=${c.toFixed(5)}mm`)}_onSvgDblClick(e){const t=e.currentTarget,s=t.viewBox.baseVal,i=this._svgPoint(t,e),n=this._computedA,o=this._computedB,l=Math.max(n.length?n[n.length-1].endY:0,o.length?o[o.length-1].endY:0);if(l>0){let a=i.y/l;a<0&&(a=0),a>1&&(a=1),this.overlayCenter=a}this.showProfile||this._applyZoomAtPoint(i.x,i.y,.35,s,t,!1),this._persist()}_onSvgShiftDblClick(e){console.log("[Geom] shift dblclick svg","client",e.clientX,e.clientY);const t=e.currentTarget,s=t.viewBox.baseVal,i=this._svgPoint(t,e);this.showProfile||this._applyZoomAtPoint(i.x,i.y,2.857142857142857,s,t,!0)}_onPointerDownTap(e){if(e.pointerType!=="touch"&&e.pointerType!=="pen")return;const t=performance.now(),s=this.renderRoot.querySelector(".svg-wrap svg");if(!s)return;const i=this._svgPoint(s,e),n=t-this._lastTapTime;if(this._lastTapTime=t,n<320&&this._pendingTap){this._pendingTap=null;const o=new MouseEvent("dblclick",{clientX:e.clientX,clientY:e.clientY,bubbles:!0,cancelable:!0});this._onSvgDblClick(o)}else{this._pendingTap={x:i.x,y:i.y};const o=this._computedA,l=this._computedB,a=Math.max(o.length?o[o.length-1].endY:0,l.length?l[l.length-1].endY:0);if(a>0){let h=i.y/a;h<0&&(h=0),h>1&&(h=1),this.overlayCenter=h,this.requestUpdate(),this._persist()}setTimeout(()=>{this._pendingTap&&performance.now()-this._lastTapTime>320&&(this._pendingTap=null)},340)}}_applyZoomAtPoint(e,t,s,i,n,o){this._baseViewBox||(this._baseViewBox={x:i.x,y:i.y,w:i.width,h:i.height});let l=i.width*s,a=i.height*s;const h=.0254;if(!o&&l<h){const b=h/l;l=h,a=a*b}if(o&&(l>=this._baseViewBox.w||a>=this._baseViewBox.h)){this._customViewBox=null,this.regionZoomActive=!1,this.requestUpdate();return}const c=e-l/2,d=t-a/2;this._customViewBox={x:c,y:d,w:l,h:a},this.regionZoomActive=!0,this._syncOverlayFromViewBox(!1,!0),this.requestUpdate()}_resetZoom(){console.log("[Geom] reset zoom");const e=this._computeWithCurrentSegments(),t=e.length?e[e.length-1].endY:5,s=e.length?e[e.length-1].endWidth:2,i=t/this.zoom,n=s/this.zoom,o=n*.15,l=i*.05,a=-n/2-o,h=0,c=n+o*2,d=i+l;this._customViewBox={x:a,y:h,w:c,h:d},this._baseViewBox={x:a,y:h,w:c,h:d},this.regionZoomActive=!0,this.requestUpdate()}_svgPoint(e,t){const s=e.getBoundingClientRect(),i=e.viewBox.baseVal.width/s.width,n=e.viewBox.baseVal.height/s.height;let o=e.viewBox.baseVal.x+(t.clientX-s.left)*i,l=e.viewBox.baseVal.y+(t.clientY-s.top)*n;const a=s.height*.03;s.bottom-t.clientY<=a&&(l=0);const c=Math.abs(t.clientX-(s.left+s.width/2));return l===0&&c<=s.width*.03&&(o=0),{x:o,y:l}}_onWheel(e){if(e.preventDefault(),!this.overlayMode||this.showProfile)return;const t=this._geometryMaxWidthMm(),s=this.units==="mm"?.001:1e-4*25.4;let i=this.overlayTargetWidth??t;const n=e.deltaY>0?1:-1,o=e.altKey?.01:e.shiftKey?.15:.05,l=t-s,a=Math.min(10,Math.max(1,Math.round(Math.abs(e.deltaY)/100))),h=l*o*a*n*-1;let c=i+h;c<s&&(c=s),c>t&&(c=t),console.log("[Geom] wheel width change",{prev:i,next:c,units:this.units,deltaY:e.deltaY,steps:a,modifier:o}),this.overlayTargetWidth=c,this._customViewBox=null,this.regionZoomActive=!0,this.requestUpdate()}_logEvent(e,t){t instanceof MouseEvent?console.log(`[Geom] ${e}`,"type",t.type,"btn",t.button,"client",t.clientX,t.clientY,"shift",t.shiftKey):console.log(`[Geom] ${e}`,"type",t.type)}_onPanStart(e){if(e.button!==0)return;const t=this.renderRoot.querySelector(".svg-wrap svg");if(!t)return;const s=t.viewBox.baseVal;this._dragPanning=!0,this._dragStart={x:e.clientX,y:e.clientY,vbX:s.x,vbY:s.y,vbW:s.width,vbH:s.height},this._baseViewBox||(this._baseViewBox={x:s.x,y:s.y,w:s.width,h:s.height}),this._customViewBox||(this._customViewBox={x:s.x,y:s.y,w:s.width,h:s.height}),this.regionZoomActive=!0,window.addEventListener("mousemove",this._onPanMoveBound),window.addEventListener("mouseup",this._onPanEndBound),this._logEvent("pan-start",e),e.preventDefault()}_onPanMove(e){if(!this._dragPanning||!this._dragStart)return;const t=this.renderRoot.querySelector(".svg-wrap svg");if(!t)return;const s=this._dragStart,i=t.getBoundingClientRect(),n=s.vbW/i.width,o=s.vbH/i.height,l=Math.max(n,o),a=(e.clientX-s.x)*l,h=(e.clientY-s.y)*l,c=s.vbX-a,d=s.vbY-h;this._customViewBox={x:c,y:d,w:s.vbW,h:s.vbH},this._syncOverlayFromViewBox(),this.requestUpdate(),e.buttons===0&&this._onPanEnd(e)}_onPanEnd(e){this._dragPanning&&(this._dragPanning=!1,this._dragStart=null,window.removeEventListener("mousemove",this._onPanMoveBound),window.removeEventListener("mouseup",this._onPanEndBound),this._logEvent("pan-end",e))}_renderWidthSlider(e){const t=this._geometryMaxWidthMm(),s=this.units==="mm"?.001:1e-4*25.4;let i=this.overlayTargetWidth??t;i=Math.max(s,Math.min(t,i));const n=(i-s)/(t-s),o=1e4,l=Math.round(n*o),a=this._displayDigits(),h=(this.units==="mm"?t:t/25.4).toFixed(a),c=(this.units==="mm"?s:s/25.4).toFixed(a);return p`<div
      class="width-slider-box"
      style="margin-top:.5rem;display:flex;flex-direction:column;gap:.25rem;"
    >
      <div
        style="display:flex;justify-content:space-between;font-size:.55rem;opacity:.7;"
      >
        <span>${c} ${this.units}</span>
        <span>Target Width</span>
        <span>${h} ${this.units}</span>
        <div
          style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap;margin-top:.25rem;"
        >
          <input
            type="text"
            placeholder="Notation B (e.g. in=>10dps-1h,0.15w@2h,0.22w@4cp)"
            style="flex:1;min-width:14rem;font-size:.825rem;padding:.375rem .6rem;border:1px solid var(--vsa-border);border-radius:4px;"
            .value=${this.notationB}
            @input=${d=>{this.notationB=d.target.value}}
            @blur=${()=>{this.notationB.trim()&&this._importNotation(this.notationB,"B")}}
          />
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
          max="${o}"
          step="1"
          .value=${String(l)}
          @input=${this._onOverlayWidth}
          style="flex:1;"
        />
        <input
          type="number"
          style="width:6.5rem;font-size:.55rem;padding:.2rem;"
          .value=${(this.units==="mm"?i:i/25.4).toFixed(a)}
          @change=${d=>{const b=Number(d.target.value);if(!isFinite(b))return;const S=this.units==="mm"?b:b*25.4,m=Math.max(s,Math.min(t,S));this.overlayTargetWidth=m,this._customViewBox=null,this.requestUpdate()}}
        />
      </div>
      <div style="font-size:.6rem;opacity:.75;text-align:center;">
        Width: ${this._formatLen(this.overlayTargetWidth??i)}
        ${this.units}
      </div>
    </div>`}render(){const e=this._geometryA.compute(),t=this._geometryB.compute();console.log("Render - computedA:",e),console.log("Render - computedB:",t);const s=this._path(e),i=this._path(t);console.log("Render - pathA:",s),console.log("Render - pathB:",i);const n=this._segmentPaths(e),o=this._segmentPaths(t),l=this._geometryA.getTotalHeight(),a=this._geometryB.getTotalHeight();let h=0;this.showGeometryA&&this.showGeometryB?h=Math.max(l,a):this.showGeometryA?h=l:this.showGeometryB?h=a:h=Math.max(l,a,1);const c=e.length?e[e.length-1].endWidth:2,d=t.length?t[t.length-1].endWidth:2,b=this.overlayMode?0:.4,S=this.overlayMode?Math.max(c,d):c+b+d;let m=this.overlayCenter*h;const C=h>0?Math.min(h*5e-4,.001):.001;if(!this.showProfile&&this.overlayMode&&this.overlayTargetWidth==null){const w=m<C*4?C:m,A=this._widthAtY(e,w),M=this._widthAtY(t,w),ft=Math.max(A,M,Math.max(c,d));this.overlayTargetWidth=ft}const f=m<C*4?C:m;let u;if(this.showProfile)u=S;else{const w=this._widthAtY(e,f),A=this._widthAtY(t,f),M=Math.max(w,A,1e-5);u=this._dynamicViewportWidth(M),this.overlayTargetWidth=u}const y=this.renderRoot.querySelector(".svg-wrap");let x=1;if(y){const w=y.getBoundingClientRect();w.width>0&&w.height>0&&(x=w.height/w.width)}let v=u*x,k=u;if(this.apexMacro&&!this.showProfile){const A=Math.max(this._widthAtY(e,f),this._widthAtY(t,f),1e-5)/.5;k=Math.max(u,A),v=k*x}const B=this.showProfile?-S/2:-k/2;let E;if(this.showProfile)E=0;else if(this.apexMacro){E=h-m-v*.75,E<0&&(E=0);const A=Math.max(0,h-v);E>A&&(E=A)}else{E=h-m-v/2,E<0&&(E=0);const A=Math.max(0,h-v);E>A&&(E=A)}const D=this.showProfile?S:k,_e=this.showProfile?h:v,vt=this.thinStrokes?.375:5;return this.units==="mm"||1/25.4,this.units,p` <div class="page ${this.fullScreen?"full-screen":""}">
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
            @input=${w=>{this.notationA=w.target.value}}
            @blur=${()=>{this.notationA.trim()&&this._importNotation(this.notationA,"A")}}
          />
          <button
            style="font-size:.55rem;padding:.3rem .6rem;border:1px solid var(--vsa-path-a-color);background:var(--vsa-path-a-color);color:white;border-radius:4px;cursor:pointer;font-weight:500;transition:all 0.15s ease;"
            @click=${()=>{this._openNotationDialog("A")}}
            @mouseenter=${w=>{const A=w.target;A.style.opacity="0.9",A.style.transform="translateY(-1px)"}}
            @mouseleave=${w=>{const A=w.target;A.style.opacity="1",A.style.transform="translateY(0)"}}
          >
            Build A
          </button>
          <input
            type="text"
            placeholder="Notation B (e.g. in=>10dps-1h,0.15w@2h,0.22w@4cp)"
            style="flex:1;min-width:14rem;font-size:.825rem;padding:.375rem .6rem;border:1px solid var(--vsa-border);border-radius:4px;"
            .value=${this.notationB}
            @input=${w=>{this.notationB=w.target.value}}
            @blur=${()=>{this.notationB.trim()&&this._importNotation(this.notationB,"B")}}
          />
          <button
            style="font-size:.55rem;padding:.3rem .6rem;border:1px solid var(--vsa-path-b-color);background:var(--vsa-path-b-color);color:white;border-radius:4px;cursor:pointer;font-weight:500;transition:all 0.15s ease;"
            @click=${()=>{this._openNotationDialog("B")}}
            @mouseenter=${w=>{const A=w.target;A.style.opacity="0.9",A.style.transform="translateY(-1px)"}}
            @mouseleave=${w=>{const A=w.target;A.style.opacity="1",A.style.transform="translateY(0)"}}
          >
            Build B
          </button>
        </div>
        ${this.notationAWarnings.length?p`<div
              style="font-size:.5rem;color:var(--vsa-warning-text-color);line-height:1.2;"
            >
              ${this.notationAWarnings.map(w=>p`<div>⚠ ${w}</div>`)}
            </div>`:""}
        ${this.notationBWarnings.length?p`<div
              style="font-size:.5rem;color:var(--vsa-warning-text-color);line-height:1.2;"
            >
              ${this.notationBWarnings.map(w=>p`<div>⚠ ${w}</div>`)}
            </div>`:""}
      </div>
      ${this._renderNotationHelp()}
      <div class="controls-bar">
        <button
          style="font-size:.55rem;padding:.3rem .6rem;border:1px solid var(--vsa-border);background:var(--vsa-input-bg);color:var(--vsa-text-primary);border-radius:4px;cursor:pointer;"
          @click=${()=>{this.notationA="mm=>15dps-2h,0.3w@3h,0.5w@5cp,50H",this.notationB="mm=>12dps-2h,0.25w@3h,0.45w@5cp,50H";const w=ue(this.notationA,this.units),A=ue(this.notationB,this.units);console.log("Example - ResA segments:",w.segments),console.log("Example - ResB segments:",A.segments),w.segments.length&&(this.segments=w.segments.map(M=>({angleType:M.angleType,angleValue:M.angleValue,travelType:M.travelType,travelValue:M.travelValue})),console.log("Example - Set segments A:",this.segments),console.log("Example - GeometryA computed:",this._geometryA.compute())),A.segments.length&&(this.segmentsB=A.segments.map(M=>({angleType:M.angleType,angleValue:M.angleValue,travelType:M.travelType,travelValue:M.travelValue})),console.log("Example - Set segments B:",this.segmentsB),console.log("Example - GeometryB computed:",this._geometryB.compute())),this._customViewBox=null,this.overlayTargetWidth=null,this.requestUpdate(),this._persist()}}
        >
          Load Example
        </button>
        <label style="display:flex;align-items:center;gap:.25rem">
          <span style="font-size:.55rem">Units</span>
          <select
            @change=${this._changeUnits}
            style="font-size:.6rem;padding:.15rem .3rem;border-radius:4px;background:var(--vsa-input-bg);border:1px solid var(--vsa-border);color:var(--vsa-text-primary);"
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
        <label
          style="display:flex;align-items:center;gap:.3rem;font-size:.55rem;color:var(--vsa-path-a-color);"
        >
          <input
            type="checkbox"
            .checked=${this.showGeometryA}
            @change=${()=>{this.showGeometryA=!this.showGeometryA,this.requestUpdate(),this._persist()}}
          />
          Geometry A
        </label>
        <label
          style="display:flex;align-items:center;gap:.3rem;font-size:.55rem;color:var(--vsa-path-b-color);"
        >
          <input
            type="checkbox"
            .checked=${this.showGeometryB}
            @change=${()=>{this.showGeometryB=!this.showGeometryB,this.requestUpdate(),this._persist()}}
          />
          Geometry B
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
                    ${e.map((w,A)=>{const M=this.segments[A];return p`<tr>
                        <td>${A+1}</td>
                        <td>${M.angleValue}</td>
                        <td>${M.angleType}</td>
                        <td>${M.travelType}</td>
                        <td>${this._formatLen(M.travelValue)}</td>
                        <td>${this._formatLen(w.endWidth)}</td>
                        <td>${this._formatLen(w.endY)}</td>
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
                    ${t.map((w,A)=>{const M=this.segmentsB[A];return p`<tr>
                        <td>${A+1}</td>
                        <td>${M.angleValue}</td>
                        <td>${M.angleType}</td>
                        <td>${M.travelType}</td>
                        <td>${this._formatLen(M.travelValue)}</td>
                        <td>${this._formatLen(w.endWidth)}</td>
                        <td>${this._formatLen(w.endY)}</td>
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
        style="${this.fullScreen?"height:calc(100vh - 390px);width:100vw;":""}"
      >
        <div class="main-flex-row" style="gap:.75rem;">
          <div class="slider-column">
            ${this._renderVerticalSlider(h)}
          </div>
          <div class="svg-column">
            ${this._renderSvg(e,t,n,o,h,c,d,vt,C,B,E,D,_e)}
          </div>
        </div>
      </div>
      ${this.showDebug?p`<div style="height:220px;overflow:auto;">
            ${this._renderDebug(C)}
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
        @input=${o=>{const a=Number(o.target.value)/1e4;this.overlayCenter=e>0?a:0,this._customViewBox=null,this.requestUpdate()}}
        style="width:100%;flex:1 1 auto;"
      />
    </div>`}_renderControls(){return p``}_renderDebug(e){const t=this._geometryA.compute(),s=this._geometryB.compute(),i=this._geometryA.getTotalHeight(),n=this._geometryB.getTotalHeight();let o=0;this.showGeometryA&&this.showGeometryB?o=Math.max(i,n):this.showGeometryA?o=i:this.showGeometryB?o=n:o=Math.max(i,n,1);const l=this.overlayCenter*o,a=l<e*4?e:l,h=this._geometryA.widthAtY(t,a),c=this._geometryB.widthAtY(s,a),d=this._displayDigits(),b=this.units,S=(this.units==="mm"?l:l/25.4).toFixed(d),m=(this.units==="mm"?h:h/25.4).toFixed(d),C=(this.units==="mm"?c:c/25.4).toFixed(d),f=h**3,u=c**3;let y,x;f===0&&u===0?(y=1,x="equal"):f>=u?(y=f/(u===0?Number.EPSILON:u),x=`A stronger x${y.toFixed(3)}`):(y=u/(f===0?Number.EPSILON:f),x=`B stronger x${y.toFixed(3)}`);const T=Math.abs(f-u)/Math.max(f,u||1)*100;return p`<div
      style="margin-top:.4rem;font-size:.6rem;background:var(--vsa-metrics-bg);padding:.55rem .7rem;border-radius:6px;line-height:1.2;"
    >
      <div style="font-weight:600;margin-bottom:.35rem;">
        Cross Section Metrics
      </div>
      <div>Height from apex: <strong>${S} ${b}</strong></div>
      <div>Thickness A: <strong>${m} ${b}</strong></div>
      <div>Thickness B: <strong>${C} ${b}</strong></div>
      <div style="margin-top:.35rem;font-weight:600;">
        Strength (thickness^3)
      </div>
      <div>A^3: ${f.toFixed(6)}</div>
      <div>B^3: ${u.toFixed(6)}</div>
      <div>Relative: ${x}</div>
      <div>Difference: ${T.toFixed(2)}%</div>
      ${this.notationA||this.notationB?p`<div style="margin-top:.5rem;font-weight:600;">Notation</div>`:""}
      ${this.notationA?p`<div style="opacity:.85;">
            A: <code style="font-size:.55rem;">${this.notationA}</code>
          </div>`:""}
      ${this.notationB?p`<div style="opacity:.85;">
            B: <code style="font-size:.55rem;">${this.notationB}</code>
          </div>`:""}
      ${this.notationAWarnings.length||this.notationBWarnings.length?p`<div style="margin-top:.35rem;font-weight:600;">Warnings</div>`:""}
      ${this.notationAWarnings.map(v=>p`<div style="color:var(--vsa-warning-text-color);">A ⚠ ${v}</div>`)}
      ${this.notationBWarnings.map(v=>p`<div style="color:var(--vsa-warning-text-color);">B ⚠ ${v}</div>`)}
    </div>`}_renderSvg(e,t,s,i,n,o,l,a,h,c,d,b,S){const m=this._path(e),C=this._path(t),f=this.overlayMode?p`
          ${m&&this.showGeometryA?P`<path d="${m}" fill="none" stroke="var(--vsa-path-a-color)" stroke-width="${a}" vector-effect="non-scaling-stroke"></path>`:""}
          ${C&&this.showGeometryB?P`<path d="${C}" fill="none" stroke="var(--vsa-path-b-color)" stroke-width="${a}" vector-effect="non-scaling-stroke"></path>`:""}
          ${(()=>{const y=a*.6,x=`${(a*.7).toFixed(0)} ${(a*.5).toFixed(0)}`,T=Array.from(new Set([...e.map(v=>v.endY),...t.map(v=>v.endY)])).sort((v,k)=>v-k);return P`${T.map(v=>{if(v<=0||v>=n-1e-9)return"";const k=this._widthAtY(e,v),B=this._widthAtY(t,v),D=Math.max(k,B)/2;return P`<line x1="${-D}" y1="${v}" x2="${D}" y2="${v}" stroke="var(--vsa-grid-line-color)" stroke-width="${y}" vector-effect="non-scaling-stroke" stroke-dasharray="${x}" opacity="0.5" />`})}`})()}
        `:p`${(()=>{const x=-(o/2+.3),T=l/2+.6/2,v=["#ffdd57","#74c0fc","#ffc9c9","#b197fc","#a9e34b","#ffa94d","#ffd8a8","#e599f7","#63e6be","#ff6b6b"];return P`
            ${this.showGeometryA?P`
            <g transform="translate(${x},0)">
              ${s.map((k,B)=>P`<path d="${k}" fill="${v[B%v.length]}" stroke="var(--vsa-stroke-color)" stroke-width="${a}" vector-effect="non-scaling-stroke" opacity="0.95"></path>`)}
              ${m?P`<path d="${m}" fill="none" stroke="var(--vsa-path-a-color)" stroke-width="${a}" vector-effect="non-scaling-stroke"></path>`:""}
            </g>
            `:""}
            ${this.showGeometryB?P`
            <g transform="translate(${T},0)">
              ${i.map((k,B)=>P`<path d="${k}" fill="${v[B%v.length]}" stroke="var(--vsa-stroke-color)" stroke-width="${a}" vector-effect="non-scaling-stroke" opacity="0.95"></path>`)}
              ${C?P`<path d="${C}" fill="none" stroke="var(--vsa-path-b-color)" stroke-width="${a}" vector-effect="non-scaling-stroke"></path>`:""}
            </g>
            `:""}`})()}`,u=(()=>{const y=this.overlayCenter*n,x=y<h*4?h:y;let T=this._widthAtY(e,x),v=this._widthAtY(t,x),k=Math.max(T,v);k<1e-9&&(k=.02);const B=k*1.05/2,E=(a*.6).toFixed(0),D=(a*.4).toFixed(0);return P`<g class="center-line-group" pointer-events="none">
        <line x1="${-B}" y1="${y}" x2="${B}" y2="${y}" stroke="var(--vsa-center-line-color)" stroke-width="${a}" vector-effect="non-scaling-stroke" stroke-dasharray="${E} ${D}" />
      </g>`})();return p`${m&&this.showGeometryA||C&&this.showGeometryB?P`<svg viewBox="${this._customViewBox?this._customViewBox.x:c} ${this._customViewBox?this._customViewBox.y:d} ${this._customViewBox?this._customViewBox.w:b} ${this._customViewBox?this._customViewBox.h:S}" preserveAspectRatio="xMidYMin meet">
      <g class="geom" transform="translate(0, ${n}) scale(1,-1)">
        ${f}
        ${u}
      </g>
    </svg>`:p`<div class="empty">
            Add segments to visualize cross section.
          </div>`}
    ${m&&this.showGeometryA||C&&this.showGeometryB?p`<div class="drag-overlay"></div>`:""}
    <vsa-notation-editor-dialog
      .open=${this._notationDialogOpen}
      .side=${this._notationDialogSide}
      .segments=${this._notationDialogSegments}
      .units=${this.units||"mm"}
      @dialog-apply=${this._handleNotationDialogApply}
      @dialog-cancel=${this._handleNotationDialogCancel}
    ></vsa-notation-editor-dialog>
    </div>`}_openNotationDialog(e){this._notationDialogSide=e,this._notationDialogOpen=!0;const t=e==="A"?this.notationA:this.notationB;t&&t.trim()?this._notationDialogSegments=this._parseNotationToSegments(t):this._notationDialogSegments=[],this.requestUpdate()}_closeNotationDialog(){this._notationDialogOpen=!1,this._notationDialogSegments=[],this.requestUpdate()}_handleNotationDialogApply(e){const{notation:t}=e.detail;this._notationDialogSide==="A"?(this.notationA=t,this._importNotation(this.notationA,"A")):(this.notationB=t,this._importNotation(this.notationB,"B")),this._closeNotationDialog(),this.requestUpdate()}_handleNotationDialogCancel(){this._closeNotationDialog()}_parseNotationToSegments(e){const t=ue(e,this.units);if(!t.segments||t.segments.length===0)return console.warn("No segments found in notation:",e),[];let s=e,i=this.units;const n=e.match(/^(mm|in)=>/i);return n&&(i=n[1].toLowerCase(),s=e.substring(n[0].length)),s.split(",").map(l=>l.trim()).map((l,a)=>{const h=`segment-${a}`,c=u=>i===this.units?u:i==="mm"&&this.units==="in"?Math.round(u/25.4*1e6)/1e6:i==="in"&&this.units==="mm"?Math.round(u*25.4*1e4)/1e4:u,d=l.match(/^([0-9]*\.?[0-9]+)(dps|d|inc|inclusive|i)-([0-9]*\.?[0-9]+)(h|height|w|width)$/i);if(d){const u=parseFloat(d[1]),y=d[2].toLowerCase(),x=c(parseFloat(d[3])),T=d[4].toLowerCase();return{id:h,type:"angle-travel",values:{angleMode:y==="inc"||y==="inclusive"||y==="i"?"inclusive":"dps",angle:u,travelMode:T==="h"||T==="height"?"height":"width",travel:x},notation:l}}const b=l.match(/^([0-9]*\.?[0-9]+)w@([0-9]*\.?[0-9]+)(h|height)$/i);if(b){const u=c(parseFloat(b[1])),y=c(parseFloat(b[2]));return{id:h,type:"thickness-height",values:{thickness:u,height:y},notation:l}}const S=l.match(/^([0-9]*\.?[0-9]+)w@([0-9]*\.?[0-9]+)acp$/i);if(S){const u=c(parseFloat(S[1])),y=c(parseFloat(S[2]));return{id:h,type:"apex-caliper",values:{thickness:u,distance:y},notation:l}}const m=l.match(/^([0-9]*\.?[0-9]+)w@([0-9]*\.?[0-9]+)cp$/i);if(m){const u=c(parseFloat(m[1])),y=c(parseFloat(m[2]));return{id:h,type:"caliper",values:{thickness:u,distance:y},notation:l}}if(l.match(/^([0-9]*\.?[0-9]+)(h|H|oa)$/i))return null;console.warn("Unknown notation token:",l,"falling back to angle-travel");const f=t.segments[a];return f?{id:h,type:"angle-travel",values:{angleMode:f.angleType,angle:f.angleValue,travelMode:f.travelType,travel:c(f.travelValue)},notation:l}:null}).filter(l=>l!==null)}_importNotation(e,t){const s=ue(e,this.units);let i=e;e.includes("=>")||(i=`${this.units}=>${e}`),t==="A"?(this.notationA=i,this.notationAWarnings=s.warnings,s.segments.length&&(this.segments=s.segments.map(n=>({angleType:n.angleType,angleValue:n.angleValue,travelType:n.travelType,travelValue:n.travelValue})))):(this.notationB=i,this.notationBWarnings=s.warnings,s.segments.length&&(this.segmentsB=s.segments.map(n=>({angleType:n.angleType,angleValue:n.angleValue,travelType:n.travelType,travelValue:n.travelValue})))),s.segments.length&&(this._customViewBox=null,this.overlayTargetWidth=null,this.requestUpdate(),this._persist(),s.notationUnits&&s.notationUnits!==this.units&&(this.units=s.notationUnits))}};Pe.styles=L`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      /* Use Shoelace tokens directly */
      color: var(--sl-color-neutral-900);
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
      background: var(--sl-color-neutral-0);
      border: 1px solid var(--sl-color-neutral-300);
      border-radius: 4px;
      padding: 0.4rem 0.5rem 0.5rem;
      min-width: 260px;
    }
    .panel-header {
      font-size: 0.65rem;
      font-weight: 600;
      margin-bottom: 0.3rem;
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
      border: 1px solid var(--sl-color-neutral-200);
      background: var(--sl-color-neutral-0);
      box-sizing: border-box;
    }
    table.segments-edit {
      width: 100%;
      border-collapse: collapse;
    }
    table.segments-edit th,
    table.segments-edit td {
      border: 1px solid var(--sl-color-neutral-300);
      border-width: 0 0 1px 0;
      padding: 0.1rem 0.2rem;
      font-size: 0.55rem;
      text-align: right;
      line-height: 1.1;
    }
    table.segments-edit th {
      background: var(--sl-color-neutral-50);
      position: sticky;
      top: 0;
      z-index: 1;
      border-bottom-width: 1px;
    }
    .seg-table-wrap {
      max-height: 150px;
      overflow: auto;
      border: 1px solid var(--sl-color-neutral-300);
      border-radius: 4px;
      background: var(--sl-color-neutral-0);
    }
    .warn {
      color: var(--sl-color-warning-600);
      font-size: 0.6rem;
      margin: 0.4rem 0;
    }
    .svg-wrap {
      border: 2px solid var(--sl-color-neutral-200);
      background: var(--sl-color-neutral-0);
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
      margin-top: 0.3rem;
      max-height: 24vh;
      overflow: auto;
      border: 1px solid var(--vsa-border);
      border-radius: 4px;
      background: var(--vsa-card-bg);
    }
    .fs-seglist table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.55rem;
    }
    .fs-seglist th,
    .fs-seglist td {
      padding: 0.1rem 0.25rem;
      border: 1px solid var(--vsa-border);
      border-width: 0 0 1px 0;
      text-align: left;
      line-height: 1.1;
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
  `;let _=Pe;$([g({type:Number})],_.prototype,"angleInput",2);$([g({type:Number})],_.prototype,"thicknessInput",2);$([g({type:Number})],_.prototype,"angleInputB",2);$([g({type:Number})],_.prototype,"thicknessInputB",2);$([g({type:String})],_.prototype,"angleInputType",2);$([g({type:String})],_.prototype,"angleInputTypeB",2);$([g({type:String})],_.prototype,"travelInputType",2);$([g({type:String})],_.prototype,"travelInputTypeB",2);$([g({type:Number})],_.prototype,"zoom",2);$([g({type:Number})],_.prototype,"pan",2);$([g({type:Array,attribute:!1})],_.prototype,"segments",1);$([g({type:Array,attribute:!1})],_.prototype,"segmentsB",1);$([N()],_.prototype,"warning",2);$([g({type:String})],_.prototype,"units",2);$([g({type:Boolean})],_.prototype,"regionZoomActive",2);$([g({type:Boolean})],_.prototype,"overlayMode",2);$([g({type:Number})],_.prototype,"overlayCenter",2);$([g({type:Number})],_.prototype,"overlayTargetWidth",2);$([N()],_.prototype,"showProfile",2);$([N()],_.prototype,"notationA",2);$([N()],_.prototype,"notationB",2);$([N()],_.prototype,"notationAWarnings",2);$([N()],_.prototype,"notationBWarnings",2);$([N()],_.prototype,"_fullScreen",2);$([g({type:Number})],_.prototype,"strokePxMin",2);$([g({type:Boolean})],_.prototype,"showDebug",2);$([g({type:Boolean})],_.prototype,"showGeometryA",2);$([g({type:Boolean})],_.prototype,"showGeometryB",2);$([g({type:Boolean})],_.prototype,"apexMacro",1);$([N()],_.prototype,"thinStrokes",2);$([N()],_.prototype,"adaptiveZoomMode",2);$([N()],_.prototype,"_notationDialogOpen",2);$([N()],_.prototype,"_notationDialogSide",2);$([N()],_.prototype,"_notationDialogSegments",2);customElements.define("vsa-geometry-builder",_);var cs=Object.defineProperty,Ne=(r,e,t,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(e,t,i)||i);return i&&cs(e,t,i),i};const He=class He extends H{constructor(){super(...arguments),this.width=null,this.height=null,this._shouldFocus=!1}_onWidth(e){const t=e.target;this.width=t.value?Number(t.value):null,this._shouldFocus=!1}_onHeight(e){const t=e.target;this.height=t.value?Number(t.value):null,this._shouldFocus=!1}render(){var s,i;const e=Lt(this.width??void 0,this.height??void 0);let t=null;return e==null&&(this.width==null||this.height==null?t="Width and height are required.":this.height===0?t="Height must be greater than 0.":t="width/2 must be ≤ height (arcsin domain).",this._shouldFocus&&queueMicrotask(()=>{var o;const n=(o=this.renderRoot)==null?void 0:o.querySelector(this.width==null?'sl-input[label="Width"]':'sl-input[label="Height"]');n==null||n.focus(),this._shouldFocus=!1})),p`
      <section class="calc">
        <h2>
          Angle Measurement
          <sl-tooltip
            content="Convert bevel width & height behind the edge into degrees-per-side."
          >
            <sl-icon
              name="info-circle"
              style="font-size: 0.75rem; opacity: 0.7;"
              aria-hidden="true"
              library="default"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <div class="input-row">
          <sl-input
            label="Width (mm)"
            type="number"
            step="0.1"
            .value=${((s=this.width)==null?void 0:s.toString())||""}
            @sl-input=${this._onWidth}
            help-text="Total bevel width measured across the edge"
            clearable
          ></sl-input>
          <sl-input
            label="Height (mm)"
            type="number"
            step="0.1"
            .value=${((i=this.height)==null?void 0:i.toString())||""}
            @sl-input=${this._onHeight}
            help-text="Distance behind the edge where width was measured"
            clearable
          ></sl-input>
        </div>
        <div class="output-row">
          <div class="result-block">
            ${t?p`<div class="error">${t}</div>`:p`<div class="result">${e==null?void 0:e.toFixed(2)}° per side</div>`}
          </div>
        </div>
      </section>
    `}};He.styles=L`
    :host {
      display: block;
    }
    .calc {
      background: var(--sl-color-neutral-0);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 14px;
      padding: 1.1rem 1.15rem 1.15rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: box-shadow 0.15s, background 0.15s, border-color 0.15s;
    }
    .calc:hover {
      box-shadow: var(--sl-shadow-medium);
    }
    .calc h2 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 0.6rem;
      font-size: 0.9rem;
      font-weight: 600;
    }
    .input-row {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      align-items: flex-end;
    }
    .output-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem 1rem;
      align-items: flex-end;
    }
    .result-block {
      max-width: 100%;
      overflow-wrap: break-word;
      min-width: 0;
    }
    .error {
      color: var(--sl-color-danger-600);
      font-size: 0.9rem;
      font-weight: 500;
    }
    .result {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--sl-color-success-600);
    }
  `;let te=He;Ne([g({type:Number})],te.prototype,"width");Ne([g({type:Number})],te.prototype,"height");Ne([g({type:Boolean,state:!0})],te.prototype,"_shouldFocus");customElements.define("vsa-angle-calculator",te);var ps=Object.defineProperty,Ve=(r,e,t,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(e,t,i)||i);return i&&ps(e,t,i),i};const ze=class ze extends H{constructor(){super(...arguments),this.desiredAngle=null,this.sharpenerAngle=null,this._shouldFocus=!1}_onDesiredAngle(e){const t=e.target;this.desiredAngle=t.value?Number(t.value):null,this._shouldFocus=!1}_onSharpenerAngle(e){const t=e.target;this.sharpenerAngle=t.value?Number(t.value):null,this._shouldFocus=!1}render(){var s,i;const e=qt(this.desiredAngle??void 0,this.sharpenerAngle??void 0);let t=null;return e==null&&(this.desiredAngle==null||this.sharpenerAngle==null?t="Both desired and setting angles required.":t="Unexpected null result; ensure numeric inputs.",this._shouldFocus&&queueMicrotask(()=>{var o;const n=(o=this.renderRoot)==null?void 0:o.querySelector(this.desiredAngle==null?'sl-input[label="Desired (DPS)"]':'sl-select[label="Setting"]');n==null||n.focus(),this._shouldFocus=!1})),p`
      <section class="calc">
        <h2>
          Sharpmaker Elevation
          <sl-tooltip
            content="Calculate required base lift to reach a target rod angle."
          >
            <sl-icon
              name="info-circle"
              style="font-size: 0.75rem; opacity: 0.7;"
              aria-hidden="true"
              library="default"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <div class="input-row">
          <sl-input
            label="Desired (DPS)"
            type="number"
            step="0.1"
            .value=${((s=this.desiredAngle)==null?void 0:s.toString())||""}
            @sl-input=${this._onDesiredAngle}
            help-text="Target degrees per side"
            clearable
          ></sl-input>
          <sl-select
            label="Setting"
            placeholder="Choose angle"
            .value=${((i=this.sharpenerAngle)==null?void 0:i.toString())||""}
            @sl-change=${this._onSharpenerAngle}
            help-text="Sharpmaker factory rod angle"
            clearable
          >
            <sl-option value="15">15°</sl-option>
            <sl-option value="17">17°</sl-option>
            <sl-option value="20">20°</sl-option>
            <sl-option value="25">25°</sl-option>
            <sl-option value="30">30°</sl-option>
            <sl-option value="40">40°</sl-option>
          </sl-select>
        </div>
        <div class="output-row">
          <div class="result-block">
            ${t?p`<div class="error">${t}</div>`:p`<div class="result">
                  Lift base ${e==null?void 0:e.toFixed(2)} mm
                </div>`}
          </div>
        </div>
      </section>
    `}};ze.styles=L`
    :host {
      display: block;
    }
    .calc {
      background: var(--sl-color-neutral-0);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 14px;
      padding: 1.1rem 1.15rem 1.15rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: box-shadow 0.15s, background 0.15s, border-color 0.15s;
    }
    .calc:hover {
      box-shadow: var(--sl-shadow-medium);
    }
    .calc h2 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 0.6rem;
      font-size: 0.9rem;
      font-weight: 600;
    }
    .input-row {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      align-items: flex-end;
    }
    .output-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem 1rem;
      align-items: flex-end;
    }
    .result-block {
      max-width: 100%;
      overflow-wrap: break-word;
      min-width: 0;
    }
    .error {
      color: var(--sl-color-danger-600);
      font-size: 0.9rem;
      font-weight: 500;
    }
    .result {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--sl-color-success-600);
    }
  `;let se=ze;Ve([g({type:Number})],se.prototype,"desiredAngle");Ve([g({type:Number})],se.prototype,"sharpenerAngle");Ve([g({type:Boolean,state:!0})],se.prototype,"_shouldFocus");customElements.define("vsa-elevation-calculator",se);var us=Object.defineProperty,We=(r,e,t,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(e,t,i)||i);return i&&us(e,t,i),i};const De=class De extends H{constructor(){super(...arguments),this.rotationAngle=null,this.rotationSharpener=null,this._shouldFocus=!1}_onRotationAngle(e){const t=e.target;this.rotationAngle=t.value?Number(t.value):null,this._shouldFocus=!1}_onRotationSharpener(e){const t=e.target;this.rotationSharpener=t.value?Number(t.value):null,this._shouldFocus=!1}render(){var s,i;const e=Yt(this.rotationAngle??void 0,this.rotationSharpener??void 0);let t=null;return e==null&&(this.rotationAngle==null||this.rotationSharpener==null?t="Provide both target and setting angles.":t="csc(setting) * sin(angle) must be between -1 and 1.",this._shouldFocus&&queueMicrotask(()=>{var o;const n=(o=this.renderRoot)==null?void 0:o.querySelector(this.rotationAngle==null?'sl-input[label="Angle (DPS)"]':'sl-select[label="Setting"]');n==null||n.focus(),this._shouldFocus=!1})),p`
      <section class="calc">
        <h2>
          Sharpmaker Rotation
          <sl-tooltip
            content="Determine safe rotation offset between common rod angle settings."
          >
            <sl-icon
              name="info-circle"
              style="font-size: 0.75rem; opacity: 0.7;"
              aria-hidden="true"
              library="default"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <div class="input-row">
          <sl-input
            label="Angle (DPS)"
            type="number"
            step="0.1"
            .value=${((s=this.rotationAngle)==null?void 0:s.toString())||""}
            @sl-input=${this._onRotationAngle}
            help-text="Target degrees per side"
            clearable
          ></sl-input>
          <sl-select
            label="Setting"
            placeholder="Choose base angle"
            .value=${((i=this.rotationSharpener)==null?void 0:i.toString())||""}
            @sl-change=${this._onRotationSharpener}
            help-text="Sharpmaker factory rod angle"
            clearable
          >
            <sl-option value="15">15°</sl-option>
            <sl-option value="17">17°</sl-option>
            <sl-option value="20">20°</sl-option>
            <sl-option value="25">25°</sl-option>
            <sl-option value="30">30°</sl-option>
            <sl-option value="40">40°</sl-option>
          </sl-select>
        </div>
        <div class="output-row">
          <div class="result-block">
            ${t?p`<div class="error">${t}</div>`:p`<div class="result">
                  Rotate base ${e==null?void 0:e.toFixed(1)}°
                </div>`}
          </div>
        </div>
      </section>
    `}};De.styles=L`
    :host {
      display: block;
    }
    .calc {
      background: var(--sl-color-neutral-0);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 14px;
      padding: 1.1rem 1.15rem 1.15rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: box-shadow 0.15s, background 0.15s, border-color 0.15s;
    }
    .calc:hover {
      box-shadow: var(--sl-shadow-medium);
    }
    .calc h2 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 0.6rem;
      font-size: 0.9rem;
      font-weight: 600;
    }
    .input-row {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      align-items: flex-end;
    }
    .output-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem 1rem;
      align-items: flex-end;
    }
    .result-block {
      max-width: 100%;
      overflow-wrap: break-word;
      min-width: 0;
    }
    .error {
      color: var(--sl-color-danger-600);
      font-size: 0.9rem;
      font-weight: 500;
    }
    .result {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--sl-color-success-600);
    }
  `;let ie=De;We([g({type:Number})],ie.prototype,"rotationAngle");We([g({type:Number})],ie.prototype,"rotationSharpener");We([g({type:Boolean,state:!0})],ie.prototype,"_shouldFocus");customElements.define("vsa-rotation-calculator",ie);var gs=Object.defineProperty,ut=(r,e,t,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(e,t,i)||i);return i&&gs(e,t,i),i};const Fe=class Fe extends H{constructor(){super(...arguments),this.passes=null,this._shouldFocus=!1}_onPassesChange(e){const t=e.target;this.passes=t.value?Number(t.value):null,this._shouldFocus=!1}render(){var i;const e=Ot(this.passes??void 0),t=e.total>0;let s=null;return t||(this.passes==null?s="Number of passes is required.":this.passes<1?s="Pass count must be ≥ 1.":s="Invalid pass input.",this._shouldFocus&&queueMicrotask(()=>{var o;const n=(o=this.renderRoot)==null?void 0:o.querySelector('sl-input[label="Passes"]');n==null||n.focus(),this._shouldFocus=!1})),p`
      <section class="calc">
        <h2>
          Pass Counter
          <sl-tooltip
            content="Plan descending stroke sets and view total plus X-strokes."
          >
            <sl-icon
              name="info-circle"
              style="font-size: 0.75rem; opacity: 0.7;"
              aria-hidden="true"
              library="default"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <div class="output-row">
          <sl-input
            label="Passes"
            type="number"
            step="1"
            min="1"
            .value=${((i=this.passes)==null?void 0:i.toString())||""}
            @sl-input=${this._onPassesChange}
            help-text="Starting pass count (e.g., 19, 29)"
            clearable
          ></sl-input>
        </div>
        <div aria-live="polite">
          ${t?p`<div class="result-block" role="status">
                <span>Total / X-Strokes</span>
                <span class="result-value"
                  >${Math.round(e.total)} /
                  ${Math.round(e.xStrokes||0)}</span
                >
              </div>`:p`<div class="error" role="alert">${s}</div>`}
        </div>
        ${t?p`
              <div class="sequence-container">
                <span
                  style="font-size: 0.85rem; color: var(--sl-color-neutral-600); font-weight: 500; margin-bottom: 0.5rem; display: block;"
                  >Sequence</span
                >
                ${e.sequence.map(n=>p`<span class="badge-seq">${n}</span>`)}
              </div>
            `:""}
      </section>
    `}};Fe.styles=L`
    :host {
      display: block;
    }
    .calc {
      background: var(--sl-color-neutral-0);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 14px;
      padding: 1.1rem 1.15rem 1.15rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: box-shadow 0.15s, background 0.15s, border-color 0.15s;
    }
    .calc:hover {
      box-shadow: var(--sl-shadow-medium);
    }
    .calc h2 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 0.6rem;
      font-size: 0.9rem;
      font-weight: 600;
    }
    .output-row {
      display: flex;
      gap: 0.75rem;
      align-items: flex-end;
    }
    .result-block {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      min-width: 0;
    }
    .result-block span:first-child {
      font-size: 0.85rem;
      color: var(--sl-color-neutral-600);
      font-weight: 500;
    }
    .result-value {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--sl-color-success-600);
    }
    .error {
      color: var(--sl-color-danger-600);
      font-size: 0.9rem;
      font-weight: 500;
    }
    .badge-seq {
      display: inline-block;
      background: var(--sl-color-primary-100);
      color: var(--sl-color-primary-700);
      padding: 0.125rem 0.375rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;
      margin-right: 0.25rem;
      margin-bottom: 0.25rem;
    }
    .sequence-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-top: 0.5rem;
    }
  `;let ce=Fe;ut([g({type:Number})],ce.prototype,"passes");ut([g({type:Boolean,state:!0})],ce.prototype,"_shouldFocus");customElements.define("vsa-pass-calculator",ce);var ms=Object.defineProperty,X=(r,e,t,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(e,t,i)||i);return i&&ms(e,t,i),i};const Ue=class Ue extends H{constructor(){super(...arguments),this.hardness=null,this.edgeAngle=null,this.carbides={CrC:0,CrCV:0,MC:0,M6C:0,MN:0,CrN:0,Fe3C:0},this._shouldFocus=!1,this.open=!0,this.availableSteels=[],this.comparisonSteels=[]}_onHardnessChange(e){const t=e.target;this.hardness=t.value?Number(t.value):null,this._shouldFocus=!1}_onEdgeAngleChange(e){const t=e.target;this.edgeAngle=t.value?Number(t.value):null,this._shouldFocus=!1}_onCarbideChange(e,t){const s=e.target;this.carbides={...this.carbides,[t]:s.value?Number(s.value):0},this._shouldFocus=!1}_addComparisonSteel(){var t;const e=Date.now().toString();this.comparisonSteels=[...this.comparisonSteels,{id:e,steelId:((t=this.availableSteels[0])==null?void 0:t.id)||"",hardness:60,edgeAngle:20}]}_removeComparisonSteel(e){this.comparisonSteels=this.comparisonSteels.filter(t=>t.id!==e)}_updateComparisonSteel(e,t,s){this.comparisonSteels=this.comparisonSteels.map(i=>i.id===e?{...i,[t]:s}:i)}_getComparisonSteelTCC(e){const t=this.availableSteels.find(i=>i.id===e.steelId);return t?ke({id:t.id,name:t.name,hardness:e.hardness,edgeAngle:e.edgeAngle,CrC:t.CrC||0,CrV:t.CrV||0,MC:t.MC||0,M6C:t.M6C||0,MN:t.MN||0,CrN:t.CrN||0,Fe3C:t.Fe3C||0}).TCC:0}render(){var o,l;const e=ke({hardness:this.hardness??void 0,edgeAngle:this.edgeAngle??void 0,CrC:this.carbides.CrC??0,CrV:this.carbides.CrCV??0,MC:this.carbides.MC??0,M6C:this.carbides.M6C??0,MN:this.carbides.MN??0,CrN:this.carbides.CrN??0,Fe3C:this.carbides.Fe3C??0}),t=this.hardness!=null&&this.hardness>=50&&this.hardness<=70,s=this.edgeAngle!=null&&this.edgeAngle>=10&&this.edgeAngle<=35,i=[];t||(this.hardness==null?i.push("Hardness (HRC) is required."):i.push("Hardness must be 50-70 HRC.")),s||(this.edgeAngle==null?i.push("Edge angle (DPS) is required."):i.push("Edge angle must be 10-35 degrees per side.")),i.length&&this._shouldFocus&&queueMicrotask(()=>{var c;const a=t?'sl-input[label="Edge Angle"]':'sl-input[label="Hardness"]',h=(c=this.renderRoot)==null?void 0:c.querySelector(a);h==null||h.focus(),this._shouldFocus=!1});const n=[{k:"CrC",t:"Chromium carbides (CrC) – moderate wear contribution."},{k:"CrCV",t:"Chromium/Vanadium mixed carbides – added abrasion resistance."},{k:"MC",t:"MC (V/Nb) carbides – very high hardness, strong wear resistance."},{k:"M6C",t:"Complex M6C carbides – balanced secondary contribution."},{k:"MN",t:"Manganese phases – minor influence overall."},{k:"CrN",t:"Chromium nitride – stability & wear support."},{k:"Fe3C",t:"Iron carbide (cementite) – baseline matrix wear component."}];return p`
      <sl-details ?open=${this.open}>
        <div slot="summary">
          Edge Retention Estimator
          <sl-tooltip
            content="Approximate CATRA TCC and volume from hardness, edge angle, and carbides."
          >
            <sl-icon
              name="info-circle"
              style="font-size: 0.75rem; opacity: 0.7; margin-left: 0.4rem;"
              aria-hidden="true"
              library="default"
            ></sl-icon>
          </sl-tooltip>
        </div>
        <section class="calc">
          <p class="section-subtitle">
            Enter custom steel properties to get an estimate, or interact with
            the full steel database below.
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
                    label="Hardness"
                    type="number"
                    step="0.5"
                    min="50"
                    max="70"
                    .value=${((o=this.hardness)==null?void 0:o.toString())||""}
                    @sl-input=${this._onHardnessChange}
                    size="small"
                    help-text="HRC scale"
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
                    label="Edge Angle"
                    type="number"
                    step="0.5"
                    min="10"
                    max="35"
                    .value=${((l=this.edgeAngle)==null?void 0:l.toString())||""}
                    @sl-input=${this._onEdgeAngleChange}
                    size="small"
                    help-text="DPS"
                  ></sl-input>
                </td>
              </tr>
              ${n.map(({k:a,t:h})=>{var c;return p`<tr>
                  <td>
                    <div class="label-with-tooltip">
                      <span>${a}</span>
                      <sl-tooltip content="${h}">
                        <sl-icon
                          name="info-circle"
                          style="font-size: 0.75rem; opacity: 0.7;"
                        ></sl-icon>
                      </sl-tooltip>
                    </div>
                  </td>
                  <td>
                    <sl-input
                      label="${a}"
                      type="number"
                      step="0.1"
                      min="0"
                      .value=${((c=this.carbides[a])==null?void 0:c.toString())||"0"}
                      @sl-input=${d=>this._onCarbideChange(d,a)}
                      size="small"
                      help-text="Volume %"
                    ></sl-input>
                  </td>
                </tr>`})}
            </table>
          </div>
          <div aria-live="polite">
            ${i.length===0?p`<div class="result-block" role="status">
                  <span>TCC / Volume</span>
                  <span class="result-value"
                    >${e.TCC} / ${e.volume.toFixed(1)}</span
                  >
                </div>`:p`<div class="error" role="alert">
                  ${i.map(a=>p`<div>${a}</div>`)}
                </div>`}
          </div>
          ${i.length===0?p`
                <div class="output-row">
                  <sl-progress-bar
                    .value=${Math.min(e.volume,30)}
                    max="30"
                    label="Carbide Volume"
                  ></sl-progress-bar>
                </div>
              `:""}
        </section>
      </sl-details>

      <!-- Compare Existing Steels Section -->
      <section class="comparison-section">
        <div class="comparison-header">
          <h3>Compare Existing Steels</h3>
          <sl-button
            variant="primary"
            size="small"
            @click=${this._addComparisonSteel}
            ?disabled=${this.availableSteels.length===0}
          >
            <sl-icon slot="prefix" name="plus"></sl-icon>
            Add Steel
          </sl-button>
        </div>

        ${this.comparisonSteels.length>0?p`
              <table class="comparison-table">
                <thead>
                  <tr>
                    <th>Steel</th>
                    <th>HRC</th>
                    <th>Angle (DPS)</th>
                    <th>TCC</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${this.comparisonSteels.map(a=>p`
                      <tr>
                        <td>
                          <sl-select
                            .value=${a.steelId}
                            @sl-change=${h=>this._updateComparisonSteel(a.id,"steelId",h.target.value)}
                            size="small"
                          >
                            ${this.availableSteels.map(h=>p`
                                <sl-option value=${h.id}>${h.name}</sl-option>
                              `)}
                          </sl-select>
                        </td>
                        <td>
                          <sl-input
                            type="number"
                            .value=${String(a.hardness)}
                            @input=${h=>this._updateComparisonSteel(a.id,"hardness",Number(h.target.value))}
                            size="small"
                            min="40"
                            max="70"
                          ></sl-input>
                        </td>
                        <td>
                          <sl-input
                            type="number"
                            .value=${String(a.edgeAngle)}
                            @input=${h=>this._updateComparisonSteel(a.id,"edgeAngle",Number(h.target.value))}
                            size="small"
                            min="5"
                            max="50"
                          ></sl-input>
                        </td>
                        <td class="tcc-cell">
                          ${this._getComparisonSteelTCC(a)}
                        </td>
                        <td class="delete-cell">
                          <sl-icon-button
                            name="trash"
                            @click=${()=>this._removeComparisonSteel(a.id)}
                            label="Remove steel"
                          ></sl-icon-button>
                        </td>
                      </tr>
                    `)}
                </tbody>
              </table>
            `:p`
              <div class="empty-comparison">
                No steels added. Click "Add Steel" to start comparing.
              </div>
            `}
      </section>
    `}};Ue.styles=L`
    :host {
      display: block;
    }
    .calc {
      background: var(--sl-color-neutral-0);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 14px;
      padding: 1.1rem 1.15rem 1.15rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: box-shadow 0.15s, background 0.15s, border-color 0.15s;
    }
    .calc:hover {
      box-shadow: var(--sl-shadow-medium);
    }
    .calc h2 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 0.6rem;
      font-size: 0.9rem;
      font-weight: 600;
    }
    .section-subtitle {
      margin: 0 0 1rem;
      font-size: 0.85rem;
      color: var(--sl-color-neutral-600);
      line-height: 1.4;
    }
    .retention-table {
      width: 100%;
      border-spacing: 0;
    }
    .retention-table td {
      padding: 0.4rem 0;
      vertical-align: middle;
    }
    .retention-table td:first-child {
      width: 40%;
      padding-right: 0.75rem;
    }
    .label-with-tooltip {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .result-block {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      min-width: 0;
    }
    .result-block span:first-child {
      font-size: 0.85rem;
      color: var(--sl-color-neutral-600);
      font-weight: 500;
    }
    .result-value {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--sl-color-success-600);
    }
    .error {
      color: var(--sl-color-danger-600);
      font-size: 0.9rem;
      font-weight: 500;
    }
    .output-row {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }

    /* Comparison Styles */
    .comparison-section {
      margin-top: 2rem;
      border: 1px solid var(--sl-color-neutral-300);
      border-radius: 8px;
      overflow: hidden;
    }

    .comparison-header {
      background: var(--sl-color-neutral-100);
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--sl-color-neutral-300);
    }

    .comparison-header h3 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--sl-color-neutral-700);
    }

    .comparison-table {
      width: 100%;
      border-collapse: collapse;
    }

    .comparison-table th,
    .comparison-table td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid var(--sl-color-neutral-200);
    }

    .comparison-table th {
      background: var(--sl-color-neutral-50);
      font-weight: 600;
      color: var(--sl-color-neutral-700);
      font-size: 0.875rem;
    }

    .comparison-table td {
      vertical-align: middle;
    }

    .comparison-table tr:last-child td {
      border-bottom: none;
    }

    .comparison-table tr:hover {
      background: var(--sl-color-neutral-25);
    }

    .comparison-table .tcc-cell {
      font-weight: 600;
      color: var(--sl-color-primary-600);
      text-align: center;
    }

    .comparison-table .delete-cell {
      text-align: center;
      width: 60px;
    }

    .empty-comparison {
      padding: 2rem;
      text-align: center;
      color: var(--sl-color-neutral-500);
      font-style: italic;
    }

    .comparison-table sl-select,
    .comparison-table sl-input {
      width: 100%;
    }

    .comparison-table sl-select::part(form-control) {
      margin-bottom: 0;
    }

    .comparison-table sl-input::part(form-control) {
      margin-bottom: 0;
    }
  `;let F=Ue;X([g({type:Number})],F.prototype,"hardness");X([g({type:Number})],F.prototype,"edgeAngle");X([g({type:Object})],F.prototype,"carbides");X([g({type:Boolean,state:!0})],F.prototype,"_shouldFocus");X([g({type:Boolean})],F.prototype,"open");X([g({attribute:!1})],F.prototype,"availableSteels");X([g({attribute:!1})],F.prototype,"comparisonSteels");customElements.define("vsa-retention-calculator",F);var vs=Object.defineProperty,U=(r,e,t,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(e,t,i)||i);return i&&vs(e,t,i),i};const Re=class Re extends H{constructor(){super(),this.page="home",this.hardness=60,this.edgeAngle=30,this.carbides={CrC:0,CrCV:0,MC:5.5,M6C:5,MN:0,CrN:0,Fe3C:0},this.dark=!1,this.online=navigator.onLine,this.updateReady=!1,this.geometryFullScreen=!1,this.retentionEstimatorCollapsed=!0,this.availableSteels=[],this.addEventListener("steel-selected",e=>this._onSteelSelected(e)),document.documentElement.classList.remove("dark"),document.documentElement.classList.remove("sl-theme-dark");try{const e=localStorage.getItem("vsa-theme");let t=!1;if(e?t=e==="dark":t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t&&(document.documentElement.classList.add("dark"),document.documentElement.classList.add("sl-theme-dark"),this.dark=!0,!document.getElementById("shoelace-dark-theme"))){const i=document.createElement("link");i.id="shoelace-dark-theme",i.rel="stylesheet",i.href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.13.0/cdn/themes/dark.css",document.head.appendChild(i)}}catch{}window.addEventListener("hashchange",()=>this._applyRoute()),this._applyRoute(),window.addEventListener("online",()=>{this.online=!0,this.requestUpdate()}),window.addEventListener("offline",()=>{this.online=!1,this.requestUpdate()}),"serviceWorker"in navigator&&(navigator.serviceWorker.getRegistration().then(e=>{e&&e.addEventListener("updatefound",()=>{const t=e.installing;t&&t.addEventListener("statechange",()=>{t.state==="installed"&&navigator.serviceWorker.controller&&(this.updateReady=!0,this.requestUpdate())})})}),navigator.serviceWorker.addEventListener("controllerchange",()=>{window.__vsaReloaded||(window.__vsaReloaded=!0,requestAnimationFrame(()=>window.location.reload()))})),this.addEventListener("geometry-fullscreen-changed",e=>{const t=e.detail;this.geometryFullScreen=!!(t!=null&&t.fullScreen),this.requestUpdate()})}_applyRoute(){const e=window.location.hash.replace(/^#\//,"");this.page=e||"home"}_go(e){window.location.hash=`/${e}`,this.page=e}_toggleRetentionEstimator(){this.retentionEstimatorCollapsed=!this.retentionEstimatorCollapsed}_num(e,t){const s=e.target,i=Number(s.value);this[t]=i}_carbide(e,t){const s=e.target,i=Number(s.value);this.carbides={...this.carbides,[t]:i}}render(){return p`${this.geometryFullScreen?p``:p`<header
            class="app-header ${this.geometryFullScreen?"hidden":""}"
          >
            <h1 @click=${()=>this._go("home")}>VSharpAngle</h1>
            <sl-icon-button
              name="house-fill"
              @click=${()=>this._go("home")}
              label="Go to home"
            ></sl-icon-button>
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
      </footer>`}_toggleTheme(){const e=document.documentElement,t=e.classList.toggle("dark");if(t){if(e.classList.add("sl-theme-dark"),!document.getElementById("shoelace-dark-theme")){const i=document.createElement("link");i.id="shoelace-dark-theme",i.rel="stylesheet",i.href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.13.0/cdn/themes/dark.css",document.head.appendChild(i)}}else e.classList.remove("sl-theme-dark");try{localStorage.setItem("vsa-theme",t?"dark":"light")}catch{}this.dark=t}_renderHome(){return p` <div class="intro-banner">
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
        ${[{page:"angle",icon:"rulers",title:"Angle Measure",desc:"Calculate inclusive edge angle from bevel width & height."},{page:"elevation",icon:"arrow-up",title:"Sharpmaker Elevation",desc:"Find required base elevation for desired angle setting."},{page:"rotation",icon:"repeat",title:"Sharpmaker Rotation",desc:"Compute safe rotation angle between rod settings."},{page:"passes",icon:"list",title:"Pass Counter",desc:"Generate stroke sequence totals for progression."},{page:"retention",icon:"graph-up",title:"Edge Retention",desc:"Estimate TCC & volume from carbide & hardness data."},{page:"steels",icon:"database",title:"Steel Database",desc:"Browse carbide composition & derived metrics and view TCC estimates."},{page:"geometry",icon:"triangle",title:"Geometry Builder",desc:"Stack inclusive angle wedges into a cross-section."}].map(t=>p`<a
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
      </div>`}_renderPage(){switch(this.page){case"angle":return p`<div class="page">
          <vsa-angle-calculator></vsa-angle-calculator>
          <div class="help" aria-label="Angle Calculator Explanation">
            <h2>Knife Angle Calculation</h2>
            <p>
              This calculator uses the width-to-height ratio to determine the
              degrees per side (DPS) of a knife's edge. The formula is based on
              trigonometry: <code>arcsin(width/2/height)</code>.
            </p>
            <p>
              For accurate measurements, ensure the blade is held perpendicular
              to the measuring surface and that the width represents the full
              edge width at the measured height.
            </p>
          </div>
        </div>`;case"elevation":return p`<div class="page">
          <vsa-elevation-calculator></vsa-elevation-calculator>
          <div class="help" aria-label="Elevation Calculator Explanation">
            <h2>Sharpmaker Elevation Adjustments</h2>
            <p>
              The Spyderco Sharpmaker allows angle adjustments by elevating the
              base. This calculator determines the required elevation (in
              notches) to achieve your target angle from the available rod
              settings.
            </p>
            <p>
              Each notch represents approximately 8 degrees of adjustment. The
              calculation accounts for the geometric relationship between
              elevation and angle change.
            </p>
          </div>
        </div>`;case"rotation":return p`<div class="page">
          <vsa-rotation-calculator></vsa-rotation-calculator>
          <div class="help" aria-label="Rotation Calculator Explanation">
            <h2>How Rotation Offsets Work</h2>
            <p>
              Rotating the base changes the relative orientation between the
              knife and the rods, allowing intermediate angles without swapping
              to different preset holes. The math multiplies
              <code>sin(target)</code> by <code>csc(setting)</code> and uses
              <code>acos</code> to find the rotation offset. The product must
              stay between -1 and 1 (a domain requirement).
            </p>
            <p>
              If you hit a domain error, pick a target closer to the rod's
              native setting. Very large deviations may be mechanically awkward
              or inconsistent.
            </p>
            <p>
              <strong>Tip:</strong> Rotate gradually and keep the spine vertical
              to avoid inadvertent angle drift.
            </p>
          </div>
        </div>`;case"passes":return p`<div class="page">
          <vsa-pass-calculator></vsa-pass-calculator>
          <div class="help" aria-label="Pass Counter Explanation">
            <h2>Why Track Progressive Passes?</h2>
            <p>
              Progressive pass reduction refines scratch pattern and apex
              quality while limiting over‑grinding. Starting passes define the
              top sequence; each descending step (minus 10) accelerates
              deburring and polish. Final small counts (5, 3, 2, 1) provide
              controlled finish.
            </p>
            <p>
              The total and X‑stroke count help estimate time investment and
              symmetry. Choose an odd starting number to maintain balanced
              alternation.
            </p>
            <p>
              <strong>Tip:</strong> If steel is hard or wear‑resistant, consider
              a higher starting pass count for proper apex formation.
            </p>
          </div>
        </div>`;case"retention":return this._loadSteels(),p`<div class="page">
          <vsa-retention-calculator
            .availableSteels=${this.availableSteels}
          ></vsa-retention-calculator>
        </div>`;case"steels":return this._pageSteels();case"geometry":return this._pageGeometry();case"intro":return this._pageIntro();default:return p`<div class="page">Unknown page.</div>`}}_pageGeometry(){return p`<div class="page">
      <vsa-geometry-builder></vsa-geometry-builder>
    </div>`}_pageIntro(){return p`<div class="page">
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
    </div>`}_pageSteels(){return customElements.get("vsa-steel-table")||wt(()=>Promise.resolve().then(()=>Gt),void 0),p`<div class="page">
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
    </div>`}_toggleSteelTable(){}_updateSw(){navigator.serviceWorker.getRegistration().then(e=>{e&&e.waiting?e.waiting.postMessage("vsa-skip-waiting"):e&&e.update()})}async _loadSteels(){if(this.availableSteels.length===0)try{const e=await fetch("/data/steels.json");this.availableSteels=await e.json()}catch(e){console.error("Failed to load steels:",e)}}_onSteelSelected(e){const{hardness:t,edgeAngle:s,carbides:i}=e.detail;this.hardness=t,this.edgeAngle=s,this.carbides={...i}}};Re.styles=L`
    :host {
      display: block;
      box-sizing: border-box;
    }
    /* Use Shoelace tokens directly - automatic light/dark handling */
    header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      background: var(--sl-color-neutral-0);
      position: sticky;
      top: 0;
      z-index: 10;
      border-bottom: 1px solid var(--sl-color-neutral-200);
      box-shadow: var(--sl-shadow-small);
    }
    header h1 {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: color 0.15s ease;
      user-select: none;
    }
    header h1:hover {
      color: var(--sl-color-primary-600);
    }
    header sl-icon-button {
      color: var(--sl-color-neutral-600);
      transition: color 0.15s ease;
    }
    header sl-icon-button:hover {
      color: var(--sl-color-primary-600);
    }
    header sl-icon-button::part(base) {
      color: inherit;
    }
    .intro-banner {
      margin: 0 0 1.15rem 0;
      padding: 1rem 1.15rem;
      background: linear-gradient(
        135deg,
        var(--sl-color-primary-600),
        var(--sl-color-primary-400)
      );
      color: var(--sl-color-neutral-0);
      border-radius: 16px;
      box-shadow: var(--sl-shadow-medium);
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .dark .intro-banner {
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
      background: var(--sl-color-neutral-0);
      border: 2px solid var(--sl-color-neutral-300);
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
      background: var(--sl-color-primary-50);
      border-color: var(--sl-color-primary-500);
    }
    .card-link:focus-visible {
      outline: 3px solid var(--sl-color-primary-500);
      outline-offset: 2px;
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
      background: var(--sl-color-neutral-0);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 14px;
      padding: 1.1rem 1.15rem 1.15rem;
      display: flex;
      flex-direction: column;
      gap: 1rem; /* more breathing room between groups */
      transition: box-shadow 0.15s, background 0.15s, border-color 0.15s;
    }
    .page section.calc:hover {
      box-shadow: var(--sl-shadow-medium);
    }
    .page .help {
      background: var(--sl-color-neutral-0);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 14px;
      padding: 1rem 1.15rem 1.1rem;
      font-size: 1rem;
      line-height: 1.55;
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
      box-shadow: var(--sl-shadow-small);
    }
    .page .help:hover {
      box-shadow: var(--sl-shadow-medium);
    }
    .output-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem 1rem; /* increase horizontal + vertical spacing */
      align-items: flex-end;
    }
    sl-details::part(base) {
      background: var(--sl-color-neutral-0);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 10px;
      padding: 0.6rem 0.75rem;
    }
    sl-details::part(summary) {
      font-weight: 600;
      letter-spacing: 0.4px;
      color: var(--sl-color-neutral-900);
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
    .result-block {
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
    .result-value {
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
    .collapsible-section {
      background: var(--vsa-card-bg);
      border: 1px solid var(--vsa-card-border);
      border-radius: 8px;
      margin-bottom: 1rem;
    }
    .collapsible-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      cursor: pointer;
      background: var(--vsa-surface, #f9fafb);
      border-bottom: 1px solid var(--vsa-border, #e5e7eb);
      transition: background-color 0.2s ease;
    }
    .collapsible-header:hover {
      background: var(--vsa-row-hover, #f3f4f6);
    }
    .collapsible-header h2 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--vsa-text-primary);
    }
    .collapsible-content {
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }
    .collapsible-content.collapsed {
      max-height: 0;
    }
    .collapsible-content.expanded {
      max-height: 800px; /* Adjust as needed for retention estimator */
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
    .retention-table td:first-child {
      background: var(--sl-color-neutral-50);
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

    sl-input::part(base):focus-within,
    sl-select::part(combobox):focus-within {
      outline: 2px solid var(--sl-color-primary-600);
      outline-offset: 2px;
    }
    .input-box sl-input::part(base) {
      width: 100%;
    }

    .input-box sl-input::part(help-text) {
      color: hsl(240deg 10.93% 72.35%); /* requested help text color */
    }
    .dark .invalid-msg {
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
  `;let z=Re;U([g({type:String})],z.prototype,"page");U([g({type:Number})],z.prototype,"hardness");U([g({type:Number})],z.prototype,"edgeAngle");U([g({attribute:!1})],z.prototype,"carbides");U([g({type:Boolean})],z.prototype,"dark");U([g({type:Boolean})],z.prototype,"online");U([g({type:Boolean})],z.prototype,"updateReady");U([g({type:Boolean})],z.prototype,"geometryFullScreen");U([g({type:Boolean})],z.prototype,"retentionEstimatorCollapsed");U([g({attribute:!1})],z.prototype,"availableSteels");customElements.define("vsa-app-shell",z);const K=self,Ie="v2",gt=`vsa-precache-${Ie}`,Ce=`vsa-runtime-${Ie}`,mt=`vsa-data-${Ie}`,fs=["./","./index.html","./manifest.json"];K.addEventListener("install",r=>{K.skipWaiting(),r.waitUntil(caches.open(gt).then(e=>e.addAll(fs)))});K.addEventListener("activate",r=>{r.waitUntil((async()=>{const e=await caches.keys();await Promise.all(e.filter(t=>![gt,Ce,mt].includes(t)).map(t=>caches.delete(t))),K.clients.claim()})())});async function st(r,e){const t=await caches.open(e),s=await t.match(r);try{const i=await fetch(r);return i&&i.status===200&&t.put(r,i.clone()),i}catch{return s||new Response("Offline",{status:503})}}K.addEventListener("fetch",r=>{const{request:e}=r;if(e.method!=="GET")return;const t=new URL(e.url);if(e.mode==="navigate"){r.respondWith((async()=>{try{return await fetch(e)}catch{return await caches.match("./index.html")||new Response("Offline",{status:503})}})());return}if(t.pathname.endsWith("/data/steels.json")){r.respondWith(st(e,mt));return}if(t.hostname.includes("cdn.jsdelivr.net")){r.respondWith(st(e,Ce));return}t.origin===self.location.origin&&r.respondWith((async()=>{const s=await caches.open(Ce),i=await s.match(e);try{const n=await fetch(e);return n&&n.status===200&&s.put(e,n.clone()),n}catch{return i||new Response("Offline",{status:503})}})())});K.addEventListener("message",r=>{r.data==="vsa-skip-waiting"&&K.skipWaiting()});const it=location.hostname==="localhost"||location.hostname==="127.0.0.1";"serviceWorker"in navigator&&!it?window.addEventListener("load",()=>{navigator.serviceWorker.register("./service-worker.js").catch(r=>console.error("SW registration failed",r))}):it&&console.info("[VSA] Skipping service worker registration in dev environment.");

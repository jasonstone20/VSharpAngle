var c=Object.defineProperty;var g=(l,t,e)=>t in l?c(l,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[t]=e;var a=(l,t,e)=>g(l,typeof t!="symbol"?t+"":t,e);import{i as C,a as m,e as h,x as o}from"./main-DgbmXk5Z.js";class n extends C{constructor(){super(),this.steels=[],this.filter="",this.sortKey="name",this.sortDir="asc",this.hardness=60,this.edgeAngle=30,this._load()}async _load(){try{const t=await fetch("./data/steels.json");if(!t.ok)throw new Error("Failed steels.json");const e=await t.json();this.steels=e}catch(t){console.error(t)}}_onFilter(t){this.filter=t.target.value.trim().toLowerCase()}_setHardness(t){this.hardness=Number(t.target.value)||60}_setEdgeAngle(t){this.edgeAngle=Number(t.target.value)||30}_toggleSort(t){this.sortKey===t?this.sortDir=this.sortDir==="asc"?"desc":"asc":(this.sortKey=t,this.sortDir="asc")}_filtered(){const t=this.filter;let e=this.steels.map(s=>{const{TCC:r,volume:i,stability:d}=h({hardness:this.hardness,edgeAngle:this.edgeAngle,...s});return{...s,TCC:r,volume:i,stability:d}});return t&&(e=e.filter(s=>s.name.toLowerCase().includes(t))),e.sort((s,r)=>{const i=this.sortDir==="asc"?1:-1;return this.sortKey==="name"?s.name.localeCompare(r.name)*i:(s[this.sortKey]-r[this.sortKey])*i}),e}_select(t){const e={name:t.name,hardness:this.hardness,edgeAngle:this.edgeAngle,carbides:{CrC:t.CrC||0,CrCV:t.CrV||0,MC:t.MC||0,M6C:t.M6C||0,MN:t.MN||0,CrN:t.CrN||0,Fe3C:t.Fe3C||0}};this.dispatchEvent(new CustomEvent("steel-selected",{detail:e,bubbles:!0,composed:!0}))}render(){const t=this._filtered();return o`
      <div class="toolbar">
        <sl-input size="small" placeholder="Filter steel…" @input=${this._onFilter}></sl-input>
        <sl-input size="small" label="HRC" type="number" value=${this.hardness} @input=${this._setHardness}></sl-input>
        <sl-input size="small" label="Angle" type="number" value=${this.edgeAngle} @input=${this._setEdgeAngle}></sl-input>
        <sl-tooltip content="Click headers to sort"><sl-badge variant="neutral">Sort Tips</sl-badge></sl-tooltip>
      </div>
      ${t.length?o`
      <table>
        <thead>
          <tr>
            <th @click=${()=>this._toggleSort("name")}>Steel ${this.sortKey==="name"?this.sortDir==="asc"?"▲":"▼":""}</th>
            <th @click=${()=>this._toggleSort("CrC")}>CrC</th>
            <th @click=${()=>this._toggleSort("CrV")}>CrV</th>
            <th @click=${()=>this._toggleSort("MC")}>MC</th>
            <th @click=${()=>this._toggleSort("M6C")}>M6C</th>
            <th @click=${()=>this._toggleSort("MN")}>MN</th>
            <th @click=${()=>this._toggleSort("CrN")}>CrN</th>
            <th @click=${()=>this._toggleSort("Fe3C")}>Fe3C</th>
            <th @click=${()=>this._toggleSort("volume")}>Vol%</th>
            <th @click=${()=>this._toggleSort("TCC")}>est.TCC</th>
          </tr>
        </thead>
        <tbody>
          ${t.map(e=>{var s,r,i;return o`
            <tr @click=${()=>this._select(e)}>
              <td class="name">${e.name}</td>
              <td>${e.CrC||0}</td>
              <td>${e.CrV||0}</td>
              <td>${e.MC||0}</td>
              <td>${e.M6C||0}</td>
              <td>${e.MN||0}</td>
              <td>${e.CrN||0}</td>
              <td>${e.Fe3C||0}</td>
              <td class="vol-cell">${(s=e.volume)!=null&&s.toFixed?e.volume.toFixed(1):(i=(r=e.volume||(e.CrC||0)+(e.CrV||0)+(e.MC||0)+(e.M6C||0)+(e.MN||0)+(e.CrN||0)+(e.Fe3C||0)).toFixed)==null?void 0:i.call(r,1)}<br>${e.stability||h({hardness:this.hardness,edgeAngle:this.edgeAngle,...e}).stability}</td>
              <td class="tcc">${e.TCC}</td>
            </tr>`})}
        </tbody>
      </table>`:o`<div class="empty">No steels found.</div>`}
    `}}a(n,"styles",m`
    :host { display:block; }
    .toolbar { display:flex; flex-wrap:wrap; gap:.5rem; align-items:center; margin-bottom:.5rem; }
    table { width:100%; border-collapse:collapse; font-size:.75rem; }
    th, td { padding:.4rem .5rem; text-align:right; }
    th { position:sticky; top:0; background:var(--vsa-surface); cursor:pointer; font-weight:600; }
    tbody tr { border-top:1px solid var(--vsa-border); } 
    tbody tr:hover { background:#262b33; } 
    td.name { text-align:left; font-weight:500; } 
    .empty { padding:1rem; text-align:center; opacity:.7; }
    .vol-cell { font-size:.65rem; line-height:1.1; }
    .tcc { font-weight:600; }
  `),a(n,"properties",{steels:{type:Array},filter:{type:String},sortKey:{type:String},sortDir:{type:String},hardness:{type:Number},edgeAngle:{type:Number}});customElements.define("vsa-steel-table",n);

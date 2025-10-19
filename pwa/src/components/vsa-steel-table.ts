import { LitElement, html, css } from "lit";
import { edgeRetention } from "../utils/math";
import type { SteelEntry, SteelSelectedDetail } from "../types";

class VsaSteelTable extends LitElement {
  static styles = css`
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
  `;

  static properties = {
    steels: { type: Array },
    filter: { type: String },
    sortKey: { type: String },
    sortDir: { type: String },
    hardness: { type: Number },
    edgeAngle: { type: Number },
    selectedName: { type: String },
  };

  steels: SteelEntry[] = [];
  filter = "";
  sortKey = "name";
  sortDir = "asc";
  hardness = 60;
  edgeAngle = 30;
  selectedName = "";

  constructor() {
    super();
    this._load();
  }

  async _load() {
    try {
      const resp = await fetch("./data/steels.json");
      if (!resp.ok) throw new Error("Failed steels.json");
      const data: SteelEntry[] = await resp.json();
      this.steels = data;
    } catch (e) {
      console.error(e);
    }
  }

  _onFilter(e: Event) {
    this.filter = (e.target as HTMLInputElement).value.trim().toLowerCase();
  }
  _setHardness(e: Event) {
    this.hardness = Number((e.target as HTMLInputElement).value) || 60;
  }
  _setEdgeAngle(e: Event) {
    this.edgeAngle = Number((e.target as HTMLInputElement).value) || 30;
  }

  _toggleSort(key: string) {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
    } else {
      this.sortKey = key;
      this.sortDir = "asc";
    }
  }

  _filtered() {
    const f = this.filter;
    let items = this.steels.map((s) => {
      const { TCC, volume, stability } = edgeRetention({
        hardness: this.hardness,
        edgeAngle: this.edgeAngle,
        ...s,
      });
      return { ...s, TCC, volume, stability } as SteelEntry & {
        TCC: number;
        volume: number;
        stability: string;
      };
    });
    if (f) items = items.filter((s) => s.name.toLowerCase().includes(f));
    items.sort((a, b) => {
      const dir = this.sortDir === "asc" ? 1 : -1;
      if (this.sortKey === "name") return a.name.localeCompare(b.name) * dir;
      // @ts-ignore dynamic numeric key
      return ((a as any)[this.sortKey] - (b as any)[this.sortKey]) * dir;
    });
    return items;
  }

  _select(
    steel: SteelEntry & { TCC: number; volume: number; stability: string }
  ) {
    this.selectedName = steel.name;
    const detail: SteelSelectedDetail = {
      name: steel.name,
      hardness: this.hardness,
      edgeAngle: this.edgeAngle,
      carbides: {
        CrC: steel.CrC || 0,
        CrV: steel.CrV || 0,
        MC: steel.MC || 0,
        M6C: steel.M6C || 0,
        MN: steel.MN || 0,
        CrN: steel.CrN || 0,
        Fe3C: steel.Fe3C || 0,
      },
    };
    this.dispatchEvent(
      new CustomEvent("steel-selected", {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  _onRowKey(
    e: KeyboardEvent,
    steel: SteelEntry & { TCC: number; volume: number; stability: string }
  ) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._select(steel);
    }
  }

  private _headerCell(key: string, label: string) {
    const active = this.sortKey === key;
    const arrow = active ? (this.sortDir === "asc" ? "▲" : "▼") : "";
    const ariaSort = active
      ? this.sortDir === "asc"
        ? "ascending"
        : "descending"
      : "none";
    return html`<th
      @click=${() => this._toggleSort(key)}
      aria-sort="${ariaSort}"
      role="columnheader"
      tabindex="0"
      @keydown=${(e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this._toggleSort(key);
        }
      }}
    >
      ${label} ${arrow}
    </th>`;
  }

  render() {
    const rows = this._filtered();
    return html`
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
      ${rows.length
        ? html` <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${this._headerCell("name", "Steel")}
                  ${this._headerCell("CrC", "CrC")}
                  ${this._headerCell("CrV", "CrV")}
                  ${this._headerCell("MC", "MC")}
                  ${this._headerCell("M6C", "M6C")}
                  ${this._headerCell("MN", "MN")}
                  ${this._headerCell("CrN", "CrN")}
                  ${this._headerCell("Fe3C", "Fe3C")}
                  ${this._headerCell("volume", "Vol%")}
                  ${this._headerCell("TCC", "est.TCC")}
                </tr>
              </thead>
              <tbody>
                ${rows.map(
                  (s) => html` <tr
                    @click=${() => this._select(s)}
                    @keydown=${(e: KeyboardEvent) => this._onRowKey(e, s)}
                    tabindex="0"
                    role="button"
                    aria-label="Select steel ${s.name}"
                    aria-selected="${this.selectedName === s.name
                      ? "true"
                      : "false"}"
                  >
                    <td class="name">${s.name}</td>
                    <td>${s.CrC || 0}</td>
                    <td>${s.CrV || 0}</td>
                    <td>${s.MC || 0}</td>
                    <td>${s.M6C || 0}</td>
                    <td>${s.MN || 0}</td>
                    <td>${s.CrN || 0}</td>
                    <td>${s.Fe3C || 0}</td>
                    <td class="vol-cell">
                      ${(s.volume as number)?.toFixed
                        ? (s.volume as number).toFixed(1)
                        : (
                            (s.CrC || 0) +
                            (s.CrV || 0) +
                            (s.MC || 0) +
                            (s.M6C || 0) +
                            (s.MN || 0) +
                            (s.CrN || 0) +
                            (s.Fe3C || 0)
                          ).toFixed(1)}<br />${s.stability}
                    </td>
                    <td class="tcc">${s.TCC}</td>
                  </tr>`
                )}
              </tbody>
            </table>
          </div>`
        : html`<div class="empty">No steels found.</div>`}
    `;
  }
}

customElements.define("vsa-steel-table", VsaSteelTable);
export { VsaSteelTable };

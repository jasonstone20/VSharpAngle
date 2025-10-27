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
  `;

  static properties = {
    steels: { type: Array },
    filter: { type: Array },
    sortKey: { type: String },
    sortDir: { type: String },
    hardnessValues: { type: Array },
    edgeAngleValues: { type: Array },
    selectedName: { type: String },
  };

  steels: SteelEntry[] = [];
  filter: string[] = [];
  sortKey = "name";
  sortDir = "asc";
  hardnessValues = [60];
  edgeAngleValues = [30];
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
    const select = e.target as any; // sl-select
    this.filter = select.value || [];
  }
  _setHardnessValue(e: Event, index: number) {
    const input = e.target as HTMLInputElement;

    // Don't interfere with typing - let the user type freely
    // Only update our reactive property if there's a valid number
    if (input.value !== "") {
      const numValue = Number(input.value);
      if (!isNaN(numValue)) {
        const newValues = [...this.hardnessValues];
        newValues[index] = numValue;
        this.hardnessValues = newValues;
      }
    }
    // If empty, don't update anything - let user continue typing
  }
  _setEdgeAngleValue(e: Event, index: number) {
    const input = e.target as HTMLInputElement;

    // Don't interfere with typing - let the user type freely
    // Only update our reactive property if there's a valid number
    if (input.value !== "") {
      const numValue = Number(input.value);
      if (!isNaN(numValue)) {
        const newValues = [...this.edgeAngleValues];
        newValues[index] = numValue;
        this.edgeAngleValues = newValues;
      }
    }
    // If empty, don't update anything - let user continue typing
  }
  _validateHardnessValue(e: Event, index: number) {
    const input = e.target as HTMLInputElement;
    const value = Number(input.value);
    const newValues = [...this.hardnessValues];

    // On blur/change, ensure valid value or set default
    if (isNaN(value) || value <= 0) {
      newValues[index] = 60;
      input.value = "60";
    } else {
      newValues[index] = value;
    }
    this.hardnessValues = newValues;
  }
  _validateEdgeAngleValue(e: Event, index: number) {
    const input = e.target as HTMLInputElement;
    const value = Number(input.value);
    const newValues = [...this.edgeAngleValues];

    // On blur/change, ensure valid value or set default
    if (isNaN(value) || value <= 0) {
      newValues[index] = 30;
      input.value = "30";
    } else {
      newValues[index] = value;
    }
    this.edgeAngleValues = newValues;
  }
  _addHardnessInput() {
    if (this.hardnessValues.length < 3) {
      this.hardnessValues = [...this.hardnessValues, 60];
    }
  }
  _addAngleInput() {
    if (this.edgeAngleValues.length < 3) {
      this.edgeAngleValues = [...this.edgeAngleValues, 30];
    }
  }
  _removeHardnessInput(index: number) {
    if (this.hardnessValues.length > 1) {
      const newValues = [...this.hardnessValues];
      newValues.splice(index, 1);
      this.hardnessValues = newValues;
    }
  }
  _removeAngleInput(index: number) {
    if (this.edgeAngleValues.length > 1) {
      const newValues = [...this.edgeAngleValues];
      newValues.splice(index, 1);
      this.edgeAngleValues = newValues;
    }
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
    let combinations: (SteelEntry & {
      TCC: number;
      volume: number;
      hardness: number;
      edgeAngle: number;
      combinationId: string;
    })[] = [];

    // Filter out invalid values (0 or negative) for calculations
    const validHardness = this.hardnessValues.filter((h) => h > 0);
    const validAngles = this.edgeAngleValues.filter((a) => a > 0);

    // Use defaults if no valid values
    if (validHardness.length === 0) validHardness.push(60);
    if (validAngles.length === 0) validAngles.push(30);

    // Create all combinations of hardness × edge angle × steel
    for (const hardness of validHardness) {
      for (const edgeAngle of validAngles) {
        for (const steel of this.steels) {
          // If filter is set, only include steels that are selected
          if (f.length > 0 && !f.includes(steel.name)) continue;

          const { TCC, volume } = edgeRetention({
            hardness,
            edgeAngle,
            ...steel,
          });

          combinations.push({
            ...steel,
            TCC,
            volume,
            hardness,
            edgeAngle,
            combinationId: `${steel.name}-${hardness}-${edgeAngle}`,
          });
        }
      }
    }

    // Sort combinations
    combinations.sort((a, b) => {
      const dir = this.sortDir === "asc" ? 1 : -1;
      if (this.sortKey === "name") {
        // First by name, then by hardness, then by angle
        const nameCompare = a.name.localeCompare(b.name);
        if (nameCompare !== 0) return nameCompare * dir;
        const hardnessCompare = a.hardness - b.hardness;
        if (hardnessCompare !== 0) return hardnessCompare * dir;
        return (a.edgeAngle - b.edgeAngle) * dir;
      }
      // @ts-ignore dynamic numeric key
      return ((a as any)[this.sortKey] - (b as any)[this.sortKey]) * dir;
    });

    return combinations;
  }

  _select(
    steel: SteelEntry & {
      TCC: number;
      volume: number;
      hardness: number;
      edgeAngle: number;
    }
  ) {
    this.selectedName = steel.name;
    const detail: SteelSelectedDetail = {
      name: steel.name,
      hardness: steel.hardness,
      edgeAngle: steel.edgeAngle,
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
    steel: SteelEntry & {
      TCC: number;
      volume: number;
      hardness: number;
      edgeAngle: number;
    }
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
     

      <sl-details open>
        <div slot="summary">Steel Table Comparison</div>
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
            ${this.steels.map(
              (steel) => html`
                <sl-option value=${steel.name}>${steel.name}</sl-option>
              `
            )}
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
                    ${this.hardnessValues.map(
                      (value, index) => html`
                        <div class="input-row">
                          <sl-input
                            size="small"
                            type="number"
                            value=${String(value)}
                            @input=${(e: Event) =>
                              this._setHardnessValue(e, index)}
                            @blur=${(e: Event) =>
                              this._validateHardnessValue(e, index)}
                          ></sl-input>
                          ${this.hardnessValues.length > 1
                            ? html`
                                <sl-button
                                  size="small"
                                  variant="default"
                                  class="remove-button"
                                  @click=${() =>
                                    this._removeHardnessInput(index)}
                                >
                                  <sl-icon name="x"></sl-icon>
                                </sl-button>
                              `
                            : ""}
                        </div>
                      `
                    )}
                    ${
                      this.hardnessValues.length < 3
                        ? html`
                            <sl-button
                              size="small"
                              variant="default"
                              class="add-button"
                              @click=${this._addHardnessInput}
                            >
                              <sl-icon name="plus"></sl-icon>
                            </sl-button>
                          `
                        : ""
                    }
                  </div>
                </td>
              </tr>
              <tr>
                <td>Edge Angle (DPS)</td>
                <td>
                  <div class="multi-input">
                    ${this.edgeAngleValues.map(
                      (value, index) => html`
                        <div class="input-row">
                          <sl-input
                            size="small"
                            type="number"
                            value=${String(value)}
                            @input=${(e: Event) =>
                              this._setEdgeAngleValue(e, index)}
                            @blur=${(e: Event) =>
                              this._validateEdgeAngleValue(e, index)}
                          ></sl-input>
                          ${this.edgeAngleValues.length > 1
                            ? html`
                                <sl-button
                                  size="small"
                                  variant="default"
                                  class="remove-button"
                                  @click=${() => this._removeAngleInput(index)}
                                >
                                  <sl-icon name="x"></sl-icon>
                                </sl-button>
                              `
                            : ""}
                        </div>
                      `
                    )}
                    ${
                      this.edgeAngleValues.length < 3
                        ? html`
                            <sl-button
                              size="small"
                              variant="default"
                              class="add-button"
                              @click=${this._addAngleInput}
                            >
                              <sl-icon name="plus"></sl-icon>
                            </sl-button>
                          `
                        : ""
                    }
                  </div>
                </td>
              </tr>
            </table>
          </div>

          ${
            rows.length
              ? html` <div class="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        ${this._headerCell("name", "Steel")}
                        ${this._headerCell("hardness", "HRC")}
                        ${this._headerCell("edgeAngle", "Angle")}
                        ${this._headerCell("TCC", "est.TCC")}
                        ${this._headerCell("CrC", "CrC")}
                        ${this._headerCell("CrV", "CrV")}
                        ${this._headerCell("MC", "MC")}
                        ${this._headerCell("M6C", "M6C")}
                        ${this._headerCell("MN", "MN")}
                        ${this._headerCell("CrN", "CrN")}
                        ${this._headerCell("Fe3C", "Fe3C")}
                        ${this._headerCell("volume", "Vol%")}
                      </tr>
                    </thead>
                    <tbody>
                      ${rows.map(
                        (s) => html` <tr
                          @click=${() => this._select(s)}
                          @keydown=${(e: KeyboardEvent) => this._onRowKey(e, s)}
                          tabindex="0"
                          role="button"
                          aria-label="Select steel ${s.name} at ${s.hardness}HRC, ${s.edgeAngle}°"
                          aria-selected="${this.selectedName === s.name
                            ? "true"
                            : "false"}"
                        >
                          <td class="name">${s.name}</td>
                          <td>${s.hardness}</td>
                          <td>${s.edgeAngle}</td>
                          <td class="tcc">${s.TCC.toFixed(0)}</td>
                          <td>${(s.CrC || 0).toFixed(1)}</td>
                          <td>${(s.CrV || 0).toFixed(1)}</td>
                          <td>${(s.MC || 0).toFixed(1)}</td>
                          <td>${(s.M6C || 0).toFixed(1)}</td>
                          <td>${(s.MN || 0).toFixed(1)}</td>
                          <td>${(s.CrN || 0).toFixed(1)}</td>
                          <td>${(s.Fe3C || 0).toFixed(1)}</td>
                          <td class="vol-cell">
                            ${(
                              (s.CrC || 0) +
                              (s.CrV || 0) +
                              (s.MC || 0) +
                              (s.M6C || 0) +
                              (s.MN || 0) +
                              (s.CrN || 0) +
                              (s.Fe3C || 0)
                            ).toFixed(1)}
                          </td>
                        </tr>`
                      )}
                    </tbody>
                  </table>
                </div>`
              : html`<div class="empty">No steels found.</div>`
          }
        </div>
      </sl-details>
    `;
  }
}

customElements.define("vsa-steel-table", VsaSteelTable);
export { VsaSteelTable };

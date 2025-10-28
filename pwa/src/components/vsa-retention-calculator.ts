import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { edgeRetention } from "../utils/math";

interface ComparisonSteel {
  id: string;
  steelId: string;
  hardness: number;
  edgeAngle: number;
}

export class VsaRetentionCalculator extends LitElement {
  static styles = css`
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
      background: white;
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
  `;

  @property({ type: Number }) hardness: number | null = null;
  @property({ type: Number }) edgeAngle: number | null = null;
  @property({ type: Object }) carbides: Record<string, number> = {
    CrC: 0,
    CrCV: 0,
    MC: 0,
    M6C: 0,
    MN: 0,
    CrN: 0,
    Fe3C: 0,
  };
  @property({ type: Boolean, state: true }) private _shouldFocus = false;

  // Comparison properties
  @property({ attribute: false }) availableSteels: any[] = [];
  @property({ attribute: false }) comparisonSteels: ComparisonSteel[] = [];

  private _onHardnessChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.hardness = input.value ? Number(input.value) : null;
    this._shouldFocus = false; // Don't auto-focus when user is actively typing
  }

  private _onEdgeAngleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.edgeAngle = input.value ? Number(input.value) : null;
    this._shouldFocus = false; // Don't auto-focus when user is actively typing
  }

  private _onCarbideChange(e: Event, key: string) {
    const input = e.target as HTMLInputElement;
    this.carbides = {
      ...this.carbides,
      [key]: input.value ? Number(input.value) : 0,
    };
    this._shouldFocus = false; // Don't auto-focus when user is actively typing
  }

  // Comparison methods
  private _addComparisonSteel() {
    const newId = Date.now().toString();
    this.comparisonSteels = [
      ...this.comparisonSteels,
      {
        id: newId,
        steelId: this.availableSteels[0]?.id || "",
        hardness: 60,
        edgeAngle: 20,
      },
    ];
  }

  private _removeComparisonSteel(id: string) {
    this.comparisonSteels = this.comparisonSteels.filter((s) => s.id !== id);
  }

  private _updateComparisonSteel(
    id: string,
    field: string,
    value: string | number
  ) {
    this.comparisonSteels = this.comparisonSteels.map((steel) =>
      steel.id === id ? { ...steel, [field]: value } : steel
    );
  }

  private _getComparisonSteelTCC(compSteel: ComparisonSteel) {
    const steel = this.availableSteels.find((s) => s.id === compSteel.steelId);
    if (!steel) return 0;

    const edge = edgeRetention({
      id: steel.id,
      name: steel.name,
      hardness: compSteel.hardness,
      edgeAngle: compSteel.edgeAngle,
      CrC: steel.CrC || 0,
      CrV: steel.CrV || 0,
      MC: steel.MC || 0,
      M6C: steel.M6C || 0,
      MN: steel.MN || 0,
      CrN: steel.CrN || 0,
      Fe3C: steel.Fe3C || 0,
    });
    return edge.TCC;
  }

  render() {
    const edge = edgeRetention({
      id: "custom",
      name: "Custom Steel",
      hardness: this.hardness ?? undefined,
      edgeAngle: this.edgeAngle ?? undefined,
      CrC: this.carbides.CrC ?? 0,
      CrV: this.carbides.CrCV ?? 0, // Note: mapping CrCV to CrV
      MC: this.carbides.MC ?? 0,
      M6C: this.carbides.M6C ?? 0,
      MN: this.carbides.MN ?? 0,
      CrN: this.carbides.CrN ?? 0,
      Fe3C: this.carbides.Fe3C ?? 0,
    });
    const hardValid =
      this.hardness != null && this.hardness >= 50 && this.hardness <= 70;
    const angleValid =
      this.edgeAngle != null && this.edgeAngle >= 10 && this.edgeAngle <= 35;

    const invalids: string[] = [];
    if (!hardValid) {
      if (this.hardness == null) invalids.push("Hardness (HRC) is required.");
      else invalids.push("Hardness must be 50-70 HRC.");
    }
    if (!angleValid) {
      if (this.edgeAngle == null)
        invalids.push("Edge angle (DPS) is required.");
      else invalids.push("Edge angle must be 10-35 degrees per side.");
    }

    if (invalids.length) {
      // Only focus on initial load or when specifically requested, not during active input
      if (this._shouldFocus) {
        queueMicrotask(() => {
          const selector = !hardValid
            ? 'sl-input[label="Hardness"]'
            : 'sl-input[label="Edge Angle"]';
          const el = this.renderRoot?.querySelector(
            selector
          ) as HTMLElement | null;
          el?.focus();
          this._shouldFocus = false;
        });
      }
    }

    const carbideFields = [
      { k: "CrC", t: "Chromium carbides (CrC) – moderate wear contribution." },
      {
        k: "CrCV",
        t: "Chromium/Vanadium mixed carbides – added abrasion resistance.",
      },
      {
        k: "MC",
        t: "MC (V/Nb) carbides – very high hardness, strong wear resistance.",
      },
      {
        k: "M6C",
        t: "Complex M6C carbides – balanced secondary contribution.",
      },
      { k: "MN", t: "Manganese phases – minor influence overall." },
      { k: "CrN", t: "Chromium nitride – stability & wear support." },
      {
        k: "Fe3C",
        t: "Iron carbide (cementite) – baseline matrix wear component.",
      },
    ];

    return html`
      <section class="calc">
        <h2>
          Edge Retention Estimator
          <sl-tooltip
            content="Approximate CATRA TCC and volume from hardness, edge angle, and carbides."
          >
            <sl-icon
              name="info-circle"
              style="font-size: 0.75rem; opacity: 0.7;"
              aria-hidden="true"
              library="default"
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
                  label="Hardness"
                  type="number"
                  step="0.5"
                  min="50"
                  max="70"
                  .value=${this.hardness?.toString() || ""}
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
                  .value=${this.edgeAngle?.toString() || ""}
                  @sl-input=${this._onEdgeAngleChange}
                  size="small"
                  help-text="DPS"
                ></sl-input>
              </td>
            </tr>
            ${carbideFields.map(
              ({ k, t }) => html`<tr>
                <td>
                  <div class="label-with-tooltip">
                    <span>${k}</span>
                    <sl-tooltip content="${t}">
                      <sl-icon
                        name="info-circle"
                        style="font-size: 0.75rem; opacity: 0.7;"
                      ></sl-icon>
                    </sl-tooltip>
                  </div>
                </td>
                <td>
                  <sl-input
                    label="${k}"
                    type="number"
                    step="0.1"
                    min="0"
                    .value=${this.carbides[k]?.toString() || "0"}
                    @sl-input=${(e: Event) => this._onCarbideChange(e, k)}
                    size="small"
                    help-text="Volume %"
                  ></sl-input>
                </td>
              </tr>`
            )}
          </table>
        </div>
        <div aria-live="polite">
          ${invalids.length === 0
            ? html`<div class="result-block" role="status">
                <span>TCC / Volume</span>
                <span class="result-value"
                  >${edge.TCC} / ${edge.volume.toFixed(1)}</span
                >
              </div>`
            : html`<div class="error" role="alert">
                ${invalids.map((m) => html`<div>${m}</div>`)}
              </div>`}
        </div>
        ${invalids.length === 0
          ? html`
              <div class="output-row">
                <sl-progress-bar
                  .value=${Math.min(edge.volume, 30)}
                  max="30"
                  label="Carbide Volume"
                ></sl-progress-bar>
              </div>
            `
          : ""}
      </section>

      <!-- Compare Existing Steels Section -->
      <section class="comparison-section">
        <div class="comparison-header">
          <h3>Compare Existing Steels</h3>
          <sl-button
            variant="primary"
            size="small"
            @click=${this._addComparisonSteel}
            ?disabled=${this.availableSteels.length === 0}
          >
            <sl-icon slot="prefix" name="plus"></sl-icon>
            Add Steel
          </sl-button>
        </div>

        ${this.comparisonSteels.length > 0
          ? html`
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
                  ${this.comparisonSteels.map(
                    (steel) => html`
                      <tr>
                        <td>
                          <sl-select
                            .value=${steel.steelId}
                            @sl-change=${(e: CustomEvent) =>
                              this._updateComparisonSteel(
                                steel.id,
                                "steelId",
                                (e.target as any).value
                              )}
                            size="small"
                          >
                            ${this.availableSteels.map(
                              (s) => html`
                                <sl-option value=${s.id}>${s.name}</sl-option>
                              `
                            )}
                          </sl-select>
                        </td>
                        <td>
                          <sl-input
                            type="number"
                            .value=${String(steel.hardness)}
                            @input=${(e: Event) =>
                              this._updateComparisonSteel(
                                steel.id,
                                "hardness",
                                Number((e.target as HTMLInputElement).value)
                              )}
                            size="small"
                            min="40"
                            max="70"
                          ></sl-input>
                        </td>
                        <td>
                          <sl-input
                            type="number"
                            .value=${String(steel.edgeAngle)}
                            @input=${(e: Event) =>
                              this._updateComparisonSteel(
                                steel.id,
                                "edgeAngle",
                                Number((e.target as HTMLInputElement).value)
                              )}
                            size="small"
                            min="5"
                            max="50"
                          ></sl-input>
                        </td>
                        <td class="tcc-cell">
                          ${this._getComparisonSteelTCC(steel)}
                        </td>
                        <td class="delete-cell">
                          <sl-icon-button
                            name="trash"
                            @click=${() =>
                              this._removeComparisonSteel(steel.id)}
                            label="Remove steel"
                          ></sl-icon-button>
                        </td>
                      </tr>
                    `
                  )}
                </tbody>
              </table>
            `
          : html`
              <div class="empty-comparison">
                No steels added. Click "Add Steel" to start comparing.
              </div>
            `}
      </section>
    `;
  }
}

customElements.define("vsa-retention-calculator", VsaRetentionCalculator);

import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { passCount } from "../utils/math";

export class VsaPassCalculator extends LitElement {
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
  `;

  @property({ type: Number }) passes: number | null = null;
  @property({ type: Boolean, state: true }) private _shouldFocus = false;

  private _onPassesChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.passes = input.value ? Number(input.value) : null;
    this._shouldFocus = false; // Don't auto-focus when user is actively typing
  }

  render() {
    const passInfo = passCount(this.passes ?? undefined);
    const valid = passInfo.total > 0;
    let invalid: string | null = null;

    if (!valid) {
      if (this.passes == null) invalid = "Number of passes is required.";
      else if ((this.passes as number) < 1) invalid = "Pass count must be ≥ 1.";
      else invalid = "Invalid pass input.";

      // Only focus on initial load or when specifically requested, not during active input
      if (this._shouldFocus) {
        queueMicrotask(() => {
          const el = this.renderRoot?.querySelector(
            'sl-input[label="Passes"]'
          ) as HTMLElement | null;
          el?.focus();
          this._shouldFocus = false;
        });
      }
    }

    return html`
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
            .value=${this.passes?.toString() || ""}
            @sl-input=${this._onPassesChange}
            help-text="Starting pass count (e.g., 19, 29)"
            clearable
          ></sl-input>
        </div>
        <div aria-live="polite">
          ${valid
            ? html`<div class="result-block" role="status">
                <span>Total / X-Strokes</span>
                <span class="result-value"
                  >${Math.round(passInfo.total)} /
                  ${Math.round(passInfo.xStrokes || 0)}</span
                >
              </div>`
            : html`<div class="error" role="alert">${invalid}</div>`}
        </div>
        ${valid
          ? html`
              <div class="sequence-container">
                <span
                  style="font-size: 0.85rem; color: var(--sl-color-neutral-600); font-weight: 500; margin-bottom: 0.5rem; display: block;"
                  >Sequence</span
                >
                ${passInfo.sequence.map(
                  (n) => html`<span class="badge-seq">${n}</span>`
                )}
              </div>
            `
          : ""}
      </section>
    `;
  }
}

customElements.define("vsa-pass-calculator", VsaPassCalculator);

import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { measureAngle } from "../utils/math";

export class VsaAngleCalculator extends LitElement {
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
  `;

  @property({ type: Number }) width: number | null = null;
  @property({ type: Number }) height: number | null = null;
  @property({ type: Boolean, state: true }) private _shouldFocus = false;

  private _onWidth(e: Event) {
    const input = e.target as HTMLInputElement;
    this.width = input.value ? Number(input.value) : null;
    this._shouldFocus = false; // Don't auto-focus when user is actively typing
  }

  private _onHeight(e: Event) {
    const input = e.target as HTMLInputElement;
    this.height = input.value ? Number(input.value) : null;
    this._shouldFocus = false; // Don't auto-focus when user is actively typing
  }

  render() {
    const angle = measureAngle(
      this.width ?? undefined,
      this.height ?? undefined
    );
    let invalid: string | null = null;

    if (angle == null) {
      if (this.width == null || this.height == null)
        invalid = "Width and height are required.";
      else if (this.height === 0) invalid = "Height must be greater than 0.";
      else invalid = "width/2 must be ≤ height (arcsin domain).";

      // Only focus on initial load or when specifically requested, not during active input
      if (this._shouldFocus) {
        queueMicrotask(() => {
          const el = this.renderRoot?.querySelector(
            this.width == null
              ? 'sl-input[label="Width"]'
              : 'sl-input[label="Height"]'
          ) as HTMLElement | null;
          el?.focus();
          this._shouldFocus = false;
        });
      }
    }

    return html`
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
            .value=${this.width?.toString() || ""}
            @sl-input=${this._onWidth}
            help-text="Total bevel width measured across the edge"
            clearable
          ></sl-input>
          <sl-input
            label="Height (mm)"
            type="number"
            step="0.1"
            .value=${this.height?.toString() || ""}
            @sl-input=${this._onHeight}
            help-text="Distance behind the edge where width was measured"
            clearable
          ></sl-input>
        </div>
        <div class="output-row">
          <div class="result-block">
            ${invalid
              ? html`<div class="error">${invalid}</div>`
              : html`<div class="result">${angle?.toFixed(2)}° per side</div>`}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("vsa-angle-calculator", VsaAngleCalculator);

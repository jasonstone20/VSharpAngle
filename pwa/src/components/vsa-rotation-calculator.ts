import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { sharpmakerRotation } from "../utils/math";

export class VsaRotationCalculator extends LitElement {
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

  @property({ type: Number }) rotationAngle: number | null = null;
  @property({ type: Number }) rotationSharpener: number | null = null;
  @property({ type: Boolean, state: true }) private _shouldFocus = false;

  private _onRotationAngle(e: Event) {
    const input = e.target as HTMLInputElement;
    this.rotationAngle = input.value ? Number(input.value) : null;
    this._shouldFocus = false; // Don't auto-focus when user is actively typing
  }

  private _onRotationSharpener(e: Event) {
    const select = e.target as any;
    this.rotationSharpener = select.value ? Number(select.value) : null;
    this._shouldFocus = false; // Don't auto-focus when user is actively selecting
  }

  render() {
    const rotation = sharpmakerRotation(
      this.rotationAngle ?? undefined,
      this.rotationSharpener ?? undefined
    );
    let invalid: string | null = null;

    if (rotation == null) {
      if (this.rotationAngle == null || this.rotationSharpener == null)
        invalid = "Provide both target and setting angles.";
      else invalid = "csc(setting) * sin(angle) must be between -1 and 1.";

      // Only focus on initial load or when specifically requested, not during active input
      if (this._shouldFocus) {
        queueMicrotask(() => {
          const el = this.renderRoot?.querySelector(
            this.rotationAngle == null
              ? 'sl-input[label="Angle (DPS)"]'
              : 'sl-select[label="Setting"]'
          ) as HTMLElement | null;
          el?.focus();
          this._shouldFocus = false;
        });
      }
    }

    return html`
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
            .value=${this.rotationAngle?.toString() || ""}
            @sl-input=${this._onRotationAngle}
            help-text="Target degrees per side"
            clearable
          ></sl-input>
          <sl-select
            label="Setting"
            placeholder="Choose base angle"
            .value=${this.rotationSharpener?.toString() || ""}
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
            ${invalid
              ? html`<div class="error">${invalid}</div>`
              : html`<div class="result">
                  Rotate base ${rotation?.toFixed(1)}°
                </div>`}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("vsa-rotation-calculator", VsaRotationCalculator);

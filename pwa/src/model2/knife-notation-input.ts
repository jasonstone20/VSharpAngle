import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  KnifeCrossSectionParser,
  type ToolGeometry,
  type CrossSectionModel,
} from "./advanced-model.js";

/**
 * Knife Notation Input Component
 *
 * A thin, one-line UI component for entering and validating knife cross-section notation.
 * Provides real-time validation, suggestions, and quick model preview.
 */
@customElement("knife-notation-input")
export class KnifeNotationInput extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
      --primary-color: #2563eb;
      --success-color: #059669;
      --error-color: #dc2626;
      --warning-color: #d97706;
      --bg-color: #f8fafc;
      --border-color: #e2e8f0;
      --text-color: #1e293b;
    }

    .notation-container {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--bg-color);
      border: 2px solid var(--border-color);
      border-radius: 8px;
      transition: all 0.2s ease;
      min-height: 40px;
    }

    .unit-selector {
      background: white;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 4px 8px;
      font: inherit;
      font-size: 12px;
      color: var(--text-color);
      cursor: pointer;
      min-width: 50px;
    }

    .unit-selector:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .notation-container:focus-within {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .notation-container.valid {
      border-color: var(--success-color);
    }

    .notation-container.error {
      border-color: var(--error-color);
    }

    .input-field {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font: inherit;
      color: var(--text-color);
      font-size: 14px;
      min-width: 200px;
    }

    .input-field::placeholder {
      color: #94a3b8;
      font-style: italic;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
    }

    .status-indicator.valid {
      color: var(--success-color);
    }

    .status-indicator.error {
      color: var(--error-color);
    }

    .status-indicator.parsing {
      color: var(--warning-color);
    }

    .model-preview {
      font-size: 11px;
      color: #64748b;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .preview-stat {
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .quick-buttons {
      display: flex;
      gap: 4px;
    }

    .quick-btn {
      padding: 4px 8px;
      border: 1px solid var(--border-color);
      background: white;
      border-radius: 4px;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.15s ease;
      color: var(--text-color);
    }

    .quick-btn:hover {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }

    .syntax-hint {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      padding: 8px;
      font-size: 11px;
      color: #64748b;
      z-index: 10;
      margin-top: 2px;
      display: none;
    }

    .notation-container:focus-within .syntax-hint {
      display: block;
    }

    .hint-example {
      font-family: inherit;
      color: var(--primary-color);
      background: #f1f5f9;
      padding: 2px 4px;
      border-radius: 2px;
      margin: 2px 0;
      display: block;
    }

    @media (max-width: 640px) {
      .model-preview {
        display: none;
      }

      .quick-buttons {
        display: none;
      }
    }
  `;

  @property({ type: String })
  notation = "";

  @property({ type: String })
  unit = "in";

  @property({ type: String })
  placeholder = "15dps-0.003w,10dps-0.015w,6dps-0.2w";

  @property({ type: Boolean })
  showPreview = true;

  @property({ type: Boolean })
  showQuickButtons = true;

  @state()
  private validationState: "valid" | "error" | "parsing" | "empty" = "empty";

  @state()
  private errorMessage = "";

  @state()
  private model: CrossSectionModel | null = null;

  private parser = new KnifeCrossSectionParser();
  private debounceTimer: number | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.validateNotation();
  }

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.notation = input.value;

    // Debounce validation for performance
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = window.setTimeout(() => {
      this.validateNotation();
    }, 300);

    // Dispatch input event for parent components
    this.dispatchEvent(
      new CustomEvent("notation-change", {
        detail: {
          notation: this.notation,
          isValid: this.validationState === "valid",
        },
        bubbles: true,
      })
    );
  }

  private validateNotation() {
    if (!this.notation.trim()) {
      this.validationState = "empty";
      this.errorMessage = "";
      this.model = null;
      return;
    }

    this.validationState = "parsing";

    try {
      const geometry = this.parser.parse(this.notation, this.unit);
      this.model = this.parser.toCrossSectionModel(geometry);
      this.validationState = "valid";
      this.errorMessage = "";

      // Dispatch parsed model for parent components
      this.dispatchEvent(
        new CustomEvent("model-parsed", {
          detail: { model: this.model, geometry },
          bubbles: true,
        })
      );
    } catch (error) {
      this.validationState = "error";
      this.errorMessage =
        error instanceof Error ? error.message : "Invalid notation";
      this.model = null;
    }
  }

  private insertQuickNotation(notation: string) {
    this.notation = notation;
    this.validateNotation();

    // Focus the input after insertion
    const input = this.shadowRoot?.querySelector(
      ".input-field"
    ) as HTMLInputElement;
    input?.focus();
  }

  private handleUnitChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.unit = select.value;
    this.validateNotation();

    // Dispatch unit change event
    this.dispatchEvent(
      new CustomEvent("unit-change", {
        detail: { unit: this.unit },
        bubbles: true,
      })
    );
  }

  private getStatusText(): string {
    switch (this.validationState) {
      case "valid":
        return this.model
          ? `✓ ${this.model.shapes.length} segments`
          : "✓ Valid";
      case "error":
        return `✗ ${this.errorMessage}`;
      case "parsing":
        return "⟳ Parsing...";
      case "empty":
        return "Enter notation";
      default:
        return "";
    }
  }

  render() {
    const containerClass = `notation-container ${this.validationState}`;

    return html`
      <div class="${containerClass}" style="position: relative;">
        <select
          class="unit-selector"
          .value="${this.unit}"
          @change="${this.handleUnitChange}"
          title="Select measurement unit"
        >
          <option value="in">in</option>
          <option value="mm">mm</option>
        </select>

        <input
          class="input-field"
          type="text"
          .value="${this.notation}"
          placeholder="${this.placeholder}"
          @input="${this.handleInput}"
          @keydown="${this.handleKeyDown}"
          spellcheck="false"
        />

        <div class="status-indicator ${this.validationState}">
          ${this.getStatusText()}
        </div>

        ${this.showPreview && this.model
          ? html`
              <div class="model-preview">
                <span class="preview-stat"
                  >📏 ${this.model.totalLength.toFixed(3)}${this.unit === "mm" ? "mm" : '"'}</span
                >
                <span class="preview-stat"
                  >📐 ${this.model.height.toFixed(3)}${this.unit === "mm" ? "mm" : '"'}</span
                >
                <span class="preview-stat"
                  >${this.model.unit.toUpperCase()}</span
                >
              </div>
            `
          : ""}
        ${this.showQuickButtons
          ? html`
              <div class="quick-buttons">
                <button
                  class="quick-btn"
                  @click="${() =>
                    this.insertQuickNotation("15dps-0.003w,10dps-0.015w,6dps-0.2w")}"
                  title="Standard taper"
                >
                  Standard
                </button>
                <button
                  class="quick-btn"
                  @click="${() =>
                    this.insertQuickNotation(
                      "20dps-0.001w,0.08la->0.03w,1la-0.125w"
                    )}"
                  title="Fine edge with transition"
                >
                  Fine
                </button>
                <button
                  class="quick-btn"
                  @click="${() =>
                    this.insertQuickNotation(
                      "5dps-0.01w,5dps-0.05w,3dps-0.25w"
                    )}"
                  title="Heavy duty profile"
                >
                  Heavy
                </button>
              </div>
            `
          : ""}

        <div class="syntax-hint">
          <div><strong>Notation Syntax:</strong></div>
          <code class="hint-example">segment1,segment2,segment3</code>
          <div>
            <strong>Segments:</strong> 15dps-0.003w (degrees-width) | 0.08la->0.03w
            (length-transition)
          </div>
          <div><strong>Units:</strong> Select from dropdown (in=inches | mm=millimeters)</div>
        </div>
      </div>
    `;
  }

  private handleKeyDown(e: KeyboardEvent) {
    // Enter key to validate/submit
    if (e.key === "Enter" && this.validationState === "valid") {
      this.dispatchEvent(
        new CustomEvent("notation-submit", {
          detail: { notation: this.notation, model: this.model },
          bubbles: true,
        })
      );
    }

    // Escape to clear
    if (e.key === "Escape") {
      this.notation = "";
      this.validateNotation();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "knife-notation-input": KnifeNotationInput;
  }
}

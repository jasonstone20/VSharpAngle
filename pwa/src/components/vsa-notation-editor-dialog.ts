import { LitElement, html, css } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import { notationStorage, type SavedNotation } from "../utils/notation-storage.js";

interface NotationSegment {
  id: string;
  type: string;
  values: Record<string, number | string>;
  notation: string;
}

interface SegmentTypeConfig {
  name: string;
  description: string;
  measurementGuide: string;
  values: Array<{
    key: string;
    label: string;
    suffix?: string;
    type: "number" | "select";
    options?: string[];
  }>;
}

@customElement("vsa-notation-editor-dialog")
export class VsaNotationEditorDialog extends LitElement {
  static styles = css`
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
  `;

  @property({ type: Boolean }) open = false;
  @property({ type: String }) side: "A" | "B" = "A";
  @property({ type: String }) units: "mm" | "in" = "mm";
  @property({ type: Array }) segments: NotationSegment[] = [];

  @state() private _workingUnits: "mm" | "in" = "mm";
  @state() private _workingSegments: NotationSegment[] = [];
  @state() private _editingSegmentId: string | null = null;
  @state() private _newSegmentType: string = "";
  @state() private _newSegmentValues: Record<string, number | string> = {};

  connectedCallback() {
    super.connectedCallback();
    this._initializeWorkingData();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("open") && this.open) {
      this._initializeWorkingData();
    }
    if (changedProperties.has("units") && this.open) {
      this._workingUnits = this.units;
    }
  }

  private _initializeWorkingData() {
    this._workingUnits = this.units;
    this._workingSegments = [...this.segments];
    this._editingSegmentId = null;
    this._newSegmentType = "";
    this._newSegmentValues = {};

    // If segments have values that don't match current units, we may need to detect original units
    // The geometry builder should handle this by parsing the original notation with correct units
  }

  private _convertValue(
    value: number,
    fromUnit: "mm" | "in",
    toUnit: "mm" | "in"
  ): number {
    if (fromUnit === toUnit) return value;

    if (fromUnit === "mm" && toUnit === "in") {
      // mm to inches - use 6 decimal places (4 + 2 extra)
      return Math.round((value / 25.4) * 1000000) / 1000000;
    } else {
      // inches to mm - use 4 decimal places (2 + 2 extra)
      return Math.round(value * 25.4 * 10000) / 10000;
    }
  }

  private _isAngleValue(valueConfig: any): boolean {
    // Check if this value represents an angle (should not be converted between units)
    return (
      valueConfig.key === "angle" ||
      valueConfig.suffix === "°" ||
      valueConfig.key.includes("angle") ||
      valueConfig.label?.toLowerCase().includes("angle")
    );
  }

  private _onUnitsChange(e: CustomEvent) {
    // Try multiple ways to get the value from the radio group
    const target = e.target as any;
    const newUnits = (e.detail?.value ||
      target?.value ||
      target?.getAttribute?.("value")) as "mm" | "in";
    const oldUnits = this._workingUnits;

    if (!newUnits || newUnits === oldUnits) return;

    console.log("Units changing from", oldUnits, "to", newUnits); // Debug log

    // Convert all segment values to new units
    this._workingSegments = this._workingSegments.map((segment) => {
      const newValues = { ...segment.values };
      const config = this._getSegmentTypeConfig(segment.type);

      if (config) {
        config.values.forEach((valueConfig) => {
          if (
            valueConfig.type === "number" &&
            typeof newValues[valueConfig.key] === "number" &&
            !this._isAngleValue(valueConfig)
          ) {
            newValues[valueConfig.key] = this._convertValue(
              newValues[valueConfig.key] as number,
              oldUnits,
              newUnits
            );
          }
        });
      }

      return {
        ...segment,
        values: newValues,
        notation: this._buildNotationFromValues(
          segment.type,
          newValues,
          newUnits
        ),
      };
    });

    // Convert current editing values
    if (this._newSegmentType) {
      const config = this._getSegmentTypeConfig(this._newSegmentType);
      if (config) {
        config.values.forEach((valueConfig) => {
          if (
            valueConfig.type === "number" &&
            typeof this._newSegmentValues[valueConfig.key] === "number" &&
            !this._isAngleValue(valueConfig)
          ) {
            this._newSegmentValues[valueConfig.key] = this._convertValue(
              this._newSegmentValues[valueConfig.key] as number,
              oldUnits,
              newUnits
            );
          }
        });
      }
    }

    this._workingUnits = newUnits;
  }

  private _handleUnitsChange(newUnits: "mm" | "in") {
    const oldUnits = this._workingUnits;

    if (!newUnits || newUnits === oldUnits) return;

    console.log("Units changing from", oldUnits, "to", newUnits); // Debug log

    // Convert all segment values to new units
    this._workingSegments = this._workingSegments.map((segment) => {
      const newValues = { ...segment.values };
      const config = this._getSegmentTypeConfig(segment.type);

      if (config) {
        config.values.forEach((valueConfig) => {
          if (
            valueConfig.type === "number" &&
            typeof newValues[valueConfig.key] === "number" &&
            !this._isAngleValue(valueConfig)
          ) {
            newValues[valueConfig.key] = this._convertValue(
              newValues[valueConfig.key] as number,
              oldUnits,
              newUnits
            );
          }
        });
      }

      return {
        ...segment,
        values: newValues,
        notation: this._buildNotationFromValues(
          segment.type,
          newValues,
          newUnits
        ),
      };
    });

    // Convert current editing values
    if (this._newSegmentType) {
      const config = this._getSegmentTypeConfig(this._newSegmentType);
      if (config) {
        config.values.forEach((valueConfig) => {
          if (
            valueConfig.type === "number" &&
            typeof this._newSegmentValues[valueConfig.key] === "number" &&
            !this._isAngleValue(valueConfig)
          ) {
            this._newSegmentValues[valueConfig.key] = this._convertValue(
              this._newSegmentValues[valueConfig.key] as number,
              oldUnits,
              newUnits
            );
          }
        });
      }
    }

    this._workingUnits = newUnits;
  }

  private _getSegmentTypeConfig(type: string): SegmentTypeConfig | null {
    const configs: Record<string, SegmentTypeConfig> = {
      "angle-travel": {
        name: "Angle + Travel",
        description:
          "Create geometry by specifying an angle and either a target height or width.",
        measurementGuide:
          "Use a protractor or angle gauge to measure the bevel angle. Measure height with calipers vertically from apex, or width with calipers across the blade thickness.",
        values: [
          {
            key: "angleMode",
            label: "Angle Mode",
            type: "select",
            options: ["dps", "inclusive"],
          },
          {
            key: "angle",
            label: "Angle",
            suffix: "°",
            type: "number",
          },
          {
            key: "travelMode",
            label: "Travel Mode",
            type: "select",
            options: ["height", "width"],
          },
          {
            key: "travel",
            label: "Target Value",
            suffix: this._workingUnits,
            type: "number",
          },
        ],
      },
      "thickness-height": {
        name: "Thickness @ Height",
        description:
          "Specify exact thickness at a specific height. The angle is calculated automatically.",
        measurementGuide:
          "Use precision calipers to measure blade thickness at the exact height position. Take photos with a scale for reference.",
        values: [
          {
            key: "thickness",
            label: "Thickness",
            suffix: this._workingUnits,
            type: "number",
          },
          {
            key: "height",
            label: "Height",
            suffix: this._workingUnits,
            type: "number",
          },
        ],
      },
      caliper: {
        name: "Face Caliper",
        description:
          "Measure along the bevel face from the previous point to achieve target thickness.",
        measurementGuide:
          "Use calipers to measure the slant distance along the bevel face. This is useful for incremental measurements during grinding.",
        values: [
          {
            key: "thickness",
            label: "Target Thickness",
            suffix: this._workingUnits,
            type: "number",
          },
          {
            key: "distance",
            label: "Slant Distance",
            suffix: this._workingUnits,
            type: "number",
          },
        ],
      },
      "apex-caliper": {
        name: "Apex Caliper",
        description:
          "Measure total distance from apex to outer edge at target thickness.",
        measurementGuide:
          "Use calipers to measure from the very apex (tip) to the outer edge of the blade at the specified thickness. This is a global constraint measurement.",
        values: [
          {
            key: "thickness",
            label: "Target Thickness",
            suffix: this._workingUnits,
            type: "number",
          },
          {
            key: "distance",
            label: "Apex Distance",
            suffix: this._workingUnits,
            type: "number",
          },
        ],
      },
    };
    return configs[type] || null;
  }

  private roundAndTrimTrailingZeros(value: number | string): string {
    if (typeof value === "string") return value;

    // Round to 6 decimal places to handle floating point precision issues
    const rounded = Math.round(value * 1000000) / 1000000;

    // Convert to string and remove trailing zeros
    return rounded.toString().replace(/\.?0+$/, "");
  }

  private _buildNotationFromValues(
    type: string,
    values: Record<string, number | string>,
    units: string
  ): string {
    let notation = "";

    // Helper function to format numbers appropriately
    const formatValue = (value: number | string): string => {
      return this.roundAndTrimTrailingZeros(value);
    };

    switch (type) {
      case "angle-travel":
        const angle = formatValue(values.angle);
        const mode = values.angleMode === "inclusive" ? "inc" : "dps";
        const travel = formatValue(values.travel);
        const travelAxis = values.travelMode === "height" ? "h" : "w";
        notation = `${angle}${mode}-${travel}${travelAxis}`;
        break;

      case "thickness-height":
        notation = `${formatValue(values.thickness)}w@${formatValue(
          values.height
        )}h`;
        break;

      case "caliper":
        notation = `${formatValue(values.thickness)}w@${formatValue(
          values.distance
        )}cp`;
        break;

      case "apex-caliper":
        notation = `${formatValue(values.thickness)}w@${formatValue(
          values.distance
        )}acp`;
        break;

      default:
        return "";
    }

    return notation;
  }
  private _startAddingSegment(type: string) {
    this._newSegmentType = type;
    this._newSegmentValues = {};
    this._editingSegmentId = null;

    // Initialize default values
    const config = this._getSegmentTypeConfig(type);
    if (config) {
      config.values.forEach((valueConfig) => {
        if (valueConfig.type === "select" && valueConfig.options?.length) {
          this._newSegmentValues[valueConfig.key] = valueConfig.options[0];
        } else if (valueConfig.type === "number") {
          this._newSegmentValues[valueConfig.key] = 0;
        }
      });
    }
  }

  private _editSegment(segment: NotationSegment) {
    this._editingSegmentId = segment.id;
    this._newSegmentType = segment.type;
    this._newSegmentValues = { ...segment.values };
  }

  private _deleteSegment(segmentId: string) {
    this._workingSegments = this._workingSegments.filter(
      (s) => s.id !== segmentId
    );
  }

  private _saveCurrentSegment() {
    if (!this._newSegmentType) return;

    const notation = this._buildNotationFromValues(
      this._newSegmentType,
      this._newSegmentValues,
      this._workingUnits
    );

    if (this._editingSegmentId) {
      // Update existing segment
      this._workingSegments = this._workingSegments.map((segment) =>
        segment.id === this._editingSegmentId
          ? {
              ...segment,
              values: { ...this._newSegmentValues },
              notation,
            }
          : segment
      );
    } else {
      // Add new segment
      const newSegment: NotationSegment = {
        id: Date.now().toString(),
        type: this._newSegmentType,
        values: { ...this._newSegmentValues },
        notation,
      };
      this._workingSegments = [...this._workingSegments, newSegment];
    }

    this._cancelSegmentEdit();
  }

  private _cancelSegmentEdit() {
    this._newSegmentType = "";
    this._newSegmentValues = {};
    this._editingSegmentId = null;
  }

  private _onValueChange(key: string, value: number | string) {
    this._newSegmentValues = {
      ...this._newSegmentValues,
      [key]: value,
    };
  }

  private _apply() {
    // Build notation string from segments
    const notationParts = this._workingSegments.map(
      (segment) => segment.notation
    );
    let notation = notationParts.join(",");

    // Always include unit prefix - it's not optional
    notation = `${this._workingUnits}=>${notation}`;

    const event = new CustomEvent("dialog-apply", {
      detail: {
        notation: notation,
        units: this._workingUnits,
        segments: this._workingSegments,
      },
    });
    this.dispatchEvent(event);
  }

  private _cancel() {
    this.dispatchEvent(new CustomEvent("dialog-cancel"));
  }

  render() {
    return html`
      <sl-dialog
        .open=${this.open}
        .label=${"Build Notation Editor - Side " + this.side}
        style="--width: 90vw; --height: 90vh;"
        @sl-hide=${this._cancel}
      >
        <div class="units-selector">
          <label>Measurement Units:</label>
          <sl-radio-group
            .value=${this._workingUnits}
            @sl-change=${(e: CustomEvent) => {
              const radioGroup = e.target as any;
              const newUnits = radioGroup.value as "mm" | "in";
              console.log("Radio group value changed to:", newUnits);
              this._handleUnitsChange(newUnits);
            }}
          >
            <sl-radio-button value="mm">mm</sl-radio-button>
            <sl-radio-button value="in">in</sl-radio-button>
          </sl-radio-group>
        </div>

        <div class="dialog-body">
          ${this._newSegmentType || this._editingSegmentId
            ? html`
                <!-- Segment form takes priority - hide list while editing -->
                <div class="add-segment-section">
                  <h3>
                    ${this._editingSegmentId ? "Edit" : "Add New"} Segment
                  </h3>
                  <div class="segment-form">${this._renderSegmentForm()}</div>
                </div>
              `
            : html`
                <!-- Show segment list and add buttons when not editing -->
                ${this._workingSegments.length === 0
                  ? html`
                      <div class="empty-state">
                        <sl-icon name="layers"></sl-icon>
                        <h3>No segments defined</h3>
                        <p>Add segments below to build your notation.</p>
                      </div>
                    `
                  : html`
                      <div class="segment-list">
                        ${this._workingSegments.map(
                          (segment, index) => html`
                            <div class="segment-item">
                              <div class="segment-info">
                                <div class="segment-type">
                                  ${this._getSegmentTypeConfig(segment.type)
                                    ?.name || segment.type}
                                </div>
                                <div class="segment-notation">
                                  ${segment.notation}
                                </div>
                              </div>
                              <div class="segment-actions">
                                <sl-icon-button
                                  name="pencil"
                                  @click=${() => this._editSegment(segment)}
                                  label="Edit segment"
                                ></sl-icon-button>
                                <sl-icon-button
                                  name="trash"
                                  variant="danger"
                                  @click=${() =>
                                    this._deleteSegment(segment.id)}
                                  label="Delete segment"
                                ></sl-icon-button>
                              </div>
                            </div>
                          `
                        )}
                      </div>
                    `}

                <div class="add-segment-section">
                  <h3>Add New Segment</h3>
                  <div class="add-segment-buttons">
                    ${Object.entries({
                      "angle-travel": "Angle + Travel",
                      "thickness-height": "Thickness @ Height",
                      caliper: "Face Caliper",
                      "apex-caliper": "Apex Caliper",
                    }).map(
                      ([type, name]) => html`
                        <sl-button
                          class="segment-type-button"
                          variant="default"
                          @click=${() => this._startAddingSegment(type)}
                        >
                          ${name}
                        </sl-button>
                      `
                    )}
                  </div>
                </div>
              `}
        </div>

        <div class="dialog-footer" slot="footer">
          <span style="color: var(--sl-color-neutral-600); font-size: 0.9rem;">
            ${this._workingSegments.length}
            segment${this._workingSegments.length === 1 ? "" : "s"} •
            ${this._workingUnits}
          </span>
          <div class="footer-actions">
            ${this._newSegmentType || this._editingSegmentId
              ? html`
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
                    ${this._editingSegmentId ? "Update" : "Add"} Segment
                  </sl-button>
                `
              : html`
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
    `;
  }

  private _renderSegmentForm() {
    const config = this._getSegmentTypeConfig(this._newSegmentType);
    if (!config) return html``;

    return html`
      <h4>${config.name}</h4>
      <div class="form-description">
        ${config.description}<br />
        <strong>Measurement tip:</strong> ${config.measurementGuide}
      </div>

      ${config.values.map(
        (valueConfig) => html`
          <div class="form-field">
            ${valueConfig.type === "select"
              ? html`
                  <label class="form-label">${valueConfig.label}</label>
                  <sl-radio-group
                    .value=${this._newSegmentValues[valueConfig.key] ||
                    valueConfig.options?.[0]}
                    @sl-change=${(e: CustomEvent) =>
                      this._onValueChange(valueConfig.key, e.detail.value)}
                  >
                    ${valueConfig.options?.map(
                      (option) => html`
                        <sl-radio-button value=${option}>
                          ${option === "dps"
                            ? "DPS"
                            : option === "inclusive"
                            ? "Inclusive"
                            : option === "height"
                            ? "Height"
                            : option === "width"
                            ? "Width"
                            : option}
                        </sl-radio-button>
                      `
                    )}
                  </sl-radio-group>
                `
              : html`
                  <sl-input
                    type="number"
                    label=${valueConfig.label}
                    .value=${String(
                      this._newSegmentValues[valueConfig.key] || 0
                    )}
                    @sl-input=${(e: CustomEvent) =>
                      this._onValueChange(
                        valueConfig.key,
                        Number((e.target as HTMLInputElement).value)
                      )}
                    suffix=${valueConfig.suffix || ""}
                    step=${valueConfig.suffix === "°"
                      ? "0.1"
                      : this._workingUnits === "mm"
                      ? "0.01"
                      : "0.001"}
                  ></sl-input>
                `}
          </div>
        `
      )}
    `;
  }
}

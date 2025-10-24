import { LitElement, html, css, svg } from "lit";
import { state, property } from "lit/decorators.js";
import { parseCrossSectionNotation } from "../model2/cross-section-notation.js";

interface SegmentSpec {
  angleType: "inclusive" | "dps";
  angleValue: number;
  travelType: "width" | "height";
  travelValue: number;
  angleInclusive?: number;
  derivedWidth?: number;
  derivedHeight?: number;
}

interface ComputedSegment {
  angleInclusive: number;
  startWidth: number;
  endWidth: number;
  startY: number;
  endY: number;
}

class GeometryModel {
  private segments: SegmentSpec[] = [];
  public apexMacro: boolean = false;
  private maxApexHeight: number = 3;

  constructor(
    segments: SegmentSpec[] = [],
    apexMacro: boolean = false,
    maxApexHeight: number = 3
  ) {
    this.segments = [...segments];
    this.apexMacro = apexMacro;
    this.maxApexHeight = maxApexHeight;
  }

  setSegments(segments: SegmentSpec[]): void {
    this.segments = [...segments];
  }

  getSegments(): SegmentSpec[] {
    return [...this.segments];
  }

  setApexMacro(enabled: boolean): void {
    this.apexMacro = enabled;
  }

  private _createApexModel(segments: SegmentSpec[]): SegmentSpec[] {
    if (!segments.length || !this.apexMacro) return segments;

    // First recompute to get the actual heights
    const recomputed = this._recomputeSegments(segments);
    const apexSegments: SegmentSpec[] = [];
    let currentHeight = 0;

    for (let i = 0; i < recomputed.length; i++) {
      const seg = recomputed[i];
      const segEndHeight = seg.derivedHeight ?? currentHeight;

      if (currentHeight >= this.maxApexHeight) {
        break;
      }

      if (segEndHeight <= this.maxApexHeight) {
        apexSegments.push({ ...seg });
        currentHeight = segEndHeight;
      } else {
        // Segment goes beyond maxApexHeight, need to truncate
        const modifiedSeg: SegmentSpec = { ...seg };

        if (seg.travelType === "height") {
          // For height travel, reduce the travel value to stop at maxApexHeight
          modifiedSeg.travelValue = this.maxApexHeight - currentHeight;
          modifiedSeg.derivedHeight = this.maxApexHeight;
        } else {
          // For width travel, calculate proportional reduction
          const heightTravel = segEndHeight - currentHeight;
          const neededHeightTravel = this.maxApexHeight - currentHeight;
          const ratio = neededHeightTravel / heightTravel;
          modifiedSeg.travelValue = seg.travelValue * ratio;
        }

        apexSegments.push(modifiedSeg);
        break;
      }
    }

    return apexSegments;
  }

  private _recomputeSegments(segments: SegmentSpec[]): SegmentSpec[] {
    let prevWidth = 0;
    let prevHeight = 0;
    return segments.map((seg) => {
      const angleInclusive =
        seg.angleType === "dps" ? seg.angleValue * 2 : seg.angleValue;
      const half = (angleInclusive * Math.PI) / 360; // (angle/2) degrees to radians
      let endWidth = prevWidth;
      let endHeight = prevHeight;
      if (seg.travelType === "width") {
        const targetWidth = seg.travelValue;
        if (angleInclusive === 0) {
          // invalid combination width + zero angle; keep previous width
          endWidth = prevWidth;
          endHeight = prevHeight; // no change
        } else {
          endWidth = targetWidth;
          const deltaH =
            prevWidth === 0
              ? endWidth / 2 / Math.tan(half)
              : (endWidth - prevWidth) / (2 * Math.tan(half));
          endHeight = prevHeight + deltaH;
        }
      } else {
        // height
        const targetHeight = seg.travelValue; // absolute
        if (targetHeight < prevHeight) {
          endHeight = prevHeight; // ignore invalid
        } else {
          endHeight = targetHeight;
        }
        const deltaH = endHeight - prevHeight;
        if (angleInclusive === 0) {
          endWidth = prevWidth; // parallel bar
        } else {
          if (prevWidth === 0) {
            // apex start: w/2 / tan = absolute height => w = 2*H*tan
            endWidth = 2 * endHeight * Math.tan(half);
          } else {
            endWidth = prevWidth + 2 * deltaH * Math.tan(half);
          }
        }
      }
      const updated: SegmentSpec = {
        ...seg,
        angleInclusive,
        derivedWidth: endWidth,
        derivedHeight: endHeight,
      };
      prevWidth = endWidth;
      prevHeight = endHeight;
      return updated;
    });
  }

  compute(): ComputedSegment[] {
    // Apply apex truncation if enabled, then recompute the final segments
    const workingSegments = this._createApexModel(this.segments);
    const recomputed = this._recomputeSegments(workingSegments);

    let yPrev = 0;
    let wPrev = 0;
    const out: ComputedSegment[] = [];

    for (const seg of recomputed) {
      const wNew = seg.derivedWidth ?? wPrev;
      const endY = seg.derivedHeight ?? yPrev;
      out.push({
        angleInclusive:
          seg.angleInclusive ??
          (seg.angleType === "dps" ? seg.angleValue * 2 : seg.angleValue),
        startWidth: wPrev,
        endWidth: wNew,
        startY: yPrev,
        endY,
      });
      yPrev = endY;
      wPrev = wNew;
    }
    return out;
  }

  getTotalHeight(): number {
    const computed = this.compute();
    return computed.length ? computed[computed.length - 1].endY : 5;
  }

  getMaxWidth(): number {
    const computed = this.compute();
    return computed.length ? computed[computed.length - 1].endWidth : 2;
  }

  widthAtY(computed: ComputedSegment[], y: number): number {
    if (!computed.length) return 0;
    if (y <= 0) return 0;

    for (const seg of computed) {
      if (y <= seg.endY) {
        if (seg.startY === seg.endY) return seg.endWidth;
        const ratio = (y - seg.startY) / (seg.endY - seg.startY);
        return seg.startWidth + (seg.endWidth - seg.startWidth) * ratio;
      }
    }

    return computed[computed.length - 1].endWidth;
  }
}

export class VsaGeometryBuilder extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      --vsa-border: #4a2d00;
      --vsa-row-alt: #f3efe7;
      --vsa-card-bg: #fffefa;
      --vsa-input-bg: #fff;
      --vsa-warn-color: #c92a2a;
      --vsa-grid-line-color: #444;
      --vsa-path-a-color: #0a58ca;
      --vsa-path-b-color: #c92a2a;
      --vsa-warning-text-color: #b08900;
      --vsa-metrics-bg: rgba(0, 0, 0, 0.05);
      --vsa-stroke-color: #000;
      --vsa-center-line-color: #000;
    }

    /* Dark mode overrides */
    :host-context(.dark) {
      --vsa-border: var(--sl-color-neutral-700);
      --vsa-row-alt: var(--sl-color-neutral-800);
      --vsa-card-bg: var(--sl-color-neutral-900);
      --vsa-input-bg: var(--sl-color-neutral-800);
      --vsa-warn-color: #ff6b6b;
      --vsa-grid-line-color: #666;
      --vsa-path-a-color: #4dabf7;
      --vsa-path-b-color: #ff8787;
      --vsa-warning-text-color: #ffd43b;
      --vsa-metrics-bg: rgba(255, 255, 255, 0.05);
      --vsa-stroke-color: #ccc;
      --vsa-center-line-color: #ffd43b;
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
      background: var(--vsa-card-bg);
      border: 1px solid var(--vsa-border);
      border-radius: 6px;
      padding: 0.5rem 0.6rem 0.7rem;
      min-width: 260px;
    }
    .panel-header {
      font-size: 0.65rem;
      font-weight: 600;
      margin-bottom: 0.4rem;
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
      border: 1px solid var(--vsa-border);
      background: var(--vsa-input-bg);
      box-sizing: border-box;
    }
    table.segments-edit {
      width: 100%;
      border-collapse: collapse;
    }
    table.segments-edit th,
    table.segments-edit td {
      border: 1px solid var(--vsa-border);
      padding: 0.25rem 0.35rem;
      font-size: 0.55rem;
      text-align: right;
    }
    table.segments-edit th {
      background: var(--vsa-row-alt);
      position: sticky;
      top: 0;
      z-index: 1;
    }
    .seg-table-wrap {
      max-height: 150px;
      overflow: auto;
      border: 1px solid var(--vsa-border);
      border-radius: 6px;
      background: var(--vsa-input-bg);
    }
    .actions-cell {
      text-align: center;
    }
    .warn {
      color: var(--vsa-warn-color);
      font-size: 0.6rem;
      margin: 0.4rem 0;
    }
    .svg-wrap {
      border: 2px solid var(--vsa-border);
      background: var(--vsa-card-bg);
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
      margin-top: 0.4rem;
      max-height: 24vh;
      overflow: auto;
      border: 1px solid var(--vsa-border);
      border-radius: 6px;
      background: var(--vsa-card-bg);
    }
    .fs-seglist table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.55rem;
    }
    .fs-seglist th,
    .fs-seglist td {
      padding: 0.25rem 0.4rem;
      border: 1px solid var(--vsa-border);
      text-align: left;
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
  `;

  @property({ type: Number }) angleInput = 15;
  @property({ type: Number }) thicknessInput = 0.5;
  @property({ type: Number }) angleInputB = 15;
  @property({ type: Number }) thicknessInputB = 0.5;
  @property({ type: String }) angleInputType: "dps" | "inclusive" = "dps";
  @property({ type: String }) angleInputTypeB: "dps" | "inclusive" = "dps";
  @property({ type: String }) travelInputType: "width" | "height" = "width";
  @property({ type: String }) travelInputTypeB: "width" | "height" = "width";
  @property({ type: Number }) zoom = 1;
  @property({ type: Number }) pan = 0; // retained for compatibility

  // Geometry models for A and B
  private _geometryA: GeometryModel = new GeometryModel();
  private _geometryB: GeometryModel = new GeometryModel();

  // Legacy properties for compatibility - these will sync with the geometry models
  @property({ type: Array, attribute: false })
  get segments(): SegmentSpec[] {
    return this._geometryA.getSegments();
  }
  set segments(value: SegmentSpec[]) {
    this._geometryA.setSegments(value);
  }

  @property({ type: Array, attribute: false })
  get segmentsB(): SegmentSpec[] {
    return this._geometryB.getSegments();
  }
  set segmentsB(value: SegmentSpec[]) {
    this._geometryB.setSegments(value);
  }

  @state() warning: string | null = null;
  private _storageKey = "vsa-geometry-builder-state";
  @property({ type: String }) units: "mm" | "in" = "mm";
  @property({ type: Boolean }) regionZoomActive = false;
  @property({ type: Boolean }) overlayMode = true; // permanent overlay
  @property({ type: Number }) overlayCenter = 0.5; // fraction 0..1 from apex upward
  @property({ type: Number }) overlayTargetWidth: number | null = null;
  @state() showProfile = false; // profile view (full extents, no slider)
  // Notation strings for quick import (A/B)
  @state() notationA: string = "";
  @state() notationB: string = "";
  @state() notationAWarnings: string[] = [];
  @state() notationBWarnings: string[] = [];
  @state()
  private _fullScreen = false;
  public get fullScreen() {
    return this._fullScreen;
  }
  public set fullScreen(value) {
    this._fullScreen = value;
    this._dispatchFullScreenChanged();
  }
  private _userAdjustingWidth = false;
  private _userAdjustingCenter = false;
  @property({ type: Number }) strokePxMin = 5; // legacy (constant strokes now)
  @property({ type: Boolean }) showDebug = true;

  @property({ type: Boolean })
  get apexMacro(): boolean {
    return this._geometryA.apexMacro;
  }
  set apexMacro(value: boolean) {
    this._geometryA.setApexMacro(value);
    this._geometryB.setApexMacro(value);
    this.requestUpdate();
  }

  @state() thinStrokes = true;
  @state() adaptiveZoomMode: "idle" | "expand" | "shrink" = "idle";
  private _activeShrink = false;
  private _activeExpand = false;
  private _prevOverlayCenter = this.overlayCenter;
  private _customViewBox: {
    x: number;
    y: number;
    w: number;
    h: number;
  } | null = null;
  private _baseViewBox: { x: number; y: number; w: number; h: number } | null =
    null;
  private _dragPanning = false;
  private _dragStart: {
    x: number;
    y: number;
    vbX: number;
    vbY: number;
    vbW: number;
    vbH: number;
  } | null = null;
  private _lastTapTime = 0;
  private _pendingTap: { x: number; y: number } | null = null;
  // Removed dynamic slider height logic; slider will use default CSS height.

  connectedCallback() {
    super.connectedCallback();
    this._restore();
    // Ensure initial computation even if no saved data
    this._syncSegmentsToModels();
    // Removed dynamic height sampling.
  }
  constructor() {
    super();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  // _sampleSliderHeight removed; static layout now.

  private _restore() {
    try {
      const raw = localStorage.getItem(this._storageKey);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (Array.isArray(data.segments)) this.segments = data.segments;
      if (Array.isArray(data.segmentsB)) this.segmentsB = data.segmentsB;
      if (typeof data.zoom === "number") this.zoom = data.zoom;
      if (typeof data.pan === "number") this.pan = data.pan;
      if (typeof data.angleInput === "number")
        this.angleInput = data.angleInput;
      if (typeof data.thicknessInput === "number")
        this.thicknessInput = data.thicknessInput;
      if (typeof data.angleInputB === "number")
        this.angleInputB = data.angleInputB;
      if (typeof data.thicknessInputB === "number")
        this.thicknessInputB = data.thicknessInputB;
      if (data.angleInputType === "dps" || data.angleInputType === "inclusive")
        this.angleInputType = data.angleInputType;
      if (
        data.angleInputTypeB === "dps" ||
        data.angleInputTypeB === "inclusive"
      )
        this.angleInputTypeB = data.angleInputTypeB;
      if (data.travelInputType === "width" || data.travelInputType === "height")
        this.travelInputType = data.travelInputType;
      if (
        data.travelInputTypeB === "width" ||
        data.travelInputTypeB === "height"
      )
        this.travelInputTypeB = data.travelInputTypeB;
      if (data.units === "mm" || data.units === "in") this.units = data.units;
      if (typeof data.overlayMode === "boolean")
        this.overlayMode = data.overlayMode;
      if (typeof data.overlayCenter === "number")
        this.overlayCenter = data.overlayCenter;
      if (typeof data.overlayTargetWidth === "number")
        this.overlayTargetWidth = data.overlayTargetWidth;
      if (typeof data.strokePxMin === "number")
        this.strokePxMin = data.strokePxMin;
      if (typeof data.thinStrokes === "boolean")
        this.thinStrokes = data.thinStrokes;
      else if (typeof data._thinStrokes === "boolean")
        this.thinStrokes = data._thinStrokes; // backward compat
      if (typeof data.fullScreen === "boolean")
        this.fullScreen = data.fullScreen;
      if (typeof data.showProfile === "boolean")
        this.showProfile = data.showProfile;
      if (typeof data.apexMacro === "boolean") this.apexMacro = data.apexMacro;
      if (
        data.customViewBox &&
        typeof data.customViewBox.x === "number" &&
        typeof data.customViewBox.y === "number" &&
        typeof data.customViewBox.w === "number" &&
        typeof data.customViewBox.h === "number"
      ) {
        this._customViewBox = data.customViewBox;
        this.regionZoomActive = true;
      }
      if (typeof data.notationA === "string") this.notationA = data.notationA;
      if (typeof data.notationB === "string") this.notationB = data.notationB;

      // Sync segments to models and compute initial cached results
      this._syncSegmentsToModels();
    } catch {}
  }

  private _persist() {
    try {
      const prevFull = this.fullScreen;
      const payload = {
        angleInput: this.angleInput,
        thicknessInput: this.thicknessInput,
        angleInputB: this.angleInputB,
        thicknessInputB: this.thicknessInputB,
        segments: this.segments,
        segmentsB: this.segmentsB,
        angleInputType: this.angleInputType,
        angleInputTypeB: this.angleInputTypeB,
        travelInputType: this.travelInputType,
        travelInputTypeB: this.travelInputTypeB,
        units: this.units,
        overlayMode: this.overlayMode,
        overlayCenter: this.overlayCenter,
        overlayTargetWidth: this.overlayTargetWidth,
        strokePxMin: this.strokePxMin,
        thinStrokes: this.thinStrokes,
        customViewBox: this._customViewBox,
        fullScreen: this.fullScreen,
        showProfile: this.showProfile,
        apexMacro: this.apexMacro,
        notationA: this.notationA,
        notationB: this.notationB,
      };
      localStorage.setItem(this._storageKey, JSON.stringify(payload));
      // Lock page scroll when entering fullscreen; restore when exiting.
      if (this.fullScreen) {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
      if (prevFull !== this.fullScreen) {
        this._dispatchFullScreenChanged();
      }
    } catch {}
  }

  private _dispatchFullScreenChanged() {
    this.dispatchEvent(
      new CustomEvent("geometry-fullscreen-changed", {
        detail: { fullScreen: this.fullScreen },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _toggleFullScreen() {
    this.fullScreen = !this.fullScreen;
    this._customViewBox = null;
    this.requestUpdate();
    this._persist(); // will emit event if changed
  }

  private _editSegment(
    list: "A" | "B",
    index: number,
    field: "angle" | "thickness",
    value: number
  ) {
    if (value <= 0 || Number.isNaN(value)) return;
    const arr = list === "A" ? [...this.segments] : [...this.segmentsB];
    if (!arr[index]) return;
    arr[index] = { ...arr[index], [field]: value } as SegmentSpec;
    if (list === "A") this.segments = arr;
    else this.segmentsB = arr;
    this._baseViewBox = null;
    this._persist();
  }
  private _deleteSegment(list: "A" | "B", index: number) {
    const arr = list === "A" ? [...this.segments] : [...this.segmentsB];
    if (!arr[index]) return;
    arr.splice(index, 1);
    if (list === "A") this.segments = arr;
    else this.segmentsB = arr;
    this._baseViewBox = null;
    this._persist();
  }

  private _add() {
    const angleValInput = this.angleInput;
    const angleType = this.angleInputType;
    const angleValInclusive =
      angleType === "inclusive" ? angleValInput : angleValInput * 2;
    const travelType = this.travelInputType;
    const travelVal = this.thicknessInput; // mm (width or height absolute)
    const last = this.segments[this.segments.length - 1];
    const prevWidth = last?.derivedWidth ?? 0;
    const lastHeight = last?.derivedHeight ?? 0;
    if (travelType === "width") {
      if (travelVal <= prevWidth) {
        const d = this._displayDigits();
        this.warning = `Width ${this._toDisplayLength(travelVal).toFixed(d)}${
          this.units
        } must exceed previous ${this._toDisplayLength(prevWidth).toFixed(d)}${
          this.units
        }.`;
        this.requestUpdate();
        return;
      }
      if (angleValInclusive === 0) {
        this.warning = "Zero angle only valid with height travel.";
        this.requestUpdate();
        return;
      }
    } else {
      // height
      if (travelVal <= lastHeight) {
        const d = this._displayDigits();
        this.warning = `Height ${this._toDisplayLength(travelVal).toFixed(d)}${
          this.units
        } must exceed previous ${this._toDisplayLength(lastHeight).toFixed(d)}${
          this.units
        }.`;
        this.requestUpdate();
        return;
      }
    }
    if (angleValInclusive < 0) return;
    const seg: SegmentSpec = {
      angleType,
      angleValue: angleValInput,
      travelType,
      travelValue: travelVal,
    };
    this.warning = null;
    this.segments = [...this.segments, seg];
    this._baseViewBox = null;
    this._persist();
  }
  private _addB() {
    const angleValInput = this.angleInputB;
    const angleType = this.angleInputTypeB;
    const angleValInclusive =
      angleType === "inclusive" ? angleValInput : angleValInput * 2;
    const travelType = this.travelInputTypeB;
    const travelVal = this.thicknessInputB;
    const last = this.segmentsB[this.segmentsB.length - 1];
    const prevWidth = last?.derivedWidth ?? 0;
    const lastHeight = last?.derivedHeight ?? 0;
    if (travelType === "width") {
      if (travelVal <= prevWidth) {
        const d = this._displayDigits();
        this.warning = `Width ${this._toDisplayLength(travelVal).toFixed(d)}${
          this.units
        } must exceed previous ${this._toDisplayLength(prevWidth).toFixed(d)}${
          this.units
        } (B).`;
        this.requestUpdate();
        return;
      }
      if (angleValInclusive === 0) {
        this.warning = "Zero angle only valid with height travel.";
        return;
      }
    } else {
      if (travelVal <= lastHeight) {
        const d = this._displayDigits();
        this.warning = `Height ${this._toDisplayLength(travelVal).toFixed(d)}${
          this.units
        } must exceed previous ${this._toDisplayLength(lastHeight).toFixed(d)}${
          this.units
        } (B).`;
        this.requestUpdate();
        return;
      }
    }
    if (angleValInclusive < 0) return;
    const seg: SegmentSpec = {
      angleType,
      angleValue: angleValInput,
      travelType,
      travelValue: travelVal,
    };
    this.warning = null;
    this.segmentsB = [...this.segmentsB, seg];
    this._baseViewBox = null;
    this._persist();
  }

  // Helper method to sync segments back to geometry models after in-place modifications
  private _syncSegmentsToModels(): void {
    this._geometryA.setSegments(this.segments);
    this._geometryB.setSegments(this.segmentsB);
    this._recomputeAll();
  }

  private _getSegments(side: "A" | "B"): SegmentSpec[] {
    return side === "A" ? this.segments : this.segmentsB;
  }

  private _updateAngleType(
    side: "A" | "B",
    index: number,
    newType: "inclusive" | "dps"
  ) {
    const list = this._getSegments(side);
    const seg = list[index];
    if (!seg || seg.angleType === newType) return;
    // Convert stored angleValue to new representation
    if (newType === "inclusive" && seg.angleType === "dps") {
      seg.angleValue = seg.angleValue * 2; // dps -> inclusive
    } else if (newType === "dps" && seg.angleType === "inclusive") {
      seg.angleValue = seg.angleValue / 2; // inclusive -> dps
    }
    seg.angleType = newType;
    // Validate zero-angle rule
    const angleInclusive =
      seg.angleType === "inclusive" ? seg.angleValue : seg.angleValue * 2;
    if (angleInclusive === 0 && seg.travelType === "width") {
      this.warning = "Zero angle only allowed when travel type is height.";
    } else {
      this.warning = "";
    }
    this._syncSegmentsToModels();
    this.requestUpdate();
  }

  private _updateAngleValue(side: "A" | "B", index: number, newVal: number) {
    const list = this._getSegments(side);
    const seg = list[index];
    if (!seg) return;
    if (isNaN(newVal) || newVal < 0) return;
    const prev = list[index - 1];
    seg.angleValue = newVal;
    const angleInclusive =
      seg.angleType === "inclusive" ? seg.angleValue : seg.angleValue * 2;
    if (angleInclusive === 0 && seg.travelType === "width") {
      this.warning = "Zero angle only allowed with height travel.";
      return; // don't recompute - keep geometry until user adjusts travel type
    } else {
      this.warning = "";
    }
    this._syncSegmentsToModels();
    this.requestUpdate();
  }

  private _updateTravelType(
    side: "A" | "B",
    index: number,
    newType: "width" | "height"
  ) {
    const list = this._getSegments(side);
    const seg = list[index];
    if (!seg || seg.travelType === newType) return;
    // capture derived widths/heights before recompute for mapping
    const model = side === "A" ? this._geometryA : this._geometryB;
    const computed = model.compute();
    // Convert ComputedSegment[] back to SegmentSpec[] with derived values
    const derived = computed.map((comp, i) => ({
      ...list[i],
      derivedWidth: comp.endWidth,
      derivedHeight: comp.endY,
    }));
    const derivedSeg = derived[index];
    // Switch and map travel value to maintain same resulting geometry endpoint.
    if (newType === "height") {
      seg.travelType = "height";
      seg.travelValue = derivedSeg.derivedHeight ?? 0;
      // zero angle allowed now
    } else {
      // to width
      const angleInclusive =
        seg.angleType === "inclusive" ? seg.angleValue : seg.angleValue * 2;
      if (angleInclusive === 0) {
        this.warning = "Cannot switch to width travel with zero angle.";
        return;
      }
      seg.travelType = "width";
      seg.travelValue = derivedSeg.derivedWidth ?? 0;
    }
    this.warning = "";
    this._syncSegmentsToModels();
    this.requestUpdate();
  }

  private _updateTravelValue(side: "A" | "B", index: number, newVal: number) {
    const list = this._getSegments(side);
    const seg = list[index];
    if (!seg) return;
    if (isNaN(newVal) || newVal <= 0) return;
    const prev = list[index - 1];
    if (seg.travelType === "width") {
      const prevWidth = prev?.derivedWidth ?? 0;
      if (newVal <= prevWidth) {
        const d = this._displayDigits();
        this.warning = `Width must exceed previous width (${this._toDisplayLength(
          prevWidth
        ).toFixed(d)}${this.units}).`;
        return;
      }
    } else {
      // height travel
      const prevHeight = prev?.derivedHeight ?? 0;
      if (newVal <= prevHeight) {
        const d = this._displayDigits();
        this.warning = `Height must exceed previous height (${this._toDisplayLength(
          prevHeight
        ).toFixed(d)}${this.units}).`;
        return;
      }
    }
    seg.travelValue = newVal;
    // Validate zero-angle rule again
    const angleInclusive =
      seg.angleType === "inclusive" ? seg.angleValue : seg.angleValue * 2;
    if (angleInclusive === 0 && seg.travelType === "width") {
      this.warning = "Zero angle only allowed with height travel.";
      return;
    }
    this.warning = "";
    this._syncSegmentsToModels();
    this.requestUpdate();
  }

  // Unit conversion helpers (internal storage always mm)
  private _toDisplayLength(mm: number): number {
    return this.units === "mm" ? mm : mm / 25.4;
  }
  private _fromDisplayLength(val: number): number {
    return this.units === "mm" ? val : val * 25.4;
  }
  private _displayDigits(): number {
    return this.units === "mm" ? 3 : 4; // mm -> 0.001, in -> 0.0001
  }
  private _formatLen(
    mm: number,
    digits: number = this._displayDigits()
  ): string {
    return this._toDisplayLength(mm).toFixed(digits);
  }

  private _clear() {
    this.segments = [];
    this.segmentsB = [];
    this._baseViewBox = null;
    try {
      localStorage.removeItem(this._storageKey);
    } catch {}
  }

  // Cached computed results
  private _computedA: ComputedSegment[] = [];
  private _computedB: ComputedSegment[] = [];

  private _recomputeAll() {
    this._computedA = this._geometryA.compute();
    this._computedB = this._geometryB.compute();
  }

  // Convenience method for getting computed segments for current side
  private _computeWithCurrentSegments(): ComputedSegment[] {
    // Return the appropriate cached computation
    if (this.segments === this._geometryA.getSegments()) {
      return this._computedA;
    } else {
      return this._computedB;
    }
  }

  private _path(computed: ComputedSegment[]): string {
    if (!computed.length) return "";
    // Left side from apex upward
    let d = `M 0 0`;
    for (const seg of computed) {
      // end left point
      const x = -seg.endWidth / 2;
      const y = seg.endY;
      d += ` L ${x} ${y}`;
    }
    // Right side downward
    for (let i = computed.length - 1; i >= 0; i--) {
      const seg = computed[i];
      const x = seg.endWidth / 2;
      const y = seg.endY;
      d += ` L ${x} ${y}`;
    }
    d += " Z";
    return d;
  }

  private _segmentPaths(computed: ComputedSegment[]): string[] {
    return computed.map((seg) => {
      const { startWidth: w0, endWidth: w1, startY: y0, endY: y1 } = seg;
      return [
        `M ${-w0 / 2} ${y0}`,
        `L ${-w1 / 2} ${y1}`,
        `L ${w1 / 2} ${y1}`,
        `L ${w0 / 2} ${y0}`,
        "Z",
      ].join(" ");
    });
  }

  private _widthAtY(computed: ComputedSegment[], y: number): number {
    if (!computed.length || y <= 0) return 0;
    for (const seg of computed) {
      if (y <= seg.endY + 1e-9) {
        const span = seg.endY - seg.startY;
        if (span <= 1e-9) return seg.endWidth;
        const t = (y - seg.startY) / span;
        return seg.startWidth + (seg.endWidth - seg.startWidth) * t;
      }
    }
    return computed[computed.length - 1].endWidth;
  }

  private _onAngle(e: Event) {
    this.angleInput = Number((e.target as HTMLInputElement).value);
    this._persist();
  }
  private _onAngleTypeChange(e: Event) {
    const val = (e.target as HTMLSelectElement).value as "dps" | "inclusive";
    if (val === this.angleInputType) return;
    // convert stored angle value to new representation
    if (val === "inclusive" && this.angleInputType === "dps") {
      this.angleInput = this.angleInput * 2;
    } else if (val === "dps" && this.angleInputType === "inclusive") {
      this.angleInput = this.angleInput / 2;
    }
    this.angleInputType = val;
    this._persist();
  }
  private _onThickness(e: Event) {
    this.thicknessInput = Number((e.target as HTMLInputElement).value);
    this._persist();
  }
  private _onAngleB(e: Event) {
    this.angleInputB = Number((e.target as HTMLInputElement).value);
    this._persist();
  }
  private _onAngleTypeChangeB(e: Event) {
    const val = (e.target as HTMLSelectElement).value as "dps" | "inclusive";
    if (val === this.angleInputTypeB) return;
    if (val === "inclusive" && this.angleInputTypeB === "dps") {
      this.angleInputB = this.angleInputB * 2;
    } else if (val === "dps" && this.angleInputTypeB === "inclusive") {
      this.angleInputB = this.angleInputB / 2;
    }
    this.angleInputTypeB = val;
    this._persist();
  }
  private _onThicknessB(e: Event) {
    this.thicknessInputB = Number((e.target as HTMLInputElement).value);
    this._persist();
  }
  private _onTravelTypeChange(e: Event) {
    const val = (e.target as HTMLSelectElement).value as "width" | "height";
    if (val === this.travelInputType) return;
    // derive a new reasonable default value when switching
    const last = this.segments[this.segments.length - 1];
    if (val === "height") {
      // set to previous height + small delta
      const prevH = last?.derivedHeight ?? 0;
      this.thicknessInput = +(prevH + 0.2).toFixed(4);
    } else {
      // width
      const prevW = last?.derivedWidth ?? 0;
      this.thicknessInput = +(prevW + 0.1).toFixed(4);
    }
    this.travelInputType = val;
    this._persist();
  }
  private _onTravelTypeChangeB(e: Event) {
    const val = (e.target as HTMLSelectElement).value as "width" | "height";
    if (val === this.travelInputTypeB) return;
    const last = this.segmentsB[this.segmentsB.length - 1];
    if (val === "height") {
      const prevH = last?.derivedHeight ?? 0;
      this.thicknessInputB = +(prevH + 0.2).toFixed(4);
    } else {
      const prevW = last?.derivedWidth ?? 0;
      this.thicknessInputB = +(prevW + 0.1).toFixed(4);
    }
    this.travelInputTypeB = val;
    this._persist();
  }
  private _onZoom(e: Event) {
    // Manual zoom resets custom viewBox so sliders and mouse interactions remain in sync
    this.zoom = Number((e.target as HTMLInputElement).value);
    // Clear custom viewBox so wheel/dblclick start from new base scale
    this._customViewBox = null;
    this.regionZoomActive = false;
    this._baseViewBox = null; // recalc base on next interaction
    this._persist();
  }
  private _onPan(e: Event) {
    // Pan slider affects vertical anchoring only when not in custom viewBox mode
    this.pan = Number((e.target as HTMLInputElement).value) / 100; // slider 0-100
    if (this._customViewBox) {
      // translate custom viewBox vertically relative to base extents if available
      if (this._baseViewBox) {
        const totalHeight = this._geometryA.getTotalHeight();
        const vbH = this._customViewBox.h;
        const maxScroll = Math.max(0, totalHeight - vbH);
        this._customViewBox.y = maxScroll * this.pan;
      }
    }
    this._persist();
  }
  private _toggleOverlay() {
    this.overlayMode = !this.overlayMode;
    this._persist();
  }
  private _changeUnits(e: Event) {
    const val = (e.target as HTMLSelectElement).value;
    if (val === "mm" || val === "in") {
      this.units = val;
      this._persist();
    }
  }

  private _onOverlayCenter(e: Event) {
    this._userAdjustingCenter = true;
    const raw = Number((e.target as HTMLInputElement).value);
    // Raw slider value is height from apex in current units; convert to mm
    const totalHeightMm = this._geometryA.getTotalHeight();
    const valueInMm = this.units === "mm" ? raw : raw * 25.4;
    const clamped = Math.max(0, Math.min(totalHeightMm, valueInMm));
    const newCenter = totalHeightMm === 0 ? 0 : clamped / totalHeightMm;
    this.overlayCenter = newCenter;
    // Clear any prior custom viewBox so dynamic overlay sizing takes effect immediately
    this._customViewBox = null;
    this.regionZoomActive = false;
    // Suppress auto width adjustment when moving center; keep zoom constant
    this._prevOverlayCenter = this.overlayCenter;
    // Trigger adaptive zoom after center change
    this._triggerAdaptiveZoom();
    this.requestUpdate();
    this._persist();
    this._userAdjustingCenter = false;
  }

  private _onOverlayWidth(e: Event) {
    this._userAdjustingWidth = true;
    const sliderSteps = 10000;
    const raw = Number((e.target as HTMLInputElement).value); // 0..sliderSteps
    const t = Math.min(sliderSteps, Math.max(0, raw)) / sliderSteps; // normalized 0..1
    const maxWidthMm = this._geometryMaxWidthMm();
    const minWidthMm = this.units === "mm" ? 0.001 : 0.0001 * 25.4;
    const width = minWidthMm + (maxWidthMm - minWidthMm) * t;
    this.overlayTargetWidth = width;
    // Clear custom viewBox so render recomputes scaling immediately
    this._customViewBox = null;
    this.regionZoomActive = false;
    this.requestUpdate();
    this._persist();
    this._userAdjustingWidth = false;
    // Width manual adjustment should cancel any active adaptive modes
    this._activeShrink = false;
    this._activeExpand = false;
    this.adaptiveZoomMode = "idle";
  }
  private _geometryMaxWidthMm(): number {
    const maxA = this._geometryA.getMaxWidth();
    const maxB = this._geometryB.getMaxWidth();
    return Math.max(maxA, maxB) * 1.1; // +10%
  }

  private _onStrokePxMin(e: Event) {
    const raw = Number((e.target as HTMLInputElement).value);
    this.strokePxMin = Math.max(1, Math.min(500, raw));
    this.requestUpdate();
    this._persist();
  }

  // fine slider handlers removed

  // Derive overlayCenter & overlayTargetWidth from current custom viewBox after mouse interactions
  private _syncOverlayFromViewBox(
    persist: boolean = true,
    fromWheel: boolean = false
  ) {
    if (!this._customViewBox) return;
    const computedA = this._geometryA.compute();
    const computedB = this._geometryB.compute();
    const totalHeightA = this._geometryA.getTotalHeight();
    const totalHeightB = this._geometryB.getTotalHeight();
    const totalHeight = Math.max(totalHeightA, totalHeightB);
    const vb = this._customViewBox;
    // Raw mode: viewBox width & height already equal content width & height; no margins.
    if (this.overlayMode && !fromWheel && !this._userAdjustingWidth) {
      // Only expand (never shrink) when not wheel-derived and not user slider adjusting.
      if (this.overlayTargetWidth == null || vb.w > this.overlayTargetWidth) {
        this.overlayTargetWidth = vb.w;
      }
    }
    const centerY = vb.y + vb.h / 2;
    let newCenter = totalHeight > 0 ? centerY / totalHeight : 0;
    if (newCenter < 0) newCenter = 0;
    else if (newCenter > 1) newCenter = 1;
    // Allow snapping to true apex
    if (newCenter < 0.001) newCenter = 0;
    const prevCenter = this.overlayCenter;
    this.overlayCenter = newCenter;
    this._autoExpandTargetWidthAtCenter(
      computedA,
      computedB,
      totalHeight,
      prevCenter
    );
    this._prevOverlayCenter = this.overlayCenter;
    this.requestUpdate();
    if (persist) this._persist();
  }

  // Ensure overlayTargetWidth >= actual width at current center line (never auto-shrinks)
  private _autoExpandTargetWidthAtCenter(
    preCompA?: ComputedSegment[],
    preCompB?: ComputedSegment[],
    totalHeightOverride?: number,
    prevCenter?: number
  ) {
    if (!this.overlayMode) return;
    // Directional gating: only expand when moving upward (overlayCenter increases)
    if (prevCenter !== undefined && this.overlayCenter <= prevCenter) return;
    // Skip auto expansion very near apex to avoid jitter (threshold 2% of height)
    if (this.overlayCenter < 0.02) return;
    const computedA = preCompA ?? this._computedA;
    const computedB = preCompB ?? this._computedB;
    const totalHeight =
      totalHeightOverride ??
      Math.max(
        computedA.length ? computedA[computedA.length - 1].endY : 0,
        computedB.length ? computedB[computedB.length - 1].endY : 0
      );
    const centerY = this.overlayCenter * totalHeight;
    let widthA = this._widthAtY(computedA, centerY);
    let widthB = this._widthAtY(computedB, centerY);
    let centerWidth = Math.max(widthA, widthB);
    if (centerWidth < 1e-6) {
      // fallback small offset upward
      const epsilonY = Math.min(totalHeight, centerY + 1e-3);
      widthA = this._widthAtY(computedA, epsilonY);
      widthB = this._widthAtY(computedB, epsilonY);
      centerWidth = Math.max(widthA, widthB);
    }
    const currentTarget = this.overlayTargetWidth ?? 0;
    // Only expand if center width exceeds current target by more than 1%
    if (centerWidth > currentTarget * 1.01) {
      // Add slight 2% headroom so it's not touching edges
      this.overlayTargetWidth = centerWidth * 1.02;
      this._customViewBox = null;
      this.regionZoomActive = false;
    }
  }

  // Adaptive zoom logic invoked after overlayCenter changes via sliders / inputs.
  private _triggerAdaptiveZoom() {
    if (!this.overlayMode) return;
    if (this._userAdjustingWidth) return; // do not fight manual width adjustments
    // Recompute geometries for sampling
    const compA = this._computedA;
    const compB = this._computedB;
    const totalHeight = Math.max(
      compA.length ? compA[compA.length - 1].endY : 0,
      compB.length ? compB[compB.length - 1].endY : 0
    );
    if (totalHeight <= 0) return;
    const centerY = this.overlayCenter * totalHeight;
    let wA = this._widthAtY(compA, centerY);
    let wB = this._widthAtY(compB, centerY);
    let sampled = Math.max(wA, wB);
    if (sampled < 1e-6) sampled = 0.02; // minimal width near apex for logic stability
    // Ensure overlayTargetWidth initialized
    if (this.overlayTargetWidth == null) {
      this.overlayTargetWidth = sampled * 1.05;
      this.adaptiveZoomMode = "expand";
      this._activeExpand = true;
      this.requestUpdate();
      return;
    }
    const current = this.overlayTargetWidth;
    // Hysteresis thresholds
    const expandTrigger = 1.01; // sampled exceeds current by >1%
    const expandExit = 1.005; // exit expand when within 0.5%
    const shrinkTriggerRatio = 0.3; // sampled < 30% of view width starts shrink
    const shrinkExitRatio = 0.38; // exit shrink once sampled >= 38% of view

    const ratioSampleToView = sampled / current; // <1 means sampled narrower than view

    let mode: "idle" | "expand" | "shrink" = "idle";
    // Expansion logic
    if (this._activeExpand || sampled > current * expandTrigger) {
      if (sampled > current * expandTrigger || this._activeExpand) {
        if (sampled > current * expandExit) {
          // Continue expansion with smoothing
          const target = sampled * 1.03; // headroom
          const newWidth = current + (target - current) * 0.25; // 25% easing
          this.overlayTargetWidth = newWidth;
          mode = "expand";
          this._activeExpand = sampled / this.overlayTargetWidth < expandExit; // keep active until width catches up
        } else {
          // within exit band
          this._activeExpand = false;
        }
      }
    }
    // Shrink logic (only if not expanding this tick)
    if (
      mode === "idle" &&
      (this._activeShrink || ratioSampleToView < shrinkTriggerRatio)
    ) {
      if (ratioSampleToView < shrinkTriggerRatio || this._activeShrink) {
        if (ratioSampleToView < shrinkExitRatio) {
          const target = sampled * 1.25; // keep ~25% view margin around sampled width
          // Prevent overshrink (do not go below minimal width threshold)
          const minWidth = this.units === "mm" ? 0.001 : 0.0001 * 25.4;
          let newWidth = current + (target - current) * 0.2; // gentle easing
          if (newWidth < sampled * 1.15) {
            newWidth = sampled * 1.15; // ensure baseline margin
          }
          if (newWidth < minWidth) newWidth = minWidth;
          this.overlayTargetWidth = newWidth;
          mode = "shrink";
          this._activeShrink =
            sampled / this.overlayTargetWidth < shrinkExitRatio; // remain active until ratio rises above exit
        } else {
          this._activeShrink = false;
        }
      }
    }
    this.adaptiveZoomMode = mode;
    if (mode !== "idle") {
      // Cancel custom viewBox so raw overlay width takes effect
      this._customViewBox = null;
      this.regionZoomActive = false;
      this.requestUpdate();
      this._persist();
    }
  }
  // Dynamic viewport width helper (sampled + max(sampled*0.4,0.4)) used in new auto width mode.
  private _dynamicViewportWidth(sampled: number): number {
    const added = Math.max(sampled * 0.4, 0.4);
    const minW = this.units === "mm" ? 0.01 : 0.01 * 25.4;
    return Math.max(minW, sampled + added);
  }
  private _logSampledWidth() {
    const compA = this._computedA;
    const compB = this._computedB;
    const totalHeight = Math.max(
      compA.length ? compA[compA.length - 1].endY : 0,
      compB.length ? compB[compB.length - 1].endY : 0
    );
    const apexEpsilon =
      totalHeight > 0 ? Math.min(totalHeight * 0.0005, 0.001) : 0.001;
    const centerY = this.overlayCenter * totalHeight;
    const sampleY = centerY < apexEpsilon * 4 ? apexEpsilon : centerY;
    const wA = this._widthAtY(compA, sampleY);
    const wB = this._widthAtY(compB, sampleY);
    const sampled = Math.max(wA, wB);
    const dyn = this._dynamicViewportWidth(sampled);
    console.log(
      `[Geom] sampled ${sampled.toFixed(5)}mm centerY=${centerY.toFixed(
        5
      )} viewport=${dyn.toFixed(5)}mm`
    );
  }

  // Double-click zoom handlers
  private _onSvgDblClick(e: MouseEvent) {
    const svgEl = e.currentTarget as SVGSVGElement;
    const vb = svgEl.viewBox.baseVal;
    const pt = this._svgPoint(svgEl, e);
    // Map clicked Y (pt.y) to absolute height fraction (since geometry group is flipped visually).
    // pt.y is in SVG coordinate space with apex at y=0 increasing upward.
    const computedA = this._computedA;
    const computedB = this._computedB;
    const totalHeight = Math.max(
      computedA.length ? computedA[computedA.length - 1].endY : 0,
      computedB.length ? computedB[computedB.length - 1].endY : 0
    );
    if (totalHeight > 0) {
      let frac = pt.y / totalHeight;
      if (frac < 0) frac = 0;
      if (frac > 1) frac = 1;
      this.overlayCenter = frac;
      // Clear custom viewBox so slider reposition takes effect if not zooming
    }
    if (!this.showProfile) {
      const zoomFactor = 0.35; // zoom in to 35% of current view
      this._applyZoomAtPoint(pt.x, pt.y, zoomFactor, vb, svgEl, false);
    }
    this._persist();
  }
  private _onSvgShiftDblClick(e: MouseEvent) {
    console.log("[Geom] shift dblclick svg", "client", e.clientX, e.clientY);
    const svgEl = e.currentTarget as SVGSVGElement;
    const vb = svgEl.viewBox.baseVal;
    const pt = this._svgPoint(svgEl, e);
    if (!this.showProfile) {
      const outFactor = 1 / 0.35; // zoom out inverse
      this._applyZoomAtPoint(pt.x, pt.y, outFactor, vb, svgEl, true);
    }
  }
  // Touch/pointer double-tap support
  private _onPointerDownTap(e: PointerEvent) {
    // Only handle primary pointer (avoid multi-finger) and touch or pen types
    if (e.pointerType !== "touch" && e.pointerType !== "pen") return;
    const now = performance.now();
    const svgEl = this.renderRoot.querySelector(
      ".svg-wrap svg"
    ) as SVGSVGElement | null;
    if (!svgEl) return;
    const pt = this._svgPoint(svgEl, e as any);
    const delta = now - this._lastTapTime;
    this._lastTapTime = now;
    if (delta < 320 && this._pendingTap) {
      // Double tap detected
      this._pendingTap = null;
      // Synthesize a MouseEvent-like object for existing handler
      const fake = new MouseEvent("dblclick", {
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: true,
        cancelable: true,
      });
      // Update overlayCenter similar to _onSvgDblClick but skip zoom if two-finger? (single finger only here)
      this._onSvgDblClick(fake);
    } else {
      this._pendingTap = { x: pt.x, y: pt.y };
      // Single tap: set overlayCenter immediately (without zoom) for quicker feedback
      const computedA = this._computedA;
      const computedB = this._computedB;
      const totalHeight = Math.max(
        computedA.length ? computedA[computedA.length - 1].endY : 0,
        computedB.length ? computedB[computedB.length - 1].endY : 0
      );
      if (totalHeight > 0) {
        let frac = pt.y / totalHeight;
        if (frac < 0) frac = 0;
        if (frac > 1) frac = 1;
        this.overlayCenter = frac;
        this.requestUpdate();
        this._persist();
      }
      // Clear after timeout if no second tap
      setTimeout(() => {
        if (this._pendingTap && performance.now() - this._lastTapTime > 320) {
          this._pendingTap = null;
        }
      }, 340);
    }
  }
  private _applyZoomAtPoint(
    cx: number,
    cy: number,
    factor: number,
    vb: SVGRect,
    svgEl: SVGSVGElement,
    isOut: boolean
  ) {
    // base viewBox reference
    if (!this._baseViewBox) {
      this._baseViewBox = {
        x: vb.x,
        y: vb.y,
        w: vb.width,
        h: vb.height,
      };
    }
    let newW = vb.width * factor;
    let newH = vb.height * factor;
    // Absolute minimum zoom target: viewport width 0.0254mm (0.001")
    const absoluteMinW = 0.0254;
    if (!isOut && newW < absoluteMinW) {
      // Preserve aspect ratio by same factor on height
      const ratio = absoluteMinW / newW;
      newW = absoluteMinW;
      newH = newH * ratio;
    }
    // Prevent zooming out beyond base extents
    if (isOut && (newW >= this._baseViewBox.w || newH >= this._baseViewBox.h)) {
      this._customViewBox = null;
      this.regionZoomActive = false;
      this.requestUpdate();
      return;
    }
    const nx = cx - newW / 2;
    const ny = cy - newH / 2;
    this._customViewBox = { x: nx, y: ny, w: newW, h: newH };
    this.regionZoomActive = true;
    // Wheel-based sync: do not expand overlayTargetWidth, and avoid persisting every tick.
    this._syncOverlayFromViewBox(false, true);
    this.requestUpdate();
  }
  private _resetZoom() {
    console.log("[Geom] reset zoom");
    const computed = this._computeWithCurrentSegments();
    const totalHeight = computed.length
      ? computed[computed.length - 1].endY
      : 5;
    const maxWidth = computed.length
      ? computed[computed.length - 1].endWidth
      : 2;
    const viewHeight = totalHeight / this.zoom;
    const viewWidth = maxWidth / this.zoom;
    const marginX = viewWidth * 0.15;
    const marginY = viewHeight * 0.05;
    const vbX = -viewWidth / 2 - marginX;
    const vbY = 0;
    const vbW = viewWidth + marginX * 2;
    const vbH = viewHeight + marginY;
    this._customViewBox = { x: vbX, y: vbY, w: vbW, h: vbH };
    this._baseViewBox = { x: vbX, y: vbY, w: vbW, h: vbH };
    this.regionZoomActive = true;
    this.requestUpdate();
  }
  private _svgPoint(
    svgEl: SVGSVGElement,
    e: MouseEvent | PointerEvent
  ): { x: number; y: number } {
    const rect = svgEl.getBoundingClientRect();
    const scaleX = svgEl.viewBox.baseVal.width / rect.width;
    const scaleY = svgEl.viewBox.baseVal.height / rect.height;
    let x = svgEl.viewBox.baseVal.x + (e.clientX - rect.left) * scaleX;
    let y = svgEl.viewBox.baseVal.y + (e.clientY - rect.top) * scaleY;
    // Because geometry group is flipped (translate + scale(1,-1)), apex at visual bottom maps to y=0 in local coords.
    // Users clicking near visual apex (bottom center) should target y=0 precisely.
    const visualBottomTolerance = rect.height * 0.03; // 3% height threshold
    const distFromBottom = rect.bottom - e.clientY;
    if (distFromBottom <= visualBottomTolerance) {
      // Snap y to 0 (apex) within tolerance
      y = 0;
    }
    // Center snapping horizontally for very near apex clicks (improve precision)
    const distFromCenterX = Math.abs(e.clientX - (rect.left + rect.width / 2));
    if (y === 0 && distFromCenterX <= rect.width * 0.03) {
      x = 0;
    }
    return { x, y };
  }

  // Wheel now only adjusts width slider (overlayTargetWidth) linearly; no direct viewBox manipulation.
  private _onWheel(e: WheelEvent) {
    e.preventDefault();
    if (!this.overlayMode) return; // if not in overlay mode, ignore
    if (this.showProfile) return; // no zoom/width change in full profile view
    const maxWidthMm = this._geometryMaxWidthMm();
    const minWidthMm = this.units === "mm" ? 0.001 : 0.0001 * 25.4;
    let current = this.overlayTargetWidth ?? maxWidthMm;
    // Determine delta: use sign of wheel and apply a fraction of current span.
    const direction = e.deltaY > 0 ? 1 : -1; // out vs in
    const baseFrac = e.altKey ? 0.01 : e.shiftKey ? 0.15 : 0.05; // same modifiers as before
    // Scale delta relative to full range to feel consistent across widths.
    const range = maxWidthMm - minWidthMm;
    const rawSteps = Math.min(
      10,
      Math.max(1, Math.round(Math.abs(e.deltaY) / 100))
    );
    const delta = range * baseFrac * rawSteps * direction * -1; // negative wheel up (zoom in) reduces width
    let next = current + delta;
    if (next < minWidthMm) next = minWidthMm;
    if (next > maxWidthMm) next = maxWidthMm;
    console.log(`[Geom] wheel width change`, {
      prev: current,
      next,
      units: this.units,
      deltaY: e.deltaY,
      steps: rawSteps,
      modifier: baseFrac,
    });
    // Apply without marking as user slider drag; treat as programmatic but human initiated.
    this.overlayTargetWidth = next;
    this._customViewBox = null; // force recompute via render path
    this.regionZoomActive = true;
    this.requestUpdate();
  }

  // Generic logging handlers for overlay diagnostics
  private _logEvent(prefix: string, e: Event) {
    if (e instanceof MouseEvent) {
      console.log(
        `[Geom] ${prefix}`,
        "type",
        e.type,
        "btn",
        e.button,
        "client",
        e.clientX,
        e.clientY,
        "shift",
        e.shiftKey
      );
    } else {
      console.log(`[Geom] ${prefix}`, "type", e.type);
    }
  }

  // Drag panning state & handlers
  private _onPanStart(e: MouseEvent) {
    if (e.button !== 0) return; // only left button
    const svgEl = this.renderRoot.querySelector(
      ".svg-wrap svg"
    ) as SVGSVGElement | null;
    if (!svgEl) return;
    const vb = svgEl.viewBox.baseVal;
    this._dragPanning = true;
    // Capture starting viewBox including width/height so scaling remains consistent during drag.
    this._dragStart = {
      x: e.clientX,
      y: e.clientY,
      vbX: vb.x,
      vbY: vb.y,
      vbW: vb.width,
      vbH: vb.height,
    };
    if (!this._baseViewBox) {
      this._baseViewBox = { x: vb.x, y: vb.y, w: vb.width, h: vb.height };
    }
    if (!this._customViewBox) {
      this._customViewBox = { x: vb.x, y: vb.y, w: vb.width, h: vb.height };
    }
    this.regionZoomActive = true;
    window.addEventListener("mousemove", this._onPanMoveBound);
    window.addEventListener("mouseup", this._onPanEndBound);
    this._logEvent("pan-start", e);
    e.preventDefault();
  }
  private _onPanMove(e: MouseEvent) {
    if (!this._dragPanning || !this._dragStart) return;
    const svgEl = this.renderRoot.querySelector(
      ".svg-wrap svg"
    ) as SVGSVGElement | null;
    if (!svgEl) return;
    // Unified pixel->SVG scale: SVG uses preserveAspectRatio meet, uniform scale = min(widthRatio,heightRatio)
    const start = this._dragStart;
    const rect = svgEl.getBoundingClientRect();
    // Ratios from pixels to SVG units for each axis separately
    const ratioX = start.vbW / rect.width;
    const ratioY = start.vbH / rect.height;
    // Uniform scaling factor (world units per pixel) under 'meet' is the larger of the two ratios? Actually:
    // meet chooses a uniform pixel scale S so that vbW*S <= rect.width and vbH*S <= rect.height, with one axis exactly fitting.
    // Therefore worldUnitsPerPixel = vbW/rect.width when width constrains, or vbH/rect.height when height constrains.
    // We pick the MAX(ratioX, ratioY) to reflect the constraining axis's worldUnitsPerPixel uniformly.
    const worldUnitsPerPixel = Math.max(ratioX, ratioY);
    const dx = (e.clientX - start.x) * worldUnitsPerPixel;
    const dy = (e.clientY - start.y) * worldUnitsPerPixel;
    const nx = start.vbX - dx;
    const ny = start.vbY - dy;
    this._customViewBox = { x: nx, y: ny, w: start.vbW, h: start.vbH };
    this._syncOverlayFromViewBox();
    this.requestUpdate();
    if (e.buttons === 0) this._onPanEnd(e); // lost mouseup safety
  }
  private _onPanEnd(e: MouseEvent) {
    if (!this._dragPanning) return;
    this._dragPanning = false;
    this._dragStart = null;
    window.removeEventListener("mousemove", this._onPanMoveBound);
    window.removeEventListener("mouseup", this._onPanEndBound);
    this._logEvent("pan-end", e);
  }
  private _onPanMoveBound = (e: MouseEvent) => this._onPanMove(e);
  private _onPanEndBound = (e: MouseEvent) => this._onPanEnd(e);

  // Separate render method for width (target) slider to simplify main template
  private _renderWidthSlider(combinedWidth: number) {
    const maxWidthMm = this._geometryMaxWidthMm();
    const minWidthMm = this.units === "mm" ? 0.001 : 0.0001 * 25.4;
    let widthVal = this.overlayTargetWidth ?? maxWidthMm;
    widthVal = Math.max(minWidthMm, Math.min(maxWidthMm, widthVal));
    const t = (widthVal - minWidthMm) / (maxWidthMm - minWidthMm);
    const sliderSteps = 10000; // high-resolution steps
    const sliderWidthVal = Math.round(t * sliderSteps);
    const digits = this._displayDigits();
    const maxLabelDisp = (
      this.units === "mm" ? maxWidthMm : maxWidthMm / 25.4
    ).toFixed(digits);
    const minLabelDisp = (
      this.units === "mm" ? minWidthMm : minWidthMm / 25.4
    ).toFixed(digits);
    return html`<div
      class="width-slider-box"
      style="margin-top:.5rem;display:flex;flex-direction:column;gap:.25rem;"
    >
      <div
        style="display:flex;justify-content:space-between;font-size:.55rem;opacity:.7;"
      >
        <span>${minLabelDisp} ${this.units}</span>
        <span>Target Width</span>
        <span>${maxLabelDisp} ${this.units}</span>
        <div
          style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap;margin-top:.25rem;"
        >
          <input
            type="text"
            placeholder="Notation B (e.g. in=>10dps-1h,0.15w@2h,0.22w@4cp)"
            style="flex:1;min-width:14rem;font-size:.825rem;padding:.375rem .6rem;border:1px solid var(--vsa-border);border-radius:4px;"
            .value=${this.notationB}
            @input=${(e: Event) => {
              this.notationB = (e.target as HTMLInputElement).value;
            }}
          />
          <button
            style="font-size:.55rem;padding:.3rem .6rem;border:1px solid var(--vsa-border);background:var(--vsa-input-bg);color:var(--sl-color-neutral-900);border-radius:4px;cursor:pointer;"
            @click=${() => {
              const res = parseCrossSectionNotation(this.notationB, this.units);
              this.notationBWarnings = res.warnings;
              if (res.segments.length) {
                this.segmentsB = res.segments.map((s) => ({
                  angleType: s.angleType,
                  angleValue: s.angleValue,
                  travelType: s.travelType,
                  travelValue: s.travelValue,
                }));
                this._customViewBox = null;
                this.overlayTargetWidth = null;
                this.requestUpdate();
                this._persist();
                if (res.notationUnits && res.notationUnits !== this.units) {
                  this.units = res.notationUnits;
                }
              }
            }}
          >
            Import B
          </button>
        </div>
        ${this.notationBWarnings.length
          ? html`<div
              style="font-size:.5rem;color:var(--vsa-warning-text-color);line-height:1.2;"
            >
              ${this.notationBWarnings.map((w) => html`<div>⚠ ${w}</div>`)}
            </div>`
          : ""}
      </div>
      <div style="display:flex;align-items:center;gap:.4rem;">
        <input
          type="range"
          min="0"
          max="${sliderSteps}"
          step="1"
          .value=${String(sliderWidthVal)}
          @input=${this._onOverlayWidth}
          style="flex:1;"
        />
        <input
          type="number"
          style="width:6.5rem;font-size:.55rem;padding:.2rem;"
          .value=${(this.units === "mm" ? widthVal : widthVal / 25.4).toFixed(
            digits
          )}
          @change=${(e: Event) => {
            const raw = Number((e.target as HTMLInputElement).value);
            if (!isFinite(raw)) return;
            const valMm = this.units === "mm" ? raw : raw * 25.4;
            const clamped = Math.max(minWidthMm, Math.min(maxWidthMm, valMm));
            this.overlayTargetWidth = clamped;
            this._customViewBox = null;
            this.requestUpdate();
          }}
        />
      </div>
      <div style="font-size:.6rem;opacity:.75;text-align:center;">
        Width: ${this._formatLen(this.overlayTargetWidth ?? widthVal)}
        ${this.units}
      </div>
    </div>`;
  }

  render() {
    // Use GeometryModel instances for clean computation
    const computedA = this._geometryA.compute();
    const computedB = this._geometryB.compute();

    console.log("Render - computedA:", computedA);
    console.log("Render - computedB:", computedB);

    const pathA = this._path(computedA);
    const pathB = this._path(computedB);

    console.log("Render - pathA:", pathA);
    console.log("Render - pathB:", pathB);
    const segmentPathsA = this._segmentPaths(computedA);
    const segmentPathsB = this._segmentPaths(computedB);
    const totalHeightA = this._geometryA.getTotalHeight();
    const totalHeightB = this._geometryB.getTotalHeight();
    const totalHeight = Math.max(totalHeightA, totalHeightB);
    const maxWidthA = computedA.length
      ? computedA[computedA.length - 1].endWidth
      : 2;
    const maxWidthB = computedB.length
      ? computedB[computedB.length - 1].endWidth
      : 2;
    const gap = this.overlayMode ? 0 : 0.4;
    const combinedWidth = this.overlayMode
      ? Math.max(maxWidthA, maxWidthB)
      : maxWidthA + gap + maxWidthB;
    // (Removed dynamic geometric stroke sizing – we now enforce a constant pixel stroke width.)
    // Raw mode: no artificial horizontal padding
    const marginFracX = 0;
    // Simplified scaling: if overlayMode use overlayTargetWidth to derive zoom, else use user zoom.
    let centerY = this.overlayCenter * totalHeight; // 0=apex always

    // Apex epsilon sampling: if extremely close to apex, use a tiny epsilon height for width sampling to avoid zero-width locking
    const apexEpsilon =
      totalHeight > 0 ? Math.min(totalHeight * 0.0005, 0.001) : 0.001; // adaptive epsilon capped at 0.001mm
    if (
      !this.showProfile &&
      this.overlayMode &&
      this.overlayTargetWidth == null
    ) {
      const sampleY = centerY < apexEpsilon * 4 ? apexEpsilon : centerY; // sample slightly above apex when very near
      const sampleWidthA = this._widthAtY(computedA, sampleY);
      const sampleWidthB = this._widthAtY(computedB, sampleY);
      const centerWidth = Math.max(
        sampleWidthA,
        sampleWidthB,
        Math.max(maxWidthA, maxWidthB)
      );
      this.overlayTargetWidth = centerWidth;
    }
    // Dynamic width mode: compute width at current center and apply formula sampled + max(sampled*0.4,0.4)
    // apexEpsilon already declared earlier in this block; reuse it for sampling
    const sampleY = centerY < apexEpsilon * 4 ? apexEpsilon : centerY;
    let viewContentWidth: number;
    if (this.showProfile) {
      viewContentWidth = combinedWidth; // full extents
    } else {
      const sampleWidthA = this._widthAtY(computedA, sampleY);
      const sampleWidthB = this._widthAtY(computedB, sampleY);
      const crossWidth = Math.max(sampleWidthA, sampleWidthB, 0.00001);
      viewContentWidth = this._dynamicViewportWidth(crossWidth);
      this.overlayTargetWidth = viewContentWidth; // keep adaptive behavior
    }
    // Maintain aspect ratio by using current rendered viewport dimensions if available.
    const hostEl = this.renderRoot.querySelector(
      ".svg-wrap"
    ) as HTMLElement | null;
    let aspect = 1; // fallback square
    if (hostEl) {
      const rect = hostEl.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) aspect = rect.height / rect.width;
    }
    const viewContentHeight = viewContentWidth * aspect;

    // Apply 5x zoom in apex macro mode to make the 3mm section fill the viewport
    let effectiveViewContentHeight = viewContentHeight;
    if (this.apexMacro && !this.showProfile) {
      effectiveViewContentHeight = viewContentHeight / 5; // 5x zoom
    }

    const vbX = this.showProfile ? -combinedWidth / 2 : -viewContentWidth / 2; // full width when profile
    const geomWidthCurrent = combinedWidth; // geometry extent width (overlay or side-by-side)
    const centerLockActive = true; // always center Y in dynamic width mode
    let vbY: number;
    if (this.showProfile) {
      vbY = 0; // show entire height
    } else if (centerLockActive) {
      // Geometry group is flipped via translate(0,totalHeight) scale(1,-1), so visual Y for logical centerY is totalHeight - centerY.
      const visualCenterY = totalHeight - centerY;
      vbY = visualCenterY - effectiveViewContentHeight / 2;
      // Clamp to keep viewBox within 0..totalHeight - vbH (visual coordinate space: 0=spine/top, totalHeight=apex/bottom)
      if (vbY < 0) vbY = 0;
      const maxY = Math.max(0, totalHeight - effectiveViewContentHeight);
      if (vbY > maxY) vbY = maxY;
    } else {
      // Fallback (unused in dynamic mode): anchor at top (spine) so apex always remains visible when zoomed out.
      vbY = 0;
    }
    const vbW = this.showProfile ? combinedWidth : viewContentWidth;
    const vbH = this.showProfile ? totalHeight : effectiveViewContentHeight;
    // Base dynamic font size using smaller of width/height; will be constrained per label
    const baseLabelFont = Math.min(
      Math.max(Math.min(vbW, vbH) * 0.06, 0.18),
      1.4
    );
    // Constant screen-space strokes: specify pixel units directly so thickness does not scale with viewBox zoom.
    // Allow user to toggle between normal and thin strokes.
    const STROKE_PX = this.thinStrokes ? 0.375 : 5; // visual thickness in CSS px (thin = 25% less than 0.5)
    // (Legacy scale removed) We'll compute horizontal tick spacing later for bottom ruler
    const unitFactor = this.units === "mm" ? 1 : 1 / 25.4; // convert mm->in for display
    const unitLabel = this.units;
    return html` <div class="page ${this.fullScreen ? "full-screen" : ""}">
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
            @input=${(e: Event) => {
              this.notationA = (e.target as HTMLInputElement).value;
            }}
          />
          <button
            style="font-size:.55rem;padding:.3rem .6rem;border:1px solid var(--vsa-border);background:var(--vsa-input-bg);color:var(--sl-color-neutral-900);border-radius:4px;cursor:pointer;"
            @click=${() => {
              const res = parseCrossSectionNotation(this.notationA, this.units);
              this.notationAWarnings = res.warnings;
              if (res.segments.length) {
                this.segments = res.segments.map((s) => ({
                  angleType: s.angleType,
                  angleValue: s.angleValue,
                  travelType: s.travelType,
                  travelValue: s.travelValue,
                }));
                this._customViewBox = null;
                this.overlayTargetWidth = null;
                this.requestUpdate();
                this._persist();
                // auto switch units if explicit unit differs
                if (res.notationUnits && res.notationUnits !== this.units) {
                  this.units = res.notationUnits;
                }
              }
            }}
          >
            Import A
          </button>
          <input
            type="text"
            placeholder="Notation B (e.g. in=>10dps-1h,0.15w@2h,0.22w@4cp)"
            style="flex:1;min-width:14rem;font-size:.825rem;padding:.375rem .6rem;border:1px solid var(--vsa-border);border-radius:4px;"
            .value=${this.notationB}
            @input=${(e: Event) => {
              this.notationB = (e.target as HTMLInputElement).value;
            }}
          />
          <button
            style="font-size:.55rem;padding:.3rem .6rem;border:1px solid var(--vsa-border);background:var(--vsa-input-bg);color:var(--sl-color-neutral-900);border-radius:4px;cursor:pointer;"
            @click=${() => {
              const res = parseCrossSectionNotation(this.notationB, this.units);
              this.notationBWarnings = res.warnings;
              if (res.segments.length) {
                this.segmentsB = res.segments.map((s) => ({
                  angleType: s.angleType,
                  angleValue: s.angleValue,
                  travelType: s.travelType,
                  travelValue: s.travelValue,
                }));
                this._customViewBox = null;
                this.overlayTargetWidth = null;
                this.requestUpdate();
                this._persist();
                if (res.notationUnits && res.notationUnits !== this.units) {
                  this.units = res.notationUnits;
                }
              }
            }}
          >
            Import B
          </button>
        </div>
        ${this.notationAWarnings.length
          ? html`<div
              style="font-size:.5rem;color:var(--vsa-warning-text-color);line-height:1.2;"
            >
              ${this.notationAWarnings.map((w) => html`<div>⚠ ${w}</div>`)}
            </div>`
          : ""}
        ${this.notationBWarnings.length
          ? html`<div
              style="font-size:.5rem;color:var(--vsa-warning-text-color);line-height:1.2;"
            >
              ${this.notationBWarnings.map((w) => html`<div>⚠ ${w}</div>`)}
            </div>`
          : ""}
      </div>
      ${this._renderNotationHelp()}
      <div class="controls-bar">
        <button
          style="font-size:.55rem;padding:.3rem .6rem;border:1px solid var(--vsa-border);background:var(--vsa-input-bg);color:var(--sl-color-neutral-900);border-radius:4px;cursor:pointer;"
          @click=${() => {
            // Load example geometry
            this.notationA = "mm=>15dps-2h,0.3w@3h,0.5w@5cp,50H";
            this.notationB = "mm=>12dps-2h,0.25w@3h,0.45w@5cp,50H";
            const resA = parseCrossSectionNotation(this.notationA, this.units);
            const resB = parseCrossSectionNotation(this.notationB, this.units);
            console.log("Example - ResA segments:", resA.segments);
            console.log("Example - ResB segments:", resB.segments);
            if (resA.segments.length) {
              this.segments = resA.segments.map((s) => ({
                angleType: s.angleType,
                angleValue: s.angleValue,
                travelType: s.travelType,
                travelValue: s.travelValue,
              }));
              console.log("Example - Set segments A:", this.segments);
              console.log(
                "Example - GeometryA computed:",
                this._geometryA.compute()
              );
            }
            if (resB.segments.length) {
              this.segmentsB = resB.segments.map((s) => ({
                angleType: s.angleType,
                angleValue: s.angleValue,
                travelType: s.travelType,
                travelValue: s.travelValue,
              }));
              console.log("Example - Set segments B:", this.segmentsB);
              console.log(
                "Example - GeometryB computed:",
                this._geometryB.compute()
              );
            }
            this._customViewBox = null;
            this.overlayTargetWidth = null;
            this.requestUpdate();
            this._persist();
          }}
        >
          Load Example
        </button>
        <label style="display:flex;align-items:center;gap:.25rem">
          <span style="font-size:.55rem">Units</span>
          <select
            @change=${this._changeUnits}
            style="font-size:.6rem;padding:.15rem .3rem;border-radius:4px;background:var(--vsa-input-bg);border:1px solid var(--vsa-border);color:var(--sl-color-neutral-900);"
          >
            <option value="mm" ?selected=${this.units === "mm"}>mm</option>
            <option value="in" ?selected=${this.units === "in"}>in</option>
          </select>
        </label>
        <label
          style="display:flex;align-items:center;gap:.3rem;font-size:.55rem;"
        >
          <input
            type="checkbox"
            .checked=${this.fullScreen}
            @change=${() => this._toggleFullScreen()}
          />
          Fullscreen
        </label>
        <label
          style="display:flex;align-items:center;gap:.3rem;font-size:.55rem;"
        >
          <input
            type="checkbox"
            .checked=${this.thinStrokes}
            @change=${() => {
              this.thinStrokes = !this.thinStrokes;
              this._persist();
            }}
          />
          Thin Strokes
        </label>
        <label
          style="display:flex;align-items:center;gap:.3rem;font-size:.55rem;"
        >
          <input
            type="checkbox"
            .checked=${this.showDebug}
            @change=${() => {
              this.showDebug = !this.showDebug;
              this._persist();
            }}
          />
          Debug
        </label>
        <label
          style="display:flex;align-items:center;gap:.3rem;font-size:.55rem;"
        >
          <input
            type="checkbox"
            .checked=${this.apexMacro}
            @change=${() => {
              this.apexMacro = !this.apexMacro;
              this._customViewBox = null; // Clear custom viewBox when switching modes
              this.requestUpdate();
              this._persist();
            }}
          />
          Apex Macro
        </label>
        <label
          style="display:flex;align-items:center;gap:.3rem;font-size:.55rem;"
        >
          <input
            type="checkbox"
            .checked=${this.showProfile}
            @change=${() => {
              this.showProfile = !this.showProfile;
              this._customViewBox = null;
              this.requestUpdate();
              this._persist();
            }}
          />
          Show Profile
        </label>
      </div>
      ${!this.fullScreen
        ? html` <div class="panels">
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
                    ${computedA.map((seg, i) => {
                      const orig = this.segments[i];
                      return html`<tr>
                        <td>${i + 1}</td>
                        <td>${orig.angleValue}</td>
                        <td>${orig.angleType}</td>
                        <td>${orig.travelType}</td>
                        <td>${this._formatLen(orig.travelValue)}</td>
                        <td>${this._formatLen(seg.endWidth)}</td>
                        <td>${this._formatLen(seg.endY)}</td>
                      </tr>`;
                    })}
                    ${computedA.length === 0
                      ? html`<tr>
                          <td colspan="7" style="text-align:center;opacity:.6">
                            No segments
                          </td>
                        </tr>`
                      : ""}
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
                    ${computedB.map((seg, i) => {
                      const orig = this.segmentsB[i];
                      return html`<tr>
                        <td>${i + 1}</td>
                        <td>${orig.angleValue}</td>
                        <td>${orig.angleType}</td>
                        <td>${orig.travelType}</td>
                        <td>${this._formatLen(orig.travelValue)}</td>
                        <td>${this._formatLen(seg.endWidth)}</td>
                        <td>${this._formatLen(seg.endY)}</td>
                      </tr>`;
                    })}
                    ${computedB.length === 0
                      ? html`<tr>
                          <td colspan="7" style="text-align:center;opacity:.6">
                            No segments
                          </td>
                        </tr>`
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>`
        : html``}
      ${this.warning ? html`<div class="warn">${this.warning}</div>` : ""}
      <div
        class="svg-wrap"
        style="${this.fullScreen
          ? "height:calc(100vh - 290px);width:100vw;"
          : ""}"
      >
        <div class="main-flex-row" style="gap:.75rem;">
          <div class="slider-column">
            ${this._renderVerticalSlider(totalHeight)}
          </div>
          <div class="svg-column">
            ${this._renderSvg(
              computedA,
              computedB,
              segmentPathsA,
              segmentPathsB,
              totalHeight,
              maxWidthA,
              maxWidthB,
              STROKE_PX,
              apexEpsilon,
              vbX,
              vbY,
              vbW,
              vbH
            )}
          </div>
        </div>
      </div>
      ${this.showDebug
        ? html`<div style="height:150px;overflow:auto;">
            ${this._renderDebug(apexEpsilon)}
          </div>`
        : ""}
    </div>`;
  }
  private _renderNotationHelp() {
    return html`${!this.fullScreen
      ? html`
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
        `
      : ""}`;
  }
  private _renderVerticalSlider(totalHeight: number) {
    const digits = this._displayDigits();
    const unitLabel = this.units;

    // totalHeight is already truncated to 3mm when apex-macro is enabled
    const centerYGeom = this.overlayCenter * totalHeight;

    const dispHeight = (
      this.units === "mm" ? centerYGeom : centerYGeom / 25.4
    ).toFixed(digits);
    const totalDisp = (
      this.units === "mm" ? totalHeight : totalHeight / 25.4
    ).toFixed(digits);
    const sliderVal = Math.round(
      (totalHeight > 0 ? centerYGeom / totalHeight : 0) * 10000
    );
    return html`<div
      class="vertical-slider-box"
      style="display:flex;flex-direction:column;align-items:center;${this
        .fullScreen
        ? "height:100%;"
        : ""}"
    >
      <span style="font-size:.5rem;opacity:.7;"
        >Height
        (${unitLabel})${this.apexMacro ? " - Apex Macro (0-3mm)" : ""}</span
      >
      <input
        type="range"
        min="0"
        max="10000"
        step="1"
        .value=${String(sliderVal)}
        @input=${(e: Event) => {
          const raw = Number((e.target as HTMLInputElement).value);
          const frac = raw / 10000;
          this.overlayCenter = totalHeight > 0 ? frac : 0;
          this._customViewBox = null;
          this.requestUpdate();
        }}
        style="width:100%;flex:1 1 auto;"
      />
    </div>`;
  }

  private _renderControls() {
    return html``; // controls moved to top bar as checkboxes
  }

  private _renderDebug(apexEpsilon: number) {
    const compA = this._geometryA.compute();
    const compB = this._geometryB.compute();
    const totalHeightLocal = Math.max(
      this._geometryA.getTotalHeight(),
      this._geometryB.getTotalHeight()
    );
    const centerYGeom = this.overlayCenter * totalHeightLocal;
    const sampleY = centerYGeom < apexEpsilon * 4 ? apexEpsilon : centerYGeom;
    const tA = this._geometryA.widthAtY(compA, sampleY);
    const tB = this._geometryB.widthAtY(compB, sampleY);
    const digits = this._displayDigits();
    const unitLabel = this.units;
    const dispHeight = (
      this.units === "mm" ? centerYGeom : centerYGeom / 25.4
    ).toFixed(digits);
    const dispTA = (this.units === "mm" ? tA : tA / 25.4).toFixed(digits);
    const dispTB = (this.units === "mm" ? tB : tB / 25.4).toFixed(digits);
    const strengthA = tA ** 3;
    const strengthB = tB ** 3;
    let ratio: number;
    let stronger: string;
    if (strengthA === 0 && strengthB === 0) {
      ratio = 1;
      stronger = "equal";
    } else if (strengthA >= strengthB) {
      ratio = strengthA / (strengthB === 0 ? Number.EPSILON : strengthB);
      stronger = `A stronger x${ratio.toFixed(3)}`;
    } else {
      ratio = strengthB / (strengthA === 0 ? Number.EPSILON : strengthA);
      stronger = `B stronger x${ratio.toFixed(3)}`;
    }
    const diffPct =
      (Math.abs(strengthA - strengthB) / Math.max(strengthA, strengthB || 1)) *
      100;
    return html`<div
      style="margin-top:.4rem;font-size:.6rem;background:var(--vsa-metrics-bg);padding:.55rem .7rem;border-radius:6px;line-height:1.2;"
    >
      <div style="font-weight:600;margin-bottom:.35rem;">
        Cross Section Metrics
      </div>
      <div>Height from apex: <strong>${dispHeight} ${unitLabel}</strong></div>
      <div>Thickness A: <strong>${dispTA} ${unitLabel}</strong></div>
      <div>Thickness B: <strong>${dispTB} ${unitLabel}</strong></div>
      <div style="margin-top:.35rem;font-weight:600;">
        Strength (thickness^3)
      </div>
      <div>A^3: ${strengthA.toFixed(6)}</div>
      <div>B^3: ${strengthB.toFixed(6)}</div>
      <div>Relative: ${stronger}</div>
      <div>Difference: ${diffPct.toFixed(2)}%</div>
      ${this.notationA || this.notationB
        ? html`<div style="margin-top:.5rem;font-weight:600;">Notation</div>`
        : ""}
      ${this.notationA
        ? html`<div style="opacity:.85;">
            A: <code style="font-size:.55rem;">${this.notationA}</code>
          </div>`
        : ""}
      ${this.notationB
        ? html`<div style="opacity:.85;">
            B: <code style="font-size:.55rem;">${this.notationB}</code>
          </div>`
        : ""}
      ${this.notationAWarnings.length || this.notationBWarnings.length
        ? html`<div style="margin-top:.35rem;font-weight:600;">Warnings</div>`
        : ""}
      ${this.notationAWarnings.map(
        (w) =>
          html`<div style="color:var(--vsa-warning-text-color);">A ⚠ ${w}</div>`
      )}
      ${this.notationBWarnings.map(
        (w) =>
          html`<div style="color:var(--vsa-warning-text-color);">B ⚠ ${w}</div>`
      )}
    </div>`;
  }

  private _renderSvg(
    computedA: ComputedSegment[],
    computedB: ComputedSegment[],
    segmentPathsA: string[],
    segmentPathsB: string[],
    totalHeight: number,
    maxWidthA: number,
    maxWidthB: number,
    STROKE_PX: number,
    apexEpsilon: number,
    vbX: number,
    vbY: number,
    vbW: number,
    vbH: number
  ) {
    const pathA = this._path(computedA);
    const pathB = this._path(computedB);
    const geometryGroup = this.overlayMode
      ? html`
          ${pathA
            ? svg`<path d="${pathA}" fill="none" stroke="var(--vsa-path-a-color)" stroke-width="${STROKE_PX}" vector-effect="non-scaling-stroke"></path>`
            : ""}
          ${pathB
            ? svg`<path d="${pathB}" fill="none" stroke="var(--vsa-path-b-color)" stroke-width="${STROKE_PX}" vector-effect="non-scaling-stroke"></path>`
            : ""}
          ${(() => {
            const boundaryStroke = STROKE_PX * 0.6;
            const strokeDash = `${(STROKE_PX * 0.7).toFixed(0)} ${(
              STROKE_PX * 0.5
            ).toFixed(0)}`;
            const ends = Array.from(
              new Set([
                ...computedA.map((s) => s.endY),
                ...computedB.map((s) => s.endY),
              ])
            ).sort((a, b) => a - b);
            return svg`${ends.map((y) => {
              if (y <= 0 || y >= totalHeight - 1e-9) return "";
              const wA = this._widthAtY(computedA, y);
              const wB = this._widthAtY(computedB, y);
              const w = Math.max(wA, wB);
              const half = w / 2;
              return svg`<line x1="${-half}" y1="${y}" x2="${half}" y2="${y}" stroke="var(--vsa-grid-line-color)" stroke-width="${boundaryStroke}" vector-effect="non-scaling-stroke" stroke-dasharray="${strokeDash}" opacity="0.5" />`;
            })}`;
          })()}
        `
      : html`${(() => {
          const gap = 0.6;
          const shiftA = -(maxWidthA / 2 + gap / 2);
          const shiftB = maxWidthB / 2 + gap / 2;
          const palette = [
            "#ffdd57",
            "#74c0fc",
            "#ffc9c9",
            "#b197fc",
            "#a9e34b",
            "#ffa94d",
            "#ffd8a8",
            "#e599f7",
            "#63e6be",
            "#ff6b6b",
          ];
          return svg`
            <g transform="translate(${shiftA},0)">
              ${segmentPathsA.map(
                (d, i) =>
                  svg`<path d="${d}" fill="${
                    palette[i % palette.length]
                  }" stroke="var(--vsa-stroke-color)" stroke-width="${STROKE_PX}" vector-effect="non-scaling-stroke" opacity="0.95"></path>`
              )}
              ${
                pathA
                  ? svg`<path d="${pathA}" fill="none" stroke="var(--vsa-path-a-color)" stroke-width="${STROKE_PX}" vector-effect="non-scaling-stroke"></path>`
                  : ""
              }
            </g>
            <g transform="translate(${shiftB},0)">
              ${segmentPathsB.map(
                (d, i) =>
                  svg`<path d="${d}" fill="${
                    palette[i % palette.length]
                  }" stroke="var(--vsa-stroke-color)" stroke-width="${STROKE_PX}" vector-effect="non-scaling-stroke" opacity="0.95"></path>`
              )}
              ${
                pathB
                  ? svg`<path d="${pathB}" fill="none" stroke="var(--vsa-path-b-color)" stroke-width="${STROKE_PX}" vector-effect="non-scaling-stroke"></path>`
                  : ""
              }
            </g>`;
        })()}`;

    const centerLine = (() => {
      const centerYGeom = this.overlayCenter * totalHeight;
      const sampleY = centerYGeom < apexEpsilon * 4 ? apexEpsilon : centerYGeom;
      let wA = this._widthAtY(computedA, sampleY);
      let wB = this._widthAtY(computedB, sampleY);
      let coreWidth = Math.max(wA, wB);
      if (coreWidth < 1e-9) coreWidth = 0.02;
      const half = (coreWidth * 1.05) / 2;
      const dashA = (STROKE_PX * 0.6).toFixed(0);
      const dashB = (STROKE_PX * 0.4).toFixed(0);
      return svg`<g class="center-line-group" pointer-events="none">
        <line x1="${-half}" y1="${centerYGeom}" x2="${half}" y2="${centerYGeom}" stroke="var(--vsa-center-line-color)" stroke-width="${STROKE_PX}" vector-effect="non-scaling-stroke" stroke-dasharray="${dashA} ${dashB}" />
      </g>`;
    })();

    return html`${pathA || pathB
      ? svg`<svg viewBox="${
          this._customViewBox ? this._customViewBox.x : vbX
        } ${this._customViewBox ? this._customViewBox.y : vbY} ${
          this._customViewBox ? this._customViewBox.w : vbW
        } ${
          this._customViewBox ? this._customViewBox.h : vbH
        }" preserveAspectRatio="xMidYMin meet">
      <g class="geom" transform="translate(0, ${totalHeight}) scale(1,-1)">
        ${geometryGroup}
        ${centerLine}
      </g>
    </svg>`
      : html`<div class="empty">Add segments to visualize cross section.</div>`}
    ${pathA || pathB ? html`<div class="drag-overlay"></div>` : ""}`;
  }
}

customElements.define("vsa-geometry-builder", VsaGeometryBuilder);

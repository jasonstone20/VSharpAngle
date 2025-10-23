import { LitElement, html, css } from "lit";
import {
  measureAngle,
  sharpmakerElevation,
  sharpmakerRotation,
  passCount,
  edgeRetention,
} from "../utils/math";
import type { SteelSelectedDetail } from "../types";
// Eager import steel table so collapsible section always renders immediately
import "./vsa-steel-table";
import "./vsa-geometry-builder";
import { property } from "lit/decorators.js";

class VsaAppShell extends LitElement {
  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }
    :root,
    :host {
      /* Map former custom design tokens to Shoelace system tokens */

      --vsa-border: var(--sl-color-neutral-200);
      --vsa-row-alt: var(--sl-color-neutral-50);
      --vsa-row-hover: var(--sl-color-neutral-100);
      --vsa-row-focus: var(--sl-color-neutral-150);

      --vsa-card-border: var(--sl-color-neutral-200);
      --vsa-card-border-strong: var(--sl-color-neutral-300);
      --vsa-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.08),
        0 2px 4px rgba(0, 0, 0, 0.06);
      --vsa-shadow-md: 0 2px 4px rgba(0, 0, 0, 0.08),
        0 6px 12px rgba(0, 0, 0, 0.08);
      --sl-input-background-color: #faebd7; /* antiquewhite */
    }
    :host-context(.dark) :root,
    :host-context(.dark) :host {
      --vsa-surface: var(--sl-color-neutral-800);
      --vsa-border: var(--sl-color-neutral-700);
      --vsa-row-alt: var(--sl-color-neutral-750, rgba(255, 255, 255, 0.03));
      --vsa-row-hover: hsl(240deg 57.79% 46.1%);
      --vsa-row-focus: var(--sl-color-neutral-650, #323a42);
      /* Darken card background for better contrast (was neutral-800, appeared too light) */
      /* Near-black card background for dark mode */
      --vsa-card-bg: var(--sl-color-neutral-900, #0f1113);
      --vsa-card-border: var(--sl-color-neutral-700);
      --vsa-card-border-strong: var(--sl-color-neutral-600);
      --vsa-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4),
        0 2px 6px rgba(0, 0, 0, 0.35);
      --vsa-shadow-md: 0 2px 6px rgba(0, 0, 0, 0.45),
        0 8px 18px rgba(0, 0, 0, 0.4);
      --sl-input-background-color: #faebd7; /* keep antiquewhite */
    }
    header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      background: var(--vsa-surface);
      background-color: var(--vsa-surface);
      position: sticky;
      top: 0;
      z-index: 10;
      border-bottom: 1px solid var(--vsa-border);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.04);
    }
    :host-context(.dark) header {
      background: var(--vsa-card-bg);
      background-color: var(--vsa-card-bg);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    }
    header h1 {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
      letter-spacing: 0.5px;
    }
    .intro-banner {
      margin: 0 0 1.15rem 0;
      padding: 1rem 1.15rem;
      background: linear-gradient(
        135deg,
        var(--sl-color-primary-600, #4d7cff),
        var(--sl-color-primary-400, #6d92ff)
      );
      color: #fff;
      border-radius: 16px;
      box-shadow: var(--vsa-shadow-md);
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    :host-context(.dark) .intro-banner {
      background: linear-gradient(135deg, #3d63d9, #567ee3);
    }
    .intro-banner h2 {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .intro-banner p {
      margin: 0;
      font-size: 1rem;
      line-height: 1.4;
      opacity: 0.95;
    }
    .intro-banner sl-button::part(base) {
      font-weight: 600;
    }
    .spacer {
      flex: 1;
    }
    main {
      padding: 0.75rem 0.75rem 1.25rem;
    }
    .grid-menu {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
    .card-link {
      background: var(--vsa-card-bg);
      border: 2px solid var(--vsa-card-border-strong);
      border-radius: 14px;
      padding: 0.9rem 0.9rem 0.75rem 0.9rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
    }
    .hidden {
      display: none;
    }
    .card-link:hover {
      background: #6d92ff;
      border-color: var(--sl-color-primary-500);
    }
    .card-link:focus-visible {
      outline: 3px solid var(--sl-color-primary-500);
      outline-offset: 2px;
    }
    html.dark .card-link {
      border-color: var(--vsa-card-border-strong);
    }
    html.dark .card-link:hover {
      border-color: #1b73c5;
    }
    .card-icon {
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card-title {
      font-weight: 600;
      font-size: 0.85rem;
      letter-spacing: 0.3px;
    }
    .card-desc {
      font-size: 0.65rem;
      opacity: 0.75;
      line-height: 1.25;
    }
    .page {
      max-width: 880px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 0.75rem; /* reduced gap between sections */
    }
    .page section.calc {
      background: var(--vsa-card-bg);
      border: 1px solid var(--vsa-card-border);
      border-radius: 14px;
      padding: 1.1rem 1.15rem 1.15rem;
      display: flex;
      flex-direction: column;
      gap: 1rem; /* more breathing room between groups */
      transition: box-shadow 0.15s, background 0.15s, border-color 0.15s;
    }
    .page section.calc:hover {
      box-shadow: var(--vsa-shadow-md);
    }
    .back-link {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.65rem;
    }
    .back-link sl-button::part(base) {
      font-size: 0.75rem;
      font-weight: 600;
    }
    .page .help {
      background: var(--vsa-card-bg);
      border: 1px solid var(--vsa-card-border);
      border-radius: 14px;
      padding: 1rem 1.15rem 1.1rem;
      font-size: 1rem;
      line-height: 1.55;
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
      box-shadow: var(--vsa-shadow-sm);
    }
    .page .help:hover {
      box-shadow: var(--vsa-shadow-md);
    }
    .output-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem 1rem; /* increase horizontal + vertical spacing */
      align-items: flex-end;
    }
    sl-details::part(base) {
      background: var(--vsa-card-bg);
      border: 1px solid var(--vsa-card-border);
      border-radius: 10px;
      padding: 0.6rem 0.75rem;
    }
    sl-details::part(summary) {
      font-weight: 600;
      letter-spacing: 0.4px;
    }
    :host-context(.dark) sl-details::part(base) {
      background: var(--vsa-card-bg);
      border-color: var(--vsa-border);
      box-shadow: 0 0 0 1px var(--vsa-border) inset,
        0 2px 6px rgba(0, 0, 0, 0.6);
    }
    :host-context(.dark) sl-details::part(summary) {
      color: var(--sl-color-neutral-0);
    }
    .result-block {
      max-width: 100%;
      margin-top: 0.5rem;
      padding: 0.75rem 0.9rem;
      border-radius: 10px;
      background: linear-gradient(
        135deg,
        var(--sl-color-primary-600, #4d7cff) 0%,
        var(--sl-color-primary-400, #6d92ff) 75%
      );
      color: #fff;
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      box-sizing: border-box;
      box-shadow: var(--vsa-shadow-sm);
    }
    :host-context(.dark) .result-block {
      background: linear-gradient(
        135deg,
        rgba(25, 30, 34, 0.95) 0%,
        rgba(25, 30, 34, 0.95) 62%,
        var(--sl-color-primary-600) 100%
      );
      color: var(--sl-color-neutral-0);
      box-shadow: 0 0 0 1px var(--vsa-border) inset,
        0 4px 14px rgba(0, 0, 0, 0.55);
    }
    :host-context(.dark) .result-value {
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      color: var(--sl-color-neutral-0);
    }
    .result-value {
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1;
      margin-left: 0.75rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    }
    @media (max-width: 640px) {
      .result-value {
        font-size: 1.25rem;
        margin-left: 0.5rem;
      }
      .result-block {
        padding: 0.65rem 0.75rem;
      }
    }
    .invalid-msg {
      margin-top: 0.75rem;
      padding: 0.75rem 0.85rem;
      border: 1px solid #d9534f;
      background: #ffe9e8;
      color: #b00000;
      border-radius: 8px;
      font-size: 0.7rem;
      line-height: 1.35;
    }
    /* Edge Retention input grouping */
    .retention-group {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 0.5rem;
    }
    .input-box {
      flex: 1 1 150px;
      background: #f9fafb;
      border: 1px solid var(--vsa-card-border);
      border-radius: 10px;
      padding: 0.55rem 0.6rem 0.5rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    }
    :host-context(.dark) .input-box {
      background: #1e2328; /* requested dark mode input box background */
      border-color: #394149;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
    }
    /* Dark mode near-black backgrounds for editable controls */
    /* Unified edit control background (antique white) in all modes */
    sl-input::part(base),
    sl-select::part(combobox),
    sl-button[variant="default"]::part(base) {
      background: var(--sl-input-background-color) !important;
      color: #222 !important;
    }
    sl-input::part(input),
    sl-select::part(display-input) {
      color: #222;
    }
    sl-input::part(base):focus-within,
    sl-select::part(combobox):focus-within {
      outline: 2px solid var(--sl-color-primary-600);
      outline-offset: 2px;
    }
    .input-box sl-input::part(base) {
      width: 100%;
    }
    /* Shoelace help text part */
    .input-box sl-input::part(help-text) {
      color: #b08400; /* note color */
      font-weight: 500;
      letter-spacing: 0.25px;
    }
    :host-context(.dark) .input-box sl-input::part(help-text) {
      color: hsl(240deg 10.93% 72.35%); /* requested help text color */
    }
    html.dark .invalid-msg {
      background: #432222;
      border-color: #ff6f6b;
      color: #ffb3b0;
    }
    .calc sl-input::part(base),
    .calc sl-select::part(combobox),
    .calc sl-select::part(base) {
      min-width: 120px;
    }
    .calc sl-badge {
      margin-top: 4px;
    }
    @media (max-width: 640px) {
      .page section.calc {
        padding: 0.95rem 0.9rem 1rem;
      }
      .output-row {
        gap: 0.65rem 0.8rem;
      }
      .calc sl-input::part(base),
      .calc sl-select::part(combobox),
      .calc sl-select::part(base) {
        min-width: 110px;
      }
    }
    .help h2 {
      margin: 0 0 0.25rem;
      font-size: 0.9rem;
      font-weight: 600;
    }
    .help a {
      color: var(--sl-color-primary-600);
      text-decoration: none;
    }
    .help a:hover {
      text-decoration: underline;
    }
    footer {
      text-align: center;
      font-size: 0.7rem;
      opacity: 0.6;
      padding: 1rem;
    }
  `;

  @property({ type: String }) page = "home";
  @property({ type: Number }) width = 3;
  @property({ type: Number }) height = 2;
  @property({ type: Number }) desiredAngle = 20;
  @property({ type: Number }) sharpenerAngle = 15;
  @property({ type: Number }) rotationAngle = 12;
  @property({ type: Number }) rotationSharpener = 15;
  @property({ type: Number }) passes = 19;
  @property({ type: Number }) hardness = 60;
  @property({ type: Number }) edgeAngle = 30;
  @property({ attribute: false }) carbides: { [k: string]: number } = {
    CrC: 0,
    CrCV: 0,
    MC: 5.5,
    M6C: 5,
    MN: 0,
    CrN: 0,
    Fe3C: 0,
  };
  @property({ type: Boolean }) dark = false;
  @property({ type: Boolean }) online = navigator.onLine;
  @property({ type: Boolean }) updateReady = false;
  @property({ type: Boolean }) geometryFullScreen = false;

  constructor() {
    super();
    // Field initializers already set; no need for manual requestUpdate.

    this.addEventListener("steel-selected", (e) =>
      this._onSteelSelected(e as CustomEvent<SteelSelectedDetail>)
    );
    document.documentElement.classList.remove("dark");
    window.addEventListener("hashchange", () => this._applyRoute());
    this._applyRoute();
    try {
      const t = localStorage.getItem("vsa-theme");
      if (t === "dark") {
        document.documentElement.classList.add("dark");
        this.dark = true;
      }
    } catch {}

    // Online/offline indicators
    window.addEventListener("online", () => {
      this.online = true;
      this.requestUpdate();
    });
    window.addEventListener("offline", () => {
      this.online = false;
      this.requestUpdate();
    });

    // Service worker update detection (if registration handled externally, we still attach)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (!reg) return;
        // Listen for updates
        reg.addEventListener("updatefound", () => {
          const sw = reg.installing;
          if (sw) {
            sw.addEventListener("statechange", () => {
              if (
                sw.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                this.updateReady = true;
                this.requestUpdate();
              }
            });
          }
        });
      });
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        // Only reload once; guard with a flag on window
        if (!(window as any).__vsaReloaded) {
          (window as any).__vsaReloaded = true;
          // Use requestAnimationFrame to allow pending rendering to settle
          requestAnimationFrame(() => window.location.reload());
        }
      });
    }

    // Listen for fullscreen toggle from geometry builder
    this.addEventListener("geometry-fullscreen-changed", (e: Event) => {
      const detail = (e as CustomEvent).detail as { fullScreen: boolean };
      this.geometryFullScreen = !!detail?.fullScreen;
      this.requestUpdate();
    });
  }

  _applyRoute() {
    const hash = window.location.hash.replace(/^#\//, "");
    this.page = hash || "home";
  }

  _go(page: string) {
    window.location.hash = `/${page}`;
    this.page = page;
  }

  _num(ev: Event, key: string) {
    const target = ev.target as HTMLInputElement;
    const val = Number(target.value);
    (this as any)[key] = val;
  }
  _carbide(ev: Event, key: string) {
    const target = ev.target as HTMLInputElement;
    const val = Number(target.value);
    this.carbides = { ...this.carbides, [key]: val };
  }
  render() {
    return html`${this.geometryFullScreen
        ? html``
        : html`<header
            class="app-header ${this.geometryFullScreen ? "hidden" : ""}"
          >
            <h1>VSharpAngle</h1>
            <sl-switch
              ?checked=${this.dark}
              @sl-change=${() => this._toggleTheme()}
              aria-label="Toggle dark mode"
              >Dark Mode</sl-switch
            >
            ${this.online
              ? html`<sl-badge variant="success" pill>Online</sl-badge>`
              : html`<sl-badge variant="danger" pill>Offline</sl-badge>`}
            ${this.updateReady
              ? html`<sl-button
                  size="small"
                  variant="primary"
                  @click=${() => this._updateSw()}
                  aria-label="Update available"
                >
                  Update Available
                </sl-button>`
              : ""}
          </header>`}
      <main>
        ${this.page === "home" ? this._renderHome() : this._renderPage()}
      </main>
      <footer class="${this.geometryFullScreen ? "hidden" : ""}">
        © ${new Date().getFullYear()} VSharpAngle • (C) J.D Stone,
        ShaperAndMower, All Rights Reserved. Converted to PWA and Geometry
        Builder by Kyley Harris.
      </footer>`;
  }

  _toggleTheme() {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");
    // Optionally persist
    try {
      localStorage.setItem("vsa-theme", isDark ? "dark" : "light");
    } catch {}
    this.dark = isDark;
  }

  _renderHome() {
    const cards = [
      {
        page: "angle",
        icon: "rulers",
        title: "Angle Measure",
        desc: "Calculate inclusive edge angle from bevel width & height.",
      },
      {
        page: "elevation",
        icon: "arrow-up",
        title: "Sharpmaker Elevation",
        desc: "Find required base elevation for desired angle setting.",
      },
      {
        page: "rotation",
        icon: "repeat",
        title: "Sharpmaker Rotation",
        desc: "Compute safe rotation angle between rod settings.",
      },
      {
        page: "passes",
        icon: "list",
        title: "Pass Counter",
        desc: "Generate stroke sequence totals for progression.",
      },
      {
        page: "retention",
        icon: "graph-up",
        title: "Edge Retention",
        desc: "Estimate TCC & volume from carbide & hardness data.",
      },
      {
        page: "steels",
        icon: "database",
        title: "Steel Database",
        desc: "Browse carbide composition & derived metrics.",
      },
      {
        page: "geometry",
        icon: "triangle",
        title: "Geometry Builder",
        desc: "Stack inclusive angle wedges into a cross-section.",
      },
    ];
    return html` <div class="intro-banner">
        <h2>VSharpAngle</h2>
        <p>
          A focused, installable sharpening companion for V‑stick / Crock Stick
          systems. Convert desired edge angles into rod adjustments, measure
          existing bevel geometry, plan progressive stroke counts, and
          approximate edge retention from steel data—all offline once loaded.
          Geometry Builder included for visualizing compound angles.
        </p>
        <sl-button
          size="small"
          variant="primary"
          @click=${() => this._go("intro")}
        >
          Read Full Introduction
        </sl-button>
      </div>
      <div class="grid-menu">
        ${cards.map(
          (c) => html`<a
            class="card-link"
            @click=${() => this._go(c.page)}
            role="button"
            tabindex="0"
            aria-label="Open ${c.title} page"
          >
            <div class="card-icon"><sl-icon name=${c.icon}></sl-icon></div>
            <div class="card-title">${c.title}</div>
            <div class="card-desc">${c.desc}</div>
          </a>`
        )}
      </div>`;
  }

  _renderPage() {
    switch (this.page) {
      case "angle":
        return this._pageAngle();
      case "elevation":
        return this._pageElevation();
      case "rotation":
        return this._pageRotation();
      case "passes":
        return this._pagePasses();
      case "retention":
        return this._pageRetention();
      case "steels":
        return this._pageSteels();
      case "geometry":
        return this._pageGeometry();
      case "intro":
        return this._pageIntro();
      default:
        return html`<div class="page">Unknown page.</div>`;
    }
  }

  _pageGeometry() {
    return html`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <vsa-geometry-builder></vsa-geometry-builder>
    </div>`;
  }

  _pageIntro() {
    return html`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>Introduction & Guide</h2>
        <p>
          <strong>VSharpAngle</strong> is a modern Progressive Web App for
          rod-based ("V-stick") knife sharpeners such as Crock Stick and
          Spyderco style systems. It replaces earlier terminal and single‑file
          scripts with a responsive, installable interface, precise math
          helpers, and offline capability.
        </p>
        <h3 style="margin:.75rem 0 .4rem;font-size:.75rem">
          Core Capabilities
        </h3>
        <ul
          style="margin:0;padding-left:1rem;font-size:.65rem;line-height:1.35"
        >
          <li>
            <strong>Rod Angle by Rotation:</strong> Determine the base rotation
            needed to reach a target degrees‑per‑side (DPS).
          </li>
          <li>
            <strong>Rod Angle by Elevation:</strong> Compute how much to lift
            one side of the base to reach the desired DPS.
          </li>
          <li>
            <strong>Rotation Angle Reference:</strong> Generate a quick offset
            chart between common 15° / 20° / 25° settings.
          </li>
          <li>
            <strong>Edge Bevel Measurement:</strong> Convert bevel width &
            height behind the edge into inclusive angle.
          </li>
          <li>
            <strong>Progressive Pass Counter:</strong> Plan descending stroke
            sets (e.g. 30 → 20 → 10) and see totals / X‑strokes.
          </li>
          <li>
            <strong>Edge Retention Estimator:</strong> Approximate CATRA TCC,
            material removal volume, and stability from hardness, edge angle,
            and carbide mix.
          </li>
        </ul>
        <h3 style="margin:.9rem 0 .4rem;font-size:.75rem">Using Each Tool</h3>
        <ul
          style="margin:0;padding-left:1rem;font-size:.65rem;line-height:1.35"
        >
          <li>
            <strong>Rotation:</strong> Enter your target DPS and current rod
            setting (15°/20°/25°). Result = rotation offset.
          </li>
          <li>
            <strong>Elevation:</strong> Provide target DPS and rod setting; app
            returns required lift height. "Near" vs "Far" distinctions are
            abstracted—you just need the angles.
          </li>
          <li>
            <strong>Rotation Chart:</strong> Open the Rotation page and vary
            target DPS to visualize offsets.
          </li>
          <li>
            <strong>Angle Measure:</strong> Measure thickness behind the edge
            (width) and bevel height; app calculates per‑side angle.
          </li>
          <li>
            <strong>Pass Counter:</strong> Enter starting passes (e.g. 30). It
            auto builds descending sets and totals. Use odd numbers for balanced
            X‑strokes.
          </li>
          <li>
            <strong>Edge Retention:</strong> Input hardness (HRC), edge angle
            (DPS), and carbide fractions. Load preset steel data via the table
            for faster comparison.
          </li>
        </ul>
        <h3 style="margin:.9rem 0 .4rem;font-size:.75rem">
          Tips & Expectations
        </h3>
        <ul
          style="margin:0;padding-left:1rem;font-size:.65rem;line-height:1.35"
        >
          <li>
            Keep measurements consistent (mm or inches) within a calculation.
          </li>
          <li>
            Reasonable hardness range: 50–70 HRC; edge angles typically 10–35°
            DPS.
          </li>
          <li>
            Use progressive pass reductions to refine scratch pattern & apex
            without overshooting.
          </li>
          <li>
            Edge retention outputs are comparative indicators, not lab‑grade
            guarantees.
          </li>
          <li>
            Install the PWA (browser menu) for offline workshop use; data caches
            after first load.
          </li>
        </ul>
        <h3 style="margin:.9rem 0 .4rem;font-size:.75rem">Acknowledgments</h3>
        <p style="margin:0;font-size:.65rem;line-height:1.4">
          Thanks to <strong>Larrin Thomas</strong> for the CATRA TCC formula
          guidance and community contributors refining steel data
          representations.
        </p>
      </section>
    </div>`;
  }

  _pageAngle() {
    const angle = measureAngle(this.width, this.height);
    let invalid: string | null = null;
    if (angle == null) {
      if (this.width == null || this.height == null)
        invalid = "Width and height are required.";
      else if (this.height === 0) invalid = "Height must be greater than 0.";
      else invalid = "width/2 must be ≤ height (arcsin domain).";
      // Focus first invalid input
      queueMicrotask(() => {
        const el = this.renderRoot?.querySelector(
          this.width == null
            ? 'sl-input[label="Width"]'
            : 'sl-input[label="Height"]'
        ) as HTMLElement | null;
        el?.focus();
      });
    }
    return html`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>
          Angle Measurement
          <sl-tooltip
            content="Convert bevel width & height behind the edge into degrees-per-side."
          >
            <sl-icon
              name="info-circle"
              style="font-size:.9rem; margin-left:.4rem"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <div class="output-row">
          <sl-input
            label="Width"
            type="number"
            .value=${String(this.width)}
            @input=${(e: Event) => this._num(e, "width")}
          ></sl-input>
          <sl-input
            label="Height"
            type="number"
            .value=${String(this.height)}
            @input=${(e: Event) => this._num(e, "height")}
          ></sl-input>
        </div>
        <div aria-live="polite">
          ${angle != null
            ? html`<div class="result-block" role="status">
                <span>Inclusive Edge Angle (DPS)</span
                ><span class="result-value">${angle}°</span>
              </div>`
            : html`<div class="invalid-msg" role="alert">
                <strong>Angle could not be calculated.</strong
                ><br />${invalid}<br /><em>Expectation:</em> Positive width &
                height with width/2 ≤ height.
              </div>`}
        </div>
      </section>
      <div class="help" aria-label="Angle Measurement Explanation">
        <h2>How This Angle Is Calculated</h2>
        <p>
          The per‑side edge angle is derived from simple trigonometry: we treat
          the bevel height as the adjacent side of a right triangle and half the
          measured width behind the edge as the opposite side. The ratio
          <code>(width / 2) / height</code> gives <em>sin(θ)</em>. If that ratio
          exceeds 1 the physical measurement is inconsistent (angle cannot
          exist) and you’ll see an invalid message.
        </p>
        <p>
          Use consistent units (mm or inches). Minor measurement error can shift
          a calculated DPS by a degree or two—adequate for sharpening decisions.
        </p>
        <p>
          <strong>Tip:</strong> A smaller height for the same width means a
          blunter (larger) angle.
        </p>
      </div>
    </div>`;
  }

  _pageElevation() {
    const elev = sharpmakerElevation(this.desiredAngle, this.sharpenerAngle);
    let invalid: string | null = null;
    if (elev == null) {
      if (this.desiredAngle == null || this.sharpenerAngle == null)
        invalid = "Both desired and setting angles required.";
      else invalid = "Unexpected null result; ensure numeric inputs.";
      queueMicrotask(() => {
        const el = this.renderRoot?.querySelector(
          this.desiredAngle == null
            ? 'sl-input[label="Desired"]'
            : 'sl-select[label="Setting"]'
        ) as HTMLElement | null;
        el?.focus();
      });
    }
    return html`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>
          Sharpmaker Elevation
          <sl-tooltip
            content="Calculate required base lift to reach a target rod angle."
          >
            <sl-icon
              name="info-circle"
              style="font-size:.9rem; margin-left:.4rem"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <div class="output-row">
          <sl-input
            label="Desired"
            type="number"
            .value=${String(this.desiredAngle)}
            @input=${(e: Event) => this._num(e, "desiredAngle")}
          ></sl-input>
          <sl-select
            label="Setting"
            .value=${String(this.sharpenerAngle)}
            @sl-change=${(e: CustomEvent) => {
              this.sharpenerAngle = Number(
                (e.target as HTMLSelectElement).value
              );
            }}
          >
            <sl-option value="15">15°</sl-option
            ><sl-option value="20">20°</sl-option
            ><sl-option value="25">25°</sl-option>
          </sl-select>
        </div>
        <div aria-live="polite">
          ${elev != null
            ? html`<div class="result-block" role="status">
                <span>Required Elevation</span
                ><span class="result-value">${elev}"</span>
              </div>`
            : html`<div class="invalid-msg" role="alert">
                <strong>Elevation could not be estimated.</strong
                ><br />${invalid}<br /><em>Expectation:</em> Desired angle
                usually within ~10° of setting.
              </div>`}
        </div>
      </section>
      <div class="help" aria-label="Elevation Calculator Explanation">
        <h2>Understanding Elevation Adjustment</h2>
        <p>
          Raising one side of a V‑stick base changes the effective rod angle.
          The approximation here uses the difference between desired
          degrees‑per‑side and the rod’s built‑in setting, scaled by a constant
          that represents typical rod spacing.
        </p>
        <p>
          Small elevation changes (fractions of an inch) can translate into
          several degrees at the edge. Keep lifts modest; extreme elevation may
          compromise stability.
        </p>
        <p>
          <strong>Tip:</strong> If the required elevation rounds to 0, you are
          already at or very near the desired angle.
        </p>
      </div>
    </div>`;
  }

  _pageRotation() {
    const rotation = sharpmakerRotation(
      this.rotationAngle,
      this.rotationSharpener
    );
    let invalid: string | null = null;
    if (rotation == null) {
      if (this.rotationAngle == null || this.rotationSharpener == null)
        invalid = "Provide both target and setting angles.";
      else invalid = "csc(setting) * sin(angle) must be between -1 and 1.";
      queueMicrotask(() => {
        const el = this.renderRoot?.querySelector(
          this.rotationAngle == null
            ? 'sl-input[label="Angle"]'
            : 'sl-select[label="Setting"]'
        ) as HTMLElement | null;
        el?.focus();
      });
    }
    return html`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>
          Sharpmaker Rotation
          <sl-tooltip
            content="Determine safe rotation offset between common rod angle settings."
          >
            <sl-icon
              name="info-circle"
              style="font-size:.9rem; margin-left:.4rem"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <div class="output-row">
          <sl-input
            label="Angle"
            type="number"
            .value=${String(this.rotationAngle)}
            @input=${(e: Event) => this._num(e, "rotationAngle")}
          ></sl-input>
          <sl-select
            label="Setting"
            .value=${String(this.rotationSharpener)}
            @sl-change=${(e: CustomEvent) => {
              this.rotationSharpener = Number(
                (e.target as HTMLSelectElement).value
              );
            }}
          >
            <sl-option value="15">15°</sl-option
            ><sl-option value="20">20°</sl-option
            ><sl-option value="25">25°</sl-option>
          </sl-select>
        </div>
        <div aria-live="polite">
          ${rotation != null
            ? html`<div class="result-block" role="status">
                <span>Rotation Offset</span
                ><span class="result-value">${rotation}°</span>
              </div>`
            : html`<div class="invalid-msg" role="alert">
                <strong>Rotation offset cannot be computed.</strong
                ><br />${invalid}<br /><em>Expectation:</em> Choose angle
                compatible with selected setting.
              </div>`}
        </div>
      </section>
      <div class="help" aria-label="Rotation Calculator Explanation">
        <h2>How Rotation Offsets Work</h2>
        <p>
          Rotating the base changes the relative orientation between the knife
          and the rods, allowing intermediate angles without swapping to
          different preset holes. The math multiplies
          <code>sin(target)</code> by <code>csc(setting)</code> and uses
          <code>acos</code> to find the rotation offset. The product must stay
          between -1 and 1 (a domain requirement).
        </p>
        <p>
          If you hit a domain error, pick a target closer to the rod’s native
          setting. Very large deviations may be mechanically awkward or
          inconsistent.
        </p>
        <p>
          <strong>Tip:</strong> Rotate gradually and keep the spine vertical to
          avoid inadvertent angle drift.
        </p>
      </div>
    </div>`;
  }

  _pagePasses() {
    const passInfo = passCount(this.passes);
    const valid = passInfo.total > 0;
    let invalid: string | null = null;
    if (!valid) {
      if (this.passes == null) invalid = "Number of passes is required.";
      else if ((this.passes as number) < 1) invalid = "Pass count must be ≥ 1.";
      else invalid = "Invalid pass input.";
      queueMicrotask(() => {
        const el = this.renderRoot?.querySelector(
          'sl-input[label="Passes"]'
        ) as HTMLElement | null;
        el?.focus();
      });
    }
    return html`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>
          Pass Counter
          <sl-tooltip
            content="Plan descending stroke sets and view total plus X-strokes."
          >
            <sl-icon
              name="info-circle"
              style="font-size:.9rem; margin-left:.4rem"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <div class="output-row">
          <sl-input
            label="Passes"
            type="number"
            .value=${String(this.passes)}
            @input=${(e: Event) => this._num(e, "passes")}
          ></sl-input>
        </div>
        <div aria-live="polite">
          ${valid
            ? html`<div class="result-block" role="status">
                <span>Total / X-Strokes</span
                ><span class="result-value"
                  >${passInfo.total} / ${passInfo.xStrokes}</span
                >
              </div>`
            : html`<div class="invalid-msg" role="alert">
                <strong>Sequence cannot be generated.</strong
                ><br />${invalid}<br /><em>Expectation:</em> Enter positive
                integer (e.g., 9, 19, 29).
              </div>`}
        </div>
        <sl-details summary="Sequence"
          >${passInfo.sequence.map(
            (n) => html`<span class="badge-seq">${n}, </span>`
          )}</sl-details
        >
      </section>
      <div class="help" aria-label="Pass Counter Explanation">
        <h2>Why Track Progressive Passes?</h2>
        <p>
          Progressive pass reduction refines scratch pattern and apex quality
          while limiting over‑grinding. Starting passes define the top sequence;
          each descending step (minus 10) accelerates deburring and polish.
          Final small counts (5, 3, 2, 1) provide controlled finish.
        </p>
        <p>
          The total and X‑stroke count help estimate time investment and
          symmetry. Choose an odd starting number to maintain balanced
          alternation.
        </p>
        <p>
          <strong>Tip:</strong> If steel is hard or wear‑resistant, consider a
          slightly larger starting pass set.
        </p>
      </div>
    </div>`;
  }

  _pageRetention() {
    const edge = edgeRetention({
      name: "current",
      hardness: this.hardness,
      edgeAngle: this.edgeAngle,
      CrC: this.carbides.CrC,
      CrV: this.carbides.CrCV,
      MC: this.carbides.MC,
      M6C: this.carbides.M6C,
      MN: this.carbides.MN,
      CrN: this.carbides.CrN,
      Fe3C: this.carbides.Fe3C,
    });
    const hardValid = this.hardness != null && this.hardness > 0;
    const angleValid = this.edgeAngle != null && this.edgeAngle > 0;
    const invalids: string[] = [];
    if (!hardValid) invalids.push("Hardness must be positive (e.g., 60).");
    if (!angleValid)
      invalids.push("Edge angle must be positive degrees per side.");
    if (invalids.length) {
      queueMicrotask(() => {
        const selector = !hardValid
          ? 'sl-input[label="Hardness"]'
          : 'sl-input[label="Edge Angle"]';
        const el = this.renderRoot?.querySelector(
          selector
        ) as HTMLElement | null;
        el?.focus();
      });
    }
    return html`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>
          Edge Retention Estimator
          <sl-tooltip
            content="Approximate CATRA TCC, volume, and stability from hardness, edge angle, and carbides."
          >
            <sl-icon
              name="info-circle"
              style="font-size:.9rem; margin-left:.4rem"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <div class="retention-group">
          <div class="input-box">
            <sl-input
              label="Hardness"
              help-text="Rockwell C hardness (HRC). Higher HRC boosts wear resistance but may reduce toughness. Typical 50–70."
              type="number"
              .value=${String(this.hardness)}
              @input=${(e: Event) => this._num(e, "hardness")}
            ></sl-input>
          </div>
          <div class="input-box">
            <sl-input
              label="Edge Angle"
              help-text="Degrees per side (DPS). Lower angles slice more efficiently; higher angles increase edge durability."
              type="number"
              .value=${String(this.edgeAngle)}
              @input=${(e: Event) => this._num(e, "edgeAngle")}
            ></sl-input>
          </div>
        </div>
        <div class="retention-group">
          ${[
            {
              k: "CrC",
              t: "Chromium carbides (CrC) – moderate wear contribution.",
            },
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
          ].map(
            ({ k, t }) => html`<div class="input-box">
              <sl-input
                label=${k}
                help-text=${t}
                type="number"
                .value=${String(this.carbides[k] || 0)}
                @input=${(e: Event) => this._carbide(e, k)}
              ></sl-input>
            </div>`
          )}
        </div>
        <div aria-live="polite">
          ${invalids.length === 0
            ? html`<div class="result-block" role="status">
                <span>TCC / Volume / Stability</span
                ><span class="result-value"
                  >${edge.TCC} / ${edge.volume.toFixed(1)} /
                  ${edge.stability}</span
                >
              </div>`
            : html`<div class="invalid-msg" role="alert">
                <strong>Cannot compute retention metrics.</strong
                ><br />${invalids.map((m) => html`<div>${m}</div>`)}<br /><em
                  >Expectation:</em
                >
                Hardness 50–70 HRC; edge angle 10°–35° DPS.
              </div>`}
        </div>
        <div class="output-row">
          <sl-progress-bar
            .value=${Math.min(edge.volume, 30)}
            max="30"
          ></sl-progress-bar>
        </div>
        <sl-button
          size="small"
          class="load-btn"
          variant="neutral"
          style="display:none"
          aria-hidden="true"
          >Steel Table (replaced by collapsible)</sl-button
        >
      </section>
      <sl-details summary="Steel Database">
        <div style="margin-top:.75rem">
          <vsa-steel-table></vsa-steel-table>
        </div>
      </sl-details>
      <div class="help" aria-label="Edge Retention Estimator Explanation">
        <h2>About The Retention Estimate</h2>
        <p>
          The CATRA‑inspired TCC approximation combines hardness, edge angle,
          and carbide fractions (simplified). Higher hardness generally
          increases TCC; larger edge angle reduces it. Carbides contribute
          differently—MC types often yield greater wear resistance than simple
          chromium carbides.
        </p>
        <p>
          <strong>Volume</strong> is a simple sum of carbide fractions, giving a
          rough sense of alloy complexity. Stability bands indicate suitable
          edge angle ranges for balancing retention vs. toughness.
        </p>
        <p>
          Treat these numbers as comparative guidance, not lab‑grade
          measurements. Real cutting performance depends on heat treatment,
          microstructure, and edge finish.
        </p>
        <p>
          <strong>Tip:</strong> Lower edge angles may outperform higher ones in
          slicing tasks until stability becomes a limiting factor.
        </p>
      </div>
    </div>`;
  }

  _pageSteels() {
    if (!customElements.get("vsa-steel-table")) import("./vsa-steel-table");
    return html`<div class="page">
      <div class="back-link">${this._homeLink()}</div>
      <section class="calc">
        <h2>
          Steel Database
          <sl-tooltip
            content="Browse compositions and click a row to load carbide data into the estimator."
          >
            <sl-icon
              name="info-circle"
              style="font-size:.9rem; margin-left:.4rem"
            ></sl-icon>
          </sl-tooltip>
        </h2>
        <vsa-steel-table></vsa-steel-table>
      </section>
      <div class="help">
        <h2>Browsing Steels</h2>
        <p>
          Use the filter to narrow compositions. Click a row to emit data to the
          retention estimator, pre‑filling carbide values for quick comparison.
        </p>
        <p>
          <strong>Benefit:</strong> Rapidly evaluate how different alloys might
          respond to target geometry and hardness.
        </p>
        <p>
          <strong>Notes:</strong> Values are illustrative; expand dataset for
          production accuracy.
        </p>
        <p>
          <strong>References:</strong> Manufacturer datasheets, community
          compiled tables (e.g.,
          <a
            href="https://zknives.com/knives/steels/"
            target="_blank"
            rel="noopener"
            >ZKnives Steel Guide</a
          >).
        </p>
      </div>
    </div>`;
  }

  _homeLink() {
    return this.geometryFullScreen
      ? html``
      : html`<sl-button
          size="medium"
          variant="default"
          @click=${() => this._go("home")}
          style="gap:.4rem"
        >
          <sl-icon name="house" style="font-size:1.1rem"></sl-icon>
          Home
        </sl-button>`;
  }

  _toggleSteelTable() {
    // Deprecated: show/hide replaced by <sl-details>
  }

  _updateSw() {
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg && reg.waiting) {
        // Ask waiting worker to skip waiting; message handled in SW
        reg.waiting.postMessage("vsa-skip-waiting");
      } else if (reg) {
        // Trigger update check if no waiting worker yet
        reg.update();
      }
    });
  }

  _onSteelSelected(e: CustomEvent<SteelSelectedDetail>) {
    const { hardness, edgeAngle, carbides } = e.detail;
    this.hardness = hardness;
    this.edgeAngle = edgeAngle;
    this.carbides = { ...carbides };
  }
}

customElements.define("vsa-app-shell", VsaAppShell);
export { VsaAppShell };

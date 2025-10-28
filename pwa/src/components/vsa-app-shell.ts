import { LitElement, html, css } from "lit";
import { edgeRetention } from "../utils/math";
import type { SteelSelectedDetail } from "../types";
// Eager import steel table so collapsible section always renders immediately
import "./vsa-steel-table";
import "./vsa-geometry-builder";
import "./vsa-angle-calculator";
import "./vsa-elevation-calculator";
import "./vsa-rotation-calculator";
import "./vsa-pass-calculator";
import "./vsa-retention-calculator";
import { property } from "lit/decorators.js";

class VsaAppShell extends LitElement {
  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }
    /* Use Shoelace tokens directly - automatic light/dark handling */
    header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      background: var(--sl-color-neutral-0);
      position: sticky;
      top: 0;
      z-index: 10;
      border-bottom: 1px solid var(--sl-color-neutral-200);
      box-shadow: var(--sl-shadow-small);
    }
    header h1 {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: color 0.15s ease;
      user-select: none;
    }
    header h1:hover {
      color: var(--sl-color-primary-600);
    }
    header sl-icon-button {
      color: var(--sl-color-neutral-600);
      transition: color 0.15s ease;
    }
    header sl-icon-button:hover {
      color: var(--sl-color-primary-600);
    }
    header sl-icon-button::part(base) {
      color: inherit;
    }
    .intro-banner {
      margin: 0 0 1.15rem 0;
      padding: 1rem 1.15rem;
      background: linear-gradient(
        135deg,
        var(--sl-color-primary-600),
        var(--sl-color-primary-400)
      );
      color: var(--sl-color-neutral-0);
      border-radius: 16px;
      box-shadow: var(--sl-shadow-medium);
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .dark .intro-banner {
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
      background: var(--sl-color-neutral-0);
      border: 2px solid var(--sl-color-neutral-300);
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
      background: var(--sl-color-primary-50);
      border-color: var(--sl-color-primary-500);
    }
    .card-link:focus-visible {
      outline: 3px solid var(--sl-color-primary-500);
      outline-offset: 2px;
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
      background: var(--sl-color-neutral-0);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 14px;
      padding: 1.1rem 1.15rem 1.15rem;
      display: flex;
      flex-direction: column;
      gap: 1rem; /* more breathing room between groups */
      transition: box-shadow 0.15s, background 0.15s, border-color 0.15s;
    }
    .page section.calc:hover {
      box-shadow: var(--sl-shadow-medium);
    }
    .page .help {
      background: var(--sl-color-neutral-0);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 14px;
      padding: 1rem 1.15rem 1.1rem;
      font-size: 1rem;
      line-height: 1.55;
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
      box-shadow: var(--sl-shadow-small);
    }
    .page .help:hover {
      box-shadow: var(--sl-shadow-medium);
    }
    .output-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem 1rem; /* increase horizontal + vertical spacing */
      align-items: flex-end;
    }
    sl-details::part(base) {
      background: var(--sl-color-neutral-0);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: 10px;
      padding: 0.6rem 0.75rem;
    }
    sl-details::part(summary) {
      font-weight: 600;
      letter-spacing: 0.4px;
      color: var(--sl-color-neutral-900);
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
    .result-block {
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
    .result-value {
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
    .retention-inputs {
      background: var(--vsa-card-bg);
      border: 1px solid var(--vsa-card-border);
      border-radius: 8px;
      overflow: hidden;
      margin-top: 0.5rem;
    }
    .collapsible-section {
      background: var(--vsa-card-bg);
      border: 1px solid var(--vsa-card-border);
      border-radius: 8px;
      margin-bottom: 1rem;
    }
    .collapsible-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      cursor: pointer;
      background: var(--vsa-surface, #f9fafb);
      border-bottom: 1px solid var(--vsa-border, #e5e7eb);
      transition: background-color 0.2s ease;
    }
    .collapsible-header:hover {
      background: var(--vsa-row-hover, #f3f4f6);
    }
    .collapsible-header h2 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--vsa-text-primary);
    }
    .collapsible-content {
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }
    .collapsible-content.collapsed {
      max-height: 0;
    }
    .collapsible-content.expanded {
      max-height: 800px; /* Adjust as needed for retention estimator */
    }
    .retention-table {
      width: 100%;
      border-collapse: collapse;
    }
    .retention-table td {
      border-bottom: 1px solid var(--vsa-border, #e5e7eb);
      padding: 0.5rem 0.75rem;
      vertical-align: middle;
    }
    .retention-table td:first-child {
      font-weight: 500;
      width: 30%;
      background: var(--vsa-surface, #f9fafb);
      border-right: 1px solid var(--vsa-border, #e5e7eb);
    }
    .retention-table td:last-child {
      width: 70%;
    }
    .retention-table tr:last-child td {
      border-bottom: none;
    }
    .retention-table sl-input {
      width: 100%;
    }
    .retention-table sl-input::part(form-control) {
      margin-bottom: 0;
    }
    .retention-table sl-input::part(help-text) {
      display: none;
    }
    .label-with-tooltip {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    .label-with-tooltip sl-icon {
      cursor: help;
      color: var(--sl-color-neutral-500);
    }
    .section-subtitle {
      margin: 0.5rem 0 1rem 0;
      color: var(--sl-color-neutral-600);
      font-size: 0.9rem;
      line-height: 1.4;
    }
    .retention-table td:first-child {
      background: var(--sl-color-neutral-50);
    }
    @media (max-width: 600px) {
      .retention-table td {
        padding: 0.4rem 0.5rem;
      }
      .retention-table td:first-child {
        width: 35%;
        font-size: 0.9rem;
      }
    }

    sl-input::part(base):focus-within,
    sl-select::part(combobox):focus-within {
      outline: 2px solid var(--sl-color-primary-600);
      outline-offset: 2px;
    }
    .input-box sl-input::part(base) {
      width: 100%;
    }

    .input-box sl-input::part(help-text) {
      color: hsl(240deg 10.93% 72.35%); /* requested help text color */
    }
    .dark .invalid-msg {
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
  @property({ type: Boolean }) retentionEstimatorCollapsed = true;
  @property({ attribute: false }) availableSteels: any[] = [];

  constructor() {
    super();
    // Field initializers already set; no need for manual requestUpdate.

    this.addEventListener("steel-selected", (e) =>
      this._onSteelSelected(e as CustomEvent<SteelSelectedDetail>)
    );
    // Initialize dark mode based on browser preference or saved setting
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.remove("sl-theme-dark");
    try {
      const savedTheme = localStorage.getItem("vsa-theme");
      let shouldUseDark = false;

      if (savedTheme) {
        // Use saved preference if available
        shouldUseDark = savedTheme === "dark";
      } else {
        // Use browser preference if no saved setting
        shouldUseDark =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
      }

      if (shouldUseDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.add("sl-theme-dark");
        this.dark = true;

        // Load dark theme CSS
        const darkThemeLink = document.getElementById("shoelace-dark-theme");
        if (!darkThemeLink) {
          const link = document.createElement("link");
          link.id = "shoelace-dark-theme";
          link.rel = "stylesheet";
          link.href =
            "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.13.0/cdn/themes/dark.css";
          document.head.appendChild(link);
        }
      }
    } catch {}

    // Initialize routing
    window.addEventListener("hashchange", () => this._applyRoute());
    this._applyRoute();

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

  _toggleRetentionEstimator() {
    this.retentionEstimatorCollapsed = !this.retentionEstimatorCollapsed;
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
            <h1 @click=${() => this._go("home")}>VSharpAngle</h1>
            <sl-icon-button
              name="house-fill"
              @click=${() => this._go("home")}
              label="Go to home"
            ></sl-icon-button>
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

    // Toggle Shoelace theme class
    if (isDark) {
      root.classList.add("sl-theme-dark");
      // Load dark theme CSS if not already loaded
      const darkThemeLink = document.getElementById("shoelace-dark-theme");
      if (!darkThemeLink) {
        const link = document.createElement("link");
        link.id = "shoelace-dark-theme";
        link.rel = "stylesheet";
        link.href =
          "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.13.0/cdn/themes/dark.css";
        document.head.appendChild(link);
      }
    } else {
      root.classList.remove("sl-theme-dark");
    }

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
        desc: "Browse carbide composition & derived metrics and view TCC estimates.",
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
        return html`<div class="page">
          <vsa-angle-calculator></vsa-angle-calculator>
          <div class="help" aria-label="Angle Calculator Explanation">
            <h2>Knife Angle Calculation</h2>
            <p>
              This calculator uses the width-to-height ratio to determine the
              degrees per side (DPS) of a knife's edge. The formula is based on
              trigonometry: <code>arcsin(width/2/height)</code>.
            </p>
            <p>
              For accurate measurements, ensure the blade is held perpendicular
              to the measuring surface and that the width represents the full
              edge width at the measured height.
            </p>
          </div>
        </div>`;
      case "elevation":
        return html`<div class="page">
          <vsa-elevation-calculator></vsa-elevation-calculator>
          <div class="help" aria-label="Elevation Calculator Explanation">
            <h2>Sharpmaker Elevation Adjustments</h2>
            <p>
              The Spyderco Sharpmaker allows angle adjustments by elevating the
              base. This calculator determines the required elevation (in
              notches) to achieve your target angle from the available rod
              settings.
            </p>
            <p>
              Each notch represents approximately 8 degrees of adjustment. The
              calculation accounts for the geometric relationship between
              elevation and angle change.
            </p>
          </div>
        </div>`;
      case "rotation":
        return html`<div class="page">
          <vsa-rotation-calculator></vsa-rotation-calculator>
          <div class="help" aria-label="Rotation Calculator Explanation">
            <h2>How Rotation Offsets Work</h2>
            <p>
              Rotating the base changes the relative orientation between the
              knife and the rods, allowing intermediate angles without swapping
              to different preset holes. The math multiplies
              <code>sin(target)</code> by <code>csc(setting)</code> and uses
              <code>acos</code> to find the rotation offset. The product must
              stay between -1 and 1 (a domain requirement).
            </p>
            <p>
              If you hit a domain error, pick a target closer to the rod's
              native setting. Very large deviations may be mechanically awkward
              or inconsistent.
            </p>
            <p>
              <strong>Tip:</strong> Rotate gradually and keep the spine vertical
              to avoid inadvertent angle drift.
            </p>
          </div>
        </div>`;
      case "passes":
        return html`<div class="page">
          <vsa-pass-calculator></vsa-pass-calculator>
          <div class="help" aria-label="Pass Counter Explanation">
            <h2>Why Track Progressive Passes?</h2>
            <p>
              Progressive pass reduction refines scratch pattern and apex
              quality while limiting over‑grinding. Starting passes define the
              top sequence; each descending step (minus 10) accelerates
              deburring and polish. Final small counts (5, 3, 2, 1) provide
              controlled finish.
            </p>
            <p>
              The total and X‑stroke count help estimate time investment and
              symmetry. Choose an odd starting number to maintain balanced
              alternation.
            </p>
            <p>
              <strong>Tip:</strong> If steel is hard or wear‑resistant, consider
              a higher starting pass count for proper apex formation.
            </p>
          </div>
        </div>`;
      case "retention":
        // Load steels data for comparison section
        this._loadSteels();
        return html`<div class="page">
          <vsa-retention-calculator
            .availableSteels=${this.availableSteels}
          ></vsa-retention-calculator>
        </div>`;
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
      <vsa-geometry-builder></vsa-geometry-builder>
    </div>`;
  }

  _pageIntro() {
    return html`<div class="page">
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
            <strong>Edge Retention Estimator:</strong> Approximate CATRA TCC and
            material removal volume from hardness, edge angle, and carbide mix.
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

  _pageSteels() {
    if (!customElements.get("vsa-steel-table")) import("./vsa-steel-table");
    return html`<div class="page">
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

  async _loadSteels() {
    if (this.availableSteels.length === 0) {
      try {
        const response = await fetch("/data/steels.json");
        this.availableSteels = await response.json();
      } catch (error) {
        console.error("Failed to load steels:", error);
      }
    }
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

# VSharpAngle PWA

Modern Progressive Web App for rod ("V-stick") knife sharpeners. Provides calculators for angle measurement, Sharpmaker-style elevation & rotation adjustments, progressive pass planning, edge retention estimation using carbide & hardness data, plus a browsable steel table.

## Features
- Angle Measure: Convert bevel width & height behind edge to degrees-per-side (DPS).
- Elevation & Rotation: Derive physical base adjustments to reach desired rod angles.
- Rotation Offset Chart: Explore offsets between 15° / 20° / 25° rod settings.
- Pass Counter: Generate descending stroke sets (e.g. 30 → 20 → 10) with totals & X-strokes.
- Edge Retention Estimator: Approximate CATRA TCC, material removal volume, and stability from hardness, edge angle, carbide fractions.
- Steel Database: Load preset compositions and push values directly into the estimator.
- Offline Support: Fully functional after first visit; caches shell + data.
- Update Awareness: Header shows an "Update Available" button when a new service worker is ready.
- Mobile Friendly: Responsive layout, standalone install, dark mode toggle.

## Installation (Android & Chrome Desktop)
1. Open the site in Chrome/Edge.
2. Wait for it to load; confirm calculators work offline by toggling airplane mode.
3. Use browser menu: Install App / Add to Home Screen.
4. Launch from home screen for standalone experience.

### iOS (Safari)
1. Open the site in Safari.
2. Tap Share > Add to Home Screen.
3. Open from the icon; runs without browser chrome.

## Offline Behavior
- Shell files (`index.html`, manifest, compiled JS) are precached.
- `data/steels.json` uses stale-while-revalidate: cached version served immediately, updated in background.
- CDN Shoelace assets cached with stale-while-revalidate for speed; background refresh keeps them current.
- If navigation fails offline, fallback to cached shell.

## Updates
When a new version is deployed and the service worker finishes installing, an "Update Available" button appears. Press it to activate and reload.

## Accessibility
- Results and error messages use `aria-live` regions (polite announcements).
- Tooltips (`sl-tooltip`) explain each calculator.
- Focus automatically shifts to the first invalid input when validation fails.
- Color contrast tuned for light/dark; gradients maintain sufficient contrast for numeric results.

## Data & Assumptions
- Steel carbide values are illustrative; verify against authoritative sources for production use.
- Edge retention outputs are comparative heuristics (CATRA-inspired), not lab reproductions.
- Hardness typical range: 50–70 HRC; Edge angle typical range: 10°–35° DPS.

## Development
```bash
npm install
npm run dev
```
Visit http://localhost:5173 (default Vite port). The service worker registers only in production builds by default; in dev we import it to exercise offline logic cautiously.

### Build
```bash
npm run build
```
Outputs to `build/`. Deploy `index.html`, `build/assets`, `manifest.json`, `service-worker.js`, and `data/steels.json`.

## Testing (Planned)
Will add unit tests for math utilities (angle, elevation, rotation domain, pass sequencing, edge retention calculations). Run with a lightweight test harness or integrate a framework (Vitest) if desired.

## Future Enhancements
- Internationalization and unit switching (mm/inches).
- User presets & local persistence for common steels.
- More granular rod angle charts.
- Expanded steel dataset with additional carbides & sources.

## Acknowledgments
Thanks to Larrin Thomas for CATRA TCC formula guidance and community contributors refining steel data representations.

## License
MIT (add LICENSE file if distribution is intended).

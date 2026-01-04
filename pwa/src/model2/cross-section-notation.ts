/**
 * Cross-Section Notation Parser -> SegmentSpec adapter
 * Supports compact entry for the SAME vertical cross-section model used by VsaGeometryBuilder.
 *
 * Grammar (subset initial implementation):
 *   [unit=>] token ( , token )*
 *   unit: mm | in  (optional; defaults to caller units if absent)
 * Tokens:
 *   ANGLE TRAVEL: {angle}{mode}-{value}{axis}
 *     angle: number
 *     mode: dps|d|inc|inclusive|i  (dps = degrees per side; inc = inclusive)
 *     axis: h|height|w|width   (absolute target height or width)
 *     examples: 15dps-2.5h, 12inc-0.4w
 *   THICKNESS @ HEIGHT: {thickness}w@{height}h   (absolute thickness at absolute height)
 *     example: 0.25w@3h
 *   CALIPER: {thickness}w@{distance}cp  (thickness reached after slant distance along face from previous segment end)
 *     example: 0.12w@5cp
 *   APEX CALIPER: {thickness}w@{distance}acp  (thickness reached after total distance from apex to outer edge)
 *     example: 0.15w@8acp
 *   OVERALL HEIGHT: {value}H | {value}oa
 *     example: 50H
 *
 * Output: array of SegmentSpec-like structures consumed by geometry builder.
 */

export interface NotationParseResult<Seg> {
  segments: Seg[];
  warnings: string[];
  overallHeight?: number; // mm
  unit?: "mm" | "in";
  notationUnits?: "mm" | "in"; // explicit in string if present
  normalized: string; // cleaned notation
}

export interface SegmentSpecLike {
  angleType: "inclusive" | "dps";
  angleValue: number;
  travelType: "width" | "height";
  travelValue: number; // absolute target width (mm) or height (mm)
}

interface ParsingContext {
  currWidth: number; // mm
  currHeight: number; // mm
  lastInclusiveAngleDeg: number | null; // full inclusive angle deg
}

// Regex patterns (case-insensitive)
const RE_UNIT_PREFIX = /^(mm|in)=>/i;
const RE_OVERALL = /^([0-9]*\.?[0-9]+)(h|H|oa)$/i;
const RE_ANGLE_TRAVEL =
  /^([0-9]*\.?[0-9]+)(dps|d|inc|inclusive|i)-([0-9]*\.?[0-9]+)(h|height|w|width)$/i;
const RE_THICKNESS_AT_HEIGHT =
  /^([0-9]*\.?[0-9]+)w@([0-9]*\.?[0-9]+)(h|height)$/i;
const RE_CALIPER = /^([0-9]*\.?[0-9]+)w@([0-9]*\.?[0-9]+)cp$/i;
const RE_APEX_CALIPER = /^([0-9]*\.?[0-9]+)w@([0-9]*\.?[0-9]+)acp$/i;

function toNumber(str: string): number {
  return parseFloat(str);
}

function dpsToInclusive(dps: number): number {
  return dps * 2;
}

function rad(deg: number): number {
  return (deg * Math.PI) / 180;
}
function deg(radVal: number): number {
  return (radVal * 180) / Math.PI;
}

/**
 * Solve for half-angle alpha given deltaWidth and slant length s along one face:
 * Equation: ΔW = 2 s sin^2(alpha) / cos(alpha)
 * We'll solve for alpha with Newton-Raphson; fall back to approximation if needed.
 */
function solveHalfAngleForCaliper(
  deltaWidth: number,
  s: number
): number | null {
  if (deltaWidth <= 0 || s <= 0) return null;
  // Small-angle initial guess: deltaWidth ≈ 2 s alpha^2  => alpha ≈ sqrt(deltaWidth/(2s))
  let alpha = Math.min(Math.sqrt(deltaWidth / (2 * s)), Math.PI / 3);
  for (let i = 0; i < 15; i++) {
    const sa = Math.sin(alpha);
    const ca = Math.cos(alpha);
    if (Math.abs(ca) < 1e-6) break;
    const f = (2 * s * sa * sa) / ca - deltaWidth;
    const df = 4 * s * sa + (2 * s * sa * sa * sa) / (ca * ca); // derivative derived previously
    if (Math.abs(df) < 1e-12) break;
    const next = alpha - f / df;
    if (!isFinite(next) || next <= 0) break;
    if (Math.abs(next - alpha) < 1e-9) {
      alpha = next;
      break;
    }
    alpha = next;
    if (alpha > Math.PI / 2 - 1e-4) {
      alpha = Math.PI / 2 - 1e-4;
      break;
    }
  }
  if (!isFinite(alpha) || alpha <= 0) return null;
  return alpha;
}

function parseUnitPrefix(input: string): {
  unit: "mm" | "in" | null;
  rest: string;
} {
  const m = input.match(RE_UNIT_PREFIX);
  if (!m) return { unit: null, rest: input };
  return {
    unit: m[1].toLowerCase() as "mm" | "in",
    rest: input.slice(m[0].length),
  };
}

export function parseCrossSectionNotation(
  notation: string,
  currentUnits: "mm" | "in"
): NotationParseResult<SegmentSpecLike> {
  const warnings: string[] = [];
  let txt = notation.trim();
  const { unit: explicitUnit, rest } = parseUnitPrefix(txt);
  if (explicitUnit) txt = rest.trim();
  const notationUnits = explicitUnit ?? null;
  const workingUnits: "mm" | "in" = explicitUnit ?? currentUnits;
  const unitFactor = workingUnits === "mm" ? 1 : 25.4; // convert input to mm
  if (!txt) {
    return {
      segments: [],
      warnings,
      normalized: "",
      unit: currentUnits,
      notationUnits: explicitUnit ?? undefined,
    };
  }
  const rawTokens = txt
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const segments: SegmentSpecLike[] = [];
  const ctx: ParsingContext = {
    currWidth: 0,
    currHeight: 0,
    lastInclusiveAngleDeg: null,
  };
  let overallHeight: number | undefined;

  for (let i = 0; i < rawTokens.length; i++) {
    const token = rawTokens[i];

    // OVERALL HEIGHT
    let m = token.match(RE_OVERALL);
    if (m) {
      overallHeight = toNumber(m[1]) * unitFactor;
      continue;
    }

    // ANGLE + TRAVEL
    m = token.match(RE_ANGLE_TRAVEL);
    if (m) {
      const angleValRaw = toNumber(m[1]);
      const modeRaw = m[2].toLowerCase();
      const travelVal = toNumber(m[3]) * unitFactor;
      const axisRaw = m[4].toLowerCase();
      const angleType: "inclusive" | "dps" =
        modeRaw.startsWith("inc") || modeRaw === "i" ? "inclusive" : "dps";
      const inclusiveAngle =
        angleType === "dps" ? dpsToInclusive(angleValRaw) : angleValRaw;
      if (axisRaw.startsWith("h")) {
        // Height absolute target
        if (travelVal <= ctx.currHeight) {
          warnings.push(
            `Segment ${i + 1}: height ${travelVal.toFixed(
              4
            )} not greater than previous height.`
          );
          continue;
        }
        segments.push({
          angleType,
          angleValue: angleValRaw,
          travelType: "height",
          travelValue: travelVal,
        });
        ctx.lastInclusiveAngleDeg = inclusiveAngle;
      } else {
        // Width absolute target
        if (travelVal <= ctx.currWidth) {
          warnings.push(
            `Segment ${i + 1}: width ${travelVal.toFixed(
              4
            )} not greater than previous width.`
          );
          continue;
        }
        if (inclusiveAngle === 0) {
          warnings.push(
            `Segment ${i + 1}: zero angle with width travel ignored.`
          );
          continue;
        }
        segments.push({
          angleType,
          angleValue: angleValRaw,
          travelType: "width",
          travelValue: travelVal,
        });
        ctx.lastInclusiveAngleDeg = inclusiveAngle;
      }
      // Update current geom via same formulas used later (approx) just for downstream caliper assumptions
      // We'll trust builder recomputation for exact values.
      if (segments[segments.length - 1].travelType === "height") {
        ctx.currHeight = segments[segments.length - 1].travelValue;
        // derive new width via apex relation quickly (rough — builder recalculates precisely)
        const half = rad(inclusiveAngle) / 2;
        if (ctx.currWidth === 0)
          ctx.currWidth = 2 * ctx.currHeight * Math.tan(half);
        else
          ctx.currWidth =
            ctx.currWidth +
            2 * (ctx.currHeight - ctx.currHeight) * Math.tan(half); // delta zero placeholder
      } else {
        // width travel
        const endWidth = segments[segments.length - 1].travelValue;
        const half = rad(inclusiveAngle) / 2;
        const deltaW = endWidth - ctx.currWidth;
        const deltaH =
          ctx.currWidth === 0
            ? endWidth / 2 / Math.tan(half)
            : deltaW / (2 * Math.tan(half));
        ctx.currHeight += deltaH;
        ctx.currWidth = endWidth;
      }
      continue;
    }

    // THICKNESS @ HEIGHT
    m = token.match(RE_THICKNESS_AT_HEIGHT);
    if (m) {
      const thickness = toNumber(m[1]) * unitFactor;
      const targetH = toNumber(m[2]) * unitFactor;
      if (targetH <= ctx.currHeight) {
        warnings.push(
          `Segment ${i + 1}: target height not greater than previous.`
        );
        continue;
      }
      const deltaH = targetH - ctx.currHeight;
      const deltaW = thickness - ctx.currWidth;
      if (deltaW <= 0) {
        warnings.push(
          `Segment ${i + 1}: thickness not greater than previous width.`
        );
        continue;
      }
      // Solve inclusive angle: deltaW = 2 * deltaH * tan(inclusive/2) if prevWidth >0, or thickness = 2 * targetH * tan(inclusive/2) at apex
      let inclusiveAngle: number;
      if (ctx.currWidth === 0 && ctx.currHeight === 0) {
        // apex start
        inclusiveAngle = deg(2 * Math.atan(thickness / (2 * targetH)));
      } else {
        inclusiveAngle = deg(2 * Math.atan(deltaW / (2 * deltaH)));
      }
      if (!isFinite(inclusiveAngle) || inclusiveAngle <= 0) {
        warnings.push(
          `Segment ${i + 1}: could not derive angle from thickness@height.`
        );
        continue;
      }
      segments.push({
        angleType: "inclusive",
        angleValue: inclusiveAngle,
        travelType: "height",
        travelValue: targetH,
      });
      ctx.currHeight = targetH;
      ctx.currWidth = thickness;
      ctx.lastInclusiveAngleDeg = inclusiveAngle;
      continue;
    }

    // CALIPER measurement
    m = token.match(RE_CALIPER);
    if (m) {
      const thickness = toNumber(m[1]) * unitFactor;
      const slant = toNumber(m[2]) * unitFactor; // along face relative to previous point
      if (thickness <= ctx.currWidth) {
        warnings.push(
          `Segment ${i + 1}: caliper thickness not greater than previous width.`
        );
        continue;
      }
      const deltaW = thickness - ctx.currWidth;
      // Solve for half-angle alpha
      let alpha = solveHalfAngleForCaliper(deltaW, slant);
      if (!alpha && deltaW > 0 && slant > 0) {
        // Approx fallback
        alpha = Math.sqrt(deltaW / (2 * slant));
      }
      if (!alpha || !isFinite(alpha)) {
        warnings.push(`Segment ${i + 1}: failed to solve angle from caliper.`);
        continue;
      }
      const inclusiveAngle = deg(alpha * 2);
      const deltaH = slant * Math.sin(alpha);
      const targetWidth = thickness;
      // We'll encode as width travel so builder recomputes height via angle.
      segments.push({
        angleType: "inclusive",
        angleValue: inclusiveAngle,
        travelType: "width",
        travelValue: targetWidth,
      });
      // Update state
      ctx.currWidth = targetWidth;
      ctx.currHeight += deltaH;
      ctx.lastInclusiveAngleDeg = inclusiveAngle;
      continue;
    }

    // APEX CALIPER measurement (from apex to outer edge)
    m = token.match(RE_APEX_CALIPER);
    if (m) {
      const thickness = toNumber(m[1]) * unitFactor;
      const apexDistance = toNumber(m[2]) * unitFactor; // total distance from apex to outer edge
      if (thickness <= ctx.currWidth) {
        warnings.push(
          `Segment ${
            i + 1
          }: apex caliper thickness not greater than previous width.`
        );
        continue;
      }

      // For apex caliper, we need to solve for geometry that gives us:
      // sqrt(height^2 + (thickness/2)^2) = apexDistance
      // So: height^2 + (thickness/2)^2 = apexDistance^2
      // Therefore: height = sqrt(apexDistance^2 - (thickness/2)^2)

      const halfThickness = thickness / 2;
      const heightSquared =
        apexDistance * apexDistance - halfThickness * halfThickness;

      if (heightSquared <= 0) {
        warnings.push(
          `Segment ${i + 1}: apex caliper distance ${apexDistance.toFixed(
            4
          )} too small for thickness ${thickness.toFixed(4)}.`
        );
        continue;
      }

      const targetHeight = Math.sqrt(heightSquared);

      // Calculate the angle needed to reach this thickness at this height
      let inclusiveAngle: number;
      if (ctx.currWidth === 0 && ctx.currHeight === 0) {
        // Starting from apex: thickness = 2 * height * tan(inclusive/2)
        const halfAngle = Math.atan(halfThickness / targetHeight);
        inclusiveAngle = deg(halfAngle * 2);
      } else {
        // From current position: need to calculate delta
        const deltaW = thickness - ctx.currWidth;
        const deltaH = targetHeight - ctx.currHeight;
        if (deltaH <= 0) {
          warnings.push(
            `Segment ${
              i + 1
            }: apex caliper target height ${targetHeight.toFixed(
              4
            )} not greater than current height ${ctx.currHeight.toFixed(4)}.`
          );
          continue;
        }
        const halfAngle = Math.atan(deltaW / (2 * deltaH));
        inclusiveAngle = deg(halfAngle * 2);
      }

      if (!isFinite(inclusiveAngle) || inclusiveAngle <= 0) {
        warnings.push(
          `Segment ${
            i + 1
          }: could not derive angle from apex caliper measurement.`
        );
        continue;
      }

      segments.push({
        angleType: "inclusive",
        angleValue: inclusiveAngle,
        travelType: "height",
        travelValue: targetHeight,
      });

      // Update state
      ctx.currHeight = targetHeight;
      ctx.currWidth = thickness;
      ctx.lastInclusiveAngleDeg = inclusiveAngle;
      continue;
    }

    warnings.push(`Token ${i + 1} '${token}' not recognized.`);
  }

  // Post-process: if overall height specified and last segment height < overall, append zero-angle height extension
  if (overallHeight !== undefined) {
    const lastHeight = ctx.currHeight;
    if (overallHeight > lastHeight + 1e-6) {
      // Add zero-angle segment (height travel, angle inclusive 0)
      segments.push({
        angleType: "inclusive",
        angleValue: 0,
        travelType: "height",
        travelValue: overallHeight,
      });
    }
  }

  const normalized =
    (notationUnits ? notationUnits + "=>" : "") + rawTokens.join(",");
  return {
    segments,
    warnings,
    overallHeight,
    unit: workingUnits,
    notationUnits: notationUnits ?? undefined,
    normalized,
  };
}

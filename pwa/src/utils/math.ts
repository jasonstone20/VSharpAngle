import {
  EdgeRetentionInputs,
  EdgeRetentionResult,
  PassCountResult,
} from "../types.js";

export const deg2rad = (deg: number) => (deg * Math.PI) / 180;
export const rad2deg = (rad: number) => rad / (Math.PI / 180);
export const dcos = (deg: number) => Math.cos(deg2rad(deg));
export const dsin = (deg: number) => Math.sin(deg2rad(deg));
export const dcsc = (deg: number) => 1 / dsin(deg);

export function safeAsin(x: number) {
  return Math.asin(Math.min(1, Math.max(-1, x)));
}
export function safeAcos(x: number) {
  return Math.acos(Math.min(1, Math.max(-1, x)));
}

export function measureAngle(width?: number, height?: number): number | null {
  if (width == null || height == null || height === 0) return null;
  const ans = width / 2 / height;
  if (ans < -1 || ans > 1) return null;
  return Math.floor(rad2deg(safeAsin(ans)));
}

export function sharpmakerElevation(
  desiredAngle?: number,
  sharpenerAngle?: number
): number | null {
  if (desiredAngle == null || sharpenerAngle == null) return null;
  return Math.floor((desiredAngle - sharpenerAngle) * 0.125);
}

export function sharpmakerRotation(
  rotationAngle?: number,
  rotationSharpener?: number
): number | null {
  if (rotationAngle == null || rotationSharpener == null) return null;
  const value = dcsc(rotationSharpener) * dsin(rotationAngle);
  if (value < -1 || value > 1) return null;
  return Math.floor(rad2deg(safeAcos(value)));
}

export function passCount(numberOfPasses?: number): PassCountResult {
  if (!numberOfPasses || numberOfPasses < 1) return { total: 0, sequence: [] };
  const y = numberOfPasses / 10 + 1;
  const x = numberOfPasses * y;
  const startingNumber = numberOfPasses * 2;
  const total = x + 2 + startingNumber;
  const xStrokes = total * 2;
  const sequence: number[] = [];
  for (let n = numberOfPasses; n >= 9; n -= 10) sequence.push(n);
  sequence.push(5, 3, 2, 1);
  return { total, xStrokes, sequence };
}

export function edgeRetention(
  inputs?: EdgeRetentionInputs
): EdgeRetentionResult {
  const {
    hardness = 60,
    edgeAngle = 30,
    CrC = 0,
    CrV = 0,
    MC = 0,
    M6C = 0,
    MN = 0,
    CrN = 0,
    Fe3C = 0,
  } = inputs || {};
  const TCC =
    -157 +
    15.8 * hardness -
    17.8 * edgeAngle +
    11.2 * CrC +
    14.6 * CrV +
    26.2 * MC +
    9.5 * M6C +
    20.9 * MN +
    19.4 * CrN +
    5.0 * Fe3C;
  const volume = CrC + CrV + MC + M6C + MN + CrN + Fe3C;
  let stability: string;
  if (volume > 15) stability = "20°-30°dps";
  else if (volume > 5) stability = "12.5°-20°dps";
  else stability = "8°-12.5°dps";
  return { TCC: Math.round(TCC), volume, stability };
}

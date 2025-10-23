/**
 * Knife Cross-Section Geometry Parser & Modeling Engine
 *
 * This rule engine interprets advanced notation for knife cross-section specifications
 * from apex to spine, converts them into 2D geometric shapes for rendering and comparison,
 * and provides strength analysis using the thickness cubed rule.
 *
 * Notation Examples:
 * - 15dps-0.003w,10dps-0.015w,6dps-0.2w  (with unit selector)
 * - 15dps-0.076w,10dps-0.381w,6dps-5.08w (millimeters equivalent)
 * - 15dps-0.001w,0.08la->0.03w,1la-0.125w
 *
 * Key:
 * - dps: degrees per side (15dps = 30° included angle)
 * - w: width/thickness in specified units
 * - la: length from apex in specified units
 * - ->: transition indicator
 *
 * Cross-section is modeled from apex (0,0) to spine, with triangular/rhomboid segments
 */

enum MeasurementType {
  DPS = "dps", // degrees per side (total included angle = 2x this value)
  WIDTH = "w", // width/thickness in specified units
  LENGTH_APEX = "la", // length from apex in specified units
}

interface Point2D {
  x: number; // distance from apex
  y: number; // thickness at this point
}

interface GeometricShape {
  type: "triangle" | "rhomboid";
  vertices: Point2D[];
  startDistance: number; // distance from apex where shape starts
  endDistance: number; // distance from apex where shape ends
  startThickness: number; // thickness at start
  endThickness: number; // thickness at end
  segmentIndex: number; // which segment this shape represents
}

interface CrossSectionModel {
  totalLength: number; // total distance from apex to spine
  height: number; // maximum thickness of the knife
  shapes: GeometricShape[];
  controlPoints: Point2D[]; // key measurement points
  unit: string;
}

interface Segment {
  dps?: number; // degrees per side (included angle = 2x this value)
  includedAngle?: number; // calculated total included angle in degrees
  width?: number; // width/thickness in specified units
  lengthFromApex?: number; // length from apex in specified units
  isTransition?: boolean; // indicates if this is a transition segment
}

interface ToolGeometry {
  unit: string; // "in" for inches, "mm" for millimeters
  segments: Segment[];
}

interface ComparisonResult {
  position: number; // distance from apex
  model1Thickness: number;
  model2Thickness: number;
  thicknessDifference: number;
  strengthRatio: number; // using thickness cubed rule (t1³/t2³)
}

interface StrengthAnalysis {
  totalLength: number;
  comparisons: ComparisonResult[];
  averageStrengthRatio: number;
  maxStrengthDifference: number;
  criticalPoints: ComparisonResult[]; // points with significant differences
}

class KnifeCrossSectionParser {
  private patterns = {
    dpsWidth: /(\d+)dps-([0-9.]+)w?/i, // 15dps-0.003w or 15dps-0.003
    lengthApexWidth: /([0-9.]+)la->([0-9.]+)w/i, // 0.08la->0.03w
    lengthApex: /([0-9.]+)la-([0-9.]+)/i, // 1la-0.125
    widthOnly: /([0-9.]+)w/i, // standalone width
  };

  /**
   * Parse the complete notation string with optional unit
   */
  parse(notation: string, defaultUnit: string = "in"): ToolGeometry {
    notation = notation.trim();

    let unit: string;
    let segmentsPart: string;

    // Extract unit (everything before =>) if present
    if (notation.includes("=>")) {
      const [unitPart, segments] = notation.split("=>", 2);
      unit = unitPart.trim().toLowerCase();

      // Validate unit
      if (unit !== "in" && unit !== "mm") {
        throw new Error(
          `Invalid unit '${unit}'. Use 'in' for inches or 'mm' for millimeters.`
        );
      }

      segmentsPart = segments;
    } else {
      // No unit prefix, use provided default unit
      unit = defaultUnit;
      segmentsPart = notation;
    }

    // Split segments by comma
    const segmentStrings = segmentsPart.split(",").map((s) => s.trim());

    const segments: Segment[] = [];

    for (const segmentStr of segmentStrings) {
      const segment = this.parseSegment(segmentStr);
      if (segment) {
        segments.push(segment);
      }
    }

    return { unit, segments };
  }

  /**
   * Parse a single segment string
   */
  private parseSegment(segmentStr: string): Segment | null {
    segmentStr = segmentStr.trim();
    const segment: Segment = {};

    // Check for length apex with transition to width
    const laWidthMatch = segmentStr.match(this.patterns.lengthApexWidth);
    if (laWidthMatch) {
      segment.lengthFromApex = parseFloat(laWidthMatch[1]);
      segment.width = parseFloat(laWidthMatch[2]);
      segment.isTransition = true;
      return segment;
    }

    // Check for length apex with width
    const laMatch = segmentStr.match(this.patterns.lengthApex);
    if (laMatch) {
      segment.lengthFromApex = parseFloat(laMatch[1]);
      segment.width = parseFloat(laMatch[2]);
      return segment;
    }

    // Check for DPS with width
    const dpsMatch = segmentStr.match(this.patterns.dpsWidth);
    if (dpsMatch) {
      segment.dps = parseInt(dpsMatch[1]);
      // Calculate included angle (degrees per side * 2)
      segment.includedAngle = segment.dps * 2;
      const value = parseFloat(dpsMatch[2]);

      // Determine if this is width or length based on context
      if (segmentStr.toLowerCase().includes("w") || value < 1.0) {
        // likely width
        segment.width = value;
      } else {
        // likely length from apex
        segment.lengthFromApex = value;
      }

      return segment;
    }

    // Check for standalone width
    const widthMatch = segmentStr.match(this.patterns.widthOnly);
    if (widthMatch) {
      segment.width = parseFloat(widthMatch[1]);
      return segment;
    }

    return null;
  }

  /**
   * Generate a human-readable summary of the geometry
   */
  getSegmentSummary(geometry: ToolGeometry): string {
    const summary: string[] = [
      `Knife Specification in ${geometry.unit.toUpperCase()}:`,
    ];

    geometry.segments.forEach((segment, index) => {
      let segmentDesc = `Segment ${index + 1}:`;

      if (segment.dps !== undefined) {
        segmentDesc += ` ${segment.dps}° per side (${segment.includedAngle}° included)`;
      }

      if (segment.width !== undefined) {
        const unitSymbol = geometry.unit === "mm" ? "mm" : '"';
        if (segment.dps !== undefined) {
          segmentDesc += `, width ${segment.width}${unitSymbol}`;
        } else {
          segmentDesc += ` width ${segment.width}${unitSymbol}`;
        }
      }

      if (segment.lengthFromApex !== undefined) {
        const unitSymbol = geometry.unit === "mm" ? "mm" : '"';
        if (segment.width !== undefined && segment.isTransition) {
          segmentDesc += ` (transitions from ${segment.lengthFromApex}${unitSymbol} from apex)`;
        } else {
          segmentDesc += ` length from apex ${segment.lengthFromApex}${unitSymbol}`;
        }
      }

      summary.push(segmentDesc);
    });

    return summary.join("\n");
  }

  /**
   * Convert parsed geometry into a 2D cross-section model with geometric shapes
   */
  toCrossSectionModel(geometry: ToolGeometry): CrossSectionModel {
    const shapes: GeometricShape[] = [];
    const controlPoints: Point2D[] = [];
    let currentDistance = 0;
    let currentThickness = 0;

    // Start at apex (0,0)
    controlPoints.push({ x: 0, y: 0 });

    for (let i = 0; i < geometry.segments.length; i++) {
      const segment = geometry.segments[i];
      const startDistance = currentDistance;
      const startThickness = currentThickness;

      // Calculate segment end position
      let endDistance: number;
      let endThickness: number;

      if (segment.lengthFromApex !== undefined) {
        endDistance = segment.lengthFromApex;
      } else if (
        segment.dps !== undefined &&
        i < geometry.segments.length - 1
      ) {
        // Estimate distance based on dps and next segment
        const estimatedLength = this.estimateSegmentLength(
          segment,
          i,
          geometry
        );
        endDistance = currentDistance + estimatedLength;
      } else {
        // Use overall apex if available, otherwise estimate
        const totalLength = this.getTotalLength(geometry);
        endDistance = totalLength * ((i + 1) / geometry.segments.length);
      }

      endThickness = segment.width || 0;

      // Create geometric shape
      const shape: GeometricShape = {
        type: this.determineShapeType(segment, startThickness, endThickness),
        vertices: this.createShapeVertices(
          startDistance,
          endDistance,
          startThickness,
          endThickness
        ),
        startDistance,
        endDistance,
        startThickness,
        endThickness,
        segmentIndex: i,
      };

      shapes.push(shape);
      controlPoints.push({ x: endDistance, y: endThickness });

      currentDistance = endDistance;
      currentThickness = endThickness;
    }

    // Calculate the maximum height (thickness) of the knife
    const height = Math.max(...controlPoints.map((p) => p.y), 0);

    return {
      totalLength: currentDistance,
      height,
      shapes,
      controlPoints,
      unit: geometry.unit,
    };
  }

  /**
   * Compare two cross-section models and perform strength analysis
   */
  compareModels(
    model1: CrossSectionModel,
    model2: CrossSectionModel,
    resolution: number = 100
  ): StrengthAnalysis {
    const maxLength = Math.max(model1.totalLength, model2.totalLength);
    const step = maxLength / resolution;
    const comparisons: ComparisonResult[] = [];

    for (let i = 0; i <= resolution; i++) {
      const position = i * step;
      const thickness1 = this.getThicknessAtPosition(model1, position);
      const thickness2 = this.getThicknessAtPosition(model2, position);

      const thicknessDifference = thickness1 - thickness2;
      const strengthRatio =
        thickness2 > 0
          ? Math.pow(thickness1, 3) / Math.pow(thickness2, 3)
          : Infinity;

      comparisons.push({
        position,
        model1Thickness: thickness1,
        model2Thickness: thickness2,
        thicknessDifference,
        strengthRatio,
      });
    }

    const validRatios = comparisons
      .filter((c) => isFinite(c.strengthRatio))
      .map((c) => c.strengthRatio);
    const averageStrengthRatio =
      validRatios.reduce((a, b) => a + b, 0) / validRatios.length;
    const maxStrengthDifference = Math.max(
      ...comparisons.map((c) => Math.abs(c.thicknessDifference))
    );

    // Find critical points (where strength difference is > 50% or thickness difference > 0.01")
    const criticalPoints = comparisons.filter(
      (c) =>
        Math.abs(c.strengthRatio - 1) > 0.5 ||
        Math.abs(c.thicknessDifference) > 0.01
    );

    return {
      totalLength: maxLength,
      comparisons,
      averageStrengthRatio,
      maxStrengthDifference,
      criticalPoints,
    };
  }

  /**
   * Get thickness at a specific position along the cross-section
   */
  private getThicknessAtPosition(
    model: CrossSectionModel,
    position: number
  ): number {
    if (position <= 0) return 0; // At apex
    if (position >= model.totalLength) {
      // Return thickness at spine
      return model.controlPoints[model.controlPoints.length - 1]?.y || 0;
    }

    // Find the shape that contains this position
    for (const shape of model.shapes) {
      if (position >= shape.startDistance && position <= shape.endDistance) {
        // Linear interpolation within the shape
        const ratio =
          (position - shape.startDistance) /
          (shape.endDistance - shape.startDistance);
        return (
          shape.startThickness +
          ratio * (shape.endThickness - shape.startThickness)
        );
      }
    }

    // Fallback: interpolate between control points
    for (let i = 0; i < model.controlPoints.length - 1; i++) {
      const p1 = model.controlPoints[i];
      const p2 = model.controlPoints[i + 1];

      if (position >= p1.x && position <= p2.x) {
        const ratio = (position - p1.x) / (p2.x - p1.x);
        return p1.y + ratio * (p2.y - p1.y);
      }
    }

    return 0;
  }

  private estimateSegmentLength(
    segment: Segment,
    index: number,
    geometry: ToolGeometry
  ): number {
    // Simple estimation based on dps - more dots = finer detail = shorter segment
    if (segment.dps) {
      const baseLengthPerDps = 0.01; // 0.01" per dot as base
      return Math.max(0.005, baseLengthPerDps * (20 - segment.dps)); // Inverse relationship
    }
    return 0.1; // Default segment length
  }

  private getTotalLength(geometry: ToolGeometry): number {
    // Check for explicit length measurements
    let maxLength = 0;
    for (const segment of geometry.segments) {
      if (segment.lengthFromApex && segment.lengthFromApex > maxLength) {
        maxLength = segment.lengthFromApex;
      }
    }

    return maxLength || 1.0; // Default 1" if no length specified
  }

  private determineShapeType(
    segment: Segment,
    startThickness: number,
    endThickness: number
  ): "triangle" | "rhomboid" {
    // If starting from apex (thickness 0), it's a triangle
    if (startThickness === 0) return "triangle";
    // If both start and end have thickness, it's a rhomboid
    return "rhomboid";
  }

  private createShapeVertices(
    startDist: number,
    endDist: number,
    startThick: number,
    endThick: number
  ): Point2D[] {
    const vertices: Point2D[] = [];

    if (startThick === 0) {
      // Triangle from apex
      vertices.push({ x: startDist, y: 0 }); // Apex
      vertices.push({ x: endDist, y: endThick / 2 }); // Top edge
      vertices.push({ x: endDist, y: -endThick / 2 }); // Bottom edge
    } else {
      // Rhomboid/trapezoid
      vertices.push({ x: startDist, y: startThick / 2 }); // Top left
      vertices.push({ x: endDist, y: endThick / 2 }); // Top right
      vertices.push({ x: endDist, y: -endThick / 2 }); // Bottom right
      vertices.push({ x: startDist, y: -startThick / 2 }); // Bottom left
    }

    return vertices;
  }
}

// Example usage and testing
function testParser(): void {
  const parser = new KnifeCrossSectionParser();

  const testCases = [
    "in=>15dps-0.003w,10dps-0.015w,6dps-0.2w",
    "in=>15dps-0.001w,0.08la->0.03w,1la-0.125w",
    "mm=>15dps-0.076w,10dps-0.381w,6dps-5.08w",
  ];

  console.log("=== Knife Cross-Section Parser Test Results ===\n");

  testCases.forEach((testCase, index) => {
    console.log(`Test Case ${index + 1}: ${testCase}`);
    console.log("-".repeat(50));

    try {
      const geometry = parser.parse(testCase);
      const model = parser.toCrossSectionModel(geometry);

      console.log("Parsed Geometry:", geometry);
      console.log("\nCross-Section Model:");
      const unitSymbol = model.unit === "mm" ? "mm" : '"';
      console.log(
        `Total Length: ${model.totalLength}${unitSymbol} (${model.unit})`
      );
      console.log(
        `Maximum Height: ${model.height}${unitSymbol} (${model.unit})`
      );
      console.log(`Number of Shapes: ${model.shapes.length}`);
      console.log(`Control Points: ${model.controlPoints.length}`);

      console.log("\nGeometric Shapes:");
      model.shapes.forEach((shape, i) => {
        console.log(`  Shape ${i + 1}: ${shape.type}`);
        console.log(
          `    Distance: ${shape.startDistance}${unitSymbol} to ${shape.endDistance}${unitSymbol}`
        );
        console.log(
          `    Thickness: ${shape.startThickness}${unitSymbol} to ${shape.endThickness}${unitSymbol}`
        );
      });

      console.log("\nSummary:");
      console.log(parser.getSegmentSummary(geometry));
      console.log("\n" + "=".repeat(70) + "\n");
    } catch (error) {
      console.error(`Error parsing: ${error}\n`);
    }
  });

  // Test comparison functionality
  console.log("=== Model Comparison Test ===");
  const model1Geometry = parser.parse(
    "in=>15dps-0.003w,10dps-0.015w,5dps-0.2w"
  );
  const model2Geometry = parser.parse(
    "in=>20dps-0.002w,8dps-0.012w,4dps-0.18w"
  );

  const model1 = parser.toCrossSectionModel(model1Geometry);
  const model2 = parser.toCrossSectionModel(model2Geometry);

  const analysis = parser.compareModels(model1, model2, 50);

  console.log(`Comparison Results:`);
  const unitSymbol1 = model1.unit === "mm" ? "mm" : '"';
  const unitSymbol2 = model2.unit === "mm" ? "mm" : '"';
  console.log(
    `Model 1 Height: ${model1.height.toFixed(4)}${unitSymbol1} (${model1.unit})`
  );
  console.log(
    `Model 2 Height: ${model2.height.toFixed(4)}${unitSymbol2} (${model2.unit})`
  );
  console.log(
    `Height Difference: ${(model1.height - model2.height).toFixed(
      4
    )}${unitSymbol1}`
  );
  console.log(
    `Average Strength Ratio: ${analysis.averageStrengthRatio.toFixed(3)}`
  );
  console.log(
    `Max Thickness Difference: ${analysis.maxStrengthDifference.toFixed(
      4
    )}${unitSymbol1}`
  );
  console.log(`Critical Points: ${analysis.criticalPoints.length}`);

  if (analysis.criticalPoints.length > 0) {
    console.log("\nFirst few critical points:");
    analysis.criticalPoints.slice(0, 3).forEach((point) => {
      console.log(
        `  At ${point.position.toFixed(
          3
        )}${unitSymbol1}: Model1=${point.model1Thickness.toFixed(
          4
        )}${unitSymbol1}, Model2=${point.model2Thickness.toFixed(
          4
        )}${unitSymbol2}, Strength Ratio=${point.strengthRatio.toFixed(2)}`
      );
    });
  }
}

// Export for use in other modules
export { KnifeCrossSectionParser, MeasurementType };

export type {
  ToolGeometry,
  Segment,
  CrossSectionModel,
  GeometricShape,
  Point2D,
  ComparisonResult,
  StrengthAnalysis,
};

// Run tests if this file is executed directly
if (typeof window === "undefined") {
  testParser();
}

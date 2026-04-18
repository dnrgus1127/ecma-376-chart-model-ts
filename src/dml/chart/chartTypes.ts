/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/chart
 * Source:    dml-chart.xsd — concrete chart type containers.
 *
 * All chart types share a common sub-structure; we centralize it via a
 * generic `ChartBase<S extends SeriesBase>` template. Chart-type specific
 * attributes are added in subclasses.
 */

import { OoxmlElement } from "../../base/index.js";
import { CT_OfficeArtExtensionList } from "../main/index.js";
import {
  CT_Boolean,
  CT_UnsignedInt,
  CT_Grouping,
  CT_BarGrouping,
  CT_BarDir,
  CT_Shape,
  CT_ScatterStyle,
  CT_RadarStyle,
  CT_OfPieType,
  CT_GapAmount,
  CT_Overlap,
  CT_FirstSliceAng,
  CT_HoleSize,
  CT_SecondPieSize,
  CT_SplitType,
  CT_SizeRepresents,
  CT_BubbleScale,
  CT_DepthPercent,
} from "./wrappers.js";
import { CT_DLbls } from "./labels.js";
import { CT_ChartLines } from "./axes.js";
import { CT_UpDownBars } from "./trendline.js";
import {
  SeriesBase,
  CT_LineSer,
  CT_ScatterSer,
  CT_RadarSer,
  CT_BarSer,
  CT_AreaSer,
  CT_PieSer,
  CT_BubbleSer,
  CT_SurfaceSer,
  type AnySeries,
} from "./series.js";

/* ---------- Generic chart base ---------- */

/**
 * ChartBase<S> — shared structure for every CT_*Chart:
 *   varyColors? + ser[] + dLbls? + axId[]  (axis references vary per chart)
 *
 * `S` constrains the series constructor so subclasses get typed `series()`.
 */
export abstract class ChartBase<S extends SeriesBase> extends OoxmlElement {
  protected abstract readonly seriesCtor: new () => S;

  get varyColors(): CT_Boolean | undefined { return this.findChild(CT_Boolean); }
  set varyColors(v: CT_Boolean | undefined) {
    const prev = this.varyColors;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /** Access the list of series attached to this chart. */
  get series(): S[] {
    return this.children.filter((c): c is S => c instanceof this.seriesCtor);
  }

  addSeries(s: S = new this.seriesCtor()): S {
    this.addChild(s);
    return s;
  }

  /** Default data labels applied to every series. */
  get dLbls(): CT_DLbls | undefined { return this.findChild(CT_DLbls); }
  set dLbls(v: CT_DLbls | undefined) {
    const prev = this.dLbls;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /** `<c:axId>` references — chart-type dependent arity (2 or 3). */
  get axisIds(): CT_UnsignedInt[] { return this.findChildren(CT_UnsignedInt); }
  addAxisId(id: CT_UnsignedInt) { this.addChild(id); }

  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Line / stock / line3D ---------- */

abstract class LineLikeBase extends ChartBase<CT_LineSer> {
  protected readonly seriesCtor = CT_LineSer;
  get grouping(): CT_Grouping | undefined { return this.findChild(CT_Grouping); }
  set grouping(v: CT_Grouping | undefined) {
    const prev = this.grouping;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** dropLines / hiLowLines — CT_ChartLines. TODO: disambiguate. */
  get dropLines(): CT_ChartLines | undefined { return this.findChild(CT_ChartLines); }
  set dropLines(_v: CT_ChartLines | undefined) { /* TODO */ }
  get hiLowLines(): CT_ChartLines | undefined { return undefined; /* TODO */ }
  set hiLowLines(_v: CT_ChartLines | undefined) { /* TODO */ }
  get upDownBars(): CT_UpDownBars | undefined { return this.findChild(CT_UpDownBars); }
  set upDownBars(v: CT_UpDownBars | undefined) {
    const prev = this.upDownBars;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** marker / smooth — CT_Boolean. TODO: disambiguate. */
  get marker(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set marker(_v: CT_Boolean | undefined) { /* TODO */ }
  get smooth(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set smooth(_v: CT_Boolean | undefined) { /* TODO */ }
}

export class CT_LineChart extends LineLikeBase { get elementName() { return "lineChart"; } }
export class CT_StockChart extends LineLikeBase { get elementName() { return "stockChart"; } }
export class CT_Line3DChart extends LineLikeBase {
  get elementName() { return "line3DChart"; }
  get gapDepth(): CT_GapAmount | undefined { return this.findChild(CT_GapAmount); }
  set gapDepth(v: CT_GapAmount | undefined) {
    const prev = this.gapDepth;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Scatter ---------- */

export class CT_ScatterChart extends ChartBase<CT_ScatterSer> {
  get elementName() { return "scatterChart"; }
  protected readonly seriesCtor = CT_ScatterSer;
  get scatterStyle(): CT_ScatterStyle | undefined { return this.findChild(CT_ScatterStyle); }
  set scatterStyle(v: CT_ScatterStyle | undefined) {
    const prev = this.scatterStyle;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Radar ---------- */

export class CT_RadarChart extends ChartBase<CT_RadarSer> {
  get elementName() { return "radarChart"; }
  protected readonly seriesCtor = CT_RadarSer;
  get radarStyle(): CT_RadarStyle | undefined { return this.findChild(CT_RadarStyle); }
  set radarStyle(v: CT_RadarStyle | undefined) {
    const prev = this.radarStyle;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Bar / bar3D ---------- */

abstract class BarLikeBase extends ChartBase<CT_BarSer> {
  protected readonly seriesCtor = CT_BarSer;
  get barDir(): CT_BarDir | undefined { return this.findChild(CT_BarDir); }
  set barDir(v: CT_BarDir | undefined) {
    const prev = this.barDir;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get grouping(): CT_BarGrouping | undefined { return this.findChild(CT_BarGrouping); }
  set grouping(v: CT_BarGrouping | undefined) {
    const prev = this.grouping;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get gapWidth(): CT_GapAmount | undefined { return this.findChild(CT_GapAmount); }
  set gapWidth(v: CT_GapAmount | undefined) {
    const prev = this.gapWidth;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_BarChart extends BarLikeBase {
  get elementName() { return "barChart"; }
  get overlap(): CT_Overlap | undefined { return this.findChild(CT_Overlap); }
  set overlap(v: CT_Overlap | undefined) {
    const prev = this.overlap;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get serLines(): CT_ChartLines[] { return this.findChildren(CT_ChartLines); }
  addSerLine(l: CT_ChartLines) { this.addChild(l); }
}

export class CT_Bar3DChart extends BarLikeBase {
  get elementName() { return "bar3DChart"; }
  /** gapDepth — different from BarLikeBase's gapWidth. TODO: disambiguate. */
  get gapDepth(): CT_GapAmount | undefined { return undefined; /* TODO */ }
  set gapDepth(_v: CT_GapAmount | undefined) { /* TODO */ }
  get shape(): CT_Shape | undefined { return this.findChild(CT_Shape); }
  set shape(v: CT_Shape | undefined) {
    const prev = this.shape;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Area / area3D ---------- */

abstract class AreaLikeBase extends ChartBase<CT_AreaSer> {
  protected readonly seriesCtor = CT_AreaSer;
  get grouping(): CT_Grouping | undefined { return this.findChild(CT_Grouping); }
  set grouping(v: CT_Grouping | undefined) {
    const prev = this.grouping;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get dropLines(): CT_ChartLines | undefined { return this.findChild(CT_ChartLines); }
  set dropLines(v: CT_ChartLines | undefined) {
    const prev = this.dropLines;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_AreaChart extends AreaLikeBase { get elementName() { return "areaChart"; } }
export class CT_Area3DChart extends AreaLikeBase {
  get elementName() { return "area3DChart"; }
  get gapDepth(): CT_GapAmount | undefined { return undefined; /* TODO */ }
  set gapDepth(_v: CT_GapAmount | undefined) { /* TODO */ }
}

/* ---------- Pie / pie3D / doughnut / pie-of-pie ---------- */

/**
 * Common base for flat-pie variants (pie, doughnut, of-pie). All three share
 * the optional `firstSliceAng`; Pie3D does not use it but inheriting it is
 * harmless — unset slots are not serialized.
 */
abstract class PieLikeBase extends ChartBase<CT_PieSer> {
  protected readonly seriesCtor = CT_PieSer;
  get firstSliceAng(): CT_FirstSliceAng | undefined { return this.findChild(CT_FirstSliceAng); }
  set firstSliceAng(v: CT_FirstSliceAng | undefined) {
    const prev = this.firstSliceAng;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_PieChart extends PieLikeBase { get elementName() { return "pieChart"; } }
export class CT_Pie3DChart extends PieLikeBase { get elementName() { return "pie3DChart"; } }

export class CT_DoughnutChart extends PieLikeBase {
  get elementName() { return "doughnutChart"; }
  get holeSize(): CT_HoleSize | undefined { return this.findChild(CT_HoleSize); }
  set holeSize(v: CT_HoleSize | undefined) {
    const prev = this.holeSize;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_OfPieChart extends PieLikeBase {
  get elementName() { return "ofPieChart"; }
  get ofPieType(): CT_OfPieType | undefined { return this.findChild(CT_OfPieType); }
  set ofPieType(v: CT_OfPieType | undefined) {
    const prev = this.ofPieType;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get gapWidth(): CT_GapAmount | undefined { return this.findChild(CT_GapAmount); }
  set gapWidth(v: CT_GapAmount | undefined) {
    const prev = this.gapWidth;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get splitType(): CT_SplitType | undefined { return this.findChild(CT_SplitType); }
  set splitType(v: CT_SplitType | undefined) {
    const prev = this.splitType;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** splitPos (CT_Double). TODO: disambiguate from other CT_Double slots. */
  get secondPieSize(): CT_SecondPieSize | undefined { return this.findChild(CT_SecondPieSize); }
  set secondPieSize(v: CT_SecondPieSize | undefined) {
    const prev = this.secondPieSize;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get serLines(): CT_ChartLines[] { return this.findChildren(CT_ChartLines); }
  addSerLine(l: CT_ChartLines) { this.addChild(l); }
}

/* ---------- Bubble ---------- */

export class CT_BubbleChart extends ChartBase<CT_BubbleSer> {
  get elementName() { return "bubbleChart"; }
  protected readonly seriesCtor = CT_BubbleSer;
  /** bubble3D / showNegBubbles — CT_Boolean. TODO: disambiguate. */
  get bubble3D(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set bubble3D(_v: CT_Boolean | undefined) { /* TODO */ }
  get showNegBubbles(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set showNegBubbles(_v: CT_Boolean | undefined) { /* TODO */ }
  get bubbleScale(): CT_BubbleScale | undefined { return this.findChild(CT_BubbleScale); }
  set bubbleScale(v: CT_BubbleScale | undefined) {
    const prev = this.bubbleScale;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get sizeRepresents(): CT_SizeRepresents | undefined { return this.findChild(CT_SizeRepresents); }
  set sizeRepresents(v: CT_SizeRepresents | undefined) {
    const prev = this.sizeRepresents;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Surface / surface3D ---------- */

export class CT_BandFmt extends OoxmlElement {
  get elementName() { return "bandFmt"; }
  get idx(): CT_UnsignedInt | undefined { return this.findChild(CT_UnsignedInt); }
  set idx(v: CT_UnsignedInt | undefined) {
    const prev = this.idx;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  // TODO: spPr
}
export class CT_BandFmts extends OoxmlElement {
  get elementName() { return "bandFmts"; }
  get bandFmts(): CT_BandFmt[] { return this.findChildren(CT_BandFmt); }
  add(b: CT_BandFmt) { this.addChild(b); }
}

abstract class SurfaceLikeBase extends ChartBase<CT_SurfaceSer> {
  protected readonly seriesCtor = CT_SurfaceSer;
  get wireframe(): CT_Boolean | undefined { return this.findChild(CT_Boolean); }
  set wireframe(v: CT_Boolean | undefined) {
    const prev = this.wireframe;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get bandFmts(): CT_BandFmts | undefined { return this.findChild(CT_BandFmts); }
  set bandFmts(v: CT_BandFmts | undefined) {
    const prev = this.bandFmts;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_SurfaceChart extends SurfaceLikeBase { get elementName() { return "surfaceChart"; } }
export class CT_Surface3DChart extends SurfaceLikeBase { get elementName() { return "surface3DChart"; } }

/* ---------- Union of all chart types ---------- */

export type AnyChart =
  | CT_LineChart | CT_Line3DChart | CT_StockChart
  | CT_BarChart | CT_Bar3DChart
  | CT_AreaChart | CT_Area3DChart
  | CT_PieChart | CT_Pie3DChart | CT_DoughnutChart | CT_OfPieChart
  | CT_ScatterChart | CT_RadarChart | CT_BubbleChart
  | CT_SurfaceChart | CT_Surface3DChart;

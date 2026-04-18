/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/chart
 * Source:    dml-chart.xsd — series types (CT_LineSer, CT_BarSer, CT_PieSer,
 *            CT_ScatterSer, CT_AreaSer, CT_RadarSer, CT_BubbleSer, CT_SurfaceSer).
 *
 * All series share the EG_SerShared header (idx + order + tx + spPr).
 * We centralize this in an abstract base to cut duplication.
 */

import { OoxmlElement } from "../../base/index.js";
import { CT_ShapeProperties, CT_OfficeArtExtensionList } from "../main/index.js";
import {
  CT_Boolean,
  CT_UnsignedInt,
  CT_Shape,
} from "./wrappers.js";
import { CT_SerTx, CT_NumDataSource, CT_AxDataSource } from "./data.js";
import { CT_Marker, CT_DPt, CT_PictureOptions } from "./markers.js";
import { CT_DLbls } from "./labels.js";
import { CT_Trendline, CT_ErrBars } from "./trendline.js";

/* ---------- Shared EG_SerShared base ---------- */

/**
 * SeriesBase — common header for every chart series: idx + order + tx + spPr.
 *
 * Subclasses add their chart-type-specific children. The generic type `V`
 * refines the value-like data source (e.g., `CT_NumDataSource` for number
 * series, `CT_AxDataSource` for categories).
 */
export abstract class SeriesBase extends OoxmlElement {
  /** `<c:idx>` CT_UnsignedInt — series index. */
  get idx(): CT_UnsignedInt | undefined { return this.findChildren(CT_UnsignedInt)[0]; }
  set idx(v: CT_UnsignedInt | undefined) {
    const prev = this.idx;
    if (prev) this.removeChild(prev);
    if (v) this.children.unshift(v);
  }
  /** `<c:order>` CT_UnsignedInt — display order. */
  get order(): CT_UnsignedInt | undefined { return this.findChildren(CT_UnsignedInt)[1]; }
  set order(v: CT_UnsignedInt | undefined) {
    const prev = this.order;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get tx(): CT_SerTx | undefined { return this.findChild(CT_SerTx); }
  set tx(v: CT_SerTx | undefined) {
    const prev = this.tx;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get spPr(): CT_ShapeProperties | undefined { return this.findChild(CT_ShapeProperties); }
  set spPr(v: CT_ShapeProperties | undefined) {
    const prev = this.spPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Mixin helpers (composition over multiple inheritance) ---------- */

/**
 * Mixin providing the `dLbls`, `dPt[]`, `marker?`, `trendline[]` slots shared
 * by several series types.
 */
abstract class SeriesCommonBase extends SeriesBase {
  get dPts(): CT_DPt[] { return this.findChildren(CT_DPt); }
  addDPt(p: CT_DPt) { this.addChild(p); }
  get dLbls(): CT_DLbls | undefined { return this.findChild(CT_DLbls); }
  set dLbls(v: CT_DLbls | undefined) {
    const prev = this.dLbls;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get trendlines(): CT_Trendline[] { return this.findChildren(CT_Trendline); }
  addTrendline(t: CT_Trendline) { this.addChild(t); }
  /** Single or multiple error bars depending on chart type. */
  get errBars(): CT_ErrBars[] { return this.findChildren(CT_ErrBars); }
  addErrBars(e: CT_ErrBars) { this.addChild(e); }
}

/* ---------- Concrete series ---------- */

export class CT_LineSer extends SeriesCommonBase {
  get elementName() { return "ser"; }
  get marker(): CT_Marker | undefined { return this.findChild(CT_Marker); }
  set marker(v: CT_Marker | undefined) {
    const prev = this.marker;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get cat(): CT_AxDataSource | undefined { return this.findChild(CT_AxDataSource); }
  set cat(v: CT_AxDataSource | undefined) {
    const prev = this.cat;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get val(): CT_NumDataSource | undefined { return this.findChild(CT_NumDataSource); }
  set val(v: CT_NumDataSource | undefined) {
    const prev = this.val;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** smooth — CT_Boolean. */
  get smooth(): CT_Boolean | undefined { return this.findChild(CT_Boolean); }
  set smooth(v: CT_Boolean | undefined) {
    const prev = this.smooth;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_ScatterSer extends SeriesCommonBase {
  get elementName() { return "ser"; }
  get marker(): CT_Marker | undefined { return this.findChild(CT_Marker); }
  set marker(v: CT_Marker | undefined) {
    const prev = this.marker;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** xVal / yVal — both CT_AxDataSource / CT_NumDataSource. TODO: disambiguate. */
  get xVal(): CT_AxDataSource | undefined { return this.findChild(CT_AxDataSource); }
  set xVal(_v: CT_AxDataSource | undefined) { /* TODO */ }
  get yVal(): CT_NumDataSource | undefined { return this.findChild(CT_NumDataSource); }
  set yVal(_v: CT_NumDataSource | undefined) { /* TODO */ }
  get smooth(): CT_Boolean | undefined { return this.findChild(CT_Boolean); }
  set smooth(v: CT_Boolean | undefined) {
    const prev = this.smooth;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_RadarSer extends SeriesCommonBase {
  get elementName() { return "ser"; }
  get marker(): CT_Marker | undefined { return this.findChild(CT_Marker); }
  set marker(v: CT_Marker | undefined) {
    const prev = this.marker;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get cat(): CT_AxDataSource | undefined { return this.findChild(CT_AxDataSource); }
  set cat(v: CT_AxDataSource | undefined) {
    const prev = this.cat;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get val(): CT_NumDataSource | undefined { return this.findChild(CT_NumDataSource); }
  set val(v: CT_NumDataSource | undefined) {
    const prev = this.val;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_BarSer extends SeriesCommonBase {
  get elementName() { return "ser"; }
  get invertIfNegative(): CT_Boolean | undefined { return this.findChild(CT_Boolean); }
  set invertIfNegative(v: CT_Boolean | undefined) {
    const prev = this.invertIfNegative;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get pictureOptions(): CT_PictureOptions | undefined { return this.findChild(CT_PictureOptions); }
  set pictureOptions(v: CT_PictureOptions | undefined) {
    const prev = this.pictureOptions;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get cat(): CT_AxDataSource | undefined { return this.findChild(CT_AxDataSource); }
  set cat(v: CT_AxDataSource | undefined) {
    const prev = this.cat;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get val(): CT_NumDataSource | undefined { return this.findChild(CT_NumDataSource); }
  set val(v: CT_NumDataSource | undefined) {
    const prev = this.val;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get shape(): CT_Shape | undefined { return this.findChild(CT_Shape); }
  set shape(v: CT_Shape | undefined) {
    const prev = this.shape;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_AreaSer extends SeriesCommonBase {
  get elementName() { return "ser"; }
  get pictureOptions(): CT_PictureOptions | undefined { return this.findChild(CT_PictureOptions); }
  set pictureOptions(v: CT_PictureOptions | undefined) {
    const prev = this.pictureOptions;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get cat(): CT_AxDataSource | undefined { return this.findChild(CT_AxDataSource); }
  set cat(v: CT_AxDataSource | undefined) {
    const prev = this.cat;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get val(): CT_NumDataSource | undefined { return this.findChild(CT_NumDataSource); }
  set val(v: CT_NumDataSource | undefined) {
    const prev = this.val;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_PieSer extends SeriesBase {
  get elementName() { return "ser"; }
  get dPts(): CT_DPt[] { return this.findChildren(CT_DPt); }
  addDPt(p: CT_DPt) { this.addChild(p); }
  get dLbls(): CT_DLbls | undefined { return this.findChild(CT_DLbls); }
  set dLbls(v: CT_DLbls | undefined) {
    const prev = this.dLbls;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** explosion — CT_UnsignedInt separate from idx/order. TODO: disambiguate. */
  get explosion(): CT_UnsignedInt | undefined { return undefined; /* TODO */ }
  set explosion(_v: CT_UnsignedInt | undefined) { /* TODO */ }
  get cat(): CT_AxDataSource | undefined { return this.findChild(CT_AxDataSource); }
  set cat(v: CT_AxDataSource | undefined) {
    const prev = this.cat;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get val(): CT_NumDataSource | undefined { return this.findChild(CT_NumDataSource); }
  set val(v: CT_NumDataSource | undefined) {
    const prev = this.val;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_BubbleSer extends SeriesCommonBase {
  get elementName() { return "ser"; }
  get invertIfNegative(): CT_Boolean | undefined { return this.findChild(CT_Boolean); }
  set invertIfNegative(v: CT_Boolean | undefined) {
    const prev = this.invertIfNegative;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** xVal / yVal / bubbleSize. TODO: disambiguate. */
  get xVal(): CT_AxDataSource | undefined { return this.findChild(CT_AxDataSource); }
  set xVal(_v: CT_AxDataSource | undefined) { /* TODO */ }
  get yVal(): CT_NumDataSource | undefined { return this.findChild(CT_NumDataSource); }
  set yVal(_v: CT_NumDataSource | undefined) { /* TODO */ }
  get bubbleSize(): CT_NumDataSource | undefined { return undefined; /* TODO */ }
  set bubbleSize(_v: CT_NumDataSource | undefined) { /* TODO */ }
  get bubble3D(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set bubble3D(_v: CT_Boolean | undefined) { /* TODO */ }
}

export class CT_SurfaceSer extends SeriesBase {
  get elementName() { return "ser"; }
  get cat(): CT_AxDataSource | undefined { return this.findChild(CT_AxDataSource); }
  set cat(v: CT_AxDataSource | undefined) {
    const prev = this.cat;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get val(): CT_NumDataSource | undefined { return this.findChild(CT_NumDataSource); }
  set val(v: CT_NumDataSource | undefined) {
    const prev = this.val;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export type AnySeries =
  | CT_LineSer
  | CT_ScatterSer
  | CT_RadarSer
  | CT_BarSer
  | CT_AreaSer
  | CT_PieSer
  | CT_BubbleSer
  | CT_SurfaceSer;

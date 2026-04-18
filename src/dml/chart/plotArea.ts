/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/chart
 * Source:    dml-chart.xsd — plot area, 3D view, surfaces, data table.
 */

import { OoxmlElement } from "../../base/index.js";
import { CT_ShapeProperties, CT_TextBody, CT_OfficeArtExtensionList } from "../main/index.js";
import {
  CT_Boolean,
  CT_RotX,
  CT_RotY,
  CT_HPercent,
  CT_DepthPercent,
  CT_Perspective,
  CT_Thickness,
} from "./wrappers.js";
import { CT_Layout } from "./labels.js";
import { CT_PictureOptions } from "./markers.js";
import { CT_CatAx, CT_ValAx, CT_DateAx, CT_SerAx, type ChartAxis } from "./axes.js";
import {
  CT_LineChart, CT_Line3DChart, CT_StockChart,
  CT_BarChart, CT_Bar3DChart,
  CT_AreaChart, CT_Area3DChart,
  CT_PieChart, CT_Pie3DChart, CT_DoughnutChart, CT_OfPieChart,
  CT_ScatterChart, CT_RadarChart, CT_BubbleChart,
  CT_SurfaceChart, CT_Surface3DChart,
  type AnyChart,
} from "./chartTypes.js";

/* ---------- 3D view ---------- */

export class CT_View3D extends OoxmlElement {
  get elementName() { return "view3D"; }
  get rotX(): CT_RotX | undefined { return this.findChild(CT_RotX); }
  set rotX(v: CT_RotX | undefined) {
    const prev = this.rotX;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get hPercent(): CT_HPercent | undefined { return this.findChild(CT_HPercent); }
  set hPercent(v: CT_HPercent | undefined) {
    const prev = this.hPercent;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get rotY(): CT_RotY | undefined { return this.findChild(CT_RotY); }
  set rotY(v: CT_RotY | undefined) {
    const prev = this.rotY;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get depthPercent(): CT_DepthPercent | undefined { return this.findChild(CT_DepthPercent); }
  set depthPercent(v: CT_DepthPercent | undefined) {
    const prev = this.depthPercent;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get rAngAx(): CT_Boolean | undefined { return this.findChild(CT_Boolean); }
  set rAngAx(v: CT_Boolean | undefined) {
    const prev = this.rAngAx;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get perspective(): CT_Perspective | undefined { return this.findChild(CT_Perspective); }
  set perspective(v: CT_Perspective | undefined) {
    const prev = this.perspective;
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

/* ---------- Wall / floor surface ---------- */

export class CT_Surface extends OoxmlElement {
  get elementName() { return "floor"; } // also sideWall / backWall
  get thickness(): CT_Thickness | undefined { return this.findChild(CT_Thickness); }
  set thickness(v: CT_Thickness | undefined) {
    const prev = this.thickness;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get spPr(): CT_ShapeProperties | undefined { return this.findChild(CT_ShapeProperties); }
  set spPr(v: CT_ShapeProperties | undefined) {
    const prev = this.spPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get pictureOptions(): CT_PictureOptions | undefined { return this.findChild(CT_PictureOptions); }
  set pictureOptions(v: CT_PictureOptions | undefined) {
    const prev = this.pictureOptions;
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

/* ---------- Data table ---------- */

export class CT_DTable extends OoxmlElement {
  get elementName() { return "dTable"; }
  /** Four CT_Boolean children (showHorzBorder/showVertBorder/showOutline/showKeys).
   *  TODO: element-name aware disambiguation. */
  get showHorzBorder(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set showHorzBorder(_v: CT_Boolean | undefined) { /* TODO */ }
  get showVertBorder(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set showVertBorder(_v: CT_Boolean | undefined) { /* TODO */ }
  get showOutline(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set showOutline(_v: CT_Boolean | undefined) { /* TODO */ }
  get showKeys(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set showKeys(_v: CT_Boolean | undefined) { /* TODO */ }
  get spPr(): CT_ShapeProperties | undefined { return this.findChild(CT_ShapeProperties); }
  set spPr(v: CT_ShapeProperties | undefined) {
    const prev = this.spPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get txPr(): CT_TextBody | undefined { return this.findChild(CT_TextBody); }
  set txPr(v: CT_TextBody | undefined) {
    const prev = this.txPr;
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

/* ---------- Plot area ---------- */

/**
 * CT_PlotArea — container for one or more chart type elements and the axes
 * used by those chart types.
 *
 * XSD structure:
 *   layout? + (one-of plot type)+ + (axis)* + dTable? + spPr? + extLst?
 *
 * A plot area can host multiple chart types stacked (e.g., a combo chart
 * with a bar + line). We expose each chart-type slot as its own getter that
 * searches by concrete class, and a general `charts` array listing them in
 * XML order.
 */
export class CT_PlotArea extends OoxmlElement {
  get elementName() { return "plotArea"; }

  get layout(): CT_Layout | undefined { return this.findChild(CT_Layout); }
  set layout(v: CT_Layout | undefined) {
    const prev = this.layout;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /** All chart-type children (in document order). */
  get charts(): AnyChart[] {
    return this.children.filter((c): c is AnyChart =>
      c instanceof CT_LineChart ||
      c instanceof CT_Line3DChart ||
      c instanceof CT_StockChart ||
      c instanceof CT_BarChart ||
      c instanceof CT_Bar3DChart ||
      c instanceof CT_AreaChart ||
      c instanceof CT_Area3DChart ||
      c instanceof CT_PieChart ||
      c instanceof CT_Pie3DChart ||
      c instanceof CT_DoughnutChart ||
      c instanceof CT_OfPieChart ||
      c instanceof CT_ScatterChart ||
      c instanceof CT_RadarChart ||
      c instanceof CT_BubbleChart ||
      c instanceof CT_SurfaceChart ||
      c instanceof CT_Surface3DChart,
    );
  }
  addChart<T extends AnyChart>(c: T): T { this.addChild(c); return c; }

  /** All axis children. */
  get axes(): ChartAxis[] {
    return this.children.filter((c): c is ChartAxis =>
      c instanceof CT_CatAx ||
      c instanceof CT_ValAx ||
      c instanceof CT_DateAx ||
      c instanceof CT_SerAx,
    );
  }
  addAxis<T extends ChartAxis>(ax: T): T { this.addChild(ax); return ax; }

  get dTable(): CT_DTable | undefined { return this.findChild(CT_DTable); }
  set dTable(v: CT_DTable | undefined) {
    const prev = this.dTable;
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

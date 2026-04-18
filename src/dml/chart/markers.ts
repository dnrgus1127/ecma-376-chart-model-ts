/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/chart
 * Source:    dml-chart.xsd — marker and data point formatting.
 */

import { OoxmlElement } from "../../base/index.js";
import { CT_ShapeProperties, CT_OfficeArtExtensionList } from "../main/index.js";
import { CT_Boolean, CT_MarkerSize, CT_MarkerStyleWrap } from "./wrappers.js";

/** CT_Marker — data-point marker symbol + size + shape properties. */
export class CT_Marker extends OoxmlElement {
  get elementName() { return "marker"; }
  get symbol(): CT_MarkerStyleWrap | undefined { return this.findChild(CT_MarkerStyleWrap); }
  set symbol(v: CT_MarkerStyleWrap | undefined) {
    const prev = this.symbol;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get size(): CT_MarkerSize | undefined { return this.findChild(CT_MarkerSize); }
  set size(v: CT_MarkerSize | undefined) {
    const prev = this.size;
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

export class CT_PictureOptions extends OoxmlElement {
  get elementName() { return "pictureOptions"; }
  /** applyToFront / applyToSides / applyToEnd — all CT_Boolean. TODO: name-aware. */
  get applyToFront(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set applyToFront(_v: CT_Boolean | undefined) { /* TODO */ }
  get applyToSides(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set applyToSides(_v: CT_Boolean | undefined) { /* TODO */ }
  get applyToEnd(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set applyToEnd(_v: CT_Boolean | undefined) { /* TODO */ }
  // TODO: pictureFormat (CT_PictureFormat), pictureStackUnit (CT_PictureStackUnit)
}

/** CT_DPt — single data-point formatting override. */
export class CT_DPt extends OoxmlElement {
  get elementName() { return "dPt"; }
  get idx(): number | undefined { return this.getAttr<number>("idx"); }
  set idx(v: number | undefined) { this.setAttr("idx", v); }
  /** invertIfNegative / bubble3D — CT_Boolean. TODO: name-aware. */
  get invertIfNegative(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set invertIfNegative(_v: CT_Boolean | undefined) { /* TODO */ }
  get bubble3D(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set bubble3D(_v: CT_Boolean | undefined) { /* TODO */ }
  get marker(): CT_Marker | undefined { return this.findChild(CT_Marker); }
  set marker(v: CT_Marker | undefined) {
    const prev = this.marker;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** `explosion` (CT_UnsignedInt). TODO: typed slot. */
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

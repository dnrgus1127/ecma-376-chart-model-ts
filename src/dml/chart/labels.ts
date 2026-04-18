/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/chart
 * Source:    dml-chart.xsd — labels, legend, title, layout, number format.
 */

import { OoxmlElement } from "../../base/index.js";
import type {
  ST_LayoutTarget,
  ST_LayoutMode,
} from "./simpleTypes.js";
import {
  CT_ShapeProperties,
  CT_TextBody,
  CT_OfficeArtExtensionList,
} from "../main/index.js";
import {
  CT_Boolean,
  CT_DLblPos,
  CT_LegendPos,
} from "./wrappers.js";
import { CT_Tx } from "./data.js";

/* ---------- Layout ---------- */

export class CT_LayoutTarget extends OoxmlElement {
  get elementName() { return "layoutTarget"; }
  get val(): ST_LayoutTarget | undefined { return this.getAttr<ST_LayoutTarget>("val"); }
  set val(v: ST_LayoutTarget | undefined) { this.setAttr("val", v); }
}

export class CT_LayoutMode extends OoxmlElement {
  get elementName() { return "xMode"; } // also yMode / wMode / hMode
  get val(): ST_LayoutMode | undefined { return this.getAttr<ST_LayoutMode>("val"); }
  set val(v: ST_LayoutMode | undefined) { this.setAttr("val", v); }
}

/**
 * CT_ManualLayout — explicit positioning within the chart area.
 *
 * Many children are small single-attribute wrappers. Each slot is exposed
 * via a get/set pair; some share XSD names across variants — those are
 * left as TODO until round-trip element-name discrimination is added.
 */
export class CT_ManualLayout extends OoxmlElement {
  get elementName() { return "manualLayout"; }

  get layoutTarget(): CT_LayoutTarget | undefined { return this.findChild(CT_LayoutTarget); }
  set layoutTarget(v: CT_LayoutTarget | undefined) {
    const prev = this.layoutTarget;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /** xMode / yMode / wMode / hMode are all CT_LayoutMode with different element
   *  names. TODO: disambiguate once XML serialization lands. */
  get xMode(): CT_LayoutMode | undefined { return this.findChild(CT_LayoutMode); }
  set xMode(_v: CT_LayoutMode | undefined) { /* TODO */ }
  get yMode(): CT_LayoutMode | undefined { return undefined; /* TODO */ }
  set yMode(_v: CT_LayoutMode | undefined) { /* TODO */ }
  get wMode(): CT_LayoutMode | undefined { return undefined; /* TODO */ }
  set wMode(_v: CT_LayoutMode | undefined) { /* TODO */ }
  get hMode(): CT_LayoutMode | undefined { return undefined; /* TODO */ }
  set hMode(_v: CT_LayoutMode | undefined) { /* TODO */ }

  /** x/y/w/h are all CT_Double. TODO: disambiguate by element name. */
  get x(): number | undefined { return this.getAttr<number>("x"); }
  set x(v: number | undefined) { this.setAttr("x", v); }
  get y(): number | undefined { return this.getAttr<number>("y"); }
  set y(v: number | undefined) { this.setAttr("y", v); }
  get w(): number | undefined { return this.getAttr<number>("w"); }
  set w(v: number | undefined) { this.setAttr("w", v); }
  get h(): number | undefined { return this.getAttr<number>("h"); }
  set h(v: number | undefined) { this.setAttr("h", v); }

  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_Layout extends OoxmlElement {
  get elementName() { return "layout"; }
  get manualLayout(): CT_ManualLayout | undefined { return this.findChild(CT_ManualLayout); }
  set manualLayout(v: CT_ManualLayout | undefined) {
    const prev = this.manualLayout;
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

/* ---------- Number format ---------- */

export class CT_NumFmt extends OoxmlElement {
  get elementName() { return "numFmt"; }
  get formatCode(): string | undefined { return this.getAttr("formatCode"); }
  set formatCode(v: string | undefined) { this.setAttr("formatCode", v); }
  get sourceLinked(): boolean | undefined { return this.getAttr<boolean>("sourceLinked"); }
  set sourceLinked(v: boolean | undefined) { this.setAttr("sourceLinked", v); }
}

/* ---------- Reusable label mixin for CT_DLbl / CT_DLbls ---------- */

/**
 * Base for any data-label-bearing element. Holds the shared EG_DLblShared
 * children (numFmt, spPr, txPr, dLblPos, showLegendKey, showVal, showCatName,
 * showSerName, showPercent, showBubbleSize, separator).
 *
 * Uses typed child slots where unique, and TODO stubs for the show-* boolean
 * wrappers that all live in CT_Boolean element instances (disambiguated at
 * serialization time).
 */
export abstract class DLblSharedBase extends OoxmlElement {
  get numFmt(): CT_NumFmt | undefined { return this.findChild(CT_NumFmt); }
  set numFmt(v: CT_NumFmt | undefined) {
    const prev = this.numFmt;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
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
  get dLblPos(): CT_DLblPos | undefined { return this.findChild(CT_DLblPos); }
  set dLblPos(v: CT_DLblPos | undefined) {
    const prev = this.dLblPos;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /**
   * showLegendKey / showVal / showCatName / showSerName / showPercent /
   * showBubbleSize — each is a `<c:showX>` CT_Boolean wrapper. All share the
   * same Class so we cannot distinguish them here. TODO: element-name aware.
   */
  get showLegendKey(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set showLegendKey(_v: CT_Boolean | undefined) { /* TODO */ }
  get showVal(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set showVal(_v: CT_Boolean | undefined) { /* TODO */ }
  get showCatName(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set showCatName(_v: CT_Boolean | undefined) { /* TODO */ }
  get showSerName(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set showSerName(_v: CT_Boolean | undefined) { /* TODO */ }
  get showPercent(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set showPercent(_v: CT_Boolean | undefined) { /* TODO */ }
  get showBubbleSize(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set showBubbleSize(_v: CT_Boolean | undefined) { /* TODO */ }

  /** Separator string literal (`<c:separator>`). */
  get separator(): string | undefined { return this.getAttr("separator"); }
  set separator(v: string | undefined) { this.setAttr("separator", v); }
}

export class CT_DLbl extends DLblSharedBase {
  get elementName() { return "dLbl"; }
  get idx(): number | undefined { return this.getAttr<number>("idx"); }
  set idx(v: number | undefined) { this.setAttr("idx", v); }
  /** `delete` boolean flag (wraps CT_Boolean). */
  get delete(): CT_Boolean | undefined { return this.findChild(CT_Boolean); }
  set delete(v: CT_Boolean | undefined) {
    const prev = this.delete;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get layout(): CT_Layout | undefined { return this.findChild(CT_Layout); }
  set layout(v: CT_Layout | undefined) {
    const prev = this.layout;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get tx(): CT_Tx | undefined { return this.findChild(CT_Tx); }
  set tx(v: CT_Tx | undefined) {
    const prev = this.tx;
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

export class CT_DLbls extends DLblSharedBase {
  get elementName() { return "dLbls"; }
  /** Per-point label overrides. */
  get dLbl(): CT_DLbl[] { return this.findChildren(CT_DLbl); }
  addDLbl(l: CT_DLbl) { this.addChild(l); }
  /** showLeaderLines / leaderLines. TODO. */
  get showLeaderLines(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set showLeaderLines(_v: CT_Boolean | undefined) { /* TODO */ }
  /** `leaderLines` (CT_ChartLines). TODO: imported from axes module. */
  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** `delete` flag on the series-level default. */
  get delete(): CT_Boolean | undefined { return this.findChild(CT_Boolean); }
  set delete(v: CT_Boolean | undefined) {
    const prev = this.delete;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Title ---------- */

export class CT_Title extends OoxmlElement {
  get elementName() { return "title"; }
  get tx(): CT_Tx | undefined { return this.findChild(CT_Tx); }
  set tx(v: CT_Tx | undefined) {
    const prev = this.tx;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get layout(): CT_Layout | undefined { return this.findChild(CT_Layout); }
  set layout(v: CT_Layout | undefined) {
    const prev = this.layout;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get overlay(): CT_Boolean | undefined { return this.findChild(CT_Boolean); }
  set overlay(v: CT_Boolean | undefined) {
    const prev = this.overlay;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
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

/* ---------- Legend ---------- */

export class CT_LegendEntry extends OoxmlElement {
  get elementName() { return "legendEntry"; }
  get idx(): number | undefined { return this.getAttr<number>("idx"); }
  set idx(v: number | undefined) { this.setAttr("idx", v); }
  get delete(): CT_Boolean | undefined { return this.findChild(CT_Boolean); }
  set delete(v: CT_Boolean | undefined) {
    const prev = this.delete;
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

export class CT_Legend extends OoxmlElement {
  get elementName() { return "legend"; }
  get legendPos(): CT_LegendPos | undefined { return this.findChild(CT_LegendPos); }
  set legendPos(v: CT_LegendPos | undefined) {
    const prev = this.legendPos;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get legendEntries(): CT_LegendEntry[] { return this.findChildren(CT_LegendEntry); }
  addEntry(e: CT_LegendEntry) { this.addChild(e); }
  get layout(): CT_Layout | undefined { return this.findChild(CT_Layout); }
  set layout(v: CT_Layout | undefined) {
    const prev = this.layout;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get overlay(): CT_Boolean | undefined { return this.findChild(CT_Boolean); }
  set overlay(v: CT_Boolean | undefined) {
    const prev = this.overlay;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
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

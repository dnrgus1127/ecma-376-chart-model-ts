/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/chart
 * Source:    dml-chart.xsd — trendlines, error bars, up/down bars.
 */

import { OoxmlElement } from "../../base/index.js";
import { CT_ShapeProperties, CT_TextBody, CT_OfficeArtExtensionList } from "../main/index.js";
import {
  CT_Boolean,
  CT_Double,
  CT_TrendlineType,
  CT_Order,
  CT_Period,
  CT_ErrBarType,
  CT_ErrDir,
  CT_ErrValType,
  CT_GapAmount,
  CT_Name,
} from "./wrappers.js";
import { CT_Layout } from "./labels.js";
import { CT_Tx } from "./data.js";
import { CT_NumFmt } from "./labels.js";
import { CT_NumDataSource } from "./data.js";

/* ---------- Trendline label ---------- */

export class CT_TrendlineLbl extends OoxmlElement {
  get elementName() { return "trendlineLbl"; }
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
  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Trendline ---------- */

export class CT_Trendline extends OoxmlElement {
  get elementName() { return "trendline"; }
  /** `<c:name>` — trendline display name (xsd:string) child element. */
  get name(): string | undefined { return this.findChild(CT_Name)?.text; }
  set name(v: string | undefined) {
    let node = this.findChild(CT_Name);
    if (v === undefined) {
      if (node) this.removeChild(node);
      return;
    }
    if (!node) { node = new CT_Name(); this.addChild(node); }
    node.text = v;
  }

  get spPr(): CT_ShapeProperties | undefined { return this.findChild(CT_ShapeProperties); }
  set spPr(v: CT_ShapeProperties | undefined) {
    const prev = this.spPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get trendlineType(): CT_TrendlineType | undefined { return this.findChild(CT_TrendlineType); }
  set trendlineType(v: CT_TrendlineType | undefined) {
    const prev = this.trendlineType;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get order(): CT_Order | undefined { return this.findChild(CT_Order); }
  set order(v: CT_Order | undefined) {
    const prev = this.order;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get period(): CT_Period | undefined { return this.findChild(CT_Period); }
  set period(v: CT_Period | undefined) {
    const prev = this.period;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /** forward / backward / intercept — all CT_Double. TODO: disambiguate. */
  get forward(): CT_Double | undefined { return undefined; /* TODO */ }
  set forward(_v: CT_Double | undefined) { /* TODO */ }
  get backward(): CT_Double | undefined { return undefined; /* TODO */ }
  set backward(_v: CT_Double | undefined) { /* TODO */ }
  get intercept(): CT_Double | undefined { return undefined; /* TODO */ }
  set intercept(_v: CT_Double | undefined) { /* TODO */ }

  /** dispRSqr / dispEq — CT_Boolean. TODO: disambiguate. */
  get dispRSqr(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set dispRSqr(_v: CT_Boolean | undefined) { /* TODO */ }
  get dispEq(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set dispEq(_v: CT_Boolean | undefined) { /* TODO */ }

  get trendlineLbl(): CT_TrendlineLbl | undefined { return this.findChild(CT_TrendlineLbl); }
  set trendlineLbl(v: CT_TrendlineLbl | undefined) {
    const prev = this.trendlineLbl;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Error bars ---------- */

export class CT_ErrBars extends OoxmlElement {
  get elementName() { return "errBars"; }
  get errDir(): CT_ErrDir | undefined { return this.findChild(CT_ErrDir); }
  set errDir(v: CT_ErrDir | undefined) {
    const prev = this.errDir;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get errBarType(): CT_ErrBarType | undefined { return this.findChild(CT_ErrBarType); }
  set errBarType(v: CT_ErrBarType | undefined) {
    const prev = this.errBarType;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get errValType(): CT_ErrValType | undefined { return this.findChild(CT_ErrValType); }
  set errValType(v: CT_ErrValType | undefined) {
    const prev = this.errValType;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get noEndCap(): CT_Boolean | undefined { return this.findChild(CT_Boolean); }
  set noEndCap(v: CT_Boolean | undefined) {
    const prev = this.noEndCap;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** plus / minus CT_NumDataSource. TODO: disambiguate. */
  get plus(): CT_NumDataSource | undefined { return undefined; /* TODO */ }
  set plus(_v: CT_NumDataSource | undefined) { /* TODO */ }
  get minus(): CT_NumDataSource | undefined { return undefined; /* TODO */ }
  set minus(_v: CT_NumDataSource | undefined) { /* TODO */ }
  get val(): CT_Double | undefined { return this.findChild(CT_Double); }
  set val(v: CT_Double | undefined) {
    const prev = this.val;
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

/* ---------- Up/Down bars (stock chart) ---------- */

export class CT_UpDownBar extends OoxmlElement {
  get elementName() { return "upBars"; } // shared with downBars
  get spPr(): CT_ShapeProperties | undefined { return this.findChild(CT_ShapeProperties); }
  set spPr(v: CT_ShapeProperties | undefined) {
    const prev = this.spPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_UpDownBars extends OoxmlElement {
  get elementName() { return "upDownBars"; }
  get gapWidth(): CT_GapAmount | undefined { return this.findChild(CT_GapAmount); }
  set gapWidth(v: CT_GapAmount | undefined) {
    const prev = this.gapWidth;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** upBars / downBars — CT_UpDownBar with different element names. TODO. */
  get upBars(): CT_UpDownBar | undefined { return this.findChild(CT_UpDownBar); }
  set upBars(_v: CT_UpDownBar | undefined) { /* TODO */ }
  get downBars(): CT_UpDownBar | undefined { return undefined; /* TODO */ }
  set downBars(_v: CT_UpDownBar | undefined) { /* TODO */ }
  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

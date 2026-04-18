/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/chart
 * Source:    dml-chart.xsd — axes (EG_AxShared + four concrete axis types)
 *            and the CT_Scaling helper.
 */

import { OoxmlElement } from "../../base/index.js";
import { CT_ShapeProperties, CT_TextBody, CT_OfficeArtExtensionList } from "../main/index.js";
import {
  CT_Boolean,
  CT_Double,
  CT_UnsignedInt,
  CT_AxPos,
  CT_Crosses,
  CT_CrossBetween,
  CT_TickMark,
  CT_TickLblPos,
  CT_TimeUnit,
  CT_LogBase,
  CT_Orientation,
  CT_LblAlgn,
  CT_LblOffset,
  CT_Skip,
  CT_BuiltInUnit,
  CT_AxisUnit,
} from "./wrappers.js";
import { CT_NumFmt, CT_Title } from "./labels.js";

/* ---------- Chart lines (gridlines, droplines) ---------- */

export class CT_ChartLines extends OoxmlElement {
  get elementName() { return "majorGridlines"; } // shared element for minorGridlines / dropLines / hiLowLines / leaderLines / serLines
  get spPr(): CT_ShapeProperties | undefined { return this.findChild(CT_ShapeProperties); }
  set spPr(v: CT_ShapeProperties | undefined) {
    const prev = this.spPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- CT_Scaling ---------- */

export class CT_Scaling extends OoxmlElement {
  get elementName() { return "scaling"; }
  get logBase(): CT_LogBase | undefined { return this.findChild(CT_LogBase); }
  set logBase(v: CT_LogBase | undefined) {
    const prev = this.logBase;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get orientation(): CT_Orientation | undefined { return this.findChild(CT_Orientation); }
  set orientation(v: CT_Orientation | undefined) {
    const prev = this.orientation;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** max / min — CT_Double. TODO: disambiguate. */
  get max(): CT_Double | undefined { return undefined; /* TODO */ }
  set max(_v: CT_Double | undefined) { /* TODO */ }
  get min(): CT_Double | undefined { return undefined; /* TODO */ }
  set min(_v: CT_Double | undefined) { /* TODO */ }

  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Shared axis base (EG_AxShared) ---------- */

/**
 * Every concrete axis type (CT_CatAx, CT_ValAx, CT_DateAx, CT_SerAx) includes
 * the same EG_AxShared header. We centralize those accessors here via an
 * abstract base class.
 */
export abstract class AxBase extends OoxmlElement {
  get axId(): CT_UnsignedInt | undefined { return this.findChild(CT_UnsignedInt); }
  set axId(v: CT_UnsignedInt | undefined) {
    const prev = this.axId;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get scaling(): CT_Scaling | undefined { return this.findChild(CT_Scaling); }
  set scaling(v: CT_Scaling | undefined) {
    const prev = this.scaling;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get delete(): CT_Boolean | undefined { return this.findChild(CT_Boolean); }
  set delete(v: CT_Boolean | undefined) {
    const prev = this.delete;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get axPos(): CT_AxPos | undefined { return this.findChild(CT_AxPos); }
  set axPos(v: CT_AxPos | undefined) {
    const prev = this.axPos;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** majorGridlines / minorGridlines — CT_ChartLines. TODO: disambiguate. */
  get majorGridlines(): CT_ChartLines | undefined { return this.findChild(CT_ChartLines); }
  set majorGridlines(_v: CT_ChartLines | undefined) { /* TODO */ }
  get minorGridlines(): CT_ChartLines | undefined { return undefined; /* TODO */ }
  set minorGridlines(_v: CT_ChartLines | undefined) { /* TODO */ }

  get title(): CT_Title | undefined { return this.findChild(CT_Title); }
  set title(v: CT_Title | undefined) {
    const prev = this.title;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get numFmt(): CT_NumFmt | undefined { return this.findChild(CT_NumFmt); }
  set numFmt(v: CT_NumFmt | undefined) {
    const prev = this.numFmt;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** majorTickMark / minorTickMark — CT_TickMark. TODO: disambiguate. */
  get majorTickMark(): CT_TickMark | undefined { return this.findChild(CT_TickMark); }
  set majorTickMark(_v: CT_TickMark | undefined) { /* TODO */ }
  get minorTickMark(): CT_TickMark | undefined { return undefined; /* TODO */ }
  set minorTickMark(_v: CT_TickMark | undefined) { /* TODO */ }

  get tickLblPos(): CT_TickLblPos | undefined { return this.findChild(CT_TickLblPos); }
  set tickLblPos(v: CT_TickLblPos | undefined) {
    const prev = this.tickLblPos;
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
  /** crossAx — CT_UnsignedInt referencing another axis's ID. TODO: disambiguate. */
  get crossAx(): CT_UnsignedInt | undefined { return undefined; /* TODO */ }
  set crossAx(_v: CT_UnsignedInt | undefined) { /* TODO */ }

  /** crosses / crossesAt — choice. TODO. */
  get crosses(): CT_Crosses | undefined { return this.findChild(CT_Crosses); }
  set crosses(v: CT_Crosses | undefined) {
    const prev = this.crosses;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get crossesAt(): CT_Double | undefined { return undefined; /* TODO */ }
  set crossesAt(_v: CT_Double | undefined) { /* TODO */ }
}

/* ---------- Concrete axes ---------- */

export class CT_CatAx extends AxBase {
  get elementName() { return "catAx"; }
  /** auto / noMultiLvlLbl — CT_Boolean. TODO: disambiguate. */
  get auto(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set auto(_v: CT_Boolean | undefined) { /* TODO */ }
  get lblAlgn(): CT_LblAlgn | undefined { return this.findChild(CT_LblAlgn); }
  set lblAlgn(v: CT_LblAlgn | undefined) {
    const prev = this.lblAlgn;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get lblOffset(): CT_LblOffset | undefined { return this.findChild(CT_LblOffset); }
  set lblOffset(v: CT_LblOffset | undefined) {
    const prev = this.lblOffset;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** tickLblSkip / tickMarkSkip — CT_Skip. TODO: disambiguate. */
  get tickLblSkip(): CT_Skip | undefined { return this.findChild(CT_Skip); }
  set tickLblSkip(_v: CT_Skip | undefined) { /* TODO */ }
  get tickMarkSkip(): CT_Skip | undefined { return undefined; /* TODO */ }
  set tickMarkSkip(_v: CT_Skip | undefined) { /* TODO */ }
  get noMultiLvlLbl(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set noMultiLvlLbl(_v: CT_Boolean | undefined) { /* TODO */ }
  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_DateAx extends AxBase {
  get elementName() { return "dateAx"; }
  get auto(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set auto(_v: CT_Boolean | undefined) { /* TODO */ }
  get lblOffset(): CT_LblOffset | undefined { return this.findChild(CT_LblOffset); }
  set lblOffset(v: CT_LblOffset | undefined) {
    const prev = this.lblOffset;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get baseTimeUnit(): CT_TimeUnit | undefined { return this.findChild(CT_TimeUnit); }
  set baseTimeUnit(v: CT_TimeUnit | undefined) {
    const prev = this.baseTimeUnit;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** majorUnit / minorUnit — CT_AxisUnit. TODO: disambiguate. */
  get majorUnit(): CT_AxisUnit | undefined { return this.findChild(CT_AxisUnit); }
  set majorUnit(_v: CT_AxisUnit | undefined) { /* TODO */ }
  get minorUnit(): CT_AxisUnit | undefined { return undefined; /* TODO */ }
  set minorUnit(_v: CT_AxisUnit | undefined) { /* TODO */ }
  /** majorTimeUnit / minorTimeUnit — CT_TimeUnit. TODO: disambiguate from baseTimeUnit. */
  get majorTimeUnit(): CT_TimeUnit | undefined { return undefined; /* TODO */ }
  set majorTimeUnit(_v: CT_TimeUnit | undefined) { /* TODO */ }
  get minorTimeUnit(): CT_TimeUnit | undefined { return undefined; /* TODO */ }
  set minorTimeUnit(_v: CT_TimeUnit | undefined) { /* TODO */ }
}

export class CT_SerAx extends AxBase {
  get elementName() { return "serAx"; }
  get tickLblSkip(): CT_Skip | undefined { return this.findChild(CT_Skip); }
  set tickLblSkip(_v: CT_Skip | undefined) { /* TODO */ }
  get tickMarkSkip(): CT_Skip | undefined { return undefined; /* TODO */ }
  set tickMarkSkip(_v: CT_Skip | undefined) { /* TODO */ }
}

/* ---------- Value axis ---------- */

export class CT_DispUnitsLbl extends OoxmlElement {
  get elementName() { return "dispUnitsLbl"; }
  get layout(): OoxmlElement | undefined { return this.children[0]; }
  set layout(v: OoxmlElement | undefined) {
    this.children.length = 0;
    if (v) this.addChild(v);
  }
  // TODO: tx / spPr / txPr slots
}

export class CT_DispUnits extends OoxmlElement {
  get elementName() { return "dispUnits"; }
  /** custUnit (CT_Double) | builtInUnit (CT_BuiltInUnit) — choice. TODO. */
  get custUnit(): CT_Double | undefined { return this.findChild(CT_Double); }
  set custUnit(v: CT_Double | undefined) {
    const prev = this.custUnit;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get builtInUnit(): CT_BuiltInUnit | undefined { return this.findChild(CT_BuiltInUnit); }
  set builtInUnit(v: CT_BuiltInUnit | undefined) {
    const prev = this.builtInUnit;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get dispUnitsLbl(): CT_DispUnitsLbl | undefined { return this.findChild(CT_DispUnitsLbl); }
  set dispUnitsLbl(v: CT_DispUnitsLbl | undefined) {
    const prev = this.dispUnitsLbl;
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

export class CT_ValAx extends AxBase {
  get elementName() { return "valAx"; }
  get crossBetween(): CT_CrossBetween | undefined { return this.findChild(CT_CrossBetween); }
  set crossBetween(v: CT_CrossBetween | undefined) {
    const prev = this.crossBetween;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** majorUnit / minorUnit — CT_AxisUnit. TODO: disambiguate. */
  get majorUnit(): CT_AxisUnit | undefined { return this.findChild(CT_AxisUnit); }
  set majorUnit(_v: CT_AxisUnit | undefined) { /* TODO */ }
  get minorUnit(): CT_AxisUnit | undefined { return undefined; /* TODO */ }
  set minorUnit(_v: CT_AxisUnit | undefined) { /* TODO */ }
  get dispUnits(): CT_DispUnits | undefined { return this.findChild(CT_DispUnits); }
  set dispUnits(v: CT_DispUnits | undefined) {
    const prev = this.dispUnits;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export type ChartAxis = CT_CatAx | CT_DateAx | CT_SerAx | CT_ValAx;

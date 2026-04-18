/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/chart
 * Source:    dml-chart.xsd — CT_Chart (logical chart) and CT_ChartSpace (root).
 */

import { OoxmlElement } from "../../base/index.js";
import { CT_ShapeProperties, CT_TextBody, CT_OfficeArtExtensionList } from "../main/index.js";
import { CT_Boolean, CT_DispBlanksAs, CT_Style, CT_TextLanguageID } from "./wrappers.js";
import { CT_Title, CT_Legend } from "./labels.js";
import { CT_PlotArea, CT_View3D, CT_Surface } from "./plotArea.js";
import { CT_ExternalData } from "./data.js";

/* ---------- Pivot source / formats ---------- */

export class CT_PivotFmt extends OoxmlElement {
  get elementName() { return "pivotFmt"; }
  // TODO: idx / spPr / txPr / marker / dLbl / extLst slots
}
export class CT_PivotFmts extends OoxmlElement {
  get elementName() { return "pivotFmts"; }
  get pivotFmts(): CT_PivotFmt[] { return this.findChildren(CT_PivotFmt); }
  add(p: CT_PivotFmt) { this.addChild(p); }
}

export class CT_PivotSource extends OoxmlElement {
  get elementName() { return "pivotSource"; }
  /** name — pivot source name string. */
  get name(): string | undefined { return this.getAttr("name"); }
  set name(v: string | undefined) { this.setAttr("name", v); }
  /** fmtId — CT_UnsignedInt wrapper. TODO: typed child slot. */
}

/* ---------- Protection ---------- */

export class CT_Protection extends OoxmlElement {
  get elementName() { return "protection"; }
  /** chartObject / data / formatting / selection / userInterface — all CT_Boolean.
   *  TODO: disambiguate via element-name aware lookup. */
}

/* ---------- Print settings (simplified) ---------- */

export class CT_PageMargins extends OoxmlElement {
  get elementName() { return "pageMargins"; }
  get l(): number | undefined { return this.getAttr<number>("l"); }
  set l(v: number | undefined) { this.setAttr("l", v); }
  get r(): number | undefined { return this.getAttr<number>("r"); }
  set r(v: number | undefined) { this.setAttr("r", v); }
  get t(): number | undefined { return this.getAttr<number>("t"); }
  set t(v: number | undefined) { this.setAttr("t", v); }
  get b(): number | undefined { return this.getAttr<number>("b"); }
  set b(v: number | undefined) { this.setAttr("b", v); }
  get header(): number | undefined { return this.getAttr<number>("header"); }
  set header(v: number | undefined) { this.setAttr("header", v); }
  get footer(): number | undefined { return this.getAttr<number>("footer"); }
  set footer(v: number | undefined) { this.setAttr("footer", v); }
}
export class CT_HeaderFooter extends OoxmlElement {
  get elementName() { return "headerFooter"; }
  // TODO: oddHeader/oddFooter/evenHeader/evenFooter/firstHeader/firstFooter content
  get alignWithMargins(): boolean | undefined { return this.getAttr<boolean>("alignWithMargins"); }
  set alignWithMargins(v: boolean | undefined) { this.setAttr("alignWithMargins", v); }
  get differentOddEven(): boolean | undefined { return this.getAttr<boolean>("differentOddEven"); }
  set differentOddEven(v: boolean | undefined) { this.setAttr("differentOddEven", v); }
  get differentFirst(): boolean | undefined { return this.getAttr<boolean>("differentFirst"); }
  set differentFirst(v: boolean | undefined) { this.setAttr("differentFirst", v); }
}
export class CT_PageSetup extends OoxmlElement {
  get elementName() { return "pageSetup"; }
  get paperSize(): number | undefined { return this.getAttr<number>("paperSize"); }
  set paperSize(v: number | undefined) { this.setAttr("paperSize", v); }
  get firstPageNumber(): number | undefined { return this.getAttr<number>("firstPageNumber"); }
  set firstPageNumber(v: number | undefined) { this.setAttr("firstPageNumber", v); }
  // TODO: remaining attributes (orientation, horizontalDpi, etc.)
}
export class CT_PrintSettings extends OoxmlElement {
  get elementName() { return "printSettings"; }
  get headerFooter(): CT_HeaderFooter | undefined { return this.findChild(CT_HeaderFooter); }
  set headerFooter(v: CT_HeaderFooter | undefined) {
    const prev = this.headerFooter;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get pageMargins(): CT_PageMargins | undefined { return this.findChild(CT_PageMargins); }
  set pageMargins(v: CT_PageMargins | undefined) {
    const prev = this.pageMargins;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get pageSetup(): CT_PageSetup | undefined { return this.findChild(CT_PageSetup); }
  set pageSetup(v: CT_PageSetup | undefined) {
    const prev = this.pageSetup;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- CT_Chart ---------- */

/**
 * CT_Chart — logical chart: title + view3D + plot area + legend + options.
 */
export class CT_Chart extends OoxmlElement {
  get elementName() { return "chart"; }

  get title(): CT_Title | undefined { return this.findChild(CT_Title); }
  set title(v: CT_Title | undefined) {
    const prev = this.title;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /** autoTitleDeleted — CT_Boolean wrapping `val`. TODO: disambiguate from other CT_Boolean children. */
  get autoTitleDeleted(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set autoTitleDeleted(_v: CT_Boolean | undefined) { /* TODO */ }

  get pivotFmts(): CT_PivotFmts | undefined { return this.findChild(CT_PivotFmts); }
  set pivotFmts(v: CT_PivotFmts | undefined) {
    const prev = this.pivotFmts;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get view3D(): CT_View3D | undefined { return this.findChild(CT_View3D); }
  set view3D(v: CT_View3D | undefined) {
    const prev = this.view3D;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /** floor / sideWall / backWall — all CT_Surface. TODO: disambiguate. */
  get floor(): CT_Surface | undefined { return this.findChild(CT_Surface); }
  set floor(_v: CT_Surface | undefined) { /* TODO */ }
  get sideWall(): CT_Surface | undefined { return undefined; /* TODO */ }
  set sideWall(_v: CT_Surface | undefined) { /* TODO */ }
  get backWall(): CT_Surface | undefined { return undefined; /* TODO */ }
  set backWall(_v: CT_Surface | undefined) { /* TODO */ }

  get plotArea(): CT_PlotArea | undefined { return this.findChild(CT_PlotArea); }
  set plotArea(v: CT_PlotArea | undefined) {
    const prev = this.plotArea;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get legend(): CT_Legend | undefined { return this.findChild(CT_Legend); }
  set legend(v: CT_Legend | undefined) {
    const prev = this.legend;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /** plotVisOnly — CT_Boolean. TODO: disambiguate from other CT_Boolean children. */
  get plotVisOnly(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set plotVisOnly(_v: CT_Boolean | undefined) { /* TODO */ }

  get dispBlanksAs(): CT_DispBlanksAs | undefined { return this.findChild(CT_DispBlanksAs); }
  set dispBlanksAs(v: CT_DispBlanksAs | undefined) {
    const prev = this.dispBlanksAs;
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

/* ---------- CT_ChartSpace (root element <c:chartSpace>) ---------- */

/**
 * CT_ChartSpace — root element for a chart XML part.
 */
export class CT_ChartSpace extends OoxmlElement {
  get elementName() { return "chartSpace"; }

  /** date1904 / roundedCorners — CT_Boolean. TODO: disambiguate. */
  get date1904(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set date1904(_v: CT_Boolean | undefined) { /* TODO */ }
  get roundedCorners(): CT_Boolean | undefined { return undefined; /* TODO */ }
  set roundedCorners(_v: CT_Boolean | undefined) { /* TODO */ }

  get lang(): CT_TextLanguageID | undefined { return this.findChild(CT_TextLanguageID); }
  set lang(v: CT_TextLanguageID | undefined) {
    const prev = this.lang;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get style(): CT_Style | undefined { return this.findChild(CT_Style); }
  set style(v: CT_Style | undefined) {
    const prev = this.style;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /** clrMapOvr — override theme color mapping. TODO: wire CT_ColorMappingOverride. */
  get pivotSource(): CT_PivotSource | undefined { return this.findChild(CT_PivotSource); }
  set pivotSource(v: CT_PivotSource | undefined) {
    const prev = this.pivotSource;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get protection(): CT_Protection | undefined { return this.findChild(CT_Protection); }
  set protection(v: CT_Protection | undefined) {
    const prev = this.protection;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get chart(): CT_Chart | undefined { return this.findChild(CT_Chart); }
  set chart(v: CT_Chart | undefined) {
    const prev = this.chart;
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

  get externalData(): CT_ExternalData | undefined { return this.findChild(CT_ExternalData); }
  set externalData(v: CT_ExternalData | undefined) {
    const prev = this.externalData;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get printSettings(): CT_PrintSettings | undefined { return this.findChild(CT_PrintSettings); }
  set printSettings(v: CT_PrintSettings | undefined) {
    const prev = this.printSettings;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /** userShapes — CT_RelId wrapping `r:id` to a user shape drawing overlay. */
  // TODO: userShapes slot once CT_RelId conflicts with externalData are resolved

  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

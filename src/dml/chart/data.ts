/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/chart
 * Source:    dml-chart.xsd — data sources (numeric, string, category) and
 *            text/title wrappers.
 */

import { OoxmlElement, ChoiceHolder, ListHolder } from "../../base/index.js";
import type { ST_RelationshipId, ST_Xstring } from "../../shared/index.js";
import { CT_OfficeArtExtensionList, CT_TextBody } from "../main/index.js";

/* ---------- Numeric cache ---------- */

export class CT_NumVal extends OoxmlElement {
  get elementName() { return "pt"; }
  get idx(): number | undefined { return this.getAttr<number>("idx"); }
  set idx(v: number | undefined) { this.setAttr("idx", v); }
  get formatCode(): string | undefined { return this.getAttr("formatCode"); }
  set formatCode(v: string | undefined) { this.setAttr("formatCode", v); }
  /** `<c:v>` text content. */
  get v(): string | undefined { return this.getAttr("v"); }
  set v(value: string | undefined) { this.setAttr("v", value); }
}

export class CT_NumData extends OoxmlElement {
  get elementName() { return "numCache"; }
  get formatCode(): string | undefined { return this.getAttr("formatCode"); }
  set formatCode(v: string | undefined) { this.setAttr("formatCode", v); }
  get ptCount(): number | undefined { return this.getAttr<number>("ptCount"); }
  set ptCount(v: number | undefined) { this.setAttr("ptCount", v); }
  get points(): CT_NumVal[] { return this.findChildren(CT_NumVal); }
  addPoint(p: CT_NumVal) { this.addChild(p); }
  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_NumRef extends OoxmlElement {
  get elementName() { return "numRef"; }
  /** The spreadsheet formula string (`<c:f>`). */
  get f(): string | undefined { return this.getAttr("f"); }
  set f(v: string | undefined) { this.setAttr("f", v); }
  get numCache(): CT_NumData | undefined { return this.findChild(CT_NumData); }
  set numCache(v: CT_NumData | undefined) {
    const prev = this.numCache;
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

/* ---------- String cache ---------- */

export class CT_StrVal extends OoxmlElement {
  get elementName() { return "pt"; }
  get idx(): number | undefined { return this.getAttr<number>("idx"); }
  set idx(v: number | undefined) { this.setAttr("idx", v); }
  get v(): string | undefined { return this.getAttr("v"); }
  set v(value: string | undefined) { this.setAttr("v", value); }
}

export class CT_StrData extends OoxmlElement {
  get elementName() { return "strCache"; }
  get ptCount(): number | undefined { return this.getAttr<number>("ptCount"); }
  set ptCount(v: number | undefined) { this.setAttr("ptCount", v); }
  get points(): CT_StrVal[] { return this.findChildren(CT_StrVal); }
  addPoint(p: CT_StrVal) { this.addChild(p); }
  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_StrRef extends OoxmlElement {
  get elementName() { return "strRef"; }
  get f(): string | undefined { return this.getAttr("f"); }
  set f(v: string | undefined) { this.setAttr("f", v); }
  get strCache(): CT_StrData | undefined { return this.findChild(CT_StrData); }
  set strCache(v: CT_StrData | undefined) {
    const prev = this.strCache;
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

/* ---------- Multi-level string ref (category axis) ---------- */

export class CT_Lvl extends ListHolder<CT_StrVal> { get elementName() { return "lvl"; } }

export class CT_MultiLvlStrData extends OoxmlElement {
  get elementName() { return "multiLvlStrCache"; }
  get ptCount(): number | undefined { return this.getAttr<number>("ptCount"); }
  set ptCount(v: number | undefined) { this.setAttr("ptCount", v); }
  get levels(): CT_Lvl[] { return this.findChildren(CT_Lvl); }
  add(lvl: CT_Lvl) { this.addChild(lvl); }
}
export class CT_MultiLvlStrRef extends OoxmlElement {
  get elementName() { return "multiLvlStrRef"; }
  get f(): string | undefined { return this.getAttr("f"); }
  set f(v: string | undefined) { this.setAttr("f", v); }
  get multiLvlStrCache(): CT_MultiLvlStrData | undefined { return this.findChild(CT_MultiLvlStrData); }
  set multiLvlStrCache(v: CT_MultiLvlStrData | undefined) {
    const prev = this.multiLvlStrCache;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- CT_NumDataSource (numRef | numLit) ---------- */

/**
 * CT_NumDataSource — one of {numRef, numLit}. We model numLit as a CT_NumData
 * whose element name is overridden by context at XML write time.
 *
 * TODO: discriminate numRef vs numLit once element-name aware serialization
 * exists. For now, numRef is authoritative.
 */
export class CT_NumDataSource extends OoxmlElement {
  get elementName() { return "val"; }
  get numRef(): CT_NumRef | undefined { return this.findChild(CT_NumRef); }
  set numRef(v: CT_NumRef | undefined) {
    const prev = this.numRef;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** Literal numeric data (not backed by a cell range). */
  get numLit(): CT_NumData | undefined { return this.findChild(CT_NumData); }
  set numLit(v: CT_NumData | undefined) {
    const prev = this.numLit;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- CT_AxDataSource (multiLvlStrRef | numRef | numLit | strRef | strLit) ---------- */

/**
 * Axis data source — highly flexible. Categorical axes typically populate a
 * strRef, but XSD also permits number-based or multi-level labels.
 */
export class CT_AxDataSource extends OoxmlElement {
  get elementName() { return "cat"; }
  get multiLvlStrRef(): CT_MultiLvlStrRef | undefined { return this.findChild(CT_MultiLvlStrRef); }
  set multiLvlStrRef(v: CT_MultiLvlStrRef | undefined) {
    const prev = this.multiLvlStrRef;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get numRef(): CT_NumRef | undefined { return this.findChild(CT_NumRef); }
  set numRef(v: CT_NumRef | undefined) {
    const prev = this.numRef;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get numLit(): CT_NumData | undefined { return this.findChild(CT_NumData); }
  set numLit(v: CT_NumData | undefined) {
    const prev = this.numLit;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get strRef(): CT_StrRef | undefined { return this.findChild(CT_StrRef); }
  set strRef(v: CT_StrRef | undefined) {
    const prev = this.strRef;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get strLit(): CT_StrData | undefined { return this.findChild(CT_StrData); }
  set strLit(v: CT_StrData | undefined) {
    const prev = this.strLit;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Title text ---------- */

/** CT_Tx — rich text or formula reference (for chart / axis titles). */
export class CT_Tx extends OoxmlElement {
  get elementName() { return "tx"; }
  get strRef(): CT_StrRef | undefined { return this.findChild(CT_StrRef); }
  set strRef(v: CT_StrRef | undefined) {
    const prev = this.strRef;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** Inline rich text body (`<c:rich>`). */
  get rich(): CT_TextBody | undefined { return this.findChild(CT_TextBody); }
  set rich(v: CT_TextBody | undefined) {
    const prev = this.rich;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/** CT_SerTx — series title: either strRef or plain `<c:v>` literal. */
export class CT_SerTx extends OoxmlElement {
  get elementName() { return "tx"; }
  get strRef(): CT_StrRef | undefined { return this.findChild(CT_StrRef); }
  set strRef(v: CT_StrRef | undefined) {
    const prev = this.strRef;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** Literal series name (`<c:v>`). */
  get v(): ST_Xstring | undefined { return this.getAttr("v"); }
  set v(value: ST_Xstring | undefined) { this.setAttr("v", value); }
}

/* ---------- Relationship id / external data ---------- */

export class CT_RelId extends OoxmlElement {
  get elementName() { return "relId"; }
  get id(): ST_RelationshipId | undefined { return this.getAttr("r:id"); }
  set id(v: ST_RelationshipId | undefined) { this.setAttr("r:id", v); }
}

export class CT_ExternalData extends OoxmlElement {
  get elementName() { return "externalData"; }
  get id(): ST_RelationshipId | undefined { return this.getAttr("r:id"); }
  set id(v: ST_RelationshipId | undefined) { this.setAttr("r:id", v); }
  /** `autoUpdate` child wrapping a CT_Boolean. TODO: typed child accessor. */
  // TODO: autoUpdate child (CT_Boolean) — add typed slot once circular import
  //       from ./wrappers.ts is refactored.
}

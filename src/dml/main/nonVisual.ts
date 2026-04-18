/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd — non-visual drawing properties and locking flags.
 */

import { OoxmlElement } from "../../base/index.js";
import type { ST_DrawingElementId } from "./simpleTypes.js";

/* ---------- Locking flag types (all pure-attribute) ---------- */

/**
 * Shared base for the six XSD locking types. Holds every flag the XSD
 * may attach to any subclass; each concrete lock merely supplies its
 * element name. Unused attributes on a given subclass simply remain
 * `undefined` and are not serialized.
 */
abstract class LockingFlags extends OoxmlElement {
  get noGrp(): boolean | undefined { return this.getAttr<boolean>("noGrp"); }
  set noGrp(v: boolean | undefined) { this.setAttr("noGrp", v); }
  get noSelect(): boolean | undefined { return this.getAttr<boolean>("noSelect"); }
  set noSelect(v: boolean | undefined) { this.setAttr("noSelect", v); }
  get noRot(): boolean | undefined { return this.getAttr<boolean>("noRot"); }
  set noRot(v: boolean | undefined) { this.setAttr("noRot", v); }
  get noChangeAspect(): boolean | undefined { return this.getAttr<boolean>("noChangeAspect"); }
  set noChangeAspect(v: boolean | undefined) { this.setAttr("noChangeAspect", v); }
  get noMove(): boolean | undefined { return this.getAttr<boolean>("noMove"); }
  set noMove(v: boolean | undefined) { this.setAttr("noMove", v); }
  get noResize(): boolean | undefined { return this.getAttr<boolean>("noResize"); }
  set noResize(v: boolean | undefined) { this.setAttr("noResize", v); }
  get noEditPoints(): boolean | undefined { return this.getAttr<boolean>("noEditPoints"); }
  set noEditPoints(v: boolean | undefined) { this.setAttr("noEditPoints", v); }
  get noAdjustHandles(): boolean | undefined { return this.getAttr<boolean>("noAdjustHandles"); }
  set noAdjustHandles(v: boolean | undefined) { this.setAttr("noAdjustHandles", v); }
  get noChangeArrowheads(): boolean | undefined { return this.getAttr<boolean>("noChangeArrowheads"); }
  set noChangeArrowheads(v: boolean | undefined) { this.setAttr("noChangeArrowheads", v); }
  get noChangeShapeType(): boolean | undefined { return this.getAttr<boolean>("noChangeShapeType"); }
  set noChangeShapeType(v: boolean | undefined) { this.setAttr("noChangeShapeType", v); }
}

export class CT_ShapeLocking extends LockingFlags {
  get elementName() { return "spLocks"; }
  get noTextEdit(): boolean | undefined { return this.getAttr<boolean>("noTextEdit"); }
  set noTextEdit(v: boolean | undefined) { this.setAttr("noTextEdit", v); }
}

export class CT_ConnectorLocking extends LockingFlags {
  get elementName() { return "cxnSpLocks"; }
}

export class CT_PictureLocking extends LockingFlags {
  get elementName() { return "picLocks"; }
  get noCrop(): boolean | undefined { return this.getAttr<boolean>("noCrop"); }
  set noCrop(v: boolean | undefined) { this.setAttr("noCrop", v); }
}

export class CT_GroupLocking extends LockingFlags {
  get elementName() { return "grpSpLocks"; }
  get noUngrp(): boolean | undefined { return this.getAttr<boolean>("noUngrp"); }
  set noUngrp(v: boolean | undefined) { this.setAttr("noUngrp", v); }
}

export class CT_GraphicalObjectFrameLocking extends LockingFlags {
  get elementName() { return "graphicFrameLocks"; }
  get noDrilldown(): boolean | undefined { return this.getAttr<boolean>("noDrilldown"); }
  set noDrilldown(v: boolean | undefined) { this.setAttr("noDrilldown", v); }
}

export class CT_ContentPartLocking extends LockingFlags {
  get elementName() { return "cpLocks"; }
}

/* ---------- Hyperlink ---------- */

/** CT_Hyperlink — navigate/sound hyperlink metadata. */
export class CT_Hyperlink extends OoxmlElement {
  get elementName() { return "hlinkClick"; }
  get id(): string | undefined { return this.getAttr("r:id"); }
  set id(v: string | undefined) { this.setAttr("r:id", v); }
  get invalidUrl(): string | undefined { return this.getAttr("invalidUrl"); }
  set invalidUrl(v: string | undefined) { this.setAttr("invalidUrl", v); }
  get action(): string | undefined { return this.getAttr("action"); }
  set action(v: string | undefined) { this.setAttr("action", v); }
  get tgtFrame(): string | undefined { return this.getAttr("tgtFrame"); }
  set tgtFrame(v: string | undefined) { this.setAttr("tgtFrame", v); }
  get tooltip(): string | undefined { return this.getAttr("tooltip"); }
  set tooltip(v: string | undefined) { this.setAttr("tooltip", v); }
  get history(): boolean | undefined { return this.getAttr<boolean>("history"); }
  set history(v: boolean | undefined) { this.setAttr("history", v); }
  get highlightClick(): boolean | undefined { return this.getAttr<boolean>("highlightClick"); }
  set highlightClick(v: boolean | undefined) { this.setAttr("highlightClick", v); }
  get endSnd(): boolean | undefined { return this.getAttr<boolean>("endSnd"); }
  set endSnd(v: boolean | undefined) { this.setAttr("endSnd", v); }
}

/* ---------- Non-visual drawing properties ---------- */

/**
 * CT_NonVisualDrawingProps — common id/name/description shared by all
 * drawable elements.
 */
export class CT_NonVisualDrawingProps extends OoxmlElement {
  get elementName() { return "cNvPr"; }
  get id(): ST_DrawingElementId | undefined { return this.getAttr<number>("id"); }
  set id(v: ST_DrawingElementId | undefined) { this.setAttr("id", v); }
  get name(): string | undefined { return this.getAttr("name"); }
  set name(v: string | undefined) { this.setAttr("name", v); }
  get descr(): string | undefined { return this.getAttr("descr"); }
  set descr(v: string | undefined) { this.setAttr("descr", v); }
  get hidden(): boolean | undefined { return this.getAttr<boolean>("hidden"); }
  set hidden(v: boolean | undefined) { this.setAttr("hidden", v); }
  get title(): string | undefined { return this.getAttr("title"); }
  set title(v: string | undefined) { this.setAttr("title", v); }

  /** hlinkClick / hlinkHover. TODO: disambiguate by element name. */
  get hlinkClick(): CT_Hyperlink | undefined { return this.findChild(CT_Hyperlink); }
  set hlinkClick(_v: CT_Hyperlink | undefined) { /* TODO: disambiguate hlinkClick/hlinkHover */ }
  get hlinkHover(): CT_Hyperlink | undefined { return undefined; /* TODO */ }
  set hlinkHover(_v: CT_Hyperlink | undefined) { /* TODO */ }
}

export class CT_NonVisualDrawingShapeProps extends OoxmlElement {
  get elementName() { return "cNvSpPr"; }
  get txBox(): boolean | undefined { return this.getAttr<boolean>("txBox"); }
  set txBox(v: boolean | undefined) { this.setAttr("txBox", v); }
  get spLocks(): CT_ShapeLocking | undefined { return this.findChild(CT_ShapeLocking); }
  set spLocks(v: CT_ShapeLocking | undefined) {
    const prev = this.spLocks;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_NonVisualConnectorProperties extends OoxmlElement {
  get elementName() { return "cNvCxnSpPr"; }
  get cxnSpLocks(): CT_ConnectorLocking | undefined { return this.findChild(CT_ConnectorLocking); }
  set cxnSpLocks(v: CT_ConnectorLocking | undefined) {
    const prev = this.cxnSpLocks;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** stCxn / endCxn — start/end connection references. TODO: element-name aware. */
  // TODO: stCxn / endCxn (CT_Connection) slots
}

export class CT_NonVisualPictureProperties extends OoxmlElement {
  get elementName() { return "cNvPicPr"; }
  get preferRelativeResize(): boolean | undefined { return this.getAttr<boolean>("preferRelativeResize"); }
  set preferRelativeResize(v: boolean | undefined) { this.setAttr("preferRelativeResize", v); }
  get picLocks(): CT_PictureLocking | undefined { return this.findChild(CT_PictureLocking); }
  set picLocks(v: CT_PictureLocking | undefined) {
    const prev = this.picLocks;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_NonVisualGroupDrawingShapeProps extends OoxmlElement {
  get elementName() { return "cNvGrpSpPr"; }
  get grpSpLocks(): CT_GroupLocking | undefined { return this.findChild(CT_GroupLocking); }
  set grpSpLocks(v: CT_GroupLocking | undefined) {
    const prev = this.grpSpLocks;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_NonVisualGraphicFrameProperties extends OoxmlElement {
  get elementName() { return "cNvGraphicFramePr"; }
  get graphicFrameLocks(): CT_GraphicalObjectFrameLocking | undefined {
    return this.findChild(CT_GraphicalObjectFrameLocking);
  }
  set graphicFrameLocks(v: CT_GraphicalObjectFrameLocking | undefined) {
    const prev = this.graphicFrameLocks;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_NonVisualContentPartProperties extends OoxmlElement {
  get elementName() { return "nvContentPartPr"; }
  get cpLocks(): CT_ContentPartLocking | undefined { return this.findChild(CT_ContentPartLocking); }
  set cpLocks(v: CT_ContentPartLocking | undefined) {
    const prev = this.cpLocks;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

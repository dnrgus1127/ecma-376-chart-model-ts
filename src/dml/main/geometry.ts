/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd — geometry (preset + custom) types.
 */

import { OoxmlElement, ListHolder } from "../../base/index.js";
import type {
  ST_GeomGuideName,
  ST_GeomGuideFormula,
  ST_AdjCoordinate,
  ST_AdjAngle,
  ST_PositiveCoordinate,
  ST_PathFillMode,
  ST_ShapeType,
  ST_TextShapeType,
  ST_Coordinate,
} from "./simpleTypes.js";

/* ---------- Guides / adjustment ---------- */

export class CT_GeomGuide extends OoxmlElement {
  get elementName() { return "gd"; }
  get name(): ST_GeomGuideName | undefined { return this.getAttr("name"); }
  set name(v: ST_GeomGuideName | undefined) { this.setAttr("name", v); }
  get fmla(): ST_GeomGuideFormula | undefined { return this.getAttr("fmla"); }
  set fmla(v: ST_GeomGuideFormula | undefined) { this.setAttr("fmla", v); }
}
export class CT_GeomGuideList extends ListHolder<CT_GeomGuide> {
  get elementName() { return "gdLst"; }
}

/** Rectangular region in the shape's coordinate space. */
export class CT_GeomRect extends OoxmlElement {
  get elementName() { return "rect"; }
  get l(): ST_AdjCoordinate | undefined { return this.getAttr<ST_AdjCoordinate>("l"); }
  set l(v: ST_AdjCoordinate | undefined) { this.setAttr("l", v); }
  get t(): ST_AdjCoordinate | undefined { return this.getAttr<ST_AdjCoordinate>("t"); }
  set t(v: ST_AdjCoordinate | undefined) { this.setAttr("t", v); }
  get r(): ST_AdjCoordinate | undefined { return this.getAttr<ST_AdjCoordinate>("r"); }
  set r(v: ST_AdjCoordinate | undefined) { this.setAttr("r", v); }
  get b(): ST_AdjCoordinate | undefined { return this.getAttr<ST_AdjCoordinate>("b"); }
  set b(v: ST_AdjCoordinate | undefined) { this.setAttr("b", v); }
}

export class CT_AdjPoint2D extends OoxmlElement {
  get elementName() { return "pt"; }
  get x(): ST_AdjCoordinate | undefined { return this.getAttr<ST_AdjCoordinate>("x"); }
  set x(v: ST_AdjCoordinate | undefined) { this.setAttr("x", v); }
  get y(): ST_AdjCoordinate | undefined { return this.getAttr<ST_AdjCoordinate>("y"); }
  set y(v: ST_AdjCoordinate | undefined) { this.setAttr("y", v); }
}

/* ---------- Path commands ---------- */

export abstract class Path2DCommand extends OoxmlElement {}

export class CT_Path2DMoveTo extends Path2DCommand {
  get elementName() { return "moveTo"; }
  get pt(): CT_AdjPoint2D | undefined { return this.findChild(CT_AdjPoint2D); }
  set pt(v: CT_AdjPoint2D | undefined) {
    const prev = this.pt;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}
export class CT_Path2DLineTo extends Path2DCommand {
  get elementName() { return "lnTo"; }
  get pt(): CT_AdjPoint2D | undefined { return this.findChild(CT_AdjPoint2D); }
  set pt(v: CT_AdjPoint2D | undefined) {
    const prev = this.pt;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}
export class CT_Path2DArcTo extends Path2DCommand {
  get elementName() { return "arcTo"; }
  get wR(): ST_AdjCoordinate | undefined { return this.getAttr<ST_AdjCoordinate>("wR"); }
  set wR(v: ST_AdjCoordinate | undefined) { this.setAttr("wR", v); }
  get hR(): ST_AdjCoordinate | undefined { return this.getAttr<ST_AdjCoordinate>("hR"); }
  set hR(v: ST_AdjCoordinate | undefined) { this.setAttr("hR", v); }
  get stAng(): ST_AdjAngle | undefined { return this.getAttr<ST_AdjAngle>("stAng"); }
  set stAng(v: ST_AdjAngle | undefined) { this.setAttr("stAng", v); }
  get swAng(): ST_AdjAngle | undefined { return this.getAttr<ST_AdjAngle>("swAng"); }
  set swAng(v: ST_AdjAngle | undefined) { this.setAttr("swAng", v); }
}
export class CT_Path2DQuadBezierTo extends Path2DCommand {
  get elementName() { return "quadBezTo"; }
  /** Exactly two control points. */
  get points(): CT_AdjPoint2D[] { return this.findChildren(CT_AdjPoint2D); }
  add(pt: CT_AdjPoint2D) {
    if (this.points.length >= 2) throw new Error("quadBezTo requires exactly two points");
    this.addChild(pt);
  }
}
export class CT_Path2DCubicBezierTo extends Path2DCommand {
  get elementName() { return "cubicBezTo"; }
  /** Exactly three control points. */
  get points(): CT_AdjPoint2D[] { return this.findChildren(CT_AdjPoint2D); }
  add(pt: CT_AdjPoint2D) {
    if (this.points.length >= 3) throw new Error("cubicBezTo requires exactly three points");
    this.addChild(pt);
  }
}
export class CT_Path2DClose extends Path2DCommand { get elementName() { return "close"; } }

/* ---------- Path containers ---------- */

export class CT_Path2D extends OoxmlElement {
  get elementName() { return "path"; }
  get w(): ST_PositiveCoordinate | undefined { return this.getAttr<number>("w"); }
  set w(v: ST_PositiveCoordinate | undefined) { this.setAttr("w", v); }
  get h(): ST_PositiveCoordinate | undefined { return this.getAttr<number>("h"); }
  set h(v: ST_PositiveCoordinate | undefined) { this.setAttr("h", v); }
  get fill(): ST_PathFillMode | undefined { return this.getAttr<ST_PathFillMode>("fill"); }
  set fill(v: ST_PathFillMode | undefined) { this.setAttr("fill", v); }
  get stroke(): boolean | undefined { return this.getAttr<boolean>("stroke"); }
  set stroke(v: boolean | undefined) { this.setAttr("stroke", v); }
  get extrusionOk(): boolean | undefined { return this.getAttr<boolean>("extrusionOk"); }
  set extrusionOk(v: boolean | undefined) { this.setAttr("extrusionOk", v); }

  get commands(): Path2DCommand[] { return this.findChildren(Path2DCommand); }
  add<T extends Path2DCommand>(c: T): T { this.addChild(c); return c; }
}
export class CT_Path2DList extends ListHolder<CT_Path2D> {
  get elementName() { return "pathLst"; }
}

/* ---------- Adjust handles / connection sites ---------- */

export abstract class AdjustHandleBase extends OoxmlElement {}
export class CT_XYAdjustHandle extends AdjustHandleBase {
  get elementName() { return "ahXY"; }
  get gdRefX(): ST_GeomGuideName | undefined { return this.getAttr("gdRefX"); }
  set gdRefX(v: ST_GeomGuideName | undefined) { this.setAttr("gdRefX", v); }
  get minX(): ST_AdjCoordinate | undefined { return this.getAttr<ST_AdjCoordinate>("minX"); }
  set minX(v: ST_AdjCoordinate | undefined) { this.setAttr("minX", v); }
  get maxX(): ST_AdjCoordinate | undefined { return this.getAttr<ST_AdjCoordinate>("maxX"); }
  set maxX(v: ST_AdjCoordinate | undefined) { this.setAttr("maxX", v); }
  get gdRefY(): ST_GeomGuideName | undefined { return this.getAttr("gdRefY"); }
  set gdRefY(v: ST_GeomGuideName | undefined) { this.setAttr("gdRefY", v); }
  get minY(): ST_AdjCoordinate | undefined { return this.getAttr<ST_AdjCoordinate>("minY"); }
  set minY(v: ST_AdjCoordinate | undefined) { this.setAttr("minY", v); }
  get maxY(): ST_AdjCoordinate | undefined { return this.getAttr<ST_AdjCoordinate>("maxY"); }
  set maxY(v: ST_AdjCoordinate | undefined) { this.setAttr("maxY", v); }
  get pos(): CT_AdjPoint2D | undefined { return this.findChild(CT_AdjPoint2D); }
  set pos(v: CT_AdjPoint2D | undefined) {
    const prev = this.pos;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}
export class CT_PolarAdjustHandle extends AdjustHandleBase {
  get elementName() { return "ahPolar"; }
  get gdRefR(): ST_GeomGuideName | undefined { return this.getAttr("gdRefR"); }
  set gdRefR(v: ST_GeomGuideName | undefined) { this.setAttr("gdRefR", v); }
  get minR(): ST_AdjCoordinate | undefined { return this.getAttr<ST_AdjCoordinate>("minR"); }
  set minR(v: ST_AdjCoordinate | undefined) { this.setAttr("minR", v); }
  get maxR(): ST_AdjCoordinate | undefined { return this.getAttr<ST_AdjCoordinate>("maxR"); }
  set maxR(v: ST_AdjCoordinate | undefined) { this.setAttr("maxR", v); }
  get gdRefAng(): ST_GeomGuideName | undefined { return this.getAttr("gdRefAng"); }
  set gdRefAng(v: ST_GeomGuideName | undefined) { this.setAttr("gdRefAng", v); }
  get minAng(): ST_AdjAngle | undefined { return this.getAttr<ST_AdjAngle>("minAng"); }
  set minAng(v: ST_AdjAngle | undefined) { this.setAttr("minAng", v); }
  get maxAng(): ST_AdjAngle | undefined { return this.getAttr<ST_AdjAngle>("maxAng"); }
  set maxAng(v: ST_AdjAngle | undefined) { this.setAttr("maxAng", v); }
  get pos(): CT_AdjPoint2D | undefined { return this.findChild(CT_AdjPoint2D); }
  set pos(v: CT_AdjPoint2D | undefined) {
    const prev = this.pos;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}
export class CT_AdjustHandleList extends OoxmlElement {
  get elementName() { return "ahLst"; }
  get handles(): AdjustHandleBase[] { return this.findChildren(AdjustHandleBase); }
  add<T extends AdjustHandleBase>(h: T): T { this.addChild(h); return h; }
}

export class CT_ConnectionSite extends OoxmlElement {
  get elementName() { return "cxn"; }
  get ang(): ST_AdjAngle | undefined { return this.getAttr<ST_AdjAngle>("ang"); }
  set ang(v: ST_AdjAngle | undefined) { this.setAttr("ang", v); }
  get pos(): CT_AdjPoint2D | undefined { return this.findChild(CT_AdjPoint2D); }
  set pos(v: CT_AdjPoint2D | undefined) {
    const prev = this.pos;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}
export class CT_ConnectionSiteList extends ListHolder<CT_ConnectionSite> {
  get elementName() { return "cxnLst"; }
}
export class CT_Connection extends OoxmlElement {
  get elementName() { return "cxn"; }
  get id(): number | undefined { return this.getAttr<number>("id"); }
  set id(v: number | undefined) { this.setAttr("id", v); }
  get idx(): number | undefined { return this.getAttr<number>("idx"); }
  set idx(v: number | undefined) { this.setAttr("idx", v); }
}

/* ---------- Preset / custom geometry ---------- */

export class CT_PresetGeometry2D extends OoxmlElement {
  get elementName() { return "prstGeom"; }
  get prst(): ST_ShapeType | undefined { return this.getAttr<string>("prst"); }
  set prst(v: ST_ShapeType | undefined) { this.setAttr("prst", v); }
  get avLst(): CT_GeomGuideList | undefined { return this.findChild(CT_GeomGuideList); }
  set avLst(v: CT_GeomGuideList | undefined) {
    const prev = this.avLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}
export class CT_PresetTextShape extends OoxmlElement {
  get elementName() { return "prstTxWarp"; }
  get prst(): ST_TextShapeType | undefined { return this.getAttr<string>("prst"); }
  set prst(v: ST_TextShapeType | undefined) { this.setAttr("prst", v); }
  get avLst(): CT_GeomGuideList | undefined { return this.findChild(CT_GeomGuideList); }
  set avLst(v: CT_GeomGuideList | undefined) {
    const prev = this.avLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}
export class CT_CustomGeometry2D extends OoxmlElement {
  get elementName() { return "custGeom"; }
  get avLst(): CT_GeomGuideList | undefined {
    // TODO: disambiguate from gdLst
    return undefined;
  }
  set avLst(_v: CT_GeomGuideList | undefined) { /* TODO */ }
  get gdLst(): CT_GeomGuideList | undefined {
    // TODO: disambiguate from avLst
    return undefined;
  }
  set gdLst(_v: CT_GeomGuideList | undefined) { /* TODO */ }
  get ahLst(): CT_AdjustHandleList | undefined { return this.findChild(CT_AdjustHandleList); }
  set ahLst(v: CT_AdjustHandleList | undefined) {
    const prev = this.ahLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get cxnLst(): CT_ConnectionSiteList | undefined { return this.findChild(CT_ConnectionSiteList); }
  set cxnLst(v: CT_ConnectionSiteList | undefined) {
    const prev = this.cxnLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get rect(): CT_GeomRect | undefined { return this.findChild(CT_GeomRect); }
  set rect(v: CT_GeomRect | undefined) {
    const prev = this.rect;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get pathLst(): CT_Path2DList | undefined { return this.findChild(CT_Path2DList); }
  set pathLst(v: CT_Path2DList | undefined) {
    const prev = this.pathLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export type Geometry = CT_PresetGeometry2D | CT_CustomGeometry2D;

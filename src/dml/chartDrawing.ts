/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/chartDrawing
 * Source:    dml-chartDrawing.xsd
 *
 * Chart-embedded user shapes. Reuses dml-main for shape properties.
 */

import { OoxmlElement, ChoiceHolder } from "../base/index.js";
import {
  CT_NonVisualDrawingProps,
  CT_NonVisualDrawingShapeProps,
  CT_NonVisualConnectorProperties,
  CT_NonVisualPictureProperties,
  CT_NonVisualGroupDrawingShapeProps,
  CT_NonVisualGraphicFrameProperties,
  CT_ShapeProperties,
  CT_ShapeStyle,
  CT_GroupShapeProperties,
  CT_TextBody,
  CT_BlipFillProperties,
  CT_Transform2D,
  CT_PositiveSize2D,
  CT_GraphicalObject,
} from "./main/index.js";

/* ---------- Non-visual wrappers (mirror GVML but chart-drawing specific) ---------- */

export class CT_ShapeNonVisual extends OoxmlElement {
  get elementName() { return "nvSpPr"; }
  get cNvPr(): CT_NonVisualDrawingProps | undefined { return this.findChild(CT_NonVisualDrawingProps); }
  set cNvPr(v: CT_NonVisualDrawingProps | undefined) {
    const prev = this.cNvPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get cNvSpPr(): CT_NonVisualDrawingShapeProps | undefined { return this.findChild(CT_NonVisualDrawingShapeProps); }
  set cNvSpPr(v: CT_NonVisualDrawingShapeProps | undefined) {
    const prev = this.cNvSpPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_ConnectorNonVisual extends OoxmlElement {
  get elementName() { return "nvCxnSpPr"; }
  get cNvPr(): CT_NonVisualDrawingProps | undefined { return this.findChild(CT_NonVisualDrawingProps); }
  set cNvPr(v: CT_NonVisualDrawingProps | undefined) {
    const prev = this.cNvPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get cNvCxnSpPr(): CT_NonVisualConnectorProperties | undefined { return this.findChild(CT_NonVisualConnectorProperties); }
  set cNvCxnSpPr(v: CT_NonVisualConnectorProperties | undefined) {
    const prev = this.cNvCxnSpPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_PictureNonVisual extends OoxmlElement {
  get elementName() { return "nvPicPr"; }
  get cNvPr(): CT_NonVisualDrawingProps | undefined { return this.findChild(CT_NonVisualDrawingProps); }
  set cNvPr(v: CT_NonVisualDrawingProps | undefined) {
    const prev = this.cNvPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get cNvPicPr(): CT_NonVisualPictureProperties | undefined { return this.findChild(CT_NonVisualPictureProperties); }
  set cNvPicPr(v: CT_NonVisualPictureProperties | undefined) {
    const prev = this.cNvPicPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_GraphicFrameNonVisual extends OoxmlElement {
  get elementName() { return "nvGraphicFramePr"; }
  get cNvPr(): CT_NonVisualDrawingProps | undefined { return this.findChild(CT_NonVisualDrawingProps); }
  set cNvPr(v: CT_NonVisualDrawingProps | undefined) {
    const prev = this.cNvPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get cNvGraphicFramePr(): CT_NonVisualGraphicFrameProperties | undefined { return this.findChild(CT_NonVisualGraphicFrameProperties); }
  set cNvGraphicFramePr(v: CT_NonVisualGraphicFrameProperties | undefined) {
    const prev = this.cNvGraphicFramePr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_GroupShapeNonVisual extends OoxmlElement {
  get elementName() { return "nvGrpSpPr"; }
  get cNvPr(): CT_NonVisualDrawingProps | undefined { return this.findChild(CT_NonVisualDrawingProps); }
  set cNvPr(v: CT_NonVisualDrawingProps | undefined) {
    const prev = this.cNvPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get cNvGrpSpPr(): CT_NonVisualGroupDrawingShapeProps | undefined { return this.findChild(CT_NonVisualGroupDrawingShapeProps); }
  set cNvGrpSpPr(v: CT_NonVisualGroupDrawingShapeProps | undefined) {
    const prev = this.cNvGrpSpPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Shared drawable base ---------- */

abstract class ChartDrawableBase extends OoxmlElement {
  get spPr(): CT_ShapeProperties | undefined { return this.findChild(CT_ShapeProperties); }
  set spPr(v: CT_ShapeProperties | undefined) {
    const prev = this.spPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get style(): CT_ShapeStyle | undefined { return this.findChild(CT_ShapeStyle); }
  set style(v: CT_ShapeStyle | undefined) {
    const prev = this.style;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get macro(): string | undefined { return this.getAttr("macro"); }
  set macro(v: string | undefined) { this.setAttr("macro", v); }
  get fPublished(): boolean | undefined { return this.getAttr<boolean>("fPublished"); }
  set fPublished(v: boolean | undefined) { this.setAttr("fPublished", v); }
}

/* ---------- Shape / Connector / Picture / GraphicFrame ---------- */

export class CT_Shape extends ChartDrawableBase {
  get elementName() { return "sp"; }
  get nvSpPr(): CT_ShapeNonVisual | undefined { return this.findChild(CT_ShapeNonVisual); }
  set nvSpPr(v: CT_ShapeNonVisual | undefined) {
    const prev = this.nvSpPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get txBody(): CT_TextBody | undefined { return this.findChild(CT_TextBody); }
  set txBody(v: CT_TextBody | undefined) {
    const prev = this.txBody;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get textlink(): string | undefined { return this.getAttr("textlink"); }
  set textlink(v: string | undefined) { this.setAttr("textlink", v); }
  get fLocksText(): boolean | undefined { return this.getAttr<boolean>("fLocksText"); }
  set fLocksText(v: boolean | undefined) { this.setAttr("fLocksText", v); }
}

export class CT_Connector extends ChartDrawableBase {
  get elementName() { return "cxnSp"; }
  get nvCxnSpPr(): CT_ConnectorNonVisual | undefined { return this.findChild(CT_ConnectorNonVisual); }
  set nvCxnSpPr(v: CT_ConnectorNonVisual | undefined) {
    const prev = this.nvCxnSpPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_Picture extends ChartDrawableBase {
  get elementName() { return "pic"; }
  get nvPicPr(): CT_PictureNonVisual | undefined { return this.findChild(CT_PictureNonVisual); }
  set nvPicPr(v: CT_PictureNonVisual | undefined) {
    const prev = this.nvPicPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get blipFill(): CT_BlipFillProperties | undefined { return this.findChild(CT_BlipFillProperties); }
  set blipFill(v: CT_BlipFillProperties | undefined) {
    const prev = this.blipFill;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_GraphicFrame extends OoxmlElement {
  get elementName() { return "graphicFrame"; }
  get nvGraphicFramePr(): CT_GraphicFrameNonVisual | undefined { return this.findChild(CT_GraphicFrameNonVisual); }
  set nvGraphicFramePr(v: CT_GraphicFrameNonVisual | undefined) {
    const prev = this.nvGraphicFramePr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get xfrm(): CT_Transform2D | undefined { return this.findChild(CT_Transform2D); }
  set xfrm(v: CT_Transform2D | undefined) {
    const prev = this.xfrm;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get graphic(): CT_GraphicalObject | undefined { return this.findChild(CT_GraphicalObject); }
  set graphic(v: CT_GraphicalObject | undefined) {
    const prev = this.graphic;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get macro(): string | undefined { return this.getAttr("macro"); }
  set macro(v: string | undefined) { this.setAttr("macro", v); }
  get fPublished(): boolean | undefined { return this.getAttr<boolean>("fPublished"); }
  set fPublished(v: boolean | undefined) { this.setAttr("fPublished", v); }
}

/* ---------- Group ---------- */

export class CT_GroupShape extends OoxmlElement {
  get elementName() { return "grpSp"; }
  get nvGrpSpPr(): CT_GroupShapeNonVisual | undefined { return this.findChild(CT_GroupShapeNonVisual); }
  set nvGrpSpPr(v: CT_GroupShapeNonVisual | undefined) {
    const prev = this.nvGrpSpPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get grpSpPr(): CT_GroupShapeProperties | undefined { return this.findChild(CT_GroupShapeProperties); }
  set grpSpPr(v: CT_GroupShapeProperties | undefined) {
    const prev = this.grpSpPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get objects(): ChartDrawingObjectChoice[] {
    return this.children.filter((c): c is ChartDrawingObjectChoice =>
      c instanceof CT_Shape ||
      c instanceof CT_GroupShape ||
      c instanceof CT_GraphicFrame ||
      c instanceof CT_Connector ||
      c instanceof CT_Picture,
    );
  }
  add<T extends ChartDrawingObjectChoice>(obj: T): T { this.addChild(obj); return obj; }
}

export type ChartDrawingObjectChoice =
  | CT_Shape
  | CT_GroupShape
  | CT_GraphicFrame
  | CT_Connector
  | CT_Picture;

/* ---------- Markers + anchors ---------- */

export type ST_MarkerCoordinate = number; // 0..1

/** CT_Marker — fractional (x, y) position inside the chart bounds. */
export class CT_Marker extends OoxmlElement {
  get elementName() { return "from"; } // shared with <to> — disambiguate at serialization
  get x(): ST_MarkerCoordinate | undefined { return this.getAttr<number>("x"); }
  set x(v: ST_MarkerCoordinate | undefined) { this.setAttr("x", v); }
  get y(): ST_MarkerCoordinate | undefined { return this.getAttr<number>("y"); }
  set y(v: ST_MarkerCoordinate | undefined) { this.setAttr("y", v); }
}

abstract class AnchorBase extends OoxmlElement {
  /** Child object drawn at this anchor. */
  get object(): ChartDrawingObjectChoice | undefined {
    return this.children.find((c): c is ChartDrawingObjectChoice =>
      c instanceof CT_Shape ||
      c instanceof CT_GroupShape ||
      c instanceof CT_GraphicFrame ||
      c instanceof CT_Connector ||
      c instanceof CT_Picture,
    );
  }
  set object(v: ChartDrawingObjectChoice | undefined) {
    const prev = this.object;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /** from / to markers. TODO: disambiguate by XML element name. */
  get from(): CT_Marker | undefined { return this.findChild(CT_Marker); }
  set from(_v: CT_Marker | undefined) { /* TODO */ }
  get to(): CT_Marker | undefined { return undefined; /* TODO */ }
  set to(_v: CT_Marker | undefined) { /* TODO */ }
}

/** Anchor where both corners are fractional chart-space coordinates. */
export class CT_RelSizeAnchor extends AnchorBase {
  get elementName() { return "relSizeAnchor"; }
}

/** Anchor where top-left corner is fractional and size is absolute. */
export class CT_AbsSizeAnchor extends AnchorBase {
  get elementName() { return "absSizeAnchor"; }
  get ext(): CT_PositiveSize2D | undefined { return this.findChild(CT_PositiveSize2D); }
  set ext(v: CT_PositiveSize2D | undefined) {
    const prev = this.ext;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export type AnchorChoice = CT_RelSizeAnchor | CT_AbsSizeAnchor;

/* ---------- Drawing ---------- */

export class CT_Drawing extends OoxmlElement {
  get elementName() { return "userShapes"; }
  get anchors(): AnchorChoice[] {
    return this.children.filter((c): c is AnchorChoice =>
      c instanceof CT_RelSizeAnchor || c instanceof CT_AbsSizeAnchor,
    );
  }
  addAnchor<T extends AnchorChoice>(a: T): T { this.addChild(a); return a; }
}

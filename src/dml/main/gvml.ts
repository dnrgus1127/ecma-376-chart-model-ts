/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd — GVML (Graphics Vector Markup Language) shapes.
 *
 * GVML describes embedded drawing objects: shapes, connectors, pictures,
 * graphic frames, and their group container.
 */

import { OoxmlElement, ChoiceHolder } from "../../base/index.js";
import {
  CT_NonVisualDrawingProps,
  CT_NonVisualDrawingShapeProps,
  CT_NonVisualConnectorProperties,
  CT_NonVisualPictureProperties,
  CT_NonVisualGroupDrawingShapeProps,
  CT_NonVisualGraphicFrameProperties,
} from "./nonVisual.js";
import { CT_ShapeProperties, CT_ShapeStyle, CT_GroupShapeProperties } from "./shape.js";
import { CT_TextBody } from "./text.js";
import { CT_BlipFillProperties } from "./fills.js";
import { CT_Transform2D } from "./transforms.js";
import { CT_GraphicalObject } from "./graphics.js";

/* ---------- Non-visual wrappers ---------- */

export class CT_GvmlUseShapeRectangle extends OoxmlElement { get elementName() { return "useSpRect"; } }

export class CT_GvmlShapeNonVisual extends OoxmlElement {
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

export class CT_GvmlConnectorNonVisual extends OoxmlElement {
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

export class CT_GvmlPictureNonVisual extends OoxmlElement {
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

export class CT_GvmlGraphicFrameNonVisual extends OoxmlElement {
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

export class CT_GvmlGroupShapeNonVisual extends OoxmlElement {
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

/* ---------- Concrete GVML objects ---------- */

/**
 * Shared base for GVML drawable objects. They all expose nvSpPr + spPr
 * (or variant) + style + txBody; we implement the common pairs here.
 */
export abstract class GvmlDrawableBase extends OoxmlElement {
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
}

export class CT_GvmlTextShape extends GvmlDrawableBase {
  get elementName() { return "txSp"; }
  get txBody(): CT_TextBody | undefined { return this.findChild(CT_TextBody); }
  set txBody(v: CT_TextBody | undefined) {
    const prev = this.txBody;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get useSpRect(): CT_GvmlUseShapeRectangle | undefined { return this.findChild(CT_GvmlUseShapeRectangle); }
  set useSpRect(v: CT_GvmlUseShapeRectangle | undefined) {
    const prev = this.useSpRect;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get xfrm(): CT_Transform2D | undefined { return this.findChild(CT_Transform2D); }
  set xfrm(v: CT_Transform2D | undefined) {
    const prev = this.xfrm;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_GvmlShape extends GvmlDrawableBase {
  get elementName() { return "sp"; }
  get nvSpPr(): CT_GvmlShapeNonVisual | undefined { return this.findChild(CT_GvmlShapeNonVisual); }
  set nvSpPr(v: CT_GvmlShapeNonVisual | undefined) {
    const prev = this.nvSpPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get txSp(): CT_GvmlTextShape | undefined { return this.findChild(CT_GvmlTextShape); }
  set txSp(v: CT_GvmlTextShape | undefined) {
    const prev = this.txSp;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get useBgFill(): boolean | undefined { return this.getAttr<boolean>("useBgFill"); }
  set useBgFill(v: boolean | undefined) { this.setAttr("useBgFill", v); }
}

export class CT_GvmlConnector extends GvmlDrawableBase {
  get elementName() { return "cxnSp"; }
  get nvCxnSpPr(): CT_GvmlConnectorNonVisual | undefined { return this.findChild(CT_GvmlConnectorNonVisual); }
  set nvCxnSpPr(v: CT_GvmlConnectorNonVisual | undefined) {
    const prev = this.nvCxnSpPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_GvmlPicture extends GvmlDrawableBase {
  get elementName() { return "pic"; }
  get nvPicPr(): CT_GvmlPictureNonVisual | undefined { return this.findChild(CT_GvmlPictureNonVisual); }
  set nvPicPr(v: CT_GvmlPictureNonVisual | undefined) {
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

export class CT_GvmlGraphicalObjectFrame extends OoxmlElement {
  get elementName() { return "graphicFrame"; }
  get nvGraphicFramePr(): CT_GvmlGraphicFrameNonVisual | undefined { return this.findChild(CT_GvmlGraphicFrameNonVisual); }
  set nvGraphicFramePr(v: CT_GvmlGraphicFrameNonVisual | undefined) {
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
}

/**
 * CT_GvmlGroupShape — group container with nested choice of children.
 * Note: recursive (group may contain groups).
 */
export class CT_GvmlGroupShape extends OoxmlElement {
  get elementName() { return "grpSp"; }
  get nvGrpSpPr(): CT_GvmlGroupShapeNonVisual | undefined { return this.findChild(CT_GvmlGroupShapeNonVisual); }
  set nvGrpSpPr(v: CT_GvmlGroupShapeNonVisual | undefined) {
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

  /** Ordered child objects of this group (any GVML object or nested group). */
  get objects(): GvmlObjectChoice[] {
    return this.children.filter(
      (c): c is GvmlObjectChoice =>
        c instanceof CT_GvmlShape ||
        c instanceof CT_GvmlGroupShape ||
        c instanceof CT_GvmlGraphicalObjectFrame ||
        c instanceof CT_GvmlConnector ||
        c instanceof CT_GvmlPicture,
    );
  }
  addObject<T extends GvmlObjectChoice>(obj: T): T { this.addChild(obj); return obj; }
}

export type GvmlObjectChoice =
  | CT_GvmlShape
  | CT_GvmlGroupShape
  | CT_GvmlGraphicalObjectFrame
  | CT_GvmlConnector
  | CT_GvmlPicture;

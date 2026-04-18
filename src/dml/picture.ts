/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/picture
 * Source:    dml-picture.xsd — standalone picture drawing.
 */

import { OoxmlElement } from "../base/index.js";
import {
  CT_NonVisualDrawingProps,
  CT_NonVisualPictureProperties,
  CT_ShapeProperties,
  CT_BlipFillProperties,
} from "./main/index.js";

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

export class CT_Picture extends OoxmlElement {
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
  get spPr(): CT_ShapeProperties | undefined { return this.findChild(CT_ShapeProperties); }
  set spPr(v: CT_ShapeProperties | undefined) {
    const prev = this.spPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

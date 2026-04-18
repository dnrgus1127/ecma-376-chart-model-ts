/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd (transforms & geometry primitives)
 */

import { OoxmlElement, ValueElement } from "../../base/index.js";
import type {
  ST_Coordinate,
  ST_PositiveCoordinate,
  ST_Angle,
  ST_Percentage,
} from "./simpleTypes.js";

/** CT_Ratio — <a:n>/<a:d> style. */
export class CT_Ratio extends OoxmlElement {
  get elementName() { return "ratio"; }

  get n(): number | undefined { return this.getAttr<number>("n"); }
  set n(v: number | undefined) { this.setAttr("n", v); }
  get d(): number | undefined { return this.getAttr<number>("d"); }
  set d(v: number | undefined) { this.setAttr("d", v); }
}

/** CT_Point2D — x/y in EMUs. */
export class CT_Point2D extends OoxmlElement {
  get elementName() { return "off"; }

  get x(): ST_Coordinate | undefined { return this.getAttr<ST_Coordinate>("x"); }
  set x(v: ST_Coordinate | undefined) { this.setAttr("x", v); }
  get y(): ST_Coordinate | undefined { return this.getAttr<ST_Coordinate>("y"); }
  set y(v: ST_Coordinate | undefined) { this.setAttr("y", v); }
}

/** CT_PositiveSize2D — cx/cy in EMUs, ≥ 0. */
export class CT_PositiveSize2D extends OoxmlElement {
  get elementName() { return "ext"; }

  get cx(): ST_PositiveCoordinate | undefined { return this.getAttr<number>("cx"); }
  set cx(v: ST_PositiveCoordinate | undefined) { this.setAttr("cx", v); }
  get cy(): ST_PositiveCoordinate | undefined { return this.getAttr<number>("cy"); }
  set cy(v: ST_PositiveCoordinate | undefined) { this.setAttr("cy", v); }
}

/** CT_Scale2D — sx/sy ratios. */
export class CT_Scale2D extends OoxmlElement {
  get elementName() { return "scale"; }

  get sx(): CT_Ratio | undefined { return this.findChild(CT_Ratio); }
  set sx(v: CT_Ratio | undefined) {
    const prev = this.sx;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  // XSD defines sy as a second CT_Ratio child, but there is only one ratio element
  // per XSD actually; for a full model this would need two named children. TODO.
}

/**
 * CT_Transform2D — 2D affine transform (offset, extent, rotation, flips).
 * Used by CT_ShapeProperties, CT_GraphicFrame etc.
 */
export class CT_Transform2D extends OoxmlElement {
  get elementName() { return "xfrm"; }

  /** `rot` attribute — rotation in 1/60000 degrees. */
  get rot(): ST_Angle | undefined { return this.getAttr<number>("rot"); }
  set rot(v: ST_Angle | undefined) { this.setAttr("rot", v); }
  get flipH(): boolean | undefined { return this.getAttr<boolean>("flipH"); }
  set flipH(v: boolean | undefined) { this.setAttr("flipH", v); }
  get flipV(): boolean | undefined { return this.getAttr<boolean>("flipV"); }
  set flipV(v: boolean | undefined) { this.setAttr("flipV", v); }

  get off(): CT_Point2D | undefined { return this.findChild(CT_Point2D); }
  set off(v: CT_Point2D | undefined) {
    const prev = this.off;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get ext(): CT_PositiveSize2D | undefined { return this.findChild(CT_PositiveSize2D); }
  set ext(v: CT_PositiveSize2D | undefined) {
    const prev = this.ext;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/**
 * CT_GroupTransform2D — transform for group shapes (with child offset/extent).
 */
export class CT_GroupTransform2D extends CT_Transform2D {
  override get elementName() { return "xfrm"; }

  /**
   * `chOff` and `chExt` — child coordinate system offset/extent.
   * TODO: disambiguate from parent off/ext (currently both live on the same
   * single child). A full implementation would distinguish them by XML name.
   */
  get chOff(): CT_Point2D | undefined {
    // TODO: distinguish "chOff" from "off" once XML (de)serialization is added
    return undefined;
  }
  set chOff(_v: CT_Point2D | undefined) {
    // TODO
  }
  get chExt(): CT_PositiveSize2D | undefined {
    // TODO: distinguish "chExt" from "ext"
    return undefined;
  }
  set chExt(_v: CT_PositiveSize2D | undefined) {
    // TODO
  }
}

/** CT_Point3D — x/y/z coordinates. */
export class CT_Point3D extends OoxmlElement {
  get elementName() { return "anchor"; }
  get x(): ST_Coordinate | undefined { return this.getAttr<ST_Coordinate>("x"); }
  set x(v: ST_Coordinate | undefined) { this.setAttr("x", v); }
  get y(): ST_Coordinate | undefined { return this.getAttr<ST_Coordinate>("y"); }
  set y(v: ST_Coordinate | undefined) { this.setAttr("y", v); }
  get z(): ST_Coordinate | undefined { return this.getAttr<ST_Coordinate>("z"); }
  set z(v: ST_Coordinate | undefined) { this.setAttr("z", v); }
}

/** CT_Vector3D — dx/dy/dz deltas. */
export class CT_Vector3D extends OoxmlElement {
  get elementName() { return "norm"; }
  get dx(): ST_Coordinate | undefined { return this.getAttr<ST_Coordinate>("dx"); }
  set dx(v: ST_Coordinate | undefined) { this.setAttr("dx", v); }
  get dy(): ST_Coordinate | undefined { return this.getAttr<ST_Coordinate>("dy"); }
  set dy(v: ST_Coordinate | undefined) { this.setAttr("dy", v); }
  get dz(): ST_Coordinate | undefined { return this.getAttr<ST_Coordinate>("dz"); }
  set dz(v: ST_Coordinate | undefined) { this.setAttr("dz", v); }
}

/** CT_SphereCoords — lat/lon/rev (spherical). */
export class CT_SphereCoords extends OoxmlElement {
  get elementName() { return "rot"; }
  get lat(): ST_Angle | undefined { return this.getAttr<number>("lat"); }
  set lat(v: ST_Angle | undefined) { this.setAttr("lat", v); }
  get lon(): ST_Angle | undefined { return this.getAttr<number>("lon"); }
  set lon(v: ST_Angle | undefined) { this.setAttr("lon", v); }
  get rev(): ST_Angle | undefined { return this.getAttr<number>("rev"); }
  set rev(v: ST_Angle | undefined) { this.setAttr("rev", v); }
}

/** CT_RelativeRect — l/t/r/b percentages of a reference rectangle. */
export class CT_RelativeRect extends OoxmlElement {
  get elementName() { return "fillRect"; }

  get l(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("l"); }
  set l(v: ST_Percentage | undefined) { this.setAttr("l", v); }
  get t(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("t"); }
  set t(v: ST_Percentage | undefined) { this.setAttr("t", v); }
  get r(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("r"); }
  set r(v: ST_Percentage | undefined) { this.setAttr("r", v); }
  get b(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("b"); }
  set b(v: ST_Percentage | undefined) { this.setAttr("b", v); }
}

/* ---------- Attribute-only wrappers (ValueElement) ---------- */

/** CT_Angle — wraps a single `val` angle attribute. */
export class CT_Angle extends ValueElement<ST_Angle> {
  get elementName() { return "angle"; }
}

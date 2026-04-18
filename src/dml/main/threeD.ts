/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd — 3D scene / shape 3D types.
 */

import { OoxmlElement } from "../../base/index.js";
import type {
  ST_PresetCameraType,
  ST_PositiveFixedAngle,
  ST_LightRigType,
  ST_LightRigDirection,
  ST_BevelPresetType,
  ST_PositiveCoordinate,
  ST_FOVAngle,
  ST_PositivePercentage,
  ST_PresetMaterialType,
} from "./simpleTypes.js";
import { CT_SphereCoords, CT_Point3D, CT_Vector3D } from "./transforms.js";
import { ColorChoice } from "./colors.js";

/* ---------- Camera / light ---------- */

export class CT_Camera extends OoxmlElement {
  get elementName() { return "camera"; }
  get prst(): ST_PresetCameraType | undefined { return this.getAttr<string>("prst"); }
  set prst(v: ST_PresetCameraType | undefined) { this.setAttr("prst", v); }
  get fov(): ST_FOVAngle | undefined { return this.getAttr<number>("fov"); }
  set fov(v: ST_FOVAngle | undefined) { this.setAttr("fov", v); }
  get zoom(): ST_PositivePercentage | undefined { return this.getAttr<number>("zoom"); }
  set zoom(v: ST_PositivePercentage | undefined) { this.setAttr("zoom", v); }

  get rot(): CT_SphereCoords | undefined { return this.findChild(CT_SphereCoords); }
  set rot(v: CT_SphereCoords | undefined) {
    const prev = this.rot;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_LightRig extends OoxmlElement {
  get elementName() { return "lightRig"; }
  get rig(): ST_LightRigType | undefined { return this.getAttr<ST_LightRigType>("rig"); }
  set rig(v: ST_LightRigType | undefined) { this.setAttr("rig", v); }
  get dir(): ST_LightRigDirection | undefined { return this.getAttr<ST_LightRigDirection>("dir"); }
  set dir(v: ST_LightRigDirection | undefined) { this.setAttr("dir", v); }

  get rot(): CT_SphereCoords | undefined { return this.findChild(CT_SphereCoords); }
  set rot(v: CT_SphereCoords | undefined) {
    const prev = this.rot;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Scene & shape 3D ---------- */

export class CT_Backdrop extends OoxmlElement {
  get elementName() { return "backdrop"; }
  get anchor(): CT_Point3D | undefined { return this.findChild(CT_Point3D); }
  set anchor(v: CT_Point3D | undefined) {
    const prev = this.anchor;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /**
   * norm / up vectors. TODO: disambiguate by XML element name.
   */
  get norm(): CT_Vector3D | undefined { return this.findChild(CT_Vector3D); }
  set norm(_v: CT_Vector3D | undefined) { /* TODO */ }
  get up(): CT_Vector3D | undefined { return undefined; /* TODO */ }
  set up(_v: CT_Vector3D | undefined) { /* TODO */ }
}

export class CT_Scene3D extends OoxmlElement {
  get elementName() { return "scene3d"; }
  get camera(): CT_Camera | undefined { return this.findChild(CT_Camera); }
  set camera(v: CT_Camera | undefined) {
    const prev = this.camera;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get lightRig(): CT_LightRig | undefined { return this.findChild(CT_LightRig); }
  set lightRig(v: CT_LightRig | undefined) {
    const prev = this.lightRig;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get backdrop(): CT_Backdrop | undefined { return this.findChild(CT_Backdrop); }
  set backdrop(v: CT_Backdrop | undefined) {
    const prev = this.backdrop;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_Bevel extends OoxmlElement {
  get elementName() { return "bevelT"; }
  get w(): ST_PositiveCoordinate | undefined { return this.getAttr<number>("w"); }
  set w(v: ST_PositiveCoordinate | undefined) { this.setAttr("w", v); }
  get h(): ST_PositiveCoordinate | undefined { return this.getAttr<number>("h"); }
  set h(v: ST_PositiveCoordinate | undefined) { this.setAttr("h", v); }
  get prst(): ST_BevelPresetType | undefined { return this.getAttr<ST_BevelPresetType>("prst"); }
  set prst(v: ST_BevelPresetType | undefined) { this.setAttr("prst", v); }
}

export class CT_Shape3D extends OoxmlElement {
  get elementName() { return "sp3d"; }
  get z(): number | undefined { return this.getAttr<number>("z"); }
  set z(v: number | undefined) { this.setAttr("z", v); }
  get extrusionH(): ST_PositiveCoordinate | undefined { return this.getAttr<number>("extrusionH"); }
  set extrusionH(v: ST_PositiveCoordinate | undefined) { this.setAttr("extrusionH", v); }
  get contourW(): ST_PositiveCoordinate | undefined { return this.getAttr<number>("contourW"); }
  set contourW(v: ST_PositiveCoordinate | undefined) { this.setAttr("contourW", v); }
  get prstMaterial(): ST_PresetMaterialType | undefined { return this.getAttr<ST_PresetMaterialType>("prstMaterial"); }
  set prstMaterial(v: ST_PresetMaterialType | undefined) { this.setAttr("prstMaterial", v); }

  /**
   * bevelT / bevelB — top/bottom bevel profile. TODO: disambiguate by name.
   */
  get bevelT(): CT_Bevel | undefined { return this.findChild(CT_Bevel); }
  set bevelT(_v: CT_Bevel | undefined) { /* TODO: disambiguate bevelT/bevelB */ }
  get bevelB(): CT_Bevel | undefined { return undefined; /* TODO */ }
  set bevelB(_v: CT_Bevel | undefined) { /* TODO */ }

  /** extrusionClr / contourClr — accent colors. TODO: disambiguate. */
  get extrusionColor(): ColorChoice | undefined { return undefined; /* TODO */ }
  set extrusionColor(_v: ColorChoice | undefined) { /* TODO */ }
  get contourColor(): ColorChoice | undefined { return undefined; /* TODO */ }
  set contourColor(_v: ColorChoice | undefined) { /* TODO */ }
}

/** CT_FlatText — text rendered on the XY plane at the given z. */
export class CT_FlatText extends OoxmlElement {
  get elementName() { return "flatTx"; }
  get z(): number | undefined { return this.getAttr<number>("z"); }
  set z(v: number | undefined) { this.setAttr("z", v); }
}

export type Text3DChoice = CT_Scene3D | CT_Shape3D | CT_FlatText;

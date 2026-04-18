/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd — shape visual properties and shape style references.
 *
 * These types are used heavily inside charts (every chart element has
 * `CT_ShapeProperties spPr` and optionally `CT_ShapeStyle style`).
 */

import { OoxmlElement } from "../../base/index.js";
import type { ST_BlackWhiteMode, ST_StyleMatrixColumnIndex } from "./simpleTypes.js";
import { CT_Transform2D, CT_GroupTransform2D } from "./transforms.js";
import { FillProperties } from "./fills.js";
import { CT_LineProperties } from "./lines.js";
import {
  EffectPropertiesChoice,
  CT_EffectList,
  CT_EffectContainer,
} from "./effects.js";
import { Geometry, CT_PresetGeometry2D, CT_CustomGeometry2D } from "./geometry.js";
import { CT_Scene3D, CT_Shape3D } from "./threeD.js";
import { CT_OfficeArtExtensionList } from "./extension.js";
import {
  CT_NoFillProperties,
  CT_SolidColorFillProperties,
  CT_GradientFillProperties,
  CT_BlipFillProperties,
  CT_PatternFillProperties,
  CT_GroupFillProperties,
} from "./fills.js";
import { CT_Color, ColorChoice } from "./colors.js";
import { CT_TextFont } from "./text.js";

/* ---------- Style matrix / font references ---------- */

/**
 * Base for references pointing into the theme style matrix (fill/line/effect
 * style lists). Concrete classes reuse `idx` and an inline color override.
 */
export abstract class StyleRefBase extends OoxmlElement {
  get idx(): ST_StyleMatrixColumnIndex | undefined { return this.getAttr<number>("idx"); }
  set idx(v: ST_StyleMatrixColumnIndex | undefined) { this.setAttr("idx", v); }
  /** Override color choice (wraps EG_ColorChoice). */
  get color(): ColorChoice | undefined { return this.children[0] as ColorChoice | undefined; }
  set color(v: ColorChoice | undefined) {
    this.children.length = 0;
    if (v) this.addChild(v);
  }
}

export class CT_StyleMatrixReference extends StyleRefBase {
  get elementName() { return "fillRef"; } // also used as lnRef / effectRef / bgRef
}

export class CT_FontReference extends StyleRefBase {
  get elementName() { return "fontRef"; }
  get idx_(): "major" | "minor" | "none" | undefined { return this.getAttr("idx"); }
  /** Override: font references use an ST_FontCollectionIndex enum, not numeric. */
  override get idx(): any { return this.getAttr("idx"); }
  override set idx(v: any) { this.setAttr("idx", v); }
}

/* ---------- CT_ShapeProperties ---------- */

/**
 * CT_ShapeProperties — core visual properties of any shape.
 *
 * Composition (ordered in XSD):
 *   xfrm? + EG_Geometry? + EG_FillProperties? + ln? +
 *   EG_EffectProperties? + scene3d? + sp3d? + extLst?
 *
 * All slots are exposed with get/set pairs. When multiple XSD types share
 * a single XSD slot (e.g. every fill variant), the setter removes any
 * previous occupant and inserts the new one.
 */
export class CT_ShapeProperties extends OoxmlElement {
  get elementName() { return "spPr"; }

  get bwMode(): ST_BlackWhiteMode | undefined { return this.getAttr<ST_BlackWhiteMode>("bwMode"); }
  set bwMode(v: ST_BlackWhiteMode | undefined) { this.setAttr("bwMode", v); }

  /* transform */
  get xfrm(): CT_Transform2D | undefined { return this.findChild(CT_Transform2D); }
  set xfrm(v: CT_Transform2D | undefined) {
    const prev = this.xfrm;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /* geometry choice */
  get geometry(): Geometry | undefined {
    return this.findChild(CT_PresetGeometry2D) ?? this.findChild(CT_CustomGeometry2D);
  }
  set geometry(v: Geometry | undefined) {
    const prev = this.geometry;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /* fill choice */
  get fill(): FillProperties | undefined {
    return (
      this.findChild(CT_NoFillProperties) ??
      this.findChild(CT_SolidColorFillProperties) ??
      this.findChild(CT_GradientFillProperties) ??
      this.findChild(CT_BlipFillProperties) ??
      this.findChild(CT_PatternFillProperties) ??
      this.findChild(CT_GroupFillProperties)
    );
  }
  set fill(v: FillProperties | undefined) {
    const prev = this.fill;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /* line */
  get line(): CT_LineProperties | undefined { return this.findChild(CT_LineProperties); }
  set line(v: CT_LineProperties | undefined) {
    const prev = this.line;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /* effect properties choice */
  get effect(): EffectPropertiesChoice | undefined {
    return this.findChild(CT_EffectList) ?? this.findChild(CT_EffectContainer);
  }
  set effect(v: EffectPropertiesChoice | undefined) {
    const prev = this.effect;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /* 3D */
  get scene3d(): CT_Scene3D | undefined { return this.findChild(CT_Scene3D); }
  set scene3d(v: CT_Scene3D | undefined) {
    const prev = this.scene3d;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get sp3d(): CT_Shape3D | undefined { return this.findChild(CT_Shape3D); }
  set sp3d(v: CT_Shape3D | undefined) {
    const prev = this.sp3d;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /* extension list */
  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- CT_GroupShapeProperties ---------- */

/**
 * CT_GroupShapeProperties — a subset of shape properties for group shapes.
 * No geometry / no sp3d; includes group transform instead of regular xfrm.
 */
export class CT_GroupShapeProperties extends OoxmlElement {
  get elementName() { return "grpSpPr"; }

  get bwMode(): ST_BlackWhiteMode | undefined { return this.getAttr<ST_BlackWhiteMode>("bwMode"); }
  set bwMode(v: ST_BlackWhiteMode | undefined) { this.setAttr("bwMode", v); }

  get xfrm(): CT_GroupTransform2D | undefined { return this.findChild(CT_GroupTransform2D); }
  set xfrm(v: CT_GroupTransform2D | undefined) {
    const prev = this.xfrm;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get fill(): FillProperties | undefined {
    return (
      this.findChild(CT_NoFillProperties) ??
      this.findChild(CT_SolidColorFillProperties) ??
      this.findChild(CT_GradientFillProperties) ??
      this.findChild(CT_BlipFillProperties) ??
      this.findChild(CT_PatternFillProperties) ??
      this.findChild(CT_GroupFillProperties)
    );
  }
  set fill(v: FillProperties | undefined) {
    const prev = this.fill;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get effect(): EffectPropertiesChoice | undefined {
    return this.findChild(CT_EffectList) ?? this.findChild(CT_EffectContainer);
  }
  set effect(v: EffectPropertiesChoice | undefined) {
    const prev = this.effect;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get scene3d(): CT_Scene3D | undefined { return this.findChild(CT_Scene3D); }
  set scene3d(v: CT_Scene3D | undefined) {
    const prev = this.scene3d;
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

/* ---------- CT_ShapeStyle ---------- */

/**
 * CT_ShapeStyle — references into the theme matrix (line/fill/effect style +
 * font style).
 *
 * The XSD models four named children (`lnRef`, `fillRef`, `effectRef`,
 * `fontRef`). Our single-slot container cannot distinguish them by type
 * alone, so the named accessors are implemented with a `tag` attribute.
 */
export class CT_ShapeStyle extends OoxmlElement {
  get elementName() { return "style"; }

  private getRef(slot: string): CT_StyleMatrixReference | undefined {
    return this.findChildren(CT_StyleMatrixReference).find(r => r.getAttr("__slot") === slot);
  }
  private setRef(slot: string, ref: CT_StyleMatrixReference | undefined) {
    const prev = this.getRef(slot);
    if (prev) this.removeChild(prev);
    if (ref) {
      ref.setAttr("__slot", slot);
      this.addChild(ref);
    }
  }

  get lnRef(): CT_StyleMatrixReference | undefined { return this.getRef("lnRef"); }
  set lnRef(v: CT_StyleMatrixReference | undefined) { this.setRef("lnRef", v); }
  get fillRef(): CT_StyleMatrixReference | undefined { return this.getRef("fillRef"); }
  set fillRef(v: CT_StyleMatrixReference | undefined) { this.setRef("fillRef", v); }
  get effectRef(): CT_StyleMatrixReference | undefined { return this.getRef("effectRef"); }
  set effectRef(v: CT_StyleMatrixReference | undefined) { this.setRef("effectRef", v); }

  get fontRef(): CT_FontReference | undefined { return this.findChild(CT_FontReference); }
  set fontRef(v: CT_FontReference | undefined) {
    const prev = this.fontRef;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Empty element / default definitions ---------- */

export class CT_EmptyElement extends OoxmlElement { get elementName() { return "emptyElement"; } }

/**
 * CT_DefaultShapeDefinition — default shape styles (spPr + bodyPr + lstStyle
 * + style). TODO: wire typed sub-element access once text/body imports are
 * refactored to avoid a cycle.
 */
export class CT_DefaultShapeDefinition extends OoxmlElement {
  get elementName() { return "spDef"; }
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
  // TODO: bodyPr, lstStyle children (text namespace cyclic import)
}

export class CT_ObjectStyleDefaults extends OoxmlElement {
  get elementName() { return "objectDefaults"; }
  // TODO: spDef / lnDef / txDef children with named lookup
}

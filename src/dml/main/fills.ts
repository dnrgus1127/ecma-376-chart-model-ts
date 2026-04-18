/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd — fill properties.
 *
 * EG_FillProperties is a choice of: noFill, solidFill, gradFill, blipFill,
 * pattFill, grpFill. We expose each concrete class and a common union.
 */

import { OoxmlElement, ListHolder, ChoiceHolder } from "../../base/index.js";
import type {
  ST_PositiveFixedPercentage,
  ST_PathShadeType,
  ST_TileFlipMode,
  ST_PresetPatternVal,
  ST_BlipCompression,
  ST_Percentage,
  ST_PositiveFixedAngle,
  ST_PositiveCoordinate,
} from "./simpleTypes.js";
import type { ST_RelationshipId } from "../../shared/index.js";
import { CT_Color, CT_ColorScheme, type ColorChoice } from "./colors.js";
import { CT_RelativeRect, CT_Point2D } from "./transforms.js";

/* ---------- Marker fills ---------- */

export class CT_NoFillProperties extends OoxmlElement { get elementName() { return "noFill"; } }
export class CT_GroupFillProperties extends OoxmlElement { get elementName() { return "grpFill"; } }

/* ---------- Solid fill ---------- */

/** CT_SolidColorFillProperties — a solid color (wrapping EG_ColorChoice). */
export class CT_SolidColorFillProperties extends ChoiceHolder<ColorChoice> {
  get elementName() { return "solidFill"; }
}

/* ---------- Gradient fill ---------- */

/** CT_GradientStop — position (0..100000 = 0..100%) + color. */
export class CT_GradientStop extends OoxmlElement {
  get elementName() { return "gs"; }
  get pos(): ST_PositiveFixedPercentage | undefined { return this.getAttr<number>("pos"); }
  set pos(v: ST_PositiveFixedPercentage | undefined) { this.setAttr("pos", v); }
  get color(): ColorChoice | undefined { return this.children[0] as ColorChoice | undefined; }
  set color(v: ColorChoice | undefined) {
    this.children.length = 0;
    if (v) this.addChild(v);
  }
}

/** CT_GradientStopList — list of CT_GradientStop. */
export class CT_GradientStopList extends ListHolder<CT_GradientStop> {
  get elementName() { return "gsLst"; }
}

/** CT_LinearShadeProperties — linear gradient (angle + scaled flag). */
export class CT_LinearShadeProperties extends OoxmlElement {
  get elementName() { return "lin"; }
  get ang(): ST_PositiveFixedAngle | undefined { return this.getAttr<number>("ang"); }
  set ang(v: ST_PositiveFixedAngle | undefined) { this.setAttr("ang", v); }
  get scaled(): boolean | undefined { return this.getAttr<boolean>("scaled"); }
  set scaled(v: boolean | undefined) { this.setAttr("scaled", v); }
}

/** CT_PathShadeProperties — radial/path gradient. */
export class CT_PathShadeProperties extends OoxmlElement {
  get elementName() { return "path"; }
  get path(): ST_PathShadeType | undefined { return this.getAttr<ST_PathShadeType>("path"); }
  set path(v: ST_PathShadeType | undefined) { this.setAttr("path", v); }
  get fillToRect(): CT_RelativeRect | undefined { return this.findChild(CT_RelativeRect); }
  set fillToRect(v: CT_RelativeRect | undefined) {
    const prev = this.fillToRect;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export type GradientShade = CT_LinearShadeProperties | CT_PathShadeProperties;

/**
 * CT_GradientFillProperties — gradient fill definition.
 *
 * Children: gsLst? + (lin | path)? + tileRect?
 * Attributes: flip, rotWithShape.
 */
export class CT_GradientFillProperties extends OoxmlElement {
  get elementName() { return "gradFill"; }
  get flip(): ST_TileFlipMode | undefined { return this.getAttr<ST_TileFlipMode>("flip"); }
  set flip(v: ST_TileFlipMode | undefined) { this.setAttr("flip", v); }
  get rotWithShape(): boolean | undefined { return this.getAttr<boolean>("rotWithShape"); }
  set rotWithShape(v: boolean | undefined) { this.setAttr("rotWithShape", v); }

  get stopList(): CT_GradientStopList | undefined { return this.findChild(CT_GradientStopList); }
  set stopList(v: CT_GradientStopList | undefined) {
    const prev = this.stopList;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get shade(): GradientShade | undefined {
    return this.findChild(CT_LinearShadeProperties) ?? this.findChild(CT_PathShadeProperties);
  }
  set shade(v: GradientShade | undefined) {
    const prev = this.shade;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /** tileRect — relative rectangle defining the gradient tile extent. */
  get tileRect(): CT_RelativeRect | undefined {
    // TODO: disambiguate from `fillToRect` once element-name aware lookup exists
    return undefined;
  }
  set tileRect(_v: CT_RelativeRect | undefined) {
    // TODO
  }
}

/* ---------- Blip (image) fill ---------- */

/**
 * CT_Blip — embedded or linked image reference with effect chain.
 * TODO: implement the full effect sub-element chain (alphaBiLevel, blur, etc.)
 * — they are a subset of the effects catalog defined in ./effects.ts.
 */
export class CT_Blip extends OoxmlElement {
  get elementName() { return "blip"; }
  get embed(): ST_RelationshipId | undefined { return this.getAttr<string>("r:embed"); }
  set embed(v: ST_RelationshipId | undefined) { this.setAttr("r:embed", v); }
  get link(): ST_RelationshipId | undefined { return this.getAttr<string>("r:link"); }
  set link(v: ST_RelationshipId | undefined) { this.setAttr("r:link", v); }
  get cstate(): ST_BlipCompression | undefined { return this.getAttr<ST_BlipCompression>("cstate"); }
  set cstate(v: ST_BlipCompression | undefined) { this.setAttr("cstate", v); }

  // TODO: embedded effects (alphaBiLevel, alphaCeiling, blur, duotone, ...).
}

/** CT_TileInfoProperties — tiling parameters for blip fills. */
export class CT_TileInfoProperties extends OoxmlElement {
  get elementName() { return "tile"; }
  get tx(): number | undefined { return this.getAttr<number>("tx"); }
  set tx(v: number | undefined) { this.setAttr("tx", v); }
  get ty(): number | undefined { return this.getAttr<number>("ty"); }
  set ty(v: number | undefined) { this.setAttr("ty", v); }
  get sx(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("sx"); }
  set sx(v: ST_Percentage | undefined) { this.setAttr("sx", v); }
  get sy(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("sy"); }
  set sy(v: ST_Percentage | undefined) { this.setAttr("sy", v); }
  get flip(): ST_TileFlipMode | undefined { return this.getAttr<ST_TileFlipMode>("flip"); }
  set flip(v: ST_TileFlipMode | undefined) { this.setAttr("flip", v); }
  get algn(): string | undefined { return this.getAttr("algn"); }
  set algn(v: string | undefined) { this.setAttr("algn", v); }
}

/** CT_StretchInfoProperties — stretch rectangle for blip fills. */
export class CT_StretchInfoProperties extends OoxmlElement {
  get elementName() { return "stretch"; }
  get fillRect(): CT_RelativeRect | undefined { return this.findChild(CT_RelativeRect); }
  set fillRect(v: CT_RelativeRect | undefined) {
    const prev = this.fillRect;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export type BlipFillMode = CT_TileInfoProperties | CT_StretchInfoProperties;

/**
 * CT_BlipFillProperties — blip fill with tiling or stretching and
 * optional source rectangle.
 */
export class CT_BlipFillProperties extends OoxmlElement {
  get elementName() { return "blipFill"; }
  get dpi(): number | undefined { return this.getAttr<number>("dpi"); }
  set dpi(v: number | undefined) { this.setAttr("dpi", v); }
  get rotWithShape(): boolean | undefined { return this.getAttr<boolean>("rotWithShape"); }
  set rotWithShape(v: boolean | undefined) { this.setAttr("rotWithShape", v); }

  get blip(): CT_Blip | undefined { return this.findChild(CT_Blip); }
  set blip(v: CT_Blip | undefined) {
    const prev = this.blip;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get srcRect(): CT_RelativeRect | undefined { return this.findChild(CT_RelativeRect); }
  set srcRect(v: CT_RelativeRect | undefined) {
    const prev = this.srcRect;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get mode(): BlipFillMode | undefined {
    return this.findChild(CT_TileInfoProperties) ?? this.findChild(CT_StretchInfoProperties);
  }
  set mode(v: BlipFillMode | undefined) {
    const prev = this.mode;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Pattern fill ---------- */

/** CT_PatternFillProperties — preset pattern + fg/bg colors. */
export class CT_PatternFillProperties extends OoxmlElement {
  get elementName() { return "pattFill"; }
  get prst(): ST_PresetPatternVal | undefined { return this.getAttr<ST_PresetPatternVal>("prst"); }
  set prst(v: ST_PresetPatternVal | undefined) { this.setAttr("prst", v); }

  /**
   * `<a:fgClr>` foreground color. TODO: discriminate via element name once
   * round-trip serialization exists (currently shares slot with bgClr).
   */
  get fgColor(): CT_Color | undefined {
    // TODO: discriminate fg/bg by XML element name
    return undefined;
  }
  set fgColor(_v: CT_Color | undefined) {
    // TODO
  }
  get bgColor(): CT_Color | undefined {
    // TODO: discriminate fg/bg by XML element name
    return undefined;
  }
  set bgColor(_v: CT_Color | undefined) {
    // TODO
  }
}

/* ---------- Fill choice union ---------- */

/** Any fill variant allowed by EG_FillProperties. */
export type FillProperties =
  | CT_NoFillProperties
  | CT_SolidColorFillProperties
  | CT_GradientFillProperties
  | CT_BlipFillProperties
  | CT_PatternFillProperties
  | CT_GroupFillProperties;

/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd — color types + EG_ColorChoice / EG_ColorTransform
 *
 * EG_ColorTransform is a huge choice group of modulators (tint, shade, alpha…)
 * applied to every concrete color. We model each modulator as a small class
 * that derives from `ColorTransformBase`, and every color class carries a
 * transform list via composition.
 */

import { OoxmlElement, ChoiceHolder } from "../../base/index.js";
import type {
  ST_SchemeColorVal,
  ST_SystemColorVal,
  ST_PresetColorVal,
  ST_Percentage,
  ST_PositiveFixedPercentage,
  ST_FixedPercentage,
  ST_PositivePercentage,
  ST_PositiveFixedAngle,
  ST_Angle,
} from "./simpleTypes.js";
import type { ST_HexColorRGB } from "../../shared/index.js";

/* ----------------- Color transform modulators ----------------- */

/** Base class for every EG_ColorTransform modulator element. */
export abstract class ColorTransformBase extends OoxmlElement {}

/** Marker-only transforms (no attributes): comp, inv, gray, alphaCeiling ... */
abstract class EmptyColorTransform extends ColorTransformBase {}

/** Transforms that carry a single `val` percentage/angle. */
abstract class ValueColorTransform<V extends number | string> extends ColorTransformBase {
  get val(): V | undefined { return this.getAttr<V>("val"); }
  set val(value: V | undefined) { this.setAttr("val", value); }
}

export class CT_ComplementTransform extends EmptyColorTransform { get elementName() { return "comp"; } }
export class CT_InverseTransform extends EmptyColorTransform { get elementName() { return "inv"; } }
export class CT_GrayscaleTransform extends EmptyColorTransform { get elementName() { return "gray"; } }
export class CT_InverseGammaTransform extends EmptyColorTransform { get elementName() { return "invGamma"; } }
export class CT_GammaTransform extends EmptyColorTransform { get elementName() { return "gamma"; } }

export class CT_PositiveFixedPercentage extends ValueColorTransform<ST_PositiveFixedPercentage> {
  get elementName() { return "pct"; }
}
export class CT_PercentageVal extends ValueColorTransform<ST_Percentage> { get elementName() { return "val"; } }
export class CT_FixedPercentageVal extends ValueColorTransform<ST_FixedPercentage> { get elementName() { return "val"; } }
export class CT_PositivePercentageVal extends ValueColorTransform<ST_PositivePercentage> { get elementName() { return "val"; } }

/** Tint / shade / alpha / hue / lum / sat / red / green / blue modulators.
 *  All share the `val` percent-attribute pattern, so each concrete class
 *  only varies in its element name.
 */
export class CT_Tint extends ValueColorTransform<ST_PositiveFixedPercentage> { get elementName() { return "tint"; } }
export class CT_Shade extends ValueColorTransform<ST_PositiveFixedPercentage> { get elementName() { return "shade"; } }
export class CT_Alpha extends ValueColorTransform<ST_PositiveFixedPercentage> { get elementName() { return "alpha"; } }
export class CT_AlphaOff extends ValueColorTransform<ST_Percentage> { get elementName() { return "alphaOff"; } }
export class CT_AlphaMod extends ValueColorTransform<ST_Percentage> { get elementName() { return "alphaMod"; } }
export class CT_HueMod extends ValueColorTransform<ST_PositivePercentage> { get elementName() { return "hueMod"; } }
export class CT_SatMod extends ValueColorTransform<ST_Percentage> { get elementName() { return "satMod"; } }
export class CT_SatOff extends ValueColorTransform<ST_Percentage> { get elementName() { return "satOff"; } }
export class CT_LumMod extends ValueColorTransform<ST_Percentage> { get elementName() { return "lumMod"; } }
export class CT_LumOff extends ValueColorTransform<ST_Percentage> { get elementName() { return "lumOff"; } }
export class CT_Lum extends ValueColorTransform<ST_PositiveFixedPercentage> { get elementName() { return "lum"; } }
export class CT_Sat extends ValueColorTransform<ST_PositiveFixedPercentage> { get elementName() { return "sat"; } }
export class CT_Red extends ValueColorTransform<ST_PositiveFixedPercentage> { get elementName() { return "red"; } }
export class CT_RedMod extends ValueColorTransform<ST_Percentage> { get elementName() { return "redMod"; } }
export class CT_RedOff extends ValueColorTransform<ST_Percentage> { get elementName() { return "redOff"; } }
export class CT_Green extends ValueColorTransform<ST_PositiveFixedPercentage> { get elementName() { return "green"; } }
export class CT_GreenMod extends ValueColorTransform<ST_Percentage> { get elementName() { return "greenMod"; } }
export class CT_GreenOff extends ValueColorTransform<ST_Percentage> { get elementName() { return "greenOff"; } }
export class CT_Blue extends ValueColorTransform<ST_PositiveFixedPercentage> { get elementName() { return "blue"; } }
export class CT_BlueMod extends ValueColorTransform<ST_Percentage> { get elementName() { return "blueMod"; } }
export class CT_BlueOff extends ValueColorTransform<ST_Percentage> { get elementName() { return "blueOff"; } }

export class CT_Hue extends ValueColorTransform<ST_PositiveFixedAngle> { get elementName() { return "hue"; } }
export class CT_HueOff extends ValueColorTransform<ST_Angle> { get elementName() { return "hueOff"; } }

/* ----------------- Color base class with transform list ----------------- */

/**
 * Any concrete color type may be decorated with a chain of color transforms
 * (`EG_ColorTransform`). We expose them as a typed list via helpers.
 */
export abstract class ColorBase extends OoxmlElement {
  get transforms(): readonly ColorTransformBase[] {
    return this.findChildren(ColorTransformBase);
  }

  addTransform<T extends ColorTransformBase>(t: T): T {
    this.addChild(t);
    return t;
  }

  removeTransform(t: ColorTransformBase): boolean {
    return this.removeChild(t);
  }
}

/* ----------------- Concrete color variants ----------------- */

/** CT_ScRgbColor — 32-bit sRGB (r/g/b as percentages). */
export class CT_ScRgbColor extends ColorBase {
  get elementName() { return "scrgbClr"; }
  get r(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("r"); }
  set r(v: ST_Percentage | undefined) { this.setAttr("r", v); }
  get g(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("g"); }
  set g(v: ST_Percentage | undefined) { this.setAttr("g", v); }
  get b(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("b"); }
  set b(v: ST_Percentage | undefined) { this.setAttr("b", v); }
}

/** CT_SRgbColor — 24-bit hex RGB. */
export class CT_SRgbColor extends ColorBase {
  get elementName() { return "srgbClr"; }
  get val(): ST_HexColorRGB | undefined { return this.getAttr<ST_HexColorRGB>("val"); }
  set val(v: ST_HexColorRGB | undefined) { this.setAttr("val", v); }
}

/** CT_HslColor — hue/sat/lum. */
export class CT_HslColor extends ColorBase {
  get elementName() { return "hslClr"; }
  get hue(): ST_PositiveFixedAngle | undefined { return this.getAttr<number>("hue"); }
  set hue(v: ST_PositiveFixedAngle | undefined) { this.setAttr("hue", v); }
  get sat(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("sat"); }
  set sat(v: ST_Percentage | undefined) { this.setAttr("sat", v); }
  get lum(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("lum"); }
  set lum(v: ST_Percentage | undefined) { this.setAttr("lum", v); }
}

/** CT_SystemColor — OS/system palette color with optional fallback. */
export class CT_SystemColor extends ColorBase {
  get elementName() { return "sysClr"; }
  get val(): ST_SystemColorVal | undefined { return this.getAttr<ST_SystemColorVal>("val"); }
  set val(v: ST_SystemColorVal | undefined) { this.setAttr("val", v); }
  /** lastClr — fallback hex color applied when system color is unknown. */
  get lastClr(): ST_HexColorRGB | undefined { return this.getAttr<ST_HexColorRGB>("lastClr"); }
  set lastClr(v: ST_HexColorRGB | undefined) { this.setAttr("lastClr", v); }
}

/** CT_SchemeColor — theme-based color reference. */
export class CT_SchemeColor extends ColorBase {
  get elementName() { return "schemeClr"; }
  get val(): ST_SchemeColorVal | undefined { return this.getAttr<ST_SchemeColorVal>("val"); }
  set val(v: ST_SchemeColorVal | undefined) { this.setAttr("val", v); }
}

/** CT_PresetColor — named W3C-style preset palette color. */
export class CT_PresetColor extends ColorBase {
  get elementName() { return "prstClr"; }
  get val(): ST_PresetColorVal | undefined { return this.getAttr<ST_PresetColorVal>("val"); }
  set val(v: ST_PresetColorVal | undefined) { this.setAttr("val", v); }
}

/* ----------------- EG_ColorChoice wrapper ----------------- */

/**
 * Any union of the six concrete color variants.
 */
export type ColorChoice =
  | CT_ScRgbColor
  | CT_SRgbColor
  | CT_HslColor
  | CT_SystemColor
  | CT_SchemeColor
  | CT_PresetColor;

/** CT_Color — a single color wrapping EG_ColorChoice. */
export class CT_Color extends ChoiceHolder<ColorChoice> {
  get elementName() { return "clr"; }
}

/** CT_ColorMRU — list of recently-used colors (choice repeated). */
export class CT_ColorMRU extends OoxmlElement {
  get elementName() { return "clrMru"; }
  get colors(): ColorChoice[] { return this.getChildren() as ColorChoice[]; }
  add(color: ColorChoice) { this.addChild(color); }
}

/* ----------------- Custom / theme color scheme ----------------- */

/** CT_CustomColor — named custom color with EG_ColorChoice + name attribute. */
export class CT_CustomColor extends ChoiceHolder<ColorChoice> {
  get elementName() { return "custClr"; }
  get name(): string | undefined { return this.getAttr("name"); }
  set name(v: string | undefined) { this.setAttr("name", v); }
}

/** CT_CustomColorList — list of CT_CustomColor. */
export class CT_CustomColorList extends OoxmlElement {
  get elementName() { return "custClrLst"; }
  get colors(): CT_CustomColor[] { return this.findChildren(CT_CustomColor); }
  add(c: CT_CustomColor) { this.addChild(c); }
}

/**
 * CT_ColorScheme — the 12-entry theme color scheme (dk1, lt1, dk2, lt2,
 * accent1..6, hlink, folHlink). Each entry is a CT_Color wrapping a choice.
 * The XSD models them as named elements in a fixed sequence; we expose
 * them via keyed getters.
 *
 * TODO: provide named accessors once we have XML round-trip support;
 * for now the entries are just an ordered list.
 */
export class CT_ColorScheme extends OoxmlElement {
  get elementName() { return "clrScheme"; }
  get name(): string | undefined { return this.getAttr("name"); }
  set name(v: string | undefined) { this.setAttr("name", v); }

  /**
   * Ordered list of scheme entries (dk1, lt1, dk2, lt2, accent1..6, hlink, folHlink).
   * TODO: expose each slot as a named property (e.g., `get dk1()`).
   */
  get entries(): CT_Color[] { return this.findChildren(CT_Color); }
  add(entry: CT_Color) { this.addChild(entry); }
}


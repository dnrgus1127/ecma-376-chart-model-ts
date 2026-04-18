/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd — effect types and containers.
 *
 * 30+ concrete effect types exist. The simple ones expose their XSD attributes
 * directly; the complex ones (reflection, shadows, fill overlays) implement
 * get/set with TODO markers for the heavier sub-element work.
 */

import { OoxmlElement, ValueElement, ChoiceHolder } from "../../base/index.js";
import type {
  ST_PositivePercentage,
  ST_PositiveFixedPercentage,
  ST_FixedPercentage,
  ST_Percentage,
  ST_PresetShadowVal,
  ST_BlendMode,
  ST_PositiveCoordinate,
  ST_Angle,
  ST_PositiveFixedAngle,
  ST_FixedAngle,
  ST_RectAlignment,
  ST_EffectContainerType,
} from "./simpleTypes.js";
import { ColorChoice } from "./colors.js";

/** Shared base for anything in EG_Effect. */
export abstract class EffectBase extends OoxmlElement {}

/* ---------- Alpha / channel effects ---------- */

export class CT_AlphaBiLevelEffect extends EffectBase {
  get elementName() { return "alphaBiLevel"; }
  get thresh(): ST_PositiveFixedPercentage | undefined { return this.getAttr<number>("thresh"); }
  set thresh(v: ST_PositiveFixedPercentage | undefined) { this.setAttr("thresh", v); }
}
export class CT_AlphaCeilingEffect extends EffectBase { get elementName() { return "alphaCeiling"; } }
export class CT_AlphaFloorEffect extends EffectBase { get elementName() { return "alphaFloor"; } }
export class CT_AlphaInverseEffect extends EffectBase {
  get elementName() { return "alphaInv"; }
  /** Optional inversion color (wraps EG_ColorChoice). TODO: typed color child. */
  get color(): ColorChoice | undefined { return this.children[0] as ColorChoice | undefined; }
  set color(v: ColorChoice | undefined) {
    this.children.length = 0;
    if (v) this.addChild(v);
  }
}
export class CT_AlphaModulateFixedEffect extends EffectBase {
  get elementName() { return "alphaModFix"; }
  get amt(): ST_PositivePercentage | undefined { return this.getAttr<number>("amt"); }
  set amt(v: ST_PositivePercentage | undefined) { this.setAttr("amt", v); }
}
export class CT_AlphaOutsetEffect extends EffectBase {
  get elementName() { return "alphaOutset"; }
  get rad(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("rad"); }
  set rad(v: ST_Percentage | undefined) { this.setAttr("rad", v); }
}
export class CT_AlphaReplaceEffect extends EffectBase {
  get elementName() { return "alphaRepl"; }
  get a(): ST_PositiveFixedPercentage | undefined { return this.getAttr<number>("a"); }
  set a(v: ST_PositiveFixedPercentage | undefined) { this.setAttr("a", v); }
}

export class CT_BiLevelEffect extends EffectBase {
  get elementName() { return "biLevel"; }
  get thresh(): ST_PositiveFixedPercentage | undefined { return this.getAttr<number>("thresh"); }
  set thresh(v: ST_PositiveFixedPercentage | undefined) { this.setAttr("thresh", v); }
}

export class CT_BlurEffect extends EffectBase {
  get elementName() { return "blur"; }
  get rad(): ST_PositiveCoordinate | undefined { return this.getAttr<number>("rad"); }
  set rad(v: ST_PositiveCoordinate | undefined) { this.setAttr("rad", v); }
  get grow(): boolean | undefined { return this.getAttr<boolean>("grow"); }
  set grow(v: boolean | undefined) { this.setAttr("grow", v); }
}

/* ---------- Color manipulation effects ---------- */

export class CT_ColorChangeEffect extends EffectBase {
  get elementName() { return "clrChange"; }
  get useA(): boolean | undefined { return this.getAttr<boolean>("useA"); }
  set useA(v: boolean | undefined) { this.setAttr("useA", v); }

  /** from / to colors. TODO: disambiguate by XML element name. */
  get fromColor(): ColorChoice | undefined {
    // TODO: distinguish <a:clrFrom> from <a:clrTo> once name-aware lookup exists
    return undefined;
  }
  set fromColor(_v: ColorChoice | undefined) { /* TODO */ }
  get toColor(): ColorChoice | undefined { return undefined; /* TODO */ }
  set toColor(_v: ColorChoice | undefined) { /* TODO */ }
}
export class CT_ColorReplaceEffect extends ChoiceHolder<ColorChoice> {
  get elementName() { return "clrRepl"; }
}
export class CT_DuotoneEffect extends OoxmlElement {
  get elementName() { return "duotone"; }
  /** Exactly two EG_ColorChoice children. */
  get colors(): ColorChoice[] { return this.getChildren() as ColorChoice[]; }
  add(c: ColorChoice) {
    if (this.children.length >= 2) throw new Error("duotone accepts exactly two colors");
    this.addChild(c);
  }
}
export class CT_GrayscaleEffect extends EffectBase { get elementName() { return "grayscl"; } }

export class CT_HSLEffect extends EffectBase {
  get elementName() { return "hsl"; }
  get hue(): ST_PositiveFixedAngle | undefined { return this.getAttr<number>("hue"); }
  set hue(v: ST_PositiveFixedAngle | undefined) { this.setAttr("hue", v); }
  get sat(): ST_FixedPercentage | undefined { return this.getAttr<ST_FixedPercentage>("sat"); }
  set sat(v: ST_FixedPercentage | undefined) { this.setAttr("sat", v); }
  get lum(): ST_FixedPercentage | undefined { return this.getAttr<ST_FixedPercentage>("lum"); }
  set lum(v: ST_FixedPercentage | undefined) { this.setAttr("lum", v); }
}

export class CT_LuminanceEffect extends EffectBase {
  get elementName() { return "lum"; }
  get bright(): ST_FixedPercentage | undefined { return this.getAttr<ST_FixedPercentage>("bright"); }
  set bright(v: ST_FixedPercentage | undefined) { this.setAttr("bright", v); }
  get contrast(): ST_FixedPercentage | undefined { return this.getAttr<ST_FixedPercentage>("contrast"); }
  set contrast(v: ST_FixedPercentage | undefined) { this.setAttr("contrast", v); }
}

export class CT_TintEffect extends EffectBase {
  get elementName() { return "tint"; }
  get hue(): ST_PositiveFixedAngle | undefined { return this.getAttr<number>("hue"); }
  set hue(v: ST_PositiveFixedAngle | undefined) { this.setAttr("hue", v); }
  get amt(): ST_FixedPercentage | undefined { return this.getAttr<ST_FixedPercentage>("amt"); }
  set amt(v: ST_FixedPercentage | undefined) { this.setAttr("amt", v); }
}

/* ---------- Shadow / glow effects ---------- */

/** Base for shadow-like effects sharing common attributes. */
abstract class ShadowEffectBase extends EffectBase {
  get blurRad(): ST_PositiveCoordinate | undefined { return this.getAttr<number>("blurRad"); }
  set blurRad(v: ST_PositiveCoordinate | undefined) { this.setAttr("blurRad", v); }
  get dist(): ST_PositiveCoordinate | undefined { return this.getAttr<number>("dist"); }
  set dist(v: ST_PositiveCoordinate | undefined) { this.setAttr("dist", v); }
  get dir(): ST_PositiveFixedAngle | undefined { return this.getAttr<number>("dir"); }
  set dir(v: ST_PositiveFixedAngle | undefined) { this.setAttr("dir", v); }

  /** Color choice (single EG_ColorChoice child). */
  get color(): ColorChoice | undefined { return this.children[0] as ColorChoice | undefined; }
  set color(v: ColorChoice | undefined) {
    this.children.length = 0;
    if (v) this.addChild(v);
  }
}

export class CT_GlowEffect extends EffectBase {
  get elementName() { return "glow"; }
  get rad(): ST_PositiveCoordinate | undefined { return this.getAttr<number>("rad"); }
  set rad(v: ST_PositiveCoordinate | undefined) { this.setAttr("rad", v); }
  get color(): ColorChoice | undefined { return this.children[0] as ColorChoice | undefined; }
  set color(v: ColorChoice | undefined) {
    this.children.length = 0;
    if (v) this.addChild(v);
  }
}

export class CT_InnerShadowEffect extends ShadowEffectBase {
  get elementName() { return "innerShdw"; }
}
export class CT_OuterShadowEffect extends ShadowEffectBase {
  get elementName() { return "outerShdw"; }
  get sx(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("sx"); }
  set sx(v: ST_Percentage | undefined) { this.setAttr("sx", v); }
  get sy(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("sy"); }
  set sy(v: ST_Percentage | undefined) { this.setAttr("sy", v); }
  get kx(): ST_FixedAngle | undefined { return this.getAttr<number>("kx"); }
  set kx(v: ST_FixedAngle | undefined) { this.setAttr("kx", v); }
  get ky(): ST_FixedAngle | undefined { return this.getAttr<number>("ky"); }
  set ky(v: ST_FixedAngle | undefined) { this.setAttr("ky", v); }
  get algn(): ST_RectAlignment | undefined { return this.getAttr<ST_RectAlignment>("algn"); }
  set algn(v: ST_RectAlignment | undefined) { this.setAttr("algn", v); }
  get rotWithShape(): boolean | undefined { return this.getAttr<boolean>("rotWithShape"); }
  set rotWithShape(v: boolean | undefined) { this.setAttr("rotWithShape", v); }
}

export class CT_PresetShadowEffect extends ShadowEffectBase {
  get elementName() { return "prstShdw"; }
  get prst(): ST_PresetShadowVal | undefined { return this.getAttr<ST_PresetShadowVal>("prst"); }
  set prst(v: ST_PresetShadowVal | undefined) { this.setAttr("prst", v); }
}

export class CT_ReflectionEffect extends EffectBase {
  get elementName() { return "reflection"; }
  get blurRad(): ST_PositiveCoordinate | undefined { return this.getAttr<number>("blurRad"); }
  set blurRad(v: ST_PositiveCoordinate | undefined) { this.setAttr("blurRad", v); }
  get stA(): ST_PositiveFixedPercentage | undefined { return this.getAttr<number>("stA"); }
  set stA(v: ST_PositiveFixedPercentage | undefined) { this.setAttr("stA", v); }
  get stPos(): ST_PositiveFixedPercentage | undefined { return this.getAttr<number>("stPos"); }
  set stPos(v: ST_PositiveFixedPercentage | undefined) { this.setAttr("stPos", v); }
  get endA(): ST_PositiveFixedPercentage | undefined { return this.getAttr<number>("endA"); }
  set endA(v: ST_PositiveFixedPercentage | undefined) { this.setAttr("endA", v); }
  get endPos(): ST_PositiveFixedPercentage | undefined { return this.getAttr<number>("endPos"); }
  set endPos(v: ST_PositiveFixedPercentage | undefined) { this.setAttr("endPos", v); }
  get dist(): ST_PositiveCoordinate | undefined { return this.getAttr<number>("dist"); }
  set dist(v: ST_PositiveCoordinate | undefined) { this.setAttr("dist", v); }
  get dir(): ST_PositiveFixedAngle | undefined { return this.getAttr<number>("dir"); }
  set dir(v: ST_PositiveFixedAngle | undefined) { this.setAttr("dir", v); }
  get fadeDir(): ST_PositiveFixedAngle | undefined { return this.getAttr<number>("fadeDir"); }
  set fadeDir(v: ST_PositiveFixedAngle | undefined) { this.setAttr("fadeDir", v); }
  get sx(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("sx"); }
  set sx(v: ST_Percentage | undefined) { this.setAttr("sx", v); }
  get sy(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("sy"); }
  set sy(v: ST_Percentage | undefined) { this.setAttr("sy", v); }
  get kx(): ST_FixedAngle | undefined { return this.getAttr<number>("kx"); }
  set kx(v: ST_FixedAngle | undefined) { this.setAttr("kx", v); }
  get ky(): ST_FixedAngle | undefined { return this.getAttr<number>("ky"); }
  set ky(v: ST_FixedAngle | undefined) { this.setAttr("ky", v); }
  get algn(): ST_RectAlignment | undefined { return this.getAttr<ST_RectAlignment>("algn"); }
  set algn(v: ST_RectAlignment | undefined) { this.setAttr("algn", v); }
  get rotWithShape(): boolean | undefined { return this.getAttr<boolean>("rotWithShape"); }
  set rotWithShape(v: boolean | undefined) { this.setAttr("rotWithShape", v); }
}

export class CT_RelativeOffsetEffect extends EffectBase {
  get elementName() { return "relOff"; }
  get tx(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("tx"); }
  set tx(v: ST_Percentage | undefined) { this.setAttr("tx", v); }
  get ty(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("ty"); }
  set ty(v: ST_Percentage | undefined) { this.setAttr("ty", v); }
}

export class CT_SoftEdgesEffect extends EffectBase {
  get elementName() { return "softEdge"; }
  get rad(): ST_PositiveCoordinate | undefined { return this.getAttr<number>("rad"); }
  set rad(v: ST_PositiveCoordinate | undefined) { this.setAttr("rad", v); }
}

export class CT_TransformEffect extends EffectBase {
  get elementName() { return "xfrm"; }
  get sx(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("sx"); }
  set sx(v: ST_Percentage | undefined) { this.setAttr("sx", v); }
  get sy(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("sy"); }
  set sy(v: ST_Percentage | undefined) { this.setAttr("sy", v); }
  get kx(): ST_FixedAngle | undefined { return this.getAttr<number>("kx"); }
  set kx(v: ST_FixedAngle | undefined) { this.setAttr("kx", v); }
  get ky(): ST_FixedAngle | undefined { return this.getAttr<number>("ky"); }
  set ky(v: ST_FixedAngle | undefined) { this.setAttr("ky", v); }
  get tx(): number | undefined { return this.getAttr<number>("tx"); }
  set tx(v: number | undefined) { this.setAttr("tx", v); }
  get ty(): number | undefined { return this.getAttr<number>("ty"); }
  set ty(v: number | undefined) { this.setAttr("ty", v); }
}

/* ---------- Effect referencing / composition ---------- */

/**
 * CT_EffectReference — references an effect in the style matrix.
 * TODO: model `ref` attribute validation against ST_StyleMatrixColumnIndex.
 */
export class CT_EffectReference extends OoxmlElement {
  get elementName() { return "effectRef"; }
  get ref(): string | undefined { return this.getAttr("ref"); }
  set ref(v: string | undefined) { this.setAttr("ref", v); }
}

export class CT_AlphaModulateEffect extends EffectBase {
  get elementName() { return "alphaMod"; }
  // TODO: contains a CT_EffectContainer child, which embeds more effects
}

export class CT_BlendEffect extends EffectBase {
  get elementName() { return "blend"; }
  get blend(): ST_BlendMode | undefined { return this.getAttr<ST_BlendMode>("blend"); }
  set blend(v: ST_BlendMode | undefined) { this.setAttr("blend", v); }
  // TODO: CT_EffectContainer cont child
}

export class CT_FillOverlayEffect extends EffectBase {
  get elementName() { return "fillOverlay"; }
  get blend(): ST_BlendMode | undefined { return this.getAttr<ST_BlendMode>("blend"); }
  set blend(v: ST_BlendMode | undefined) { this.setAttr("blend", v); }
  // TODO: EG_FillProperties choice child — complex union handled elsewhere
}

export class CT_FillEffect extends EffectBase {
  get elementName() { return "fill"; }
  // TODO: EG_FillProperties choice child
}

/** CT_EffectList — concatenation of effects in EG_Effect order. */
export class CT_EffectList extends OoxmlElement {
  get elementName() { return "effectLst"; }
  get effects(): EffectBase[] { return this.findChildren(EffectBase); }
  add<T extends EffectBase>(e: T): T { this.addChild(e); return e; }
}

/**
 * CT_EffectContainer — named container forming a DAG of effects.
 *
 * TODO: full `type` enum validation and child DAG navigation; currently
 * delegates to the untyped child list inherited from OoxmlElement.
 */
export class CT_EffectContainer extends OoxmlElement {
  get elementName() { return "cont"; }
  get type(): ST_EffectContainerType | undefined { return this.getAttr<ST_EffectContainerType>("type"); }
  set type(v: ST_EffectContainerType | undefined) { this.setAttr("type", v); }
  get name(): string | undefined { return this.getAttr("name"); }
  set name(v: string | undefined) { this.setAttr("name", v); }
}

/**
 * CT_EffectProperties — one-of {effectLst | effectDag} — the entry point
 * used inside shape / fill / etc. property bags.
 */
export type EffectPropertiesChoice = CT_EffectList | CT_EffectContainer;

/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd — theme (color scheme, font scheme, format scheme).
 *
 * Theme types primarily sit above the chart model, but they are referenced
 * from CT_ShapeStyle and indirectly from colors. We expose the minimum
 * class surface needed to represent them.
 */

import { OoxmlElement, ListHolder } from "../../base/index.js";
import { CT_ColorScheme, CT_CustomColorList } from "./colors.js";
import type { ST_ColorSchemeIndex } from "./simpleTypes.js";
import { CT_TextFont, CT_SupplementalFont } from "./text.js";
import {
  CT_NoFillProperties,
  CT_SolidColorFillProperties,
  CT_GradientFillProperties,
  CT_BlipFillProperties,
  CT_PatternFillProperties,
  FillProperties,
} from "./fills.js";
import { CT_LineProperties } from "./lines.js";
import { EffectPropertiesChoice, CT_EffectList, CT_EffectContainer } from "./effects.js";
import { CT_OfficeArtExtensionList } from "./extension.js";
import { CT_DefaultShapeDefinition, CT_ObjectStyleDefaults } from "./shape.js";

/* ---------- Font scheme ---------- */

export class CT_FontCollection extends OoxmlElement {
  get elementName() { return "majorFont"; } // or minorFont depending on parent
  /** latin / ea / cs primary typefaces. TODO: disambiguate by element name. */
  get latin(): CT_TextFont | undefined { return this.findChild(CT_TextFont); }
  set latin(_v: CT_TextFont | undefined) { /* TODO: disambiguate latin/ea/cs */ }
  get ea(): CT_TextFont | undefined { return undefined; /* TODO */ }
  set ea(_v: CT_TextFont | undefined) { /* TODO */ }
  get cs(): CT_TextFont | undefined { return undefined; /* TODO */ }
  set cs(_v: CT_TextFont | undefined) { /* TODO */ }
  /** Optional per-script supplementary fonts (unbounded). */
  get fonts(): CT_SupplementalFont[] { return this.findChildren(CT_SupplementalFont); }
  addFont(f: CT_SupplementalFont) { this.addChild(f); }
}

export class CT_FontScheme extends OoxmlElement {
  get elementName() { return "fontScheme"; }
  get name(): string | undefined { return this.getAttr("name"); }
  set name(v: string | undefined) { this.setAttr("name", v); }
  /** majorFont / minorFont. TODO: disambiguate by element name. */
  get majorFont(): CT_FontCollection | undefined { return this.findChild(CT_FontCollection); }
  set majorFont(_v: CT_FontCollection | undefined) { /* TODO */ }
  get minorFont(): CT_FontCollection | undefined { return undefined; /* TODO */ }
  set minorFont(_v: CT_FontCollection | undefined) { /* TODO */ }
}

/* ---------- Format scheme ---------- */

type FillStyleChoice = FillProperties;

export class CT_FillStyleList extends OoxmlElement {
  get elementName() { return "fillStyleLst"; }
  /** Ordered fill styles (≥ 3 per XSD). */
  get styles(): FillStyleChoice[] {
    return this.children.filter(
      (c): c is FillStyleChoice =>
        c instanceof CT_NoFillProperties ||
        c instanceof CT_SolidColorFillProperties ||
        c instanceof CT_GradientFillProperties ||
        c instanceof CT_BlipFillProperties ||
        c instanceof CT_PatternFillProperties,
    );
  }
  add(f: FillStyleChoice) { this.addChild(f); }
}

export class CT_LineStyleList extends ListHolder<CT_LineProperties> {
  get elementName() { return "lnStyleLst"; }
}

export class CT_EffectStyleItem extends OoxmlElement {
  get elementName() { return "effectStyle"; }
  get effect(): EffectPropertiesChoice | undefined {
    return this.findChild(CT_EffectList) ?? this.findChild(CT_EffectContainer);
  }
  set effect(v: EffectPropertiesChoice | undefined) {
    const prev = this.effect;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  // TODO: scene3d + sp3d child slots
}

export class CT_EffectStyleList extends ListHolder<CT_EffectStyleItem> {
  get elementName() { return "effectStyleLst"; }
}

export class CT_BackgroundFillStyleList extends OoxmlElement {
  get elementName() { return "bgFillStyleLst"; }
  get styles(): FillStyleChoice[] {
    return this.children.filter(
      (c): c is FillStyleChoice =>
        c instanceof CT_NoFillProperties ||
        c instanceof CT_SolidColorFillProperties ||
        c instanceof CT_GradientFillProperties ||
        c instanceof CT_BlipFillProperties ||
        c instanceof CT_PatternFillProperties,
    );
  }
  add(f: FillStyleChoice) { this.addChild(f); }
}

export class CT_StyleMatrix extends OoxmlElement {
  get elementName() { return "fmtScheme"; }
  get name(): string | undefined { return this.getAttr("name"); }
  set name(v: string | undefined) { this.setAttr("name", v); }
  get fillStyleLst(): CT_FillStyleList | undefined { return this.findChild(CT_FillStyleList); }
  set fillStyleLst(v: CT_FillStyleList | undefined) {
    const prev = this.fillStyleLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get lnStyleLst(): CT_LineStyleList | undefined { return this.findChild(CT_LineStyleList); }
  set lnStyleLst(v: CT_LineStyleList | undefined) {
    const prev = this.lnStyleLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get effectStyleLst(): CT_EffectStyleList | undefined { return this.findChild(CT_EffectStyleList); }
  set effectStyleLst(v: CT_EffectStyleList | undefined) {
    const prev = this.effectStyleLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get bgFillStyleLst(): CT_BackgroundFillStyleList | undefined { return this.findChild(CT_BackgroundFillStyleList); }
  set bgFillStyleLst(v: CT_BackgroundFillStyleList | undefined) {
    const prev = this.bgFillStyleLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Base & office style sheets ---------- */

export class CT_BaseStyles extends OoxmlElement {
  get elementName() { return "themeElements"; }
  get clrScheme(): CT_ColorScheme | undefined { return this.findChild(CT_ColorScheme); }
  set clrScheme(v: CT_ColorScheme | undefined) {
    const prev = this.clrScheme;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get fontScheme(): CT_FontScheme | undefined { return this.findChild(CT_FontScheme); }
  set fontScheme(v: CT_FontScheme | undefined) {
    const prev = this.fontScheme;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get fmtScheme(): CT_StyleMatrix | undefined { return this.findChild(CT_StyleMatrix); }
  set fmtScheme(v: CT_StyleMatrix | undefined) {
    const prev = this.fmtScheme;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_BaseStylesOverride extends OoxmlElement {
  get elementName() { return "baseStylesOverride"; }
  // TODO: same three schemes as CT_BaseStyles with override semantics
}

/**
 * CT_OfficeStyleSheet — root `<a:theme>` element, hosting all theme-level
 * definitions (theme elements + object defaults + extra color schemes).
 */
export class CT_OfficeStyleSheet extends OoxmlElement {
  get elementName() { return "theme"; }
  get name(): string | undefined { return this.getAttr("name"); }
  set name(v: string | undefined) { this.setAttr("name", v); }
  get themeElements(): CT_BaseStyles | undefined { return this.findChild(CT_BaseStyles); }
  set themeElements(v: CT_BaseStyles | undefined) {
    const prev = this.themeElements;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get objectDefaults(): CT_ObjectStyleDefaults | undefined { return this.findChild(CT_ObjectStyleDefaults); }
  set objectDefaults(v: CT_ObjectStyleDefaults | undefined) {
    const prev = this.objectDefaults;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get extraClrSchemeLst(): CT_ColorSchemeList | undefined { return this.findChild(CT_ColorSchemeList); }
  set extraClrSchemeLst(v: CT_ColorSchemeList | undefined) {
    const prev = this.extraClrSchemeLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get custClrLst(): CT_CustomColorList | undefined { return this.findChild(CT_CustomColorList); }
  set custClrLst(v: CT_CustomColorList | undefined) {
    const prev = this.custClrLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_ClipboardStyleSheet extends OoxmlElement {
  get elementName() { return "themeOverride"; }
  // TODO: same as OfficeStyleSheet minus some children
}

/* ---------- Color mapping / scheme collection ---------- */

export class CT_ColorMapping extends OoxmlElement {
  get elementName() { return "clrMap"; }
  get bg1(): ST_ColorSchemeIndex | undefined { return this.getAttr<ST_ColorSchemeIndex>("bg1"); }
  set bg1(v: ST_ColorSchemeIndex | undefined) { this.setAttr("bg1", v); }
  get tx1(): ST_ColorSchemeIndex | undefined { return this.getAttr<ST_ColorSchemeIndex>("tx1"); }
  set tx1(v: ST_ColorSchemeIndex | undefined) { this.setAttr("tx1", v); }
  get bg2(): ST_ColorSchemeIndex | undefined { return this.getAttr<ST_ColorSchemeIndex>("bg2"); }
  set bg2(v: ST_ColorSchemeIndex | undefined) { this.setAttr("bg2", v); }
  get tx2(): ST_ColorSchemeIndex | undefined { return this.getAttr<ST_ColorSchemeIndex>("tx2"); }
  set tx2(v: ST_ColorSchemeIndex | undefined) { this.setAttr("tx2", v); }
  get accent1(): ST_ColorSchemeIndex | undefined { return this.getAttr<ST_ColorSchemeIndex>("accent1"); }
  set accent1(v: ST_ColorSchemeIndex | undefined) { this.setAttr("accent1", v); }
  get accent2(): ST_ColorSchemeIndex | undefined { return this.getAttr<ST_ColorSchemeIndex>("accent2"); }
  set accent2(v: ST_ColorSchemeIndex | undefined) { this.setAttr("accent2", v); }
  get accent3(): ST_ColorSchemeIndex | undefined { return this.getAttr<ST_ColorSchemeIndex>("accent3"); }
  set accent3(v: ST_ColorSchemeIndex | undefined) { this.setAttr("accent3", v); }
  get accent4(): ST_ColorSchemeIndex | undefined { return this.getAttr<ST_ColorSchemeIndex>("accent4"); }
  set accent4(v: ST_ColorSchemeIndex | undefined) { this.setAttr("accent4", v); }
  get accent5(): ST_ColorSchemeIndex | undefined { return this.getAttr<ST_ColorSchemeIndex>("accent5"); }
  set accent5(v: ST_ColorSchemeIndex | undefined) { this.setAttr("accent5", v); }
  get accent6(): ST_ColorSchemeIndex | undefined { return this.getAttr<ST_ColorSchemeIndex>("accent6"); }
  set accent6(v: ST_ColorSchemeIndex | undefined) { this.setAttr("accent6", v); }
  get hlink(): ST_ColorSchemeIndex | undefined { return this.getAttr<ST_ColorSchemeIndex>("hlink"); }
  set hlink(v: ST_ColorSchemeIndex | undefined) { this.setAttr("hlink", v); }
  get folHlink(): ST_ColorSchemeIndex | undefined { return this.getAttr<ST_ColorSchemeIndex>("folHlink"); }
  set folHlink(v: ST_ColorSchemeIndex | undefined) { this.setAttr("folHlink", v); }
}

export class CT_ColorMappingOverride extends OoxmlElement {
  get elementName() { return "clrMapOvr"; }
  // TODO: masterClrMapping | overrideClrMapping choice
}

export class CT_ColorSchemeAndMapping extends OoxmlElement {
  get elementName() { return "extraClrScheme"; }
  get clrScheme(): CT_ColorScheme | undefined { return this.findChild(CT_ColorScheme); }
  set clrScheme(v: CT_ColorScheme | undefined) {
    const prev = this.clrScheme;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  get clrMap(): CT_ColorMapping | undefined { return this.findChild(CT_ColorMapping); }
  set clrMap(v: CT_ColorMapping | undefined) {
    const prev = this.clrMap;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_ColorSchemeList extends ListHolder<CT_ColorSchemeAndMapping> {
  get elementName() { return "extraClrSchemeLst"; }
}

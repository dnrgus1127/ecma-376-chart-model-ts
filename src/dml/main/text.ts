/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd — text body, paragraphs, runs, character properties.
 */

import { OoxmlElement, ValueElement, ListHolder, ChoiceHolder } from "../../base/index.js";
import type {
  ST_TextAnchoringType,
  ST_TextVertOverflowType,
  ST_TextHorzOverflowType,
  ST_TextVerticalType,
  ST_TextWrappingType,
  ST_TextUnderlineType,
  ST_TextStrikeType,
  ST_TextCapsType,
  ST_TextTabAlignType,
  ST_TextAlignType,
  ST_TextFontAlignType,
  ST_TextAutonumberScheme,
  ST_TextFontSize,
  ST_TextNonNegativePoint,
  ST_TextBulletStartAtNum,
  ST_TextIndentLevelType,
  ST_TextColumnCount,
  ST_TextMargin,
  ST_TextIndent,
  ST_TextPoint,
  ST_TextBulletSizePercent,
  ST_TextFontScalePercentOrPercentString,
  ST_TextSpacingPercentOrPercentString,
  ST_TextSpacingPoint,
  ST_Coordinate32,
  ST_PositiveCoordinate32,
  ST_Angle,
  ST_TextTypeface,
  ST_PitchFamily,
  ST_Percentage,
} from "./simpleTypes.js";
import type { ST_HexColorRGB, ST_Lang, ST_Xstring } from "../../shared/index.js";
import { FillProperties } from "./fills.js";
import { CT_LineProperties } from "./lines.js";
import { EffectPropertiesChoice } from "./effects.js";
import { Geometry, CT_PresetTextShape } from "./geometry.js";
import { ColorChoice } from "./colors.js";
import { Text3DChoice } from "./threeD.js";

/* ---------- Text fonts ---------- */

export class CT_TextFont extends OoxmlElement {
  get elementName() { return "font"; }
  get typeface(): ST_TextTypeface | undefined { return this.getAttr("typeface"); }
  set typeface(v: ST_TextTypeface | undefined) { this.setAttr("typeface", v); }
  get panose(): string | undefined { return this.getAttr("panose"); }
  set panose(v: string | undefined) { this.setAttr("panose", v); }
  get pitchFamily(): ST_PitchFamily | undefined { return this.getAttr<number>("pitchFamily"); }
  set pitchFamily(v: ST_PitchFamily | undefined) { this.setAttr("pitchFamily", v); }
  get charset(): number | undefined { return this.getAttr<number>("charset"); }
  set charset(v: number | undefined) { this.setAttr("charset", v); }
}

export class CT_SupplementalFont extends OoxmlElement {
  get elementName() { return "font"; }
  get script(): string | undefined { return this.getAttr("script"); }
  set script(v: string | undefined) { this.setAttr("script", v); }
  get typeface(): ST_TextTypeface | undefined { return this.getAttr("typeface"); }
  set typeface(v: ST_TextTypeface | undefined) { this.setAttr("typeface", v); }
}

/* ---------- Bullets ---------- */

export class CT_TextNoBullet extends OoxmlElement { get elementName() { return "buNone"; } }
export class CT_TextBulletColorFollowText extends OoxmlElement { get elementName() { return "buClrTx"; } }
export class CT_TextBulletSizeFollowText extends OoxmlElement { get elementName() { return "buSzTx"; } }
export class CT_TextBulletTypefaceFollowText extends OoxmlElement { get elementName() { return "buFontTx"; } }

export class CT_TextBulletSizePercent extends ValueElement<ST_TextBulletSizePercent> {
  get elementName() { return "buSzPct"; }
}
export class CT_TextBulletSizePoint extends ValueElement<number> {
  get elementName() { return "buSzPts"; }
}

export class CT_TextAutonumberBullet extends OoxmlElement {
  get elementName() { return "buAutoNum"; }
  get type(): ST_TextAutonumberScheme | undefined { return this.getAttr<string>("type"); }
  set type(v: ST_TextAutonumberScheme | undefined) { this.setAttr("type", v); }
  get startAt(): ST_TextBulletStartAtNum | undefined { return this.getAttr<number>("startAt"); }
  set startAt(v: ST_TextBulletStartAtNum | undefined) { this.setAttr("startAt", v); }
}
export class CT_TextCharBullet extends OoxmlElement {
  get elementName() { return "buChar"; }
  get char(): string | undefined { return this.getAttr("char"); }
  set char(v: string | undefined) { this.setAttr("char", v); }
}
export class CT_TextBlipBullet extends OoxmlElement {
  get elementName() { return "buBlip"; }
  // TODO: embed CT_Blip child for picture bullets.
}

export type TextBulletColorChoice = CT_TextBulletColorFollowText | ColorChoice;
export type TextBulletSizeChoice =
  | CT_TextBulletSizeFollowText
  | CT_TextBulletSizePercent
  | CT_TextBulletSizePoint;
export type TextBulletTypefaceChoice = CT_TextBulletTypefaceFollowText | CT_TextFont;
export type TextBulletChoice =
  | CT_TextNoBullet
  | CT_TextAutonumberBullet
  | CT_TextCharBullet
  | CT_TextBlipBullet;

/* ---------- Tabs ---------- */

export class CT_TextTabStop extends OoxmlElement {
  get elementName() { return "tab"; }
  get pos(): ST_Coordinate32 | undefined { return this.getAttr<ST_Coordinate32>("pos"); }
  set pos(v: ST_Coordinate32 | undefined) { this.setAttr("pos", v); }
  get algn(): ST_TextTabAlignType | undefined { return this.getAttr<ST_TextTabAlignType>("algn"); }
  set algn(v: ST_TextTabAlignType | undefined) { this.setAttr("algn", v); }
}
export class CT_TextTabStopList extends ListHolder<CT_TextTabStop> {
  get elementName() { return "tabLst"; }
}

/* ---------- Spacing ---------- */

export class CT_TextSpacingPoint extends ValueElement<ST_TextSpacingPoint> {
  get elementName() { return "spcPts"; }
}
export class CT_TextSpacingPercent extends ValueElement<ST_TextSpacingPercentOrPercentString> {
  get elementName() { return "spcPct"; }
}
export type TextSpacingChoice = CT_TextSpacingPoint | CT_TextSpacingPercent;

export class CT_TextSpacing extends ChoiceHolder<TextSpacingChoice> {
  get elementName() { return "spc"; }
}

/* ---------- Text character properties ---------- */

/**
 * CT_TextCharacterProperties — character run formatting.
 *
 * Heavy — many child elements (fill/line/effect/hyperlinks/symbol). The
 * simple attribute get/set pairs are implemented; complex sub-elements
 * carry TODO markers.
 */
export class CT_TextCharacterProperties extends OoxmlElement {
  get elementName() { return "defRPr"; }

  /* attributes */
  get kumimoji(): boolean | undefined { return this.getAttr<boolean>("kumimoji"); }
  set kumimoji(v: boolean | undefined) { this.setAttr("kumimoji", v); }
  get lang(): ST_Lang | undefined { return this.getAttr("lang"); }
  set lang(v: ST_Lang | undefined) { this.setAttr("lang", v); }
  get altLang(): ST_Lang | undefined { return this.getAttr("altLang"); }
  set altLang(v: ST_Lang | undefined) { this.setAttr("altLang", v); }
  get sz(): ST_TextFontSize | undefined { return this.getAttr<number>("sz"); }
  set sz(v: ST_TextFontSize | undefined) { this.setAttr("sz", v); }
  get b(): boolean | undefined { return this.getAttr<boolean>("b"); }
  set b(v: boolean | undefined) { this.setAttr("b", v); }
  get i(): boolean | undefined { return this.getAttr<boolean>("i"); }
  set i(v: boolean | undefined) { this.setAttr("i", v); }
  get u(): ST_TextUnderlineType | undefined { return this.getAttr<ST_TextUnderlineType>("u"); }
  set u(v: ST_TextUnderlineType | undefined) { this.setAttr("u", v); }
  get strike(): ST_TextStrikeType | undefined { return this.getAttr<ST_TextStrikeType>("strike"); }
  set strike(v: ST_TextStrikeType | undefined) { this.setAttr("strike", v); }
  get kern(): ST_TextNonNegativePoint | undefined { return this.getAttr<number>("kern"); }
  set kern(v: ST_TextNonNegativePoint | undefined) { this.setAttr("kern", v); }
  get cap(): ST_TextCapsType | undefined { return this.getAttr<ST_TextCapsType>("cap"); }
  set cap(v: ST_TextCapsType | undefined) { this.setAttr("cap", v); }
  get spc(): ST_TextPoint | undefined { return this.getAttr<ST_TextPoint>("spc"); }
  set spc(v: ST_TextPoint | undefined) { this.setAttr("spc", v); }
  get normalizeH(): boolean | undefined { return this.getAttr<boolean>("normalizeH"); }
  set normalizeH(v: boolean | undefined) { this.setAttr("normalizeH", v); }
  get baseline(): ST_Percentage | undefined { return this.getAttr<ST_Percentage>("baseline"); }
  set baseline(v: ST_Percentage | undefined) { this.setAttr("baseline", v); }
  get noProof(): boolean | undefined { return this.getAttr<boolean>("noProof"); }
  set noProof(v: boolean | undefined) { this.setAttr("noProof", v); }
  get dirty(): boolean | undefined { return this.getAttr<boolean>("dirty"); }
  set dirty(v: boolean | undefined) { this.setAttr("dirty", v); }
  get err(): boolean | undefined { return this.getAttr<boolean>("err"); }
  set err(v: boolean | undefined) { this.setAttr("err", v); }
  get smtClean(): boolean | undefined { return this.getAttr<boolean>("smtClean"); }
  set smtClean(v: boolean | undefined) { this.setAttr("smtClean", v); }
  get smtId(): number | undefined { return this.getAttr<number>("smtId"); }
  set smtId(v: number | undefined) { this.setAttr("smtId", v); }
  get bmk(): string | undefined { return this.getAttr("bmk"); }
  set bmk(v: string | undefined) { this.setAttr("bmk", v); }

  /* complex children: provided with get/set stubs + TODO */
  get fill(): FillProperties | undefined {
    // TODO: EG_FillProperties choice child
    return undefined;
  }
  set fill(_v: FillProperties | undefined) { /* TODO */ }

  get line(): CT_LineProperties | undefined { return this.findChild(CT_LineProperties); }
  set line(v: CT_LineProperties | undefined) {
    const prev = this.line;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get effect(): EffectPropertiesChoice | undefined {
    // TODO: EG_EffectProperties choice (effectLst | effectDag)
    return undefined;
  }
  set effect(_v: EffectPropertiesChoice | undefined) { /* TODO */ }

  /** Latin / ea / cs / sym fonts — the XSD models four distinct named children.
   *  TODO: disambiguate the four typeface slots by XML element name. */
  get latin(): CT_TextFont | undefined { return this.findChild(CT_TextFont); }
  set latin(_v: CT_TextFont | undefined) { /* TODO: disambiguate latin/ea/cs/sym */ }
  get ea(): CT_TextFont | undefined { return undefined; /* TODO */ }
  set ea(_v: CT_TextFont | undefined) { /* TODO */ }
  get cs(): CT_TextFont | undefined { return undefined; /* TODO */ }
  set cs(_v: CT_TextFont | undefined) { /* TODO */ }
  get sym(): CT_TextFont | undefined { return undefined; /* TODO */ }
  set sym(_v: CT_TextFont | undefined) { /* TODO */ }

  // TODO: hyperlinks (hlinkClick / hlinkMouseOver), highlight, uLn/uFill, rtl attr
}

/* ---------- Text runs ---------- */

export abstract class TextRunBase extends OoxmlElement {}

export class CT_RegularTextRun extends TextRunBase {
  get elementName() { return "r"; }
  get rPr(): CT_TextCharacterProperties | undefined { return this.findChild(CT_TextCharacterProperties); }
  set rPr(v: CT_TextCharacterProperties | undefined) {
    const prev = this.rPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /** Text content of the run (`<a:t>` CDATA child). */
  get text(): ST_Xstring | undefined { return this.getAttr("text"); }
  set text(v: ST_Xstring | undefined) { this.setAttr("text", v); }
}

export class CT_TextLineBreak extends TextRunBase {
  get elementName() { return "br"; }
  get rPr(): CT_TextCharacterProperties | undefined { return this.findChild(CT_TextCharacterProperties); }
  set rPr(v: CT_TextCharacterProperties | undefined) {
    const prev = this.rPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_TextField extends TextRunBase {
  get elementName() { return "fld"; }
  get id(): string | undefined { return this.getAttr("id"); }
  set id(v: string | undefined) { this.setAttr("id", v); }
  get type(): string | undefined { return this.getAttr("type"); }
  set type(v: string | undefined) { this.setAttr("type", v); }
  get rPr(): CT_TextCharacterProperties | undefined { return this.findChild(CT_TextCharacterProperties); }
  set rPr(v: CT_TextCharacterProperties | undefined) {
    const prev = this.rPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
  /** Text content (`<a:t>`). */
  get text(): ST_Xstring | undefined { return this.getAttr("text"); }
  set text(v: ST_Xstring | undefined) { this.setAttr("text", v); }
}

export type TextRunChoice = CT_RegularTextRun | CT_TextLineBreak | CT_TextField;

/* ---------- Paragraph properties ---------- */

/**
 * CT_TextParagraphProperties — paragraph-level formatting.
 *
 * Heavy; complex bullet/tab/default-run-props slots carry TODO stubs.
 */
export class CT_TextParagraphProperties extends OoxmlElement {
  get elementName() { return "pPr"; }

  get marL(): ST_TextMargin | undefined { return this.getAttr<number>("marL"); }
  set marL(v: ST_TextMargin | undefined) { this.setAttr("marL", v); }
  get marR(): ST_TextMargin | undefined { return this.getAttr<number>("marR"); }
  set marR(v: ST_TextMargin | undefined) { this.setAttr("marR", v); }
  get lvl(): ST_TextIndentLevelType | undefined { return this.getAttr<ST_TextIndentLevelType>("lvl"); }
  set lvl(v: ST_TextIndentLevelType | undefined) { this.setAttr("lvl", v); }
  get indent(): ST_TextIndent | undefined { return this.getAttr<number>("indent"); }
  set indent(v: ST_TextIndent | undefined) { this.setAttr("indent", v); }
  get algn(): ST_TextAlignType | undefined { return this.getAttr<ST_TextAlignType>("algn"); }
  set algn(v: ST_TextAlignType | undefined) { this.setAttr("algn", v); }
  get defTabSz(): ST_Coordinate32 | undefined { return this.getAttr<ST_Coordinate32>("defTabSz"); }
  set defTabSz(v: ST_Coordinate32 | undefined) { this.setAttr("defTabSz", v); }
  get rtl(): boolean | undefined { return this.getAttr<boolean>("rtl"); }
  set rtl(v: boolean | undefined) { this.setAttr("rtl", v); }
  get eaLnBrk(): boolean | undefined { return this.getAttr<boolean>("eaLnBrk"); }
  set eaLnBrk(v: boolean | undefined) { this.setAttr("eaLnBrk", v); }
  get fontAlgn(): ST_TextFontAlignType | undefined { return this.getAttr<ST_TextFontAlignType>("fontAlgn"); }
  set fontAlgn(v: ST_TextFontAlignType | undefined) { this.setAttr("fontAlgn", v); }
  get latinLnBrk(): boolean | undefined { return this.getAttr<boolean>("latinLnBrk"); }
  set latinLnBrk(v: boolean | undefined) { this.setAttr("latinLnBrk", v); }
  get hangingPunct(): boolean | undefined { return this.getAttr<boolean>("hangingPunct"); }
  set hangingPunct(v: boolean | undefined) { this.setAttr("hangingPunct", v); }

  /** `<a:lnSpc>` / `<a:spcBef>` / `<a:spcAft>` — line spacing wrappers. */
  get lnSpc(): CT_TextSpacing | undefined {
    // TODO: disambiguate lnSpc / spcBef / spcAft by XML element name
    return undefined;
  }
  set lnSpc(_v: CT_TextSpacing | undefined) { /* TODO */ }
  get spcBef(): CT_TextSpacing | undefined { return undefined; /* TODO */ }
  set spcBef(_v: CT_TextSpacing | undefined) { /* TODO */ }
  get spcAft(): CT_TextSpacing | undefined { return undefined; /* TODO */ }
  set spcAft(_v: CT_TextSpacing | undefined) { /* TODO */ }

  /** Bullet color / size / font / variant — all TODO stubs. */
  get buClr(): TextBulletColorChoice | undefined { return undefined; /* TODO */ }
  set buClr(_v: TextBulletColorChoice | undefined) { /* TODO */ }
  get buSz(): TextBulletSizeChoice | undefined { return undefined; /* TODO */ }
  set buSz(_v: TextBulletSizeChoice | undefined) { /* TODO */ }
  get buFont(): TextBulletTypefaceChoice | undefined { return undefined; /* TODO */ }
  set buFont(_v: TextBulletTypefaceChoice | undefined) { /* TODO */ }
  get bullet(): TextBulletChoice | undefined { return undefined; /* TODO */ }
  set bullet(_v: TextBulletChoice | undefined) { /* TODO */ }

  get tabLst(): CT_TextTabStopList | undefined { return this.findChild(CT_TextTabStopList); }
  set tabLst(v: CT_TextTabStopList | undefined) {
    const prev = this.tabLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /** defRPr — default run properties for this paragraph. */
  get defRPr(): CT_TextCharacterProperties | undefined { return this.findChild(CT_TextCharacterProperties); }
  set defRPr(v: CT_TextCharacterProperties | undefined) {
    const prev = this.defRPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/* ---------- Paragraph ---------- */

export class CT_TextParagraph extends OoxmlElement {
  get elementName() { return "p"; }

  get pPr(): CT_TextParagraphProperties | undefined { return this.findChild(CT_TextParagraphProperties); }
  set pPr(v: CT_TextParagraphProperties | undefined) {
    const prev = this.pPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get runs(): TextRunChoice[] { return this.findChildren(TextRunBase) as TextRunChoice[]; }
  addRun<T extends TextRunChoice>(run: T): T { this.addChild(run); return run; }
  removeRun(run: TextRunChoice): boolean { return this.removeChild(run); }

  /** Paragraph-level end run properties `<a:endParaRPr>`. TODO: disambiguate from defRPr. */
  get endParaRPr(): CT_TextCharacterProperties | undefined {
    // TODO
    return undefined;
  }
  set endParaRPr(_v: CT_TextCharacterProperties | undefined) { /* TODO */ }
}

/* ---------- List style ---------- */

/**
 * CT_TextListStyle — default paragraph properties for 9 indent levels
 * (defPPr + lvl1pPr..lvl9pPr).
 *
 * TODO: expose level-specific named accessors once element-name aware lookup
 * is implemented.
 */
export class CT_TextListStyle extends OoxmlElement {
  get elementName() { return "lstStyle"; }
  get levels(): CT_TextParagraphProperties[] { return this.findChildren(CT_TextParagraphProperties); }
}

/* ---------- Body-level autofit ---------- */

export class CT_TextNoAutofit extends OoxmlElement { get elementName() { return "noAutofit"; } }
export class CT_TextShapeAutofit extends OoxmlElement { get elementName() { return "spAutoFit"; } }
export class CT_TextNormalAutofit extends OoxmlElement {
  get elementName() { return "normAutofit"; }
  get fontScale(): ST_TextFontScalePercentOrPercentString | undefined { return this.getAttr<ST_TextFontScalePercentOrPercentString>("fontScale"); }
  set fontScale(v: ST_TextFontScalePercentOrPercentString | undefined) { this.setAttr("fontScale", v); }
  get lnSpcReduction(): ST_TextSpacingPercentOrPercentString | undefined { return this.getAttr<ST_TextSpacingPercentOrPercentString>("lnSpcReduction"); }
  set lnSpcReduction(v: ST_TextSpacingPercentOrPercentString | undefined) { this.setAttr("lnSpcReduction", v); }
}
export type TextAutofitChoice = CT_TextNoAutofit | CT_TextNormalAutofit | CT_TextShapeAutofit;

/* ---------- Body properties ---------- */

export class CT_TextBodyProperties extends OoxmlElement {
  get elementName() { return "bodyPr"; }

  get rot(): ST_Angle | undefined { return this.getAttr<ST_Angle>("rot"); }
  set rot(v: ST_Angle | undefined) { this.setAttr("rot", v); }
  get spcFirstLastPara(): boolean | undefined { return this.getAttr<boolean>("spcFirstLastPara"); }
  set spcFirstLastPara(v: boolean | undefined) { this.setAttr("spcFirstLastPara", v); }
  get vertOverflow(): ST_TextVertOverflowType | undefined { return this.getAttr<ST_TextVertOverflowType>("vertOverflow"); }
  set vertOverflow(v: ST_TextVertOverflowType | undefined) { this.setAttr("vertOverflow", v); }
  get horzOverflow(): ST_TextHorzOverflowType | undefined { return this.getAttr<ST_TextHorzOverflowType>("horzOverflow"); }
  set horzOverflow(v: ST_TextHorzOverflowType | undefined) { this.setAttr("horzOverflow", v); }
  get vert(): ST_TextVerticalType | undefined { return this.getAttr<ST_TextVerticalType>("vert"); }
  set vert(v: ST_TextVerticalType | undefined) { this.setAttr("vert", v); }
  get wrap(): ST_TextWrappingType | undefined { return this.getAttr<ST_TextWrappingType>("wrap"); }
  set wrap(v: ST_TextWrappingType | undefined) { this.setAttr("wrap", v); }
  get lIns(): ST_Coordinate32 | undefined { return this.getAttr<ST_Coordinate32>("lIns"); }
  set lIns(v: ST_Coordinate32 | undefined) { this.setAttr("lIns", v); }
  get tIns(): ST_Coordinate32 | undefined { return this.getAttr<ST_Coordinate32>("tIns"); }
  set tIns(v: ST_Coordinate32 | undefined) { this.setAttr("tIns", v); }
  get rIns(): ST_Coordinate32 | undefined { return this.getAttr<ST_Coordinate32>("rIns"); }
  set rIns(v: ST_Coordinate32 | undefined) { this.setAttr("rIns", v); }
  get bIns(): ST_Coordinate32 | undefined { return this.getAttr<ST_Coordinate32>("bIns"); }
  set bIns(v: ST_Coordinate32 | undefined) { this.setAttr("bIns", v); }
  get numCol(): ST_TextColumnCount | undefined { return this.getAttr<ST_TextColumnCount>("numCol"); }
  set numCol(v: ST_TextColumnCount | undefined) { this.setAttr("numCol", v); }
  get spcCol(): ST_PositiveCoordinate32 | undefined { return this.getAttr<number>("spcCol"); }
  set spcCol(v: ST_PositiveCoordinate32 | undefined) { this.setAttr("spcCol", v); }
  get rtlCol(): boolean | undefined { return this.getAttr<boolean>("rtlCol"); }
  set rtlCol(v: boolean | undefined) { this.setAttr("rtlCol", v); }
  get fromWordArt(): boolean | undefined { return this.getAttr<boolean>("fromWordArt"); }
  set fromWordArt(v: boolean | undefined) { this.setAttr("fromWordArt", v); }
  get anchor(): ST_TextAnchoringType | undefined { return this.getAttr<ST_TextAnchoringType>("anchor"); }
  set anchor(v: ST_TextAnchoringType | undefined) { this.setAttr("anchor", v); }
  get anchorCtr(): boolean | undefined { return this.getAttr<boolean>("anchorCtr"); }
  set anchorCtr(v: boolean | undefined) { this.setAttr("anchorCtr", v); }
  get forceAA(): boolean | undefined { return this.getAttr<boolean>("forceAA"); }
  set forceAA(v: boolean | undefined) { this.setAttr("forceAA", v); }
  get upright(): boolean | undefined { return this.getAttr<boolean>("upright"); }
  set upright(v: boolean | undefined) { this.setAttr("upright", v); }
  get compatLnSpc(): boolean | undefined { return this.getAttr<boolean>("compatLnSpc"); }
  set compatLnSpc(v: boolean | undefined) { this.setAttr("compatLnSpc", v); }

  /** prstTxWarp — preset text warp geometry. */
  get prstTxWarp(): CT_PresetTextShape | undefined { return this.findChild(CT_PresetTextShape); }
  set prstTxWarp(v: CT_PresetTextShape | undefined) {
    const prev = this.prstTxWarp;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get autofit(): TextAutofitChoice | undefined {
    return (
      this.findChild(CT_TextNoAutofit) ??
      this.findChild(CT_TextNormalAutofit) ??
      this.findChild(CT_TextShapeAutofit)
    );
  }
  set autofit(v: TextAutofitChoice | undefined) {
    const prev = this.autofit;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /** 3D scene/shape wrapper (EG_Text3D). TODO: disambiguate scene3d/sp3d/flatTx. */
  get text3D(): Text3DChoice | undefined { return undefined; /* TODO */ }
  set text3D(_v: Text3DChoice | undefined) { /* TODO */ }
}

/* ---------- Text body (container used everywhere) ---------- */

/**
 * CT_TextBody — text container consisting of bodyPr + lstStyle? + p[].
 * Used by charts (titles, labels, rich text), shapes, and tables.
 */
export class CT_TextBody extends OoxmlElement {
  get elementName() { return "txBody"; }

  get bodyPr(): CT_TextBodyProperties | undefined { return this.findChild(CT_TextBodyProperties); }
  set bodyPr(v: CT_TextBodyProperties | undefined) {
    const prev = this.bodyPr;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get lstStyle(): CT_TextListStyle | undefined { return this.findChild(CT_TextListStyle); }
  set lstStyle(v: CT_TextListStyle | undefined) {
    const prev = this.lstStyle;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get paragraphs(): CT_TextParagraph[] { return this.findChildren(CT_TextParagraph); }
  addParagraph(p: CT_TextParagraph = new CT_TextParagraph()): CT_TextParagraph {
    this.addChild(p);
    return p;
  }
}

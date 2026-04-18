/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd — line/stroke properties.
 */

import { OoxmlElement, ListHolder, ChoiceHolder } from "../../base/index.js";
import type {
  ST_LineEndType,
  ST_LineEndWidth,
  ST_LineEndLength,
  ST_LineCap,
  ST_LineWidth,
  ST_PenAlignment,
  ST_CompoundLine,
  ST_PresetLineDashVal,
  ST_PositivePercentage,
} from "./simpleTypes.js";
import {
  CT_NoFillProperties,
  CT_SolidColorFillProperties,
  CT_GradientFillProperties,
  CT_PatternFillProperties,
} from "./fills.js";

/* ---------- Line end (arrowheads) ---------- */

export class CT_LineEndProperties extends OoxmlElement {
  get elementName() { return "lnEnd"; }
  get type(): ST_LineEndType | undefined { return this.getAttr<ST_LineEndType>("type"); }
  set type(v: ST_LineEndType | undefined) { this.setAttr("type", v); }
  get w(): ST_LineEndWidth | undefined { return this.getAttr<ST_LineEndWidth>("w"); }
  set w(v: ST_LineEndWidth | undefined) { this.setAttr("w", v); }
  get len(): ST_LineEndLength | undefined { return this.getAttr<ST_LineEndLength>("len"); }
  set len(v: ST_LineEndLength | undefined) { this.setAttr("len", v); }
}

/* ---------- Line join ---------- */

export class CT_LineJoinBevel extends OoxmlElement { get elementName() { return "bevel"; } }
export class CT_LineJoinRound extends OoxmlElement { get elementName() { return "round"; } }
export class CT_LineJoinMiterProperties extends OoxmlElement {
  get elementName() { return "miter"; }
  get lim(): ST_PositivePercentage | undefined { return this.getAttr<number>("lim"); }
  set lim(v: ST_PositivePercentage | undefined) { this.setAttr("lim", v); }
}
export type LineJoin = CT_LineJoinBevel | CT_LineJoinRound | CT_LineJoinMiterProperties;

/* ---------- Line dash ---------- */

export class CT_PresetLineDashProperties extends OoxmlElement {
  get elementName() { return "prstDash"; }
  get val(): ST_PresetLineDashVal | undefined { return this.getAttr<ST_PresetLineDashVal>("val"); }
  set val(v: ST_PresetLineDashVal | undefined) { this.setAttr("val", v); }
}
export class CT_DashStop extends OoxmlElement {
  get elementName() { return "ds"; }
  get d(): ST_PositivePercentage | undefined { return this.getAttr<number>("d"); }
  set d(v: ST_PositivePercentage | undefined) { this.setAttr("d", v); }
  get sp(): ST_PositivePercentage | undefined { return this.getAttr<number>("sp"); }
  set sp(v: ST_PositivePercentage | undefined) { this.setAttr("sp", v); }
}
export class CT_DashStopList extends ListHolder<CT_DashStop> {
  get elementName() { return "custDash"; }
}
export type LineDash = CT_PresetLineDashProperties | CT_DashStopList;

/* ---------- Line fill choice (subset of EG_FillProperties) ---------- */

export type LineFill =
  | CT_NoFillProperties
  | CT_SolidColorFillProperties
  | CT_GradientFillProperties
  | CT_PatternFillProperties;

/* ---------- CT_LineProperties ---------- */

/**
 * CT_LineProperties — all stroke-related options.
 *
 * Children (ordered in XSD): fill? + dash? + join? + headEnd? + tailEnd? + extLst?
 * Getters/setters below provide typed access to each slot. Because all three
 * join types share the "join" XSD slot, it is returned as a union.
 */
export class CT_LineProperties extends OoxmlElement {
  get elementName() { return "ln"; }

  get w(): ST_LineWidth | undefined { return this.getAttr<number>("w"); }
  set w(v: ST_LineWidth | undefined) { this.setAttr("w", v); }
  get cap(): ST_LineCap | undefined { return this.getAttr<ST_LineCap>("cap"); }
  set cap(v: ST_LineCap | undefined) { this.setAttr("cap", v); }
  get cmpd(): ST_CompoundLine | undefined { return this.getAttr<ST_CompoundLine>("cmpd"); }
  set cmpd(v: ST_CompoundLine | undefined) { this.setAttr("cmpd", v); }
  get algn(): ST_PenAlignment | undefined { return this.getAttr<ST_PenAlignment>("algn"); }
  set algn(v: ST_PenAlignment | undefined) { this.setAttr("algn", v); }

  get fill(): LineFill | undefined {
    return (
      this.findChild(CT_NoFillProperties) ??
      this.findChild(CT_SolidColorFillProperties) ??
      this.findChild(CT_GradientFillProperties) ??
      this.findChild(CT_PatternFillProperties)
    );
  }
  set fill(v: LineFill | undefined) {
    const prev = this.fill;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get dash(): LineDash | undefined {
    return this.findChild(CT_PresetLineDashProperties) ?? this.findChild(CT_DashStopList);
  }
  set dash(v: LineDash | undefined) {
    const prev = this.dash;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  get join(): LineJoin | undefined {
    return (
      this.findChild(CT_LineJoinBevel) ??
      this.findChild(CT_LineJoinRound) ??
      this.findChild(CT_LineJoinMiterProperties)
    );
  }
  set join(v: LineJoin | undefined) {
    const prev = this.join;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /**
   * headEnd / tailEnd — arrowhead properties.
   * TODO: disambiguate head vs tail once element-name aware XML lookup is added.
   */
  get headEnd(): CT_LineEndProperties | undefined {
    // TODO: disambiguate by XML element name (<a:headEnd> vs <a:tailEnd>)
    return undefined;
  }
  set headEnd(_v: CT_LineEndProperties | undefined) {
    // TODO
  }
  get tailEnd(): CT_LineEndProperties | undefined {
    // TODO
    return undefined;
  }
  set tailEnd(_v: CT_LineEndProperties | undefined) {
    // TODO
  }
}

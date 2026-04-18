/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/diagram
 * Source:    dml-diagram.xsd
 *
 * The diagram schema defines SmartArt model entries, layout definitions,
 * style definitions and color transform definitions. It is a separate
 * ~1000-line XSD and is only referenced by this project indirectly through
 * `CT_ShapeProperties` / `CT_GraphicalObjectData` wrappers.
 *
 * A full model of every diagram type is out of scope for the chart model
 * — only the root-level wrappers are declared here. Concrete properties
 * live in shape / text / color modules and can be reached via
 * `CT_GraphicalObjectData.payload`.
 *
 * TODO: expand once diagram features are required. See dml-diagram.xsd
 * for the full type catalog (CT_DataModel, CT_LayoutDef, CT_StyleDef,
 * CT_ColorTransform, etc.).
 */

import { OoxmlElement } from "../base/index.js";
import { CT_OfficeArtExtensionList } from "./main/index.js";

/** CT_DataModel — root data model payload (TODO: full pt / cxn / bg / whole). */
export class CT_DataModel extends OoxmlElement {
  get elementName() { return "dataModel"; }
  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

/** CT_LayoutDefHdr — layout definition header (TODO: full type). */
export class CT_LayoutDefHdr extends OoxmlElement {
  get elementName() { return "layoutDefHdr"; }
  get uniqueId(): string | undefined { return this.getAttr("uniqueId"); }
  set uniqueId(v: string | undefined) { this.setAttr("uniqueId", v); }
  get minVer(): string | undefined { return this.getAttr("minVer"); }
  set minVer(v: string | undefined) { this.setAttr("minVer", v); }
  get defStyle(): string | undefined { return this.getAttr("defStyle"); }
  set defStyle(v: string | undefined) { this.setAttr("defStyle", v); }
}

/** CT_StyleDefHdr — style definition header (TODO: full type). */
export class CT_StyleDefHdr extends OoxmlElement {
  get elementName() { return "styleDefHdr"; }
  get uniqueId(): string | undefined { return this.getAttr("uniqueId"); }
  set uniqueId(v: string | undefined) { this.setAttr("uniqueId", v); }
  get minVer(): string | undefined { return this.getAttr("minVer"); }
  set minVer(v: string | undefined) { this.setAttr("minVer", v); }
}

/** CT_ColorTransformHeader — color transform header (TODO: full type). */
export class CT_ColorTransformHeader extends OoxmlElement {
  get elementName() { return "colorsDefHdr"; }
  get uniqueId(): string | undefined { return this.getAttr("uniqueId"); }
  set uniqueId(v: string | undefined) { this.setAttr("uniqueId", v); }
  get minVer(): string | undefined { return this.getAttr("minVer"); }
  set minVer(v: string | undefined) { this.setAttr("minVer", v); }
}

/* TODO: remaining diagram types — CT_LayoutVariablePropertySet, CT_Category,
 * CT_Pt, CT_Cxn, CT_BackgroundFormatting, CT_Whole, CT_OrgChart,
 * CT_ChildMax, CT_ChildPref, CT_BulletEnabled, CT_Direction,
 * CT_HierBranchStyle, CT_AnimOneStr, CT_AnimLvlStr, CT_ResizeHandlesStr,
 * CT_SDName, CT_SDDescription, CT_SDCategories, CT_SDCategory, CT_PtList,
 * CT_CxnList, CT_ElemPropSet, CT_ChartingTemplate, CT_Algorithm, CT_Param,
 * CT_LayoutNode, CT_Choose, CT_If, CT_Else, CT_ForEach, CT_PresentationOf,
 * CT_Constraints, CT_Constraint, CT_Rules, CT_Rule, CT_Shape, CT_PresLayoutVars,
 * CT_SampData, CT_Styles, CT_StyleLbl, CT_Scene3DStyleRef, CT_Shape3DStyleRef,
 * CT_TxStyles, CT_Cats, CT_Cat, CT_CTName, CT_CTDescription, CT_CTCategories,
 * CT_CTCategory, CT_CTStyleLabel, CT_Colors, CT_ColorDefinition, ...
 */

/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd — Office Art extension mechanism.
 */

import { OoxmlElement, ListHolder } from "../../base/index.js";

/**
 * CT_OfficeArtExtension — opaque extension payload identified by URI.
 * The inner XML is forward-compatible and not modeled.
 */
export class CT_OfficeArtExtension extends OoxmlElement {
  get elementName() { return "ext"; }
  get uri(): string | undefined { return this.getAttr("uri"); }
  set uri(v: string | undefined) { this.setAttr("uri", v); }
  // TODO: store inner any-content XML fragments
}

export class CT_OfficeArtExtensionList extends ListHolder<CT_OfficeArtExtension> {
  get elementName() { return "extLst"; }
}

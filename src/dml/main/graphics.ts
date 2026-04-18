/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd — graphical object wrappers.
 */

import { OoxmlElement } from "../../base/index.js";

/**
 * CT_GraphicalObjectData — opaque container with a URI and any-content
 * payload. Used to host chart spaces, diagrams, tables etc. within DrawingML.
 */
export class CT_GraphicalObjectData extends OoxmlElement {
  get elementName() { return "graphicData"; }
  get uri(): string | undefined { return this.getAttr("uri"); }
  set uri(v: string | undefined) { this.setAttr("uri", v); }

  /**
   * The payload child (`<c:chart>`, `<dgm:...>`, etc.) is a third-party
   * element tree. Expose generic child management.
   */
  get payload(): OoxmlElement | undefined { return this.children[0]; }
  set payload(v: OoxmlElement | undefined) {
    this.children.length = 0;
    if (v) this.addChild(v);
  }
}

/** CT_GraphicalObject — wraps graphicData. */
export class CT_GraphicalObject extends OoxmlElement {
  get elementName() { return "graphic"; }

  get graphicData(): CT_GraphicalObjectData | undefined { return this.findChild(CT_GraphicalObjectData); }
  set graphicData(v: CT_GraphicalObjectData | undefined) {
    const prev = this.graphicData;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

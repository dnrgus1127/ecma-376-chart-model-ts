import { OoxmlElement } from "./OoxmlElement.js";

/**
 * Complex type that is effectively just a `val` attribute wrapper.
 * Examples: CT_Boolean, CT_Double, CT_UnsignedInt, CT_RotX, CT_Perspective...
 */
export abstract class ValueElement<V extends string | number | boolean> extends OoxmlElement {
  get val(): V | undefined {
    return this.getAttr<V>("val");
  }

  set val(value: V | undefined) {
    this.setAttr("val", value);
  }
}

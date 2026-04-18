import { OoxmlElement } from "./OoxmlElement.js";

/**
 * Wrapper helper for XSD `<xsd:choice>` / group containers where exactly one
 * (or at most one) variant element is allowed.
 *
 * Subclasses specify the allowed choice type and expose typed getters.
 */
export abstract class ChoiceHolder<C extends OoxmlElement> extends OoxmlElement {
  get choice(): C | undefined {
    return this.children[0] as C | undefined;
  }

  set choice(element: C | undefined) {
    this.children.length = 0;
    if (element !== undefined) {
      this.children.push(element);
    }
  }
}

/**
 * XSD `<xsd:sequence>` with `maxOccurs="unbounded"` of a single element type.
 * Example: CT_GradientStopList, CT_BandFmts, CT_DashStopList.
 */
export abstract class ListHolder<C extends OoxmlElement> extends OoxmlElement {
  get items(): readonly C[] {
    return this.children as unknown as readonly C[];
  }

  add(item: C): C {
    this.children.push(item);
    return item;
  }

  removeAt(index: number): C | undefined {
    const [removed] = this.children.splice(index, 1);
    return removed as C | undefined;
  }

  clear(): void {
    this.children.length = 0;
  }

  get count(): number {
    return this.children.length;
  }
}

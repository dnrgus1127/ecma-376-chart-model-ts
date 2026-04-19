import { OoxmlElement } from "./OoxmlElement.js";

/**
 * XSD element whose content is a single xsd:string / ST_Xstring text node and
 * which has no attributes or child elements. Examples: `<c:v>`, `<c:f>`,
 * `<c:formatCode>`, `<c:name>` (inside CT_PivotSource / CT_Trendline).
 *
 * Distinct from ValueElement, which wraps a `val` attribute on an otherwise
 * empty element (e.g., `<c:b val="1"/>`).
 */
export abstract class TextContentElement extends OoxmlElement {
  protected textContent: string | undefined;

  getText(): string | undefined {
    return this.textContent;
  }

  setText(value: string | undefined): this {
    this.textContent = value;
    return this;
  }

  get text(): string | undefined {
    return this.textContent;
  }

  set text(value: string | undefined) {
    this.textContent = value;
  }
}

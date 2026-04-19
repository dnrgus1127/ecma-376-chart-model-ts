export type AttributeMap = Record<string, AttributeValue | undefined>;
export type AttributeValue = string | number | boolean;

export abstract class OoxmlElement {
  protected readonly attributes: AttributeMap = {};
  protected readonly children: OoxmlElement[] = [];

  abstract get elementName(): string;

  getAttr<T extends AttributeValue = string>(name: string): T | undefined {
    return this.attributes[name] as T | undefined;
  }

  setAttr(name: string, value: AttributeValue | undefined): this {
    if (value === undefined) {
      delete this.attributes[name];
    } else {
      this.attributes[name] = value;
    }
    return this;
  }

  hasAttr(name: string): boolean {
    return name in this.attributes && this.attributes[name] !== undefined;
  }

  addChild<T extends OoxmlElement>(child: T): T {
    this.children.push(child);
    return child;
  }

  removeChild(child: OoxmlElement): boolean {
    const idx = this.children.indexOf(child);
    if (idx === -1) return false;
    this.children.splice(idx, 1);
    return true;
  }

  findChild<T extends OoxmlElement>(ctor: abstract new (...args: any[]) => T): T | undefined {
    return this.children.find((c): c is T => c instanceof ctor);
  }

  findChildren<T extends OoxmlElement>(ctor: abstract new (...args: any[]) => T): T[] {
    return this.children.filter((c): c is T => c instanceof ctor);
  }

  /**
   * Locate the first child whose `elementName` matches `name` (and optionally
   * also instanceof `ctor`). Required when the XSD reuses the same complex
   * type under several element names (e.g., `<c:plotVisOnly>` and
   * `<c:autoTitleDeleted>` both wrap CT_Boolean).
   */
  findChildByName<T extends OoxmlElement>(
    name: string,
    ctor?: abstract new (...args: any[]) => T,
  ): T | undefined {
    for (const c of this.children) {
      if (c.elementName !== name) continue;
      if (ctor && !(c instanceof ctor)) continue;
      return c as T;
    }
    return undefined;
  }

  findChildrenByName<T extends OoxmlElement>(
    name: string,
    ctor?: abstract new (...args: any[]) => T,
  ): T[] {
    const out: T[] = [];
    for (const c of this.children) {
      if (c.elementName !== name) continue;
      if (ctor && !(c instanceof ctor)) continue;
      out.push(c as T);
    }
    return out;
  }

  /**
   * Replace the single child matching `name` with `v` (or remove it if `v` is
   * undefined). Name-aware counterpart to `setSlot()`.
   */
  protected setSlotByName<T extends OoxmlElement>(name: string, v: T | undefined): void {
    const prev = this.findChildByName<T>(name);
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  /**
   * Return the nth child of the given type without allocating an intermediate
   * array. Use this when an XSD sequence allows multiple occurrences of the
   * same element type and the index is known (e.g., SeriesBase.idx/order).
   */
  findNthChild<T extends OoxmlElement>(
    ctor: abstract new (...args: any[]) => T,
    n: number,
  ): T | undefined {
    let seen = 0;
    for (const c of this.children) {
      if (c instanceof ctor) {
        if (seen === n) return c;
        seen++;
      }
    }
    return undefined;
  }

  /**
   * Replace the single child of type `ctor` with `v` (or remove if `v` is
   * undefined). Convenience for the 3-line `const prev = this.findChild(...);
   * if (prev) this.removeChild(prev); if (v) this.addChild(v);` pattern.
   */
  protected setSlot<T extends OoxmlElement>(
    ctor: abstract new (...args: any[]) => T,
    v: T | undefined,
  ): void {
    const prev = this.findChild(ctor);
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }

  getChildren(): readonly OoxmlElement[] {
    return this.children;
  }
}

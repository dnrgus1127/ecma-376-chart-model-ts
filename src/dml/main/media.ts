/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd — media (audio/video) file references.
 */

import { OoxmlElement } from "../../base/index.js";
import type { ST_RelationshipId } from "../../shared/index.js";
import { CT_OfficeArtExtensionList } from "./extension.js";

abstract class MediaFileBase extends OoxmlElement {
  get link(): ST_RelationshipId | undefined { return this.getAttr("r:link"); }
  set link(v: ST_RelationshipId | undefined) { this.setAttr("r:link", v); }
  get cntType(): string | undefined { return this.getAttr("cntType"); }
  set cntType(v: string | undefined) { this.setAttr("cntType", v); }
  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export class CT_AudioFile extends MediaFileBase { get elementName() { return "audioFile"; } }
export class CT_VideoFile extends MediaFileBase { get elementName() { return "videoFile"; } }
export class CT_QuickTimeFile extends MediaFileBase { get elementName() { return "quickTimeFile"; } }

export class CT_EmbeddedWAVAudioFile extends OoxmlElement {
  get elementName() { return "wavAudioFile"; }
  get embed(): ST_RelationshipId | undefined { return this.getAttr("r:embed"); }
  set embed(v: ST_RelationshipId | undefined) { this.setAttr("r:embed", v); }
  get name(): string | undefined { return this.getAttr("name"); }
  set name(v: string | undefined) { this.setAttr("name", v); }
  get builtIn(): boolean | undefined { return this.getAttr<boolean>("builtIn"); }
  set builtIn(v: boolean | undefined) { this.setAttr("builtIn", v); }
}

export class CT_AudioCDTime extends OoxmlElement {
  get elementName() { return "st"; } // also `end`
  get track(): number | undefined { return this.getAttr<number>("track"); }
  set track(v: number | undefined) { this.setAttr("track", v); }
  get time(): number | undefined { return this.getAttr<number>("time"); }
  set time(v: number | undefined) { this.setAttr("time", v); }
}

export class CT_AudioCD extends OoxmlElement {
  get elementName() { return "audioCd"; }
  /** st / end — audio CD start/end times. TODO: disambiguate by XML name. */
  get st(): CT_AudioCDTime | undefined { return this.findChild(CT_AudioCDTime); }
  set st(_v: CT_AudioCDTime | undefined) { /* TODO */ }
  get end(): CT_AudioCDTime | undefined { return undefined; /* TODO */ }
  set end(_v: CT_AudioCDTime | undefined) { /* TODO */ }
  get extLst(): CT_OfficeArtExtensionList | undefined { return this.findChild(CT_OfficeArtExtensionList); }
  set extLst(v: CT_OfficeArtExtensionList | undefined) {
    const prev = this.extLst;
    if (prev) this.removeChild(prev);
    if (v) this.addChild(v);
  }
}

export type MediaChoice =
  | CT_AudioCD
  | CT_EmbeddedWAVAudioFile
  | CT_AudioFile
  | CT_VideoFile
  | CT_QuickTimeFile;

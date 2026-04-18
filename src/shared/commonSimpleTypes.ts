/**
 * Namespace: http://schemas.openxmlformats.org/officeDocument/2006/sharedTypes
 * Source:    shared-commonSimpleTypes.xsd
 */

export type ST_Lang = string;
export type ST_HexColorRGB = string; // 6-char hex pair (3 bytes)
export type ST_Panose = string; // 20-char hex (10 bytes)
export type ST_String = string;
export type ST_Xstring = string;
export type ST_XmlName = string;
export type ST_Guid = string; // `{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}`
export type ST_UnsignedDecimalNumber = number;
export type ST_UniversalMeasure = string; // e.g. "10pt", "-5cm"
export type ST_PositiveUniversalMeasure = string;
export type ST_Percentage = string; // e.g. "50%"
export type ST_FixedPercentage = string;
export type ST_PositivePercentage = string;
export type ST_PositiveFixedPercentage = string;
export type ST_TwipsMeasure = number | ST_PositiveUniversalMeasure;
export type ST_OnOff = boolean | "on" | "off";

export enum ST_CalendarType {
  Gregorian = "gregorian",
  GregorianUs = "gregorianUs",
  GregorianMeFrench = "gregorianMeFrench",
  GregorianArabic = "gregorianArabic",
  Hijri = "hijri",
  Hebrew = "hebrew",
  Taiwan = "taiwan",
  Japan = "japan",
  Thai = "thai",
  Korea = "korea",
  Saka = "saka",
  GregorianXlitEnglish = "gregorianXlitEnglish",
  GregorianXlitFrench = "gregorianXlitFrench",
  None = "none",
}

export enum ST_AlgClass {
  Hash = "hash",
  Custom = "custom",
}

export enum ST_CryptProv {
  RsaAES = "rsaAES",
  RsaFull = "rsaFull",
  Custom = "custom",
}

export enum ST_AlgType {
  TypeAny = "typeAny",
  Custom = "custom",
}

export enum ST_OnOff1 {
  On = "on",
  Off = "off",
}

export enum ST_TrueFalse {
  T = "t",
  F = "f",
  True = "true",
  False = "false",
}

export enum ST_TrueFalseBlank {
  T = "t",
  F = "f",
  True = "true",
  False = "false",
  Blank = "",
  TrueCapitalized = "True",
  FalseCapitalized = "False",
}

export enum ST_VerticalAlignRun {
  Baseline = "baseline",
  Superscript = "superscript",
  Subscript = "subscript",
}

export enum ST_XAlign {
  Left = "left",
  Center = "center",
  Right = "right",
  Inside = "inside",
  Outside = "outside",
}

export enum ST_YAlign {
  Inline = "inline",
  Top = "top",
  Center = "center",
  Bottom = "bottom",
  Inside = "inside",
  Outside = "outside",
}

export enum ST_ConformanceClass {
  Strict = "strict",
  Transitional = "transitional",
}

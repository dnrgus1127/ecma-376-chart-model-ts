/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/main
 * Source:    dml-main.xsd (simpleTypes)
 *
 * String pattern / numeric restrictions, and enum string-literal unions.
 * For heavy enumerations (colors, shapes, text shapes, etc.) we prefer
 * string-literal unions so consumers can write `"red"` without enum lookup.
 */

import type {
  ST_PositiveUniversalMeasure,
  ST_UniversalMeasure,
  ST_Percentage as S_Percentage,
  ST_PositivePercentage as S_PositivePercentage,
  ST_FixedPercentage as S_FixedPercentage,
  ST_PositiveFixedPercentage as S_PositiveFixedPercentage,
} from "../../shared/index.js";

/* ---------------- Measures / coordinates ---------------- */
export type ST_CoordinateUnqualified = number; // xsd:long in EMU
export type ST_Coordinate = ST_CoordinateUnqualified | ST_UniversalMeasure;
export type ST_PositiveCoordinate = number;
export type ST_Coordinate32Unqualified = number;
export type ST_Coordinate32 = ST_Coordinate32Unqualified | ST_UniversalMeasure;
export type ST_PositiveCoordinate32 = number;

/* ---------------- Angles ---------------- */
export type ST_Angle = number; // 1/60000 degree
export type ST_FixedAngle = number;
export type ST_PositiveFixedAngle = number;
export type ST_FOVAngle = number;

/* ---------------- Percentages ---------------- */
export type ST_PercentageDecimal = number; // 1000 = 1%
export type ST_Percentage = ST_PercentageDecimal | S_Percentage;
export type ST_PositivePercentage = ST_PercentageDecimal | S_PositivePercentage;
export type ST_FixedPercentage = ST_PercentageDecimal | S_FixedPercentage;
export type ST_PositiveFixedPercentage = ST_PercentageDecimal | S_PositiveFixedPercentage;

/* ---------------- Text-related numerics ---------------- */
export type ST_TextFontSize = number; // 1/100 point
export type ST_TextNonNegativePoint = number;
export type ST_TextSpacingPoint = number;
export type ST_TextFontScalePercent = ST_PercentageDecimal;
export type ST_TextBulletSizePercent = ST_PercentageDecimal;
export type ST_TextBulletSizeDecimal = string;
export type ST_TextSpacingPercent = ST_PercentageDecimal;
export type ST_TextColumnCount = number; // 1..16
export type ST_TextBulletStartAtNum = number; // 1..32768
export type ST_TextIndentLevelType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ST_TextMargin = ST_Coordinate32Unqualified;
export type ST_TextIndent = ST_Coordinate32Unqualified;
export type ST_TextPointUnqualified = number;
export type ST_TextPoint = ST_TextPointUnqualified | ST_UniversalMeasure;
export type ST_TextBulletSize = ST_TextBulletSizePercent | ST_TextBulletSizeDecimal;
export type ST_TextFontScalePercentOrPercentString = ST_TextFontScalePercent | S_Percentage;
export type ST_TextSpacingPercentOrPercentString = ST_TextSpacingPercent | S_Percentage;

/* ---------------- Geometry ---------------- */
export type ST_GeomGuideName = string;
export type ST_GeomGuideFormula = string;
export type ST_AdjCoordinate = ST_Coordinate | ST_GeomGuideName;
export type ST_AdjAngle = ST_Angle | ST_GeomGuideName;

/* ---------------- Line width ---------------- */
export type ST_LineWidth = number; // 0..20116800

/* ---------------- Identifiers ---------------- */
export type ST_DrawingElementId = number;
export type ST_ShapeID = string;
export type ST_StyleMatrixColumnIndex = number;

/* ---------------- Fonts ---------------- */
export type ST_TextTypeface = string;
export type ST_PitchFamily = number;
export type ST_Panose = string;

/* ================================================================ */
/*                        ENUMS (string union)                       */
/* ================================================================ */

export type ST_RectAlignment = "tl" | "t" | "tr" | "l" | "ctr" | "r" | "bl" | "b" | "br";

export type ST_BlackWhiteMode =
  | "clr" | "auto" | "gray" | "ltGray" | "invGray"
  | "grayWhite" | "blackGray" | "blackWhite" | "black" | "white" | "hidden";

/* ----- Lines / strokes ----- */
export type ST_LineCap = "rnd" | "sq" | "flat";
export type ST_LineEndType = "none" | "triangle" | "stealth" | "diamond" | "oval" | "arrow";
export type ST_LineEndWidth = "sm" | "med" | "lg";
export type ST_LineEndLength = "sm" | "med" | "lg";
export type ST_PenAlignment = "ctr" | "in";
export type ST_CompoundLine = "sng" | "dbl" | "thickThin" | "thinThick" | "tri";
export type ST_PresetLineDashVal =
  | "solid" | "dot" | "dash" | "lgDash" | "dashDot" | "lgDashDot"
  | "lgDashDotDot" | "sysDash" | "sysDot" | "sysDashDot" | "sysDashDotDot";

/* ----- Fills / patterns ----- */
export type ST_PresetPatternVal =
  | "pct5" | "pct10" | "pct20" | "pct25" | "pct30" | "pct40" | "pct50"
  | "pct60" | "pct70" | "pct75" | "pct80" | "pct90"
  | "horz" | "vert" | "ltHorz" | "ltVert" | "dkHorz" | "dkVert"
  | "narHorz" | "narVert" | "dashHorz" | "dashVert"
  | "cross" | "dnDiag" | "upDiag" | "ltDnDiag" | "ltUpDiag" | "dkDnDiag" | "dkUpDiag"
  | "wdDnDiag" | "wdUpDiag" | "dashDnDiag" | "dashUpDiag"
  | "diagCross" | "smCheck" | "lgCheck" | "smGrid" | "lgGrid"
  | "dotGrid" | "smConfetti" | "lgConfetti" | "horzBrick" | "diagBrick"
  | "solidDmnd" | "openDmnd" | "dotDmnd" | "plaid" | "sphere" | "weave"
  | "divot" | "shingle" | "wave" | "trellis" | "zigZag";
export type ST_PathShadeType = "shape" | "circle" | "rect";
export type ST_TileFlipMode = "none" | "x" | "y" | "xy";
export type ST_BlipCompression = "email" | "hqprint" | "print" | "screen" | "none";

/* ----- Effects ----- */
export type ST_BlendMode =
  | "over" | "mult" | "screen" | "darken" | "lighten";
export type ST_PresetShadowVal =
  | "shdw1" | "shdw2" | "shdw3" | "shdw4" | "shdw5" | "shdw6" | "shdw7"
  | "shdw8" | "shdw9" | "shdw10" | "shdw11" | "shdw12" | "shdw13"
  | "shdw14" | "shdw15" | "shdw16" | "shdw17" | "shdw18" | "shdw19" | "shdw20";
export type ST_EffectContainerType = "sib" | "tree";

/* ----- Geometry ----- */
export type ST_PathFillMode = "none" | "norm" | "lighten" | "lightenLess" | "darken" | "darkenLess";

/* ----- Colors ----- */
export type ST_ColorSchemeIndex =
  | "dk1" | "lt1" | "dk2" | "lt2"
  | "accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6"
  | "hlink" | "folHlink";
export type ST_SchemeColorVal =
  | "bg1" | "tx1" | "bg2" | "tx2"
  | "accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6"
  | "hlink" | "folHlink" | "phClr" | "dk1" | "lt1" | "dk2" | "lt2";
export type ST_SystemColorVal =
  | "scrollBar" | "background" | "activeCaption" | "inactiveCaption" | "menu" | "window"
  | "windowFrame" | "menuText" | "windowText" | "captionText" | "activeBorder"
  | "inactiveBorder" | "appWorkspace" | "highlight" | "highlightText" | "btnFace"
  | "btnShadow" | "grayText" | "btnText" | "inactiveCaptionText" | "btnHighlight"
  | "3dDkShadow" | "3dLight" | "infoText" | "infoBk" | "hotLight"
  | "gradientActiveCaption" | "gradientInactiveCaption" | "menuHighlight" | "menuBar";
export type ST_PresetColorVal =
  | "aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black"
  | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse"
  | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan"
  | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGrey" | "darkGreen"
  | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed"
  | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey"
  | "darkTurquoise" | "darkViolet"
  | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGrey" | "dkGreen" | "dkKhaki"
  | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon"
  | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet"
  | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dodgerBlue" | "firebrick"
  | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold"
  | "goldenrod" | "gray" | "grey" | "green" | "greenYellow" | "honeydew" | "hotPink"
  | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen"
  | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow"
  | "lightGray" | "lightGrey" | "lightGreen" | "lightPink" | "lightSalmon" | "lightSeaGreen"
  | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow"
  | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGrey" | "ltGreen"
  | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey"
  | "ltSteelBlue" | "ltYellow"
  | "lime" | "limeGreen" | "linen" | "magenta" | "maroon"
  | "medAquamarine" | "medBlue" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue"
  | "medSpringGreen" | "medTurquoise" | "medVioletRed"
  | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen"
  | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed"
  | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy"
  | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid"
  | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed"
  | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple"
  | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown"
  | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue"
  | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal"
  | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke"
  | "yellow" | "yellowGreen";

/* ----- Shapes (see ST_ShapeType enum list in dml-main.xsd §2084) ----- */
export type ST_ShapeType = string; // 187 preset shapes (kept as string alias; see XSD)
export type ST_TextShapeType = string; // 41 preset text warps

/* ----- 3D ----- */
export type ST_PresetCameraType = string; // 62 values in XSD
export type ST_LightRigDirection = "tl" | "t" | "tr" | "l" | "r" | "bl" | "b" | "br";
export type ST_LightRigType =
  | "legacyFlat1" | "legacyFlat2" | "legacyFlat3" | "legacyFlat4"
  | "legacyNormal1" | "legacyNormal2" | "legacyNormal3" | "legacyNormal4"
  | "legacyHarsh1" | "legacyHarsh2" | "legacyHarsh3" | "legacyHarsh4"
  | "threePt" | "balanced" | "soft" | "harsh" | "flood" | "contrasting"
  | "morning" | "sunrise" | "sunset" | "chilly" | "freezing" | "flat"
  | "twoPt" | "glow" | "brightRoom";
export type ST_BevelPresetType =
  | "relaxedInset" | "circle" | "slope" | "cross" | "angle" | "softRound"
  | "convex" | "coolSlant" | "divot" | "riblet" | "hardEdge" | "artDeco";
export type ST_PresetMaterialType =
  | "legacyMatte" | "legacyPlastic" | "legacyMetal" | "legacyWireframe"
  | "matte" | "plastic" | "metal" | "warmMatte" | "translucentPowder" | "powder"
  | "dkEdge" | "softEdge" | "clear" | "flat" | "softmetal";

/* ----- Text ----- */
export type ST_TextAnchoringType = "t" | "ctr" | "b" | "just" | "dist";
export type ST_TextVertOverflowType = "overflow" | "ellipsis" | "clip";
export type ST_TextHorzOverflowType = "overflow" | "clip";
export type ST_TextVerticalType =
  | "horz" | "vert" | "vert270" | "wordArtVert" | "eaVert"
  | "mongolianVert" | "wordArtVertRtl";
export type ST_TextWrappingType = "none" | "square";
export type ST_TextUnderlineType =
  | "none" | "words" | "sng" | "dbl" | "heavy" | "dotted" | "dottedHeavy"
  | "dash" | "dashHeavy" | "dashLong" | "dashLongHeavy"
  | "dotDash" | "dotDashHeavy" | "dotDotDash" | "dotDotDashHeavy"
  | "wavy" | "wavyHeavy" | "wavyDbl";
export type ST_TextStrikeType = "noStrike" | "sngStrike" | "dblStrike";
export type ST_TextCapsType = "none" | "small" | "all";
export type ST_TextTabAlignType = "l" | "ctr" | "r" | "dec";
export type ST_TextAlignType = "l" | "ctr" | "r" | "just" | "justLow" | "dist" | "thaiDist";
export type ST_TextFontAlignType = "auto" | "t" | "ctr" | "base" | "b";
export type ST_TextAutonumberScheme = string; // 26 preset numbering schemes

/* ----- Animation / build ----- */
export type ST_OnOffStyleType = "on" | "off" | "def";
export type ST_ChartBuildStep =
  | "category" | "ptInCategory" | "series"
  | "ptInSeries" | "allPts" | "gridLegend";
export type ST_DgmBuildStep = "sp" | "bg";
export type ST_AnimationBuildType = "allAtOnce";
export type ST_AnimationDgmOnlyBuildType =
  | "one" | "lvlOne" | "lvlAtOnce";
export type ST_AnimationDgmBuildType = ST_AnimationBuildType | ST_AnimationDgmOnlyBuildType;
export type ST_AnimationChartOnlyBuildType =
  | "series" | "category" | "seriesEl" | "categoryEl";
export type ST_AnimationChartBuildType = ST_AnimationBuildType | ST_AnimationChartOnlyBuildType;

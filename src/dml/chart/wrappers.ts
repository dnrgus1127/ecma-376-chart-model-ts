/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/chart
 * Source:    dml-chart.xsd — simple `val`-attribute wrappers and helpers.
 *
 * Many chart types (CT_Boolean, CT_Double, CT_RotX, CT_GapAmount...) are
 * just ValueElement specializations. They are collapsed here for brevity.
 */

import { ValueElement } from "../../base/index.js";
import type {
  ST_Style,
  ST_RotX,
  ST_RotY,
  ST_Perspective,
  ST_HPercent,
  ST_DepthPercent,
  ST_Thickness,
  ST_GapAmount,
  ST_Overlap,
  ST_BubbleScale,
  ST_HoleSize,
  ST_FirstSliceAng,
  ST_SecondPieSize,
  ST_MarkerSize,
  ST_Order,
  ST_Period,
  ST_Skip,
  ST_AxisUnit,
  ST_LogBase,
  ST_LblOffset,
  ST_Grouping,
  ST_BarGrouping,
  ST_BarDir,
  ST_Shape,
  ST_ScatterStyle,
  ST_RadarStyle,
  ST_OfPieType,
  ST_AxPos,
  ST_Crosses,
  ST_CrossBetween,
  ST_TickMark,
  ST_TickLblPos,
  ST_TimeUnit,
  ST_BuiltInUnit,
  ST_PictureFormat,
  ST_Orientation,
  ST_LblAlgn,
  ST_DLblPos,
  ST_LegendPos,
  ST_DispBlanksAs,
  ST_SplitType,
  ST_SizeRepresents,
  ST_MarkerStyle,
  ST_TrendlineType,
  ST_ErrDir,
  ST_ErrBarType,
  ST_ErrValType,
} from "./simpleTypes.js";

/* ---------- Primitive wrappers ---------- */

export class CT_Boolean extends ValueElement<boolean> { get elementName() { return "b"; } }
export class CT_Double extends ValueElement<number> { get elementName() { return "d"; } }
export class CT_UnsignedInt extends ValueElement<number> { get elementName() { return "u"; } }

/* ---------- 3D view wrappers ---------- */

export class CT_RotX extends ValueElement<ST_RotX> { get elementName() { return "rotX"; } }
export class CT_RotY extends ValueElement<ST_RotY> { get elementName() { return "rotY"; } }
export class CT_HPercent extends ValueElement<ST_HPercent> { get elementName() { return "hPercent"; } }
export class CT_DepthPercent extends ValueElement<ST_DepthPercent> { get elementName() { return "depthPercent"; } }
export class CT_Perspective extends ValueElement<ST_Perspective> { get elementName() { return "perspective"; } }
export class CT_Thickness extends ValueElement<ST_Thickness> { get elementName() { return "thickness"; } }

/* ---------- Plot-area wrappers ---------- */

export class CT_GapAmount extends ValueElement<ST_GapAmount> { get elementName() { return "gapWidth"; } }
export class CT_Overlap extends ValueElement<ST_Overlap> { get elementName() { return "overlap"; } }
export class CT_BubbleScale extends ValueElement<ST_BubbleScale> { get elementName() { return "bubbleScale"; } }
export class CT_FirstSliceAng extends ValueElement<ST_FirstSliceAng> { get elementName() { return "firstSliceAng"; } }
export class CT_HoleSize extends ValueElement<ST_HoleSize> { get elementName() { return "holeSize"; } }
export class CT_SecondPieSize extends ValueElement<ST_SecondPieSize> { get elementName() { return "secondPieSize"; } }
export class CT_MarkerSize extends ValueElement<ST_MarkerSize> { get elementName() { return "size"; } }
export class CT_Order extends ValueElement<ST_Order> { get elementName() { return "order"; } }
export class CT_Period extends ValueElement<ST_Period> { get elementName() { return "period"; } }
export class CT_Skip extends ValueElement<ST_Skip> { get elementName() { return "skip"; } }
export class CT_AxisUnit extends ValueElement<ST_AxisUnit> { get elementName() { return "axisUnit"; } }
export class CT_LogBase extends ValueElement<ST_LogBase> { get elementName() { return "logBase"; } }
export class CT_LblOffset extends ValueElement<ST_LblOffset> { get elementName() { return "lblOffset"; } }
export class CT_Style extends ValueElement<ST_Style> { get elementName() { return "style"; } }

/* ---------- Enum wrappers ---------- */

export class CT_Grouping extends ValueElement<ST_Grouping> { get elementName() { return "grouping"; } }
export class CT_BarGrouping extends ValueElement<ST_BarGrouping> { get elementName() { return "grouping"; } }
export class CT_BarDir extends ValueElement<ST_BarDir> { get elementName() { return "barDir"; } }
export class CT_Shape extends ValueElement<ST_Shape> { get elementName() { return "shape"; } }
export class CT_ScatterStyle extends ValueElement<ST_ScatterStyle> { get elementName() { return "scatterStyle"; } }
export class CT_RadarStyle extends ValueElement<ST_RadarStyle> { get elementName() { return "radarStyle"; } }
export class CT_OfPieType extends ValueElement<ST_OfPieType> { get elementName() { return "ofPieType"; } }
export class CT_AxPos extends ValueElement<ST_AxPos> { get elementName() { return "axPos"; } }
export class CT_Crosses extends ValueElement<ST_Crosses> { get elementName() { return "crosses"; } }
export class CT_CrossBetween extends ValueElement<ST_CrossBetween> { get elementName() { return "crossBetween"; } }
export class CT_TickMark extends ValueElement<ST_TickMark> { get elementName() { return "tickMark"; } }
export class CT_TickLblPos extends ValueElement<ST_TickLblPos> { get elementName() { return "tickLblPos"; } }
export class CT_TimeUnit extends ValueElement<ST_TimeUnit> { get elementName() { return "baseTimeUnit"; } }
export class CT_BuiltInUnit extends ValueElement<ST_BuiltInUnit> { get elementName() { return "builtInUnit"; } }
export class CT_PictureFormat extends ValueElement<ST_PictureFormat> { get elementName() { return "pictureFormat"; } }
export class CT_Orientation extends ValueElement<ST_Orientation> { get elementName() { return "orientation"; } }
export class CT_LblAlgn extends ValueElement<ST_LblAlgn> { get elementName() { return "lblAlgn"; } }
export class CT_DLblPos extends ValueElement<ST_DLblPos> { get elementName() { return "dLblPos"; } }
export class CT_LegendPos extends ValueElement<ST_LegendPos> { get elementName() { return "legendPos"; } }
export class CT_DispBlanksAs extends ValueElement<ST_DispBlanksAs> { get elementName() { return "dispBlanksAs"; } }
export class CT_SplitType extends ValueElement<ST_SplitType> { get elementName() { return "splitType"; } }
export class CT_SizeRepresents extends ValueElement<ST_SizeRepresents> { get elementName() { return "sizeRepresents"; } }
export class CT_MarkerStyleWrap extends ValueElement<ST_MarkerStyle> { get elementName() { return "symbol"; } }
export class CT_TrendlineType extends ValueElement<ST_TrendlineType> { get elementName() { return "trendlineType"; } }
export class CT_ErrDir extends ValueElement<ST_ErrDir> { get elementName() { return "errDir"; } }
export class CT_ErrBarType extends ValueElement<ST_ErrBarType> { get elementName() { return "errBarType"; } }
export class CT_ErrValType extends ValueElement<ST_ErrValType> { get elementName() { return "errValType"; } }

/* ---------- Language wrapper ---------- */

export class CT_TextLanguageID extends ValueElement<string> { get elementName() { return "lang"; } }

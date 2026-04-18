/**
 * Namespace: http://schemas.openxmlformats.org/drawingml/2006/chart
 * Source:    dml-chart.xsd — simpleType definitions.
 */

export type ST_LayoutTarget = "inner" | "outer";
export type ST_LayoutMode = "edge" | "factor";
export type ST_SizeRepresents = "area" | "w";
export type ST_SplitType = "auto" | "cust" | "percent" | "pos" | "val";

export type ST_MarkerStyle =
  | "circle" | "dash" | "diamond" | "dot" | "none" | "picture"
  | "plus" | "square" | "star" | "triangle" | "x" | "auto";

export type ST_TrendlineType = "exp" | "linear" | "log" | "movingAvg" | "poly" | "power";

export type ST_ErrDir = "x" | "y";
export type ST_ErrBarType = "both" | "minus" | "plus";
export type ST_ErrValType = "cust" | "fixedVal" | "percentage" | "stdDev" | "stdErr";

export type ST_Grouping = "percentStacked" | "standard" | "stacked";
export type ST_BarGrouping = "percentStacked" | "clustered" | "standard" | "stacked";
export type ST_BarDir = "bar" | "col";
export type ST_Shape = "cone" | "coneToMax" | "box" | "cylinder" | "pyramid" | "pyramidToMax";

export type ST_ScatterStyle = "none" | "line" | "lineMarker" | "marker" | "smooth" | "smoothMarker";
export type ST_RadarStyle = "standard" | "marker" | "filled";
export type ST_OfPieType = "pie" | "bar";

export type ST_AxPos = "b" | "l" | "r" | "t";
export type ST_Crosses = "autoZero" | "max" | "min";
export type ST_CrossBetween = "between" | "midCat";
export type ST_TickMark = "cross" | "in" | "none" | "out";
export type ST_TickLblPos = "high" | "low" | "nextTo" | "none";
export type ST_TimeUnit = "days" | "months" | "years";
export type ST_BuiltInUnit =
  | "hundreds" | "thousands" | "tenThousands" | "hundredThousands"
  | "millions" | "tenMillions" | "hundredMillions" | "billions" | "trillions";
export type ST_PictureFormat = "stretch" | "stack" | "stackScale";
export type ST_Orientation = "maxMin" | "minMax";
export type ST_LblAlgn = "ctr" | "l" | "r";
export type ST_DLblPos =
  | "bestFit" | "b" | "ctr" | "inBase" | "inEnd" | "l" | "outEnd" | "r" | "t";
export type ST_LegendPos = "b" | "tr" | "l" | "r" | "t";
export type ST_DispBlanksAs = "span" | "gap" | "zero";

export type ST_PageSetupOrientation = "default" | "portrait" | "landscape";

/* ---- numeric / union restrictions (modeled as plain numbers/strings) ---- */
export type ST_RotX = number;                    // -90..90
export type ST_RotY = number;                    // 0..360
export type ST_Perspective = number;             // 0..240
export type ST_HPercent = number | string;       // 5..500 or "NN%"
export type ST_DepthPercent = number | string;   // 20..2000 or "NN%"
export type ST_Thickness = number | string;      // unsigned int or percent
export type ST_GapAmount = number | string;      // 0..500 or "NN%"
export type ST_Overlap = number | string;        // -100..100 or "NN%"
export type ST_BubbleScale = number | string;    // 0..300 or "NN%"
export type ST_FirstSliceAng = number;           // 0..360
export type ST_HoleSize = number | string;       // 1..90 or "NN%"
export type ST_SecondPieSize = number | string;  // 5..200 or "NN%"
export type ST_MarkerSize = number;              // 2..72
export type ST_Order = number;                   // 2..6
export type ST_Period = number;                  // >=2
export type ST_Skip = number;                    // >=1
export type ST_AxisUnit = number;                // > 0
export type ST_LogBase = number;                 // 2..1000
export type ST_LblOffset = number | string;      // 0..1000 or "NN%"
export type ST_Style = number;                   // 1..48

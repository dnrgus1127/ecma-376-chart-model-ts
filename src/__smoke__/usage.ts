/**
 * Smoke test — construct a minimal chart and verify the class hierarchy,
 * inheritance, and get/set pairs round-trip as expected.
 *
 * Run with: npx tsc && node dist/__smoke__/usage.js
 */

/// <reference types="node" />

import { dml, shared } from "../index.js";

const { chart, main } = dml;

// Build a tiny bar chart with a single series.
const cs = new chart.CT_ChartSpace();

const style = new chart.CT_Style();
style.val = 12;
cs.style = style;

const logical = new chart.CT_Chart();
cs.chart = logical;

const plotArea = new chart.CT_PlotArea();
logical.plotArea = plotArea;

// Create a bar chart
const bar = new chart.CT_BarChart();
const barDir = new chart.CT_BarDir();
barDir.val = "col";
bar.barDir = barDir;
const grouping = new chart.CT_BarGrouping();
grouping.val = "clustered";
bar.grouping = grouping;
plotArea.addChart(bar);

// Add a series, exercise inherited EG_SerShared via SeriesBase
const ser = bar.addSeries();
const idx = new chart.CT_UnsignedInt();
idx.val = 0;
ser.idx = idx;

// Series shape properties — reuses CT_ShapeProperties from dml-main
const spPr = new main.CT_ShapeProperties();
const solid = new main.CT_SolidColorFillProperties();
const srgb = new main.CT_SRgbColor();
srgb.val = "4472C4"; // typed as ST_HexColorRGB (alias of string)
const tint = new main.CT_Tint();
tint.val = 50;
srgb.addTransform(tint);
solid.choice = srgb;
spPr.fill = solid;

const line = new main.CT_LineProperties();
line.w = 12700;
line.cap = "rnd";
spPr.line = line;

ser.spPr = spPr;

// Axis example — shared EG_AxShared via AxBase
const valAx = new chart.CT_ValAx();
const axId = new chart.CT_UnsignedInt();
axId.val = 111;
valAx.axId = axId;
const axPos = new chart.CT_AxPos();
axPos.val = "l";
valAx.axPos = axPos;
plotArea.addAxis(valAx);

// Prove the typed getters round-trip the values
const seriesOut = bar.series[0];
console.log("series.idx.val:", seriesOut?.idx?.val);
console.log("series.fill is solid:", seriesOut?.spPr?.fill instanceof main.CT_SolidColorFillProperties);
console.log("srgb color preserved:", (seriesOut?.spPr?.fill as main.CT_SolidColorFillProperties)?.choice instanceof main.CT_SRgbColor);
console.log("line width:", seriesOut?.spPr?.line?.w);
console.log("valAx axPos:", valAx.axPos?.val);
console.log("chart style val:", cs.style?.val);

// Verify shared type aliases exist
const lang: shared.ST_Lang = "ko-KR";
console.log("lang:", lang);

/* ---------- Round-trip checks for formerly mismodeled fields ---------- */

// CT_NumRef.f / CT_NumData.formatCode / CT_NumData.ptCount / CT_NumVal.v
const numRef = new chart.CT_NumRef();
numRef.f = "Sheet1!$A$1:$A$3";
const numData = new chart.CT_NumData();
numData.formatCode = "0.00";
numData.ptCount = 3;
const pt0 = new chart.CT_NumVal();
pt0.idx = 0; // attribute (correct)
pt0.v = "1.5"; // now a child <c:v>
numData.addPoint(pt0);
numRef.numCache = numData;

// Make sure values persist as child elements, not attributes.
const roundtripF = numRef.f;
const roundtripFmt = numRef.numCache?.formatCode;
const roundtripPtCount = numRef.numCache?.ptCount;
const roundtripV = numRef.numCache?.points[0]?.v;
console.log("numRef.f:", roundtripF);
console.log("numCache.formatCode:", roundtripFmt);
console.log("numCache.ptCount:", roundtripPtCount);
console.log("numVal.v:", roundtripV);

// The <c:f>, <c:formatCode>, <c:ptCount>, <c:v> must live as children now.
const fNode = numRef.getChildren().find((c) => c.elementName === "f");
const fmtNode = numData.getChildren().find((c) => c.elementName === "formatCode");
const ptCountNode = numData.getChildren().find((c) => c.elementName === "ptCount");
const vNode = pt0.getChildren().find((c) => c.elementName === "v");
console.log("f is a child element:", fNode !== undefined);
console.log("formatCode is a child element:", fmtNode !== undefined);
console.log("ptCount is a child element:", ptCountNode !== undefined);
console.log("v is a child element:", vNode !== undefined);

// idx should remain an attribute on CT_NumVal (per XSD).
console.log("numVal.idx is attribute:", pt0.hasAttr("idx"));

// CT_DPt.idx / CT_DLbl.idx — must be child CT_UnsignedInt, not attribute.
const dPt = new chart.CT_DPt();
dPt.idx = 5;
console.log("dPt.idx round-trip:", dPt.idx);
console.log("dPt.idx is child, not attr:", !dPt.hasAttr("idx") && dPt.getChildren().some((c) => c.elementName === "idx"));

const dLbl = new chart.CT_DLbl();
dLbl.idx = 2;
console.log("dLbl.idx round-trip:", dLbl.idx);
console.log("dLbl.idx is child, not attr:", !dLbl.hasAttr("idx") && dLbl.getChildren().some((c) => c.elementName === "idx"));

// CT_PivotSource.name / CT_Trendline.name — child elements.
const pivot = new chart.CT_PivotSource();
pivot.name = "MyPivot";
console.log("pivot.name round-trip:", pivot.name);
console.log("pivot.name is child, not attr:", !pivot.hasAttr("name") && pivot.getChildren().some((c) => c.elementName === "name"));

const trend = new chart.CT_Trendline();
trend.name = "Linear (Series 1)";
console.log("trend.name round-trip:", trend.name);
console.log("trend.name is child, not attr:", !trend.hasAttr("name") && trend.getChildren().some((c) => c.elementName === "name"));

// CT_SerTx.v and CT_StrRef.f should also work.
const serTx = new chart.CT_SerTx();
serTx.v = "My Series";
console.log("serTx.v round-trip:", serTx.v);

const strRef = new chart.CT_StrRef();
strRef.f = "Sheet1!$A$1";
console.log("strRef.f round-trip:", strRef.f);

// Undefined assignment should remove the child element.
pt0.v = undefined;
console.log("numVal.v removed:", pt0.v === undefined && !pt0.getChildren().some((c) => c.elementName === "v"));

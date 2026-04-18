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

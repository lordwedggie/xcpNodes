/* ================ Set default values ================ */
//derpPanelOpen: 1
const derpNode = {
    DerpValue: 0.50,
    Min: 0.00,
    Max: 1.00,
    Decimals: 2,
    Step: 0.01,
    StepMult: 1.00,
    HeaderText: "DerpNode",
};

const derpCanvas = {
    X: 0,
    Y: - LiteGraph.NODE_TITLE_HEIGHT,
    W: 200,
    H: 40,
    C: [8, 8, 8, 8],
    HeaderFont: "DengXian",
    OutputFont: "DengXian light",
    ContentRatio: 0.5,
    AutoFontRatio: 0.5,
    HeaderFontSize: 0,
    OutputFontSize: 0,
    TextMarginX: 4,
    TextMarginY: 0,
    mTop: 4,
    mBottom: 4,
    mLeft: 4,
    mRight: 4,
    CanvasCorner: 8,
    ContentCorner: 6,
    SlotOffset: [-8, -32],
    TextAlignment: "split",
    textAlign: [],
    stashedTitle: "xcp",
    Content_Pos: [],
    DrawHeader: true,
    Header_Pos: [0, 0, 0, 0],
    HeaderText_pos: [0, 0],
    OutputText_pos: [0, 0],
};

const derpPalette = {
    c_CanvasBG: "045, 045, 045, 1",
    c_HeaderBG: "065, 065, 065, 1",
    ContentBG: "035, 035, 035, 1",
    HeaderTextColor: "255, 255, 255, 0.5",
    OutputTextColor: "255, 255, 255, 0.8",
};

const derpEffects = {
    GlobalFX: true,
    CanvasStroke: false,
    CanvasStrokeWeight: 1,
    CanvasShadow: true,
    CanvasShadowBlur: 8,
    CanvasFX_Xoffset: 0,
    CanvasFX_Yoffset: 2,
    ContentStroke: false,
    ContentStrokeWeight: 1,
    ContentShadow: false,
    ContentShadowBlur: 8,
    ContentFX_Xoffset: 0,
    ContentFX_Yoffset: 2,
};

const derpEffectPalette = {
    c_CanvasStroke: "045, 045, 045, 1.00",
    c_CanvasFX: "000, 000, 000, 0.50",
    c_ContentStroke: "025, 025, 025, 1.00",
    c_ContentFX: "000, 000, 000, 0.50",
};
export const contentOptions = [
    { title: "🟩 Node Settings" },
    { tip: "* imported" },
    { name: "Header text:", value: derpNode.HeaderText },
    { name: "Min Value:", value: derpNode.Min, min: 0, max: 1, step: 0.01, stepX: 2 },
    { name: "Max Value:", value: derpNode.Max, min: 0, max: 1, step: 0.01, stepX: 2 },
    { name: "Decimals:", value: derpNode.Decimals, min: 0, max: 4, step: 1, stepX: 2 },
    { name: "Step:", value: derpNode.Step, min: 0, max: 1, step: 0.01, stepX: 2 },
    { name: "Step multiplier:", value: derpNode.StepMult, min: 0, max: 10, step: 0.01, stepX: 2 },
    { name: "Close panel:", value: "OK" }
];
//derpPanelOpen: 2
export const canvasOptions = [
    { title: "🟨 Canvas layout" },
    { tip: "* Set font sizes to zero to use auto fontSize" },
    { name: "Width:", value: derpCanvas.W, min: 100, max: 400, step: 10, stepX: 5 },
    { name: "Height:", value: derpCanvas.H, min: 30, max: 400, step: 10, stepX: 5 },
    { name: "Canvas corner:", value: derpCanvas.CanvasCorner, min: 0, max: 12, step: 1, stepX: 2 },
    { name: "Content corner:", value: derpCanvas.ContentCorner, min: 0, max: 12, step: 1, stepX: 2 },
    { name: "Header font:", value: derpCanvas.HeaderFont },
    { name: "Output font:", value: derpCanvas.OutputFont },
    { name: "Header/Content:", value: derpCanvas.ContentRatio, min: 0.1, max: 0.9, step: 0.1, stepX: 0.2 },
    { name: "AutoFont ratio:", value: derpCanvas.AutoFontRatio, min: 0, max: 2, step: 0.1, stepX: 0.2 },
    { name: "*Header fontSize:", value: derpCanvas.HeaderFontSize, min: 0, max: 24, step: 1, stepX: 2 },
    { name: "*Output fontSize:", value: derpCanvas.OutputFontSize, min: 0, max: 24, step: 1, stepX: 2 },
    { name: "Text MarginX:", value: derpCanvas.TextMarginX, min: -100, max: 100, step: 1, stepX: 0.5 },
    { name: "Text MarginY:", value: derpCanvas.TextMarginY, min: -100, max: 100, step: 1, stepX: 0.5 },
    { name: "Margin top:", value: derpCanvas.mTop, min: 0, max: 10, step: 1, stepX: 2 },
    { name: "Margin bottom:", value: derpCanvas.mBottom, min: 0, max: 10, step: 1, stepX: 2 },
    { name: "Margin left:", value: derpCanvas.mLeft, min: 0, max: 10, step: 1, stepX: 2 },
    { name: "Margin right:", value: derpCanvas.mRight, min: 0, max: 10, step: 1, stepX: 2 },
    { name: "Slot offsetX:", value: derpCanvas.SlotOffset[0], min: -50, max: 50, step: 1, stepX: 0.5 },
    { name: "Slot offsetY:", value: derpCanvas.SlotOffset[1], min: -50, max: 50, step: 1, stepX: 0.5 },
    { name: "Close panel:", value: "OK" }
];
//derpPanelOpen: 3
export const paletteOptions = [
    { title: "🟦 Main Palette" },
    { tip: "* Set color first then use buttons to adjust brightness" },
    { name: "Canvas BG:", value: derpPalette.c_CanvasBG },
    { name: "Header BG:", value: derpPalette.c_HeaderBG },
    { name: "Content BG:", value: derpPalette.ContentBG },
    { name: "Header text:", value: derpPalette.HeaderTextColor },
    { name: "Output text:", value: derpPalette.OutputTextColor },
    { name: "Close panel:", value: "OK" }
];
//derpPanelOpen: 4
export const effectsOptions = [
    { title: "🟪 Effects options" },
    { tip: "* Shadows can 'glow' with brighter colors" },
    { name: "Canvas stroke weight:", value: derpEffects.CanvasStrokeWeight, min: 0, max: 10, step: 1, stepX: 0.2 },
    { name: "Canvas shadow blur:", value: derpEffects.CanvasShadowBlur, min: 0, max: 20, step: 1, stepX: 0.2 },
    { name: "Canvas shadow X offset:", value: derpEffects.CanvasFX_Xoffset, min: -10, max: 10, step: 1, stepX: 0.2 },
    { name: "Canvas shadow Y offset:", value: derpEffects.CanvasFX_Yoffset, min: -10, max: 10, step: 1, stepX: 0.2 },
    { name: "Content stroke weight:", value: derpEffects.ContentStrokeWeight, min: 0, max: 10, step: 1, stepX: 0.2 },
    { name: "Content shadow blur:", value: derpEffects.ContentShadowBlur, min: 0, max: 20, step: 1, stepX: 0.2 },
    { name: "Content shadow X offset:", value: derpEffects.ContentFX_Xoffset, min: -10, max: 10, step: 1, stepX: 0.2 },
    { name: "Content shadow Y offset:", value: derpEffects.ContentFX_Yoffset, min: -10, max: 10, step: 1, stepX: 0.2 },
    { name: "Close panel:", value: "OK" }
];
//derpPanelOpen: 5
export const effectsPaletteOptions = [
    { title: "🟪 Effects palette" },
    { tip: "* settings can be saved using ComfyUI's template feature" },
    { name: "Canvas stroke:", value: derpEffectPalette.c_CanvasStroke },
    { name: "Canvas FX:", value: derpEffectPalette.c_CanvasFX },
    { name: "Content stroke:", value: derpEffectPalette.c_ContentStroke },
    { name: "Content FX:", value: derpEffectPalette.c_ContentFX },
    { name: "Close panel:", value: "OK" }
]; 

export const test = [
    { title: "🟪 Effects palette" },
    { tip: "* settings can be saved using ComfyUI's template feature" },
    { name: "Canvas stroke:", value: derpEffectPalette.c_CanvasStroke },
    { name: "Canvas FX:", value: derpEffectPalette.c_CanvasFX },
    { name: "Content stroke:", value: derpEffectPalette.c_ContentStroke },
    { name: "Content FX:", value: derpEffectPalette.c_ContentFX },
    { name: "Close panel:", value: "OK" }
]; 
// DerpNode: derpBaseAlpha by lordwedggie
import { app } from "../../scripts/app.js";
import { simpleRGBA, getRGBA, getMidpointColor, validateRGBA, resetEffects } from "./herbina/xcpShitUtils.js";
import { contentOptions, canvasOptions, paletteOptions, effectsOptions, effectsPaletteOptions, } from "./herbina/optionPanels.js";
//==========================LGraph registration/==========================
class derpBaseAlpha {
    constructor(node) {
        this.node = node;
        this.node.prop = this.node.properties || {};
        this.node.prop.derpNode = {
            DerpValue: 0.50,
            Min: 0.00,
            Max: 1.00,
            Decimals: 2,
            Step: 0.01,
            StepMult: 1.00,
            HeaderText: "DerpNode",
        };
        this.node.prop.derpNodeOptions = contentOptions;
        this.node.prop.derpCanvas = {
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
            TextAlignment: "split",
            stashedTitle: "xcp",
            DrawHeader: true,
            SlotOffset: [-8, -32],
            textAlign: [],
            Content_Pos: [],
            Header_Pos: [0,0,0,0],
            HeaderText_pos: [0,0],
            OutputText_pos: [0, 0],
            PadRigaht: 16,
            PadLeft: 16,
        };
        this.node.prop.derpPalette = {
            c_CanvasBG: "045, 045, 045, 1",
            c_HeaderBG: "065, 065, 065, 1",
            ContentBG: "035, 035, 035, 1",
            HeaderTextColor: "255, 255, 255, 0.5",
            OutputTextColor: "255, 255, 255, 0.8",
        };
        this.node.prop.derpPaletteOptions = paletteOptions;
        this.node.prop.derpEffects = {
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
        this.node.prop.derpEffectPalette = {
            c_CanvasStroke: "045, 045, 045, 1.00",
            c_CanvasFX: "000, 000, 000, 0.50",
            c_ContentStroke: "025, 025, 025, 1.00",
            c_ContentFX: "000, 000, 000, 0.50",
        };
        this.node.prop.HideLinks = true;
        this.node.prop.CanvasOffset = 0;
        this.node.prop.CanvasWidthFix = 0.0;
        this.node.prop.derpValue = 0.50;
        /* ================ unsaved globals ================ */
        let padLeft = 0;

        let currentShape = "FULL";
        let derpPanelOpen = 0;
        let derpOutputPos = []; //position of the output slot on the derpUI
        let outputIsConnected = 0;  //if output is connected to at least one node
        let outputNodeID = null;    //the last node connected to, output slot will be moved there
        let targetNode = node;      //the node connected to the output slot
        let targetslotOffsetY = 0;  //offset for target slot other than #0
        let inputIsConnected = 0;   //same, not used for now

        let outputTargetPos = [0, 0];   //connected target slot pos, for moving our own slot
        ///let derpPanel = { X: 0, Y: 0, W: 0, H: 0, C: 8, margin: 4, font1: 12, font2: 8 };
        //const subTextTemp = "1155.00";     //for testing, move to prop later
        let derpOptions = [{}];        
        this.node.onConfigure = function () {
            this.configured = true;
        };
        /* ================ onAdded ================ */
        this.node.onAdded = function () {
            const { derpCanvas, derpNode, derpPalette, derpEffects, derpEffectPalette } = this.prop;
            //set initial state, making comfy node fully transparent EXCEPT THAT FUCKING HORIZONTAL LINE!
            this.collapsable = false;
            this.convertWidgetToInput = false;
            this.color = "#0000";
            this.bgcolor = "#0000";
            this.boxcolor = "#0000";
            this.widgets[0].type = "hidden";
            this.outputs[0].name = "";
            app.canvas.render_canvas_border = false; //removes links border, else hide links won't work. credit to Webfiltered_21234, Element    

            this.prop.derpCanvas.TextAlignment = "split";
            this.size = [this.prop.derpCanvas.W, this.prop.derpCanvas.H - LiteGraph.NODE_TITLE_HEIGHT];
            derpOutputPos = [this.prop.derpCanvas.W + this.prop.derpCanvas.SlotOffset[0], this.prop.derpCanvas.SlotOffset[1] + LiteGraph.NODE_TITLE_HEIGHT];
            this.outputs[0].pos = derpOutputPos;
            this.addWidget;
            this.prop.derpCanvas.stashedTitle = this.title;
            this.title = "DerpBase";
            this.setDirtyCanvas(true, true);
        };
        this.node.onPropertyChanged = function (Name) {
            if (!this.configured) return;
            if (Name === "CanvasCorner") this.CanvasShapeChange(currentShape);
            //derpOutputPos = [this.prop.derpCanvas.W - this.prop.derpCanvas.SlotOffset[0], this.prop.derpCanvas.SlotOffset[1] - LiteGraph.NODE_TITLE_HEIGHT];
            this.setDirtyCanvas(true, true);
        }

        /* ================ onDrawForeground ================ */
        this.node.onDrawForeground = function (ctx) {
            const { derpCanvas, derpNode, derpEffects, derpEffectPalette, derpPalette } = this.prop;
            if (outputIsConnected) {
                node.updateDerpSlot();
            } else {
                derpCanvas.PadRight = 12;
                this.outputs[0].pos = derpOutputPos;
            }

            if (this.title !== this.prop.derpCanvas.stashedTitle) {
                this.prop.derpNode.HeaderText = this.title;
                this.prop.derpCanvas.stashedTitle = "xcp";
                this.title = "xcp";
            }

            if (derpPanelOpen === 0) {
                this.size = [this.prop.derpCanvas.W, this.prop.derpCanvas.H - LiteGraph.NODE_TITLE_HEIGHT];
            }

            derpOutputPos = [this.prop.derpCanvas.W + this.prop.derpCanvas.SlotOffset[0], this.prop.derpCanvas.SlotOffset[1] + LiteGraph.NODE_TITLE_HEIGHT];
            if (derpPanelOpen !== 0) {
                node.derpPanel(ctx);
            }
            const applyGlobalFX = (ctx) => {
                ctx.shadowColor = getRGBA("0,0,0,0.5");
                ctx.shadowBlur = 8;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
            };

            if (derpEffects.GlobalFX) {
                applyGlobalFX(ctx);
            } else {
                resetEffects(ctx);
            }

            // Draw Canvas
            ctx.fillStyle = getRGBA(derpPalette.c_CanvasBG);
            ctx.beginPath();
            if (derpEffects.CanvasShadow) {
                ctx.shadowColor = getRGBA(derpEffectPalette.c_CanvasFX);
                ctx.shadowBlur = derpEffects.CanvasShadowBlur;
                ctx.shadowOffsetX = derpEffects.CanvasFX_Xoffset;
                ctx.shadowOffsetY = derpEffects.CanvasFX_Yoffset;
            }
            ctx.roundRect(this.prop.derpCanvas.X, this.prop.derpCanvas.Y, this.prop.derpCanvas.W, this.prop.derpCanvas.H, this.prop.derpCanvas.C);
            ctx.fill();
            ctx.lineWidth = derpEffects.CanvasStrokeWeight;

            // canvas stroke
            if (derpEffects.CanvasStroke) {
                ctx.lineWidth = derpEffects.CanvasStrokeWeight;
                ctx.strokeStyle = getRGBA(derpEffectPalette.c_CanvasStroke);
                ctx.stroke();
            }

            if (derpEffects.GlobalFX) {
                applyGlobalFX(ctx);
            } else {
                resetEffects(ctx);
            }

            // Draw Content shadow
            if (derpEffects.ContentShadow) {
                ctx.shadowColor = getRGBA(derpEffectPalette.c_ContentFX);
                ctx.shadowBlur = derpEffects.ContentFX_Blur;
                ctx.shadowOffsetX = derpEffects.ContentFX_Xoffset;
                ctx.shadowOffsetY = derpEffects.ContentFX_Yoffset;
            }

            this.prop.derpCanvas.Content_Pos = [
                this.prop.derpCanvas.mLeft + padLeft,
                this.prop.derpCanvas.Y + this.prop.derpCanvas.mTop,
                this.prop.derpCanvas.W - this.prop.derpCanvas.mLeft - this.prop.derpCanvas.mRight - padLeft - derpCanvas.PadRight - 2,
                this.prop.derpCanvas.H - this.prop.derpCanvas.mTop - this.prop.derpCanvas.mBottom
            ];

            // Draw content BG
            const [contentX, contentY, contentW, contentH] = this.prop.derpCanvas.Content_Pos;
            ctx.beginPath();
            ctx.fillStyle = getRGBA(derpPalette.ContentBG);
            ctx.roundRect(contentX, contentY, contentW, contentH, this.prop.derpCanvas.ContentCorner);
            ctx.fill();

            if (derpEffects.GlobalFX) {
                applyGlobalFX(ctx);
            } else {
                resetEffects(ctx);
            }
            //ctx.fillStyle = getRGBA(derpPalette.c_HeaderBG);

            // Draw Header
            resetEffects(ctx);
            let headerH = derpCanvas.DrawHeader ? Math.round(contentH * derpCanvas.ContentRatio) : 0;
            this.prop.derpCanvas.Header_pos = [this.prop.derpCanvas.mLeft + derpCanvas.PadLeft, this.prop.derpCanvas.Y + this.prop.derpCanvas.mTop, headerH];
            if (derpCanvas.DrawHeader) {
                headerH = Math.round((this.prop.derpCanvas.H - this.prop.derpCanvas.mTop - this.prop.derpCanvas.mBottom) * derpCanvas.ContentRatio);
                this.prop.derpCanvas.Header_pos[1] = headerH;
                ctx.beginPath();
                ctx.fillStyle = getRGBA(derpPalette.c_HeaderBG);
                ctx.roundRect(contentX, contentY, contentW, headerH, [derpCanvas.ContentCorner, derpCanvas.ContentCorner, 0, 0]);
                ctx.fill();
            }
            // Draw stroke (header and content)
            ctx.beginPath();
            ctx.fillStyle = getRGBA ("0, 0, 0, 0"); //draw invisible area for stroke, remove later by changing draw order
            ctx.roundRect(contentX, contentY, contentW, contentH, this.prop.derpCanvas.ContentCorner);
            ctx.fill();
            if (derpEffects.ContentStroke) {
                ctx.lineWidth = derpEffects.ContentStrokeWeight;
                ctx.strokeStyle = getRGBA ( derpEffectPalette.c_ContentStroke );
                ctx.stroke();
            }

            // Draw Text
            const headerFontSize = this.prop.derpCanvas.HeaderFontSize || (contentH * this.prop.derpCanvas.AutoFontRatio / 2);
            const outputFontSize = this.prop.derpCanvas.OutputFontSize || (contentH * this.prop.derpCanvas.AutoFontRatio / 2);
            node.updateTextAlignment(ctx, this.prop.derpCanvas.TextAlignment, headerFontSize, outputFontSize);

            // HeaderText
            ctx.fillStyle = getRGBA(this.prop.derpPalette.HeaderTextColor);
            ctx.textAlign = this.prop.derpCanvas.textAlign[0];
            ctx.textBaseline = "middle";
            ctx.font = `${headerFontSize}px ${this.prop.derpCanvas.HeaderFont}`;
            ctx.fillText(this.prop.derpNode.HeaderText, this.prop.derpCanvas.HeaderText_pos[0], this.prop.derpCanvas.HeaderText_pos[1]);

            // outputText
            ctx.fillStyle = getRGBA(this.prop.derpPalette.OutputTextColor);
            ctx.textAlign = this.prop.derpCanvas.textAlign[1];
            ctx.font = `${outputFontSize}px ${this.prop.derpCanvas.OutputFont}`;
            ctx.fillText(derpNode.DerpValue, this.prop.derpCanvas.OutputText_pos[0], this.prop.derpCanvas.OutputText_pos[1]);
        };
        // -------------------- Text alignment handler --------------------
        this.node.updateTextAlignment = function (ctx, derpKey, headerFontSize, outputFontSize) {
            const { derpCanvas, derpNode} = this.prop;
            const { TextMarginX, TextMarginY, Content_Pos, OutputFont, HeaderFont } = derpCanvas;
            const rightSpace = 4;
            ctx.font = `${outputFontSize}px ${OutputFont}`;
            const outputTextWidth = ctx.measureText(derpNode.DerpValue).width; // REMEBER TO REPLACE THE TEMP!!!
            ctx.font = `${headerFontSize}px ${HeaderFont}`;
            const headerTextWidth = ctx.measureText(derpNode.HeaderText).width;
            //const combinedWidth = outputTextWidth + headerTextWidth;
            let textY = 10;
            if (!derpCanvas.DrawHeader) {
                textY = Content_Pos[1] + Content_Pos[3] / 2 + TextMarginY;
            } else {
                textY = Content_Pos[1] + Content_Pos[3] * derpCanvas.ContentRatio  / 2 + TextMarginY;
            }
            //const textY = Content_Pos[1] + derpCanvas.mTop + TextMarginY + (derpCanvas.DrawHeader ? Content_Pos[3] * derpCanvas.ContentRatio : Content_Pos[3] / 2);
            switch (derpKey) {
                case "left":
                    derpCanvas.HeaderText_pos = [Content_Pos[0] + TextMarginX, textY];
                    derpCanvas.OutputText_pos = [derpCanvas.HeaderText_pos[0] + headerTextWidth + TextMarginX, textY];
                    derpCanvas.textAlign = ["left", "left"];
                    break;
                case "split":
                    derpCanvas.HeaderText_pos = [Content_Pos[0] + TextMarginX, textY];
                    derpCanvas.OutputText_pos = [Content_Pos[2] - TextMarginX, textY];
                    derpCanvas.textAlign = ["left", "right"];
                    break;
                case "center":
                    derpCanvas.HeaderText_pos = [Content_Pos[0] + TextMarginX + (Content_Pos[2] - outputTextWidth - headerTextWidth) / 2, textY];
                    derpCanvas.OutputText_pos = [derpCanvas.HeaderText_pos[0] + headerTextWidth + TextMarginX, textY];
                    derpCanvas.textAlign = ["left", "left"];
                    break;
                case "right":
                    derpCanvas.HeaderText_pos = [Content_Pos[2] - TextMarginX - outputTextWidth - rightSpace, textY];
                    derpCanvas.OutputText_pos = [Content_Pos[2] - TextMarginX, textY];
                    derpCanvas.textAlign = ["right", "right"];
                    break;
                default:
                    // Add default case logic if needed
                    break;
            }
        }
        /* ================ onConnectionsChange ================ */
        this.node.onConnectionsChange = function (slotType, slot, isChangeConnect, link_info, output) {
            const { derpCanvas} = this.prop;
            outputIsConnected = this.outputs[0].links.length;

            if (outputIsConnected > 0 && link_info && link_info.id != null && this.graph.links[link_info.id]) {
                const linkID = link_info.id;
                this.graph.links[linkID].color = this.prop.HideLinks ? getRGBA("0, 0, 0, 0") : LiteGraph.LINK_COLOR;
                this.graph.links[linkID].color_off = this.prop.HideLinks ? getRGBA("0, 0, 0, 0") : LiteGraph.LINK_COLOR;
                outputNodeID = this.graph.links[linkID].target_id;
                // Access the target node
                targetNode = this.graph.getNodeById(outputNodeID);

                if (targetNode && targetNode.inputs && targetNode.inputs.length > 0) {

                    targetslotOffsetY = LiteGraph.NODE_SLOT_HEIGHT * (targetNode.graph.links[linkID].target_slot + 1) - (LiteGraph.NODE_SLOT_HEIGHT * (Math.PI / 10) ); 
                    outputTargetPos = [
                        targetNode.pos[0] - this.pos[0] + LiteGraph.NODE_SLOT_HEIGHT / 2,
                        targetNode.pos[1] - this.pos[1] + targetslotOffsetY// + this.prop.derpCanvas.SlotOffset[1],
                    ];
                }
                derpCanvas.PadRight = 0;
            } else {
                derpCanvas.PadRight = 12;

            }
        }
        /* ================ Mouse Stuff ================ */
        this.node.onMouseDown = function (derp, pos, canvas) {
            const { derpCanvas, derpNode, derpPalette, derpEffects, derpEffectPalette } = this.prop;
            const derpX = derp.canvasX - this.pos[0];
            const derpY = derp.canvasY - this.pos[1];

            const withinBounds = (x, y, w, h) => {
                const withinXBounds = derpX > x && derpX < x + w;
                const withinYBounds = derpY > y && derpY < y + h;
                return withinXBounds && withinYBounds;
            };
            if (derpPanelOpen) {
                if (derp.canvasX < this.prop.derpCanvas.W) return false;
                let currentY =0 ;
                const btnH = derpPanel.font2 * 2;                
                const spacingY = 8;
                derpOptions.slice(2).forEach(option => {
                    const handleOptionChange = (option, clampedValue) => {
                        switch (derpPanelOpen) {
                            case 1:
                                if (option.name === "Min Value:") derpNode.Min = clampedValue;
                                if (option.name === "Max Value:") derpNode.Max = clampedValue;
                                if (option.name === "Decimals:") derpNode.Decimals = clampedValue;
                                if (option.name === "Step:") derpNode.Step = clampedValue;
                                if (option.name === "Step multiplier:") derpNode.StepMult = clampedValue;
                                if (option.name === "Header text:") derpNode.HeaderText = clampedValue;
                                break;
                            case 2:
                                if (option.name === "Width:") derpCanvas.W = clampedValue;
                                if (option.name === "Height:") derpCanvas.H = clampedValue;
                                if (option.name === "Canvas corner:") { derpCanvas.CanvasCorner = clampedValue; this.CanvasShapeChange(currentShape); }
                                if (option.name === "Content corner:") derpCanvas.ContentCorner = clampedValue;
                                if (option.name === "Text MarginX:") derpCanvas.TextMarginX = clampedValue;
                                if (option.name === "*Header fontSize:") derpCanvas.HeaderFontSize = clampedValue;
                                if (option.name === "*Output fontSize:") derpCanvas.OutputFontSize = clampedValue;
                                if (option.name === "Header/Content:") derpCanvas.ContentRatio = clampedValue;
                                if (option.name === "AutoFont ratio:") derpCanvas.AutoFontRatio = clampedValue;
                                if (option.name === "Header font:") derpCanvas.HeaderFont = clampedValue;
                                if (option.name === "Output font:") derpCanvas.OutputFont = clampedValue;
                                if (option.name === "Text MarginY:") derpCanvas.TextMarginY = clampedValue;
                                if (option.name === "Margin top:") derpCanvas.mTop = clampedValue;
                                if (option.name === "Margin bottom:") derpCanvas.mBottom = clampedValue;
                                if (option.name === "Margin left:") derpCanvas.mLeft = clampedValue;
                                if (option.name === "Margin right:") derpCanvas.mRight = clampedValue;
                                if (option.name === "Slot offsetX:") derpCanvas.SlotOffset[0] = clampedValue;
                                if (option.name === "Slot offsetY:") derpCanvas.SlotOffset[1] = clampedValue;
                                break;
                            case 3:
                                if (option.name === "Canvas BG:") derpPalette.c_CanvasBG = clampedValue;
                                if (option.name === "Header BG:") derpPalette.c_HeaderBG = clampedValue;
                                if (option.name === "Content BG:") derpPalette.ContentBG = clampedValue;
                                if (option.name === "Header text:") derpPalette.HeaderTextColor = clampedValue;
                                if (option.name === "Output text:") derpPalette.OutputTextColor = clampedValue;
                                break;
                            case 4:
                                if (option.name === "Canvas stroke weight:") derpEffects.CanvasStrokeWeight = clampedValue;
                                if (option.name === "Content stroke weight:") derpEffects.ContentStrokeWeight = clampedValue;
                                if (option.name === "Canvas shadow blur:") derpEffects.CanvasShadowBlur = clampedValue;
                                if (option.name === "Content shadow blur:") derpEffects.ContentShadowBlur = clampedValue;
                                if (option.name === "Canvas shadow X offset:") derpEffects.CanvasFX_Xoffset = clampedValue;
                                if (option.name === "Canvas shadow Y offset:") derpEffects.CanvasFX_Yoffset = clampedValue;
                                if (option.name === "Content shadow X offset:") derpEffects.ContentFX_Xoffset = clampedValue;
                                if (option.name === "Content shadow Y offset:") derpEffects.ContentFX_Yoffset = clampedValue;                                
                                break;
                            case 5:
                                if (option.name === "Canvas stroke:") derpEffectPalette.c_CanvasStroke = clampedValue;
                                if (option.name === "Canvas FX:") derpEffectPalette.c_CanvasFX = clampedValue;
                                if (option.name === "Content stroke:") derpEffectPalette.c_ContentStroke = clampedValue;
                                if (option.name === "Content FX:") derpEffectPalette.c_ContentFX = clampedValue;
                                break;

                        }
                        this.setDirtyCanvas(true, true);
                    };
                    // Handle LRbtns
                    const lbtnBounds = withinBounds(derpPanel.X + derpPanel.padLeft, derpPanel.panelStartY + currentY, btnH, btnH);
                    const rbtnBounds = withinBounds(derpPanel.X + derpPanel.padLeft + btnH + 2 + derpPanel.fieldW, derpPanel.panelStartY + currentY, btnH, btnH);

                    if ((derpPanelOpen !== 3 && derpPanelOpen !== 5) && (lbtnBounds || rbtnBounds)) {
                        if (lbtnBounds) {
                            option.value = derp.shiftKey ? Math.max(option.min, option.value - option.step * option.stepX) : option.value - option.step;
                        } else {
                            option.value = derp.shiftKey ? Math.max(option.min, option.value + option.step * option.stepX) : option.value + option.step;
                        }
                        option.value = Math.max(option.min, Math.min(option.max, option.value));
                        //const clampedValue = Math.max(option.min, Math.min(option.max, Number(option.value)));
                        option.value = option.value.toFixed(2);
                        option.value = parseFloat(option.value);
                        handleOptionChange(option, option.value);
                    }

                    // Handle colors
                    if ((derpPanelOpen === 3 || derpPanelOpen === 5) && (lbtnBounds || rbtnBounds)) {
                        const RGBA = getRGBA(option.value);                        
                        if (lbtnBounds) {
                            option.value = derp.shiftKey ? simpleRGBA(RGBA, -10) : simpleRGBA(RGBA, -5);
                        } else {
                            option.value = derp.shiftKey ? simpleRGBA(RGBA, 10) : simpleRGBA(RGBA, 5);
                        }
                        const clampedValue = option.value;
                        //clampedValue = parseFloat(clampedValue.toFixed(2));
                        handleOptionChange(option, clampedValue);
                    }
                    // Handle input field
                    if (withinBounds(derpPanel.X + derpPanel.padLeft + btnH + 1 + 10, derpPanel.panelStartY + currentY, derpPanel.fieldW - 10, derpPanel.font2 * 2 - 2)) {
                        if (option.name === "Close panel:") {
                            derpPanelOpen = 0;
                            return false;
                        }
                        canvas.prompt(option.name, option.value, function (v) {
                            if (option.min !== undefined && option.max !== undefined) {
                                v = Math.max(option.min, Math.min(option.max, v));
                            } else { v = String(v); }
                            option.value = v;
                            handleOptionChange(option, option.value);

                        }.bind(this), derp);
                    }
                    currentY += derpPanel.font1 + spacingY;
                });

            }
        }
        this.node.onDblClick = function (derp, pos, canvas) {
            /*for (let name in canvas) {
                console.log("mouse canvas: " + name);
            }
            console.log("screenX:", derp.screenX);
            console.log("screenY:", derp.screenY);*/
            /*
            canvas.prompt("value", this.prop.derpValue, function (v) {
                if (!isNaN(Number(v))) {
                    this.prop.derpValue = Number(v);
                    this.onPropertyChanged("derpValue");
                }
            }.bind(this), derp);*/
        }
        /* ================ Comfy extramenu ================ */
        this.node.getExtraMenuOptions = function (canvas) {
            const { derpCanvas, derpNode, derpPalette, drawHeader, derpEffects } = this.prop;
            const options = [];
            const shapeMenu = "🔞 Node Corner Shape";
            options.push({
                content: shapeMenu,
                has_submenu: true,
                callback: this.make_submenu,
            });
            const alignMenu = "🔞 Text Alignment";
            options.push({
                content: alignMenu,
                has_submenu: true,
                callback: this.make_submenu,
            });
            const effectsMenu = "🔞 Effects";
            options.push({
                content: effectsMenu,
                has_submenu: true,
                callback: this.make_submenu,
            });

            const headerIcon = derpCanvas.DrawHeader ? "🔵 Toggle Header" : "🔴 Toggle Header";
            const canvasFXIcon = derpEffects.GlobalFX ? "🔵 Toggle Global FX" : "🔴 Toggle Global FX";
            const menuKey = ["🟩 Node Settings", "🟦 Main Palette", "🟪 Effects options", "🟪 Effects palette", "⚙ Canvas layout", headerIcon, canvasFXIcon];

            menuKey.forEach((key, i) => {
                options.push({
                    content: key,
                    callback: () => {
                        this.CanvasShapeChange(key);
                    }
                });
            });
            return options;

        };

        this.node.make_submenu = function (value, options, e, menu, node) {
            const { derpEffects } = node.prop;
            const canvasStrokeKey = derpEffects.CanvasStroke ? "🟢 Canvas stroke" : "🟠 Canvas stroke";
            const canvasShadow = derpEffects.CanvasShadow ? "🟢 Canvas shadow" : "🟠 Canvas shadow";
            const contentStrokeKey = derpEffects.ContentStroke ? "🟢 Content stroke" : "🟠 Content stroke";
            const contentShadow  = derpEffects.ContentShadow ? "🟢 Content shadow" : "🟠 Content shadow";
            const menuKeyMap = {
                "🔞 Node Corner Shape": ["TOP-LEFT", "TOP", "TOP-RIGHT", "LEFT", "CENTER", "RIGHT", "BOTTOM-LEFT", "BOTTOM", "BOTTOM-RIGHT", "FULL"],
                "🔞 Text Alignment": ["Left", "Right", "Center", "Split"],
                "🔞 Effects": [canvasStrokeKey, canvasShadow, contentStrokeKey, contentShadow],
            };
            const menuKey = menuKeyMap[value.content] || [];
            new LiteGraph.ContextMenu(
                menuKey,
                {
                    event: e,
                    callback: function (derpKey) {
                        console.log("derpKey:", derpKey);
                        node.CanvasShapeChange(derpKey);
                    },
                    parentMenu: menu,
                    node: node
                }
            );
        }

        this.node.CanvasShapeChange = function (derpKey) {
            const { derpCanvas, derpNode, derpPalette, derpEffects } = this.prop;
            const cornerMap = {
                "TOP-LEFT": [derpCanvas.CanvasCorner, 0, 0, 0],
                "TOP": [derpCanvas.CanvasCorner, derpCanvas.CanvasCorner, 0, 0],
                "TOP-RIGHT": [0, derpCanvas.CanvasCorner, 0, 0],
                "LEFT": [derpCanvas.CanvasCorner, 0, 0, derpCanvas.CanvasCorner],
                "CENTER": [0, 0, 0, 0],
                "RIGHT": [0, derpCanvas.CanvasCorner, derpCanvas.CanvasCorner, 0],
                "BOTTOM-LEFT": [0, 0, 0, derpCanvas.CanvasCorner],
                "BOTTOM": [0, 0, derpCanvas.CanvasCorner, derpCanvas.CanvasCorner],
                "BOTTOM-RIGHT": [0, 0, derpCanvas.CanvasCorner, 0],
                "FULL": [derpCanvas.CanvasCorner, derpCanvas.CanvasCorner, derpCanvas.CanvasCorner, derpCanvas.CanvasCorner]
            };
            const alignmentMap = {
                "Left": "left",
                "Right": "right",
                "Center": "center",
                "Split": "split",
            };

            const effectsMap = {
                "🟢 Canvas stroke": "CanvasStrokeOff",
                "🟠 Canvas stroke": "CanvasStrokeOn",
                "🟢 Canvas shadow": "CanvasShadowOff",
                "🟠 Canvas shadow": "CanvasShadowOn",
                "🟢 Content stroke": "ContentStrokeOff",
                "🟠 Content stroke": "ContentStrokeOn",
                "🟢 Content shadow": "ContentShadowOff",
                "🟠 Content shadow": "ContentShadowOn",
            };

            if (cornerMap[derpKey]) {
                this.prop.derpCanvas.C = cornerMap[derpKey];
            } else if (alignmentMap[derpKey]) {
                this.prop.derpCanvas.TextAlignment = alignmentMap[derpKey];
            } else if (effectsMap[derpKey]) {
                switch (derpKey) {
                    case "🟠 Canvas stroke":
                    case "🟢 Canvas stroke":
                        derpEffects.CanvasStroke = !derpEffects.CanvasStroke;
                        break;
                    case "🟠 Canvas shadow":
                    case "🟢 Canvas shadow":
                        derpEffects.CanvasShadow = !derpEffects.CanvasShadow;
                        break;
                    case "🟠 Content stroke":
                    case "🟢 Content stroke":
                        derpEffects.ContentStroke = !derpEffects.ContentStroke;
                        break;
                    case "🟠 Content shadow":
                    case "🟢 Content shadow":
                        derpEffects.ContentShadow = !derpEffects.ContentShadow;
                        break;

                }
            } else {
                switch (derpKey) {
                    case "🟩 Node Settings":
                        derpPanelOpen = (derpPanelOpen === 1) ? 0 : 1;
                        break;
                    case "⚙ Canvas layout":
                        derpPanelOpen = (derpPanelOpen === 2) ? 0 : 2;
                        break;
                    case "🟦 Main Palette":
                        derpPanelOpen = (derpPanelOpen === 3) ? 0 : 3;
                        break;
                    case "🟪 Effects options":
                        derpPanelOpen = (derpPanelOpen === 4) ? 0 : 4;
                        break;
                    case "🟪 Effects palette":
                        derpPanelOpen = (derpPanelOpen === 5) ? 0 : 5;
                        break;
                    case "🔵 Toggle Header":
                    case "🔴 Toggle Header":                        
                        derpCanvas.DrawHeader = !derpCanvas.DrawHeader;
                        break;
                    case "🔵 Toggle Global FX":
                    case "🔴 Toggle Global FX":
                        derpEffects.GlobalFX = !derpEffects.GlobalFX;
                        break;
                }
            }
        };

        let derpPanel = { X: 0, Y: 0, W: 150, H: 100, C: 8, margin: 8, font1: 6, font2: 6, panelStartY: 0, padLeft: 80, fieldW: 60, spacingY: 2 };

        // ================== derpPanel ==================
        // because I couldn't figure out how to make a prompt from the right-click context menu...
        this.node.derpPanel = function (ctx) {
            let tipSpace = 8;
            switch (derpPanelOpen) {
                case 1:
                    derpOptions = this.prop.derpNodeOptions; 
                    tipSpace = 12;  //these affect visuals only
                    derpPanel.fieldW = 60;
                    break;
                case 2:
                    derpOptions = canvasOptions;
                    tipSpace = 12;
                    derpPanel.fieldW = 60;
                    break;
                case 3:
                    derpOptions = this.prop.derpPaletteOptions;
                    derpPanel.fieldW = 80;
                    tipSpace = 12;
                    break;
                case 4:
                    derpOptions = effectsOptions;
                    derpPanel.padLeft = 100;
                    derpPanel.fieldW = 40;
                    tipSpace = 12;
                    break;
                case 5:
                    derpOptions = effectsPaletteOptions;     
                    derpPanel.padLeft = 80;
                    derpPanel.fieldW = 80;
                    tipSpace = 12;
                    break;
            }
            
            const optionCount = derpOptions.length;
            const btnH = derpPanel.font2 * 2;
            const offsetY = derpPanel.font2 + derpPanel.spacingY;
            const spacingY = 8;
            let tip = derpOptions[1].tip;
            if (tip === undefined) tip = "n/a";
            const tipY = derpPanel.Y + (derpPanel.font1 + spacingY) * (derpOptions.length);
            derpPanel.W = derpPanel.padLeft + btnH * 2 + 2 + derpPanel.fieldW + derpPanel.margin;
            derpPanel.H = offsetY * 2 + (derpPanel.font2 + spacingY) * (optionCount - 1) + tipSpace;        
            let currentY = 0;
            derpPanel.X = this.prop.derpCanvas.W;
            derpPanel.Y = this.prop.derpCanvas.Y;

            ctx.fillStyle = getRGBA("45,45,45,0.8");
            ctx.shadowColor = getRGBA("0,0,0,0.5");
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 2;
            // Panel BG
            ctx.beginPath();
            ctx.roundRect(derpPanel.X, derpPanel.Y, derpPanel.W, derpPanel.H, derpPanel.C);
            ctx.fill();
            this.size = [this.prop.derpCanvas.W + derpPanel.W, Math.max(derpPanel.H - LiteGraph.NODE_TITLE_HEIGHT, this.prop.derpCanvas.H - LiteGraph.NODE_TITLE_HEIGHT)];
            // Title text
            ctx.fillStyle = getRGBA(String(this.prop.derpPalette.HeaderTextColor), 1.0);
            ctx.font = `${derpPanel.font1}px ${this.prop.derpCanvas.HeaderFont}`;
            ctx.textBaseline = "top";
            ctx.textAlign = "left";
            ctx.fillText(derpOptions[0].title, derpPanel.X + derpPanel.margin, derpPanel.Y + 8);

            // Draw options text
            derpOptions.slice(2).forEach(option => {
                ctx.font = `${derpPanel.font1}px ${this.prop.derpCanvas.HeaderFont}`;
                ctx.textBaseline = "middle";
                ctx.textAlign = "left";
                ctx.fillStyle = getRGBA(String(this.prop.derpPalette.HeaderTextColor));
                ctx.fillText(option.name, derpPanel.X + derpPanel.margin, derpPanel.panelStartY + currentY + btnH / 2);
                // Draw option field
                ctx.fillStyle = getRGBA("0,0,0,0.2");
                if (option.name === "Close panel:") ctx.fillStyle = getRGBA("55,70,115,0.8");
                ctx.beginPath();
                ctx.roundRect(derpPanel.X + derpPanel.padLeft + btnH + 1, derpPanel.panelStartY + currentY, derpPanel.fieldW, btnH, 2);
                ctx.fill();
                // Draw LRbtn
                if ((option.name !== "Close panel:" && typeof option.value !== 'string') ||
                    ((derpPanelOpen == 3 || derpPanelOpen == 5) && option.name !== "Close panel:")) {
                        ctx.beginPath();
                    ctx.roundRect(derpPanel.X + derpPanel.padLeft, derpPanel.panelStartY + currentY, btnH, btnH, 2);
                        ctx.fill();
                        ctx.beginPath();
                    ctx.roundRect(derpPanel.X + derpPanel.padLeft + btnH + 2 + derpPanel.fieldW, derpPanel.panelStartY + currentY, btnH, btnH, 2);
                        ctx.fill();
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillStyle = getRGBA("255,255,255,0.2");
                    ctx.font = `${derpPanel.font2}px ${this.prop.derpCanvas.HeaderFont}`;
                    ctx.fillText("◀", derpPanel.X + derpPanel.padLeft + btnH / 2, derpPanel.panelStartY + currentY + btnH / 2);
                    ctx.fillText("▶", derpPanel.X + derpPanel.padLeft + btnH + 1 + derpPanel.fieldW + btnH / 2, derpPanel.panelStartY + currentY + btnH / 2);
                } 
                ctx.textAlign = "center";
                ctx.fillStyle = getRGBA(this.prop.derpPalette.OutputTextColor);
                ctx.fillText(option.value, derpPanel.X + derpPanel.padLeft + btnH + 1 + derpPanel.fieldW / 2, derpPanel.panelStartY + currentY + btnH / 2);

                currentY += btnH + derpPanel.spacingY;
            });
            // Draw tip
            ctx.font = `${6}px ${this.prop.derpCanvas.HeaderFont}`;
            ctx.fillStyle = getRGBA(String(this.prop.derpPalette.HeaderTextColor), 0.3);
            ctx.textAlign = "left";
            ctx.fillText(tip, derpPanel.X + derpPanel.margin, tipY);
        };
        // ================== derpSlot handler ==================
        this.node.updateDerpSlot = function () {
            const { derpCanvas } = this.prop;
            let slotOffsetX = LiteGraph.NODE_SLOT_HEIGHT / 2;
            let slotOffsetY = targetslotOffsetY;

            if (targetNode.collapsed) {
                //slotOffsetY = -this.prop.slotOffsetY;
                slotOffsetX = 0;
            }

            const updateSlotPos = () => {
                outputTargetPos = [
                    targetNode.pos[0] - this.pos[0] + slotOffsetX,
                    targetNode.pos[1] - this.pos[1] + slotOffsetY// + this.prop.derpCanvas.SlotOffset[1],
                ];
                this.outputs[0].pos = outputTargetPos;
            };

            updateSlotPos.call(this);
            derpCanvas.PadRight = 0;

            if (this.is_selected) {

                derpCanvas.PadRight = 12;
                this.outputs[0].pos = derpOutputPos;
            } else if (targetNode.collapsed) {
                if (!this.is_selected && !targetNode.is_selected) {

                    slotOffsetY = - LiteGraph.NODE_SLOT_HEIGHT / 2 - 2;
                    slotOffsetX = 0;
                    this.outputs[0].pos = [outputTargetPos[0], outputTargetPos[1]];
                    derpCanvas.PadRight = 0;
                    updateSlotPos.call(this);
                } else {

                    this.outputs[0].pos = derpOutputPos;
                    derpCanvas.PadRight = 12;
                }
                return;
            } else if (targetNode.is_selected && !targetNode.collapsed) {
                derpCanvas.PadRight = 12;
                this.outputs[0].pos = derpOutputPos;
                return;
            }

            if (!this.prevTargetNodePos) {
                this.prevTargetNodePos = [...targetNode.pos];
                return;
            }

            if (targetNode.is_selected && (targetNode.pos[0] !== this.prevTargetNodePos[0] || targetNode.pos[1] !== this.prevTargetNodePos[1])) {
                updateSlotPos.call(this);
                return;
            }

            this.prevTargetNodePos = [...targetNode.pos];

            if (targetNode.collapsed && targetNode.is_selected && !this.is_selected) {
                derpCanvas.PadRight = 12;
                this.outputs[0].pos = derpOutputPos;
                return;
            }
            if (targetNode.collapsed && !targetNode.is_selected && !this.is_selected) {
                slotOffsetX = 0;
                updateSlotPos.call(this);
                derpCanvas.PadRight = 0;
                return;

            }
        };
    }
}
app.registerExtension({
    name: "derpBaseAlpha",
    async beforeRegisterNodeDef(nodeType, nodeData, _app) {
        if (nodeData.name === "derpBaseAlpha") {

            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                if (onNodeCreated) onNodeCreated.apply(this, []);
                this.derpBaseAlpha = new derpBaseAlpha(this);
            };

        }
    }
});

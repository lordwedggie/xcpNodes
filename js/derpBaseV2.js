// DerpNode: derpBaseAlpha
import { app } from "../../scripts/app.js";
import { ComfyWidgets } from "../../scripts/widgets.js";
import { getRGBA, getMidpointColor, validateRGBA, clamp, resetEffects, derpTitle } from "./xcpUtils.js";
//import { addMenuItem } from "./xcp/utils.js";
//import {  } from "./xcp/rgthree.js";
//import { addMenuItem } from "../utils.js";
//import {  } from "./rgthree/base_node.js";
//getRGBA, getMidpointColor, validateRGBA, clamp, resetEffects, derpTitle, derpHandler
//==========================LGraph registration/==========================
export class derpBaseV2 {
    constructor(node) {
        //super();
        this.node = node;

        this.node.prop = this.node.properties || {};
        this.node.prop.CanvasSize = "200, 40";
        this.node.prop.c_CanvasBG = "045, 045, 045, 1.00";
        this.node.prop.CanvasBorder = 4;
        this.node.prop.CanvasCorner = 8;        
        this.node.prop.c_HeaderBG = "065, 065, 065, 1.00";
        this.node.prop.c_ContentBG = "035, 035, 035, 1.00";
        this.node.prop.HeaderCorner = 4;
        this.node.prop.HeaderContentRatio = 0.5;
        this.node.prop._text = "┄┄┄┄Text┄┄┄┄";
        this.node.prop.TextAlignment = "center";
        this.node.prop.TextMarginX = 4;
        this.node.prop.TextMarginY = 0;
        this.node.prop.HeaderFont = "DengXian";
        this.node.prop.SubFont = "DengXian light";
        this.node.prop.c_HeaderFont = "255, 255, 255, 0.50";
        this.node.prop.c_SubFont = "255, 255, 255, 1.00";
        this.node.prop.AutoFontSize = 0.65;
        this.node.prop.HeaderFontSize = 0;
        this.node.prop.SubFontSize = 0;
        this.node.prop._fx = "┄┄┄┄Effects┄┄┄┄";
        this.node.prop.GlobalFX = true;
        this.node.prop.DrawCanvasGradient = false;
        this.node.prop.DrawCanvasStroke = false;
        this.node.prop.c_CanvasStroke = "025, 025, 025, 1.00";
        this.node.prop.CanvasStrokeWeight = 1;
        this.node.prop.DrawCanvasFX = true;
        this.node.prop.c_CanvasFX = "000, 000, 000, 0.50";
        this.node.prop.CanvasFX_Blur = 8;
        this.node.prop.CanvasFX_Xoffset = 0;
        this.node.prop.CanvasFX_Yoffset = 2;
        this.node.prop.DrawContentStroke = true;
        this.node.prop.c_ContentStroke = "025, 025, 025, 1.00";
        this.node.prop.ContentStrokeWeight = 1;
        this.node.prop.DrawContentFX = true;
        this.node.prop.c_ContentFX = "000, 000, 000, 0.50";
        this.node.prop.ContentFX_Blur = 8;
        this.node.prop.ContentFX_Xoffset = 0;
        this.node.prop.ContentFX_Yoffset = 2;
        this.node.prop._colors = "┄┄┄┄Colors┄┄┄┄";
        this.node.prop.SlotXoffset = 7;
        this.node.prop.SlotYoffset = 8;
        this.node.prop.CornerShape = [8, 8, 8, 8];

        this.node.prop.HideLinks = true;
        this.node.prop.HideSlots = true;
        this.node.prop.AutoFontSize = 0.5;
        this.node.prop.CanvasOffset = 0;
        this.node.prop.CanvasWidthFix = 0.5;
        this.node.prop.derpValue = 0.50;

        let padLeft = 0;
        let padRight = 12;
        let currentShape = "FULL";
        let outputIsConnected = 0;
        let inputIsConnected = 0;
        let derpCanvas = null;
        let drawHeader = true;
        const subTextTemp = "5.00";

        

        this.node.onConfigure = function () {
            this.configured = true;
        };
        /* ================ onAdded ================ */
        this.node.onAdded = function () {
            //for (let name in this.node.getExtraMenuOptions) {
                ///console.log("this.node.getExtraMenuOptions: " + name);
            //}
            //this.resizable = false;
            this.collapsable = false;
            this.convertWidgetToInput = false;
            this.color = "#0000";
            this.bgcolor = "#0000";
            this.boxcolor = "#0000";
            this.widgets[0].type = "hidden";
            this.outputs[0].name = "";
            const [width, height] = this.prop.CanvasSize.split(',').map(size => parseInt(size.trim(), 10));
            this.size = [width, height - LiteGraph.NODE_TITLE_HEIGHT];
            this.outputs[0].pos = [this.size[0] - this.prop.SlotXoffset, - LiteGraph.NODE_TITLE_HEIGHT + this.prop.SlotYoffset];
            app.canvas.render_canvas_border = false;
            this.setDirtyCanvas(true, true);
        };
        this.node.onPropertyChanged = function (Name) {
            if (!this.configured) return;
            const [width, height] = this.prop.CanvasSize.split(',').map(size => parseInt(size.trim(), 10));
            //this.size = [width, height - LiteGraph.NODE_TITLE_HEIGHT];
            // Validates all RGBA values, change the color to red if invalid (don't know how else to handle it)
            if (Name === "CanvasCorner") this.CanvasShapeChange(currentShape);
            if (Name === "CanvasSize") {
                let [width, height] = this.prop.CanvasSize.split(',').map(size => parseInt(size.trim(), 10));
                height = Math.max(20, Math.min(height, 200));
                this.prop.CanvasSize = `${width}, ${height}`;
            } // if height is smaller than 20 that godam horizontal line will show
            if (typeof Name === 'string' && Name.includes("c_")) {
                const propValue = getRGBA(this.prop[Name]);
                if (!validateRGBA(propValue)) {
                    this.prop[Name] = "255, 0, 0, 1";
                }
            }
        }
        /* ================ onDrawForeground ================ */
        this.node.onDrawForeground = function (ctx, canvas) {
            derpCanvas = canvas;
            //console.log ("canvas:", canvas);
            const [width, height] = this.prop.CanvasSize.split(',').map(size => parseInt(size.trim(), 10));
            this.size = [width, height - LiteGraph.NODE_TITLE_HEIGHT];
            this.originY = - LiteGraph.NODE_TITLE_HEIGHT;
            this.canvasWidth = this.size[0] + this.prop.CanvasWidthFix;
            this.canvasHeight = this.size[1] + LiteGraph.NODE_TITLE_HEIGHT;
            this.outputs[0].pos = [this.size[0] - this.prop.SlotXoffset, - LiteGraph.NODE_TITLE_HEIGHT + this.prop.SlotYoffset];
            resetEffects(ctx);
            // -------------------- Draw Canvas --------------------
            ctx.fillStyle = getRGBA(this.prop.c_CanvasBG);
            ctx.beginPath();
            if (this.prop.DrawCanvasFX) {
                ctx.shadowColor = getRGBA(this.prop.c_CanvasFX);
                ctx.shadowBlur = this.prop.CanvasFX_Blur;
                ctx.shadowOffsetX = this.prop.CanvasFX_Xoffset;
                ctx.shadowOffsetY = this.prop.CanvasFX_Yoffset;
            }
            ctx.roundRect(this.prop.CanvasOffset, this.prop.CanvasOffset - LiteGraph.NODE_TITLE_HEIGHT, this.canvasWidth - this.prop.CanvasOffset * 2 + this.prop.CanvasWidthFix, this.canvasHeight - this.prop.CanvasOffset * 2, this.prop.CornerShape);
            ctx.fill();
            ctx.lineWidth = this.prop.CanvasStrokeWeight;
            ctx.strokeStyle = this.prop.c_CanvasBG;
            if (this.prop.DrawCanvasStroke) ctx.strokeStyle = getRGBA(this.prop.c_CanvasStroke);
            ctx.stroke();
            if(!this.prop.GlobalFX) resetEffects(ctx);
            // -------------------- Draw Content --------------------
            // Conctent FX
            if (this.prop.DrawContentFX && !this.prop.GlobalFX) {
                ctx.shadowColor = getRGBA(this.prop.c_ContentFX);
                ctx.shadowBlur = this.prop.ContentFX_Blur;
                ctx.shadowOffsetX = this.prop.ContentFX_Xoffset;
                ctx.shadowOffsetY = this.prop.ContentFX_Yoffset;
            }
            let contentW = this.canvasWidth - this.prop.CanvasBorder * 2 - padLeft - padRight;
            this.contentH = this.canvasHeight - this.prop.CanvasBorder * 2;
            ctx.beginPath();
            ctx.fillStyle = getRGBA(this.prop.c_ContentBG);
            ctx.roundRect(this.prop.CanvasBorder + padLeft, this.originY + this.prop.CanvasBorder, contentW, this.canvasHeight - this.prop.CanvasBorder * 2, [this.prop.HeaderCorner, this.prop.HeaderCorner, this.prop.HeaderCorner, this.prop.HeaderCorner]);
            ctx.fill();
            resetEffects(ctx);
            // -------------------- Draw Header --------------------
            let headerH = Math.round(drawHeader ? (this.canvasHeight - this.prop.CanvasBorder * 2) * this.prop.HeaderContentRatio : 0);
            let headerX = this.prop.CanvasBorder + padLeft;

            let headerY = this.originY + this.prop.CanvasBorder;
            let contentX = this.prop.CanvasBorder + padLeft;
            let contentY = this.originY + this.prop.CanvasBorder;
            let contentH = this.canvasHeight - this.prop.CanvasBorder * 2;
            if (drawHeader) {
                headerH = Math.round((this.canvasHeight - this.prop.CanvasBorder * 2) * this.prop.HeaderContentRatio);
                ctx.beginPath();
                ctx.fillStyle = getRGBA(this.prop.c_HeaderBG);
                ctx.roundRect(headerX, headerY, this.canvasWidth - this.prop.CanvasBorder * 2 - padLeft - padRight, headerH, [this.prop.HeaderCorner, this.prop.HeaderCorner, 0, 0]);
                ctx.fill();
            }
            // Draw stroke (header and content)
            ctx.beginPath();
            ctx.fillStyle = getRGBA("0,0,0,0"); // empty fill for stroke area
            ctx.roundRect(contentX, contentY, contentW, contentH, [this.prop.HeaderCorner, this.prop.HeaderCorner, this.prop.HeaderCorner, this.prop.HeaderCorner]);
            ctx.fill();
            if (this.prop.DrawContentStroke) {
                ctx.lineWidth = this.prop.ContentStrokeWeight;
                ctx.strokeStyle = getRGBA(this.prop.c_ContentStroke);
                ctx.stroke();
            }
            // -------------------- Draw Text --------------------
            let headerFontSize = headerH * this.prop.AutoFontSize;
            let subFontSize = headerH * this.prop.AutoFontSize;            
            let headerTextX = headerX + this.prop.TextMarginX;
            let headerTextY = headerY + this.prop.TextMarginY + headerH / 2;

            ctx.fillStyle = getRGBA(this.prop.c_HeaderFont);
            if (!drawHeader) {
                headerTextY = headerY + this.prop.TextMarginY + contentH / 2;
            }
            headerFontSize = this.prop.HeaderFontSize || (contentH * this.prop.AutoFontSize / 2);
            subFontSize = this.prop.SubFontSize || (contentH * this.prop.AutoFontSize / 2);
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.font = `${headerFontSize}px ${this.prop.HeaderFont}`;
            ctx.fillText(this.title, headerTextX, headerTextY);
            // SubText
            ctx.fillStyle = getRGBA(this.prop.c_SubFont);
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";          
            ctx.font = `${subFontSize}px ${this.prop.SubFont}`;
            let subWidth = ctx.measureText(this.title).width;
            let subTextX = this.size[0] - this.prop.CanvasBorder - padRight - this.prop.TextMarginX;
            ctx.fillText(subTextTemp, subTextX, headerTextY);
            /* -------------------- Handles slot positions -------------------- */
            // 'hide slot' trick to move it out the input position of the linked input position
            if (this.prop.HideSlots && outputIsConnected) {
                //this.putputs[0].pos = [-10, -10];
                //this.inputs[0].link_pos = [-10, -10];
            }
        };
        /* ================ onConnectionsChange ================ */
        this.node.onConnectionsChange = function (slotType, slot, isChangeConnect, link_info, output) {
            outputIsConnected = this.outputs[0].links.length;
            console.log ("outputIsConnected:", outputIsConnected);
            if (outputIsConnected > 0) {
                const linkID = link_info.id;                
                this.graph.links[linkID].color = this.prop.HideLinks ? getRGBA("0, 0, 0, 0") : LiteGraph.LINK_COLOR;
                this.graph.links[linkID].color_off = this.prop.HideLinks ? getRGBA("0, 0, 0, 0") : LiteGraph.LINK_COLOR;
                if (this.prop.HideSlots) padRight = 0;
                this.setDirtyCanvas(true, true);
            }
        }
        /* ================ Mouse Stuff ================ */
        this.node.onDblClick = function (derp, pos, canvas) {
            for (let name in canvas) {
                console.log("mouse canvas: " + name);
            }
            console.log("screenX:", derp.screenX);
            console.log("screenY:", derp.screenY);

            canvas.prompt("value", this.prop.derpValue, function (v) {
                if (!isNaN(Number(v))) {
                    this.prop.derpValue = Number(v);
                    this.onPropertyChanged("derpValue");
                }
            }.bind(this), derp);
        }
        this.node.getExtraMenuOptions = function (canvas) {
            const options = [];
            const headerIcon = drawHeader ? "🔵 Toggle Header" : "🔴 Toggle Header";
            const canvasFXIcon = this.prop.DrawCanvasFX ? "🔵 Toggle Canvas FX" : "🔴 Toggle Canvas FX";
            const menuKey = ["🔳 Canvas size", headerIcon, canvasFXIcon];

            menuKey.forEach((key, i) => {
                options.push({
                    content: key,
                    callback: () => {
                        this.CanvasShapeChange(key);
                    }
                });
            });

            const shapeMenu = "🔅 Node Corner Shape";
            options.push({
                content: shapeMenu,
                has_submenu: true,
                callback: make_submenu,
            });

            const alignMenu = "🔅 Text Alignment";
            options.push({
                content: alignMenu,
                has_submenu: true,
                callback: make_submenu,
            });

            return options;
        };

        function make_submenu(value, options, e, menu, node) {
            console.log("value:", value);
            console.log("options:", options);
            console.log("e:", e);
            console.log("menu:", menu);
            console.log("node:", node);
            let menuKey = [];
            switch (value.content) {
                case "🔅 Node Corner Shape":
                    console.log("content is 🔅 Node Corner Shape");
                    menuKey = ["TOP-LEFT", "TOP", "TOP-RIGHT", "LEFT", "CENTER", "RIGHT", "BOTTOM-LEFT", "BOTTOM", "BOTTOM-RIGHT", "FULL"];
                    break;
                case "🔅 Text Alignment":
                    menuKey = ["Left", "Right", "Center", "Split"];
                    break;
            }
            const submenu = new LiteGraph.ContextMenu(
                menuKey,
                {
                    event: e,
                    callback: function (v) {
                        console.log("v:", v);
                        node.CanvasShapeChange(v);
                    },
                    parentMenu: menu,
                    node: node
                }
            );
        }
        this.node.CanvasShapeChange = function (derpKey) {
            switch (derpKey) {
                case "TOP-LEFT":
                    this.prop.CornerShape = [this.prop.CanvasCorner, 0, 0, 0];
                    break;
                case "TOP":
                    this.prop.CornerShape = [this.prop.CanvasCorner, this.prop.CanvasCorner, 0, 0];
                    break;
                case "TOP-RIGHT":
                    this.prop.CornerShape = [0, this.prop.CanvasCorner, 0, 0];
                    break;
                case "LEFT":
                    this.prop.CornerShape = [this.prop.CanvasCorner, 0, 0, this.prop.CanvasCorner];
                    break;
                case "CENTER":
                    this.prop.CornerShape = [0, 0, 0, 0];
                    break;
                case "RIGHT":
                    this.prop.CornerShape = [0, this.prop.CanvasCorner, this.prop.CanvasCorner, 0];
                    break;
                case "BOTTOM-LEFT":
                    this.prop.CornerShape = [0, 0, 0, this.prop.CanvasCorner];
                    break;
                case "BOTTOM":
                    this.prop.CornerShape = [0, 0, this.prop.CanvasCorner, this.prop.CanvasCorner];
                    break;
                case "BOTTOM-RIGHT":
                    this.prop.CornerShape = [0, 0, this.prop.CanvasCorner, 0];
                    break;
                case "FULL":
                    this.prop.CornerShape = [this.prop.CanvasCorner, this.prop.CanvasCorner, this.prop.CanvasCorner, this.prop.CanvasCorner];
                    break;
                case "🔳 Canvas size":

                    /*let derp = 0;
                    derpCanvas.prompt("value", this.prop.derpValue, function (v) {
                        if (!isNaN(Number(v))) {
                            this.prop.derpValue = Number(v);
                            this.onPropertyChanged("derpValue");
                        }
                    }.bind(this), derp);
                    for (let name in derpCanvas.prompt) {
                        console.log("derpCanvas.prompt: " + name);
                    }
                    canvas.prompt_box.draggable = true;
                    canvas.propmpt_box.clientLeft = 1000;
                    canvas.propmpt_box.clientTop = 1000;
                    this.widgets[0].value = this.prop.derpValue;*/
                    break;
                case "🔵 Toggle Header":
                case "🔴 Toggle Header":
                    drawHeader = !drawHeader;                    
                    break;
                case "🔵 Toggle Canvas FX":
                case "🔴 Toggle Canvas FX":
                    this.prop.DrawCanvasFX = !this.prop.DrawCanvasFX;
                    break;

            }

        }
    }
}
app.registerExtension({
    name: "derpBaseV2",
    async beforeRegisterNodeDef(nodeType, nodeData, _app) {
        if (nodeData.name === "derpBaseV2") {
 
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                if (onNodeCreated) onNodeCreated.apply(this, []);
                this.derpBaseV2 = new derpBaseV2(this);
            };

        }
    }
});
/*
for (let name in this) {
    console.log("this: " + name);
}
for (let name in LiteGraph.LGraphCanvas) {
    console.log("LiteGraph.LGraphCanvas: " + name);
}
for (let name in app.canvas) {
    console.log("app.canvas: " + name);
}
for (let name in LiteGraph) {
    console.log("LiteGraph: " + name);
}
*/
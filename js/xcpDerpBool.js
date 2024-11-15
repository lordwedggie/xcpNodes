/* xcp Derp Nodes by lordwedggie
Based on Max Smirnov's mxToolkit. check out his nodes at: https://github.com/Smirnov75/ComfyUI-mxToolki 
webfiltered_21234 on Element for letting me know how to change link border coloir*/
import { app } from "../../scripts/app.js";
import { getRGBA, getMidpointColor, validateRGBA, clamp, resetEffects, derpTitle, derpHandler } from "./xcpUtils.js";


class xcpDerpBool  {
    constructor(node) {
        //super(node); // Call the parent class constructor
        this.node = node;
        this.node.prop = this.node.properties || {};
        // this.node.prop.this.prop.derpValue= false;
        //this.node.prop.labelMain = "DerpBool";
        this.node.prop.labelSub = "";
        this.node.prop.canvasWidth = 100;
        this.node.prop.canvasHeight = 40;
        this.node.prop._layout = "┄┄Layout┄┄";
        this.node.prop.padRight = 12; // offset from the right side
        this.node.prop.padDown = 4; // offset from downunder
        this.node.prop.marginX = 4;
        this.node.prop.marginY = 4;
        this.node.prop.labelSizeMain = 12;
        this.node.prop.labelSizeSub = 8;
        this.node.prop.labelMarginY = 2;
        this.node.prop.canvasCorner = 4;
        this.node.prop._fx = "┄┄Effects┄┄";
        this.node.prop.fxGlobal = true;
        this.node.prop.canvasStroke = true;
        this.node.prop.enableButton = true;
        this.node.prop.btnFX = true;
        this.node.prop.btnStroke = true;
        this.node.prop.slotUseBtnColor = false;
        this.node.prop.canvasStrokeWT = 0.5;
        this.node.prop.canvasFXblur = 8;
        this.node.prop.canvasFXoffsetX = 0;
        this.node.prop.canvasFXoffsetY = 2;  
        this.node.prop.btnFXblur = 4;
        this.node.prop.btnFXoffsetX = 0;
        this.node.prop.btnFXoffsetY = 1;
        this.node.prop.btnStrokeWT = 0.5     
        this.node.prop._colors = "┄┄Colors┄┄";
        this.node.prop.colorLabelMainOn = "255, 255, 255, 1.00";
        this.node.prop.colorLabelMainOff = "255, 255, 255, 0.20";
        this.node.prop.colorLabelSubOn = "255, 255, 255, 0.50";
        this.node.prop.colorLabelSubOff = "255, 255, 255, 0.20";
        this.node.prop.colorCanvasBGon = "045, 045, 045, 1.00";
        this.node.prop.colorCanvasBGoff = "045, 045, 045, 1.00";
        this.node.prop.colorFXglobal = "000, 000, 000, 0.50";
        this.node.prop.colorCanvasStrokeOn = "050, 055, 050, 1.00";
        this.node.prop.colorCanvasStrokeOff = "030, 030, 030, 1.00";
        this.node.prop.colorCanvasFX = "000, 000, 000, 0.20";
        this.node.prop.colorBtnOn = "080, 128, 080, 0.20";
        this.node.prop.colorBtnOff = "020, 021, 020, 0.80";
        this.node.prop.colorBtnFXon = "128, 255, 128, 0.30";
        this.node.prop.colorBtnFXoff = "015, 015, 015, 0.50";
        this.node.prop.colorBtnStrokeOn = "128, 255, 128, 0.50";
        this.node.prop.colorBtnStrokeOff = "000, 000, 000, 0.20";
        this.node.prop.colorSlotOn = "065, 065, 065, 1.00";
        this.node.prop.colorSlotOff = "035, 035, 035, 1.00";
        this.node.prop._advanced = "┄┄Advanced┄┄";
        this.node.prop.fontMain = "px Arial";
        this.node.prop.fontSub = "px Arial";
        this.node.prop.collapsable = false;
        this.node.prop.hideLinks = true;
        this.node.prop.slotXoffset = 7;
        this.node.prop.slotYoffset = 7;
        this.node.prop._exp = "┄┄Experimental┄┄";
        this.node.prop.hideSlot = false;
        this.node.prop.canvasWidthOffset = 1.0;
        this.node.prop.derpTitle = "Derp Bool";
        this.node.prop.derpValue = false;
        
        this.node.widgets[0].type = "hidden";
        let originX = 0, originY = 0, canvasWidth = 0, canvasHeight = 0;
        let btnX = 0, btnY = 0, btnW = 0, btnH = 0;
        let cachedTitle = this.node.title;
        let cachedPadRight = 12; 
        let isConnected = 0;

        //for (let name in this.node) { console.log("properties: " + name); }
        this.node.onConfigure = function () {
            this.configured = true;
            this.onPropertyChanged();
        }; 
        this.node.onAdded = function () {
            this.outputs[0].name = "";
            cachedTitle = this.title;
            //this.title = derpTitle(this.title, this.prop.canvasWidth);
            this.widgets[0].value = this.prop.derpValue;
            this.outputs[0].pos = [this.prop.canvasWidth - this.prop.slotXoffset, - LiteGraph.NODE_TITLE_HEIGHT + this.prop.slotYoffset];
            const { colorBtnOn, colorBtnOff, colorSlotOn, colorSlotOff, slotUseBtnColor } = this.prop;
            this.outputs[0].color_on = getRGBA(slotUseBtnColor ? colorBtnOn : this.prop.colorSlotOn);
            this.outputs[0].color_off = getRGBA(slotUseBtnColor ? colorBtnOff : this.prop.colorSlotOff);
            this.bgcolor = getRGBA(this.prop.colorCanvasBGoff);
            this.color = getRGBA("this.prop.colorCanvasBGoff");
            cachedPadRight = this.prop.padRight;
            if (this.prop.hideSlot) {
                this.outputs[0].pos = [12345, -12345];
                this.prop.padRight = 0;
            } else {
                this.outputs[0].pos = [this.prop.canvasWidth - this.prop.slotXoffset, - LiteGraph.NODE_TITLE_HEIGHT + this.prop.slotYoffset];
                this.prop.padRight = cachedPadRight;
            };
            app.canvas.render_connections_border = false;
            this.onConfigure(); 
            this.setDirtyCanvas(true, true);
        };        
        /* ================ onDrawForeground================ */
        this.node.onDrawForeground = function (ctx, canvas) {

            //canvas.render_slot_border = false;
            //this.node.links[0].color_on = getRGBA("0,0,0,0");

            if (this.title !== cachedTitle) {
                this.prop.derpTitle = this.title;
                this.title = derpTitle(this.title, this.prop.canvasWidth);
                cachedTitle = this.title;
                this.setDirtyCanvas(true, true);
            }
            this.size[0] = this.prop.canvasWidth - this.prop.canvasWidthOffset;  // either LiteGraph or Comfy is drawing one extra pixel to the right, this offsets it
            this.size[1] = this.prop.canvasHeight - LiteGraph.NODE_TITLE_HEIGHT;
            if (!this.prop.collapsable) {
                this.flags.collapsed = false;
                this.setDirtyCanvas(true, true);
            }
            // hide the slot: cheating by moving the slot, far from perfect, default off
            if (this.prop.hideSlot && this.is_selected) {
                this.outputs[0].pos = [this.prop.canvasWidth - this.prop.slotXoffset, - LiteGraph.NODE_TITLE_HEIGHT + this.prop.slotYoffset];
                this.prop.padRight = cachedPadRight;

            } else {
                if (this.prop.hideSlot) {
                    this.outputs[0].pos = [12345, -12345];
                    this.prop.padRight = 0;
                }
            };
            /* -------------------- Canvas -------------------- */
            originY = this.prop.canvasHeight - LiteGraph.NODE_TITLE_HEIGHT - this.prop.canvasHeight;//-LiteGraph.NODE_TITLE_HEIGHT;
            canvasWidth = this.prop.canvasWidth;
            canvasHeight = this.prop.canvasHeight ;
            // FX: shadow and glow
            ctx.shadowBlur = this.prop.canvasFXblur;
            ctx.shadowColor = getRGBA(this.prop.colorCanvasFX);
            ctx.shadowOffsetX = this.prop.canvasFXoffsetX;
            ctx.shadowOffsetY = this.prop.canvasFXoffsetY;
            // stroke
            let strokeOffset = 0;
            if (this.prop.canvasStroke) {
                ctx.strokeStyle = getRGBA(this.prop.derpValue ? this.prop.colorCanvasStrokeOn : this.prop.colorCanvasStrokeOff);
                ctx.lineWidth = this.prop.canvasStrokeWT;
                strokeOffset = this.prop.canvasStrokeWT;
            }
            // draw canvas
            ctx.fillStyle = getRGBA(this.prop.derpValue ? this.prop.colorCanvasBGon : this.prop.colorCanvasBGoff);
            ctx.beginPath();
            ctx.roundRect(originX + strokeOffset / 2, originY + strokeOffset / 2, canvasWidth - strokeOffset, canvasHeight - strokeOffset, this.prop.canvasCorner);
            ctx.fill();
            ctx.stroke();
            // rest effects
            resetEffects(ctx);
            // FX: global shadow
            if (this.prop.fxGlobal) {
                ctx.shadowColor = getRGBA(this.prop.colorFXglobal);
                ctx.shadowBlur = 4;
                ctx.shadowOffstX = 0; ctx.shadowOffsetY = 0;
            }
            /* -------------------- Button -------------------- */
            if (this.prop.enableButton) {
                btnX = originX + this.prop.marginX;
                btnY = originY + this.prop.marginY;
                btnW = canvasWidth - this.prop.padRight - this.prop.canvasWidthOffset - this.prop.marginX * 2;
                btnH = canvasHeight - this.prop.padDown - this.prop.marginY;
                // FX: shadow and glow
                if (this.prop.btnFX) {
                    ctx.shadowColor = getRGBA(this.prop.derpValue? this.prop.colorBtnFXon : this.prop.colorBtnFXoff );
                    ctx.shadowBlur = this.prop.btnFXblur;
                    ctx.shadowOffsetX = this.prop.btnFXoffsetX;
                    ctx.shadowOffsetY = this.prop.btnFXoffsetY;
                }
                // stroke
                if (this.prop.btnStroke) {
                    ctx.strokeStyle = getRGBA(this.prop.derpValue? this.prop.colorBtnStrokeOn : this.prop.colorBtnStrokeOff);
                    ctx.lineWidth = this.prop.btnStrokeWT;
                }
                ctx.fillStyle = getRGBA(this.prop.derpValue? this.prop.colorBtnOn : this.prop.colorBtnOff);
                ctx.beginPath();
                ctx.roundRect(btnX, btnY, btnW, btnH, this.prop.canvasCorner - 2);
                ctx.fill();
                ctx.stroke();
                // rest effects
                resetEffects(ctx);
            }
            /* -------------------- Text -------------------- */
            let labelX = btnX + btnW / 2;
            ctx.fillStyle = getRGBA(this.prop.derpValue ? this.prop.colorLabelMainOn : this.prop.colorLabelMainOff);
            ctx.textAlign = "center";
            ctx.font = `${this.prop.labelSizeMain}px Arial`; // Use template literals for font size
            let textH1 = ctx.measureText(this.prop.derpTitle);
            if (this.prop.labelSub === "") {
                let labelY1 = btnY + (btnH + textH1.actualBoundingBoxAscent) / 2; // Center text vertically
                ctx.fillText(this.prop.derpTitle, labelX, labelY1); // Center text within the button
            } else {
                let textH2 = ctx.measureText(this.prop.labelSub);
                let spacing = (btnH - (textH1.actualBoundingBoxAscent + textH2.actualBoundingBoxAscent)) / 10;
                let labelY1 = btnY + (btnH + (textH1.actualBoundingBoxAscent + spacing + textH2.actualBoundingBoxAscent)) / 2 - textH1.actualBoundingBoxAscent - spacing / 2;
                let labelY2 = labelY1 + textH2.actualBoundingBoxAscent + spacing / 2; 
                ctx.fillText(this.prop.derpTitle, labelX, labelY1);
                ctx.fillStyle = getRGBA(this.prop.derpValue ? this.prop.colorLabelSubOn : this.prop.colorLabelSubOff);
                ctx.font = `${this.prop.labelSizeSub}px Arial`; // Use template literals for font size
                ctx.fillText(this.prop.labelSub, labelX, labelY2);
            }
            /* -------------------- No connection text -------------------- */
            if (isConnected == 0) {
                ctx.fillStyle = getRGBA("255,220,180,0.60");
                ctx.font = "8px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("NO CONNECTION", this.size[0] / 2, this.size[1] / 2 - 14);
            };
        };
        this.node.onMouseDown = function (derp) {
            const derpX = derp.canvasX - this.pos[0];
            const derpY = derp.canvasY - this.pos[1];
            const withinBounds = (x, y, w, h) => {
                const withinXBounds = derpX > x && derpX < x + w;
                const withinYBounds = derpY > y && derpY < y + h;
                return withinXBounds && withinYBounds;
            };
            // if button is clicked
            if (withinBounds(btnX, btnY, btnW, btnH)) {
                if (this.prop.derpValue== false) {
                    this.prop.derpValue= true;
                } else {
                    this.prop.derpValue= false;
                }
                this.widgets[0].value = this.prop.derpValue;
                this.graph.setisChangedFlag(this.id);
                return true;
            }
            return false;
        };
        /* ==================== onPropertyChange ==================== */
        this.node.onPropertyChanged = function (Name) {
            if (!this.configured) return;
            if (Name === "slotXoffset" || Name === "slotYoffset" || Name === "canvasWidth") this.outputs[0].pos = [this.prop.canvasWidth - this.prop.slotXoffset, - LiteGraph.NODE_TITLE_HEIGHT + this.prop.slotYoffset];
            if (Name === "colorBtnOn" || Name === "colorBtnOff" || Name === "slotUseBtnColor") {
                if (this.prop.slotUseBtnColor) {
                    this.outputs[0].color_on = getRGBA(this.prop.colorBtnOn);
                    this.outputs[0].color_off = getRGBA(this.prop.colorBtnOff);
                } else {
                    this.outputs[0].color_on = this.prop.colorSlotOn;
                    this.outputs[0].color_off = this.prop.colorSlotOff;
                }
            }
            if (Name === "canvasHeight") this.prop.canvasHeight = clamp(this.prop.canvasHeight, 40, 400);
            // Validates all RGBA values, change the color to red if invalid
            if (typeof Name === 'string' && Name.includes("color")) {
                const propValue = getRGBA(this.prop[Name]);
                if (!validateRGBA(propValue)) {
                    this.prop[Name] = "255, 0, 0, 1";
                }
            }
            if (Name === "canvasWidth") {
                this.prop.canvasWidth = clamp(this.prop.canvasWidth, 70, 1000);
                this.prop.derpTitle = this.title;
                this.title = derpTitle(this.title, this.prop.canvasWidth);
                cachedTitle = this.title;
                this.setDirtyCanvas(true, true);
            }
            // hide the slot: cheating by moving the slot, far from perfect, default off
            if (Name === "hideSlot") {
                if (this.prop.hideSlot) {
                    this.outputs[0].pos = [12345, 12345];
                    this.prop.padRight = 0;
                } else {
                    this.outputs[0].pos = [this.prop.canvasWidth - this.prop.slotXoffset, - LiteGraph.NODE_TITLE_HEIGHT + this.prop.slotYoffset];
                    this.prop.padRight = cachedPadRight;
                }
                this.setDirtyCanvas(true, true);
            };
            this.setDirtyCanvas(true, true);
        };
        this.node.onConnectionsChange = function (slotType, slot, isChangeConnect, link_info, output) {
            isConnected = this.outputs[0].links.length;
            const linkID = link_info.id;
            this.graph.links[linkID].color = this.prop.hideLinks ? getRGBA("0, 0, 0, 0") : LiteGraph.LINK_COLOR;
        }
    }
}
app.registerExtension({
    name: "xcpDerpBool",
    async beforeRegisterNodeDef(nodeType, nodeData, _app) {
        if (nodeData.name === "xcpDerpBool") {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                if (onNodeCreated) onNodeCreated.apply(this, []);
                this.xcpDerpBool = new xcpDerpBool(this);
            };
        }
    }
});


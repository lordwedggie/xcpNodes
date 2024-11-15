/* xcp Derp Nodes by lordwedggie
Based on Max Smirnov's mxToolkit. check out his nodes at: https://github.com/Smirnov75/ComfyUI-mxToolki */
import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";
import { getRGBA, getMidpointColor, validateRGBA, clamp, resetEffects} from "./xcpUtils.js";
class xcpDerpSeed {
    constructor(node) {
        this.node = node;
        this.node.prop = this.node.properties || {};
        this.node.prop.min = 1;
        this.node.prop.max = 4294967296;
        this.node.prop.autorunQueue = true;
        this.node.prop.interruptQueue = true;
        this.node.prop.canvasWidth = 100;
        this.node.prop.canvasHeight = 80;
        this.node.prop.seedsKept = 5;
        this.node.prop.textSizeSeedNew = 10;
        this.node.prop.textSizeSeedOld = 8;
        this.node.prop.textMarginLeft = 2;
        this.node.prop.marginX = 4;
        this.node.prop.MarginRight = 8;
        this.node.prop.marginY = 6;
        this.node.prop.padRight = 4;
        this.node.prop.padDown = 4;
        this.node.prop.btnSize = 20;
        this.node.prop.canvasCorner = 4;
        this.node.prop._fx = "┄┄Effects┄┄";
        this.node.prop.fxGlobal = true;
        this.node.prop.canvasStroke = true;
        this.node.prop.canvasStrokeWT = 1.0;
        this.node.prop._colors = "┄┄Colors┄┄";
        this.node.prop.colorSeedNew = "255, 255, 255, 1.00";
        this.node.prop.colorSeedOld = "255, 255, 255, 0.20";
        this.node.prop.colorCanvasBG = "045, 045, 045, 1.00";
        this.node.prop.colorFXglobal = "000, 000, 000, 0.50";
        this.node.prop.colorCanvasStroke = "030, 030, 030, 1.00";
        this.node.prop.colorBtnOn = "080, 128, 080, 0.20";
        this.node.prop.colorBtnOff = "035, 035, 035, 0.80";
        this.node.prop.colorBtnIndicator = "255, 255, 255, 0.50";
        this.node.prop.colorBtnIndicatorMO = "255, 255, 255, 0.80";
        this.node.prop.colorHistoryBG = "035, 035, 035, 0.20";
        this.node.prop._advanced = "┄┄Advanced┄┄";
        this.node.prop.fontSeedNew = "px Arial";
        this.node.prop.fontSeedOld = "px Arial";
        this.node.prop.historyAlign = "center";
        this.node.prop.collapsable = false;
        this.node.prop.hideLinks = true;
        this.node.prop.canvasWidthOffset = 1;
        this.node.prop.slotXoffset = 7;
        this.node.prop.slotYoffset = 7;
        this.node.prop.historyMarginY = 10;
        this.node.prop.historySlotH = 14;
        this.node.prop.historyHspacing = 2;
        this.node.prop.btnIndicator = "▶"
        this.node.prop.btnIndicatorSize = 8;
        this.node.prop._exp = "┄┄Experimental┄┄";
        this.node.prop.hideSlot = false;
        this.node.prop.derpSeed = 666;
        this.node.history = [];

        this.node.widgets[0].type = "hidden";
        let originX = 0, originY = 0,canvasWidth = 0,canvasHeight = 0;
        let btnX = 0, btnY = 0, btnW = 0, btnH = 0;
        let historyX = 0, historyY = 0, historyW = 0, historyH = 0;
        let cachedPadRight = 4; 
        let isConnected = 0;
        this.node.onAdded = function () {
            this.outputs[0].name = "";
            this.outputs[0].pos = [this.prop.canvasWidth - this.prop.slotXoffset, - LiteGraph.NODE_TITLE_HEIGHT + this.prop.slotYoffset];
            this.lastprocessed = null;
            this.configured = false;
            this.prop.history = [0];
            cachedPadRight = this.prop.padRight;
            if (this.prop.hideSlot) {
                this.outputs[0].pos = [12345, -12345];
                this.prop.padRight = 0;
            } else {
                this.outputs[0].pos = [this.prop.canvasWidth - this.prop.slotXoffset, - LiteGraph.NODE_TITLE_HEIGHT + this.prop.slotYoffset];
                this.prop.padRight = cachedPadRight;
            };
            app.canvas.render_connections_border = false;
        };
        this.node.onConfigure = function () {
            this.history = [this.prop.derpSeed];
            this.configured = true;
        }
        this.node.onMouseDown = function (derp) {
            if ((derp.canvasX - this.pos[0]) > btnX + btnW) {
                return false;
            }
            this.updateThisNodeGraph();
            return true;
        };
        this.node.onMouseUp = function (derp, pos, canvas) {
            const derpX = derp.canvasX - this.pos[0];
            const derpY = derp.canvasY - this.pos[1];
            const withinBounds = (x, y, w, h) => {
                const withinXBounds = derpX > x && derpX < x + w;
                const withinYBounds = derpY > y && derpY < y + h;
                return withinXBounds && withinYBounds;
            };
            let ps = Math.floor((derp.canvasY - this.pos[1] + this.prop.marginY + this.prop.historyHspacing * 2 + historyH) / historyH);
            if (ps > 0 && ps < this.prop.history.length && derp.canvasX - this.pos[0] < btnX) {
                this.prop.history.unshift(this.prop.history[ps]);
                this.prop.history.splice(ps + 1, 1);
                this.lastprocessed = null;
                this.processSeed();
            } else if (ps === 0) {
                if (this.configured) this.lastprocessed = this.prop.history[0];
                canvas.prompt("Seed", this.prop.derpSeed, function (v) {
                    if (!isNaN(Number(v))) this.processSeed(Number(v));
                }.bind(this), derp);
                return;
            }
            // button clicked
            if (withinBounds(btnX, btnY, btnW, btnH)) {
                if (derp.shiftKey) {
                    this.processSeed((this.prop.derpSeed < this.prop.max) ? this.prop.derpSeed + 1 : this.prop.min);
                } else {
                    this.processSeed();
                }
            }
        };
        /* ==================== onPropertyChange ==================== */
        this.node.onPropertyChanged = function (Name) {
            if (this.prop.min < 0) this.prop.min = 0;
            this.randomRange = this.prop.max - this.prop.min;
            if (!this.configured) return;
            if (this.prop.derpSeed !== this.lastprocessed) this.processSeed(this.prop.derpSeed);
            if (Name === "slotXoffset" || Name === "slotYoffset" || Name === "canvasWidth") this.outputs[0].pos = [this.prop.canvasWidth - this.prop.slotXoffset, - LiteGraph.NODE_TITLE_HEIGHT + this.prop.slotYoffset];
            this.setDirtyCanvas(true, true);
        };
        /* ==================== prcessSeed ==================== */
        this.node.processSeed = function (s) {            
            let newSeed;
            if (s === undefined) {
                do { newSeed = Math.round(Math.random() * (this.prop.max - this.prop.min) + this.prop.min) } while (newSeed === this.lastprocessed);
            } else newSeed = s;
            if (this.lastprocessed === null && this.configured) newSeed = this.prop.history[0];
            if (newSeed !== this.prop.history[0]) {
                {
                    this.prop.history.unshift(newSeed);                    
                    if (this.prop.history.length === 2 && this.lastprocessed === null && !this.configured) { this.prop.history.splice(1); this.configured = true;}
                    if (this.prop.history.length > this.prop.seedsKept) { this.prop.history.splice(this.prop.seedsKept) }
                }
            }
            this.lastprocessed = newSeed;
            this.prop.derpSeed = newSeed;
            this.widgets[0].value = newSeed;
            if (this.prop.interruptQueue) api.interrupt();
            if (this.prop.autorunQueue) app.queuePrompt(0);            
        }
        /* ==================== onDrawForeground ==================== */
        this.node.onDrawForeground = function (ctx) {
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
            canvasHeight = this.prop.canvasHeight;
            // stroke
            let strokeOffset = 0;
            if (this.prop.canvasStroke) {
                ctx.strokeStyle = getRGBA(this.prop.colorCanvasStroke);
                ctx.lineWidth = this.prop.canvasStrokeWT;
                strokeOffset = this.prop.canvasStrokeWT;
            }
            // draw canvas
            ctx.fillStyle = getRGBA(this.prop.colorCanvasBG);
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
                ctx.shadowOffstX = -1; ctx.shadowOffsetY = 0;
            }
            /* -------------------- Button -------------------- */
            btnW = this.prop.btnSize;
            btnH = canvasHeight - this.prop.marginY - this.prop.padDown;
            btnX = canvasWidth - this.prop.padRight - btnW - this.prop.marginX - this.prop.MarginRight;
            btnY = originY + this.prop.marginY;
            // draw button
            ctx.fillStyle = getRGBA(this.prop.colorBtnOff);
            ctx.beginPath();
            ctx.roundRect(btnX, btnY, btnW, btnH, this.prop.canvasCorner - 2);
            ctx.fill();
            ctx.stroke();
            // draw execute indicator
            ctx.font = `${this.prop.btnIndicatorSize}${this.prop.fontTitle}`;
            ctx.fillStyle = this.mouseOver? getRGBA(this.prop.colorBtnIndicatorMO) : getRGBA(this.prop.colorBtnIndicator);
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText(this.prop.btnIndicator, btnX + btnW / 2, btnY + btnH / 2);
            /* -------------------- Text -------------------- */
            // draw history slots
            historyW = canvasWidth - this.prop.MarginRight - this.prop.padRight - btnW - this.prop.historyHspacing * 4 - 2;
            historyH = this.prop.historySlotH - this.prop.historyHspacing;
            historyX = originX + this.prop.marginX;
            historyY = originY + this.prop.marginY +  this.prop.historyHspacing / 2;
            ctx.fillStyle = getRGBA(this.prop.colorHistoryBG);
            ctx.beginPath();
            for (let i = 0; i < this.prop.history.length; i++) {
                ctx.roundRect( historyX, historyY + (this.prop.historySlotH * i), historyW, historyH, 2 );
            }
            ctx.fill();
            // draw history seeds
            ctx.textBaseline = "center";
            ctx.textAlign = "left";
            for (let i = 0; i < this.prop.history.length; i++) {
                if (i === 0) {
                    ctx.fillStyle = getRGBA(this.prop.colorSeedNew);
                    ctx.font = (this.prop.textSizeSeedNew) + this.prop.fontSeedNew;
                } else {
                    ctx.fillStyle = getRGBA(this.prop.colorSeedOld);
                    ctx.font = (this.prop.textSizeSeedOld) + this.prop.fontSeedOld;
                }
                if (this.prop.historyAlign === "center") {
                    ctx.textAlign = "center";
                    ctx.fillText(this.prop.history[i], historyX + historyW / 2, historyY + historyH / 2 + this.prop.historySlotH * i);
                } else if (this.prop.historyAlign === "right") {
                    ctx.textAlign = "right";
                    ctx.fillText(this.prop.history[i], historyX + historyW - this.prop.textMarginLeft, historyY + historyH / 2 + this.prop.historySlotH * i);
                } else {
                    ctx.fillText(this.prop.history[i], historyX + this.prop.textMarginLeft, historyY + historyH / 2 + this.prop.historySlotH * i);
                }               
            }
            /* -------------------- No connection text -------------------- */
            if (isConnected == 0) {
                ctx.fillStyle = getRGBA("255,220,180,0.60");
                ctx.font = "10px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("NO CONNECTION", this.size[0] / 2, this.size[1] / 2 - 14);
            };
        };
        this.node.onConnectionsChange = function (slotType, slot, isChangeConnect, link_info, output) {
            isConnected = this.outputs[0].links.length;
            const linkID = link_info.id;
            this.graph.links[linkID].color = this.prop.hideLinks ? getRGBA("0, 0, 0, 0") : LiteGraph.LINK_COLOR;
        }
    }
}
app.registerExtension({
    name: "xcpDerpSeed",
    async beforeRegisterNodeDef(nodeType, nodeData, _app) {
        if (nodeData.name === "xcpDerpSeed") {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                if (onNodeCreated) onNodeCreated.apply(this, []);
                this.xcpDerpSeed = new xcpDerpSeed(this);
            };
        }
    }
});
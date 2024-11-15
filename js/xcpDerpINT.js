/* 
xcpNodes - lordwedggie
Based on: ComfyUI.mxToolkit.Slider v.0.9.2 - Max Smirnov 2024 XCP modifications 
 webfiltered_21234 on Element for letting me know how to change link border coloir*/
import { app } from "../../scripts/app.js";
import { getRGBA, validateRGBA, clamp, resetEffects, derpTitle } from "./xcpUtils.js";
class xcpDerpINT
{
    constructor(node) {
        //super(node); // Call the parent class constructor
        this.node = node;
        this.node.prop = this.node.properties || {};
        this.node.prop.labelAlign = "right";
        this.node.prop.min = 1;
        this.node.prop.max = 80;
        this.node.prop.step = 1;
        this.node.prop.defaultValue = 20;
        this.node.prop.enableLRbtn = true;
        this.node.prop.enableDefault = true;
        this.node.prop.canvasWidth = 200;
        this.node.prop.canvasHeight = 40;
        this.node.prop.stepMultiplier = 5;
        this.node.prop._layout = "┄┄Layout┄┄";
        this.node.prop.padRight = 12; // offset from the right side
        this.node.prop.padDown = 4; // offset from downunder
        this.node.prop.marginX = 4;
        this.node.prop.marginY = 4;
        this.node.prop.labelSizeTitle = 10;
        this.node.prop.labelSizeOutput = 12;
        this.node.prop.canvasCorner = 4;
        this.node.prop.LRbtnSizeOffset = -2;
        this.node.prop.LRbtnCorner = 2;
        this.node.prop.fillBarHsize = 0.4;
        this.node.prop.fillBarCorner = 1;
        this.node.prop._fx = "┄┄Effects┄┄";
        this.node.prop.fxGlobal = true;
        this.node.prop.CanvasStroke = true;
        this.node.prop.enableSliderBG = true;
        this.node.prop.sliderBGstroke = true;
        this.node.prop.sliderFX = true;
        this.node.prop.fillbarAlphaFX = true;
        this.node.prop.defaultBtnStroke = true;
        this.node.prop.canvasStrokeWT = 0.4;
        this.node.prop.canvasFXblur = 8;
        this.node.prop.canvasFXoffsetY = 2;
        this.node.prop.sliderFXblur = 4;
        this.node.prop.sliderFXoffsetY = 1;
        this.node.prop.defaultStrokeWT = 1;
        this.node.prop.fillbarAlphaBase = 0.2;
        this.node.prop._colours = "┄┄Colors┄┄";
        this.node.prop.colorTitle = "255, 255, 255, 0.20";
        this.node.prop.colorOutputText = "255, 255, 255, 0.90";
        this.node.prop.colorCanvasBG = "045, 045, 045, 1.00";
        this.node.prop.colorFXglobal = "000, 000, 000, 0.50";
        this.node.prop.colorCanvasStroke = "030, 030, 030, 1.00";
        this.node.prop.colorCanvasFX = "000, 000, 000, 0.20";
        this.node.prop.colorSliderBG = "005, 010, 005, 0.20";
        this.node.prop.colorSliderBGstroke = "000, 000, 000, 0.20";
        this.node.prop.colorSliderOn = "128, 255, 128, 0.50";
        this.node.prop.colorSliderOff = "015, 015, 015, 0.50";
        this.node.prop.colorsliderFXon = "128, 255, 128, 0.30";
        this.node.prop.colorsliderFXoff = "015, 015, 015, 0.50";
        this.node.prop.colorFillbarOn = "128, 196, 255, 0.80";
        this.node.prop.colorFillbarOff = "128, 196, 255, 0.50";
        this.node.prop.colorLRbtn = "128, 128, 128, 0.30";
        this.node.prop.colorLRbtnIndi = "255, 255, 255, 0.50";
        this.node.prop.defaultBtn = "128, 128, 128, 0.30";
        this.node.prop.colorBtnStrokeOn = "128, 255, 128, 0.50";
        this.node.prop.colorBtnStrokeOff = "000, 000, 000, 0.20";
        this.node.prop.colorSlotOn = "255, 255, 255, 0.50";
        this.node.prop.colorSlotOff = "000, 000, 000, 0.10";
        this.node.prop._advanced = "┄┄Advanced┄┄";
        this.node.prop.fontTitle = "px Arial";
        this.node.prop.fontOutput = "px Arial";
        this.node.prop.collapsable = false;
        this.node.prop.slotUseFillbarColor = true;
        this.node.prop.hideLinks = true;
        this.node.prop.labelMarginLeft = 5;
        this.node.prop.labelSpacingX = 4;
        this.node.prop.sliderBGoffset = 2;
        this.node.prop.sliderBGstrokeWT = 1;
        this.node.prop.LRbtnSqueeze = 0.8;
        this.node.prop.slotXoffset = 7;
        this.node.prop.slotYoffset = 7;
        this.node.prop.LbtnIndicator = "◄";
        this.node.prop.RbtnIndicator = "►";
        this.node.prop.defaultBtnIndi = "↺";
        this.node.prop._exp = "┄┄Experimental┄┄";
        this.node.prop.hideSlot = false;
        this.node.prop.canvasWidthOffset = 1.0;
        this.node.prop.derpValue = 20;
        this.node.prop.derpTitle = "Derp INT";

        this.node.intpos = { x: 0.5 };
        this.node.widgets[0].type = "hidden";

        let originX = 0;
        let originY = 0;
        let canvasWidth = 0;
        let canvasHeight = 0;
        let sliderBGY = 0;
        let sliderBGheight = 0;
        let LbtnX = 0;
        let RbtnX = 0;
        let LRbtnY = 0;
        let LRbtnH = 0;
        let LRbtnW = 0;
        let fillBarX = 0;
        let fillBarY = 0;
        let fillBarW = 0;
        let fillBarH = 0;
        let defaultBtnW = 0;
        let defaultBtnH = 0;
        let defaultBtnX = 0;
        let defaultBtnY = 0;
        let cachedTitle = this.node.title;
        let cachedPadRight = 12;
        let isConnected = 0;
        let templateSlotColorOn = "";
        let templateSlotColorOff = "";

        this.node.onConfigure = function () {
            this.configured = true;
            this.onPropertyChanged();
        }
        this.node.onAdded = function () {
            this.outputs[0].name = "";
            cachedTitle = this.title;
            this.title = derpTitle(this.title, this.prop.canvasWidth);
            this.widgets[0].value = this.prop.derpValue;
            this.outputs[0].pos = [this.prop.canvasWidth - this.prop.slotXoffset, - LiteGraph.NODE_TITLE_HEIGHT + this.prop.slotYoffset];
            this.derpValue = this.widgets[0].value;
            templateSlotColorOn = this.outputs[0].color_on;
            templateSlotColorOff = this.outputs[0].color_off;
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
        };
        this.node.onPropertyChanged = function (Name) {
            if (!this.configured) return;
            if (Name === "slotXoffset" || Name === "slotYoffset" || Name === "canvasWidth") this.outputs[0].pos = [this.prop.canvasWidth - this.prop.slotXoffset, - LiteGraph.NODE_TITLE_HEIGHT + this.prop.slotYoffset];
            if (Name === "canvasHeight") this.prop.canvasHeight = clamp(this.prop.canvasHeight, 40, 400);
            if (Name === "derpValue") this.prop.derpValue = clamp(this.prop.derpValue, this.prop.min, this.prop.max);
            if (Name === "canvasWidth") {
                this.prop.canvasWidth = clamp(this.prop.canvasWidth, 70, 1000);
                this.prop.derpTitle = this.title;
                this.title = derpTitle(this.title, this.prop.canvasWidth);
                //parsedTitle = this.title;
            }
            if (Name === "colorFillbarOn" || Name === "colorFillbarOn" || Name === "slotUseFillbarColor") {
                if (this.prop.slotUseBtnColor) {
                    this.outputs[0].color_on = getRGBA(this.prop.colorFillbarOn);
                    this.outputs[0].color_off = getRGBA(this.prop.colorFillbarOff);
                } else {
                    this.outputs[0].color_on = templateSlotColorOn;
                    this.outputs[0].color_off = templateSlotColorOff;
                }
            }
            // Validates all RGBA values, change the color to red if invalid
            if (typeof Name === 'string' && Name.includes("color")) {
                const propValue = getRGBA(this.prop[Name]);
                if (!validateRGBA(propValue)) {
                    this.prop[Name] = "255, 0, 0, 1";
                }
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
            this.intpos.x = Math.max(0, Math.min(1, (this.prop.derpValue - this.prop.min) / (this.prop.max - this.prop.min)));
            this.setDirtyCanvas(true, true);
        };
        /* ================ onDrawForeground================ */
        this.node.onDrawForeground = function (ctx, lGraphCanvas) {
            // apply title changes to derpTitle then parse the real title so a string too long won't show
            // please let me know if there is a way to hide the title or make it fully transparent
            if (this.title !== cachedTitle) {
                this.prop.derpTitle = this.title;
                this.title = derpTitle(this.title, this.prop.canvasWidth);
                cachedTitle = this.title;
                this.setDirtyCanvas(true, true);
            }
            this.size[0] = this.prop.canvasWidth - this.prop.canvasWidthOffset;  // either LiteGraph or Comfy is drawing one extra pixel to the right, this offsets it
            this.size[1] = this.prop.canvasHeight - LiteGraph.NODE_TITLE_HEIGHT;
            this.intpos.x = Math.max(0, Math.min(1, (this.prop.derpValue - this.prop.min) / (this.prop.max - this.prop.min)));
            if (!this.prop.collapsable) {
                this.flags.collapsed = false;
                this.setDirtyCanvas(true, true);
            }
            if (this.prop.slotUseFillbarColor) {
                this.outputs[0].color_on = getRGBA(this.prop.colorFillbarOff);
                this.outputs[0].color_off = getRGBA(this.prop.colorCanvasBG);
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
            // FX: shadow and glow
            ctx.shadowBlur = this.prop.canvasFXblur;
            ctx.shadowColor = getRGBA(this.prop.colorCanvasFX);
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = this.prop.canvasFXoffsetY;
            // stroke
            let strokeOffset = 0;
            if (this.prop.CanvasStroke) {
                ctx.strokeStyle = getRGBA(this.prop.colorCanvasStroke);
                ctx.lineWidth = this.prop.canvasStrokeWT;
                strokeOffset = this.prop.canvasStrokeWT;
            }
            // draw canvas
            ctx.fillStyle = getRGBA(this.prop.colorCanvasBG);
            ctx.beginPath();
            ctx.roundRect(originX + strokeOffset / 2, originY + strokeOffset / 2, canvasWidth - strokeOffset, canvasHeight - strokeOffset, this.prop.canvasCorner);
            ctx.fill();
            if (this.prop.CanvasStroke) ctx.stroke();
            // rest effects
            resetEffects(ctx);
            // FX: global shadow
            if (this.prop.fxGlobal) {
                ctx.shadowColor = getRGBA(this.prop.colorFXglobal);
                ctx.shadowBlur = 4;
                ctx.shadowOffstX = 0; ctx.shadowOffsetY = 0;
            }
            /* -------------------- Text -------------------- */
            let formattedValue = this.prop.derpValue.toFixed(0);

            ctx.font = `${this.prop.labelSizeTitle}${this.prop.fontTitle}`;
            let textW1 = ctx.measureText(this.prop.derpTitle);
            let labelHeight = Math.max(this.prop.labelSizeTitle, this.prop.labelSizeOutput);
            let labelX = originX + this.prop.labelMarginLeft;
            let labelY = originY + this.prop.marginY;
            ctx.fillStyle = getRGBA(this.prop.colorTitle);
            ctx.textBaseline = "top";
            ctx.textAlign = "left";
            ctx.fillText(this.prop.derpTitle, labelX, labelY);
            ctx.fillStyle = getRGBA(this.prop.colorOutputText);
            ctx.font = `${this.prop.labelSizeOutput}${this.prop.fontOutput}`;
            let textW2 = ctx.measureText(formattedValue);
            let labelOutputX = labelX + textW1.width + this.prop.labelSpacingX;
            if (this.prop.labelAlign === "right") {
                labelOutputX = canvasWidth - textW2.width / 2 - this.prop.padRight;
                ctx.textAlign = "right";
            }
            ctx.fillText(formattedValue, labelOutputX, labelY);
            /* -------------------- SliderBG -------------------- */
            let sliderBGwidth = canvasWidth - this.prop.canvasWidthOffset - this.prop.marginX * 2;
            sliderBGheight = canvasHeight - this.prop.padDown - labelHeight - this.prop.marginY - this.prop.sliderBGoffset;
            let sliderBGX = this.prop.marginX;
            if (this.prop.enableDefault) {
                sliderBGX += sliderBGheight; sliderBGwidth -= sliderBGheight;
            }
            sliderBGY = originY + this.prop.marginY + labelHeight + this.prop.sliderBGoffset;
            // stroke
            if (this.prop.enableSliderBG) {
                let strokeOffset = 0;                
                if (this.prop.sliderBGstroke) {
                    ctx.strokeStyle = getRGBA(this.prop.colorSliderBGstroke);
                    ctx.lineWidth = this.prop.sliderBGstrokeWT;
                    strokeOffset = this.prop.sliderBGstrokeWT;
                }
                ctx.fillStyle = getRGBA(this.prop.colorSliderBG);
                ctx.beginPath();
                ctx.roundRect(sliderBGX + strokeOffset / 2, sliderBGY + strokeOffset / 2, sliderBGwidth - strokeOffset, sliderBGheight - strokeOffset, this.prop.LRbtnCorner);
                ctx.fill();
                if (this.prop.sliderBGstroke) ctx.stroke();
            }
            /* -------------------- LRbtn -------------------- */
            LRbtnW = 0;
            LRbtnH = sliderBGheight;
            LRbtnY = sliderBGY;
            let indicatorSize = 0.4;
            if (this.prop.enableLRbtn) {
                LRbtnW = (sliderBGheight + this.prop.LRbtnSizeOffset) * this.prop.LRbtnSqueeze;
                LRbtnH = sliderBGheight + this.prop.LRbtnSizeOffset;
                LbtnX = sliderBGX + (sliderBGheight - LRbtnH) / 2;
                RbtnX = sliderBGX + sliderBGwidth - LRbtnW - (sliderBGheight - LRbtnH) / 2;
                LRbtnY = sliderBGY - this.prop.LRbtnSizeOffset / 2;
                // draw left button
                ctx.fillStyle = getRGBA(this.prop.colorLRbtn);
                if (this.prop.derpValue <= this.prop.min) ctx.fillStyle = getRGBA(this.prop.colorLRbtnOff);
                ctx.beginPath();
                ctx.roundRect(LbtnX, LRbtnY, LRbtnW, LRbtnH, this.prop.LRbtnCorner);
                ctx.fill();
                // draw left indicator
                ctx.fillStyle = getRGBA(this.prop.colorLRbtnIndi);
                ctx.font = `${LRbtnH * indicatorSize}px Arial`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(this.prop.LbtnIndicator, LbtnX + LRbtnW / 2, LRbtnY + LRbtnH / 2);
                // draw right button
                ctx.fillStyle = getRGBA(this.prop.colorLRbtn);
                if (this.prop.derpValue >= this.prop.max) ctx.fillStyle = getRGBA(this.prop.colorLRbtnOff);
                ctx.beginPath();
                ctx.roundRect(RbtnX, LRbtnY, LRbtnW, LRbtnH, this.prop.LRbtnCorner);
                ctx.fill();
                // draw right indicator
                ctx.fillStyle = getRGBA(this.prop.colorLRbtnIndi);
                ctx.font = `${LRbtnH * indicatorSize}px Arial`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(this.prop.RbtnIndicator, RbtnX + LRbtnW / 2, LRbtnY + LRbtnH / 2);
            }
            /* -------------------- DefaultBtn -------------------- */
            if (this.prop.enableDefault) {
                let strokeOffset = 0;
                defaultBtnW = sliderBGheight;
                defaultBtnH = defaultBtnW;
                defaultBtnX = this.prop.marginX;
                defaultBtnY = sliderBGY;
                if (this.prop.defaultBtnStroke) {
                    ctx.strokeStyle = getRGBA(this.prop.colorBtnStrokeOff);
                    ctx.lineWidth = this.prop.defaultStrokeWT;
                    strokeOffset = this.prop.defaultStrokeWT;
                }
                ctx.fillStyle = getRGBA(this.prop.defaultBtn);
                ctx.beginPath();
                ctx.roundRect(defaultBtnX + strokeOffset / 2, defaultBtnY + strokeOffset / 2,
                    defaultBtnW - strokeOffset, defaultBtnH - strokeOffset, this.prop.LRbtnCorner);
                ctx.fill();
                if (this.prop.defaultBtnStroke) ctx.stroke();
                resetEffects(ctx);
                // default button indicator
                let defaultBtnIndiSize = 0.5;
                ctx.fillStyle = getRGBA(this.prop.colorLRbtnIndi);
                ctx.font = `${defaultBtnH * defaultBtnIndiSize}px Arial`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(this.prop.defaultBtnIndi, defaultBtnX + defaultBtnW / 2, defaultBtnY + defaultBtnH / 2);
            };
            /* -------------------- fillBar -------------------- */
            let fillBarMargin = 2;
            fillBarW = sliderBGwidth - LRbtnW * 2 - fillBarMargin * 2;
            fillBarH = LRbtnH * this.prop.fillBarHsize;
            fillBarX = sliderBGX + LRbtnW + fillBarMargin;
            fillBarY = LRbtnY + (LRbtnH - fillBarH) / 2;
            let fillBarPos = fillBarW * this.intpos.x;
            let baseAlpha = this.prop.fillbarAlphaBase;

            ctx.fillStyle = this.capture ? getRGBA(this.prop.colorFillbarOn) : getRGBA(this.prop.colorFillbarOff);
            if (this.prop.fillbarAlphaFX) {
                if (this.capture) {
                    ctx.fillStyle = derpAlpha(getRGBA(this.prop.colorFillbarOn), baseAlpha + this.intpos.x * (1 - baseAlpha));
                } else {
                    ctx.fillStyle = derpAlpha(getRGBA(this.prop.colorFillbarOff), baseAlpha + this.intpos.x * (1 - baseAlpha));
                }
            }
            ctx.beginPath();
            ctx.roundRect(fillBarX, fillBarY, fillBarPos, fillBarH, this.prop.fillBarCorner);
            ctx.fill();
            /* -------------------- No connection text -------------------- */
            if (isConnected == 0) {
                ctx.fillStyle = getRGBA("255,220,180,0.60");
                ctx.font = "12px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("NO CONNECTION", this.size[0] / 2, this.size[1] / 2 - 14);
            };
        };
        /* -------------------- MOUSE STUFF -------------------- */
        this.node.onDblClick = function (derp, pos, canvas) {
            if (derp.canvasX > this.pos[0] + canvasWidth * 0.2 && derp.canvasY < this.pos[1] + sliderBGY) {
                canvas.prompt("value", this.prop.derpValue, function (v) { if (!isNaN(Number(v))) { this.prop.derpValue = Number(v); this.onPropertyChanged("derpValue"); } }.bind(this), derp);
                this.widgets[0].value = this.prop.derpValue;
                return true;
            }
            return false;
        }
        this.node.onMouseDown = function (derp) {
            //if (derp.canvasY - this.pos[1] < originY ) return false;
            //if (derp.canvasY < this.pos[1] +LRbtnY) return false;
            //if (derp.canvasY > this.pos[1] + LRbtnH) return false;
            const derpX = derp.canvasX - this.pos[0];
            const derpY = derp.canvasY - this.pos[1];
            const tolerance = 0;
            // check if mouse is within bounds
            const withinBounds = (x, y, w, h) => {
                const withinXBounds = derpX > x && derpX < x + w;
                const withinYBounds = derpY > y && derpY < y + h;
                return withinXBounds && withinYBounds;
            };

            // if slider is clicked
            if (withinBounds(fillBarX, sliderBGY - tolerance, fillBarW, sliderBGheight + tolerance * 2)) {
                this.capture = true;
                this.unlock = false;
                this.captureInput(true);
                this.onMouseMove(derp);
                return true;
            }

            // if left button is clicked
            if (withinBounds(LbtnX, LRbtnY, LRbtnW, LRbtnH)) {
                if (this.prop.derpValue > this.prop.min) {
                    if (derp.shiftKey) {
                        this.prop.derpValue = Math.max(this.prop.min, this.prop.derpValue - this.prop.step * this.prop.stepMultiplier);
                    } else { 
                        this.prop.derpValue -= this.prop.step;
                    }
                    this.intpos.x = Math.max(0, Math.min(1, (this.prop.derpValue - this.prop.min) / (this.prop.max - this.prop.min)));
                    this.graph.setisChangedFlag(this.id);
                    this.widgets[0].value = this.prop.derpValue;
                }
                return true;
            }
            // if right button is clicked
            if (withinBounds(RbtnX, LRbtnY, LRbtnW, LRbtnH)) {
                if (this.prop.derpValue < this.prop.max) {
                    if (derp.shiftKey) {
                        this.prop.derpValue = Math.min(this.prop.max, this.prop.derpValue + this.prop.step * this.prop.stepMultiplier);
                    } else { 
                        this.prop.derpValue += this.prop.step;
                    }
                    this.intpos.x = Math.max(0, Math.min(1, (this.prop.derpValue - this.prop.min) / (this.prop.max - this.prop.min)));
                    this.graph.setisChangedFlag(this.id);
                    this.widgets[0].value = this.prop.derpValue;
                }
                return true;
            }

            // if revert to default button is clicked
            if (this.prop.enableDefault) {
                if (withinBounds(defaultBtnX, defaultBtnY, defaultBtnW, defaultBtnH)) {
                    this.prop.derpValue = this.prop.defaultValue;
                    this.intpos.x = Math.max(0, Math.min(1, (this.prop.derpValue - this.prop.min) / (this.prop.max - this.prop.min)));
                    this.graph.setisChangedFlag(this.id);
                    this.widgets[0].value = this.prop.derpValue;
                }
            }
            return false;
        };
        this.node.onMouseMove = function (derp) {
            if (!this.capture) return false;
            let prevX = this.prop.derpValue;
            let rn = Math.pow(10, 0);
            let vX = (derp.canvasX - this.pos[0] - fillBarX) / fillBarW;

            this.intpos.x = Math.max(0, Math.min(1, vX));
            this.prop.derpValue = Math.round(rn * (this.prop.min + (this.prop.max - this.prop.min) * ((this.unlock) ? vX : this.intpos.x))) / rn;

            if (this.properties.value !== prevX) this.graph.setisChangedFlag(this.id);
        };
        this.node.onMouseUp = function () {
            this.capture = false;
            this.captureInput(false);
            this.widgets[0].value = this.prop.derpValue;
            this.graph.setisChangedFlag(this.id);
        };
        this.node.onConnectionsChange = function (slotType, slot, isChangeConnect, link_info, output) {
            isConnected = this.outputs[0].links.length;
            const linkID = link_info.id;
            this.graph.links[linkID].color = this.prop.hideLinks ? getRGBA("0, 0, 0, 0") : LiteGraph.LINK_COLOR;
        }
        function derpAlpha(rgbaString, newAlpha) {
            // Validate the input
            if (typeof rgbaString !== 'string' || typeof newAlpha !== 'number' || newAlpha < 0 || newAlpha > 1) {
                throw new Error('Invalid input parameters');
            }
            const rgbaComponents = rgbaString.split(',').map(component => component.trim());
            if (rgbaComponents.length !== 4) {
                throw new Error('Invalid RGBA string format');
            }
            rgbaComponents[3] = newAlpha.toFixed(2);
            return rgbaComponents.join(', ');
        }
    }
}

app.registerExtension(
{
        name: "xcpDerpINT",
    async beforeRegisterNodeDef(nodeType, nodeData, _app)
    {
        if (nodeData.name === "xcpDerpINT")
        {
			const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                if (onNodeCreated) onNodeCreated.apply(this, []);
                this.xcpDerpINT = new xcpDerpINT(this);
            }
        }
    }
});

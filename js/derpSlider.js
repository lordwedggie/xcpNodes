// DerpNode: derpSlider by lordwedggie
import { app } from "../../scripts/app.js";
import { derpBase } from "./derpBase.js";
import { simpleRGBA, getRGBA, getMidpointColor, validateRGBA, resetEffects } from "./herbina/xcpShitUtils.js";
//import { contentOptions, canvasOptions, paletteOptions, effectsOptions, effectsPaletteOptions, } from "./herbina/optionPanels.js";
//==========================LGraph registration/==========================
class derpSlider extends derpBase{
    constructor(node) {
        super(node);
        this.node = node;
        this.node.prop = this.node.properties || {};
        this.node.prop.sliderOptions = [];


        this.node.onConfigure = function () {
            this.configured = true;
        };
        const test1 = { name: "test1", value: 10 };
        this.node.onAdded = function () {
            console.log("derpFloat loaded!");
            console.log("contentOptions:", this.prop.derpNodeOptions);
            console.log("this.prop.derpCanvas: ", this.properties.derpCanvas);
            console.log("this.prop.derpCanvas.PadRight: ", this.prop.derpCanvas.DrawHeader);
            console.log("this.prop.derpCanvas.PadRight: ", this.prop.derpCanvas.W);
            console.log("this.prop.derpCanvas.Content_Pos: ", this.prop.derpCanvas.Content_Pos);
            //super.CanvasShapeChange("motherFucker");
            this.collapsable = false;
            this.convertWidgetToInput = false;
            this.color = "#0000";
            this.bgcolor = "#0000";
            this.boxcolor = "#0000";
            this.widgets[0].type = "hidden";
            this.outputs[0].name = "";
            app.canvas.render_canvas_border = false;
            this.prop.sliderOptions = [
                { title: "🟨 Canvas layout" },
                { tip: "* Set font sizes to zero to use auto fontSize" },
                { title: "🟨 Canvas layout" },
                { tip: "* Set font sizes to zero to use auto fontSize" },
            ];
            this.prop.derpNodeOptions.splice(this.prop.derpNodeOptions.length - 1, 0, test1);
            //console.log("derpCanvas from super: ", super.derpCanvas.mTop);
            //super.onAdded();
        }
        this.node.onDrawForeground = function (ctx) {

        };
    }
}
app.registerExtension({
    name: "derpSlider",
    async beforeRegisterNodeDef(nodeType, nodeData, _app) {
        if (nodeData.name === "derpSlider") {

            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                if (onNodeCreated) onNodeCreated.apply(this, []);
                this.derpSlider = new derpSlider(this);
            };

        }
    }
});
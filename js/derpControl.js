// derpNodes by lordwedggie
import { app } from "../../../scripts/app.js";
import { getRGBA} from "./xcpUtils.js";


app.registerExtension({
    name: "derpControl",

    registerCustomNodes(app) {        
        class derpControl extends LGraphNode {
            constructor(title = "derpControl") {
                super(title);
                if (!this.prop) {
                    this.prop = {};
                } // don't know what this does
                derpControl.title_mode = 1;
                this.prop = this.properties || {};
                this.prop.TitleFont = "DengXian";
                this.prop.TitleFontSize = 10;
                this.prop.ContentFont = "DengXian light";
                this.prop.ContentFontSize = 10;
                this.prop.TitleHeight = 20;
                this.prop.TitleY_Offset = 14;
                this.prop.SlotHeight = 20;
                this.prop.WidgetHeight = 18;
                this.prop.ConnectionWidth = 2;
                this.prop.NodeCornerRoundness = 8;
                this.prop.CanvasBorder = false;
                this.prop.RenderShadows = true;
                this.prop.ContentTextColor = "255, 255, 255, 0.50";
                this.prop.WidgetTextColor = "255, 255, 255, 0.50";
                this.prop.Widget2ndTextColor = "255, 255, 255, 0.50";

                this.onAdded = function () {
                    LiteGraph.NODE_MIN_WIDTH = 200;
                    LiteGraph.NODE_TITLE_HEIGHT = this.prop.TitleHeight;
                    LiteGraph.NODE_TITLE_TEXT_Y = this.prop.TitleY_Offset;
                    LiteGraph.NODE_SLOT_HEIGHT = this.prop.SlotHeight;
                    console.log("LiteGraph.NODE_SLOT_HEIGHT:", LiteGraph.NODE_SLOT_HEIGHT); // changing this effect all the derpSlots 
                    LiteGraph.NODE_WIDGET_HEIGHT = this.prop.WidgetHeight;
                    LiteGraph.NODE_TEXT_COLOR = getRGBA(this.prop.ContentTextColor);
                    LiteGraph.WIDGET_TEXT_COLOR = getRGBA(this.prop.WidgetTextColor);
                    LiteGraph.WIDGET_SECONDARY_TEXT_COLOR = getRGBA(this.prop.Widget2ndTextColor);
                    app.canvas.round_radius = this.prop.NodeCornerRoundness;
                    app.canvas.title_text_font = `${this.prop.TitleFontSize}px ${this.prop.TitleFont}`;
                    app.canvas.inner_text_font = `${this.prop.ContentFontSize}px ${this.prop.ContentFont}`;                   
                    app.canvas.render_connections_border = false;
                    app.canvas.connections_width = this.prop.ConnectionWidth;
                    app.canvas.render_canvas_border = this.prop.CanvasBorder;
                    app.canvas.render_shadows = this.prop.RenderShadows;

                    //LiteGraph.NODE_BOX_OUTLINE_COLOR = getRGBA(0, 0, 0, 0);
                }
                this.onPropertyChanged = function (Name) {
                    app.canvas.title_text_font = `${this.prop.TitleFontSize}px ${this.prop.TitleFont}`;
                    app.canvas.inner_text_font = `${this.prop.ContentFontSize}px ${this.prop.ContentFont}`;
                    app.canvas.connections_width = this.prop.ConnectionWidth;
                    app.canvas.round_radius = this.prop.NodeCornerRoundness;
                    app.canvas.render_canvas_border = this.prop.CanvasBorder;
                    app.canvas.render_shadows = this.prop.RenderShadows;
                    LiteGraph.NODE_TITLE_HEIGHT = this.prop.TitleHeight;
                    LiteGraph.NODE_TITLE_TEXT_Y = this.prop.TitleY_Offset;
                    LiteGraph.NODE_SLOT_HEIGHT = this.prop.SlotHeight;
                    LiteGraph.NODE_WIDGET_HEIGHT = this.prop.WidgetHeight;
                    LiteGraph.NODE_TEXT_COLOR = this.prop.ContentTextColor;
                    LiteGraph.NODE_TEXT_COLOR = getRGBA(this.prop.ContentTextColor);
                    LiteGraph.WIDGET_TEXT_COLOR = getRGBA(this.prop.WidgetTextColor);
                    LiteGraph.WIDGET_SECONDARY_TEXT_COLOR = getRGBA(this.prop.Widget2ndTextColor);
                }
                this.isVirtualNode = true;
            }

            // computeSize() { return [this.canvasWidth, this.canvasHeight] }
        }
        // title_mode: LiteGraph.NO_TITLE,
        LiteGraph.registerNodeType(
            "derpControl",
            Object.assign(derpControl, {
                title: "derp ControlPanel",
                collapsable: false,
            })
        );
        derpControl.category = "🔞 xcpDerpNodes/Beta";
    },
});

// ComfyUI.mxToolkit.Slider v.0.9.2 - Max Smirnov 2024
import { app } from "../../scripts/app.js";

class floatSlider
{
    constructor(node)
    {
        this.node = node;
        this.node.properties = this.node.properties || {};
        this.node.properties.value=20;
        this.node.properties.min=0;
        this.node.properties.max=100;
        this.node.properties.step=1;
        this.node.properties.decimals=0;
        this.node.properties.snap=true;

        this.node.intpos = { x:0.2 };
        this.node.size = [210, Math.floor(LiteGraph.NODE_SLOT_HEIGHT*1.5)];
        const fontsize = LiteGraph.NODE_SUBTEXT_SIZE;
        const shX = (this.node.slot_start_y || 0)+fontsize*1.5;
        const shY = LiteGraph.NODE_SLOT_HEIGHT/1.5;
        const shiftLeft = 10;
        const shiftRight = 60;

        for (let i=0; i<3; i++) this.node.widgets[i].type = "hidden";

        this.node.onAdded = function ()
        {
            this.outputs[0].name = "";
            this.widgets_start_y = -8;
            this.intpos.x = Math.max(0, Math.min(1, (this.properties.value-this.properties.min)/(this.properties.max-this.properties.min)));
            this.outputs[0].type = (this.properties.decimals > 0)?"FLOAT":"INT";
            if (this.size) if (this.size.length) if (this.size[1] > LiteGraph.NODE_SLOT_HEIGHT*1.5) this.size[1] = LiteGraph.NODE_SLOT_HEIGHT*1.5;
        };
    }    
}

app.registerExtension(
{
    name: "floatSlider",
    async beforeRegisterNodeDef(nodeType, nodeData, _app)
    {
        if (nodeData.name === "floatSlider")
        {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                if (onNodeCreated) onNodeCreated.apply(this, []);
                this.floatSlider = new floatSlider(this);
            }
        }
    }
});

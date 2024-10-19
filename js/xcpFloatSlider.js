/* 
xcpNodes - lordwedggie
Based on:
 ComfyUI.mxToolkit.Slider v.0.9.2 - Max Smirnov 2024 XCP modifications */
import { app } from "../../scripts/app.js";

class xcpFloatSlider
{
	constructor(node)
    {
		//added constants
		const nodeHeight = 1.3;
		const sideMargin = 26;
		const slotSize = 10;
		//const strokeRadius = 6;
		//const btnOffset = 8;
		//const slotColor = "rgba(10,10,10,0.8)";
		const strokeColor = "rgba(20,20,20,0.5)";

        this.node = node;
        this.node.properties = this.node.properties || {};
        this.node.properties.value=20;
        this.node.properties.min=0;
        this.node.properties.max=100;
        this.node.properties.step=1;
        this.node.properties.decimals=2;
        this.node.properties.snap=true;
		
		this.node.properties.drawFillBar = true;
		this.node.properties.drawRoundButton = true;
		this.node.properties.btnStroke = true;
		this.node.properties.slotHeight = 12;
		this.node.properties.slotCorner = 2;
		this.node.properties.btnRadius = 8;
		this.node.properties.strokeRadius = 6;
		this.node.properties.strokeWeight = 1.2;
		this.node.properties.labelSize = 12;
		this.node.properties.buttonColor = "rgba(80,160,80,1.0)";
		this.node.properties.slotColor = "rgba(10,10,10,0.8)";
		this.node.properties.fillBarColor = "rgba(80,160,80,0.5)";

		
        this.node.intpos = { x:0.2 };
        this.node.size = [210, Math.floor(LiteGraph.NODE_SLOT_HEIGHT*nodeHeight)];
        const fontsize = LiteGraph.NODE_SUBTEXT_SIZE;
        const shX = (this.node.slot_start_y || 0)+fontsize*1.5;
        const shY = LiteGraph.NODE_SLOT_HEIGHT/1.5;
        const shiftLeft = 14;
        const shiftRight = 56;

        for (let i=0; i<3; i++) this.node.widgets[i].type = "hidden";

        this.node.onAdded = function ()
        {
		
			this.outputs[0].name = "";
            this.widgets_start_y = -8;
            this.intpos.x = Math.max(0, Math.min(1, (this.properties.value-this.properties.min)/(this.properties.max-this.properties.min)));
            this.outputs[0].type = (this.properties.decimals > 0)?"FLOAT":"INT";
            if (this.size) if (this.size.length) if (this.size[1] > LiteGraph.NODE_SLOT_HEIGHT*1.5) this.size[1] = LiteGraph.NODE_SLOT_HEIGHT*1.5;
        };

        this.node.onConfigure = function ()
        {
            this.configured = true;
            this.onPropertyChanged();
        }

        this.node.onPropertyChanged = function (propName)
        {
            if (!this.configured) return;

            if (this.properties.step <= 0) this.properties.step = 1;
            if ( isNaN(this.properties.value) ) this.properties.value = this.properties.min;
            if ( this.properties.min >= this.properties.max ) this.properties.max = this.properties.min+this.properties.step;
            if ((propName === "min") && (this.properties.value < this.properties.min)) this.properties.value = this.properties.min;
            if ((propName === "max") && (this.properties.value > this.properties.max)) this.properties.value = this.properties.max;
            this.properties.decimals = Math.floor(this.properties.decimals);
            if (this.properties.decimals>4) this.properties.decimals = 4;
            if (this.properties.decimals<0) this.properties.decimals = 0;
            this.properties.value = Math.round(Math.pow(10,this.properties.decimals)*this.properties.value)/Math.pow(10,this.properties.decimals);
            this.intpos.x = Math.max(0, Math.min(1, (this.properties.value-this.properties.min)/(this.properties.max-this.properties.min)));
            if ((this.properties.decimals > 0 && this.outputs[0].type !== "FLOAT") || (this.properties.decimals === 0 && this.outputs[0].type !== "INT"))
                if (this.outputs[0].links !== null)
                    for (let i = this.outputs[0].links.length; i > 0; i--)
                    {
                        const tlinkId = this.outputs[0].links[i-1];
                        const tlink = app.graph.links[tlinkId];
                        app.graph.getNodeById(tlink.target_id).disconnectInput(tlink.target_slot);
                    }
            this.outputs[0].type = (this.properties.decimals > 0)?"FLOAT":"FLOAT";
            this.widgets[2].value = (this.properties.decimals > 0)?1:0;
            this.widgets[1].value = this.properties.value;
            this.widgets[0].value = Math.floor(this.properties.value);
			
			if (this.properties.btnRadius<4) this.properties.btnRadius = 4;
			if (this.properties.btnRadius>16) this.properties.btnRadius = 16;
			if (this.properties.labelSize<8) this.properties.labelSize = 8;
			if (this.properties.labelSize>24) this.properties.labelSize = 24;
			if (this.properties.slotCorner<1) this.properties.slotCorner = 1;
			if (this.properties.slotCorner>12) this.properties.slotCorner =12;
			if (this.properties.slotHeight<2) this.properties.slotHeight = 2;
			if (this.properties.slotHeight>24) this.properties.slotHeight = 24;
			if (this.properties.strokeRadius<1) this.properties.strokeRadius = 1;
			if (this.properties.strokeRadius>12) this.properties.strokeRadius = 12;

	
        }

        this.node.onDrawForeground = function(ctx)
        {
            this.configured = true;
            if ( this.flags.collapsed ) return false;
            if (this.size[1] > LiteGraph.NODE_SLOT_HEIGHT*nodeHeight) this.size[1] = LiteGraph.NODE_SLOT_HEIGHT*nodeHeight;
            let dgt = parseInt(this.properties.decimals);

            ctx.fillStyle=this.properties.slotColor;
            ctx.beginPath();
            ctx.roundRect( shiftLeft, shY-(this.properties.slotHeight/2), this.size[0]-shiftRight-shiftLeft, this.properties.slotHeight, this.properties.slotCorner);
            ctx.fill();
			
			//xcp Draw fill bar
			if (this.properties.drawFillBar){
				ctx.fillStyle= this.properties.fillBarColor;
				ctx.beginPath();
				ctx.roundRect( shiftLeft+1, shY-(this.properties.slotHeight/2)+1, shiftLeft+(this.size[0]-shiftRight-shiftLeft)*this.intpos.x-(this.properties.btnRadius), this.properties.slotHeight-2, this.properties.slotCorner-1);
				ctx.fill();			
			}
			
			if (this.properties.drawRoundButton){
				ctx.fillStyle= this.properties.buttonColor;
				ctx.beginPath();
				ctx.arc(shiftLeft+(this.size[0]-shiftRight-shiftLeft)*this.intpos.x, shY, this.properties.btnRadius, 0, 3 * Math.PI, false);
				ctx.fill();
			}else {
				ctx.fillStyle= this.properties.buttonColor;
				ctx.beginPath();
				ctx.roundRect(shiftLeft+(this.size[0]-shiftRight-shiftLeft)*this.intpos.x-(this.properties.btnRadius), shY-(this.properties.btnRadius), this.properties.btnRadius*2, this.properties.btnRadius*2, 3);
				ctx.fill();
			}
		
			if (this.properties.btnStroke) {
				if (this.properties.drawRoundButton){
					ctx.lineWidth = this.properties.strokeWeight;
					ctx.strokeStyle= strokeColor;
					ctx.beginPath();
					ctx.arc(shiftLeft+(this.size[0]-shiftRight-shiftLeft)*this.intpos.x, shY, this.properties.strokeRadius, 0, 2 * Math.PI, false);
					ctx.stroke();
				} else {
					ctx.lineWidth = this.properties.strokeWeight;
					ctx.strokeStyle= strokeColor;
					ctx.beginPath();
					ctx.roundRect(shiftLeft+(this.size[0]-shiftRight-shiftLeft)*this.intpos.x-(this.properties.strokeRadius), shY-(this.properties.strokeRadius), this.properties.strokeRadius*2, this.properties.strokeRadius*2, 2);
					ctx.stroke();					
				}
			}
			
            ctx.fillStyle=LiteGraph.NODE_TEXT_COLOR;
            ctx.font = this.properties.labelSize + "px Arial";
            ctx.textAlign = "center";
            ctx.fillText(this.properties.value.toFixed(dgt), this.size[0]-shiftRight+24, shX+(this.properties.labelSize/4));
        }

        this.node.onDblClick = function(e, pos, canvas)
        {
            if ( e.canvasX > this.pos[0]+this.size[0]-shiftRight+10 )
            {
                canvas.prompt("value", this.properties.value, function(v) {if (!isNaN(Number(v))) { this.properties.value = Number(v); this.onPropertyChanged("value");}}.bind(this), e);
                return true;
            }
        }

        this.node.onMouseDown = function(e)
        {
            if ( e.canvasY - this.pos[1] < 0 ) return false;
            if ( e.canvasX < this.pos[0]+shiftLeft-5 || e.canvasX > this.pos[0]+this.size[0]+this.properties.btnRadius-shiftRight+5 ) return false;
            if ( e.canvasY < this.pos[1]+shiftLeft-5 || e.canvasY > this.pos[1]+this.size[1]+this.properties.btnRadius-shiftLeft+5 ) return false;
            this.capture = true;
            this.unlock = false;
            this.captureInput(true);
            this.onMouseMove(e);
            return true;
        }

        this.node.onMouseMove = function(e)
        {
            if (!this.capture) return;
            let prevX = this.properties.value;
            let rn = Math.pow(10,this.properties.decimals);
            let vX = (e.canvasX - this.pos[0] - shiftLeft)/(this.size[0]-shiftRight-shiftLeft);

            if (e.ctrlKey) this.unlock = true;
            if (e.shiftKey !== this.properties.snap)
            {
                let step = this.properties.step/(this.properties.max - this.properties.min);
                vX = Math.round(vX/step)*step;
            }

            this.intpos.x = Math.max(0, Math.min(1, vX));
            this.properties.value = Math.round(rn*(this.properties.min + (this.properties.max - this.properties.min) * ((this.unlock)?vX:this.intpos.x)))/rn;

            this.updateThisNodeGraph();
            if ( this.properties.value !== prevX ) this.graph.setisChangedFlag(this.id);
        }

        this.node.onMouseUp = function()
        {
            this.capture = false;
            this.captureInput(false);
            this.widgets[0].value = Math.floor(this.properties.value);
            this.widgets[1].value = this.properties.value;
        }

        this.node.computeSize = () => [LiteGraph.NODE_WIDTH,Math.floor(LiteGraph.NODE_SLOT_HEIGHT*1.5)];
    }
}

app.registerExtension(
{
    name: "xcpFloatSlider",
    async beforeRegisterNodeDef(nodeType, nodeData, _app)
    {
        if (nodeData.name === "xcpFloatSlider")
        {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                if (onNodeCreated) onNodeCreated.apply(this, []);
                this.xcpFloatSlider = new xcpFloatSlider(this);
            }
        }
    }
});

import { app } from "../../scripts/app.js";
import { getRGBA, validateRGBA, clamp, resetEffects, derpTitle } from "./xcpUtils.js";
import { derpBaseV2 } from "./derpBaseV2.js";
class derpFloatV2 extends derpBaseV2 {
    constructor(node) {
        super(node); 
        this.node = node;
        this.node.prop = this.node.properties || {};
        this.node.prop.CanvasSize = "200, 40";
        this.node.prop.c_CanvasBG = "045, 045, 045, 1.00";
        this.node.prop.CanvasBorder = 4;
        this.node.prop.CanvasCorner = 8;

        // Additional properties or methods specific to derpFloatV2 can be added here
        this.node.onConfigure = function () {
            this.configured = true;
            //this.onPropertyChanged();
        }
        this.node.onAdded = function () {
            console.log("derpFloatV2 added");
        };
    }

    // Example of overriding a method
    onConfigure() {
        // Additional configuration for derpFloatV2
        console.log("derpFloatV2 configured");
    }

    // Example of adding a new method
    newMethod() {
        console.log("New method in derpFloatV2");
    }
}

// Register the new subclass with the app
app.registerExtension(
    {
        name: "derpFloatV2",
        async beforeRegisterNodeDef(nodeType, nodeData, _app) {
            if (nodeData.name === "derpFloatV2") {
                const onNodeCreated = nodeType.prototype.onNodeCreated;
                nodeType.prototype.onNodeCreated = function () {
                    if (onNodeCreated) onNodeCreated.apply(this, []);
                    this.derpFloatV2 = new derpFloatV2(this);
                }
            }
        }
    }
);
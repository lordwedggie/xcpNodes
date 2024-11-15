import torch
from sys import float_info

class derpBaseAlpha:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "value": ("FLOAT", {"default": 0.5, "min": -4294967296, "max": 4294967296}),         
            },
        }
    RETURN_TYPES = ("FLOAT", )
    RETURN_NAMES = ("float",)
    OUTPUT_TOOLTIPS = ("float output",)
    FUNCTION = "get_float"
    CATEGORY = "🔞 xcpDerpNodes/Alpha"

    def get_float(self, value):
        return (value,) 
        
class derpSlider:
    @classmethod
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "value": ("FLOAT", {"default": 0.5, "min": -4294967296, "max": 4294967296}),         
            },
        }

    RETURN_TYPES = ("FLOAT", )
    RETURN_NAMES = ("float",)
    OUTPUT_TOOLTIPS = ("float output",)
    FUNCTION = "get_float" 
    CATEGORY = "🔞 xcpDerpNodes/Alpha"
    def get_float(self, value):
        return (value,)      
        
class xcpDerpBool:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"value": ("BOOLEAN", {"default": False})},
        }

    RETURN_TYPES = ("BOOLEAN",)
    RETURN_NAMES = ("boolean",)
    FUNCTION = "execute"
    CATEGORY = "🔞 xcpDerpNodes/Derp Nodes"

    def execute(self, value):
        return (value,)

class xcpDerpFloat:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "value": ("FLOAT", {"default": 0.5, "min": -4294967296, "max": 4294967296}),         
            },
        }

    RETURN_TYPES = ("FLOAT", )
    RETURN_NAMES = ("float",)
    OUTPUT_TOOLTIPS = ("float output",)
    FUNCTION = "get_float"
    CATEGORY = "🔞 xcpDerpNodes/Derp Nodes"

    def get_float(self, value):
        return (value,)  

class xcpDerpINT:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "value": ("INT", {"default": 20, "min": -4294967296, "max": 4294967296}),        
            },
        }

    RETURN_TYPES = ("INT", )
    RETURN_NAMES = ("int",)
    OUTPUT_TOOLTIPS = ("int output",)
    FUNCTION = "get_int"
    CATEGORY = "🔞 xcpDerpNodes/Derp Nodes"

    def get_int(self, value):
        return (value,)
        
class xcpDerpSeed:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "X": ("INT", {"default": 0, "min": 0, "max": 4294967296}),
            },
        }

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("X",)
    OUTPUT_TOOLTIPS = ("derp seed",)
    FUNCTION = "main"
    CATEGORY = "🔞 xcpDerpNodes/Derp Nodes"

    def main(self, X,):
        return (X,)
       

# Define MISC_CLASS_MAPPINGS to let ComfyUI know about the custom nodes
#"derpFloatv2": derpFloatv2,
MISC_CLASS_MAPPINGS = {
    "derpSlider" : derpSlider,
    "derpBaseAlpha": derpBaseAlpha,
    "xcpDerpBool": xcpDerpBool,
    "xcpDerpFloat": xcpDerpFloat,
    "xcpDerpINT": xcpDerpINT,
    "xcpDerpSeed": xcpDerpSeed
}

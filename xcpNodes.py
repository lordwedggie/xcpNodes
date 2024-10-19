import torch
from sys import float_info

class xcpIntSlider:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "Xi": ("INT", {"default": 666, "min": -4294967296, "max": 4294967296}),
                "Xf": ("FLOAT", {"default": 20, "min": -4294967296, "max": 4294967296}),
                "isfloatX": ("INT", {"default": 0, "min": 0, "max": 1}),                
            },
        }

    RETURN_TYPES = ("INT", )
    RETURN_NAMES = ("int",)
    OUTPUT_TOOLTIPS = ("float output",)
    FUNCTION = "get_int"
    CATEGORY = "🔞xcpNodes/Sliders"

    def get_int(self, Xi, Xf, isfloatX):
        return (Xi,)  

class xcpFloatSlider:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "Xi": ("INT", {"default": 666, "min": -4294967296, "max": 4294967296}),
                "Xf": ("FLOAT", {"default": 20, "min": -4294967296, "max": 4294967296}),
                "isfloatX": ("INT", {"default": 0, "min": 0, "max": 1}),                
            },
        }

    RETURN_TYPES = ("FLOAT", )
    RETURN_NAMES = ("float",)
    OUTPUT_TOOLTIPS = ("float output",)
    FUNCTION = "get_float"
    CATEGORY = "🔞xcpNodes/Sliders"

    def get_float(self, Xi, Xf, isfloatX):
        return (Xf,)

        

# Define MISC_CLASS_MAPPINGS to let ComfyUI know about the custom nodes
MISC_CLASS_MAPPINGS = {
    "xcpIntSlider": xcpIntSlider,
    "xcpFloatSlider": xcpFloatSlider
}

from .xcpNodes import MISC_CLASS_MAPPINGS
WEB_DIRECTORY = "./js"
# Merge both mappings into a single dictionary for the custom nodes
NODE_CLASS_MAPPINGS = {**MISC_CLASS_MAPPINGS}

# Optional: You can also define NODE_DISPLAY_NAME_MAPPINGS if you want custom display names in the UI
#"derpFloatv2": "derpFloatv2",
NODE_DISPLAY_NAME_MAPPINGS = {
    "derpSlider": "derpSlider Alpha",
    "derpBaseAlpha": "derpBase Alpha",
    "xcpDerpBool": "Derp Bool",
    "xcpDerpFloat": "Derp Float",
    "xcpDerpINT": "Derp INT",
    "xcpDerpSeed" : "Derp Seed"
}
__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS','WEB_DIRECTORY']

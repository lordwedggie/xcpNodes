from .xcpNodes import MISC_CLASS_MAPPINGS
WEB_DIRECTORY = "./js"
# Merge both mappings into a single dictionary for the custom nodes
NODE_CLASS_MAPPINGS = {**MISC_CLASS_MAPPINGS}

# Optional: You can also define NODE_DISPLAY_NAME_MAPPINGS if you want custom display names in the UI

NODE_DISPLAY_NAME_MAPPINGS = {
    "xcpIntSlider": "int slider",
    "xcpFloatSlider": "float slider"
}
__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS','WEB_DIRECTORY']

import { htmlVisualElement } from '../html/visual-element.js';
import { svgVisualElement } from '../svg/visual-element.js';


var createDomVisualElement = function (Component, options) {
   
    return Component === "SVG"
        ? svgVisualElement(options, { enableHardwareAcceleration: false })
        : htmlVisualElement(options, { enableHardwareAcceleration: true });
};

export { createDomVisualElement };

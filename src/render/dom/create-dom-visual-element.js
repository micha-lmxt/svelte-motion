import { htmlVisualElement } from './html-visual-element.js';
import { svgVisualElement } from './svg-visual-element.js';


function createDomVisualElement(Component) {
    
    return function (isStatic, options) {
        var isSVG = Component === "SVG";
        
        var factory = isSVG ? svgVisualElement : htmlVisualElement;
        return factory(options, {
            enableHardwareAcceleration: !isStatic && !isSVG,
        });
    };
}

export { createDomVisualElement };

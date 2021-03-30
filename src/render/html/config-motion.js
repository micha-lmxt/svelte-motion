import { scrapeMotionValuesFromProps } from './utils/scrape-motion-values.js';
import { createHtmlRenderState } from './utils/create-render-state.js';

var htmlMotionConfig = {
        scrapeMotionValuesFromProps: scrapeMotionValuesFromProps,
        createRenderState: createHtmlRenderState,   
};

export { htmlMotionConfig };

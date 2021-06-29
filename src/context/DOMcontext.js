export const getDomContext = (name,el) => {
    if (!el || !window){
        return undefined;
    }
    let par = el;
    while(par = par.parentNode){
        if (par.motionDomContext && par.motionDomContext.has(name)){
            return par.motionDomContext.get(name)
        }
    }
    return undefined;
}

export const setDomContext = (name,el,value) => {
    if (el && window){
        if (!el.motionDomContext){
            el.motionDomContext = new Map();
        }
        el.motionDomContext.set(name,value);
    }
}
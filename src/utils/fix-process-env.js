
const fix = ()=>{
    if (!window || (window.process && window.process.env)){
        return false;
    }
    if (!window.process){
        window.process={}
    }
    window.process.env={};
    return true;
}

export const fixed = fix();
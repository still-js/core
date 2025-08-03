export function checkPropBind(obj, f){
    const fieldBoundPos = obj.template.indexOf(`@${f}`);
    let isFieldBound = false;
    if(fieldBoundPos >= 0) {
        if(!obj.template[fieldBoundPos + `@${f}`.length].match(/[A-Za-z0-0]/))
            isFieldBound = true;
    }
    return isFieldBound;
}

export class WorkerHelper {
    static methodOffloadContainer = {};
    static processedCpm = {};
    static processedKeys = {};
}
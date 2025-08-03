import { ST_RE } from "../setup/constants.js";

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
    static traceCmp = {};
    static delayedComponents = {};

    static parseDelaySetup(tmplt, instance, onlyAssign = false, cmpName = null){
        if(onlyAssign === true){
            instance['stSetDelay'] = { ...instance['stSetDelay'], init: true }
            return;
        }
        tmplt.replace(ST_RE.at_delay_annot_constr, (_, time, mtdName) => {
            if(mtdName.trim() === 'stAfterInit') instance['stSetDelay'] = { ...instance['stSetDelay'], init: true };
            if(mtdName.trim() === 'constructor') instance['stSetDelay'] = { ...instance['stSetDelay'], build: WorkerHelper.parseTime(time, cmpName) };
        });
    }

    static parseTime(time, cmpName, parentName = null){
        if(time){
            let t = time.toLowerCase(), v = time.length == 1 ? parseInt(time) : parseInt(time.slice(0,-1));
            if(isNaN(v)){
                let complmnt = parentName ? ` when embieding it in the ${parentName}` : '';
                console.error(`Invalid time (${time}) format passed at ${cmpName} for @Delayd${complmnt}`);
            }
            return t.endsWith('m') ? (v * 60 * 1000) : t.endsWith('h') ? (v * 60 * 60 * 1000) : (v * 1000);
        }
        return null;
    }
}



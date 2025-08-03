import { StillAppSetup } from "../../config/app-setup.js";
import { ComponentRegistror } from "../component/manager/registror.js";
import { Components } from "../setup/components.js";
import { WorkerHelper } from "../util/componentUtil.js";
import { UUIDUtil } from "../util/UUIDUtil.js";

export class TemplateLogicHandler {

    static parseAtForAndIfStatement(obj, template, loopVar = {}, cnterName = {}, dataSrc = {}, iterVar = {}){

        let depth = 0, realFor, uniqVarName, countVar = null;
        const forEachRE = /@for\s*\([^)]+\)|@endfor/g;

        return template.replace(forEachRE, ($1) => {
            let line = $1.trim();
            if(line.startsWith('@for')){
                
                depth++;
                uniqVarName = `_${String(Math.random()).replace('.','')}`;
                line = line.replace(/\;([\sA-Z0-9\$\_]*)\=[\s]*\$[a-z]*/i, (_, cnt) => {
                    if(_.slice(-6) === '$count') cnterName[uniqVarName] = cnt.trim(), countVar = true;
                    return ''
                });
                
                line = line.replace(/this./g,'');           
                const iterSrc = line.replace(/[\(\)]/g,'').split(' in ');
                loopVar[uniqVarName] = `${uniqVarName}_${iterSrc[1]}`, dataSrc[uniqVarName] = iterSrc[1], iterVar[uniqVarName] = iterSrc[0].replace('@for','');
                if(countVar)
                    realFor = 'for(const ['+cnterName[uniqVarName]+','+iterSrc[0].replace('@for','')+'] of '+iterSrc[1]+'.entries())';
                else realFor = 'for(const '+iterVar[uniqVarName]+' of '+iterSrc[1]+')';
        
                countVar = null;
                if(!iterSrc[1].startsWith('this.'))
                    if(depth === 1) realFor = realFor.replace(iterSrc[1],loopVar[uniqVarName]);

                if(typeof window != 'undefined') {                    
                    if(obj['stEmbededAtFor']) window[loopVar[uniqVarName]] = obj[iterSrc[1]].value;
                    else window[loopVar[uniqVarName]] = obj[iterSrc[1]];
                } else {
                    if(obj['stEmbededAtFor']) global[`${loopVar[uniqVarName]}`] = obj[iterSrc[1]].value;
                    else global[`${loopVar[uniqVarName]}`] = obj[iterSrc[1]];
                }

                if((depth - 1) === 0) return '<start-tag id="'+uniqVarName+'">\nlet '+uniqVarName+"='';\n"+realFor+'{';
                return realFor+'{';
            }

            if(line.startsWith('@endfor')){
                depth--;
                if((depth) === 0) return $1.replace('@endfor','}')+'\n</start-tag>';
                else realFor = $1.replace('@endfor','}')  
                return realFor;
            }
        });

    }
    
    static runTopLevelAtIf(obj, template){        
        const RE = /<start-tag id="([\_0-9]*)">([\s\S]*?)<\/start-tag>/g, RE_VAR = /[\!]{0,}this.([A-Z0-9\$\_]{0,})/ig;
        template = template.replace(RE, (a) => a.replace(/@if|@endif/g,(mt) => `enc${mt.slice(1)}`));
        return template.replace(/@if(\([\?\>\<\&\|\[\]\)\(0-9A-Z\+\-\_\%\/\\\*\$\s\=\!\.\'\"]*\))([\s\S]*?)@endif/ig, 
            (_, $1, $2) => {


                const uniqId = '_'+UUIDUtil.newId();
                if(!obj['stOnChangeAtIf']) {
                    obj['stOnChangeAtIf'] = {}, obj['stAtIfContent'] = {};
                }

                obj['stOnChangeAtIf'][uniqId] = $1.replace(RE_VAR, (_, $var) => `${_.startsWith('!') ? '!' : ''}cmp.${$var}.value`);

                const exp = $1.replace(RE_VAR,(_,$var) => {
                    if(!obj['stAtIfContent'][$var]) obj['stAtIfContent'][$var] = {};
                    obj['stAtIfContent'][$var][uniqId] = $2;
                    return _.replace('this.','obj.') + (obj['stEmbededAtFor'] ? '.value' : '');
                });

                const isTrue = eval(`${exp}`);
                if(!isTrue) return '<if-stmt id="'+uniqId+'"></if-stmt>'
                else return '<if-stmt id="'+uniqId+'">'+_.replace('@if'+$1,'').replace('@endif','')+'</if-stmt>';                
            }
        );
    }

    static runAtForAndIfStatement(obj, template, loopVar = {}, cnterName = {}, dataSrc = {}, iterVar = {}){
        // Run/Prosecute the statemants - @for and @if (in case it exists inside for loop)
        return template.replace(/<start-tag id="([\_0-9]*)">([\s\S]*?)<\/start-tag>/g,($1, $2, loop) => {

            let lines = loop.replace(/^\s*\n/gm,'').split('\n'), content = '', variable, result, nodeUpdtble = false, cmpId, containerId;
            obj['loopTmplt'] = {}, obj['stRunTime'] = {}, obj['stAtForInitLoad'] = {};
            
            for(let line of lines){
                let lnContnt = line.trim();
                if(lnContnt != ''){
                    if(lnContnt.startsWith('let _')){
                        if(cnterName[$2] && lnContnt.includes(cnterName[$2])) {}
                        else{
                            variable = `${lnContnt.replace('let ','').replace("='';",'')}`, cmpId = obj.cmpInternalId.replace('/','').replace('@','');
                            containerId = cmpId+dataSrc[$2];
                            content += variable + '+=`<for-loop id="'+containerId+'">`;\n';
                            if(typeof window != 'undefined') window[variable] = '';
                            else global[`${variable}`] = '';
                        }
                    }
                    else if(lnContnt.startsWith('console.log')) content += lnContnt;
                    else if (lnContnt.startsWith('encif(')) content += lnContnt.replace('encif','if')+'{';
                    else if (lnContnt.startsWith('encendif')) content += lnContnt.replace('encendif','}');
                    else if(!lnContnt.startsWith('for(') && lnContnt != '}'){
                        lnContnt = lnContnt.replace(/<[\s\S]{0,}(id=\"[\s\S]*?\")>/,(_,$1) => {

                            nodeUpdtble = true;
                            const id = $1.split('"')[1];
                            const idValue = `id="${cmpId}${id}"`, hasCls = _.indexOf('class="') > 0, lstnFlag = `listenChangeAtFor-${cmpId}-${dataSrc[$2]}`;
                            if(hasCls) _ = _.replace('class="',`class="${lstnFlag} `).replace(`id="${id}"`,idValue);
                            else _ = _.replace($1,`class="${lstnFlag} atForLoop " ${idValue}`);
                            _ = _.replace('>',`data-stvariable="${variable}" data-stvalue='{JSON.stringify(${iterVar[$2]})}'>`);

                            return _;

                        });
                        content += variable + '+=`'+lnContnt.replace(/\{([^}]+)\}/gi,(_, bind) => bind ? '$'+_ : _)+'`;';
                    }
                    else content += line; 
                }
            }
            content += variable + '+=`</for-loop>`';
            const re = /{([\$\-\s\.\[\]\=\>\<\'\"\@\:\;\?A-Z0-9]*?)}|item="{([\$\-\s\.\[\]\=\>\<\'\"\@\:\;\?A-Z0-9]*?)}"/gi
            content = content.replace(re, (mt, _, ds, pos) => {
                if(content.slice(pos-7, pos).startsWith('item="$')) return '{JSON.stringify('+_+')}';
                else return mt
            });
            
            if(obj[dataSrc[$2]].length === 0){
                if(!(`${loopVar[$2]}` in obj['stRunTime'])) obj['stRunTime'][dataSrc[$2]] = {};
                obj['stAtForInitLoad'][dataSrc[$2]] = false;
                obj['stRunTime'][dataSrc[$2]][variable+'_'+dataSrc[$2]] = function(data){
                    const content = obj['loopTmplt'][variable];
                    window[loopVar[$2]] = data, window[variable] = '';
                    eval(content);
                    document.getElementById(containerId).innerHTML = eval(variable);
                };
            }
            
            obj['loopTmplt'][variable] = content;
            eval(content);//Runs the for loop scope
            result = eval(variable);//Grabs the for loop result from the variable

            if(typeof window != 'undefined') {
                //if(cnterName[parsLoopSpoceCount]) delete window[rplcCnter[parsLoopSpoceCount]];
                delete window[variable];
            }
            else{
                delete global[`${variable}`]; //delete global[rplcCnter[parsLoopSpoceCount]];
            }
            return `<start-tag id="${variable}">${result}</start-tag>`;
        });
    }

}


export class TemplateReactiveResponde {

    static detectAtIfTopLevelConditionChange(cmp, f){
        if(!cmp['stAtIfContent']) return;
        if(f in cmp['stAtIfContent']){
            Object.entries(cmp['stAtIfContent'][f]).forEach(([id,content]) => {
                const isItLoop = content.indexOf('let _') > 0 && content.indexOf('for(') > 0;
                if(isItLoop) return;
                if(eval(cmp['stOnChangeAtIf'][id]) === true) document.getElementById(id).innerHTML = content;
                if(eval(cmp['stOnChangeAtIf'][id]) === false) document.getElementById(id).innerHTML = '';
            });
        }
    }

    static updateDomTreeOnAtForDataSourceChange(cmp, f, value, cpName){
        const atFor = `.listenChangeAtFor-${cpName}-${f}`;
        if(document.querySelector(atFor) && cmp[`$_stupt${f}`]){
            value.forEach(itm => {
                const newValue = JSON.stringify(itm), node = document.getElementById(cpName+itm.id);
                if(node){
                    const willNodeChange = !(node.dataset.stvalue == newValue);
                    if(willNodeChange){
                        const { tagName, dataset: { stvariable: variableName } } = node;
                        node.dataset.stvalue = newValue;
                        node.innerHTML = Components.handleAtForNewNode(variableName, itm, tagName, f, cmp);
                    }
                }else{
                    const { parentElement, tagName, dataset: { stvariable: variableName } } = document.querySelector(atFor);
                    const node = document.createElement(tagName);
                    node.innerHTML = Components.handleAtForNewNode(variableName, itm, tagName, f, cmp);
                    parentElement.appendChild(node);
                }
            });
        }
    }

    static reloadeContainerOnDataSourceChange(cmp, f){
        if(cmp['stAtForInitLoad']){
            if(cmp['stAtForInitLoad'][`${f}`] === false && !cmp[`$_stupt${f}`])
                Object.entries(cmp['stRunTime'][f]).forEach(([_, cb]) => cb(cmp[f].value));
        }
    }

}


export class TemplateBinding {
    static handleReferenceName(cmp, value, childCmp){
        const [srvcOrController, variable] = value.split('.');
        if(variable){
            const annot = cmp.myAnnotations().get(srvcOrController);
            if(annot.inject) value = StillAppSetup.get()?.services.get(annot.type)[variable];
        }

        ComponentRegistror.add(value, childCmp, true);
        Object.values(WorkerHelper.methodOffloadContainer).forEach(ref => {
            [...ref.subscrbrs].forEach(itm => {
                if(WorkerHelper.processedCpm[itm]){
                    Object.entries(WorkerHelper.processedCpm[itm]).forEach(([cmpId, method]) => {
                        method.count--;
                        if(method.count === 0) {
                            method.method();
                            delete WorkerHelper.processedCpm[itm][cmpId]
                            if(Object.keys(WorkerHelper.processedCpm[itm]).length == 0)
                                delete WorkerHelper.processedCpm[itm];
                        }
                    });
                }
            });
        })
        
        return value;
    }
}
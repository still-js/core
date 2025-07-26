export class TemplateLogicHandler {

    static parseAtForAndIfStatement(obj, template, cnterName = {}, rplcCnter = {}){

        let depth = 0, realFor, uniqVarName, loopVar, countVar = null;
        const forEachRE = /@for\s*\([^)]+\)|@endfor/g;

        return template.replace(forEachRE, ($1) => {
            let line = $1.trim();
            if(line.startsWith('@for')){
                
                depth++;
                uniqVarName = `_${String(Math.random()).replace('.','')}`;
                line = line.replace(/\;([\sA-Z0-9\$\_]*)\=[\s]*\$[a-z]*/i, (_, cnt) => {
                    if(_.slice(-6) === '$count')cnterName[uniqVarName] = cnt.trim(), countVar = true;
                    return ''
                });
                
                line = line.replace(/this./g,'');           
                const iterSrc = line.replace(/[\(\)]/g,'').split(' in ');
                loopVar = `${uniqVarName}_${iterSrc[1]}`;
                if(countVar)
                    realFor = 'for(const ['+cnterName[uniqVarName]+','+iterSrc[0].replace('@for','')+'] of '+iterSrc[1]+'.entries())';
                else realFor = 'for(const '+iterSrc[0].replace('@for','')+' of '+iterSrc[1]+')';
        
                countVar = null;
                if(!iterSrc[1].startsWith('this.'))
                    if(depth === 1) realFor = realFor.replace(iterSrc[1],loopVar);

                if(typeof window != 'undefined') {                    
                    if(obj['stEmbededAtFor']) window[loopVar] = obj[iterSrc[1]].value;
                    else window[loopVar] = obj[iterSrc[1]];
                } else {
                    if(obj['stEmbededAtFor']) global[`${loopVar}`] = obj[iterSrc[1]].value;
                    else global[`${loopVar}`] = obj[iterSrc[1]];
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
        const RE = /<start-tag id="([\_0-9]*)">([\s\S]*?)<\/start-tag>/g;
        template = template.replace(RE, (a) => a.replace(/@if|@endif/g,(mt) => `enc${mt.slice(1)}`));
        return template.replace(/@if(\([\?\>\<\&\|\[\]\)\(0-9A-Z\+\-\_\%\/\\\*\$\s\=\!\.\'\"]*\))[\s\S]*?@endif/ig, 
            (_, $1) => {
                const exp = $1.replace(/this.[A-Z0-1\$\_]{0,}/gi,(_) => _.replace('this.','obj.') + (obj['stEmbededAtFor'] ? '.value' : ''))
                const isTrue = eval(`${exp}`);
                if(!isTrue) return ''
                else return _.replace('@if'+$1,'').replace('@endif','');                
            }
        );
    }

    static runAtForAndIfStatement(template, cnterName = {}, rplcCnter = {}){
        // Run/Prosecute the statemants - @for and @if (in case it exists inside for loop)
        return template.replace(/<start-tag id="([\_0-9]*)">([\s\S]*?)<\/start-tag>/g,($1, $2, loop) => {

            let lines = loop.replace(/^\s*\n/gm,'').split('\n'), content = '', variable, result;

            for(let line of lines){
                const lnContnt = line.trim();
                if(lnContnt != ''){
                    if(lnContnt.startsWith('let _')){
                        if(cnterName[$2] && lnContnt.includes(cnterName[$2])) {}
                        else{
                            variable = `${lnContnt.replace('let ','').replace("='';",'')}`;
                            if(typeof window != 'undefined') window[variable] = '';
                            else global[`${variable}`] = '';
                        }
                    }
                    else if (lnContnt.indexOf('++;') > 0) content += lnContnt+';';
                    else if(lnContnt.startsWith('console.log')) content += lnContnt;
                    else if (lnContnt.startsWith('encif(')) content += lnContnt.replace('encif','if')+'{';
                    else if (lnContnt.startsWith('encendif')) content += lnContnt.replace('encendif','}');
                    else if(!lnContnt.startsWith('for(') && lnContnt != '}')
                        content += variable + '+=`'+lnContnt.replace(/\{([^}]+)\}/gi,(_, bind) => bind ? '$'+_ : _)+'`;';
                    else content += line; 
                }
            }
            const re = /{([\$\-\s\.\[\]\=\>\<\'\"\@\:\;\?A-Z0-9]*?)}|item="{([\$\-\s\.\[\]\=\>\<\'\"\@\:\;\?A-Z0-9]*?)}"/gi
            content = content.replace(re, (mt, _, ds, pos) => {
                if(content.slice(pos-7, pos).startsWith('item="$')) return '{JSON.stringify('+_+')}';
                else return mt
            });

            result = eval(content);//Runs the for loop scope
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
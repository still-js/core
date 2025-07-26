export class TemplateLogicHandler {

    static parseAtForAndIfStatement(obj, template, cnterName = {}, rplcCnter = {}){

        let depth = 0, loopScopCount = 0, realFor, uniqVarName, loopVar, countVar = '', countIncr = '';
        const forEachRE = /@for\s*\([^)]+\)|@endfor/g;

        return template.replace(forEachRE, ($1) => {
            let line = $1.trim();
            if(line.startsWith('@for')){
                
                depth++;
                uniqVarName = `_${String(Math.random()).replace('.','')}`;
                line = line.replace(/\;([\sA-Z0-9\$\_]*)\=[\s]*\$count/i, (_, cnt) => {
                    cnterName[loopScopCount] = cnt.trim();
                    rplcCnter[loopScopCount] = `${uniqVarName}${cnterName[loopScopCount]}`;
                    countVar = `let ${rplcCnter[loopScopCount]} = 0;\n`, countIncr = `${rplcCnter[loopScopCount]}++;\n`;
                    return ''
                });
                                              
                const iterSource = line.replace(/[\(\)]/g,'').split(' in ');
                loopVar = `${uniqVarName}_${iterSource[1]}`;
                realFor = line.replace('@','').replace(' in ',' of ').replace('(','(let ');
                if(!iterSource[1].startsWith('this.'))
                    if(depth === 1) realFor = realFor.replace(iterSource[1],loopVar);

                if(typeof window != 'undefined') {                    
                    if(obj['stDynAtFor']) window[loopVar] = obj[iterSource[1]].value;
                    else window[loopVar] = obj[iterSource[1]];
                    if(cnterName[loopScopCount]) window[rplcCnter[loopScopCount]] = 0;
                } else {
                    if(obj['stDynAtFor']) global[`${loopVar}`] = obj[iterSource[1]].value;
                    else global[`${loopVar}`] = obj[iterSource[1]];
                    // This is for Server side Rendering (SSR)
                    if(cnterName[loopScopCount]) global[rplcCnter[loopScopCount]] = 0;
                }

                if((depth - 1) === 0)
                    return '<start-tag id="'+uniqVarName+'">\n'+countVar+'let '+uniqVarName+"='';\n"+realFor+'{';
                return realFor+'{';
            }

            if(line.startsWith('@endfor')){
                depth--;
                if((depth) === 0){
                    loopScopCount++;                    
                    realFor = $1.replace('@endfor',countIncr+'}');
                    countVar = '', countIncr = '';
                    return realFor+'\n</start-tag>';
                }else{
                    realFor = $1.replace('@endfor','}')
                }
                    
                return realFor;
            }
        });

    }

    static runAtForAndIfStatement(template, cnterName = {}, rplcCnter = {}){
        let parsLoopSpoceCount = 0;
        // Run/Prosecute the statemants - @for and @if (in case it exists inside for loop)
        return template.replace(/<start-tag id="([\_0-9]*)">([\s\S]*?)<\/start-tag>/g,($1, $2, loop) => {
            
            if(cnterName[parsLoopSpoceCount]) 
                loop = loop.replace(new RegExp(`\\b${cnterName[parsLoopSpoceCount]}\\b`,'g'),rplcCnter[parsLoopSpoceCount]);
            
            let lines = loop.replace(/^\s*\n/gm,'').split('\n'), content = '', variable, result;

            for(let line of lines){
                const lnContnt = line.trim();
                if(lnContnt != ''){
                    if(lnContnt.startsWith('let _')){
                        if(cnterName[parsLoopSpoceCount] && lnContnt.includes(cnterName[parsLoopSpoceCount])) {}
                        else{
                            variable = `${lnContnt.replace('let ','').replace("='';",'')}`;
                            if(typeof window != 'undefined') window[variable] = '';
                            else global[`${variable}`] = '';
                        }
                    }
                    else if (lnContnt.indexOf('++;') > 0) content += lnContnt+';';
                    else if(lnContnt.startsWith('console.log')) content += lnContnt;
                    else if (lnContnt.startsWith('@if(')) content += lnContnt.replace('@if','if')+'{';
                    else if (lnContnt.startsWith('@endif')) content += lnContnt.replace('@endif','}');
                    else if(!lnContnt.startsWith('for(') && lnContnt != '}')
                        content += variable + '+=`'+lnContnt.replace(/\{([^}]+)\}/gi,(_, bind) => bind ? '$'+_ : _)+'`;';
                    else content += line; 
                }
            }
            parsLoopSpoceCount++;
            const re = /{([\$\-\s\.\[\]\=\>\<\'\"\@\:\;\?A-Z0-9]*?)}|item="{([\$\-\s\.\[\]\=\>\<\'\"\@\:\;\?A-Z0-9]*?)}"/gi
            content = content.replace(re, (mt, _, ds, pos) => {
                if(content.slice(pos-7, pos).startsWith('item="$')) return '{JSON.stringify('+_+')}';
                else return mt
            });
            
            result = eval(content);//Runs the for loop scope
            result = eval(variable);//Grabs the for loop result from the variable

            if(typeof window != 'undefined') {
                if(cnterName[parsLoopSpoceCount]) delete window[rplcCnter[parsLoopSpoceCount]];
                delete window[variable];
            }
            else{
                delete global[`${variable}`], delete global[rplcCnter[parsLoopSpoceCount]];
            }
            return `<start-tag id="${variable}">${result}</start-tag>`;
        });
    }

}
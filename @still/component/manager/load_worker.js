import { WORKER_EVT } from "../../setup/constants.js";
import { WorkerHelper } from "../../util/componentUtil.js";

const procesedCmp = {};

self.addEventListener('install', (event) => {
    console.log('Load Worker installing...');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Load Worker activating...');
    event.waitUntil(self.clients.claim());
});


self.addEventListener('message', event => {
    if(WORKER_EVT.OFFLOAD === event.data.type) parseDelayedProp(event);
});

function parseDelayedProp(evt){
    const { data: {cmpId, content: cmpContent, cmpName, isTopLvlCpm} } = evt;
    const RE = /\/[\*\s\t\n]*?\@Delayed([0-9]{0,})[\*\s\t\n]*?\/([A-Z\$\#\_\t\s\n]*?)\(/ig;
    cmpContent.replace(RE, (_, time, mtdName) => {
        const buildTime = WorkerHelper.parseTime(time);
        const content = cmpContent.slice(cmpContent.indexOf(mtdName));
        parseMethod(content, cmpId, cmpName, mtdName, buildTime, isTopLvlCpm);
    });
}


function parseMethod(content, cmpId, cmpName, mtdName, buildTime, isTopLvlCpm) {
    const RE = /\/[A-Z0-9\;\/\*\@\s\{\}]{1,}\*\//ig, RE_METHD_END = /[\s\S]*\}/i;
    const RE_REF_SUBSCRT = /Components\.ref\(\'([A-Z0-9\$\_]*?)\'\)\.([A-Z0-9\$\_]{1,}?)\.onChange\(/ig;
    
    const codeLines = content.replace(RE,'').replace(/^\s*[\r\n]/gm,'').split('\n');
    let openCloseToken = 0, posCounter = 0, currMethod = '', startedMethod = false, cmpRefSubscriptionsMap = null;
    
    for(const line of codeLines){

        if(line.indexOf('{') >= 0){
            
            if(openCloseToken === 0) startedMethod = true;
            if(!line.match(RE_METHD_END)) openCloseToken++;

        } else if(line.match(RE_METHD_END) && startedMethod === true) {
            openCloseToken--;
        }
           
        if(startedMethod) currMethod += line;
        
        if(startedMethod && openCloseToken === 0){
            currMethod.replace(RE_REF_SUBSCRT, (_, ref, prop) => { 
                self.postMessage({ mtdName: mtdName.trim(), cmpName, ref, prop, cmpId, buildTime, isTopLvlCpm });
            });

            break;
        }
        
        posCounter += line.length;
    }

    return cmpRefSubscriptionsMap;
}
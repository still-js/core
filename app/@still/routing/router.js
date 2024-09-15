class Router {

    static goto(cmp){

        const routeInstance = getRouteMap()
        const route = routeInstance.route[cmp];

        const cmpRegistror = $still.context.componentRegistror.componentList;
        const isHomeCmp = ComponentSetup.get().entryComponentName == cmp;
        if(isHomeCmp && cmp in cmpRegistror){
            $still.context.currentView = cmpRegistror[cmp].instance;
            Router.getAndDisplayPage($still.context.currentView, isHomeCmp);
        }else{

            loadComponentFromPath(route, cmp)
            .then(({ imported, isRoutable }) => {
                if(!imported) {
                    //delete $still.context.componentRegistror.componentList[cmp];

                    /**
                     * the bellow line clears previous component from memory
                     * @type { ViewComponent }
                     */
                    const newInstance = eval(`new ${cmp}()`);
                    newInstance.setRoutableCmp(true);
                    if(isHomeCmp)
                        newInstance.setUUID($stillconst.TOP_LEVEL_CMP);

                    $still.context.currentView = newInstance;

                }else{
                    if(!isRoutable){
                        $still.context.currentView = $still.component.list[cmp];
                    }else{
                        $still.context.currentView = cmpRegistror[cmp].instance;
                    }
                }
    
                Router.getAndDisplayPage($still.context.currentView, imported);
            });

        }


    }


    /**
     * the bellow line clears previous component from memory
     * @param { ViewComponent } componentInstance
     */
    static getAndDisplayPage(componentInstance, isReRender = false){

        const appCntrId = 'appPlaceholder';
        const appPlaceholder = document.getElementById(appCntrId);
        
        if(isReRender){
            Components
            .unloadLoadedComponent()
            .then(() => {
                Components.reloadedComponent(componentInstance.getUUID());
                componentInstance.onRender();
            });
            
        }else{
            Components
            .unloadLoadedComponent()
            .then(() => {
                //appPlaceholder.innerHTML = ''
                const pageContent = componentInstance.getTemplate();
                appPlaceholder.insertAdjacentHTML('afterbegin', pageContent);
                componentInstance.onRender();
                setTimeout(() => {
                    componentInstance.$stillLoadCounter = componentInstance.$stillLoadCounter + 1;
                },100);
            });
        }


    }

}
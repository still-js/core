class Router {

    static goto(cmp){

        const applicationContainerId = 'appPlaceholder';
        const routeInstance = getRouteMap()
        const route = routeInstance.route[cmp];

        loadComponentFromPath(route, cmp)
        .then(({ imported }) => {
            if(imported) {
                delete $still.context.componentRegistror.componentList[cmp];
            };
            $still.context.currentView = eval(`new ${cmp}()`);
            const newElm = document.createElement('div');
            newElm.onload = function(){
                console.log(`ELEMENT LOADED SUCCESS`);
            }
            /**
             * the bellow line clears previous component from memory
             * @type { ViewComponent }
             */
            const componentInstance = $still.context.currentView;
            //componentInstance.
            document
                .getElementById(applicationContainerId)
                .innerHTML = componentInstance.getTemplate();
            componentInstance.onRender();
        });

    }

}
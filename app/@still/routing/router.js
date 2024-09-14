class Router {

    static goto(cmp){

        const applicationContainerId = 'appPlaceholder';
        /**
         * getRouteMap() function stated inside route.map.js in the root of the project
         */
        const routeInstance = getRouteMap();
        const route = routeInstance.route[cmp];

        loadComponentFromPath(route, cmp)
        .then(({ imported }) => {
            if(!imported) {
                //delete $still.context.componentRegistror.componentList[cmp];
                $still.context.currentView = eval(`new ${cmp}()`);
            }else{
                $still.context.currentView = $still.component.list[cmp];
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
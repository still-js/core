class Router {

    static goto(cmp){

        const applicationContainerId = 'appPlaceholder';
        const routeInstance = getRouteMap()
        const route = routeInstance.route[cmp];

        loadComponentFromPath(route, cmp)
        .then(({ imported }) => {
            if(imported) {
                delete context.componentRegistror.componentList[cmp];
            };
            /**
             * the bellow line clears previous component from memory
             * @type { ViewComponent }
             */
            context.currentView = eval(`new ${cmp}()`);
            const componentInstance = context.currentView;
            //componentInstance.
            document
                .getElementById(applicationContainerId)
                .innerHTML = componentInstance.getTemplate();
        });
    }

}
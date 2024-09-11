class Router {

    static goto(cmp){

        const applicationContainerId = 'appPlaceholder';
        const routeInstance = getRouteMap()
        const route = routeInstance.route[cmp];

        loadComponentFromPath(route, cmp)
        .then(({ imported }) => {
            if(imported) return;
            /**
             * @type { ViewComponent }
             */
            const componentInstance = eval(`new ${cmp}()`);
            //componentInstance.
            document
                .getElementById(applicationContainerId)
                .innerHTML = componentInstance.getTemplate();
        });
    }

}
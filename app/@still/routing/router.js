class Router {

    static goto(cmp){

        const appCntrId = 'appPlaceholder';
        const routeInstance = getRouteMap()
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
            const appPlaceholder = document.getElementById(appCntrId);
            
            appPlaceholder.innerHTML = ''
            appPlaceholder.insertAdjacentHTML('afterbegin', componentInstance.getTemplate());
            componentInstance.onRender();
        });

    }

}
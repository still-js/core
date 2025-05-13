import { stillRoutesMap } from "../../../config/route.map.js";
import { ComponentType } from "../type/ComponentType.js";

const $stillGetRouteMap = () => {
    return {
        route: {
            ...stillRoutesMap.viewRoutes.regular,
            ...stillRoutesMap.viewRoutes.lazyInitial
        },
    }
}

addEventListener('message', (event) => {

    /** @type { Array<ComponentType> } */
    const components = event.data.components;
    const vendorPath = event.data.vendorPath;

    components.forEach(cmp => {

        let cmpPath, cmpFolder, prePath = vendorPath;
        if (String(cmp.component).startsWith('@')) {
            cmpPath = cmp.component.slice(1);
            cmpFolder = cmpPath.split('/');
            const cls = cmpFolder.at(-1);
            cmpFolder.pop()
            cmpFolder = cmpFolder.join('/');
        } else {
            cmpPath = `${$stillGetRouteMap().route[cmp.component]?.path}/${cmp.component}`;
            prePath = vendorPath.replace('/@still/vendors', '')
        }


        fetch(`${prePath}/${cmpPath}.js`)
            .then(() => {

                if (cmp.assets?.length) {

                    cmp.assets.forEach(asset => {
                        fetch(`${vendorPath}/${cmpFolder}/${asset}`)
                            .then(async r => {
                                self.postMessage({
                                    path: `${vendorPath}/${cmpFolder}/${asset}`,
                                    type: asset.slice(-3)
                                });
                            })
                            .catch(r => {
                                console.log(`Error on loading `, `${vendorPath}/${cmpFolder}/${asset}`);
                                console.log(r);
                            });
                    });

                }

            })
            .catch(err => {
                console.log(`Error on prefetching `, `${vendorPath}/${cmpPath}.js`);
                console.log(err);
            })

    })

});
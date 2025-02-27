import { ComponentType } from "../type/ComponentType.js";

addEventListener('message', (event) => {

    /** @type { Array<ComponentType> } */
    const components = event.data.components;
    const vendorPath = event.data.vendorPath;

    components.forEach(cmp => {

        const cmpPath = cmp.component.slice(1);
        let cmpFolder = cmpPath.split('/');
        const cls = cmpFolder.at(-1);
        cmpFolder.pop()
        cmpFolder = cmpFolder.join('/');

        fetch(`${vendorPath}/${cmpPath}.js`)
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
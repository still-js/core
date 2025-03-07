import { StillAppSetup } from "../../../app-setup.js";
import { Components } from "../../setup/components.js";
import { StillError } from "../../setup/error.js";
import { ComponentType } from "../type/ComponentType.js";
import { ViewComponent } from "./ViewComponent.js";

const cmp = Components;

/**
 * 
 * @param {Components} Component 
 * @returns 
 */
export const StillAppMixin = (Component) =>

    class extends Component {

        entryComponentPath;
        entryComponentName;
        servicePath;

        /** @type { Array<ComponentType> } */
        #componentAOTList = [];

        /** 
         * @param { ComponentType | ViewComponent } cmp
         * @returns { StillAppSetup }
         * */
        addPrefetch(cmp) {

            /* if (
                cmp.prototype instanceof BaseComponent
                || cmp.prototype instanceof ViewComponent
                || cmp.__proto__ instanceof BaseComponent
                || cmp.__proto__ instanceof ViewComponent

            ) {
                const cmpAssets = cmp['importAssets']();
                const assets = [];

                if (cmpAssets.scripts)
                    assets.push(...cmpAssets.scripts);

                if (cmpAssets.styles)
                    assets.push(...cmpAssets.styles);

                cmp = { assets, component: null };
            } */

            this.#componentAOTList.push(cmp);
            return this;
        }

        getPrefetchList() {
            return this.#componentAOTList;
        }

        static register = (piece) => cmp.register(piece);

        register = (piece) => cmp.register(piece);

        setHomeComponent = (cmp) => super.setHomeComponent(cmp);

        setServicePath = (path) => super.setServicePath(path);

        componentAOTLoad = () => super.setupImportWorker()

        runPrefetch = () => super.setupImportWorker();

        configurePrefetch() { }

        /** @returns { ViewComponent } */
        static getComponentFromRef = (name) => super.getComponentFromRef(name);

        static setAuthN = (val) => AppTemplate.get().setAuthN(val);

        setAuthN = (val) => AppTemplate.get().setAuthN(val);

        static setDevErrorTracing = () => StillError.setDevErrorContainer();

    }
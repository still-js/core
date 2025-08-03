import { StillAppSetup } from "../../../config/app-setup.js";
import { Components } from "../../setup/components.js";
import { StillError } from "../../setup/error.js";
import { ComponentType } from "../type/ComponentType.js";
import { validationPatterns } from "./BehaviorComponent.js";
import { ViewComponent } from "./ViewComponent.js";

const cmp = Components;

/**
 * s
 * @param {Components} Component 
 * @returns 
 */
export const StillAppMixin = (Component) =>

    class extends Component {

        /** @type { Worker } */ loadWorker;
        offloadContainers = {};
        entryComponentPath;
        entryComponentName;
        servicePath;
        static configFile = null;
        static config = { get: (propPath) => StillAppSetup.get().#getProp(propPath), props: {} };
        setConfigFile = (/** @type { String } */fileName) => StillAppSetup.configFile = fileName;
        #getProp = (path) => {
            try {
                return eval(`StillAppSetup.config.props.${path}`);
            } catch (error) {
                new ReferenceError(`Configuration property with path ${path} is not set`);
            }
        }

        /** @type { Array<ComponentType> } */
        #componentAOTList = [];
        /** @type { Array<ViewComponent> } */
        #componentWhiteList = [];
        /** @type { Array<ViewComponent> } */
        #componentBlackList = [];

        /** 
         * @param { ComponentType | ViewComponent } cmp
         * @returns { StillAppSetup }*/
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

        getPrefetchList() { return this.#componentAOTList; }
        static register = (piece) => cmp.register(piece);
        register = (piece) => cmp.register(piece);
        setHomeComponent = (cmp) => super.setHomeComponent(cmp);
        setServicePath = (path) => super.setServicePath(path);
        componentAOTLoad = () => super.setupImportWorker()
        runPrefetch = () => super.setupImportWorker();

        /** @returns { ViewComponent } */
        static getComponentFromRef = (name) => super.getComponentFromRef(name);

        static setDevErrorTracing = () => StillError.setDevErrorContainer();

        static authFlag = {};

        /** This makes sure that only StillAppSetup can set auth flag */
        setAuthN(value) {
            if (!('authn' in StillAppSetup.authFlag)) {
                StillAppSetup.authFlag['authn'] = value;
                Object.freeze(StillAppSetup.authFlag);
            }
        }

        setAnauthorizedWarning = (content) => super.injectAnauthorizedMsg(content);

        /** @param { Array<ViewComponent> } whiteList */
        setWhiteList(whiteList) {
            this.#componentWhiteList = whiteList.map(r => r.name);
            Object.freeze(this.#componentWhiteList);
        }

        /** @param { Array<String> } whiteList */
        getWhiteList = () => this.#componentWhiteList;

        /** @param { Array<ViewComponent> } whiteList */
        setBlackList(whiteList) {
            this.#componentBlackList = whiteList.map(r => r.name);
            Object.freeze(this.#componentBlackList);
        }

        /** @param { Array<String> } whiteList */
        getBlackList = () => this.#componentBlackList;

        /**  @returns { StillAppSetup } */
        static get() {
            if (StillAppSetup.instance == null)
                StillAppSetup.instance = new StillAppSetup();
            return StillAppSetup.instance;
        }

        addValidator = (name, validator) => validationPatterns[name] = validator;
        static addValidator = (name, validator) => StillAppSetup.get().addValidator(name, validator);

    }
import { StillAppSetup } from "../../../config/app-setup.js";
import { AppTemplate } from "../../../config/app-template.js";
import { Router } from "../../routing/router.js";
import { Components } from "../../setup/components.js";
import { UUIDUtil } from "../../util/UUIDUtil.js";
import { getViewComponent } from "../../util/route.js";
import { ViewComponent as DefaultViewComponent } from "./ViewComponent.js";


export class Template {

    static instance = {};
    static toastId = null;

    /** @param { DefaultViewComponent } cmp */
    constructor(cmp = null) {

        const ViewComponent = getViewComponent(DefaultViewComponent);
        if (cmp?.prototype instanceof ViewComponent)
            StillAppSetup.get().setHomeComponent(cmp);

        const clsName = 'AppTemplate';
        if (!(clsName in Template.instance))
            Template.instance[clsName] = this;
    }

    /** @param { DefaultViewComponent } cmp */
    static async newApp(cmp = null) {

        const pathAddress = await Router.getComponentFromPath();
        if (pathAddress) return new AppTemplate(pathAddress);
        else return new AppTemplate(cmp);

    }
    /** @returns { Template } */
    static get() {
        const clsName = 'AppTemplate';
        if (!(clsName in Template.instance)) {
            Template.instance[clsName] = new AppTemplate();
        }
        return Template.instance[clsName];
    }

    storageGet(name) {
        const clsName = this.constructor.name;
        const path = `${clsName}.storage.${name}`;
        return localStorage.getItem(path)
    }

    storageSet(name, value) {
        const clsName = this.constructor.name;
        const storage = localStorage;
        const path = `${clsName}.storage.${name}`;
        storage.setItem(path, value);
        return storage.getItem(path)
    }

    store(name, value) {

        let storedValue = this.storageGet(name);
        if (this.storageGet(name)) {
            return storedValue;
        }

        const clsName = this.constructor.name;
        if (!('storage' in Template.instance[clsName])) 
            Object.assign(Template.instance[clsName], { storage: {}});

        if (!(name in Template.instance[clsName]['storage'])) {
            Template.instance[clsName]['storage'][name] = value;
            return;
        }
        storedValue = this.storageSet(name, value);
        Template.instance[clsName]['storage'][name] = storedValue;
    }

    getStorageValue(name) {
        const clsName = this.constructor.name;
        if (!('storage' in Template.instance[clsName]))
            console.log(`No storage with name ${name} was set`);
        
        if (!(name in Template.instance[clsName]['storage']))
            console.log(`No storage with name ${name} was set`);

        const storedValue = this.storageGet(name);
        Template.instance[clsName]['storage'][name] = storedValue;
        return Template.instance[clsName]['storage'][name];

    }

    isAuthN() {
        return StillAppSetup.authFlag['authn'];
    }

    unloadApp() {
        Components.unloadApp();
        window.location.reload();
    }

    static showLoading() {
        const content = Template.spinnerContent();
        document.body.insertAdjacentHTML('beforeend', content);
    }

    static hideLoading() {
        setTimeout(() => {
            const id = "stllAppGlobalLoadingCurtain";
            const spinner = document.getElementById(id);
            if (spinner) document.body.removeChild(spinner);
        }, 100);
    }

    static spinnerContent() {
        return `
            <div id="stllAppGlobalLoadingCurtain">
                <div class="overlay"></div>
                <div class="page-loader-wrapper">
                    <div class="loader"><div class="m-t-30"></div><!-- <p>Por favor, aguarde...</p> --></div>
                </div>
                <div class="still-lds-spinner">
                    <div></div><div></div><div></div><div></div><div></div><div></div>
                    <div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
            </div>
        `;
    }


    static toast = {
        error: /** @param { Number } timeout Time in mileseconds to remove toast */ (message, timeout = 5000) => Template.launchToast({ status: 'Error', message, timeout }),
        success: /** @param { Number } timeout Time in mileseconds to remove toast */ (message, timeout = 5000) => Template.launchToast({ status: 'Success', message, timeout }),
        warn: /** @param { Number } timeout Time in mileseconds to remove toast */ (message, timeout = 5000) => Template.launchToast({ status: 'Warn', message, timeout })
    }

    /** @param {Object} [param0={}] 
    * @param {'success'|'Success'|'error'|'warn'|any} param0.status
    **/
    static launchToast({ status, message, timeout } = {}) {
        const [uuid, stat] = [Template.getToastId(), status || 'Success'];
        const msg = message || 'Operação realizada com sucesso';
        const icons = document.getElementsByClassName('toast-type-icon')[0].children;
        const statusId = ['success', 'Success'].includes(status) ? 0 
                            : ['warn', 'Warn'].includes(status) ? 2 : 1;

        [...icons].forEach((r, idx) => {
            r.style.display = idx == statusId ? 'block' : 'none';
        });

        const [statPlaceId, msgPlaceId] = [`${uuid}-status`, `${uuid}-msg`];
        document.getElementById(statPlaceId).innerHTML = stat;
        document.getElementById(msgPlaceId).innerHTML = msg;

        let timer1, timer2;
        const toast = document.querySelector(".still-toast"), closeIcon = document.querySelector(".close");
        const progress = document.querySelector(".still-toast-progress");
        toast.style.setProperty('--toast-stat-color', statusId == 1 ? 'red' : statusId == 2 ? 'orange' : '#2c5e24')

        toast.classList.add("still-toast-active");
        progress.classList.add("still-toast-active");
        let time1 = timeout, time2 = timeout * 0.06;
        timer1 = setTimeout(() => toast.classList.remove("still-toast-active"), time1);
        timer2 = setTimeout(() => progress.classList.remove("still-toast-active"), time1 + time2);

        closeIcon.addEventListener("click", () => {
            toast.classList.remove("still-toast-active");
            setTimeout(() => progress.classList.remove("still-toast-active"), time2);
            [...icons].forEach(r => r.style.display = 'none');
            clearTimeout(timer1); clearTimeout(timer2);
        });
    }


    static injectToastContent() {

        const uuid = Template.getToastId();

        const content = `
            <div class="still-toast">
                <div class="still-toast-content">
                    <div class="toast-type-icon">
                        <i style="display:none;" class="fas fa-solid fa-check check"></i>
                        <i style="display:none;" class="fa fa-times-circle" aria-hidden="true"></i>
                        <i style="display:none;font-size:24px;color:orange;" class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                    </div>
                    <div class="still-toast-message">
                        <span class="text text-1" id="${uuid}-status"></span>
                        <span class="text text-2" id="${uuid}-msg"></span>
                    </div>
                </div>
                <i class="fa-solid fa-xmark close">X</i>
                <div class="still-toast-progress"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforebegin', content);

    }

    static getToastId() {
        if (!Template.toastId)
            Template.toastId = `toast_${UUIDUtil.newId()}`;
        return Template.toastId;
    }

}
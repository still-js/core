class Template {

    static instance = {};
    static toastId = null;

    constructor() {
        const clsName = 'AppTemplate';
        if (!(clsName in Template.instance))
            Template.instance[clsName] = this;
    }

    /**
     * 
     * @returns { AppTemplate }
     */
    static get() {
        const clsName = 'AppTemplate';
        if (!(clsName in Template.instance)) {
            Template.instance[clsName] = new AppTemplate();
        }
        console.log(clsName);
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
        if (!('storage' in Template.instance[clsName])) {
            Object.assign(Template.instance[clsName], {
                storage: {}
            });
        }

        if (!(name in Template.instance[clsName]['storage'])) {
            Template.instance[clsName]['storage'][name] = value;
            return;
        }
        storedValue = this.storageSet(name, value);
        Template.instance[clsName]['storage'][name] = storedValue;
    }

    getStorageValue(name) {
        const clsName = this.constructor.name;
        if (!('storage' in Template.instance[clsName])) {
            console.log(`No storage with name ${name} was set`);
        }

        if (!(name in Template.instance[clsName]['storage'])) {
            console.log(`No storage with name ${name} was set`);
        }

        const storedValue = this.storageGet(name);
        Template.instance[clsName]['storage'][name] = storedValue;
        return Template.instance[clsName]['storage'][name];

    }

    setAuthN(value) {

        const clsName = this.constructor.name;
        if (!('authn' in Template.instance[clsName])) {
            Template.instance[clsName]['authn'] = null;
        }
        const storedValue = this.storageSet('authn', value);
        Template.instance[clsName]['authn'] = storedValue;
    }

    isAuthN() {

        let storedValue = this.storageGet('authn');
        if (storedValue) {
            Template.instance[this.constructor.name]['authn'] = storedValue;
        }

        return storedValue;
    }

    unloadApp() {
        Components.unloadApp();
        //Router.goto('init');
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
                    <div class="loader">
                        <div class="m-t-30"></div>
                        <p>Por favor, aguarde...</p>
                    </div>
                </div>
                <div class="still-lds-spinner">
                    <div></div><div></div><div></div><div></div><div></div><div></div>
                    <div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
            </div>
        `;
    }

    static toast({ status, message } = {}) {

        const uuid = Template.getToastId();
        const stat = status || 'Successo';
        const msg = message || 'Operação realizada com sucesso';

        const statPlaceId = `${uuid}-status`;
        const msgPlaceId = `${uuid}-msg`;

        document.getElementById(statPlaceId).innerHTML = stat;
        document.getElementById(msgPlaceId).innerHTML = msg;

        let timer1, timer2;
        const toast = document.querySelector(".still-toast");
        const closeIcon = document.querySelector(".close");
        const progress = document.querySelector(".still-toast-progress");

        toast.classList.add("still-toast-active");
        progress.classList.add("still-toast-active");

        timer1 = setTimeout(() => {
            toast.classList.remove("still-toast-active");
        }, 5000);

        timer2 = setTimeout(() => {
            progress.classList.remove("still-toast-active");
        }, 5300);


        closeIcon.addEventListener("click", () => {
            toast.classList.remove("still-toast-active");

            setTimeout(() => {
                progress.classList.remove("still-toast-active");
            }, 300);

            clearTimeout(timer1);
            clearTimeout(timer2);

        });

    }


    static injectToastContent() {

        const uuid = Template.getToastId();

        const content = `
            <div class="still-toast">
                <div class="still-toast-content">
                    <i class="fas fa-solid fa-check check"></i>
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
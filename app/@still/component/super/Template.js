class Template {

    static instance = {};

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

}
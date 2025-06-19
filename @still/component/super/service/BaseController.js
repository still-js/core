import { StillAppSetup } from "../../../../config/app-setup.js";
import { UUIDUtil } from "../../../util/UUIDUtil.js";

export class BaseController {
    /* stServiceTypeInjectable */ stSTI = true;
    versionId = UUIDUtil.newId();
    /** @param { 'load' } evt */ on(evt, cb = () => { }) { }
    constructor() {
        const type = this.constructor.name;
        const instance = StillAppSetup.get().services.get(type);
        if (!instance) StillAppSetup.get().services.set(type, this);
    }

    static get() {
        const type = this.name;
        let instance = StillAppSetup.get().services.get(type);
        if (!instance) instance = eval(`new ${type}()`);
        StillAppSetup.get().services.set(type, instance);
        return instance;
    }
}
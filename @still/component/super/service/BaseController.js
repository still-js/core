import { StillAppSetup } from "../../../../app-setup.js";
import { UUIDUtil } from "../../../util/UUIDUtil.js";

class ControllerFactory { }

export class ControllerManager {
    static instances = new Map();
    static get = (type) => ControllerManager.instances.get(type);
}

export class BaseController {

    versionId = UUIDUtil.newId();
    /** @param { 'load' } evt */ on(evt, cb = () => { }) { }
    constructor() {
        const type = this.constructor.name;
        const instance = StillAppSetup.get().services.get(type);
        if (!instance) StillAppSetup.get().services.set(type, this);
    }
}
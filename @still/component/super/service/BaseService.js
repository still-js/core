import { UUIDUtil } from "../../../util/UUIDUtil.js";

export class ServiceEvent {

    changeSubscribers = [];

    /** @type { any } */
    value;

    constructor(value = null) { this.value = value };
    onChange = (cb = () => { }) => this.changeSubscribers.push(cb);
    dispatchOnChange = (value) =>
        this.changeSubscribers.forEach(async cb => await cb(value));
}


export class BaseService {
    /** @param { 'load' } evt */
    on(evt, cb = () => { }) { }
    /* stServiceTypeInjectable */ stSTI = true;
    serviceId = UUIDUtil.newId();

    parseServiceEvents() {
        const fields = Object.keys(this);
        fields.forEach(prop => {
            if (this[prop] instanceof ServiceEvent) {

                /** @type { ServiceEvent } */
                const [svc, subscribers] = [this[prop], this[prop].changeSubscribers];
                this[prop] = { onChange: () => { }, [`$st${prop}sb`]: subscribers };

                Object.assign(this, { ['$still_' + prop]: svc.value });
                this.defineGetter(prop);

                this.__defineSetter__(prop, (newValue) => {
                    this[`$st${prop}sb`].forEach(async (cb) => await cb(newValue));
                    this['$still_' + prop] = newValue;
                });
            }
        });
    }

    /** @param { ServiceEvent } cls */
    defineGetter = (prop) => {

        if (!this[`$st${prop}sb`]) this[`$st${prop}sb`] = [];
        this.__defineGetter__(prop, () => ({
            value: this['$still_' + prop],
            onChange: (cb = () => { }) => this[`$st${prop}sb`].push(cb)
        }));

    }

}
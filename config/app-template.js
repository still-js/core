import { Template } from "../@still/component/super/Template.js";

export class AppTemplate extends Template {

    /**
     * <still-component> is the placeholder where components 
     * should be render both when loading or routing to the component
     * 
     * <still-fixed> is the specification of a specific component part from the 
     * User interface that needs to be fiexed (e.g. Header, Footer, Menu, Navigation, etc.)
     * 
     * THIS SHOULD BE CHANGED ACCORDING TO MY LAYOUT WHERE I'M HAVING COMPONENTS FOR
     * EACH PART AND THE FIXED ONES WIIL BE REFERENCED AS <st-fixed> AND THE COMPONENT
     * TO BE RENDERED WILL BE PASSED AS THE VALUES OF component PROPERTY OF <st-fixed>
     * e.g. <st-fixed component="AppHeader">
     */
    template = `
        <still-component/>
    `;

}
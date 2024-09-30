class AppTemplate {

    /**
     * <still-component> is the placeholder where components 
     * should be render both when loading or routing to the component
     * 
     * THIS SHOULD NOT BE CHANGES AS ANY LAYOUT SPECIFIC CUSTOMIZATION SHOULD BE DONE
     * ON THE entryComponent STATED IN components-setup.js FILE AS NEEDS TO BE SECIFIED 
     * THE NAME AND PATH ON entryComponentPath and entryComponentName respectively
     */
    template = `
        <nav class="navbar" id="topNavBar" style="position: fixed;"></nav>
        <div>
            <aside id="leftsidebar" class="sidebar"></aside>
        </div>
        <still-component/>
    `;

}
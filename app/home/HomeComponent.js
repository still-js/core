import { ViewComponent } from "../../@still/component/super/ViewComponent.js";

export class HomeComponent extends ViewComponent {

    isPublic = true;
    template = `
        <div class="itWorked still-worked-home-container">
            <div>
                <img 
                    class="still-fw-logo"
                    src="@still/img/logo-no-bg.png"
                />
            </div>
            <h2 class="still-fw-before-logo">Still.js Framework</h2>
            <h1>It Worked</h1>
            <p class="still-home-orientation-text">
                This is the HomeComponent, you can access it 
                in the app/home/HomeComponent.js path<br>
                and do you adjustments accordingly
            </p>
        </div>
    `;

    constructor() {
        super();
    }

}
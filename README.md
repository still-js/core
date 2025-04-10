<div style="display:flex; justify-content: center">
    <img src="@still/img/logo-no-bg.png" style="width: 5em;"/>
</div>

# Still.js Framework

StillJS is a Web UI Framework which helps you to build your user interfaces which uses Vanilla JavaScript, yet the component approach is the main focus allowing you to modulrize your UI in the same fashion we do with React and Angular. visit the <a href="https://still-js.github.io/stilljs-doc/">official documentation</a> for deeper overview.

<div style="padding: 15px; padding-bottom:0px; display:flex; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #a94442; background-color: #f2dede; border-color: #ebccd1;">



<svg style="width:30px; padding-right:10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ec7046" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>

<b>Still.js</b> project creation is to be done through the <b><a href="https://www.npmjs.com/package/@stilljs/cli" target="_blank">still-cli tool npm package</a></b>, therefore it's to be avoided to install @stilljs/core package since the idea is to create a project instead.
</div>




<br>

#### Documentation
A complete documentation is not yet available as the work is in progress, anyway there is quite of content and documentation available on the Github, <a href="https://still-js.github.io/stilljs-doc/" target="_blank">click here</a>.

The <b>@stilljs/core</b> itself is the set of classes, structures and features concerning the Framework, in order to use it we need to instal the cli tool as follow:

<br>

#### Instalation

The official documentation concerning environment set up and project creation can be found <a href="https://still-js.github.io/stilljs-doc/installation-and-running/" target="_blank">here</a>.

```
npm i @stilljs/cli -g
```

<br>

#### Creating a project
Create a folder for you project (e.g. project-name) and from inside such folder init the project as the bellow instruction
```
npx still init
```

After initiating the project the framework structure and files are download to the folder.

<br>

##### Project structure
```js
    project-name //My project folder
    |___ @still // Still.js framework
    |___ app // Folder which holdes to app files
    |     |__ HomeComponent.js //Component generated automatically when creating project
    |__ app-setup.js //App configuration file/class
    |__ app-template.js //App template scheleton
    |__ index.html //Application container
    |__ jsconfig.js //Basic configuration for vscode
    |__ package.json // Regular package JSON
    |__ route.map.json // Component routing and path file

```

<br>

### Usage example
```js
import { ViewComponent } from "../../@still/component/super/ViewComponent.js";

export class HomeComponent extends ViewComponent {

    /** 
     * isPublic flag is needed for any component that is publicly accessible, therefore, 
     * when dealing with authentication and permission scenario any component requiring
     * user permission the flag will be removed or turned to false
     */
    isPublic = true;
    template = `
        <div>
            <h2>Hello world!</h2>
            <p>
            I'm an easy component with a button
            </p>
            <button>I'm a button</button>
        </div>
    `;
}
```

#### Running the project

From the project folder, use still-cli to run the app as follow:
```
npx still serve
```


#### Alternative from CDN

When using CDN Still.js provides also with the capability of creating powerfull Microfrontend solutions in addition to regular component approach, follow the official documentation on how to set it up <a href="https://still-js.github.io/stilljs-doc/installation-and-running-cdn/" target="_blank">here</a>.

```
<script src="https://cdn.jsdelivr.net/npm/@stilljs/core@latest/@still/lone.js" type="module"><script>
<link href="https://cdn.jsdelivr.net/npm/@stilljs/core@latest/@still/ui/css/still.css" type="module" rel="stylesheet"><link>
```

<br>
<br>
# Still.js Framework

StillJS is a Web UI Framework which helps you to build your user interfaces which uses Vanilla JavaScript, yet the component approach is the main focus
allowint you to modulrize your UI in the same fashion we do with React and Angular.

The code itself is only the set of classes, structures and features concerning the Framework, in order to use it we need to instal the cli tool as follow:

#### Instalation
```
npm i @stilljs/cli -g
```

<br>

#### Creating a project
```
npx still create project project-name
```

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
npx still app serve
```


#### Alternative from CDN
```
npm i @stilljs/cli -g
```
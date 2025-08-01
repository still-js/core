![NPM Version](https://img.shields.io/npm/v/%40stilljs%2Fcore)
![NPM Downloads](https://img.shields.io/npm/d18m/%40stilljs%2Fcore)
![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hy/%40stilljs%2Fcore)
![YouTube Channel Views](https://img.shields.io/youtube/channel/views/UC1uLPIxSD62bQFGFiBouHRA)

<br>

<div style="display:flex; justify-content: center; width: 5em;">
    ![Still.js logo](/@still/img/logo-no-bg.png)
</div>

# **Still.js** Framework

StillJS is a Web UI Framework which uses Vanilla JavaScript to help you to build user interfaces, but focuses on a component approach, allowing you to modularize your UI in the same fashion as React and Angular. Visit the [official documentation](https://stilljs.dev) for a deeper overview.

<br>

## Documentation
Complete documentation is not yet available, as the work is in progress. Still, there is quite a lot of content and documentation available on [https://stilljs.dev](https://stilljs.dev) and on [Github](https://still-js.github.io/stilljs-site/)</a>.

## Community
**Still.js** is in development. You are more than welcome to join 
[the Discord channel](https://discord.gg/fUVJRTmQ9f).

<br>

## Contributions
As an Open Source project, we welcome any contributions to **Still.js**. You can start by joining the Discord channel, below are some ways one might contribute:

1. Report Bugs
2. Implement new Features
3. Suggest improvements
4. Improving/enriching documentations

<br>

## Getting Started

**Still.js** project creation is to be done through the **[*still-cli*](https://www.npmjs.com/package/@stilljs/cli) tool npm package**, therefore do not directly install the @stilljs/core package for your project. The idea is to create a project instead.


### Installation

The official documentation concerning environment set up and project creation can be found <a href="https://still-js.github.io/stilljs-site/installation-and-running/" target="_blank">here</a>.  Install with *npm* (using the <b>`-g`</b> flag) as follow:


```
npm i @stilljs/cli -g
```

<br>

### Creating a project
Create a folder for your project (e.g. project-name) and from inside that folder initialize the project as shown below:
```
npx still init
```

After initializing, the project the framework structure and files are downloaded to the folder.

<br>

#### Project structure
```js
    project-name/ //Your project folder
    |___ @still/ // Still.js framework
    |___ app/ // Folder which holdes app files
    |     |__ HomeComponent.js //Component generated automatically when creating project
    |__ config/ //Folder containing application configuration files
    |     |__ app-setup.js //App configuration file/class
    |     |__ app-template.js //App template skeleton
    |     |__ route.map.json //Component routing and path file
    |__ index.html //Application container
    |__ jsconfig.js //Basic configuration for vscode
    |__ package.json // Regular package JSON

```

<br>

## Usage example
```js
import { ViewComponent } from "../../@still/component/super/ViewComponent.js";

export class HomeComponent extends ViewComponent {

    /** 
     * isPublic flag is needed for any component that is publicly accessible, therefore 
     * when dealing with scenarios like authentication and permission, or any component requiring
     * user permissions, this flag will be removed or set to false
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

### Running the project

From the project folder, use the *still cli* to run the app as follow:
```
npx still serve
```


### Alternative from CDN

When using CDN, **Still.js** allows you to create powerful micro-front-end solutions along with a component approach. [Follow the official documentation](https://still-js.github.io/stilljs-site/installation-and-running-cdn/) to set it up.
```
<script src="https://cdn.jsdelivr.net/npm/@stilljs/core@latest/@still/lone.js" type="module"><script>
<link href="https://cdn.jsdelivr.net/npm/@stilljs/core@latest/@still/ui/css/still.css" type="module" rel="stylesheet"><link>
```

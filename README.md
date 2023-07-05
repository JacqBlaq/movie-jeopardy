<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px style="border-radius: 50%;"
  src="https://i.imgur.com/8ykUyc6.png" alt="Project logo"></a>
</p>

<h1 align="center">Movie Jeopardy</h1>

<div align="center">

[![Static Badge](https://img.shields.io/badge/angular-~13.3.2-c3002f?logo=angular)](https://github.com/angular/angular-cli)
![Libraries.io dependency status for GitHub repo](https://gitlab-badges.greenpeace.org/librariesio/github/JacqBlaq/movie-jeopardy)
![GitHub repo size](https://img.shields.io/github/repo-size/JacqBlaq/movie-jeopardy)
![Lines of code](https://img.shields.io/tokei/lines/github/JacqBlaq/movie-jeopardy)
![GitHub language count](https://gitlab-badges.greenpeace.org/github/languages/count/JacqBlaq/movie-jeopardy)

</div>

---

Angular Jeopardy-style trivia game. Each category/question is based on a popular movie franchise.

I previously created a similar [`Jeopardy-style Java App`](https://github.com/JacqBlaq/Jeopardy-Game), 6 years ago(2017), for an intro-level programming course in college. Not the cleanest work 😅 but I greatly enjoyed working on that project so I wanted to take another stab at it. It's been a tough year but coding brings me joy so I hope you enjoy this app too 🖤.

Using [![Adobe XD](https://img.shields.io/badge/Adobe%20XD-470137?logo=Adobe%20XD&logoColor=#FF61F6)](https://helpx.adobe.com/xd/user-guide.html), I created a [`style-guide`](https://xd.adobe.com/view/da7916d2-aba1-47ea-b84c-2813a6b1a10a-8f2a/screen/6e287aa6-aef6-443a-9629-fe6de065eb45) to ensure consistent principles, design language, and best practices would be followed. From typography, iconography, components to fully fleshed out mocks of each page.


## 📝 Table of Contents

- [Getting Started](#getting_started)
- [Build](#build)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🏁 Getting Started <a name = "getting_started"></a>

<!-- These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system. -->

### Prerequisites
##### To install Angular on your local system, you need the following:

Requirement | Details
------------|--------
[Node.js](https://nodejs.org/) | Angular requires an active LTS or maintenance LTS version of Node.js. <pre><code>For information see the [version compatibility](https://angular.io/guide/versions) guide.</code></pre> 
[Node Package Manager](https://www.npmjs.com/get-npm) | Angular applications depend on npm packages for many features and functions. To download and install npm packages, you need an npm package manager. <pre><code>Node Package Manager gets installed with Node.js by default.</code></pre>

##### Compatible `Node-lts` versions to install:

> versions are compatible with Angular 13.

[![node-current (tag)](https://gitlab-badges.greenpeace.org/node/v/@angular/cli/v13-lts)](https://nodejs.org/en/download/releases)

##### Install the Angular CLI globally:

```code
npm install -g @angular/cli@~13.3.2
```

### Seting Up Project

Once you've cloned or downloaded a local copy of this application, navigate to the workspace folder `movie-jeopardy` you need to install all packages listed in `package.json`:

```code
npm install
```
This will output a `node_modules/` folder which stores all installed npm packages and dependencies.


##### Run the application:

```code
ng serve --open
```
The `ng serve` command launches the server and will automatically reload if you change any of the source files.

The `--open` (or just `-o`) option automatically opens your browser to your local server `http://localhost:4200/`.


If your installation and setup was successful, you should see the following page:

<pre><code>
  <img width=600px  style="border-radius: 4px; border: 1px solid #e1e1e1"
  src="https://i.imgur.com/kPQgk9G.png" alt="Project logo"></a>
</pre></code>


## 🧰 Build <a name = "build"></a>

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## ⛏️ Built Using <a name = "built_using"></a>

- [Angular](https://www.angular.io/) - Web Framework [![Static Badge](https://img.shields.io/badge/angular-~13.3.2-c3002f?logo=angular)](https://github.com/angular/angular-cli)
- [Angular Material](https://expressjs.com/) - Component Library [![Static Badge](https://img.shields.io/badge/angular_material-~^13.3.9-3f51b5?logo=angular&logoColor=white)](https://github.com/angular/angular-cli)
- [NodeJs](https://nodejs.org/en/) - Server Environment [![node-current (tag)](https://gitlab-badges.greenpeace.org/node/v/@angular/cli/v13-lts)](https://nodejs.org/en/download/releases)
- [ESlint](https://eslint.org/) - Linter [![ESlint](https://img.shields.io/badge/eslint-^8.44.0-3A33D1?logo=eslint&logoColor=white)](https://eslint.org/docs/latest/)
- [Prettier](https://prettier.io/) - Code Formatter [![prettier](https://img.shields.io/badge/prettier-^2.8.8-ff69b4?logo=prettier&logoColor=white)](https://github.com/prettier/prettier)
- [VS Code](https://www.angular.io/) - IDE [![VS Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?logo=visual%20studio%20code&logoColor=white)](https://code.visualstudio.com/)

## ✍️ Authors <a name = "authors"></a>

- [@JacqBlaq](https://github.com/JacqBlaq) - Idea & work


## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- I drew a lot of inspiration from [Bootstrap](https://getbootstrap.com/) & [Angular Material](https://material.angular.io/) when working on the style-guide for this app, so hats off to the individuals that work hard to maintain those libraries.


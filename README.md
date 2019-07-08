# Pundit 2

## License

http://thepund.it/license/


## Install

To install the project and be ready to develop you need a few components:
* npm (nodejs >= 8.0) <small>&nbsp;&nbsp;&nbsp; _( Suggested Versions: 8.* )_</small>
* grunt-cli
* git
* make


##### To install such components on ubuntu 18.04 LTS (and maybe others), perform the next commands :
>     sudo apt-get update
>     sudo apt-get install -y nodejs npm build-essential git node-grunt-cli

After the components have been installed the pundit application can be installed as well
<small>_(Note: Ubuntu by default installs an older version of nodejs if you want a newer version
you need to add the nodejs repository before installing the program, as presented in the official nodejs [documentation](
https://github.com/nodesource/distributions/blob/master/README.md
), alternatively you can change nodejs version at any time using the [n package](https://www.npmjs.com/package/n) )_</small>


##### Install pundit2
_WARNING:_ This step must be executed in the pundit directory and **NOT** run as root
>     npm install

This will install the full toolchain to develop, build and deploy the application.


## Develop
>     grunt dev

Examples are built in examples/*html from examples/src/*html.

To create a new one: add a new .html in examples/src/, include the header and footer comments
for grunt to build them correctly. Or copy one of the existing into a new one, directly.

The list of examples is built and included everywhere automatically.

To get a list of grunt targets:
>       grunt --help

## Build
>     grunt build

Will build a production ready pundit2 distribution in /build/:

* css/*ver*.pundit.css
* css/fonts/*
* scripts/*ver*.libs.js
* scripts/*ver*.pundit2.js

Plus all of the examples using the production code: index.html or just *.html.

Plus the documentation in /Docs.


# Code + naming policies

* Modules: "Pundit2.ModuleName", camel case with first capitalized
* Constants: "PUNDITDEFAULTCONF", all capitalized
* Services/Factories/Providers: "ServiceName", camel case with first capitalized
* Filenames:
    - javascript: "$name.$what.js" (eg Example.dir.js)
         - $what is one of: module, service, factory, ctrl, constant, dir (directive)...
         - $name is the same name of the $what defined inside (camel case etc)
    - templates: "$name.$what.tmpl.html" (eg: Example.dir.tmpl.html)
         - $name.$what is the same name of module this template belongs to
    - unit test: "$name.$what.unit.test.js" (eg: Example.service.unit.test.js)
    - e2e test: "$name.e2e.test.js" (eg: Example.e2e.test.js)
* Directories: name of the module / component
* Css classnames:
    - words are separated by hyphens "-"    
    - they *all* start with "pnd-" (eg: pnd-dashboard-container)
    - they are all lowercase

# Used in this project

* Js framework: Angular js https://docs.angularjs.org/api
* Css/html framework: Bootstrap http://getbootstrap.com/css/
* js+css/html: Angular strap http://mgcrea.github.io/angular-strap/
* Unit tests: http://jasmine.github.io/1.3/introduction.html
* E2E tests: https://github.com/angular/protractor/blob/master/docs/api.md

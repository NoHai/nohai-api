# NoHai backend
Backend for NoHai, mostly a [C.R.U.D.](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) application. It's written in typescript and it uses [GraphQL](https://graphql.org/), [MongoDB](https://www.mongodb.com/), [Jest](https://jestjs.io/) and [Sinon](https://sinonjs.org/).  

## Run
> You need [Node.js](https://nodejs.org/en/) version 10.15.3 to be installed, before you can run the application.

> You need [yarn package manager](https://yarnpkg.com/en/) to be installed before you can run the application.

> You need [MongoDB](https://www.mongodb.com/) to be installed, before you can run the application.

> As a MongoDB UI tool, you can use [MongoDB Compass](https://www.mongodb.com/products/compass).

Clone the repo and enter into the cloned directory:

* `git clone git@github.com:NoHai/nohai-api.git`
* `cd nohai-api`

Install all the node dependencies:

* `yarn install`

Build and start the application:

* `yarn run environment:all` (**environment** can be `mock`, `dev`, `staging` or `production`)

> The [GraphiQL](https://github.com/graphql/graphiql) interface can be accessed on: http://localhost:5000/graphql/.

## Migrations

> You need to install `typeorm` globally before: `yarn global add typeorm -g`.
Also, be sure that the globally installed, typeorm version matches with the 
one from `pagkage.json`.

Migrations are checked and ran on each application startup. To add a 
new migration you need to:
1. Go into `src/data/migrations` folder. 

2. Execute `typeorm migration:create -n YourMigrationNameGoesHere`. 

> A new migration file will be created in the `src/data/migrations` folder.

## Commands
* `yarn lint` - lints the code
* `yarn lint:fix` - lints and fixes the code
* `yarn lint:watch` - lints the code in watch mode

> The command `yarn lint:watch` does not fix the founds.

* `yarn test` - runs all unit tests
* `yarn test:watch` - runs all unit tests in watch mode
* `yarn copy:graph` - copies recursively all the GraphQL schema files to output directory

> When you run `yarn copy:graph`, all the GraphQL schema files are recursively copied from `src/presentation/graph` into `dist/presentation/graph` folder.

#### Mock environment
* `yarn mock:build` - executes the build for **mock environment**
* `yarn mock:build:watch` - executes the build for **mock environment** in watch mode

> When you run `yarn mock:build:watch` the settings file is copied only once. So, if you did some changes to the settings file (`mock.json` or `development.json` or `staging.json` or `production.json`), you have to re-run this command.

* `yarn mock` - starts the application for **mock environment**
* `yarn mock:watch` - starts the application for **mock environment** in watch mode
* `yarn mock:all` - lints the code with fixing, builds and starts the application for **mock environment**

> The command `yarn mock:all` is kid of a *single command to rule them all*, usually it's used in development for starting the app faster.

* `yarn mock:copy:settings` - copies the **mock settings file** to output directory

> When you run `yarn mock:copy:settings` the settings file is copied from `src/presentation/settings/mock.json` into `dist/presentation/settings` folder.

#### Development environment
* `yarn dev:build` - executes the build for **development environment**
* `yarn dev:build:watch` - executes the build for **development environment** in watch mode

> When you run `yarn dev:build:watch` the settings file is copied only once. So, if you did some changes to the settings file (`mock.json` or `development.json` or `staging.json` or `production.json`), you have to re-run this command.

* `yarn dev` - starts the application for **development environment**
* `yarn dev:watch` - starts the application for **development environment** in watch mode
* `yarn dev:all` - lints the code with fixing, builds and starts the application for **development environment**

> The command `yarn dev:all` is kid of a *single command to rule them all*, usually it's used in development for starting the app faster.

* `yarn dev:copy:settings` - copies the **development settings file** to output directory 

> When you run `yarn dev:copy:settings` the settings file is copied from `src/presentation/settings/development.json` into `dist/presentation/settings` folder.

#### Staging environment
* `yarn staging:build` - executes the build for **staging environment**
* `yarn staging` - starts the application for **staging environment**
* `yarn staging:watch` - starts the application for **staging environment** in watch mode
* `yarn staging:all` - lints the code with fixing, builds and starts the application for **staging environment**

> The command `yarn staging:all` is kid of a *single command to rule them all*, usually it's used in development for starting the app faster.

* `yarn staging:copy:settings` - copies the **staging settings file** to output directory

> When you run `yarn staging:copy:settings` the settings file is copied from `src/presentation/settings/staging.json` into `dist/presentation/settings` folder.

#### Production environment
* `yarn production:build` - executes the build for **production environment**
* `yarn production` - starts the application for **production environment**
* `yarn production:watch` - starts the application for **production environment** in watch mode
* `yarn production:all` - lints the code with fixing, builds and starts the application for **production environment**

> The command `yarn production:all` is kid of a *single command to rule them all*, usually it's used in development for starting the app faster.

* `yarn production:copy:settings` - copies the **production settings file** to output directory

> When you run `yarn production:copy:settings` the settings file is copied from `src/presentation/settings/production.json` into `dist/presentation/settings` folder.

## Main dependencies
* [Awilix](https://github.com/jeffijoe/awilix#readme)
* [express](https://expressjs.com/)
* [express-graphql](https://github.com/graphql/express-graphql)
* [graphql](https://github.com/graphql/graphql-js)
* [mongodb](https://github.com/mongodb/node-mongodb-native)
* [reflect-metadata](https://rbuckton.github.io/reflect-metadata/)
* [rxjs](https://rxjs.dev/)
* [typeorm](https://typeorm.io/#/)
* [copyfiles](https://github.com/calvinmetcalf/copyfiles#readme)
* [cross-env](https://github.com/kentcdodds/cross-env#readme)
* [jest](https://jestjs.io/)
* [nodemon](https://nodemon.io/)
* [onchange](https://github.com/Qard/onchange)
* [sinon](https://sinonjs.org/)
* [tslint](https://palantir.github.io/tslint/)

> All dependencies can be viewed inside the `package.json` file, inside the `dependencies` and `devDependencies` sections.

# NoHai backend
Backend for NoHai, mostly a [C.R.U.D.](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) application. It's written in typescript and it uses [GraphQL](https://graphql.org/), [MongoDB](https://www.mongodb.com/), [Jest](https://jestjs.io/) and [Sinon](https://sinonjs.org/).  

## Run
> You need [MongoDB](https://www.mongodb.com/) to be installed, before you can run the application.

> As a MongoDB UI tool, you can use [MongoDB Compass](https://www.mongodb.com/products/compass).

Clone the repo and enter into the cloned directory:

* `git clone git@github.com:NoHai/nohai-api.git`
* `cd nohai-api`

Install all the node dependencies:

* `npm install`

Build and start the application:

* `npm run environment:all` (**environment** can be **mock** or **dev** or **staging** or **production**)

> The [GraphiQL](https://github.com/graphql/graphiql) interface can be accessed on: http://localhost:5000/graphql/.

## Commands
* `npm run lint` - lints the code
* `npm run lint:fix` - lints and fixes the code
* `npm run lint:watch` - lints the code in watch mode
* `npm run test` - runs all unit tests
* `npm run test:watch` - runs all unit tests in watch mode
* `npm run copy:graph` - copies recursively all the GraphQL schema files to output directory

> The command `npm run lint:watch` does not fix the founds.

> When you run `npm run copy:graph`, all the GraphQL schema files are recursively copied from `src/presentation/graph` into `dist/presentation/graph` folder.

#### Mock environment
* `npm run mock:build` - executes the build for **mock environment**
* `npm run mock:build:watch` - executes the build for **mock environment** in watch mode
* `npm run mock` - starts the application for **mock environment**
* `npm run mock:watch` - starts the application for **mock environment** in watch mode
* `npm run mock:all` - lints the code with fixing, builds and starts the application for **mock environment**
* `npm run mock:copy:settings` - copies the **mock settings file** to output directory

> When you run `npm run mock:copy:settings` the settings file is copied from `src/presentation/settings/mock.json` into `dist/presentation/settings` folder.

> When you run `npm run mock:build:watch` the settings file is copied only once. So, if you did some changes to the settings file (`mock.json` or `development.json` or `staging.json` or `production.json`), you have to re-run this command.

> The command `npm run mock:all` is kid of a *single command to rule them all*, usually it's used in development for starting the app faster.

#### Development environment
* `npm run dev:build` - executes the build for **development environment**
* `npm run dev:build:watch` - executes the build for **development environment** in watch mode (the settings file is copied only once so, if you changed it, you have to re-run this command)
* `npm run dev` - starts the application for **development environment**
* `npm run dev:watch` - starts the application for **development environment** in watch mode
* `npm run dev:all` - lints the code with fixing, builds and starts the application for **development environment**
* `npm run dev:copy:settings` - copies the **development settings file** to output directory 

> When you run `npm run dev:copy:settings` the settings file is copied from `src/presentation/settings/development.json` into `dist/presentation/settings` folder.

> When you run `npm run dev:build:watch` the settings file is copied only once. So, if you did some changes to the settings file (`mock.json` or `development.json` or `staging.json` or `production.json`), you have to re-run this command.

> The command `npm run dev:all` is kid of a *single command to rule them all*, usually it's used in development for starting the app faster.

#### Staging environment
* `npm run staging:build` - executes the build for **staging environment**
* `npm run staging` - starts the application for **staging environment**
* `npm run staging:watch` - starts the application for **staging environment** in watch mode
* `npm run staging:all` - lints the code with fixing, builds and starts the application for **staging environment**
* `npm run staging:copy:settings` - copies the **staging settings file** to output directory

> When you run `npm run staging:copy:settings` the settings file is copied from `src/presentation/settings/staging.json` into `dist/presentation/settings` folder.

> The command `npm run staging:all` is kid of a *single command to rule them all*, usually it's used in development for starting the app faster.

#### Production environment
* `npm run production:build` - executes the build for **production environment**
* `npm run production` - starts the application for **production environment**
* `npm run production:watch` - starts the application for **production environment** in watch mode
* `npm run production:all` - lints the code with fixing, builds and starts the application for **production environment**
* `npm run production:copy:settings` - copies the **production settings file** to output directory

> When you run `npm run production:copy:settings` the settings file is copied from `src/presentation/settings/production.json` into `dist/presentation/settings` folder.

> The command `npm run production:all` is kid of a *single command to rule them all*, usually it's used in development for starting the app faster.

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

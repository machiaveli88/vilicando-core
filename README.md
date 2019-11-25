# vilicando-core

Framework based on next.js & hasura.io for web applications with full offline support.

1. [Roadmap](#roadmap)
2. [Core](#core)
3. [Theming](#theming)

## Roadmap

#### 0.1 - Start & Theming

- [x] Core
- [x] Theming
- [x] Basic example app

#### 0.2 - Language

- [x] Language

#### 0.3 - Database

- [x] Database
- [x] Example app with DB
- [ ] Offline support

#### 0.4 - Refactoring

- [x] Cleanup, Updates, ...
- [x] Remove Antd from Core
- [x] Additionally package for Antd
- [x] Adapting examples
- [x] Remove Apollo/Graphql/Hasura from Core
- [x] Additionally package for Hasura
- [x] Adapting examples
- [x] Replacing next-with-apollo with https://github.com/zeit/next.js/blob/canary/examples/with-apollo/lib/apollo.js for static building
- [x] Add more examples
- [ ] Additionally package for UI (based on react-native-web)
      ~~- [ ] Add preact~~ (error@node_modules/react-fela/es/useFela.js: Attempted import error: 'useContext' is not exported from 'react'.)
- [ ] Language improvements
- [ ] Monorepo with lerna
- [ ] Cleanup package.json & check "yarn check"
- [ ] Update Docs

#### 0.5 - Authentication

- [ ] Auth

#### 0.6 - Components & Improvements

- [ ] Splash-Screen (https://github.com/zeit/next.js/issues/5736, https://github.com/nguyenbathanh/react-loading-screen/blob/master/public/index.html)
- [ ] ...

## Core

-

### Server

-

## Theming

Vilicando uses [fela](http://fela.js.org) for theming and (with vilicando-antd) [antd](https://ant.design/) for the standard UI components. The theme variables therefore also depend on the Antd variables, which can be found [here](https://github.com/machiaveli88/vilicando-core/blob/master/antd/src/theme.json). The standard theme variables can be found in [here](https://github.com/machiaveli88/vilicando-core/blob/master/core/src/theme/theme.json).

## Language

Based on [polyglot](https://github.com/airbnb/polyglot.js#options-overview).

## Database

Based on [hasura](https://hasura.io).
See example for more usage.
Please set the following .env-vars to enable full hasura/graphql support:
`GRAPHQL_HTTP:` url for graphql
`GRAPHQL_WS:` url for websocket
`GRAPHQL_SECRET:` hasura admin secret

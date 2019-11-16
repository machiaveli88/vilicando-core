# vilicando-core

Framework based on next.js & hasura.io for web applications with full offline support.

1. [Roadmap](#roadmap)
2. [Core](#core)
3. [Theming](#theming)

## Roadmap

#### 0.1

- [x] Core
- [x] Theming
- [x] Basic example app

#### 0.2

- [x] Language

#### 0.3

- [x] Database
- [x] Example app with DB
- [ ] Offline support

#### 0.4

- [x] Cleanup, Updates, ...
- [x] Remove Antd from Core
- [ ] Additionally package for Antd
- [ ] Remove Apollo/Graphql/Hasura from Core
- [ ] Additionally package for Hasura
- [ ] Replacing next-with-apollo with https://github.com/zeit/next.js/blob/canary/examples/with-apollo/lib/apollo.js for static building
- [ ] Adapting examples
- [ ] Cleanup package.json & check "yarn check"

#### 0.5

- [ ] Auth

#### 0.6

- [ ] Splash-Screen
- [ ] ...

## Core

-

### Server

-

## Theming

Vilicando uses [fela](http://fela.js.org) for theming and [antd](https://ant.design/) for the standard UI components. The standard theme variables therefore also depend on the Antd variables, which can be found [here](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less), plus:

- padding-xl
- secondary-1
  ...
- secondary-10
- grey-1
  ...
- grey-10
- XY-color (for each color)

## Language

Based on [polyglot](https://github.com/airbnb/polyglot.js#options-overview).

## Database

Based on [hasura](https://hasura.io).
See example for more usage.
Please set the following .env-vars to enable full hasura/graphql support:
`GRAPHQL_HTTP:` url for graphql
`GRAPHQL_WS:` url for websocket
`GRAPHQL_SECRET:` hasura admin secret

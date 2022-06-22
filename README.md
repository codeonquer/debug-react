# README

示例项目来源：<https://codesandbox.io/s/kind-sammet-j56ro> ，是介绍 [New Suspense SSR Architecture in React 18](https://github.com/reactwg/react-18/discussions/37) 的示例 demo。

所使用的的源码版本为:

- react@18.2.0
- react-dom@18.2.0

本地环境为：

- node@v14.15.3
- npm@6.14.9

执行脚本 `npm start` 后访问 `localhost:4000` 即可进行调试。

为实现调试 react 源码，改动有：

#### 1. react 别名配置

```js
{
  react: path.resolve(__dirname, '../packages/react'),
  'react-dom': path.resolve(__dirname, '../packages/react-dom'),
  'react-reconciler': path.resolve(__dirname, '../packages/react-reconciler'),
  'react-server': path.resolve(__dirname, '../packages/react-server'),
  shared: path.resolve(__dirname, '../packages/shared'),
  scheduler: path.resolve(__dirname, '../packages/scheduler'),
};
```

#### 2. react 环境常量配置

```js
{
  __DEV__: true,
  __EXPERIMENTAL__: true,
  __EXTENSION__: true,
  __PROFILE__: true
}
```

#### 3. 解决报错一

```
Cannot read property '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED' of undefined
```

改动：

```js
// packages/shared/ReactSharedInternals.js

- import * as React from 'react';
- const ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
- export default ReactSharedInternals;

+ import ReactSharedInternals from '../react/src/ReactSharedInternals'
+ export default ReactSharedInternals;
```

#### 4. 解决报错二

```
throw new Error('This module must be shimmed by a specific renderer.');
```

```js
// packages/react-reconciler/src/ReactFiberHostConfig.js

- throw new Error('This module must be shimmed by a specific renderer.');

+ export * from './forks/ReactFiberHostConfig.dom';
```

```js
// packages/react-server/src/ReactServerFormatConfig.js

- throw new Error('This module must be shimmed by a specific renderer.');

+ export * from './forks/ReactServerFormatConfig.dom';
```

```js
// packages/react-server/src/ReactServerStreamConfig.js

- throw new Error('This module must be shimmed by a specific renderer.');

+ export * from './forks/ReactServerStreamConfig.dom';
```

#### 5. 解决报错三

```
react.default 为 undefined
```

具体情境参见代码：

```js
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./packages/react/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_react.default.createElement(...);
```

在主动编译 react/react-dom 之后，`__esModule` 是为 true 的，并且 react 确实没有 default 导出，所以我们改动 `packages/react/index.js` 文件，将所有的内容再次在 default 上导出即可。

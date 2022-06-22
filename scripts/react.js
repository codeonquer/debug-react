const path = require('path');

exports.reactAlias = {
  react: path.resolve(__dirname, '../packages/react'),
  'react-dom': path.resolve(__dirname, '../packages/react-dom'),
  'react-reconciler': path.resolve(__dirname, '../packages/react-reconciler'),
  'react-server': path.resolve(__dirname, '../packages/react-server'),
  shared: path.resolve(__dirname, '../packages/shared'),
  scheduler: path.resolve(__dirname, '../packages/scheduler'),
};

exports.reactEnv = {
  __DEV__: true,
  __EXPERIMENTAL__: true,
  __EXTENSION__: true,
  __PROFILE__: true
}

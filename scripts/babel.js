exports.babelForClient = {
  babelrc: false,
  sourceType: 'unambiguous',
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage',
        modules: false,
        targets: {
          browsers: ['iOS >= 13']
        }
      }
    ],
    '@babel/preset-react',
    '@babel/preset-flow'
  ]
};

exports.babelForServer = {
  babelrc: false,
  sourceType: 'unambiguous',
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        targets: {
          node: '14.15'
        }
      }
    ],
    '@babel/preset-react',
    '@babel/preset-flow'
  ]
};

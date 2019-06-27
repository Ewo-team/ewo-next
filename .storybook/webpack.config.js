// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require("path");
const include = path.resolve(__dirname, '../');

const baseWebpack = require('../webpack.config.js');

module.exports = async ({ config, mode }) => {

  //config.resolve.modules.push(path.resolve(__dirname, '../src'));

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [['react-app', { flow: false, typescript: true }]],
        },
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
    ]
  });

  config.resolve.alias = {
    '@client': path.resolve(include, 'src/client/'),
    '@engine': path.resolve(include, 'src/engine/'),
    '@models': path.resolve(include, 'src/engine/models/')
  }

  /*config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });*/

  config.resolve.extensions.push('.ts', '.tsx');
  return config;


  /*config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });

  config.module.rules.push({
    test: /\.tsx/,
    loader: 'babel-loader!ts-loader',
    exclude: /node_modules/,
    include
  });

  config.module.rules.push({
    loader: require.resolve('react-docgen-typescript-loader'),
  });

  /*config.resolve.alias = {
    '@client': path.resolve(include, 'src/client/'),
    '@engine': path.resolve(include, 'src/engine/'),
    '@models': path.resolve(include, 'src/engine/models/')
  };

  config.resolve.extensions.push('.ts', '.tsx');*/
  //return { ...config, module: { ...config.module, rules: baseWebpack.module.rules } };

  //return config;
};
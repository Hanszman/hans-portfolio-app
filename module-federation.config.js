const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'hans_portfolio_app',
  remotes: {
    hans_ui_design_lib:
      'hans_ui_design_lib@https://hans-ui-design-lib-cdn.vercel.app/remoteEntry.js',
  },
  shared: shareAll({
    singleton: true,
    strictVersion: false,
  }),
});

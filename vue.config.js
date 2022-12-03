module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use("i18n")
      .loader("@intlify/vue-i18n-loader")
      .end();
  },
  // I had to manually go enable static website hosting on the bucket
  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default2',
      overrideEndpoint: false,
      region: 'ap-southeast-1',
      bucket: '',
      createBucket: true,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: false,
      cloudfrontId: 'E238Z2VQEIMHM',
      cloudfrontMatchers: '/index.html,/service-worker.js,/manifest.json',
      pluginVersion: '4.0.0-rc3',
      uploadConcurrency: 5
    }
  }
};

export default {
  title: process.env.npm_package_name || '',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: process.env.npm_package_description || ''
    }
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  script: [
    {
      src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
      defer: true,
      id: 'netlify-identity-widget-script'
    },
    {
      src: 'https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v7.0&appId=629188984327409&autoLogAppEvents=1',
      nonce: '8M8K8ng1',
      crossorigin: "anonymous",
      async: true,
      defer: true
    }
  ]
}

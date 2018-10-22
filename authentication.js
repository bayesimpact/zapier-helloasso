const authentication = {
  connectionLabel: '{{bundle.authData.username}}',
  test: {
    url: 'https://api.helloasso.com/v3/organizations.json',
  },
  type: 'basic',
}

module.exports = authentication

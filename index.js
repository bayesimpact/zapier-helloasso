const campaignTrigger = require('./triggers/campaign')
const paymentTrigger = require('./triggers/payment')
const orgTrigger = require('./triggers/organization')
const authentication = require('./authentication')

const handleHTTPError = response => {
  // TODO(pascal): Check with HelloAsso API owners why we get a 500 error code
  // and clean up that patch.
  if (response.status === 500) {
    const {code} = JSON.parse(response.content)
    if (code === 'com.helloasso.api.InvalidIdentifier') {
      return {
        content: '{"resources": []}',
        status: 200,
      }
    }
  }
  if (response.status >= 400) {
    throw new Error(`Unexpected status code ${response.status}`)
  }
  return response
}

const App = {
  afterResponse: [handleHTTPError],
  authentication: authentication,
  platformVersion: require('zapier-platform-core').version,
  // If you want your trigger to show up, you better include it here!
  triggers: {
    [campaignTrigger.key]: campaignTrigger,
    [paymentTrigger.key]: paymentTrigger,
    [orgTrigger.key]: orgTrigger,
  },
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
}

// Finally, export the app.
module.exports = App

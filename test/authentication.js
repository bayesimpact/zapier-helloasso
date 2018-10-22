const should = require('should')
const zapier = require('zapier-platform-core')
const App = require('../index')

const appTester = zapier.createAppTester(App)


describe('basic authentication', () => {
  // Put your test TEST_USERNAME and TEST_PASSWORD in a .env file.
  // The inject method will load them and make them available to use in your
  // tests.
  zapier.tools.env.inject()

  it('should authenticate', (done) => {
    const bundle = {
      authData: {
        password: process.env.TEST_PASSWORD,
        username: process.env.TEST_USERNAME,
      },
    }

    appTester(App.authentication.test, bundle).
      then((response) => {
        should.exist(response.resources)
        done()
      }).
      catch(done)
  })

})

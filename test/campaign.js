require('should')
const zapier = require('zapier-platform-core')

const App = require('../index')

const appTester = zapier.createAppTester(App)

// Test organization ID: corresponds to Bayes Impact, change it if you do not
// have access to this organization.
const ORGANIZATION_ID = '000000434141'

// These are automated tests for the Campaign Trigger.
describe('campaign trigger', () => {
  zapier.tools.env.inject()

  // Make sure there's an open campaign to fetch here!
  it('should get a campaign', (done) => {
    const bundle = {
      authData: {
        password: process.env.TEST_PASSWORD,
        username: process.env.TEST_USERNAME,
      },
      inputData: {
        organization: ORGANIZATION_ID,
      },
    }
    appTester(App.triggers.campaign.operation.perform, bundle).
      then((response) => {
        response.should.be.an.instanceOf(Array)
        done()
      }).
      catch(done)
  })
})

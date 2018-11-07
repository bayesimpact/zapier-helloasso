require('should')
const zapier = require('zapier-platform-core')

const App = require('../index')

const appTester = zapier.createAppTester(App)

// Test organization ID and campaign ID correspond to Bayes Impact, change it
// if you do not have access to this organization.
const ORGANIZATION_ID = '000000434141'
const CAMPAIGN_ID = '000000517762'

// These are automated tests for the Payment Trigger.
describe('payment trigger', () => {
  zapier.tools.env.inject()

  // Make sure there's an open campaign to fetch here!
  it('should get at least one payment when fetching from frontend', (done) => {
    const bundle = {
      authData: {
        password: process.env.TEST_PASSWORD,
        username: process.env.TEST_USERNAME,
      },
      inputData: {
        campaign: CAMPAIGN_ID,
        organization: ORGANIZATION_ID,
      },
      meta: {frontend: true},
    }
    appTester(App.triggers.payment.operation.perform, bundle).
      then((response) => {
        response.should.be.an.instanceOf(Array)
        response[0].should.have.properties(['payer_first_name', 'amount'])
        done()
      }).
      catch(done)
  })

  it('should not crash when checking for a payment recently', (done) => {
    const bundle = {
      authData: {
        password: process.env.TEST_PASSWORD,
        username: process.env.TEST_USERNAME,
      },
      inputData: {
        campaign: CAMPAIGN_ID,
        organization: ORGANIZATION_ID,
      },
    }
    appTester(App.triggers.payment.operation.perform, bundle).
      then((response) => {
        response.should.be.an.instanceOf(Array)
        done()
      }).
      catch(done)
  })
})

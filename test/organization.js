require('should')
const zapier = require('zapier-platform-core')

const App = require('../index')

const appTester = zapier.createAppTester(App)

// This is an automated test for the Repo Trigger which populates the repo dropdown.
// It will run every time the `zapier test` command is executed.
describe('organization trigger', () => {
  zapier.tools.env.inject()

  // Make sure there's an open issue to fetch here!
  it('should get an organization', (done) => {
    const bundle = {
      authData: {
        password: process.env.TEST_PASSWORD,
        username: process.env.TEST_USERNAME,
      },
    }
    appTester(App.triggers.organization.operation.perform, bundle).
      then((response) => {
        response.should.be.an.instanceOf(Array)
        response[0].should.have.properties(['id', 'name'])
        done()
      }).
      catch(done)
  })
})

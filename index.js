const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const firefoxCapabilities = require('selenium-webdriver/lib/capabilities')
  .Capabilities.firefox();
const assert = require('assert');

const profile = new firefox.Profile();
profile.setAcceptUntrustedCerts(true);

const options = new firefox.Options();
options.setProfile(profile);

firefoxCapabilities.set('marionette', true);
const driverBuilder = new webdriver.Builder()
  .withCapabilities(firefoxCapabilities)
  .setFirefoxOptions(options);

driver = driverBuilder.build();

describe('timeouts', function() {
  this.timeout(30000); // in ms
  before(function() {
    return driver.get('https://localhost:8000');
  })

  it('should not fail', function(done) {
    setTimeout(done, 10000)
    // assert(true);
  })

})

const webdriver = require('selenium-webdriver');
const firefoxCapabilities = require('selenium-webdriver/lib/capabilities')
  .Capabilities.firefox();
const assert = require('assert');

firefoxCapabilities.set('marionette', true);
const driverBuilder = new webdriver.Builder()
  .withCapabilities(firefoxCapabilities);

driver = driverBuilder.build();

describe('timeouts', function() {
  before(function() {
    return driver.manage().timeouts().setScriptTimeout(20000);
  });

  it('should not fail', function() {
    assert(true);
  })

})

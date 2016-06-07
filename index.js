const webdriver = require('selenium-webdriver');
const firefoxCapabilities = require('selenium-webdriver/lib/capabilities')
  .Capabilities.firefox();
const assert = require('chai').assert;

firefoxCapabilities.set('marionette', true);

const browsers = [{
    name: 'firefox',
    builder: new webdriver.Builder()
      .withCapabilities(firefoxCapabilities),
  }, {
    name: 'chrome',
    builder: new webdriver.Builder()
      .forBrowser('chrome'),
  }, {
    name: 'chrome through selenium server',
    builder: new webdriver.Builder()
      .forBrowser('chrome')
      .usingServer('http://localhost:4444/wd/hub'),
  }];


browsers.forEach(function(browser) {
  driver = browser.builder.build();

  describe(browser.name, function() {
    this.timeout(10000);

    before(function() {
      return driver.manage().timeouts().setScriptTimeout(2000);
    });

    it('should set timeout pre-emptively and execute script', function() {
      return driver.get('https://mozilla.org')
      .then(() => {
        return driver.executeAsyncScript(() => {
          const callback = arguments[arguments.length - 1];
          setTimeout(callback, 100)
        });
      })
    });

    it('should set timeout pre-emptively and execute script', function() {
      return driver.get('https://mozilla.org')
      .then(() => {
        return driver.executeAsyncScript(() => {
          const callback = arguments[arguments.length - 1];
          setTimeout(callback, 2500)
        });
      }).then(() => {
        assert.fail('it should have timed out');
      }).catch((e) => {
        assert.equal(e.name, 'ScriptTimeoutError');
        assert.include(e.message, 'asynchronous script timeout: result was not \
received in 2 seconds')
      })
    })

  })

})

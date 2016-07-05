var assert = require('assert');

var client = require('webdriverio').remote({desiredCapabilities:{browserName: 'chrome'}})
require('webdrivercss').init(client, {
    screenshotRoot: 'images/reference',
    failedComparisonsRoot: 'images',
    misMatchTolerance: 0.05,
    screenWidth: [320,480,640,1024]
});

console.log(client)
client
    .init()
    .url('http://example.com')
    .webdrivercss('startpage',[
        {
            name: 'header',
            elem: '#header'
        }
    ], function(err, res) {
        console.log(res.header[0].baselinePath);
        console.log(res.header[0].isWithinMisMatchTolerance);
        assert.ifError(err);
        assert.ok(res.header[0].isWithinMisMatchTolerance);
    })
    .end();
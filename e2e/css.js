var assert = require('assert');

var client = require('webdriverio').remote({desiredCapabilities:{browserName: 'chrome'}})
require('webdrivercss').init(client);

client
    .init()
    .url('http://example.com')
    .webdrivercss('startpage',[
        {
            name: 'header',
            elem: '#header'
        }, {
            name: 'hero',
            elem: '//*[@id="hero"]/div[2]'
        }
    ], function(err, res) {
        assert.ifError(err);
        assert.ok(res.header[0].isWithinMisMatchTolerance);
        assert.ok(res.hero[0].isWithinMisMatchTolerance);
    })
    .end();
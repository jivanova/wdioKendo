var assert = require('assert');

describe('css', function () {
    it('bas', function () {        
        browser.url('http://jivanova.bedford.progress.com/kendo/playground/local/grid.html');
        browser.webdrivercss('grid',
            {
                name: 'grid',
                elem: '#grid'
            } , function(err, res) {
            console.log(res.header[0].baselinePath);
            console.log(res.header[0].isWithinMisMatchTolerance);
            assert.ifError(err);
            assert.ok(res.header[0].isWithinMisMatchTolerance);
        })
    });
});
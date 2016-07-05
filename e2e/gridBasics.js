var assert = require('assert');

describe('GridBatchEditing', function() {
    it('EditStringCell', function () {
        browser.url('http://jivanova.bedford.progress.com/kendo/playground/local/grid.html');
        var cellValue = "Chai";
        browser.click("td="+ cellValue);    
        var cellInput = browser.element('.k-input');
        cellInput.setValue(cellValue + "1");
        browser.click('.k-input');
        browser.click("a.k-grid-save-changes");
        browser.waitUntil(function(){
            return browser.isExisting("td="+cellValue + "1");
        }, 5000);
    });
}); 

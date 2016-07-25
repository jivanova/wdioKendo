describe('GridBatchEditing', function() {
    it('EditStringCell', function () {
        var cellValue = "Chai";
        browser
            .url('http://jivanova.bedford.progress.com/kendo/playground/local/grid.html')
            .click("td="+ cellValue)
            .element('.k-input')
                .setValue(cellValue + "1")
            .click('.k-input')
            .click("a.k-grid-save-changes")
            .isExisting("td="+cellValue + "1");
    });
}); 

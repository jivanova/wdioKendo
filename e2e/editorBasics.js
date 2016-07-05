  function editor() {
      return require('./editorSpecs')(browser);
  }
  var assert = require('assert'),
      webdriverio = require('webdriverio');

describe('RadEditor', function() {
    it('Visibility', function () {
        editor()
            .url('http://jivanova.bedford.progress.com/kendo/playground/local/editor.html')
            .isVisible('.k-editor')
    });
}); 

//Node task to execute tasks
var seleniumStandalone = require("selenium-standalone");
var Launcher = require('webdriverio/build/lib/launcher');
var wdio = new Launcher('./wdioRunner/wdio.conf.js');
//test1
 seleniumStandalone.install(function () {  
    seleniumstandalone.start(function (err, instance) { 
        wdio.run().then(function () {
            //process.exit(1);
        });
    });                  
 });

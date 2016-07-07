var gulp = require('gulp');
var exec = require('child_process').exec;
var webdriver = require('gulp-webdriver');
var seleniumStandalone = require("selenium-standalone");

gulp.task('default', ['test:e2e',  'killSelenium']);

gulp.task('launchSelenium', function() {
    seleniumStandalone.install(function () {  
        seleniumStandalone.start(function (err, instance) {
        });                  
    });    
});

gulp.task('launchAppium', function () {
    exec('node \"C:\\Program Files (x86)\\Appium\\node_modules\\appium\\bin\\appium.js\"');
});
gulp.task('test:e2e', function() {
    return gulp.src('./wdioRunner/wdio.conf.js').pipe(webdriver());
});
gulp.task('test:e2eAppium', ['launchAppium'], function() {    
    return gulp.src('./wdioRunner/wdio.conf.appium.js').pipe(webdriver());
});
gulp.task('killSelenium',['test:e2e'], function() {    
    process.exit(1);
});
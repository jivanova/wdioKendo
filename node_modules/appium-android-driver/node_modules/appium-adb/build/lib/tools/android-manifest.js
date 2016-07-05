'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _teen_process = require('teen_process');

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _helpersJs = require('../helpers.js');

var _appiumSupport = require('appium-support');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var helperJarPath = _path2['default'].resolve(__dirname, '..', '..', '..', 'jars');
var manifestMethods = {};

// android:process= may be defined in AndroidManifest.xml
// http://developer.android.com/reference/android/R.attr.html#process
// note that the process name when used with ps must be truncated to the last 15 chars
// ps -c com.example.android.apis becomes ps -c le.android.apis
manifestMethods.processFromManifest = function callee$0$0(localApk) {
  var args, _ref, stdout, result, lines, applicationRegex, applicationFound, attributeRegex, processRegex, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line, notAttribute, _process;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.initAapt());

      case 3:
        _loggerJs2['default'].info("Retrieving process from manifest");
        args = ['dump', 'xmltree', localApk, 'AndroidManifest.xml'];
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.binaries.aapt, args));

      case 7:
        _ref = context$1$0.sent;
        stdout = _ref.stdout;
        result = null;
        lines = stdout.split("\n");
        applicationRegex = new RegExp(/\s+E: application \(line=\d+\).*/);
        applicationFound = false;
        attributeRegex = new RegExp(/\s+A: .+/);
        processRegex = new RegExp(/\s+A: android:process\(0x01010011\)="([^"]+).*"/);
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 18;
        _iterator = _getIterator(lines);

      case 20:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 37;
          break;
        }

        line = _step.value;

        if (applicationFound) {
          context$1$0.next = 26;
          break;
        }

        if (applicationRegex.test(line)) {
          applicationFound = true;
        }
        context$1$0.next = 34;
        break;

      case 26:
        notAttribute = !attributeRegex.test(line);

        if (!notAttribute) {
          context$1$0.next = 29;
          break;
        }

        return context$1$0.abrupt('break', 37);

      case 29:
        _process = processRegex.exec(line);

        if (!(_process && _process.length > 1)) {
          context$1$0.next = 34;
          break;
        }

        result = _process[1];
        // must trim to last 15 for android's ps binary
        if (result.length > 15) {
          result = result.substr(result.length - 15);
        }
        return context$1$0.abrupt('break', 37);

      case 34:
        _iteratorNormalCompletion = true;
        context$1$0.next = 20;
        break;

      case 37:
        context$1$0.next = 43;
        break;

      case 39:
        context$1$0.prev = 39;
        context$1$0.t0 = context$1$0['catch'](18);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 43:
        context$1$0.prev = 43;
        context$1$0.prev = 44;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 46:
        context$1$0.prev = 46;

        if (!_didIteratorError) {
          context$1$0.next = 49;
          break;
        }

        throw _iteratorError;

      case 49:
        return context$1$0.finish(46);

      case 50:
        return context$1$0.finish(43);

      case 51:
        return context$1$0.abrupt('return', result);

      case 54:
        context$1$0.prev = 54;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('processFromManifest failed. Original error: ' + context$1$0.t1.message);

      case 57:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 54], [18, 39, 43, 51], [44,, 46, 50]]);
};

manifestMethods.packageAndLaunchActivityFromManifest = function callee$0$0(localApk) {
  var args, _ref2, stdout, apkPackage, apkActivity, outputPath, getLaunchActivity, _ref3, _stdout, stderr, act;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.initAapt());

      case 3:
        _loggerJs2['default'].info("Extracting package and launch activity from manifest");
        args = ['dump', 'badging', localApk];
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.binaries.aapt, args));

      case 7:
        _ref2 = context$1$0.sent;
        stdout = _ref2.stdout;
        apkPackage = new RegExp(/package: name='([^']+)'/g).exec(stdout);

        if (apkPackage && apkPackage.length >= 2) {
          apkPackage = apkPackage[1];
        } else {
          apkPackage = null;
        }
        apkActivity = new RegExp(/launchable-activity: name='([^']+)'/g).exec(stdout);

        if (!(apkActivity && apkActivity.length >= 2)) {
          context$1$0.next = 16;
          break;
        }

        apkActivity = apkActivity[1];
        context$1$0.next = 26;
        break;

      case 16:
        outputPath = _path2['default'].resolve(this.tmpDir, apkPackage);
        getLaunchActivity = ['-jar', this.jars['appium_apk_tools.jar'], 'printLaunchActivity', this.opts.app, outputPath];
        context$1$0.next = 20;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('java', getLaunchActivity));

      case 20:
        _ref3 = context$1$0.sent;
        _stdout = _ref3.stdout;
        stderr = _ref3.stderr;

        if (stderr) {
          _loggerJs2['default'].errorAndThrow('Cannot parse launchActivity from manifest: ' + stderr);
        }
        act = new RegExp(/Launch activity parsed:([^']+)/g).exec(_stdout);

        if (act && act.length >= 2) {
          apkActivity = act[1];
        }

      case 26:
        _loggerJs2['default'].debug('badging package: ' + apkPackage);
        _loggerJs2['default'].debug('badging act: ' + apkActivity);
        return context$1$0.abrupt('return', { apkPackage: apkPackage, apkActivity: apkActivity });

      case 31:
        context$1$0.prev = 31;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('packageAndLaunchActivityFromManifest failed. Original error: ' + context$1$0.t0.message);

      case 34:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 31]]);
};

manifestMethods.compileManifest = function callee$0$0(manifest, manifestPackage, targetPackage) {
  var _ref4, platform, platformPath, args;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Compiling manifest ' + manifest);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _helpersJs.getAndroidPlatformAndPath)());

      case 3:
        _ref4 = context$1$0.sent;
        platform = _ref4.platform;
        platformPath = _ref4.platformPath;

        if (platform) {
          context$1$0.next = 8;
          break;
        }

        return context$1$0.abrupt('return', new Error("Required platform doesn't exist (API level >= 17)"));

      case 8:
        _loggerJs2['default'].debug('Compiling manifest.');
        context$1$0.prev = 9;
        args = ['package', '-M', manifest, '--rename-manifest-package', manifestPackage, '--rename-instrumentation-target-package', targetPackage, '-I', _path2['default'].resolve(platformPath, 'android.jar'), '-F', manifest + '.apk', '-f'];
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.binaries.aapt, args));

      case 13:
        _loggerJs2['default'].debug("Compiled manifest");
        context$1$0.next = 19;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](9);

        _loggerJs2['default'].errorAndThrow('Error compiling manifest. Original error: ' + context$1$0.t0.message);

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[9, 16]]);
};

manifestMethods.insertManifest = function callee$0$0(manifest, srcApk, dstApk) {
  var java, args;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Inserting manifest, src: ' + srcApk + ' dst: ' + dstApk);
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _helpersJs.unzipFile)(manifest + '.apk'));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.copyFile(srcApk, dstApk));

      case 6:
        _loggerJs2['default'].debug("Testing new tmp apk");
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap((0, _helpersJs.assertZipArchive)(dstApk));

      case 9:
        _loggerJs2['default'].debug("Moving manifest");

        if (!_appiumSupport.system.isWindows()) {
          context$1$0.next = 17;
          break;
        }

        java = _path2['default'].resolve(process.env.JAVA_HOME, 'bin', 'java');
        args = ['-jar', _path2['default'].resolve(helperJarPath, 'move_manifest.jar'), dstApk, manifest];
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(java, args));

      case 15:
        context$1$0.next = 19;
        break;

      case 17:
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('zip', ['-j', '-m', dstApk, manifest]));

      case 19:
        _loggerJs2['default'].debug("Inserted manifest.");
        context$1$0.next = 25;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Error inserting manifest. Original error: ' + context$1$0.t0.message);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 22]]);
};

manifestMethods.hasInternetPermissionFromManifest = function callee$0$0(localApk) {
  var _ref5, stdout;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.initAapt());

      case 3:
        _loggerJs2['default'].debug("Checking if has internet permission from manifest");
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.binaries.aapt, ['dump', 'badging', localApk]));

      case 6:
        _ref5 = context$1$0.sent;
        stdout = _ref5.stdout;
        return context$1$0.abrupt('return', new RegExp(/uses-permission:.*'android.permission.INTERNET'/).test(stdout));

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error checking internet permission for manifest. Original error: ' + context$1$0.t0.message);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 11]]);
};

exports['default'] = manifestMethods;
module.exports = exports['default'];

// process must be an attribute after application.

// this is an application attribute process.

// Insert compiled manifest into /tmp/appPackage.clean.apk
// -j = keep only the file, not the dirs
// -m = move manifest into target apk.
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy9hbmRyb2lkLW1hbmlmZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs0QkFBcUIsY0FBYzs7d0JBQ25CLGNBQWM7Ozs7eUJBQ3lDLGVBQWU7OzZCQUMzRCxnQkFBZ0I7O29CQUMxQixNQUFNOzs7O0FBRXZCLElBQU0sYUFBYSxHQUFHLGtCQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDeEUsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDOzs7Ozs7QUFNekIsZUFBZSxDQUFDLG1CQUFtQixHQUFHLG9CQUFnQixRQUFRO01BSXRELElBQUksUUFDSCxNQUFNLEVBQ1AsTUFBTSxFQUNOLEtBQUssRUFDTCxnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxZQUFZLGtGQUNQLElBQUksRUFNTCxZQUFZLEVBS1osUUFBTzs7Ozs7Ozt5Q0FyQlQsSUFBSSxDQUFDLFFBQVEsRUFBRTs7O0FBQ3JCLDhCQUFJLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBQ3pDLFlBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixDQUFDOzt5Q0FDMUMsd0JBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDOzs7O0FBQTlDLGNBQU0sUUFBTixNQUFNO0FBQ1AsY0FBTSxHQUFHLElBQUk7QUFDYixhQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDMUIsd0JBQWdCLEdBQUcsSUFBSSxNQUFNLENBQUMsa0NBQWtDLENBQUM7QUFDakUsd0JBQWdCLEdBQUcsS0FBSztBQUN4QixzQkFBYyxHQUFHLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUN2QyxvQkFBWSxHQUFHLElBQUksTUFBTSxDQUFDLGlEQUFpRCxDQUFDOzs7OztpQ0FDL0QsS0FBSzs7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QUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7Ozs7QUFFakYsOEJBQUksYUFBYSx1RUFBcUUsZUFBRSxPQUFPLENBQUcsQ0FBQzs7Ozs7OztDQUV0RyxDQUFDOztxQkFHYSxlQUFlIiwiZmlsZSI6ImxpYi90b29scy9hbmRyb2lkLW1hbmlmZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlYyB9IGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyBnZXRBbmRyb2lkUGxhdGZvcm1BbmRQYXRoLCB1bnppcEZpbGUsIGFzc2VydFppcEFyY2hpdmUgfSBmcm9tICcuLi9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHN5c3RlbSwgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuY29uc3QgaGVscGVySmFyUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICcuLicsICdqYXJzJyk7XG5sZXQgbWFuaWZlc3RNZXRob2RzID0ge307XG5cbi8vIGFuZHJvaWQ6cHJvY2Vzcz0gbWF5IGJlIGRlZmluZWQgaW4gQW5kcm9pZE1hbmlmZXN0LnhtbFxuLy8gaHR0cDovL2RldmVsb3Blci5hbmRyb2lkLmNvbS9yZWZlcmVuY2UvYW5kcm9pZC9SLmF0dHIuaHRtbCNwcm9jZXNzXG4vLyBub3RlIHRoYXQgdGhlIHByb2Nlc3MgbmFtZSB3aGVuIHVzZWQgd2l0aCBwcyBtdXN0IGJlIHRydW5jYXRlZCB0byB0aGUgbGFzdCAxNSBjaGFyc1xuLy8gcHMgLWMgY29tLmV4YW1wbGUuYW5kcm9pZC5hcGlzIGJlY29tZXMgcHMgLWMgbGUuYW5kcm9pZC5hcGlzXG5tYW5pZmVzdE1ldGhvZHMucHJvY2Vzc0Zyb21NYW5pZmVzdCA9IGFzeW5jIGZ1bmN0aW9uIChsb2NhbEFwaykge1xuICB0cnkge1xuICAgIGF3YWl0IHRoaXMuaW5pdEFhcHQoKTtcbiAgICBsb2cuaW5mbyhcIlJldHJpZXZpbmcgcHJvY2VzcyBmcm9tIG1hbmlmZXN0XCIpO1xuICAgIGxldCBhcmdzID0gWydkdW1wJywgJ3htbHRyZWUnLCBsb2NhbEFwaywgJ0FuZHJvaWRNYW5pZmVzdC54bWwnXTtcbiAgICBsZXQge3N0ZG91dH0gPSBhd2FpdCBleGVjKHRoaXMuYmluYXJpZXMuYWFwdCwgYXJncyk7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgbGV0IGxpbmVzID0gc3Rkb3V0LnNwbGl0KFwiXFxuXCIpO1xuICAgIGxldCBhcHBsaWNhdGlvblJlZ2V4ID0gbmV3IFJlZ0V4cCgvXFxzK0U6IGFwcGxpY2F0aW9uIFxcKGxpbmU9XFxkK1xcKS4qLyk7XG4gICAgbGV0IGFwcGxpY2F0aW9uRm91bmQgPSBmYWxzZTtcbiAgICBsZXQgYXR0cmlidXRlUmVnZXggPSBuZXcgUmVnRXhwKC9cXHMrQTogLisvKTtcbiAgICBsZXQgcHJvY2Vzc1JlZ2V4ID0gbmV3IFJlZ0V4cCgvXFxzK0E6IGFuZHJvaWQ6cHJvY2Vzc1xcKDB4MDEwMTAwMTFcXCk9XCIoW15cIl0rKS4qXCIvKTtcbiAgICBmb3IgKGxldCBsaW5lIG9mIGxpbmVzKSB7XG4gICAgICBpZiAoIWFwcGxpY2F0aW9uRm91bmQpIHtcbiAgICAgICAgaWYgKGFwcGxpY2F0aW9uUmVnZXgudGVzdChsaW5lKSkge1xuICAgICAgICAgIGFwcGxpY2F0aW9uRm91bmQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbm90QXR0cmlidXRlID0gIWF0dHJpYnV0ZVJlZ2V4LnRlc3QobGluZSk7XG4gICAgICAgIC8vIHByb2Nlc3MgbXVzdCBiZSBhbiBhdHRyaWJ1dGUgYWZ0ZXIgYXBwbGljYXRpb24uXG4gICAgICAgIGlmIChub3RBdHRyaWJ1dGUpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHJvY2VzcyA9IHByb2Nlc3NSZWdleC5leGVjKGxpbmUpO1xuICAgICAgICAvLyB0aGlzIGlzIGFuIGFwcGxpY2F0aW9uIGF0dHJpYnV0ZSBwcm9jZXNzLlxuICAgICAgICBpZiAocHJvY2VzcyAmJiBwcm9jZXNzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICByZXN1bHQgPSBwcm9jZXNzWzFdO1xuICAgICAgICAgIC8vIG11c3QgdHJpbSB0byBsYXN0IDE1IGZvciBhbmRyb2lkJ3MgcHMgYmluYXJ5XG4gICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAxNSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnN1YnN0cihyZXN1bHQubGVuZ3RoIC0gMTUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYHByb2Nlc3NGcm9tTWFuaWZlc3QgZmFpbGVkLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG5cbm1hbmlmZXN0TWV0aG9kcy5wYWNrYWdlQW5kTGF1bmNoQWN0aXZpdHlGcm9tTWFuaWZlc3QgPSBhc3luYyBmdW5jdGlvbiAobG9jYWxBcGspIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCB0aGlzLmluaXRBYXB0KCk7XG4gICAgbG9nLmluZm8oXCJFeHRyYWN0aW5nIHBhY2thZ2UgYW5kIGxhdW5jaCBhY3Rpdml0eSBmcm9tIG1hbmlmZXN0XCIpO1xuICAgIGxldCBhcmdzID0gWydkdW1wJywgJ2JhZGdpbmcnLCBsb2NhbEFwa107XG4gICAgbGV0IHtzdGRvdXR9ID0gYXdhaXQgZXhlYyh0aGlzLmJpbmFyaWVzLmFhcHQsIGFyZ3MpO1xuICAgIGxldCBhcGtQYWNrYWdlID0gbmV3IFJlZ0V4cCgvcGFja2FnZTogbmFtZT0nKFteJ10rKScvZykuZXhlYyhzdGRvdXQpO1xuICAgIGlmIChhcGtQYWNrYWdlICYmIGFwa1BhY2thZ2UubGVuZ3RoID49IDIpIHtcbiAgICAgIGFwa1BhY2thZ2UgPSBhcGtQYWNrYWdlWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGtQYWNrYWdlID0gbnVsbDtcbiAgICB9XG4gICAgbGV0IGFwa0FjdGl2aXR5ID0gbmV3IFJlZ0V4cCgvbGF1bmNoYWJsZS1hY3Rpdml0eTogbmFtZT0nKFteJ10rKScvZykuZXhlYyhzdGRvdXQpO1xuICAgIGlmIChhcGtBY3Rpdml0eSAmJiBhcGtBY3Rpdml0eS5sZW5ndGggPj0gMikge1xuICAgICAgYXBrQWN0aXZpdHkgPSBhcGtBY3Rpdml0eVsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG91dHB1dFBhdGggPSBwYXRoLnJlc29sdmUodGhpcy50bXBEaXIsIGFwa1BhY2thZ2UpO1xuICAgICAgbGV0IGdldExhdW5jaEFjdGl2aXR5ID0gWyctamFyJywgdGhpcy5qYXJzWydhcHBpdW1fYXBrX3Rvb2xzLmphciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwcmludExhdW5jaEFjdGl2aXR5JywgdGhpcy5vcHRzLmFwcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRQYXRoXTtcbiAgICAgIGxldCB7c3Rkb3V0LCBzdGRlcnJ9ID0gYXdhaXQgZXhlYygnamF2YScsIGdldExhdW5jaEFjdGl2aXR5KTtcbiAgICAgIGlmIChzdGRlcnIpIHtcbiAgICAgICAgbG9nLmVycm9yQW5kVGhyb3coYENhbm5vdCBwYXJzZSBsYXVuY2hBY3Rpdml0eSBmcm9tIG1hbmlmZXN0OiAke3N0ZGVycn1gKTtcbiAgICAgIH1cbiAgICAgIGxldCBhY3QgPSBuZXcgUmVnRXhwKC9MYXVuY2ggYWN0aXZpdHkgcGFyc2VkOihbXiddKykvZykuZXhlYyhzdGRvdXQpO1xuICAgICAgaWYgKGFjdCAmJiBhY3QubGVuZ3RoID49IDIpIHtcbiAgICAgICAgYXBrQWN0aXZpdHkgPSBhY3RbMV07XG4gICAgICB9XG4gICAgfVxuICAgIGxvZy5kZWJ1ZyhgYmFkZ2luZyBwYWNrYWdlOiAke2Fwa1BhY2thZ2V9YCk7XG4gICAgbG9nLmRlYnVnKGBiYWRnaW5nIGFjdDogJHthcGtBY3Rpdml0eX1gKTtcbiAgICByZXR1cm4ge2Fwa1BhY2thZ2UsIGFwa0FjdGl2aXR5fTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBwYWNrYWdlQW5kTGF1bmNoQWN0aXZpdHlGcm9tTWFuaWZlc3QgZmFpbGVkLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG5cbm1hbmlmZXN0TWV0aG9kcy5jb21waWxlTWFuaWZlc3QgPSBhc3luYyBmdW5jdGlvbiAobWFuaWZlc3QsIG1hbmlmZXN0UGFja2FnZSwgdGFyZ2V0UGFja2FnZSkge1xuICBsb2cuZGVidWcoYENvbXBpbGluZyBtYW5pZmVzdCAke21hbmlmZXN0fWApO1xuICBsZXQge3BsYXRmb3JtLCBwbGF0Zm9ybVBhdGh9ID0gYXdhaXQgZ2V0QW5kcm9pZFBsYXRmb3JtQW5kUGF0aCgpO1xuICBpZiAoIXBsYXRmb3JtKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihcIlJlcXVpcmVkIHBsYXRmb3JtIGRvZXNuJ3QgZXhpc3QgKEFQSSBsZXZlbCA+PSAxNylcIik7XG4gIH1cbiAgbG9nLmRlYnVnKCdDb21waWxpbmcgbWFuaWZlc3QuJyk7XG4gIHRyeSB7XG4gICAgbGV0IGFyZ3MgPSBbJ3BhY2thZ2UnLCAnLU0nLCBtYW5pZmVzdCwgJy0tcmVuYW1lLW1hbmlmZXN0LXBhY2thZ2UnLFxuICAgICAgICAgICAgICAgIG1hbmlmZXN0UGFja2FnZSwgJy0tcmVuYW1lLWluc3RydW1lbnRhdGlvbi10YXJnZXQtcGFja2FnZScsXG4gICAgICAgICAgICAgICAgdGFyZ2V0UGFja2FnZSwgJy1JJywgcGF0aC5yZXNvbHZlKHBsYXRmb3JtUGF0aCwgJ2FuZHJvaWQuamFyJyksXG4gICAgICAgICAgICAgICAgJy1GJywgbWFuaWZlc3QgKyAnLmFwaycsICctZiddO1xuICAgIGF3YWl0IGV4ZWModGhpcy5iaW5hcmllcy5hYXB0LCBhcmdzKTtcbiAgICBsb2cuZGVidWcoXCJDb21waWxlZCBtYW5pZmVzdFwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGNvbXBpbGluZyBtYW5pZmVzdC4gT3JpZ2luYWwgZXJyb3I6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG5cbm1hbmlmZXN0TWV0aG9kcy5pbnNlcnRNYW5pZmVzdCA9IGFzeW5jIGZ1bmN0aW9uIChtYW5pZmVzdCwgc3JjQXBrLCBkc3RBcGspIHtcbiAgbG9nLmRlYnVnKGBJbnNlcnRpbmcgbWFuaWZlc3QsIHNyYzogJHtzcmNBcGt9IGRzdDogJHtkc3RBcGt9YCk7XG4gIHRyeSB7XG4gICAgYXdhaXQgdW56aXBGaWxlKGAke21hbmlmZXN0fS5hcGtgKTtcbiAgICBhd2FpdCBmcy5jb3B5RmlsZShzcmNBcGssIGRzdEFwayk7XG4gICAgbG9nLmRlYnVnKFwiVGVzdGluZyBuZXcgdG1wIGFwa1wiKTtcbiAgICBhd2FpdCBhc3NlcnRaaXBBcmNoaXZlKGRzdEFwayk7XG4gICAgbG9nLmRlYnVnKFwiTW92aW5nIG1hbmlmZXN0XCIpO1xuICAgIGlmIChzeXN0ZW0uaXNXaW5kb3dzKCkpIHtcbiAgICAgIGxldCBqYXZhID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuZW52LkpBVkFfSE9NRSwgJ2JpbicsICdqYXZhJyk7XG4gICAgICBsZXQgYXJncyA9IFsnLWphcicsICBwYXRoLnJlc29sdmUoaGVscGVySmFyUGF0aCwgJ21vdmVfbWFuaWZlc3QuamFyJyksXG4gICAgICAgICAgICAgICAgICBkc3RBcGssIG1hbmlmZXN0XTtcbiAgICAgIGF3YWl0IGV4ZWMoamF2YSwgYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEluc2VydCBjb21waWxlZCBtYW5pZmVzdCBpbnRvIC90bXAvYXBwUGFja2FnZS5jbGVhbi5hcGtcbiAgICAgIC8vIC1qID0ga2VlcCBvbmx5IHRoZSBmaWxlLCBub3QgdGhlIGRpcnNcbiAgICAgIC8vIC1tID0gbW92ZSBtYW5pZmVzdCBpbnRvIHRhcmdldCBhcGsuXG4gICAgICBhd2FpdCBleGVjKCd6aXAnLCBbJy1qJywgJy1tJywgZHN0QXBrLCBtYW5pZmVzdF0pO1xuICAgIH1cbiAgICBsb2cuZGVidWcoXCJJbnNlcnRlZCBtYW5pZmVzdC5cIik7XG4gIH0gY2F0Y2goZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBFcnJvciBpbnNlcnRpbmcgbWFuaWZlc3QuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxubWFuaWZlc3RNZXRob2RzLmhhc0ludGVybmV0UGVybWlzc2lvbkZyb21NYW5pZmVzdCA9IGFzeW5jIGZ1bmN0aW9uIChsb2NhbEFwaykge1xuICB0cnkge1xuICAgIGF3YWl0IHRoaXMuaW5pdEFhcHQoKTtcbiAgICBsb2cuZGVidWcoXCJDaGVja2luZyBpZiBoYXMgaW50ZXJuZXQgcGVybWlzc2lvbiBmcm9tIG1hbmlmZXN0XCIpO1xuICAgIGxldCB7c3Rkb3V0fSA9IGF3YWl0IGV4ZWModGhpcy5iaW5hcmllcy5hYXB0LCBbJ2R1bXAnLCAnYmFkZ2luZycsIGxvY2FsQXBrXSk7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoL3VzZXMtcGVybWlzc2lvbjouKidhbmRyb2lkLnBlcm1pc3Npb24uSU5URVJORVQnLykudGVzdChzdGRvdXQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGNoZWNraW5nIGludGVybmV0IHBlcm1pc3Npb24gZm9yIG1hbmlmZXN0LiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgbWFuaWZlc3RNZXRob2RzO1xuIl19
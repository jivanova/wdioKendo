'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this2 = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _appiumSupport = require('appium-support');

var _libHelpersJs = require('../../lib/helpers.js');

// All paths below assume tests run under /build/test/ so paths are relative from
// that directory.
var contactManagerPath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'ContactManager.apk'),
    contactMangerSelendroidPath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'ContactManager-selendroid.apk'),
    tmpDir = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'temp'),
    srcManifest = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'selendroid', 'AndroidManifest.xml'),
    serverPath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'selendroid', 'selendroid.apk');

_chai2['default'].use(_chaiAsPromised2['default']);

describe('Android-manifest', function callee$0$0() {
  var adb;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        adb = undefined;

        before(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(_2['default'].createADB());

              case 2:
                adb = context$2$0.sent;

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });
        it('packageAndLaunchActivityFromManifest should parse package and Activity', function callee$1$0() {
          var _ref, apkPackage, apkActivity;

          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(adb.packageAndLaunchActivityFromManifest(contactManagerPath));

              case 2:
                _ref = context$2$0.sent;
                apkPackage = _ref.apkPackage;
                apkActivity = _ref.apkActivity;

                apkPackage.should.equal('com.example.android.contactmanager');
                apkActivity.should.equal('com.example.android.contactmanager.ContactManager');

              case 7:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });
        it('hasInternetPermissionFromManifest should be true', function callee$1$0() {
          var flag;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(adb.hasInternetPermissionFromManifest(contactMangerSelendroidPath));

              case 2:
                flag = context$2$0.sent;

                flag.should.be['true'];

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });
        it('hasInternetPermissionFromManifest should be false', function callee$1$0() {
          var flag;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(adb.hasInternetPermissionFromManifest(contactManagerPath));

              case 2:
                flag = context$2$0.sent;

                flag.should.be['false'];

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });
        // TODO fix this test
        it.skip('should compile and insert manifest', function callee$1$0() {
          var appPackage, newServerPath, newPackage, dstDir, dstManifest;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                appPackage = 'com.example.android.contactmanager', newServerPath = _path2['default'].resolve(tmpDir, 'selendroid.' + appPackage + '.apk'), newPackage = 'com.example.android.contactmanager.selendroid', dstDir = _path2['default'].resolve(tmpDir, appPackage), dstManifest = _path2['default'].resolve(dstDir, 'AndroidManifest.xml');
                context$2$0.prev = 1;
                context$2$0.next = 4;
                return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(tmpDir));

              case 4:
                context$2$0.next = 9;
                break;

              case 6:
                context$2$0.prev = 6;
                context$2$0.t0 = context$2$0['catch'](1);

                console.log('Unable to delete temp directory. It might not be present. ' + context$2$0.t0.message);

              case 9:
                context$2$0.next = 11;
                return _regeneratorRuntime.awrap(_appiumSupport.fs.mkdir(tmpDir));

              case 11:
                context$2$0.next = 13;
                return _regeneratorRuntime.awrap(_appiumSupport.fs.mkdir(dstDir));

              case 13:
                context$2$0.t1 = _regeneratorRuntime;
                context$2$0.t2 = _appiumSupport.fs;
                context$2$0.t3 = dstManifest;
                context$2$0.next = 18;
                return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(srcManifest, "utf8"));

              case 18:
                context$2$0.t4 = context$2$0.sent;
                context$2$0.t5 = context$2$0.t2.writeFile.call(context$2$0.t2, context$2$0.t3, context$2$0.t4, "utf8");
                context$2$0.next = 22;
                return context$2$0.t1.awrap.call(context$2$0.t1, context$2$0.t5);

              case 22:
                context$2$0.next = 24;
                return _regeneratorRuntime.awrap(adb.compileManifest(dstManifest, newPackage, appPackage));

              case 24:
                context$2$0.next = 26;
                return _regeneratorRuntime.awrap(_appiumSupport.util.fileExists(dstManifest));

              case 26:
                context$2$0.sent.should.be['true'];
                context$2$0.next = 29;
                return _regeneratorRuntime.awrap(adb.insertManifest(dstManifest, serverPath, newServerPath));

              case 29:
                context$2$0.next = 31;
                return _regeneratorRuntime.awrap(_appiumSupport.util.fileExists(newServerPath));

              case 31:
                context$2$0.sent.should.be['true'];
                context$2$0.prev = 32;
                context$2$0.next = 35;
                return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(tmpDir));

              case 35:
                context$2$0.next = 40;
                break;

              case 37:
                context$2$0.prev = 37;
                context$2$0.t6 = context$2$0['catch'](32);

                console.log('Unable to delete temp directory. It might not be present. ' + context$2$0.t6.message);

              case 40:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[1, 6], [32, 37]]);
        });

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this2);
});

describe.skip('Android-manifest To be implemented methods', function () {
  it('should return correct processFromManifest', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
});

// deleting temp directory if present

// deleting temp directory
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9hbmRyb2lkLW1hbmlmZXN0LWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQzdCLE9BQU87Ozs7b0JBQ04sTUFBTTs7Ozs2QkFDSixnQkFBZ0I7OzRCQUVYLHNCQUFzQjs7OztBQUk5QyxJQUFNLGtCQUFrQixHQUFHLGtCQUFLLE9BQU8sd0JBQVUsTUFBTSxFQUNmLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQztJQUNuRSwyQkFBMkIsR0FBRyxrQkFBSyxPQUFPLHdCQUFVLE1BQU0sRUFDZixVQUFVLEVBQUUsK0JBQStCLENBQUM7SUFDdkYsTUFBTSxHQUFHLGtCQUFLLE9BQU8sd0JBQVUsTUFBTSxFQUFFLE1BQU0sQ0FBQztJQUM5QyxXQUFXLEdBQUcsa0JBQUssT0FBTyx3QkFBVSxNQUFNLEVBQUUsVUFBVSxFQUMzQixZQUFZLEVBQUUscUJBQXFCLENBQUM7SUFDL0QsVUFBVSxHQUFHLGtCQUFLLE9BQU8sd0JBQVUsTUFBTSxFQUFFLFVBQVUsRUFDM0IsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUM7O0FBRWhFLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtNQUN2QixHQUFHOzs7Ozs7QUFBSCxXQUFHOztBQUNQLGNBQU0sQ0FBQzs7Ozs7aURBQ08sY0FBSSxTQUFTLEVBQUU7OztBQUEzQixtQkFBRzs7Ozs7OztTQUNKLENBQUMsQ0FBQztBQUNILFVBQUUsQ0FBQyx3RUFBd0UsRUFBRTtvQkFDdEUsVUFBVSxFQUFFLFdBQVc7Ozs7OztpREFBVSxHQUFHLENBQUMsb0NBQW9DLENBQUMsa0JBQWtCLENBQUM7Ozs7QUFBN0YsMEJBQVUsUUFBVixVQUFVO0FBQUUsMkJBQVcsUUFBWCxXQUFXOztBQUM1QiwwQkFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUM5RCwyQkFBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQzs7Ozs7OztTQUMvRSxDQUFDLENBQUM7QUFDSCxVQUFFLENBQUMsa0RBQWtELEVBQUU7Y0FDakQsSUFBSTs7Ozs7aURBQVMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLDJCQUEyQixDQUFDOzs7QUFBL0Usb0JBQUk7O0FBQ1Isb0JBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7Ozs7Ozs7U0FDckIsQ0FBQyxDQUFDO0FBQ0gsVUFBRSxDQUFDLG1EQUFtRCxFQUFFO2NBQ2xELElBQUk7Ozs7O2lEQUFTLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxrQkFBa0IsQ0FBQzs7O0FBQXRFLG9CQUFJOztBQUNSLG9CQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBTSxDQUFDOzs7Ozs7O1NBQ3RCLENBQUMsQ0FBQzs7QUFFSCxVQUFFLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxFQUFFO2NBQ3hDLFVBQVUsRUFDVixhQUFhLEVBQ2IsVUFBVSxFQUNWLE1BQU0sRUFDTixXQUFXOzs7O0FBSlgsMEJBQVUsR0FBRyxvQ0FBb0MsRUFDakQsYUFBYSxHQUFHLGtCQUFLLE9BQU8sQ0FBQyxNQUFNLGtCQUFnQixVQUFVLFVBQU8sRUFDcEUsVUFBVSxHQUFHLCtDQUErQyxFQUM1RCxNQUFNLEdBQUcsa0JBQUssT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFDekMsV0FBVyxHQUFHLGtCQUFLLE9BQU8sQ0FBQyxNQUFNLEVBQUUscUJBQXFCLENBQUM7OztpREFHckQsa0JBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7Ozs7OztBQUV2Qix1QkFBTyxDQUFDLEdBQUcsZ0VBQThELGVBQUUsT0FBTyxDQUFHLENBQUM7Ozs7aURBRWxGLGtCQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Ozs7aURBQ2hCLGtCQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Ozs7O2lDQUNILFdBQVc7O2lEQUFRLGtCQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDOzs7O2dEQUE3RCxTQUFTLHNEQUFzRCxNQUFNOzs7Ozs7aURBQ3hFLEdBQUcsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUM7Ozs7aURBQ3ZELG9CQUFLLFVBQVUsQ0FBQyxXQUFXLENBQUM7OztpQ0FBRSxNQUFNLENBQUMsRUFBRTs7aURBQ3hDLEdBQUcsQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUM7Ozs7aURBQ3pELG9CQUFLLFVBQVUsQ0FBQyxhQUFhLENBQUM7OztpQ0FBRSxNQUFNLENBQUMsRUFBRTs7O2lEQUd4QyxrQkFBRyxNQUFNLENBQUMsTUFBTSxDQUFDOzs7Ozs7Ozs7O0FBRXZCLHVCQUFPLENBQUMsR0FBRyxnRUFBOEQsZUFBRSxPQUFPLENBQUcsQ0FBQzs7Ozs7OztTQUV6RixDQUFDLENBQUM7Ozs7Ozs7Q0FDSixDQUFDLENBQUM7O0FBRUgsUUFBUSxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsRUFBRSxZQUFNO0FBQ2hFLElBQUUsQ0FBQywyQ0FBMkMsRUFBRTs7Ozs7Ozs7R0FBZSxDQUFDLENBQUM7Q0FDbEUsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9hbmRyb2lkLW1hbmlmZXN0LWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFEQiBmcm9tICcuLi8uLic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGZzIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IHsgdXRpbCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCB7IHJvb3REaXIgfSBmcm9tICcuLi8uLi9saWIvaGVscGVycy5qcyc7XG5cbi8vIEFsbCBwYXRocyBiZWxvdyBhc3N1bWUgdGVzdHMgcnVuIHVuZGVyIC9idWlsZC90ZXN0LyBzbyBwYXRocyBhcmUgcmVsYXRpdmUgZnJvbVxuLy8gdGhhdCBkaXJlY3RvcnkuXG5jb25zdCBjb250YWN0TWFuYWdlclBhdGggPSBwYXRoLnJlc29sdmUocm9vdERpciwgJ3Rlc3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmaXh0dXJlcycsICdDb250YWN0TWFuYWdlci5hcGsnKSxcbiAgICAgIGNvbnRhY3RNYW5nZXJTZWxlbmRyb2lkUGF0aCA9IHBhdGgucmVzb2x2ZShyb290RGlyLCAndGVzdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZpeHR1cmVzJywgJ0NvbnRhY3RNYW5hZ2VyLXNlbGVuZHJvaWQuYXBrJyksXG4gICAgICB0bXBEaXIgPSBwYXRoLnJlc29sdmUocm9vdERpciwgJ3Rlc3QnLCAndGVtcCcpLFxuICAgICAgc3JjTWFuaWZlc3QgPSBwYXRoLnJlc29sdmUocm9vdERpciwgJ3Rlc3QnLCAnZml4dHVyZXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NlbGVuZHJvaWQnLCAnQW5kcm9pZE1hbmlmZXN0LnhtbCcpLFxuICAgICAgc2VydmVyUGF0aCA9IHBhdGgucmVzb2x2ZShyb290RGlyLCAndGVzdCcsICdmaXh0dXJlcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZWxlbmRyb2lkJywgJ3NlbGVuZHJvaWQuYXBrJyk7XG5cbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ0FuZHJvaWQtbWFuaWZlc3QnLCBhc3luYyAoKSA9PiB7XG4gIGxldCBhZGI7XG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgYWRiID0gYXdhaXQgQURCLmNyZWF0ZUFEQigpO1xuICB9KTtcbiAgaXQoJ3BhY2thZ2VBbmRMYXVuY2hBY3Rpdml0eUZyb21NYW5pZmVzdCBzaG91bGQgcGFyc2UgcGFja2FnZSBhbmQgQWN0aXZpdHknLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IHthcGtQYWNrYWdlLCBhcGtBY3Rpdml0eX0gPSBhd2FpdCBhZGIucGFja2FnZUFuZExhdW5jaEFjdGl2aXR5RnJvbU1hbmlmZXN0KGNvbnRhY3RNYW5hZ2VyUGF0aCk7XG4gICAgYXBrUGFja2FnZS5zaG91bGQuZXF1YWwoJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXInKTtcbiAgICBhcGtBY3Rpdml0eS5zaG91bGQuZXF1YWwoJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXIuQ29udGFjdE1hbmFnZXInKTtcbiAgfSk7XG4gIGl0KCdoYXNJbnRlcm5ldFBlcm1pc3Npb25Gcm9tTWFuaWZlc3Qgc2hvdWxkIGJlIHRydWUnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGZsYWcgPSBhd2FpdCBhZGIuaGFzSW50ZXJuZXRQZXJtaXNzaW9uRnJvbU1hbmlmZXN0KGNvbnRhY3RNYW5nZXJTZWxlbmRyb2lkUGF0aCk7XG4gICAgZmxhZy5zaG91bGQuYmUudHJ1ZTtcbiAgfSk7XG4gIGl0KCdoYXNJbnRlcm5ldFBlcm1pc3Npb25Gcm9tTWFuaWZlc3Qgc2hvdWxkIGJlIGZhbHNlJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBmbGFnID0gYXdhaXQgYWRiLmhhc0ludGVybmV0UGVybWlzc2lvbkZyb21NYW5pZmVzdChjb250YWN0TWFuYWdlclBhdGgpO1xuICAgIGZsYWcuc2hvdWxkLmJlLmZhbHNlO1xuICB9KTtcbiAgLy8gVE9ETyBmaXggdGhpcyB0ZXN0XG4gIGl0LnNraXAoJ3Nob3VsZCBjb21waWxlIGFuZCBpbnNlcnQgbWFuaWZlc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGFwcFBhY2thZ2UgPSAnY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlcicsXG4gICAgICAgIG5ld1NlcnZlclBhdGggPSBwYXRoLnJlc29sdmUodG1wRGlyLCBgc2VsZW5kcm9pZC4ke2FwcFBhY2thZ2V9LmFwa2ApLFxuICAgICAgICBuZXdQYWNrYWdlID0gJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXIuc2VsZW5kcm9pZCcsXG4gICAgICAgIGRzdERpciA9IHBhdGgucmVzb2x2ZSh0bXBEaXIsIGFwcFBhY2thZ2UpLFxuICAgICAgICBkc3RNYW5pZmVzdCA9IHBhdGgucmVzb2x2ZShkc3REaXIsICdBbmRyb2lkTWFuaWZlc3QueG1sJyk7XG4gICAgLy8gZGVsZXRpbmcgdGVtcCBkaXJlY3RvcnkgaWYgcHJlc2VudFxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBmcy5yaW1yYWYodG1wRGlyKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhgVW5hYmxlIHRvIGRlbGV0ZSB0ZW1wIGRpcmVjdG9yeS4gSXQgbWlnaHQgbm90IGJlIHByZXNlbnQuICR7ZS5tZXNzYWdlfWApO1xuICAgIH1cbiAgICBhd2FpdCBmcy5ta2Rpcih0bXBEaXIpO1xuICAgIGF3YWl0IGZzLm1rZGlyKGRzdERpcik7XG4gICAgYXdhaXQgZnMud3JpdGVGaWxlKGRzdE1hbmlmZXN0LCBhd2FpdCBmcy5yZWFkRmlsZShzcmNNYW5pZmVzdCwgXCJ1dGY4XCIpLCBcInV0ZjhcIik7XG4gICAgYXdhaXQgYWRiLmNvbXBpbGVNYW5pZmVzdChkc3RNYW5pZmVzdCwgbmV3UGFja2FnZSwgYXBwUGFja2FnZSk7XG4gICAgKGF3YWl0IHV0aWwuZmlsZUV4aXN0cyhkc3RNYW5pZmVzdCkpLnNob3VsZC5iZS50cnVlO1xuICAgIGF3YWl0IGFkYi5pbnNlcnRNYW5pZmVzdChkc3RNYW5pZmVzdCwgc2VydmVyUGF0aCwgbmV3U2VydmVyUGF0aCk7XG4gICAgKGF3YWl0IHV0aWwuZmlsZUV4aXN0cyhuZXdTZXJ2ZXJQYXRoKSkuc2hvdWxkLmJlLnRydWU7XG4gICAgLy8gZGVsZXRpbmcgdGVtcCBkaXJlY3RvcnlcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZnMucmltcmFmKHRtcERpcik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coYFVuYWJsZSB0byBkZWxldGUgdGVtcCBkaXJlY3RvcnkuIEl0IG1pZ2h0IG5vdCBiZSBwcmVzZW50LiAke2UubWVzc2FnZX1gKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlLnNraXAoJ0FuZHJvaWQtbWFuaWZlc3QgVG8gYmUgaW1wbGVtZW50ZWQgbWV0aG9kcycsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCByZXR1cm4gY29ycmVjdCBwcm9jZXNzRnJvbU1hbmlmZXN0JywgYXN5bmMgKCkgPT4geyB9KTtcbn0pO1xuIl19
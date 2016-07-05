'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _libHelpersJs = require('../../lib/helpers.js');

var _asyncbox = require('asyncbox');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('apk utils', function () {
  var _this = this;

  var adb = undefined;
  var contactManagerPath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'ContactManager.apk');
  var deviceTempPath = '/data/local/tmp/';
  var assertPackageAndActivity = function assertPackageAndActivity() {
    var _ref, appPackage, appActivity;

    return _regeneratorRuntime.async(function assertPackageAndActivity$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getFocusedPackageAndActivity());

        case 2:
          _ref = context$2$0.sent;
          appPackage = _ref.appPackage;
          appActivity = _ref.appActivity;

          appPackage.should.equal('com.example.android.contactmanager');
          appActivity.should.equal('.ContactManager');

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };
  this.timeout(60000);
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
  it('should be able to install/remove app and detect its status', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.isAppInstalled('foo'));

        case 2:
          context$2$0.sent.should.be['false'];
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(adb.isAppInstalled('com.example.android.contactmanager'));

        case 7:
          context$2$0.sent.should.be['true'];
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(adb.uninstallApk('com.example.android.contactmanager'));

        case 10:
          context$2$0.sent.should.be['true'];
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap(adb.isAppInstalled('com.example.android.contactmanager'));

        case 13:
          context$2$0.sent.should.be['false'];
          context$2$0.next = 16;
          return _regeneratorRuntime.awrap(adb.uninstallApk('com.example.android.contactmanager'));

        case 16:
          context$2$0.sent.should.be['false'];
          context$2$0.next = 19;
          return _regeneratorRuntime.awrap(adb.rimraf(deviceTempPath + 'ContactManager.apk'));

        case 19:
          context$2$0.next = 21;
          return _regeneratorRuntime.awrap(adb.push(contactManagerPath, deviceTempPath));

        case 21:
          context$2$0.next = 23;
          return _regeneratorRuntime.awrap(adb.installFromDevicePath(deviceTempPath + 'ContactManager.apk'));

        case 23:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  describe('startUri', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this3 = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          it('should be able to start a uri', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              var _this2 = this;

              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.goToHome());

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.getFocusedPackageAndActivity());

                case 4:
                  res = context$3$0.sent;

                  res.appPackage.should.not.equal('com.android.contacts');
                  context$3$0.next = 8;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 8:
                  context$3$0.next = 10;
                  return _regeneratorRuntime.awrap(adb.startUri('content://contacts/people', 'com.android.contacts'));

                case 10:
                  context$3$0.next = 12;
                  return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(10, 500, function callee$3$0() {
                    var focusRe1, focusRe2;
                    return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          context$4$0.next = 2;
                          return _regeneratorRuntime.awrap(adb.shell(['dumpsys', 'window', 'windows']));

                        case 2:
                          res = context$4$0.sent;
                          focusRe1 = '(mCurrentFocus.+\\.PeopleActivity)';
                          focusRe2 = '(mFocusedApp.+\\.PeopleActivity)';

                          res.should.match(new RegExp(focusRe1 + '|' + focusRe2));

                        case 6:
                        case 'end':
                          return context$4$0.stop();
                      }
                    }, null, _this2);
                  }));

                case 12:
                  context$3$0.next = 14;
                  return _regeneratorRuntime.awrap(adb.goToHome());

                case 14:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this3);
          });

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  describe('startApp', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this4 = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          it('should be able to start', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
                    activity: 'ContactManager' }));

                case 4:
                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap(assertPackageAndActivity());

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this4);
          });
          it('should throw error for wrong activity', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
                    activity: 'ContactManage' }).should.eventually.be.rejectedWith('Activity'));

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this4);
          });
          it('should throw error for wrong wait activity', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
                    activity: 'ContactManager',
                    waitActivity: 'foo',
                    waitDuration: 1000 }).should.eventually.be.rejectedWith('foo'));

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this4);
          });
          it('should start activity with wait activity', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
                    activity: 'ContactManager',
                    waitActivity: '.ContactManager' }));

                case 4:
                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap(assertPackageAndActivity());

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this4);
          });

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getFocusedPackageAndActivity should be able get package and activity', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
            activity: 'ContactManager' }));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(assertPackageAndActivity());

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('extractStringsFromApk should get strings for default language', function callee$1$0() {
    var _ref2, apkStrings;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.extractStringsFromApk(contactManagerPath, null, '/tmp'));

        case 2:
          _ref2 = context$2$0.sent;
          apkStrings = _ref2.apkStrings;

          apkStrings.save.should.equal('Save');

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should get device language and country', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.t0 = ['en', 'fr'].should;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getDeviceLanguage());

        case 3:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.t0.contain.call(context$2$0.t0, context$2$0.t1);
          context$2$0.t2 = ['US', 'EN_US', 'EN', 'FR'].should;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(adb.getDeviceCountry());

        case 8:
          context$2$0.t3 = context$2$0.sent;
          context$2$0.t2.contain.call(context$2$0.t2, context$2$0.t3);

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should set device language and country', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.setDeviceLanguage('fr'));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.setDeviceCountry('fr'));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.reboot());

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(adb.getDeviceLanguage().should.eventually.equal('fr'));

        case 8:
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(adb.getDeviceCountry().should.eventually.equal('FR'));

        case 10:
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(adb.setDeviceLanguage('en'));

        case 12:
          context$2$0.next = 14;
          return _regeneratorRuntime.awrap(adb.setDeviceCountry('us'));

        case 14:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// depending on apilevel, app might show up as active in one of these
// two dumpsys output formats

// cleanup
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9hcGstdXRpbHMtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQzdCLE9BQU87Ozs7b0JBQ04sTUFBTTs7Ozs0QkFDQyxzQkFBc0I7O3dCQUNoQixVQUFVOztBQUV4QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWTs7O0FBQ2hDLE1BQUksR0FBRyxZQUFBLENBQUM7QUFDUixNQUFNLGtCQUFrQixHQUFHLGtCQUFLLE9BQU8sd0JBQVUsTUFBTSxFQUNmLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQzFFLE1BQU0sY0FBYyxHQUFHLGtCQUFrQixDQUFDO0FBQzFDLE1BQU0sd0JBQXdCLEdBQUcsU0FBM0Isd0JBQXdCO2NBQ3ZCLFVBQVUsRUFBRSxXQUFXOzs7Ozs7MkNBQVUsR0FBRyxDQUFDLDRCQUE0QixFQUFFOzs7O0FBQW5FLG9CQUFVLFFBQVYsVUFBVTtBQUFFLHFCQUFXLFFBQVgsV0FBVzs7QUFDNUIsb0JBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7QUFDOUQscUJBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Ozs7Ozs7R0FDN0MsQ0FBQztBQUNGLE1BQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEIsUUFBTSxDQUFDOzs7OzsyQ0FDTyxjQUFJLFNBQVMsRUFBRTs7O0FBQTNCLGFBQUc7Ozs7Ozs7R0FDSixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNERBQTRELEVBQUU7Ozs7OzJDQUN4RCxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQzs7OzJCQUFFLE1BQU0sQ0FBQyxFQUFFOzsyQ0FDckMsR0FBRyxDQUFDLE9BQU8sQ0FB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MkNBQWUsR0FBRyxDQUFDLGdCQUFnQixFQUFFOzs7O3lCQUFwQyxPQUFPOzs7Ozs7O0dBQzNDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyx3Q0FBd0MsRUFBRTs7Ozs7MkNBQ3JDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7Ozs7MkNBQzNCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7Ozs7MkNBQzFCLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Ozs7MkNBQ1osR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzs7OzJDQUNyRCxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7MkNBRXBELEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7Ozs7MkNBQzNCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7R0FDakMsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9hcGstdXRpbHMtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQURCIGZyb20gJy4uLy4uJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgcm9vdERpciB9IGZyb20gJy4uLy4uL2xpYi9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHJldHJ5SW50ZXJ2YWwgfSBmcm9tICdhc3luY2JveCc7XG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdhcGsgdXRpbHMnLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBhZGI7XG4gIGNvbnN0IGNvbnRhY3RNYW5hZ2VyUGF0aCA9IHBhdGgucmVzb2x2ZShyb290RGlyLCAndGVzdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZml4dHVyZXMnLCAnQ29udGFjdE1hbmFnZXIuYXBrJyk7XG4gIGNvbnN0IGRldmljZVRlbXBQYXRoID0gJy9kYXRhL2xvY2FsL3RtcC8nO1xuICBjb25zdCBhc3NlcnRQYWNrYWdlQW5kQWN0aXZpdHkgPSBhc3luYyAoKSA9PiB7XG4gICAgbGV0IHthcHBQYWNrYWdlLCBhcHBBY3Rpdml0eX0gPSBhd2FpdCBhZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICAgIGFwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKCdjb20uZXhhbXBsZS5hbmRyb2lkLmNvbnRhY3RtYW5hZ2VyJyk7XG4gICAgYXBwQWN0aXZpdHkuc2hvdWxkLmVxdWFsKCcuQ29udGFjdE1hbmFnZXInKTtcbiAgfTtcbiAgdGhpcy50aW1lb3V0KDYwMDAwKTtcbiAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICBhZGIgPSBhd2FpdCBBREIuY3JlYXRlQURCKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gaW5zdGFsbC9yZW1vdmUgYXBwIGFuZCBkZXRlY3QgaXRzIHN0YXR1cycsIGFzeW5jICgpID0+IHtcbiAgICAoYXdhaXQgYWRiLmlzQXBwSW5zdGFsbGVkKCdmb28nKSkuc2hvdWxkLmJlLmZhbHNlO1xuICAgIGF3YWl0IGFkYi5pbnN0YWxsKGNvbnRhY3RNYW5hZ2VyUGF0aCk7XG4gICAgKGF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZCgnY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlcicpKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAoYXdhaXQgYWRiLnVuaW5zdGFsbEFwaygnY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlcicpKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAoYXdhaXQgYWRiLmlzQXBwSW5zdGFsbGVkKCdjb20uZXhhbXBsZS5hbmRyb2lkLmNvbnRhY3RtYW5hZ2VyJykpLnNob3VsZC5iZS5mYWxzZTtcbiAgICAoYXdhaXQgYWRiLnVuaW5zdGFsbEFwaygnY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlcicpKS5zaG91bGQuYmUuZmFsc2U7XG4gICAgYXdhaXQgYWRiLnJpbXJhZihkZXZpY2VUZW1wUGF0aCArICdDb250YWN0TWFuYWdlci5hcGsnKTtcbiAgICBhd2FpdCBhZGIucHVzaChjb250YWN0TWFuYWdlclBhdGgsIGRldmljZVRlbXBQYXRoKTtcbiAgICBhd2FpdCBhZGIuaW5zdGFsbEZyb21EZXZpY2VQYXRoKGRldmljZVRlbXBQYXRoICsgJ0NvbnRhY3RNYW5hZ2VyLmFwaycpO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3N0YXJ0VXJpJywgYXN5bmMgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBzdGFydCBhIHVyaScsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGFkYi5nb1RvSG9tZSgpO1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IGFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XG4gICAgICByZXMuYXBwUGFja2FnZS5zaG91bGQubm90LmVxdWFsKCdjb20uYW5kcm9pZC5jb250YWN0cycpO1xuICAgICAgYXdhaXQgYWRiLmluc3RhbGwoY29udGFjdE1hbmFnZXJQYXRoKTtcbiAgICAgIGF3YWl0IGFkYi5zdGFydFVyaSgnY29udGVudDovL2NvbnRhY3RzL3Blb3BsZScsICdjb20uYW5kcm9pZC5jb250YWN0cycpO1xuICAgICAgYXdhaXQgcmV0cnlJbnRlcnZhbCgxMCwgNTAwLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIHJlcyA9IGF3YWl0IGFkYi5zaGVsbChbJ2R1bXBzeXMnLCAnd2luZG93JywgJ3dpbmRvd3MnXSk7XG4gICAgICAgIC8vIGRlcGVuZGluZyBvbiBhcGlsZXZlbCwgYXBwIG1pZ2h0IHNob3cgdXAgYXMgYWN0aXZlIGluIG9uZSBvZiB0aGVzZVxuICAgICAgICAvLyB0d28gZHVtcHN5cyBvdXRwdXQgZm9ybWF0c1xuICAgICAgICBsZXQgZm9jdXNSZTEgPSAnKG1DdXJyZW50Rm9jdXMuK1xcXFwuUGVvcGxlQWN0aXZpdHkpJztcbiAgICAgICAgbGV0IGZvY3VzUmUyID0gJyhtRm9jdXNlZEFwcC4rXFxcXC5QZW9wbGVBY3Rpdml0eSknO1xuICAgICAgICByZXMuc2hvdWxkLm1hdGNoKG5ldyBSZWdFeHAoYCR7Zm9jdXNSZTF9fCR7Zm9jdXNSZTJ9YCkpO1xuICAgICAgfSk7XG4gICAgICBhd2FpdCBhZGIuZ29Ub0hvbWUoKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdzdGFydEFwcCcsIGFzeW5jICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc3RhcnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBhZGIuaW5zdGFsbChjb250YWN0TWFuYWdlclBhdGgpO1xuICAgICAgYXdhaXQgYWRiLnN0YXJ0QXBwKHtwa2c6ICdjb20uZXhhbXBsZS5hbmRyb2lkLmNvbnRhY3RtYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHk6ICdDb250YWN0TWFuYWdlcid9KTtcbiAgICAgIGF3YWl0IGFzc2VydFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuXG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBmb3Igd3JvbmcgYWN0aXZpdHknLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBhZGIuaW5zdGFsbChjb250YWN0TWFuYWdlclBhdGgpO1xuICAgICAgYXdhaXQgYWRiLnN0YXJ0QXBwKHtwa2c6ICdjb20uZXhhbXBsZS5hbmRyb2lkLmNvbnRhY3RtYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHk6ICdDb250YWN0TWFuYWdlJ30pLnNob3VsZC5ldmVudHVhbGx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5iZS5yZWplY3RlZFdpdGgoJ0FjdGl2aXR5Jyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBmb3Igd3Jvbmcgd2FpdCBhY3Rpdml0eScsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGFkYi5pbnN0YWxsKGNvbnRhY3RNYW5hZ2VyUGF0aCk7XG4gICAgICBhd2FpdCBhZGIuc3RhcnRBcHAoe3BrZzogJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eTogJ0NvbnRhY3RNYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2FpdEFjdGl2aXR5OiAnZm9vJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2FpdER1cmF0aW9uOiAxMDAwfSkuc2hvdWxkLmV2ZW50dWFsbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYmUucmVqZWN0ZWRXaXRoKCdmb28nKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHN0YXJ0IGFjdGl2aXR5IHdpdGggd2FpdCBhY3Rpdml0eScsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGFkYi5pbnN0YWxsKGNvbnRhY3RNYW5hZ2VyUGF0aCk7XG4gICAgICBhd2FpdCBhZGIuc3RhcnRBcHAoe3BrZzogJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eTogJ0NvbnRhY3RNYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2FpdEFjdGl2aXR5OiAnLkNvbnRhY3RNYW5hZ2VyJ30pO1xuICAgICAgYXdhaXQgYXNzZXJ0UGFja2FnZUFuZEFjdGl2aXR5KCk7XG4gICAgfSk7XG5cbiAgfSk7XG4gIGl0KCdnZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5IHNob3VsZCBiZSBhYmxlIGdldCBwYWNrYWdlIGFuZCBhY3Rpdml0eScsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBhZGIuaW5zdGFsbChjb250YWN0TWFuYWdlclBhdGgpO1xuICAgIGF3YWl0IGFkYi5zdGFydEFwcCh7cGtnOiAnY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eTogJ0NvbnRhY3RNYW5hZ2VyJ30pO1xuICAgIGF3YWl0IGFzc2VydFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICB9KTtcbiAgaXQoJ2V4dHJhY3RTdHJpbmdzRnJvbUFwayBzaG91bGQgZ2V0IHN0cmluZ3MgZm9yIGRlZmF1bHQgbGFuZ3VhZ2UnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IHthcGtTdHJpbmdzfSA9IGF3YWl0IGFkYi5leHRyYWN0U3RyaW5nc0Zyb21BcGsoY29udGFjdE1hbmFnZXJQYXRoLCBudWxsLCAnL3RtcCcpO1xuICAgIGFwa1N0cmluZ3Muc2F2ZS5zaG91bGQuZXF1YWwoJ1NhdmUnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZ2V0IGRldmljZSBsYW5ndWFnZSBhbmQgY291bnRyeScsIGFzeW5jICgpID0+IHtcbiAgICBbJ2VuJywgJ2ZyJ10uc2hvdWxkLmNvbnRhaW4oYXdhaXQgYWRiLmdldERldmljZUxhbmd1YWdlKCkpO1xuICAgIFsnVVMnLCAnRU5fVVMnLCAnRU4nLCAnRlInXS5zaG91bGQuY29udGFpbihhd2FpdCBhZGIuZ2V0RGV2aWNlQ291bnRyeSgpKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc2V0IGRldmljZSBsYW5ndWFnZSBhbmQgY291bnRyeScsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBhZGIuc2V0RGV2aWNlTGFuZ3VhZ2UoJ2ZyJyk7XG4gICAgYXdhaXQgYWRiLnNldERldmljZUNvdW50cnkoJ2ZyJyk7XG4gICAgYXdhaXQgYWRiLnJlYm9vdCgpO1xuICAgIGF3YWl0IGFkYi5nZXREZXZpY2VMYW5ndWFnZSgpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdmcicpO1xuICAgIGF3YWl0IGFkYi5nZXREZXZpY2VDb3VudHJ5KCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ0ZSJyk7XG4gICAgLy8gY2xlYW51cFxuICAgIGF3YWl0IGFkYi5zZXREZXZpY2VMYW5ndWFnZSgnZW4nKTtcbiAgICBhd2FpdCBhZGIuc2V0RGV2aWNlQ291bnRyeSgndXMnKTtcbiAgfSk7XG59KTtcbiJdfQ==
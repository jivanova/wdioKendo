'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

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

_chai2['default'].use(_chaiAsPromised2['default']);
_chai2['default'].should();

var fingerprintPath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'Fingerprint.apk');
var pkg = 'com.example.fingerprint';
var activity = '.MainActivity';
var secretActivity = '.SecretActivity';

describe('adb emu commands', function () {
  var adb = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(_2['default'].createADB());

        case 2:
          adb = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 5:
          context$2$0.t0 = context$2$0.sent;
          context$2$0.t1 = parseInt(context$2$0.t0, 10);

          if (!(context$2$0.t1 < 23)) {
            context$2$0.next = 9;
            break;
          }

          this.skip();

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('fingerprint should open the secret activity on emitted valid finger touch event', function callee$1$0() {
    var app;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.isAppInstalled(pkg));

        case 2:
          if (!context$2$0.sent) {
            context$2$0.next = 7;
            break;
          }

          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(adb.forceStop(pkg));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(adb.uninstallApk(pkg));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(adb.install(fingerprintPath));

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(adb.startApp({ pkg: pkg, activity: activity }));

        case 11:
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(500));

        case 13:
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(adb.getFocusedPackageAndActivity());

        case 15:
          app = context$2$0.sent;

          app.appActivity.should.equal(activity);
          context$2$0.next = 19;
          return _regeneratorRuntime.awrap(adb.fingerprint(1111));

        case 19:
          context$2$0.next = 21;
          return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(2500));

        case 21:
          context$2$0.next = 23;
          return _regeneratorRuntime.awrap(adb.getFocusedPackageAndActivity());

        case 23:
          app = context$2$0.sent;

          app.appActivity.should.equal(secretActivity);

        case 25:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// the test here only works if we have API level 23 or above
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9hZGItZW11LWNvbW1hbmRzLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQzdCLE9BQU87Ozs7b0JBQ04sTUFBTTs7Ozs0QkFDQyxzQkFBc0I7O3dCQUN4QixVQUFVOztBQUdoQyxrQkFBSyxHQUFHLDZCQUFnQixDQUFDO0FBQ3pCLGtCQUFLLE1BQU0sRUFBRSxDQUFDOztBQUVkLElBQU0sZUFBZSxHQUFHLGtCQUFLLE9BQU8sd0JBQVUsTUFBTSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3JGLElBQU0sR0FBRyxHQUFHLHlCQUF5QixDQUFDO0FBQ3RDLElBQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQztBQUNqQyxJQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQzs7QUFFekMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDakMsTUFBSSxHQUFHLFlBQUEsQ0FBQztBQUNSLFFBQU0sQ0FBQzs7Ozs7MkNBQ08sY0FBSSxTQUFTLEVBQUU7OztBQUEzQixhQUFHOzsyQ0FHZ0IsR0FBRyxDQUFDLFdBQVcsRUFBRTs7OzsyQkFBaEMsUUFBUSxpQkFBMEIsRUFBRTs7aUNBQUksRUFBRTs7Ozs7QUFDNUMsY0FBSSxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7O0dBRWYsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLGlGQUFpRixFQUFFO1FBU2hGLEdBQUc7Ozs7OzJDQVJHLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDOzs7Ozs7Ozs7MkNBQ3pCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDOzs7OzJDQUNsQixHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQzs7OzsyQ0FFdkIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7Ozs7MkNBQzVCLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFFLFFBQVEsRUFBUixRQUFRLEVBQUMsQ0FBQzs7OzsyQ0FDN0IscUJBQU0sR0FBRyxDQUFDOzs7OzJDQUVBLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRTs7O0FBQTlDLGFBQUc7O0FBQ1AsYUFBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzsyQ0FDakMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7Ozs7MkNBQ3JCLHFCQUFNLElBQUksQ0FBQzs7OzsyQ0FFTCxHQUFHLENBQUMsNEJBQTRCLEVBQUU7OztBQUE5QyxhQUFHOztBQUNILGFBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQzs7Ozs7OztHQUM5QyxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2FkYi1lbXUtY29tbWFuZHMtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQURCIGZyb20gJy4uLy4uJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgcm9vdERpciB9IGZyb20gJy4uLy4uL2xpYi9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnYXN5bmNib3gnO1xuXG5cbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcbmNoYWkuc2hvdWxkKCk7XG5cbmNvbnN0IGZpbmdlcnByaW50UGF0aCA9IHBhdGgucmVzb2x2ZShyb290RGlyLCAndGVzdCcsICdmaXh0dXJlcycsICdGaW5nZXJwcmludC5hcGsnKTtcbmNvbnN0IHBrZyA9ICdjb20uZXhhbXBsZS5maW5nZXJwcmludCc7XG5jb25zdCBhY3Rpdml0eSA9ICcuTWFpbkFjdGl2aXR5JztcbmNvbnN0IHNlY3JldEFjdGl2aXR5ID0gJy5TZWNyZXRBY3Rpdml0eSc7XG5cbmRlc2NyaWJlKCdhZGIgZW11IGNvbW1hbmRzJywgKCkgPT4ge1xuICBsZXQgYWRiO1xuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGFkYiA9IGF3YWl0IEFEQi5jcmVhdGVBREIoKTtcblxuICAgIC8vIHRoZSB0ZXN0IGhlcmUgb25seSB3b3JrcyBpZiB3ZSBoYXZlIEFQSSBsZXZlbCAyMyBvciBhYm92ZVxuICAgIGlmIChwYXJzZUludChhd2FpdCBhZGIuZ2V0QXBpTGV2ZWwoKSwgMTApIDwgMjMpIHtcbiAgICAgIHRoaXMuc2tpcCgpO1xuICAgIH1cbiAgfSk7XG4gIGl0KCdmaW5nZXJwcmludCBzaG91bGQgb3BlbiB0aGUgc2VjcmV0IGFjdGl2aXR5IG9uIGVtaXR0ZWQgdmFsaWQgZmluZ2VyIHRvdWNoIGV2ZW50JywgYXN5bmMgKCkgPT4ge1xuICAgIGlmIChhd2FpdCBhZGIuaXNBcHBJbnN0YWxsZWQocGtnKSkge1xuICAgICAgYXdhaXQgYWRiLmZvcmNlU3RvcChwa2cpO1xuICAgICAgYXdhaXQgYWRiLnVuaW5zdGFsbEFwayhwa2cpO1xuICAgIH1cbiAgICBhd2FpdCBhZGIuaW5zdGFsbChmaW5nZXJwcmludFBhdGgpO1xuICAgIGF3YWl0IGFkYi5zdGFydEFwcCh7cGtnLCBhY3Rpdml0eX0pO1xuICAgIGF3YWl0IHNsZWVwKDUwMCk7XG5cbiAgICBsZXQgYXBwID0gYXdhaXQgYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgICBhcHAuYXBwQWN0aXZpdHkuc2hvdWxkLmVxdWFsKGFjdGl2aXR5KTtcbiAgICBhd2FpdCBhZGIuZmluZ2VycHJpbnQoMTExMSk7XG4gICAgYXdhaXQgc2xlZXAoMjUwMCk7XG5cbiAgICBhcHAgPSBhd2FpdCBhZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICAgIGFwcC5hcHBBY3Rpdml0eS5zaG91bGQuZXF1YWwoc2VjcmV0QWN0aXZpdHkpO1xuICB9KTtcbn0pO1xuIl19
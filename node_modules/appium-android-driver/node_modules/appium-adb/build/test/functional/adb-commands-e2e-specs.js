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

_chai2['default'].use(_chaiAsPromised2['default']);
// change according to CI
var apiLevel = '18',
    platformVersion = '4.3',
    IME = 'com.example.android.softkeyboard/.SoftKeyboard',
    defaultIMEs = ['com.android.inputmethod.latin/.LatinIME', 'io.appium.android.ime/.UnicodeIME'],
    contactManagerPath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'ContactManager.apk'),
    pkg = 'com.example.android.contactmanager',
    activity = 'ContactManager';

describe('adb commands', function () {
  var _this = this;

  var adb = undefined;
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
  it('getApiLevel should get correct api level', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 2:
          context$2$0.t0 = apiLevel;
          context$2$0.sent.should.equal(context$2$0.t0);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getPlatformVersion should get correct platform version', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getPlatformVersion());

        case 2:
          context$2$0.t0 = platformVersion;
          context$2$0.sent.should.equal(context$2$0.t0);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('availableIMEs should get list of available IMEs', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.availableIMEs());

        case 2:
          context$2$0.sent.should.have.length.above(0);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('enabledIMEs should get list of enabled IMEs', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.enabledIMEs());

        case 2:
          context$2$0.sent.should.have.length.above(0);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('defaultIME should get default IME', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.t0 = defaultIMEs.should;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.defaultIME());

        case 3:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.t0.include.call(context$2$0.t0, context$2$0.t1);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('enableIME and disableIME should enable and disble IME', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.disableIME(IME));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.enabledIMEs());

        case 4:
          context$2$0.t0 = IME;
          context$2$0.sent.should.not.include(context$2$0.t0);
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(adb.enableIME(IME));

        case 8:
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(adb.enabledIMEs());

        case 10:
          context$2$0.t1 = IME;
          context$2$0.sent.should.include(context$2$0.t1);
          context$2$0.next = 14;
          return _regeneratorRuntime.awrap(adb.enabledIMEs());

        case 14:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('processExists should be able to find ui process', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.processExists('com.android.systemui'));

        case 2:
          context$2$0.sent.should.be['true'];

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('ping should return true', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.ping());

        case 2:
          context$2$0.sent.should.be['true'];

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getPIDsByName should return pids', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getPIDsByName('m.android.phone'));

        case 2:
          context$2$0.sent.should.have.length.above(0);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('killProcessesByName should kill process', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.startApp({ pkg: pkg, activity: activity }));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.killProcessesByName(pkg));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(adb.getPIDsByName(pkg));

        case 8:
          context$2$0.sent.should.have.length(0);

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('killProcessByPID should kill process', function callee$1$0() {
    var pids;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.startApp({ pkg: pkg, activity: activity }));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.getPIDsByName(pkg));

        case 6:
          pids = context$2$0.sent;

          pids.should.have.length.above(0);
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(adb.killProcessByPID(pids[0]));

        case 10:
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(adb.getPIDsByName(pkg));

        case 12:
          context$2$0.sent.length.should.equal(0);

        case 13:
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
          return _regeneratorRuntime.awrap(adb.getDeviceSysLanguage());

        case 3:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.t0.contain.call(context$2$0.t0, context$2$0.t1);
          context$2$0.t2 = ['US', 'EN_US', 'EN', 'FR'].should;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(adb.getDeviceSysCountry());

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
          return _regeneratorRuntime.awrap(adb.setDeviceSysLanguage('fr'));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.setDeviceSysCountry('fr'));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.reboot());

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(adb.getDeviceSysLanguage().should.eventually.equal('fr'));

        case 8:
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(adb.getDeviceSysCountry().should.eventually.equal('FR'));

        case 10:
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(adb.setDeviceSysLanguage('en'));

        case 12:
          context$2$0.next = 14;
          return _regeneratorRuntime.awrap(adb.setDeviceSysCountry('us'));

        case 14:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should forward the port', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.forwardPort(4724, 4724));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should start logcat from adb', function callee$1$0() {
    var logs;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.startLogcat());

        case 2:
          logs = adb.logcat.getLogs();

          logs.should.have.length.above(0);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.stopLogcat());

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// cleanup
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9hZGItY29tbWFuZHMtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQzdCLE9BQU87Ozs7b0JBQ04sTUFBTTs7Ozs0QkFDQyxzQkFBc0I7O0FBRzlDLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQU0sUUFBUSxHQUFHLElBQUk7SUFDZixlQUFlLEdBQUcsS0FBSztJQUN2QixHQUFHLEdBQUcsZ0RBQWdEO0lBQ3RELFdBQVcsR0FBRyxDQUFDLHlDQUF5QyxFQUN6QyxtQ0FBbUMsQ0FBQztJQUNuRCxrQkFBa0IsR0FBRyxrQkFBSyxPQUFPLHdCQUFVLE1BQU0sRUFDZixVQUFVLEVBQUUsb0JBQW9CLENBQUM7SUFDbkUsR0FBRyxHQUFHLG9DQUFvQztJQUMxQyxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7O0FBRWxDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsWUFBWTs7O0FBQ25DLE1BQUksR0FBRyxZQUFBLENBQUM7QUFDUixNQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BCLFFBQU0sQ0FBQzs7Ozs7MkNBQ08sY0FBSSxTQUFTLEVBQUU7OztBQUEzQixhQUFHOzs7Ozs7O0dBQ0osQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDBDQUEwQyxFQUFFOzs7OzsyQ0FDdEMsR0FBRyxDQUFDLFdBQVcsRUFBRTs7OzJCQUFlLFFBQVE7MkJBQXJCLE1BQU0sQ0FBQyxLQUFLOzs7Ozs7O0dBQ3ZDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyx3REFBd0QsRUFBRTs7Ozs7MkNBQ3BELEdBQUcsQ0FBQyxrQkFBa0IsRUFBRTs7OzJCQUFlLGVBQWU7MkJBQTVCLE1BQU0sQ0FBQyxLQUFLOzs7Ozs7O0dBQzlDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxpREFBaUQsRUFBRTs7Ozs7MkNBQzdDLEdBQUcsQ0FBQyxhQUFhLEVBQUU7OzsyQkFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7OztHQUN2RCxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNkNBQTZDLEVBQUU7Ozs7OzJDQUN6QyxHQUFHLENBQUMsV0FBVyxFQUFFOzs7MkJBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7R0FDckQsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLG1DQUFtQyxFQUFFOzs7OzJCQUN0QyxXQUFXLENBQUMsTUFBTTs7MkNBQWUsR0FBRyxDQUFDLFVBQVUsRUFBRTs7Ozt5QkFBOUIsT0FBTzs7Ozs7OztHQUMzQixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsdURBQXVELEVBQUU7Ozs7OzJDQUNwRCxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQzs7OzsyQ0FDbEIsR0FBRyxDQUFDLFdBQVcsRUFBRTs7OzJCQUFxQixHQUFHOzJCQUF0QixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU87OzJDQUN0QyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQzs7OzsyQ0FDakIsR0FBRyxDQUFDLFdBQVcsRUFBRTs7OzJCQUFpQixHQUFHOzJCQUFsQixNQUFNLENBQUMsT0FBTzs7MkNBQ2xDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7Ozs7Ozs7R0FDeEIsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLGlEQUFpRCxFQUFFOzs7OzsyQ0FDN0MsR0FBRyxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQzs7OzJCQUFFLE1BQU0sQ0FBQyxFQUFFOzs7Ozs7O0dBQzVELENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyx5QkFBeUIsRUFBRTs7Ozs7MkNBQ3JCLEdBQUcsQ0FBQyxJQUFJLEVBQUU7OzsyQkFBRSxNQUFNLENBQUMsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsa0NBQWtDLEVBQUU7Ozs7OzJDQUM5QixHQUFHLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDOzs7MkJBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7R0FDeEUsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHlDQUF5QyxFQUFFOzs7OzsyQ0FDdEMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQzs7OzsyQ0FDL0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUUsUUFBUSxFQUFSLFFBQVEsRUFBQyxDQUFDOzs7OzJDQUM3QixHQUFHLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDOzs7OzJDQUMzQixHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQzs7OzJCQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7R0FDcEQsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHNDQUFzQyxFQUFFO1FBR3JDLElBQUk7Ozs7OzJDQUZGLEdBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUM7Ozs7MkNBQy9CLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFFLFFBQVEsRUFBUixRQUFRLEVBQUMsQ0FBQzs7OzsyQ0FDbEIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7OztBQUFuQyxjQUFJOztBQUNSLGNBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7OzJDQUMzQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OzJDQUM1QixHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQzs7OzJCQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7R0FDckQsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHdDQUF3QyxFQUFFOzs7OzJCQUMzQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNOzsyQ0FBZSxHQUFHLENBQUMsb0JBQW9CLEVBQUU7Ozs7eUJBQXhDLE9BQU87MkJBQzNCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTTs7MkNBQWUsR0FBRyxDQUFDLG1CQUFtQixFQUFFOzs7O3lCQUF2QyxPQUFPOzs7Ozs7O0dBQzNDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyx3Q0FBd0MsRUFBRTs7Ozs7MkNBQ3JDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7Ozs7MkNBQzlCLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7Ozs7MkNBQzdCLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Ozs7MkNBQ1osR0FBRyxDQUFDLG9CQUFvQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzs7OzJDQUN4RCxHQUFHLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7MkNBRXZELEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7Ozs7MkNBQzlCLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7R0FDcEMsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHlCQUF5QixFQUFFOzs7OzsyQ0FDdEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDOzs7Ozs7O0dBQ2xDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw4QkFBOEIsRUFBRTtRQUU3QixJQUFJOzs7OzsyQ0FERixHQUFHLENBQUMsV0FBVyxFQUFFOzs7QUFDbkIsY0FBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFOztBQUMvQixjQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzsyQ0FDM0IsR0FBRyxDQUFDLFVBQVUsRUFBRTs7Ozs7OztHQUN2QixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2FkYi1jb21tYW5kcy1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBREIgZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyByb290RGlyIH0gZnJvbSAnLi4vLi4vbGliL2hlbHBlcnMuanMnO1xuXG5cbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcbi8vIGNoYW5nZSBhY2NvcmRpbmcgdG8gQ0lcbmNvbnN0IGFwaUxldmVsID0gJzE4JyxcbiAgICAgIHBsYXRmb3JtVmVyc2lvbiA9ICc0LjMnLFxuICAgICAgSU1FID0gJ2NvbS5leGFtcGxlLmFuZHJvaWQuc29mdGtleWJvYXJkLy5Tb2Z0S2V5Ym9hcmQnLFxuICAgICAgZGVmYXVsdElNRXMgPSBbJ2NvbS5hbmRyb2lkLmlucHV0bWV0aG9kLmxhdGluLy5MYXRpbklNRScsXG4gICAgICAgICAgICAgICAgICAgICAnaW8uYXBwaXVtLmFuZHJvaWQuaW1lLy5Vbmljb2RlSU1FJ10sXG4gICAgICBjb250YWN0TWFuYWdlclBhdGggPSBwYXRoLnJlc29sdmUocm9vdERpciwgJ3Rlc3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmaXh0dXJlcycsICdDb250YWN0TWFuYWdlci5hcGsnKSxcbiAgICAgIHBrZyA9ICdjb20uZXhhbXBsZS5hbmRyb2lkLmNvbnRhY3RtYW5hZ2VyJyxcbiAgICAgIGFjdGl2aXR5ID0gJ0NvbnRhY3RNYW5hZ2VyJztcblxuZGVzY3JpYmUoJ2FkYiBjb21tYW5kcycsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGFkYjtcbiAgdGhpcy50aW1lb3V0KDYwMDAwKTtcbiAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICBhZGIgPSBhd2FpdCBBREIuY3JlYXRlQURCKCk7XG4gIH0pO1xuICBpdCgnZ2V0QXBpTGV2ZWwgc2hvdWxkIGdldCBjb3JyZWN0IGFwaSBsZXZlbCcsIGFzeW5jICgpID0+IHtcbiAgICAoYXdhaXQgYWRiLmdldEFwaUxldmVsKCkpLnNob3VsZC5lcXVhbChhcGlMZXZlbCk7XG4gIH0pO1xuICBpdCgnZ2V0UGxhdGZvcm1WZXJzaW9uIHNob3VsZCBnZXQgY29ycmVjdCBwbGF0Zm9ybSB2ZXJzaW9uJywgYXN5bmMgKCkgPT4ge1xuICAgIChhd2FpdCBhZGIuZ2V0UGxhdGZvcm1WZXJzaW9uKCkpLnNob3VsZC5lcXVhbChwbGF0Zm9ybVZlcnNpb24pO1xuICB9KTtcbiAgaXQoJ2F2YWlsYWJsZUlNRXMgc2hvdWxkIGdldCBsaXN0IG9mIGF2YWlsYWJsZSBJTUVzJywgYXN5bmMgKCkgPT4ge1xuICAgIChhd2FpdCBhZGIuYXZhaWxhYmxlSU1FcygpKS5zaG91bGQuaGF2ZS5sZW5ndGguYWJvdmUoMCk7XG4gIH0pO1xuICBpdCgnZW5hYmxlZElNRXMgc2hvdWxkIGdldCBsaXN0IG9mIGVuYWJsZWQgSU1FcycsIGFzeW5jICgpID0+IHtcbiAgICAoYXdhaXQgYWRiLmVuYWJsZWRJTUVzKCkpLnNob3VsZC5oYXZlLmxlbmd0aC5hYm92ZSgwKTtcbiAgfSk7XG4gIGl0KCdkZWZhdWx0SU1FIHNob3VsZCBnZXQgZGVmYXVsdCBJTUUnLCBhc3luYyAoKSA9PiB7XG4gICAgZGVmYXVsdElNRXMuc2hvdWxkLmluY2x1ZGUoYXdhaXQgYWRiLmRlZmF1bHRJTUUoKSk7XG4gIH0pO1xuICBpdCgnZW5hYmxlSU1FIGFuZCBkaXNhYmxlSU1FIHNob3VsZCBlbmFibGUgYW5kIGRpc2JsZSBJTUUnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgYWRiLmRpc2FibGVJTUUoSU1FKTtcbiAgICAoYXdhaXQgYWRiLmVuYWJsZWRJTUVzKCkpLnNob3VsZC5ub3QuaW5jbHVkZShJTUUpO1xuICAgIGF3YWl0IGFkYi5lbmFibGVJTUUoSU1FKTtcbiAgICAoYXdhaXQgYWRiLmVuYWJsZWRJTUVzKCkpLnNob3VsZC5pbmNsdWRlKElNRSk7XG4gICAgYXdhaXQgYWRiLmVuYWJsZWRJTUVzKCk7XG4gIH0pO1xuICBpdCgncHJvY2Vzc0V4aXN0cyBzaG91bGQgYmUgYWJsZSB0byBmaW5kIHVpIHByb2Nlc3MnLCBhc3luYyAoKSA9PiB7XG4gICAgKGF3YWl0IGFkYi5wcm9jZXNzRXhpc3RzKCdjb20uYW5kcm9pZC5zeXN0ZW11aScpKS5zaG91bGQuYmUudHJ1ZTtcbiAgfSk7XG4gIGl0KCdwaW5nIHNob3VsZCByZXR1cm4gdHJ1ZScsIGFzeW5jICgpID0+IHtcbiAgICAoYXdhaXQgYWRiLnBpbmcoKSkuc2hvdWxkLmJlLnRydWU7XG4gIH0pO1xuICBpdCgnZ2V0UElEc0J5TmFtZSBzaG91bGQgcmV0dXJuIHBpZHMnLCBhc3luYyAoKSA9PiB7XG4gICAgKGF3YWl0IGFkYi5nZXRQSURzQnlOYW1lKCdtLmFuZHJvaWQucGhvbmUnKSkuc2hvdWxkLmhhdmUubGVuZ3RoLmFib3ZlKDApO1xuICB9KTtcbiAgaXQoJ2tpbGxQcm9jZXNzZXNCeU5hbWUgc2hvdWxkIGtpbGwgcHJvY2VzcycsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBhZGIuaW5zdGFsbChjb250YWN0TWFuYWdlclBhdGgpO1xuICAgIGF3YWl0IGFkYi5zdGFydEFwcCh7cGtnLCBhY3Rpdml0eX0pO1xuICAgIGF3YWl0IGFkYi5raWxsUHJvY2Vzc2VzQnlOYW1lKHBrZyk7XG4gICAgKGF3YWl0IGFkYi5nZXRQSURzQnlOYW1lKHBrZykpLnNob3VsZC5oYXZlLmxlbmd0aCgwKTtcbiAgfSk7XG4gIGl0KCdraWxsUHJvY2Vzc0J5UElEIHNob3VsZCBraWxsIHByb2Nlc3MnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgYWRiLmluc3RhbGwoY29udGFjdE1hbmFnZXJQYXRoKTtcbiAgICBhd2FpdCBhZGIuc3RhcnRBcHAoe3BrZywgYWN0aXZpdHl9KTtcbiAgICBsZXQgcGlkcyA9IGF3YWl0IGFkYi5nZXRQSURzQnlOYW1lKHBrZyk7XG4gICAgcGlkcy5zaG91bGQuaGF2ZS5sZW5ndGguYWJvdmUoMCk7XG4gICAgYXdhaXQgYWRiLmtpbGxQcm9jZXNzQnlQSUQocGlkc1swXSk7XG4gICAgKGF3YWl0IGFkYi5nZXRQSURzQnlOYW1lKHBrZykpLmxlbmd0aC5zaG91bGQuZXF1YWwoMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGdldCBkZXZpY2UgbGFuZ3VhZ2UgYW5kIGNvdW50cnknLCBhc3luYyAoKSA9PiB7XG4gICAgWydlbicsICdmciddLnNob3VsZC5jb250YWluKGF3YWl0IGFkYi5nZXREZXZpY2VTeXNMYW5ndWFnZSgpKTtcbiAgICBbJ1VTJywgJ0VOX1VTJywgJ0VOJywgJ0ZSJ10uc2hvdWxkLmNvbnRhaW4oYXdhaXQgYWRiLmdldERldmljZVN5c0NvdW50cnkoKSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBkZXZpY2UgbGFuZ3VhZ2UgYW5kIGNvdW50cnknLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgYWRiLnNldERldmljZVN5c0xhbmd1YWdlKCdmcicpO1xuICAgIGF3YWl0IGFkYi5zZXREZXZpY2VTeXNDb3VudHJ5KCdmcicpO1xuICAgIGF3YWl0IGFkYi5yZWJvb3QoKTtcbiAgICBhd2FpdCBhZGIuZ2V0RGV2aWNlU3lzTGFuZ3VhZ2UoKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnZnInKTtcbiAgICBhd2FpdCBhZGIuZ2V0RGV2aWNlU3lzQ291bnRyeSgpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdGUicpO1xuICAgIC8vIGNsZWFudXBcbiAgICBhd2FpdCBhZGIuc2V0RGV2aWNlU3lzTGFuZ3VhZ2UoJ2VuJyk7XG4gICAgYXdhaXQgYWRiLnNldERldmljZVN5c0NvdW50cnkoJ3VzJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZvcndhcmQgdGhlIHBvcnQnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgYWRiLmZvcndhcmRQb3J0KDQ3MjQsIDQ3MjQpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzdGFydCBsb2djYXQgZnJvbSBhZGInLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgYWRiLnN0YXJ0TG9nY2F0KCk7XG4gICAgbGV0IGxvZ3MgPSBhZGIubG9nY2F0LmdldExvZ3MoKTtcbiAgICBsb2dzLnNob3VsZC5oYXZlLmxlbmd0aC5hYm92ZSgwKTtcbiAgICBhd2FpdCBhZGIuc3RvcExvZ2NhdCgpO1xuICB9KTtcbn0pO1xuIl19
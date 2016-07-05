'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var _appiumTestSupport = require('appium-test-support');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

_chai2['default'].use(_chaiAsPromised2['default']);
var adb = new _2['default']();
adb.executable.path = 'adb_path';
var avdName = 'AVD_NAME';

describe('System calls', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process }, function (mocks) {
  it('getConnectedDevices should get all connected devices', function callee$1$0() {
    var devices;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects("exec").once().withExactArgs(adb.executable.path, ['devices']).returns({ stdout: "List of devices attached \n emulator-5554	device" });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getConnectedDevices());

        case 3:
          devices = context$2$0.sent;

          devices.should.have.length.above(0);
          mocks.teen_process.verify();

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getConnectedDevices should fail when adb devices returns unexpected output', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects("exec").once().withExactArgs(adb.executable.path, ['devices']).returns({ stdout: "foobar" });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getConnectedDevices().should.eventually.be.rejectedWith("Unexpected output while trying to get devices"));

        case 3:
          mocks.teen_process.verify();

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getDevicesWithRetry should fail when there are no connected devices', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects("exec").atLeast(2).withExactArgs(adb.executable.path, ['devices']).returns({ stdout: "List of devices attached" });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getDevicesWithRetry(1000).should.eventually.be.rejectedWith("Could not find a connected Android device."));

        case 3:
          mocks.teen_process.verify();

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getDevicesWithRetry should fail when adb devices returns unexpected output', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects("exec").atLeast(2).withExactArgs(adb.executable.path, ['devices']).returns({ stdout: "foobar" });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getDevicesWithRetry(1000).should.eventually.be.rejectedWith("Could not find a connected Android device."));

        case 3:
          mocks.teen_process.verify();

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getDevicesWithRetry should get all connected devices', function callee$1$0() {
    var devices;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects("exec").once().withExactArgs(adb.executable.path, ['devices']).returns({ stdout: "List of devices attached \n emulator-5554	device" });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getDevicesWithRetry(1000));

        case 3:
          devices = context$2$0.sent;

          devices.should.have.length.above(0);
          mocks.teen_process.verify();

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getDevicesWithRetry should get all connected devices second time', function callee$1$0() {
    var devices;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects("exec").onCall(0).returns({ stdout: "Foobar" });
          mocks.teen_process.expects("exec").withExactArgs(adb.executable.path, ['devices']).returns({ stdout: "List of devices attached \n emulator-5554	device" });
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.getDevicesWithRetry(2000));

        case 4:
          devices = context$2$0.sent;

          devices.should.have.length.above(0);
          mocks.teen_process.verify();

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getDevicesWithRetry should fail when exec throws an error', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects("exec").atLeast(2).throws("Error foobar");
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getDevicesWithRetry(1000).should.eventually.be.rejectedWith("Could not find a connected Android device."));

        case 3:
          mocks.teen_process.verify();

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('setDeviceId should set the device id', function () {
    adb.setDeviceId('foobar');
    adb.curDeviceId.should.equal('foobar');
    adb.executable.defaultArgs.should.include('foobar');
  });
  it('setDevice should set the device id and emu port from obj', function () {
    adb.setDevice({ udid: 'emulator-1234' });
    adb.curDeviceId.should.equal('emulator-1234');
    adb.executable.defaultArgs.should.include('emulator-1234');
    adb.emulatorPort.should.equal(1234);
  });
  it('setEmulatorPort should change emulator port', function () {
    adb.setEmulatorPort(5554);
    adb.emulatorPort.should.equal(5554);
  });
  describe('createSubProcess', function () {
    it('should return an instance of SubProcess', function () {
      adb.createSubProcess([]).should.be.an['instanceof'](teen_process.SubProcess);
    });
  });
}));

describe('System calls', (0, _appiumTestSupport.withMocks)({ adb: adb, B: _bluebird2['default'] }, function (mocks) {
  it('fileExists should return true for if ls returns', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.adb.expects("ls").once().withExactArgs('foo').returns(['bar']);
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.fileExists("foo").should.eventually.equal(true));

        case 3:
          mocks.adb.verify();

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('ls should return list', function callee$1$0() {
    var list;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.adb.expects("shell").once().withExactArgs(['ls', 'foo']).returns('bar');
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.ls("foo"));

        case 3:
          list = context$2$0.sent;

          list.should.deep.equal(['bar']);
          mocks.adb.verify();

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('reboot should call stop and start using shell', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.adb.expects("shell").once().withExactArgs(['stop']);
          mocks.adb.expects("setDeviceProperty").once().withExactArgs('sys.boot_completed', 0);
          mocks.adb.expects("shell").once().withExactArgs(['start']);
          mocks.adb.expects("getDeviceProperty").once().withExactArgs('sys.boot_completed').returns('1');
          mocks.B.expects("delay").once().withExactArgs(2000);
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(adb.reboot().should.eventually.not.be.rejected);

        case 7:
          mocks.adb.verify();
          mocks.B.verify();

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getRunningAVD should get connected avd', function callee$1$0() {
    var udid, port, emulator;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          udid = 'emulator-5554';
          port = 5554;
          emulator = { 'udid': udid, 'port': port };

          mocks.adb.expects("getConnectedEmulators").once().withExactArgs().returns([emulator]);
          mocks.adb.expects("setEmulatorPort").once().withExactArgs(port);
          mocks.adb.expects("sendTelnetCommand").once().withExactArgs("avd name").returns(avdName);
          mocks.adb.expects("setDeviceId").once().withExactArgs(udid);
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(adb.getRunningAVD(avdName));

        case 9:
          context$2$0.t0 = emulator;
          context$2$0.sent.should.equal(context$2$0.t0);

          mocks.adb.verify();

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getRunningAVD should return null when expected avd is not connected', function callee$1$0() {
    var udid, port, emulator;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          udid = 'emulator-5554';
          port = 5554;
          emulator = { 'udid': udid, 'port': port };

          mocks.adb.expects("getConnectedEmulators").once().withExactArgs().returns([emulator]);
          mocks.adb.expects("setEmulatorPort").once().withExactArgs(port);
          mocks.adb.expects("sendTelnetCommand").once().withExactArgs("avd name").returns('OTHER_AVD');
          context$2$0.t0 = _chai2['default'];
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(adb.getRunningAVD(avdName));

        case 9:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.t0.expect.call(context$2$0.t0, context$2$0.t1).to.be['null'];

          mocks.adb.verify();

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getRunningAVD should return null when no avd is connected', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.adb.expects("getConnectedEmulators").once().withExactArgs().returns([]);
          context$2$0.t0 = _chai2['default'];
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.getRunningAVD(avdName));

        case 4:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.t0.expect.call(context$2$0.t0, context$2$0.t1).to.be['null'];

          mocks.adb.verify();

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9zeXNjYWxscy1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDN0IsT0FBTzs7Ozs0QkFDTyxjQUFjOztJQUFoQyxZQUFZOztpQ0FDRSxxQkFBcUI7O3dCQUNqQyxVQUFVOzs7O0FBR3hCLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7QUFDekIsSUFBTSxHQUFHLEdBQUcsbUJBQVMsQ0FBQztBQUN0QixHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7QUFDakMsSUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDOztBQUUzQixRQUFRLENBQUMsY0FBYyxFQUFFLGtDQUFVLEVBQUMsWUFBWSxFQUFaLFlBQVksRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQzVELElBQUUsQ0FBQyxzREFBc0QsRUFBRTtRQUlyRCxPQUFPOzs7O0FBSFgsZUFBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQy9CLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQ3RELE9BQU8sQ0FBQyxFQUFDLE1BQU0sRUFBQyxrREFBa0QsRUFBQyxDQUFDLENBQUM7OzJDQUNwRCxHQUFHLENBQUMsbUJBQW1CLEVBQUU7OztBQUF6QyxpQkFBTzs7QUFDWCxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQyxlQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw0RUFBNEUsRUFBRTs7OztBQUMvRSxlQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FDL0IsSUFBSSxFQUFFLENBQUMs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QyIsImZpbGUiOiJ0ZXN0L3VuaXQvc3lzY2FsbHMtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBREIgZnJvbSAnLi4vLi4nO1xuaW1wb3J0ICogYXMgdGVlbl9wcm9jZXNzIGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgeyB3aXRoTW9ja3MgfSBmcm9tICdhcHBpdW0tdGVzdC1zdXBwb3J0JztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcblxuXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5jb25zdCBhZGIgPSBuZXcgQURCKCk7XG5hZGIuZXhlY3V0YWJsZS5wYXRoID0gJ2FkYl9wYXRoJztcbmNvbnN0IGF2ZE5hbWUgPSAnQVZEX05BTUUnO1xuXG5kZXNjcmliZSgnU3lzdGVtIGNhbGxzJywgd2l0aE1vY2tzKHt0ZWVuX3Byb2Nlc3N9LCAobW9ja3MpID0+IHtcbiAgaXQoJ2dldENvbm5lY3RlZERldmljZXMgc2hvdWxkIGdldCBhbGwgY29ubmVjdGVkIGRldmljZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgbW9ja3MudGVlbl9wcm9jZXNzLmV4cGVjdHMoXCJleGVjXCIpXG4gICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoYWRiLmV4ZWN1dGFibGUucGF0aCwgWydkZXZpY2VzJ10pXG4gICAgICAucmV0dXJucyh7c3Rkb3V0OlwiTGlzdCBvZiBkZXZpY2VzIGF0dGFjaGVkIFxcbiBlbXVsYXRvci01NTU0XHRkZXZpY2VcIn0pO1xuICAgIGxldCBkZXZpY2VzID0gYXdhaXQgYWRiLmdldENvbm5lY3RlZERldmljZXMoKTtcbiAgICBkZXZpY2VzLnNob3VsZC5oYXZlLmxlbmd0aC5hYm92ZSgwKTtcbiAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XG4gIH0pO1xuICBpdCgnZ2V0Q29ubmVjdGVkRGV2aWNlcyBzaG91bGQgZmFpbCB3aGVuIGFkYiBkZXZpY2VzIHJldHVybnMgdW5leHBlY3RlZCBvdXRwdXQnLCBhc3luYyAoKSA9PiB7XG4gICAgbW9ja3MudGVlbl9wcm9jZXNzLmV4cGVjdHMoXCJleGVjXCIpXG4gICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoYWRiLmV4ZWN1dGFibGUucGF0aCwgWydkZXZpY2VzJ10pXG4gICAgICAucmV0dXJucyh7c3Rkb3V0OlwiZm9vYmFyXCJ9KTtcbiAgICBhd2FpdCBhZGIuZ2V0Q29ubmVjdGVkRGV2aWNlcygpLnNob3VsZC5ldmVudHVhbGx5LmJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWplY3RlZFdpdGgoXCJVbmV4cGVjdGVkIG91dHB1dCB3aGlsZSB0cnlpbmcgdG8gZ2V0IGRldmljZXNcIik7XG4gICAgbW9ja3MudGVlbl9wcm9jZXNzLnZlcmlmeSgpO1xuICB9KTtcbiAgaXQoJ2dldERldmljZXNXaXRoUmV0cnkgc2hvdWxkIGZhaWwgd2hlbiB0aGVyZSBhcmUgbm8gY29ubmVjdGVkIGRldmljZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgbW9ja3MudGVlbl9wcm9jZXNzLmV4cGVjdHMoXCJleGVjXCIpXG4gICAgICAuYXRMZWFzdCgyKS53aXRoRXhhY3RBcmdzKGFkYi5leGVjdXRhYmxlLnBhdGgsIFsnZGV2aWNlcyddKVxuICAgICAgLnJldHVybnMoe3N0ZG91dDpcIkxpc3Qgb2YgZGV2aWNlcyBhdHRhY2hlZFwifSk7XG4gICAgYXdhaXQgYWRiLmdldERldmljZXNXaXRoUmV0cnkoMTAwMCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWplY3RlZFdpdGgoXCJDb3VsZCBub3QgZmluZCBhIGNvbm5lY3RlZCBBbmRyb2lkIGRldmljZS5cIik7XG4gICAgbW9ja3MudGVlbl9wcm9jZXNzLnZlcmlmeSgpO1xuICB9KTtcbiAgaXQoJ2dldERldmljZXNXaXRoUmV0cnkgc2hvdWxkIGZhaWwgd2hlbiBhZGIgZGV2aWNlcyByZXR1cm5zIHVuZXhwZWN0ZWQgb3V0cHV0JywgYXN5bmMgKCkgPT4ge1xuICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxuICAgICAgLmF0TGVhc3QoMikud2l0aEV4YWN0QXJncyhhZGIuZXhlY3V0YWJsZS5wYXRoLCBbJ2RldmljZXMnXSlcbiAgICAgIC5yZXR1cm5zKHtzdGRvdXQ6XCJmb29iYXJcIn0pO1xuICAgIGF3YWl0IGFkYi5nZXREZXZpY2VzV2l0aFJldHJ5KDEwMDApLnNob3VsZC5ldmVudHVhbGx5LmJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVqZWN0ZWRXaXRoKFwiQ291bGQgbm90IGZpbmQgYSBjb25uZWN0ZWQgQW5kcm9pZCBkZXZpY2UuXCIpO1xuICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcbiAgfSk7XG4gIGl0KCdnZXREZXZpY2VzV2l0aFJldHJ5IHNob3VsZCBnZXQgYWxsIGNvbm5lY3RlZCBkZXZpY2VzJywgYXN5bmMgKCkgPT4ge1xuICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKGFkYi5leGVjdXRhYmxlLnBhdGgsIFsnZGV2aWNlcyddKVxuICAgICAgLnJldHVybnMoe3N0ZG91dDpcIkxpc3Qgb2YgZGV2aWNlcyBhdHRhY2hlZCBcXG4gZW11bGF0b3ItNTU1NFx0ZGV2aWNlXCJ9KTtcbiAgICBsZXQgZGV2aWNlcyA9IGF3YWl0IGFkYi5nZXREZXZpY2VzV2l0aFJldHJ5KDEwMDApO1xuICAgIGRldmljZXMuc2hvdWxkLmhhdmUubGVuZ3RoLmFib3ZlKDApO1xuICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcbiAgfSk7XG4gIGl0KCdnZXREZXZpY2VzV2l0aFJldHJ5IHNob3VsZCBnZXQgYWxsIGNvbm5lY3RlZCBkZXZpY2VzIHNlY29uZCB0aW1lJywgYXN5bmMgKCkgPT4ge1xuICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxuICAgICAgLm9uQ2FsbCgwKVxuICAgICAgLnJldHVybnMoe3N0ZG91dDpcIkZvb2JhclwifSk7XG4gICAgbW9ja3MudGVlbl9wcm9jZXNzLmV4cGVjdHMoXCJleGVjXCIpXG4gICAgICAud2l0aEV4YWN0QXJncyhhZGIuZXhlY3V0YWJsZS5wYXRoLCBbJ2RldmljZXMnXSlcbiAgICAgIC5yZXR1cm5zKHtzdGRvdXQ6XCJMaXN0IG9mIGRldmljZXMgYXR0YWNoZWQgXFxuIGVtdWxhdG9yLTU1NTRcdGRldmljZVwifSk7XG4gICAgbGV0IGRldmljZXMgPSBhd2FpdCBhZGIuZ2V0RGV2aWNlc1dpdGhSZXRyeSgyMDAwKTtcbiAgICBkZXZpY2VzLnNob3VsZC5oYXZlLmxlbmd0aC5hYm92ZSgwKTtcbiAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XG4gIH0pO1xuICBpdCgnZ2V0RGV2aWNlc1dpdGhSZXRyeSBzaG91bGQgZmFpbCB3aGVuIGV4ZWMgdGhyb3dzIGFuIGVycm9yJywgYXN5bmMgKCkgPT4ge1xuICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxuICAgICAgLmF0TGVhc3QoMilcbiAgICAgIC50aHJvd3MoXCJFcnJvciBmb29iYXJcIik7XG4gICAgYXdhaXQgYWRiLmdldERldmljZXNXaXRoUmV0cnkoMTAwMCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWplY3RlZFdpdGgoXCJDb3VsZCBub3QgZmluZCBhIGNvbm5lY3RlZCBBbmRyb2lkIGRldmljZS5cIik7XG4gICAgbW9ja3MudGVlbl9wcm9jZXNzLnZlcmlmeSgpO1xuICB9KTtcbiAgaXQoJ3NldERldmljZUlkIHNob3VsZCBzZXQgdGhlIGRldmljZSBpZCcsICgpID0+IHtcbiAgICBhZGIuc2V0RGV2aWNlSWQoJ2Zvb2JhcicpO1xuICAgIGFkYi5jdXJEZXZpY2VJZC5zaG91bGQuZXF1YWwoJ2Zvb2JhcicpO1xuICAgIGFkYi5leGVjdXRhYmxlLmRlZmF1bHRBcmdzLnNob3VsZC5pbmNsdWRlKCdmb29iYXInKTtcbiAgfSk7XG4gIGl0KCdzZXREZXZpY2Ugc2hvdWxkIHNldCB0aGUgZGV2aWNlIGlkIGFuZCBlbXUgcG9ydCBmcm9tIG9iaicsICgpID0+IHtcbiAgICBhZGIuc2V0RGV2aWNlKHt1ZGlkOiAnZW11bGF0b3ItMTIzNCd9KTtcbiAgICBhZGIuY3VyRGV2aWNlSWQuc2hvdWxkLmVxdWFsKCdlbXVsYXRvci0xMjM0Jyk7XG4gICAgYWRiLmV4ZWN1dGFibGUuZGVmYXVsdEFyZ3Muc2hvdWxkLmluY2x1ZGUoJ2VtdWxhdG9yLTEyMzQnKTtcbiAgICBhZGIuZW11bGF0b3JQb3J0LnNob3VsZC5lcXVhbCgxMjM0KTtcbiAgfSk7XG4gIGl0KCdzZXRFbXVsYXRvclBvcnQgc2hvdWxkIGNoYW5nZSBlbXVsYXRvciBwb3J0JywgKCkgPT4ge1xuICAgIGFkYi5zZXRFbXVsYXRvclBvcnQoNTU1NCk7XG4gICAgYWRiLmVtdWxhdG9yUG9ydC5zaG91bGQuZXF1YWwoNTU1NCk7XG4gIH0pO1xuICBkZXNjcmliZSgnY3JlYXRlU3ViUHJvY2VzcycsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBpbnN0YW5jZSBvZiBTdWJQcm9jZXNzJywgKCkgPT4ge1xuICAgICAgYWRiLmNyZWF0ZVN1YlByb2Nlc3MoW10pLnNob3VsZC5iZS5hbi5pbnN0YW5jZW9mKHRlZW5fcHJvY2Vzcy5TdWJQcm9jZXNzKTtcbiAgICB9KTtcbiAgfSk7XG59KSk7XG5cbmRlc2NyaWJlKCdTeXN0ZW0gY2FsbHMnLCAgd2l0aE1vY2tzKHthZGIsIEJ9LCAobW9ja3MpID0+IHtcbiAgaXQoJ2ZpbGVFeGlzdHMgc2hvdWxkIHJldHVybiB0cnVlIGZvciBpZiBscyByZXR1cm5zJywgYXN5bmMgKCkgPT4ge1xuICAgIG1vY2tzLmFkYi5leHBlY3RzKFwibHNcIilcbiAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygnZm9vJylcbiAgICAgIC5yZXR1cm5zKFsnYmFyJ10pO1xuICAgIGF3YWl0IGFkYi5maWxlRXhpc3RzKFwiZm9vXCIpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKHRydWUpO1xuICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgfSk7XG4gIGl0KCdscyBzaG91bGQgcmV0dXJuIGxpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnbHMnLCAnZm9vJ10pXG4gICAgICAucmV0dXJucygnYmFyJyk7XG4gICAgbGV0IGxpc3QgPSBhd2FpdCBhZGIubHMoXCJmb29cIik7XG4gICAgbGlzdC5zaG91bGQuZGVlcC5lcXVhbChbJ2JhciddKTtcbiAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gIH0pO1xuICBpdCgncmVib290IHNob3VsZCBjYWxsIHN0b3AgYW5kIHN0YXJ0IHVzaW5nIHNoZWxsJywgYXN5bmMgKCkgPT4ge1xuICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ3N0b3AnXSk7XG4gICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzZXREZXZpY2VQcm9wZXJ0eVwiKVxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKCdzeXMuYm9vdF9jb21wbGV0ZWQnLCAwKTtcbiAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydzdGFydCddKTtcbiAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldERldmljZVByb3BlcnR5XCIpXG4gICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoJ3N5cy5ib290X2NvbXBsZXRlZCcpXG4gICAgICAucmV0dXJucygnMScpO1xuICAgIG1vY2tzLkIuZXhwZWN0cyhcImRlbGF5XCIpXG4gICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoMjAwMCk7XG4gICAgYXdhaXQgYWRiLnJlYm9vdCgpLnNob3VsZC5ldmVudHVhbGx5Lm5vdC5iZS5yZWplY3RlZDtcbiAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgbW9ja3MuQi52ZXJpZnkoKTtcbiAgfSk7XG4gIGl0KCdnZXRSdW5uaW5nQVZEIHNob3VsZCBnZXQgY29ubmVjdGVkIGF2ZCcsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgdWRpZCA9ICdlbXVsYXRvci01NTU0JztcbiAgICBsZXQgcG9ydCA9IDU1NTQ7XG4gICAgbGV0IGVtdWxhdG9yID0geyd1ZGlkJzogdWRpZCwgJ3BvcnQnOiBwb3J0fTtcbiAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldENvbm5lY3RlZEVtdWxhdG9yc1wiKVxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcbiAgICAgIC5yZXR1cm5zKFtlbXVsYXRvcl0pO1xuICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2V0RW11bGF0b3JQb3J0XCIpXG4gICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MocG9ydCk7XG4gICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzZW5kVGVsbmV0Q29tbWFuZFwiKVxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFwiYXZkIG5hbWVcIilcbiAgICAgIC5yZXR1cm5zKGF2ZE5hbWUpO1xuICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2V0RGV2aWNlSWRcIilcbiAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyh1ZGlkKTtcbiAgICAoYXdhaXQgYWRiLmdldFJ1bm5pbmdBVkQoYXZkTmFtZSkpLnNob3VsZC5lcXVhbChlbXVsYXRvcik7XG4gICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICB9KTtcbiAgaXQoJ2dldFJ1bm5pbmdBVkQgc2hvdWxkIHJldHVybiBudWxsIHdoZW4gZXhwZWN0ZWQgYXZkIGlzIG5vdCBjb25uZWN0ZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IHVkaWQgPSAnZW11bGF0b3ItNTU1NCc7XG4gICAgbGV0IHBvcnQgPSA1NTU0O1xuICAgIGxldCBlbXVsYXRvciA9IHsndWRpZCc6IHVkaWQsICdwb3J0JzogcG9ydH07XG4gICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRDb25uZWN0ZWRFbXVsYXRvcnNcIilcbiAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXG4gICAgICAucmV0dXJucyhbZW11bGF0b3JdKTtcbiAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNldEVtdWxhdG9yUG9ydFwiKVxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKHBvcnQpO1xuICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2VuZFRlbG5ldENvbW1hbmRcIilcbiAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhcImF2ZCBuYW1lXCIpXG4gICAgICAucmV0dXJucygnT1RIRVJfQVZEJyk7XG4gICAgY2hhaS5leHBlY3QoYXdhaXQgYWRiLmdldFJ1bm5pbmdBVkQoYXZkTmFtZSkpLnRvLmJlLm51bGw7XG4gICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICB9KTtcbiAgaXQoJ2dldFJ1bm5pbmdBVkQgc2hvdWxkIHJldHVybiBudWxsIHdoZW4gbm8gYXZkIGlzIGNvbm5lY3RlZCcsIGFzeW5jICgpID0+IHtcbiAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldENvbm5lY3RlZEVtdWxhdG9yc1wiKVxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcbiAgICAgIC5yZXR1cm5zKFtdKTtcbiAgICBjaGFpLmV4cGVjdChhd2FpdCBhZGIuZ2V0UnVubmluZ0FWRChhdmROYW1lKSkudG8uYmUubnVsbDtcbiAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gIH0pO1xufSkpO1xuIl19
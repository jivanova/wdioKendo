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

var _libHelpersJs = require('../../lib/helpers.js');

var helpers = _interopRequireWildcard(_libHelpersJs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var _appiumSupport = require('appium-support');

var appiumSupport = _interopRequireWildcard(_appiumSupport);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].use(_chaiAsPromised2['default']);

var selendroidTestApp = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'selendroid-test-app.apk'),
    helperJarPath = _path2['default'].resolve(_libHelpersJs.rootDir, 'jars'),
    keystorePath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'appiumtest.keystore'),
    keyAlias = 'appiumtest',
    password = 'android',
    selendroidTestAppPackage = 'io.selendroid.testapp',
    java_dummy_path = 'java_dummy_path',
    java_home = 'java_home',
    tempDir = appiumSupport.tempDir,
    fs = appiumSupport.fs;

describe('signing', function () {
  var adb = new _2['default']();
  adb.keystorePath = keystorePath;
  adb.keyAlias = keyAlias;
  adb.keystorePassword = password;
  adb.keyPassword = password;

  describe('signWithDefaultCert', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process, helpers: helpers }, function (mocks) {
    it('should call exec with correct args', function callee$2$0() {
      var signPath;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            signPath = _path2['default'].resolve(helperJarPath, 'sign.jar');

            mocks.helpers.expects("getJavaForOs").returns(java_dummy_path);
            mocks.teen_process.expects("exec").once().withExactArgs(java_dummy_path, ['-jar', signPath, selendroidTestApp, '--override']).returns("");
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.signWithDefaultCert(selendroidTestApp));

          case 5:
            mocks.teen_process.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw error for invalid file path', function callee$2$0() {
      var dummyPath;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            dummyPath = "dummyPath";
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.signWithDefaultCert(dummyPath).should.eventually.be.rejected);

          case 3:
            mocks.teen_process.verify();
            mocks.helpers.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('signWithCustomCert', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process, helpers: helpers }, function (mocks) {
    it('should call exec with correct args', function callee$2$0() {
      var jarsigner;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            jarsigner = _path2['default'].resolve(java_home, 'bin', 'jarsigner');

            if (appiumSupport.system.isWindows()) {
              jarsigner = jarsigner + '.exe';
            }
            adb.useKeystore = true;
            mocks.helpers.expects("getJavaHome").returns(java_home);
            mocks.helpers.expects("getJavaForOs").returns(java_dummy_path);
            mocks.teen_process.expects("exec").withExactArgs(java_dummy_path, ['-jar', _path2['default'].resolve(helperJarPath, 'unsign.jar'), selendroidTestApp]).returns("");
            mocks.teen_process.expects("exec").withExactArgs(jarsigner, ['-sigalg', 'MD5withRSA', '-digestalg', 'SHA1', '-keystore', keystorePath, '-storepass', password, '-keypass', password, selendroidTestApp, keyAlias]).returns("");
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(adb.signWithCustomCert(selendroidTestApp));

          case 9:
            mocks.teen_process.verify();
            mocks.helpers.verify();

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getKeystoreMd5', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process }, function (mocks) {
    it('should call exec with correct args', function callee$2$0() {
      var h, keytool, md5Str, md5;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            h = "a-fA-F0-9";
            keytool = _path2['default'].resolve(java_home, 'bin', 'keytool');
            md5Str = ['.*MD5.*((?:[', h, ']{2}:){15}[', h, ']{2})'].join('');
            md5 = new RegExp(md5Str, 'mi');

            adb.useKeystore = true;
            mocks.teen_process.expects("exec").once().withExactArgs(keytool, ['-v', '-list', '-alias', keyAlias, '-keystore', keystorePath, '-storepass', password]).returns("");
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(adb.getKeystoreMd5(keytool, md5));

          case 8:
            mocks.teen_process.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  // Skipping as unable to mock mkdirp, this case is covered in e2e tests for now.
  // TODO: find ways to mock mkdirp
  describe.skip('zipAlignApk', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process, adb: adb, appiumSupport: appiumSupport, fs: fs, tempDir: tempDir }, function (mocks) {
    it('should call exec with correct args', function callee$2$0() {
      var alignedApk;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            alignedApk = "dummy_path";

            mocks.tempDir.expects('path').once().withExactArgs({ prefix: 'appium', suffix: '.tmp' }).returns(alignedApk);
            mocks.adb.expects('initZipAlign').once().withExactArgs().returns("");
            mocks.appiumSupport.expects('mkdirp').once().withExactArgs(_path2['default'].dirname(alignedApk)).returns("");
            mocks.teen_process.expects("exec").once().withExactArgs(adb.binaries.zipalign, ['-f', '4', selendroidTestApp, alignedApk]);
            mocks.fs.expects("mv").once().withExactArgs(alignedApk, selendroidTestApp, { mkdirp: true }).returns("");
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(adb.zipAlignApk(selendroidTestApp));

          case 8:
            mocks.adb.verify();
            mocks.appiumSupport.verify();
            mocks.teen_process.verify();
            mocks.tempDir.verify();
            mocks.fs.verify();

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('checkApkCert', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process, helpers: helpers, adb: adb }, function (mocks) {
    it('should return false for apk not present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.helpers.expects("getJavaForOs").returns(java_dummy_path);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.checkApkCert('dummyPath', 'dummyPackage'));

          case 3:
            context$3$0.sent.should.be['false'];

            mocks.helpers.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call exec and zipAlign when not using keystore', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.helpers.expects("getJavaForOs").returns(java_dummy_path);
            mocks.teen_process.expects("exec").once().withExactArgs(java_dummy_path, ['-jar', _path2['default'].resolve(helperJarPath, 'verify.jar'), selendroidTestApp]).returns("");
            mocks.adb.expects('zipAlignApk').once().withExactArgs(selendroidTestApp).returns("");
            adb.useKeystore = false;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.checkApkCert(selendroidTestApp, selendroidTestAppPackage));

          case 6:
            mocks.adb.verify();
            mocks.teen_process.verify();
            mocks.helpers.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call checkCustomApkCert when using keystore', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.helpers.expects("getJavaForOs").returns(java_dummy_path);
            mocks.adb.expects('checkCustomApkCert').once().withExactArgs(selendroidTestApp, selendroidTestAppPackage).returns("");
            adb.useKeystore = true;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.checkApkCert(selendroidTestApp, selendroidTestAppPackage));

          case 5:
            mocks.adb.verify();
            mocks.helpers.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9hcGstc2lnbmluZy1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDN0IsT0FBTzs7Ozs0QkFDRSxzQkFBc0I7O0lBQW5DLE9BQU87O29CQUNGLE1BQU07Ozs7NEJBQ08sY0FBYzs7SUFBaEMsWUFBWTs7NkJBRU8sZ0JBQWdCOztJQUFuQyxhQUFhOztpQ0FDQyxxQkFBcUI7O0FBRy9DLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQU0saUJBQWlCLEdBQUcsa0JBQUssT0FBTyx3QkFBVSxNQUFNLEVBQUUsVUFBVSxFQUMzQix5QkFBeUIsQ0FBQztJQUMzRCxhQUFhLEdBQUcsa0JBQUssT0FBTyx3QkFBVSxNQUFNLENBQUM7SUFDN0MsWUFBWSxHQUFHLGtCQUFLLE9BQU8sd0JBQVUsTUFBTSxFQUFFLFVBQVUsRUFDM0IscUJBQXFCLENBQUM7SUFDbEQsUUFBUSxHQUFHLFlBQVk7SUFDdkIsUUFBUSxHQUFHLFNBQVM7SUFDcEIsd0JBQXdCLEdBQUcsdUJBQXVCO0lBQ2xELGVBQWUsR0FBRyxpQkFBaUI7SUFDbkMsU0FBUyxHQUFHLFdBQVc7SUFDdkIsT0FBTyxHQUFHLGFBQWEsQ0FBQyxPQUFPO0lBQy9CLEVBQUUsR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDOztBQUU1QixRQUFRLENBQUMsU0FBUyxFQUFFLFlBQU07QUFDeEIsTUFBSSxHQUFHLEdBQUcsbUJBQVMsQ0FBQztBQUNwQixLQUFHLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztBQUNoQyxLQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUN4QixLQUFHLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO0FBQ2hDLEtBQUcsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDOztBQUUzQixVQUFRLENBQUMscUJBQXFCLEVBQUUsa0NBQVUsRUFBQyxZQUFZLEVBQVosWUFBWSxFQUFF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IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFEQiBmcm9tICcuLi8uLic7XG5pbXBvcnQgKiBhcyBoZWxwZXJzIGZyb20gJy4uLy4uL2xpYi9oZWxwZXJzLmpzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdGVlbl9wcm9jZXNzIGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgeyByb290RGlyIH0gZnJvbSAnLi4vLi4vbGliL2hlbHBlcnMuanMnO1xuaW1wb3J0ICogYXMgYXBwaXVtU3VwcG9ydCBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgeyB3aXRoTW9ja3MgfSBmcm9tICdhcHBpdW0tdGVzdC1zdXBwb3J0JztcblxuXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmNvbnN0IHNlbGVuZHJvaWRUZXN0QXBwID0gcGF0aC5yZXNvbHZlKHJvb3REaXIsICd0ZXN0JywgJ2ZpeHR1cmVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZWxlbmRyb2lkLXRlc3QtYXBwLmFwaycpLFxuICAgICAgaGVscGVySmFyUGF0aCA9IHBhdGgucmVzb2x2ZShyb290RGlyLCAnamFycycpLFxuICAgICAga2V5c3RvcmVQYXRoID0gcGF0aC5yZXNvbHZlKHJvb3REaXIsICd0ZXN0JywgJ2ZpeHR1cmVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYXBwaXVtdGVzdC5rZXlzdG9yZScpLFxuICAgICAga2V5QWxpYXMgPSAnYXBwaXVtdGVzdCcsXG4gICAgICBwYXNzd29yZCA9ICdhbmRyb2lkJyxcbiAgICAgIHNlbGVuZHJvaWRUZXN0QXBwUGFja2FnZSA9ICdpby5zZWxlbmRyb2lkLnRlc3RhcHAnLFxuICAgICAgamF2YV9kdW1teV9wYXRoID0gJ2phdmFfZHVtbXlfcGF0aCcsXG4gICAgICBqYXZhX2hvbWUgPSAnamF2YV9ob21lJyxcbiAgICAgIHRlbXBEaXIgPSBhcHBpdW1TdXBwb3J0LnRlbXBEaXIsXG4gICAgICBmcyA9IGFwcGl1bVN1cHBvcnQuZnM7XG5cbmRlc2NyaWJlKCdzaWduaW5nJywgKCkgPT4ge1xuICBsZXQgYWRiID0gbmV3IEFEQigpO1xuICBhZGIua2V5c3RvcmVQYXRoID0ga2V5c3RvcmVQYXRoO1xuICBhZGIua2V5QWxpYXMgPSBrZXlBbGlhcztcbiAgYWRiLmtleXN0b3JlUGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgYWRiLmtleVBhc3N3b3JkID0gcGFzc3dvcmQ7XG5cbiAgZGVzY3JpYmUoJ3NpZ25XaXRoRGVmYXVsdENlcnQnLCB3aXRoTW9ja3Moe3RlZW5fcHJvY2VzcywgaGVscGVyc30sIChtb2NrcykgPT4ge1xuICAgIGl0KCdzaG91bGQgY2FsbCBleGVjIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHNpZ25QYXRoID0gcGF0aC5yZXNvbHZlKGhlbHBlckphclBhdGgsICdzaWduLmphcicpO1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKFwiZ2V0SmF2YUZvck9zXCIpXG4gICAgICAgIC5yZXR1cm5zKGphdmFfZHVtbXlfcGF0aCk7XG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cyhcImV4ZWNcIilcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKGphdmFfZHVtbXlfcGF0aCwgWyctamFyJywgc2lnblBhdGgsIHNlbGVuZHJvaWRUZXN0QXBwLCAnLS1vdmVycmlkZSddKVxuICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgIChhd2FpdCBhZGIuc2lnbldpdGhEZWZhdWx0Q2VydChzZWxlbmRyb2lkVGVzdEFwcCkpO1xuICAgICAgbW9ja3MudGVlbl9wcm9jZXNzLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgZm9yIGludmFsaWQgZmlsZSBwYXRoJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGR1bW15UGF0aCA9IFwiZHVtbXlQYXRoXCI7XG4gICAgICBhd2FpdCBhZGIuc2lnbldpdGhEZWZhdWx0Q2VydChkdW1teVBhdGgpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xuICAgICAgbW9ja3MudGVlbl9wcm9jZXNzLnZlcmlmeSgpO1xuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgnc2lnbldpdGhDdXN0b21DZXJ0Jywgd2l0aE1vY2tzKHt0ZWVuX3Byb2Nlc3MsIGhlbHBlcnN9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGNhbGwgZXhlYyB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBqYXJzaWduZXIgPSBwYXRoLnJlc29sdmUoamF2YV9ob21lLCAnYmluJywgJ2phcnNpZ25lcicpO1xuICAgICAgaWYgKGFwcGl1bVN1cHBvcnQuc3lzdGVtLmlzV2luZG93cygpKSB7XG4gICAgICAgIGphcnNpZ25lciA9IGphcnNpZ25lciArICcuZXhlJztcbiAgICAgIH1cbiAgICAgIGFkYi51c2VLZXlzdG9yZSA9IHRydWU7XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoXCJnZXRKYXZhSG9tZVwiKVxuICAgICAgICAucmV0dXJucyhqYXZhX2hvbWUpO1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKFwiZ2V0SmF2YUZvck9zXCIpXG4gICAgICAgIC5yZXR1cm5zKGphdmFfZHVtbXlfcGF0aCk7XG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cyhcImV4ZWNcIilcbiAgICAgICAgLndpdGhFeGFjdEFyZ3MoamF2YV9kdW1teV9wYXRoLCBbJy1qYXInLCBwYXRoLnJlc29sdmUoaGVscGVySmFyUGF0aCwgJ3Vuc2lnbi5qYXInKSwgc2VsZW5kcm9pZFRlc3RBcHBdKVxuICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxuICAgICAgICAud2l0aEV4YWN0QXJncyhqYXJzaWduZXIsIFsnLXNpZ2FsZycsICdNRDV3aXRoUlNBJywgJy1kaWdlc3RhbGcnLCAnU0hBMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcta2V5c3RvcmUnLCBrZXlzdG9yZVBhdGgsICctc3RvcmVwYXNzJywgcGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcta2V5cGFzcycsIHBhc3N3b3JkLCBzZWxlbmRyb2lkVGVzdEFwcCwga2V5QWxpYXNdKVxuICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgIChhd2FpdCBhZGIuc2lnbldpdGhDdXN0b21DZXJ0KHNlbGVuZHJvaWRUZXN0QXBwKSk7XG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdnZXRLZXlzdG9yZU1kNScsIHdpdGhNb2Nrcyh7dGVlbl9wcm9jZXNzfSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIGV4ZWMgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgaCA9IFwiYS1mQS1GMC05XCI7XG4gICAgICBsZXQga2V5dG9vbCA9IHBhdGgucmVzb2x2ZShqYXZhX2hvbWUsICdiaW4nLCAna2V5dG9vbCcpO1xuICAgICAgbGV0IG1kNVN0ciA9IFsnLipNRDUuKigoPzpbJywgaCwgJ117Mn06KXsxNX1bJywgaCwgJ117Mn0pJ10uam9pbignJyk7XG4gICAgICBsZXQgbWQ1ID0gbmV3IFJlZ0V4cChtZDVTdHIsICdtaScpO1xuICAgICAgYWRiLnVzZUtleXN0b3JlID0gdHJ1ZTtcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3Moa2V5dG9vbCwgWyctdicsICctbGlzdCcsICctYWxpYXMnLCBrZXlBbGlhcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLWtleXN0b3JlJywga2V5c3RvcmVQYXRoLCAnLXN0b3JlcGFzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmRdKVxuICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgIChhd2FpdCBhZGIuZ2V0S2V5c3RvcmVNZDUoa2V5dG9vbCwgbWQ1KSk7XG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgLy8gU2tpcHBpbmcgYXMgdW5hYmxlIHRvIG1vY2sgbWtkaXJwLCB0aGlzIGNhc2UgaXMgY292ZXJlZCBpbiBlMmUgdGVzdHMgZm9yIG5vdy5cbiAgLy8gVE9ETzogZmluZCB3YXlzIHRvIG1vY2sgbWtkaXJwXG4gIGRlc2NyaWJlLnNraXAoJ3ppcEFsaWduQXBrJyxcbiAgICB3aXRoTW9ja3Moe3RlZW5fcHJvY2VzcywgYWRiLCBhcHBpdW1TdXBwb3J0LCBmcywgdGVtcERpcn0sIChtb2NrcykgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIGV4ZWMgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCBhbGlnbmVkQXBrID0gXCJkdW1teV9wYXRoXCI7XG4gICAgICAgIG1vY2tzLnRlbXBEaXIuZXhwZWN0cygncGF0aCcpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKHtwcmVmaXg6ICdhcHBpdW0nLCBzdWZmaXg6ICcudG1wJ30pXG4gICAgICAgICAgLnJldHVybnMoYWxpZ25lZEFwayk7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpbml0WmlwQWxpZ24nKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICAgIG1vY2tzLmFwcGl1bVN1cHBvcnQuZXhwZWN0cygnbWtkaXJwJylcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MocGF0aC5kaXJuYW1lKGFsaWduZWRBcGspKVxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cyhcImV4ZWNcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoYWRiLmJpbmFyaWVzLnppcGFsaWduLCBbJy1mJywgJzQnLCBzZWxlbmRyb2lkVGVzdEFwcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25lZEFwa10pO1xuICAgICAgICBtb2Nrcy5mcy5leHBlY3RzKFwibXZcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoYWxpZ25lZEFwaywgc2VsZW5kcm9pZFRlc3RBcHAsIHsgbWtkaXJwOiB0cnVlIH0pXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICAgIGF3YWl0IGFkYi56aXBBbGlnbkFwayhzZWxlbmRyb2lkVGVzdEFwcCk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgICAgbW9ja3MuYXBwaXVtU3VwcG9ydC52ZXJpZnkoKTtcbiAgICAgICAgbW9ja3MudGVlbl9wcm9jZXNzLnZlcmlmeSgpO1xuICAgICAgICBtb2Nrcy50ZW1wRGlyLnZlcmlmeSgpO1xuICAgICAgICBtb2Nrcy5mcy52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdjaGVja0Fwa0NlcnQnLCB3aXRoTW9ja3Moe3RlZW5fcHJvY2VzcywgaGVscGVycywgYWRifSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgZm9yIGFwayBub3QgcHJlc2VudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cyhcImdldEphdmFGb3JPc1wiKVxuICAgICAgICAucmV0dXJucyhqYXZhX2R1bW15X3BhdGgpO1xuICAgICAgKGF3YWl0IGFkYi5jaGVja0Fwa0NlcnQoJ2R1bW15UGF0aCcsICdkdW1teVBhY2thZ2UnKSkuc2hvdWxkLmJlLmZhbHNlO1xuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGNhbGwgZXhlYyBhbmQgemlwQWxpZ24gd2hlbiBub3QgdXNpbmcga2V5c3RvcmUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoXCJnZXRKYXZhRm9yT3NcIilcbiAgICAgICAgICAgLnJldHVybnMoamF2YV9kdW1teV9wYXRoKTtcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxuICAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoamF2YV9kdW1teV9wYXRoLCBbJy1qYXInLCBwYXRoLnJlc29sdmUoaGVscGVySmFyUGF0aCwgJ3ZlcmlmeS5qYXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlbmRyb2lkVGVzdEFwcF0pXG4gICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3ppcEFsaWduQXBrJylcbiAgICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKHNlbGVuZHJvaWRUZXN0QXBwKVxuICAgICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgIGFkYi51c2VLZXlzdG9yZSA9IGZhbHNlO1xuICAgICAgYXdhaXQgYWRiLmNoZWNrQXBrQ2VydChzZWxlbmRyb2lkVGVzdEFwcCwgc2VsZW5kcm9pZFRlc3RBcHBQYWNrYWdlKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIGNoZWNrQ3VzdG9tQXBrQ2VydCB3aGVuIHVzaW5nIGtleXN0b3JlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKFwiZ2V0SmF2YUZvck9zXCIpXG4gICAgICAgICAgIC5yZXR1cm5zKGphdmFfZHVtbXlfcGF0aCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnY2hlY2tDdXN0b21BcGtDZXJ0JylcbiAgICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKHNlbGVuZHJvaWRUZXN0QXBwLCBzZWxlbmRyb2lkVGVzdEFwcFBhY2thZ2UpXG4gICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgYWRiLnVzZUtleXN0b3JlID0gdHJ1ZTtcbiAgICAgIGF3YWl0IGFkYi5jaGVja0Fwa0NlcnQoc2VsZW5kcm9pZFRlc3RBcHAsIHNlbGVuZHJvaWRUZXN0QXBwUGFja2FnZSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG59KTtcbiJdfQ==
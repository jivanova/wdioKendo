'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _teen_process = require('teen_process');

var _appiumLogger = require('appium-logger');

var log = (0, _appiumLogger.getLogger)('Logcat');

var Logcat = (function () {
  function Logcat() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Logcat);

    this.adb = opts.adb;
    this.debug = opts.debug;
    this.debugTrace = opts.debugTrace;
    this.logs = [];
    this.logsSinceLastRequest = [];
  }

  _createClass(Logcat, [{
    key: 'startCapture',
    value: function startCapture() {
      var _this2 = this;

      return new _Promise(function callee$2$0(resolve, reject) {
        return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
          var _this = this;

          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              log.debug("Starting logcat capture");
              this.proc = new _teen_process.SubProcess(this.adb.path, this.adb.defaultArgs.concat(['logcat', '-v', 'threadtime']));
              context$3$0.next = 4;
              return _regeneratorRuntime.awrap(this.proc.start(0));

            case 4:
              this.proc.on('exit', function (code, signal) {
                log.error('Logcat terminated with code ' + code + ', signal ' + signal);
                _this.proc = null;
              });
              this.proc.on('lines-stderr', function (lines) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = _getIterator(lines), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var line = _step.value;

                    if (/execvp\(\)/.test(line)) {
                      log.error('Logcat process failed to start');
                      reject(new Error('Logcat process failed to start. stderr: ' + line));
                    }
                    _this.outputHandler(line, 'STDERR: ');
                  }
                } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                      _iterator['return']();
                    }
                  } finally {
                    if (_didIteratorError) {
                      throw _iteratorError;
                    }
                  }
                }

                resolve();
              });
              this.proc.on('lines-stdout', function (lines) {
                resolve();
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = _getIterator(lines), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var line = _step2.value;

                    _this.outputHandler(line);
                  }
                } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                      _iterator2['return']();
                    }
                  } finally {
                    if (_didIteratorError2) {
                      throw _iteratorError2;
                    }
                  }
                }
              });

            case 7:
            case 'end':
              return context$3$0.stop();
          }
        }, null, _this2);
      });
    }
  }, {
    key: 'outputHandler',
    value: function outputHandler(output) {
      var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

      output = output.trim();
      if (output) {
        var outputObj = {
          timestamp: Date.now(),
          level: 'ALL',
          message: output
        };
        this.logs.push(outputObj);
        this.logsSinceLastRequest.push(outputObj);
        var isTrace = /W\/Trace/.test(output);
        if (this.debug && (!isTrace || this.debugTrace)) {
          log.debug(prefix + output);
        }
      }
    }
  }, {
    key: 'stopCapture',
    value: function stopCapture() {
      return _regeneratorRuntime.async(function stopCapture$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            log.debug("Stopping logcat capture");

            if (!(this.proc === null)) {
              context$2$0.next = 4;
              break;
            }

            log.debug("Logcat already stopped");
            return context$2$0.abrupt('return');

          case 4:
            this.proc.removeAllListeners('exit');
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap(this.proc.stop());

          case 7:
            this.proc = null;

          case 8:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getLogs',
    value: function getLogs() {
      var logs = this.logsSinceLastRequest;
      this.logsSinceLastRequest = [];
      return logs;
    }
  }, {
    key: 'getAllLogs',
    value: function getAllLogs() {
      return this.logs;
    }
  }]);

  return Logcat;
})();

exports['default'] = Logcat;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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U0FBUyxDQUFDLENBQUM7QUFDMUMsWUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QyxZQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQSxBQUFDLEVBQUU7QUFDL0MsYUFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUM7U0FDNUI7T0FDRjtLQUNGOzs7V0FFaUI7Ozs7QUFDaEIsZUFBRyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOztrQkFDakMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUE7Ozs7O0FBQ3BCLGVBQUcsQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQzs7OztBQUd0QyxnQkFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7NkNBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFOzs7QUFDdEIsZ0JBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOzs7Ozs7O0tBQ2xCOzs7V0FFTyxtQkFBRztBQUNULFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztBQUNyQyxVQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO0FBQy9CLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUVVLHNCQUFHO0FBQ1osYUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ2xCOzs7U0F6RUcsTUFBTTs7O3FCQTRFRyxNQUFNIiwiZmlsZSI6ImxpYi9sb2djYXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJQcm9jZXNzIH0gZnJvbSAndGVlbl9wcm9jZXNzJztcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gJ2FwcGl1bS1sb2dnZXInO1xuXG5jb25zdCBsb2cgPSBnZXRMb2dnZXIoJ0xvZ2NhdCcpO1xuXG5jbGFzcyBMb2djYXQge1xuICBjb25zdHJ1Y3RvciAob3B0cyA9IHt9KSB7XG4gICAgdGhpcy5hZGIgPSBvcHRzLmFkYjtcbiAgICB0aGlzLmRlYnVnID0gb3B0cy5kZWJ1ZztcbiAgICB0aGlzLmRlYnVnVHJhY2UgPSBvcHRzLmRlYnVnVHJhY2U7XG4gICAgdGhpcy5sb2dzID0gW107XG4gICAgdGhpcy5sb2dzU2luY2VMYXN0UmVxdWVzdCA9IFtdO1xuICB9XG5cbiAgc3RhcnRDYXB0dXJlICgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbG9nLmRlYnVnKFwiU3RhcnRpbmcgbG9nY2F0IGNhcHR1cmVcIik7XG4gICAgICB0aGlzLnByb2MgPSBuZXcgU3ViUHJvY2Vzcyh0aGlzLmFkYi5wYXRoLCB0aGlzLmFkYi5kZWZhdWx0QXJncy5jb25jYXQoWydsb2djYXQnLCAnLXYnLCAndGhyZWFkdGltZSddKSk7XG4gICAgICBhd2FpdCB0aGlzLnByb2Muc3RhcnQoMCk7XG4gICAgICB0aGlzLnByb2Mub24oJ2V4aXQnLCAoY29kZSwgc2lnbmFsKSA9PiB7XG4gICAgICAgIGxvZy5lcnJvcihgTG9nY2F0IHRlcm1pbmF0ZWQgd2l0aCBjb2RlICR7Y29kZX0sIHNpZ25hbCAke3NpZ25hbH1gKTtcbiAgICAgICAgdGhpcy5wcm9jID0gbnVsbDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wcm9jLm9uKCdsaW5lcy1zdGRlcnInLCBsaW5lcyA9PiB7XG4gICAgICAgIGZvciAobGV0IGxpbmUgb2YgbGluZXMpIHtcbiAgICAgICAgICBpZiAoL2V4ZWN2cFxcKFxcKS8udGVzdChsaW5lKSkge1xuICAgICAgICAgICAgbG9nLmVycm9yKCdMb2djYXQgcHJvY2VzcyBmYWlsZWQgdG8gc3RhcnQnKTtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYExvZ2NhdCBwcm9jZXNzIGZhaWxlZCB0byBzdGFydC4gc3RkZXJyOiAke2xpbmV9YCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm91dHB1dEhhbmRsZXIobGluZSwgJ1NUREVSUjogJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnByb2Mub24oJ2xpbmVzLXN0ZG91dCcsIGxpbmVzID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICBmb3IgKGxldCBsaW5lIG9mIGxpbmVzKSB7XG4gICAgICAgICAgdGhpcy5vdXRwdXRIYW5kbGVyKGxpbmUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG91dHB1dEhhbmRsZXIgKG91dHB1dCwgcHJlZml4ID0gJycpIHtcbiAgICBvdXRwdXQgPSBvdXRwdXQudHJpbSgpO1xuICAgIGlmIChvdXRwdXQpIHtcbiAgICAgIGxldCBvdXRwdXRPYmogPSB7XG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgbGV2ZWw6ICdBTEwnLFxuICAgICAgICBtZXNzYWdlOiBvdXRwdXRcbiAgICAgIH07XG4gICAgICB0aGlzLmxvZ3MucHVzaChvdXRwdXRPYmopO1xuICAgICAgdGhpcy5sb2dzU2luY2VMYXN0UmVxdWVzdC5wdXNoKG91dHB1dE9iaik7XG4gICAgICBsZXQgaXNUcmFjZSA9IC9XXFwvVHJhY2UvLnRlc3Qob3V0cHV0KTtcbiAgICAgIGlmICh0aGlzLmRlYnVnICYmICghaXNUcmFjZSB8fCB0aGlzLmRlYnVnVHJhY2UpKSB7XG4gICAgICAgIGxvZy5kZWJ1ZyhwcmVmaXggKyBvdXRwdXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHN0b3BDYXB0dXJlICgpIHtcbiAgICBsb2cuZGVidWcoXCJTdG9wcGluZyBsb2djYXQgY2FwdHVyZVwiKTtcbiAgICBpZiAodGhpcy5wcm9jID09PSBudWxsKSB7XG4gICAgICBsb2cuZGVidWcoXCJMb2djYXQgYWxyZWFkeSBzdG9wcGVkXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb2MucmVtb3ZlQWxsTGlzdGVuZXJzKCdleGl0Jyk7XG4gICAgYXdhaXQgdGhpcy5wcm9jLnN0b3AoKTtcbiAgICB0aGlzLnByb2MgPSBudWxsO1xuICB9XG5cbiAgZ2V0TG9ncyAoKSB7XG4gICAgbGV0IGxvZ3MgPSB0aGlzLmxvZ3NTaW5jZUxhc3RSZXF1ZXN0O1xuICAgIHRoaXMubG9nc1NpbmNlTGFzdFJlcXVlc3QgPSBbXTtcbiAgICByZXR1cm4gbG9ncztcbiAgfVxuXG4gIGdldEFsbExvZ3MgKCkge1xuICAgIHJldHVybiB0aGlzLmxvZ3M7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9nY2F0O1xuIl19
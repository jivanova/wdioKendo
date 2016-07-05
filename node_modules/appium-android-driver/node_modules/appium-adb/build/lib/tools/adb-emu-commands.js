'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var emuMethods = {};

emuMethods.isEmulatorConnected = function callee$0$0(udid) {
  var emulators, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, emulator;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getConnectedEmulators());

      case 2:
        emulators = context$1$0.sent;

        if (emulators.length) {
          context$1$0.next = 5;
          break;
        }

        return context$1$0.abrupt('return', false);

      case 5:
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 8;
        _iterator = _getIterator(emulators);

      case 10:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 17;
          break;
        }

        emulator = _step.value;

        if (!(emulator.udid === udid)) {
          context$1$0.next = 14;
          break;
        }

        return context$1$0.abrupt('return', true);

      case 14:
        _iteratorNormalCompletion = true;
        context$1$0.next = 10;
        break;

      case 17:
        context$1$0.next = 23;
        break;

      case 19:
        context$1$0.prev = 19;
        context$1$0.t0 = context$1$0['catch'](8);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 23:
        context$1$0.prev = 23;
        context$1$0.prev = 24;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 26:
        context$1$0.prev = 26;

        if (!_didIteratorError) {
          context$1$0.next = 29;
          break;
        }

        throw _iteratorError;

      case 29:
        return context$1$0.finish(26);

      case 30:
        return context$1$0.finish(23);

      case 31:
        return context$1$0.abrupt('return', false);

      case 32:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[8, 19, 23, 31], [24,, 26, 30]]);
};

emuMethods.fingerprint = function callee$0$0(fingerprintId) {
  var udid = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
  var level;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!fingerprintId) {
          _loggerJs2['default'].errorAndThrow('Fingerprint id parameter must be defined');
        }

        // the method used only works for API level 23 and above
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getApiLevel());

      case 3:
        level = context$1$0.sent;

        if (parseInt(level, 10) < 23) {
          _loggerJs2['default'].errorAndThrow('Device API Level must be >= 23. Current Api level \'' + level + '\'');
        }

        context$1$0.t0 = !_lodash2['default'].isUndefined(udid);

        if (!context$1$0.t0) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.isEmulatorConnected(udid));

      case 9:
        context$1$0.t0 = !context$1$0.sent;

      case 10:
        if (!context$1$0.t0) {
          context$1$0.next = 14;
          break;
        }

        _loggerJs2['default'].errorAndThrow('Device \'' + udid + '\' is not available.');
        context$1$0.next = 19;
        break;

      case 14:
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(this.getConnectedEmulators());

      case 16:
        context$1$0.t1 = context$1$0.sent.length;

        if (!(context$1$0.t1 === 0)) {
          context$1$0.next = 19;
          break;
        }

        _loggerJs2['default'].errorAndThrow('No devices connected');

      case 19:
        if (!udid) {
          context$1$0.next = 22;
          break;
        }

        context$1$0.next = 22;
        return _regeneratorRuntime.awrap(this.setDeviceId(udid));

      case 22:
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap(this.adbExec(['emu', 'finger', 'touch', fingerprintId]));

      case 24:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports['default'] = emuMethods;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy9hZGItZW11LWNvbW1hbmRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt3QkFBZ0IsY0FBYzs7OztzQkFDaEIsUUFBUTs7OztBQUd0QixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXBCLFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxvQkFBZ0IsSUFBSTtNQUMvQyxTQUFTLGtGQUlKLFFBQVE7Ozs7Ozt5Q0FKSyxJQUFJLENBQUMscUJBQXFCLEVBQUU7OztBQUE5QyxpQkFBUzs7WUFDUixTQUFTLENBQUMsTUFBTTs7Ozs7NENBQ1osS0FBSzs7Ozs7OztpQ0FFTyxTQUFTOzs7Ozs7OztBQUFyQixnQkFBUTs7Y0FDWCxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQTs7Ozs7NENBQ2pCLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0Q0FHUixLQUFLOzs7Ozs7O0NBQ2IsQ0FBQzs7QUFFRixVQUFVLENBQUMsV0FBVyxHQUFHLG9CQUFnQixhQUFhO01BQUUsSUFBSSx5REFBRyxTQUFTO01BTWxFLEtBQUs7Ozs7QUFMVCxZQUFJLENBQUMsYUFBYSxFQUFFO0FBQ2xCLGdDQUFJLGFBQWEsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1NBQy9EOzs7O3lDQUdpQixJQUFJLENBQUMsV0FBVyxFQUFFOzs7QUFBaEMsYUFBSzs7QUFDVCxZQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO0FBQzVCLGdDQUFJLGFBQWEsMERBQXVELEtBQUssUUFBSSxDQUFDO1NBQ25GOzt5QkFFRyxDQUFDLG9CQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7O3lDQUFZLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7O0FBQ2hFLDhCQUFJLGFBQWEsZUFBWSxJQUFJLDBCQUFzQixDQUFDOzs7Ozs7eUNBQ3hDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTs7OzBDQUFFLE1BQU07O2lDQUFLLENBQUM7Ozs7O0FBQzFELDhCQUFJLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDOzs7YUFHeEMsSUFBSTs7Ozs7O3lDQUNBLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDOzs7O3lDQUV4QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7Ozs7Ozs7Q0FDOUQsQ0FBQzs7cUJBR2EsVUFBVSIsImZpbGUiOiJsaWIvdG9vbHMvYWRiLWVtdS1jb21tYW5kcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyLmpzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cblxubGV0IGVtdU1ldGhvZHMgPSB7fTtcblxuZW11TWV0aG9kcy5pc0VtdWxhdG9yQ29ubmVjdGVkID0gYXN5bmMgZnVuY3Rpb24gKHVkaWQpIHtcbiAgbGV0IGVtdWxhdG9ycyA9IGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGVkRW11bGF0b3JzKCk7XG4gIGlmICghZW11bGF0b3JzLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmb3IgKGxldCBlbXVsYXRvciBvZiBlbXVsYXRvcnMpIHtcbiAgICBpZiAoZW11bGF0b3IudWRpZCA9PT0gdWRpZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmVtdU1ldGhvZHMuZmluZ2VycHJpbnQgPSBhc3luYyBmdW5jdGlvbiAoZmluZ2VycHJpbnRJZCwgdWRpZCA9IHVuZGVmaW5lZCkge1xuICBpZiAoIWZpbmdlcnByaW50SWQpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdygnRmluZ2VycHJpbnQgaWQgcGFyYW1ldGVyIG11c3QgYmUgZGVmaW5lZCcpO1xuICB9XG5cbiAgLy8gdGhlIG1ldGhvZCB1c2VkIG9ubHkgd29ya3MgZm9yIEFQSSBsZXZlbCAyMyBhbmQgYWJvdmVcbiAgbGV0IGxldmVsID0gYXdhaXQgdGhpcy5nZXRBcGlMZXZlbCgpO1xuICBpZiAocGFyc2VJbnQobGV2ZWwsIDEwKSA8IDIzKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYERldmljZSBBUEkgTGV2ZWwgbXVzdCBiZSA+PSAyMy4gQ3VycmVudCBBcGkgbGV2ZWwgJyR7bGV2ZWx9J2ApO1xuICB9XG5cbiAgaWYgKCFfLmlzVW5kZWZpbmVkKHVkaWQpICYmICEoYXdhaXQgdGhpcy5pc0VtdWxhdG9yQ29ubmVjdGVkKHVkaWQpKSApIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRGV2aWNlICcke3VkaWR9JyBpcyBub3QgYXZhaWxhYmxlLmApO1xuICB9IGVsc2UgaWYgKChhd2FpdCB0aGlzLmdldENvbm5lY3RlZEVtdWxhdG9ycygpKS5sZW5ndGggPT09IDApIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdygnTm8gZGV2aWNlcyBjb25uZWN0ZWQnKTtcbiAgfVxuXG4gIGlmICh1ZGlkKSB7XG4gICAgYXdhaXQgdGhpcy5zZXREZXZpY2VJZCh1ZGlkKTtcbiAgfVxuICBhd2FpdCB0aGlzLmFkYkV4ZWMoWydlbXUnLCAnZmluZ2VyJywgJ3RvdWNoJywgZmluZ2VycHJpbnRJZF0pO1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBlbXVNZXRob2RzO1xuIl19
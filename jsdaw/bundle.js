/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar BassDrum = function () {\n  function BassDrum(context, destination) {\n    _classCallCheck(this, BassDrum);\n\n    this.context = context;\n    this.destination = destination;\n  }\n\n  _createClass(BassDrum, [{\n    key: 'body',\n    value: function body(when, duration) {\n      var modulator = this.context.createOscillator();\n      modulator.type = 'sine';\n      modulator.frequency.value = 70;\n\n      var modulatorGain = this.context.createGain();\n      modulatorGain.gain.value = 250;\n\n      var carrier = this.context.createOscillator();\n      carrier.type = 'sine';\n      carrier.frequency.value = 110;\n\n      var hpf = this.context.createBiquadFilter();\n      hpf.type = 'highpass';\n      hpf.frequency.value = 100;\n      hpf.Q.value = 0.2;\n\n      var click = this.click(when);\n\n      modulator.connect(modulatorGain);\n      modulatorGain.connect(carrier.frequency);\n      carrier.connect(hpf);\n      hpf.connect(click);\n\n      modulator.start(when);\n      carrier.start(when);\n\n      modulator.stop(when + duration);\n      carrier.stop(when + duration);\n\n      return click;\n    }\n  }, {\n    key: 'click',\n    value: function click(when) {\n      var lpf = this.context.createBiquadFilter();\n      lpf.type = 'lowpass';\n      lpf.frequency.setValueAtTime(3000, when);\n      lpf.frequency.linearRampToValueAtTime(100, when + 0.01);\n      lpf.Q.value = 0.2;\n\n      return lpf;\n    }\n  }, {\n    key: 'pitchBend',\n    value: function pitchBend(when, duration) {\n      var vco = this.context.createOscillator();\n      vco.type = 'sine';\n      vco.frequency.setValueAtTime(110, when);\n      vco.frequency.linearRampToValueAtTime(10, when + duration);\n\n      var lpf = this.context.createBiquadFilter();\n      lpf.type = 'lowpass';\n      lpf.frequency.value = 80;\n      lpf.Q.value = 2;\n\n      vco.connect(lpf);\n\n      vco.start(when);\n      vco.stop(when + duration);\n\n      return lpf;\n    }\n  }, {\n    key: 'playSound',\n    value: function playSound(when) {\n      var duration = 0.1;\n\n      var body = this.body(when, duration);\n      var pitchBend = this.pitchBend(when, duration);\n\n      var bodyGain = this.context.createGain();\n      bodyGain.gain.value = 1;\n\n      var pitchBendGain = this.context.createGain();\n      pitchBendGain.gain.value = 1;\n\n      var vca = this.context.createGain();\n      vca.gain.setValueAtTime(10, when);\n      vca.gain.linearRampToValueAtTime(0, when + duration);\n\n      body.connect(bodyGain);\n      pitchBend.connect(pitchBendGain);\n      bodyGain.connect(vca);\n      pitchBendGain.connect(vca);\n      vca.connect(this.destination);\n    }\n  }]);\n\n  return BassDrum;\n}();\n\nexports.default = BassDrum;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9hcHAvQmFzc0RydW0uanM/YzBiZiJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBCYXNzRHJ1bSB7XG4gIGNvbnN0cnVjdG9yKGNvbnRleHQsIGRlc3RpbmF0aW9uKSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dFxuICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvblxuICB9XG5cbiAgYm9keSh3aGVuLCBkdXJhdGlvbikge1xuICAgIGNvbnN0IG1vZHVsYXRvciA9IHRoaXMuY29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcbiAgICBtb2R1bGF0b3IudHlwZSA9ICdzaW5lJ1xuICAgIG1vZHVsYXRvci5mcmVxdWVuY3kudmFsdWUgPSA3MFxuXG4gICAgY29uc3QgbW9kdWxhdG9yR2FpbiA9IHRoaXMuY29udGV4dC5jcmVhdGVHYWluKClcbiAgICBtb2R1bGF0b3JHYWluLmdhaW4udmFsdWUgPSAyNTBcblxuICAgIGNvbnN0IGNhcnJpZXIgPSB0aGlzLmNvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpXG4gICAgY2Fycmllci50eXBlID0gJ3NpbmUnXG4gICAgY2Fycmllci5mcmVxdWVuY3kudmFsdWUgPSAxMTBcblxuICAgIGNvbnN0IGhwZiA9IHRoaXMuY29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICAgIGhwZi50eXBlID0gJ2hpZ2hwYXNzJ1xuICAgIGhwZi5mcmVxdWVuY3kudmFsdWUgPSAxMDBcbiAgICBocGYuUS52YWx1ZSA9IDAuMlxuXG4gICAgY29uc3QgY2xpY2sgPSB0aGlzLmNsaWNrKHdoZW4pXG5cbiAgICBtb2R1bGF0b3IuY29ubmVjdChtb2R1bGF0b3JHYWluKVxuICAgIG1vZHVsYXRvckdhaW4uY29ubmVjdChjYXJyaWVyLmZyZXF1ZW5jeSlcbiAgICBjYXJyaWVyLmNvbm5lY3QoaHBmKVxuICAgIGhwZi5jb25uZWN0KGNsaWNrKVxuXG4gICAgbW9kdWxhdG9yLnN0YXJ0KHdoZW4pXG4gICAgY2Fycmllci5zdGFydCh3aGVuKVxuXG4gICAgbW9kdWxhdG9yLnN0b3Aod2hlbiArIGR1cmF0aW9uKVxuICAgIGNhcnJpZXIuc3RvcCh3aGVuICsgZHVyYXRpb24pXG5cbiAgICByZXR1cm4gY2xpY2tcbiAgfVxuXG4gIGNsaWNrKHdoZW4pIHtcbiAgICBjb25zdCBscGYgPSB0aGlzLmNvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcbiAgICBscGYudHlwZSA9ICdsb3dwYXNzJ1xuICAgIGxwZi5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMzAwMCwgd2hlbilcbiAgICBscGYuZnJlcXVlbmN5LmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDEwMCwgd2hlbiArIDAuMDEpXG4gICAgbHBmLlEudmFsdWUgPSAwLjJcblxuICAgIHJldHVybiBscGZcbiAgfVxuXG4gIHBpdGNoQmVuZCh3aGVuLCBkdXJhdGlvbikge1xuICAgIGNvbnN0IHZjbyA9IHRoaXMuY29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcbiAgICB2Y28udHlwZSA9ICdzaW5lJ1xuICAgIHZjby5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMTEwLCB3aGVuKVxuICAgIHZjby5mcmVxdWVuY3kubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMTAsIHdoZW4gKyBkdXJhdGlvbilcblxuICAgIGNvbnN0IGxwZiA9IHRoaXMuY29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICAgIGxwZi50eXBlID0gJ2xvd3Bhc3MnXG4gICAgbHBmLmZyZXF1ZW5jeS52YWx1ZSA9IDgwXG4gICAgbHBmLlEudmFsdWUgPSAyXG5cbiAgICB2Y28uY29ubmVjdChscGYpXG5cbiAgICB2Y28uc3RhcnQod2hlbilcbiAgICB2Y28uc3RvcCh3aGVuICsgZHVyYXRpb24pXG5cbiAgICByZXR1cm4gbHBmXG4gIH1cblxuICBwbGF5U291bmQod2hlbikge1xuICAgIGNvbnN0IGR1cmF0aW9uID0gMC4xXG5cbiAgICBjb25zdCBib2R5ID0gdGhpcy5ib2R5KHdoZW4sIGR1cmF0aW9uKVxuICAgIGNvbnN0IHBpdGNoQmVuZCA9IHRoaXMucGl0Y2hCZW5kKHdoZW4sIGR1cmF0aW9uKVxuXG4gICAgY29uc3QgYm9keUdhaW4gPSB0aGlzLmNvbnRleHQuY3JlYXRlR2FpbigpXG4gICAgYm9keUdhaW4uZ2Fpbi52YWx1ZSA9IDFcblxuICAgIGNvbnN0IHBpdGNoQmVuZEdhaW4gPSB0aGlzLmNvbnRleHQuY3JlYXRlR2FpbigpXG4gICAgcGl0Y2hCZW5kR2Fpbi5nYWluLnZhbHVlID0gMVxuXG4gICAgY29uc3QgdmNhID0gdGhpcy5jb250ZXh0LmNyZWF0ZUdhaW4oKVxuICAgIHZjYS5nYWluLnNldFZhbHVlQXRUaW1lKDEwLCB3aGVuKVxuICAgIHZjYS5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIHdoZW4gKyBkdXJhdGlvbilcblxuICAgIGJvZHkuY29ubmVjdChib2R5R2FpbilcbiAgICBwaXRjaEJlbmQuY29ubmVjdChwaXRjaEJlbmRHYWluKVxuICAgIGJvZHlHYWluLmNvbm5lY3QodmNhKVxuICAgIHBpdGNoQmVuZEdhaW4uY29ubmVjdCh2Y2EpXG4gICAgdmNhLmNvbm5lY3QodGhpcy5kZXN0aW5hdGlvbilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNzRHJ1bVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBhcHAvQmFzc0RydW0uanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQUdBIiwic291cmNlUm9vdCI6IiJ9");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _BassDrum = __webpack_require__(0);\n\nvar _BassDrum2 = _interopRequireDefault(_BassDrum);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar context = new AudioContext();\n\nvar master = context.createGain();\nmaster.gain.value = 0.1;\nmaster.connect(context.destination);\n\nvar bassDrum = new _BassDrum2.default(context, master);\n\nvar bpm = 120;\n\nvar secondsPerBeat = 60 / bpm;\nvar next = context.currentTime;\nbassDrum.playSound(next);\n\nfunction loop() {\n  if (context.currentTime >= next) {\n    next += secondsPerBeat;\n    bassDrum.playSound(next);\n  }\n  setTimeout(loop, 50);\n}\nloop();//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9hcHAvaW5kZXguanM/MjAxOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzc0RydW0gZnJvbSAnLi9CYXNzRHJ1bSdcblxuY29uc3QgY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKVxuXG5jb25zdCBtYXN0ZXIgPSBjb250ZXh0LmNyZWF0ZUdhaW4oKVxubWFzdGVyLmdhaW4udmFsdWUgPSAwLjFcbm1hc3Rlci5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pXG5cbmNvbnN0IGJhc3NEcnVtID0gbmV3IEJhc3NEcnVtKGNvbnRleHQsIG1hc3RlcilcblxuY29uc3QgYnBtID0gMTIwXG5cbmNvbnN0IHNlY29uZHNQZXJCZWF0ID0gNjAgLyBicG1cbmxldCBuZXh0ID0gY29udGV4dC5jdXJyZW50VGltZVxuYmFzc0RydW0ucGxheVNvdW5kKG5leHQpXG5cbmZ1bmN0aW9uIGxvb3AoKSB7XG4gIGlmIChjb250ZXh0LmN1cnJlbnRUaW1lID49IG5leHQpIHtcbiAgICBuZXh0ICs9IHNlY29uZHNQZXJCZWF0XG4gICAgYmFzc0RydW0ucGxheVNvdW5kKG5leHQpXG4gIH1cbiAgc2V0VGltZW91dChsb29wLCA1MClcbn1cbmxvb3AoKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBhcHAvaW5kZXguanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ })
/******/ ]);
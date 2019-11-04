/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([297,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(298);
module.exports = __webpack_require__(579);


/***/ }),

/***/ 504:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(505);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(507)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 505:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(506)(false);
// Module
exports.push([module.i, "::-webkit-scrollbar {\n  width: 0px;\n  /* Remove scrollbar space */\n  background: transparent;\n  /* Optional: just make scrollbar invisible */ }\n\n/* Optional: show position indicator in red */\n::-webkit-scrollbar-thumb {\n  background: #FF0000; }\n\nbody.noScroll {\n  overflow: hidden; }\n\n.bottomRow {\n  position: absolute;\n  bottom: 80px;\n  left: 0;\n  right: 0;\n  margin: 0;\n  text-align: center; }\n\n.mainLabel {\n  color: white;\n  font-size: 40px;\n  margin-bottom: 50px;\n  font-weight: bold; }\n\n.mainInput {\n  text-indent: 10px !important;\n  background: white !important;\n  color: black !important;\n  height: 2.24em !important;\n  margin: 0 !important; }\n\n.MainCarouselButtons {\n  color: white;\n  background: rgba(53, 76, 43, 0.7); }\n  .MainCarouselButtons:hover {\n    background: rgba(198, 179, 83, 0.7); }\n\n.indicator-item.active {\n  background: rgba(198, 179, 83, 0.8) !important; }\n\n.mainSubmit {\n  color: white !important;\n  background: #c6b353;\n  padding: 0 20px; }\n  .mainSubmit:hover {\n    cursor: pointer;\n    background: #354c2b !important;\n    color: #c6b353 !important; }\n\n.specialsCarousel {\n  height: 60%;\n  margin-top: 50px;\n  width: 80%;\n  margin: 50px auto !important; }\n\n.blackBox {\n  background: black;\n  opacity: .6;\n  width: 50%;\n  padding: 20px;\n  color: white; }\n\n.colFlex {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-flow: column; }\n\n@media (max-width: 600px) {\n  .specialsCarousel {\n    width: 100%; }\n  .blackBox {\n    width: 75%; } }\n\n.eventsCol {\n  position: relative;\n  max-height: 300px;\n  padding: 0 !important;\n  overflow: hidden; }\n  .eventsCol:hover .imageText {\n    display: block;\n    cursor: pointer; }\n  .eventsCol:hover .eventPics {\n    filter: blur(2px);\n    transform: scale(1.2, 1.2); }\n\n.eventPics {\n  width: 100%;\n  height: auto;\n  display: block;\n  maxWidth: 100%; }\n\n.imageText {\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: none;\n  position: absolute;\n  top: 0;\n  color: white;\n  padding: 20% 0;\n  text-align: center;\n  -webkit-transform: none;\n  -ms-transform: none;\n  transform: none;\n  -webkit-filter: none;\n  filter: none; }\n\n.row {\n  margin: 0 !important;\n  padding: 0 !important; }\n\n.input-field {\n  width: 100%;\n  border-radius: 10px;\n  margin: 10px 0 !important;\n  padding: 0 !important;\n  position: relative; }\n  .input-field label {\n    left: 2em !important; }\n  .input-field input {\n    text-indent: 20px; }\n  .input-field .helper-text {\n    top: 6px; }\n  .input-field input, .input-field textarea {\n    box-shadow: 4px 4px 0px rgba(37, 95, 46, 0.5) !important;\n    border: none !important;\n    background: #b5832714 !important;\n    color: #9c9f83 !important;\n    margin: 0 !important; }\n\n.contact_email {\n  height: 4.7em; }\n\n.formRow {\n  background: #fefbdd;\n  height: 50vh; }\n\n.form_item {\n  text-align: center;\n  height: 90%;\n  position: relative; }\n\n.form_inputs {\n  height: 60%;\n  position: absolute;\n  width: 80%;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%); }\n\n.formSubmit {\n  width: 80%;\n  position: absolute !important;\n  bottom: 50px;\n  left: 0;\n  color: white !important;\n  background: rgba(60, 125, 49, 0.32) !important;\n  box-shadow: 5px 6px 0px 0px #8aab84; }\n  .formSubmit:hover {\n    background: rgba(198, 179, 83, 0.7) !important;\n    box-shadow: 5px 6px 0px 0px #8aab84 !important; }\n\n.button_1 {\n  left: 0; }\n\n.button_2 {\n  right: 0; }\n\n@media (max-width: 600px) {\n  .form_item {\n    height: 50%; }\n  .formRow {\n    height: 100vh; } }\n\n.footerRow {\n  background: #869f83;\n  color: white;\n  padding: 0px 30px !important; }\n\n.footerContent {\n  font-size: 12px !important;\n  position: relative; }\n\n#email {\n  margin-top: 15px; }\n\n#links {\n  margin-top: 15px; }\n\n.icons {\n  float: right !important;\n  padding: 23px 10px !important;\n  font-size: 18px !important; }\n  .icons:hover {\n    color: rgba(198, 179, 83, 0.7);\n    background: none !important; }\n\n.navInputs {\n  border: none !important;\n  width: 40% !important;\n  height: 100% !important;\n  text-indent: 20px; }\n\n.mainNav {\n  z-index: 999;\n  position: fixed;\n  background: rgba(41, 66, 26, 0.7); }\n\n.mainLogo {\n  height: 100% !important;\n  border: none !important;\n  width: fit-content !important;\n  font-family: lobster;\n  font-size: 25px !important;\n  cursor: pointer; }\n  .mainLogo:hover {\n    color: rgba(198, 179, 83, 0.7) !important; }\n\n.burger {\n  float: right !important;\n  padding: 23px 10px;\n  font-size: 20px;\n  margin: 0 !important;\n  cursor: pointer; }\n  .burger:hover {\n    color: rgba(198, 179, 83, 0.7);\n    background: none !important; }\n\n#nav-mobile div {\n  display: inline; }\n\n.navSide {\n  background: #3f4624;\n  opacity: .7; }\n  .navSide a {\n    color: white !important; }\n    .navSide a:hover {\n      color: rgba(198, 179, 83, 0.7) !important; }\n\n.menuCarousel {\n  height: -webkit-fill-available;\n  width: 80vw;\n  margin: 0 auto;\n  overflow-y: scroll; }\n  .menuCarousel .carousel-item {\n    opacity: 0 !important; }\n    .menuCarousel .carousel-item.active {\n      opacity: 1 !important;\n      height: fit-content; }\n\n.menuSlider {\n  height: 30vh !important; }\n  .menuSlider .slides {\n    height: 30vh !important; }\n\n.mainCover {\n  background-size: cover;\n  background-position: center;\n  background-Repeat: no-repeat;\n  background-origin: padding-box; }\n\n.centerFlex {\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n  .centerFlex .input-field input {\n    text-indent: 10px !important;\n    background: white !important;\n    color: black !important;\n    height: 2.24em !important;\n    margin: 0 !important; }\n  .centerFlex .input-field .helper-text {\n    display: none !important; }\n\n.fullScreen {\n  height: 100vh !important;\n  width: 100vw !important; }\n\n.menu {\n  margin: 0px 15px; }\n\n.centerHorizantal {\n  position: relative;\n  left: 50% !important;\n  transform: translateX(-50%); }\n\n.centerVertical {\n  position: relative;\n  top: 50%;\n  left: 0;\n  transform: translateY(-50%); }\n", ""]);



/***/ }),

/***/ 510:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 164,
	"./af.js": 164,
	"./ar": 165,
	"./ar-dz": 166,
	"./ar-dz.js": 166,
	"./ar-kw": 167,
	"./ar-kw.js": 167,
	"./ar-ly": 168,
	"./ar-ly.js": 168,
	"./ar-ma": 169,
	"./ar-ma.js": 169,
	"./ar-sa": 170,
	"./ar-sa.js": 170,
	"./ar-tn": 171,
	"./ar-tn.js": 171,
	"./ar.js": 165,
	"./az": 172,
	"./az.js": 172,
	"./be": 173,
	"./be.js": 173,
	"./bg": 174,
	"./bg.js": 174,
	"./bm": 175,
	"./bm.js": 175,
	"./bn": 176,
	"./bn.js": 176,
	"./bo": 177,
	"./bo.js": 177,
	"./br": 178,
	"./br.js": 178,
	"./bs": 179,
	"./bs.js": 179,
	"./ca": 180,
	"./ca.js": 180,
	"./cs": 181,
	"./cs.js": 181,
	"./cv": 182,
	"./cv.js": 182,
	"./cy": 183,
	"./cy.js": 183,
	"./da": 184,
	"./da.js": 184,
	"./de": 185,
	"./de-at": 186,
	"./de-at.js": 186,
	"./de-ch": 187,
	"./de-ch.js": 187,
	"./de.js": 185,
	"./dv": 188,
	"./dv.js": 188,
	"./el": 189,
	"./el.js": 189,
	"./en-SG": 190,
	"./en-SG.js": 190,
	"./en-au": 191,
	"./en-au.js": 191,
	"./en-ca": 192,
	"./en-ca.js": 192,
	"./en-gb": 193,
	"./en-gb.js": 193,
	"./en-ie": 194,
	"./en-ie.js": 194,
	"./en-il": 195,
	"./en-il.js": 195,
	"./en-nz": 196,
	"./en-nz.js": 196,
	"./eo": 197,
	"./eo.js": 197,
	"./es": 198,
	"./es-do": 199,
	"./es-do.js": 199,
	"./es-us": 200,
	"./es-us.js": 200,
	"./es.js": 198,
	"./et": 201,
	"./et.js": 201,
	"./eu": 202,
	"./eu.js": 202,
	"./fa": 203,
	"./fa.js": 203,
	"./fi": 204,
	"./fi.js": 204,
	"./fo": 205,
	"./fo.js": 205,
	"./fr": 206,
	"./fr-ca": 207,
	"./fr-ca.js": 207,
	"./fr-ch": 208,
	"./fr-ch.js": 208,
	"./fr.js": 206,
	"./fy": 209,
	"./fy.js": 209,
	"./ga": 210,
	"./ga.js": 210,
	"./gd": 211,
	"./gd.js": 211,
	"./gl": 212,
	"./gl.js": 212,
	"./gom-latn": 213,
	"./gom-latn.js": 213,
	"./gu": 214,
	"./gu.js": 214,
	"./he": 215,
	"./he.js": 215,
	"./hi": 216,
	"./hi.js": 216,
	"./hr": 217,
	"./hr.js": 217,
	"./hu": 218,
	"./hu.js": 218,
	"./hy-am": 219,
	"./hy-am.js": 219,
	"./id": 220,
	"./id.js": 220,
	"./is": 221,
	"./is.js": 221,
	"./it": 222,
	"./it-ch": 223,
	"./it-ch.js": 223,
	"./it.js": 222,
	"./ja": 224,
	"./ja.js": 224,
	"./jv": 225,
	"./jv.js": 225,
	"./ka": 226,
	"./ka.js": 226,
	"./kk": 227,
	"./kk.js": 227,
	"./km": 228,
	"./km.js": 228,
	"./kn": 229,
	"./kn.js": 229,
	"./ko": 230,
	"./ko.js": 230,
	"./ku": 231,
	"./ku.js": 231,
	"./ky": 232,
	"./ky.js": 232,
	"./lb": 233,
	"./lb.js": 233,
	"./lo": 234,
	"./lo.js": 234,
	"./lt": 235,
	"./lt.js": 235,
	"./lv": 236,
	"./lv.js": 236,
	"./me": 237,
	"./me.js": 237,
	"./mi": 238,
	"./mi.js": 238,
	"./mk": 239,
	"./mk.js": 239,
	"./ml": 240,
	"./ml.js": 240,
	"./mn": 241,
	"./mn.js": 241,
	"./mr": 242,
	"./mr.js": 242,
	"./ms": 243,
	"./ms-my": 244,
	"./ms-my.js": 244,
	"./ms.js": 243,
	"./mt": 245,
	"./mt.js": 245,
	"./my": 246,
	"./my.js": 246,
	"./nb": 247,
	"./nb.js": 247,
	"./ne": 248,
	"./ne.js": 248,
	"./nl": 249,
	"./nl-be": 250,
	"./nl-be.js": 250,
	"./nl.js": 249,
	"./nn": 251,
	"./nn.js": 251,
	"./pa-in": 252,
	"./pa-in.js": 252,
	"./pl": 253,
	"./pl.js": 253,
	"./pt": 254,
	"./pt-br": 255,
	"./pt-br.js": 255,
	"./pt.js": 254,
	"./ro": 256,
	"./ro.js": 256,
	"./ru": 257,
	"./ru.js": 257,
	"./sd": 258,
	"./sd.js": 258,
	"./se": 259,
	"./se.js": 259,
	"./si": 260,
	"./si.js": 260,
	"./sk": 261,
	"./sk.js": 261,
	"./sl": 262,
	"./sl.js": 262,
	"./sq": 263,
	"./sq.js": 263,
	"./sr": 264,
	"./sr-cyrl": 265,
	"./sr-cyrl.js": 265,
	"./sr.js": 264,
	"./ss": 266,
	"./ss.js": 266,
	"./sv": 267,
	"./sv.js": 267,
	"./sw": 268,
	"./sw.js": 268,
	"./ta": 269,
	"./ta.js": 269,
	"./te": 270,
	"./te.js": 270,
	"./tet": 271,
	"./tet.js": 271,
	"./tg": 272,
	"./tg.js": 272,
	"./th": 273,
	"./th.js": 273,
	"./tl-ph": 274,
	"./tl-ph.js": 274,
	"./tlh": 275,
	"./tlh.js": 275,
	"./tr": 276,
	"./tr.js": 276,
	"./tzl": 277,
	"./tzl.js": 277,
	"./tzm": 278,
	"./tzm-latn": 279,
	"./tzm-latn.js": 279,
	"./tzm.js": 278,
	"./ug-cn": 280,
	"./ug-cn.js": 280,
	"./uk": 281,
	"./uk.js": 281,
	"./ur": 282,
	"./ur.js": 282,
	"./uz": 283,
	"./uz-latn": 284,
	"./uz-latn.js": 284,
	"./uz.js": 283,
	"./vi": 285,
	"./vi.js": 285,
	"./x-pseudo": 286,
	"./x-pseudo.js": 286,
	"./yo": 287,
	"./yo.js": 287,
	"./zh-cn": 288,
	"./zh-cn.js": 288,
	"./zh-hk": 289,
	"./zh-hk.js": 289,
	"./zh-tw": 290,
	"./zh-tw.js": 290
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 510;

/***/ }),

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(61);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js
var react_router_dom = __webpack_require__(124);

// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js + 1 modules
var react_router = __webpack_require__(48);

// EXTERNAL MODULE: ./src/styles.scss
var styles = __webpack_require__(504);

// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__(1);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// EXTERNAL MODULE: ./node_modules/react-materialize/lib/index.js
var lib = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/react-router-hash-link/lib/index.js
var react_router_hash_link_lib = __webpack_require__(19);

// CONCATENATED MODULE: ./src/components/MainSlideTop.jsx




/* harmony default export */ var MainSlideTop = (function (props) {
  var emailField = "bryan was here";
  var valid = false;

  var emailChange = function emailChange(e) {
    emailField = e.target.value;
    valid = e.target.validity.valid;
  };

  var submitEmail = function submitEmail() {
    if (valid) {
      fetch("api/signup", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailField,
          date: moment_default()().format("YYYY-MM-DD HH:mm:ss")
        })
      }).then(function (res) {
        document.getElementById("emailInput").value = "";
        res.json().then(function (data) {
          if (data === "success") {
            M.toast({
              html: "Thanks for signing up",
              classes: 'rounded amber darken-1'
            });
          } else {
            M.toast({
              html: "Email already signed up, please try again",
              classes: 'rounded red darken-3'
            });
          }
        });
      });
    } else {
      document.getElementById("emailInput").value = "";
      M.toast({
        html: "Please enter a valid email",
        classes: 'rounded red darken-3'
      });
    }
  };

  return react_default.a.createElement("div", null, react_default.a.createElement("label", {
    htmlFor: "#mainDisplay",
    className: "mainLabel"
  }, props.data.centerBox.title), react_default.a.createElement("div", {
    className: "centerFlex",
    id: "mainDisplay"
  }, props.data.centerBox.type == 'input' ? react_default.a.createElement("div", {
    className: "centerFlex",
    style: {
      marginTop: "10px"
    }
  }, react_default.a.createElement(lib["Button"], {
    className: "btn mainSubmit",
    type: "submit",
    onClick: function onClick() {
      return submitEmail(emailField);
    },
    waves: "light"
  }, "Send"), react_default.a.createElement(lib["TextInput"], {
    id: "emailInput",
    onChange: function onChange() {
      return emailChange(event);
    },
    email: true,
    validate: true,
    error: "Please Enter Valid Email",
    placeholder: props.data.centerBox.subTitle
  })) : react_default.a.createElement(react_router_hash_link_lib["HashLink"], {
    to: props.data.centerBox.hash
  }, react_default.a.createElement(lib["Button"], {
    className: "btn mainSubmit"
  }, props.data.centerBox.subTitle))));
});
// CONCATENATED MODULE: ./src/components/MainSlideBottom.jsx



/* harmony default export */ var MainSlideBottom = (function (props) {
  return react_default.a.createElement("div", {
    className: "bottomRow"
  }, props.data.bottomMenu.map(function (a, b) {
    return react_default.a.createElement(react_router_hash_link_lib["HashLink"], {
      to: "/".concat(a.hash),
      smooth: true
    }, react_default.a.createElement(lib["Button"], {
      key: a.title,
      className: "MainCarouselButtons",
      style: {
        margin: b == 1 ? "0 15px" : "0"
      }
    }, a.title));
  }));
});
// CONCATENATED MODULE: ./src/components/MainSlide.jsx




/* harmony default export */ var MainSlide = (function (props) {
  return react_default.a.createElement(lib["Slider"], {
    fullscreen: true,
    options: {
      indicators: true,
      interval: 10000
    }
  }, " ", props.data.map(function (x) {
    return react_default.a.createElement(lib["Slide"], {
      key: x.image,
      image: react_default.a.createElement("img", {
        src: x.image
      })
    }, react_default.a.createElement(lib["Caption"], {
      style: {
        top: "32vh"
      }
    }, react_default.a.createElement(MainSlideTop, {
      data: x
    })), react_default.a.createElement(MainSlideBottom, {
      data: x
    }));
  }));
});
// CONCATENATED MODULE: ./src/components/Main.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var Main_Main =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main(props) {
    var _this;

    _classCallCheck(this, Main);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Main).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "fetchData", function () {
      fetch("api/get?id=2").then(function (blob) {
        return blob.json();
      }).then(function (data) {
        _this.setState({
          main: _toConsumableArray(data.data.filter(function (x) {
            return x.page == _this.props.page;
          }))
        }, function () {
          console.log(_this.state.main);
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderCarousel", function () {
      return react_default.a.createElement(MainSlide, {
        data: _this.state.main
      });
    });

    _this._isMounted = false;
    _this.state = {
      main: []
    };
    return _this;
  }

  _createClass(Main, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
      this.fetchData();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      return react_default.a.createElement("div", {
        className: "fullScreen",
        id: "main"
      }, this._isMounted ? this.renderCarousel() : react_default.a.createElement("div", null, "not loaded"));
    }
  }]);

  return Main;
}(react_default.a.Component);


// CONCATENATED MODULE: ./src/components/SpecialsCarousel.jsx


/* harmony default export */ var SpecialsCarousel = (function (props) {
  return react_default.a.createElement(lib["Carousel"], {
    options: {
      indicators: true
    },
    className: "specialsCarousel"
  }, props.data.map(function (x) {
    return react_default.a.createElement("div", {
      key: x.subMenuA,
      className: "mainCover centerFlex",
      style: {
        width: "80%",
        height: "100%",
        backgroundImage: "url(".concat(x.image, ")")
      }
    }, react_default.a.createElement("div", {
      className: "blackBox"
    }, react_default.a.createElement("label", {
      style: {
        fontSize: "20px",
        color: "white"
      }
    }, x.title), react_default.a.createElement("div", null, x.subMenuA), react_default.a.createElement("div", null, x.subMenuB)));
  }));
});
// CONCATENATED MODULE: ./src/components/Specials.jsx
function Specials_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Specials_typeof = function _typeof(obj) { return typeof obj; }; } else { Specials_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Specials_typeof(obj); }

function Specials_toConsumableArray(arr) { return Specials_arrayWithoutHoles(arr) || Specials_iterableToArray(arr) || Specials_nonIterableSpread(); }

function Specials_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Specials_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Specials_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Specials_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Specials_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Specials_createClass(Constructor, protoProps, staticProps) { if (protoProps) Specials_defineProperties(Constructor.prototype, protoProps); if (staticProps) Specials_defineProperties(Constructor, staticProps); return Constructor; }

function Specials_possibleConstructorReturn(self, call) { if (call && (Specials_typeof(call) === "object" || typeof call === "function")) { return call; } return Specials_assertThisInitialized(self); }

function Specials_getPrototypeOf(o) { Specials_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Specials_getPrototypeOf(o); }

function Specials_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Specials_setPrototypeOf(subClass, superClass); }

function Specials_setPrototypeOf(o, p) { Specials_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Specials_setPrototypeOf(o, p); }

function Specials_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Specials_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Specials_Specials =
/*#__PURE__*/
function (_React$Component) {
  Specials_inherits(Specials, _React$Component);

  function Specials(props) {
    var _this;

    Specials_classCallCheck(this, Specials);

    _this = Specials_possibleConstructorReturn(this, Specials_getPrototypeOf(Specials).call(this, props));

    Specials_defineProperty(Specials_assertThisInitialized(Specials_assertThisInitialized(_this)), "fetchData", function () {
      fetch("api/get?id=3").then(function (blob) {
        return blob.json();
      }).then(function (data) {
        _this.setState({
          specials: Specials_toConsumableArray(data.data.slides)
        });
      });
    });

    Specials_defineProperty(Specials_assertThisInitialized(Specials_assertThisInitialized(_this)), "renderCarousel", function () {
      return react_default.a.createElement(SpecialsCarousel, {
        data: _this.state.specials
      });
    });

    _this._isMounted = false;
    _this.state = {
      specials: []
    };
    return _this;
  }

  Specials_createClass(Specials, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
      this.fetchData();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      return react_default.a.createElement("div", {
        id: "specials",
        className: "Container fullScreen colFlex",
        style: {
          textAlign: "center"
        }
      }, react_default.a.createElement("h1", null, "Daily Specials"), this._isMounted ? this.renderCarousel() : react_default.a.createElement("div", null, "not loaded"));
    }
  }]);

  return Specials;
}(react_default.a.Component);

/* harmony default export */ var components_Specials = (Specials_Specials);
// CONCATENATED MODULE: ./src/components/Events.jsx
function Events_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Events_typeof = function _typeof(obj) { return typeof obj; }; } else { Events_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Events_typeof(obj); }

function Events_toConsumableArray(arr) { return Events_arrayWithoutHoles(arr) || Events_iterableToArray(arr) || Events_nonIterableSpread(); }

function Events_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Events_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Events_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Events_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Events_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Events_createClass(Constructor, protoProps, staticProps) { if (protoProps) Events_defineProperties(Constructor.prototype, protoProps); if (staticProps) Events_defineProperties(Constructor, staticProps); return Constructor; }

function Events_possibleConstructorReturn(self, call) { if (call && (Events_typeof(call) === "object" || typeof call === "function")) { return call; } return Events_assertThisInitialized(self); }

function Events_getPrototypeOf(o) { Events_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Events_getPrototypeOf(o); }

function Events_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Events_setPrototypeOf(subClass, superClass); }

function Events_setPrototypeOf(o, p) { Events_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Events_setPrototypeOf(o, p); }

function Events_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Events_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Events_Events =
/*#__PURE__*/
function (_React$Component) {
  Events_inherits(Events, _React$Component);

  function Events(props) {
    var _this;

    Events_classCallCheck(this, Events);

    _this = Events_possibleConstructorReturn(this, Events_getPrototypeOf(Events).call(this, props));

    Events_defineProperty(Events_assertThisInitialized(Events_assertThisInitialized(_this)), "fetchData", function () {
      fetch("api/get?id=4").then(function (blob) {
        return blob.json();
      }).then(function (data) {
        _this.setState({
          Events: Events_toConsumableArray(data.data)
        });
      });
    });

    Events_defineProperty(Events_assertThisInitialized(Events_assertThisInitialized(_this)), "renderEvents", function () {
      return _this.state.Events.map(function (x, y) {
        return react_default.a.createElement(react_router_hash_link_lib["HashLink"], {
          to: x.hash
        }, react_default.a.createElement(lib["Col"], {
          key: x.image,
          s: 12,
          m: 12 / _this.state.Events.length,
          className: "eventsCol"
        }, react_default.a.createElement("img", {
          src: x.image,
          className: "eventPics"
        }), react_default.a.createElement("div", {
          className: "imageText"
        }, x.title)));
      });
    });

    _this._isMounted = false;
    _this.state = {
      Events: ''
    };
    return _this;
  }

  Events_createClass(Events, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
      this.fetchData();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      return react_default.a.createElement(lib["Row"], null, this._isMounted ? this.renderEvents() : react_default.a.createElement("div", null, "Not Loaded"));
    }
  }]);

  return Events;
}(react_default.a.Component);


// CONCATENATED MODULE: ./src/components/FormInputs.jsx



/* harmony default export */ var FormInputs = (function (props) {
  var date = {
    target: {
      dataset: {
        type: "appointment_date"
      },
      validity: {
        valid: true
      },
      value: ""
    }
  };
  var time = {
    target: {
      dataset: {
        type: "appointment_time"
      },
      validity: {
        valid: true
      },
      value: ""
    }
  };

  switch (props.data.type) {
    case "datePicker":
      return react_default.a.createElement(lib["DatePicker"], {
        id: props.data.id,
        "data-type": props.data.id,
        placeholder: props.data.title,
        options: {
          container: "body",
          onSelect: function onSelect(x) {
            return date.target.value = moment_default()(x).format("YYYY-MM-DD");
          },
          onClose: function onClose() {
            return $("#" + props.data.id)[0].value ? props.func(date, props.data) : date = date;
          },
          disableDayFn: function disableDayFn(x, y) {
            if (x < moment_default()()) {
              return true;
            }
          }
        }
      });
      break;

    case "timePicker":
      return react_default.a.createElement(lib["TimePicker"], {
        id: props.data.id,
        "data-type": props.data.id,
        placeholder: props.data.title,
        options: {
          container: "body",
          onCloseEnd: function onCloseEnd() {
            if ($("#" + props.data.id)[0].value) {
              var el = $("#" + props.data.id)[0].value;
              var momented = moment_default()(el, "hh:mm a").format("HH:mm:ss");
              time.target.value = momented;
              props.func(time, props.data);
            } else time = time;
          }
        }
      });
      break;

    case "email":
      return react_default.a.createElement(lib["TextInput"], {
        defaultValue: props.value,
        "data-type": props.data.id,
        onChange: function onChange() {
          return props.func(event, props.data);
        },
        email: true,
        validate: true,
        placeholder: props.data.title,
        error: "Please Enter Valid Email"
      });
      break;

    case "textarea":
      return react_default.a.createElement(lib["Textarea"], {
        defaultValue: props.value,
        "data-type": props.data.id,
        onChange: function onChange() {
          return props.func(event, props.data);
        },
        placeholder: props.data.title,
        style: {
          height: '6.3em',
          maxHeight: '6.3em',
          padding: "10px"
        },
        id: "FormTextArea"
      });
      break;

    case "sizePicker":
      return react_default.a.createElement(lib["TextInput"], {
        defaultValue: props.value,
        "data-type": props.data.id,
        onChange: function onChange() {
          return props.func(event, props.data);
        },
        placeholder: props.data.title
      });
      break;

    default:
      return react_default.a.createElement(lib["TextInput"], {
        defaultValue: props.value,
        "data-type": props.data.id,
        onChange: function onChange() {
          return props.func(event, props.data);
        },
        placeholder: props.data.title
      });
  }
});
// CONCATENATED MODULE: ./src/components/Form.jsx
function Form_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Form_typeof = function _typeof(obj) { return typeof obj; }; } else { Form_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Form_typeof(obj); }

function Form_toConsumableArray(arr) { return Form_arrayWithoutHoles(arr) || Form_iterableToArray(arr) || Form_nonIterableSpread(); }

function Form_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Form_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Form_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Form_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Form_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Form_createClass(Constructor, protoProps, staticProps) { if (protoProps) Form_defineProperties(Constructor.prototype, protoProps); if (staticProps) Form_defineProperties(Constructor, staticProps); return Constructor; }

function Form_possibleConstructorReturn(self, call) { if (call && (Form_typeof(call) === "object" || typeof call === "function")) { return call; } return Form_assertThisInitialized(self); }

function Form_getPrototypeOf(o) { Form_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Form_getPrototypeOf(o); }

function Form_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Form_setPrototypeOf(subClass, superClass); }

function Form_setPrototypeOf(o, p) { Form_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Form_setPrototypeOf(o, p); }

function Form_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Form_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Form_Forms =
/*#__PURE__*/
function (_React$Component) {
  Form_inherits(Forms, _React$Component);

  function Forms(props) {
    var _this;

    Form_classCallCheck(this, Forms);

    _this = Form_possibleConstructorReturn(this, Form_getPrototypeOf(Forms).call(this, props));

    Form_defineProperty(Form_assertThisInitialized(Form_assertThisInitialized(_this)), "fetchData", function () {
      fetch("api/get?id=5").then(function (blob) {
        return blob.json();
      }).then(function (data) {
        _this.setState({
          Forms: Form_toConsumableArray(data.data)
        });
      });
    });

    Form_defineProperty(Form_assertThisInitialized(Form_assertThisInitialized(_this)), "send", function (type, index) {
      if (Object.keys(_this[type]).length == _this.state.Forms[index].inputs.length && Object.values(_this[type]).every(function (x) {
        return x.length > 0;
      })) {
        if (index == 0 && isNaN(parseInt(_this[type]['appointment_size']))) {
          M.toast({
            html: "Please enter a valid number for your party size",
            classes: 'rounded red darken-3'
          });
        } else {
          var endpoint = type == 'reservation' ? "api/reserve" : "api/contact";
          M.toast({
            html: "Your ".concat(type, " has been sent thank you!"),
            classes: 'rounded amber darken-1'
          });
          fetch("".concat(endpoint), {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              data: _this[type]
            })
          }).then(function (res) {
            if (type == 'email') {
              $("#6").val("");
              $("#email8").val("");
              $("#FormTextArea").val("");
            } else {
              $(".datepicker").val("");
              $(".timepicker").val("");
              $("#4").val("");
              $("#5").val("");
            }
          });
        }
      } else {
        M.toast({
          html: "Please fill in all fields",
          classes: "rounded red darken-3"
        });
      }
    });

    Form_defineProperty(Form_assertThisInitialized(Form_assertThisInitialized(_this)), "fillInput", function (e, data) {
      _this.state.Forms.map(function (x, y) {
        if (y == data.group_id) {
          _this.state.Forms[y].inputs.map(function (a) {
            switch (e.target.dataset.type) {
              case a.id:
                e.target.validity.valid ? _this[x.type][a.id] = e.target.value : e = e;
                break;

              default:
                ;
            }
          });
        }
      });
    });

    Form_defineProperty(Form_assertThisInitialized(Form_assertThisInitialized(_this)), "renderForms", function () {
      return _this.state.Forms.map(function (x, z) {
        return react_default.a.createElement(lib["Col"], {
          s: 12,
          m: 6,
          key: x.type,
          "data-key": x.type,
          className: "form_item"
        }, react_default.a.createElement("span", {
          style: {
            top: "35px",
            position: 'relative',
            textAlign: "center",
            color: "#9c9f83"
          }
        }, x.title), react_default.a.createElement("div", {
          className: "form_inputs"
        }, x.inputs.map(function (y) {
          return y.span == 12 ? react_default.a.createElement(lib["Row"], {
            key: y.title
          }, react_default.a.createElement(lib["Col"], {
            s: parseInt(y.span),
            m: parseInt(y.span),
            className: y.id
          }, react_default.a.createElement(FormInputs, {
            data: y,
            func: _this.fillInput,
            value: _this[x.type][y.id]
          }))) : react_default.a.createElement(lib["Col"], {
            key: y.title,
            s: parseInt(y.span),
            m: parseInt(y.span),
            className: y.id
          }, react_default.a.createElement(FormInputs, {
            data: y,
            func: _this.fillInput,
            value: _this[x.type][y.id]
          }));
        })), react_default.a.createElement(lib["Button"], {
          className: "button_".concat(x.id, " centerHorizantal formSubmit"),
          onClick: function onClick() {
            return _this.send(x.type, z);
          }
        }, "Send"));
      });
    });

    _this._isMounted = false;
    _this.email = {};
    _this.reservation = {};
    _this.state = {
      Forms: []
    };
    return _this;
  }

  Form_createClass(Forms, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
      this.fetchData();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      return react_default.a.createElement(lib["Row"], {
        className: "formRow",
        id: "forms"
      }, this._isMounted ? this.renderForms() : react_default.a.createElement("div", null, "Error Loading"));
    }
  }]);

  return Forms;
}(react_default.a.Component);


// CONCATENATED MODULE: ./src/components/NavSideNav.jsx



/* harmony default export */ var NavSideNav = (function (props) {
  var closeEmUp = function closeEmUp() {
    M.Sidenav._sidenavs[0]._closeBound();
  };

  return react_default.a.createElement("div", null, react_default.a.createElement(lib["SideNav"], {
    trigger: props.trig,
    className: "navSide",
    options: {
      closeOnClick: true,
      edge: "right",
      draggable: true
    }
  }, react_default.a.createElement(lib["SideNavItem"], {
    userView: true
  }), react_default.a.createElement(lib["SideNavItem"], {
    waves: true
  }, react_default.a.createElement(react_router_hash_link_lib["HashLink"], {
    to: "/#main",
    onClick: closeEmUp
  }, "Home")), react_default.a.createElement(lib["SideNavItem"], {
    waves: true
  }, react_default.a.createElement(react_router_hash_link_lib["HashLink"], {
    to: "/#specials",
    smooth: true,
    onClick: closeEmUp
  }, "Specials")), react_default.a.createElement(lib["SideNavItem"], {
    divider: true
  }), react_default.a.createElement(lib["SideNavItem"], {
    href: "menu"
  }, react_default.a.createElement(react_router_hash_link_lib["HashLink"], {
    to: "/menu",
    onClick: closeEmUp
  }, "Menu")), react_default.a.createElement(lib["SideNavItem"], {
    waves: true
  }, react_default.a.createElement(react_router_hash_link_lib["HashLink"], {
    to: "/#forms",
    smooth: true,
    onClick: closeEmUp
  }, "Reserve"))));
});
// CONCATENATED MODULE: ./src/components/Nav.jsx
function Nav_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Nav_typeof = function _typeof(obj) { return typeof obj; }; } else { Nav_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Nav_typeof(obj); }

function Nav_toConsumableArray(arr) { return Nav_arrayWithoutHoles(arr) || Nav_iterableToArray(arr) || Nav_nonIterableSpread(); }

function Nav_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Nav_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Nav_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Nav_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Nav_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Nav_createClass(Constructor, protoProps, staticProps) { if (protoProps) Nav_defineProperties(Constructor.prototype, protoProps); if (staticProps) Nav_defineProperties(Constructor, staticProps); return Constructor; }

function Nav_possibleConstructorReturn(self, call) { if (call && (Nav_typeof(call) === "object" || typeof call === "function")) { return call; } return Nav_assertThisInitialized(self); }

function Nav_getPrototypeOf(o) { Nav_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Nav_getPrototypeOf(o); }

function Nav_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Nav_setPrototypeOf(subClass, superClass); }

function Nav_setPrototypeOf(o, p) { Nav_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Nav_setPrototypeOf(o, p); }

function Nav_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Nav_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var Nav_Nav =
/*#__PURE__*/
function (_React$Component) {
  Nav_inherits(Nav, _React$Component);

  function Nav(props) {
    var _this;

    Nav_classCallCheck(this, Nav);

    _this = Nav_possibleConstructorReturn(this, Nav_getPrototypeOf(Nav).call(this, props));

    Nav_defineProperty(Nav_assertThisInitialized(Nav_assertThisInitialized(_this)), "updateNav", function (data) {
      _this.setState({
        nav: Nav_toConsumableArray(data.data),
        title: data.title
      });
    });

    Nav_defineProperty(Nav_assertThisInitialized(Nav_assertThisInitialized(_this)), "checkDisabled", function (value) {
      // if(value == 1) {
      return true; // } else {
      // return false
      // }
    });

    Nav_defineProperty(Nav_assertThisInitialized(Nav_assertThisInitialized(_this)), "handleChange", function (e) {// let nav = this.state.nav
      // nav.forEach(x => x.id == e.target.dataset.key ? x.icon = e.target.value : x.icon = x.icon)
      // if(e.target.dataset.key == "submitChange") {
      //   this.setState({nav: nav})
      //   fetch("api/update", {
      //     method:"PUT",
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       id:'1',
      //       data:this.state.nav
      //     })
      //   }).then(res => console.log(res))
      // <Button onClick={this.handleChange} data-key = "submitChange"></Button>
      // }
    });

    _this.state = {
      nav: [],
      title: ''
    };
    return _this;
  }

  Nav_createClass(Nav, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch("api/get?id=1").then(function (blob) {
        return blob.json();
      }).then(function (data) {
        data.data.sort(function (x, y) {
          return x.order < y.order ? 1 : -1;
        });

        _this2.updateNav(data);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return react_default.a.createElement("nav", {
        className: "mainNav"
      }, react_default.a.createElement("div", {
        className: "nav-wrapper"
      }, react_default.a.createElement(react_router_hash_link_lib["HashLink"], {
        to: "/#main",
        smooth: true
      }, react_default.a.createElement("input", {
        className: "brand-logo center mainLogo",
        placeholder: this.state.title,
        disabled: this.checkDisabled()
      })), react_default.a.createElement("ul", {
        id: "nav-mobile"
      }, this.state.nav.map(function (x) {
        return x.position == "left" ? react_default.a.createElement("input", {
          "data-key": x.id,
          onChange: _this3.handleChange,
          key: x.icon,
          className: "hide-on-small-only navInputs",
          placeholder: x.icon,
          disabled: _this3.checkDisabled()
        }) : x.hash ? react_default.a.createElement("a", {
          href: x.hash,
          className: "hide-on-small-only icons"
        }, react_default.a.createElement("li", {
          key: x.icon,
          className: x.icon
        })) : react_default.a.createElement(NavSideNav, {
          trig: react_default.a.createElement("li", {
            key: x.icon,
            className: "".concat(x.icon, " burger")
          })
        });
      }))));
    }
  }]);

  return Nav;
}(react_default.a.Component);


// CONCATENATED MODULE: ./src/components/Home.jsx
function Home_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Home_typeof = function _typeof(obj) { return typeof obj; }; } else { Home_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Home_typeof(obj); }

function Home_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Home_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Home_createClass(Constructor, protoProps, staticProps) { if (protoProps) Home_defineProperties(Constructor.prototype, protoProps); if (staticProps) Home_defineProperties(Constructor, staticProps); return Constructor; }

function Home_possibleConstructorReturn(self, call) { if (call && (Home_typeof(call) === "object" || typeof call === "function")) { return call; } return Home_assertThisInitialized(self); }

function Home_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Home_getPrototypeOf(o) { Home_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Home_getPrototypeOf(o); }

function Home_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Home_setPrototypeOf(subClass, superClass); }

function Home_setPrototypeOf(o, p) { Home_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Home_setPrototypeOf(o, p); }








var Home_Home =
/*#__PURE__*/
function (_React$Component) {
  Home_inherits(Home, _React$Component);

  function Home() {
    Home_classCallCheck(this, Home);

    return Home_possibleConstructorReturn(this, Home_getPrototypeOf(Home).apply(this, arguments));
  }

  Home_createClass(Home, [{
    key: "render",
    value: function render() {
      return react_default.a.createElement("div", null, react_default.a.createElement(Nav_Nav, null), react_default.a.createElement(Main_Main, {
        page: "1"
      }), react_default.a.createElement(components_Specials, null), react_default.a.createElement(Events_Events, null), react_default.a.createElement(Form_Forms, null));
    }
  }]);

  return Home;
}(react_default.a.Component);


// CONCATENATED MODULE: ./src/components/MenuSlider.jsx


/* harmony default export */ var MenuSlider = (function (props) {
  return react_default.a.createElement(lib["Slider"], {
    options: {
      indicators: false
    },
    className: "menuSlider"
  }, " ", props.data.map(function (x) {
    return react_default.a.createElement(lib["Slide"], {
      key: x.image,
      image: react_default.a.createElement("img", {
        src: x.image
      })
    }, react_default.a.createElement(lib["Caption"], {
      style: {
        top: "6em"
      }
    }, react_default.a.createElement("h3", null, "Hungry? ")));
  }));
});
// CONCATENATED MODULE: ./src/components/MenuItems.jsx
function MenuItems_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { MenuItems_typeof = function _typeof(obj) { return typeof obj; }; } else { MenuItems_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return MenuItems_typeof(obj); }

function MenuItems_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MenuItems_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function MenuItems_createClass(Constructor, protoProps, staticProps) { if (protoProps) MenuItems_defineProperties(Constructor.prototype, protoProps); if (staticProps) MenuItems_defineProperties(Constructor, staticProps); return Constructor; }

function MenuItems_possibleConstructorReturn(self, call) { if (call && (MenuItems_typeof(call) === "object" || typeof call === "function")) { return call; } return MenuItems_assertThisInitialized(self); }

function MenuItems_getPrototypeOf(o) { MenuItems_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return MenuItems_getPrototypeOf(o); }

function MenuItems_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) MenuItems_setPrototypeOf(subClass, superClass); }

function MenuItems_setPrototypeOf(o, p) { MenuItems_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return MenuItems_setPrototypeOf(o, p); }

function MenuItems_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function MenuItems_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var MenuItems_MenuItems =
/*#__PURE__*/
function (_React$Component) {
  MenuItems_inherits(MenuItems, _React$Component);

  function MenuItems(props) {
    var _this;

    MenuItems_classCallCheck(this, MenuItems);

    _this = MenuItems_possibleConstructorReturn(this, MenuItems_getPrototypeOf(MenuItems).call(this, props));

    MenuItems_defineProperty(MenuItems_assertThisInitialized(MenuItems_assertThisInitialized(_this)), "switchCar", function (y, x) {
      M.Carousel.getInstance(_this.refs.menuCarousel.instance.el).set(y);
      setTimeout(function () {
        _this.moveMenu(x);
      }, 1000);
    });

    MenuItems_defineProperty(MenuItems_assertThisInitialized(MenuItems_assertThisInitialized(_this)), "moveMenu", function (item) {
      var new_kid = $("#".concat(item))[0];
      new_kid.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    });

    _this._isMounted = false;
    return _this;
  }

  MenuItems_createClass(MenuItems, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return this._isMounted ? react_default.a.createElement("div", {
        style: {
          textAlign: "center",
          margin: "30px 0"
        }
      }, this.props.data.map(function (x, y) {
        return react_default.a.createElement(lib["Button"], {
          key: x.title,
          className: "carControllers",
          onClick: function onClick() {
            return _this2.switchCar(y, x.title.split(" ")[0][0]);
          },
          style: {
            margin: "5px 8px"
          }
        }, x.title);
      }), react_default.a.createElement(lib["Carousel"], {
        ref: "menuCarousel",
        className: "menuCarousel",
        options: {
          fullWidth: true
        }
      }, this.props.data.map(function (x) {
        return react_default.a.createElement("div", {
          key: x.title,
          id: x.title.split(" ").join("")
        }, react_default.a.createElement("div", {
          style: {
            textAlign: "center",
            margin: "30px 0"
          },
          id: x.title.split(" ")[0][0]
        }, " ", x.subtitles.map(function (y) {
          return react_default.a.createElement(lib["Button"], {
            key: y.title,
            style: {
              margin: "8px"
            },
            onClick: function onClick() {
              return _this2.moveMenu(y.title.split(" ").filter(function (x) {
                return x != "&";
              }).join(""));
            }
          }, y.title);
        })), react_default.a.createElement("div", null, " ", x.subtitles.map(function (y, q) {
          return react_default.a.createElement("div", {
            key: y.title,
            style: {
              textAlign: "center"
            },
            id: y.title.split(" ").filter(function (x) {
              return x != "&";
            }).join("")
          }, react_default.a.createElement("h3", null, y.title, react_default.a.createElement("i", {
            className: "material-icons",
            style: {
              margin: "10px",
              fontSize: "32px",
              cursor: "pointer"
            },
            onClick: function onClick() {
              return _this2.moveMenu(x.title.split(" ")[0][0]);
            }
          }, "expand_less")), react_default.a.createElement(lib["Row"], null, y.items.map(function (z) {
            return react_default.a.createElement(lib["Col"], {
              s: 12,
              m: 12,
              l: 6,
              key: z.name,
              style: {
                textAlign: "center",
                height: "8em",
                padding: "10px"
              }
            }, react_default.a.createElement("h6", {
              style: {
                fontWeight: "1000"
              }
            }, z.name, " ", z.price), react_default.a.createElement("div", null, z.text));
          })));
        })));
      }))) : react_default.a.createElement("div", null, "daddys home");
    }
  }]);

  return MenuItems;
}(react_default.a.Component);


// CONCATENATED MODULE: ./src/components/Menu.jsx
function Menu_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Menu_typeof = function _typeof(obj) { return typeof obj; }; } else { Menu_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Menu_typeof(obj); }

function Menu_toConsumableArray(arr) { return Menu_arrayWithoutHoles(arr) || Menu_iterableToArray(arr) || Menu_nonIterableSpread(); }

function Menu_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Menu_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Menu_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Menu_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Menu_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Menu_createClass(Constructor, protoProps, staticProps) { if (protoProps) Menu_defineProperties(Constructor.prototype, protoProps); if (staticProps) Menu_defineProperties(Constructor, staticProps); return Constructor; }

function Menu_possibleConstructorReturn(self, call) { if (call && (Menu_typeof(call) === "object" || typeof call === "function")) { return call; } return Menu_assertThisInitialized(self); }

function Menu_getPrototypeOf(o) { Menu_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Menu_getPrototypeOf(o); }

function Menu_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Menu_setPrototypeOf(subClass, superClass); }

function Menu_setPrototypeOf(o, p) { Menu_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Menu_setPrototypeOf(o, p); }

function Menu_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Menu_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var Menu_Menu =
/*#__PURE__*/
function (_React$Component) {
  Menu_inherits(Menu, _React$Component);

  function Menu(props) {
    var _this;

    Menu_classCallCheck(this, Menu);

    _this = Menu_possibleConstructorReturn(this, Menu_getPrototypeOf(Menu).call(this, props));

    Menu_defineProperty(Menu_assertThisInitialized(Menu_assertThisInitialized(_this)), "fetchData", function () {
      fetch("api/get?id=7").then(function (blob) {
        return blob.json();
      }).then(function (data) {
        _this.setState({
          items: Menu_toConsumableArray(data.data)
        });
      });
      fetch("api/get?id=2").then(function (blob) {
        return blob.json();
      }).then(function (data) {
        _this.setState({
          main: Menu_toConsumableArray(data.data).filter(function (x) {
            return x.page == 2;
          })
        });
      });
    });

    _this._isMounted = false;
    _this.state = {
      main: [],
      items: []
    };
    return _this;
  }

  Menu_createClass(Menu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.scrollTo(0, 0);
      this._isMounted = true;
      this.fetchData();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      return react_default.a.createElement("div", null, this._isMounted ? react_default.a.createElement("div", {
        style: {
          overflow: "auto"
        }
      }, react_default.a.createElement(Nav_Nav, null), react_default.a.createElement(MenuSlider, {
        data: this.state.main
      }), react_default.a.createElement(MenuItems_MenuItems, {
        data: this.state.items
      })) : react_default.a.createElement("div", null, "Not Loaded"));
    }
  }]);

  return Menu;
}(react_default.a.Component);


// EXTERNAL MODULE: ./node_modules/google-maps-react/dist/index.js
var dist = __webpack_require__(93);

// CONCATENATED MODULE: ./src/components/FooterMap.jsx
function FooterMap_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { FooterMap_typeof = function _typeof(obj) { return typeof obj; }; } else { FooterMap_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return FooterMap_typeof(obj); }

function FooterMap_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function FooterMap_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function FooterMap_createClass(Constructor, protoProps, staticProps) { if (protoProps) FooterMap_defineProperties(Constructor.prototype, protoProps); if (staticProps) FooterMap_defineProperties(Constructor, staticProps); return Constructor; }

function FooterMap_possibleConstructorReturn(self, call) { if (call && (FooterMap_typeof(call) === "object" || typeof call === "function")) { return call; } return FooterMap_assertThisInitialized(self); }

function FooterMap_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function FooterMap_getPrototypeOf(o) { FooterMap_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return FooterMap_getPrototypeOf(o); }

function FooterMap_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) FooterMap_setPrototypeOf(subClass, superClass); }

function FooterMap_setPrototypeOf(o, p) { FooterMap_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return FooterMap_setPrototypeOf(o, p); }




var FooterMap_MapContainer =
/*#__PURE__*/
function (_React$Component) {
  FooterMap_inherits(MapContainer, _React$Component);

  function MapContainer() {
    FooterMap_classCallCheck(this, MapContainer);

    return FooterMap_possibleConstructorReturn(this, FooterMap_getPrototypeOf(MapContainer).apply(this, arguments));
  }

  FooterMap_createClass(MapContainer, [{
    key: "render",
    value: function render() {
      return react_default.a.createElement(dist["Map"], {
        google: this.props.google,
        zoom: 13,
        initialCenter: {
          lat: 41.957162,
          lng: -87.7273816
        }
      }, react_default.a.createElement(dist["Marker"], {
        position: {
          lat: 41.957162,
          lng: -87.7273816
        }
      }));
    }
  }]);

  return MapContainer;
}(react_default.a.Component);

/* harmony default export */ var FooterMap = (Object(dist["GoogleApiWrapper"])({
  apiKey: "AIzaSyCyM13RLnAUE4x6V2DOhox_ypO4-LCzgKE"
})(FooterMap_MapContainer));
// CONCATENATED MODULE: ./src/components/Footer.jsx
function Footer_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Footer_typeof = function _typeof(obj) { return typeof obj; }; } else { Footer_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Footer_typeof(obj); }

function Footer_toConsumableArray(arr) { return Footer_arrayWithoutHoles(arr) || Footer_iterableToArray(arr) || Footer_nonIterableSpread(); }

function Footer_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Footer_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Footer_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Footer_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Footer_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Footer_createClass(Constructor, protoProps, staticProps) { if (protoProps) Footer_defineProperties(Constructor.prototype, protoProps); if (staticProps) Footer_defineProperties(Constructor, staticProps); return Constructor; }

function Footer_possibleConstructorReturn(self, call) { if (call && (Footer_typeof(call) === "object" || typeof call === "function")) { return call; } return Footer_assertThisInitialized(self); }

function Footer_getPrototypeOf(o) { Footer_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Footer_getPrototypeOf(o); }

function Footer_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Footer_setPrototypeOf(subClass, superClass); }

function Footer_setPrototypeOf(o, p) { Footer_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Footer_setPrototypeOf(o, p); }

function Footer_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Footer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Footer_Footer =
/*#__PURE__*/
function (_React$Component) {
  Footer_inherits(Footer, _React$Component);

  function Footer(props) {
    var _this;

    Footer_classCallCheck(this, Footer);

    _this = Footer_possibleConstructorReturn(this, Footer_getPrototypeOf(Footer).call(this, props));

    Footer_defineProperty(Footer_assertThisInitialized(Footer_assertThisInitialized(_this)), "fetchData", function () {
      fetch("api/get?id=6").then(function (blob) {
        return blob.json();
      }).then(function (data) {
        _this.setState({
          Footer: Footer_toConsumableArray(data.data)
        });
      });
    });

    _this._isMounted = false;
    _this.state = {
      Footer: ''
    };
    return _this;
  }

  Footer_createClass(Footer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
      this.fetchData();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return react_default.a.createElement(lib["Row"], {
        className: "footerRow"
      }, this._isMounted ? this.state.Footer.map(function (x) {
        return react_default.a.createElement(lib["Col"], {
          s: 12,
          m: 12 / _this2.state.Footer.length,
          style: {
            textAlign: "center",
            margin: "40px 0"
          }
        }, react_default.a.createElement("h5", {
          style: {
            marginBottom: "20px"
          }
        }, x.title), x.subStuff.map(function (y) {
          return react_default.a.createElement("div", {
            className: "footerContent",
            style: {
              height: y.id == 'google' ? "13em" : "2.5em"
            },
            id: y.id
          }, Footer_typeof(y.title) == 'object' ? y.title.map(function (z) {
            return react_default.a.createElement("a", {
              href: z.hash,
              style: {
                marginRight: "10px",
                color: "white"
              }
            }, react_default.a.createElement("li", {
              className: z.icon
            }));
          }) : y.id == 'google' ? react_default.a.createElement(FooterMap, null) : y.title);
        }));
      }) : react_default.a.createElement("div", null, "not loaded"));
    }
  }]);

  return Footer;
}(react_default.a.Component);

/* harmony default export */ var components_Footer = (Footer_Footer);
// CONCATENATED MODULE: ./src/components/app.jsx
function app_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { app_typeof = function _typeof(obj) { return typeof obj; }; } else { app_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return app_typeof(obj); }

function app_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function app_createClass(Constructor, protoProps, staticProps) { if (protoProps) app_defineProperties(Constructor.prototype, protoProps); if (staticProps) app_defineProperties(Constructor, staticProps); return Constructor; }

function app_possibleConstructorReturn(self, call) { if (call && (app_typeof(call) === "object" || typeof call === "function")) { return call; } return app_assertThisInitialized(self); }

function app_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function app_getPrototypeOf(o) { app_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return app_getPrototypeOf(o); }

function app_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) app_setPrototypeOf(subClass, superClass); }

function app_setPrototypeOf(o, p) { app_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return app_setPrototypeOf(o, p); }








var app_App =
/*#__PURE__*/
function (_React$Component) {
  app_inherits(App, _React$Component);

  function App() {
    app_classCallCheck(this, App);

    return app_possibleConstructorReturn(this, app_getPrototypeOf(App).apply(this, arguments));
  }

  app_createClass(App, [{
    key: "render",
    value: function render() {
      return react_default.a.createElement("div", {
        className: "Container"
      }, react_default.a.createElement(react_router_dom["BrowserRouter"], null, react_default.a.createElement(react_router["g" /* Switch */], null, react_default.a.createElement(react_router["d" /* Route */], {
        exact: true,
        path: "/",
        component: Home_Home
      }), react_default.a.createElement(react_router["d" /* Route */], {
        path: "/menu",
        component: Menu_Menu
      }), react_default.a.createElement(react_router["d" /* Route */], {
        component: Home_Home
      }))), react_default.a.createElement(components_Footer, null));
    }
  }]);

  return App;
}(react_default.a.Component);


// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 22 modules
var es = __webpack_require__(296);

// EXTERNAL MODULE: ./node_modules/redux/es/redux.js
var redux = __webpack_require__(92);

// CONCATENATED MODULE: ./src/store/reducers/index.js

var initialState = {
  page: 1
};

function rootReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type == 'switch_page') {
    return Object.assign({}, state, {
      page: action.payload
    });
  }

  return state;
}

;
/* harmony default export */ var reducers = (rootReducer);
// CONCATENATED MODULE: ./src/store/index.js



var store = Object(redux["b" /* createStore */])(reducers);
/* harmony default export */ var src_store = (store);
// CONCATENATED MODULE: ./src/index.js





react_dom_default.a.render(react_default.a.createElement(es["a" /* Provider */], {
  store: src_store
}, react_default.a.createElement(app_App, null)), document.getElementById('root'));

/***/ })

/******/ });
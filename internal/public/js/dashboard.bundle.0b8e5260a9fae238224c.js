/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/public/admin/sveltejs/components/menu.toggle.js":
/*!*************************************************************!*\
  !*** ./src/public/admin/sveltejs/components/menu.toggle.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggle": function() { return /* binding */ toggle; },
/* harmony export */   "visible": function() { return /* binding */ visible; }
/* harmony export */ });
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");

var visible = (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.writable)(false);
var toggle = function toggle() {
  return visible.update(function (v) {
    return !v;
  });
};

/***/ }),

/***/ "./src/public/admin/sveltejs/components/routes.js":
/*!********************************************************!*\
  !*** ./src/public/admin/sveltejs/components/routes.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "items": function() { return /* binding */ items; },
/* harmony export */   "routes": function() { return /* binding */ routes; }
/* harmony export */ });
/* harmony import */ var _changeuserdata_svelte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../changeuserdata.svelte */ "./src/public/admin/sveltejs/changeuserdata.svelte");
/* harmony import */ var _usergallery_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../usergallery.svelte */ "./src/public/admin/sveltejs/usergallery.svelte");
/* harmony import */ var _schedule_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../schedule.svelte */ "./src/public/admin/sveltejs/schedule.svelte");
/* harmony import */ var _openbid_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../openbid.svelte */ "./src/public/admin/sveltejs/openbid.svelte");
/* harmony import */ var _closebid_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../closebid.svelte */ "./src/public/admin/sveltejs/closebid.svelte");
/* harmony import */ var _allusers_svelte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../allusers.svelte */ "./src/public/admin/sveltejs/allusers.svelte");
/* harmony import */ var _createuser_svelte__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../createuser.svelte */ "./src/public/admin/sveltejs/createuser.svelte");







var userRole = JSON.parse(localStorage.getItem("user"))['role'];
var items = [{
  name: 'Сотрудник',
  icon: 'icon-user',
  subItems: [{
    name: 'Личные данные',
    link: '/userdata',
    component: _changeuserdata_svelte__WEBPACK_IMPORTED_MODULE_0__["default"]
  }, {
    name: 'Записи',
    icon: '',
    subItems: [{
      name: 'Открытые записи',
      link: '/openbid',
      component: _openbid_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]
    }, {
      name: 'Закрытые записи',
      link: '/closebid',
      component: _closebid_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]
    }]
  }, {
    name: 'Галерея',
    link: '/userGallery',
    component: _usergallery_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]
  }]
}];
function generateRoutes(items) {
  var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  items.forEach(function (item) {
    if (item.link) {
      routes[item.link] = item.component;
    }
    if (item.subItems) {
      generateRoutes(item.subItems, routes);
    }
  });
  return routes;
}
if (userRole > 1) {
  var users = {
    name: 'Сотрудники',
    icon: 'icon-users',
    subItems: [{
      name: 'Создать сотрудника',
      link: '/createUser',
      component: _createuser_svelte__WEBPACK_IMPORTED_MODULE_6__["default"]
    }, {
      name: 'Все сотрудники',
      link: '/allUsers',
      component: _allusers_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]
    }]
  };
  var schedule = {
    name: 'График работы',
    link: '/schedule',
    component: _schedule_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]
  };
  items.push(users, schedule);
}
var routes = generateRoutes(items);

/***/ }),

/***/ "./node_modules/input-core/lib/constants/CharTypesEnum.js":
/*!****************************************************************!*\
  !*** ./node_modules/input-core/lib/constants/CharTypesEnum.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var CharTypes;
(function (CharTypes) {
    CharTypes[CharTypes["USER"] = 1] = "USER";
    CharTypes[CharTypes["CHAR"] = 2] = "CHAR";
    CharTypes[CharTypes["MASK"] = 3] = "MASK";
})(CharTypes = exports.CharTypes || (exports.CharTypes = {}));


/***/ }),

/***/ "./node_modules/input-core/lib/functions/buildInputStrings.js":
/*!********************************************************************!*\
  !*** ./node_modules/input-core/lib/functions/buildInputStrings.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var CharTypesEnum_1 = __webpack_require__(/*! ../constants/CharTypesEnum */ "./node_modules/input-core/lib/constants/CharTypesEnum.js");
function buildInputStrings(data, mask, input, maskChar, maskString, selection) {
    var value = [];
    var valueIndex = 0;
    var pastedIndex = 0;
    var maskedValue = '';
    var inputValuesApplied = 0;
    function processMaskPartAsChar(maskPart, pastedValuesStack, item) {
        // if user inputs value, we check it, but we don't go through all stack
        if (pastedValuesStack && pastedValuesStack[0] === maskPart.char) {
            pastedIndex++;
        }
        else {
            if ((item && (item.char === maskPart.char || item.type !== CharTypesEnum_1.CharTypes.USER)) || input) {
                valueIndex++;
            }
        }
        value.push({
            char: maskPart.char,
            type: CharTypesEnum_1.CharTypes.CHAR,
        });
        if (pastedValuesStack) {
            inputValuesApplied++;
        }
        maskedValue += maskPart.char;
    }
    function processMaskPartAsRegExp(maskPart, maskIndex, pastedValuesStack, item) {
        var part = null;
        // If we have the value inputted by user, check it.
        // We have to move through the whole stack, to find suitable
        if (pastedValuesStack) {
            var i = 0;
            while (!maskPart.regexp.test(pastedValuesStack[i]) && pastedValuesStack.length > i) {
                i++;
                pastedIndex++;
            }
            if (pastedValuesStack.length > i) {
                pastedIndex++;
                inputValuesApplied++;
                // Ignore previous value from the input
                valueIndex++;
                part = pastedValuesStack[i];
                value.push({
                    char: part,
                    type: CharTypesEnum_1.CharTypes.USER,
                });
                maskedValue += part;
            }
        }
        if (part) {
            return;
        }
        // User input doesn't have data or it's invalid.
        // Try to apply the previous data, or change them to the placeholder
        // if shift happened, pass excess values
        if (item && item.type === CharTypesEnum_1.CharTypes.CHAR && data.length > valueIndex + 1) {
            valueIndex++;
            processMaskItem(maskPart, maskIndex);
            return;
        }
        if (item && item.type === CharTypesEnum_1.CharTypes.USER && maskPart.regexp.test(item.char)) {
            value.push({
                char: item.char,
                type: CharTypesEnum_1.CharTypes.USER,
            });
            maskedValue += item.char;
            valueIndex++;
            return;
        }
        part = maskString ? maskString[maskIndex] : maskChar;
        value.push({
            char: part,
            type: CharTypesEnum_1.CharTypes.MASK,
        });
        if (data.length > maskIndex) {
            valueIndex++;
        }
        maskedValue += part;
    }
    // we use closures here to mutate variables, so that it increases the performance.
    function processMaskItem(maskPart, maskIndex) {
        var item = data.length > valueIndex ? data[valueIndex] : null;
        var pastedValuesStack = null;
        if (selection.start <= maskIndex && pastedIndex < input.length) {
            pastedValuesStack = input.slice(pastedIndex);
        }
        // process hardcoded char to the mask
        if (maskPart.char) {
            return processMaskPartAsChar(maskPart, pastedValuesStack, item);
        }
        // text by regexp
        if (maskPart.regexp) {
            return processMaskPartAsRegExp(maskPart, maskIndex, pastedValuesStack, item);
        }
    }
    mask.forEach(function (maskPart, maskIndex) {
        processMaskItem(maskPart, maskIndex);
    });
    return {
        value: value,
        maskedValue: maskedValue,
        inputValuesApplied: inputValuesApplied,
    };
}
exports.buildInputStrings = buildInputStrings;


/***/ }),

/***/ "./node_modules/input-core/lib/functions/defineMaskList.js":
/*!*****************************************************************!*\
  !*** ./node_modules/input-core/lib/functions/defineMaskList.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 *
 * @param {String} mask
 * @param format
 * @returns {Array}
 */
function defineMaskList(mask, format) {
    if (!mask) {
        return [];
    }
    var stack = [];
    // flag if escape char is used
    var escape = false;
    mask.split('').forEach(function (maskChar) {
        var item = format[maskChar];
        // if the previous char was escape char, we should ignore next format rule, and process mask char as a regular char.
        if (escape && item) {
            item = null;
            escape = false;
        }
        if (!item) {
            // escape char
            if (!escape && maskChar === '\\') {
                escape = true;
                return;
            }
            escape = false;
            stack.push({
                char: maskChar,
            });
            return;
        }
        if (item.regexp) {
            stack.push(item);
        }
    });
    return stack;
}
exports["default"] = defineMaskList;


/***/ }),

/***/ "./node_modules/input-core/lib/functions/inputValue.js":
/*!*************************************************************!*\
  !*** ./node_modules/input-core/lib/functions/inputValue.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var CharTypesEnum_1 = __webpack_require__(/*! ../constants/CharTypesEnum */ "./node_modules/input-core/lib/constants/CharTypesEnum.js");
var buildInputStrings_1 = __webpack_require__(/*! ./buildInputStrings */ "./node_modules/input-core/lib/functions/buildInputStrings.js");
function inputValue(params) {
    var data = params.data, _a = params.input, input = _a === void 0 ? '' : _a, selection = params.selection, mask = params.mask, maskChar = params.maskChar, maskString = params.maskString;
    var _b = buildInputStrings_1.buildInputStrings(data, mask, input, maskChar, maskString, selection), value = _b.value, maskedValue = _b.maskedValue, inputValuesApplied = _b.inputValuesApplied;
    var selectionPosition = selection.start + inputValuesApplied;
    // remove all leading maskChar
    var bound = value.length - 1;
    var charsCount = 0;
    while (bound >= 0 && value[bound].type !== CharTypesEnum_1.CharTypes.USER) {
        if (value[bound].type === CharTypesEnum_1.CharTypes.MASK) {
            charsCount = 0;
        }
        if (value[bound].type === CharTypesEnum_1.CharTypes.CHAR) {
            charsCount++;
        }
        bound--;
    }
    bound += charsCount;
    var visibleValue = '';
    for (var i = 0; i <= bound; i++) {
        visibleValue += value[i].char;
    }
    return {
        value: value,
        visibleValue: visibleValue,
        maskedValue: maskedValue,
        selection: {
            start: selectionPosition,
            end: selectionPosition,
        },
    };
}
exports["default"] = inputValue;


/***/ }),

/***/ "./node_modules/input-core/lib/functions/removeSelectedRange.js":
/*!**********************************************************************!*\
  !*** ./node_modules/input-core/lib/functions/removeSelectedRange.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var CharTypesEnum_1 = __webpack_require__(/*! ../constants/CharTypesEnum */ "./node_modules/input-core/lib/constants/CharTypesEnum.js");
var copyMaskChar = function (count, maskChar) {
    var res = [];
    for (var i = 0; i < count; i++) {
        res.push({
            char: maskChar,
            type: CharTypesEnum_1.CharTypes.MASK,
        });
    }
    return res;
};
var pasteMaskSymbols = function (maskString, maskChar, selection) {
    if (maskString) {
        var res = [];
        for (var i = selection.start; i < selection.end; i++) {
            res.push({
                char: maskString[i],
                type: CharTypesEnum_1.CharTypes.MASK,
            });
        }
        return res;
    }
    return copyMaskChar(selection.end - selection.start, maskChar);
};
function removeSelectedRange(param) {
    var value = param.value, selection = param.selection, maskChar = param.maskChar, maskString = param.maskString;
    if (selection.end < selection.start) {
        var tmp = selection.end;
        selection.end = selection.start;
        selection.start = tmp;
    }
    if (selection.start === selection.end) {
        return value;
    }
    if (value.length > selection.start) {
        return value
            .slice(0, selection.start)
            .concat(pasteMaskSymbols(maskString, maskChar, selection), value.slice(selection.end, value.length));
    }
    return value;
}
exports["default"] = removeSelectedRange;


/***/ }),

/***/ "./node_modules/input-core/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/input-core/lib/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var defineMaskList_1 = __webpack_require__(/*! ./functions/defineMaskList */ "./node_modules/input-core/lib/functions/defineMaskList.js");
var inputValue_1 = __webpack_require__(/*! ./functions/inputValue */ "./node_modules/input-core/lib/functions/inputValue.js");
var removeSelectedRange_1 = __webpack_require__(/*! ./functions/removeSelectedRange */ "./node_modules/input-core/lib/functions/removeSelectedRange.js");
var CharTypesEnum_1 = __webpack_require__(/*! ./constants/CharTypesEnum */ "./node_modules/input-core/lib/constants/CharTypesEnum.js");
exports.defaults = {
    maskFormat: [
        {
            str: '0',
            regexp: /[0-9]/,
        },
        {
            str: '*',
            regexp: /./,
        },
        {
            str: 'a',
            regexp: /[a-zA-Z]/,
        },
    ],
    maskChar: '',
    showMask: false,
    removeSelectedRange: removeSelectedRange_1.default,
};
exports.createInput = function (params) {
    var maskString = params.maskString, reformat = params.reformat, _a = params.maskFormat, maskFormat = _a === void 0 ? exports.defaults.maskFormat : _a, _b = params.maskChar, maskChar = _b === void 0 ? exports.defaults.maskChar : _b;
    if (!reformat && !params.mask) {
        reformat = function (params) {
            var str = params.value.map(function (item) { return item.char; }).join('');
            return {
                value: params.value,
                visibleValue: str,
                maskedValue: str,
                selection: params.selection,
            };
        };
    }
    else if (reformat) {
        params.mask = null;
    }
    if (maskString && maskString.length !== params.mask.length) {
        throw new Error('maskString must have same length as mask');
    }
    if (maskChar.length > 1) {
        throw new Error('maskChar must have only 1 char');
    }
    var maskFormatMap;
    var selection = { start: 0, end: 0 };
    var value;
    var maskedValue;
    var visibleValue;
    var mask;
    var callbacks = [];
    var interfaceMethods = {
        subscribe: function (callback) {
            callbacks.push(callback);
        },
        unsubscribe: function (callback) {
            callbacks = callbacks.filter(function (item) { return item !== callback; });
        },
        setMaskFormat: function (maskFormat) {
            maskFormatMap = maskFormat.reduce(function (store, item) {
                store[item.str] = item;
                return store;
            }, {});
        },
        setValue: function (data) {
            var result;
            if (reformat) {
                result = reformat({
                    value: data,
                    selection: selection,
                });
            }
            else {
                var dataList = void 0;
                if (Array.isArray(data)) {
                    dataList = data;
                }
                else {
                    dataList = [];
                    for (var i = 0; i < data.length; i++) {
                        dataList.push({ char: data[i], type: CharTypesEnum_1.CharTypes.USER });
                    }
                }
                result = inputValue_1.default({ data: dataList, selection: selection, mask: mask, maskChar: maskChar, maskString: maskString });
            }
            applyChanges(result);
        },
        setSelection: function (newSelection) {
            selection = newSelection;
        },
        getSelection: function () {
            return {
                start: selection.start,
                end: selection.end,
            };
        },
        backspace: function () {
            interfaceMethods.removePreviosOrSelected();
        },
        removePreviosOrSelected: function () {
            if (selection.start === selection.end) {
                selection.start = selection.end - 1;
                if (selection.start < 0) {
                    selection.start = 0;
                }
            }
            interfaceMethods.input('');
        },
        removeNextOrSelected: function () {
            if (selection.start === selection.end) {
                selection.end++;
            }
            interfaceMethods.input('');
        },
        getState: function () {
            return {
                value: value,
                maskedValue: maskedValue,
                visibleValue: visibleValue,
                selection: selection,
            };
        },
        setMask: function (newMask) {
            mask = defineMaskList_1.default(newMask, maskFormatMap);
            interfaceMethods.setValue(value);
        },
        setMaskChar: function (newMaskChar) {
            if (maskChar.length > 1) {
                throw new Error('maskChar must have only 1 char');
            }
            maskChar = newMaskChar;
            interfaceMethods.setValue(value);
        },
        setMaskString: function (newMaskString) {
            if (newMaskString && newMaskString.length !== mask.length) {
                throw new Error('maskString must have the same length as mask');
            }
            maskString = newMaskString;
            interfaceMethods.setValue(value);
        },
        setReformat: function (newReformat) {
            reformat = newReformat;
            interfaceMethods.setValue(value);
        },
        paste: function (value) {
            interfaceMethods.input(value);
        },
        input: function (input) {
            var result;
            if (reformat) {
                result = reformat({ value: value, input: input, selection: selection });
            }
            else {
                var tmpValue = removeSelectedRange_1.default({ value: value, selection: selection, maskChar: maskChar, maskString: maskString });
                selection.end = selection.start;
                result = inputValue_1.default({ data: tmpValue, input: input, selection: selection, mask: mask, maskChar: maskChar, maskString: maskString });
            }
            applyChanges(result);
        },
    };
    function applyChanges(result) {
        var oldMaskedValue = maskedValue;
        var oldVisibleValue = visibleValue;
        var oldSelection = selection;
        value = result.value;
        maskedValue = result.maskedValue;
        visibleValue = result.visibleValue;
        interfaceMethods.setSelection(result.selection);
        if (oldMaskedValue !== maskedValue ||
            oldVisibleValue !== visibleValue ||
            oldSelection.start !== selection.start ||
            oldSelection.end !== selection.end) {
            notify();
        }
    }
    function notify() {
        var state = interfaceMethods.getState();
        callbacks.forEach(function (callback) {
            callback(state);
        });
    }
    interfaceMethods.setMaskFormat(maskFormat);
    mask = defineMaskList_1.default(params.mask, maskFormatMap);
    interfaceMethods.setValue(params.value);
    return interfaceMethods;
};


/***/ }),

/***/ "./src/public/css/dashboard.scss":
/*!***************************************!*\
  !*** ./src/public/css/dashboard.scss ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/svelte-easy-crop/Cropper.svelte":
/*!******************************************************!*\
  !*** ./node_modules/svelte-easy-crop/Cropper.svelte ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./node_modules/svelte-easy-crop/helpers.js");
/* node_modules\svelte-easy-crop\Cropper.svelte generated by Svelte v3.55.1 */


const { window: window_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;



function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-12kodkg", ".container.svelte-12kodkg{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;user-select:none;touch-action:none;cursor:move}.image.svelte-12kodkg{max-width:100%;max-height:100%;margin:auto;position:absolute;top:0;bottom:0;left:0;right:0;will-change:transform}.cropperArea.svelte-12kodkg{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);box-shadow:0 0 0 9999em;box-sizing:border-box;color:rgba(0, 0, 0, 0.5);border:1px solid rgba(255, 255, 255, 0.5);overflow:hidden}.grid.svelte-12kodkg:before{content:' ';box-sizing:border-box;border:1px solid rgba(255, 255, 255, 0.5);position:absolute;top:0;bottom:0;left:33.33%;right:33.33%;border-top:0;border-bottom:0}.grid.svelte-12kodkg:after{content:' ';box-sizing:border-box;border:1px solid rgba(255, 255, 255, 0.5);position:absolute;top:33.33%;bottom:33.33%;left:0;right:0;border-left:0;border-right:0}.round.svelte-12kodkg{border-radius:50%}");
}

// (222:2) {#if cropperSize}
function create_if_block(ctx) {
	let div;

	return {
		c() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div, "class", "cropperArea svelte-12kodkg");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(div, "width", /*cropperSize*/ ctx[7].width + "px");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(div, "height", /*cropperSize*/ ctx[7].height + "px");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div, "data-testid", "cropper");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(div, "round", /*cropShape*/ ctx[3] === 'round');
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(div, "grid", /*showGrid*/ ctx[4]);
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*cropperSize*/ 128) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(div, "width", /*cropperSize*/ ctx[7].width + "px");
			}

			if (dirty[0] & /*cropperSize*/ 128) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(div, "height", /*cropperSize*/ ctx[7].height + "px");
			}

			if (dirty[0] & /*cropShape*/ 8) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(div, "round", /*cropShape*/ ctx[3] === 'round');
			}

			if (dirty[0] & /*showGrid*/ 16) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(div, "grid", /*showGrid*/ ctx[4]);
			}
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let img;
	let img_src_value;
	let t;
	let mounted;
	let dispose;
	let if_block = /*cropperSize*/ ctx[7] && create_if_block(ctx);

	return {
		c() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			img = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("img");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block) if_block.c();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "class", "image svelte-12kodkg");
			if (!(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.src_url_equal)(img.src, img_src_value = /*image*/ ctx[2])) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "src", img_src_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "alt", "");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(img, "transform", "translate(" + /*crop*/ ctx[1].x + "px, " + /*crop*/ ctx[1].y + "px) scale(" + /*zoom*/ ctx[0] + ")");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "crossorigin", /*crossOrigin*/ ctx[5]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div, "class", "container svelte-12kodkg");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div, "data-testid", "container");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, img);
			/*img_binding*/ ctx[20](img);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t);
			if (if_block) if_block.m(div, null);
			/*div_binding*/ ctx[21](div);

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(window_1, "resize", /*computeSizes*/ ctx[10]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(img, "load", /*onImgLoad*/ ctx[9]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(div, "mousedown", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*onMouseDown*/ ctx[11])),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(div, "touchstart", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*onTouchStart*/ ctx[12])),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(div, "wheel", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*onWheel*/ ctx[13]))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*image*/ 4 && !(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.src_url_equal)(img.src, img_src_value = /*image*/ ctx[2])) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "src", img_src_value);
			}

			if (dirty[0] & /*crop, zoom*/ 3) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(img, "transform", "translate(" + /*crop*/ ctx[1].x + "px, " + /*crop*/ ctx[1].y + "px) scale(" + /*zoom*/ ctx[0] + ")");
			}

			if (dirty[0] & /*crossOrigin*/ 32) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "crossorigin", /*crossOrigin*/ ctx[5]);
			}

			if (/*cropperSize*/ ctx[7]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div);
			/*img_binding*/ ctx[20](null);
			if (if_block) if_block.d();
			/*div_binding*/ ctx[21](null);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { image } = $$props;
	let { crop = { x: 0, y: 0 } } = $$props;
	let { zoom = 1 } = $$props;
	let { aspect = 4 / 3 } = $$props;
	let { minZoom = 1 } = $$props;
	let { maxZoom = 3 } = $$props;
	let { cropSize = null } = $$props;
	let { cropShape = "rect" } = $$props;
	let { showGrid = true } = $$props;
	let { zoomSpeed = 1 } = $$props;
	let { crossOrigin = null } = $$props;
	let { restrictPosition = true } = $$props;
	let cropperSize = null;

	let imageSize = {
		width: 0,
		height: 0,
		naturalWidth: 0,
		naturalHeight: 0
	};

	let containerEl = null;
	let containerRect = null;
	let imgEl = null;
	let dragStartPosition = { x: 0, y: 0 };
	let dragStartCrop = { x: 0, y: 0 };
	let lastPinchDistance = 0;
	let rafDragTimeout = null;
	let rafZoomTimeout = null;
	const dispatch = (0,svelte__WEBPACK_IMPORTED_MODULE_1__.createEventDispatcher)();

	(0,svelte__WEBPACK_IMPORTED_MODULE_1__.onMount)(() => {
		if (imgEl && imgEl.complete) {
			onImgLoad();
		}

		if (containerEl) {
			containerEl.addEventListener("gesturestart", preventZoomSafari);
			containerEl.addEventListener("gesturechange", preventZoomSafari);
		}
	});

	(0,svelte__WEBPACK_IMPORTED_MODULE_1__.onDestroy)(() => {
		if (containerEl) {
			containerEl.removeEventListener("gesturestart", preventZoomSafari);
			containerEl.removeEventListener("gesturechange", preventZoomSafari);
		}

		cleanEvents();
	});

	const preventZoomSafari = e => e.preventDefault();

	const cleanEvents = () => {
		if (typeof document !== "undefined") {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onDragStopped);
			document.removeEventListener("touchmove", onTouchMove);
			document.removeEventListener("touchend", onDragStopped);
		}
	};

	const onImgLoad = () => {
		computeSizes();
		emitCropData();
	};

	const getAspect = () => {
		if (cropSize) {
			return cropSize.width / cropSize.height;
		}

		return aspect;
	};

	const computeSizes = () => {
		if (imgEl) {
			imageSize = {
				width: imgEl.width,
				height: imgEl.height,
				naturalWidth: imgEl.naturalWidth,
				naturalHeight: imgEl.naturalHeight
			};

			$$invalidate(7, cropperSize = cropSize
			? cropSize
			: _helpers__WEBPACK_IMPORTED_MODULE_2__.getCropSize(imgEl.width, imgEl.height, aspect));
		}

		if (containerEl) {
			containerRect = containerEl.getBoundingClientRect();
		}
	};

	const getMousePoint = e => ({
		x: Number(e.clientX),
		y: Number(e.clientY)
	});

	const getTouchPoint = touch => ({
		x: Number(touch.clientX),
		y: Number(touch.clientY)
	});

	const onMouseDown = e => {
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onDragStopped);
		onDragStart(getMousePoint(e));
	};

	const onMouseMove = e => onDrag(getMousePoint(e));

	const onTouchStart = e => {
		document.addEventListener("touchmove", onTouchMove, { passive: false });
		document.addEventListener("touchend", onDragStopped);

		if (e.touches.length === 2) {
			onPinchStart(e);
		} else if (e.touches.length === 1) {
			onDragStart(getTouchPoint(e.touches[0]));
		}
	};

	const onTouchMove = e => {
		e.preventDefault();

		if (e.touches.length === 2) {
			onPinchMove(e);
		} else if (e.touches.length === 1) {
			onDrag(getTouchPoint(e.touches[0]));
		}
	};

	const onDragStart = ({ x, y }) => {
		dragStartPosition = { x, y };
		dragStartCrop = { x: crop.x, y: crop.y };
	};

	const onDrag = ({ x, y }) => {
		if (rafDragTimeout) window.cancelAnimationFrame(rafDragTimeout);

		rafDragTimeout = window.requestAnimationFrame(() => {
			if (x === void 0 || y === void 0 || !cropperSize) return;
			const offsetX = x - dragStartPosition.x;
			const offsetY = y - dragStartPosition.y;

			const requestedPosition = {
				x: dragStartCrop.x + offsetX,
				y: dragStartCrop.y + offsetY
			};

			$$invalidate(1, crop = restrictPosition
			? _helpers__WEBPACK_IMPORTED_MODULE_2__.restrictPosition(requestedPosition, imageSize, cropperSize, zoom)
			: requestedPosition);
		});
	};

	const onDragStopped = () => {
		cleanEvents();
		emitCropData();
	};

	const onPinchStart = e => {
		const pointA = getTouchPoint(e.touches[0]);
		const pointB = getTouchPoint(e.touches[1]);
		lastPinchDistance = _helpers__WEBPACK_IMPORTED_MODULE_2__.getDistanceBetweenPoints(pointA, pointB);
		onDragStart(_helpers__WEBPACK_IMPORTED_MODULE_2__.getCenter(pointA, pointB));
	};

	const onPinchMove = e => {
		const pointA = getTouchPoint(e.touches[0]);
		const pointB = getTouchPoint(e.touches[1]);
		const center = _helpers__WEBPACK_IMPORTED_MODULE_2__.getCenter(pointA, pointB);
		onDrag(center);
		if (rafZoomTimeout) window.cancelAnimationFrame(rafZoomTimeout);

		rafZoomTimeout = window.requestAnimationFrame(() => {
			const distance = _helpers__WEBPACK_IMPORTED_MODULE_2__.getDistanceBetweenPoints(pointA, pointB);
			const newZoom = zoom * (distance / lastPinchDistance);
			setNewZoom(newZoom, center);
			lastPinchDistance = distance;
		});
	};

	const onWheel = e => {
		const point = getMousePoint(e);
		const newZoom = zoom - e.deltaY * zoomSpeed / 200;
		setNewZoom(newZoom, point);
	};

	const getPointOnContainer = ({ x, y }) => {
		if (!containerRect) {
			throw new Error("The Cropper is not mounted");
		}

		return {
			x: containerRect.width / 2 - (x - containerRect.left),
			y: containerRect.height / 2 - (y - containerRect.top)
		};
	};

	const getPointOnImage = ({ x, y }) => ({
		x: (x + crop.x) / zoom,
		y: (y + crop.y) / zoom
	});

	const setNewZoom = (newZoom, point) => {
		if (!cropperSize) return;
		const zoomPoint = getPointOnContainer(point);
		const zoomTarget = getPointOnImage(zoomPoint);
		$$invalidate(0, zoom = Math.min(maxZoom, Math.max(newZoom, minZoom)));

		const requestedPosition = {
			x: zoomTarget.x * zoom - zoomPoint.x,
			y: zoomTarget.y * zoom - zoomPoint.y
		};

		$$invalidate(1, crop = restrictPosition
		? _helpers__WEBPACK_IMPORTED_MODULE_2__.restrictPosition(requestedPosition, imageSize, cropperSize, zoom)
		: requestedPosition);
	};

	const emitCropData = () => {
		if (!cropperSize || cropperSize.width === 0) return;

		const position = restrictPosition
		? _helpers__WEBPACK_IMPORTED_MODULE_2__.restrictPosition(crop, imageSize, cropperSize, zoom)
		: crop;

		const { croppedAreaPercentages, croppedAreaPixels } = _helpers__WEBPACK_IMPORTED_MODULE_2__.computeCroppedArea(position, imageSize, cropperSize, getAspect(), zoom, restrictPosition);

		dispatch("cropcomplete", {
			percent: croppedAreaPercentages,
			pixels: croppedAreaPixels
		});
	};

	function img_binding($$value) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			imgEl = $$value;
			$$invalidate(6, imgEl);
		});
	}

	function div_binding($$value) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			containerEl = $$value;
			$$invalidate(8, containerEl);
		});
	}

	$$self.$$set = $$props => {
		if ('image' in $$props) $$invalidate(2, image = $$props.image);
		if ('crop' in $$props) $$invalidate(1, crop = $$props.crop);
		if ('zoom' in $$props) $$invalidate(0, zoom = $$props.zoom);
		if ('aspect' in $$props) $$invalidate(14, aspect = $$props.aspect);
		if ('minZoom' in $$props) $$invalidate(15, minZoom = $$props.minZoom);
		if ('maxZoom' in $$props) $$invalidate(16, maxZoom = $$props.maxZoom);
		if ('cropSize' in $$props) $$invalidate(17, cropSize = $$props.cropSize);
		if ('cropShape' in $$props) $$invalidate(3, cropShape = $$props.cropShape);
		if ('showGrid' in $$props) $$invalidate(4, showGrid = $$props.showGrid);
		if ('zoomSpeed' in $$props) $$invalidate(18, zoomSpeed = $$props.zoomSpeed);
		if ('crossOrigin' in $$props) $$invalidate(5, crossOrigin = $$props.crossOrigin);
		if ('restrictPosition' in $$props) $$invalidate(19, restrictPosition = $$props.restrictPosition);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*imgEl, cropSize, aspect*/ 147520) {
			$: if (imgEl) {
				$$invalidate(7, cropperSize = cropSize
				? cropSize
				: _helpers__WEBPACK_IMPORTED_MODULE_2__.getCropSize(imgEl.width, imgEl.height, aspect));
			}
		}

		if ($$self.$$.dirty[0] & /*zoom*/ 1) {
			$: zoom && emitCropData();
		}
	};

	return [
		zoom,
		crop,
		image,
		cropShape,
		showGrid,
		crossOrigin,
		imgEl,
		cropperSize,
		containerEl,
		onImgLoad,
		computeSizes,
		onMouseDown,
		onTouchStart,
		onWheel,
		aspect,
		minZoom,
		maxZoom,
		cropSize,
		zoomSpeed,
		restrictPosition,
		img_binding,
		div_binding
	];
}

class Cropper extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(
			this,
			options,
			instance,
			create_fragment,
			svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal,
			{
				image: 2,
				crop: 1,
				zoom: 0,
				aspect: 14,
				minZoom: 15,
				maxZoom: 16,
				cropSize: 17,
				cropShape: 3,
				showGrid: 4,
				zoomSpeed: 18,
				crossOrigin: 5,
				restrictPosition: 19
			},
			add_css,
			[-1, -1]
		);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Cropper);

/***/ }),

/***/ "./node_modules/svelte-input-mask/MaskInput.svelte":
/*!*********************************************************!*\
  !*** ./node_modules/svelte-input-mask/MaskInput.svelte ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var input_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! input-core */ "./node_modules/input-core/lib/index.js");
/* node_modules\svelte-input-mask\MaskInput.svelte generated by Svelte v3.55.1 */





function create_fragment(ctx) {
	let input_1;
	let mounted;
	let dispose;

	let input_1_levels = [
		/*$$restProps*/ ctx[9],
		{ value: /*inputValue*/ ctx[1] },
		{ id: /*id*/ ctx[0] }
	];

	let input_1_data = {};

	for (let i = 0; i < input_1_levels.length; i += 1) {
		input_1_data = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.assign)(input_1_data, input_1_levels[i]);
	}

	return {
		c() {
			input_1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_attributes)(input_1, input_1_data);
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, input_1, anchor);
			input_1.value = input_1_data.value;
			if (input_1.autofocus) input_1.focus();
			/*input_1_binding*/ ctx[19](input_1);

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input_1, "input", /*handleInput*/ ctx[3]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input_1, "keydown", /*handleKeyDown*/ ctx[6]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input_1, "keypress", /*handleKeyPress*/ ctx[5]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input_1, "paste", /*handlePaste*/ ctx[4]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input_1, "focus", /*handleFocus*/ ctx[7]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input_1, "blur", /*handleBlur*/ ctx[8])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_attributes)(input_1, input_1_data = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_spread_update)(input_1_levels, [
				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9],
				dirty & /*inputValue*/ 2 && input_1.value !== /*inputValue*/ ctx[1] && { value: /*inputValue*/ ctx[1] },
				dirty & /*id*/ 1 && { id: /*id*/ ctx[0] }
			]));

			if ('value' in input_1_data) {
				input_1.value = input_1_data.value;
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(input_1);
			/*input_1_binding*/ ctx[19](null);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	const omit_props_names = [
		"value","defaultValue","reformat","maskString","maskChar","mask","maskFormat","alwaysShowMask","showMask","id"
	];

	let $$restProps = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.compute_rest_props)($$props, omit_props_names);
	let { value = '' } = $$props;
	let { defaultValue = undefined } = $$props;
	let { reformat = undefined } = $$props;
	let { maskString = undefined } = $$props;
	let { maskChar = input_core__WEBPACK_IMPORTED_MODULE_2__.defaults.maskChar } = $$props;
	let { mask = input_core__WEBPACK_IMPORTED_MODULE_2__.defaults.mask } = $$props;
	let { maskFormat = input_core__WEBPACK_IMPORTED_MODULE_2__.defaults.maskFormat } = $$props;
	let { alwaysShowMask = false } = $$props;
	let { showMask = false } = $$props;
	let { id = '' } = $$props;
	const KEYBOARD = { BACKSPACE: 8, DELETE: 46 };
	const dispatch = (0,svelte__WEBPACK_IMPORTED_MODULE_1__.createEventDispatcher)();

	const input = (0,input_core__WEBPACK_IMPORTED_MODULE_2__.createInput)({
		value: value || defaultValue || '',
		reformat,
		maskString,
		maskChar,
		mask,
		maskFormat
	});

	let shouldShowMask = alwaysShowMask || showMask;

	(0,svelte__WEBPACK_IMPORTED_MODULE_1__.onMount)(() => {
		input.subscribe(applyValue);
	});

	(0,svelte__WEBPACK_IMPORTED_MODULE_1__.onDestroy)(() => {
		input.unsubscribe(applyValue);
	});

	let canSetSelection = false;
	let inputValue = setupInputValue(input.getState());
	let inputEl;

	function setupInputValue({ maskedValue, visibleValue }) {
		if (shouldShowMask && (canSetSelection || alwaysShowMask)) {
			return maskedValue;
		}

		return visibleValue;
	}

	function applyValue({ maskedValue, visibleValue, selection, value }) {
		$$invalidate(1, inputValue = setupInputValue({ maskedValue, visibleValue }));
		setSelection(selection);

		dispatchChangeEvent({
			unmasked: reformat
			? value
			: value.filter(item => item.type === 1).map(item => item.char).join(''),
			maskedValue,
			visibleValue
		});
	}

	async function setSelection({ start, end }) {
		if (!canSetSelection) {
			return;
		}

		await (0,svelte__WEBPACK_IMPORTED_MODULE_1__.tick)();
		inputEl.setSelectionRange(start, end);
		const raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || (fn => setTimeout(fn, 0));

		// For android
		raf(() => inputEl.setSelectionRange(start, end));
	}

	function setupSelection() {
		input.setSelection({
			start: inputEl.selectionStart,
			end: inputEl.selectionEnd
		});
	}

	function getValue() {
		if (showMask && (canSetSelection || alwaysShowMask)) {
			return input.getState().maskedValue;
		} else {
			return input.getState().visibleValue;
		}
	}

	function handleInput(e) {
		const prevValue = getValue();

		// fix conflict by update value in mask model
		if (e.target.value !== prevValue) {
			input.input(e.data);
			setSelection(input.getSelection());

			// Timeout needed for IE
			setTimeout(() => setSelection(input.getSelection()), 0);
		}
	}

	function handlePaste(e) {
		e.preventDefault();
		setupSelection();

		// getData value needed for IE also works in FF & Chrome
		input.paste(e.clipboardData.getData('Text'));

		setSelection(input.getSelection());

		// Timeout needed for IE
		setTimeout(() => setSelection(input.getSelection()), 0);
	}

	function handleKeyPress(e) {
		if (e.metaKey || e.altKey || e.ctrlKey || e.key === 'Enter') {
			return;
		}

		e.preventDefault();
		setupSelection();
		input.input(e.key || e.data || String.fromCharCode(e.which));
		setSelection(input.getSelection());
	}

	function handleKeyDown(e) {
		if (e.which === KEYBOARD.BACKSPACE) {
			e.preventDefault();
			setupSelection();
			input.removePreviosOrSelected();
			setSelection(input.getSelection());
		}

		if (e.which === KEYBOARD.DELETE) {
			e.preventDefault();
			setupSelection();
			input.removeNextOrSelected();
			setSelection(input.getSelection());
		}
	}

	function handleFocus(e) {
		canSetSelection = true;
		dispatch('focus', e);
	}

	function handleBlur(e) {
		canSetSelection = false;
		dispatch('blur', e);
	}

	function dispatchChangeEvent({ unmasked, maskedValue, visibleValue }) {
		dispatch('change', {
			element: inputEl,
			inputState: {
				unmaskedValue: unmasked,
				maskedValue,
				visibleValue
			}
		});
	}

	function input_1_binding($$value) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			inputEl = $$value;
			$$invalidate(2, inputEl);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.assign)((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.assign)({}, $$props), (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.exclude_internal_props)($$new_props));
		$$invalidate(9, $$restProps = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.compute_rest_props)($$props, omit_props_names));
		if ('value' in $$new_props) $$invalidate(10, value = $$new_props.value);
		if ('defaultValue' in $$new_props) $$invalidate(11, defaultValue = $$new_props.defaultValue);
		if ('reformat' in $$new_props) $$invalidate(12, reformat = $$new_props.reformat);
		if ('maskString' in $$new_props) $$invalidate(13, maskString = $$new_props.maskString);
		if ('maskChar' in $$new_props) $$invalidate(14, maskChar = $$new_props.maskChar);
		if ('mask' in $$new_props) $$invalidate(15, mask = $$new_props.mask);
		if ('maskFormat' in $$new_props) $$invalidate(16, maskFormat = $$new_props.maskFormat);
		if ('alwaysShowMask' in $$new_props) $$invalidate(17, alwaysShowMask = $$new_props.alwaysShowMask);
		if ('showMask' in $$new_props) $$invalidate(18, showMask = $$new_props.showMask);
		if ('id' in $$new_props) $$invalidate(0, id = $$new_props.id);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*alwaysShowMask, showMask*/ 393216) {
			$: shouldShowMask = alwaysShowMask || showMask;
		}

		if ($$self.$$.dirty & /*reformat*/ 4096) {
			$: input.setReformat(reformat);
		}

		if ($$self.$$.dirty & /*maskFormat*/ 65536) {
			$: input.setMaskFormat(maskFormat);
		}

		if ($$self.$$.dirty & /*mask*/ 32768) {
			$: input.setMask(mask);
		}

		if ($$self.$$.dirty & /*maskString*/ 8192) {
			$: input.setMaskString(maskString);
		}

		if ($$self.$$.dirty & /*maskChar*/ 16384) {
			$: input.setMaskChar(maskChar);
		}

		if ($$self.$$.dirty & /*value*/ 1024) {
			$: value !== undefined && input.setValue(value);
		}
	};

	return [
		id,
		inputValue,
		inputEl,
		handleInput,
		handlePaste,
		handleKeyPress,
		handleKeyDown,
		handleFocus,
		handleBlur,
		$$restProps,
		value,
		defaultValue,
		reformat,
		maskString,
		maskChar,
		mask,
		maskFormat,
		alwaysShowMask,
		showMask,
		input_1_binding
	];
}

class MaskInput extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {
			value: 10,
			defaultValue: 11,
			reformat: 12,
			maskString: 13,
			maskChar: 14,
			mask: 15,
			maskFormat: 16,
			alwaysShowMask: 17,
			showMask: 18,
			id: 0
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (MaskInput);

/***/ }),

/***/ "./node_modules/svelte-spa-router/Router.svelte":
/*!******************************************************!*\
  !*** ./node_modules/svelte-spa-router/Router.svelte ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "link": function() { return /* binding */ link; },
/* harmony export */   "loc": function() { return /* binding */ loc; },
/* harmony export */   "location": function() { return /* binding */ location; },
/* harmony export */   "params": function() { return /* binding */ params; },
/* harmony export */   "pop": function() { return /* binding */ pop; },
/* harmony export */   "push": function() { return /* binding */ push; },
/* harmony export */   "querystring": function() { return /* binding */ querystring; },
/* harmony export */   "replace": function() { return /* binding */ replace; },
/* harmony export */   "restoreScroll": function() { return /* binding */ restoreScroll; },
/* harmony export */   "wrap": function() { return /* binding */ wrap; }
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _wrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wrap */ "./node_modules/svelte-spa-router/wrap.js");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");
/* harmony import */ var regexparam__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! regexparam */ "./node_modules/regexparam/dist/index.mjs");
/* node_modules\svelte-spa-router\Router.svelte generated by Svelte v3.55.1 */








function create_else_block(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*props*/ ctx[2]];
	var switch_value = /*component*/ ctx[0];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.assign)(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return { props: switch_instance_props };
	}

	if (switch_value) {
		switch_instance = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.construct_svelte_component)(switch_value, switch_props(ctx));
		switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
	}

	return {
		c() {
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(switch_instance.$$.fragment);
			switch_instance_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m(target, anchor) {
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(switch_instance, target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_instance_changes = (dirty & /*props*/ 4)
			? (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_spread_update)(switch_instance_spread_levels, [(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_spread_object)(/*props*/ ctx[2])])
			: {};

			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
				if (switch_instance) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();
					const old_component = switch_instance;

					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(old_component.$$.fragment, 1, 0, () => {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(old_component, 1);
					});

					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
				}

				if (switch_value) {
					switch_instance = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.construct_svelte_component)(switch_value, switch_props(ctx));
					switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(switch_instance.$$.fragment);
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(switch_instance.$$.fragment, 1);
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(switch_instance_anchor);
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(switch_instance, detaching);
		}
	};
}

// (260:0) {#if componentParams}
function create_if_block(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [{ params: /*componentParams*/ ctx[1] }, /*props*/ ctx[2]];
	var switch_value = /*component*/ ctx[0];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.assign)(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return { props: switch_instance_props };
	}

	if (switch_value) {
		switch_instance = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.construct_svelte_component)(switch_value, switch_props(ctx));
		switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
	}

	return {
		c() {
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(switch_instance.$$.fragment);
			switch_instance_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m(target, anchor) {
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(switch_instance, target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_instance_changes = (dirty & /*componentParams, props*/ 6)
			? (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_spread_update)(switch_instance_spread_levels, [
					dirty & /*componentParams*/ 2 && { params: /*componentParams*/ ctx[1] },
					dirty & /*props*/ 4 && (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_spread_object)(/*props*/ ctx[2])
				])
			: {};

			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
				if (switch_instance) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();
					const old_component = switch_instance;

					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(old_component.$$.fragment, 1, 0, () => {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(old_component, 1);
					});

					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
				}

				if (switch_value) {
					switch_instance = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.construct_svelte_component)(switch_value, switch_props(ctx));
					switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(switch_instance.$$.fragment);
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(switch_instance.$$.fragment, 1);
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(switch_instance_anchor);
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(switch_instance, detaching);
		}
	};
}

function create_fragment(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*componentParams*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block);
			current = true;
		},
		o(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(if_block_anchor);
		}
	};
}

function wrap(component, userData, ...conditions) {
	// Use the new wrap method and show a deprecation warning
	// eslint-disable-next-line no-console
	console.warn('Method `wrap` from `svelte-spa-router` is deprecated and will be removed in a future version. Please use `svelte-spa-router/wrap` instead. See http://bit.ly/svelte-spa-router-upgrading');

	return (0,_wrap__WEBPACK_IMPORTED_MODULE_1__.wrap)({ component, userData, conditions });
}

/**
 * @typedef {Object} Location
 * @property {string} location - Location (page/view), for example `/book`
 * @property {string} [querystring] - Querystring from the hash, as a string not parsed
 */
/**
 * Returns the current location from the hash.
 *
 * @returns {Location} Location object
 * @private
 */
function getLocation() {
	const hashPosition = window.location.href.indexOf('#/');

	let location = hashPosition > -1
	? window.location.href.substr(hashPosition + 1)
	: '/';

	// Check if there's a querystring
	const qsPosition = location.indexOf('?');

	let querystring = '';

	if (qsPosition > -1) {
		querystring = location.substr(qsPosition + 1);
		location = location.substr(0, qsPosition);
	}

	return { location, querystring };
}

const loc = (0,svelte_store__WEBPACK_IMPORTED_MODULE_3__.readable)(null, // eslint-disable-next-line prefer-arrow-callback
function start(set) {
	set(getLocation());

	const update = () => {
		set(getLocation());
	};

	window.addEventListener('hashchange', update, false);

	return function stop() {
		window.removeEventListener('hashchange', update, false);
	};
});

const location = (0,svelte_store__WEBPACK_IMPORTED_MODULE_3__.derived)(loc, $loc => $loc.location);
const querystring = (0,svelte_store__WEBPACK_IMPORTED_MODULE_3__.derived)(loc, $loc => $loc.querystring);
const params = (0,svelte_store__WEBPACK_IMPORTED_MODULE_3__.writable)(undefined);

async function push(location) {
	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
		throw Error('Invalid parameter location');
	}

	// Execute this code when the current call stack is complete
	await (0,svelte__WEBPACK_IMPORTED_MODULE_2__.tick)();

	// Note: this will include scroll state in history even when restoreScrollState is false
	history.replaceState(
		{
			...history.state,
			__svelte_spa_router_scrollX: window.scrollX,
			__svelte_spa_router_scrollY: window.scrollY
		},
		undefined
	);

	window.location.hash = (location.charAt(0) == '#' ? '' : '#') + location;
}

async function pop() {
	// Execute this code when the current call stack is complete
	await (0,svelte__WEBPACK_IMPORTED_MODULE_2__.tick)();

	window.history.back();
}

async function replace(location) {
	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
		throw Error('Invalid parameter location');
	}

	// Execute this code when the current call stack is complete
	await (0,svelte__WEBPACK_IMPORTED_MODULE_2__.tick)();

	const dest = (location.charAt(0) == '#' ? '' : '#') + location;

	try {
		const newState = { ...history.state };
		delete newState['__svelte_spa_router_scrollX'];
		delete newState['__svelte_spa_router_scrollY'];
		window.history.replaceState(newState, undefined, dest);
	} catch(e) {
		// eslint-disable-next-line no-console
		console.warn('Caught exception while replacing the current page. If you\'re running this in the Svelte REPL, please note that the `replace` method might not work in this environment.');
	}

	// The method above doesn't trigger the hashchange event, so let's do that manually
	window.dispatchEvent(new Event('hashchange'));
}

function link(node, opts) {
	opts = linkOpts(opts);

	// Only apply to <a> tags
	if (!node || !node.tagName || node.tagName.toLowerCase() != 'a') {
		throw Error('Action "link" can only be used with <a> tags');
	}

	updateLink(node, opts);

	return {
		update(updated) {
			updated = linkOpts(updated);
			updateLink(node, updated);
		}
	};
}

function restoreScroll(state) {
	// If this exists, then this is a back navigation: restore the scroll position
	if (state) {
		window.scrollTo(state.__svelte_spa_router_scrollX, state.__svelte_spa_router_scrollY);
	} else {
		// Otherwise this is a forward navigation: scroll to top
		window.scrollTo(0, 0);
	}
}

// Internal function used by the link function
function updateLink(node, opts) {
	let href = opts.href || node.getAttribute('href');

	// Destination must start with '/' or '#/'
	if (href && href.charAt(0) == '/') {
		// Add # to the href attribute
		href = '#' + href;
	} else if (!href || href.length < 2 || href.slice(0, 2) != '#/') {
		throw Error('Invalid value for "href" attribute: ' + href);
	}

	node.setAttribute('href', href);

	node.addEventListener('click', event => {
		// Prevent default anchor onclick behaviour
		event.preventDefault();

		if (!opts.disabled) {
			scrollstateHistoryHandler(event.currentTarget.getAttribute('href'));
		}
	});
}

// Internal function that ensures the argument of the link action is always an object
function linkOpts(val) {
	if (val && typeof val == 'string') {
		return { href: val };
	} else {
		return val || {};
	}
}

/**
 * The handler attached to an anchor tag responsible for updating the
 * current history state with the current scroll state
 *
 * @param {string} href - Destination
 */
function scrollstateHistoryHandler(href) {
	// Setting the url (3rd arg) to href will break clicking for reasons, so don't try to do that
	history.replaceState(
		{
			...history.state,
			__svelte_spa_router_scrollX: window.scrollX,
			__svelte_spa_router_scrollY: window.scrollY
		},
		undefined
	);

	// This will force an update as desired, but this time our scroll state will be attached
	window.location.hash = href;
}

function instance($$self, $$props, $$invalidate) {
	let { routes = {} } = $$props;
	let { prefix = '' } = $$props;
	let { restoreScrollState = false } = $$props;

	/**
 * Container for a route: path, component
 */
	class RouteItem {
		/**
 * Initializes the object and creates a regular expression from the path, using regexparam.
 *
 * @param {string} path - Path to the route (must start with '/' or '*')
 * @param {SvelteComponent|WrappedComponent} component - Svelte component for the route, optionally wrapped
 */
		constructor(path, component) {
			if (!component || typeof component != 'function' && (typeof component != 'object' || component._sveltesparouter !== true)) {
				throw Error('Invalid component object');
			}

			// Path must be a regular or expression, or a string starting with '/' or '*'
			if (!path || typeof path == 'string' && (path.length < 1 || path.charAt(0) != '/' && path.charAt(0) != '*') || typeof path == 'object' && !(path instanceof RegExp)) {
				throw Error('Invalid value for "path" argument - strings must start with / or *');
			}

			const { pattern, keys } = (0,regexparam__WEBPACK_IMPORTED_MODULE_4__.parse)(path);
			this.path = path;

			// Check if the component is wrapped and we have conditions
			if (typeof component == 'object' && component._sveltesparouter === true) {
				this.component = component.component;
				this.conditions = component.conditions || [];
				this.userData = component.userData;
				this.props = component.props || {};
			} else {
				// Convert the component to a function that returns a Promise, to normalize it
				this.component = () => Promise.resolve(component);

				this.conditions = [];
				this.props = {};
			}

			this._pattern = pattern;
			this._keys = keys;
		}

		/**
 * Checks if `path` matches the current route.
 * If there's a match, will return the list of parameters from the URL (if any).
 * In case of no match, the method will return `null`.
 *
 * @param {string} path - Path to test
 * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
 */
		match(path) {
			// If there's a prefix, check if it matches the start of the path.
			// If not, bail early, else remove it before we run the matching.
			if (prefix) {
				if (typeof prefix == 'string') {
					if (path.startsWith(prefix)) {
						path = path.substr(prefix.length) || '/';
					} else {
						return null;
					}
				} else if (prefix instanceof RegExp) {
					const match = path.match(prefix);

					if (match && match[0]) {
						path = path.substr(match[0].length) || '/';
					} else {
						return null;
					}
				}
			}

			// Check if the pattern matches
			const matches = this._pattern.exec(path);

			if (matches === null) {
				return null;
			}

			// If the input was a regular expression, this._keys would be false, so return matches as is
			if (this._keys === false) {
				return matches;
			}

			const out = {};
			let i = 0;

			while (i < this._keys.length) {
				// In the match parameters, URL-decode all values
				try {
					out[this._keys[i]] = decodeURIComponent(matches[i + 1] || '') || null;
				} catch(e) {
					out[this._keys[i]] = null;
				}

				i++;
			}

			return out;
		}

		/**
 * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoading`, `routeLoaded` and `conditionsFailed` events
 * @typedef {Object} RouteDetail
 * @property {string|RegExp} route - Route matched as defined in the route definition (could be a string or a reguar expression object)
 * @property {string} location - Location path
 * @property {string} querystring - Querystring from the hash
 * @property {object} [userData] - Custom data passed by the user
 * @property {SvelteComponent} [component] - Svelte component (only in `routeLoaded` events)
 * @property {string} [name] - Name of the Svelte component (only in `routeLoaded` events)
 */
		/**
 * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
 * 
 * @param {RouteDetail} detail - Route detail
 * @returns {boolean} Returns true if all the conditions succeeded
 */
		async checkConditions(detail) {
			for (let i = 0; i < this.conditions.length; i++) {
				if (!await this.conditions[i](detail)) {
					return false;
				}
			}

			return true;
		}
	}

	// Set up all routes
	const routesList = [];

	if (routes instanceof Map) {
		// If it's a map, iterate on it right away
		routes.forEach((route, path) => {
			routesList.push(new RouteItem(path, route));
		});
	} else {
		// We have an object, so iterate on its own properties
		Object.keys(routes).forEach(path => {
			routesList.push(new RouteItem(path, routes[path]));
		});
	}

	// Props for the component to render
	let component = null;

	let componentParams = null;
	let props = {};

	// Event dispatcher from Svelte
	const dispatch = (0,svelte__WEBPACK_IMPORTED_MODULE_2__.createEventDispatcher)();

	// Just like dispatch, but executes on the next iteration of the event loop
	async function dispatchNextTick(name, detail) {
		// Execute this code when the current call stack is complete
		await (0,svelte__WEBPACK_IMPORTED_MODULE_2__.tick)();

		dispatch(name, detail);
	}

	// If this is set, then that means we have popped into this var the state of our last scroll position
	let previousScrollState = null;

	let popStateChanged = null;

	if (restoreScrollState) {
		popStateChanged = event => {
			// If this event was from our history.replaceState, event.state will contain
			// our scroll history. Otherwise, event.state will be null (like on forward
			// navigation)
			if (event.state && (event.state.__svelte_spa_router_scrollY || event.state.__svelte_spa_router_scrollX)) {
				previousScrollState = event.state;
			} else {
				previousScrollState = null;
			}
		};

		// This is removed in the destroy() invocation below
		window.addEventListener('popstate', popStateChanged);

		(0,svelte__WEBPACK_IMPORTED_MODULE_2__.afterUpdate)(() => {
			restoreScroll(previousScrollState);
		});
	}

	// Always have the latest value of loc
	let lastLoc = null;

	// Current object of the component loaded
	let componentObj = null;

	// Handle hash change events
	// Listen to changes in the $loc store and update the page
	// Do not use the $: syntax because it gets triggered by too many things
	const unsubscribeLoc = loc.subscribe(async newLoc => {
		lastLoc = newLoc;

		// Find a route matching the location
		let i = 0;

		while (i < routesList.length) {
			const match = routesList[i].match(newLoc.location);

			if (!match) {
				i++;
				continue;
			}

			const detail = {
				route: routesList[i].path,
				location: newLoc.location,
				querystring: newLoc.querystring,
				userData: routesList[i].userData,
				params: match && typeof match == 'object' && Object.keys(match).length
				? match
				: null
			};

			// Check if the route can be loaded - if all conditions succeed
			if (!await routesList[i].checkConditions(detail)) {
				// Don't display anything
				$$invalidate(0, component = null);

				componentObj = null;

				// Trigger an event to notify the user, then exit
				dispatchNextTick('conditionsFailed', detail);

				return;
			}

			// Trigger an event to alert that we're loading the route
			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
			dispatchNextTick('routeLoading', Object.assign({}, detail));

			// If there's a component to show while we're loading the route, display it
			const obj = routesList[i].component;

			// Do not replace the component if we're loading the same one as before, to avoid the route being unmounted and re-mounted
			if (componentObj != obj) {
				if (obj.loading) {
					$$invalidate(0, component = obj.loading);
					componentObj = obj;
					$$invalidate(1, componentParams = obj.loadingParams);
					$$invalidate(2, props = {});

					// Trigger the routeLoaded event for the loading component
					// Create a copy of detail so we don't modify the object for the dynamic route (and the dynamic route doesn't modify our object too)
					dispatchNextTick('routeLoaded', Object.assign({}, detail, {
						component,
						name: component.name,
						params: componentParams
					}));
				} else {
					$$invalidate(0, component = null);
					componentObj = null;
				}

				// Invoke the Promise
				const loaded = await obj();

				// Now that we're here, after the promise resolved, check if we still want this component, as the user might have navigated to another page in the meanwhile
				if (newLoc != lastLoc) {
					// Don't update the component, just exit
					return;
				}

				// If there is a "default" property, which is used by async routes, then pick that
				$$invalidate(0, component = loaded && loaded.default || loaded);

				componentObj = obj;
			}

			// Set componentParams only if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
			// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
			if (match && typeof match == 'object' && Object.keys(match).length) {
				$$invalidate(1, componentParams = match);
			} else {
				$$invalidate(1, componentParams = null);
			}

			// Set static props, if any
			$$invalidate(2, props = routesList[i].props);

			// Dispatch the routeLoaded event then exit
			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
			dispatchNextTick('routeLoaded', Object.assign({}, detail, {
				component,
				name: component.name,
				params: componentParams
			})).then(() => {
				params.set(componentParams);
			});

			return;
		}

		// If we're still here, there was no match, so show the empty component
		$$invalidate(0, component = null);

		componentObj = null;
		params.set(undefined);
	});

	(0,svelte__WEBPACK_IMPORTED_MODULE_2__.onDestroy)(() => {
		unsubscribeLoc();
		popStateChanged && window.removeEventListener('popstate', popStateChanged);
	});

	function routeEvent_handler(event) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bubble.call(this, $$self, event);
	}

	function routeEvent_handler_1(event) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bubble.call(this, $$self, event);
	}

	$$self.$$set = $$props => {
		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*restoreScrollState*/ 32) {
			// Update history.scrollRestoration depending on restoreScrollState
			$: history.scrollRestoration = restoreScrollState ? 'manual' : 'auto';
		}
	};

	return [
		component,
		componentParams,
		props,
		routes,
		prefix,
		restoreScrollState,
		routeEvent_handler,
		routeEvent_handler_1
	];
}

class Router extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {
			routes: 3,
			prefix: 4,
			restoreScrollState: 5
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Router);



/***/ }),

/***/ "./src/public/admin/sveltejs/allusers.svelte":
/*!***************************************************!*\
  !*** ./src/public/admin/sveltejs/allusers.svelte ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* src\public\admin\sveltejs\allusers.svelte generated by Svelte v3.55.1 */


function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (1:0) <script>      async function getAllUsers(url) {          const response = await fetch(url, {              method: 'GET',              headers: {                  'Content-Type': 'application/json',                  'X-Headers-change': 'change user data'              }
function create_catch_block(ctx) {
	return { c: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop, m: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop, p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop, d: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop };
}

// (51:0) {:then users}
function create_then_block(ctx) {
	let div;
	let each_value = /*users*/ ctx[1]['employees'];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div, "class", "users-wrapper");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p(ctx, dirty) {
			if (dirty & /*getAllUsers, revertHandler, friedHandler, roles*/ 1) {
				each_value = /*users*/ ctx[1]['employees'];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
		}
	};
}

// (53:8) {#each users['employees'] as user}
function create_each_block(ctx) {
	let div1;
	let p0;
	let t0;
	let t1_value = /*user*/ ctx[2].Name + "";
	let t1;
	let t2;
	let p1;
	let t3;
	let t4_value = /*user*/ ctx[2].Phone + "";
	let t4;
	let t5;
	let p2;
	let t6;
	let t7_value = /*user*/ ctx[2].Email + "";
	let t7;
	let t8;
	let p3;
	let t9;
	let t10_value = /*roles*/ ctx[0][/*user*/ ctx[2].RoleId] + "";
	let t10;
	let t11;
	let div0;
	let a0;
	let t12;
	let a0_href_value;
	let a0_id_value;
	let t13;
	let a1;
	let t14;
	let a1_href_value;
	let a1_id_value;
	let t15;
	let mounted;
	let dispose;

	return {
		c() {
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			p0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Имя: ");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Телефон: ");
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t4_value);
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Email: ");
			t7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t7_value);
			t8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t9 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Роль: ");
			t10 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t10_value);
			t11 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			a0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			t12 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Уволить");
			t13 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			a1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			t14 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Вернуть");
			t15 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a0, "href", a0_href_value = '#');
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a0, "id", a0_id_value = "fired-" + /*user*/ ctx[2].Id);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a1, "href", a1_href_value = '#');
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a1, "id", a1_id_value = "revert-" + /*user*/ ctx[2].Id);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "btns");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "class", "user-card");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, p0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p0, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p0, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, p1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p1, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p1, t4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, p2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p2, t6);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p2, t7);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t8);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, p3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p3, t9);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p3, t10);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t11);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, a0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(a0, t12);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, t13);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, a1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(a1, t14);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t15);

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(a0, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(friedHandler)),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(a1, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(revertHandler))
				];

				mounted = true;
			}
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div1);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};
}

// (49:47)       ...  {:then users}
function create_pending_block(ctx) {
	let t;

	return {
		c() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("...");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t);
		}
	};
}

function create_fragment(ctx) {
	let await_block_anchor;
	let promise;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: false,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 1
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise = getAllUsers('dashboard/get-all-users'), info);

	return {
		c() {
			await_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
			info.block.c();
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, await_block_anchor, anchor);
			info.block.m(target, info.anchor = anchor);
			info.mount = () => await_block_anchor.parentNode;
			info.anchor = await_block_anchor;
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_await_block_branch)(info, ctx, dirty);
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(await_block_anchor);
			info.block.d(detaching);
			info.token = null;
			info = null;
		}
	};
}

async function getAllUsers(url) {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Headers-change': 'change user data'
		}
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(errorText);
	}

	return response.json();
}

async function friedHandler(ev) {
	const id = ev.target.id.split('-')[1];
	await sendRequest('dashboard/user-fried', 'POST', { id: parseInt(id) });
}

async function revertHandler(ev) {
	const id = ev.target.id.split('-')[1];
	await sendRequest('dashboard/user-revert', 'POST', { id: parseInt(id) });
}

async function sendRequest(url, CRUDMethod, data) {
	const response = await fetch(url, {
		method: CRUDMethod,
		headers: {
			'Content-Type': 'application/json',
			'X-Headers-change': 'change user data'
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(errorText);
	}

	return response.json();
}

function instance($$self) {
	const roles = {
		1: "Обычный пользователь",
		2: "Администратор",
		3: "Разработчик"
	};

	return [roles];
}

class Allusers extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Allusers);

/***/ }),

/***/ "./src/public/admin/sveltejs/changeuserdata.svelte":
/*!*********************************************************!*\
  !*** ./src/public/admin/sveltejs/changeuserdata.svelte ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var svelte_easy_crop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte-easy-crop */ "./node_modules/svelte-easy-crop/index.js");
/* harmony import */ var svelte_input_mask_MaskInput_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! svelte-input-mask/MaskInput.svelte */ "./node_modules/svelte-input-mask/MaskInput.svelte");
/* src\public\admin\sveltejs\changeuserdata.svelte generated by Svelte v3.55.1 */






function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-1kh8gmi", ".cropper-overflow.svelte-1kh8gmi{position:absolute;z-index:9999999;width:100%;top:0;bottom:0;left:0;right:0;background-color:rgba(0, 0, 0, 0.96);display:flex;justify-content:center;align-items:center;flex-flow:column}.cropper-wrapper.svelte-1kh8gmi{position:relative;width:150px;height:150px;border-radius:50%}.photo-change.svelte-1kh8gmi{margin:15px 0}#avatar-frame.svelte-1kh8gmi{overflow:hidden;width:150px;height:150px}#accept.svelte-1kh8gmi{cursor:pointer;padding:3px 10px;background-color:aquamarine;border-radius:6px}#close-cropper.svelte-1kh8gmi{font-weight:bold;font-size:28px;position:absolute;color:#fff;text-decoration:none;top:10px;padding:3px 9px;border:1px solid #fff;border-radius:50%}#close-cropper.svelte-1kh8gmi:hover{color:#d2d2d2;border:1px solid #d2d2d2}");
}

// (229:4) {#if changePhoto}
function create_if_block(ctx) {
	let div2;
	let a;
	let a_href_value;
	let t1;
	let div0;
	let cropper;
	let updating_cropSize;
	let updating_zoom;
	let t2;
	let div1;
	let button;
	let current;
	let mounted;
	let dispose;

	function cropper_cropSize_binding(value) {
		/*cropper_cropSize_binding*/ ctx[17](value);
	}

	function cropper_zoom_binding(value) {
		/*cropper_zoom_binding*/ ctx[18](value);
	}

	let cropper_props = { aspect: 1, image: /*image*/ ctx[4] };

	if (/*cropSize*/ ctx[2] !== void 0) {
		cropper_props.cropSize = /*cropSize*/ ctx[2];
	}

	if (/*zoom*/ ctx[1] !== void 0) {
		cropper_props.zoom = /*zoom*/ ctx[1];
	}

	cropper = new svelte_easy_crop__WEBPACK_IMPORTED_MODULE_2__["default"]({ props: cropper_props });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(cropper, 'cropSize', cropper_cropSize_binding));
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(cropper, 'zoom', cropper_zoom_binding));
	cropper.$on("cropcomplete", /*handleCrop*/ ctx[12]);

	return {
		c() {
			div2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a.textContent = "×";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(cropper.$$.fragment);
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button.textContent = "применить";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "href", a_href_value = '#');
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "id", "close-cropper");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "class", "svelte-1kh8gmi");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "cropper-wrapper svelte-1kh8gmi");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(button, "class", "photo-change-control svelte-1kh8gmi");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(button, "id", "accept");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "class", "photo-change svelte-1kh8gmi");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div2, "class", "cropper-overflow svelte-1kh8gmi");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div2, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, a);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(cropper, div0, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, div1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, button);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*closeCopper*/ ctx[14])),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(button, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*avatarChangeAcceptHandler*/ ctx[13]))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			const cropper_changes = {};
			if (dirty & /*image*/ 16) cropper_changes.image = /*image*/ ctx[4];

			if (!updating_cropSize && dirty & /*cropSize*/ 4) {
				updating_cropSize = true;
				cropper_changes.cropSize = /*cropSize*/ ctx[2];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_cropSize = false);
			}

			if (!updating_zoom && dirty & /*zoom*/ 2) {
				updating_zoom = true;
				cropper_changes.zoom = /*zoom*/ ctx[1];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_zoom = false);
			}

			cropper.$set(cropper_changes);
		},
		i(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(cropper.$$.fragment, local);
			current = true;
		},
		o(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(cropper.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(cropper);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};
}

function create_fragment(ctx) {
	let div2;
	let h1;
	let t1;
	let form;
	let input0;
	let t2;
	let t3;
	let div0;
	let img;
	let img_src_value;
	let t4;
	let label0;
	let input1;
	let input1_value_value;
	let t5;
	let label1;
	let input2;
	let input2_value_value;
	let t6;
	let label2;
	let span;
	let maskinput;
	let t7;
	let label3;
	let input3;
	let t8;
	let label4;
	let input4;
	let t9;
	let label5;
	let input5;
	let input5_value_value;
	let t10;
	let button;
	let t12;
	let div1;
	let current;
	let mounted;
	let dispose;
	let if_block = /*changePhoto*/ ctx[3] && create_if_block(ctx);

	maskinput = new svelte_input_mask_MaskInput_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				alwaysShowMask: true,
				mask: "+7(000)-000-00-00",
				size: 20,
				showMask: true,
				maskChar: "_",
				value: /*user*/ ctx[0]?.phone || ''
			}
		});

	maskinput.$on("change", /*handleChange*/ ctx[15]);

	return {
		c() {
			div2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			h1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h1");
			h1.textContent = "Изменить свои данные:";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			form = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("form");
			input0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block) if_block.c();
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			img = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("img");
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(maskinput.$$.fragment);
			t7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t9 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t10 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button.textContent = "Изменить";
			t12 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "type", "file");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "accept", "image/*");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "id", "avatar-upload");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(input0, "display", "none");
			if (!(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.src_url_equal)(img.src, img_src_value = /*user*/ ctx[0]?.photo || '')) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "src", img_src_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "alt", "");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "tabindex", "-1");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "width", "150");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "id", "user-photo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "id", "avatar-frame");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "svelte-1kh8gmi");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "type", "text");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "id", "name");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "placeholder", "Имя");
			input1.value = input1_value_value = /*user*/ ctx[0]?.name || '';
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label0, "for", "name");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input2, "type", "email");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input2, "id", "email");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input2, "placeholder", "email");
			input2.value = input2_value_value = /*user*/ ctx[0]?.email || '';
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label1, "for", "email");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(span, "id", "phone");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label2, "for", "phone");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input3, "type", "password");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input3, "id", "old_pass");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input3, "placeholder", "Старый пароль");
			input3.value = "";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label3, "for", "old_pass");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input4, "type", "password");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input4, "id", "new_pass");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input4, "placeholder", "Новый пароль");
			input4.value = "";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label4, "for", "new_pass");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input5, "type", "text");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input5, "id", "about");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input5, "placeholder", "Информация о себе");
			input5.value = input5_value_value = /*user*/ ctx[0]?.about?.String || '';
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label5, "for", "about");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(button, "id", "send");
			button.disabled = "disabled";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "id", "error-form-msg");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(form, "id", "change-user-data");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(form, "method", "post");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div2, "class", "container");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div2, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, h1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, form);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, input0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t2);
			if (if_block) if_block.m(form, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, img);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, label0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label0, input1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, label1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label1, input2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t6);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, label2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label2, span);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(maskinput, span, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t7);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, label3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label3, input3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t8);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, label4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label4, input4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t9);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, label5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label5, input5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t10);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, button);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t12);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, div1);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input0, "change", /*handleFileInput*/ ctx[8]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(img, "click", /*changeAvatar*/ ctx[10]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(img, "keydown", /*changeAvatarOnKey*/ ctx[9]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input2, "change", /*emailValidator*/ ctx[5]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input3, "change", /*oldPassValidator*/ ctx[7]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input4, "change", /*newPassValidator*/ ctx[6]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input5, "change", /*aboutValidator*/ ctx[16]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(button, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*send*/ ctx[11]))
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*changePhoto*/ ctx[3]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*changePhoto*/ 8) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					if_block.m(form, t3);
				}
			} else if (if_block) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block, 1, 1, () => {
					if_block = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}

			if (!current || dirty & /*user*/ 1 && !(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.src_url_equal)(img.src, img_src_value = /*user*/ ctx[0]?.photo || '')) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "src", img_src_value);
			}

			if (!current || dirty & /*user*/ 1 && input1_value_value !== (input1_value_value = /*user*/ ctx[0]?.name || '') && input1.value !== input1_value_value) {
				input1.value = input1_value_value;
			}

			if (!current || dirty & /*user*/ 1 && input2_value_value !== (input2_value_value = /*user*/ ctx[0]?.email || '') && input2.value !== input2_value_value) {
				input2.value = input2_value_value;
			}

			const maskinput_changes = {};
			if (dirty & /*user*/ 1) maskinput_changes.value = /*user*/ ctx[0]?.phone || '';
			maskinput.$set(maskinput_changes);

			if (!current || dirty & /*user*/ 1 && input5_value_value !== (input5_value_value = /*user*/ ctx[0]?.about?.String || '') && input5.value !== input5_value_value) {
				input5.value = input5_value_value;
			}
		},
		i(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(maskinput.$$.fragment, local);
			current = true;
		},
		o(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(maskinput.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div2);
			if (if_block) if_block.d();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(maskinput);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};
}

async function sendRequest(url, CRUDMethod, data) {
	const response = await fetch(url, {
		method: CRUDMethod,
		headers: {
			'Content-Type': 'application/json',
			'X-Headers-change': 'change user data'
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(errorText);
	}

	return response;
}

function instance($$self, $$props, $$invalidate) {
	let sendBtn;
	let errMsg;
	let user = JSON.parse(localStorage.getItem('user'));
	let oldPass;
	let formInputs;
	let avatar;
	let avatarChangeAccept;
	let zoom = 2;
	let cropSize = { width: 150, height: 150 };
	let userPhoto;
	let about;

	(0,svelte__WEBPACK_IMPORTED_MODULE_1__.onMount)(() => {
		errMsg = document.querySelector('#error-form-msg');
		sendBtn = document.querySelector('#send');
		oldPass = document.getElementById('old_pass');
		about = document.getElementById('about');
		formInputs = document.querySelectorAll('#change-user-data input');
		avatar = document.getElementById('avatar-upload');
		avatarChangeAccept = document.getElementById('accept');
		userPhoto = document.getElementById('user-photo');
	});

	const errors = {};

	function printErrors() {
		let msg = ``;

		for (const error in errors) {
			msg += `${error}</br>`;
		}

		return msg;
	}

	function validator(target, cond, msg) {
		if (cond) {
			sendBtn.setAttribute('disabled', 'disabled');
			errors[msg] = true;
			errMsg.innerHTML = printErrors();
			target.style.border = "1px solid red";
		} else {
			delete errors[msg];

			if (Object.entries(errors).length === 0) {
				sendBtn.removeAttribute('disabled');
			}

			target.style.border = "none";
			errMsg.innerHTML = printErrors();
		}
	}

	function emailValidator(ev) {
		validator(ev.target, !ev.target.value.match(/^[a-zA-Z0-9-.]+@[a-zA-Z]+\.[a-zA-Z]+$/), "не верный формат email!");
	}

	function newPassValidator(ev) {
		const eTarget = ev.target;
		const isSmallNewPass = eTarget.value.length < 5 && eTarget.value !== "";

		(async () => {
			await oldPassValidator(oldPass);
			validator(eTarget, isSmallNewPass, "Пароль не может быть меньше 5 символов");
		})();
	}

	async function oldPassValidator(target) {
		target = target instanceof Event ? target.target : target;

		const isValid = async () => {
			try {
				await sendRequest('dashboard/compare-old-password', 'POST', { 'old_password': target.value });
				return false;
			} catch(e) {
				return true;
			}
		};

		const cond = await isValid();
		validator(target, cond, "Старый пароль введен неверно!");
	}

	function handleFileInput(event) {
		const file = event.target.files[0];
		const reader = new FileReader();
		let error = false;

		reader.onload = () => {
			$$invalidate(0, user.photo = reader.result, user);
		};

		reader.onerror = () => {
			error = true;
		};

		if (file) {
			reader.readAsDataURL(file);
		}

		validator(event.target, error, "Файл не подходит!");
	}

	function changeAvatarOnKey(ev) {
		if (ev.code === 'Space' || ev.key === ' ') {
			avatar.click(ev);
		}
	}

	let changePhoto = false;

	function changeAvatar() {
		avatar.click();
		$$invalidate(3, changePhoto = true);
		document.querySelector('body').style.overflow = 'hidden';
	}

	async function send() {
		let data = {};

		formInputs.forEach(item => {
			const value = item.value.trim();
			const id = item.id;

			if (id === "") {
				data['phone'] = value;
			} else {
				if (value !== "") {
					data[id] = value;
				}
			}
		});

		try {
			const response = await sendRequest('dashboard/change-user-data', 'PUT', data);
			const json = await response.json();
			$$invalidate(0, user.email = json.email, user);
			$$invalidate(0, user.name = json.name, user);
			$$invalidate(0, user.phone = json.phone, user);
			$$invalidate(0, user.about = json.about, user);
			localStorage.setItem('user', JSON.stringify(user));
			errMsg.innerHTML = "<span style='color: #0dfca2;'>данные изменены!</span>";
		} catch(e) {
			errMsg.innerHTML = "Не удалось отправить форму!";
		}
	}

	let image;
	let cropData = null;

	function handleCrop(data) {
		cropData = data;
	}

	async function avatarChangeAcceptHandler(ev) {
		if (cropData) {
			const crop = cropData.detail.pixels;
			$$invalidate(3, changePhoto = false);
			document.querySelector('body').removeAttribute('style');
			const input = document.getElementById('avatar-upload');
			const file = input.files[0];
			const formData = new FormData();
			formData.append('image', file);
			formData.append('data', JSON.stringify(crop));

			try {
				const response = await fetch('dashboard/upload-avatar', { method: 'POST', body: formData });

				if (response.ok) {
					let photo = await response.json();
					$$invalidate(0, user.photo = photo.photo, user);
					localStorage.setItem('user', JSON.stringify(user));
				} else {
					console.log('Произошла ошибка при загрузке изображения на сервер');
				}
			} catch(error) {
				console.log('Произошла ошибка:', error);
			}
		}
	}

	function closeCopper() {
		$$invalidate(3, changePhoto = false);
		document.querySelector('body').removeAttribute('style');
	}

	const handleChange = ({ detail }) => {
		const value = detail.inputState.maskedValue;
		validator(detail.element, !value.match(/^\+7\(\d+\)-\d{3}-\d{2}-\d{2}$/), 'телефон должен быть формата +7(XXX)-XXX-XX-XX');
	};

	const aboutValidator = ev => {
		const eTarget = ev.target;
		const isSmall = eTarget.value === "";
		validator(eTarget, isSmall, "О себе должно быть заполнено");
	};

	function cropper_cropSize_binding(value) {
		cropSize = value;
		$$invalidate(2, cropSize);
	}

	function cropper_zoom_binding(value) {
		zoom = value;
		$$invalidate(1, zoom);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*user*/ 1) {
			$: {
				$$invalidate(4, image = user.photo);
			}
		}
	};

	return [
		user,
		zoom,
		cropSize,
		changePhoto,
		image,
		emailValidator,
		newPassValidator,
		oldPassValidator,
		handleFileInput,
		changeAvatarOnKey,
		changeAvatar,
		send,
		handleCrop,
		avatarChangeAcceptHandler,
		closeCopper,
		handleChange,
		aboutValidator,
		cropper_cropSize_binding,
		cropper_zoom_binding
	];
}

class Changeuserdata extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {}, add_css);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Changeuserdata);

/***/ }),

/***/ "./src/public/admin/sveltejs/closebid.svelte":
/*!***************************************************!*\
  !*** ./src/public/admin/sveltejs/closebid.svelte ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* src\public\admin\sveltejs\closebid.svelte generated by Svelte v3.55.1 */


function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (1:0) <script>      async function getAppointments() {          const request = await fetch('dashboard/get-close-appointments', {              method: 'GET',              headers: {                  'Content-Type': 'application/json',                  'X-Headers-change': 'change user data'              }
function create_catch_block(ctx) {
	return { c: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop, m: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop, p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop, d: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop };
}

// (32:4) {:then appointments}
function create_then_block(ctx) {
	let each_1_anchor;
	let each_value = /*appointments*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*normalizeDate, Appointments*/ 1) {
				each_value = /*appointments*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(each_1_anchor);
		}
	};
}

// (33:8) {#each appointments as appointment}
function create_each_block(ctx) {
	let div;
	let p0;
	let t0;
	let t1_value = /*appointment*/ ctx[2].client_name + "";
	let t1;
	let t2;
	let p1;
	let t3;
	let t4_value = /*appointment*/ ctx[2].client_phone + "";
	let t4;
	let t5;
	let p2;
	let t6;
	let t7_value = /*appointment*/ ctx[2].client_email + "";
	let t7;
	let t8;
	let p3;
	let t9;
	let t10_value = normalizeDate(/*appointment*/ ctx[2].appointment_time) + "";
	let t10;
	let t11;
	let p4;
	let t12;
	let t13_value = normalizeDate(/*appointment*/ ctx[2].create_at) + "";
	let t13;
	let t14;

	return {
		c() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			p0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Имя: ");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Тел: ");
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t4_value);
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("email: ");
			t7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t7_value);
			t8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t9 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Время: ");
			t10 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t10_value);
			t11 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t12 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Создано: ");
			t13 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t13_value);
			t14 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p0, "class", "client-name");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p1, "class", "client-phone");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p2, "class", "client-email");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p3, "class", "client-timeslot");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p4, "class", "create-at");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div, "class", "appointment-card");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, p0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p0, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p0, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, p1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p1, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p1, t4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, p2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p2, t6);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p2, t7);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t8);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, p3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p3, t9);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p3, t10);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t11);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, p4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p4, t12);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p4, t13);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t14);
		},
		p(ctx, dirty) {
			if (dirty & /*Appointments*/ 1 && t1_value !== (t1_value = /*appointment*/ ctx[2].client_name + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t1, t1_value);
			if (dirty & /*Appointments*/ 1 && t4_value !== (t4_value = /*appointment*/ ctx[2].client_phone + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t4, t4_value);
			if (dirty & /*Appointments*/ 1 && t7_value !== (t7_value = /*appointment*/ ctx[2].client_email + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t7, t7_value);
			if (dirty & /*Appointments*/ 1 && t10_value !== (t10_value = normalizeDate(/*appointment*/ ctx[2].appointment_time) + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t10, t10_value);
			if (dirty & /*Appointments*/ 1 && t13_value !== (t13_value = normalizeDate(/*appointment*/ ctx[2].create_at) + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t13, t13_value);
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div);
		}
	};
}

// (30:25)           ...      {:then appointments}
function create_pending_block(ctx) {
	let t;

	return {
		c() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("...");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let promise;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: false,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 1
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise = /*Appointments*/ ctx[0], info);

	return {
		c() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			info.block.c();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div, "class", "appointments-wrapper");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div, anchor);
			info.block.m(div, info.anchor = null);
			info.mount = () => div;
			info.anchor = null;
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;
			info.ctx = ctx;

			if (dirty & /*Appointments*/ 1 && promise !== (promise = /*Appointments*/ ctx[0]) && (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise, info)) {
				
			} else {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_await_block_branch)(info, ctx, dirty);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div);
			info.block.d();
			info.token = null;
			info = null;
		}
	};
}

async function getAppointments() {
	const request = await fetch('dashboard/get-close-appointments', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Headers-change': 'change user data'
		}
	});

	if (!request.ok) {
		const errorText = await request.text();
		throw new Error(errorText);
	}

	return request.json();
}

function normalizeDate(date) {
	const regex = /^(\d+)-(\d+)-(\d+)T(\d+):(\d+)/;
	const match = regex.exec(date);

	return match
	? `${match[3]}.${match[2]}.${match[1]} ${match[4]}:${match[5]}`
	: date;
}

function instance($$self, $$props, $$invalidate) {
	let Appointments;

	$: {
		$$invalidate(0, Appointments = getAppointments());
	}

	return [Appointments];
}

class Closebid extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Closebid);

/***/ }),

/***/ "./src/public/admin/sveltejs/components/menu.svelte":
/*!**********************************************************!*\
  !*** ./src/public/admin/sveltejs/components/menu.svelte ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _menu_toggle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.toggle.js */ "./src/public/admin/sveltejs/components/menu.toggle.js");
/* src\public\admin\sveltejs\components\menu.svelte generated by Svelte v3.55.1 */




function create_fragment(ctx) {
	let nav;
	let ul;
	let li0;
	let a0;
	let a0_href_value;
	let t1;
	let li1;
	let mounted;
	let dispose;

	return {
		c() {
			nav = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("nav");
			ul = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("ul");
			li0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("li");
			a0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a0.textContent = "☰";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			li1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("li");

			li1.innerHTML = `<a href="${'#'}" id="employee-notification">🕭</a> 
      <a href="/" id="employee-navbar-logo">CreativeHair</a>`;

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a0, "href", a0_href_value = '#');
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a0, "id", "employee-navbar-btn");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(ul, "id", "employee-navbar-elem");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(nav, "id", "employee-navbar");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, nav, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(nav, ul);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(ul, li0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(li0, a0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(ul, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(ul, li1);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(a0, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(_menu_toggle_js__WEBPACK_IMPORTED_MODULE_1__.toggle));
				mounted = true;
			}
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(nav);
			mounted = false;
			dispose();
		}
	};
}

class Menu extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, null, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Menu);

/***/ }),

/***/ "./src/public/admin/sveltejs/components/sidebar.svelte":
/*!*************************************************************!*\
  !*** ./src/public/admin/sveltejs/components/sidebar.svelte ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes */ "./src/public/admin/sveltejs/components/routes.js");
/* harmony import */ var _sidebarmenu_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sidebarmenu.svelte */ "./src/public/admin/sveltejs/components/sidebarmenu.svelte");
/* src\public\admin\sveltejs\components\sidebar.svelte generated by Svelte v3.55.1 */





function create_fragment(ctx) {
	let sidebarmenu;
	let current;

	sidebarmenu = new _sidebarmenu_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: { menuItems: /*menuItems*/ ctx[0] }
		});

	return {
		c() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(sidebarmenu.$$.fragment);
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(sidebarmenu, target, anchor);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(sidebarmenu.$$.fragment, local);
			current = true;
		},
		o(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(sidebarmenu.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(sidebarmenu, detaching);
		}
	};
}

function instance($$self) {
	const menuItems = _routes__WEBPACK_IMPORTED_MODULE_1__.items;
	return [menuItems];
}

class Sidebar extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Sidebar);

/***/ }),

/***/ "./src/public/admin/sveltejs/components/sidebarmenu.svelte":
/*!*****************************************************************!*\
  !*** ./src/public/admin/sveltejs/components/sidebarmenu.svelte ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _menu_toggle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.toggle.js */ "./src/public/admin/sveltejs/components/menu.toggle.js");
/* harmony import */ var svelte_spa_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte-spa-router */ "./node_modules/svelte-spa-router/Router.svelte");
/* src\public\admin\sveltejs\components\sidebarmenu.svelte generated by Svelte v3.55.1 */





function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (38:4) {:else}
function create_else_block(ctx) {
	let li;
	let a;
	let t0_value = /*item*/ ctx[2].name + "";
	let t0;
	let a_href_value;
	let a_class_value;
	let link_action;
	let t1;
	let mounted;
	let dispose;

	return {
		c() {
			li = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("li");
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t0_value);
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "href", a_href_value = /*item*/ ctx[2].link);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "class", a_class_value = "sidebar-link " + (/*item*/ ctx[2].icon ?? ''));
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(li, "class", "sidebar-item");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, li, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(li, a);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(a, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(li, t1);

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*closeSidebar*/ ctx[1])),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.action_destroyer)(link_action = svelte_spa_router__WEBPACK_IMPORTED_MODULE_2__.link.call(null, a))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*menuItems*/ 1 && t0_value !== (t0_value = /*item*/ ctx[2].name + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t0, t0_value);

			if (dirty & /*menuItems*/ 1 && a_href_value !== (a_href_value = /*item*/ ctx[2].link)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "href", a_href_value);
			}

			if (dirty & /*menuItems*/ 1 && a_class_value !== (a_class_value = "sidebar-link " + (/*item*/ ctx[2].icon ?? ''))) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "class", a_class_value);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(li);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};
}

// (28:4) {#if item.subItems}
function create_if_block(ctx) {
	let li;
	let a;
	let t0_value = /*item*/ ctx[2].name + "";
	let t0;
	let span;
	let a_href_value;
	let a_class_value;
	let t1;
	let ul;
	let sidebarmenu;
	let t2;
	let current;
	let mounted;
	let dispose;

	sidebarmenu = new Sidebarmenu({
			props: { menuItems: /*item*/ ctx[2].subItems }
		});

	return {
		c() {
			li = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("li");
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t0_value);
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			ul = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("ul");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(sidebarmenu.$$.fragment);
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(span, "class", "has-submenu-icon icon-down-circle");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "href", a_href_value = '#');
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "class", a_class_value = "sidebar-link " + (/*item*/ ctx[2].icon ?? ''));
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "data-isshow", "false");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(ul, "class", "submenu");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(li, "class", "sidebar-item has-submenu");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, li, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(li, a);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(a, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(a, span);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(li, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(li, ul);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(sidebarmenu, ul, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(li, t2);
			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.stop_propagation)((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(openSubmenu)));
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if ((!current || dirty & /*menuItems*/ 1) && t0_value !== (t0_value = /*item*/ ctx[2].name + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t0, t0_value);

			if (!current || dirty & /*menuItems*/ 1 && a_class_value !== (a_class_value = "sidebar-link " + (/*item*/ ctx[2].icon ?? ''))) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "class", a_class_value);
			}

			const sidebarmenu_changes = {};
			if (dirty & /*menuItems*/ 1) sidebarmenu_changes.menuItems = /*item*/ ctx[2].subItems;
			sidebarmenu.$set(sidebarmenu_changes);
		},
		i(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(sidebarmenu.$$.fragment, local);
			current = true;
		},
		o(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(sidebarmenu.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(li);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(sidebarmenu);
			mounted = false;
			dispose();
		}
	};
}

// (27:0) {#each menuItems as item}
function create_each_block(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*item*/ ctx[2].subItems) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block);
			current = true;
		},
		o(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(if_block_anchor);
		}
	};
}

function create_fragment(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*menuItems*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*menuItems, openSubmenu, closeSidebar*/ 3) {
				each_value = /*menuItems*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(each_1_anchor);
		}
	};
}

function openSubmenu(event) {
	const target = event.currentTarget;
	const data = target.getAttribute('data-isShow');
	const isShow = data === 'true';
	const closeIcon = target.childNodes[1];
	const submenu = target.nextElementSibling;

	if (!isShow) {
		submenu.style.display = "block";
		closeIcon.classList.remove('icon-down-circle');
		closeIcon.classList.add('icon-right-circle');
	} else {
		submenu.style.display = "none";
		closeIcon.classList.remove('icon-right-circle');
		closeIcon.classList.add('icon-down-circle');
	}

	target.setAttribute('data-isShow', !isShow);
}

function instance($$self, $$props, $$invalidate) {
	let { menuItems = [] } = $$props;
	const closeSidebar = () => window.innerWidth < 1024 && (0,_menu_toggle_js__WEBPACK_IMPORTED_MODULE_1__.toggle)();

	$$self.$$set = $$props => {
		if ('menuItems' in $$props) $$invalidate(0, menuItems = $$props.menuItems);
	};

	return [menuItems, closeSidebar];
}

class Sidebarmenu extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { menuItems: 0 });
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Sidebarmenu);

/***/ }),

/***/ "./src/public/admin/sveltejs/createuser.svelte":
/*!*****************************************************!*\
  !*** ./src/public/admin/sveltejs/createuser.svelte ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte_input_mask_MaskInput_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte-input-mask/MaskInput.svelte */ "./node_modules/svelte-input-mask/MaskInput.svelte");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* src\public\admin\sveltejs\createuser.svelte generated by Svelte v3.55.1 */





function create_fragment(ctx) {
	let div1;
	let form;
	let label0;
	let input0;
	let t0;
	let label1;
	let input1;
	let t1;
	let label2;
	let input2;
	let t2;
	let label3;
	let input3;
	let t3;
	let label4;
	let span;
	let maskinput;
	let t4;
	let label5;
	let input4;
	let t5;
	let select;
	let option0;
	let option1;
	let option2;
	let t9;
	let button;
	let t11;
	let div0;
	let current;
	let mounted;
	let dispose;

	maskinput = new svelte_input_mask_MaskInput_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({
			props: {
				alwaysShowMask: true,
				mask: "+7(000)-000-00-00",
				size: 20,
				showMask: true,
				maskChar: "_",
				value: ""
			}
		});

	maskinput.$on("change", /*handleChange*/ ctx[0]);

	return {
		c() {
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			form = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("form");
			label0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(maskinput.$$.fragment);
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			select = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("select");
			option0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("option");
			option0.textContent = "Обычный сотрудник";
			option1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("option");
			option1.textContent = "Администратор";
			option2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("option");
			option2.textContent = "Разработчик";
			t9 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button.textContent = "Создать";
			t11 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "type", "text");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "id", "user_login");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "placeholder", "Логин");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label0, "for", "user_login");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "type", "password");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "id", "user_password");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "placeholder", "Пароль");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label1, "for", "user_password");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input2, "type", "text");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input2, "id", "user_name");
			input2.value = "";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input2, "placeholder", "Имя сотрудника");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label2, "for", "user_name");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input3, "type", "text");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input3, "id", "user_email");
			input3.value = "";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input3, "placeholder", "email");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label3, "for", "user_email");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(span, "id", "user_phone");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label4, "for", "user_phone");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input4, "type", "text");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input4, "id", "user_about");
			input4.value = "";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input4, "placeholder", "О сотруднике");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label5, "for", "user_about");
			option0.__value = "1";
			option0.value = option0.__value;
			option1.__value = "2";
			option1.value = option1.__value;
			option2.__value = "3";
			option2.value = option2.__value;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(select, "id", "user_role");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(button, "type", "submit");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(button, "id", "send");
			button.disabled = "disabled";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "error-msg");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(form, "id", "create-user");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "class", "create-user-wrapper");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, form);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, label0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label0, input0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, label1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label1, input1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, label2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label2, input2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, label3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label3, input3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, label4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label4, span);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(maskinput, span, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, label5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label5, input4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, select);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(select, option0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(select, option1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(select, option2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t9);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, button);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t11);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, div0);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input0, "change", /*loginValidate*/ ctx[1]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input1, "change", /*passwordValidator*/ ctx[5]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input2, "change", /*nameValidator*/ ctx[3]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input3, "change", /*emailValidator*/ ctx[2]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input4, "change", /*aboutValidator*/ ctx[4]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(button, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*createUser*/ ctx[6]))
				];

				mounted = true;
			}
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(maskinput.$$.fragment, local);
			current = true;
		},
		o(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(maskinput.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(maskinput);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};
}

async function sendRequest(url, CRUDMethod, data) {
	const response = await fetch(url, {
		method: CRUDMethod,
		headers: {
			'Content-Type': 'application/json',
			'X-Headers-change': 'change user data'
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(errorText);
	}

	return response.json();
}

function instance($$self) {
	let errors = {
		'Имя должно содержать больше 2 символов': true,
		'телефон должен быть формата +7(XXX)-XXX-XX-XX': true,
		'Пароль не может быть меньше 5 символов': true,
		'такой Логин уже есть': true,
		'Логин не может быть пустым': true,
		"не верный формат email!": true,
		'О сотруднике не может быть пустым': true
	};

	let sendBtn;
	let errMsg;
	let inputs;
	let userRole;

	(0,svelte__WEBPACK_IMPORTED_MODULE_2__.onMount)(async () => {
		userRole = document.getElementById('user_role');
		sendBtn = document.getElementById('send');
		errMsg = document.querySelector('.error-msg');
		inputs = document.querySelectorAll('#create-user input');
	});

	function printErrors() {
		let msg = ``;

		for (const error in errors) {
			msg += `${error}</br>`;
		}

		return msg;
	}

	function validator(target, cond, msg) {
		if (cond) {
			sendBtn.setAttribute('disabled', 'disabled');
			errors[msg] = true;
			errMsg.innerHTML = printErrors();
			target.style.border = "1px solid red";
		} else {
			delete errors[msg];

			if (Object.entries(errors).length === 0) {
				sendBtn.removeAttribute('disabled');
			}

			target.style.border = "none";
			errMsg.innerHTML = printErrors();
		}
	}

	const handleChange = ({ detail }) => {
		const value = detail.inputState.maskedValue;
		sendBtn = document.querySelector('#send');
		validator(detail.element, !value.match(/^\+7\(\d+\)-\d{3}-\d{2}-\d{2}$/), 'телефон должен быть формата +7(XXX)-XXX-XX-XX');
	};

	async function loginValidate(ev) {
		const val = ev.target.value;
		validator(ev.target, val.length < 2, "Логин не может быть пустым");
		let isValid = false;

		try {
			const response = await sendRequest('dashboard/has-login', 'POST', { login: val });
			isValid = false;
		} catch(e) {
			isValid = true;
		}

		validator(ev.target, isValid, "такой Логин уже есть");
	}

	function emailValidator(ev) {
		validator(ev.target, !ev.target.value.match(/^[a-zA-Z0-9-.]+@[a-zA-Z]+\.[a-zA-Z]+$/), "не верный формат email!");
	}

	function nameValidator(ev) {
		validator(ev.target, ev.target.value.length < 2, 'Имя должно содержать больше 2 символов');
	}

	function aboutValidator(ev) {
		validator(ev.target, ev.target.value.length < 1, 'О сотруднике не может быть пустым');
	}

	function passwordValidator(ev) {
		validator(ev.target, ev.target.value.length < 5, 'Пароль не может быть меньше 5 символов');
	}

	async function createUser() {
		let data = {};

		inputs.forEach(inp => {
			if (inp.id === "") {
				data['user_phone'] = inp.value;
			} else {
				data[inp.id] = inp.value;
			}
		});

		data['user_role'] = parseInt(userRole.value);

		try {
			const responsePromise = await sendRequest('dashboard/create-user', 'POST', data);
			errMsg.innerHTML = "Пользователь создан";
		} catch(e) {
			errMsg.innerHTML = e.message;
		}

		inputs.forEach(inp => {
			if (inp.id !== "") inp.value = "";
		});

		sendBtn.setAttribute('disabled', 'disabled');

		errors = {
			'Имя должно содержать больше 2 символов': true,
			'телефон должен быть формата +7(XXX)-XXX-XX-XX': true,
			'Пароль не может быть меньше 5 символов': true,
			'такой Логин уже есть': true,
			'Логин не может быть пустым': true,
			"не верный формат email!": true,
			'О сотруднике не может быть пустым': true
		};
	}

	return [
		handleChange,
		loginValidate,
		emailValidator,
		nameValidator,
		aboutValidator,
		passwordValidator,
		createUser
	];
}

class Createuser extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Createuser);

/***/ }),

/***/ "./src/public/admin/sveltejs/dashboard.svelte":
/*!****************************************************!*\
  !*** ./src/public/admin/sveltejs/dashboard.svelte ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _components_menu_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/menu.svelte */ "./src/public/admin/sveltejs/components/menu.svelte");
/* harmony import */ var _components_menu_toggle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/menu.toggle.js */ "./src/public/admin/sveltejs/components/menu.toggle.js");
/* harmony import */ var _components_sidebar_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/sidebar.svelte */ "./src/public/admin/sveltejs/components/sidebar.svelte");
/* harmony import */ var svelte_transition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! svelte/transition */ "./node_modules/svelte/transition/index.mjs");
/* harmony import */ var svelte_spa_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! svelte-spa-router */ "./node_modules/svelte-spa-router/Router.svelte");
/* harmony import */ var _components_routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/routes */ "./src/public/admin/sveltejs/components/routes.js");
/* src\public\admin\sveltejs\dashboard.svelte generated by Svelte v3.55.1 */









function create_if_block(ctx) {
	let ul;
	let sidebar;
	let t0;
	let li;
	let ul_transition;
	let current;
	sidebar = new _components_sidebar_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({});

	return {
		c() {
			ul = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("ul");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(sidebar.$$.fragment);
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			li = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("li");
			li.innerHTML = `<a href="/logout" class="sidebar-link">Выход</a>`;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(li, "class", "sidebar-item");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(ul, "id", "employee-sidebar");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(ul, "display", /*$visible*/ ctx[0] ? 'block' : 'none');
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, ul, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(sidebar, ul, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(ul, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(ul, li);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*$visible*/ 1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(ul, "display", /*$visible*/ ctx[0] ? 'block' : 'none');
			}
		},
		i(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(sidebar.$$.fragment, local);

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(() => {
				if (!ul_transition) ul_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(ul, svelte_transition__WEBPACK_IMPORTED_MODULE_4__.fly, { x: -500, duration: 250 }, true);
				ul_transition.run(1);
			});

			current = true;
		},
		o(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(sidebar.$$.fragment, local);
			if (!ul_transition) ul_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(ul, svelte_transition__WEBPACK_IMPORTED_MODULE_4__.fly, { x: -500, duration: 250 }, false);
			ul_transition.run(0);
			current = false;
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(ul);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(sidebar);
			if (detaching && ul_transition) ul_transition.end();
		}
	};
}

function create_fragment(ctx) {
	let menu;
	let t0;
	let div1;
	let t1;
	let div0;
	let router;
	let current;
	menu = new _components_menu_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({});
	let if_block = /*$visible*/ ctx[0] && create_if_block(ctx);
	router = new svelte_spa_router__WEBPACK_IMPORTED_MODULE_5__["default"]({ props: { routes: _components_routes__WEBPACK_IMPORTED_MODULE_6__.routes } });

	return {
		c() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(menu.$$.fragment);
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			if (if_block) if_block.c();
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(router.$$.fragment);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "id", "item");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "id", "employee-navbar-collapse");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(menu, target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div1, anchor);
			if (if_block) if_block.m(div1, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(router, div0, null);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*$visible*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*$visible*/ 1) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					if_block.m(div1, t1);
				}
			} else if (if_block) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block, 1, 1, () => {
					if_block = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}
		},
		i(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(menu.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(router.$$.fragment, local);
			current = true;
		},
		o(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(menu.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(router.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(menu, detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div1);
			if (if_block) if_block.d();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(router);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $visible;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _components_menu_toggle_js__WEBPACK_IMPORTED_MODULE_2__.visible, $$value => $$invalidate(0, $visible = $$value));
	return [$visible];
}

class Dashboard extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Dashboard);

/***/ }),

/***/ "./src/public/admin/sveltejs/openbid.svelte":
/*!**************************************************!*\
  !*** ./src/public/admin/sveltejs/openbid.svelte ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* src\public\admin\sveltejs\openbid.svelte generated by Svelte v3.55.1 */


function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

// (1:0) <script>      async function getAppointments() {          const request = await fetch('dashboard/get-open-appointments', {              method: 'GET',              headers: {                  'Content-Type': 'application/json',                  'X-Headers-change': 'change user data'              }
function create_catch_block(ctx) {
	return { c: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop, m: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop, p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop, d: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop };
}

// (75:4) {:then appointments}
function create_then_block(ctx) {
	let each_1_anchor;
	let each_value = /*appointments*/ ctx[3];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*Appointments, closeAppointment, cancelAppointment, normalizeDate*/ 7) {
				each_value = /*appointments*/ ctx[3];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(each_1_anchor);
		}
	};
}

// (76:8) {#each appointments as appointment}
function create_each_block(ctx) {
	let div1;
	let p0;
	let t0;
	let t1_value = /*appointment*/ ctx[4].client_name + "";
	let t1;
	let t2;
	let p1;
	let t3;
	let t4_value = /*appointment*/ ctx[4].client_phone + "";
	let t4;
	let t5;
	let p2;
	let t6;
	let t7_value = /*appointment*/ ctx[4].client_email + "";
	let t7;
	let t8;
	let p3;
	let t9;
	let t10_value = normalizeDate(/*appointment*/ ctx[4].appointment_time) + "";
	let t10;
	let t11;
	let p4;
	let t12;
	let t13_value = normalizeDate(/*appointment*/ ctx[4].create_at) + "";
	let t13;
	let t14;
	let div0;
	let a0;
	let a0_href_value;
	let t16;
	let a1;
	let a1_href_value;
	let div0_id_value;
	let t18;
	let mounted;
	let dispose;

	return {
		c() {
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			p0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Имя: ");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Тел: ");
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t4_value);
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("email: ");
			t7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t7_value);
			t8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t9 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Время: ");
			t10 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t10_value);
			t11 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t12 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Создано: ");
			t13 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t13_value);
			t14 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			a0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a0.textContent = "отменить";
			t16 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			a1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a1.textContent = "закрыть";
			t18 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p0, "class", "client-name");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p1, "class", "client-phone");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p2, "class", "client-email");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p3, "class", "client-timeslot");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p4, "class", "create-at");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a0, "href", a0_href_value = '#');
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a0, "class", "appointment-cancel");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a1, "href", a1_href_value = '#');
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a1, "class", "appointment-close");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "btn-appointment");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "id", div0_id_value = "appointment_" + /*appointment*/ ctx[4].Id + "_" + /*appointment*/ ctx[4].appointment_time);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "class", "appointment-card");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, p0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p0, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p0, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, p1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p1, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p1, t4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, p2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p2, t6);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p2, t7);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t8);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, p3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p3, t9);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p3, t10);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t11);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, p4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p4, t12);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p4, t13);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t14);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, a0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, t16);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, a1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t18);

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(a0, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*cancelAppointment*/ ctx[1])),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(a1, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*closeAppointment*/ ctx[2]))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*Appointments*/ 1 && t1_value !== (t1_value = /*appointment*/ ctx[4].client_name + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t1, t1_value);
			if (dirty & /*Appointments*/ 1 && t4_value !== (t4_value = /*appointment*/ ctx[4].client_phone + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t4, t4_value);
			if (dirty & /*Appointments*/ 1 && t7_value !== (t7_value = /*appointment*/ ctx[4].client_email + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t7, t7_value);
			if (dirty & /*Appointments*/ 1 && t10_value !== (t10_value = normalizeDate(/*appointment*/ ctx[4].appointment_time) + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t10, t10_value);
			if (dirty & /*Appointments*/ 1 && t13_value !== (t13_value = normalizeDate(/*appointment*/ ctx[4].create_at) + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t13, t13_value);

			if (dirty & /*Appointments*/ 1 && div0_id_value !== (div0_id_value = "appointment_" + /*appointment*/ ctx[4].Id + "_" + /*appointment*/ ctx[4].appointment_time)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "id", div0_id_value);
			}
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div1);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};
}

// (73:25)           ...      {:then appointments}
function create_pending_block(ctx) {
	let t;

	return {
		c() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("...");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let promise;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: false,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 3
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise = /*Appointments*/ ctx[0], info);

	return {
		c() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			info.block.c();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div, "class", "appointments-wrapper");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div, anchor);
			info.block.m(div, info.anchor = null);
			info.mount = () => div;
			info.anchor = null;
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;
			info.ctx = ctx;

			if (dirty & /*Appointments*/ 1 && promise !== (promise = /*Appointments*/ ctx[0]) && (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise, info)) {
				
			} else {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_await_block_branch)(info, ctx, dirty);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div);
			info.block.d();
			info.token = null;
			info = null;
		}
	};
}

async function getAppointments() {
	const request = await fetch('dashboard/get-open-appointments', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Headers-change': 'change user data'
		}
	});

	if (!request.ok) {
		const errorText = await request.text();
		throw new Error(errorText);
	}

	return request.json();
}

function normalizeDate(date) {
	const regex = /^(\d+)-(\d+)-(\d+)T(\d+):(\d+)/;
	const match = regex.exec(date);

	return match
	? `${match[3]}.${match[2]}.${match[1]} ${match[4]}:${match[5]}`
	: date;
}

function instance($$self, $$props, $$invalidate) {
	async function cancelAppointment(ev) {
		const id = ev.target.parentNode.id.split('_');

		const data = {
			"ID": parseInt(id[1]),
			"date": id[2].replace(/[A-Z]+\d+:.+/, ''),
			"time_slot": id[2].replace(/\d+-\d+-\d+[A-Za-z]|:\d{2}[A-Za-z]+/g, '')
		};

		fetch('dashboard/cancel-appointment', {
			method: 'POST',
			body: JSON.stringify(data)
		}).then(response => response.json()).then(data => {
			$$invalidate(0, Appointments = getAppointments());
		}).catch(error => {
			console.error('Error:', error);
		});
	}

	async function closeAppointment(ev) {
		const id = ev.target.parentNode.id.split('_');

		const data = {
			"ID": parseInt(id[1]),
			"date": id[2].replace(/[A-Z]+\d+:.+/, ''),
			"time_slot": id[2].replace(/\d+-\d+-\d+[A-Za-z]|:\d{2}[A-Za-z]+/g, '')
		};

		fetch('dashboard/close-appointment', {
			method: 'POST',
			body: JSON.stringify(data)
		}).then(response => response.json()).then(data => {
			$$invalidate(0, Appointments = getAppointments());
		}).catch(error => {
			console.error('Error:', error);
		});
	}

	let Appointments;

	$: {
		$$invalidate(0, Appointments = getAppointments());
	}

	return [Appointments, cancelAppointment, closeAppointment];
}

class Openbid extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Openbid);

/***/ }),

/***/ "./src/public/admin/sveltejs/schedule.svelte":
/*!***************************************************!*\
  !*** ./src/public/admin/sveltejs/schedule.svelte ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* src\public\admin\sveltejs\schedule.svelte generated by Svelte v3.55.1 */




function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[9] = list[i][0];
	child_ctx[10] = list[i][1];
	return child_ctx;
}

// (119:12) {#each Object.entries(weekend) as [key, value]}
function create_each_block(ctx) {
	let label;
	let t0_value = /*value*/ ctx[10].day + "";
	let t0;
	let t1;
	let input;
	let input_id_value;
	let input_checked_value;
	let t2;
	let label_for_value;
	let mounted;
	let dispose;

	return {
		c() {
			label = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t0_value);
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			input = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "type", "checkbox");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "id", input_id_value = `day-${/*key*/ ctx[9]}`);
			input.checked = input_checked_value = /*value*/ ctx[10].checked;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label, "for", label_for_value = `day-${/*key*/ ctx[9]}`);
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, label, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label, input);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label, t2);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input, "change", /*peekWeekends*/ ctx[4]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*weekend*/ 2 && t0_value !== (t0_value = /*value*/ ctx[10].day + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t0, t0_value);

			if (dirty & /*weekend*/ 2 && input_id_value !== (input_id_value = `day-${/*key*/ ctx[9]}`)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "id", input_id_value);
			}

			if (dirty & /*weekend*/ 2 && input_checked_value !== (input_checked_value = /*value*/ ctx[10].checked)) {
				input.checked = input_checked_value;
			}

			if (dirty & /*weekend*/ 2 && label_for_value !== (label_for_value = `day-${/*key*/ ctx[9]}`)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label, "for", label_for_value);
			}
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(label);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment(ctx) {
	let div2;
	let h1;
	let t1;
	let div0;
	let label0;
	let a;
	let a_href_value;
	let t3;
	let span;
	let t4;
	let label1;
	let t5;
	let input0;
	let input0_value_value;
	let t6;
	let label2;
	let t7;
	let input1;
	let input1_value_value;
	let t8;
	let label3;
	let t9;
	let input2;
	let input2_value_value;
	let t10;
	let t11;
	let div1;
	let t12;
	let button;
	let mounted;
	let dispose;
	let each_value = Object.entries(/*weekend*/ ctx[1]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			div2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			h1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h1");
			h1.textContent = "График работы:";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			label0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a.textContent = "Выходные дни";
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("открытие:\r\n      ");
			input0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			t7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("закрытие:\r\n      ");
			input1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			t9 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Интервал между стрижками:\r\n      ");
			input2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t10 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("\r\n      в часах");
			t11 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			t12 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button.textContent = "изменить";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "href", a_href_value = '#');
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "id", "schedule-weekend");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(span, "class", "dropdown-weekend");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label0, "for", "schedule-weekend");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label0, "id", "dropdown-wrapper");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "type", "time");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "id", "schedule-open");
			input0.value = input0_value_value = /*workSchedule*/ ctx[0]?.open || '';
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label1, "for", "schedule-open");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "type", "time");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "id", "schedule-close");
			input1.value = input1_value_value = /*workSchedule*/ ctx[0]?.close || '';
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label2, "for", "schedule-close");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input2, "type", "number");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input2, "id", "schedule-haircut_interval");
			input2.value = input2_value_value = /*workSchedule*/ ctx[0]?.haircut_interval || '';
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label3, "for", "schedule-haircut_interval");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "schedule_wrapper");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "class", "error");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(button, "id", "change-schedule");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div2, "id", "work_schedule");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div2, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, h1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, label0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label0, a);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label0, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label0, span);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(span, null);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, t4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, label1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label1, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label1, input0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, t6);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, label2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label2, t7);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label2, input1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, t8);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, label3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label3, t9);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label3, input2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label3, t10);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, t11);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, div1);
			div1.innerHTML = /*error*/ ctx[2];
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, t12);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, button);

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*dropDownHandler*/ ctx[3])),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(button, "click", /*changeSchedule*/ ctx[5])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*Object, weekend, peekWeekends*/ 18) {
				each_value = Object.entries(/*weekend*/ ctx[1]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(span, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*workSchedule*/ 1 && input0_value_value !== (input0_value_value = /*workSchedule*/ ctx[0]?.open || '') && input0.value !== input0_value_value) {
				input0.value = input0_value_value;
			}

			if (dirty & /*workSchedule*/ 1 && input1_value_value !== (input1_value_value = /*workSchedule*/ ctx[0]?.close || '') && input1.value !== input1_value_value) {
				input1.value = input1_value_value;
			}

			if (dirty & /*workSchedule*/ 1 && input2_value_value !== (input2_value_value = /*workSchedule*/ ctx[0]?.haircut_interval || '') && input2.value !== input2_value_value) {
				input2.value = input2_value_value;
			}

			if (dirty & /*error*/ 4) div1.innerHTML = /*error*/ ctx[2];;
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};
}

async function sendRequest(url, CRUDMethod, data) {
	const response = await fetch(url, {
		method: CRUDMethod,
		headers: {
			'Content-Type': 'application/json',
			'X-Headers-change': 'change user data'
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(errorText);
	}

	return response;
}

function instance($$self, $$props, $$invalidate) {
	let inputs;
	let dropDown;
	let workSchedule = {};

	const weekend = {
		'1': { day: 'Понедельник', checked: '' },
		'2': { day: 'Вторник', checked: '' },
		'3': { day: 'Среда', checked: '' },
		'4': { day: 'Четверг', checked: '' },
		'5': { day: 'Пятница', checked: '' },
		'6': { day: 'Суббота', checked: '' },
		'0': { day: 'Воскресенье', checked: '' }
	};

	(0,svelte__WEBPACK_IMPORTED_MODULE_1__.onMount)(() => {
		(async () => {
			const response = await fetch('dashboard/schedule', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Headers-change': 'change user data'
				}
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(errorText);
			}

			const jsonData = await response.json();
			let { open, close, haircut_interval, weekend_days } = jsonData;

			const convertForHtmlTime = microseconds => {
				const date = new Date(microseconds / 1000);
				const hour = String(date.getUTCHours()).padStart(2, '0');
				const minutes = String(date.getUTCMinutes()).padStart(2, '0');
				return `${hour}:${minutes}`;
			};

			open = convertForHtmlTime(open['Microseconds']);
			close = convertForHtmlTime(close['Microseconds']);
			haircut_interval = new Date(haircut_interval['Microseconds'] / 1000).getUTCHours();

			$$invalidate(0, workSchedule = {
				open,
				close,
				haircut_interval,
				weekend_days
			});

			workSchedule.weekend_days.forEach(day => {
				$$invalidate(1, weekend[day].checked = 'checked', weekend);
			});
		})();

		inputs = document.querySelectorAll('input');
		dropDown = document.querySelector('.dropdown-weekend');
	});

	let isOpen = false;

	function dropDownHandler() {
		isOpen = !isOpen;
		dropDown.style.display = isOpen ? 'flex' : 'none';
	}

	function peekWeekends(ev) {
		const day = ev.target.id.split('-')[1];
		$$invalidate(1, weekend[day].checked = weekend[day].checked === '' ? 'checked' : '', weekend);
	}

	let error = '';

	async function changeSchedule() {
		let data = {};
		let weekendChecked = [];

		inputs.forEach(inp => {
			let key = inp.id.split('-')[1];

			if (inp.type === 'checkbox') {
				if (inp.checked) weekendChecked.push(parseInt(key));
			} else {
				if (inp.value !== '') data[key] = inp.value;
			}
		});

		if (weekendChecked.length > 0) data['weekend_days'] = weekendChecked;

		try {
			await sendRequest('dashboard/schedule', 'PUT', data);
			$$invalidate(2, error = `<span style="color: #2beea3">изменено</span>`);
		} catch(e) {
			$$invalidate(2, error = `<span style="color: #ff2e7f">Ошибка: ${e.message}</span>`);
		}
	}

	return [workSchedule, weekend, error, dropDownHandler, peekWeekends, changeSchedule];
}

class Schedule extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Schedule);

/***/ }),

/***/ "./src/public/admin/sveltejs/usergallery.svelte":
/*!******************************************************!*\
  !*** ./src/public/admin/sveltejs/usergallery.svelte ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* src\public\admin\sveltejs\usergallery.svelte generated by Svelte v3.55.1 */


function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-1320gkt", ".img-wrapper.svelte-1320gkt{width:200px;margin:5px;position:relative}.remove-photo.svelte-1320gkt{position:absolute;left:42%;top:30%;background:#ffffff94;padding:5px 10px;border-radius:50%;text-decoration:none;font-size:20px;font-weight:bold;color:red}.gallery.svelte-1320gkt{padding:20px 10px;display:flex;justify-content:center}img.svelte-1320gkt{border-radius:8px}button.svelte-1320gkt{margin:5px}");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

// (83:4) {:catch e}
function create_catch_block(ctx) {
	let t_value = /*e*/ ctx[7] + "";
	let t;

	return {
		c() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_value);
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*gallery*/ 1 && t_value !== (t_value = /*e*/ ctx[7] + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t, t_value);
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t);
		}
	};
}

// (76:4) {:then photos}
function create_then_block(ctx) {
	let each_1_anchor;
	let each_value = /*photos*/ ctx[3]['gallery'];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*gallery, removePhoto*/ 5) {
				each_value = /*photos*/ ctx[3]['gallery'];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(each_1_anchor);
		}
	};
}

// (77:8) {#each photos['gallery'] as photo}
function create_each_block(ctx) {
	let div;
	let img;
	let img_src_value;
	let t0;
	let a;
	let t1;
	let a_href_value;
	let a_id_value;
	let t2;
	let mounted;
	let dispose;

	return {
		c() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			img = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("img");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("✕");
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (!(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.src_url_equal)(img.src, img_src_value = /*photo*/ ctx[4].ImageURL)) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "src", img_src_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "alt", "");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "class", "svelte-1320gkt");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "href", a_href_value = '#');
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "class", "remove-photo svelte-1320gkt");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "id", a_id_value = /*photo*/ ctx[4].ID);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div, "class", "img-wrapper svelte-1320gkt");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, img);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, a);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(a, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t2);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*removePhoto*/ ctx[2]));
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*gallery*/ 1 && !(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.src_url_equal)(img.src, img_src_value = /*photo*/ ctx[4].ImageURL)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "src", img_src_value);
			}

			if (dirty & /*gallery*/ 1 && a_id_value !== (a_id_value = /*photo*/ ctx[4].ID)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "id", a_id_value);
			}
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div);
			mounted = false;
			dispose();
		}
	};
}

// (74:20)           ...      {:then photos}
function create_pending_block(ctx) {
	let t;

	return {
		c() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("...");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t);
		}
	};
}

function create_fragment(ctx) {
	let div0;
	let form;
	let input;
	let t0;
	let button;
	let t2;
	let div1;
	let promise;
	let mounted;
	let dispose;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: true,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 3,
		error: 7
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise = /*gallery*/ ctx[0], info);

	return {
		c() {
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			form = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("form");
			input = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button.textContent = "Upload";
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			info.block.c();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "type", "file");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "id", "photoInput");
			input.multiple = true;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(button, "class", "svelte-1320gkt");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(form, "action", "");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(form, "method", "post");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "form-wrapper");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "class", "gallery svelte-1320gkt");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, form);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, input);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, button);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t2, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div1, anchor);
			info.block.m(div1, info.anchor = null);
			info.mount = () => div1;
			info.anchor = null;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(button, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*uploadPhotos*/ ctx[1]));
				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;
			info.ctx = ctx;

			if (dirty & /*gallery*/ 1 && promise !== (promise = /*gallery*/ ctx[0]) && (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise, info)) {
				
			} else {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_await_block_branch)(info, ctx, dirty);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t2);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div1);
			info.block.d();
			info.token = null;
			info = null;
			mounted = false;
			dispose();
		}
	};
}

async function getGallery() {
	const request = await fetch('dashboard/get-gallery', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Headers-change': 'change user data'
		}
	});

	if (!request.ok) {
		const errorText = await request.text();
		throw new Error(errorText);
	}

	return request.json();
}

function instance($$self, $$props, $$invalidate) {
	function uploadPhotos() {
		const fileInput = document.getElementById('photoInput');
		const files = fileInput.files;
		if (files.length < 1) return;
		const formData = new FormData();

		for (let i = 0; i < files.length; i++) {
			formData.append('photos', files[i]);
		}

		fetch('dashboard/add-photos', { method: 'POST', body: formData }).then(response => response.json()).then(data => {
			console.log(data);
			fileInput.value = "";
			$$invalidate(0, gallery = getGallery());
		}).catch(error => {
			console.error('Error:', error);
		});
	}

	async function removePhoto(ev) {
		const data = { "ID": parseInt(ev.target.id) };

		fetch('dashboard/remove-photo', {
			method: 'POST',
			body: JSON.stringify(data)
		}).then(response => response.json()).then(data => {
			$$invalidate(0, gallery = getGallery());
		}).catch(error => {
			console.error('Error:', error);
		});
	}

	let gallery;

	$: {
		$$invalidate(0, gallery = getGallery());
	}

	return [gallery, uploadPhotos, removePhoto];
}

class Usergallery extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {}, add_css);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Usergallery);

/***/ }),

/***/ "./node_modules/svelte-spa-router/wrap.js":
/*!************************************************!*\
  !*** ./node_modules/svelte-spa-router/wrap.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wrap": function() { return /* binding */ wrap; }
/* harmony export */ });
/**
 * @typedef {Object} WrappedComponent Object returned by the `wrap` method
 * @property {SvelteComponent} component - Component to load (this is always asynchronous)
 * @property {RoutePrecondition[]} [conditions] - Route pre-conditions to validate
 * @property {Object} [props] - Optional dictionary of static props
 * @property {Object} [userData] - Optional user data dictionary
 * @property {bool} _sveltesparouter - Internal flag; always set to true
 */

/**
 * @callback AsyncSvelteComponent
 * @returns {Promise<SvelteComponent>} Returns a Promise that resolves with a Svelte component
 */

/**
 * @callback RoutePrecondition
 * @param {RouteDetail} detail - Route detail object
 * @returns {boolean|Promise<boolean>} If the callback returns a false-y value, it's interpreted as the precondition failed, so it aborts loading the component (and won't process other pre-condition callbacks)
 */

/**
 * @typedef {Object} WrapOptions Options object for the call to `wrap`
 * @property {SvelteComponent} [component] - Svelte component to load (this is incompatible with `asyncComponent`)
 * @property {AsyncSvelteComponent} [asyncComponent] - Function that returns a Promise that fulfills with a Svelte component (e.g. `{asyncComponent: () => import('Foo.svelte')}`)
 * @property {SvelteComponent} [loadingComponent] - Svelte component to be displayed while the async route is loading (as a placeholder); when unset or false-y, no component is shown while component
 * @property {object} [loadingParams] - Optional dictionary passed to the `loadingComponent` component as params (for an exported prop called `params`)
 * @property {object} [userData] - Optional object that will be passed to events such as `routeLoading`, `routeLoaded`, `conditionsFailed`
 * @property {object} [props] - Optional key-value dictionary of static props that will be passed to the component. The props are expanded with {...props}, so the key in the dictionary becomes the name of the prop.
 * @property {RoutePrecondition[]|RoutePrecondition} [conditions] - Route pre-conditions to add, which will be executed in order
 */

/**
 * Wraps a component to enable multiple capabilities:
 * 1. Using dynamically-imported component, with (e.g. `{asyncComponent: () => import('Foo.svelte')}`), which also allows bundlers to do code-splitting.
 * 2. Adding route pre-conditions (e.g. `{conditions: [...]}`)
 * 3. Adding static props that are passed to the component
 * 4. Adding custom userData, which is passed to route events (e.g. route loaded events) or to route pre-conditions (e.g. `{userData: {foo: 'bar}}`)
 * 
 * @param {WrapOptions} args - Arguments object
 * @returns {WrappedComponent} Wrapped component
 */
function wrap(args) {
    if (!args) {
        throw Error('Parameter args is required')
    }

    // We need to have one and only one of component and asyncComponent
    // This does a "XNOR"
    if (!args.component == !args.asyncComponent) {
        throw Error('One and only one of component and asyncComponent is required')
    }

    // If the component is not async, wrap it into a function returning a Promise
    if (args.component) {
        args.asyncComponent = () => Promise.resolve(args.component)
    }

    // Parameter asyncComponent and each item of conditions must be functions
    if (typeof args.asyncComponent != 'function') {
        throw Error('Parameter asyncComponent must be a function')
    }
    if (args.conditions) {
        // Ensure it's an array
        if (!Array.isArray(args.conditions)) {
            args.conditions = [args.conditions]
        }
        for (let i = 0; i < args.conditions.length; i++) {
            if (!args.conditions[i] || typeof args.conditions[i] != 'function') {
                throw Error('Invalid parameter conditions[' + i + ']')
            }
        }
    }

    // Check if we have a placeholder component
    if (args.loadingComponent) {
        args.asyncComponent.loading = args.loadingComponent
        args.asyncComponent.loadingParams = args.loadingParams || undefined
    }

    // Returns an object that contains all the functions to execute too
    // The _sveltesparouter flag is to confirm the object was created by this router
    const obj = {
        component: args.asyncComponent,
        userData: args.userData,
        conditions: (args.conditions && args.conditions.length) ? args.conditions : undefined,
        props: (args.props && Object.keys(args.props).length) ? args.props : {},
        _sveltesparouter: true
    }

    return obj
}

/* harmony default export */ __webpack_exports__["default"] = (wrap);


/***/ }),

/***/ "./node_modules/regexparam/dist/index.mjs":
/*!************************************************!*\
  !*** ./node_modules/regexparam/dist/index.mjs ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "inject": function() { return /* binding */ inject; },
/* harmony export */   "parse": function() { return /* binding */ parse; }
/* harmony export */ });
function parse(str, loose) {
	if (str instanceof RegExp) return { keys:false, pattern:str };
	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
	arr[0] || arr.shift();

	while (tmp = arr.shift()) {
		c = tmp[0];
		if (c === '*') {
			keys.push('wild');
			pattern += '/(.*)';
		} else if (c === ':') {
			o = tmp.indexOf('?', 1);
			ext = tmp.indexOf('.', 1);
			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
		} else {
			pattern += '/' + tmp;
		}
	}

	return {
		keys: keys,
		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
	};
}

var RGX = /*#__PURE__*/ /(\/|^)([:*][^/]*?)(\?)?(?=[/.]|$)/g;

// error if key missing?
function inject(route, values) {
	return route.replace(RGX, (x, lead, key, optional) => {
		x = values[key=='*' ? 'wild' : key.substring(1)];
		return x ? '/'+x : (optional || key=='*') ? '' : '/' + key;
	});
}


/***/ }),

/***/ "./node_modules/svelte-easy-crop/helpers.js":
/*!**************************************************!*\
  !*** ./node_modules/svelte-easy-crop/helpers.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computeCroppedArea": function() { return /* binding */ computeCroppedArea; },
/* harmony export */   "getCenter": function() { return /* binding */ getCenter; },
/* harmony export */   "getCropSize": function() { return /* binding */ getCropSize; },
/* harmony export */   "getDistanceBetweenPoints": function() { return /* binding */ getDistanceBetweenPoints; },
/* harmony export */   "restrictPosition": function() { return /* binding */ restrictPosition; }
/* harmony export */ });
/**
 * Compute the dimension of the crop area based on image size and aspect ratio
 * @param imgWidth width of the src image in pixels
 * @param imgHeight height of the src image in pixels
 * @param aspect aspect ratio of the crop
 */
function getCropSize(imgWidth, imgHeight, aspect) {
    if (imgWidth >= imgHeight * aspect) {
        return {
            width: imgHeight * aspect,
            height: imgHeight,
        };
    }
    return {
        width: imgWidth,
        height: imgWidth / aspect,
    };
}
/**
 * Ensure a new image position stays in the crop area.
 * @param position new x/y position requested for the image
 * @param imageSize width/height of the src image
 * @param cropSize width/height of the crop area
 * @param  zoom zoom value
 * @returns
 */
function restrictPosition(position, imageSize, cropSize, zoom) {
    return {
        x: restrictPositionCoord(position.x, imageSize.width, cropSize.width, zoom),
        y: restrictPositionCoord(position.y, imageSize.height, cropSize.height, zoom),
    };
}
function restrictPositionCoord(position, imageSize, cropSize, zoom) {
    const maxPosition = (imageSize * zoom) / 2 - cropSize / 2;
    return Math.min(maxPosition, Math.max(position, -maxPosition));
}
function getDistanceBetweenPoints(pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2));
}
/**
 * Compute the output cropped area of the image in percentages and pixels.
 * x/y are the top-left coordinates on the src image
 * @param  crop x/y position of the current center of the image
 * @param  imageSize width/height of the src image (default is size on the screen, natural is the original size)
 * @param  cropSize width/height of the crop area
 * @param aspect aspect value
 * @param zoom zoom value
 * @param restrictPosition whether we should limit or not the cropped area
 */
function computeCroppedArea(crop, imgSize, cropSize, aspect, zoom, restrictPosition = true) {
    const limitAreaFn = restrictPosition ? limitArea : noOp;
    const croppedAreaPercentages = {
        x: limitAreaFn(100, (((imgSize.width - cropSize.width / zoom) / 2 - crop.x / zoom) / imgSize.width) * 100),
        y: limitAreaFn(100, (((imgSize.height - cropSize.height / zoom) / 2 - crop.y / zoom) / imgSize.height) * 100),
        width: limitAreaFn(100, ((cropSize.width / imgSize.width) * 100) / zoom),
        height: limitAreaFn(100, ((cropSize.height / imgSize.height) * 100) / zoom),
    };
    // we compute the pixels size naively
    const widthInPixels = limitAreaFn(imgSize.naturalWidth, (croppedAreaPercentages.width * imgSize.naturalWidth) / 100, true);
    const heightInPixels = limitAreaFn(imgSize.naturalHeight, (croppedAreaPercentages.height * imgSize.naturalHeight) / 100, true);
    const isImgWiderThanHigh = imgSize.naturalWidth >= imgSize.naturalHeight * aspect;
    // then we ensure the width and height exactly match the aspect (to avoid rounding approximations)
    // if the image is wider than high, when zoom is 0, the crop height will be equals to iamge height
    // thus we want to compute the width from the height and aspect for accuracy.
    // Otherwise, we compute the height from width and aspect.
    const sizePixels = isImgWiderThanHigh
        ? {
            width: Math.round(heightInPixels * aspect),
            height: heightInPixels,
        }
        : {
            width: widthInPixels,
            height: Math.round(widthInPixels / aspect),
        };
    const croppedAreaPixels = {
        ...sizePixels,
        x: limitAreaFn(imgSize.naturalWidth - sizePixels.width, (croppedAreaPercentages.x * imgSize.naturalWidth) / 100, true),
        y: limitAreaFn(imgSize.naturalHeight - sizePixels.height, (croppedAreaPercentages.y * imgSize.naturalHeight) / 100, true),
    };
    return { croppedAreaPercentages, croppedAreaPixels };
}
/**
 * Ensure the returned value is between 0 and max
 * @param max
 * @param value
 * @param shouldRound
 */
function limitArea(max, value, shouldRound = false) {
    const v = shouldRound ? Math.round(value) : value;
    return Math.min(max, Math.max(0, v));
}
function noOp(max, value) {
    return value;
}
/**
 * Return the point that is the center of point a and b
 * @param a
 * @param b
 */
function getCenter(a, b) {
    return {
        x: (b.x + a.x) / 2,
        y: (b.y + a.y) / 2,
    };
}


/***/ }),

/***/ "./node_modules/svelte-easy-crop/index.js":
/*!************************************************!*\
  !*** ./node_modules/svelte-easy-crop/index.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Cropper_svelte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cropper.svelte */ "./node_modules/svelte-easy-crop/Cropper.svelte");

/* harmony default export */ __webpack_exports__["default"] = (_Cropper_svelte__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/svelte/easing/index.mjs":
/*!**********************************************!*\
  !*** ./node_modules/svelte/easing/index.mjs ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "backIn": function() { return /* binding */ backIn; },
/* harmony export */   "backInOut": function() { return /* binding */ backInOut; },
/* harmony export */   "backOut": function() { return /* binding */ backOut; },
/* harmony export */   "bounceIn": function() { return /* binding */ bounceIn; },
/* harmony export */   "bounceInOut": function() { return /* binding */ bounceInOut; },
/* harmony export */   "bounceOut": function() { return /* binding */ bounceOut; },
/* harmony export */   "circIn": function() { return /* binding */ circIn; },
/* harmony export */   "circInOut": function() { return /* binding */ circInOut; },
/* harmony export */   "circOut": function() { return /* binding */ circOut; },
/* harmony export */   "cubicIn": function() { return /* binding */ cubicIn; },
/* harmony export */   "cubicInOut": function() { return /* binding */ cubicInOut; },
/* harmony export */   "cubicOut": function() { return /* binding */ cubicOut; },
/* harmony export */   "elasticIn": function() { return /* binding */ elasticIn; },
/* harmony export */   "elasticInOut": function() { return /* binding */ elasticInOut; },
/* harmony export */   "elasticOut": function() { return /* binding */ elasticOut; },
/* harmony export */   "expoIn": function() { return /* binding */ expoIn; },
/* harmony export */   "expoInOut": function() { return /* binding */ expoInOut; },
/* harmony export */   "expoOut": function() { return /* binding */ expoOut; },
/* harmony export */   "linear": function() { return /* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.identity; },
/* harmony export */   "quadIn": function() { return /* binding */ quadIn; },
/* harmony export */   "quadInOut": function() { return /* binding */ quadInOut; },
/* harmony export */   "quadOut": function() { return /* binding */ quadOut; },
/* harmony export */   "quartIn": function() { return /* binding */ quartIn; },
/* harmony export */   "quartInOut": function() { return /* binding */ quartInOut; },
/* harmony export */   "quartOut": function() { return /* binding */ quartOut; },
/* harmony export */   "quintIn": function() { return /* binding */ quintIn; },
/* harmony export */   "quintInOut": function() { return /* binding */ quintInOut; },
/* harmony export */   "quintOut": function() { return /* binding */ quintOut; },
/* harmony export */   "sineIn": function() { return /* binding */ sineIn; },
/* harmony export */   "sineInOut": function() { return /* binding */ sineInOut; },
/* harmony export */   "sineOut": function() { return /* binding */ sineOut; }
/* harmony export */ });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");


/*
Adapted from https://github.com/mattdesl
Distributed under MIT License https://github.com/mattdesl/eases/blob/master/LICENSE.md
*/
function backInOut(t) {
    const s = 1.70158 * 1.525;
    if ((t *= 2) < 1)
        return 0.5 * (t * t * ((s + 1) * t - s));
    return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
}
function backIn(t) {
    const s = 1.70158;
    return t * t * ((s + 1) * t - s);
}
function backOut(t) {
    const s = 1.70158;
    return --t * t * ((s + 1) * t + s) + 1;
}
function bounceOut(t) {
    const a = 4.0 / 11.0;
    const b = 8.0 / 11.0;
    const c = 9.0 / 10.0;
    const ca = 4356.0 / 361.0;
    const cb = 35442.0 / 1805.0;
    const cc = 16061.0 / 1805.0;
    const t2 = t * t;
    return t < a
        ? 7.5625 * t2
        : t < b
            ? 9.075 * t2 - 9.9 * t + 3.4
            : t < c
                ? ca * t2 - cb * t + cc
                : 10.8 * t * t - 20.52 * t + 10.72;
}
function bounceInOut(t) {
    return t < 0.5
        ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
        : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
}
function bounceIn(t) {
    return 1.0 - bounceOut(1.0 - t);
}
function circInOut(t) {
    if ((t *= 2) < 1)
        return -0.5 * (Math.sqrt(1 - t * t) - 1);
    return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
}
function circIn(t) {
    return 1.0 - Math.sqrt(1.0 - t * t);
}
function circOut(t) {
    return Math.sqrt(1 - --t * t);
}
function cubicInOut(t) {
    return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
}
function cubicIn(t) {
    return t * t * t;
}
function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}
function elasticInOut(t) {
    return t < 0.5
        ? 0.5 *
            Math.sin(((+13.0 * Math.PI) / 2) * 2.0 * t) *
            Math.pow(2.0, 10.0 * (2.0 * t - 1.0))
        : 0.5 *
            Math.sin(((-13.0 * Math.PI) / 2) * (2.0 * t - 1.0 + 1.0)) *
            Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) +
            1.0;
}
function elasticIn(t) {
    return Math.sin((13.0 * t * Math.PI) / 2) * Math.pow(2.0, 10.0 * (t - 1.0));
}
function elasticOut(t) {
    return (Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -10.0 * t) + 1.0);
}
function expoInOut(t) {
    return t === 0.0 || t === 1.0
        ? t
        : t < 0.5
            ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0)
            : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
}
function expoIn(t) {
    return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
}
function expoOut(t) {
    return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
}
function quadInOut(t) {
    t /= 0.5;
    if (t < 1)
        return 0.5 * t * t;
    t--;
    return -0.5 * (t * (t - 2) - 1);
}
function quadIn(t) {
    return t * t;
}
function quadOut(t) {
    return -t * (t - 2.0);
}
function quartInOut(t) {
    return t < 0.5
        ? +8.0 * Math.pow(t, 4.0)
        : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0;
}
function quartIn(t) {
    return Math.pow(t, 4.0);
}
function quartOut(t) {
    return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}
function quintInOut(t) {
    if ((t *= 2) < 1)
        return 0.5 * t * t * t * t * t;
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
}
function quintIn(t) {
    return t * t * t * t * t;
}
function quintOut(t) {
    return --t * t * t * t * t + 1;
}
function sineInOut(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
}
function sineIn(t) {
    const v = Math.cos(t * Math.PI * 0.5);
    if (Math.abs(v) < 1e-14)
        return 1;
    else
        return 1 - v;
}
function sineOut(t) {
    return Math.sin((t * Math.PI) / 2);
}




/***/ }),

/***/ "./node_modules/svelte/index.mjs":
/*!***************************************!*\
  !*** ./node_modules/svelte/index.mjs ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SvelteComponent": function() { return /* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev; },
/* harmony export */   "SvelteComponentTyped": function() { return /* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentTyped; },
/* harmony export */   "afterUpdate": function() { return /* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.afterUpdate; },
/* harmony export */   "beforeUpdate": function() { return /* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.beforeUpdate; },
/* harmony export */   "createEventDispatcher": function() { return /* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.createEventDispatcher; },
/* harmony export */   "getAllContexts": function() { return /* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.getAllContexts; },
/* harmony export */   "getContext": function() { return /* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.getContext; },
/* harmony export */   "hasContext": function() { return /* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.hasContext; },
/* harmony export */   "onDestroy": function() { return /* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.onDestroy; },
/* harmony export */   "onMount": function() { return /* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.onMount; },
/* harmony export */   "setContext": function() { return /* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.setContext; },
/* harmony export */   "tick": function() { return /* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.tick; }
/* harmony export */ });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");



/***/ }),

/***/ "./node_modules/svelte/internal/index.mjs":
/*!************************************************!*\
  !*** ./node_modules/svelte/internal/index.mjs ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HtmlTag": function() { return /* binding */ HtmlTag; },
/* harmony export */   "HtmlTagHydration": function() { return /* binding */ HtmlTagHydration; },
/* harmony export */   "SvelteComponent": function() { return /* binding */ SvelteComponent; },
/* harmony export */   "SvelteComponentDev": function() { return /* binding */ SvelteComponentDev; },
/* harmony export */   "SvelteComponentTyped": function() { return /* binding */ SvelteComponentTyped; },
/* harmony export */   "SvelteElement": function() { return /* binding */ SvelteElement; },
/* harmony export */   "action_destroyer": function() { return /* binding */ action_destroyer; },
/* harmony export */   "add_attribute": function() { return /* binding */ add_attribute; },
/* harmony export */   "add_classes": function() { return /* binding */ add_classes; },
/* harmony export */   "add_flush_callback": function() { return /* binding */ add_flush_callback; },
/* harmony export */   "add_location": function() { return /* binding */ add_location; },
/* harmony export */   "add_render_callback": function() { return /* binding */ add_render_callback; },
/* harmony export */   "add_resize_listener": function() { return /* binding */ add_resize_listener; },
/* harmony export */   "add_styles": function() { return /* binding */ add_styles; },
/* harmony export */   "add_transform": function() { return /* binding */ add_transform; },
/* harmony export */   "afterUpdate": function() { return /* binding */ afterUpdate; },
/* harmony export */   "append": function() { return /* binding */ append; },
/* harmony export */   "append_dev": function() { return /* binding */ append_dev; },
/* harmony export */   "append_empty_stylesheet": function() { return /* binding */ append_empty_stylesheet; },
/* harmony export */   "append_hydration": function() { return /* binding */ append_hydration; },
/* harmony export */   "append_hydration_dev": function() { return /* binding */ append_hydration_dev; },
/* harmony export */   "append_styles": function() { return /* binding */ append_styles; },
/* harmony export */   "assign": function() { return /* binding */ assign; },
/* harmony export */   "attr": function() { return /* binding */ attr; },
/* harmony export */   "attr_dev": function() { return /* binding */ attr_dev; },
/* harmony export */   "attribute_to_object": function() { return /* binding */ attribute_to_object; },
/* harmony export */   "beforeUpdate": function() { return /* binding */ beforeUpdate; },
/* harmony export */   "bind": function() { return /* binding */ bind; },
/* harmony export */   "binding_callbacks": function() { return /* binding */ binding_callbacks; },
/* harmony export */   "blank_object": function() { return /* binding */ blank_object; },
/* harmony export */   "bubble": function() { return /* binding */ bubble; },
/* harmony export */   "check_outros": function() { return /* binding */ check_outros; },
/* harmony export */   "children": function() { return /* binding */ children; },
/* harmony export */   "claim_component": function() { return /* binding */ claim_component; },
/* harmony export */   "claim_element": function() { return /* binding */ claim_element; },
/* harmony export */   "claim_html_tag": function() { return /* binding */ claim_html_tag; },
/* harmony export */   "claim_space": function() { return /* binding */ claim_space; },
/* harmony export */   "claim_svg_element": function() { return /* binding */ claim_svg_element; },
/* harmony export */   "claim_text": function() { return /* binding */ claim_text; },
/* harmony export */   "clear_loops": function() { return /* binding */ clear_loops; },
/* harmony export */   "component_subscribe": function() { return /* binding */ component_subscribe; },
/* harmony export */   "compute_rest_props": function() { return /* binding */ compute_rest_props; },
/* harmony export */   "compute_slots": function() { return /* binding */ compute_slots; },
/* harmony export */   "construct_svelte_component": function() { return /* binding */ construct_svelte_component; },
/* harmony export */   "construct_svelte_component_dev": function() { return /* binding */ construct_svelte_component_dev; },
/* harmony export */   "createEventDispatcher": function() { return /* binding */ createEventDispatcher; },
/* harmony export */   "create_animation": function() { return /* binding */ create_animation; },
/* harmony export */   "create_bidirectional_transition": function() { return /* binding */ create_bidirectional_transition; },
/* harmony export */   "create_component": function() { return /* binding */ create_component; },
/* harmony export */   "create_in_transition": function() { return /* binding */ create_in_transition; },
/* harmony export */   "create_out_transition": function() { return /* binding */ create_out_transition; },
/* harmony export */   "create_slot": function() { return /* binding */ create_slot; },
/* harmony export */   "create_ssr_component": function() { return /* binding */ create_ssr_component; },
/* harmony export */   "current_component": function() { return /* binding */ current_component; },
/* harmony export */   "custom_event": function() { return /* binding */ custom_event; },
/* harmony export */   "dataset_dev": function() { return /* binding */ dataset_dev; },
/* harmony export */   "debug": function() { return /* binding */ debug; },
/* harmony export */   "destroy_block": function() { return /* binding */ destroy_block; },
/* harmony export */   "destroy_component": function() { return /* binding */ destroy_component; },
/* harmony export */   "destroy_each": function() { return /* binding */ destroy_each; },
/* harmony export */   "detach": function() { return /* binding */ detach; },
/* harmony export */   "detach_after_dev": function() { return /* binding */ detach_after_dev; },
/* harmony export */   "detach_before_dev": function() { return /* binding */ detach_before_dev; },
/* harmony export */   "detach_between_dev": function() { return /* binding */ detach_between_dev; },
/* harmony export */   "detach_dev": function() { return /* binding */ detach_dev; },
/* harmony export */   "dirty_components": function() { return /* binding */ dirty_components; },
/* harmony export */   "dispatch_dev": function() { return /* binding */ dispatch_dev; },
/* harmony export */   "each": function() { return /* binding */ each; },
/* harmony export */   "element": function() { return /* binding */ element; },
/* harmony export */   "element_is": function() { return /* binding */ element_is; },
/* harmony export */   "empty": function() { return /* binding */ empty; },
/* harmony export */   "end_hydrating": function() { return /* binding */ end_hydrating; },
/* harmony export */   "escape": function() { return /* binding */ escape; },
/* harmony export */   "escape_attribute_value": function() { return /* binding */ escape_attribute_value; },
/* harmony export */   "escape_object": function() { return /* binding */ escape_object; },
/* harmony export */   "exclude_internal_props": function() { return /* binding */ exclude_internal_props; },
/* harmony export */   "fix_and_destroy_block": function() { return /* binding */ fix_and_destroy_block; },
/* harmony export */   "fix_and_outro_and_destroy_block": function() { return /* binding */ fix_and_outro_and_destroy_block; },
/* harmony export */   "fix_position": function() { return /* binding */ fix_position; },
/* harmony export */   "flush": function() { return /* binding */ flush; },
/* harmony export */   "getAllContexts": function() { return /* binding */ getAllContexts; },
/* harmony export */   "getContext": function() { return /* binding */ getContext; },
/* harmony export */   "get_all_dirty_from_scope": function() { return /* binding */ get_all_dirty_from_scope; },
/* harmony export */   "get_binding_group_value": function() { return /* binding */ get_binding_group_value; },
/* harmony export */   "get_current_component": function() { return /* binding */ get_current_component; },
/* harmony export */   "get_custom_elements_slots": function() { return /* binding */ get_custom_elements_slots; },
/* harmony export */   "get_root_for_style": function() { return /* binding */ get_root_for_style; },
/* harmony export */   "get_slot_changes": function() { return /* binding */ get_slot_changes; },
/* harmony export */   "get_spread_object": function() { return /* binding */ get_spread_object; },
/* harmony export */   "get_spread_update": function() { return /* binding */ get_spread_update; },
/* harmony export */   "get_store_value": function() { return /* binding */ get_store_value; },
/* harmony export */   "globals": function() { return /* binding */ globals; },
/* harmony export */   "group_outros": function() { return /* binding */ group_outros; },
/* harmony export */   "handle_promise": function() { return /* binding */ handle_promise; },
/* harmony export */   "hasContext": function() { return /* binding */ hasContext; },
/* harmony export */   "has_prop": function() { return /* binding */ has_prop; },
/* harmony export */   "head_selector": function() { return /* binding */ head_selector; },
/* harmony export */   "identity": function() { return /* binding */ identity; },
/* harmony export */   "init": function() { return /* binding */ init; },
/* harmony export */   "insert": function() { return /* binding */ insert; },
/* harmony export */   "insert_dev": function() { return /* binding */ insert_dev; },
/* harmony export */   "insert_hydration": function() { return /* binding */ insert_hydration; },
/* harmony export */   "insert_hydration_dev": function() { return /* binding */ insert_hydration_dev; },
/* harmony export */   "intros": function() { return /* binding */ intros; },
/* harmony export */   "invalid_attribute_name_character": function() { return /* binding */ invalid_attribute_name_character; },
/* harmony export */   "is_client": function() { return /* binding */ is_client; },
/* harmony export */   "is_crossorigin": function() { return /* binding */ is_crossorigin; },
/* harmony export */   "is_empty": function() { return /* binding */ is_empty; },
/* harmony export */   "is_function": function() { return /* binding */ is_function; },
/* harmony export */   "is_promise": function() { return /* binding */ is_promise; },
/* harmony export */   "is_void": function() { return /* binding */ is_void; },
/* harmony export */   "listen": function() { return /* binding */ listen; },
/* harmony export */   "listen_dev": function() { return /* binding */ listen_dev; },
/* harmony export */   "loop": function() { return /* binding */ loop; },
/* harmony export */   "loop_guard": function() { return /* binding */ loop_guard; },
/* harmony export */   "merge_ssr_styles": function() { return /* binding */ merge_ssr_styles; },
/* harmony export */   "missing_component": function() { return /* binding */ missing_component; },
/* harmony export */   "mount_component": function() { return /* binding */ mount_component; },
/* harmony export */   "noop": function() { return /* binding */ noop; },
/* harmony export */   "not_equal": function() { return /* binding */ not_equal; },
/* harmony export */   "now": function() { return /* binding */ now; },
/* harmony export */   "null_to_empty": function() { return /* binding */ null_to_empty; },
/* harmony export */   "object_without_properties": function() { return /* binding */ object_without_properties; },
/* harmony export */   "onDestroy": function() { return /* binding */ onDestroy; },
/* harmony export */   "onMount": function() { return /* binding */ onMount; },
/* harmony export */   "once": function() { return /* binding */ once; },
/* harmony export */   "outro_and_destroy_block": function() { return /* binding */ outro_and_destroy_block; },
/* harmony export */   "prevent_default": function() { return /* binding */ prevent_default; },
/* harmony export */   "prop_dev": function() { return /* binding */ prop_dev; },
/* harmony export */   "query_selector_all": function() { return /* binding */ query_selector_all; },
/* harmony export */   "raf": function() { return /* binding */ raf; },
/* harmony export */   "run": function() { return /* binding */ run; },
/* harmony export */   "run_all": function() { return /* binding */ run_all; },
/* harmony export */   "safe_not_equal": function() { return /* binding */ safe_not_equal; },
/* harmony export */   "schedule_update": function() { return /* binding */ schedule_update; },
/* harmony export */   "select_multiple_value": function() { return /* binding */ select_multiple_value; },
/* harmony export */   "select_option": function() { return /* binding */ select_option; },
/* harmony export */   "select_options": function() { return /* binding */ select_options; },
/* harmony export */   "select_value": function() { return /* binding */ select_value; },
/* harmony export */   "self": function() { return /* binding */ self; },
/* harmony export */   "setContext": function() { return /* binding */ setContext; },
/* harmony export */   "set_attributes": function() { return /* binding */ set_attributes; },
/* harmony export */   "set_current_component": function() { return /* binding */ set_current_component; },
/* harmony export */   "set_custom_element_data": function() { return /* binding */ set_custom_element_data; },
/* harmony export */   "set_custom_element_data_map": function() { return /* binding */ set_custom_element_data_map; },
/* harmony export */   "set_data": function() { return /* binding */ set_data; },
/* harmony export */   "set_data_dev": function() { return /* binding */ set_data_dev; },
/* harmony export */   "set_input_type": function() { return /* binding */ set_input_type; },
/* harmony export */   "set_input_value": function() { return /* binding */ set_input_value; },
/* harmony export */   "set_now": function() { return /* binding */ set_now; },
/* harmony export */   "set_raf": function() { return /* binding */ set_raf; },
/* harmony export */   "set_store_value": function() { return /* binding */ set_store_value; },
/* harmony export */   "set_style": function() { return /* binding */ set_style; },
/* harmony export */   "set_svg_attributes": function() { return /* binding */ set_svg_attributes; },
/* harmony export */   "space": function() { return /* binding */ space; },
/* harmony export */   "spread": function() { return /* binding */ spread; },
/* harmony export */   "src_url_equal": function() { return /* binding */ src_url_equal; },
/* harmony export */   "start_hydrating": function() { return /* binding */ start_hydrating; },
/* harmony export */   "stop_propagation": function() { return /* binding */ stop_propagation; },
/* harmony export */   "subscribe": function() { return /* binding */ subscribe; },
/* harmony export */   "svg_element": function() { return /* binding */ svg_element; },
/* harmony export */   "text": function() { return /* binding */ text; },
/* harmony export */   "tick": function() { return /* binding */ tick; },
/* harmony export */   "time_ranges_to_array": function() { return /* binding */ time_ranges_to_array; },
/* harmony export */   "to_number": function() { return /* binding */ to_number; },
/* harmony export */   "toggle_class": function() { return /* binding */ toggle_class; },
/* harmony export */   "transition_in": function() { return /* binding */ transition_in; },
/* harmony export */   "transition_out": function() { return /* binding */ transition_out; },
/* harmony export */   "trusted": function() { return /* binding */ trusted; },
/* harmony export */   "update_await_block_branch": function() { return /* binding */ update_await_block_branch; },
/* harmony export */   "update_keyed_each": function() { return /* binding */ update_keyed_each; },
/* harmony export */   "update_slot": function() { return /* binding */ update_slot; },
/* harmony export */   "update_slot_base": function() { return /* binding */ update_slot_base; },
/* harmony export */   "validate_component": function() { return /* binding */ validate_component; },
/* harmony export */   "validate_dynamic_element": function() { return /* binding */ validate_dynamic_element; },
/* harmony export */   "validate_each_argument": function() { return /* binding */ validate_each_argument; },
/* harmony export */   "validate_each_keys": function() { return /* binding */ validate_each_keys; },
/* harmony export */   "validate_slots": function() { return /* binding */ validate_slots; },
/* harmony export */   "validate_store": function() { return /* binding */ validate_store; },
/* harmony export */   "validate_void_dynamic_element": function() { return /* binding */ validate_void_dynamic_element; },
/* harmony export */   "xlink_attr": function() { return /* binding */ xlink_attr; }
/* harmony export */ });
function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
// Adapted from https://github.com/then/is-promise/blob/master/index.js
// Distributed under MIT License https://github.com/then/is-promise/blob/master/LICENSE
function is_promise(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement('a');
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
}
function not_equal(a, b) {
    return a != a ? b == b : a !== b;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn);
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}
function compute_slots(slots) {
    const result = {};
    for (const key in slots) {
        result[key] = true;
    }
    return result;
}
function once(fn) {
    let ran = false;
    return function (...args) {
        if (ran)
            return;
        ran = true;
        fn.call(this, ...args);
    };
}
function null_to_empty(value) {
    return value == null ? '' : value;
}
function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
}
const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;
// used internally for testing
function set_now(fn) {
    now = fn;
}
function set_raf(fn) {
    raf = fn;
}

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * For testing purposes only!
 */
function clear_loops() {
    tasks.clear();
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

// Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.
let is_hydrating = false;
function start_hydrating() {
    is_hydrating = true;
}
function end_hydrating() {
    is_hydrating = false;
}
function upper_bound(low, high, key, value) {
    // Return first index of value larger than input value in the range [low, high)
    while (low < high) {
        const mid = low + ((high - low) >> 1);
        if (key(mid) <= value) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    return low;
}
function init_hydrate(target) {
    if (target.hydrate_init)
        return;
    target.hydrate_init = true;
    // We know that all children have claim_order values since the unclaimed have been detached if target is not <head>
    let children = target.childNodes;
    // If target is <head>, there may be children without claim_order
    if (target.nodeName === 'HEAD') {
        const myChildren = [];
        for (let i = 0; i < children.length; i++) {
            const node = children[i];
            if (node.claim_order !== undefined) {
                myChildren.push(node);
            }
        }
        children = myChildren;
    }
    /*
    * Reorder claimed children optimally.
    * We can reorder claimed children optimally by finding the longest subsequence of
    * nodes that are already claimed in order and only moving the rest. The longest
    * subsequence of nodes that are claimed in order can be found by
    * computing the longest increasing subsequence of .claim_order values.
    *
    * This algorithm is optimal in generating the least amount of reorder operations
    * possible.
    *
    * Proof:
    * We know that, given a set of reordering operations, the nodes that do not move
    * always form an increasing subsequence, since they do not move among each other
    * meaning that they must be already ordered among each other. Thus, the maximal
    * set of nodes that do not move form a longest increasing subsequence.
    */
    // Compute longest increasing subsequence
    // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
    const m = new Int32Array(children.length + 1);
    // Predecessor indices + 1
    const p = new Int32Array(children.length);
    m[0] = -1;
    let longest = 0;
    for (let i = 0; i < children.length; i++) {
        const current = children[i].claim_order;
        // Find the largest subsequence length such that it ends in a value less than our current value
        // upper_bound returns first greater value, so we subtract one
        // with fast path for when we are on the current longest subsequence
        const seqLen = ((longest > 0 && children[m[longest]].claim_order <= current) ? longest + 1 : upper_bound(1, longest, idx => children[m[idx]].claim_order, current)) - 1;
        p[i] = m[seqLen] + 1;
        const newLen = seqLen + 1;
        // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
        m[newLen] = i;
        longest = Math.max(newLen, longest);
    }
    // The longest increasing subsequence of nodes (initially reversed)
    const lis = [];
    // The rest of the nodes, nodes that will be moved
    const toMove = [];
    let last = children.length - 1;
    for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
        lis.push(children[cur - 1]);
        for (; last >= cur; last--) {
            toMove.push(children[last]);
        }
        last--;
    }
    for (; last >= 0; last--) {
        toMove.push(children[last]);
    }
    lis.reverse();
    // We sort the nodes being moved to guarantee that their insertion order matches the claim order
    toMove.sort((a, b) => a.claim_order - b.claim_order);
    // Finally, we move the nodes
    for (let i = 0, j = 0; i < toMove.length; i++) {
        while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
            j++;
        }
        const anchor = j < lis.length ? lis[j] : null;
        target.insertBefore(toMove[i], anchor);
    }
}
function append(target, node) {
    target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
        const style = element('style');
        style.id = style_sheet_id;
        style.textContent = styles;
        append_stylesheet(append_styles_to, style);
    }
}
function get_root_for_style(node) {
    if (!node)
        return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
        return root;
    }
    return node.ownerDocument;
}
function append_empty_stylesheet(node) {
    const style_element = element('style');
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element.sheet;
}
function append_stylesheet(node, style) {
    append(node.head || node, style);
    return style.sheet;
}
function append_hydration(target, node) {
    if (is_hydrating) {
        init_hydrate(target);
        if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentNode !== target))) {
            target.actual_end_child = target.firstChild;
        }
        // Skip nodes of undefined ordering
        while ((target.actual_end_child !== null) && (target.actual_end_child.claim_order === undefined)) {
            target.actual_end_child = target.actual_end_child.nextSibling;
        }
        if (node !== target.actual_end_child) {
            // We only insert if the ordering of this node should be modified or the parent node is not target
            if (node.claim_order !== undefined || node.parentNode !== target) {
                target.insertBefore(node, target.actual_end_child);
            }
        }
        else {
            target.actual_end_child = node.nextSibling;
        }
    }
    else if (node.parentNode !== target || node.nextSibling !== null) {
        target.appendChild(node);
    }
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function insert_hydration(target, node, anchor) {
    if (is_hydrating && !anchor) {
        append_hydration(target, node);
    }
    else if (node.parentNode !== target || node.nextSibling != anchor) {
        target.insertBefore(node, anchor || null);
    }
}
function detach(node) {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function element_is(name, is) {
    return document.createElement(name, { is });
}
function object_without_properties(obj, exclude) {
    const target = {};
    for (const k in obj) {
        if (has_prop(obj, k)
            // @ts-ignore
            && exclude.indexOf(k) === -1) {
            // @ts-ignore
            target[k] = obj[k];
        }
    }
    return target;
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function self(fn) {
    return function (event) {
        // @ts-ignore
        if (event.target === this)
            fn.call(this, event);
    };
}
function trusted(fn) {
    return function (event) {
        // @ts-ignore
        if (event.isTrusted)
            fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function set_svg_attributes(node, attributes) {
    for (const key in attributes) {
        attr(node, key, attributes[key]);
    }
}
function set_custom_element_data_map(node, data_map) {
    Object.keys(data_map).forEach((key) => {
        set_custom_element_data(node, key, data_map[key]);
    });
}
function set_custom_element_data(node, prop, value) {
    if (prop in node) {
        node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
    }
    else {
        attr(node, prop, value);
    }
}
function xlink_attr(node, attribute, value) {
    node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}
function get_binding_group_value(group, __value, checked) {
    const value = new Set();
    for (let i = 0; i < group.length; i += 1) {
        if (group[i].checked)
            value.add(group[i].__value);
    }
    if (!checked) {
        value.delete(__value);
    }
    return Array.from(value);
}
function to_number(value) {
    return value === '' ? null : +value;
}
function time_ranges_to_array(ranges) {
    const array = [];
    for (let i = 0; i < ranges.length; i += 1) {
        array.push({ start: ranges.start(i), end: ranges.end(i) });
    }
    return array;
}
function children(element) {
    return Array.from(element.childNodes);
}
function init_claim_info(nodes) {
    if (nodes.claim_info === undefined) {
        nodes.claim_info = { last_index: 0, total_claimed: 0 };
    }
}
function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
    // Try to find nodes in an order such that we lengthen the longest increasing subsequence
    init_claim_info(nodes);
    const resultNode = (() => {
        // We first try to find an element after the previous one
        for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                return node;
            }
        }
        // Otherwise, we try to find one before
        // We iterate in reverse so that we don't go too far back
        for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                else if (replacement === undefined) {
                    // Since we spliced before the last_index, we decrease it
                    nodes.claim_info.last_index--;
                }
                return node;
            }
        }
        // If we can't find any matching node, we create a new one
        return createNode();
    })();
    resultNode.claim_order = nodes.claim_info.total_claimed;
    nodes.claim_info.total_claimed += 1;
    return resultNode;
}
function claim_element_base(nodes, name, attributes, create_element) {
    return claim_node(nodes, (node) => node.nodeName === name, (node) => {
        const remove = [];
        for (let j = 0; j < node.attributes.length; j++) {
            const attribute = node.attributes[j];
            if (!attributes[attribute.name]) {
                remove.push(attribute.name);
            }
        }
        remove.forEach(v => node.removeAttribute(v));
        return undefined;
    }, () => create_element(name));
}
function claim_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, element);
}
function claim_svg_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, svg_element);
}
function claim_text(nodes, data) {
    return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
        const dataStr = '' + data;
        if (node.data.startsWith(dataStr)) {
            if (node.data.length !== dataStr.length) {
                return node.splitText(dataStr.length);
            }
        }
        else {
            node.data = dataStr;
        }
    }, () => text(data), true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
    );
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function find_comment(nodes, text, start) {
    for (let i = start; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 8 /* comment node */ && node.textContent.trim() === text) {
            return i;
        }
    }
    return nodes.length;
}
function claim_html_tag(nodes, is_svg) {
    // find html opening tag
    const start_index = find_comment(nodes, 'HTML_TAG_START', 0);
    const end_index = find_comment(nodes, 'HTML_TAG_END', start_index);
    if (start_index === end_index) {
        return new HtmlTagHydration(undefined, is_svg);
    }
    init_claim_info(nodes);
    const html_tag_nodes = nodes.splice(start_index, end_index - start_index + 1);
    detach(html_tag_nodes[0]);
    detach(html_tag_nodes[html_tag_nodes.length - 1]);
    const claimed_nodes = html_tag_nodes.slice(1, html_tag_nodes.length - 1);
    for (const n of claimed_nodes) {
        n.claim_order = nodes.claim_info.total_claimed;
        nodes.claim_info.total_claimed += 1;
    }
    return new HtmlTagHydration(claimed_nodes, is_svg);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_input_type(input, type) {
    try {
        input.type = type;
    }
    catch (e) {
        // do nothing
    }
}
function set_style(node, key, value, important) {
    if (value === null) {
        node.style.removeProperty(key);
    }
    else {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
}
function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
    select.selectedIndex = -1; // no option should be selected
}
function select_options(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        option.selected = ~value.indexOf(option.__value);
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked') || select.options[0];
    return selected_option && selected_option.__value;
}
function select_multiple_value(select) {
    return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin;
function is_crossorigin() {
    if (crossorigin === undefined) {
        crossorigin = false;
        try {
            if (typeof window !== 'undefined' && window.parent) {
                void window.parent.document;
            }
        }
        catch (error) {
            crossorigin = true;
        }
    }
    return crossorigin;
}
function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    if (computed_style.position === 'static') {
        node.style.position = 'relative';
    }
    const iframe = element('iframe');
    iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
        'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    const crossorigin = is_crossorigin();
    let unsubscribe;
    if (crossorigin) {
        iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
        unsubscribe = listen(window, 'message', (event) => {
            if (event.source === iframe.contentWindow)
                fn();
        });
    }
    else {
        iframe.src = 'about:blank';
        iframe.onload = () => {
            unsubscribe = listen(iframe.contentWindow, 'resize', fn);
        };
    }
    append(node, iframe);
    return () => {
        if (crossorigin) {
            unsubscribe();
        }
        else if (unsubscribe && iframe.contentWindow) {
            unsubscribe();
        }
        detach(iframe);
    };
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}
function head_selector(nodeId, head) {
    const result = [];
    let started = 0;
    for (const node of head.childNodes) {
        if (node.nodeType === 8 /* comment node */) {
            const comment = node.textContent.trim();
            if (comment === `HEAD_${nodeId}_END`) {
                started -= 1;
                result.push(node);
            }
            else if (comment === `HEAD_${nodeId}_START`) {
                started += 1;
                result.push(node);
            }
        }
        else if (started > 0) {
            result.push(node);
        }
    }
    return result;
}
class HtmlTag {
    constructor(is_svg = false) {
        this.is_svg = false;
        this.is_svg = is_svg;
        this.e = this.n = null;
    }
    c(html) {
        this.h(html);
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            if (this.is_svg)
                this.e = svg_element(target.nodeName);
            else
                this.e = element(target.nodeName);
            this.t = target;
            this.c(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}
class HtmlTagHydration extends HtmlTag {
    constructor(claimed_nodes, is_svg = false) {
        super(is_svg);
        this.e = this.n = null;
        this.l = claimed_nodes;
    }
    c(html) {
        if (this.l) {
            this.n = this.l;
        }
        else {
            super.c(html);
        }
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert_hydration(this.t, this.n[i], anchor);
        }
    }
}
function attribute_to_object(attributes) {
    const result = {};
    for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
    }
    return result;
}
function get_custom_elements_slots(element) {
    const result = {};
    element.childNodes.forEach((node) => {
        result[node.slot || 'default'] = true;
    });
    return result;
}
function construct_svelte_component(component, props) {
    return new component(props);
}

// we need to store the information for multiple documents because a Svelte application could also contain iframes
// https://github.com/sveltejs/svelte/issues/3624
const managed_styles = new Map();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_style_information(doc, node) {
    const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
    managed_styles.set(doc, info);
    return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = get_root_for_style(node);
    const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
    if (!rules[name]) {
        rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        managed_styles.forEach(info => {
            const { ownerNode } = info.stylesheet;
            // there is no ownerNode if it runs on jsdom.
            if (ownerNode)
                detach(ownerNode);
        });
        managed_styles.clear();
    });
}

function create_animation(node, from, fn, params) {
    if (!from)
        return noop;
    const to = node.getBoundingClientRect();
    if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
        return noop;
    const { delay = 0, duration = 300, easing = identity, 
    // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
    start: start_time = now() + delay, 
    // @ts-ignore todo:
    end = start_time + duration, tick = noop, css } = fn(node, { from, to }, params);
    let running = true;
    let started = false;
    let name;
    function start() {
        if (css) {
            name = create_rule(node, 0, 1, duration, delay, easing, css);
        }
        if (!delay) {
            started = true;
        }
    }
    function stop() {
        if (css)
            delete_rule(node, name);
        running = false;
    }
    loop(now => {
        if (!started && now >= start_time) {
            started = true;
        }
        if (started && now >= end) {
            tick(1, 0);
            stop();
        }
        if (!running) {
            return false;
        }
        if (started) {
            const p = now - start_time;
            const t = 0 + 1 * easing(p / duration);
            tick(t, 1 - t);
        }
        return true;
    });
    start();
    tick(0, 1);
    return stop;
}
function fix_position(node) {
    const style = getComputedStyle(node);
    if (style.position !== 'absolute' && style.position !== 'fixed') {
        const { width, height } = style;
        const a = node.getBoundingClientRect();
        node.style.position = 'absolute';
        node.style.width = width;
        node.style.height = height;
        add_transform(node, a);
    }
}
function add_transform(node, a) {
    const b = node.getBoundingClientRect();
    if (a.left !== b.left || a.top !== b.top) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
    }
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
/**
 * Schedules a callback to run immediately before the component is updated after any state change.
 *
 * The first time the callback runs will be before the initial `onMount`
 *
 * https://svelte.dev/docs#run-time-svelte-beforeupdate
 */
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs#run-time-svelte-onmount
 */
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
/**
 * Schedules a callback to run immediately after the component has been updated.
 *
 * The first time the callback runs will be after the initial `onMount`
 */
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
/**
 * Schedules a callback to run immediately before the component is unmounted.
 *
 * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
 * only one that runs inside a server-side component.
 *
 * https://svelte.dev/docs#run-time-svelte-ondestroy
 */
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
/**
 * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
 * Event dispatchers are functions that can take two arguments: `name` and `detail`.
 *
 * Component events created with `createEventDispatcher` create a
 * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
 * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
 * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
 * property and can contain any type of data.
 *
 * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
 */
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail, { cancelable });
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
            return !event.defaultPrevented;
        }
        return true;
    };
}
/**
 * Associates an arbitrary `context` object with the current component and the specified `key`
 * and returns that object. The context is then available to children of the component
 * (including slotted content) with `getContext`.
 *
 * Like lifecycle functions, this must be called during component initialisation.
 *
 * https://svelte.dev/docs#run-time-svelte-setcontext
 */
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
    return context;
}
/**
 * Retrieves the context that belongs to the closest parent component with the specified `key`.
 * Must be called during component initialisation.
 *
 * https://svelte.dev/docs#run-time-svelte-getcontext
 */
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
/**
 * Retrieves the whole context map that belongs to the closest parent component.
 * Must be called during component initialisation. Useful, for example, if you
 * programmatically create a component and want to pass the existing context to it.
 *
 * https://svelte.dev/docs#run-time-svelte-getallcontexts
 */
function getAllContexts() {
    return get_current_component().$$.context;
}
/**
 * Checks whether a given `key` has been set in the context of a parent component.
 * Must be called during component initialisation.
 *
 * https://svelte.dev/docs#run-time-svelte-hascontext
 */
function hasContext(key) {
    return get_current_component().$$.context.has(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
    }
}

const dirty_components = [];
const intros = { enabled: false };
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    // Do not reenter flush while dirty components are updated, as this can
    // result in an infinite loop. Instead, let the inner flush handle it.
    // Reentrancy is ok afterwards for bindings etc.
    if (flushidx !== 0) {
        return;
    }
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        try {
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
        }
        catch (e) {
            // reset dirty state to not end up in a deadlocked state and then rethrow
            dirty_components.length = 0;
            flushidx = 0;
            throw e;
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
    else if (callback) {
        callback();
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    const options = { direction: 'in' };
    let config = fn(node, params, options);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            started = true;
            delete_rule(node);
            if (is_function(config)) {
                config = config(options);
                wait().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    const options = { direction: 'out' };
    let config = fn(node, params, options);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) {
        wait().then(() => {
            // @ts-ignore
            config = config(options);
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    const options = { direction: 'both' };
    let config = fn(node, params, options);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = (program.b - t);
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config(options);
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

function handle_promise(promise, info) {
    const token = info.token = {};
    function update(type, index, key, value) {
        if (info.token !== token)
            return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== undefined) {
            child_ctx = child_ctx.slice();
            child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
            if (info.blocks) {
                info.blocks.forEach((block, i) => {
                    if (i !== index && block) {
                        group_outros();
                        transition_out(block, 1, 1, () => {
                            if (info.blocks[i] === block) {
                                info.blocks[i] = null;
                            }
                        });
                        check_outros();
                    }
                });
            }
            else {
                info.block.d(1);
            }
            block.c();
            transition_in(block, 1);
            block.m(info.mount(), info.anchor);
            needs_flush = true;
        }
        info.block = block;
        if (info.blocks)
            info.blocks[index] = block;
        if (needs_flush) {
            flush();
        }
    }
    if (is_promise(promise)) {
        const current_component = get_current_component();
        promise.then(value => {
            set_current_component(current_component);
            update(info.then, 1, info.value, value);
            set_current_component(null);
        }, error => {
            set_current_component(current_component);
            update(info.catch, 2, info.error, error);
            set_current_component(null);
            if (!info.hasCatch) {
                throw error;
            }
        });
        // if we previously had a then/catch block, destroy it
        if (info.current !== info.pending) {
            update(info.pending, 0);
            return true;
        }
    }
    else {
        if (info.current !== info.then) {
            update(info.then, 1, info.value, promise);
            return true;
        }
        info.resolved = promise;
    }
}
function update_await_block_branch(info, ctx, dirty) {
    const child_ctx = ctx.slice();
    const { resolved } = info;
    if (info.current === info.then) {
        child_ctx[info.value] = resolved;
    }
    if (info.current === info.catch) {
        child_ctx[info.error] = resolved;
    }
    info.block.p(child_ctx, dirty);
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function fix_and_destroy_block(block, lookup) {
    block.f();
    destroy_block(block, lookup);
}
function fix_and_outro_and_destroy_block(block, lookup) {
    block.f();
    outro_and_destroy_block(block, lookup);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error('Cannot have duplicate keys in a keyed each');
        }
        keys.add(key);
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

// source: https://html.spec.whatwg.org/multipage/indices.html
const boolean_attributes = new Set([
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'inert',
    'ismap',
    'itemscope',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected'
]);

/** regex of all html void element names */
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
    return void_element_names.test(name) || name.toLowerCase() === '!doctype';
}

const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args, attrs_to_add) {
    const attributes = Object.assign({}, ...args);
    if (attrs_to_add) {
        const classes_to_add = attrs_to_add.classes;
        const styles_to_add = attrs_to_add.styles;
        if (classes_to_add) {
            if (attributes.class == null) {
                attributes.class = classes_to_add;
            }
            else {
                attributes.class += ' ' + classes_to_add;
            }
        }
        if (styles_to_add) {
            if (attributes.style == null) {
                attributes.style = style_object_to_string(styles_to_add);
            }
            else {
                attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
            }
        }
    }
    let str = '';
    Object.keys(attributes).forEach(name => {
        if (invalid_attribute_name_character.test(name))
            return;
        const value = attributes[name];
        if (value === true)
            str += ' ' + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
            if (value)
                str += ' ' + name;
        }
        else if (value != null) {
            str += ` ${name}="${value}"`;
        }
    });
    return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
    const style_object = {};
    for (const individual_style of style_attribute.split(';')) {
        const colon_index = individual_style.indexOf(':');
        const name = individual_style.slice(0, colon_index).trim();
        const value = individual_style.slice(colon_index + 1).trim();
        if (!name)
            continue;
        style_object[name] = value;
    }
    for (const name in style_directive) {
        const value = style_directive[name];
        if (value) {
            style_object[name] = value;
        }
        else {
            delete style_object[name];
        }
    }
    return style_object;
}
const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;
/**
 * Note: this method is performance sensitive and has been optimized
 * https://github.com/sveltejs/svelte/pull/5701
 */
function escape(value, is_attr = false) {
    const str = String(value);
    const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
    pattern.lastIndex = 0;
    let escaped = '';
    let last = 0;
    while (pattern.test(str)) {
        const i = pattern.lastIndex - 1;
        const ch = str[i];
        escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : (ch === '"' ? '&quot;' : '&lt;'));
        last = i + 1;
    }
    return escaped + str.substring(last);
}
function escape_attribute_value(value) {
    // keep booleans, null, and undefined for the sake of `spread`
    const should_escape = typeof value === 'string' || (value && typeof value === 'object');
    return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
    const result = {};
    for (const key in obj) {
        result[key] = escape_attribute_value(obj[key]);
    }
    return result;
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`);
    }
    return component;
}
function debug(file, line, column, values) {
    console.log(`{@debug} ${file ? file + ' ' : ''}(${line}:${column})`); // eslint-disable-line no-console
    console.log(values); // eslint-disable-line no-console
    return '';
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(context || (parent_component ? parent_component.$$.context : [])),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, $$slots, context);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    const assignment = (boolean && value === true) ? '' : `="${escape(value, true)}"`;
    return ` ${name}${assignment}`;
}
function add_classes(classes) {
    return classes ? ` class="${classes}"` : '';
}
function style_object_to_string(style_object) {
    return Object.keys(style_object)
        .filter(key => style_object[key])
        .map(key => `${key}: ${escape_attribute_value(style_object[key])};`)
        .join(' ');
}
function add_styles(style_object) {
    const styles = style_object_to_string(style_object);
    return styles ? ` style="${styles}"` : '';
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
            // if the component was destroyed immediately
            // it will update the `$$.on_destroy` reference to `null`.
            // the destructured on_destroy may still reference to the old array
            if (component.$$.on_destroy) {
                component.$$.on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: [],
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            start_hydrating();
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        end_hydrating();
        flush();
    }
    set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === 'function') {
    SvelteElement = class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            const { on_mount } = this.$$;
            this.$$.on_disconnect = on_mount.map(run).filter(is_function);
            // @ts-ignore todo: improve typings
            for (const key in this.$$.slotted) {
                // @ts-ignore todo: improve typings
                this.appendChild(this.$$.slotted[key]);
            }
        }
        attributeChangedCallback(attr, _oldValue, newValue) {
            this[attr] = newValue;
        }
        disconnectedCallback() {
            run_all(this.$$.on_disconnect);
        }
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            // TODO should this delegate to addEventListener?
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    };
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        if (!is_function(callback)) {
            return noop;
        }
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.55.1' }, detail), { bubbles: true }));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function append_hydration_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append_hydration(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function insert_hydration_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert_hydration(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function detach_between_dev(before, after) {
    while (before.nextSibling && before.nextSibling !== after) {
        detach_dev(before.nextSibling);
    }
}
function detach_before_dev(after) {
    while (after.previousSibling) {
        detach_dev(after.previousSibling);
    }
}
function detach_after_dev(before) {
    while (before.nextSibling) {
        detach_dev(before.nextSibling);
    }
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}
function dataset_dev(node, property, value) {
    node.dataset[property] = value;
    dispatch_dev('SvelteDOMSetDataset', { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
function validate_dynamic_element(tag) {
    const is_string = typeof tag === 'string';
    if (tag && !is_string) {
        throw new Error('<svelte:element> expects "this" attribute to be a string.');
    }
}
function validate_void_dynamic_element(tag) {
    if (tag && is_void(tag)) {
        console.warn(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
    }
}
function construct_svelte_component_dev(component, props) {
    const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
    try {
        const instance = new component(props);
        if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
            throw new Error(error_message);
        }
        return instance;
    }
    catch (err) {
        const { message } = err;
        if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
            throw new Error(error_message);
        }
        else {
            throw err;
        }
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}
/**
 * Base class to create strongly typed Svelte components.
 * This only exists for typing purposes and should be used in `.d.ts` files.
 *
 * ### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponentTyped } from "svelte";
 * export class MyComponent extends SvelteComponentTyped<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 *
 * #### Why not make this part of `SvelteComponent(Dev)`?
 * Because
 * ```ts
 * class ASubclassOfSvelteComponent extends SvelteComponent<{foo: string}> {}
 * const component: typeof SvelteComponent = ASubclassOfSvelteComponent;
 * ```
 * will throw a type error, so we need to separate the more strictly typed class.
 */
class SvelteComponentTyped extends SvelteComponentDev {
    constructor(options) {
        super(options);
    }
}
function loop_guard(timeout) {
    const start = Date.now();
    return () => {
        if (Date.now() - start > timeout) {
            throw new Error('Infinite loop detected');
        }
    };
}




/***/ }),

/***/ "./node_modules/svelte/store/index.mjs":
/*!*********************************************!*\
  !*** ./node_modules/svelte/store/index.mjs ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "derived": function() { return /* binding */ derived; },
/* harmony export */   "get": function() { return /* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.get_store_value; },
/* harmony export */   "readable": function() { return /* binding */ readable; },
/* harmony export */   "writable": function() { return /* binding */ writable; }
/* harmony export */ });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");



const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if ((0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal)(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop) {
        const subscriber = [run, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}
function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single
        ? [stores]
        : stores;
    const auto = fn.length < 2;
    return readable(initial_value, (set) => {
        let inited = false;
        const values = [];
        let pending = 0;
        let cleanup = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
        const sync = () => {
            if (pending) {
                return;
            }
            cleanup();
            const result = fn(single ? values[0] : values, set);
            if (auto) {
                set(result);
            }
            else {
                cleanup = (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.is_function)(result) ? result : _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
            }
        };
        const unsubscribers = stores_array.map((store, i) => (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.subscribe)(store, (value) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (inited) {
                sync();
            }
        }, () => {
            pending |= (1 << i);
        }));
        inited = true;
        sync();
        return function stop() {
            (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.run_all)(unsubscribers);
            cleanup();
        };
    });
}




/***/ }),

/***/ "./node_modules/svelte/transition/index.mjs":
/*!**************************************************!*\
  !*** ./node_modules/svelte/transition/index.mjs ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blur": function() { return /* binding */ blur; },
/* harmony export */   "crossfade": function() { return /* binding */ crossfade; },
/* harmony export */   "draw": function() { return /* binding */ draw; },
/* harmony export */   "fade": function() { return /* binding */ fade; },
/* harmony export */   "fly": function() { return /* binding */ fly; },
/* harmony export */   "scale": function() { return /* binding */ scale; },
/* harmony export */   "slide": function() { return /* binding */ slide; }
/* harmony export */ });
/* harmony import */ var _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../easing/index.mjs */ "./node_modules/svelte/easing/index.mjs");
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");



/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function blur(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicInOut, amount = 5, opacity = 0 } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const f = style.filter === 'none' ? '' : style.filter;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (_t, u) => `opacity: ${target_opacity - (od * u)}; filter: ${f} blur(${u * amount}px);`
    };
}
function fade(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.linear } = {}) {
    const o = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
        css: t => `opacity: ${t * o}`
    };
}
function fly(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
    };
}
function slide(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut } = {}) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const height = parseFloat(style.height);
    const padding_top = parseFloat(style.paddingTop);
    const padding_bottom = parseFloat(style.paddingBottom);
    const margin_top = parseFloat(style.marginTop);
    const margin_bottom = parseFloat(style.marginBottom);
    const border_top_width = parseFloat(style.borderTopWidth);
    const border_bottom_width = parseFloat(style.borderBottomWidth);
    return {
        delay,
        duration,
        easing,
        css: t => 'overflow: hidden;' +
            `opacity: ${Math.min(t * 20, 1) * opacity};` +
            `height: ${t * height}px;` +
            `padding-top: ${t * padding_top}px;` +
            `padding-bottom: ${t * padding_bottom}px;` +
            `margin-top: ${t * margin_top}px;` +
            `margin-bottom: ${t * margin_bottom}px;` +
            `border-top-width: ${t * border_top_width}px;` +
            `border-bottom-width: ${t * border_bottom_width}px;`
    };
}
function scale(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut, start = 0, opacity = 0 } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;
    const sd = 1 - start;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (_t, u) => `
			transform: ${transform} scale(${1 - (sd * u)});
			opacity: ${target_opacity - (od * u)}
		`
    };
}
function draw(node, { delay = 0, speed, duration, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicInOut } = {}) {
    let len = node.getTotalLength();
    const style = getComputedStyle(node);
    if (style.strokeLinecap !== 'butt') {
        len += parseInt(style.strokeWidth);
    }
    if (duration === undefined) {
        if (speed === undefined) {
            duration = 800;
        }
        else {
            duration = len / speed;
        }
    }
    else if (typeof duration === 'function') {
        duration = duration(len);
    }
    return {
        delay,
        duration,
        easing,
        css: (_, u) => `
			stroke-dasharray: ${len};
			stroke-dashoffset: ${u * len};
		`
    };
}
function crossfade(_a) {
    var { fallback } = _a, defaults = __rest(_a, ["fallback"]);
    const to_receive = new Map();
    const to_send = new Map();
    function crossfade(from, node, params) {
        const { delay = 0, duration = d => Math.sqrt(d) * 30, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut } = (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__.assign)((0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__.assign)({}, defaults), params);
        const to = node.getBoundingClientRect();
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        const dw = from.width / to.width;
        const dh = from.height / to.height;
        const d = Math.sqrt(dx * dx + dy * dy);
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        const opacity = +style.opacity;
        return {
            delay,
            duration: (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__.is_function)(duration) ? duration(d) : duration,
            easing,
            css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
        };
    }
    function transition(items, counterparts, intro) {
        return (node, params) => {
            items.set(params.key, {
                rect: node.getBoundingClientRect()
            });
            return () => {
                if (counterparts.has(params.key)) {
                    const { rect } = counterparts.get(params.key);
                    counterparts.delete(params.key);
                    return crossfade(rect, node, params);
                }
                // if the node is disappearing altogether
                // (i.e. wasn't claimed by the other list)
                // then we need to supply an outro
                items.delete(params.key);
                return fallback && fallback(node, params, intro);
            };
        };
    }
    return [
        transition(to_send, to_receive, false),
        transition(to_receive, to_send, true)
    ];
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!******************************************!*\
  !*** ./src/public/admin/js/dashboard.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dashboard": function() { return /* binding */ dashboard; }
/* harmony export */ });
/* harmony import */ var _css_dashboard_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css/dashboard.scss */ "./src/public/css/dashboard.scss");
/* harmony import */ var _sveltejs_dashboard_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sveltejs/dashboard.svelte */ "./src/public/admin/sveltejs/dashboard.svelte");


var dashboard = new _sveltejs_dashboard_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({
  target: document.getElementById('dashboard') // entry point in ../public/index.html
});

// function importAll(r) {
//     let images = {};
//     r.keys().forEach((key) => {
//         const path = key.substring(2); // Убираем начальный './'
//         const parts = path.split('/');
//         let currentObj = images;
//         for (let i = 0; i < parts.length - 1; i++) {
//             const part = parts[i];
//             if (!currentObj[part]) {
//                 currentObj[part] = {};
//             }
//             currentObj = currentObj[part];
//         }
//         if (parts.length > 1 && parts[parts.length - 2] === 'users') {
//             const userId = parts[parts.length - 2];
//             const photoName = parts[parts.length - 1];
//             if (!currentObj[userId]) {
//                 currentObj[userId] = {};
//             }
//             currentObj[userId][photoName] = r(key).default;
//         } else {
//             currentObj[parts[parts.length - 1]] = r(key).default;
//         }
//     });
//     return images;
// }
//
// const images = importAll(require.context('../../images', true, /\.(png|jpe?g|svg)$/));
//

}();
/******/ })()
;
//# sourceMappingURL=dashboard.bundle.0b8e5260a9fae238224c.js.map
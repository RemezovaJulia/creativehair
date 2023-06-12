/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/public/css/appointments.scss":
/*!******************************************!*\
  !*** ./src/public/css/appointments.scss ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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

/***/ "./src/public/admin/sveltejs/appointments.svelte":
/*!*******************************************************!*\
  !*** ./src/public/admin/sveltejs/appointments.svelte ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var svelte_input_mask_MaskInput_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte-input-mask/MaskInput.svelte */ "./node_modules/svelte-input-mask/MaskInput.svelte");
/* src\public\admin\sveltejs\appointments.svelte generated by Svelte v3.55.1 */





function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[31] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[34] = list[i];
	child_ctx[36] = i;
	return child_ctx;
}

// (312:8) {#if htmlCalendar}
function create_if_block_5(ctx) {
	let html_tag;
	let html_anchor;

	return {
		c() {
			html_tag = new svelte_internal__WEBPACK_IMPORTED_MODULE_0__.HtmlTag(false);
			html_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
			html_tag.a = html_anchor;
		},
		m(target, anchor) {
			html_tag.m(/*htmlCalendar*/ ctx[2], target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, html_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*htmlCalendar*/ 4) html_tag.p(/*htmlCalendar*/ ctx[2]);
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(html_anchor);
			if (detaching) html_tag.d();
		}
	};
}

// (365:8) {:else }
function create_else_block(ctx) {
	let h1;
	let t0_value = /*CustomersChoice*/ ctx[5]['client_name'] + "";
	let t0;
	let t1;
	let t2_value = normalizeDate(/*CustomersChoice*/ ctx[5]['send']) + "";
	let t2;
	let t3;
	let t4_value = /*CustomersChoice*/ ctx[5]['timeslot_select'] + "";
	let t4;
	let t5;

	return {
		c() {
			h1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h1");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t0_value);
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(", Вы записаны\r\n                на ");
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t2_value);
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t4_value);
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(".\r\n                Мы с вами свяжемся в ближайшее время!");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(h1, "id", "is-accepted");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, h1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(h1, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(h1, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(h1, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(h1, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(h1, t4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(h1, t5);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*CustomersChoice*/ 32 && t0_value !== (t0_value = /*CustomersChoice*/ ctx[5]['client_name'] + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t0, t0_value);
			if (dirty[0] & /*CustomersChoice*/ 32 && t2_value !== (t2_value = normalizeDate(/*CustomersChoice*/ ctx[5]['send']) + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t2, t2_value);
			if (dirty[0] & /*CustomersChoice*/ 32 && t4_value !== (t4_value = /*CustomersChoice*/ ctx[5]['timeslot_select'] + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t4, t4_value);
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(h1);
		}
	};
}

// (319:8) {#if !isAccepted}
function create_if_block(ctx) {
	let t0;
	let t1;
	let if_block2_anchor;
	let current;
	let if_block0 = /*userData*/ ctx[0] && create_if_block_4(ctx);
	let if_block1 = /*isUserSelected*/ ctx[3] && create_if_block_2(ctx);
	let if_block2 = /*isTimeSlotSelected*/ ctx[4] && /*isUserSelected*/ ctx[3] && create_if_block_1(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block1) if_block1.c();
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block2) if_block2.c();
			if_block2_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t0, anchor);
			if (if_block1) if_block1.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t1, anchor);
			if (if_block2) if_block2.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, if_block2_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*userData*/ ctx[0]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_4(ctx);
					if_block0.c();
					if_block0.m(t0.parentNode, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*isUserSelected*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_2(ctx);
					if_block1.c();
					if_block1.m(t1.parentNode, t1);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*isTimeSlotSelected*/ ctx[4] && /*isUserSelected*/ ctx[3]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty[0] & /*isTimeSlotSelected, isUserSelected*/ 24) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_1(ctx);
					if_block2.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2, 1);
					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
				}
			} else if (if_block2) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}
		},
		i(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2);
			current = true;
		},
		o(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block2);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t0);
			if (if_block1) if_block1.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t1);
			if (if_block2) if_block2.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(if_block2_anchor);
		}
	};
}

// (320:12) {#if userData}
function create_if_block_4(ctx) {
	let select;
	let option;
	let select_data_date_value;
	let mounted;
	let dispose;
	let each_value_1 = /*userData*/ ctx[0].EmployeesId;
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	return {
		c() {
			select = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("select");
			option = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("option");
			option.textContent = "Выберите Мастера";

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			option.__value = "all";
			option.value = option.__value;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(select, "id", "employee_select");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(select, "data-date", select_data_date_value = /*userData*/ ctx[0]['Date']);
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, select, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(select, option);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select, null);
			}

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(select, "change", /*employeeSelectHandler*/ ctx[8]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*userData*/ 1) {
				each_value_1 = /*userData*/ ctx[0].EmployeesId;
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}

			if (dirty[0] & /*userData*/ 1 && select_data_date_value !== (select_data_date_value = /*userData*/ ctx[0]['Date'])) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(select, "data-date", select_data_date_value);
			}
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(select);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};
}

// (323:20) {#each userData.EmployeesId as id, i}
function create_each_block_1(ctx) {
	let option;
	let t_value = /*userData*/ ctx[0].EmployeesName[/*i*/ ctx[36]] + "";
	let t;
	let option_value_value;

	return {
		c() {
			option = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("option");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_value);
			option.__value = option_value_value = /*id*/ ctx[34];
			option.value = option.__value;
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, option, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(option, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*userData*/ 1 && t_value !== (t_value = /*userData*/ ctx[0].EmployeesName[/*i*/ ctx[36]] + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t, t_value);

			if (dirty[0] & /*userData*/ 1 && option_value_value !== (option_value_value = /*id*/ ctx[34])) {
				option.__value = option_value_value;
				option.value = option.__value;
			}
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(option);
		}
	};
}

// (328:12) {#if isUserSelected}
function create_if_block_2(ctx) {
	let select;
	let option;
	let mounted;
	let dispose;
	let if_block = /*timeSlots*/ ctx[6].length !== 0 && create_if_block_3(ctx);

	return {
		c() {
			select = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("select");
			option = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("option");
			option.textContent = "Выберите Время";
			if (if_block) if_block.c();
			option.__value = "time_none";
			option.value = option.__value;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(select, "id", "timeslot_select");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, select, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(select, option);
			if (if_block) if_block.m(select, null);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(select, "change", /*timeSelectHandler*/ ctx[9]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (/*timeSlots*/ ctx[6].length !== 0) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_3(ctx);
					if_block.c();
					if_block.m(select, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(select);
			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};
}

// (331:20) {#if timeSlots.length !== 0}
function create_if_block_3(ctx) {
	let each_1_anchor;
	let each_value = /*timeSlots*/ ctx[6];
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
			if (dirty[0] & /*timeSlots*/ 64) {
				each_value = /*timeSlots*/ ctx[6];
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

// (332:24) {#each timeSlots as slot}
function create_each_block(ctx) {
	let option;
	let t_value = convertToTimeFormat(/*slot*/ ctx[31]) + "";
	let t;
	let option_value_value;

	return {
		c() {
			option = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("option");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_value);
			option.__value = option_value_value = convertToTimeFormat(/*slot*/ ctx[31]);
			option.value = option.__value;
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, option, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(option, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*timeSlots*/ 64 && t_value !== (t_value = convertToTimeFormat(/*slot*/ ctx[31]) + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t, t_value);

			if (dirty[0] & /*timeSlots*/ 64 && option_value_value !== (option_value_value = convertToTimeFormat(/*slot*/ ctx[31]))) {
				option.__value = option_value_value;
				option.value = option.__value;
			}
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(option);
		}
	};
}

// (338:12) {#if isTimeSlotSelected && isUserSelected }
function create_if_block_1(ctx) {
	let div;
	let label0;
	let input0;
	let t0;
	let label1;
	let span;
	let maskinput;
	let t1;
	let label2;
	let input1;
	let t2;
	let button;
	let t3;
	let button_value_value;
	let current;
	let mounted;
	let dispose;

	maskinput = new svelte_input_mask_MaskInput_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				alwaysShowMask: true,
				mask: "+7(000)-000-00-00",
				size: 20,
				showMask: true,
				maskChar: "_",
				value: ""
			}
		});

	maskinput.$on("change", /*handleChange*/ ctx[12]);

	return {
		c() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			label0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(maskinput.$$.fragment);
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Записаться");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "type", "text");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "id", "client_name");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "placeholder", "Имя");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label0, "for", "client_name");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(span, "id", "client_phone");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label1, "for", "client_phone");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "type", "text");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "id", "client_email");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "placeholder", "email");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label2, "for", "client_email");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(button, "id", "send");
			button.disabled = "disabled";
			button.value = button_value_value = /*userData*/ ctx[0]['Date'];
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div, "id", "appointments-inputs");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, label0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label0, input0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, label1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label1, span);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(maskinput, span, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, label2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label2, input1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, button);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(button, t3);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input0, "change", /*nameValidator*/ ctx[11]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input1, "change", /*emailValidator*/ ctx[13]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(button, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*sendHandler*/ ctx[10]))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (!current || dirty[0] & /*userData*/ 1 && button_value_value !== (button_value_value = /*userData*/ ctx[0]['Date'])) {
				button.value = button_value_value;
			}
		},
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
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(maskinput);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};
}

function create_fragment(ctx) {
	let div0;
	let table;
	let t0;
	let div4;
	let div3;
	let div1;
	let t2;
	let span;
	let t4;
	let current_block_type_index;
	let if_block1;
	let t5;
	let div2;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*htmlCalendar*/ ctx[2] && create_if_block_5(ctx);
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (!/*isAccepted*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, [-1, -1]);
	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			table = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("table");
			if (if_block0) if_block0.c();
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div1.textContent = "Загрузка...";
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span.textContent = "✕";
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if_block1.c();
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(table, "id", "calendar");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "id", "calendar-wrapper");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "class", "before");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(span, "id", "close-popup");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div2, "id", "error-form-msg");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div3, "id", "popup-calendar");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div4, "id", "popup-calendar-wrapper");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, table);
			if (if_block0) if_block0.m(table, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div4, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div4, div3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div3, div1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div3, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div3, span);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div3, t4);
			if_blocks[current_block_type_index].m(div3, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div3, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div3, div2);
			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(div3, "change", /*popupChangeHandler*/ ctx[7]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (/*htmlCalendar*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_5(ctx);
					if_block0.c();
					if_block0.m(table, null);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

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
				if_block1 = if_blocks[current_block_type_index];

				if (!if_block1) {
					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block1.c();
				} else {
					if_block1.p(ctx, dirty);
				}

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block1, 1);
				if_block1.m(div3, t5);
			}
		},
		i(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block1);
			current = true;
		},
		o(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block1);
			current = false;
		},
		d(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div0);
			if (if_block0) if_block0.d();
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div4);
			if_blocks[current_block_type_index].d();
			mounted = false;
			dispose();
		}
	};
}

function colorizeDay(num) {
	switch (num) {
		case 1:
			return "monday";
		case 2:
			return "tuesday";
		case 3:
			return "wednesday";
		case 4:
			return "thursday";
		case 5:
			return "friday";
		case 6:
			return "saturday";
		case 0:
			return "sunday";
	}
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

function convertToTimeFormat(input) {
	const hours = input.substring(11, 13);
	const minutes = input.substring(14, 16);
	return hours + ':' + minutes;
}

function normalizeDate(date) {
	let parseDate = date.split('-');
	return `${parseDate[2]}.${parseDate[1]}.${parseDate[0]}`;
}

function instance($$self, $$props, $$invalidate) {
	let calendar;
	let isAccepted = false;

	const errors = {
		'Имя должно содержать больше 2 символов': true,
		'телефон должен быть формата +7(XXX)-XXX-XX-XX': true,
		"не верный формат email!": true
	};

	let sendBtn;
	let errMsg;

	function printErrors() {
		let msg = ``;

		for (const error in errors) {
			msg += `${error}</br>`;
		}

		return msg;
	}

	function renderCalendar(data) {
		try {
			const obj = data;
			const weekends = obj['weekends'];
			const calendar = obj['calendar'];
			const workDays = getWorkDays(weekDays, weekends);
			let html = '<thead><tr>';

			// Создаем заголовки с рабочими днями
			for (let j = 0; j < workDays.length; j++) {
				const workDay = workDays[j];
				html += `<th class="day-label ${colorizeDay(weekDays.indexOf(workDay))}">${workDay}</th>`;
			}

			html += '</tr></thead><tbody>';
			let currentMonth = '';
			let previousDate = null;

			// Создаем строки для каждой недели и ячейки для каждого дня
			for (let i = 0; i < calendar.length; i++) {
				const date = calendar[i]['Date'];
				const month = months[getDateMonth(date)];
				const day = getDateDay(date);

				if (currentMonth !== month) {
					if (currentMonth !== '') {
						// Если это не первый месяц, закрываем предыдущий месяц
						html += '</tr>';
					}

					html += `<tr class="month">
                   <td colspan="${weekDays.length - weekends.length}">${month}</td>
                 </tr><tr>`;

					// Добавляем пустые ячейки, если месяц начинается не с понедельника
					const offset = workDays.indexOf(weekDays[day]);

					for (let j = 0; j < offset; j++) {
						html += '<td class="td-empty"></td>';
					}

					currentMonth = month;
				}

				// Проверяем, если есть пропущенные даты между текущей и предыдущей датами
				if (previousDate && getDateNumber(date) - getDateNumber(previousDate) > 1) {
					const missingDays = getDateNumber(date) - getDateNumber(previousDate) - 1;

					// Проверяем каждый пропущенный день
					for (let j = 1; j <= missingDays; j++) {
						const missingDate = new Date(previousDate);
						missingDate.setDate(missingDate.getDate() + j); // Получаем следующую дату

						if (!weekends.includes(getDateDay(missingDate))) {
							html += '<td class="td-empty"></td>'; // Добавляем пустую ячейку для рабочего дня
						}
					}
				}

				// Вставляем число дня в соответствующую ячейку
				html += `<td id="item-num-${i}" class="${colorizeDay(getDateDay(date))}">
                        ${getDateNumber(date)}
                </td>`;

				previousDate = date; // Сохраняем текущую дату как предыдущую

				// Закрываем строку и начинаем новую после последнего дня в недели.
				if (day === weekends[weekends.length - 1] - 1) {
					html += '</tr><tr>';
				}
			}

			html += '</tr></tbody>';
			return html;
		} catch(e) {
			return e.message;
		}
	}

	const getCalendar = async () => {
		const request = await fetch('/get-calendar', {
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
	};

	let htmlCalendar;
	let userData;
	let isUserSelected = false;
	let isTimeSlotSelected = false;
	let CustomersChoice = {};
	let appointmentsInputs;
	let getData;
	let popupCalendar;

	(0,svelte__WEBPACK_IMPORTED_MODULE_1__.onMount)(async () => {
		errMsg = document.querySelector('#error-form-msg');
		sendBtn = document.querySelector('#send');
		getData = await getCalendar();
		appointmentsInputs = document.querySelectorAll('#appointments-inputs input');
		$$invalidate(2, htmlCalendar = renderCalendar(getData));
		calendar = document.getElementById('calendar');
		const popup = document.getElementById('popup-calendar-wrapper');
		popupCalendar = document.getElementById('popup-calendar');
		let toggle = false;

		calendar.addEventListener('click', ev => {
			const eTarget = ev.target;
			if (eTarget.tagName !== 'TD' || !eTarget.id) return;
			const getId = eTarget.id.split('-');
			const getItem = getId[getId.length - 1];
			toggle = !toggle;

			if (toggle) {
				popup.style.display = 'block';
			}

			$$invalidate(0, userData = getData['calendar'][getItem]);

			const popupClickHandler = ev => {
				const eTarget = ev.target;
				if (eTarget.tagName !== 'SPAN') return;
				toggle = !toggle;
				popup.style.display = 'none';
				$$invalidate(3, isUserSelected = $$invalidate(4, isTimeSlotSelected = false));
				document.getElementById('employee_select').value = "all";
				$$invalidate(5, CustomersChoice = {});
				popup.removeEventListener('click', popupClickHandler);
			};

			popup.addEventListener('click', popupClickHandler);
		});
	});

	const getDateNumber = fullDate => new Date(fullDate).getDate();
	const getDateDay = fullDate => new Date(fullDate).getDay();
	const getDateMonth = fullDate => new Date(fullDate).getMonth();
	const weekDays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
	const getWorkDays = (weekDays, weekends) => weekDays.filter((_, index) => !weekends.includes(index));

	const months = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь'
	];

	const popupChangeHandler = ev => {
		if (!isUserSelected || !isTimeSlotSelected) {
			$$invalidate(4, isTimeSlotSelected = false);
		}
	};

	let timeSlots = [];

	const employeeSelectHandler = async ev => {
		const eTarget = ev.target;
		$$invalidate(3, isUserSelected = eTarget.value !== 'all');
		$$invalidate(5, CustomersChoice[eTarget.id] = parseInt(eTarget.value), CustomersChoice);

		if (!isUserSelected) {
			delete CustomersChoice[eTarget.id];
			return;
		}

		let data = {};
		data[eTarget.id] = parseInt(eTarget.value);
		data['date'] = eTarget.dataset.date;
		const response = await sendRequest('/get-timeslot', 'POST', data);
		$$invalidate(6, timeSlots = response['time_slots']['TimeSlots']);
	};

	const timeSelectHandler = ev => {
		const eTarget = ev.target;
		$$invalidate(4, isTimeSlotSelected = eTarget.value !== 'time_none');
		$$invalidate(5, CustomersChoice[eTarget.id] = eTarget.value, CustomersChoice);

		if (!isTimeSlotSelected) {
			delete CustomersChoice[eTarget.id];
		}
	};

	const sendHandler = async ev => {
		const eTarget = ev.target;
		$$invalidate(5, CustomersChoice[eTarget.id] = eTarget.value, CustomersChoice);
		appointmentsInputs = document.querySelectorAll('#appointments-inputs input');

		appointmentsInputs.forEach(inp => {
			if (inp.id === "") {
				$$invalidate(5, CustomersChoice['client_phone'] = inp.value, CustomersChoice);
			} else {
				$$invalidate(5, CustomersChoice[inp.id] = inp.value, CustomersChoice);
			}
		});

		const before = document.querySelector('.before');

		try {
			before.style.display = "flex";
			const response = await sendRequest('/accept-appointment', 'POST', CustomersChoice);
			$$invalidate(1, isAccepted = true);
			before.style.display = "none";
		} catch(e) {
			before.style.display = "none";
			console.log(e.message);
		}
	};

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

	function nameValidator(ev) {
		sendBtn = document.querySelector('#send');
		validator(ev.target, ev.target.value.length < 3, 'Имя должно содержать больше 2 символов');
	}

	const handleChange = ({ detail }) => {
		const value = detail.inputState.maskedValue;
		sendBtn = document.querySelector('#send');
		validator(detail.element, !value.match(/^\+7\(\d+\)-\d{3}-\d{2}-\d{2}$/), 'телефон должен быть формата +7(XXX)-XXX-XX-XX');
	};

	function emailValidator(ev) {
		validator(ev.target, !ev.target.value.match(/^[a-zA-Z0-9-.]+@[a-zA-Z]+\.[a-zA-Z]+$/), "не верный формат email!");
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*userData*/ 1) {
			$: {
				userData;
			}
		}
	};

	return [
		userData,
		isAccepted,
		htmlCalendar,
		isUserSelected,
		isTimeSlotSelected,
		CustomersChoice,
		timeSlots,
		popupChangeHandler,
		employeeSelectHandler,
		timeSelectHandler,
		sendHandler,
		nameValidator,
		handleChange,
		emailValidator
	];
}

class Appointments extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {}, null, [-1, -1]);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Appointments);

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
/*!*********************************************!*\
  !*** ./src/public/admin/js/appointments.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appointments": function() { return /* binding */ appointments; }
/* harmony export */ });
/* harmony import */ var _css_appointments_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css/appointments.scss */ "./src/public/css/appointments.scss");
/* harmony import */ var _sveltejs_appointments_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sveltejs/appointments.svelte */ "./src/public/admin/sveltejs/appointments.svelte");


var appointments = new _sveltejs_appointments_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({
  target: document.getElementById('appointments')
});

}();
/******/ })()
;
//# sourceMappingURL=appointments.bundle.3b43885bc1a93d308b6e.js.map
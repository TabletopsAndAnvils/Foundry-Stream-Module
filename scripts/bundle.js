/**
 * rpg-dice-roller - An advanced JS based dice roller that can roll various types of dice and modifiers, along with mathematical equations.
 * 
 * @version 4.5.2
 * @license MIT
 * @author GreenImp <info@greenimp.co.uk> (http://greenimp.co.uk)
 * @link https://github.com/GreenImp/rpg-dice-roller
 */

/**
 * An error thrown when a comparison operator is invalid
 */
class CompareOperatorError extends TypeError {
  /**
   * Create a `CompareOperatorError`
   *
   * @param {*} operator The invalid operator
   */
  constructor(operator) {
    super(`Operator "${operator}" is invalid`);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (TypeError.captureStackTrace) {
      TypeError.captureStackTrace(this, CompareOperatorError);
    }

    this.name = 'CompareOperatorError';

    this.operator = operator;
  }
}

/**
 * An error thrown when a data format is invalid
 */
class DataFormatError extends Error {
  /**
   * Create a `DataFormatError`
   *
   * @param {*} data The invalid data
   */
  constructor(data) {
    super(`Invalid data format: ${data}`);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DataFormatError);
    }

    this.name = 'ImportError';

    this.data = data;
  }
}

/**
 * An error thrown when an invalid die action (e.g Exploding on a d1) occurs
 */
class DieActionValueError extends Error {
  /**
   * Create a `DieActionValueError`
   *
   * @param {StandardDice} die The die the action was on
   * @param {string|null} [action=null] The invalid action
   */
  constructor(die, action = null) {
    super(`Die "${die}" must have more than 1 possible value to ${action || 'do this action'}`);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DieActionValueError);
    }

    this.name = 'DieActionValueError';

    this.action = action;
    this.die = die;
  }
}

/**
 * An error thrown when the notation is invalid
 */
class NotationError extends Error {
  /**
   * Create a `NotationError`
   *
   * @param {*} notation The invalid notation
   */
  constructor(notation) {
    super(`Notation "${notation}" is invalid`);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotationError);
    }

    this.name = 'NotationError';

    this.notation = notation;
  }
}

/**
 * An error thrown when a required argument is missing
 */
class RequiredArgumentError extends Error {
  /**
   * Create a `RequiredArgumentError`
   *
   * @param {string|null} [argumentName=null] The argument name
   */
  constructor(argumentName = null) {
    super(`Missing argument${argumentName ? ` "${argumentName}"` : ''}`);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredArgumentError);
    }

    this.argumentName = argumentName;
  }
}

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  CompareOperatorError: CompareOperatorError,
  DataFormatError: DataFormatError,
  DieActionValueError: DieActionValueError,
  NotationError: NotationError,
  RequiredArgumentError: RequiredArgumentError
});

// TODO: remove these polyfills as soon as we have a build process that transpiles the code to ES5
// Polyfill for IE 11 (Number.isFinite is used in `complex.js`)
// source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite
Number.isFinite = Number.isFinite || function (value) {
  return typeof value === 'number' && isFinite(value);
}; // Polyfill for IE 11
// source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN


Number.isNaN = Number.isNaN || function (value) {
  return value !== value; // eslint-disable-line no-self-compare
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Test whether a value is a BigNumber
 * @param {*} x
 * @return {boolean}
 */

var isBigNumber = function isBigNumber(x) {
  return x && x.constructor.prototype.isBigNumber || false;
};

var object = createCommonjsModule(function (module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/**
 * Clone an object
 *
 *     clone(x)
 *
 * Can clone any primitive type, array, and object.
 * If x has a function clone, this function will be invoked to clone the object.
 *
 * @param {*} x
 * @return {*} clone
 */


exports.clone = function clone(x) {
  var type = _typeof(x); // immutable primitive types


  if (type === 'number' || type === 'string' || type === 'boolean' || x === null || x === undefined) {
    return x;
  } // use clone function of the object when available


  if (typeof x.clone === 'function') {
    return x.clone();
  } // array


  if (Array.isArray(x)) {
    return x.map(function (value) {
      return clone(value);
    });
  }

  if (x instanceof Date) return new Date(x.valueOf());
  if (isBigNumber(x)) return x; // bignumbers are immutable

  if (x instanceof RegExp) throw new TypeError('Cannot clone ' + x); // TODO: clone a RegExp
  // object

  return exports.map(x, clone);
};
/**
 * Apply map to all properties of an object
 * @param {Object} object
 * @param {function} callback
 * @return {Object} Returns a copy of the object with mapped properties
 */


exports.map = function (object, callback) {
  var clone = {};

  for (var key in object) {
    if (exports.hasOwnProperty(object, key)) {
      clone[key] = callback(object[key]);
    }
  }

  return clone;
};
/**
 * Extend object a with the properties of object b
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 */


exports.extend = function (a, b) {
  for (var prop in b) {
    if (exports.hasOwnProperty(b, prop)) {
      a[prop] = b[prop];
    }
  }

  return a;
};
/**
 * Deep extend an object a with the properties of object b
 * @param {Object} a
 * @param {Object} b
 * @returns {Object}
 */


exports.deepExtend = function deepExtend(a, b) {
  // TODO: add support for Arrays to deepExtend
  if (Array.isArray(b)) {
    throw new TypeError('Arrays are not supported by deepExtend');
  }

  for (var prop in b) {
    if (exports.hasOwnProperty(b, prop)) {
      if (b[prop] && b[prop].constructor === Object) {
        if (a[prop] === undefined) {
          a[prop] = {};
        }

        if (a[prop].constructor === Object) {
          deepExtend(a[prop], b[prop]);
        } else {
          a[prop] = b[prop];
        }
      } else if (Array.isArray(b[prop])) {
        throw new TypeError('Arrays are not supported by deepExtend');
      } else {
        a[prop] = b[prop];
      }
    }
  }

  return a;
};
/**
 * Deep test equality of all fields in two pairs of arrays or objects.
 * @param {Array | Object} a
 * @param {Array | Object} b
 * @returns {boolean}
 */


exports.deepEqual = function deepEqual(a, b) {
  var prop, i, len;

  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }

    if (a.length !== b.length) {
      return false;
    }

    for (i = 0, len = a.length; i < len; i++) {
      if (!exports.deepEqual(a[i], b[i])) {
        return false;
      }
    }

    return true;
  } else if (a instanceof Object) {
    if (Array.isArray(b) || !(b instanceof Object)) {
      return false;
    }

    for (prop in a) {
      // noinspection JSUnfilteredForInLoop
      if (!exports.deepEqual(a[prop], b[prop])) {
        return false;
      }
    }

    for (prop in b) {
      // noinspection JSUnfilteredForInLoop
      if (!exports.deepEqual(a[prop], b[prop])) {
        return false;
      }
    }

    return true;
  } else {
    return a === b;
  }
};
/**
 * Test whether the current JavaScript engine supports Object.defineProperty
 * @returns {boolean} returns true if supported
 */


exports.canDefineProperty = function () {
  // test needed for broken IE8 implementation
  try {
    if (Object.defineProperty) {
      Object.defineProperty({}, 'x', {
        get: function get() {}
      });
      return true;
    }
  } catch (e) {}

  return false;
};
/**
 * Attach a lazy loading property to a constant.
 * The given function `fn` is called once when the property is first requested.
 * On older browsers (<IE8), the function will fall back to direct evaluation
 * of the properties value.
 * @param {Object} object   Object where to add the property
 * @param {string} prop     Property name
 * @param {Function} fn     Function returning the property value. Called
 *                          without arguments.
 */


exports.lazy = function (object, prop, fn) {
  if (exports.canDefineProperty()) {
    var _uninitialized = true;

    var _value;

    Object.defineProperty(object, prop, {
      get: function get() {
        if (_uninitialized) {
          _value = fn();
          _uninitialized = false;
        }

        return _value;
      },
      set: function set(value) {
        _value = value;
        _uninitialized = false;
      },
      configurable: true,
      enumerable: true
    });
  } else {
    // fall back to immediate evaluation
    object[prop] = fn();
  }
};
/**
 * Traverse a path into an object.
 * When a namespace is missing, it will be created
 * @param {Object} object
 * @param {string} path   A dot separated string like 'name.space'
 * @return {Object} Returns the object at the end of the path
 */


exports.traverse = function (object, path) {
  var obj = object;

  if (path) {
    var names = path.split('.');

    for (var i = 0; i < names.length; i++) {
      var name = names[i];

      if (!(name in obj)) {
        obj[name] = {};
      }

      obj = obj[name];
    }
  }

  return obj;
};
/**
 * A safe hasOwnProperty
 * @param {Object} object
 * @param {string} property
 */


exports.hasOwnProperty = function (object, property) {
  return object && Object.hasOwnProperty.call(object, property);
};
/**
 * Test whether an object is a factory. a factory has fields:
 *
 * - factory: function (type: Object, config: Object, load: function, typed: function [, math: Object])   (required)
 * - name: string (optional)
 * - path: string    A dot separated path (optional)
 * - math: boolean   If true (false by default), the math namespace is passed
 *                   as fifth argument of the factory function
 *
 * @param {*} object
 * @returns {boolean}
 */


exports.isFactory = function (object) {
  return object && typeof object.factory === 'function';
};
});
var object_1 = object.clone;
var object_2 = object.map;
var object_3 = object.extend;
var object_4 = object.deepExtend;
var object_5 = object.deepEqual;
var object_6 = object.canDefineProperty;
var object_7 = object.lazy;
var object_8 = object.traverse;
var object_9 = object.isFactory;

var typedFunction = createCommonjsModule(function (module, exports) {

(function (root, factory) {
  {
    // OldNode. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like OldNode.
    module.exports = factory();
  }
}(commonjsGlobal, function () {

  function ok () {
    return true;
  }

  function notOk () {
    return false;
  }

  function undef () {
    return undefined;
  }

  /**
   * @typedef {{
   *   params: Param[],
   *   fn: function
   * }} Signature
   *
   * @typedef {{
   *   types: Type[],
   *   restParam: boolean
   * }} Param
   *
   * @typedef {{
   *   name: string,
   *   typeIndex: number,
   *   test: function,
   *   conversion?: ConversionDef,
   *   conversionIndex: number,
   * }} Type
   *
   * @typedef {{
   *   from: string,
   *   to: string,
   *   convert: function (*) : *
   * }} ConversionDef
   *
   * @typedef {{
   *   name: string,
   *   test: function(*) : boolean
   * }} TypeDef
   */

  // create a new instance of typed-function
  function create () {
    // data type tests
    var _types = [
      { name: 'number',    test: function (x) { return typeof x === 'number' } },
      { name: 'string',    test: function (x) { return typeof x === 'string' } },
      { name: 'boolean',   test: function (x) { return typeof x === 'boolean' } },
      { name: 'Function',  test: function (x) { return typeof x === 'function'} },
      { name: 'Array',     test: Array.isArray },
      { name: 'Date',      test: function (x) { return x instanceof Date } },
      { name: 'RegExp',    test: function (x) { return x instanceof RegExp } },
      { name: 'Object',    test: function (x) {
        return typeof x === 'object' && x.constructor === Object
      }},
      { name: 'null',      test: function (x) { return x === null } },
      { name: 'undefined', test: function (x) { return x === undefined } }
    ];

    var anyType = {
      name: 'any',
      test: ok
    };

    // types which need to be ignored
    var _ignore = [];

    // type conversions
    var _conversions = [];

    // This is a temporary object, will be replaced with a typed function at the end
    var typed = {
      types: _types,
      conversions: _conversions,
      ignore: _ignore
    };

    /**
     * Find the test function for a type
     * @param {String} typeName
     * @return {TypeDef} Returns the type definition when found,
     *                    Throws a TypeError otherwise
     */
    function findTypeByName (typeName) {
      var entry = findInArray(typed.types, function (entry) {
        return entry.name === typeName;
      });

      if (entry) {
        return entry;
      }

      if (typeName === 'any') { // special baked-in case 'any'
        return anyType;
      }

      var hint = findInArray(typed.types, function (entry) {
        return entry.name.toLowerCase() === typeName.toLowerCase();
      });

      throw new TypeError('Unknown type "' + typeName + '"' +
          (hint ? ('. Did you mean "' + hint.name + '"?') : ''));
    }

    /**
     * Find the index of a type definition. Handles special case 'any'
     * @param {TypeDef} type
     * @return {number}
     */
    function findTypeIndex(type) {
      if (type === anyType) {
        return 999;
      }

      return typed.types.indexOf(type);
    }

    /**
     * Find a type that matches a value.
     * @param {*} value
     * @return {string} Returns the name of the first type for which
     *                  the type test matches the value.
     */
    function findTypeName(value) {
      var entry = findInArray(typed.types, function (entry) {
        return entry.test(value);
      });

      if (entry) {
        return entry.name;
      }

      throw new TypeError('Value has unknown type. Value: ' + value);
    }

    /**
     * Find a specific signature from a (composed) typed function, for example:
     *
     *   typed.find(fn, ['number', 'string'])
     *   typed.find(fn, 'number, string')
     *
     * Function find only only works for exact matches.
     *
     * @param {Function} fn                   A typed-function
     * @param {string | string[]} signature   Signature to be found, can be
     *                                        an array or a comma separated string.
     * @return {Function}                     Returns the matching signature, or
     *                                        throws an error when no signature
     *                                        is found.
     */
    function find (fn, signature) {
      if (!fn.signatures) {
        throw new TypeError('Function is no typed-function');
      }

      // normalize input
      var arr;
      if (typeof signature === 'string') {
        arr = signature.split(',');
        for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].trim();
        }
      }
      else if (Array.isArray(signature)) {
        arr = signature;
      }
      else {
        throw new TypeError('String array or a comma separated string expected');
      }

      var str = arr.join(',');

      // find an exact match
      var match = fn.signatures[str];
      if (match) {
        return match;
      }

      // TODO: extend find to match non-exact signatures

      throw new TypeError('Signature not found (signature: ' + (fn.name || 'unnamed') + '(' + arr.join(', ') + '))');
    }

    /**
     * Convert a given value to another data type.
     * @param {*} value
     * @param {string} type
     */
    function convert (value, type) {
      var from = findTypeName(value);

      // check conversion is needed
      if (type === from) {
        return value;
      }

      for (var i = 0; i < typed.conversions.length; i++) {
        var conversion = typed.conversions[i];
        if (conversion.from === from && conversion.to === type) {
          return conversion.convert(value);
        }
      }

      throw new Error('Cannot convert from ' + from + ' to ' + type);
    }
    
    /**
     * Stringify parameters in a normalized way
     * @param {Param[]} params
     * @return {string}
     */
    function stringifyParams (params) {
      return params
          .map(function (param) {
            var typeNames = param.types.map(getTypeName);

            return (param.restParam ? '...' : '') + typeNames.join('|');
          })
          .join(',');
    }

    /**
     * Parse a parameter, like "...number | boolean"
     * @param {string} param
     * @param {ConversionDef[]} conversions
     * @return {Param} param
     */
    function parseParam (param, conversions) {
      var restParam = param.indexOf('...') === 0;
      var types = (!restParam)
          ? param
          : (param.length > 3)
              ? param.slice(3)
              : 'any';

      var typeNames = types.split('|').map(trim)
          .filter(notEmpty)
          .filter(notIgnore);

      var matchingConversions = filterConversions(conversions, typeNames);

      var exactTypes = typeNames.map(function (typeName) {
        var type = findTypeByName(typeName);

        return {
          name: typeName,
          typeIndex: findTypeIndex(type),
          test: type.test,
          conversion: null,
          conversionIndex: -1
        };
      });

      var convertibleTypes = matchingConversions.map(function (conversion) {
        var type = findTypeByName(conversion.from);

        return {
          name: conversion.from,
          typeIndex: findTypeIndex(type),
          test: type.test,
          conversion: conversion,
          conversionIndex: conversions.indexOf(conversion)
        };
      });

      return {
        types: exactTypes.concat(convertibleTypes),
        restParam: restParam
      };
    }

    /**
     * Parse a signature with comma separated parameters,
     * like "number | boolean, ...string"
     * @param {string} signature
     * @param {function} fn
     * @param {ConversionDef[]} conversions
     * @return {Signature | null} signature
     */
    function parseSignature (signature, fn, conversions) {
      var params = [];

      if (signature.trim() !== '') {
        params = signature
            .split(',')
            .map(trim)
            .map(function (param, index, array) {
              var parsedParam = parseParam(param, conversions);

              if (parsedParam.restParam && (index !== array.length - 1)) {
                throw new SyntaxError('Unexpected rest parameter "' + param + '": ' +
                    'only allowed for the last parameter');
              }

              return parsedParam;
          });
      }

      if (params.some(isInvalidParam)) {
        // invalid signature: at least one parameter has no types
        // (they may have been filtered)
        return null;
      }

      return {
        params: params,
        fn: fn
      };
    }

    /**
     * Test whether a set of params contains a restParam
     * @param {Param[]} params
     * @return {boolean} Returns true when the last parameter is a restParam
     */
    function hasRestParam(params) {
      var param = last(params);
      return param ? param.restParam : false;
    }

    /**
     * Test whether a parameter contains conversions
     * @param {Param} param
     * @return {boolean} Returns true when at least one of the parameters
     *                   contains a conversion.
     */
    function hasConversions(param) {
      return param.types.some(function (type) {
        return type.conversion != null;
      });
    }

    /**
     * Create a type test for a single parameter, which can have one or multiple
     * types.
     * @param {Param} param
     * @return {function(x: *) : boolean} Returns a test function
     */
    function compileTest(param) {
      if (!param || param.types.length === 0) {
        // nothing to do
        return ok;
      }
      else if (param.types.length === 1) {
        return findTypeByName(param.types[0].name).test;
      }
      else if (param.types.length === 2) {
        var test0 = findTypeByName(param.types[0].name).test;
        var test1 = findTypeByName(param.types[1].name).test;
        return function or(x) {
          return test0(x) || test1(x);
        }
      }
      else { // param.types.length > 2
        var tests = param.types.map(function (type) {
          return findTypeByName(type.name).test;
        });
        return function or(x) {
          for (var i = 0; i < tests.length; i++) {
            if (tests[i](x)) {
              return true;
            }
          }
          return false;
        }
      }
    }

    /**
     * Create a test for all parameters of a signature
     * @param {Param[]} params
     * @return {function(args: Array<*>) : boolean}
     */
    function compileTests(params) {
      var tests, test0, test1;

      if (hasRestParam(params)) {
        // variable arguments like '...number'
        tests = initial(params).map(compileTest);
        var varIndex = tests.length;
        var lastTest = compileTest(last(params));
        var testRestParam = function (args) {
          for (var i = varIndex; i < args.length; i++) {
            if (!lastTest(args[i])) {
              return false;
            }
          }
          return true;
        };

        return function testArgs(args) {
          for (var i = 0; i < tests.length; i++) {
            if (!tests[i](args[i])) {
              return false;
            }
          }
          return testRestParam(args) && (args.length >= varIndex + 1);
        };
      }
      else {
        // no variable arguments
        if (params.length === 0) {
          return function testArgs(args) {
            return args.length === 0;
          };
        }
        else if (params.length === 1) {
          test0 = compileTest(params[0]);
          return function testArgs(args) {
            return test0(args[0]) && args.length === 1;
          };
        }
        else if (params.length === 2) {
          test0 = compileTest(params[0]);
          test1 = compileTest(params[1]);
          return function testArgs(args) {
            return test0(args[0]) && test1(args[1]) && args.length === 2;
          };
        }
        else { // arguments.length > 2
          tests = params.map(compileTest);
          return function testArgs(args) {
            for (var i = 0; i < tests.length; i++) {
              if (!tests[i](args[i])) {
                return false;
              }
            }
            return args.length === tests.length;
          };
        }
      }
    }

    /**
     * Find the parameter at a specific index of a signature.
     * Handles rest parameters.
     * @param {Signature} signature
     * @param {number} index
     * @return {Param | null} Returns the matching parameter when found,
     *                        null otherwise.
     */
    function getParamAtIndex(signature, index) {
      return index < signature.params.length
          ? signature.params[index]
          : hasRestParam(signature.params)
              ? last(signature.params)
              : null
    }

    /**
     * Get all type names of a parameter
     * @param {Signature} signature
     * @param {number} index
     * @param {boolean} excludeConversions
     * @return {string[]} Returns an array with type names
     */
    function getExpectedTypeNames (signature, index, excludeConversions) {
      var param = getParamAtIndex(signature, index);
      var types = param
          ? excludeConversions
                  ? param.types.filter(isExactType)
                  : param.types
          : [];

      return types.map(getTypeName);
    }

    /**
     * Returns the name of a type
     * @param {Type} type
     * @return {string} Returns the type name
     */
    function getTypeName(type) {
      return type.name;
    }

    /**
     * Test whether a type is an exact type or conversion
     * @param {Type} type
     * @return {boolean} Returns true when
     */
    function isExactType(type) {
      return type.conversion === null || type.conversion === undefined;
    }

    /**
     * Helper function for creating error messages: create an array with
     * all available types on a specific argument index.
     * @param {Signature[]} signatures
     * @param {number} index
     * @return {string[]} Returns an array with available types
     */
    function mergeExpectedParams(signatures, index) {
      var typeNames = uniq(flatMap(signatures, function (signature) {
        return getExpectedTypeNames(signature, index, false);
      }));

      return (typeNames.indexOf('any') !== -1) ? ['any'] : typeNames;
    }

    /**
     * Create
     * @param {string} name             The name of the function
     * @param {array.<*>} args          The actual arguments passed to the function
     * @param {Signature[]} signatures  A list with available signatures
     * @return {TypeError} Returns a type error with additional data
     *                     attached to it in the property `data`
     */
    function createError(name, args, signatures) {
      var err, expected;
      var _name = name || 'unnamed';

      // test for wrong type at some index
      var matchingSignatures = signatures;
      var index;
      for (index = 0; index < args.length; index++) {
        var nextMatchingDefs = matchingSignatures.filter(function (signature) {
          var test = compileTest(getParamAtIndex(signature, index));
          return (index < signature.params.length || hasRestParam(signature.params)) &&
              test(args[index]);
        });

        if (nextMatchingDefs.length === 0) {
          // no matching signatures anymore, throw error "wrong type"
          expected = mergeExpectedParams(matchingSignatures, index);
          if (expected.length > 0) {
            var actualType = findTypeName(args[index]);

            err = new TypeError('Unexpected type of argument in function ' + _name +
                ' (expected: ' + expected.join(' or ') +
                ', actual: ' + actualType + ', index: ' + index + ')');
            err.data = {
              category: 'wrongType',
              fn: _name,
              index: index,
              actual: actualType,
              expected: expected
            };
            return err;
          }
        }
        else {
          matchingSignatures = nextMatchingDefs;
        }
      }

      // test for too few arguments
      var lengths = matchingSignatures.map(function (signature) {
        return hasRestParam(signature.params) ? Infinity : signature.params.length;
      });
      if (args.length < Math.min.apply(null, lengths)) {
        expected = mergeExpectedParams(matchingSignatures, index);
        err = new TypeError('Too few arguments in function ' + _name +
            ' (expected: ' + expected.join(' or ') +
            ', index: ' + args.length + ')');
        err.data = {
          category: 'tooFewArgs',
          fn: _name,
          index: args.length,
          expected: expected
        };
        return err;
      }

      // test for too many arguments
      var maxLength = Math.max.apply(null, lengths);
      if (args.length > maxLength) {
        err = new TypeError('Too many arguments in function ' + _name +
            ' (expected: ' + maxLength + ', actual: ' + args.length + ')');
        err.data = {
          category: 'tooManyArgs',
          fn: _name,
          index: args.length,
          expectedLength: maxLength
        };
        return err;
      }

      err = new TypeError('Arguments of type "' + args.join(', ') +
          '" do not match any of the defined signatures of function ' + _name + '.');
      err.data = {
        category: 'mismatch',
        actual: args.map(findTypeName)
      };
      return err;
    }

    /**
     * Find the lowest index of all exact types of a parameter (no conversions)
     * @param {Param} param
     * @return {number} Returns the index of the lowest type in typed.types
     */
    function getLowestTypeIndex (param) {
      var min = 999;

      for (var i = 0; i < param.types.length; i++) {
        if (isExactType(param.types[i])) {
          min = Math.min(min, param.types[i].typeIndex);
        }
      }

      return min;
    }

    /**
     * Find the lowest index of the conversion of all types of the parameter
     * having a conversion
     * @param {Param} param
     * @return {number} Returns the lowest index of the conversions of this type
     */
    function getLowestConversionIndex (param) {
      var min = 999;

      for (var i = 0; i < param.types.length; i++) {
        if (!isExactType(param.types[i])) {
          min = Math.min(min, param.types[i].conversionIndex);
        }
      }

      return min;
    }

    /**
     * Compare two params
     * @param {Param} param1
     * @param {Param} param2
     * @return {number} returns a negative number when param1 must get a lower
     *                  index than param2, a positive number when the opposite,
     *                  or zero when both are equal
     */
    function compareParams (param1, param2) {
      var c;

      // compare having a rest parameter or not
      c = param1.restParam - param2.restParam;
      if (c !== 0) {
        return c;
      }

      // compare having conversions or not
      c = hasConversions(param1) - hasConversions(param2);
      if (c !== 0) {
        return c;
      }

      // compare the index of the types
      c = getLowestTypeIndex(param1) - getLowestTypeIndex(param2);
      if (c !== 0) {
        return c;
      }

      // compare the index of any conversion
      return getLowestConversionIndex(param1) - getLowestConversionIndex(param2);
    }

    /**
     * Compare two signatures
     * @param {Signature} signature1
     * @param {Signature} signature2
     * @return {number} returns a negative number when param1 must get a lower
     *                  index than param2, a positive number when the opposite,
     *                  or zero when both are equal
     */
    function compareSignatures (signature1, signature2) {
      var len = Math.min(signature1.params.length, signature2.params.length);
      var i;
      var c;

      // compare whether the params have conversions at all or not
      c = signature1.params.some(hasConversions) - signature2.params.some(hasConversions);
      if (c !== 0) {
        return c;
      }

      // next compare whether the params have conversions one by one
      for (i = 0; i < len; i++) {
        c = hasConversions(signature1.params[i]) - hasConversions(signature2.params[i]);
        if (c !== 0) {
          return c;
        }
      }

      // compare the types of the params one by one
      for (i = 0; i < len; i++) {
        c = compareParams(signature1.params[i], signature2.params[i]);
        if (c !== 0) {
          return c;
        }
      }

      // compare the number of params
      return signature1.params.length - signature2.params.length;
    }

    /**
     * Get params containing all types that can be converted to the defined types.
     *
     * @param {ConversionDef[]} conversions
     * @param {string[]} typeNames
     * @return {ConversionDef[]} Returns the conversions that are available
     *                        for every type (if any)
     */
    function filterConversions(conversions, typeNames) {
      var matches = {};

      conversions.forEach(function (conversion) {
        if (typeNames.indexOf(conversion.from) === -1 &&
            typeNames.indexOf(conversion.to) !== -1 &&
            !matches[conversion.from]) {
          matches[conversion.from] = conversion;
        }
      });

      return Object.keys(matches).map(function (from) {
        return matches[from];
      });
    }

    /**
     * Preprocess arguments before calling the original function:
     * - if needed convert the parameters
     * - in case of rest parameters, move the rest parameters into an Array
     * @param {Param[]} params
     * @param {function} fn
     * @return {function} Returns a wrapped function
     */
    function compileArgsPreprocessing(params, fn) {
      var fnConvert = fn;

      // TODO: can we make this wrapper function smarter/simpler?

      if (params.some(hasConversions)) {
        var restParam = hasRestParam(params);
        var compiledConversions = params.map(compileArgConversion);

        fnConvert = function convertArgs() {
          var args = [];
          var last = restParam ? arguments.length - 1 : arguments.length;
          for (var i = 0; i < last; i++) {
            args[i] = compiledConversions[i](arguments[i]);
          }
          if (restParam) {
            args[last] = arguments[last].map(compiledConversions[last]);
          }

          return fn.apply(null, args);
        };
      }

      var fnPreprocess = fnConvert;
      if (hasRestParam(params)) {
        var offset = params.length - 1;

        fnPreprocess = function preprocessRestParams () {
          return fnConvert.apply(null,
              slice(arguments, 0, offset).concat([slice(arguments, offset)]));
        };
      }

      return fnPreprocess;
    }

    /**
     * Compile conversion for a parameter to the right type
     * @param {Param} param
     * @return {function} Returns the wrapped function that will convert arguments
     *
     */
    function compileArgConversion(param) {
      var test0, test1, conversion0, conversion1;
      var tests = [];
      var conversions = [];

      param.types.forEach(function (type) {
        if (type.conversion) {
          tests.push(findTypeByName(type.conversion.from).test);
          conversions.push(type.conversion.convert);
        }
      });

      // create optimized conversion functions depending on the number of conversions
      switch (conversions.length) {
        case 0:
          return function convertArg(arg) {
            return arg;
          }

        case 1:
          test0 = tests[0];
          conversion0 = conversions[0];
          return function convertArg(arg) {
            if (test0(arg)) {
              return conversion0(arg)
            }
            return arg;
          }

        case 2:
          test0 = tests[0];
          test1 = tests[1];
          conversion0 = conversions[0];
          conversion1 = conversions[1];
          return function convertArg(arg) {
            if (test0(arg)) {
              return conversion0(arg)
            }
            if (test1(arg)) {
              return conversion1(arg)
            }
            return arg;
          }

        default:
          return function convertArg(arg) {
            for (var i = 0; i < conversions.length; i++) {
              if (tests[i](arg)) {
                return conversions[i](arg);
              }
            }
            return arg;
          }
      }
    }

    /**
     * Convert an array with signatures into a map with signatures,
     * where signatures with union types are split into separate signatures
     *
     * Throws an error when there are conflicting types
     *
     * @param {Signature[]} signatures
     * @return {Object.<string, function>}  Returns a map with signatures
     *                                      as key and the original function
     *                                      of this signature as value.
     */
    function createSignaturesMap(signatures) {
      var signaturesMap = {};
      signatures.forEach(function (signature) {
        if (!signature.params.some(hasConversions)) {
          splitParams(signature.params, true).forEach(function (params) {
            signaturesMap[stringifyParams(params)] = signature.fn;
          });
        }
      });

      return signaturesMap;
    }

    /**
     * Split params with union types in to separate params.
     *
     * For example:
     *
     *     splitParams([['Array', 'Object'], ['string', 'RegExp'])
     *     // returns:
     *     // [
     *     //   ['Array', 'string'],
     *     //   ['Array', 'RegExp'],
     *     //   ['Object', 'string'],
     *     //   ['Object', 'RegExp']
     *     // ]
     *
     * @param {Param[]} params
     * @param {boolean} ignoreConversionTypes
     * @return {Param[]}
     */
    function splitParams(params, ignoreConversionTypes) {
      function _splitParams(params, index, types) {
        if (index < params.length) {
          var param = params[index];
          var filteredTypes = ignoreConversionTypes
              ? param.types.filter(isExactType)
              : param.types;
          var typeGroups;

          if (param.restParam) {
            // split the types of a rest parameter in two:
            // one with only exact types, and one with exact types and conversions
            var exactTypes = filteredTypes.filter(isExactType);
            typeGroups = exactTypes.length < filteredTypes.length
                ? [exactTypes, filteredTypes]
                : [filteredTypes];

          }
          else {
            // split all the types of a regular parameter into one type per group
            typeGroups = filteredTypes.map(function (type) {
              return [type]
            });
          }

          // recurse over the groups with types
          return flatMap(typeGroups, function (typeGroup) {
            return _splitParams(params, index + 1, types.concat([typeGroup]));
          });

        }
        else {
          // we've reached the end of the parameters. Now build a new Param
          var splittedParams = types.map(function (type, typeIndex) {
            return {
              types: type,
              restParam: (typeIndex === params.length - 1) && hasRestParam(params)
            }
          });

          return [splittedParams];
        }
      }

      return _splitParams(params, 0, []);
    }

    /**
     * Test whether two signatures have a conflicting signature
     * @param {Signature} signature1
     * @param {Signature} signature2
     * @return {boolean} Returns true when the signatures conflict, false otherwise.
     */
    function hasConflictingParams(signature1, signature2) {
      var ii = Math.max(signature1.params.length, signature2.params.length);

      for (var i = 0; i < ii; i++) {
        var typesNames1 = getExpectedTypeNames(signature1, i, true);
        var typesNames2 = getExpectedTypeNames(signature2, i, true);

        if (!hasOverlap(typesNames1, typesNames2)) {
          return false;
        }
      }

      var len1 = signature1.params.length;
      var len2 = signature2.params.length;
      var restParam1 = hasRestParam(signature1.params);
      var restParam2 = hasRestParam(signature2.params);

      return restParam1
          ? restParam2 ? (len1 === len2) : (len2 >= len1)
          : restParam2 ? (len1 >= len2)  : (len1 === len2)
    }

    /**
     * Create a typed function
     * @param {String} name               The name for the typed function
     * @param {Object.<string, function>} signaturesMap
     *                                    An object with one or
     *                                    multiple signatures as key, and the
     *                                    function corresponding to the
     *                                    signature as value.
     * @return {function}  Returns the created typed function.
     */
    function createTypedFunction(name, signaturesMap) {
      if (Object.keys(signaturesMap).length === 0) {
        throw new SyntaxError('No signatures provided');
      }

      // parse the signatures, and check for conflicts
      var parsedSignatures = [];
      Object.keys(signaturesMap)
          .map(function (signature) {
            return parseSignature(signature, signaturesMap[signature], typed.conversions);
          })
          .filter(notNull)
          .forEach(function (parsedSignature) {
            // check whether this parameter conflicts with already parsed signatures
            var conflictingSignature = findInArray(parsedSignatures, function (s) {
              return hasConflictingParams(s, parsedSignature)
            });
            if (conflictingSignature) {
              throw new TypeError('Conflicting signatures "' +
                  stringifyParams(conflictingSignature.params) + '" and "' +
                  stringifyParams(parsedSignature.params) + '".');
            }

            parsedSignatures.push(parsedSignature);
          });

      // split and filter the types of the signatures, and then order them
      var signatures = flatMap(parsedSignatures, function (parsedSignature) {
        var params = parsedSignature ? splitParams(parsedSignature.params, false) : [];

        return params.map(function (params) {
          return {
            params: params,
            fn: parsedSignature.fn
          };
        });
      }).filter(notNull);

      signatures.sort(compareSignatures);

      // we create a highly optimized checks for the first couple of signatures with max 2 arguments
      var ok0 = signatures[0] && signatures[0].params.length <= 2 && !hasRestParam(signatures[0].params);
      var ok1 = signatures[1] && signatures[1].params.length <= 2 && !hasRestParam(signatures[1].params);
      var ok2 = signatures[2] && signatures[2].params.length <= 2 && !hasRestParam(signatures[2].params);
      var ok3 = signatures[3] && signatures[3].params.length <= 2 && !hasRestParam(signatures[3].params);
      var ok4 = signatures[4] && signatures[4].params.length <= 2 && !hasRestParam(signatures[4].params);
      var ok5 = signatures[5] && signatures[5].params.length <= 2 && !hasRestParam(signatures[5].params);
      var allOk = ok0 && ok1 && ok2 && ok3 && ok4 && ok5;

      // compile the tests
      var tests = signatures.map(function (signature) {
        return compileTests(signature.params);
      });

      var test00 = ok0 ? compileTest(signatures[0].params[0]) : notOk;
      var test10 = ok1 ? compileTest(signatures[1].params[0]) : notOk;
      var test20 = ok2 ? compileTest(signatures[2].params[0]) : notOk;
      var test30 = ok3 ? compileTest(signatures[3].params[0]) : notOk;
      var test40 = ok4 ? compileTest(signatures[4].params[0]) : notOk;
      var test50 = ok5 ? compileTest(signatures[5].params[0]) : notOk;

      var test01 = ok0 ? compileTest(signatures[0].params[1]) : notOk;
      var test11 = ok1 ? compileTest(signatures[1].params[1]) : notOk;
      var test21 = ok2 ? compileTest(signatures[2].params[1]) : notOk;
      var test31 = ok3 ? compileTest(signatures[3].params[1]) : notOk;
      var test41 = ok4 ? compileTest(signatures[4].params[1]) : notOk;
      var test51 = ok5 ? compileTest(signatures[5].params[1]) : notOk;

      // compile the functions
      var fns = signatures.map(function(signature) {
        return compileArgsPreprocessing(signature.params, signature.fn)
      });

      var fn0 = ok0 ? fns[0] : undef;
      var fn1 = ok1 ? fns[1] : undef;
      var fn2 = ok2 ? fns[2] : undef;
      var fn3 = ok3 ? fns[3] : undef;
      var fn4 = ok4 ? fns[4] : undef;
      var fn5 = ok5 ? fns[5] : undef;

      var len0 = ok0 ? signatures[0].params.length : -1;
      var len1 = ok1 ? signatures[1].params.length : -1;
      var len2 = ok2 ? signatures[2].params.length : -1;
      var len3 = ok3 ? signatures[3].params.length : -1;
      var len4 = ok4 ? signatures[4].params.length : -1;
      var len5 = ok5 ? signatures[5].params.length : -1;

      // simple and generic, but also slow
      var iStart = allOk ? 6 : 0;
      var iEnd = signatures.length;
      var generic = function generic() {

        for (var i = iStart; i < iEnd; i++) {
          if (tests[i](arguments)) {
            return fns[i].apply(null, arguments);
          }
        }

        throw createError(name, arguments, signatures);
      };

      // create the typed function
      // fast, specialized version. Falls back to the slower, generic one if needed
      var fn = function fn(arg0, arg1) {

        if (arguments.length === len0 && test00(arg0) && test01(arg1)) { return fn0.apply(null, arguments); }
        if (arguments.length === len1 && test10(arg0) && test11(arg1)) { return fn1.apply(null, arguments); }
        if (arguments.length === len2 && test20(arg0) && test21(arg1)) { return fn2.apply(null, arguments); }
        if (arguments.length === len3 && test30(arg0) && test31(arg1)) { return fn3.apply(null, arguments); }
        if (arguments.length === len4 && test40(arg0) && test41(arg1)) { return fn4.apply(null, arguments); }
        if (arguments.length === len5 && test50(arg0) && test51(arg1)) { return fn5.apply(null, arguments); }

        return generic.apply(null, arguments);
      };

      // attach name the typed function
      try {
        Object.defineProperty(fn, 'name', {value: name});
      }
      catch (err) {
        // old browsers do not support Object.defineProperty and some don't support setting the name property
        // the function name is not essential for the functioning, it's mostly useful for debugging,
        // so it's fine to have unnamed functions.
      }

      // attach signatures to the function
      fn.signatures = createSignaturesMap(signatures);

      return fn;
    }

    /**
     * Test whether a type should be NOT be ignored
     * @param {string} typeName
     * @return {boolean}
     */
    function notIgnore(typeName) {
      return typed.ignore.indexOf(typeName) === -1;
    }

    /**
     * trim a string
     * @param {string} str
     * @return {string}
     */
    function trim(str) {
      return str.trim();
    }

    /**
     * Test whether a string is not empty
     * @param {string} str
     * @return {boolean}
     */
    function notEmpty(str) {
      return !!str;
    }

    /**
     * test whether a value is not strict equal to null
     * @param {*} value
     * @return {boolean}
     */
    function notNull(value) {
      return value !== null;
    }

    /**
     * Test whether a parameter has no types defined
     * @param {Param} param
     * @return {boolean}
     */
    function isInvalidParam (param) {
      return param.types.length === 0;
    }

    /**
     * Return all but the last items of an array
     * @param {Array} arr
     * @return {Array}
     */
    function initial(arr) {
      return arr.slice(0, arr.length - 1);
    }

    /**
     * return the last item of an array
     * @param {Array} arr
     * @return {*}
     */
    function last(arr) {
      return arr[arr.length - 1];
    }

    /**
     * Slice an array or function Arguments
     * @param {Array | Arguments | IArguments} arr
     * @param {number} start
     * @param {number} [end]
     * @return {Array}
     */
    function slice(arr, start, end) {
      return Array.prototype.slice.call(arr, start, end);
    }

    /**
     * Test whether an array contains some item
     * @param {Array} array
     * @param {*} item
     * @return {boolean} Returns true if array contains item, false if not.
     */
    function contains(array, item) {
      return array.indexOf(item) !== -1;
    }

    /**
     * Test whether two arrays have overlapping items
     * @param {Array} array1
     * @param {Array} array2
     * @return {boolean} Returns true when at least one item exists in both arrays
     */
    function hasOverlap(array1, array2) {
      for (var i = 0; i < array1.length; i++) {
        if (contains(array2, array1[i])) {
          return true;
        }
      }

      return false;
    }

    /**
     * Return the first item from an array for which test(arr[i]) returns true
     * @param {Array} arr
     * @param {function} test
     * @return {* | undefined} Returns the first matching item
     *                         or undefined when there is no match
     */
    function findInArray(arr, test) {
      for (var i = 0; i < arr.length; i++) {
        if (test(arr[i])) {
          return arr[i];
        }
      }
      return undefined;
    }

    /**
     * Filter unique items of an array with strings
     * @param {string[]} arr
     * @return {string[]}
     */
    function uniq(arr) {
      var entries = {};
      for (var i = 0; i < arr.length; i++) {
        entries[arr[i]] = true;
      }
      return Object.keys(entries);
    }

    /**
     * Flat map the result invoking a callback for every item in an array.
     * https://gist.github.com/samgiles/762ee337dff48623e729
     * @param {Array} arr
     * @param {function} callback
     * @return {Array}
     */
    function flatMap(arr, callback) {
      return Array.prototype.concat.apply([], arr.map(callback));
    }

    /**
     * Retrieve the function name from a set of typed functions,
     * and check whether the name of all functions match (if given)
     * @param {function[]} fns
     */
    function getName (fns) {
      var name = '';

      for (var i = 0; i < fns.length; i++) {
        var fn = fns[i];

        // check whether the names are the same when defined
        if ((typeof fn.signatures === 'object' || typeof fn.signature === 'string') && fn.name !== '') {
          if (name === '') {
            name = fn.name;
          }
          else if (name !== fn.name) {
            var err = new Error('Function names do not match (expected: ' + name + ', actual: ' + fn.name + ')');
            err.data = {
              actual: fn.name,
              expected: name
            };
            throw err;
          }
        }
      }

      return name;
    }

    // extract and merge all signatures of a list with typed functions
    function extractSignatures(fns) {
      var err;
      var signaturesMap = {};

      function validateUnique(_signature, _fn) {
        if (signaturesMap.hasOwnProperty(_signature) && _fn !== signaturesMap[_signature]) {
          err = new Error('Signature "' + _signature + '" is defined twice');
          err.data = {signature: _signature};
          throw err;
          // else: both signatures point to the same function, that's fine
        }
      }

      for (var i = 0; i < fns.length; i++) {
        var fn = fns[i];

        // test whether this is a typed-function
        if (typeof fn.signatures === 'object') {
          // merge the signatures
          for (var signature in fn.signatures) {
            if (fn.signatures.hasOwnProperty(signature)) {
              validateUnique(signature, fn.signatures[signature]);
              signaturesMap[signature] = fn.signatures[signature];
            }
          }
        }
        else if (typeof fn.signature === 'string') {
          validateUnique(fn.signature, fn);
          signaturesMap[fn.signature] = fn;
        }
        else {
          err = new TypeError('Function is no typed-function (index: ' + i + ')');
          err.data = {index: i};
          throw err;
        }
      }

      return signaturesMap;
    }

    typed = createTypedFunction('typed', {
      'string, Object': createTypedFunction,
      'Object': function (signaturesMap) {
        // find existing name
        var fns = [];
        for (var signature in signaturesMap) {
          if (signaturesMap.hasOwnProperty(signature)) {
            fns.push(signaturesMap[signature]);
          }
        }
        var name = getName(fns);
        return createTypedFunction(name, signaturesMap);
      },
      '...Function': function (fns) {
        return createTypedFunction(getName(fns), extractSignatures(fns));
      },
      'string, ...Function': function (name, fns) {
        return createTypedFunction(name, extractSignatures(fns));
      }
    });

    typed.create = create;
    typed.types = _types;
    typed.conversions = _conversions;
    typed.ignore = _ignore;
    typed.convert = convert;
    typed.find = find;

    /**
     * add a type
     * @param {{name: string, test: function}} type
     * @param {boolean} [beforeObjectTest=true]
     *                          If true, the new test will be inserted before
     *                          the test with name 'Object' (if any), since
     *                          tests for Object match Array and classes too.
     */
    typed.addType = function (type, beforeObjectTest) {
      if (!type || typeof type.name !== 'string' || typeof type.test !== 'function') {
        throw new TypeError('Object with properties {name: string, test: function} expected');
      }

      if (beforeObjectTest !== false) {
        for (var i = 0; i < typed.types.length; i++) {
          if (typed.types[i].name === 'Object') {
            typed.types.splice(i, 0, type);
            return
          }
        }
      }

      typed.types.push(type);
    };

    // add a conversion
    typed.addConversion = function (conversion) {
      if (!conversion
          || typeof conversion.from !== 'string'
          || typeof conversion.to !== 'string'
          || typeof conversion.convert !== 'function') {
        throw new TypeError('Object with properties {from: string, to: string, convert: function} expected');
      }

      typed.conversions.push(conversion);
    };

    return typed;
  }

  return create();
}));
});

var number = createCommonjsModule(function (module, exports) {


/**
 * @typedef {{sign: '+' | '-' | '', coefficients: number[], exponent: number}} SplitValue
 */

/**
 * Test whether value is a number
 * @param {*} value
 * @return {boolean} isNumber
 */


exports.isNumber = function (value) {
  return typeof value === 'number';
};
/**
 * Check if a number is integer
 * @param {number | boolean} value
 * @return {boolean} isInteger
 */


exports.isInteger = function (value) {
  if (typeof value === 'boolean') {
    return true;
  }

  return isFinite(value) ? value === Math.round(value) : false; // Note: we use ==, not ===, as we can have Booleans as well
};
/**
 * Calculate the sign of a number
 * @param {number} x
 * @returns {*}
 */


exports.sign = Math.sign || function (x) {
  if (x > 0) {
    return 1;
  } else if (x < 0) {
    return -1;
  } else {
    return 0;
  }
};
/**
 * Convert a number to a formatted string representation.
 *
 * Syntax:
 *
 *    format(value)
 *    format(value, options)
 *    format(value, precision)
 *    format(value, fn)
 *
 * Where:
 *
 *    {number} value   The value to be formatted
 *    {Object} options An object with formatting options. Available options:
 *                     {string} notation
 *                         Number notation. Choose from:
 *                         'fixed'          Always use regular number notation.
 *                                          For example '123.40' and '14000000'
 *                         'exponential'    Always use exponential notation.
 *                                          For example '1.234e+2' and '1.4e+7'
 *                         'engineering'    Always use engineering notation.
 *                                          For example '123.4e+0' and '14.0e+6'
 *                         'auto' (default) Regular number notation for numbers
 *                                          having an absolute value between
 *                                          `lowerExp` and `upperExp` bounds, and
 *                                          uses exponential notation elsewhere.
 *                                          Lower bound is included, upper bound
 *                                          is excluded.
 *                                          For example '123.4' and '1.4e7'.
 *                     {number} precision   A number between 0 and 16 to round
 *                                          the digits of the number.
 *                                          In case of notations 'exponential',
 *                                          'engineering', and 'auto',
 *                                          `precision` defines the total
 *                                          number of significant digits returned.
 *                                          In case of notation 'fixed',
 *                                          `precision` defines the number of
 *                                          significant digits after the decimal
 *                                          point.
 *                                          `precision` is undefined by default,
 *                                          not rounding any digits.
 *                     {number} lowerExp    Exponent determining the lower boundary
 *                                          for formatting a value with an exponent
 *                                          when `notation='auto`.
 *                                          Default value is `-3`.
 *                     {number} upperExp    Exponent determining the upper boundary
 *                                          for formatting a value with an exponent
 *                                          when `notation='auto`.
 *                                          Default value is `5`.
 *    {Function} fn    A custom formatting function. Can be used to override the
 *                     built-in notations. Function `fn` is called with `value` as
 *                     parameter and must return a string. Is useful for example to
 *                     format all values inside a matrix in a particular way.
 *
 * Examples:
 *
 *    format(6.4)                                        // '6.4'
 *    format(1240000)                                    // '1.24e6'
 *    format(1/3)                                        // '0.3333333333333333'
 *    format(1/3, 3)                                     // '0.333'
 *    format(21385, 2)                                   // '21000'
 *    format(12.071, {notation: 'fixed'})                // '12'
 *    format(2.3,    {notation: 'fixed', precision: 2})  // '2.30'
 *    format(52.8,   {notation: 'exponential'})          // '5.28e+1'
 *    format(12345678, {notation: 'engineering'})        // '12.345678e+6'
 *
 * @param {number} value
 * @param {Object | Function | number} [options]
 * @return {string} str The formatted value
 */


exports.format = function (value, options) {
  if (typeof options === 'function') {
    // handle format(value, fn)
    return options(value);
  } // handle special cases


  if (value === Infinity) {
    return 'Infinity';
  } else if (value === -Infinity) {
    return '-Infinity';
  } else if (isNaN(value)) {
    return 'NaN';
  } // default values for options


  var notation = 'auto';
  var precision;

  if (options) {
    // determine notation from options
    if (options.notation) {
      notation = options.notation;
    } // determine precision from options


    if (exports.isNumber(options)) {
      precision = options;
    } else if (exports.isNumber(options.precision)) {
      precision = options.precision;
    }
  } // handle the various notations


  switch (notation) {
    case 'fixed':
      return exports.toFixed(value, precision);

    case 'exponential':
      return exports.toExponential(value, precision);

    case 'engineering':
      return exports.toEngineering(value, precision);

    case 'auto':
      // TODO: clean up some day. Deprecated since: 2018-01-24
      // @deprecated upper and lower are replaced with upperExp and lowerExp since v4.0.0
      if (options && options.exponential && (options.exponential.lower !== undefined || options.exponential.upper !== undefined)) {
        var fixedOptions = object.map(options, function (x) {
          return x;
        });
        fixedOptions.exponential = undefined;

        if (options.exponential.lower !== undefined) {
          fixedOptions.lowerExp = Math.round(Math.log(options.exponential.lower) / Math.LN10);
        }

        if (options.exponential.upper !== undefined) {
          fixedOptions.upperExp = Math.round(Math.log(options.exponential.upper) / Math.LN10);
        }

        console.warn('Deprecation warning: Formatting options exponential.lower and exponential.upper ' + '(minimum and maximum value) ' + 'are replaced with exponential.lowerExp and exponential.upperExp ' + '(minimum and maximum exponent) since version 4.0.0. ' + 'Replace ' + JSON.stringify(options) + ' with ' + JSON.stringify(fixedOptions));
        return exports.toPrecision(value, precision, fixedOptions);
      }

      return exports.toPrecision(value, precision, options && options) // remove trailing zeros after the decimal point
      .replace(/((\.\d*?)(0+))($|e)/, function () {
        var digits = arguments[2];
        var e = arguments[4];
        return digits !== '.' ? digits + e : e;
      });

    default:
      throw new Error('Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", or "fixed".');
  }
};
/**
 * Split a number into sign, coefficients, and exponent
 * @param {number | string} value
 * @return {SplitValue}
 *              Returns an object containing sign, coefficients, and exponent
 */


exports.splitNumber = function (value) {
  // parse the input value
  var match = String(value).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);

  if (!match) {
    throw new SyntaxError('Invalid number ' + value);
  }

  var sign = match[1];
  var digits = match[2];
  var exponent = parseFloat(match[4] || '0');
  var dot = digits.indexOf('.');
  exponent += dot !== -1 ? dot - 1 : digits.length - 1;
  var coefficients = digits.replace('.', '') // remove the dot (must be removed before removing leading zeros)
  .replace(/^0*/, function (zeros) {
    // remove leading zeros, add their count to the exponent
    exponent -= zeros.length;
    return '';
  }).replace(/0*$/, '') // remove trailing zeros
  .split('').map(function (d) {
    return parseInt(d);
  });

  if (coefficients.length === 0) {
    coefficients.push(0);
    exponent++;
  }

  return {
    sign: sign,
    coefficients: coefficients,
    exponent: exponent
  };
};
/**
 * Format a number in engineering notation. Like '1.23e+6', '2.3e+0', '3.500e-3'
 * @param {number | string} value
 * @param {number} [precision]        Optional number of significant figures to return.
 */


exports.toEngineering = function (value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }

  var rounded = exports.roundDigits(exports.splitNumber(value), precision);
  var e = rounded.exponent;
  var c = rounded.coefficients; // find nearest lower multiple of 3 for exponent

  var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3;

  if (exports.isNumber(precision)) {
    // add zeroes to give correct sig figs
    while (precision > c.length || e - newExp + 1 > c.length) {
      c.push(0);
    }
  } else {
    // concatenate coefficients with necessary zeros
    var significandsDiff = e >= 0 ? e : Math.abs(newExp); // add zeros if necessary (for ex: 1e+8)

    while (c.length - 1 < significandsDiff) {
      c.push(0);
    }
  } // find difference in exponents


  var expDiff = Math.abs(e - newExp);
  var decimalIdx = 1; // push decimal index over by expDiff times

  while (expDiff > 0) {
    decimalIdx++;
    expDiff--;
  } // if all coefficient values are zero after the decimal point and precision is unset, don't add a decimal value.
  // otherwise concat with the rest of the coefficients


  var decimals = c.slice(decimalIdx).join('');
  var decimalVal = exports.isNumber(precision) && decimals.length || decimals.match(/[1-9]/) ? '.' + decimals : '';
  var str = c.slice(0, decimalIdx).join('') + decimalVal + 'e' + (e >= 0 ? '+' : '') + newExp.toString();
  return rounded.sign + str;
};
/**
 * Format a number with fixed notation.
 * @param {number | string} value
 * @param {number} [precision=undefined]  Optional number of decimals after the
 *                                        decimal point. null by default.
 */


exports.toFixed = function (value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }

  var splitValue = exports.splitNumber(value);
  var rounded = typeof precision === 'number' ? exports.roundDigits(splitValue, splitValue.exponent + 1 + precision) : splitValue;
  var c = rounded.coefficients;
  var p = rounded.exponent + 1; // exponent may have changed
  // append zeros if needed

  var pp = p + (precision || 0);

  if (c.length < pp) {
    c = c.concat(zeros(pp - c.length));
  } // prepend zeros if needed


  if (p < 0) {
    c = zeros(-p + 1).concat(c);
    p = 1;
  } // insert a dot if needed


  if (p < c.length) {
    c.splice(p, 0, p === 0 ? '0.' : '.');
  }

  return rounded.sign + c.join('');
};
/**
 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
 * @param {number | string} value
 * @param {number} [precision]  Number of digits in formatted output.
 *                              If not provided, the maximum available digits
 *                              is used.
 */


exports.toExponential = function (value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  } // round if needed, else create a clone


  var split = exports.splitNumber(value);
  var rounded = precision ? exports.roundDigits(split, precision) : split;
  var c = rounded.coefficients;
  var e = rounded.exponent; // append zeros if needed

  if (c.length < precision) {
    c = c.concat(zeros(precision - c.length));
  } // format as `C.CCCe+EEE` or `C.CCCe-EEE`


  var first = c.shift();
  return rounded.sign + first + (c.length > 0 ? '.' + c.join('') : '') + 'e' + (e >= 0 ? '+' : '') + e;
};
/**
 * Format a number with a certain precision
 * @param {number | string} value
 * @param {number} [precision=undefined] Optional number of digits.
 * @param {{lowerExp: number | undefined, upperExp: number | undefined}} [options]
 *                                       By default:
 *                                         lowerExp = -3 (incl)
 *                                         upper = +5 (excl)
 * @return {string}
 */


exports.toPrecision = function (value, precision, options) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  } // determine lower and upper bound for exponential notation.


  var lowerExp = options && options.lowerExp !== undefined ? options.lowerExp : -3;
  var upperExp = options && options.upperExp !== undefined ? options.upperExp : 5;
  var split = exports.splitNumber(value);

  if (split.exponent < lowerExp || split.exponent >= upperExp) {
    // exponential notation
    return exports.toExponential(value, precision);
  } else {
    var rounded = precision ? exports.roundDigits(split, precision) : split;
    var c = rounded.coefficients;
    var e = rounded.exponent; // append trailing zeros

    if (c.length < precision) {
      c = c.concat(zeros(precision - c.length));
    } // append trailing zeros
    // TODO: simplify the next statement


    c = c.concat(zeros(e - c.length + 1 + (c.length < precision ? precision - c.length : 0))); // prepend zeros

    c = zeros(-e).concat(c);
    var dot = e > 0 ? e : 0;

    if (dot < c.length - 1) {
      c.splice(dot + 1, 0, '.');
    }

    return rounded.sign + c.join('');
  }
};
/**
 * Round the number of digits of a number *
 * @param {SplitValue} split       A value split with .splitNumber(value)
 * @param {number} precision  A positive integer
 * @return {SplitValue}
 *              Returns an object containing sign, coefficients, and exponent
 *              with rounded digits
 */


exports.roundDigits = function (split, precision) {
  // create a clone
  var rounded = {
    sign: split.sign,
    coefficients: split.coefficients,
    exponent: split.exponent
  };
  var c = rounded.coefficients; // prepend zeros if needed

  while (precision <= 0) {
    c.unshift(0);
    rounded.exponent++;
    precision++;
  }

  if (c.length > precision) {
    var removed = c.splice(precision, c.length - precision);

    if (removed[0] >= 5) {
      var i = precision - 1;
      c[i]++;

      while (c[i] === 10) {
        c.pop();

        if (i === 0) {
          c.unshift(0);
          rounded.exponent++;
          i++;
        }

        i--;
        c[i]++;
      }
    }
  }

  return rounded;
};
/**
 * Create an array filled with zeros.
 * @param {number} length
 * @return {Array}
 */


function zeros(length) {
  var arr = [];

  for (var i = 0; i < length; i++) {
    arr.push(0);
  }

  return arr;
}
/**
 * Count the number of significant digits of a number.
 *
 * For example:
 *   2.34 returns 3
 *   0.0034 returns 2
 *   120.5e+30 returns 4
 *
 * @param {number} value
 * @return {number} digits   Number of significant digits
 */


exports.digits = function (value) {
  return value.toExponential().replace(/e.*$/, '') // remove exponential notation
  .replace(/^0\.?0*|\./, '') // remove decimal point and leading zeros
  .length;
};
/**
 * Minimum number added to one that makes the result different than one
 */


exports.DBL_EPSILON = Number.EPSILON || 2.2204460492503130808472633361816E-16;
/**
 * Compares two floating point numbers.
 * @param {number} x          First value to compare
 * @param {number} y          Second value to compare
 * @param {number} [epsilon]  The maximum relative difference between x and y
 *                            If epsilon is undefined or null, the function will
 *                            test whether x and y are exactly equal.
 * @return {boolean} whether the two numbers are nearly equal
*/

exports.nearlyEqual = function (x, y, epsilon) {
  // if epsilon is null or undefined, test whether x and y are exactly equal
  if (epsilon === null || epsilon === undefined) {
    return x === y;
  }

  if (x === y) {
    return true;
  } // NaN


  if (isNaN(x) || isNaN(y)) {
    return false;
  } // at this point x and y should be finite


  if (isFinite(x) && isFinite(y)) {
    // check numbers are very close, needed when comparing numbers near zero
    var diff = Math.abs(x - y);

    if (diff < exports.DBL_EPSILON) {
      return true;
    } else {
      // use relative error
      return diff <= Math.max(Math.abs(x), Math.abs(y)) * epsilon;
    }
  } // Infinite and Number or negative Infinite and positive Infinite cases


  return false;
};
});
var number_1 = number.isNumber;
var number_2 = number.isInteger;
var number_3 = number.sign;
var number_4 = number.format;
var number_5 = number.splitNumber;
var number_6 = number.toEngineering;
var number_7 = number.toFixed;
var number_8 = number.toExponential;
var number_9 = number.toPrecision;
var number_10 = number.roundDigits;
var number_11 = number.digits;
var number_12 = number.DBL_EPSILON;
var number_13 = number.nearlyEqual;

/**
 * Test whether a value is a Matrix
 * @param {*} x
 * @returns {boolean} returns true with input is a Matrix
 *                    (like a DenseMatrix or SparseMatrix)
 */

var isMatrix = function isMatrix(x) {
  return x && x.constructor.prototype.isMatrix || false;
};

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var digits = number.digits;



 // returns a new instance of typed-function


var _createTyped = function createTyped() {
  // initially, return the original instance of typed-function
  // consecutively, return a new instance from typed.create.
  _createTyped = typedFunction.create;
  return typedFunction;
};
/**
 * Factory function for creating a new typed instance
 * @param {Object} type   Object with data types like Complex and BigNumber
 * @returns {Function}
 */


var create = function create(type) {
  // TODO: typed-function must be able to silently ignore signatures with unknown data types
  // type checks for all known types
  //
  // note that:
  //
  // - check by duck-typing on a property like `isUnit`, instead of checking instanceof.
  //   instanceof cannot be used because that would not allow to pass data from
  //   one instance of math.js to another since each has it's own instance of Unit.
  // - check the `isUnit` property via the constructor, so there will be no
  //   matches for "fake" instances like plain objects with a property `isUnit`.
  //   That is important for security reasons.
  // - It must not be possible to override the type checks used internally,
  //   for security reasons, so these functions are not exposed in the expression
  //   parser.
  type.isNumber = function (x) {
    return typeof x === 'number';
  };

  type.isComplex = function (x) {
    return type.Complex && x instanceof type.Complex || false;
  };

  type.isBigNumber = isBigNumber;

  type.isFraction = function (x) {
    return type.Fraction && x instanceof type.Fraction || false;
  };

  type.isUnit = function (x) {
    return x && x.constructor.prototype.isUnit || false;
  };

  type.isString = function (x) {
    return typeof x === 'string';
  };

  type.isArray = Array.isArray;
  type.isMatrix = isMatrix;

  type.isDenseMatrix = function (x) {
    return x && x.isDenseMatrix && x.constructor.prototype.isMatrix || false;
  };

  type.isSparseMatrix = function (x) {
    return x && x.isSparseMatrix && x.constructor.prototype.isMatrix || false;
  };

  type.isRange = function (x) {
    return x && x.constructor.prototype.isRange || false;
  };

  type.isIndex = function (x) {
    return x && x.constructor.prototype.isIndex || false;
  };

  type.isBoolean = function (x) {
    return typeof x === 'boolean';
  };

  type.isResultSet = function (x) {
    return x && x.constructor.prototype.isResultSet || false;
  };

  type.isHelp = function (x) {
    return x && x.constructor.prototype.isHelp || false;
  };

  type.isFunction = function (x) {
    return typeof x === 'function';
  };

  type.isDate = function (x) {
    return x instanceof Date;
  };

  type.isRegExp = function (x) {
    return x instanceof RegExp;
  };

  type.isObject = function (x) {
    return _typeof(x) === 'object' && x.constructor === Object && !type.isComplex(x) && !type.isFraction(x);
  };

  type.isNull = function (x) {
    return x === null;
  };

  type.isUndefined = function (x) {
    return x === undefined;
  };

  type.isAccessorNode = function (x) {
    return x && x.isAccessorNode && x.constructor.prototype.isNode || false;
  };

  type.isArrayNode = function (x) {
    return x && x.isArrayNode && x.constructor.prototype.isNode || false;
  };

  type.isAssignmentNode = function (x) {
    return x && x.isAssignmentNode && x.constructor.prototype.isNode || false;
  };

  type.isBlockNode = function (x) {
    return x && x.isBlockNode && x.constructor.prototype.isNode || false;
  };

  type.isConditionalNode = function (x) {
    return x && x.isConditionalNode && x.constructor.prototype.isNode || false;
  };

  type.isConstantNode = function (x) {
    return x && x.isConstantNode && x.constructor.prototype.isNode || false;
  };

  type.isFunctionAssignmentNode = function (x) {
    return x && x.isFunctionAssignmentNode && x.constructor.prototype.isNode || false;
  };

  type.isFunctionNode = function (x) {
    return x && x.isFunctionNode && x.constructor.prototype.isNode || false;
  };

  type.isIndexNode = function (x) {
    return x && x.isIndexNode && x.constructor.prototype.isNode || false;
  };

  type.isNode = function (x) {
    return x && x.isNode && x.constructor.prototype.isNode || false;
  };

  type.isObjectNode = function (x) {
    return x && x.isObjectNode && x.constructor.prototype.isNode || false;
  };

  type.isOperatorNode = function (x) {
    return x && x.isOperatorNode && x.constructor.prototype.isNode || false;
  };

  type.isParenthesisNode = function (x) {
    return x && x.isParenthesisNode && x.constructor.prototype.isNode || false;
  };

  type.isRangeNode = function (x) {
    return x && x.isRangeNode && x.constructor.prototype.isNode || false;
  };

  type.isSymbolNode = function (x) {
    return x && x.isSymbolNode && x.constructor.prototype.isNode || false;
  };

  type.isChain = function (x) {
    return x && x.constructor.prototype.isChain || false;
  }; // get a new instance of typed-function


  var typed = _createTyped(); // define all types. The order of the types determines in which order function
  // arguments are type-checked (so for performance it's important to put the
  // most used types first).


  typed.types = [{
    name: 'number',
    test: type.isNumber
  }, {
    name: 'Complex',
    test: type.isComplex
  }, {
    name: 'BigNumber',
    test: type.isBigNumber
  }, {
    name: 'Fraction',
    test: type.isFraction
  }, {
    name: 'Unit',
    test: type.isUnit
  }, {
    name: 'string',
    test: type.isString
  }, {
    name: 'Array',
    test: type.isArray
  }, {
    name: 'Matrix',
    test: type.isMatrix
  }, {
    name: 'DenseMatrix',
    test: type.isDenseMatrix
  }, {
    name: 'SparseMatrix',
    test: type.isSparseMatrix
  }, {
    name: 'Range',
    test: type.isRange
  }, {
    name: 'Index',
    test: type.isIndex
  }, {
    name: 'boolean',
    test: type.isBoolean
  }, {
    name: 'ResultSet',
    test: type.isResultSet
  }, {
    name: 'Help',
    test: type.isHelp
  }, {
    name: 'function',
    test: type.isFunction
  }, {
    name: 'Date',
    test: type.isDate
  }, {
    name: 'RegExp',
    test: type.isRegExp
  }, {
    name: 'null',
    test: type.isNull
  }, {
    name: 'undefined',
    test: type.isUndefined
  }, {
    name: 'OperatorNode',
    test: type.isOperatorNode
  }, {
    name: 'ConstantNode',
    test: type.isConstantNode
  }, {
    name: 'SymbolNode',
    test: type.isSymbolNode
  }, {
    name: 'ParenthesisNode',
    test: type.isParenthesisNode
  }, {
    name: 'FunctionNode',
    test: type.isFunctionNode
  }, {
    name: 'FunctionAssignmentNode',
    test: type.isFunctionAssignmentNode
  }, {
    name: 'ArrayNode',
    test: type.isArrayNode
  }, {
    name: 'AssignmentNode',
    test: type.isAssignmentNode
  }, {
    name: 'BlockNode',
    test: type.isBlockNode
  }, {
    name: 'ConditionalNode',
    test: type.isConditionalNode
  }, {
    name: 'IndexNode',
    test: type.isIndexNode
  }, {
    name: 'RangeNode',
    test: type.isRangeNode
  }, {
    name: 'Node',
    test: type.isNode
  }, {
    name: 'Object',
    test: type.isObject // order 'Object' last, it matches on other classes too

  }]; // TODO: add conversion from BigNumber to number?

  typed.conversions = [{
    from: 'number',
    to: 'BigNumber',
    convert: function convert(x) {
      // note: conversion from number to BigNumber can fail if x has >15 digits
      if (digits(x) > 15) {
        throw new TypeError('Cannot implicitly convert a number with >15 significant digits to BigNumber ' + '(value: ' + x + '). ' + 'Use function bignumber(x) to convert to BigNumber.');
      }

      return new type.BigNumber(x);
    }
  }, {
    from: 'number',
    to: 'Complex',
    convert: function convert(x) {
      return new type.Complex(x, 0);
    }
  }, {
    from: 'number',
    to: 'string',
    convert: function convert(x) {
      return x + '';
    }
  }, {
    from: 'BigNumber',
    to: 'Complex',
    convert: function convert(x) {
      return new type.Complex(x.toNumber(), 0);
    }
  }, {
    from: 'Fraction',
    to: 'BigNumber',
    convert: function convert(x) {
      throw new TypeError('Cannot implicitly convert a Fraction to BigNumber or vice versa. ' + 'Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.');
    }
  }, {
    from: 'Fraction',
    to: 'Complex',
    convert: function convert(x) {
      return new type.Complex(x.valueOf(), 0);
    }
  }, {
    from: 'number',
    to: 'Fraction',
    convert: function convert(x) {
      var f = new type.Fraction(x);

      if (f.valueOf() !== x) {
        throw new TypeError('Cannot implicitly convert a number to a Fraction when there will be a loss of precision ' + '(value: ' + x + '). ' + 'Use function fraction(x) to convert to Fraction.');
      }

      return new type.Fraction(x);
    }
  }, {
    // FIXME: add conversion from Fraction to number, for example for `sqrt(fraction(1,3))`
    //  from: 'Fraction',
    //  to: 'number',
    //  convert: function (x) {
    //    return x.valueOf()
    //  }
    // }, {
    from: 'string',
    to: 'number',
    convert: function convert(x) {
      var n = Number(x);

      if (isNaN(n)) {
        throw new Error('Cannot convert "' + x + '" to a number');
      }

      return n;
    }
  }, {
    from: 'string',
    to: 'BigNumber',
    convert: function convert(x) {
      try {
        return new type.BigNumber(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to BigNumber');
      }
    }
  }, {
    from: 'string',
    to: 'Fraction',
    convert: function convert(x) {
      try {
        return new type.Fraction(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to Fraction');
      }
    }
  }, {
    from: 'string',
    to: 'Complex',
    convert: function convert(x) {
      try {
        return new type.Complex(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to Complex');
      }
    }
  }, {
    from: 'boolean',
    to: 'number',
    convert: function convert(x) {
      return +x;
    }
  }, {
    from: 'boolean',
    to: 'BigNumber',
    convert: function convert(x) {
      return new type.BigNumber(+x);
    }
  }, {
    from: 'boolean',
    to: 'Fraction',
    convert: function convert(x) {
      return new type.Fraction(+x);
    }
  }, {
    from: 'boolean',
    to: 'string',
    convert: function convert(x) {
      return +x;
    }
  }, {
    from: 'Array',
    to: 'Matrix',
    convert: function convert(array) {
      return new type.DenseMatrix(array);
    }
  }, {
    from: 'Matrix',
    to: 'Array',
    convert: function convert(matrix) {
      return matrix.valueOf();
    }
  }];
  return typed;
};

var typed = {
	create: create
};

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

var tinyEmitter = E;
var TinyEmitter = E;
tinyEmitter.TinyEmitter = TinyEmitter;

/**
 * Extend given object with emitter functions `on`, `off`, `once`, `emit`
 * @param {Object} obj
 * @return {Object} obj
 */


var mixin = function (obj) {
  // create event emitter
  var emitter = new tinyEmitter(); // bind methods to obj (we don't want to expose the emitter.e Array...)

  obj.on = emitter.on.bind(emitter);
  obj.off = emitter.off.bind(emitter);
  obj.once = emitter.once.bind(emitter);
  obj.emit = emitter.emit.bind(emitter);
  return obj;
};

var emitter = {
	mixin: mixin
};

/**
 * Create a syntax error with the message:
 *     'Wrong number of arguments in function <fn> (<count> provided, <min>-<max> expected)'
 * @param {string} fn     Function name
 * @param {number} count  Actual argument count
 * @param {number} min    Minimum required argument count
 * @param {number} [max]  Maximum required argument count
 * @extends Error
 */

function ArgumentsError(fn, count, min, max) {
  if (!(this instanceof ArgumentsError)) {
    throw new SyntaxError('Constructor must be called with the new operator');
  }

  this.fn = fn;
  this.count = count;
  this.min = min;
  this.max = max;
  this.message = 'Wrong number of arguments in function ' + fn + ' (' + count + ' provided, ' + min + (max !== undefined && max !== null ? '-' + max : '') + ' expected)';
  this.stack = new Error().stack;
}

ArgumentsError.prototype = new Error();
ArgumentsError.prototype.constructor = Error;
ArgumentsError.prototype.name = 'ArgumentsError';
ArgumentsError.prototype.isArgumentsError = true;
var ArgumentsError_1 = ArgumentsError;

function _typeof$1(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }

var lazy = object.lazy;

var isFactory = object.isFactory;

var traverse = object.traverse;



function factory(type, config, load, typed, math) {
  /**
   * Import functions from an object or a module
   *
   * Syntax:
   *
   *    math.import(object)
   *    math.import(object, options)
   *
   * Where:
   *
   * - `object: Object`
   *   An object with functions to be imported.
   * - `options: Object` An object with import options. Available options:
   *   - `override: boolean`
   *     If true, existing functions will be overwritten. False by default.
   *   - `silent: boolean`
   *     If true, the function will not throw errors on duplicates or invalid
   *     types. False by default.
   *   - `wrap: boolean`
   *     If true, the functions will be wrapped in a wrapper function
   *     which converts data types like Matrix to primitive data types like Array.
   *     The wrapper is needed when extending math.js with libraries which do not
   *     support these data type. False by default.
   *
   * Examples:
   *
   *    // define new functions and variables
   *    math.import({
   *      myvalue: 42,
   *      hello: function (name) {
   *        return 'hello, ' + name + '!'
   *      }
   *    })
   *
   *    // use the imported function and variable
   *    math.myvalue * 2               // 84
   *    math.hello('user')             // 'hello, user!'
   *
   *    // import the npm module 'numbers'
   *    // (must be installed first with `npm install numbers`)
   *    math.import(require('numbers'), {wrap: true})
   *
   *    math.fibonacci(7) // returns 13
   *
   * @param {Object | Array} object   Object with functions to be imported.
   * @param {Object} [options]        Import options.
   */
  function mathImport(object, options) {
    var num = arguments.length;

    if (num !== 1 && num !== 2) {
      throw new ArgumentsError_1('import', num, 1, 2);
    }

    if (!options) {
      options = {};
    } // TODO: allow a typed-function with name too


    if (isFactory(object)) {
      _importFactory(object, options);
    } else if (Array.isArray(object)) {
      object.forEach(function (entry) {
        mathImport(entry, options);
      });
    } else if (_typeof$1(object) === 'object') {
      // a map with functions
      for (var name in object) {
        if (object.hasOwnProperty(name)) {
          var value = object[name];

          if (isSupportedType(value)) {
            _import(name, value, options);
          } else if (isFactory(object)) {
            _importFactory(object, options);
          } else {
            mathImport(value, options);
          }
        }
      }
    } else {
      if (!options.silent) {
        throw new TypeError('Factory, Object, or Array expected');
      }
    }
  }
  /**
   * Add a property to the math namespace and create a chain proxy for it.
   * @param {string} name
   * @param {*} value
   * @param {Object} options  See import for a description of the options
   * @private
   */


  function _import(name, value, options) {
    // TODO: refactor this function, it's to complicated and contains duplicate code
    if (options.wrap && typeof value === 'function') {
      // create a wrapper around the function
      value = _wrap(value);
    }

    if (isTypedFunction(math[name]) && isTypedFunction(value)) {
      if (options.override) {
        // give the typed function the right name
        value = typed(name, value.signatures);
      } else {
        // merge the existing and typed function
        value = typed(math[name], value);
      }

      math[name] = value;

      _importTransform(name, value);

      math.emit('import', name, function resolver() {
        return value;
      });
      return;
    }

    if (math[name] === undefined || options.override) {
      math[name] = value;

      _importTransform(name, value);

      math.emit('import', name, function resolver() {
        return value;
      });
      return;
    }

    if (!options.silent) {
      throw new Error('Cannot import "' + name + '": already exists');
    }
  }

  function _importTransform(name, value) {
    if (value && typeof value.transform === 'function') {
      math.expression.transform[name] = value.transform;

      if (allowedInExpressions(name)) {
        math.expression.mathWithTransform[name] = value.transform;
      }
    } else {
      // remove existing transform
      delete math.expression.transform[name];

      if (allowedInExpressions(name)) {
        math.expression.mathWithTransform[name] = value;
      }
    }
  }

  function _deleteTransform(name) {
    delete math.expression.transform[name];

    if (allowedInExpressions(name)) {
      math.expression.mathWithTransform[name] = math[name];
    } else {
      delete math.expression.mathWithTransform[name];
    }
  }
  /**
   * Create a wrapper a round an function which converts the arguments
   * to their primitive values (like convert a Matrix to Array)
   * @param {Function} fn
   * @return {Function} Returns the wrapped function
   * @private
   */


  function _wrap(fn) {
    var wrapper = function wrapper() {
      var args = [];

      for (var i = 0, len = arguments.length; i < len; i++) {
        var arg = arguments[i];
        args[i] = arg && arg.valueOf();
      }

      return fn.apply(math, args);
    };

    if (fn.transform) {
      wrapper.transform = fn.transform;
    }

    return wrapper;
  }
  /**
   * Import an instance of a factory into math.js
   * @param {{factory: Function, name: string, path: string, math: boolean}} factory
   * @param {Object} options  See import for a description of the options
   * @private
   */


  function _importFactory(factory, options) {
    if (typeof factory.name === 'string') {
      var name = factory.name;
      var existingTransform = name in math.expression.transform;
      var namespace = factory.path ? traverse(math, factory.path) : math;
      var existing = namespace.hasOwnProperty(name) ? namespace[name] : undefined;

      var resolver = function resolver() {
        var instance = load(factory);

        if (instance && typeof instance.transform === 'function') {
          throw new Error('Transforms cannot be attached to factory functions. ' + 'Please create a separate function for it with exports.path="expression.transform"');
        }

        if (isTypedFunction(existing) && isTypedFunction(instance)) {
          if (options.override) ; else {
            // merge the existing and new typed function
            instance = typed(existing, instance);
          }

          return instance;
        }

        if (existing === undefined || options.override) {
          return instance;
        }

        if (!options.silent) {
          throw new Error('Cannot import "' + name + '": already exists');
        }
      };

      if (factory.lazy !== false) {
        lazy(namespace, name, resolver);

        if (existingTransform) {
          _deleteTransform(name);
        } else {
          if (factory.path === 'expression.transform' || factoryAllowedInExpressions(factory)) {
            lazy(math.expression.mathWithTransform, name, resolver);
          }
        }
      } else {
        namespace[name] = resolver();

        if (existingTransform) {
          _deleteTransform(name);
        } else {
          if (factory.path === 'expression.transform' || factoryAllowedInExpressions(factory)) {
            math.expression.mathWithTransform[name] = resolver();
          }
        }
      }

      math.emit('import', name, resolver, factory.path);
    } else {
      // unnamed factory.
      // no lazy loading
      load(factory);
    }
  }
  /**
   * Check whether given object is a type which can be imported
   * @param {Function | number | string | boolean | null | Unit | Complex} object
   * @return {boolean}
   * @private
   */


  function isSupportedType(object) {
    return typeof object === 'function' || typeof object === 'number' || typeof object === 'string' || typeof object === 'boolean' || object === null || object && type.isUnit(object) || object && type.isComplex(object) || object && type.isBigNumber(object) || object && type.isFraction(object) || object && type.isMatrix(object) || object && Array.isArray(object);
  }
  /**
   * Test whether a given thing is a typed-function
   * @param {*} fn
   * @return {boolean} Returns true when `fn` is a typed-function
   */


  function isTypedFunction(fn) {
    return typeof fn === 'function' && _typeof$1(fn.signatures) === 'object';
  }

  function allowedInExpressions(name) {
    return !unsafe.hasOwnProperty(name);
  }

  function factoryAllowedInExpressions(factory) {
    return factory.path === undefined && !unsafe.hasOwnProperty(factory.name);
  } // namespaces and functions not available in the parser for safety reasons


  var unsafe = {
    'expression': true,
    'type': true,
    'docs': true,
    'error': true,
    'json': true,
    'chain': true // chain method not supported. Note that there is a unit chain too.

  };
  return mathImport;
}

var math = true; // request access to the math namespace as 5th argument of the factory function

var name = 'import';
var factory_1 = factory;
var lazy_1 = true;

var _import = {
	math: math,
	name: name,
	factory: factory_1,
	lazy: lazy_1
};

function factory$1(type, config, load, typed, math) {
  var MATRIX = ['Matrix', 'Array']; // valid values for option matrix

  var NUMBER = ['number', 'BigNumber', 'Fraction']; // valid values for option number

  /**
   * Set configuration options for math.js, and get current options.
   * Will emit a 'config' event, with arguments (curr, prev, changes).
   *
   * Syntax:
   *
   *     math.config(config: Object): Object
   *
   * Examples:
   *
   *     math.config().number                // outputs 'number'
   *     math.eval('0.4')                    // outputs number 0.4
   *     math.config({number: 'Fraction'})
   *     math.eval('0.4')                    // outputs Fraction 2/5
   *
   * @param {Object} [options] Available options:
   *                            {number} epsilon
   *                              Minimum relative difference between two
   *                              compared values, used by all comparison functions.
   *                            {string} matrix
   *                              A string 'Matrix' (default) or 'Array'.
   *                            {string} number
   *                              A string 'number' (default), 'BigNumber', or 'Fraction'
   *                            {number} precision
   *                              The number of significant digits for BigNumbers.
   *                              Not applicable for Numbers.
   *                            {string} parenthesis
   *                              How to display parentheses in LaTeX and string
   *                              output.
   *                            {string} randomSeed
   *                              Random seed for seeded pseudo random number generator.
   *                              Set to null to randomly seed.
   * @return {Object} Returns the current configuration
   */

  function _config(options) {
    if (options) {
      var prev = object.map(config, object.clone); // validate some of the options

      validateOption(options, 'matrix', MATRIX);
      validateOption(options, 'number', NUMBER); // merge options

      object.deepExtend(config, options);
      var curr = object.map(config, object.clone);
      var changes = object.map(options, object.clone); // emit 'config' event

      math.emit('config', curr, prev, changes);
      return curr;
    } else {
      return object.map(config, object.clone);
    }
  } // attach the valid options to the function so they can be extended


  _config.MATRIX = MATRIX;
  _config.NUMBER = NUMBER;
  return _config;
}
/**
 * Test whether an Array contains a specific item.
 * @param {Array.<string>} array
 * @param {string} item
 * @return {boolean}
 */


function contains(array, item) {
  return array.indexOf(item) !== -1;
}
/**
 * Find a string in an array. Case insensitive search
 * @param {Array.<string>} array
 * @param {string} item
 * @return {number} Returns the index when found. Returns -1 when not found
 */


function findIndex(array, item) {
  return array.map(function (i) {
    return i.toLowerCase();
  }).indexOf(item.toLowerCase());
}
/**
 * Validate an option
 * @param {Object} options         Object with options
 * @param {string} name            Name of the option to validate
 * @param {Array.<string>} values  Array with valid values for this option
 */


function validateOption(options, name, values) {
  if (options[name] !== undefined && !contains(values, options[name])) {
    var index = findIndex(values, options[name]);

    if (index !== -1) {
      // right value, wrong casing
      // TODO: lower case values are deprecated since v3, remove this warning some day.
      console.warn('Warning: Wrong casing for configuration option "' + name + '", should be "' + values[index] + '" instead of "' + options[name] + '".');
      options[name] = values[index]; // change the option to the right casing
    } else {
      // unknown value
      console.warn('Warning: Unknown value "' + options[name] + '" for configuration option "' + name + '". Available options: ' + values.map(JSON.stringify).join(', ') + '.');
    }
  }
}

var name$1 = 'config';
var math$1 = true; // request the math namespace as fifth argument

var factory_1$1 = factory$1;

var config = {
	name: name$1,
	math: math$1,
	factory: factory_1$1
};

var isFactory$1 = object.isFactory;








/**
 * Math.js core. Creates a new, empty math.js instance
 * @param {Object} [options] Available options:
 *                            {number} epsilon
 *                              Minimum relative difference between two
 *                              compared values, used by all comparison functions.
 *                            {string} matrix
 *                              A string 'Matrix' (default) or 'Array'.
 *                            {string} number
 *                              A string 'number' (default), 'BigNumber', or 'Fraction'
 *                            {number} precision
 *                              The number of significant digits for BigNumbers.
 *                              Not applicable for Numbers.
 *                            {boolean} predictable
 *                              Predictable output type of functions. When true,
 *                              output type depends only on the input types. When
 *                              false (default), output type can vary depending
 *                              on input values. For example `math.sqrt(-4)`
 *                              returns `complex('2i')` when predictable is false, and
 *                              returns `NaN` when true.
 *                            {string} randomSeed
 *                              Random seed for seeded pseudo random number generator.
 *                              Set to null to randomly seed.
 * @returns {Object} Returns a bare-bone math.js instance containing
 *                   functions:
 *                   - `import` to add new functions
 *                   - `config` to change configuration
 *                   - `on`, `off`, `once`, `emit` for events
 */


var create$1 = function create(options) {
  // simple test for ES5 support
  if (typeof Object.create !== 'function') {
    throw new Error('ES5 not supported by this JavaScript engine. ' + 'Please load the es5-shim and es5-sham library for compatibility.');
  } // cached factories and instances


  var factories = [];
  var instances = []; // create a namespace for the mathjs instance, and attach emitter functions

  var math = emitter.mixin({});
  math.type = {};
  math.expression = {
    transform: {},
    mathWithTransform: {} // create a new typed instance

  };
  math.typed = typed.create(math.type); // create configuration options. These are private

  var _config = {
    // minimum relative difference between two compared values,
    // used by all comparison functions
    epsilon: 1e-12,
    // type of default matrix output. Choose 'matrix' (default) or 'array'
    matrix: 'Matrix',
    // type of default number output. Choose 'number' (default) 'BigNumber', or 'Fraction
    number: 'number',
    // number of significant digits in BigNumbers
    precision: 64,
    // predictable output type of functions. When true, output type depends only
    // on the input types. When false (default), output type can vary depending
    // on input values. For example `math.sqrt(-4)` returns `complex('2i')` when
    // predictable is false, and returns `NaN` when true.
    predictable: false,
    // random seed for seeded pseudo random number generation
    // null = randomly seed
    randomSeed: null
    /**
     * Load a function or data type from a factory.
     * If the function or data type already exists, the existing instance is
     * returned.
     * @param {{type: string, name: string, factory: Function}} factory
     * @returns {*}
     */

  };

  function load(factory) {
    if (!isFactory$1(factory)) {
      throw new Error('Factory object with properties `type`, `name`, and `factory` expected');
    }

    var index = factories.indexOf(factory);
    var instance;

    if (index === -1) {
      // doesn't yet exist
      if (factory.math === true) {
        // pass with math namespace
        instance = factory.factory(math.type, _config, load, math.typed, math);
      } else {
        instance = factory.factory(math.type, _config, load, math.typed);
      } // append to the cache


      factories.push(factory);
      instances.push(instance);
    } else {
      // already existing function, return the cached instance
      instance = instances[index];
    }

    return instance;
  } // load the import and config functions


  math['import'] = load(_import);
  math['config'] = load(config);
  math.expression.mathWithTransform['config'] = math['config']; // apply options

  if (options) {
    math.config(options);
  }

  return math;
};

var core = {
	create: create$1
};

var core$1 = core;

/**
 * Execute the callback function element wise for each element in array and any
 * nested array
 * Returns an array with the results
 * @param {Array | Matrix} array
 * @param {Function} callback   The callback is called with two parameters:
 *                              value1 and value2, which contain the current
 *                              element of both arrays.
 * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
 *
 * @return {Array | Matrix} res
 */

var deepMap = function deepMap(array, callback, skipZeros) {
  if (array && typeof array.map === 'function') {
    // TODO: replace array.map with a for loop to improve performance
    return array.map(function (x) {
      return deepMap(x, callback);
    });
  } else {
    return callback(array);
  }
};

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function factory$2(type, config, load, typed) {
  /**
   * Determine the type of a variable.
   *
   * Function `typeof` recognizes the following types of objects:
   *
   * Object                 | Returns       | Example
   * ---------------------- | ------------- | ------------------------------------------
   * null                   | `'null'`      | `math.typeof(null)`
   * number                 | `'number'`    | `math.typeof(3.5)`
   * boolean                | `'boolean'`   | `math.typeof(true)`
   * string                 | `'string'`    | `math.typeof('hello world')`
   * Array                  | `'Array'`     | `math.typeof([1, 2, 3])`
   * Date                   | `'Date'`      | `math.typeof(new Date())`
   * Function               | `'Function'`  | `math.typeof(function () {})`
   * Object                 | `'Object'`    | `math.typeof({a: 2, b: 3})`
   * RegExp                 | `'RegExp'`    | `math.typeof(/a regexp/)`
   * undefined              | `'undefined'` | `math.typeof(undefined)`
   * math.type.BigNumber    | `'BigNumber'` | `math.typeof(math.bignumber('2.3e500'))`
   * math.type.Chain        | `'Chain'`     | `math.typeof(math.chain(2))`
   * math.type.Complex      | `'Complex'`   | `math.typeof(math.complex(2, 3))`
   * math.type.Fraction     | `'Fraction'`  | `math.typeof(math.fraction(1, 3))`
   * math.type.Help         | `'Help'`      | `math.typeof(math.help('sqrt'))`
   * math.type.Help         | `'Help'`      | `math.typeof(math.help('sqrt'))`
   * math.type.Index        | `'Index'`     | `math.typeof(math.index(1, 3))`
   * math.type.Matrix       | `'Matrix'`    | `math.typeof(math.matrix([[1,2], [3, 4]]))`
   * math.type.Range        | `'Range'`     | `math.typeof(math.range(0, 10))`
   * math.type.ResultSet    | `'ResultSet'` | `math.typeof(math.eval('a=2\nb=3'))`
   * math.type.Unit         | `'Unit'`      | `math.typeof(math.unit('45 deg'))`
   * math.expression.node&#8203;.AccessorNode            | `'AccessorNode'`            | `math.typeof(math.parse('A[2]'))`
   * math.expression.node&#8203;.ArrayNode               | `'ArrayNode'`               | `math.typeof(math.parse('[1,2,3]'))`
   * math.expression.node&#8203;.AssignmentNode          | `'AssignmentNode'`          | `math.typeof(math.parse('x=2'))`
   * math.expression.node&#8203;.BlockNode               | `'BlockNode'`               | `math.typeof(math.parse('a=2; b=3'))`
   * math.expression.node&#8203;.ConditionalNode         | `'ConditionalNode'`         | `math.typeof(math.parse('x<0 ? -x : x'))`
   * math.expression.node&#8203;.ConstantNode            | `'ConstantNode'`            | `math.typeof(math.parse('2.3'))`
   * math.expression.node&#8203;.FunctionAssignmentNode  | `'FunctionAssignmentNode'`  | `math.typeof(math.parse('f(x)=x^2'))`
   * math.expression.node&#8203;.FunctionNode            | `'FunctionNode'`            | `math.typeof(math.parse('sqrt(4)'))`
   * math.expression.node&#8203;.IndexNode               | `'IndexNode'`               | `math.typeof(math.parse('A[2]').index)`
   * math.expression.node&#8203;.ObjectNode              | `'ObjectNode'`              | `math.typeof(math.parse('{a:2}'))`
   * math.expression.node&#8203;.ParenthesisNode         | `'ParenthesisNode'`         | `math.typeof(math.parse('(2+3)'))`
   * math.expression.node&#8203;.RangeNode               | `'RangeNode'`               | `math.typeof(math.parse('1:10'))`
   * math.expression.node&#8203;.SymbolNode              | `'SymbolNode'`              | `math.typeof(math.parse('x'))`
   *
   * Syntax:
   *
   *    math.typeof(x)
   *
   * Examples:
   *
   *    math.typeof(3.5)                     // returns 'number'
   *    math.typeof(math.complex('2-4i'))    // returns 'Complex'
   *    math.typeof(math.unit('45 deg'))     // returns 'Unit'
   *    math.typeof('hello world')           // returns 'string'
   *
   * @param {*} x     The variable for which to test the type.
   * @return {string} Returns the name of the type. Primitive types are lower case,
   *                  non-primitive types are upper-camel-case.
   *                  For example 'number', 'string', 'Array', 'Date'.
   */
  var _typeof = typed('_typeof', {
    'any': function any(x) {
      var t = _typeof2(x);

      if (t === 'object') {
        // JavaScript types
        if (x === null) return 'null';
        if (Array.isArray(x)) return 'Array';
        if (x instanceof Date) return 'Date';
        if (x instanceof RegExp) return 'RegExp'; // math.js types

        if (type.isBigNumber(x)) return 'BigNumber';
        if (type.isComplex(x)) return 'Complex';
        if (type.isFraction(x)) return 'Fraction';
        if (type.isMatrix(x)) return 'Matrix';
        if (type.isUnit(x)) return 'Unit';
        if (type.isIndex(x)) return 'Index';
        if (type.isRange(x)) return 'Range';
        if (type.isResultSet(x)) return 'ResultSet';
        if (type.isNode(x)) return x.type;
        if (type.isChain(x)) return 'Chain';
        if (type.isHelp(x)) return 'Help';
        return 'Object';
      }

      if (t === 'function') return 'Function';
      return t; // can be 'string', 'number', 'boolean', ...
    }
  });

  _typeof.toTex = undefined; // use default template

  return _typeof;
}

var name$2 = 'typeof';
var factory_1$2 = factory$2;

var _typeof$2 = {
	name: name$2,
	factory: factory_1$2
};

function factory$3(type, config, load, typed) {
  /**
   * Create a number or convert a string, boolean, or unit to a number.
   * When value is a matrix, all elements will be converted to number.
   *
   * Syntax:
   *
   *    math.number(value)
   *    math.number(unit, valuelessUnit)
   *
   * Examples:
   *
   *    math.number(2)                         // returns number 2
   *    math.number('7.2')                     // returns number 7.2
   *    math.number(true)                      // returns number 1
   *    math.number([true, false, true, true]) // returns [1, 0, 1, 1]
   *    math.number(math.unit('52cm'), 'm')    // returns 0.52
   *
   * See also:
   *
   *    bignumber, boolean, complex, index, matrix, string, unit
   *
   * @param {string | number | BigNumber | Fraction | boolean | Array | Matrix | Unit | null} [value]  Value to be converted
   * @param {Unit | string} [valuelessUnit] A valueless unit, used to convert a unit to a number
   * @return {number | Array | Matrix} The created number
   */
  var number = typed('number', {
    '': function _() {
      return 0;
    },
    'number': function number(x) {
      return x;
    },
    'string': function string(x) {
      if (x === 'NaN') return NaN;
      var num = Number(x);

      if (isNaN(num)) {
        throw new SyntaxError('String "' + x + '" is no valid number');
      }

      return num;
    },
    'BigNumber': function BigNumber(x) {
      return x.toNumber();
    },
    'Fraction': function Fraction(x) {
      return x.valueOf();
    },
    'Unit': function Unit(x) {
      throw new Error('Second argument with valueless unit expected');
    },
    'null': function _null(x) {
      return 0;
    },
    'Unit, string | Unit': function UnitStringUnit(unit, valuelessUnit) {
      return unit.toNumber(valuelessUnit);
    },
    'Array | Matrix': function ArrayMatrix(x) {
      return deepMap(x, number);
    }
  });
  number.toTex = {
    0: "0",
    1: "\\left(${args[0]}\\right)",
    2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)"
  };
  return number;
}

var name$3 = 'number';
var factory_1$3 = factory$3;

var number$1 = {
	name: name$3,
	factory: factory_1$3
};

function factory$4(type, config, load, typed) {
  /**
   * Create a BigNumber, which can store numbers with arbitrary precision.
   * When a matrix is provided, all elements will be converted to BigNumber.
   *
   * Syntax:
   *
   *    math.bignumber(x)
   *
   * Examples:
   *
   *    0.1 + 0.2                                  // returns number 0.30000000000000004
   *    math.bignumber(0.1) + math.bignumber(0.2)  // returns BigNumber 0.3
   *
   *
   *    7.2e500                                    // returns number Infinity
   *    math.bignumber('7.2e500')                  // returns BigNumber 7.2e500
   *
   * See also:
   *
   *    boolean, complex, index, matrix, string, unit
   *
   * @param {number | string | Fraction | BigNumber | Array | Matrix | boolean | null} [value]  Value for the big number,
   *                                                    0 by default.
   * @returns {BigNumber} The created bignumber
   */
  var bignumber = typed('bignumber', {
    '': function _() {
      return new type.BigNumber(0);
    },
    'number': function number(x) {
      // convert to string to prevent errors in case of >15 digits
      return new type.BigNumber(x + '');
    },
    'string': function string(x) {
      return new type.BigNumber(x);
    },
    'BigNumber': function BigNumber(x) {
      // we assume a BigNumber is immutable
      return x;
    },
    'Fraction': function Fraction(x) {
      return new type.BigNumber(x.n).div(x.d).times(x.s);
    },
    'null': function _null(x) {
      return new type.BigNumber(0);
    },
    'Array | Matrix': function ArrayMatrix(x) {
      return deepMap(x, bignumber);
    }
  });
  bignumber.toTex = {
    0: '0',
    1: "\\left(${args[0]}\\right)"
  };
  return bignumber;
}

var name$4 = 'bignumber';
var factory_1$4 = factory$4;

var bignumber = {
	name: name$4,
	factory: factory_1$4
};

function factory$5(type, config, load, typed) {
  /**
   * Create a fraction convert a value to a fraction.
   *
   * Syntax:
   *     math.fraction(numerator, denominator)
   *     math.fraction({n: numerator, d: denominator})
   *     math.fraction(matrix: Array | Matrix)         Turn all matrix entries
   *                                                   into fractions
   *
   * Examples:
   *
   *     math.fraction(1, 3)
   *     math.fraction('2/3')
   *     math.fraction({n: 2, d: 3})
   *     math.fraction([0.2, 0.25, 1.25])
   *
   * See also:
   *
   *    bignumber, number, string, unit
   *
   * @param {number | string | Fraction | BigNumber | Array | Matrix} [args]
   *            Arguments specifying the numerator and denominator of
   *            the fraction
   * @return {Fraction | Array | Matrix} Returns a fraction
   */
  var fraction = typed('fraction', {
    'number': function number(x) {
      if (!isFinite(x) || isNaN(x)) {
        throw new Error(x + ' cannot be represented as a fraction');
      }

      return new type.Fraction(x);
    },
    'string': function string(x) {
      return new type.Fraction(x);
    },
    'number, number': function numberNumber(numerator, denominator) {
      return new type.Fraction(numerator, denominator);
    },
    'null': function _null(x) {
      return new type.Fraction(0);
    },
    'BigNumber': function BigNumber(x) {
      return new type.Fraction(x.toString());
    },
    'Fraction': function Fraction(x) {
      return x; // fractions are immutable
    },
    'Object': function Object(x) {
      return new type.Fraction(x);
    },
    'Array | Matrix': function ArrayMatrix(x) {
      return deepMap(x, fraction);
    }
  });
  return fraction;
}

var name$5 = 'fraction';
var factory_1$5 = factory$5;

var fraction = {
	name: name$5,
	factory: factory_1$5
};

function factory$6(type, config, load, typed) {
  var getTypeOf = load(_typeof$2);
  var validInputTypes = {
    'string': true,
    'number': true,
    'BigNumber': true,
    'Fraction': true // Load the conversion functions for each output type

  };
  var validOutputTypes = {
    'number': load(number$1),
    'BigNumber': load(bignumber),
    'Fraction': load(fraction)
    /**
     * Convert a numeric value to a specific type: number, BigNumber, or Fraction
     *
     * @param {string | number | BigNumber | Fraction } value
     * @param {'number' | 'BigNumber' | 'Fraction'} outputType
     * @return {number | BigNumber | Fraction} Returns an instance of the
     *                                         numeric in the requested type
     */

  };

  var numeric = function numeric(value, outputType) {
    var inputType = getTypeOf(value);

    if (!(inputType in validInputTypes)) {
      throw new TypeError('Cannot convert ' + value + ' of type "' + inputType + '"; valid input types are ' + Object.keys(validInputTypes).join(', '));
    }

    if (!(outputType in validOutputTypes)) {
      throw new TypeError('Cannot convert ' + value + ' to type "' + outputType + '"; valid output types are ' + Object.keys(validOutputTypes).join(', '));
    }

    if (outputType === inputType) {
      return value;
    } else {
      return validOutputTypes[outputType](value);
    }
  };

  numeric.toTex = function (node, options) {
    // Not sure if this is strictly right but should work correctly for the vast majority of use cases.
    return node.args[0].toTex();
  };

  return numeric;
} // FIXME: expose numeric in the math namespace after we've decided on a name and have written proper docs for this function. See https://github.com/josdejong/mathjs/pull/1270
// exports.name = 'type._numeric'


var path = 'type';
var name$6 = '_numeric';
var factory_1$6 = factory$6;

var numeric = {
	path: path,
	name: name$6,
	factory: factory_1$6
};

function _typeof$3(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$3 = function _typeof(obj) { return typeof obj; }; } else { _typeof$3 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$3(obj); }

var hasOwnProperty = object.hasOwnProperty;
/**
 * Get a property of a plain object
 * Throws an error in case the object is not a plain object or the
 * property is not defined on the object itself
 * @param {Object} object
 * @param {string} prop
 * @return {*} Returns the property value when safe
 */


function getSafeProperty(object, prop) {
  // only allow getting safe properties of a plain object
  if (isPlainObject(object) && isSafeProperty(object, prop)) {
    return object[prop];
  }

  if (typeof object[prop] === 'function' && isSafeMethod(object, prop)) {
    throw new Error('Cannot access method "' + prop + '" as a property');
  }

  throw new Error('No access to property "' + prop + '"');
}
/**
 * Set a property on a plain object.
 * Throws an error in case the object is not a plain object or the
 * property would override an inherited property like .constructor or .toString
 * @param {Object} object
 * @param {string} prop
 * @param {*} value
 * @return {*} Returns the value
 */
// TODO: merge this function into access.js?


function setSafeProperty(object, prop, value) {
  // only allow setting safe properties of a plain object
  if (isPlainObject(object) && isSafeProperty(object, prop)) {
    object[prop] = value;
    return value;
  }

  throw new Error('No access to property "' + prop + '"');
}
/**
 * Test whether a property is safe to use for an object.
 * For example .toString and .constructor are not safe
 * @param {string} prop
 * @return {boolean} Returns true when safe
 */


function isSafeProperty(object, prop) {
  if (!object || _typeof$3(object) !== 'object') {
    return false;
  } // SAFE: whitelisted
  // e.g length


  if (hasOwnProperty(safeNativeProperties, prop)) {
    return true;
  } // UNSAFE: inherited from Object prototype
  // e.g constructor


  if (prop in Object.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Object.prototype is a root object
    return false;
  } // UNSAFE: inherited from Function prototype
  // e.g call, apply


  if (prop in Function.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Function.prototype is a root object
    return false;
  }

  return true;
}
/**
 * Validate whether a method is safe.
 * Throws an error when that's not the case.
 * @param {Object} object
 * @param {string} method
 */
// TODO: merge this function into assign.js?


function validateSafeMethod(object, method) {
  if (!isSafeMethod(object, method)) {
    throw new Error('No access to method "' + method + '"');
  }
}
/**
 * Check whether a method is safe.
 * Throws an error when that's not the case (for example for `constructor`).
 * @param {Object} object
 * @param {string} method
 * @return {boolean} Returns true when safe, false otherwise
 */


function isSafeMethod(object, method) {
  if (!object || typeof object[method] !== 'function') {
    return false;
  } // UNSAFE: ghosted
  // e.g overridden toString
  // Note that IE10 doesn't support __proto__ and we can't do this check there.


  if (hasOwnProperty(object, method) && Object.getPrototypeOf && method in Object.getPrototypeOf(object)) {
    return false;
  } // SAFE: whitelisted
  // e.g toString


  if (hasOwnProperty(safeNativeMethods, method)) {
    return true;
  } // UNSAFE: inherited from Object prototype
  // e.g constructor


  if (method in Object.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Object.prototype is a root object
    return false;
  } // UNSAFE: inherited from Function prototype
  // e.g call, apply


  if (method in Function.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Function.prototype is a root object
    return false;
  }

  return true;
}

function isPlainObject(object) {
  return _typeof$3(object) === 'object' && object && object.constructor === Object;
}

var safeNativeProperties = {
  length: true,
  name: true
};
var safeNativeMethods = {
  toString: true,
  valueOf: true,
  toLocaleString: true
};
var getSafeProperty_1 = getSafeProperty;
var setSafeProperty_1 = setSafeProperty;
var isSafeProperty_1 = isSafeProperty;
var validateSafeMethod_1 = validateSafeMethod;
var isSafeMethod_1 = isSafeMethod;
var isPlainObject_1 = isPlainObject;

var customs = {
	getSafeProperty: getSafeProperty_1,
	setSafeProperty: setSafeProperty_1,
	isSafeProperty: isSafeProperty_1,
	validateSafeMethod: validateSafeMethod_1,
	isSafeMethod: isSafeMethod_1,
	isPlainObject: isPlainObject_1
};

var keywords = {
  end: true
};

function _typeof$4(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$4 = function _typeof(obj) { return typeof obj; }; } else { _typeof$4 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$4(obj); }



var deepEqual = object.deepEqual;

var hasOwnProperty$1 = object.hasOwnProperty;

function factory$7(type, config, load, typed, math) {
  /**
   * Node
   */
  function Node() {
    if (!(this instanceof Node)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }
  }
  /**
   * Evaluate the node
   * @param {Object} [scope]  Scope to read/write variables
   * @return {*}              Returns the result
   */


  Node.prototype.eval = function (scope) {
    return this.compile().eval(scope);
  };

  Node.prototype.type = 'Node';
  Node.prototype.isNode = true;
  Node.prototype.comment = '';
  /**
   * Compile the node into an optimized, evauatable JavaScript function
   * @return {{eval: function([Object])}} expr  Returns an object with a function 'eval',
   *                                  which can be invoked as expr.eval([scope: Object]),
   *                                  where scope is an optional object with
   *                                  variables.
   */

  Node.prototype.compile = function () {
    var expr = this._compile(math.expression.mathWithTransform, {});

    var args = {};
    var context = null;
    return {
      eval: function evalNode(scope) {
        var s = scope || {};

        _validateScope(s);

        return expr(s, args, context);
      }
    };
  };
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */


  Node.prototype._compile = function (math, argNames) {
    throw new Error('Method _compile should be implemented by type ' + this.type);
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  Node.prototype.forEach = function (callback) {
    // must be implemented by each of the Node implementations
    throw new Error('Cannot run forEach on a Node interface');
  };
  /**
   * Create a new Node having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {OperatorNode} Returns a transformed copy of the node
   */


  Node.prototype.map = function (callback) {
    // must be implemented by each of the Node implementations
    throw new Error('Cannot run map on a Node interface');
  };
  /**
   * Validate whether an object is a Node, for use with map
   * @param {Node} node
   * @returns {Node} Returns the input if it's a node, else throws an Error
   * @protected
   */


  Node.prototype._ifNode = function (node) {
    if (!type.isNode(node)) {
      throw new TypeError('Callback function must return a Node');
    }

    return node;
  };
  /**
   * Recursively traverse all nodes in a node tree. Executes given callback for
   * this node and each of its child nodes.
   * @param {function(node: Node, path: string, parent: Node)} callback
   *          A callback called for every node in the node tree.
   */


  Node.prototype.traverse = function (callback) {
    // execute callback for itself
    callback(this, null, null); // eslint-disable-line standard/no-callback-literal
    // recursively traverse over all childs of a node

    function _traverse(node, callback) {
      node.forEach(function (child, path, parent) {
        callback(child, path, parent);

        _traverse(child, callback);
      });
    }

    _traverse(this, callback);
  };
  /**
   * Recursively transform a node tree via a transform function.
   *
   * For example, to replace all nodes of type SymbolNode having name 'x' with a
   * ConstantNode with value 2:
   *
   *     const res = Node.transform(function (node, path, parent) {
   *       if (node && node.isSymbolNode) && (node.name === 'x')) {
   *         return new ConstantNode(2)
   *       }
   *       else {
   *         return node
   *       }
   *     })
   *
   * @param {function(node: Node, path: string, parent: Node) : Node} callback
   *          A mapping function accepting a node, and returning
   *          a replacement for the node or the original node.
   *          Signature: callback(node: Node, index: string, parent: Node) : Node
   * @return {Node} Returns the original node or its replacement
   */


  Node.prototype.transform = function (callback) {
    // traverse over all childs
    function _transform(node, callback) {
      return node.map(function (child, path, parent) {
        var replacement = callback(child, path, parent);
        return _transform(replacement, callback);
      });
    }

    var replacement = callback(this, null, null); // eslint-disable-line standard/no-callback-literal

    return _transform(replacement, callback);
  };
  /**
   * Find any node in the node tree matching given filter function. For example, to
   * find all nodes of type SymbolNode having name 'x':
   *
   *     const results = Node.filter(function (node) {
   *       return (node && node.isSymbolNode) && (node.name === 'x')
   *     })
   *
   * @param {function(node: Node, path: string, parent: Node) : Node} callback
   *            A test function returning true when a node matches, and false
   *            otherwise. Function signature:
   *            callback(node: Node, index: string, parent: Node) : boolean
   * @return {Node[]} nodes       An array with nodes matching given filter criteria
   */


  Node.prototype.filter = function (callback) {
    var nodes = [];
    this.traverse(function (node, path, parent) {
      if (callback(node, path, parent)) {
        nodes.push(node);
      }
    });
    return nodes;
  }; // TODO: deprecated since version 1.1.0, remove this some day


  Node.prototype.find = function () {
    throw new Error('Function Node.find is deprecated. Use Node.filter instead.');
  }; // TODO: deprecated since version 1.1.0, remove this some day


  Node.prototype.match = function () {
    throw new Error('Function Node.match is deprecated. See functions Node.filter, Node.transform, Node.traverse.');
  };
  /**
   * Create a shallow clone of this node
   * @return {Node}
   */


  Node.prototype.clone = function () {
    // must be implemented by each of the Node implementations
    throw new Error('Cannot clone a Node interface');
  };
  /**
   * Create a deep clone of this node
   * @return {Node}
   */


  Node.prototype.cloneDeep = function () {
    return this.map(function (node) {
      return node.cloneDeep();
    });
  };
  /**
   * Deep compare this node with another node.
   * @param {Node} other
   * @return {boolean} Returns true when both nodes are of the same type and
   *                   contain the same values (as do their childs)
   */


  Node.prototype.equals = function (other) {
    return other ? deepEqual(this, other) : false;
  };
  /**
   * Get string representation. (wrapper function)
   *
   * This function can get an object of the following form:
   * {
   *    handler: //This can be a callback function of the form
   *             // "function callback(node, options)"or
   *             // a map that maps function names (used in FunctionNodes)
   *             // to callbacks
   *    parenthesis: "keep" //the parenthesis option (This is optional)
   * }
   *
   * @param {Object} [options]
   * @return {string}
   */


  Node.prototype.toString = function (options) {
    var customString;

    if (options && _typeof$4(options) === 'object') {
      switch (_typeof$4(options.handler)) {
        case 'object':
        case 'undefined':
          break;

        case 'function':
          customString = options.handler(this, options);
          break;

        default:
          throw new TypeError('Object or function expected as callback');
      }
    }

    if (typeof customString !== 'undefined') {
      return customString;
    }

    return this._toString(options);
  };
  /**
   * Get a JSON representation of the node
   * Both .toJSON() and the static .fromJSON(json) should be implemented by all
   * implementations of Node
   * @returns {Object}
   */


  Node.prototype.toJSON = function () {
    throw new Error('Cannot serialize object: toJSON not implemented by ' + this.type);
  };
  /**
   * Get HTML representation. (wrapper function)
   *
   * This function can get an object of the following form:
   * {
   *    handler: //This can be a callback function of the form
   *             // "function callback(node, options)" or
   *             // a map that maps function names (used in FunctionNodes)
   *             // to callbacks
   *    parenthesis: "keep" //the parenthesis option (This is optional)
   * }
   *
   * @param {Object} [options]
   * @return {string}
   */


  Node.prototype.toHTML = function (options) {
    var customString;

    if (options && _typeof$4(options) === 'object') {
      switch (_typeof$4(options.handler)) {
        case 'object':
        case 'undefined':
          break;

        case 'function':
          customString = options.handler(this, options);
          break;

        default:
          throw new TypeError('Object or function expected as callback');
      }
    }

    if (typeof customString !== 'undefined') {
      return customString;
    }

    return this.toHTML(options);
  };
  /**
   * Internal function to generate the string output.
   * This has to be implemented by every Node
   *
   * @throws {Error}
   */


  Node.prototype._toString = function () {
    // must be implemented by each of the Node implementations
    throw new Error('_toString not implemented for ' + this.type);
  };
  /**
   * Get LaTeX representation. (wrapper function)
   *
   * This function can get an object of the following form:
   * {
   *    handler: //This can be a callback function of the form
   *             // "function callback(node, options)"or
   *             // a map that maps function names (used in FunctionNodes)
   *             // to callbacks
   *    parenthesis: "keep" //the parenthesis option (This is optional)
   * }
   *
   * @param {Object} [options]
   * @return {string}
   */


  Node.prototype.toTex = function (options) {
    var customTex;

    if (options && _typeof$4(options) === 'object') {
      switch (_typeof$4(options.handler)) {
        case 'object':
        case 'undefined':
          break;

        case 'function':
          customTex = options.handler(this, options);
          break;

        default:
          throw new TypeError('Object or function expected as callback');
      }
    }

    if (typeof customTex !== 'undefined') {
      return customTex;
    }

    return this._toTex(options);
  };
  /**
   * Internal function to generate the LaTeX output.
   * This has to be implemented by every Node
   *
   * @param {Object} [options]
   * @throws {Error}
   */


  Node.prototype._toTex = function (options) {
    // must be implemented by each of the Node implementations
    throw new Error('_toTex not implemented for ' + this.type);
  };
  /**
   * Get identifier.
   * @return {string}
   */


  Node.prototype.getIdentifier = function () {
    return this.type;
  };
  /**
   * Get the content of the current Node.
   * @return {Node} node
   **/


  Node.prototype.getContent = function () {
    return this;
  };
  /**
   * Validate the symbol names of a scope.
   * Throws an error when the scope contains an illegal symbol.
   * @param {Object} scope
   */


  function _validateScope(scope) {
    for (var symbol in scope) {
      if (hasOwnProperty$1(scope, symbol)) {
        if (symbol in keywords) {
          throw new Error('Scope contains an illegal symbol, "' + symbol + '" is a reserved keyword');
        }
      }
    }
  }

  return Node;
}

var name$7 = 'Node';
var path$1 = 'expression.node';
var math$2 = true; // request access to the math namespace as 5th argument of the factory function

var factory_1$7 = factory$7;

var Node = {
	name: name$7,
	path: path$1,
	math: math$2,
	factory: factory_1$7
};

/**
 * Create a range error with the message:
 *     'Index out of range (index < min)'
 *     'Index out of range (index < max)'
 *
 * @param {number} index     The actual index
 * @param {number} [min=0]   Minimum index (included)
 * @param {number} [max]     Maximum index (excluded)
 * @extends RangeError
 */

function IndexError(index, min, max) {
  if (!(this instanceof IndexError)) {
    throw new SyntaxError('Constructor must be called with the new operator');
  }

  this.index = index;

  if (arguments.length < 3) {
    this.min = 0;
    this.max = min;
  } else {
    this.min = min;
    this.max = max;
  }

  if (this.min !== undefined && this.index < this.min) {
    this.message = 'Index out of range (' + this.index + ' < ' + this.min + ')';
  } else if (this.max !== undefined && this.index >= this.max) {
    this.message = 'Index out of range (' + this.index + ' > ' + (this.max - 1) + ')';
  } else {
    this.message = 'Index out of range (' + this.index + ')';
  }

  this.stack = new Error().stack;
}

IndexError.prototype = new RangeError();
IndexError.prototype.constructor = RangeError;
IndexError.prototype.name = 'IndexError';
IndexError.prototype.isIndexError = true;
var IndexError_1 = IndexError;

/**
 * Transform zero-based indices to one-based indices in errors
 * @param {Error} err
 * @returns {Error} Returns the transformed error
 */


var transform = function (err) {
  if (err && err.isIndexError) {
    return new IndexError_1(err.index + 1, err.min + 1, err.max !== undefined ? err.max + 1 : undefined);
  }

  return err;
};

var error_transform = {
	transform: transform
};

var formatter = createCommonjsModule(function (module, exports) {


/**
 * Convert a BigNumber to a formatted string representation.
 *
 * Syntax:
 *
 *    format(value)
 *    format(value, options)
 *    format(value, precision)
 *    format(value, fn)
 *
 * Where:
 *
 *    {number} value   The value to be formatted
 *    {Object} options An object with formatting options. Available options:
 *                     {string} notation
 *                         Number notation. Choose from:
 *                         'fixed'          Always use regular number notation.
 *                                          For example '123.40' and '14000000'
 *                         'exponential'    Always use exponential notation.
 *                                          For example '1.234e+2' and '1.4e+7'
 *                         'auto' (default) Regular number notation for numbers
 *                                          having an absolute value between
 *                                          `lower` and `upper` bounds, and uses
 *                                          exponential notation elsewhere.
 *                                          Lower bound is included, upper bound
 *                                          is excluded.
 *                                          For example '123.4' and '1.4e7'.
 *                     {number} precision   A number between 0 and 16 to round
 *                                          the digits of the number.
 *                                          In case of notations 'exponential',
 *                                          'engineering', and 'auto',
 *                                          `precision` defines the total
 *                                          number of significant digits returned.
 *                                          In case of notation 'fixed',
 *                                          `precision` defines the number of
 *                                          significant digits after the decimal
 *                                          point.
 *                                          `precision` is undefined by default.
 *                     {number} lowerExp    Exponent determining the lower boundary
 *                                          for formatting a value with an exponent
 *                                          when `notation='auto`.
 *                                          Default value is `-3`.
 *                     {number} upperExp    Exponent determining the upper boundary
 *                                          for formatting a value with an exponent
 *                                          when `notation='auto`.
 *                                          Default value is `5`.
 *    {Function} fn    A custom formatting function. Can be used to override the
 *                     built-in notations. Function `fn` is called with `value` as
 *                     parameter and must return a string. Is useful for example to
 *                     format all values inside a matrix in a particular way.
 *
 * Examples:
 *
 *    format(6.4)                                        // '6.4'
 *    format(1240000)                                    // '1.24e6'
 *    format(1/3)                                        // '0.3333333333333333'
 *    format(1/3, 3)                                     // '0.333'
 *    format(21385, 2)                                   // '21000'
 *    format(12e8, {notation: 'fixed'})                  // returns '1200000000'
 *    format(2.3,    {notation: 'fixed', precision: 4})  // returns '2.3000'
 *    format(52.8,   {notation: 'exponential'})          // returns '5.28e+1'
 *    format(12400,  {notation: 'engineering'})          // returns '12.400e+3'
 *
 * @param {BigNumber} value
 * @param {Object | Function | number} [options]
 * @return {string} str The formatted value
 */


exports.format = function (value, options) {
  if (typeof options === 'function') {
    // handle format(value, fn)
    return options(value);
  } // handle special cases


  if (!value.isFinite()) {
    return value.isNaN() ? 'NaN' : value.gt(0) ? 'Infinity' : '-Infinity';
  } // default values for options


  var notation = 'auto';
  var precision;

  if (options !== undefined) {
    // determine notation from options
    if (options.notation) {
      notation = options.notation;
    } // determine precision from options


    if (typeof options === 'number') {
      precision = options;
    } else if (options.precision) {
      precision = options.precision;
    }
  } // handle the various notations


  switch (notation) {
    case 'fixed':
      return exports.toFixed(value, precision);

    case 'exponential':
      return exports.toExponential(value, precision);

    case 'engineering':
      return exports.toEngineering(value, precision);

    case 'auto':
      // TODO: clean up some day. Deprecated since: 2018-01-24
      // @deprecated upper and lower are replaced with upperExp and lowerExp since v4.0.0
      if (options && options.exponential && (options.exponential.lower !== undefined || options.exponential.upper !== undefined)) {
        var fixedOptions = object.map(options, function (x) {
          return x;
        });
        fixedOptions.exponential = undefined;

        if (options.exponential.lower !== undefined) {
          fixedOptions.lowerExp = Math.round(Math.log(options.exponential.lower) / Math.LN10);
        }

        if (options.exponential.upper !== undefined) {
          fixedOptions.upperExp = Math.round(Math.log(options.exponential.upper) / Math.LN10);
        }

        console.warn('Deprecation warning: Formatting options exponential.lower and exponential.upper ' + '(minimum and maximum value) ' + 'are replaced with exponential.lowerExp and exponential.upperExp ' + '(minimum and maximum exponent) since version 4.0.0. ' + 'Replace ' + JSON.stringify(options) + ' with ' + JSON.stringify(fixedOptions));
        return exports.format(value, fixedOptions);
      } // determine lower and upper bound for exponential notation.
      // TODO: implement support for upper and lower to be BigNumbers themselves


      var lowerExp = options && options.lowerExp !== undefined ? options.lowerExp : -3;
      var upperExp = options && options.upperExp !== undefined ? options.upperExp : 5; // handle special case zero

      if (value.isZero()) return '0'; // determine whether or not to output exponential notation

      var str;
      var exp = value.e;

      if (exp >= lowerExp && exp < upperExp) {
        // normal number notation
        str = value.toSignificantDigits(precision).toFixed();
      } else {
        // exponential notation
        str = exports.toExponential(value, precision);
      } // remove trailing zeros after the decimal point


      return str.replace(/((\.\d*?)(0+))($|e)/, function () {
        var digits = arguments[2];
        var e = arguments[4];
        return digits !== '.' ? digits + e : e;
      });

    default:
      throw new Error('Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", or "fixed".');
  }
};
/**
 * Format a BigNumber in engineering notation. Like '1.23e+6', '2.3e+0', '3.500e-3'
 * @param {BigNumber | string} value
 * @param {number} [precision]        Optional number of significant figures to return.
 */


exports.toEngineering = function (value, precision) {
  // find nearest lower multiple of 3 for exponent
  var e = value.e;
  var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3; // find difference in exponents, and calculate the value without exponent

  var valueWithoutExp = value.mul(Math.pow(10, -newExp));
  var valueStr = valueWithoutExp.toPrecision(precision);

  if (valueStr.indexOf('e') !== -1) {
    valueStr = valueWithoutExp.toString();
  }

  return valueStr + 'e' + (e >= 0 ? '+' : '') + newExp.toString();
};
/**
 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
 * @param {BigNumber} value
 * @param {number} [precision]  Number of digits in formatted output.
 *                              If not provided, the maximum available digits
 *                              is used.
 * @returns {string} str
 */


exports.toExponential = function (value, precision) {
  if (precision !== undefined) {
    return value.toExponential(precision - 1); // Note the offset of one
  } else {
    return value.toExponential();
  }
};
/**
 * Format a number with fixed notation.
 * @param {BigNumber} value
 * @param {number} [precision=undefined] Optional number of decimals after the
 *                                       decimal point. Undefined by default.
 */


exports.toFixed = function (value, precision) {
  return value.toFixed(precision);
};
});
var formatter_1 = formatter.format;
var formatter_2 = formatter.toEngineering;
var formatter_3 = formatter.toExponential;
var formatter_4 = formatter.toFixed;

var string = createCommonjsModule(function (module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var formatNumber = number.format;

var formatBigNumber = formatter.format;


/**
 * Test whether value is a string
 * @param {*} value
 * @return {boolean} isString
 */


exports.isString = function (value) {
  return typeof value === 'string';
};
/**
 * Check if a text ends with a certain string.
 * @param {string} text
 * @param {string} search
 */


exports.endsWith = function (text, search) {
  var start = text.length - search.length;
  var end = text.length;
  return text.substring(start, end) === search;
};
/**
 * Format a value of any type into a string.
 *
 * Usage:
 *     math.format(value)
 *     math.format(value, precision)
 *
 * When value is a function:
 *
 * - When the function has a property `syntax`, it returns this
 *   syntax description.
 * - In other cases, a string `'function'` is returned.
 *
 * When `value` is an Object:
 *
 * - When the object contains a property `format` being a function, this
 *   function is invoked as `value.format(options)` and the result is returned.
 * - When the object has its own `toString` method, this method is invoked
 *   and the result is returned.
 * - In other cases the function will loop over all object properties and
 *   return JSON object notation like '{"a": 2, "b": 3}'.
 *
 * Example usage:
 *     math.format(2/7)                // '0.2857142857142857'
 *     math.format(math.pi, 3)         // '3.14'
 *     math.format(new Complex(2, 3))  // '2 + 3i'
 *     math.format('hello')            // '"hello"'
 *
 * @param {*} value             Value to be stringified
 * @param {Object | number | Function} [options]  Formatting options. See
 *                                                lib/utils/number:format for a
 *                                                description of the available
 *                                                options.
 * @return {string} str
 */


exports.format = function (value, options) {
  if (typeof value === 'number') {
    return formatNumber(value, options);
  }

  if (isBigNumber(value)) {
    return formatBigNumber(value, options);
  } // note: we use unsafe duck-typing here to check for Fractions, this is
  // ok here since we're only invoking toString or concatenating its values


  if (looksLikeFraction(value)) {
    if (!options || options.fraction !== 'decimal') {
      // output as ratio, like '1/3'
      return value.s * value.n + '/' + value.d;
    } else {
      // output as decimal, like '0.(3)'
      return value.toString();
    }
  }

  if (Array.isArray(value)) {
    return formatArray(value, options);
  }

  if (exports.isString(value)) {
    return '"' + value + '"';
  }

  if (typeof value === 'function') {
    return value.syntax ? String(value.syntax) : 'function';
  }

  if (value && _typeof(value) === 'object') {
    if (typeof value.format === 'function') {
      return value.format(options);
    } else if (value && value.toString() !== {}.toString()) {
      // this object has a non-native toString method, use that one
      return value.toString();
    } else {
      var entries = [];

      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          entries.push('"' + key + '": ' + exports.format(value[key], options));
        }
      }

      return '{' + entries.join(', ') + '}';
    }
  }

  return String(value);
};
/**
 * Stringify a value into a string enclosed in double quotes.
 * Unescaped double quotes and backslashes inside the value are escaped.
 * @param {*} value
 * @return {string}
 */


exports.stringify = function (value) {
  var text = String(value);
  var escaped = '';
  var i = 0;

  while (i < text.length) {
    var c = text.charAt(i);

    if (c === '\\') {
      escaped += c;
      i++;
      c = text.charAt(i);

      if (c === '' || '"\\/bfnrtu'.indexOf(c) === -1) {
        escaped += '\\'; // no valid escape character -> escape it
      }

      escaped += c;
    } else if (c === '"') {
      escaped += '\\"';
    } else {
      escaped += c;
    }

    i++;
  }

  return '"' + escaped + '"';
};
/**
 * Escape special HTML characters
 * @param {*} value
 * @return {string}
 */


exports.escape = function (value) {
  var text = String(value);
  text = text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return text;
};
/**
 * Recursively format an n-dimensional matrix
 * Example output: "[[1, 2], [3, 4]]"
 * @param {Array} array
 * @param {Object | number | Function} [options]  Formatting options. See
 *                                                lib/utils/number:format for a
 *                                                description of the available
 *                                                options.
 * @returns {string} str
 */


function formatArray(array, options) {
  if (Array.isArray(array)) {
    var str = '[';
    var len = array.length;

    for (var i = 0; i < len; i++) {
      if (i !== 0) {
        str += ', ';
      }

      str += formatArray(array[i], options);
    }

    str += ']';
    return str;
  } else {
    return exports.format(array, options);
  }
}
/**
 * Check whether a value looks like a Fraction (unsafe duck-type check)
 * @param {*} value
 * @return {boolean}
 */


function looksLikeFraction(value) {
  return value && _typeof(value) === 'object' && typeof value.s === 'number' && typeof value.n === 'number' && typeof value.d === 'number' || false;
}
});
var string_1 = string.isString;
var string_2 = string.endsWith;
var string_3 = string.format;
var string_4 = string.stringify;
var string_5 = string.escape;

/**
 * Create a range error with the message:
 *     'Dimension mismatch (<actual size> != <expected size>)'
 * @param {number | number[]} actual        The actual size
 * @param {number | number[]} expected      The expected size
 * @param {string} [relation='!=']          Optional relation between actual
 *                                          and expected size: '!=', '<', etc.
 * @extends RangeError
 */

function DimensionError(actual, expected, relation) {
  if (!(this instanceof DimensionError)) {
    throw new SyntaxError('Constructor must be called with the new operator');
  }

  this.actual = actual;
  this.expected = expected;
  this.relation = relation;
  this.message = 'Dimension mismatch (' + (Array.isArray(actual) ? '[' + actual.join(', ') + ']' : actual) + ' ' + (this.relation || '!=') + ' ' + (Array.isArray(expected) ? '[' + expected.join(', ') + ']' : expected) + ')';
  this.stack = new Error().stack;
}

DimensionError.prototype = new RangeError();
DimensionError.prototype.constructor = RangeError;
DimensionError.prototype.name = 'DimensionError';
DimensionError.prototype.isDimensionError = true;
var DimensionError_1 = DimensionError;

var array = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.size = size;
exports.validate = validate;
exports.validateIndex = validateIndex;
exports.resize = resize;
exports.reshape = reshape;
exports.squeeze = squeeze;
exports.unsqueeze = unsqueeze;
exports.flatten = flatten;
exports.map = map;
exports.forEach = forEach;
exports.filter = filter;
exports.filterRegExp = filterRegExp;
exports.join = join;
exports.identify = identify;
exports.generalize = generalize;

var _number = _interopRequireDefault(number);

var _string = _interopRequireDefault(string);

var _DimensionError = _interopRequireDefault(DimensionError_1);

var _IndexError = _interopRequireDefault(IndexError_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Calculate the size of a multi dimensional array.
 * This function checks the size of the first entry, it does not validate
 * whether all dimensions match. (use function `validate` for that)
 * @param {Array} x
 * @Return {Number[]} size
 */
function size(x) {
  var s = [];

  while (Array.isArray(x)) {
    s.push(x.length);
    x = x[0];
  }

  return s;
}
/**
 * Recursively validate whether each element in a multi dimensional array
 * has a size corresponding to the provided size array.
 * @param {Array} array    Array to be validated
 * @param {number[]} size  Array with the size of each dimension
 * @param {number} dim   Current dimension
 * @throws DimensionError
 * @private
 */


function _validate(array, size, dim) {
  var i;
  var len = array.length;

  if (len !== size[dim]) {
    throw new _DimensionError["default"](len, size[dim]);
  }

  if (dim < size.length - 1) {
    // recursively validate each child array
    var dimNext = dim + 1;

    for (i = 0; i < len; i++) {
      var child = array[i];

      if (!Array.isArray(child)) {
        throw new _DimensionError["default"](size.length - 1, size.length, '<');
      }

      _validate(array[i], size, dimNext);
    }
  } else {
    // last dimension. none of the childs may be an array
    for (i = 0; i < len; i++) {
      if (Array.isArray(array[i])) {
        throw new _DimensionError["default"](size.length + 1, size.length, '>');
      }
    }
  }
}
/**
 * Validate whether each element in a multi dimensional array has
 * a size corresponding to the provided size array.
 * @param {Array} array    Array to be validated
 * @param {number[]} size  Array with the size of each dimension
 * @throws DimensionError
 */


function validate(array, size) {
  var isScalar = size.length === 0;

  if (isScalar) {
    // scalar
    if (Array.isArray(array)) {
      throw new _DimensionError["default"](array.length, 0);
    }
  } else {
    // array
    _validate(array, size, 0);
  }
}
/**
 * Test whether index is an integer number with index >= 0 and index < length
 * when length is provided
 * @param {number} index    Zero-based index
 * @param {number} [length] Length of the array
 */


function validateIndex(index, length) {
  if (!_number["default"].isNumber(index) || !_number["default"].isInteger(index)) {
    throw new TypeError('Index must be an integer (value: ' + index + ')');
  }

  if (index < 0 || typeof length === 'number' && index >= length) {
    throw new _IndexError["default"](index, length);
  }
}
/**
 * Resize a multi dimensional array. The resized array is returned.
 * @param {Array} array         Array to be resized
 * @param {Array.<number>} size Array with the size of each dimension
 * @param {*} [defaultValue=0]  Value to be filled in in new entries,
 *                              zero by default. Specify for example `null`,
 *                              to clearly see entries that are not explicitly
 *                              set.
 * @return {Array} array         The resized array
 */


function resize(array, size, defaultValue) {
  // TODO: add support for scalars, having size=[] ?
  // check the type of the arguments
  if (!Array.isArray(array) || !Array.isArray(size)) {
    throw new TypeError('Array expected');
  }

  if (size.length === 0) {
    throw new Error('Resizing to scalar is not supported');
  } // check whether size contains positive integers


  size.forEach(function (value) {
    if (!_number["default"].isNumber(value) || !_number["default"].isInteger(value) || value < 0) {
      throw new TypeError('Invalid size, must contain positive integers ' + '(size: ' + _string["default"].format(size) + ')');
    }
  }); // recursively resize the array

  var _defaultValue = defaultValue !== undefined ? defaultValue : 0;

  _resize(array, size, 0, _defaultValue);

  return array;
}
/**
 * Recursively resize a multi dimensional array
 * @param {Array} array         Array to be resized
 * @param {number[]} size       Array with the size of each dimension
 * @param {number} dim          Current dimension
 * @param {*} [defaultValue]    Value to be filled in in new entries,
 *                              undefined by default.
 * @private
 */


function _resize(array, size, dim, defaultValue) {
  var i;
  var elem;
  var oldLen = array.length;
  var newLen = size[dim];
  var minLen = Math.min(oldLen, newLen); // apply new length

  array.length = newLen;

  if (dim < size.length - 1) {
    // non-last dimension
    var dimNext = dim + 1; // resize existing child arrays

    for (i = 0; i < minLen; i++) {
      // resize child array
      elem = array[i];

      if (!Array.isArray(elem)) {
        elem = [elem]; // add a dimension

        array[i] = elem;
      }

      _resize(elem, size, dimNext, defaultValue);
    } // create new child arrays


    for (i = minLen; i < newLen; i++) {
      // get child array
      elem = [];
      array[i] = elem; // resize new child array

      _resize(elem, size, dimNext, defaultValue);
    }
  } else {
    // last dimension
    // remove dimensions of existing values
    for (i = 0; i < minLen; i++) {
      while (Array.isArray(array[i])) {
        array[i] = array[i][0];
      }
    } // fill new elements with the default value


    for (i = minLen; i < newLen; i++) {
      array[i] = defaultValue;
    }
  }
}
/**
 * Re-shape a multi dimensional array to fit the specified dimensions
 * @param {Array} array           Array to be reshaped
 * @param {Array.<number>} sizes  List of sizes for each dimension
 * @returns {Array}               Array whose data has been formatted to fit the
 *                                specified dimensions
 *
 * @throws {DimensionError}       If the product of the new dimension sizes does
 *                                not equal that of the old ones
 */


function reshape(array, sizes) {
  var flatArray = flatten(array);
  var newArray;

  function product(arr) {
    return arr.reduce(function (prev, curr) {
      return prev * curr;
    });
  }

  if (!Array.isArray(array) || !Array.isArray(sizes)) {
    throw new TypeError('Array expected');
  }

  if (sizes.length === 0) {
    throw new _DimensionError["default"](0, product(size(array)), '!=');
  }

  var totalSize = 1;

  for (var sizeIndex = 0; sizeIndex < sizes.length; sizeIndex++) {
    totalSize *= sizes[sizeIndex];
  }

  if (flatArray.length !== totalSize) {
    throw new _DimensionError["default"](product(sizes), product(size(array)), '!=');
  }

  try {
    newArray = _reshape(flatArray, sizes);
  } catch (e) {
    if (e instanceof _DimensionError["default"]) {
      throw new _DimensionError["default"](product(sizes), product(size(array)), '!=');
    }

    throw e;
  }

  return newArray;
}
/**
 * Iteratively re-shape a multi dimensional array to fit the specified dimensions
 * @param {Array} array           Array to be reshaped
 * @param {Array.<number>} sizes  List of sizes for each dimension
 * @returns {Array}               Array whose data has been formatted to fit the
 *                                specified dimensions
 */


function _reshape(array, sizes) {
  // testing if there are enough elements for the requested shape
  var tmpArray = array;
  var tmpArray2; // for each dimensions starting by the last one and ignoring the first one

  for (var sizeIndex = sizes.length - 1; sizeIndex > 0; sizeIndex--) {
    var size = sizes[sizeIndex];
    tmpArray2 = []; // aggregate the elements of the current tmpArray in elements of the requested size

    var length = tmpArray.length / size;

    for (var i = 0; i < length; i++) {
      tmpArray2.push(tmpArray.slice(i * size, (i + 1) * size));
    } // set it as the new tmpArray for the next loop turn or for return


    tmpArray = tmpArray2;
  }

  return tmpArray;
}
/**
 * Squeeze a multi dimensional array
 * @param {Array} array
 * @param {Array} [arraySize]
 * @returns {Array} returns the array itself
 */


function squeeze(array, arraySize) {
  var s = arraySize || size(array); // squeeze outer dimensions

  while (Array.isArray(array) && array.length === 1) {
    array = array[0];
    s.shift();
  } // find the first dimension to be squeezed


  var dims = s.length;

  while (s[dims - 1] === 1) {
    dims--;
  } // squeeze inner dimensions


  if (dims < s.length) {
    array = _squeeze(array, dims, 0);
    s.length = dims;
  }

  return array;
}
/**
 * Recursively squeeze a multi dimensional array
 * @param {Array} array
 * @param {number} dims Required number of dimensions
 * @param {number} dim  Current dimension
 * @returns {Array | *} Returns the squeezed array
 * @private
 */


function _squeeze(array, dims, dim) {
  var i, ii;

  if (dim < dims) {
    var next = dim + 1;

    for (i = 0, ii = array.length; i < ii; i++) {
      array[i] = _squeeze(array[i], dims, next);
    }
  } else {
    while (Array.isArray(array)) {
      array = array[0];
    }
  }

  return array;
}
/**
 * Unsqueeze a multi dimensional array: add dimensions when missing
 *
 * Paramter `size` will be mutated to match the new, unqueezed matrix size.
 *
 * @param {Array} array
 * @param {number} dims       Desired number of dimensions of the array
 * @param {number} [outer]    Number of outer dimensions to be added
 * @param {Array} [arraySize] Current size of array.
 * @returns {Array} returns the array itself
 * @private
 */


function unsqueeze(array, dims, outer, arraySize) {
  var s = arraySize || size(array); // unsqueeze outer dimensions

  if (outer) {
    for (var i = 0; i < outer; i++) {
      array = [array];
      s.unshift(1);
    }
  } // unsqueeze inner dimensions


  array = _unsqueeze(array, dims, 0);

  while (s.length < dims) {
    s.push(1);
  }

  return array;
}
/**
 * Recursively unsqueeze a multi dimensional array
 * @param {Array} array
 * @param {number} dims Required number of dimensions
 * @param {number} dim  Current dimension
 * @returns {Array | *} Returns the squeezed array
 * @private
 */


function _unsqueeze(array, dims, dim) {
  var i, ii;

  if (Array.isArray(array)) {
    var next = dim + 1;

    for (i = 0, ii = array.length; i < ii; i++) {
      array[i] = _unsqueeze(array[i], dims, next);
    }
  } else {
    for (var d = dim; d < dims; d++) {
      array = [array];
    }
  }

  return array;
}
/**
 * Flatten a multi dimensional array, put all elements in a one dimensional
 * array
 * @param {Array} array   A multi dimensional array
 * @return {Array}        The flattened array (1 dimensional)
 */


function flatten(array) {
  if (!Array.isArray(array)) {
    // if not an array, return as is
    return array;
  }

  var flat = [];
  array.forEach(function callback(value) {
    if (Array.isArray(value)) {
      value.forEach(callback); // traverse through sub-arrays recursively
    } else {
      flat.push(value);
    }
  });
  return flat;
}
/**
 * A safe map
 * @param {Array} array
 * @param {function} callback
 */


function map(array, callback) {
  return Array.prototype.map.call(array, callback);
}
/**
 * A safe forEach
 * @param {Array} array
 * @param {function} callback
 */


function forEach(array, callback) {
  Array.prototype.forEach.call(array, callback);
}
/**
 * A safe filter
 * @param {Array} array
 * @param {function} callback
 */


function filter(array, callback) {
  if (size(array).length !== 1) {
    throw new Error('Only one dimensional matrices supported');
  }

  return Array.prototype.filter.call(array, callback);
}
/**
 * Filter values in a callback given a regular expression
 * @param {Array} array
 * @param {RegExp} regexp
 * @return {Array} Returns the filtered array
 * @private
 */


function filterRegExp(array, regexp) {
  if (size(array).length !== 1) {
    throw new Error('Only one dimensional matrices supported');
  }

  return Array.prototype.filter.call(array, function (entry) {
    return regexp.test(entry);
  });
}
/**
 * A safe join
 * @param {Array} array
 * @param {string} separator
 */


function join(array, separator) {
  return Array.prototype.join.call(array, separator);
}
/**
 * Assign a numeric identifier to every element of a sorted array
 * @param {Array} a  An array
 * @return {Array} An array of objects containing the original value and its identifier
 */


function identify(a) {
  if (!Array.isArray(a)) {
    throw new TypeError('Array input expected');
  }

  if (a.length === 0) {
    return a;
  }

  var b = [];
  var count = 0;
  b[0] = {
    value: a[0],
    identifier: 0
  };

  for (var i = 1; i < a.length; i++) {
    if (a[i] === a[i - 1]) {
      count++;
    } else {
      count = 0;
    }

    b.push({
      value: a[i],
      identifier: count
    });
  }

  return b;
}
/**
 * Remove the numeric identifier from the elements
 * @param {array} a  An array
 * @return {array} An array of values without identifiers
 */


function generalize(a) {
  if (!Array.isArray(a)) {
    throw new TypeError('Array input expected');
  }

  if (a.length === 0) {
    return a;
  }

  var b = [];

  for (var i = 0; i < a.length; i++) {
    b.push(a[i].value);
  }

  return b;
}
});

unwrapExports(array);
var array_1 = array.size;
var array_2 = array.validate;
var array_3 = array.validateIndex;
var array_4 = array.resize;
var array_5 = array.reshape;
var array_6 = array.squeeze;
var array_7 = array.unsqueeze;
var array_8 = array.flatten;
var array_9 = array.map;
var array_10 = array.forEach;
var array_11 = array.filter;
var array_12 = array.filterRegExp;
var array_13 = array.join;
var array_14 = array.identify;
var array_15 = array.generalize;

function factory$8(type, config, load, typed) {
  /**
   * Create a Matrix. The function creates a new `math.type.Matrix` object from
   * an `Array`. A Matrix has utility functions to manipulate the data in the
   * matrix, like getting the size and getting or setting values in the matrix.
   * Supported storage formats are 'dense' and 'sparse'.
   *
   * Syntax:
   *
   *    math.matrix()                         // creates an empty matrix using default storage format (dense).
   *    math.matrix(data)                     // creates a matrix with initial data using default storage format (dense).
   *    math.matrix('dense')                  // creates an empty matrix using the given storage format.
   *    math.matrix(data, 'dense')            // creates a matrix with initial data using the given storage format.
   *    math.matrix(data, 'sparse')           // creates a sparse matrix with initial data.
   *    math.matrix(data, 'sparse', 'number') // creates a sparse matrix with initial data, number data type.
   *
   * Examples:
   *
   *    let m = math.matrix([[1, 2], [3, 4]])
   *    m.size()                        // Array [2, 2]
   *    m.resize([3, 2], 5)
   *    m.valueOf()                     // Array [[1, 2], [3, 4], [5, 5]]
   *    m.get([1, 0])                    // number 3
   *
   * See also:
   *
   *    bignumber, boolean, complex, index, number, string, unit, sparse
   *
   * @param {Array | Matrix} [data]    A multi dimensional array
   * @param {string} [format]          The Matrix storage format
   *
   * @return {Matrix} The created matrix
   */
  var matrix = typed('matrix', {
    '': function _() {
      return _create([]);
    },
    'string': function string(format) {
      return _create([], format);
    },
    'string, string': function stringString(format, datatype) {
      return _create([], format, datatype);
    },
    'Array': function Array(data) {
      return _create(data);
    },
    'Matrix': function Matrix(data) {
      return _create(data, data.storage());
    },
    'Array | Matrix, string': _create,
    'Array | Matrix, string, string': _create
  });
  matrix.toTex = {
    0: '\\begin{bmatrix}\\end{bmatrix}',
    1: "\\left(${args[0]}\\right)",
    2: "\\left(${args[0]}\\right)"
  };
  return matrix;
  /**
   * Create a new Matrix with given storage format
   * @param {Array} data
   * @param {string} [format]
   * @param {string} [datatype]
   * @returns {Matrix} Returns a new Matrix
   * @private
   */

  function _create(data, format, datatype) {
    // get storage format constructor
    var M = type.Matrix.storage(format || 'default'); // create instance

    return new M(data, datatype);
  }
}

var name$8 = 'matrix';
var factory_1$8 = factory$8;

var matrix = {
	name: name$8,
	factory: factory_1$8
};

var clone = object.clone;

var validateIndex = array.validateIndex;

var getSafeProperty$1 = customs.getSafeProperty;

var setSafeProperty$1 = customs.setSafeProperty;



function factory$9(type, config, load, typed) {
  var matrix$1 = load(matrix);
  /**
   * Get or set a subset of a matrix or string.
   *
   * Syntax:
   *     math.subset(value, index)                                // retrieve a subset
   *     math.subset(value, index, replacement [, defaultValue])  // replace a subset
   *
   * Examples:
   *
   *     // get a subset
   *     const d = [[1, 2], [3, 4]]
   *     math.subset(d, math.index(1, 0))        // returns 3
   *     math.subset(d, math.index([0, 1], 1))   // returns [[2], [4]]
   *
   *     // replace a subset
   *     const e = []
   *     const f = math.subset(e, math.index(0, [0, 2]), [5, 6])  // f = [[5, 6]]
   *     const g = math.subset(f, math.index(1, 1), 7, 0)         // g = [[5, 6], [0, 7]]
   *
   * See also:
   *
   *     size, resize, squeeze, index
   *
   * @param {Array | Matrix | string} matrix  An array, matrix, or string
   * @param {Index} index                     An index containing ranges for each
   *                                          dimension
   * @param {*} [replacement]                 An array, matrix, or scalar.
   *                                          If provided, the subset is replaced with replacement.
   *                                          If not provided, the subset is returned
   * @param {*} [defaultValue=undefined]      Default value, filled in on new entries when
   *                                          the matrix is resized. If not provided,
   *                                          math.matrix elements will be left undefined.
   * @return {Array | Matrix | string} Either the retrieved subset or the updated matrix.
   */

  var subset = typed('subset', {
    // get subset
    'Array, Index': function ArrayIndex(value, index) {
      var m = matrix$1(value);
      var subset = m.subset(index); // returns a Matrix

      return index.isScalar() ? subset : subset.valueOf(); // return an Array (like the input)
    },
    'Matrix, Index': function MatrixIndex(value, index) {
      return value.subset(index);
    },
    'Object, Index': _getObjectProperty,
    'string, Index': _getSubstring,
    // set subset
    'Array, Index, any': function ArrayIndexAny(value, index, replacement) {
      return matrix$1(clone(value)).subset(index, replacement, undefined).valueOf();
    },
    'Array, Index, any, any': function ArrayIndexAnyAny(value, index, replacement, defaultValue) {
      return matrix$1(clone(value)).subset(index, replacement, defaultValue).valueOf();
    },
    'Matrix, Index, any': function MatrixIndexAny(value, index, replacement) {
      return value.clone().subset(index, replacement);
    },
    'Matrix, Index, any, any': function MatrixIndexAnyAny(value, index, replacement, defaultValue) {
      return value.clone().subset(index, replacement, defaultValue);
    },
    'string, Index, string': _setSubstring,
    'string, Index, string, string': _setSubstring,
    'Object, Index, any': _setObjectProperty
  });
  subset.toTex = undefined; // use default template

  return subset;
  /**
   * Retrieve a subset of a string
   * @param {string} str            string from which to get a substring
   * @param {Index} index           An index containing ranges for each dimension
   * @returns {string} substring
   * @private
   */

  function _getSubstring(str, index) {
    if (!type.isIndex(index)) {
      // TODO: better error message
      throw new TypeError('Index expected');
    }

    if (index.size().length !== 1) {
      throw new DimensionError_1(index.size().length, 1);
    } // validate whether the range is out of range


    var strLen = str.length;
    validateIndex(index.min()[0], strLen);
    validateIndex(index.max()[0], strLen);
    var range = index.dimension(0);
    var substr = '';
    range.forEach(function (v) {
      substr += str.charAt(v);
    });
    return substr;
  }
  /**
   * Replace a substring in a string
   * @param {string} str            string to be replaced
   * @param {Index} index           An index containing ranges for each dimension
   * @param {string} replacement    Replacement string
   * @param {string} [defaultValue] Default value to be uses when resizing
   *                                the string. is ' ' by default
   * @returns {string} result
   * @private
   */


  function _setSubstring(str, index, replacement, defaultValue) {
    if (!index || index.isIndex !== true) {
      // TODO: better error message
      throw new TypeError('Index expected');
    }

    if (index.size().length !== 1) {
      throw new DimensionError_1(index.size().length, 1);
    }

    if (defaultValue !== undefined) {
      if (typeof defaultValue !== 'string' || defaultValue.length !== 1) {
        throw new TypeError('Single character expected as defaultValue');
      }
    } else {
      defaultValue = ' ';
    }

    var range = index.dimension(0);
    var len = range.size()[0];

    if (len !== replacement.length) {
      throw new DimensionError_1(range.size()[0], replacement.length);
    } // validate whether the range is out of range


    var strLen = str.length;
    validateIndex(index.min()[0]);
    validateIndex(index.max()[0]); // copy the string into an array with characters

    var chars = [];

    for (var i = 0; i < strLen; i++) {
      chars[i] = str.charAt(i);
    }

    range.forEach(function (v, i) {
      chars[v] = replacement.charAt(i[0]);
    }); // initialize undefined characters with a space

    if (chars.length > strLen) {
      for (var _i = strLen - 1, _len = chars.length; _i < _len; _i++) {
        if (!chars[_i]) {
          chars[_i] = defaultValue;
        }
      }
    }

    return chars.join('');
  }
}
/**
 * Retrieve a property from an object
 * @param {Object} object
 * @param {Index} index
 * @return {*} Returns the value of the property
 * @private
 */


function _getObjectProperty(object, index) {
  if (index.size().length !== 1) {
    throw new DimensionError_1(index.size(), 1);
  }

  var key = index.dimension(0);

  if (typeof key !== 'string') {
    throw new TypeError('String expected as index to retrieve an object property');
  }

  return getSafeProperty$1(object, key);
}
/**
 * Set a property on an object
 * @param {Object} object
 * @param {Index} index
 * @param {*} replacement
 * @return {*} Returns the updated object
 * @private
 */


function _setObjectProperty(object, index, replacement) {
  if (index.size().length !== 1) {
    throw new DimensionError_1(index.size(), 1);
  }

  var key = index.dimension(0);

  if (typeof key !== 'string') {
    throw new TypeError('String expected as index to retrieve an object property');
  } // clone the object, and apply the property to the clone


  var updated = clone(object);
  setSafeProperty$1(updated, key, replacement);
  return updated;
}

var name$9 = 'subset';
var factory_1$9 = factory$9;

var subset = {
	name: name$9,
	factory: factory_1$9
};

function _typeof$5(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$5 = function _typeof(obj) { return typeof obj; }; } else { _typeof$5 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$5(obj); }

var errorTransform = error_transform.transform;

var getSafeProperty$2 = customs.getSafeProperty;

function factory$a(type, config, load, typed) {
  var subset$1 = load(subset);
  /**
   * Retrieve part of an object:
   *
   * - Retrieve a property from an object
   * - Retrieve a part of a string
   * - Retrieve a matrix subset
   *
   * @param {Object | Array | Matrix | string} object
   * @param {Index} index
   * @return {Object | Array | Matrix | string} Returns the subset
   */

  return function access(object, index) {
    try {
      if (Array.isArray(object)) {
        return subset$1(object, index);
      } else if (object && typeof object.subset === 'function') {
        // Matrix
        return object.subset(index);
      } else if (typeof object === 'string') {
        // TODO: move getStringSubset into a separate util file, use that
        return subset$1(object, index);
      } else if (_typeof$5(object) === 'object') {
        if (!index.isObjectProperty()) {
          throw new TypeError('Cannot apply a numeric index as object property');
        }

        return getSafeProperty$2(object, index.getObjectProperty());
      } else {
        throw new TypeError('Cannot apply index: unsupported type of object');
      }
    } catch (err) {
      throw errorTransform(err);
    }
  };
}

var factory_1$a = factory$a;

var access = {
	factory: factory_1$a
};

var getSafeProperty$3 = customs.getSafeProperty;

function factory$b(type, config, load, typed) {
  var Node$1 = load(Node);
  var access$1 = load(access);
  /**
   * @constructor AccessorNode
   * @extends {Node}
   * Access an object property or get a matrix subset
   *
   * @param {Node} object                 The object from which to retrieve
   *                                      a property or subset.
   * @param {IndexNode} index             IndexNode containing ranges
   */

  function AccessorNode(object, index) {
    if (!(this instanceof AccessorNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    if (!type.isNode(object)) {
      throw new TypeError('Node expected for parameter "object"');
    }

    if (!type.isIndexNode(index)) {
      throw new TypeError('IndexNode expected for parameter "index"');
    }

    this.object = object || null;
    this.index = index; // readonly property name

    Object.defineProperty(this, 'name', {
      get: function () {
        if (this.index) {
          return this.index.isObjectProperty() ? this.index.getObjectProperty() : '';
        } else {
          return this.object.name || '';
        }
      }.bind(this),
      set: function set() {
        throw new Error('Cannot assign a new name, name is read-only');
      }
    });
  }

  AccessorNode.prototype = new Node$1();
  AccessorNode.prototype.type = 'AccessorNode';
  AccessorNode.prototype.isAccessorNode = true;
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */

  AccessorNode.prototype._compile = function (math, argNames) {
    var evalObject = this.object._compile(math, argNames);

    var evalIndex = this.index._compile(math, argNames);

    if (this.index.isObjectProperty()) {
      var prop = this.index.getObjectProperty();
      return function evalAccessorNode(scope, args, context) {
        return getSafeProperty$3(evalObject(scope, args, context), prop);
      };
    } else {
      return function evalAccessorNode(scope, args, context) {
        var object = evalObject(scope, args, context);
        var index = evalIndex(scope, args, object); // we pass object here instead of context

        return access$1(object, index);
      };
    }
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  AccessorNode.prototype.forEach = function (callback) {
    callback(this.object, 'object', this);
    callback(this.index, 'index', this);
  };
  /**
   * Create a new AccessorNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {AccessorNode} Returns a transformed copy of the node
   */


  AccessorNode.prototype.map = function (callback) {
    return new AccessorNode(this._ifNode(callback(this.object, 'object', this)), this._ifNode(callback(this.index, 'index', this)));
  };
  /**
   * Create a clone of this node, a shallow copy
   * @return {AccessorNode}
   */


  AccessorNode.prototype.clone = function () {
    return new AccessorNode(this.object, this.index);
  };
  /**
   * Get string representation
   * @param {Object} options
   * @return {string}
   */


  AccessorNode.prototype._toString = function (options) {
    var object = this.object.toString(options);

    if (needParenthesis(this.object)) {
      object = '(' + object + ')';
    }

    return object + this.index.toString(options);
  };
  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string}
   */


  AccessorNode.prototype.toHTML = function (options) {
    var object = this.object.toHTML(options);

    if (needParenthesis(this.object)) {
      object = '<span class="math-parenthesis math-round-parenthesis">(</span>' + object + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }

    return object + this.index.toHTML(options);
  };
  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string}
   */


  AccessorNode.prototype._toTex = function (options) {
    var object = this.object.toTex(options);

    if (needParenthesis(this.object)) {
      object = "\\left(' + object + '\\right)";
    }

    return object + this.index.toTex(options);
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  AccessorNode.prototype.toJSON = function () {
    return {
      mathjs: 'AccessorNode',
      object: this.object,
      index: this.index
    };
  };
  /**
   * Instantiate an AccessorNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "AccessorNode", object: ..., index: ...}`,
   *                       where mathjs is optional
   * @returns {AccessorNode}
   */


  AccessorNode.fromJSON = function (json) {
    return new AccessorNode(json.object, json.index);
  };
  /**
   * Are parenthesis needed?
   * @private
   */


  function needParenthesis(node) {
    // TODO: maybe make a method on the nodes which tells whether they need parenthesis?
    return !(type.isAccessorNode(node) || type.isArrayNode(node) || type.isConstantNode(node) || type.isFunctionNode(node) || type.isObjectNode(node) || type.isParenthesisNode(node) || type.isSymbolNode(node));
  }

  return AccessorNode;
}

var name$a = 'AccessorNode';
var path$2 = 'expression.node';
var factory_1$b = factory$b;

var AccessorNode = {
	name: name$a,
	path: path$2,
	factory: factory_1$b
};

var map = array.map;

function factory$c(type, config, load, typed) {
  var Node$1 = load(Node);
  /**
   * @constructor ArrayNode
   * @extends {Node}
   * Holds an 1-dimensional array with items
   * @param {Node[]} [items]   1 dimensional array with items
   */

  function ArrayNode(items) {
    if (!(this instanceof ArrayNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    this.items = items || []; // validate input

    if (!Array.isArray(this.items) || !this.items.every(type.isNode)) {
      throw new TypeError('Array containing Nodes expected');
    } // TODO: deprecated since v3, remove some day


    var deprecated = function deprecated() {
      throw new Error('Property `ArrayNode.nodes` is deprecated, use `ArrayNode.items` instead');
    };

    Object.defineProperty(this, 'nodes', {
      get: deprecated,
      set: deprecated
    });
  }

  ArrayNode.prototype = new Node$1();
  ArrayNode.prototype.type = 'ArrayNode';
  ArrayNode.prototype.isArrayNode = true;
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */

  ArrayNode.prototype._compile = function (math, argNames) {
    var evalItems = map(this.items, function (item) {
      return item._compile(math, argNames);
    });
    var asMatrix = math.config().matrix !== 'Array';

    if (asMatrix) {
      var matrix = math.matrix;
      return function evalArrayNode(scope, args, context) {
        return matrix(map(evalItems, function (evalItem) {
          return evalItem(scope, args, context);
        }));
      };
    } else {
      return function evalArrayNode(scope, args, context) {
        return map(evalItems, function (evalItem) {
          return evalItem(scope, args, context);
        });
      };
    }
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  ArrayNode.prototype.forEach = function (callback) {
    for (var i = 0; i < this.items.length; i++) {
      var node = this.items[i];
      callback(node, 'items[' + i + ']', this);
    }
  };
  /**
   * Create a new ArrayNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {ArrayNode} Returns a transformed copy of the node
   */


  ArrayNode.prototype.map = function (callback) {
    var items = [];

    for (var i = 0; i < this.items.length; i++) {
      items[i] = this._ifNode(callback(this.items[i], 'items[' + i + ']', this));
    }

    return new ArrayNode(items);
  };
  /**
   * Create a clone of this node, a shallow copy
   * @return {ArrayNode}
   */


  ArrayNode.prototype.clone = function () {
    return new ArrayNode(this.items.slice(0));
  };
  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   * @override
   */


  ArrayNode.prototype._toString = function (options) {
    var items = this.items.map(function (node) {
      return node.toString(options);
    });
    return '[' + items.join(', ') + ']';
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  ArrayNode.prototype.toJSON = function () {
    return {
      mathjs: 'ArrayNode',
      items: this.items
    };
  };
  /**
   * Instantiate an ArrayNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "ArrayNode", items: [...]}`,
   *                       where mathjs is optional
   * @returns {ArrayNode}
   */


  ArrayNode.fromJSON = function (json) {
    return new ArrayNode(json.items);
  };
  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   * @override
   */


  ArrayNode.prototype.toHTML = function (options) {
    var items = this.items.map(function (node) {
      return node.toHTML(options);
    });
    return '<span class="math-parenthesis math-square-parenthesis">[</span>' + items.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>';
  };
  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */


  ArrayNode.prototype._toTex = function (options) {
    var s = '\\begin{bmatrix}';
    this.items.forEach(function (node) {
      if (node.items) {
        s += node.items.map(function (childNode) {
          return childNode.toTex(options);
        }).join('&');
      } else {
        s += node.toTex(options);
      } // new line


      s += '\\\\';
    });
    s += '\\end{bmatrix}';
    return s;
  };

  return ArrayNode;
}

var name$b = 'ArrayNode';
var path$3 = 'expression.node';
var factory_1$c = factory$c;

var ArrayNode = {
	name: name$b,
	path: path$3,
	factory: factory_1$c
};

function _typeof$6(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$6 = function _typeof(obj) { return typeof obj; }; } else { _typeof$6 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$6(obj); }

var errorTransform$1 = error_transform.transform;

var setSafeProperty$2 = customs.setSafeProperty;

function factory$d(type, config, load, typed) {
  var subset$1 = load(subset);
  var matrix$1 = load(matrix);
  /**
   * Replace part of an object:
   *
   * - Assign a property to an object
   * - Replace a part of a string
   * - Replace a matrix subset
   *
   * @param {Object | Array | Matrix | string} object
   * @param {Index} index
   * @param {*} value
   * @return {Object | Array | Matrix | string} Returns the original object
   *                                            except in case of a string
   */
  // TODO: change assign to return the value instead of the object

  return function assign(object, index, value) {
    try {
      if (Array.isArray(object)) {
        return matrix$1(object).subset(index, value).valueOf();
      } else if (object && typeof object.subset === 'function') {
        // Matrix
        return object.subset(index, value);
      } else if (typeof object === 'string') {
        // TODO: move setStringSubset into a separate util file, use that
        return subset$1(object, index, value);
      } else if (_typeof$6(object) === 'object') {
        if (!index.isObjectProperty()) {
          throw TypeError('Cannot apply a numeric index as object property');
        }

        setSafeProperty$2(object, index.getObjectProperty(), value);
        return object;
      } else {
        throw new TypeError('Cannot apply index: unsupported type of object');
      }
    } catch (err) {
      throw errorTransform$1(err);
    }
  };
}

var factory_1$d = factory$d;

var assign = {
	factory: factory_1$d
};

// also contains information about left/right associativity
// and which other operator the operator is associative with
// Example:
// addition is associative with addition and subtraction, because:
// (a+b)+c=a+(b+c)
// (a+b)-c=a+(b-c)
//
// postfix operators are left associative, prefix operators
// are right associative
//
// It's also possible to set the following properties:
// latexParens: if set to false, this node doesn't need to be enclosed
//              in parentheses when using LaTeX
// latexLeftParens: if set to false, this !OperatorNode's!
//                  left argument doesn't need to be enclosed
//                  in parentheses
// latexRightParens: the same for the right argument

var properties = [{
  // assignment
  'AssignmentNode': {},
  'FunctionAssignmentNode': {}
}, {
  // conditional expression
  'ConditionalNode': {
    latexLeftParens: false,
    latexRightParens: false,
    latexParens: false // conditionals don't need parentheses in LaTeX because
    // they are 2 dimensional

  }
}, {
  // logical or
  'OperatorNode:or': {
    associativity: 'left',
    associativeWith: []
  }
}, {
  // logical xor
  'OperatorNode:xor': {
    associativity: 'left',
    associativeWith: []
  }
}, {
  // logical and
  'OperatorNode:and': {
    associativity: 'left',
    associativeWith: []
  }
}, {
  // bitwise or
  'OperatorNode:bitOr': {
    associativity: 'left',
    associativeWith: []
  }
}, {
  // bitwise xor
  'OperatorNode:bitXor': {
    associativity: 'left',
    associativeWith: []
  }
}, {
  // bitwise and
  'OperatorNode:bitAnd': {
    associativity: 'left',
    associativeWith: []
  }
}, {
  // relational operators
  'OperatorNode:equal': {
    associativity: 'left',
    associativeWith: []
  },
  'OperatorNode:unequal': {
    associativity: 'left',
    associativeWith: []
  },
  'OperatorNode:smaller': {
    associativity: 'left',
    associativeWith: []
  },
  'OperatorNode:larger': {
    associativity: 'left',
    associativeWith: []
  },
  'OperatorNode:smallerEq': {
    associativity: 'left',
    associativeWith: []
  },
  'OperatorNode:largerEq': {
    associativity: 'left',
    associativeWith: []
  },
  'RelationalNode': {
    associativity: 'left',
    associativeWith: []
  }
}, {
  // bitshift operators
  'OperatorNode:leftShift': {
    associativity: 'left',
    associativeWith: []
  },
  'OperatorNode:rightArithShift': {
    associativity: 'left',
    associativeWith: []
  },
  'OperatorNode:rightLogShift': {
    associativity: 'left',
    associativeWith: []
  }
}, {
  // unit conversion
  'OperatorNode:to': {
    associativity: 'left',
    associativeWith: []
  }
}, {
  // range
  'RangeNode': {}
}, {
  // addition, subtraction
  'OperatorNode:add': {
    associativity: 'left',
    associativeWith: ['OperatorNode:add', 'OperatorNode:subtract']
  },
  'OperatorNode:subtract': {
    associativity: 'left',
    associativeWith: []
  }
}, {
  // multiply, divide, modulus
  'OperatorNode:multiply': {
    associativity: 'left',
    associativeWith: ['OperatorNode:multiply', 'OperatorNode:divide', 'Operator:dotMultiply', 'Operator:dotDivide']
  },
  'OperatorNode:divide': {
    associativity: 'left',
    associativeWith: [],
    latexLeftParens: false,
    latexRightParens: false,
    latexParens: false // fractions don't require parentheses because
    // they're 2 dimensional, so parens aren't needed
    // in LaTeX

  },
  'OperatorNode:dotMultiply': {
    associativity: 'left',
    associativeWith: ['OperatorNode:multiply', 'OperatorNode:divide', 'OperatorNode:dotMultiply', 'OperatorNode:doDivide']
  },
  'OperatorNode:dotDivide': {
    associativity: 'left',
    associativeWith: []
  },
  'OperatorNode:mod': {
    associativity: 'left',
    associativeWith: []
  }
}, {
  // unary prefix operators
  'OperatorNode:unaryPlus': {
    associativity: 'right'
  },
  'OperatorNode:unaryMinus': {
    associativity: 'right'
  },
  'OperatorNode:bitNot': {
    associativity: 'right'
  },
  'OperatorNode:not': {
    associativity: 'right'
  }
}, {
  // exponentiation
  'OperatorNode:pow': {
    associativity: 'right',
    associativeWith: [],
    latexRightParens: false // the exponent doesn't need parentheses in
    // LaTeX because it's 2 dimensional
    // (it's on top)

  },
  'OperatorNode:dotPow': {
    associativity: 'right',
    associativeWith: []
  }
}, {
  // factorial
  'OperatorNode:factorial': {
    associativity: 'left'
  }
}, {
  // matrix transpose
  'OperatorNode:transpose': {
    associativity: 'left'
  }
}];
/**
 * Get the precedence of a Node.
 * Higher number for higher precedence, starting with 0.
 * Returns null if the precedence is undefined.
 *
 * @param {Node}
 * @param {string} parenthesis
 * @return {number|null}
 */

function getPrecedence(_node, parenthesis) {
  var node = _node;

  if (parenthesis !== 'keep') {
    // ParenthesisNodes are only ignored when not in 'keep' mode
    node = _node.getContent();
  }

  var identifier = node.getIdentifier();

  for (var i = 0; i < properties.length; i++) {
    if (identifier in properties[i]) {
      return i;
    }
  }

  return null;
}
/**
 * Get the associativity of an operator (left or right).
 * Returns a string containing 'left' or 'right' or null if
 * the associativity is not defined.
 *
 * @param {Node}
 * @param {string} parenthesis
 * @return {string|null}
 * @throws {Error}
 */


function getAssociativity(_node, parenthesis) {
  var node = _node;

  if (parenthesis !== 'keep') {
    // ParenthesisNodes are only ignored when not in 'keep' mode
    node = _node.getContent();
  }

  var identifier = node.getIdentifier();
  var index = getPrecedence(node, parenthesis);

  if (index === null) {
    // node isn't in the list
    return null;
  }

  var property = properties[index][identifier];

  if (property.hasOwnProperty('associativity')) {
    if (property.associativity === 'left') {
      return 'left';
    }

    if (property.associativity === 'right') {
      return 'right';
    } // associativity is invalid


    throw Error('\'' + identifier + '\' has the invalid associativity \'' + property.associativity + '\'.');
  } // associativity is undefined


  return null;
}
/**
 * Check if an operator is associative with another operator.
 * Returns either true or false or null if not defined.
 *
 * @param {Node} nodeA
 * @param {Node} nodeB
 * @param {string} parenthesis
 * @return {bool|null}
 */


function isAssociativeWith(nodeA, nodeB, parenthesis) {
  // ParenthesisNodes are only ignored when not in 'keep' mode
  var a = parenthesis !== 'keep' ? nodeA.getContent() : nodeA;
  var b = parenthesis !== 'keep' ? nodeA.getContent() : nodeB;
  var identifierA = a.getIdentifier();
  var identifierB = b.getIdentifier();
  var index = getPrecedence(a, parenthesis);

  if (index === null) {
    // node isn't in the list
    return null;
  }

  var property = properties[index][identifierA];

  if (property.hasOwnProperty('associativeWith') && property.associativeWith instanceof Array) {
    for (var i = 0; i < property.associativeWith.length; i++) {
      if (property.associativeWith[i] === identifierB) {
        return true;
      }
    }

    return false;
  } // associativeWith is not defined


  return null;
}

var properties_1 = properties;
var getPrecedence_1 = getPrecedence;
var getAssociativity_1 = getAssociativity;
var isAssociativeWith_1 = isAssociativeWith;

var operators = {
	properties: properties_1,
	getPrecedence: getPrecedence_1,
	getAssociativity: getAssociativity_1,
	isAssociativeWith: isAssociativeWith_1
};

var getSafeProperty$4 = customs.getSafeProperty;

var setSafeProperty$3 = customs.setSafeProperty;

function factory$e(type, config, load, typed) {
  var Node$1 = load(Node);
  var assign$1 = load(assign);
  var access$1 = load(access);

  var operators$1 = operators;
  /**
   * @constructor AssignmentNode
   * @extends {Node}
   *
   * Define a symbol, like `a=3.2`, update a property like `a.b=3.2`, or
   * replace a subset of a matrix like `A[2,2]=42`.
   *
   * Syntax:
   *
   *     new AssignmentNode(symbol, value)
   *     new AssignmentNode(object, index, value)
   *
   * Usage:
   *
   *    new AssignmentNode(new SymbolNode('a'), new ConstantNode(2))                       // a=2
   *    new AssignmentNode(new SymbolNode('a'), new IndexNode('b'), new ConstantNode(2))   // a.b=2
   *    new AssignmentNode(new SymbolNode('a'), new IndexNode(1, 2), new ConstantNode(3))  // a[1,2]=3
   *
   * @param {SymbolNode | AccessorNode} object  Object on which to assign a value
   * @param {IndexNode} [index=null]            Index, property name or matrix
   *                                            index. Optional. If not provided
   *                                            and `object` is a SymbolNode,
   *                                            the property is assigned to the
   *                                            global scope.
   * @param {Node} value                        The value to be assigned
   */


  function AssignmentNode(object, index, value) {
    if (!(this instanceof AssignmentNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    this.object = object;
    this.index = value ? index : null;
    this.value = value || index; // validate input

    if (!type.isSymbolNode(object) && !type.isAccessorNode(object)) {
      throw new TypeError('SymbolNode or AccessorNode expected as "object"');
    }

    if (type.isSymbolNode(object) && object.name === 'end') {
      throw new Error('Cannot assign to symbol "end"');
    }

    if (this.index && !type.isIndexNode(this.index)) {
      // index is optional
      throw new TypeError('IndexNode expected as "index"');
    }

    if (!type.isNode(this.value)) {
      throw new TypeError('Node expected as "value"');
    } // readonly property name


    Object.defineProperty(this, 'name', {
      get: function () {
        if (this.index) {
          return this.index.isObjectProperty() ? this.index.getObjectProperty() : '';
        } else {
          return this.object.name || '';
        }
      }.bind(this),
      set: function set() {
        throw new Error('Cannot assign a new name, name is read-only');
      }
    });
  }

  AssignmentNode.prototype = new Node$1();
  AssignmentNode.prototype.type = 'AssignmentNode';
  AssignmentNode.prototype.isAssignmentNode = true;
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */

  AssignmentNode.prototype._compile = function (math, argNames) {
    var evalObject = this.object._compile(math, argNames);

    var evalIndex = this.index ? this.index._compile(math, argNames) : null;

    var evalValue = this.value._compile(math, argNames);

    var name = this.object.name;

    if (!this.index) {
      // apply a variable to the scope, for example `a=2`
      if (!type.isSymbolNode(this.object)) {
        throw new TypeError('SymbolNode expected as object');
      }

      return function evalAssignmentNode(scope, args, context) {
        return setSafeProperty$3(scope, name, evalValue(scope, args, context));
      };
    } else if (this.index.isObjectProperty()) {
      // apply an object property for example `a.b=2`
      var prop = this.index.getObjectProperty();
      return function evalAssignmentNode(scope, args, context) {
        var object = evalObject(scope, args, context);
        var value = evalValue(scope, args, context);
        return setSafeProperty$3(object, prop, value);
      };
    } else if (type.isSymbolNode(this.object)) {
      // update a matrix subset, for example `a[2]=3`
      return function evalAssignmentNode(scope, args, context) {
        var childObject = evalObject(scope, args, context);
        var value = evalValue(scope, args, context);
        var index = evalIndex(scope, args, childObject); // Important:  we pass childObject instead of context

        setSafeProperty$3(scope, name, assign$1(childObject, index, value));
        return value;
      };
    } else {
      // type.isAccessorNode(node.object) === true
      // update a matrix subset, for example `a.b[2]=3`
      // we will not use the compile function of the AccessorNode, but compile it
      // ourselves here as we need the parent object of the AccessorNode:
      // wee need to apply the updated object to parent object
      var evalParentObject = this.object.object._compile(math, argNames);

      if (this.object.index.isObjectProperty()) {
        var parentProp = this.object.index.getObjectProperty();
        return function evalAssignmentNode(scope, args, context) {
          var parent = evalParentObject(scope, args, context);
          var childObject = getSafeProperty$4(parent, parentProp);
          var index = evalIndex(scope, args, childObject); // Important: we pass childObject instead of context

          var value = evalValue(scope, args, context);
          setSafeProperty$3(parent, parentProp, assign$1(childObject, index, value));
          return value;
        };
      } else {
        // if some parameters use the 'end' parameter, we need to calculate the size
        var evalParentIndex = this.object.index._compile(math, argNames);

        return function evalAssignmentNode(scope, args, context) {
          var parent = evalParentObject(scope, args, context);
          var parentIndex = evalParentIndex(scope, args, parent); // Important: we pass parent instead of context

          var childObject = access$1(parent, parentIndex);
          var index = evalIndex(scope, args, childObject); // Important:  we pass childObject instead of context

          var value = evalValue(scope, args, context);
          assign$1(parent, parentIndex, assign$1(childObject, index, value));
          return value;
        };
      }
    }
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  AssignmentNode.prototype.forEach = function (callback) {
    callback(this.object, 'object', this);

    if (this.index) {
      callback(this.index, 'index', this);
    }

    callback(this.value, 'value', this);
  };
  /**
   * Create a new AssignmentNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {AssignmentNode} Returns a transformed copy of the node
   */


  AssignmentNode.prototype.map = function (callback) {
    var object = this._ifNode(callback(this.object, 'object', this));

    var index = this.index ? this._ifNode(callback(this.index, 'index', this)) : null;

    var value = this._ifNode(callback(this.value, 'value', this));

    return new AssignmentNode(object, index, value);
  };
  /**
   * Create a clone of this node, a shallow copy
   * @return {AssignmentNode}
   */


  AssignmentNode.prototype.clone = function () {
    return new AssignmentNode(this.object, this.index, this.value);
  };
  /*
   * Is parenthesis needed?
   * @param {node} node
   * @param {string} [parenthesis='keep']
   * @private
   */


  function needParenthesis(node, parenthesis) {
    if (!parenthesis) {
      parenthesis = 'keep';
    }

    var precedence = operators$1.getPrecedence(node, parenthesis);
    var exprPrecedence = operators$1.getPrecedence(node.value, parenthesis);
    return parenthesis === 'all' || exprPrecedence !== null && exprPrecedence <= precedence;
  }
  /**
   * Get string representation
   * @param {Object} options
   * @return {string}
   */


  AssignmentNode.prototype._toString = function (options) {
    var object = this.object.toString(options);
    var index = this.index ? this.index.toString(options) : '';
    var value = this.value.toString(options);

    if (needParenthesis(this, options && options.parenthesis)) {
      value = '(' + value + ')';
    }

    return object + index + ' = ' + value;
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  AssignmentNode.prototype.toJSON = function () {
    return {
      mathjs: 'AssignmentNode',
      object: this.object,
      index: this.index,
      value: this.value
    };
  };
  /**
   * Instantiate an AssignmentNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "AssignmentNode", object: ..., index: ..., value: ...}`,
   *                       where mathjs is optional
   * @returns {AssignmentNode}
   */


  AssignmentNode.fromJSON = function (json) {
    return new AssignmentNode(json.object, json.index, json.value);
  };
  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string}
   */


  AssignmentNode.prototype.toHTML = function (options) {
    var object = this.object.toHTML(options);
    var index = this.index ? this.index.toHTML(options) : '';
    var value = this.value.toHTML(options);

    if (needParenthesis(this, options && options.parenthesis)) {
      value = '<span class="math-paranthesis math-round-parenthesis">(</span>' + value + '<span class="math-paranthesis math-round-parenthesis">)</span>';
    }

    return object + index + '<span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + value;
  };
  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string}
   */


  AssignmentNode.prototype._toTex = function (options) {
    var object = this.object.toTex(options);
    var index = this.index ? this.index.toTex(options) : '';
    var value = this.value.toTex(options);

    if (needParenthesis(this, options && options.parenthesis)) {
      value = "\\left(".concat(value, "\\right)");
    }

    return object + index + ':=' + value;
  };

  return AssignmentNode;
}

var name$c = 'AssignmentNode';
var path$4 = 'expression.node';
var factory_1$e = factory$e;

var AssignmentNode = {
	name: name$c,
	path: path$4,
	factory: factory_1$e
};

function factory$f(type, config, load, typed) {
  /**
   * A ResultSet contains a list or results
   * @class ResultSet
   * @param {Array} entries
   * @constructor ResultSet
   */
  function ResultSet(entries) {
    if (!(this instanceof ResultSet)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    this.entries = entries || [];
  }
  /**
   * Attach type information
   */


  ResultSet.prototype.type = 'ResultSet';
  ResultSet.prototype.isResultSet = true;
  /**
   * Returns the array with results hold by this ResultSet
   * @memberof ResultSet
   * @returns {Array} entries
   */

  ResultSet.prototype.valueOf = function () {
    return this.entries;
  };
  /**
   * Returns the stringified results of the ResultSet
   * @memberof ResultSet
   * @returns {string} string
   */


  ResultSet.prototype.toString = function () {
    return '[' + this.entries.join(', ') + ']';
  };
  /**
   * Get a JSON representation of the ResultSet
   * @memberof ResultSet
   * @returns {Object} Returns a JSON object structured as:
   *                   `{"mathjs": "ResultSet", "entries": [...]}`
   */


  ResultSet.prototype.toJSON = function () {
    return {
      mathjs: 'ResultSet',
      entries: this.entries
    };
  };
  /**
   * Instantiate a ResultSet from a JSON object
   * @memberof ResultSet
   * @param {Object} json  A JSON object structured as:
   *                       `{"mathjs": "ResultSet", "entries": [...]}`
   * @return {ResultSet}
   */


  ResultSet.fromJSON = function (json) {
    return new ResultSet(json.entries);
  };

  return ResultSet;
}

var name$d = 'ResultSet';
var path$5 = 'type';
var factory_1$f = factory$f;

var ResultSet = {
	name: name$d,
	path: path$5,
	factory: factory_1$f
};

var forEach = array.forEach;

var map$1 = array.map;

function factory$g(type, config, load, typed) {
  var Node$1 = load(Node);
  var ResultSet$1 = load(ResultSet);
  /**
   * @constructor BlockNode
   * @extends {Node}
   * Holds a set with blocks
   * @param {Array.<{node: Node} | {node: Node, visible: boolean}>} blocks
   *            An array with blocks, where a block is constructed as an Object
   *            with properties block, which is a Node, and visible, which is
   *            a boolean. The property visible is optional and is true by default
   */

  function BlockNode(blocks) {
    if (!(this instanceof BlockNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    } // validate input, copy blocks


    if (!Array.isArray(blocks)) throw new Error('Array expected');
    this.blocks = blocks.map(function (block) {
      var node = block && block.node;
      var visible = block && block.visible !== undefined ? block.visible : true;
      if (!type.isNode(node)) throw new TypeError('Property "node" must be a Node');
      if (typeof visible !== 'boolean') throw new TypeError('Property "visible" must be a boolean');
      return {
        node: node,
        visible: visible
      };
    });
  }

  BlockNode.prototype = new Node$1();
  BlockNode.prototype.type = 'BlockNode';
  BlockNode.prototype.isBlockNode = true;
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */

  BlockNode.prototype._compile = function (math, argNames) {
    var evalBlocks = map$1(this.blocks, function (block) {
      return {
        eval: block.node._compile(math, argNames),
        visible: block.visible
      };
    });
    return function evalBlockNodes(scope, args, context) {
      var results = [];
      forEach(evalBlocks, function evalBlockNode(block) {
        var result = block.eval(scope, args, context);

        if (block.visible) {
          results.push(result);
        }
      });
      return new ResultSet$1(results);
    };
  };
  /**
   * Execute a callback for each of the child blocks of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  BlockNode.prototype.forEach = function (callback) {
    for (var i = 0; i < this.blocks.length; i++) {
      callback(this.blocks[i].node, 'blocks[' + i + '].node', this);
    }
  };
  /**
   * Create a new BlockNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {BlockNode} Returns a transformed copy of the node
   */


  BlockNode.prototype.map = function (callback) {
    var blocks = [];

    for (var i = 0; i < this.blocks.length; i++) {
      var block = this.blocks[i];

      var node = this._ifNode(callback(block.node, 'blocks[' + i + '].node', this));

      blocks[i] = {
        node: node,
        visible: block.visible
      };
    }

    return new BlockNode(blocks);
  };
  /**
   * Create a clone of this node, a shallow copy
   * @return {BlockNode}
   */


  BlockNode.prototype.clone = function () {
    var blocks = this.blocks.map(function (block) {
      return {
        node: block.node,
        visible: block.visible
      };
    });
    return new BlockNode(blocks);
  };
  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   * @override
   */


  BlockNode.prototype._toString = function (options) {
    return this.blocks.map(function (param) {
      return param.node.toString(options) + (param.visible ? '' : ';');
    }).join('\n');
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  BlockNode.prototype.toJSON = function () {
    return {
      mathjs: 'BlockNode',
      blocks: this.blocks
    };
  };
  /**
   * Instantiate an BlockNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "BlockNode", blocks: [{node: ..., visible: false}, ...]}`,
   *                       where mathjs is optional
   * @returns {BlockNode}
   */


  BlockNode.fromJSON = function (json) {
    return new BlockNode(json.blocks);
  };
  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   * @override
   */


  BlockNode.prototype.toHTML = function (options) {
    return this.blocks.map(function (param) {
      return param.node.toHTML(options) + (param.visible ? '' : '<span class="math-separator">;</span>');
    }).join('<span class="math-separator"><br /></span>');
  };
  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */


  BlockNode.prototype._toTex = function (options) {
    return this.blocks.map(function (param) {
      return param.node.toTex(options) + (param.visible ? '' : ';');
    }).join('\\;\\;\n');
  };

  return BlockNode;
}

var name$e = 'BlockNode';
var path$6 = 'expression.node';
var factory_1$g = factory$g;

var BlockNode = {
	name: name$e,
	path: path$6,
	factory: factory_1$g
};

function factory$h(type, config, load, typed) {
  var Node$1 = load(Node);
  var mathTypeOf = load(_typeof$2);
  /**
   * A lazy evaluating conditional operator: 'condition ? trueExpr : falseExpr'
   *
   * @param {Node} condition   Condition, must result in a boolean
   * @param {Node} trueExpr    Expression evaluated when condition is true
   * @param {Node} falseExpr   Expression evaluated when condition is true
   *
   * @constructor ConditionalNode
   * @extends {Node}
   */

  function ConditionalNode(condition, trueExpr, falseExpr) {
    if (!(this instanceof ConditionalNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    if (!type.isNode(condition)) throw new TypeError('Parameter condition must be a Node');
    if (!type.isNode(trueExpr)) throw new TypeError('Parameter trueExpr must be a Node');
    if (!type.isNode(falseExpr)) throw new TypeError('Parameter falseExpr must be a Node');
    this.condition = condition;
    this.trueExpr = trueExpr;
    this.falseExpr = falseExpr;
  }

  ConditionalNode.prototype = new Node$1();
  ConditionalNode.prototype.type = 'ConditionalNode';
  ConditionalNode.prototype.isConditionalNode = true;
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */

  ConditionalNode.prototype._compile = function (math, argNames) {
    var evalCondition = this.condition._compile(math, argNames);

    var evalTrueExpr = this.trueExpr._compile(math, argNames);

    var evalFalseExpr = this.falseExpr._compile(math, argNames);

    return function evalConditionalNode(scope, args, context) {
      return testCondition(evalCondition(scope, args, context)) ? evalTrueExpr(scope, args, context) : evalFalseExpr(scope, args, context);
    };
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  ConditionalNode.prototype.forEach = function (callback) {
    callback(this.condition, 'condition', this);
    callback(this.trueExpr, 'trueExpr', this);
    callback(this.falseExpr, 'falseExpr', this);
  };
  /**
   * Create a new ConditionalNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {ConditionalNode} Returns a transformed copy of the node
   */


  ConditionalNode.prototype.map = function (callback) {
    return new ConditionalNode(this._ifNode(callback(this.condition, 'condition', this)), this._ifNode(callback(this.trueExpr, 'trueExpr', this)), this._ifNode(callback(this.falseExpr, 'falseExpr', this)));
  };
  /**
   * Create a clone of this node, a shallow copy
   * @return {ConditionalNode}
   */


  ConditionalNode.prototype.clone = function () {
    return new ConditionalNode(this.condition, this.trueExpr, this.falseExpr);
  };
  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   */


  ConditionalNode.prototype._toString = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var precedence = operators.getPrecedence(this, parenthesis); // Enclose Arguments in parentheses if they are an OperatorNode
    // or have lower or equal precedence
    // NOTE: enclosing all OperatorNodes in parentheses is a decision
    // purely based on aesthetics and readability

    var condition = this.condition.toString(options);
    var conditionPrecedence = operators.getPrecedence(this.condition, parenthesis);

    if (parenthesis === 'all' || this.condition.type === 'OperatorNode' || conditionPrecedence !== null && conditionPrecedence <= precedence) {
      condition = '(' + condition + ')';
    }

    var trueExpr = this.trueExpr.toString(options);
    var truePrecedence = operators.getPrecedence(this.trueExpr, parenthesis);

    if (parenthesis === 'all' || this.trueExpr.type === 'OperatorNode' || truePrecedence !== null && truePrecedence <= precedence) {
      trueExpr = '(' + trueExpr + ')';
    }

    var falseExpr = this.falseExpr.toString(options);
    var falsePrecedence = operators.getPrecedence(this.falseExpr, parenthesis);

    if (parenthesis === 'all' || this.falseExpr.type === 'OperatorNode' || falsePrecedence !== null && falsePrecedence <= precedence) {
      falseExpr = '(' + falseExpr + ')';
    }

    return condition + ' ? ' + trueExpr + ' : ' + falseExpr;
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  ConditionalNode.prototype.toJSON = function () {
    return {
      mathjs: 'ConditionalNode',
      condition: this.condition,
      trueExpr: this.trueExpr,
      falseExpr: this.falseExpr
    };
  };
  /**
   * Instantiate an ConditionalNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "ConditionalNode", "condition": ..., "trueExpr": ..., "falseExpr": ...}`,
   *                       where mathjs is optional
   * @returns {ConditionalNode}
   */


  ConditionalNode.fromJSON = function (json) {
    return new ConditionalNode(json.condition, json.trueExpr, json.falseExpr);
  };
  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   */


  ConditionalNode.prototype.toHTML = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var precedence = operators.getPrecedence(this, parenthesis); // Enclose Arguments in parentheses if they are an OperatorNode
    // or have lower or equal precedence
    // NOTE: enclosing all OperatorNodes in parentheses is a decision
    // purely based on aesthetics and readability

    var condition = this.condition.toHTML(options);
    var conditionPrecedence = operators.getPrecedence(this.condition, parenthesis);

    if (parenthesis === 'all' || this.condition.type === 'OperatorNode' || conditionPrecedence !== null && conditionPrecedence <= precedence) {
      condition = '<span class="math-parenthesis math-round-parenthesis">(</span>' + condition + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }

    var trueExpr = this.trueExpr.toHTML(options);
    var truePrecedence = operators.getPrecedence(this.trueExpr, parenthesis);

    if (parenthesis === 'all' || this.trueExpr.type === 'OperatorNode' || truePrecedence !== null && truePrecedence <= precedence) {
      trueExpr = '<span class="math-parenthesis math-round-parenthesis">(</span>' + trueExpr + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }

    var falseExpr = this.falseExpr.toHTML(options);
    var falsePrecedence = operators.getPrecedence(this.falseExpr, parenthesis);

    if (parenthesis === 'all' || this.falseExpr.type === 'OperatorNode' || falsePrecedence !== null && falsePrecedence <= precedence) {
      falseExpr = '<span class="math-parenthesis math-round-parenthesis">(</span>' + falseExpr + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }

    return condition + '<span class="math-operator math-conditional-operator">?</span>' + trueExpr + '<span class="math-operator math-conditional-operator">:</span>' + falseExpr;
  };
  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */


  ConditionalNode.prototype._toTex = function (options) {
    return '\\begin{cases} {' + this.trueExpr.toTex(options) + '}, &\\quad{\\text{if }\\;' + this.condition.toTex(options) + '}\\\\{' + this.falseExpr.toTex(options) + '}, &\\quad{\\text{otherwise}}\\end{cases}';
  };
  /**
   * Test whether a condition is met
   * @param {*} condition
   * @returns {boolean} true if condition is true or non-zero, else false
   */


  function testCondition(condition) {
    if (typeof condition === 'number' || typeof condition === 'boolean' || typeof condition === 'string') {
      return !!condition;
    }

    if (condition) {
      if (type.isBigNumber(condition)) {
        return !condition.isZero();
      }

      if (type.isComplex(condition)) {
        return !!(condition.re || condition.im);
      }

      if (type.isUnit(condition)) {
        return !!condition.value;
      }
    }

    if (condition === null || condition === undefined) {
      return false;
    }

    throw new TypeError('Unsupported type of condition "' + mathTypeOf(condition) + '"');
  }

  return ConditionalNode;
}

var name$f = 'ConditionalNode';
var path$7 = 'expression.node';
var factory_1$h = factory$h;

var ConditionalNode = {
	name: name$f,
	path: path$7,
	factory: factory_1$h
};

// Map the characters to escape to their escaped values. The list is derived
// from http://www.cespedes.org/blog/85/how-to-escape-latex-special-characters

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultEscapes = {
  "{": "\\{",
  "}": "\\}",
  "\\": "\\textbackslash{}",
  "#": "\\#",
  $: "\\$",
  "%": "\\%",
  "&": "\\&",
  "^": "\\textasciicircum{}",
  _: "\\_",
  "~": "\\textasciitilde{}"
};
var formatEscapes = {
  "\u2013": "\\--",
  "\u2014": "\\---",
  " ": "~",
  "\t": "\\qquad{}",
  "\r\n": "\\newline{}",
  "\n": "\\newline{}"
};

var defaultEscapeMapFn = function defaultEscapeMapFn(defaultEscapes, formatEscapes) {
  return _extends({}, defaultEscapes, formatEscapes);
};

/**
 * Escape a string to be used in LaTeX documents.
 * @param {string} str the string to be escaped.
 * @param {boolean} params.preserveFormatting whether formatting escapes should
 *  be performed (default: false).
 * @param {function} params.escapeMapFn the function to modify the escape maps.
 * @return {string} the escaped string, ready to be used in LaTeX.
 */
var dist = function (str) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$preserveFormatti = _ref.preserveFormatting,
      preserveFormatting = _ref$preserveFormatti === undefined ? false : _ref$preserveFormatti,
      _ref$escapeMapFn = _ref.escapeMapFn,
      escapeMapFn = _ref$escapeMapFn === undefined ? defaultEscapeMapFn : _ref$escapeMapFn;

  var runningStr = String(str);
  var result = "";

  var escapes = escapeMapFn(_extends({}, defaultEscapes), preserveFormatting ? _extends({}, formatEscapes) : {});
  var escapeKeys = Object.keys(escapes); // as it is reused later on

  // Algorithm: Go through the string character by character, if it matches
  // with one of the special characters then we'll replace it with the escaped
  // version.

  var _loop = function _loop() {
    var specialCharFound = false;
    escapeKeys.forEach(function (key, index) {
      if (specialCharFound) {
        return;
      }
      if (runningStr.length >= key.length && runningStr.slice(0, key.length) === key) {
        result += escapes[escapeKeys[index]];
        runningStr = runningStr.slice(key.length, runningStr.length);
        specialCharFound = true;
      }
    });
    if (!specialCharFound) {
      result += runningStr.slice(0, 1);
      runningStr = runningStr.slice(1, runningStr.length);
    }
  };

  while (runningStr) {
    _loop();
  }
  return result;
};

var latex = createCommonjsModule(function (module, exports) {



exports.symbols = {
  // GREEK LETTERS
  Alpha: 'A',
  alpha: '\\alpha',
  Beta: 'B',
  beta: '\\beta',
  Gamma: '\\Gamma',
  gamma: '\\gamma',
  Delta: '\\Delta',
  delta: '\\delta',
  Epsilon: 'E',
  epsilon: '\\epsilon',
  varepsilon: '\\varepsilon',
  Zeta: 'Z',
  zeta: '\\zeta',
  Eta: 'H',
  eta: '\\eta',
  Theta: '\\Theta',
  theta: '\\theta',
  vartheta: '\\vartheta',
  Iota: 'I',
  iota: '\\iota',
  Kappa: 'K',
  kappa: '\\kappa',
  varkappa: '\\varkappa',
  Lambda: '\\Lambda',
  lambda: '\\lambda',
  Mu: 'M',
  mu: '\\mu',
  Nu: 'N',
  nu: '\\nu',
  Xi: '\\Xi',
  xi: '\\xi',
  Omicron: 'O',
  omicron: 'o',
  Pi: '\\Pi',
  pi: '\\pi',
  varpi: '\\varpi',
  Rho: 'P',
  rho: '\\rho',
  varrho: '\\varrho',
  Sigma: '\\Sigma',
  sigma: '\\sigma',
  varsigma: '\\varsigma',
  Tau: 'T',
  tau: '\\tau',
  Upsilon: "\\Upsilon",
  upsilon: "\\upsilon",
  Phi: '\\Phi',
  phi: '\\phi',
  varphi: '\\varphi',
  Chi: 'X',
  chi: '\\chi',
  Psi: '\\Psi',
  psi: '\\psi',
  Omega: '\\Omega',
  omega: '\\omega',
  // logic
  'true': '\\mathrm{True}',
  'false': '\\mathrm{False}',
  // other
  i: 'i',
  // TODO use \i ??
  inf: '\\infty',
  Inf: '\\infty',
  infinity: '\\infty',
  Infinity: '\\infty',
  oo: '\\infty',
  lim: '\\lim',
  'undefined': '\\mathbf{?}'
};
exports.operators = {
  'transpose': '^\\top',
  'ctranspose': '^H',
  'factorial': '!',
  'pow': '^',
  'dotPow': '.^\\wedge',
  // TODO find ideal solution
  'unaryPlus': '+',
  'unaryMinus': '-',
  'bitNot': '\\~',
  // TODO find ideal solution
  'not': '\\neg',
  'multiply': '\\cdot',
  'divide': '\\frac',
  // TODO how to handle that properly?
  'dotMultiply': '.\\cdot',
  // TODO find ideal solution
  'dotDivide': '.:',
  // TODO find ideal solution
  'mod': '\\mod',
  'add': '+',
  'subtract': '-',
  'to': '\\rightarrow',
  'leftShift': '<<',
  'rightArithShift': '>>',
  'rightLogShift': '>>>',
  'equal': '=',
  'unequal': '\\neq',
  'smaller': '<',
  'larger': '>',
  'smallerEq': '\\leq',
  'largerEq': '\\geq',
  'bitAnd': '\\&',
  'bitXor': "\\underline{|}",
  'bitOr': '|',
  'and': '\\wedge',
  'xor': '\\veebar',
  'or': '\\vee'
};
exports.defaultTemplate = "\\mathrm{${name}}\\left(${args}\\right)";
var units = {
  deg: '^\\circ'
};

exports.escape = function (string) {
  return dist(string, {
    'preserveFormatting': true
  });
}; // @param {string} name
// @param {boolean} isUnit


exports.toSymbol = function (name, isUnit) {
  isUnit = typeof isUnit === 'undefined' ? false : isUnit;

  if (isUnit) {
    if (units.hasOwnProperty(name)) {
      return units[name];
    }

    return '\\mathrm{' + exports.escape(name) + '}';
  }

  if (exports.symbols.hasOwnProperty(name)) {
    return exports.symbols[name];
  }

  return exports.escape(name);
};
});
var latex_1 = latex.symbols;
var latex_2 = latex.operators;
var latex_3 = latex.defaultTemplate;
var latex_4 = latex.escape;
var latex_5 = latex.toSymbol;

var format = string.format;

var escapeLatex = latex.escape;

function factory$i(type, config, load, typed) {
  var Node$1 = load(Node);
  var getType = load(_typeof$2);
  /**
   * A ConstantNode holds a constant value like a number or string.
   *
   * Usage:
   *
   *     new ConstantNode(2.3)
   *     new ConstantNode('hello')
   *
   * @param {*} value    Value can be any type (number, BigNumber, string, ...)
   * @constructor ConstantNode
   * @extends {Node}
   */

  function ConstantNode(value) {
    if (!(this instanceof ConstantNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    if (arguments.length === 2) {
      // TODO: remove deprecation error some day (created 2018-01-23)
      throw new SyntaxError('new ConstantNode(valueStr, valueType) is not supported anymore since math v4.0.0. Use new ConstantNode(value) instead, where value is a non-stringified value.');
    }

    this.value = value;
  }

  ConstantNode.prototype = new Node$1();
  ConstantNode.prototype.type = 'ConstantNode';
  ConstantNode.prototype.isConstantNode = true;
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */

  ConstantNode.prototype._compile = function (math, argNames) {
    var value = this.value;
    return function evalConstantNode() {
      return value;
    };
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  ConstantNode.prototype.forEach = function (callback) {} // nothing to do, we don't have childs

  /**
   * Create a new ConstantNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node) : Node} callback
   * @returns {ConstantNode} Returns a clone of the node
   */
  ;

  ConstantNode.prototype.map = function (callback) {
    return this.clone();
  };
  /**
   * Create a clone of this node, a shallow copy
   * @return {ConstantNode}
   */


  ConstantNode.prototype.clone = function () {
    return new ConstantNode(this.value);
  };
  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   */


  ConstantNode.prototype._toString = function (options) {
    return format(this.value, options);
  };
  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   */


  ConstantNode.prototype.toHTML = function (options) {
    var value = this._toString(options);

    switch (getType(this.value)) {
      case 'number':
      case 'BigNumber':
      case 'Fraction':
        return '<span class="math-number">' + value + '</span>';

      case 'string':
        return '<span class="math-string">' + value + '</span>';

      case 'boolean':
        return '<span class="math-boolean">' + value + '</span>';

      case 'null':
        return '<span class="math-null-symbol">' + value + '</span>';

      case 'undefined':
        return '<span class="math-undefined">' + value + '</span>';

      default:
        return '<span class="math-symbol">' + value + '</span>';
    }
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  ConstantNode.prototype.toJSON = function () {
    return {
      mathjs: 'ConstantNode',
      value: this.value
    };
  };
  /**
   * Instantiate a ConstantNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "SymbolNode", value: 2.3}`,
   *                       where mathjs is optional
   * @returns {ConstantNode}
   */


  ConstantNode.fromJSON = function (json) {
    return new ConstantNode(json.value);
  };
  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */


  ConstantNode.prototype._toTex = function (options) {
    var value = this._toString(options);

    switch (getType(this.value)) {
      case 'string':
        return '\\mathtt{' + escapeLatex(value) + '}';

      case 'number':
      case 'BigNumber':
        var index = value.toLowerCase().indexOf('e');

        if (index !== -1) {
          return value.substring(0, index) + '\\cdot10^{' + value.substring(index + 1) + '}';
        }

        return value;

      case 'Fraction':
        return this.value.toLatex();

      default:
        return value;
    }
  };

  return ConstantNode;
}

var name$g = 'ConstantNode';
var path$8 = 'expression.node';
var factory_1$i = factory$i;

var ConstantNode = {
	name: name$g,
	path: path$8,
	factory: factory_1$i
};

var escape = string.escape;

var forEach$1 = array.forEach;

var join = array.join;





var setSafeProperty$4 = customs.setSafeProperty;

function factory$j(type, config, load, typed) {
  var Node$1 = load(Node);
  /**
   * @constructor FunctionAssignmentNode
   * @extends {Node}
   * Function assignment
   *
   * @param {string} name           Function name
   * @param {string[] | Array.<{name: string, type: string}>} params
   *                                Array with function parameter names, or an
   *                                array with objects containing the name
   *                                and type of the parameter
   * @param {Node} expr             The function expression
   */

  function FunctionAssignmentNode(name, params, expr) {
    if (!(this instanceof FunctionAssignmentNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    } // validate input


    if (typeof name !== 'string') throw new TypeError('String expected for parameter "name"');
    if (!Array.isArray(params)) throw new TypeError('Array containing strings or objects expected for parameter "params"');
    if (!type.isNode(expr)) throw new TypeError('Node expected for parameter "expr"');
    if (name in keywords) throw new Error('Illegal function name, "' + name + '" is a reserved keyword');
    this.name = name;
    this.params = params.map(function (param) {
      return param && param.name || param;
    });
    this.types = params.map(function (param) {
      return param && param.type || 'any';
    });
    this.expr = expr;
  }

  FunctionAssignmentNode.prototype = new Node$1();
  FunctionAssignmentNode.prototype.type = 'FunctionAssignmentNode';
  FunctionAssignmentNode.prototype.isFunctionAssignmentNode = true;
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */

  FunctionAssignmentNode.prototype._compile = function (math, argNames) {
    var childArgNames = Object.create(argNames);
    forEach$1(this.params, function (param) {
      childArgNames[param] = true;
    }); // compile the function expression with the child args

    var evalExpr = this.expr._compile(math, childArgNames);

    var name = this.name;
    var params = this.params;
    var signature = join(this.types, ',');
    var syntax = name + '(' + join(this.params, ', ') + ')';
    return function evalFunctionAssignmentNode(scope, args, context) {
      var signatures = {};

      signatures[signature] = function () {
        var childArgs = Object.create(args);

        for (var i = 0; i < params.length; i++) {
          childArgs[params[i]] = arguments[i];
        }

        return evalExpr(scope, childArgs, context);
      };

      var fn = typed(name, signatures);
      fn.syntax = syntax;
      setSafeProperty$4(scope, name, fn);
      return fn;
    };
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  FunctionAssignmentNode.prototype.forEach = function (callback) {
    callback(this.expr, 'expr', this);
  };
  /**
   * Create a new FunctionAssignmentNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {FunctionAssignmentNode} Returns a transformed copy of the node
   */


  FunctionAssignmentNode.prototype.map = function (callback) {
    var expr = this._ifNode(callback(this.expr, 'expr', this));

    return new FunctionAssignmentNode(this.name, this.params.slice(0), expr);
  };
  /**
   * Create a clone of this node, a shallow copy
   * @return {FunctionAssignmentNode}
   */


  FunctionAssignmentNode.prototype.clone = function () {
    return new FunctionAssignmentNode(this.name, this.params.slice(0), this.expr);
  };
  /**
   * Is parenthesis needed?
   * @param {Node} node
   * @param {Object} parenthesis
   * @private
   */


  function needParenthesis(node, parenthesis) {
    var precedence = operators.getPrecedence(node, parenthesis);
    var exprPrecedence = operators.getPrecedence(node.expr, parenthesis);
    return parenthesis === 'all' || exprPrecedence !== null && exprPrecedence <= precedence;
  }
  /**
   * get string representation
   * @param {Object} options
   * @return {string} str
   */


  FunctionAssignmentNode.prototype._toString = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var expr = this.expr.toString(options);

    if (needParenthesis(this, parenthesis)) {
      expr = '(' + expr + ')';
    }

    return this.name + '(' + this.params.join(', ') + ') = ' + expr;
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  FunctionAssignmentNode.prototype.toJSON = function () {
    var types = this.types;
    return {
      mathjs: 'FunctionAssignmentNode',
      name: this.name,
      params: this.params.map(function (param, index) {
        return {
          name: param,
          type: types[index]
        };
      }),
      expr: this.expr
    };
  };
  /**
   * Instantiate an FunctionAssignmentNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "FunctionAssignmentNode", name: ..., params: ..., expr: ...}`,
   *                       where mathjs is optional
   * @returns {FunctionAssignmentNode}
   */


  FunctionAssignmentNode.fromJSON = function (json) {
    return new FunctionAssignmentNode(json.name, json.params, json.expr);
  };
  /**
   * get HTML representation
   * @param {Object} options
   * @return {string} str
   */


  FunctionAssignmentNode.prototype.toHTML = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var params = [];

    for (var i = 0; i < this.params.length; i++) {
      params.push('<span class="math-symbol math-parameter">' + escape(this.params[i]) + '</span>');
    }

    var expr = this.expr.toHTML(options);

    if (needParenthesis(this, parenthesis)) {
      expr = '<span class="math-parenthesis math-round-parenthesis">(</span>' + expr + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }

    return '<span class="math-function">' + escape(this.name) + '</span>' + '<span class="math-parenthesis math-round-parenthesis">(</span>' + params.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + expr;
  };
  /**
   * get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */


  FunctionAssignmentNode.prototype._toTex = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var expr = this.expr.toTex(options);

    if (needParenthesis(this, parenthesis)) {
      expr = "\\left(".concat(expr, "\\right)");
    }

    return '\\mathrm{' + this.name + '}\\left(' + this.params.map(latex.toSymbol).join(',') + '\\right):=' + expr;
  };

  return FunctionAssignmentNode;
}

var name$h = 'FunctionAssignmentNode';
var path$9 = 'expression.node';
var factory_1$j = factory$j;

var FunctionAssignmentNode = {
	name: name$h,
	path: path$9,
	factory: factory_1$j
};

function factory$k(type, config, load, typed) {
  /**
   * Create a range. A range has a start, step, and end, and contains functions
   * to iterate over the range.
   *
   * A range can be constructed as:
   *
   *     const range = new Range(start, end)
   *     const range = new Range(start, end, step)
   *
   * To get the result of the range:
   *     range.forEach(function (x) {
   *         console.log(x)
   *     })
   *     range.map(function (x) {
   *         return math.sin(x)
   *     })
   *     range.toArray()
   *
   * Example usage:
   *
   *     const c = new Range(2, 6)       // 2:1:5
   *     c.toArray()                     // [2, 3, 4, 5]
   *     const d = new Range(2, -3, -1)  // 2:-1:-2
   *     d.toArray()                     // [2, 1, 0, -1, -2]
   *
   * @class Range
   * @constructor Range
   * @param {number} start  included lower bound
   * @param {number} end    excluded upper bound
   * @param {number} [step] step size, default value is 1
   */
  function Range(start, end, step) {
    if (!(this instanceof Range)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    var hasStart = start !== null && start !== undefined;
    var hasEnd = end !== null && end !== undefined;
    var hasStep = step !== null && step !== undefined;

    if (hasStart) {
      if (type.isBigNumber(start)) {
        start = start.toNumber();
      } else if (typeof start !== 'number') {
        throw new TypeError('Parameter start must be a number');
      }
    }

    if (hasEnd) {
      if (type.isBigNumber(end)) {
        end = end.toNumber();
      } else if (typeof end !== 'number') {
        throw new TypeError('Parameter end must be a number');
      }
    }

    if (hasStep) {
      if (type.isBigNumber(step)) {
        step = step.toNumber();
      } else if (typeof step !== 'number') {
        throw new TypeError('Parameter step must be a number');
      }
    }

    this.start = hasStart ? parseFloat(start) : 0;
    this.end = hasEnd ? parseFloat(end) : 0;
    this.step = hasStep ? parseFloat(step) : 1;
  }
  /**
   * Attach type information
   */


  Range.prototype.type = 'Range';
  Range.prototype.isRange = true;
  /**
   * Parse a string into a range,
   * The string contains the start, optional step, and end, separated by a colon.
   * If the string does not contain a valid range, null is returned.
   * For example str='0:2:11'.
   * @memberof Range
   * @param {string} str
   * @return {Range | null} range
   */

  Range.parse = function (str) {
    if (typeof str !== 'string') {
      return null;
    }

    var args = str.split(':');
    var nums = args.map(function (arg) {
      return parseFloat(arg);
    });
    var invalid = nums.some(function (num) {
      return isNaN(num);
    });

    if (invalid) {
      return null;
    }

    switch (nums.length) {
      case 2:
        return new Range(nums[0], nums[1]);

      case 3:
        return new Range(nums[0], nums[2], nums[1]);

      default:
        return null;
    }
  };
  /**
   * Create a clone of the range
   * @return {Range} clone
   */


  Range.prototype.clone = function () {
    return new Range(this.start, this.end, this.step);
  };
  /**
   * Retrieve the size of the range.
   * Returns an array containing one number, the number of elements in the range.
   * @memberof Range
   * @returns {number[]} size
   */


  Range.prototype.size = function () {
    var len = 0;
    var start = this.start;
    var step = this.step;
    var end = this.end;
    var diff = end - start;

    if (number.sign(step) === number.sign(diff)) {
      len = Math.ceil(diff / step);
    } else if (diff === 0) {
      len = 0;
    }

    if (isNaN(len)) {
      len = 0;
    }

    return [len];
  };
  /**
   * Calculate the minimum value in the range
   * @memberof Range
   * @return {number | undefined} min
   */


  Range.prototype.min = function () {
    var size = this.size()[0];

    if (size > 0) {
      if (this.step > 0) {
        // positive step
        return this.start;
      } else {
        // negative step
        return this.start + (size - 1) * this.step;
      }
    } else {
      return undefined;
    }
  };
  /**
   * Calculate the maximum value in the range
   * @memberof Range
   * @return {number | undefined} max
   */


  Range.prototype.max = function () {
    var size = this.size()[0];

    if (size > 0) {
      if (this.step > 0) {
        // positive step
        return this.start + (size - 1) * this.step;
      } else {
        // negative step
        return this.start;
      }
    } else {
      return undefined;
    }
  };
  /**
   * Execute a callback function for each value in the range.
   * @memberof Range
   * @param {function} callback   The callback method is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Range being traversed.
   */


  Range.prototype.forEach = function (callback) {
    var x = this.start;
    var step = this.step;
    var end = this.end;
    var i = 0;

    if (step > 0) {
      while (x < end) {
        callback(x, [i], this);
        x += step;
        i++;
      }
    } else if (step < 0) {
      while (x > end) {
        callback(x, [i], this);
        x += step;
        i++;
      }
    }
  };
  /**
   * Execute a callback function for each value in the Range, and return the
   * results as an array
   * @memberof Range
   * @param {function} callback   The callback method is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Matrix being traversed.
   * @returns {Array} array
   */


  Range.prototype.map = function (callback) {
    var array = [];
    this.forEach(function (value, index, obj) {
      array[index[0]] = callback(value, index, obj);
    });
    return array;
  };
  /**
   * Create an Array with a copy of the Ranges data
   * @memberof Range
   * @returns {Array} array
   */


  Range.prototype.toArray = function () {
    var array = [];
    this.forEach(function (value, index) {
      array[index[0]] = value;
    });
    return array;
  };
  /**
   * Get the primitive value of the Range, a one dimensional array
   * @memberof Range
   * @returns {Array} array
   */


  Range.prototype.valueOf = function () {
    // TODO: implement a caching mechanism for range.valueOf()
    return this.toArray();
  };
  /**
   * Get a string representation of the range, with optional formatting options.
   * Output is formatted as 'start:step:end', for example '2:6' or '0:0.2:11'
   * @memberof Range
   * @param {Object | number | function} [options]  Formatting options. See
   *                                                lib/utils/number:format for a
   *                                                description of the available
   *                                                options.
   * @returns {string} str
   */


  Range.prototype.format = function (options) {
    var str = number.format(this.start, options);

    if (this.step !== 1) {
      str += ':' + number.format(this.step, options);
    }

    str += ':' + number.format(this.end, options);
    return str;
  };
  /**
   * Get a string representation of the range.
   * @memberof Range
   * @returns {string}
   */


  Range.prototype.toString = function () {
    return this.format();
  };
  /**
   * Get a JSON representation of the range
   * @memberof Range
   * @returns {Object} Returns a JSON object structured as:
   *                   `{"mathjs": "Range", "start": 2, "end": 4, "step": 1}`
   */


  Range.prototype.toJSON = function () {
    return {
      mathjs: 'Range',
      start: this.start,
      end: this.end,
      step: this.step
    };
  };
  /**
   * Instantiate a Range from a JSON object
   * @memberof Range
   * @param {Object} json A JSON object structured as:
   *                      `{"mathjs": "Range", "start": 2, "end": 4, "step": 1}`
   * @return {Range}
   */


  Range.fromJSON = function (json) {
    return new Range(json.start, json.end, json.step);
  };

  return Range;
}

var name$i = 'Range';
var path$a = 'type';
var factory_1$k = factory$k;

var Range = {
	name: name$i,
	path: path$a,
	factory: factory_1$k
};

var map$2 = array.map;

var escape$1 = string.escape;

function factory$l(type, config, load, typed) {
  var Node$1 = load(Node);
  var Range$1 = load(Range);
  var isArray = Array.isArray;
  /**
   * @constructor IndexNode
   * @extends Node
   *
   * Describes a subset of a matrix or an object property.
   * Cannot be used on its own, needs to be used within an AccessorNode or
   * AssignmentNode.
   *
   * @param {Node[]} dimensions
   * @param {boolean} [dotNotation=false]  Optional property describing whether
   *                                       this index was written using dot
   *                                       notation like `a.b`, or using bracket
   *                                       notation like `a["b"]` (default).
   *                                       Used to stringify an IndexNode.
   */

  function IndexNode(dimensions, dotNotation) {
    if (!(this instanceof IndexNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    this.dimensions = dimensions;
    this.dotNotation = dotNotation || false; // validate input

    if (!isArray(dimensions) || !dimensions.every(type.isNode)) {
      throw new TypeError('Array containing Nodes expected for parameter "dimensions"');
    }

    if (this.dotNotation && !this.isObjectProperty()) {
      throw new Error('dotNotation only applicable for object properties');
    } // TODO: deprecated since v3, remove some day


    var deprecated = function deprecated() {
      throw new Error('Property `IndexNode.object` is deprecated, use `IndexNode.fn` instead');
    };

    Object.defineProperty(this, 'object', {
      get: deprecated,
      set: deprecated
    });
  }

  IndexNode.prototype = new Node$1();
  IndexNode.prototype.type = 'IndexNode';
  IndexNode.prototype.isIndexNode = true;
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */

  IndexNode.prototype._compile = function (math, argNames) {
    // TODO: implement support for bignumber (currently bignumbers are silently
    //       reduced to numbers when changing the value to zero-based)
    // TODO: Optimization: when the range values are ConstantNodes,
    //       we can beforehand resolve the zero-based value
    // optimization for a simple object property
    var evalDimensions = map$2(this.dimensions, function (range, i) {
      if (type.isRangeNode(range)) {
        if (range.needsEnd()) {
          // create a range containing end (like '4:end')
          var childArgNames = Object.create(argNames);
          childArgNames['end'] = true;

          var evalStart = range.start._compile(math, childArgNames);

          var evalEnd = range.end._compile(math, childArgNames);

          var evalStep = range.step ? range.step._compile(math, childArgNames) : function () {
            return 1;
          };
          return function evalDimension(scope, args, context) {
            var size = math.size(context).valueOf();
            var childArgs = Object.create(args);
            childArgs['end'] = size[i];
            return createRange(evalStart(scope, childArgs, context), evalEnd(scope, childArgs, context), evalStep(scope, childArgs, context));
          };
        } else {
          // create range
          var _evalStart = range.start._compile(math, argNames);

          var _evalEnd = range.end._compile(math, argNames);

          var _evalStep = range.step ? range.step._compile(math, argNames) : function () {
            return 1;
          };

          return function evalDimension(scope, args, context) {
            return createRange(_evalStart(scope, args, context), _evalEnd(scope, args, context), _evalStep(scope, args, context));
          };
        }
      } else if (type.isSymbolNode(range) && range.name === 'end') {
        // SymbolNode 'end'
        var _childArgNames = Object.create(argNames);

        _childArgNames['end'] = true;

        var evalRange = range._compile(math, _childArgNames);

        return function evalDimension(scope, args, context) {
          var size = math.size(context).valueOf();
          var childArgs = Object.create(args);
          childArgs['end'] = size[i];
          return evalRange(scope, childArgs, context);
        };
      } else {
        // ConstantNode
        var _evalRange = range._compile(math, argNames);

        return function evalDimension(scope, args, context) {
          return _evalRange(scope, args, context);
        };
      }
    });
    return function evalIndexNode(scope, args, context) {
      var dimensions = map$2(evalDimensions, function (evalDimension) {
        return evalDimension(scope, args, context);
      });
      return math.index.apply(math, dimensions);
    };
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  IndexNode.prototype.forEach = function (callback) {
    for (var i = 0; i < this.dimensions.length; i++) {
      callback(this.dimensions[i], 'dimensions[' + i + ']', this);
    }
  };
  /**
   * Create a new IndexNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {IndexNode} Returns a transformed copy of the node
   */


  IndexNode.prototype.map = function (callback) {
    var dimensions = [];

    for (var i = 0; i < this.dimensions.length; i++) {
      dimensions[i] = this._ifNode(callback(this.dimensions[i], 'dimensions[' + i + ']', this));
    }

    return new IndexNode(dimensions);
  };
  /**
   * Create a clone of this node, a shallow copy
   * @return {IndexNode}
   */


  IndexNode.prototype.clone = function () {
    return new IndexNode(this.dimensions.slice(0));
  };
  /**
   * Test whether this IndexNode contains a single property name
   * @return {boolean}
   */


  IndexNode.prototype.isObjectProperty = function () {
    return this.dimensions.length === 1 && type.isConstantNode(this.dimensions[0]) && typeof this.dimensions[0].value === 'string';
  };
  /**
   * Returns the property name if IndexNode contains a property.
   * If not, returns null.
   * @return {string | null}
   */


  IndexNode.prototype.getObjectProperty = function () {
    return this.isObjectProperty() ? this.dimensions[0].value : null;
  };
  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   */


  IndexNode.prototype._toString = function (options) {
    // format the parameters like "[1, 0:5]"
    return this.dotNotation ? '.' + this.getObjectProperty() : '[' + this.dimensions.join(', ') + ']';
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  IndexNode.prototype.toJSON = function () {
    return {
      mathjs: 'IndexNode',
      dimensions: this.dimensions,
      dotNotation: this.dotNotation
    };
  };
  /**
   * Instantiate an IndexNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "IndexNode", dimensions: [...], dotNotation: false}`,
   *                       where mathjs is optional
   * @returns {IndexNode}
   */


  IndexNode.fromJSON = function (json) {
    return new IndexNode(json.dimensions, json.dotNotation);
  };
  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   */


  IndexNode.prototype.toHTML = function (options) {
    // format the parameters like "[1, 0:5]"
    var dimensions = [];

    for (var i = 0; i < this.dimensions.length; i++) {
      dimensions[i] = this.dimensions[i].toHTML();
    }

    if (this.dotNotation) {
      return '<span class="math-operator math-accessor-operator">.</span>' + '<span class="math-symbol math-property">' + escape$1(this.getObjectProperty()) + '</span>';
    } else {
      return '<span class="math-parenthesis math-square-parenthesis">[</span>' + dimensions.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>';
    }
  };
  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */


  IndexNode.prototype._toTex = function (options) {
    var dimensions = this.dimensions.map(function (range) {
      return range.toTex(options);
    });
    return this.dotNotation ? '.' + this.getObjectProperty() + '' : '_{' + dimensions.join(',') + '}';
  }; // helper function to create a Range from start, step and end


  function createRange(start, end, step) {
    return new Range$1(type.isBigNumber(start) ? start.toNumber() : start, type.isBigNumber(end) ? end.toNumber() : end, type.isBigNumber(step) ? step.toNumber() : step);
  }

  return IndexNode;
}

var name$j = 'IndexNode';
var path$b = 'expression.node';
var factory_1$l = factory$l;

var IndexNode = {
	name: name$j,
	path: path$b,
	factory: factory_1$l
};

function _typeof$7(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$7 = function _typeof(obj) { return typeof obj; }; } else { _typeof$7 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$7(obj); }

var stringify = string.stringify;

var escape$2 = string.escape;

var isSafeProperty$1 = customs.isSafeProperty;

var hasOwnProperty$2 = object.hasOwnProperty;

function factory$m(type, config, load, typed) {
  var Node$1 = load(Node);
  /**
   * @constructor ObjectNode
   * @extends {Node}
   * Holds an object with keys/values
   * @param {Object.<string, Node>} [properties]   object with key/value pairs
   */

  function ObjectNode(properties) {
    if (!(this instanceof ObjectNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    this.properties = properties || {}; // validate input

    if (properties) {
      if (!(_typeof$7(properties) === 'object') || !Object.keys(properties).every(function (key) {
        return type.isNode(properties[key]);
      })) {
        throw new TypeError('Object containing Nodes expected');
      }
    }
  }

  ObjectNode.prototype = new Node$1();
  ObjectNode.prototype.type = 'ObjectNode';
  ObjectNode.prototype.isObjectNode = true;
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */

  ObjectNode.prototype._compile = function (math, argNames) {
    var evalEntries = {};

    for (var key in this.properties) {
      if (hasOwnProperty$2(this.properties, key)) {
        // we stringify/parse the key here to resolve unicode characters,
        // so you cannot create a key like {"co\\u006Estructor": null}
        var stringifiedKey = stringify(key);
        var parsedKey = JSON.parse(stringifiedKey);

        if (!isSafeProperty$1(this.properties, parsedKey)) {
          throw new Error('No access to property "' + parsedKey + '"');
        }

        evalEntries[parsedKey] = this.properties[key]._compile(math, argNames);
      }
    }

    return function evalObjectNode(scope, args, context) {
      var obj = {};

      for (var _key in evalEntries) {
        if (hasOwnProperty$2(evalEntries, _key)) {
          obj[_key] = evalEntries[_key](scope, args, context);
        }
      }

      return obj;
    };
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  ObjectNode.prototype.forEach = function (callback) {
    for (var key in this.properties) {
      if (this.properties.hasOwnProperty(key)) {
        callback(this.properties[key], 'properties[' + stringify(key) + ']', this);
      }
    }
  };
  /**
   * Create a new ObjectNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {ObjectNode} Returns a transformed copy of the node
   */


  ObjectNode.prototype.map = function (callback) {
    var properties = {};

    for (var key in this.properties) {
      if (this.properties.hasOwnProperty(key)) {
        properties[key] = this._ifNode(callback(this.properties[key], 'properties[' + stringify(key) + ']', this));
      }
    }

    return new ObjectNode(properties);
  };
  /**
   * Create a clone of this node, a shallow copy
   * @return {ObjectNode}
   */


  ObjectNode.prototype.clone = function () {
    var properties = {};

    for (var key in this.properties) {
      if (this.properties.hasOwnProperty(key)) {
        properties[key] = this.properties[key];
      }
    }

    return new ObjectNode(properties);
  };
  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   * @override
   */


  ObjectNode.prototype._toString = function (options) {
    var entries = [];

    for (var key in this.properties) {
      if (this.properties.hasOwnProperty(key)) {
        entries.push(stringify(key) + ': ' + this.properties[key].toString(options));
      }
    }

    return '{' + entries.join(', ') + '}';
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  ObjectNode.prototype.toJSON = function () {
    return {
      mathjs: 'ObjectNode',
      properties: this.properties
    };
  };
  /**
   * Instantiate an OperatorNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "ObjectNode", "properties": {...}}`,
   *                       where mathjs is optional
   * @returns {ObjectNode}
   */


  ObjectNode.fromJSON = function (json) {
    return new ObjectNode(json.properties);
  };
  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   * @override
   */


  ObjectNode.prototype.toHTML = function (options) {
    var entries = [];

    for (var key in this.properties) {
      if (this.properties.hasOwnProperty(key)) {
        entries.push('<span class="math-symbol math-property">' + escape$2(key) + '</span>' + '<span class="math-operator math-assignment-operator math-property-assignment-operator math-binary-operator">:</span>' + this.properties[key].toHTML(options));
      }
    }

    return '<span class="math-parenthesis math-curly-parenthesis">{</span>' + entries.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-curly-parenthesis">}</span>';
  };
  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */


  ObjectNode.prototype._toTex = function (options) {
    var entries = [];

    for (var key in this.properties) {
      if (this.properties.hasOwnProperty(key)) {
        entries.push('\\mathbf{' + key + ':} & ' + this.properties[key].toTex(options) + '\\\\');
      }
    }

    return "\\left\\{\\begin{array}{ll}".concat(entries.join('\n'), "\\end{array}\\right\\}");
  };

  return ObjectNode;
}

var name$k = 'ObjectNode';
var path$c = 'expression.node';
var factory_1$m = factory$m;

var ObjectNode = {
	name: name$k,
	path: path$c,
	factory: factory_1$m
};

var map$3 = array.map;

var escape$3 = string.escape;

var isSafeMethod$1 = customs.isSafeMethod;

var getSafeProperty$5 = customs.getSafeProperty;



function factory$n(type, config, load, typed) {
  var Node$1 = load(Node);
  /**
   * @constructor OperatorNode
   * @extends {Node}
   * An operator with two arguments, like 2+3
   *
   * @param {string} op           Operator name, for example '+'
   * @param {string} fn           Function name, for example 'add'
   * @param {Node[]} args         Operator arguments
   * @param {boolean} [implicit]  Is this an implicit multiplication?
   */

  function OperatorNode(op, fn, args, implicit) {
    if (!(this instanceof OperatorNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    } // validate input


    if (typeof op !== 'string') {
      throw new TypeError('string expected for parameter "op"');
    }

    if (typeof fn !== 'string') {
      throw new TypeError('string expected for parameter "fn"');
    }

    if (!Array.isArray(args) || !args.every(type.isNode)) {
      throw new TypeError('Array containing Nodes expected for parameter "args"');
    }

    this.implicit = implicit === true;
    this.op = op;
    this.fn = fn;
    this.args = args || [];
  }

  OperatorNode.prototype = new Node$1();
  OperatorNode.prototype.type = 'OperatorNode';
  OperatorNode.prototype.isOperatorNode = true;
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */

  OperatorNode.prototype._compile = function (math, argNames) {
    // validate fn
    if (typeof this.fn !== 'string' || !isSafeMethod$1(math, this.fn)) {
      if (!math[this.fn]) {
        throw new Error('Function ' + this.fn + ' missing in provided namespace "math"');
      } else {
        throw new Error('No access to function "' + this.fn + '"');
      }
    }

    var fn = getSafeProperty$5(math, this.fn);
    var evalArgs = map$3(this.args, function (arg) {
      return arg._compile(math, argNames);
    });

    if (evalArgs.length === 1) {
      var evalArg0 = evalArgs[0];
      return function evalOperatorNode(scope, args, context) {
        return fn(evalArg0(scope, args, context));
      };
    } else if (evalArgs.length === 2) {
      var _evalArg = evalArgs[0];
      var evalArg1 = evalArgs[1];
      return function evalOperatorNode(scope, args, context) {
        return fn(_evalArg(scope, args, context), evalArg1(scope, args, context));
      };
    } else {
      return function evalOperatorNode(scope, args, context) {
        return fn.apply(null, map$3(evalArgs, function (evalArg) {
          return evalArg(scope, args, context);
        }));
      };
    }
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  OperatorNode.prototype.forEach = function (callback) {
    for (var i = 0; i < this.args.length; i++) {
      callback(this.args[i], 'args[' + i + ']', this);
    }
  };
  /**
   * Create a new OperatorNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {OperatorNode} Returns a transformed copy of the node
   */


  OperatorNode.prototype.map = function (callback) {
    var args = [];

    for (var i = 0; i < this.args.length; i++) {
      args[i] = this._ifNode(callback(this.args[i], 'args[' + i + ']', this));
    }

    return new OperatorNode(this.op, this.fn, args, this.implicit);
  };
  /**
   * Create a clone of this node, a shallow copy
   * @return {OperatorNode}
   */


  OperatorNode.prototype.clone = function () {
    return new OperatorNode(this.op, this.fn, this.args.slice(0), this.implicit);
  };
  /**
   * Check whether this is an unary OperatorNode:
   * has exactly one argument, like `-a`.
   * @return {boolean} Returns true when an unary operator node, false otherwise.
   */


  OperatorNode.prototype.isUnary = function () {
    return this.args.length === 1;
  };
  /**
   * Check whether this is a binary OperatorNode:
   * has exactly two arguments, like `a + b`.
   * @return {boolean} Returns true when a binary operator node, false otherwise.
   */


  OperatorNode.prototype.isBinary = function () {
    return this.args.length === 2;
  };
  /**
   * Calculate which parentheses are necessary. Gets an OperatorNode
   * (which is the root of the tree) and an Array of Nodes
   * (this.args) and returns an array where 'true' means that an argument
   * has to be enclosed in parentheses whereas 'false' means the opposite.
   *
   * @param {OperatorNode} root
   * @param {string} parenthesis
   * @param {Node[]} args
   * @param {boolean} latex
   * @return {boolean[]}
   * @private
   */


  function calculateNecessaryParentheses(root, parenthesis, implicit, args, latex) {
    // precedence of the root OperatorNode
    var precedence = operators.getPrecedence(root, parenthesis);
    var associativity = operators.getAssociativity(root, parenthesis);

    if (parenthesis === 'all' || args.length > 2 && root.getIdentifier() !== 'OperatorNode:add' && root.getIdentifier() !== 'OperatorNode:multiply') {
      var parens = args.map(function (arg) {
        switch (arg.getContent().type) {
          // Nodes that don't need extra parentheses
          case 'ArrayNode':
          case 'ConstantNode':
          case 'SymbolNode':
          case 'ParenthesisNode':
            return false;

          default:
            return true;
        }
      });
      return parens;
    }

    var result;

    switch (args.length) {
      case 0:
        result = [];
        break;

      case 1:
        // unary operators
        // precedence of the operand
        var operandPrecedence = operators.getPrecedence(args[0], parenthesis); // handle special cases for LaTeX, where some of the parentheses aren't needed

        if (latex && operandPrecedence !== null) {
          var operandIdentifier;
          var rootIdentifier;

          if (parenthesis === 'keep') {
            operandIdentifier = args[0].getIdentifier();
            rootIdentifier = root.getIdentifier();
          } else {
            // Ignore Parenthesis Nodes when not in 'keep' mode
            operandIdentifier = args[0].getContent().getIdentifier();
            rootIdentifier = root.getContent().getIdentifier();
          }

          if (operators.properties[precedence][rootIdentifier].latexLeftParens === false) {
            result = [false];
            break;
          }

          if (operators.properties[operandPrecedence][operandIdentifier].latexParens === false) {
            result = [false];
            break;
          }
        }

        if (operandPrecedence === null) {
          // if the operand has no defined precedence, no parens are needed
          result = [false];
          break;
        }

        if (operandPrecedence <= precedence) {
          // if the operands precedence is lower, parens are needed
          result = [true];
          break;
        } // otherwise, no parens needed


        result = [false];
        break;

      case 2:
        // binary operators
        var lhsParens; // left hand side needs parenthesis?
        // precedence of the left hand side

        var lhsPrecedence = operators.getPrecedence(args[0], parenthesis); // is the root node associative with the left hand side

        var assocWithLhs = operators.isAssociativeWith(root, args[0], parenthesis);

        if (lhsPrecedence === null) {
          // if the left hand side has no defined precedence, no parens are needed
          // FunctionNode for example
          lhsParens = false;
        } else if (lhsPrecedence === precedence && associativity === 'right' && !assocWithLhs) {
          // In case of equal precedence, if the root node is left associative
          // parens are **never** necessary for the left hand side.
          // If it is right associative however, parens are necessary
          // if the root node isn't associative with the left hand side
          lhsParens = true;
        } else if (lhsPrecedence < precedence) {
          lhsParens = true;
        } else {
          lhsParens = false;
        }

        var rhsParens; // right hand side needs parenthesis?
        // precedence of the right hand side

        var rhsPrecedence = operators.getPrecedence(args[1], parenthesis); // is the root node associative with the right hand side?

        var assocWithRhs = operators.isAssociativeWith(root, args[1], parenthesis);

        if (rhsPrecedence === null) {
          // if the right hand side has no defined precedence, no parens are needed
          // FunctionNode for example
          rhsParens = false;
        } else if (rhsPrecedence === precedence && associativity === 'left' && !assocWithRhs) {
          // In case of equal precedence, if the root node is right associative
          // parens are **never** necessary for the right hand side.
          // If it is left associative however, parens are necessary
          // if the root node isn't associative with the right hand side
          rhsParens = true;
        } else if (rhsPrecedence < precedence) {
          rhsParens = true;
        } else {
          rhsParens = false;
        } // handle special cases for LaTeX, where some of the parentheses aren't needed


        if (latex) {
          var _rootIdentifier;

          var lhsIdentifier;
          var rhsIdentifier;

          if (parenthesis === 'keep') {
            _rootIdentifier = root.getIdentifier();
            lhsIdentifier = root.args[0].getIdentifier();
            rhsIdentifier = root.args[1].getIdentifier();
          } else {
            // Ignore ParenthesisNodes when not in 'keep' mode
            _rootIdentifier = root.getContent().getIdentifier();
            lhsIdentifier = root.args[0].getContent().getIdentifier();
            rhsIdentifier = root.args[1].getContent().getIdentifier();
          }

          if (lhsPrecedence !== null) {
            if (operators.properties[precedence][_rootIdentifier].latexLeftParens === false) {
              lhsParens = false;
            }

            if (operators.properties[lhsPrecedence][lhsIdentifier].latexParens === false) {
              lhsParens = false;
            }
          }

          if (rhsPrecedence !== null) {
            if (operators.properties[precedence][_rootIdentifier].latexRightParens === false) {
              rhsParens = false;
            }

            if (operators.properties[rhsPrecedence][rhsIdentifier].latexParens === false) {
              rhsParens = false;
            }
          }
        }

        result = [lhsParens, rhsParens];
        break;

      default:
        if (root.getIdentifier() === 'OperatorNode:add' || root.getIdentifier() === 'OperatorNode:multiply') {
          result = args.map(function (arg) {
            var argPrecedence = operators.getPrecedence(arg, parenthesis);
            var assocWithArg = operators.isAssociativeWith(root, arg, parenthesis);
            var argAssociativity = operators.getAssociativity(arg, parenthesis);

            if (argPrecedence === null) {
              // if the argument has no defined precedence, no parens are needed
              return false;
            } else if (precedence === argPrecedence && associativity === argAssociativity && !assocWithArg) {
              return true;
            } else if (argPrecedence < precedence) {
              return true;
            }

            return false;
          });
        }

        break;
    } // handles an edge case of 'auto' parentheses with implicit multiplication of ConstantNode
    // In that case print parentheses for ParenthesisNodes even though they normally wouldn't be
    // printed.


    if (args.length >= 2 && root.getIdentifier() === 'OperatorNode:multiply' && root.implicit && parenthesis === 'auto' && implicit === 'hide') {
      result = args.map(function (arg, index) {
        var isParenthesisNode = arg.getIdentifier() === 'ParenthesisNode';

        if (result[index] || isParenthesisNode) {
          // put in parenthesis?
          return true;
        }

        return false;
      });
    }

    return result;
  }
  /**
   * Get string representation.
   * @param {Object} options
   * @return {string} str
   */


  OperatorNode.prototype._toString = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var implicit = options && options.implicit ? options.implicit : 'hide';
    var args = this.args;
    var parens = calculateNecessaryParentheses(this, parenthesis, implicit, args, false);

    if (args.length === 1) {
      // unary operators
      var assoc = operators.getAssociativity(this, parenthesis);
      var operand = args[0].toString(options);

      if (parens[0]) {
        operand = '(' + operand + ')';
      } // for example for "not", we want a space between operand and argument


      var opIsNamed = /[a-zA-Z]+/.test(this.op);

      if (assoc === 'right') {
        // prefix operator
        return this.op + (opIsNamed ? ' ' : '') + operand;
      } else if (assoc === 'left') {
        // postfix
        return operand + (opIsNamed ? ' ' : '') + this.op;
      } // fall back to postfix


      return operand + this.op;
    } else if (args.length === 2) {
      var lhs = args[0].toString(options); // left hand side

      var rhs = args[1].toString(options); // right hand side

      if (parens[0]) {
        // left hand side in parenthesis?
        lhs = '(' + lhs + ')';
      }

      if (parens[1]) {
        // right hand side in parenthesis?
        rhs = '(' + rhs + ')';
      }

      if (this.implicit && this.getIdentifier() === 'OperatorNode:multiply' && implicit === 'hide') {
        return lhs + ' ' + rhs;
      }

      return lhs + ' ' + this.op + ' ' + rhs;
    } else if (args.length > 2 && (this.getIdentifier() === 'OperatorNode:add' || this.getIdentifier() === 'OperatorNode:multiply')) {
      var stringifiedArgs = args.map(function (arg, index) {
        arg = arg.toString(options);

        if (parens[index]) {
          // put in parenthesis?
          arg = '(' + arg + ')';
        }

        return arg;
      });

      if (this.implicit && this.getIdentifier() === 'OperatorNode:multiply' && implicit === 'hide') {
        return stringifiedArgs.join(' ');
      }

      return stringifiedArgs.join(' ' + this.op + ' ');
    } else {
      // fallback to formatting as a function call
      return this.fn + '(' + this.args.join(', ') + ')';
    }
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  OperatorNode.prototype.toJSON = function () {
    return {
      mathjs: 'OperatorNode',
      op: this.op,
      fn: this.fn,
      args: this.args,
      implicit: this.implicit
    };
  };
  /**
   * Instantiate an OperatorNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "OperatorNode", "op": "+", "fn": "add", "args": [...], "implicit": false}`,
   *                       where mathjs is optional
   * @returns {OperatorNode}
   */


  OperatorNode.fromJSON = function (json) {
    return new OperatorNode(json.op, json.fn, json.args, json.implicit);
  };
  /**
   * Get HTML representation.
   * @param {Object} options
   * @return {string} str
   */


  OperatorNode.prototype.toHTML = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var implicit = options && options.implicit ? options.implicit : 'hide';
    var args = this.args;
    var parens = calculateNecessaryParentheses(this, parenthesis, implicit, args, false);

    if (args.length === 1) {
      // unary operators
      var assoc = operators.getAssociativity(this, parenthesis);
      var operand = args[0].toHTML(options);

      if (parens[0]) {
        operand = '<span class="math-parenthesis math-round-parenthesis">(</span>' + operand + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }

      if (assoc === 'right') {
        // prefix operator
        return '<span class="math-operator math-unary-operator math-lefthand-unary-operator">' + escape$3(this.op) + '</span>' + operand;
      } else {
        // postfix when assoc === 'left' or undefined
        return operand + '<span class="math-operator math-unary-operator math-righthand-unary-operator">' + escape$3(this.op) + '</span>';
      }
    } else if (args.length === 2) {
      // binary operatoes
      var lhs = args[0].toHTML(options); // left hand side

      var rhs = args[1].toHTML(options); // right hand side

      if (parens[0]) {
        // left hand side in parenthesis?
        lhs = '<span class="math-parenthesis math-round-parenthesis">(</span>' + lhs + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }

      if (parens[1]) {
        // right hand side in parenthesis?
        rhs = '<span class="math-parenthesis math-round-parenthesis">(</span>' + rhs + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }

      if (this.implicit && this.getIdentifier() === 'OperatorNode:multiply' && implicit === 'hide') {
        return lhs + '<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>' + rhs;
      }

      return lhs + '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + escape$3(this.op) + '</span>' + rhs;
    } else {
      var stringifiedArgs = args.map(function (arg, index) {
        arg = arg.toHTML(options);

        if (parens[index]) {
          // put in parenthesis?
          arg = '<span class="math-parenthesis math-round-parenthesis">(</span>' + arg + '<span class="math-parenthesis math-round-parenthesis">)</span>';
        }

        return arg;
      });

      if (args.length > 2 && (this.getIdentifier() === 'OperatorNode:add' || this.getIdentifier() === 'OperatorNode:multiply')) {
        if (this.implicit && this.getIdentifier() === 'OperatorNode:multiply' && implicit === 'hide') {
          return stringifiedArgs.join('<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>');
        }

        return stringifiedArgs.join('<span class="math-operator math-binary-operator math-explicit-binary-operator">' + escape$3(this.op) + '</span>');
      } else {
        // fallback to formatting as a function call
        return '<span class="math-function">' + escape$3(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + stringifiedArgs.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>';
      }
    }
  };
  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */


  OperatorNode.prototype._toTex = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var implicit = options && options.implicit ? options.implicit : 'hide';
    var args = this.args;
    var parens = calculateNecessaryParentheses(this, parenthesis, implicit, args, true);
    var op = latex.operators[this.fn];
    op = typeof op === 'undefined' ? this.op : op; // fall back to using this.op

    if (args.length === 1) {
      // unary operators
      var assoc = operators.getAssociativity(this, parenthesis);
      var operand = args[0].toTex(options);

      if (parens[0]) {
        operand = "\\left(".concat(operand, "\\right)");
      }

      if (assoc === 'right') {
        // prefix operator
        return op + operand;
      } else if (assoc === 'left') {
        // postfix operator
        return operand + op;
      } // fall back to postfix


      return operand + op;
    } else if (args.length === 2) {
      // binary operators
      var lhs = args[0]; // left hand side

      var lhsTex = lhs.toTex(options);

      if (parens[0]) {
        lhsTex = "\\left(".concat(lhsTex, "\\right)");
      }

      var rhs = args[1]; // right hand side

      var rhsTex = rhs.toTex(options);

      if (parens[1]) {
        rhsTex = "\\left(".concat(rhsTex, "\\right)");
      } // handle some exceptions (due to the way LaTeX works)


      var lhsIdentifier;

      if (parenthesis === 'keep') {
        lhsIdentifier = lhs.getIdentifier();
      } else {
        // Ignore ParenthesisNodes if in 'keep' mode
        lhsIdentifier = lhs.getContent().getIdentifier();
      }

      switch (this.getIdentifier()) {
        case 'OperatorNode:divide':
          // op contains '\\frac' at this point
          return op + '{' + lhsTex + '}' + '{' + rhsTex + '}';

        case 'OperatorNode:pow':
          lhsTex = '{' + lhsTex + '}';
          rhsTex = '{' + rhsTex + '}';

          switch (lhsIdentifier) {
            case 'ConditionalNode': //

            case 'OperatorNode:divide':
              lhsTex = "\\left(".concat(lhsTex, "\\right)");
          }

          break;

        case 'OperatorNode:multiply':
          if (this.implicit && implicit === 'hide') {
            return lhsTex + '~' + rhsTex;
          }

      }

      return lhsTex + op + rhsTex;
    } else if (args.length > 2 && (this.getIdentifier() === 'OperatorNode:add' || this.getIdentifier() === 'OperatorNode:multiply')) {
      var texifiedArgs = args.map(function (arg, index) {
        arg = arg.toTex(options);

        if (parens[index]) {
          arg = "\\left(".concat(arg, "\\right)");
        }

        return arg;
      });

      if (this.getIdentifier() === 'OperatorNode:multiply' && this.implicit) {
        return texifiedArgs.join('~');
      }

      return texifiedArgs.join(op);
    } else {
      // fall back to formatting as a function call
      // as this is a fallback, it doesn't use
      // fancy function names
      return '\\mathrm{' + this.fn + '}\\left(' + args.map(function (arg) {
        return arg.toTex(options);
      }).join(',') + '\\right)';
    }
  };
  /**
   * Get identifier.
   * @return {string}
   */


  OperatorNode.prototype.getIdentifier = function () {
    return this.type + ':' + this.fn;
  };

  return OperatorNode;
}

var name$l = 'OperatorNode';
var path$d = 'expression.node';
var factory_1$n = factory$n;

var OperatorNode = {
	name: name$l,
	path: path$d,
	factory: factory_1$n
};

function factory$o(type, config, load, typed) {
  var Node$1 = load(Node);
  /**
   * @constructor ParenthesisNode
   * @extends {Node}
   * A parenthesis node describes manual parenthesis from the user input
   * @param {Node} content
   * @extends {Node}
   */

  function ParenthesisNode(content) {
    if (!(this instanceof ParenthesisNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    } // validate input


    if (!type.isNode(content)) {
      throw new TypeError('Node expected for parameter "content"');
    }

    this.content = content;
  }

  ParenthesisNode.prototype = new Node$1();
  ParenthesisNode.prototype.type = 'ParenthesisNode';
  ParenthesisNode.prototype.isParenthesisNode = true;
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */

  ParenthesisNode.prototype._compile = function (math, argNames) {
    return this.content._compile(math, argNames);
  };
  /**
   * Get the content of the current Node.
   * @return {Node} content
   * @override
   **/


  ParenthesisNode.prototype.getContent = function () {
    return this.content.getContent();
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  ParenthesisNode.prototype.forEach = function (callback) {
    callback(this.content, 'content', this);
  };
  /**
   * Create a new ParenthesisNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node) : Node} callback
   * @returns {ParenthesisNode} Returns a clone of the node
   */


  ParenthesisNode.prototype.map = function (callback) {
    var content = callback(this.content, 'content', this);
    return new ParenthesisNode(content);
  };
  /**
   * Create a clone of this node, a shallow copy
   * @return {ParenthesisNode}
   */


  ParenthesisNode.prototype.clone = function () {
    return new ParenthesisNode(this.content);
  };
  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   * @override
   */


  ParenthesisNode.prototype._toString = function (options) {
    if (!options || options && !options.parenthesis || options && options.parenthesis === 'keep') {
      return '(' + this.content.toString(options) + ')';
    }

    return this.content.toString(options);
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  ParenthesisNode.prototype.toJSON = function () {
    return {
      mathjs: 'ParenthesisNode',
      content: this.content
    };
  };
  /**
   * Instantiate an ParenthesisNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "ParenthesisNode", "content": ...}`,
   *                       where mathjs is optional
   * @returns {ParenthesisNode}
   */


  ParenthesisNode.fromJSON = function (json) {
    return new ParenthesisNode(json.content);
  };
  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   * @override
   */


  ParenthesisNode.prototype.toHTML = function (options) {
    if (!options || options && !options.parenthesis || options && options.parenthesis === 'keep') {
      return '<span class="math-parenthesis math-round-parenthesis">(</span>' + this.content.toHTML(options) + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }

    return this.content.toHTML(options);
  };
  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   * @override
   */


  ParenthesisNode.prototype._toTex = function (options) {
    if (!options || options && !options.parenthesis || options && options.parenthesis === 'keep') {
      return "\\left(".concat(this.content.toTex(options), "\\right)");
    }

    return this.content.toTex(options);
  };

  return ParenthesisNode;
}

var name$m = 'ParenthesisNode';
var path$e = 'expression.node';
var factory_1$o = factory$o;

var ParenthesisNode = {
	name: name$m,
	path: path$e,
	factory: factory_1$o
};

var escape$4 = string.escape;

var hasOwnProperty$3 = object.hasOwnProperty;

var getSafeProperty$6 = customs.getSafeProperty;

function factory$p(type, config, load, typed, math) {
  var Node$1 = load(Node);
  /**
   * Check whether some name is a valueless unit like "inch".
   * @param {string} name
   * @return {boolean}
   */

  function isValuelessUnit(name) {
    return type.Unit ? type.Unit.isValuelessUnit(name) : false;
  }
  /**
   * @constructor SymbolNode
   * @extends {Node}
   * A symbol node can hold and resolve a symbol
   * @param {string} name
   * @extends {Node}
   */


  function SymbolNode(name) {
    if (!(this instanceof SymbolNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    } // validate input


    if (typeof name !== 'string') throw new TypeError('String expected for parameter "name"');
    this.name = name;
  }

  SymbolNode.prototype = new Node$1();
  SymbolNode.prototype.type = 'SymbolNode';
  SymbolNode.prototype.isSymbolNode = true;
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */

  SymbolNode.prototype._compile = function (math, argNames) {
    var name = this.name;

    if (hasOwnProperty$3(argNames, name)) {
      // this is a FunctionAssignment argument
      // (like an x when inside the expression of a function assignment `f(x) = ...`)
      return function (scope, args, context) {
        return args[name];
      };
    } else if (name in math) {
      return function (scope, args, context) {
        return name in scope ? getSafeProperty$6(scope, name) : getSafeProperty$6(math, name);
      };
    } else {
      var isUnit = isValuelessUnit(name);
      return function (scope, args, context) {
        return name in scope ? getSafeProperty$6(scope, name) : isUnit ? new type.Unit(null, name) : undef(name);
      };
    }
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  SymbolNode.prototype.forEach = function (callback) {} // nothing to do, we don't have childs

  /**
   * Create a new SymbolNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node) : Node} callback
   * @returns {SymbolNode} Returns a clone of the node
   */
  ;

  SymbolNode.prototype.map = function (callback) {
    return this.clone();
  };
  /**
   * Throws an error 'Undefined symbol {name}'
   * @param {string} name
   */


  function undef(name) {
    throw new Error('Undefined symbol ' + name);
  }
  /**
   * Create a clone of this node, a shallow copy
   * @return {SymbolNode}
   */


  SymbolNode.prototype.clone = function () {
    return new SymbolNode(this.name);
  };
  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   * @override
   */


  SymbolNode.prototype._toString = function (options) {
    return this.name;
  };
  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   * @override
   */


  SymbolNode.prototype.toHTML = function (options) {
    var name = escape$4(this.name);

    if (name === 'true' || name === 'false') {
      return '<span class="math-symbol math-boolean">' + name + '</span>';
    } else if (name === 'i') {
      return '<span class="math-symbol math-imaginary-symbol">' + name + '</span>';
    } else if (name === 'Infinity') {
      return '<span class="math-symbol math-infinity-symbol">' + name + '</span>';
    } else if (name === 'NaN') {
      return '<span class="math-symbol math-nan-symbol">' + name + '</span>';
    } else if (name === 'null') {
      return '<span class="math-symbol math-null-symbol">' + name + '</span>';
    } else if (name === 'undefined') {
      return '<span class="math-symbol math-undefined-symbol">' + name + '</span>';
    }

    return '<span class="math-symbol">' + name + '</span>';
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  SymbolNode.prototype.toJSON = function () {
    return {
      mathjs: 'SymbolNode',
      name: this.name
    };
  };
  /**
   * Instantiate a SymbolNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "SymbolNode", name: "x"}`,
   *                       where mathjs is optional
   * @returns {SymbolNode}
   */


  SymbolNode.fromJSON = function (json) {
    return new SymbolNode(json.name);
  };
  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   * @override
   */


  SymbolNode.prototype._toTex = function (options) {
    var isUnit = false;

    if (typeof math[this.name] === 'undefined' && isValuelessUnit(this.name)) {
      isUnit = true;
    }

    var symbol = latex.toSymbol(this.name, isUnit);

    if (symbol[0] === '\\') {
      // no space needed if the symbol starts with '\'
      return symbol;
    } // the space prevents symbols from breaking stuff like '\cdot' if it's written right before the symbol


    return ' ' + symbol;
  };

  return SymbolNode;
}

var name$n = 'SymbolNode';
var path$f = 'expression.node';
var math$3 = true; // request access to the math namespace as 5th argument of the factory function

var factory_1$p = factory$p;

var SymbolNode = {
	name: name$n,
	path: path$f,
	math: math$3,
	factory: factory_1$p
};

function _typeof$8(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$8 = function _typeof(obj) { return typeof obj; }; } else { _typeof$8 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$8(obj); }

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

var latex$1 = latex;

var escape$5 = string.escape;

var hasOwnProperty$4 = object.hasOwnProperty;

var map$4 = array.map;

var validateSafeMethod$1 = customs.validateSafeMethod;

var getSafeProperty$7 = customs.getSafeProperty;

function factory$q(type, config, load, typed, math) {
  var Node$1 = load(Node);
  var SymbolNode$1 = load(SymbolNode);
  /**
   * @constructor FunctionNode
   * @extends {./Node}
   * invoke a list with arguments on a node
   * @param {./Node | string} fn Node resolving with a function on which to invoke
   *                             the arguments, typically a SymboNode or AccessorNode
   * @param {./Node[]} args
   */

  function FunctionNode(fn, args) {
    if (!(this instanceof FunctionNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    if (typeof fn === 'string') {
      fn = new SymbolNode$1(fn);
    } // validate input


    if (!type.isNode(fn)) throw new TypeError('Node expected as parameter "fn"');

    if (!Array.isArray(args) || !args.every(type.isNode)) {
      throw new TypeError('Array containing Nodes expected for parameter "args"');
    }

    this.fn = fn;
    this.args = args || []; // readonly property name

    Object.defineProperty(this, 'name', {
      get: function () {
        return this.fn.name || '';
      }.bind(this),
      set: function set() {
        throw new Error('Cannot assign a new name, name is read-only');
      }
    }); // TODO: deprecated since v3, remove some day

    var deprecated = function deprecated() {
      throw new Error('Property `FunctionNode.object` is deprecated, use `FunctionNode.fn` instead');
    };

    Object.defineProperty(this, 'object', {
      get: deprecated,
      set: deprecated
    });
  }

  FunctionNode.prototype = new Node$1();
  FunctionNode.prototype.type = 'FunctionNode';
  FunctionNode.prototype.isFunctionNode = true;
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */

  FunctionNode.prototype._compile = function (math, argNames) {
    if (!(this instanceof FunctionNode)) {
      throw new TypeError('No valid FunctionNode');
    } // compile arguments


    var evalArgs = map$4(this.args, function (arg) {
      return arg._compile(math, argNames);
    });

    if (type.isSymbolNode(this.fn)) {
      // we can statically determine whether the function has an rawArgs property
      var name = this.fn.name;
      var fn = name in math ? getSafeProperty$7(math, name) : undefined;
      var isRaw = typeof fn === 'function' && fn.rawArgs === true;

      if (isRaw) {
        // pass unevaluated parameters (nodes) to the function
        // "raw" evaluation
        var rawArgs = this.args;
        return function evalFunctionNode(scope, args, context) {
          return (name in scope ? getSafeProperty$7(scope, name) : fn)(rawArgs, math, _extends$1({}, scope, args));
        };
      } else {
        // "regular" evaluation
        if (evalArgs.length === 1) {
          var evalArg0 = evalArgs[0];
          return function evalFunctionNode(scope, args, context) {
            return (name in scope ? getSafeProperty$7(scope, name) : fn)(evalArg0(scope, args, context));
          };
        } else if (evalArgs.length === 2) {
          var _evalArg = evalArgs[0];
          var evalArg1 = evalArgs[1];
          return function evalFunctionNode(scope, args, context) {
            return (name in scope ? getSafeProperty$7(scope, name) : fn)(_evalArg(scope, args, context), evalArg1(scope, args, context));
          };
        } else {
          return function evalFunctionNode(scope, args, context) {
            return (name in scope ? getSafeProperty$7(scope, name) : fn).apply(null, map$4(evalArgs, function (evalArg) {
              return evalArg(scope, args, context);
            }));
          };
        }
      }
    } else if (type.isAccessorNode(this.fn) && type.isIndexNode(this.fn.index) && this.fn.index.isObjectProperty()) {
      // execute the function with the right context: the object of the AccessorNode
      var evalObject = this.fn.object._compile(math, argNames);

      var prop = this.fn.index.getObjectProperty();
      var _rawArgs = this.args;
      return function evalFunctionNode(scope, args, context) {
        var object = evalObject(scope, args, context);
        validateSafeMethod$1(object, prop);
        var isRaw = object[prop] && object[prop].rawArgs;
        return isRaw ? object[prop](_rawArgs, math, _extends$1({}, scope, args)) // "raw" evaluation
        : object[prop].apply(object, map$4(evalArgs, function (evalArg) {
          // "regular" evaluation
          return evalArg(scope, args, context);
        }));
      };
    } else {
      // node.fn.isAccessorNode && !node.fn.index.isObjectProperty()
      // we have to dynamically determine whether the function has a rawArgs property
      var evalFn = this.fn._compile(math, argNames);

      var _rawArgs2 = this.args;
      return function evalFunctionNode(scope, args, context) {
        var fn = evalFn(scope, args, context);
        var isRaw = fn && fn.rawArgs;
        return isRaw ? fn(_rawArgs2, math, _extends$1({}, scope, args)) // "raw" evaluation
        : fn.apply(fn, map$4(evalArgs, function (evalArg) {
          // "regular" evaluation
          return evalArg(scope, args, context);
        }));
      };
    }
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  FunctionNode.prototype.forEach = function (callback) {
    callback(this.fn, 'fn', this);

    for (var i = 0; i < this.args.length; i++) {
      callback(this.args[i], 'args[' + i + ']', this);
    }
  };
  /**
   * Create a new FunctionNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {FunctionNode} Returns a transformed copy of the node
   */


  FunctionNode.prototype.map = function (callback) {
    var fn = this._ifNode(callback(this.fn, 'fn', this));

    var args = [];

    for (var i = 0; i < this.args.length; i++) {
      args[i] = this._ifNode(callback(this.args[i], 'args[' + i + ']', this));
    }

    return new FunctionNode(fn, args);
  };
  /**
   * Create a clone of this node, a shallow copy
   * @return {FunctionNode}
   */


  FunctionNode.prototype.clone = function () {
    return new FunctionNode(this.fn, this.args.slice(0));
  }; // backup Node's toString function
  // @private


  var nodeToString = FunctionNode.prototype.toString;
  /**
   * Get string representation. (wrapper function)
   * This overrides parts of Node's toString function.
   * If callback is an object containing callbacks, it
   * calls the correct callback for the current node,
   * otherwise it falls back to calling Node's toString
   * function.
   *
   * @param {Object} options
   * @return {string} str
   * @override
   */

  FunctionNode.prototype.toString = function (options) {
    var customString;
    var name = this.fn.toString(options);

    if (options && _typeof$8(options.handler) === 'object' && hasOwnProperty$4(options.handler, name)) {
      // callback is a map of callback functions
      customString = options.handler[name](this, options);
    }

    if (typeof customString !== 'undefined') {
      return customString;
    } // fall back to Node's toString


    return nodeToString.call(this, options);
  };
  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   */


  FunctionNode.prototype._toString = function (options) {
    var args = this.args.map(function (arg) {
      return arg.toString(options);
    });
    var fn = type.isFunctionAssignmentNode(this.fn) ? '(' + this.fn.toString(options) + ')' : this.fn.toString(options); // format the arguments like "add(2, 4.2)"

    return fn + '(' + args.join(', ') + ')';
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  FunctionNode.prototype.toJSON = function () {
    return {
      mathjs: 'FunctionNode',
      fn: this.fn,
      args: this.args
    };
  };
  /**
   * Instantiate an AssignmentNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "FunctionNode", fn: ..., args: ...}`,
   *                       where mathjs is optional
   * @returns {FunctionNode}
   */


  FunctionNode.fromJSON = function (json) {
    return new FunctionNode(json.fn, json.args);
  };
  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   */


  FunctionNode.prototype.toHTML = function (options) {
    var args = this.args.map(function (arg) {
      return arg.toHTML(options);
    }); // format the arguments like "add(2, 4.2)"

    return '<span class="math-function">' + escape$5(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + args.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>';
  };
  /*
   * Expand a LaTeX template
   *
   * @param {string} template
   * @param {Node} node
   * @param {Object} options
   * @private
   **/


  function expandTemplate(template, node, options) {
    var latex = ''; // Match everything of the form ${identifier} or ${identifier[2]} or $$
    // while submatching identifier and 2 (in the second case)

    var regex = new RegExp('\\$(?:\\{([a-z_][a-z_0-9]*)(?:\\[([0-9]+)\\])?\\}|\\$)', 'ig');
    var inputPos = 0; // position in the input string

    var match;

    while ((match = regex.exec(template)) !== null) {
      // go through all matches
      // add everything in front of the match to the LaTeX string
      latex += template.substring(inputPos, match.index);
      inputPos = match.index;

      if (match[0] === '$$') {
        // escaped dollar sign
        latex += '$';
        inputPos++;
      } else {
        // template parameter
        inputPos += match[0].length;
        var property = node[match[1]];

        if (!property) {
          throw new ReferenceError('Template: Property ' + match[1] + ' does not exist.');
        }

        if (match[2] === undefined) {
          // no square brackets
          switch (_typeof$8(property)) {
            case 'string':
              latex += property;
              break;

            case 'object':
              if (type.isNode(property)) {
                latex += property.toTex(options);
              } else if (Array.isArray(property)) {
                // make array of Nodes into comma separated list
                latex += property.map(function (arg, index) {
                  if (type.isNode(arg)) {
                    return arg.toTex(options);
                  }

                  throw new TypeError('Template: ' + match[1] + '[' + index + '] is not a Node.');
                }).join(',');
              } else {
                throw new TypeError('Template: ' + match[1] + ' has to be a Node, String or array of Nodes');
              }

              break;

            default:
              throw new TypeError('Template: ' + match[1] + ' has to be a Node, String or array of Nodes');
          }
        } else {
          // with square brackets
          if (type.isNode(property[match[2]] && property[match[2]])) {
            latex += property[match[2]].toTex(options);
          } else {
            throw new TypeError('Template: ' + match[1] + '[' + match[2] + '] is not a Node.');
          }
        }
      }
    }

    latex += template.slice(inputPos); // append rest of the template

    return latex;
  } // backup Node's toTex function
  // @private


  var nodeToTex = FunctionNode.prototype.toTex;
  /**
   * Get LaTeX representation. (wrapper function)
   * This overrides parts of Node's toTex function.
   * If callback is an object containing callbacks, it
   * calls the correct callback for the current node,
   * otherwise it falls back to calling Node's toTex
   * function.
   *
   * @param {Object} options
   * @return {string}
   */

  FunctionNode.prototype.toTex = function (options) {
    var customTex;

    if (options && _typeof$8(options.handler) === 'object' && hasOwnProperty$4(options.handler, this.name)) {
      // callback is a map of callback functions
      customTex = options.handler[this.name](this, options);
    }

    if (typeof customTex !== 'undefined') {
      return customTex;
    } // fall back to Node's toTex


    return nodeToTex.call(this, options);
  };
  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */


  FunctionNode.prototype._toTex = function (options) {
    var args = this.args.map(function (arg) {
      // get LaTeX of the arguments
      return arg.toTex(options);
    });
    var latexConverter;

    if (math[this.name] && (typeof math[this.name].toTex === 'function' || _typeof$8(math[this.name].toTex) === 'object' || typeof math[this.name].toTex === 'string')) {
      // .toTex is a callback function
      latexConverter = math[this.name].toTex;
    }

    var customToTex;

    switch (_typeof$8(latexConverter)) {
      case 'function':
        // a callback function
        customToTex = latexConverter(this, options);
        break;

      case 'string':
        // a template string
        customToTex = expandTemplate(latexConverter, this, options);
        break;

      case 'object':
        // an object with different "converters" for different numbers of arguments
        switch (_typeof$8(latexConverter[args.length])) {
          case 'function':
            customToTex = latexConverter[args.length](this, options);
            break;

          case 'string':
            customToTex = expandTemplate(latexConverter[args.length], this, options);
            break;
        }

    }

    if (typeof customToTex !== 'undefined') {
      return customToTex;
    }

    return expandTemplate(latex$1.defaultTemplate, this, options);
  };
  /**
   * Get identifier.
   * @return {string}
   */


  FunctionNode.prototype.getIdentifier = function () {
    return this.type + ':' + this.name;
  };

  return FunctionNode;
}

var name$o = 'FunctionNode';
var path$g = 'expression.node';
var math$4 = true; // request access to the math namespace as 5th argument of the factory function

var factory_1$q = factory$q;

var FunctionNode = {
	name: name$o,
	path: path$g,
	math: math$4,
	factory: factory_1$q
};

function factory$r(type, config, load, typed) {
  var Node$1 = load(Node);
  /**
   * @constructor RangeNode
   * @extends {Node}
   * create a range
   * @param {Node} start  included lower-bound
   * @param {Node} end    included upper-bound
   * @param {Node} [step] optional step
   */

  function RangeNode(start, end, step) {
    if (!(this instanceof RangeNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    } // validate inputs


    if (!type.isNode(start)) throw new TypeError('Node expected');
    if (!type.isNode(end)) throw new TypeError('Node expected');
    if (step && !type.isNode(step)) throw new TypeError('Node expected');
    if (arguments.length > 3) throw new Error('Too many arguments');
    this.start = start; // included lower-bound

    this.end = end; // included upper-bound

    this.step = step || null; // optional step
  }

  RangeNode.prototype = new Node$1();
  RangeNode.prototype.type = 'RangeNode';
  RangeNode.prototype.isRangeNode = true;
  /**
   * Check whether the RangeNode needs the `end` symbol to be defined.
   * This end is the size of the Matrix in current dimension.
   * @return {boolean}
   */

  RangeNode.prototype.needsEnd = function () {
    // find all `end` symbols in this RangeNode
    var endSymbols = this.filter(function (node) {
      return type.isSymbolNode(node) && node.name === 'end';
    });
    return endSymbols.length > 0;
  };
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */


  RangeNode.prototype._compile = function (math, argNames) {
    var range = math.range;

    var evalStart = this.start._compile(math, argNames);

    var evalEnd = this.end._compile(math, argNames);

    if (this.step) {
      var evalStep = this.step._compile(math, argNames);

      return function evalRangeNode(scope, args, context) {
        return range(evalStart(scope, args, context), evalEnd(scope, args, context), evalStep(scope, args, context));
      };
    } else {
      return function evalRangeNode(scope, args, context) {
        return range(evalStart(scope, args, context), evalEnd(scope, args, context));
      };
    }
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  RangeNode.prototype.forEach = function (callback) {
    callback(this.start, 'start', this);
    callback(this.end, 'end', this);

    if (this.step) {
      callback(this.step, 'step', this);
    }
  };
  /**
   * Create a new RangeNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {RangeNode} Returns a transformed copy of the node
   */


  RangeNode.prototype.map = function (callback) {
    return new RangeNode(this._ifNode(callback(this.start, 'start', this)), this._ifNode(callback(this.end, 'end', this)), this.step && this._ifNode(callback(this.step, 'step', this)));
  };
  /**
   * Create a clone of this node, a shallow copy
   * @return {RangeNode}
   */


  RangeNode.prototype.clone = function () {
    return new RangeNode(this.start, this.end, this.step && this.step);
  };
  /**
   * Calculate the necessary parentheses
   * @param {Node} node
   * @param {string} parenthesis
   * @return {Object} parentheses
   * @private
   */


  function calculateNecessaryParentheses(node, parenthesis) {
    var precedence = operators.getPrecedence(node, parenthesis);
    var parens = {};
    var startPrecedence = operators.getPrecedence(node.start, parenthesis);
    parens.start = startPrecedence !== null && startPrecedence <= precedence || parenthesis === 'all';

    if (node.step) {
      var stepPrecedence = operators.getPrecedence(node.step, parenthesis);
      parens.step = stepPrecedence !== null && stepPrecedence <= precedence || parenthesis === 'all';
    }

    var endPrecedence = operators.getPrecedence(node.end, parenthesis);
    parens.end = endPrecedence !== null && endPrecedence <= precedence || parenthesis === 'all';
    return parens;
  }
  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   */


  RangeNode.prototype._toString = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var parens = calculateNecessaryParentheses(this, parenthesis); // format string as start:step:stop

    var str;
    var start = this.start.toString(options);

    if (parens.start) {
      start = '(' + start + ')';
    }

    str = start;

    if (this.step) {
      var step = this.step.toString(options);

      if (parens.step) {
        step = '(' + step + ')';
      }

      str += ':' + step;
    }

    var end = this.end.toString(options);

    if (parens.end) {
      end = '(' + end + ')';
    }

    str += ':' + end;
    return str;
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  RangeNode.prototype.toJSON = function () {
    return {
      mathjs: 'RangeNode',
      start: this.start,
      end: this.end,
      step: this.step
    };
  };
  /**
   * Instantiate an RangeNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "RangeNode", "start": ..., "end": ..., "step": ...}`,
   *                       where mathjs is optional
   * @returns {RangeNode}
   */


  RangeNode.fromJSON = function (json) {
    return new RangeNode(json.start, json.end, json.step);
  };
  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   */


  RangeNode.prototype.toHTML = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var parens = calculateNecessaryParentheses(this, parenthesis); // format string as start:step:stop

    var str;
    var start = this.start.toHTML(options);

    if (parens.start) {
      start = '<span class="math-parenthesis math-round-parenthesis">(</span>' + start + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }

    str = start;

    if (this.step) {
      var step = this.step.toHTML(options);

      if (parens.step) {
        step = '<span class="math-parenthesis math-round-parenthesis">(</span>' + step + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }

      str += '<span class="math-operator math-range-operator">:</span>' + step;
    }

    var end = this.end.toHTML(options);

    if (parens.end) {
      end = '<span class="math-parenthesis math-round-parenthesis">(</span>' + end + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }

    str += '<span class="math-operator math-range-operator">:</span>' + end;
    return str;
  };
  /**
   * Get LaTeX representation
   * @params {Object} options
   * @return {string} str
   */


  RangeNode.prototype._toTex = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var parens = calculateNecessaryParentheses(this, parenthesis);
    var str = this.start.toTex(options);

    if (parens.start) {
      str = "\\left(".concat(str, "\\right)");
    }

    if (this.step) {
      var step = this.step.toTex(options);

      if (parens.step) {
        step = "\\left(".concat(step, "\\right)");
      }

      str += ':' + step;
    }

    var end = this.end.toTex(options);

    if (parens.end) {
      end = "\\left(".concat(end, "\\right)");
    }

    str += ':' + end;
    return str;
  };

  return RangeNode;
}

var name$p = 'RangeNode';
var path$h = 'expression.node';
var factory_1$r = factory$r;

var RangeNode = {
	name: name$p,
	path: path$h,
	factory: factory_1$r
};

var escape$6 = string.escape;

function factory$s(type, config, load, typed) {
  var Node$1 = load(Node);

  var getSafeProperty = customs.getSafeProperty;
  /**
   * A node representing a chained conditional expression, such as 'x > y > z'
   *
   * @param {String[]} conditionals   An array of conditional operators used to compare the parameters
   * @param {Node[]} params   The parameters that will be compared
   *
   * @constructor RelationalNode
   * @extends {Node}
   */


  function RelationalNode(conditionals, params) {
    if (!(this instanceof RelationalNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    if (!Array.isArray(conditionals)) throw new TypeError('Parameter conditionals must be an array');
    if (!Array.isArray(params)) throw new TypeError('Parameter params must be an array');
    if (conditionals.length !== params.length - 1) throw new TypeError('Parameter params must contain exactly one more element than parameter conditionals');
    this.conditionals = conditionals;
    this.params = params;
  }

  RelationalNode.prototype = new Node$1();
  RelationalNode.prototype.type = 'RelationalNode';
  RelationalNode.prototype.isRelationalNode = true;
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */

  RelationalNode.prototype._compile = function (math, argNames) {
    var self = this;
    var compiled = this.params.map(function (p) {
      return p._compile(math, argNames);
    });
    return function evalRelationalNode(scope, args, context) {
      var evalLhs;
      var evalRhs = compiled[0](scope, args, context);

      for (var i = 0; i < self.conditionals.length; i++) {
        evalLhs = evalRhs;
        evalRhs = compiled[i + 1](scope, args, context);
        var condFn = getSafeProperty(math, self.conditionals[i]);

        if (!condFn(evalLhs, evalRhs)) {
          return false;
        }
      }

      return true;
    };
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  RelationalNode.prototype.forEach = function (callback) {
    var _this = this;

    this.params.forEach(function (n, i) {
      return callback(n, 'params[' + i + ']', _this);
    }, this);
  };
  /**
   * Create a new RelationalNode having its childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {RelationalNode} Returns a transformed copy of the node
   */


  RelationalNode.prototype.map = function (callback) {
    var _this2 = this;

    return new RelationalNode(this.conditionals.slice(), this.params.map(function (n, i) {
      return _this2._ifNode(callback(n, 'params[' + i + ']', _this2));
    }, this));
  };
  /**
   * Create a clone of this node, a shallow copy
   * @return {RelationalNode}
   */


  RelationalNode.prototype.clone = function () {
    return new RelationalNode(this.conditionals, this.params);
  };
  /**
   * Get string representation.
   * @param {Object} options
   * @return {string} str
   */


  RelationalNode.prototype._toString = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var precedence = operators.getPrecedence(this, parenthesis);
    var paramStrings = this.params.map(function (p, index) {
      var paramPrecedence = operators.getPrecedence(p, parenthesis);
      return parenthesis === 'all' || paramPrecedence !== null && paramPrecedence <= precedence ? '(' + p.toString(options) + ')' : p.toString(options);
    });
    var operatorMap = {
      'equal': '==',
      'unequal': '!=',
      'smaller': '<',
      'larger': '>',
      'smallerEq': '<=',
      'largerEq': '>='
    };
    var ret = paramStrings[0];

    for (var i = 0; i < this.conditionals.length; i++) {
      ret += ' ' + operatorMap[this.conditionals[i]] + ' ' + paramStrings[i + 1];
    }

    return ret;
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  RelationalNode.prototype.toJSON = function () {
    return {
      mathjs: 'RelationalNode',
      conditionals: this.conditionals,
      params: this.params
    };
  };
  /**
   * Instantiate a RelationalNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "RelationalNode", "condition": ..., "trueExpr": ..., "falseExpr": ...}`,
   *                       where mathjs is optional
   * @returns {RelationalNode}
   */


  RelationalNode.fromJSON = function (json) {
    return new RelationalNode(json.conditionals, json.params);
  };
  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   */


  RelationalNode.prototype.toHTML = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var precedence = operators.getPrecedence(this, parenthesis);
    var paramStrings = this.params.map(function (p, index) {
      var paramPrecedence = operators.getPrecedence(p, parenthesis);
      return parenthesis === 'all' || paramPrecedence !== null && paramPrecedence <= precedence ? '<span class="math-parenthesis math-round-parenthesis">(</span>' + p.toHTML(options) + '<span class="math-parenthesis math-round-parenthesis">)</span>' : p.toHTML(options);
    });
    var operatorMap = {
      'equal': '==',
      'unequal': '!=',
      'smaller': '<',
      'larger': '>',
      'smallerEq': '<=',
      'largerEq': '>='
    };
    var ret = paramStrings[0];

    for (var i = 0; i < this.conditionals.length; i++) {
      ret += '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + escape$6(operatorMap[this.conditionals[i]]) + '</span>' + paramStrings[i + 1];
    }

    return ret;
  };
  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */


  RelationalNode.prototype._toTex = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var precedence = operators.getPrecedence(this, parenthesis);
    var paramStrings = this.params.map(function (p, index) {
      var paramPrecedence = operators.getPrecedence(p, parenthesis);
      return parenthesis === 'all' || paramPrecedence !== null && paramPrecedence <= precedence ? '\\left(' + p.toTex(options) + '\right)' : p.toTex(options);
    });
    var ret = paramStrings[0];

    for (var i = 0; i < this.conditionals.length; i++) {
      ret += latex.operators[this.conditionals[i]] + paramStrings[i + 1];
    }

    return ret;
  };

  return RelationalNode;
}

var name$q = 'RelationalNode';
var path$i = 'expression.node';
var factory_1$s = factory$s;

var RelationalNode = {
	name: name$q,
	path: path$i,
	factory: factory_1$s
};

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }





function factory$t(type, config, load, typed) {
  var numeric$1 = load(numeric);
  var AccessorNode$1 = load(AccessorNode);
  var ArrayNode$1 = load(ArrayNode);
  var AssignmentNode$1 = load(AssignmentNode);
  var BlockNode$1 = load(BlockNode);
  var ConditionalNode$1 = load(ConditionalNode);
  var ConstantNode$1 = load(ConstantNode);
  var FunctionAssignmentNode$1 = load(FunctionAssignmentNode);
  var IndexNode$1 = load(IndexNode);
  var ObjectNode$1 = load(ObjectNode);
  var OperatorNode$1 = load(OperatorNode);
  var ParenthesisNode$1 = load(ParenthesisNode);
  var FunctionNode$1 = load(FunctionNode);
  var RangeNode$1 = load(RangeNode);
  var RelationalNode$1 = load(RelationalNode);
  var SymbolNode$1 = load(SymbolNode);
  /**
   * Parse an expression. Returns a node tree, which can be evaluated by
   * invoking node.eval().
   *
   * Syntax:
   *
   *     parse(expr)
   *     parse(expr, options)
   *     parse([expr1, expr2, expr3, ...])
   *     parse([expr1, expr2, expr3, ...], options)
   *
   * Example:
   *
   *     const node = parse('sqrt(3^2 + 4^2)')
   *     node.compile(math).eval() // 5
   *
   *     let scope = {a:3, b:4}
   *     const node = parse('a * b') // 12
   *     const code = node.compile(math)
   *     code.eval(scope) // 12
   *     scope.a = 5
   *     code.eval(scope) // 20
   *
   *     const nodes = math.parse(['a = 3', 'b = 4', 'a * b'])
   *     nodes[2].compile(math).eval() // 12
   *
   * @param {string | string[] | Matrix} expr
   * @param {{nodes: Object<string, Node>}} [options]  Available options:
   *                                                   - `nodes` a set of custom nodes
   * @return {Node | Node[]} node
   * @throws {Error}
   */

  function parse(expr, options) {
    if (arguments.length !== 1 && arguments.length !== 2) {
      throw new ArgumentsError_1('parse', arguments.length, 1, 2);
    } // pass extra nodes


    var extraNodes = options && options.nodes ? options.nodes : {};

    if (typeof expr === 'string') {
      // parse a single expression
      return parseStart(expr, extraNodes);
    } else if (Array.isArray(expr) || expr instanceof type.Matrix) {
      // parse an array or matrix with expressions
      return deepMap(expr, function (elem) {
        if (typeof elem !== 'string') throw new TypeError('String expected');
        return parseStart(elem, extraNodes);
      });
    } else {
      // oops
      throw new TypeError('String or matrix expected');
    }
  } // token types enumeration


  var TOKENTYPE = {
    NULL: 0,
    DELIMITER: 1,
    NUMBER: 2,
    SYMBOL: 3,
    UNKNOWN: 4 // map with all delimiters

  };
  var DELIMITERS = {
    ',': true,
    '(': true,
    ')': true,
    '[': true,
    ']': true,
    '{': true,
    '}': true,
    '"': true,
    '\'': true,
    ';': true,
    '+': true,
    '-': true,
    '*': true,
    '.*': true,
    '/': true,
    './': true,
    '%': true,
    '^': true,
    '.^': true,
    '~': true,
    '!': true,
    '&': true,
    '|': true,
    '^|': true,
    '=': true,
    ':': true,
    '?': true,
    '==': true,
    '!=': true,
    '<': true,
    '>': true,
    '<=': true,
    '>=': true,
    '<<': true,
    '>>': true,
    '>>>': true // map with all named delimiters

  };
  var NAMED_DELIMITERS = {
    'mod': true,
    'to': true,
    'in': true,
    'and': true,
    'xor': true,
    'or': true,
    'not': true
  };
  var CONSTANTS = {
    'true': true,
    'false': false,
    'null': null,
    'undefined': undefined
  };
  var NUMERIC_CONSTANTS = ['NaN', 'Infinity'];

  function initialState() {
    return {
      extraNodes: {},
      // current extra nodes, must be careful not to mutate
      expression: '',
      // current expression
      comment: '',
      // last parsed comment
      index: 0,
      // current index in expr
      token: '',
      // current token
      tokenType: TOKENTYPE.NULL,
      // type of the token
      nestingLevel: 0,
      // level of nesting inside parameters, used to ignore newline characters
      conditionalLevel: null // when a conditional is being parsed, the level of the conditional is stored here

    };
  }
  /**
   * View upto `length` characters of the expression starting at the current character.
   *
   * @param {State} state
   * @param {number} [length=1] Number of characters to view
   * @returns {string}
   * @private
   */


  function currentString(state, length) {
    return state.expression.substr(state.index, length);
  }
  /**
   * View the current character. Returns '' if end of expression is reached.
   *
   * @param {State} state
   * @returns {string}
   * @private
   */


  function currentCharacter(state) {
    return currentString(state, 1);
  }
  /**
   * Get the next character from the expression.
   * The character is stored into the char c. If the end of the expression is
   * reached, the function puts an empty string in c.
   * @private
   */


  function next(state) {
    state.index++;
  }
  /**
   * Preview the previous character from the expression.
   * @return {string} cNext
   * @private
   */


  function prevCharacter(state) {
    return state.expression.charAt(state.index - 1);
  }
  /**
   * Preview the next character from the expression.
   * @return {string} cNext
   * @private
   */


  function nextCharacter(state) {
    return state.expression.charAt(state.index + 1);
  }
  /**
   * Get next token in the current string expr.
   * The token and token type are available as token and tokenType
   * @private
   */


  function getToken(state) {
    state.tokenType = TOKENTYPE.NULL;
    state.token = '';
    state.comment = ''; // skip over whitespaces
    // space, tab, and newline when inside parameters

    while (parse.isWhitespace(currentCharacter(state), state.nestingLevel)) {
      next(state);
    } // skip comment


    if (currentCharacter(state) === '#') {
      while (currentCharacter(state) !== '\n' && currentCharacter(state) !== '') {
        state.comment += currentCharacter(state);
        next(state);
      }
    } // check for end of expression


    if (currentCharacter(state) === '') {
      // token is still empty
      state.tokenType = TOKENTYPE.DELIMITER;
      return;
    } // check for new line character


    if (currentCharacter(state) === '\n' && !state.nestingLevel) {
      state.tokenType = TOKENTYPE.DELIMITER;
      state.token = currentCharacter(state);
      next(state);
      return;
    }

    var c1 = currentCharacter(state);
    var c2 = currentString(state, 2);
    var c3 = currentString(state, 3);

    if (c3.length === 3 && DELIMITERS[c3]) {
      state.tokenType = TOKENTYPE.DELIMITER;
      state.token = c3;
      next(state);
      next(state);
      next(state);
      return;
    } // check for delimiters consisting of 2 characters


    if (c2.length === 2 && DELIMITERS[c2]) {
      state.tokenType = TOKENTYPE.DELIMITER;
      state.token = c2;
      next(state);
      next(state);
      return;
    } // check for delimiters consisting of 1 character


    if (DELIMITERS[c1]) {
      state.tokenType = TOKENTYPE.DELIMITER;
      state.token = c1;
      next(state);
      return;
    } // check for a number


    if (parse.isDigitDot(c1)) {
      state.tokenType = TOKENTYPE.NUMBER; // get number, can have a single dot

      if (currentCharacter(state) === '.') {
        state.token += currentCharacter(state);
        next(state);

        if (!parse.isDigit(currentCharacter(state))) {
          // this is no number, it is just a dot (can be dot notation)
          state.tokenType = TOKENTYPE.DELIMITER;
        }
      } else {
        while (parse.isDigit(currentCharacter(state))) {
          state.token += currentCharacter(state);
          next(state);
        }

        if (parse.isDecimalMark(currentCharacter(state), nextCharacter(state))) {
          state.token += currentCharacter(state);
          next(state);
        }
      }

      while (parse.isDigit(currentCharacter(state))) {
        state.token += currentCharacter(state);
        next(state);
      } // check for exponential notation like "2.3e-4", "1.23e50" or "2e+4"


      if (currentCharacter(state) === 'E' || currentCharacter(state) === 'e') {
        if (parse.isDigit(nextCharacter(state)) || nextCharacter(state) === '-' || nextCharacter(state) === '+') {
          state.token += currentCharacter(state);
          next(state);

          if (currentCharacter(state) === '+' || currentCharacter(state) === '-') {
            state.token += currentCharacter(state);
            next(state);
          } // Scientific notation MUST be followed by an exponent


          if (!parse.isDigit(currentCharacter(state))) {
            throw createSyntaxError(state, 'Digit expected, got "' + currentCharacter(state) + '"');
          }

          while (parse.isDigit(currentCharacter(state))) {
            state.token += currentCharacter(state);
            next(state);
          }

          if (parse.isDecimalMark(currentCharacter(state), nextCharacter(state))) {
            throw createSyntaxError(state, 'Digit expected, got "' + currentCharacter(state) + '"');
          }
        } else if (nextCharacter(state) === '.') {
          next(state);
          throw createSyntaxError(state, 'Digit expected, got "' + currentCharacter(state) + '"');
        }
      }

      return;
    } // check for variables, functions, named operators


    if (parse.isAlpha(currentCharacter(state), prevCharacter(state), nextCharacter(state))) {
      while (parse.isAlpha(currentCharacter(state), prevCharacter(state), nextCharacter(state)) || parse.isDigit(currentCharacter(state))) {
        state.token += currentCharacter(state);
        next(state);
      }

      if (NAMED_DELIMITERS.hasOwnProperty(state.token)) {
        state.tokenType = TOKENTYPE.DELIMITER;
      } else {
        state.tokenType = TOKENTYPE.SYMBOL;
      }

      return;
    } // something unknown is found, wrong characters -> a syntax error


    state.tokenType = TOKENTYPE.UNKNOWN;

    while (currentCharacter(state) !== '') {
      state.token += currentCharacter(state);
      next(state);
    }

    throw createSyntaxError(state, 'Syntax error in part "' + state.token + '"');
  }
  /**
   * Get next token and skip newline tokens
   */


  function getTokenSkipNewline(state) {
    do {
      getToken(state);
    } while (state.token === '\n'); // eslint-disable-line no-unmodified-loop-condition

  }
  /**
   * Open parameters.
   * New line characters will be ignored until closeParams(state) is called
   */


  function openParams(state) {
    state.nestingLevel++;
  }
  /**
   * Close parameters.
   * New line characters will no longer be ignored
   */


  function closeParams(state) {
    state.nestingLevel--;
  }
  /**
   * Checks whether the current character `c` is a valid alpha character:
   *
   * - A latin letter (upper or lower case) Ascii: a-z, A-Z
   * - An underscore                        Ascii: _
   * - A dollar sign                        Ascii: $
   * - A latin letter with accents          Unicode: \u00C0 - \u02AF
   * - A greek letter                       Unicode: \u0370 - \u03FF
   * - A mathematical alphanumeric symbol   Unicode: \u{1D400} - \u{1D7FF} excluding invalid code points
   *
   * The previous and next characters are needed to determine whether
   * this character is part of a unicode surrogate pair.
   *
   * @param {string} c      Current character in the expression
   * @param {string} cPrev  Previous character
   * @param {string} cNext  Next character
   * @return {boolean}
   */


  parse.isAlpha = function isAlpha(c, cPrev, cNext) {
    return parse.isValidLatinOrGreek(c) || parse.isValidMathSymbol(c, cNext) || parse.isValidMathSymbol(cPrev, c);
  };
  /**
   * Test whether a character is a valid latin, greek, or letter-like character
   * @param {string} c
   * @return {boolean}
   */


  parse.isValidLatinOrGreek = function isValidLatinOrGreek(c) {
    return /^[a-zA-Z_$\u00C0-\u02AF\u0370-\u03FF\u2100-\u214F]$/.test(c);
  };
  /**
   * Test whether two given 16 bit characters form a surrogate pair of a
   * unicode math symbol.
   *
   * https://unicode-table.com/en/
   * https://www.wikiwand.com/en/Mathematical_operators_and_symbols_in_Unicode
   *
   * Note: In ES6 will be unicode aware:
   * https://stackoverflow.com/questions/280712/javascript-unicode-regexes
   * https://mathiasbynens.be/notes/es6-unicode-regex
   *
   * @param {string} high
   * @param {string} low
   * @return {boolean}
   */


  parse.isValidMathSymbol = function isValidMathSymbol(high, low) {
    return /^[\uD835]$/.test(high) && /^[\uDC00-\uDFFF]$/.test(low) && /^[^\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]$/.test(low);
  };
  /**
   * Check whether given character c is a white space character: space, tab, or enter
   * @param {string} c
   * @param {number} nestingLevel
   * @return {boolean}
   */


  parse.isWhitespace = function isWhitespace(c, nestingLevel) {
    // TODO: also take '\r' carriage return as newline? Or does that give problems on mac?
    return c === ' ' || c === '\t' || c === '\n' && nestingLevel > 0;
  };
  /**
   * Test whether the character c is a decimal mark (dot).
   * This is the case when it's not the start of a delimiter '.*', './', or '.^'
   * @param {string} c
   * @param {string} cNext
   * @return {boolean}
   */


  parse.isDecimalMark = function isDecimalMark(c, cNext) {
    return c === '.' && cNext !== '/' && cNext !== '*' && cNext !== '^';
  };
  /**
   * checks if the given char c is a digit or dot
   * @param {string} c   a string with one character
   * @return {boolean}
   */


  parse.isDigitDot = function isDigitDot(c) {
    return c >= '0' && c <= '9' || c === '.';
  };
  /**
   * checks if the given char c is a digit
   * @param {string} c   a string with one character
   * @return {boolean}
   */


  parse.isDigit = function isDigit(c) {
    return c >= '0' && c <= '9';
  };
  /**
   * Start of the parse levels below, in order of precedence
   * @return {Node} node
   * @private
   */


  function parseStart(expression, extraNodes) {
    var state = initialState();

    _extends$2(state, {
      expression: expression,
      extraNodes: extraNodes
    });

    getToken(state);
    var node = parseBlock(state); // check for garbage at the end of the expression
    // an expression ends with a empty character '' and tokenType DELIMITER

    if (state.token !== '') {
      if (state.tokenType === TOKENTYPE.DELIMITER) {
        // user entered a not existing operator like "//"
        // TODO: give hints for aliases, for example with "<>" give as hint " did you mean !== ?"
        throw createError(state, 'Unexpected operator ' + state.token);
      } else {
        throw createSyntaxError(state, 'Unexpected part "' + state.token + '"');
      }
    }

    return node;
  }
  /**
   * Parse a block with expressions. Expressions can be separated by a newline
   * character '\n', or by a semicolon ';'. In case of a semicolon, no output
   * of the preceding line is returned.
   * @return {Node} node
   * @private
   */


  function parseBlock(state) {
    var node;
    var blocks = [];
    var visible;

    if (state.token !== '' && state.token !== '\n' && state.token !== ';') {
      node = parseAssignment(state);
      node.comment = state.comment;
    } // TODO: simplify this loop


    while (state.token === '\n' || state.token === ';') {
      // eslint-disable-line no-unmodified-loop-condition
      if (blocks.length === 0 && node) {
        visible = state.token !== ';';
        blocks.push({
          node: node,
          visible: visible
        });
      }

      getToken(state);

      if (state.token !== '\n' && state.token !== ';' && state.token !== '') {
        node = parseAssignment(state);
        node.comment = state.comment;
        visible = state.token !== ';';
        blocks.push({
          node: node,
          visible: visible
        });
      }
    }

    if (blocks.length > 0) {
      return new BlockNode$1(blocks);
    } else {
      if (!node) {
        node = new ConstantNode$1(undefined);
        node.comment = state.comment;
      }

      return node;
    }
  }
  /**
   * Assignment of a function or variable,
   * - can be a variable like 'a=2.3'
   * - or a updating an existing variable like 'matrix(2,3:5)=[6,7,8]'
   * - defining a function like 'f(x) = x^2'
   * @return {Node} node
   * @private
   */


  function parseAssignment(state) {
    var name, args, value, valid;
    var node = parseConditional(state);

    if (state.token === '=') {
      if (type.isSymbolNode(node)) {
        // parse a variable assignment like 'a = 2/3'
        name = node.name;
        getTokenSkipNewline(state);
        value = parseAssignment(state);
        return new AssignmentNode$1(new SymbolNode$1(name), value);
      } else if (type.isAccessorNode(node)) {
        // parse a matrix subset assignment like 'A[1,2] = 4'
        getTokenSkipNewline(state);
        value = parseAssignment(state);
        return new AssignmentNode$1(node.object, node.index, value);
      } else if (type.isFunctionNode(node) && type.isSymbolNode(node.fn)) {
        // parse function assignment like 'f(x) = x^2'
        valid = true;
        args = [];
        name = node.name;
        node.args.forEach(function (arg, index) {
          if (type.isSymbolNode(arg)) {
            args[index] = arg.name;
          } else {
            valid = false;
          }
        });

        if (valid) {
          getTokenSkipNewline(state);
          value = parseAssignment(state);
          return new FunctionAssignmentNode$1(name, args, value);
        }
      }

      throw createSyntaxError(state, 'Invalid left hand side of assignment operator =');
    }

    return node;
  }
  /**
   * conditional operation
   *
   *     condition ? truePart : falsePart
   *
   * Note: conditional operator is right-associative
   *
   * @return {Node} node
   * @private
   */


  function parseConditional(state) {
    var node = parseLogicalOr(state);

    while (state.token === '?') {
      // eslint-disable-line no-unmodified-loop-condition
      // set a conditional level, the range operator will be ignored as long
      // as conditionalLevel === state.nestingLevel.
      var prev = state.conditionalLevel;
      state.conditionalLevel = state.nestingLevel;
      getTokenSkipNewline(state);
      var condition = node;
      var trueExpr = parseAssignment(state);
      if (state.token !== ':') throw createSyntaxError(state, 'False part of conditional expression expected');
      state.conditionalLevel = null;
      getTokenSkipNewline(state);
      var falseExpr = parseAssignment(state); // Note: check for conditional operator again, right associativity

      node = new ConditionalNode$1(condition, trueExpr, falseExpr); // restore the previous conditional level

      state.conditionalLevel = prev;
    }

    return node;
  }
  /**
   * logical or, 'x or y'
   * @return {Node} node
   * @private
   */


  function parseLogicalOr(state) {
    var node = parseLogicalXor(state);

    while (state.token === 'or') {
      // eslint-disable-line no-unmodified-loop-condition
      getTokenSkipNewline(state);
      node = new OperatorNode$1('or', 'or', [node, parseLogicalXor(state)]);
    }

    return node;
  }
  /**
   * logical exclusive or, 'x xor y'
   * @return {Node} node
   * @private
   */


  function parseLogicalXor(state) {
    var node = parseLogicalAnd(state);

    while (state.token === 'xor') {
      // eslint-disable-line no-unmodified-loop-condition
      getTokenSkipNewline(state);
      node = new OperatorNode$1('xor', 'xor', [node, parseLogicalAnd(state)]);
    }

    return node;
  }
  /**
   * logical and, 'x and y'
   * @return {Node} node
   * @private
   */


  function parseLogicalAnd(state) {
    var node = parseBitwiseOr(state);

    while (state.token === 'and') {
      // eslint-disable-line no-unmodified-loop-condition
      getTokenSkipNewline(state);
      node = new OperatorNode$1('and', 'and', [node, parseBitwiseOr(state)]);
    }

    return node;
  }
  /**
   * bitwise or, 'x | y'
   * @return {Node} node
   * @private
   */


  function parseBitwiseOr(state) {
    var node = parseBitwiseXor(state);

    while (state.token === '|') {
      // eslint-disable-line no-unmodified-loop-condition
      getTokenSkipNewline(state);
      node = new OperatorNode$1('|', 'bitOr', [node, parseBitwiseXor(state)]);
    }

    return node;
  }
  /**
   * bitwise exclusive or (xor), 'x ^| y'
   * @return {Node} node
   * @private
   */


  function parseBitwiseXor(state) {
    var node = parseBitwiseAnd(state);

    while (state.token === '^|') {
      // eslint-disable-line no-unmodified-loop-condition
      getTokenSkipNewline(state);
      node = new OperatorNode$1('^|', 'bitXor', [node, parseBitwiseAnd(state)]);
    }

    return node;
  }
  /**
   * bitwise and, 'x & y'
   * @return {Node} node
   * @private
   */


  function parseBitwiseAnd(state) {
    var node = parseRelational(state);

    while (state.token === '&') {
      // eslint-disable-line no-unmodified-loop-condition
      getTokenSkipNewline(state);
      node = new OperatorNode$1('&', 'bitAnd', [node, parseRelational(state)]);
    }

    return node;
  }
  /**
   * Parse a chained conditional, like 'a > b >= c'
   * @return {Node} node
   */


  function parseRelational(state) {
    var params = [parseShift(state)];
    var conditionals = [];
    var operators = {
      '==': 'equal',
      '!=': 'unequal',
      '<': 'smaller',
      '>': 'larger',
      '<=': 'smallerEq',
      '>=': 'largerEq'
    };

    while (operators.hasOwnProperty(state.token)) {
      // eslint-disable-line no-unmodified-loop-condition
      var cond = {
        name: state.token,
        fn: operators[state.token]
      };
      conditionals.push(cond);
      getTokenSkipNewline(state);
      params.push(parseShift(state));
    }

    if (params.length === 1) {
      return params[0];
    } else if (params.length === 2) {
      return new OperatorNode$1(conditionals[0].name, conditionals[0].fn, params);
    } else {
      return new RelationalNode$1(conditionals.map(function (c) {
        return c.fn;
      }), params);
    }
  }
  /**
   * Bitwise left shift, bitwise right arithmetic shift, bitwise right logical shift
   * @return {Node} node
   * @private
   */


  function parseShift(state) {
    var node, operators, name, fn, params;
    node = parseConversion(state);
    operators = {
      '<<': 'leftShift',
      '>>': 'rightArithShift',
      '>>>': 'rightLogShift'
    };

    while (operators.hasOwnProperty(state.token)) {
      name = state.token;
      fn = operators[name];
      getTokenSkipNewline(state);
      params = [node, parseConversion(state)];
      node = new OperatorNode$1(name, fn, params);
    }

    return node;
  }
  /**
   * conversion operators 'to' and 'in'
   * @return {Node} node
   * @private
   */


  function parseConversion(state) {
    var node, operators, name, fn, params;
    node = parseRange(state);
    operators = {
      'to': 'to',
      'in': 'to' // alias of 'to'

    };

    while (operators.hasOwnProperty(state.token)) {
      name = state.token;
      fn = operators[name];
      getTokenSkipNewline(state);

      if (name === 'in' && state.token === '') {
        // end of expression -> this is the unit 'in' ('inch')
        node = new OperatorNode$1('*', 'multiply', [node, new SymbolNode$1('in')], true);
      } else {
        // operator 'a to b' or 'a in b'
        params = [node, parseRange(state)];
        node = new OperatorNode$1(name, fn, params);
      }
    }

    return node;
  }
  /**
   * parse range, "start:end", "start:step:end", ":", "start:", ":end", etc
   * @return {Node} node
   * @private
   */


  function parseRange(state) {
    var node;
    var params = [];

    if (state.token === ':') {
      // implicit start=1 (one-based)
      node = new ConstantNode$1(1);
    } else {
      // explicit start
      node = parseAddSubtract(state);
    }

    if (state.token === ':' && state.conditionalLevel !== state.nestingLevel) {
      // we ignore the range operator when a conditional operator is being processed on the same level
      params.push(node); // parse step and end

      while (state.token === ':' && params.length < 3) {
        // eslint-disable-line no-unmodified-loop-condition
        getTokenSkipNewline(state);

        if (state.token === ')' || state.token === ']' || state.token === ',' || state.token === '') {
          // implicit end
          params.push(new SymbolNode$1('end'));
        } else {
          // explicit end
          params.push(parseAddSubtract(state));
        }
      }

      if (params.length === 3) {
        // params = [start, step, end]
        node = new RangeNode$1(params[0], params[2], params[1]); // start, end, step
      } else {
        // length === 2
        // params = [start, end]
        node = new RangeNode$1(params[0], params[1]); // start, end
      }
    }

    return node;
  }
  /**
   * add or subtract
   * @return {Node} node
   * @private
   */


  function parseAddSubtract(state) {
    var node, operators, name, fn, params;
    node = parseMultiplyDivide(state);
    operators = {
      '+': 'add',
      '-': 'subtract'
    };

    while (operators.hasOwnProperty(state.token)) {
      name = state.token;
      fn = operators[name];
      getTokenSkipNewline(state);
      params = [node, parseMultiplyDivide(state)];
      node = new OperatorNode$1(name, fn, params);
    }

    return node;
  }
  /**
   * multiply, divide, modulus
   * @return {Node} node
   * @private
   */


  function parseMultiplyDivide(state) {
    var node, last, operators, name, fn;
    node = parseImplicitMultiplication(state);
    last = node;
    operators = {
      '*': 'multiply',
      '.*': 'dotMultiply',
      '/': 'divide',
      './': 'dotDivide',
      '%': 'mod',
      'mod': 'mod'
    };

    while (true) {
      if (operators.hasOwnProperty(state.token)) {
        // explicit operators
        name = state.token;
        fn = operators[name];
        getTokenSkipNewline(state);
        last = parseImplicitMultiplication(state);
        node = new OperatorNode$1(name, fn, [node, last]);
      } else {
        break;
      }
    }

    return node;
  }
  /**
   * implicit multiplication
   * @return {Node} node
   * @private
   */


  function parseImplicitMultiplication(state) {
    var node, last;
    node = parseRule2(state);
    last = node;

    while (true) {
      if (state.tokenType === TOKENTYPE.SYMBOL || state.token === 'in' && type.isConstantNode(node) || state.tokenType === TOKENTYPE.NUMBER && !type.isConstantNode(last) && (!type.isOperatorNode(last) || last.op === '!') || state.token === '(') {
        // parse implicit multiplication
        //
        // symbol:      implicit multiplication like '2a', '(2+3)a', 'a b'
        // number:      implicit multiplication like '(2+3)2'
        // parenthesis: implicit multiplication like '2(3+4)', '(3+4)(1+2)'
        last = parseRule2(state);
        node = new OperatorNode$1('*', 'multiply', [node, last], true
        /* implicit */
        );
      } else {
        break;
      }
    }

    return node;
  }
  /**
   * Infamous "rule 2" as described in https://github.com/josdejong/mathjs/issues/792#issuecomment-361065370
   * Explicit division gets higher precedence than implicit multiplication
   * when the division matches this pattern: [number] / [number] [symbol]
   * @return {Node} node
   * @private
   */


  function parseRule2(state) {
    var node = parseUnary(state);
    var last = node;
    var tokenStates = [];

    while (true) {
      // Match the "number /" part of the pattern "number / number symbol"
      if (state.token === '/' && type.isConstantNode(last)) {
        // Look ahead to see if the next token is a number
        tokenStates.push(_extends$2({}, state));
        getTokenSkipNewline(state); // Match the "number / number" part of the pattern

        if (state.tokenType === TOKENTYPE.NUMBER) {
          // Look ahead again
          tokenStates.push(_extends$2({}, state));
          getTokenSkipNewline(state); // Match the "symbol" part of the pattern, or a left parenthesis

          if (state.tokenType === TOKENTYPE.SYMBOL || state.token === '(') {
            // We've matched the pattern "number / number symbol".
            // Rewind once and build the "number / number" node; the symbol will be consumed later
            _extends$2(state, tokenStates.pop());

            tokenStates.pop();
            last = parseUnary(state);
            node = new OperatorNode$1('/', 'divide', [node, last]);
          } else {
            // Not a match, so rewind
            tokenStates.pop();

            _extends$2(state, tokenStates.pop());

            break;
          }
        } else {
          // Not a match, so rewind
          _extends$2(state, tokenStates.pop());

          break;
        }
      } else {
        break;
      }
    }

    return node;
  }
  /**
   * Unary plus and minus, and logical and bitwise not
   * @return {Node} node
   * @private
   */


  function parseUnary(state) {
    var name, params, fn;
    var operators = {
      '-': 'unaryMinus',
      '+': 'unaryPlus',
      '~': 'bitNot',
      'not': 'not'
    };

    if (operators.hasOwnProperty(state.token)) {
      fn = operators[state.token];
      name = state.token;
      getTokenSkipNewline(state);
      params = [parseUnary(state)];
      return new OperatorNode$1(name, fn, params);
    }

    return parsePow(state);
  }
  /**
   * power
   * Note: power operator is right associative
   * @return {Node} node
   * @private
   */


  function parsePow(state) {
    var node, name, fn, params;
    node = parseLeftHandOperators(state);

    if (state.token === '^' || state.token === '.^') {
      name = state.token;
      fn = name === '^' ? 'pow' : 'dotPow';
      getTokenSkipNewline(state);
      params = [node, parseUnary(state)]; // Go back to unary, we can have '2^-3'

      node = new OperatorNode$1(name, fn, params);
    }

    return node;
  }
  /**
   * Left hand operators: factorial x!, ctranspose x'
   * @return {Node} node
   * @private
   */


  function parseLeftHandOperators(state) {
    var node, operators, name, fn, params;
    node = parseCustomNodes(state);
    operators = {
      '!': 'factorial',
      '\'': 'ctranspose'
    };

    while (operators.hasOwnProperty(state.token)) {
      name = state.token;
      fn = operators[name];
      getToken(state);
      params = [node];
      node = new OperatorNode$1(name, fn, params);
      node = parseAccessors(state, node);
    }

    return node;
  }
  /**
   * Parse a custom node handler. A node handler can be used to process
   * nodes in a custom way, for example for handling a plot.
   *
   * A handler must be passed as second argument of the parse function.
   * - must extend math.expression.node.Node
   * - must contain a function _compile(defs: Object) : string
   * - must contain a function find(filter: Object) : Node[]
   * - must contain a function toString() : string
   * - the constructor is called with a single argument containing all parameters
   *
   * For example:
   *
   *     nodes = {
   *       'plot': PlotHandler
   *     }
   *
   * The constructor of the handler is called as:
   *
   *     node = new PlotHandler(params)
   *
   * The handler will be invoked when evaluating an expression like:
   *
   *     node = math.parse('plot(sin(x), x)', nodes)
   *
   * @return {Node} node
   * @private
   */


  function parseCustomNodes(state) {
    var params = [];

    if (state.tokenType === TOKENTYPE.SYMBOL && state.extraNodes.hasOwnProperty(state.token)) {
      var CustomNode = state.extraNodes[state.token];
      getToken(state); // parse parameters

      if (state.token === '(') {
        params = [];
        openParams(state);
        getToken(state);

        if (state.token !== ')') {
          params.push(parseAssignment(state)); // parse a list with parameters

          while (state.token === ',') {
            // eslint-disable-line no-unmodified-loop-condition
            getToken(state);
            params.push(parseAssignment(state));
          }
        }

        if (state.token !== ')') {
          throw createSyntaxError(state, 'Parenthesis ) expected');
        }

        closeParams(state);
        getToken(state);
      } // create a new custom node
      // noinspection JSValidateTypes


      return new CustomNode(params);
    }

    return parseSymbol(state);
  }
  /**
   * parse symbols: functions, variables, constants, units
   * @return {Node} node
   * @private
   */


  function parseSymbol(state) {
    var node, name;

    if (state.tokenType === TOKENTYPE.SYMBOL || state.tokenType === TOKENTYPE.DELIMITER && state.token in NAMED_DELIMITERS) {
      name = state.token;
      getToken(state);

      if (CONSTANTS.hasOwnProperty(name)) {
        // true, false, null, ...
        node = new ConstantNode$1(CONSTANTS[name]);
      } else if (NUMERIC_CONSTANTS.indexOf(name) !== -1) {
        // NaN, Infinity
        node = new ConstantNode$1(numeric$1(name, 'number'));
      } else {
        node = new SymbolNode$1(name);
      } // parse function parameters and matrix index


      node = parseAccessors(state, node);
      return node;
    }

    return parseDoubleQuotesString(state);
  }
  /**
   * parse accessors:
   * - function invocation in round brackets (...), for example sqrt(2)
   * - index enclosed in square brackets [...], for example A[2,3]
   * - dot notation for properties, like foo.bar
   * @param {Node} node    Node on which to apply the parameters. If there
   *                       are no parameters in the expression, the node
   *                       itself is returned
   * @param {string[]} [types]  Filter the types of notations
   *                            can be ['(', '[', '.']
   * @return {Node} node
   * @private
   */


  function parseAccessors(state, node, types) {
    var params;

    while ((state.token === '(' || state.token === '[' || state.token === '.') && (!types || types.indexOf(state.token) !== -1)) {
      // eslint-disable-line no-unmodified-loop-condition
      params = [];

      if (state.token === '(') {
        if (type.isSymbolNode(node) || type.isAccessorNode(node)) {
          // function invocation like fn(2, 3) or obj.fn(2, 3)
          openParams(state);
          getToken(state);

          if (state.token !== ')') {
            params.push(parseAssignment(state)); // parse a list with parameters

            while (state.token === ',') {
              // eslint-disable-line no-unmodified-loop-condition
              getToken(state);
              params.push(parseAssignment(state));
            }
          }

          if (state.token !== ')') {
            throw createSyntaxError(state, 'Parenthesis ) expected');
          }

          closeParams(state);
          getToken(state);
          node = new FunctionNode$1(node, params);
        } else {
          // implicit multiplication like (2+3)(4+5) or sqrt(2)(1+2)
          // don't parse it here but let it be handled by parseImplicitMultiplication
          // with correct precedence
          return node;
        }
      } else if (state.token === '[') {
        // index notation like variable[2, 3]
        openParams(state);
        getToken(state);

        if (state.token !== ']') {
          params.push(parseAssignment(state)); // parse a list with parameters

          while (state.token === ',') {
            // eslint-disable-line no-unmodified-loop-condition
            getToken(state);
            params.push(parseAssignment(state));
          }
        }

        if (state.token !== ']') {
          throw createSyntaxError(state, 'Parenthesis ] expected');
        }

        closeParams(state);
        getToken(state);
        node = new AccessorNode$1(node, new IndexNode$1(params));
      } else {
        // dot notation like variable.prop
        getToken(state);

        if (state.tokenType !== TOKENTYPE.SYMBOL) {
          throw createSyntaxError(state, 'Property name expected after dot');
        }

        params.push(new ConstantNode$1(state.token));
        getToken(state);
        var dotNotation = true;
        node = new AccessorNode$1(node, new IndexNode$1(params, dotNotation));
      }
    }

    return node;
  }
  /**
   * Parse a double quotes string.
   * @return {Node} node
   * @private
   */


  function parseDoubleQuotesString(state) {
    var node, str;

    if (state.token === '"') {
      str = parseDoubleQuotesStringToken(state); // create constant

      node = new ConstantNode$1(str); // parse index parameters

      node = parseAccessors(state, node);
      return node;
    }

    return parseSingleQuotesString(state);
  }
  /**
   * Parse a string surrounded by double quotes "..."
   * @return {string}
   */


  function parseDoubleQuotesStringToken(state) {
    var str = '';

    while (currentCharacter(state) !== '' && currentCharacter(state) !== '"') {
      if (currentCharacter(state) === '\\') {
        // escape character, immediately process the next
        // character to prevent stopping at a next '\"'
        str += currentCharacter(state);
        next(state);
      }

      str += currentCharacter(state);
      next(state);
    }

    getToken(state);

    if (state.token !== '"') {
      throw createSyntaxError(state, 'End of string " expected');
    }

    getToken(state);
    return JSON.parse('"' + str + '"'); // unescape escaped characters
  }
  /**
   * Parse a single quotes string.
   * @return {Node} node
   * @private
   */


  function parseSingleQuotesString(state) {
    var node, str;

    if (state.token === '\'') {
      str = parseSingleQuotesStringToken(state); // create constant

      node = new ConstantNode$1(str); // parse index parameters

      node = parseAccessors(state, node);
      return node;
    }

    return parseMatrix(state);
  }
  /**
   * Parse a string surrounded by single quotes '...'
   * @return {string}
   */


  function parseSingleQuotesStringToken(state) {
    var str = '';

    while (currentCharacter(state) !== '' && currentCharacter(state) !== '\'') {
      if (currentCharacter(state) === '\\') {
        // escape character, immediately process the next
        // character to prevent stopping at a next '\''
        str += currentCharacter(state);
        next(state);
      }

      str += currentCharacter(state);
      next(state);
    }

    getToken(state);

    if (state.token !== '\'') {
      throw createSyntaxError(state, 'End of string \' expected');
    }

    getToken(state);
    return JSON.parse('"' + str + '"'); // unescape escaped characters
  }
  /**
   * parse the matrix
   * @return {Node} node
   * @private
   */


  function parseMatrix(state) {
    var array, params, rows, cols;

    if (state.token === '[') {
      // matrix [...]
      openParams(state);
      getToken(state);

      if (state.token !== ']') {
        // this is a non-empty matrix
        var row = parseRow(state);

        if (state.token === ';') {
          // 2 dimensional array
          rows = 1;
          params = [row]; // the rows of the matrix are separated by dot-comma's

          while (state.token === ';') {
            // eslint-disable-line no-unmodified-loop-condition
            getToken(state);
            params[rows] = parseRow(state);
            rows++;
          }

          if (state.token !== ']') {
            throw createSyntaxError(state, 'End of matrix ] expected');
          }

          closeParams(state);
          getToken(state); // check if the number of columns matches in all rows

          cols = params[0].items.length;

          for (var r = 1; r < rows; r++) {
            if (params[r].items.length !== cols) {
              throw createError(state, 'Column dimensions mismatch ' + '(' + params[r].items.length + ' !== ' + cols + ')');
            }
          }

          array = new ArrayNode$1(params);
        } else {
          // 1 dimensional vector
          if (state.token !== ']') {
            throw createSyntaxError(state, 'End of matrix ] expected');
          }

          closeParams(state);
          getToken(state);
          array = row;
        }
      } else {
        // this is an empty matrix "[ ]"
        closeParams(state);
        getToken(state);
        array = new ArrayNode$1([]);
      }

      return parseAccessors(state, array);
    }

    return parseObject(state);
  }
  /**
   * Parse a single comma-separated row from a matrix, like 'a, b, c'
   * @return {ArrayNode} node
   */


  function parseRow(state) {
    var params = [parseAssignment(state)];
    var len = 1;

    while (state.token === ',') {
      // eslint-disable-line no-unmodified-loop-condition
      getToken(state); // parse expression

      params[len] = parseAssignment(state);
      len++;
    }

    return new ArrayNode$1(params);
  }
  /**
   * parse an object, enclosed in angle brackets{...}, for example {value: 2}
   * @return {Node} node
   * @private
   */


  function parseObject(state) {
    if (state.token === '{') {
      openParams(state);
      var key;
      var properties = {};

      do {
        getToken(state);

        if (state.token !== '}') {
          // parse key
          if (state.token === '"') {
            key = parseDoubleQuotesStringToken(state);
          } else if (state.token === '\'') {
            key = parseSingleQuotesStringToken(state);
          } else if (state.tokenType === TOKENTYPE.SYMBOL) {
            key = state.token;
            getToken(state);
          } else {
            throw createSyntaxError(state, 'Symbol or string expected as object key');
          } // parse key/value separator


          if (state.token !== ':') {
            throw createSyntaxError(state, 'Colon : expected after object key');
          }

          getToken(state); // parse key

          properties[key] = parseAssignment(state);
        }
      } while (state.token === ','); // eslint-disable-line no-unmodified-loop-condition


      if (state.token !== '}') {
        throw createSyntaxError(state, 'Comma , or bracket } expected after object value');
      }

      closeParams(state);
      getToken(state);
      var node = new ObjectNode$1(properties); // parse index parameters

      node = parseAccessors(state, node);
      return node;
    }

    return parseNumber(state);
  }
  /**
   * parse a number
   * @return {Node} node
   * @private
   */


  function parseNumber(state) {
    var numberStr;

    if (state.tokenType === TOKENTYPE.NUMBER) {
      // this is a number
      numberStr = state.token;
      getToken(state);
      return new ConstantNode$1(numeric$1(numberStr, config.number));
    }

    return parseParentheses(state);
  }
  /**
   * parentheses
   * @return {Node} node
   * @private
   */


  function parseParentheses(state) {
    var node; // check if it is a parenthesized expression

    if (state.token === '(') {
      // parentheses (...)
      openParams(state);
      getToken(state);
      node = parseAssignment(state); // start again

      if (state.token !== ')') {
        throw createSyntaxError(state, 'Parenthesis ) expected');
      }

      closeParams(state);
      getToken(state);
      node = new ParenthesisNode$1(node);
      node = parseAccessors(state, node);
      return node;
    }

    return parseEnd(state);
  }
  /**
   * Evaluated when the expression is not yet ended but expected to end
   * @return {Node} res
   * @private
   */


  function parseEnd(state) {
    if (state.token === '') {
      // syntax error or unexpected end of expression
      throw createSyntaxError(state, 'Unexpected end of expression');
    } else {
      throw createSyntaxError(state, 'Value expected');
    }
  }
  /**
   * Shortcut for getting the current row value (one based)
   * Returns the line of the currently handled expression
   * @private
   */

  /* TODO: implement keeping track on the row number
  function row () {
    return null
  }
  */

  /**
   * Shortcut for getting the current col value (one based)
   * Returns the column (position) where the last state.token starts
   * @private
   */


  function col(state) {
    return state.index - state.token.length + 1;
  }
  /**
   * Create an error
   * @param {string} message
   * @return {SyntaxError} instantiated error
   * @private
   */


  function createSyntaxError(state, message) {
    var c = col(state);
    var error = new SyntaxError(message + ' (char ' + c + ')');
    error['char'] = c;
    return error;
  }
  /**
   * Create an error
   * @param {string} message
   * @return {Error} instantiated error
   * @private
   */


  function createError(state, message) {
    var c = col(state);
    var error = new SyntaxError(message + ' (char ' + c + ')');
    error['char'] = c;
    return error;
  }

  return parse;
}

var name$r = 'parse';
var path$j = 'expression';
var factory_1$t = factory$t;

var parse = {
	name: name$r,
	path: path$j,
	factory: factory_1$t
};

function factory$u(type, config, load, typed) {
  var parse$1 = load(parse);
  /**
   * Parse an expression. Returns a node tree, which can be evaluated by
   * invoking node.eval().
   *
   * Note the evaluating arbitrary expressions may involve security risks,
   * see [https://mathjs.org/docs/expressions/security.html](https://mathjs.org/docs/expressions/security.html) for more information.
   *
   * Syntax:
   *
   *     math.parse(expr)
   *     math.parse(expr, options)
   *     math.parse([expr1, expr2, expr3, ...])
   *     math.parse([expr1, expr2, expr3, ...], options)
   *
   * Example:
   *
   *     const node1 = math.parse('sqrt(3^2 + 4^2)')
   *     node1.compile().eval() // 5
   *
   *     let scope = {a:3, b:4}
   *     const node2 = math.parse('a * b') // 12
   *     const code2 = node2.compile()
   *     code2.eval(scope) // 12
   *     scope.a = 5
   *     code2.eval(scope) // 20
   *
   *     const nodes = math.parse(['a = 3', 'b = 4', 'a * b'])
   *     nodes[2].compile().eval() // 12
   *
   * See also:
   *
   *     eval, compile
   *
   * @param {string | string[] | Matrix} expr          Expression to be parsed
   * @param {{nodes: Object<string, Node>}} [options]  Available options:
   *                                                   - `nodes` a set of custom nodes
   * @return {Node | Node[]} node
   * @throws {Error}
   */

  return typed('parse', {
    'string | Array | Matrix': parse$1,
    'string | Array | Matrix, Object': parse$1
  });
}

var name$s = 'parse';
var factory_1$u = factory$u;

var parse$1 = {
	name: name$s,
	factory: factory_1$u
};

function factory$v(type, config, load, typed) {
  var parse$1 = load(parse);
  /**
   * Parse and compile an expression.
   * Returns a an object with a function `eval([scope])` to evaluate the
   * compiled expression.
   *
   * Syntax:
   *
   *     math.compile(expr)                       // returns one node
   *     math.compile([expr1, expr2, expr3, ...]) // returns an array with nodes
   *
   * Examples:
   *
   *     const code1 = math.compile('sqrt(3^2 + 4^2)')
   *     code1.eval() // 5
   *
   *     let scope = {a: 3, b: 4}
   *     const code2 = math.compile('a * b') // 12
   *     code2.eval(scope) // 12
   *     scope.a = 5
   *     code2.eval(scope) // 20
   *
   *     const nodes = math.compile(['a = 3', 'b = 4', 'a * b'])
   *     nodes[2].eval() // 12
   *
   * See also:
   *
   *    parse, eval
   *
   * @param {string | string[] | Array | Matrix} expr
   *            The expression to be compiled
   * @return {{eval: Function} | Array.<{eval: Function}>} code
   *            An object with the compiled expression
   * @throws {Error}
   */

  return typed('compile', {
    'string': function string(expr) {
      return parse$1(expr).compile();
    },
    'Array | Matrix': function ArrayMatrix(expr) {
      return deepMap(expr, function (entry) {
        return parse$1(entry).compile();
      });
    }
  });
}

var name$t = 'compile';
var factory_1$v = factory$v;

var compile = {
	name: name$t,
	factory: factory_1$v
};

function factory$w(type, config, load, typed) {
  var parse$1 = load(parse);
  /**
   * Evaluate an expression.
   *
   * Note the evaluating arbitrary expressions may involve security risks,
   * see [https://mathjs.org/docs/expressions/security.html](https://mathjs.org/docs/expressions/security.html) for more information.
   *
   * Syntax:
   *
   *     math.eval(expr)
   *     math.eval(expr, scope)
   *     math.eval([expr1, expr2, expr3, ...])
   *     math.eval([expr1, expr2, expr3, ...], scope)
   *
   * Example:
   *
   *     math.eval('(2+3)/4')                // 1.25
   *     math.eval('sqrt(3^2 + 4^2)')        // 5
   *     math.eval('sqrt(-4)')               // 2i
   *     math.eval(['a=3', 'b=4', 'a*b'])    // [3, 4, 12]
   *
   *     let scope = {a:3, b:4}
   *     math.eval('a * b', scope)           // 12
   *
   * See also:
   *
   *    parse, compile
   *
   * @param {string | string[] | Matrix} expr   The expression to be evaluated
   * @param {Object} [scope]                    Scope to read/write variables
   * @return {*} The result of the expression
   * @throws {Error}
   */

  return typed('compile', {
    'string': function string(expr) {
      var scope = {};
      return parse$1(expr).compile().eval(scope);
    },
    'string, Object': function stringObject(expr, scope) {
      return parse$1(expr).compile().eval(scope);
    },
    'Array | Matrix': function ArrayMatrix(expr) {
      var scope = {};
      return deepMap(expr, function (entry) {
        return parse$1(entry).compile().eval(scope);
      });
    },
    'Array | Matrix, Object': function ArrayMatrixObject(expr, scope) {
      return deepMap(expr, function (entry) {
        return parse$1(entry).compile().eval(scope);
      });
    }
  });
}

var name$u = 'eval';
var factory_1$w = factory$w;

var _eval = {
	name: name$u,
	factory: factory_1$w
};

function factory$x(type, config, load, typed) {
  /**
   * Format a value of any type into a string.
   *
   * Syntax:
   *
   *    math.format(value)
   *    math.format(value, options)
   *    math.format(value, precision)
   *    math.format(value, callback)
   *
   * Where:
   *
   *  - `value: *`
   *    The value to be formatted
   *  - `options: Object`
   *    An object with formatting options. Available options:
   *    - `notation: string`
   *      Number notation. Choose from:
   *      - 'fixed'
   *        Always use regular number notation.
   *        For example '123.40' and '14000000'
   *      - 'exponential'
   *        Always use exponential notation.
   *        For example '1.234e+2' and '1.4e+7'
   *      - 'engineering'
   *        Always use engineering notation.
   *        For example '123.4e+0' and '14.0e+6'
   *      - 'auto' (default)
   *        Regular number notation for numbers having an absolute value between
   *        `lower` and `upper` bounds, and uses exponential notation elsewhere.
   *        Lower bound is included, upper bound is excluded.
   *        For example '123.4' and '1.4e7'.
   *    - `precision: number`
   *      A number between 0 and 16 to round the digits of the number. In case
   *      of notations 'exponential', 'engineering', and 'auto', `precision`
   *      defines the total number of significant digits returned.
   *      In case of notation 'fixed', `precision` defines the number of
   *      significant digits after the decimal point.
   *      `precision` is undefined by default.
   *    - `lowerExp: number`
   *      Exponent determining the lower boundary for formatting a value with
   *      an exponent when `notation='auto`. Default value is `-3`.
   *    - `upperExp: number`
   *      Exponent determining the upper boundary for formatting a value with
   *      an exponent when `notation='auto`. Default value is `5`.
   *    - `fraction: string`. Available values: 'ratio' (default) or 'decimal'.
   *      For example `format(fraction(1, 3))` will output '1/3' when 'ratio' is
   *      configured, and will output `0.(3)` when 'decimal' is configured.
   * - `callback: function`
   *   A custom formatting function, invoked for all numeric elements in `value`,
   *   for example all elements of a matrix, or the real and imaginary
   *   parts of a complex number. This callback can be used to override the
   *   built-in numeric notation with any type of formatting. Function `callback`
   *   is called with `value` as parameter and must return a string.
   *
   * When `value` is an Object:
   *
   * - When the object contains a property `format` being a function, this function
   *   is invoked as `value.format(options)` and the result is returned.
   * - When the object has its own `toString` method, this method is invoked
   *   and the result is returned.
   * - In other cases the function will loop over all object properties and
   *   return JSON object notation like '{"a": 2, "b": 3}'.
   *
   * When value is a function:
   *
   * - When the function has a property `syntax`, it returns this
   *   syntax description.
   * - In other cases, a string `'function'` is returned.
   *
   * Examples:
   *
   *    math.format(6.4)                                        // returns '6.4'
   *    math.format(1240000)                                    // returns '1.24e6'
   *    math.format(1/3)                                        // returns '0.3333333333333333'
   *    math.format(1/3, 3)                                     // returns '0.333'
   *    math.format(21385, 2)                                   // returns '21000'
   *    math.format(12e8, {notation: 'fixed'})                  // returns '1200000000'
   *    math.format(2.3,  {notation: 'fixed', precision: 4})    // returns '2.3000'
   *    math.format(52.8, {notation: 'exponential'})            // returns '5.28e+1'
   *    math.format(12400,{notation: 'engineering'})            // returns '12.400e+3'
   *    math.format(2000, {lowerExp: -2, upperExp: 2})          // returns '2e+3'
   *
   *    function formatCurrency(value) {
   *      // return currency notation with two digits:
   *      return '$' + value.toFixed(2)
   *
   *      // you could also use math.format inside the callback:
   *      // return '$' + math.format(value, {notation: 'fixed', precision: 2})
   *    }
   *    math.format([2.1, 3, 0.016], formatCurrency}            // returns '[$2.10, $3.00, $0.02]'
   *
   * See also:
   *
   *    print
   *
   * @param {*} value                               Value to be stringified
   * @param {Object | Function | number} [options]  Formatting options
   * @return {string} The formatted value
   */
  var format = typed('format', {
    'any': string.format,
    'any, Object | function | number': string.format
  });
  format.toTex = undefined; // use default template

  return format;
}

var name$v = 'format';
var factory_1$x = factory$x;

var format$1 = {
	name: name$v,
	factory: factory_1$x
};

// Load the math.js core


// Create a new, empty math.js instance
// It will only contain methods `import` and `config`
var math$5 = core$1.create();

math$5.import(parse$1);
math$5.import(compile);
math$5.import(_eval);

math$5.import(format$1);

// create simple functions for all operators
math$5.import({
  // arithmetic
  add:        function (a, b) { return a + b },
  subtract:   function (a, b) { return a - b },
  multiply:   function (a, b) { return a * b },
  divide:     function (a, b) { return a / b },
  mod:        function (a, b) { return a % b },
  unaryPlus:  function (a) { return  a },
  unaryMinus: function (a) { return -a },

  // bitwise
  bitOr:           function (a, b) { return a | b },
  bitXor:          function (a, b) { return a ^ b },
  bitAnd:          function (a, b) { return a & b },
  bitNot:          function (a) { return ~a },
  leftShift:       function (a, b) { return a << b },
  rightArithShift: function (a, b) { return a >> b },
  rightLogShift:   function (a, b) { return a >>> b },

  // logical
  or:  function (a, b) { return !!(a || b) },
  xor: function (a, b) { return !!a !== !!b },
  and: function (a, b) { return !!(a && b) },
  not: function (a) { return !a },

  // relational
  equal:     function (a, b) { return a == b },
  unequal:   function (a, b) { return a != b },
  smaller:   function (a, b) { return a < b },
  larger:    function (a, b) { return a > b },
  smallerEq: function (a, b) { return a <= b },
  largerEq:  function (a, b) { return a >= b },

  // matrix
  // matrix: function (a) { return a },
  matrix: function () { 
    throw new Error('Matrices not supported')
  },
  index: function () {
    // TODO: create a simple index function
    throw new Error('Matrix indexes not supported')
  },

  // add pi and e as lowercase
  pi: Math.PI,
  e: Math.E,
  'true': true,
  'false': false,
  'null': null
});

// import everything from Math (like trigonometric functions)
var allFromMath = {};
Object.getOwnPropertyNames(Math).forEach(function (name) {
  // filter out stuff like Firefox's "toSource" method.
  if (!Object.prototype.hasOwnProperty(name)) {
    allFromMath[name] = Math[name];
  }
});
math$5.import(allFromMath);

var mathjsExpressionParser = math$5;

/**
 * Check if `a` is comparative to `b` with the given operator.
 *
 * @example <caption>Is `a` greater than `b`?</caption>
 * const a = 4;
 * const b = 2;
 *
 * compareNumber(a, b, '>'); // true
 *
 * @example <caption>Is `a` equal to `b`?</caption>
 * const a = 4;
 * const b = 2;
 *
 * compareNumber(a, b, '='); // false
 *
 * @param {number} a The number to compare with `b`
 * @param {number} b The number to compare with `a`
 * @param {string} operator A valid comparative operator: `=, <, >, <=, >=, !=`
 *
 * @returns {boolean} `true` if the comparison matches, `false` otherwise
 */
const compareNumbers = (a, b, operator) => {
  const aNum = Number(a);
  const bNum = Number(b);
  let result;

  if (Number.isNaN(aNum) || Number.isNaN(bNum)) {
    return false;
  }

  switch (operator) {
    case '=':
    case '==':
      result = aNum === bNum;
      break;
    case '<':
      result = aNum < bNum;
      break;
    case '>':
      result = aNum > bNum;
      break;
    case '<=':
      result = aNum <= bNum;
      break;
    case '>=':
      result = aNum >= bNum;
      break;
    case '!':
    case '!=':
      result = aNum !== bNum;
      break;
    default:
      result = false;
      break;
  }

  return result;
};

/**
 * Evaluate mathematical strings.
 *
 * @example
 * evaluate('5+6'); // 11
 *
 * @param {string} equation The mathematical equation to compute.
 *
 * @returns {number} The result of the equation
 */
const evaluate = (equation) => mathjsExpressionParser.eval(equation);

/**
 * Check if the given value is a valid finite number.
 *
 * @param {*} val
 *
 * @returns {boolean} `true` if it is a finite number, `false` otherwise
 */
const isNumeric = (val) => {
  if ((typeof val !== 'number') && (typeof val !== 'string')) {
    return false;
  }

  return !Number.isNaN(val) && Number.isFinite(Number(val));
};

/**
 * Check if the given value is a "safe" number.
 *
 * A "safe" number falls within the `Number.MAX_SAFE_INTEGER` and `Number.MIN_SAFE_INTEGER` values
 * (Inclusive).
 *
 * @param {*} val
 *
 * @returns {boolean} `true` if the value is a "safe" number, `false` otherwise
 */
const isSafeNumber = (val) => {
  if (!isNumeric(val)) {
    return false;
  }

  const castVal = Number(val);

  return (castVal <= Number.MAX_SAFE_INTEGER) && (castVal >= Number.MIN_SAFE_INTEGER);
};

/**
 * Take an array of numbers and add the values together.
 *
 * @param {number[]} numbers
 *
 * @returns {number} The summed value
 */
const sumArray = (numbers) => (
  !Array.isArray(numbers) ? 0 : numbers.reduce((prev, current) => (
    prev + (isNumeric(current) ? parseFloat(`${current}`) : 0)
  ), 0)
);

/**
 * Round a number to the given amount of digits after the decimal point, removing any trailing
 * zeros after the decimal point.
 *
 * @example
 * toFixed(1.236, 2); // 1.24
 * toFixed(30.1, 2); // 30.1
 * toFixed(4.0000000004, 3); // 4
 *
 * @param {number} num The number to round
 * @param {number} [precision=0] The number of digits after the decimal point
 *
 * @returns {number}
 */
const toFixed = (num, precision = 0) => (
  // round to precision, then cast to a number to remove trailing zeroes after the decimal point
  parseFloat(parseFloat(`${num}`).toFixed(precision || 0))
);

const SMALLEST_UNSAFE_INTEGER = 0x20000000000000;
const LARGEST_SAFE_INTEGER = SMALLEST_UNSAFE_INTEGER - 1;
const UINT32_MAX = -1 >>> 0;
const UINT32_SIZE = UINT32_MAX + 1;
const INT32_SIZE = UINT32_SIZE / 2;
const INT32_MAX = INT32_SIZE - 1;
const UINT21_SIZE = 1 << 21;
const UINT21_MAX = UINT21_SIZE - 1;

/**
 * Returns a value within [-0x80000000, 0x7fffffff]
 */
function int32(engine) {
    return engine.next() | 0;
}

function add(distribution, addend) {
    if (addend === 0) {
        return distribution;
    }
    else {
        return engine => distribution(engine) + addend;
    }
}

/**
 * Returns a value within [-0x20000000000000, 0x1fffffffffffff]
 */
function int53(engine) {
    const high = engine.next() | 0;
    const low = engine.next() >>> 0;
    return ((high & UINT21_MAX) * UINT32_SIZE +
        low +
        (high & UINT21_SIZE ? -SMALLEST_UNSAFE_INTEGER : 0));
}

/**
 * Returns a value within [-0x20000000000000, 0x20000000000000]
 */
function int53Full(engine) {
    while (true) {
        const high = engine.next() | 0;
        if (high & 0x400000) {
            if ((high & 0x7fffff) === 0x400000 && (engine.next() | 0) === 0) {
                return SMALLEST_UNSAFE_INTEGER;
            }
        }
        else {
            const low = engine.next() >>> 0;
            return ((high & UINT21_MAX) * UINT32_SIZE +
                low +
                (high & UINT21_SIZE ? -SMALLEST_UNSAFE_INTEGER : 0));
        }
    }
}

/**
 * Returns a value within [0, 0xffffffff]
 */
function uint32(engine) {
    return engine.next() >>> 0;
}

/**
 * Returns a value within [0, 0x1fffffffffffff]
 */
function uint53(engine) {
    const high = engine.next() & UINT21_MAX;
    const low = engine.next() >>> 0;
    return high * UINT32_SIZE + low;
}

/**
 * Returns a value within [0, 0x20000000000000]
 */
function uint53Full(engine) {
    while (true) {
        const high = engine.next() | 0;
        if (high & UINT21_SIZE) {
            if ((high & UINT21_MAX) === 0 && (engine.next() | 0) === 0) {
                return SMALLEST_UNSAFE_INTEGER;
            }
        }
        else {
            const low = engine.next() >>> 0;
            return (high & UINT21_MAX) * UINT32_SIZE + low;
        }
    }
}

function isPowerOfTwoMinusOne(value) {
    return ((value + 1) & value) === 0;
}
function bitmask(masking) {
    return (engine) => engine.next() & masking;
}
function downscaleToLoopCheckedRange(range) {
    const extendedRange = range + 1;
    const maximum = extendedRange * Math.floor(UINT32_SIZE / extendedRange);
    return engine => {
        let value = 0;
        do {
            value = engine.next() >>> 0;
        } while (value >= maximum);
        return value % extendedRange;
    };
}
function downscaleToRange(range) {
    if (isPowerOfTwoMinusOne(range)) {
        return bitmask(range);
    }
    else {
        return downscaleToLoopCheckedRange(range);
    }
}
function isEvenlyDivisibleByMaxInt32(value) {
    return (value | 0) === 0;
}
function upscaleWithHighMasking(masking) {
    return engine => {
        const high = engine.next() & masking;
        const low = engine.next() >>> 0;
        return high * UINT32_SIZE + low;
    };
}
function upscaleToLoopCheckedRange(extendedRange) {
    const maximum = extendedRange * Math.floor(SMALLEST_UNSAFE_INTEGER / extendedRange);
    return engine => {
        let ret = 0;
        do {
            const high = engine.next() & UINT21_MAX;
            const low = engine.next() >>> 0;
            ret = high * UINT32_SIZE + low;
        } while (ret >= maximum);
        return ret % extendedRange;
    };
}
function upscaleWithinU53(range) {
    const extendedRange = range + 1;
    if (isEvenlyDivisibleByMaxInt32(extendedRange)) {
        const highRange = ((extendedRange / UINT32_SIZE) | 0) - 1;
        if (isPowerOfTwoMinusOne(highRange)) {
            return upscaleWithHighMasking(highRange);
        }
    }
    return upscaleToLoopCheckedRange(extendedRange);
}
function upscaleWithinI53AndLoopCheck(min, max) {
    return engine => {
        let ret = 0;
        do {
            const high = engine.next() | 0;
            const low = engine.next() >>> 0;
            ret =
                (high & UINT21_MAX) * UINT32_SIZE +
                    low +
                    (high & UINT21_SIZE ? -SMALLEST_UNSAFE_INTEGER : 0);
        } while (ret < min || ret > max);
        return ret;
    };
}
/**
 * Returns a Distribution to return a value within [min, max]
 * @param min The minimum integer value, inclusive. No less than -0x20000000000000.
 * @param max The maximum integer value, inclusive. No greater than 0x20000000000000.
 */
function integer(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    if (min < -SMALLEST_UNSAFE_INTEGER || !isFinite(min)) {
        throw new RangeError(`Expected min to be at least ${-SMALLEST_UNSAFE_INTEGER}`);
    }
    else if (max > SMALLEST_UNSAFE_INTEGER || !isFinite(max)) {
        throw new RangeError(`Expected max to be at most ${SMALLEST_UNSAFE_INTEGER}`);
    }
    const range = max - min;
    if (range <= 0 || !isFinite(range)) {
        return () => min;
    }
    else if (range === UINT32_MAX) {
        if (min === 0) {
            return uint32;
        }
        else {
            return add(int32, min + INT32_SIZE);
        }
    }
    else if (range < UINT32_MAX) {
        return add(downscaleToRange(range), min);
    }
    else if (range === LARGEST_SAFE_INTEGER) {
        return add(uint53, min);
    }
    else if (range < LARGEST_SAFE_INTEGER) {
        return add(upscaleWithinU53(range), min);
    }
    else if (max - 1 - min === LARGEST_SAFE_INTEGER) {
        return add(uint53Full, min);
    }
    else if (min === -SMALLEST_UNSAFE_INTEGER &&
        max === SMALLEST_UNSAFE_INTEGER) {
        return int53Full;
    }
    else if (min === -SMALLEST_UNSAFE_INTEGER && max === LARGEST_SAFE_INTEGER) {
        return int53;
    }
    else if (min === -LARGEST_SAFE_INTEGER && max === SMALLEST_UNSAFE_INTEGER) {
        return add(int53, 1);
    }
    else if (max === SMALLEST_UNSAFE_INTEGER) {
        return add(upscaleWithinI53AndLoopCheck(min - 1, max - 1), 1);
    }
    else {
        return upscaleWithinI53AndLoopCheck(min, max);
    }
}

function isLeastBitTrue(engine) {
    return (engine.next() & 1) === 1;
}
function lessThan(distribution, value) {
    return engine => distribution(engine) < value;
}
function probability(percentage) {
    if (percentage <= 0) {
        return () => false;
    }
    else if (percentage >= 1) {
        return () => true;
    }
    else {
        const scaled = percentage * UINT32_SIZE;
        if (scaled % 1 === 0) {
            return lessThan(int32, (scaled - INT32_SIZE) | 0);
        }
        else {
            return lessThan(uint53, Math.round(percentage * SMALLEST_UNSAFE_INTEGER));
        }
    }
}
function bool(numerator, denominator) {
    if (denominator == null) {
        if (numerator == null) {
            return isLeastBitTrue;
        }
        return probability(numerator);
    }
    else {
        if (numerator <= 0) {
            return () => false;
        }
        else if (numerator >= denominator) {
            return () => true;
        }
        return lessThan(integer(0, denominator - 1), numerator);
    }
}

/**
 * Returns a Distribution that returns a random `Date` within the inclusive
 * range of [`start`, `end`].
 * @param start The minimum `Date`
 * @param end The maximum `Date`
 */
function date(start, end) {
    const distribution = integer(+start, +end);
    return engine => new Date(distribution(engine));
}

/**
 * Returns a Distribution to return a value within [1, sideCount]
 * @param sideCount The number of sides of the die
 */
function die(sideCount) {
    return integer(1, sideCount);
}

/**
 * Returns a distribution that returns an array of length `dieCount` of values
 * within [1, `sideCount`]
 * @param sideCount The number of sides of each die
 * @param dieCount The number of dice
 */
function dice(sideCount, dieCount) {
    const distribution = die(sideCount);
    return engine => {
        const result = [];
        for (let i = 0; i < dieCount; ++i) {
            result.push(distribution(engine));
        }
        return result;
    };
}

// tslint:disable:unified-signatures
// has 2**x chars, for faster uniform distribution
const DEFAULT_STRING_POOL = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
function string$1(pool = DEFAULT_STRING_POOL) {
    const poolLength = pool.length;
    if (!poolLength) {
        throw new Error("Expected pool not to be an empty string");
    }
    const distribution = integer(0, poolLength - 1);
    return (engine, length) => {
        let result = "";
        for (let i = 0; i < length; ++i) {
            const j = distribution(engine);
            result += pool.charAt(j);
        }
        return result;
    };
}

const LOWER_HEX_POOL = "0123456789abcdef";
const lowerHex = string$1(LOWER_HEX_POOL);
const upperHex = string$1(LOWER_HEX_POOL.toUpperCase());
/**
 * Returns a Distribution that returns a random string comprised of numbers
 * or the characters `abcdef` (or `ABCDEF`) of length `length`.
 * @param length Length of the result string
 * @param uppercase Whether the string should use `ABCDEF` instead of `abcdef`
 */
function hex(uppercase) {
    if (uppercase) {
        return upperHex;
    }
    else {
        return lowerHex;
    }
}

function convertSliceArgument(value, length) {
    if (value < 0) {
        return Math.max(value + length, 0);
    }
    else {
        return Math.min(value, length);
    }
}

function toInteger(value) {
    const num = +value;
    if (num < 0) {
        return Math.ceil(num);
    }
    else {
        return Math.floor(num);
    }
}

/**
 * Returns a random value within the provided `source` within the sliced
 * bounds of `begin` and `end`.
 * @param source an array of items to pick from
 * @param begin the beginning slice index (defaults to `0`)
 * @param end the ending slice index (defaults to `source.length`)
 */
function pick(engine, source, begin, end) {
    const length = source.length;
    if (length === 0) {
        throw new RangeError("Cannot pick from an empty array");
    }
    const start = begin == null ? 0 : convertSliceArgument(toInteger(begin), length);
    const finish = end === void 0 ? length : convertSliceArgument(toInteger(end), length);
    if (start >= finish) {
        throw new RangeError(`Cannot pick between bounds ${start} and ${finish}`);
    }
    const distribution = integer(start, finish - 1);
    return source[distribution(engine)];
}

function multiply(distribution, multiplier) {
    if (multiplier === 1) {
        return distribution;
    }
    else if (multiplier === 0) {
        return () => 0;
    }
    else {
        return engine => distribution(engine) * multiplier;
    }
}

/**
 * Returns a floating-point value within [0.0, 1.0)
 */
function realZeroToOneExclusive(engine) {
    return uint53(engine) / SMALLEST_UNSAFE_INTEGER;
}

/**
 * Returns a floating-point value within [0.0, 1.0]
 */
function realZeroToOneInclusive(engine) {
    return uint53Full(engine) / SMALLEST_UNSAFE_INTEGER;
}

/**
 * Returns a floating-point value within [min, max) or [min, max]
 * @param min The minimum floating-point value, inclusive.
 * @param max The maximum floating-point value.
 * @param inclusive If true, `max` will be inclusive.
 */
function real(min, max, inclusive = false) {
    if (!isFinite(min)) {
        throw new RangeError("Expected min to be a finite number");
    }
    else if (!isFinite(max)) {
        throw new RangeError("Expected max to be a finite number");
    }
    return add(multiply(inclusive ? realZeroToOneInclusive : realZeroToOneExclusive, max - min), min);
}

const sliceArray = Array.prototype.slice;

/**
 * Shuffles an array in-place
 * @param engine The Engine to use when choosing random values
 * @param array The array to shuffle
 * @param downTo minimum index to shuffle. Only used internally.
 */
function shuffle(engine, array, downTo = 0) {
    const length = array.length;
    if (length) {
        for (let i = (length - 1) >>> 0; i > downTo; --i) {
            const distribution = integer(0, i);
            const j = distribution(engine);
            if (i !== j) {
                const tmp = array[i];
                array[i] = array[j];
                array[j] = tmp;
            }
        }
    }
    return array;
}

/**
 * From the population array, produce an array with sampleSize elements that
 * are randomly chosen without repeats.
 * @param engine The Engine to use when choosing random values
 * @param population An array that has items to choose a sample from
 * @param sampleSize The size of the result array
 */
function sample(engine, population, sampleSize) {
    if (sampleSize < 0 ||
        sampleSize > population.length ||
        !isFinite(sampleSize)) {
        throw new RangeError("Expected sampleSize to be within 0 and the length of the population");
    }
    if (sampleSize === 0) {
        return [];
    }
    const clone = sliceArray.call(population);
    const length = clone.length;
    if (length === sampleSize) {
        return shuffle(engine, clone, 0);
    }
    const tailLength = length - sampleSize;
    return shuffle(engine, clone, tailLength - 1).slice(tailLength);
}

const stringRepeat = (() => {
    try {
        if ("x".repeat(3) === "xxx") {
            return (pattern, count) => pattern.repeat(count);
        }
    }
    catch (_) {
        // nothing to do here
    }
    return (pattern, count) => {
        let result = "";
        while (count > 0) {
            if (count & 1) {
                result += pattern;
            }
            count >>= 1;
            pattern += pattern;
        }
        return result;
    };
})();

function zeroPad(text, zeroCount) {
    return stringRepeat("0", zeroCount - text.length) + text;
}
/**
 * Returns a Universally Unique Identifier Version 4.
 *
 * See http://en.wikipedia.org/wiki/Universally_unique_identifier
 */
function uuid4(engine) {
    const a = engine.next() >>> 0;
    const b = engine.next() | 0;
    const c = engine.next() | 0;
    const d = engine.next() >>> 0;
    return (zeroPad(a.toString(16), 8) +
        "-" +
        zeroPad((b & 0xffff).toString(16), 4) +
        "-" +
        zeroPad((((b >> 4) & 0x0fff) | 0x4000).toString(16), 4) +
        "-" +
        zeroPad(((c & 0x3fff) | 0x8000).toString(16), 4) +
        "-" +
        zeroPad(((c >> 4) & 0xffff).toString(16), 4) +
        zeroPad(d.toString(16), 8));
}

/**
 * An int32-producing Engine that uses `Math.random()`
 */
const nativeMath = {
    next() {
        return (Math.random() * UINT32_SIZE) | 0;
    }
};

// tslint:disable:unified-signatures
/**
 * A wrapper around an Engine that provides easy-to-use methods for
 * producing values based on known distributions
 */
class Random {
    /**
     * Creates a new Random wrapper
     * @param engine The engine to use (defaults to a `Math.random`-based implementation)
     */
    constructor(engine = nativeMath) {
        this.engine = engine;
    }
    /**
     * Returns a value within [-0x80000000, 0x7fffffff]
     */
    int32() {
        return int32(this.engine);
    }
    /**
     * Returns a value within [0, 0xffffffff]
     */
    uint32() {
        return uint32(this.engine);
    }
    /**
     * Returns a value within [0, 0x1fffffffffffff]
     */
    uint53() {
        return uint53(this.engine);
    }
    /**
     * Returns a value within [0, 0x20000000000000]
     */
    uint53Full() {
        return uint53Full(this.engine);
    }
    /**
     * Returns a value within [-0x20000000000000, 0x1fffffffffffff]
     */
    int53() {
        return int53(this.engine);
    }
    /**
     * Returns a value within [-0x20000000000000, 0x20000000000000]
     */
    int53Full() {
        return int53Full(this.engine);
    }
    /**
     * Returns a value within [min, max]
     * @param min The minimum integer value, inclusive. No less than -0x20000000000000.
     * @param max The maximum integer value, inclusive. No greater than 0x20000000000000.
     */
    integer(min, max) {
        return integer(min, max)(this.engine);
    }
    /**
     * Returns a floating-point value within [0.0, 1.0]
     */
    realZeroToOneInclusive() {
        return realZeroToOneInclusive(this.engine);
    }
    /**
     * Returns a floating-point value within [0.0, 1.0)
     */
    realZeroToOneExclusive() {
        return realZeroToOneExclusive(this.engine);
    }
    /**
     * Returns a floating-point value within [min, max) or [min, max]
     * @param min The minimum floating-point value, inclusive.
     * @param max The maximum floating-point value.
     * @param inclusive If true, `max` will be inclusive.
     */
    real(min, max, inclusive = false) {
        return real(min, max, inclusive)(this.engine);
    }
    bool(numerator, denominator) {
        return bool(numerator, denominator)(this.engine);
    }
    /**
     * Return a random value within the provided `source` within the sliced
     * bounds of `begin` and `end`.
     * @param source an array of items to pick from
     * @param begin the beginning slice index (defaults to `0`)
     * @param end the ending slice index (defaults to `source.length`)
     */
    pick(source, begin, end) {
        return pick(this.engine, source, begin, end);
    }
    /**
     * Shuffles an array in-place
     * @param array The array to shuffle
     */
    shuffle(array) {
        return shuffle(this.engine, array);
    }
    /**
     * From the population array, returns an array with sampleSize elements that
     * are randomly chosen without repeats.
     * @param population An array that has items to choose a sample from
     * @param sampleSize The size of the result array
     */
    sample(population, sampleSize) {
        return sample(this.engine, population, sampleSize);
    }
    /**
     * Returns a value within [1, sideCount]
     * @param sideCount The number of sides of the die
     */
    die(sideCount) {
        return die(sideCount)(this.engine);
    }
    /**
     * Returns an array of length `dieCount` of values within [1, sideCount]
     * @param sideCount The number of sides of each die
     * @param dieCount The number of dice
     */
    dice(sideCount, dieCount) {
        return dice(sideCount, dieCount)(this.engine);
    }
    /**
     * Returns a Universally Unique Identifier Version 4.
     *
     * See http://en.wikipedia.org/wiki/Universally_unique_identifier
     */
    uuid4() {
        return uuid4(this.engine);
    }
    string(length, pool) {
        return string$1(pool)(this.engine, length);
    }
    /**
     * Returns a random string comprised of numbers or the characters `abcdef`
     * (or `ABCDEF`) of length `length`.
     * @param length Length of the result string
     * @param uppercase Whether the string should use `ABCDEF` instead of `abcdef`
     */
    hex(length, uppercase) {
        return hex(uppercase)(this.engine, length);
    }
    /**
     * Returns a random `Date` within the inclusive range of [`start`, `end`].
     * @param start The minimum `Date`
     * @param end The maximum `Date`
     */
    date(start, end) {
        return date(start, end)(this.engine);
    }
}

/**
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array
 */
const I32Array = (() => {
    try {
        const buffer = new ArrayBuffer(4);
        const view = new Int32Array(buffer);
        view[0] = INT32_SIZE;
        if (view[0] === -INT32_SIZE) {
            return Int32Array;
        }
    }
    catch (_) {
        // nothing to do here
    }
    return Array;
})();

let data = null;
const COUNT = 128;
let index$1 = COUNT;
/**
 * An Engine that relies on the globally-available `crypto.getRandomValues`,
 * which is typically available in modern browsers.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
 *
 * If unavailable or otherwise non-functioning, then `browserCrypto` will
 * likely `throw` on the first call to `next()`.
 */
const browserCrypto = {
    next() {
        if (index$1 >= COUNT) {
            if (data === null) {
                data = new I32Array(COUNT);
            }
            crypto.getRandomValues(data);
            index$1 = 0;
        }
        return data[index$1++] | 0;
    }
};

/**
 * Returns an array of random int32 values, based on current time
 * and a random number engine
 *
 * @param engine an Engine to pull random values from, default `nativeMath`
 * @param length the length of the Array, minimum 1, default 16
 */
function createEntropy(engine = nativeMath, length = 16) {
    const array = [];
    array.push(new Date().getTime() | 0);
    for (let i = 1; i < length; ++i) {
        array[i] = engine.next() | 0;
    }
    return array;
}

/**
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
 */
const imul = (() => {
    try {
        if (Math.imul(UINT32_MAX, 5) === -5) {
            return Math.imul;
        }
    }
    catch (_) {
        // nothing to do here
    }
    const UINT16_MAX = 0xffff;
    return (a, b) => {
        const ah = (a >>> 16) & UINT16_MAX;
        const al = a & UINT16_MAX;
        const bh = (b >>> 16) & UINT16_MAX;
        const bl = b & UINT16_MAX;
        // the shift by 0 fixes the sign on the high part
        // the final |0 converts the unsigned value into a signed value
        return (al * bl + (((ah * bl + al * bh) << 16) >>> 0)) | 0;
    };
})();

const ARRAY_SIZE = 624;
const ARRAY_MAX = ARRAY_SIZE - 1;
const M = 397;
const ARRAY_SIZE_MINUS_M = ARRAY_SIZE - M;
const A = 0x9908b0df;
/**
 * An Engine that is a pseudorandom number generator using the Mersenne
 * Twister algorithm based on the prime 2**19937 − 1
 *
 * See http://en.wikipedia.org/wiki/Mersenne_twister
 */
class MersenneTwister19937 {
    /**
     * MersenneTwister19937 should not be instantiated directly.
     * Instead, use the static methods `seed`, `seedWithArray`, or `autoSeed`.
     */
    constructor() {
        this.data = new I32Array(ARRAY_SIZE);
        this.index = 0; // integer within [0, 624]
        this.uses = 0;
    }
    /**
     * Returns a MersenneTwister19937 seeded with an initial int32 value
     * @param initial the initial seed value
     */
    static seed(initial) {
        return new MersenneTwister19937().seed(initial);
    }
    /**
     * Returns a MersenneTwister19937 seeded with zero or more int32 values
     * @param source A series of int32 values
     */
    static seedWithArray(source) {
        return new MersenneTwister19937().seedWithArray(source);
    }
    /**
     * Returns a MersenneTwister19937 seeded with the current time and
     * a series of natively-generated random values
     */
    static autoSeed() {
        return MersenneTwister19937.seedWithArray(createEntropy());
    }
    /**
     * Returns the next int32 value of the sequence
     */
    next() {
        if ((this.index | 0) >= ARRAY_SIZE) {
            refreshData(this.data);
            this.index = 0;
        }
        const value = this.data[this.index];
        this.index = (this.index + 1) | 0;
        this.uses += 1;
        return temper(value) | 0;
    }
    /**
     * Returns the number of times that the Engine has been used.
     *
     * This can be provided to an unused MersenneTwister19937 with the same
     * seed, bringing it to the exact point that was left off.
     */
    getUseCount() {
        return this.uses;
    }
    /**
     * Discards one or more items from the engine
     * @param count The count of items to discard
     */
    discard(count) {
        if (count <= 0) {
            return this;
        }
        this.uses += count;
        if ((this.index | 0) >= ARRAY_SIZE) {
            refreshData(this.data);
            this.index = 0;
        }
        while (count + this.index > ARRAY_SIZE) {
            count -= ARRAY_SIZE - this.index;
            refreshData(this.data);
            this.index = 0;
        }
        this.index = (this.index + count) | 0;
        return this;
    }
    seed(initial) {
        let previous = 0;
        this.data[0] = previous = initial | 0;
        for (let i = 1; i < ARRAY_SIZE; i = (i + 1) | 0) {
            this.data[i] = previous =
                (imul(previous ^ (previous >>> 30), 0x6c078965) + i) | 0;
        }
        this.index = ARRAY_SIZE;
        this.uses = 0;
        return this;
    }
    seedWithArray(source) {
        this.seed(0x012bd6aa);
        seedWithArray(this.data, source);
        return this;
    }
}
function refreshData(data) {
    let k = 0;
    let tmp = 0;
    for (; (k | 0) < ARRAY_SIZE_MINUS_M; k = (k + 1) | 0) {
        tmp = (data[k] & INT32_SIZE) | (data[(k + 1) | 0] & INT32_MAX);
        data[k] = data[(k + M) | 0] ^ (tmp >>> 1) ^ (tmp & 0x1 ? A : 0);
    }
    for (; (k | 0) < ARRAY_MAX; k = (k + 1) | 0) {
        tmp = (data[k] & INT32_SIZE) | (data[(k + 1) | 0] & INT32_MAX);
        data[k] =
            data[(k - ARRAY_SIZE_MINUS_M) | 0] ^ (tmp >>> 1) ^ (tmp & 0x1 ? A : 0);
    }
    tmp = (data[ARRAY_MAX] & INT32_SIZE) | (data[0] & INT32_MAX);
    data[ARRAY_MAX] = data[M - 1] ^ (tmp >>> 1) ^ (tmp & 0x1 ? A : 0);
}
function temper(value) {
    value ^= value >>> 11;
    value ^= (value << 7) & 0x9d2c5680;
    value ^= (value << 15) & 0xefc60000;
    return value ^ (value >>> 18);
}
function seedWithArray(data, source) {
    let i = 1;
    let j = 0;
    const sourceLength = source.length;
    let k = Math.max(sourceLength, ARRAY_SIZE) | 0;
    let previous = data[0] | 0;
    for (; (k | 0) > 0; --k) {
        data[i] = previous =
            ((data[i] ^ imul(previous ^ (previous >>> 30), 0x0019660d)) +
                (source[j] | 0) +
                (j | 0)) |
                0;
        i = (i + 1) | 0;
        ++j;
        if ((i | 0) > ARRAY_MAX) {
            data[0] = data[ARRAY_MAX];
            i = 1;
        }
        if (j >= sourceLength) {
            j = 0;
        }
    }
    for (k = ARRAY_MAX; (k | 0) > 0; --k) {
        data[i] = previous =
            ((data[i] ^ imul(previous ^ (previous >>> 30), 0x5d588b65)) - i) | 0;
        i = (i + 1) | 0;
        if ((i | 0) > ARRAY_MAX) {
            data[0] = data[ARRAY_MAX];
            i = 1;
        }
    }
    data[0] = INT32_SIZE;
}

let data$1 = null;
const COUNT$1 = 128;
let index$1$1 = COUNT$1;
/**
 * An Engine that relies on the node-available
 * `require('crypto').randomBytes`, which has been available since 0.58.
 *
 * See https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
 *
 * If unavailable or otherwise non-functioning, then `nodeCrypto` will
 * likely `throw` on the first call to `next()`.
 */
const nodeCrypto = {
    next() {
        if (index$1$1 >= COUNT$1) {
            data$1 = new Int32Array(new Int8Array(require("crypto").randomBytes(4 * COUNT$1)).buffer);
            index$1$1 = 0;
        }
        return data$1[index$1$1++] | 0;
    }
};

/**
 * The engine
 *
 * @type {symbol}
 *
 * @private
 */
const engineSymbol = Symbol('engine');

/**
 * The random object
 *
 * @type {symbol}
 *
 * @private
 */
const randomSymbol = Symbol('random');

/**
 * Engine that always returns the maximum value.
 * Used internally for calculating max roll values.
 *
 * @since 4.2.0
 *
 * @type {{next(): number, range: number[]}}
 */
const maxEngine = {
  /**
   * The min / max number range (e.g. `[1, 10]`).
   *
   * This _must_ be set for the `next()` method to return the correct last index.
   *
   * @example
   * maxEngine.range = [1, 10];
   *
   * @type {number[]}
   */
  range: [],
  /**
   * Returns the maximum number index for the range
   *
   * @returns {number}
   */
  next() {
    // calculate the index of the max number
    return this.range[1] - this.range[0];
  },
};

/**
 * Engine that always returns the minimum value.
 * Used internally for calculating min roll values.
 *
 * @since 4.2.0
 *
 * @type {{next(): number}}
 */
const minEngine = {
  /**
   * Returns the minimum number index, `0`
   *
   * @returns {number}
   */
  next() {
    return 0;
  },
};

/**
 * List of built-in number generator engines.
 *
 * @since 4.2.0
 *
 * @see This uses [random-js](https://github.com/ckknight/random-js).
 * For details of the engines, check the [documentation](https://github.com/ckknight/random-js#engines).
 *
 * @type {{
 *  min: {next(): number},
 *  max: {next(): number, range: number[]},
 *  browserCrypto: Engine,
 *  nodeCrypto: Engine,
 *  MersenneTwister19937: MersenneTwister19937,
 *  nativeMath: Engine
 * }}
 */
const engines = {
  browserCrypto,
  nodeCrypto,
  MersenneTwister19937,
  nativeMath,
  min: minEngine,
  max: maxEngine,
};

/**
 * The `NumberGenerator` is capable of generating random numbers.
 *
 * @since 4.2.0
 *
 * @see This uses [random-js](https://github.com/ckknight/random-js).
 * For details of the engines, check the [documentation](https://github.com/ckknight/random-js#engines).
 */
class NumberGenerator {
  /**
   * Create a `NumberGenerator` instance.
   *
   * The `engine` can be any object that has a `next()` method, which returns a number.
   *
   * @example <caption>Built-in engine</caption>
   * new NumberGenerator(engines.nodeCrypto);
   *
   * @example <caption>Custom engine</caption>
   * new NumberGenerator({
   *   next() {
   *     // return a random number
   *   },
   * });
   *
   * @param {Engine|{next(): number}} [engine=nativeMath] The RNG engine to use
   *
   * @throws {TypeError} engine must have function `next()`
   */
  constructor(engine = nativeMath) {
    this.engine = engine || nativeMath;
  }

  /**
   * The current engine.
   *
   * @returns {Engine|{next(): number}}
   */
  get engine() {
    return this[engineSymbol];
  }

  /**
   * Set the engine.
   *
   * The `engine` can be any object that has a `next()` method, which returns a number.
   *
   * @example <caption>Built-in engine</caption>
   * numberGenerator.engine = engines.nodeCrypto;
   *
   * @example <caption>Custom engine</caption>
   * numberGenerator.engine = {
   *   next() {
   *     // return a random number
   *   },
   * });
   *
   * @see {@link engines}
   *
   * @param {Engine|{next(): number}} engine
   *
   * @throws {TypeError} engine must have function `next()`
   */
  set engine(engine) {
    if (engine && (typeof engine.next !== 'function')) {
      throw new TypeError('engine must have function `next()`');
    }

    // set the engine and re-initialise the random engine
    this[engineSymbol] = engine || nativeMath;
    this[randomSymbol] = new Random(this[engineSymbol]);
  }

  /**
   * Generate a random integer within the inclusive range `[min, max]`.
   *
   * @param {number} min The minimum integer value, inclusive.
   * @param {number} max The maximum integer value, inclusive.
   *
   * @returns {number} The random integer
   */
  integer(min, max) {
    this[engineSymbol].range = [min, max];

    return this[randomSymbol].integer(min, max);
  }

  /**
   * Returns a floating-point value within `[min, max)` or `[min, max]`.
   *
   * @param {number} min The minimum floating-point value, inclusive.
   * @param {number} max The maximum floating-point value.
   * @param {boolean} [inclusive=false] If `true`, `max` will be inclusive.
   *
   * @returns {number} The random floating-point value
   */
  real(min, max, inclusive = false) {
    this[engineSymbol].range = [min, max];

    return this[randomSymbol].real(min, max, inclusive);
  }
}

const generator = new NumberGenerator();

var NumberGenerator$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  engines: engines,
  generator: generator
});

/**
 * The operator
 *
 * @type {symbol}
 *
 * @private
 */
const operatorSymbol = Symbol('operator');

/**
 * The value
 *
 * @type {symbol}
 *
 * @private
 */
const valueSymbol = Symbol('value');

/**
 * A `ComparePoint` object compares numbers against each other.
 * For example, _is 6 greater than 3_, or _is 8 equal to 10_.
 */
class ComparePoint {
  /**
   * Create a `ComparePoint` instance.
   *
   * @param {string} operator The comparison operator (One of `=`, `!=`, `<`, `>`, `<=`, `>=`)
   * @param {number} value The value to compare to
   *
   * @throws {CompareOperatorError} operator is invalid
   * @throws {RequiredArgumentError} operator and value are required
   * @throws {TypeError} value must be numeric
   */
  constructor(operator, value) {
    if (!operator) {
      throw new RequiredArgumentError('operator');
    } else if (!value && (value !== 0)) {
      throw new RequiredArgumentError('value');
    }

    this.operator = operator;
    this.value = value;
  }

  /**
   * Check if the operator is valid.
   *
   * @param {string} operator
   *
   * @returns {boolean} `true` if the operator is valid, `false` otherwise
   */
  static isValidOperator(operator) {
    return (typeof operator === 'string') && /^(?:[<>!]?=|[<>])$/.test(operator);
  }

  /**
   * Set the comparison operator.
   *
   * @param {string} operator One of `=`, `!=`, `<`, `>`, `<=`, `>=`
   *
   * @throws CompareOperatorError operator is invalid
   */
  set operator(operator) {
    if (!this.constructor.isValidOperator(operator)) {
      throw new CompareOperatorError(operator);
    }

    this[operatorSymbol] = operator;
  }

  /**
   * The comparison operator.
   *
   * @returns {string}
   */
  get operator() {
    return this[operatorSymbol];
  }

  /**
   * Set the value.
   *
   * @param {number} value
   *
   * @throws {TypeError} value must be numeric
   */
  set value(value) {
    if (!isNumeric(value)) {
      throw new TypeError('value must be a finite number');
    }

    this[valueSymbol] = Number(value);
  }

  /**
   * The comparison value
   *
   * @returns {number}
   */
  get value() {
    return this[valueSymbol];
  }

  /**
   * Check whether value matches the compare point
   *
   * @param {number} value The number to compare
   *
   * @returns {boolean} `true` if it is a match, `false` otherwise
   */
  isMatch(value) {
    return compareNumbers(value, this.value, this.operator);
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{type: string, value: number, operator: string}}
   */
  toJSON() {
    const { operator, value } = this;

    return {
      operator,
      type: 'compare-point',
      value,
    };
  }

  /**
   * Return the String representation of the object.
   *
   * This is called automatically when casting the object to a string.
   *
   * @returns {string}
   */
  toString() {
    return `${this.operator}${this.value}`;
  }
}

/**
 * A `Modifier` is the base modifier class that all others extend from.
 *
 * ::: warning Abstract class
 * This is meant as an abstract class and should not be used directly.
 * :::
 *
 * @abstract
 */
class Modifier {
  /**
   * Create a `Modifier` instance.
   */
  constructor() {
    // set the modifier's sort order
    this.order = 999;
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The name of the modifier.
   *
   * @returns {string} 'modifier'
   */
  get name() {
    return 'modifier';
  }
  /* eslint-enable class-methods-use-this */

  /* eslint-disable class-methods-use-this */
  /**
   * The modifier's notation.
   *
   * @returns {string}
   */
  get notation() {
    return '';
  }
  /* eslint-enable class-methods-use-this */

  /* eslint-disable class-methods-use-this */
  /**
   * The maximum number of iterations that the modifier can apply to a single die roll
   *
   * @returns {number} `1000`
   */
  get maxIterations() {
    return 1000;
  }
  /* eslint-enable class-methods-use-this */

  /* eslint-disable class-methods-use-this */
  /**
   * Run the modifier on the results.
   *
   * @param {RollResults} results The results to run the modifier against
   * @param {StandardDice|RollGroup} _context The object that the modifier is attached to
   *
   * @returns {RollResults} The modified results
   */
  run(results, _context) {
    return results;
  }
  /* eslint-enable class-methods-use-this */

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{notation: string, name: string, type: string}}
   */
  toJSON() {
    const { notation, name } = this;

    return {
      name,
      notation,
      type: 'modifier',
    };
  }

  /**
   * Return the String representation of the object.
   *
   * This is called automatically when casting the object to a string.
   *
   * @see {@link Modifier#notation}
   *
   * @returns {string}
   */
  toString() {
    return this.notation;
  }
}

const comparePointSymbol = Symbol('compare-point');

/**
 * A `ComparisonModifier` is the base modifier class for comparing values.
 *
 * ::: warning Abstract class
 * This is meant as an abstract class and should not be used directly.
 * You can use one of the extended modifiers, or extend the class yourself.
 * :::
 *
 * @abstract
 *
 * @extends Modifier
 *
 * @see {@link CriticalFailureModifier}
 * @see {@link CriticalSuccessModifier}
 * @see {@link ExplodeModifier}
 * @see {@link ReRollModifier}
 * @see {@link TargetModifier}
 */
class ComparisonModifier extends Modifier {
  /**
   * Create a `ComparisonModifier` instance.
   *
   * @param {ComparePoint} [comparePoint] The comparison object
   *
   * @throws {TypeError} `comparePoint` must be an instance of `ComparePoint` or `undefined`
   */
  constructor(comparePoint) {
    super();

    if (comparePoint) {
      this.comparePoint = comparePoint;
    }
  }

  /**
   * The compare point.
   *
   * @returns {ComparePoint|undefined}
   */
  get comparePoint() {
    return this[comparePointSymbol];
  }

  /**
   * Set the compare point.
   *
   * @param {ComparePoint} comparePoint
   *
   * @throws {TypeError} value must be an instance of `ComparePoint`
   */
  set comparePoint(comparePoint) {
    if (!(comparePoint instanceof ComparePoint)) {
      throw new TypeError('comparePoint must be instance of ComparePoint');
    }

    this[comparePointSymbol] = comparePoint;
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The name of the modifier.
   *
   * @returns {string} 'comparison'
   */
  get name() {
    return 'comparison';
  }
  /* eslint-enable class-methods-use-this */

  /**
   * The modifier's notation.
   *
   * @returns {string}
   */
  get notation() {
    return `${this.comparePoint || ''}`;
  }

  /**
   * Check whether value matches the compare point or not.
   *
   * @param {number} value The value to compare with
   *
   * @returns {boolean} `true` if the value matches, `false` otherwise
   */
  isComparePoint(value) {
    if (!this.comparePoint) {
      return false;
    }

    return this.comparePoint.isMatch(value);
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{
   *  notation: string,
   *  name: string,
   *  type: string,
   *  comparePoint: (ComparePoint|undefined)
   * }}
   */
  toJSON() {
    const { comparePoint } = this;

    return Object.assign(
      super.toJSON(),
      {
        comparePoint,
      },
    );
  }
}

const compoundSymbol = Symbol('compound');
const penetrateSymbol = Symbol('penetrate');

/**
 * An `ExplodeModifier` re-rolls dice that match a given test, and adds them to the results.
 *
 * @see {@link ReRollModifier} if you want to replace the old value with the new, rather than adding
 *
 * @extends ComparisonModifier
 */
class ExplodeModifier extends ComparisonModifier {
  /**
   * Create an `ExplodeModifier` instance
   *
   * @param {ComparePoint} [comparePoint=null] The comparison object
   * @param {boolean} [compound=false] Whether to compound or not
   * @param {boolean} [penetrate=false] Whether to penetrate or not
   *
   * @throws {TypeError} comparePoint must be a `ComparePoint` object
   */
  constructor(comparePoint = null, compound = false, penetrate = false) {
    super(comparePoint);

    this[compoundSymbol] = !!compound;
    this[penetrateSymbol] = !!penetrate;

    // set the modifier's sort order
    this.order = 3;
  }

  /**
   * Whether the modifier should compound the results or not.
   *
   * @returns {boolean} `true` if it should compound, `false` otherwise
   */
  get compound() {
    return this[compoundSymbol];
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The name of the modifier.
   *
   * @returns {string} 'explode'
   */
  get name() {
    return 'explode';
  }
  /* eslint-enable class-methods-use-this */

  /**
   * The modifier's notation.
   *
   * @returns {string}
   */
  get notation() {
    return `!${this.compound ? '!' : ''}${this.penetrate ? 'p' : ''}${super.notation}`;
  }

  /**
   * Whether the modifier should penetrate the results or not.
   *
   * @returns {boolean} `true` if it should penetrate, `false` otherwise
   */
  get penetrate() {
    return this[penetrateSymbol];
  }

  /**
   * Run the modifier on the results.
   *
   * @param {RollResults} results The results to run the modifier against
   * @param {StandardDice|RollGroup} _context The object that the modifier is attached to
   *
   * @returns {RollResults} The modified results
   */
  run(results, _context) {
    // ensure that the dice can explode without going into an infinite loop
    if (_context.min === _context.max) {
      throw new DieActionValueError(_context, 'explode');
    }

    const parsedResults = results;

    parsedResults.rolls = results.rolls
      .map((roll) => {
        const subRolls = [roll];
        let compareValue = roll.value;

        // explode if the value matches the compare point, and we haven't reached the max iterations
        for (let i = 0; (i < this.maxIterations) && this.isComparePoint(compareValue); i++) {
          const prevRoll = subRolls[subRolls.length - 1];
          // roll the dice
          const rollResult = _context.rollOnce();

          // update the value to check against
          compareValue = rollResult.value;

          // add the explode modifier flag
          prevRoll.modifiers.add('explode');

          // add the penetrate modifier flag and decrement the value
          if (this.penetrate) {
            prevRoll.modifiers.add('penetrate');
            rollResult.value -= 1;
          }

          // add the rolls to the list
          subRolls.push(rollResult);
        }

        // return the rolls (Compounded if necessary)
        /* eslint-disable  no-param-reassign */
        if (this.compound && (subRolls.length > 1)) {
          // update the roll value and modifiers
          roll.value = sumArray(subRolls.map((result) => result.value));
          roll.modifiers = [
            'explode',
            'compound',
          ];

          if (this.penetrate) {
            roll.modifiers.add('penetrate');
          }

          return roll;
        }
        /* eslint-enable */

        return subRolls;
      })
      .flat();

    return parsedResults;
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{
   *  notation: string,
   *  name: string,
   *  type: string,
   *  comparePoint: (ComparePoint|undefined),
   *  compound: boolean,
   *  penetrate: boolean
   * }}
   */
  toJSON() {
    const { compound, penetrate } = this;

    return Object.assign(
      super.toJSON(),
      {
        compound,
        penetrate,
      },
    );
  }
}

const flags = {
  compound: '!',
  explode: '!',
  'critical-failure': '__',
  'critical-success': '**',
  drop: 'd',
  max: 'v',
  min: '^',
  penetrate: 'p',
  're-roll': 'r',
  're-roll-once': 'ro',
  'target-failure': '_',
  'target-success': '*',
};

/**
 * Return the flags for the given list of modifiers
 *
 * @param {...Modifier|string} modifiers
 *
 * @returns {string}
 */
const getModifierFlags = (...modifiers) => (
  // @todo need a better way of mapping modifiers to symbols
  [...modifiers].reduce((acc, modifier) => {
    let name;

    if (modifier instanceof Modifier) {
      name = modifier.name;
    } else {
      name = modifier;
    }

    return acc + (flags[name] || name);
  }, '')
);

const calculationValueSymbol = Symbol('calculation-value');
const modifiersSymbol = Symbol('modifiers');
const initialValueSymbol = Symbol('initial-value');
const useInTotalSymbol = Symbol('use-in-total');
const valueSymbol$1 = Symbol('value');

/**
 * A `RollResult` represents the value and applicable modifiers for a single die roll
 *
 * ::: tip
 * You will probably not need to create your own `RollResult` instances, unless you're importing
 * rolls, but `RollResult` objects will be returned when rolling dice.
 * :::
 */
class RollResult {
  /**
   * Create a `RollResult` instance.
   *
   * `value` can be a number, or an object containing a list of different values.
   * This allows you to specify the `initialValue`, `value` and `calculationValue` with different
   * values.
   *
   * @example <caption>Numerical value</caption>
   * const result = new RollResult(4);
   *
   * @example <caption>Object value</caption>
   * // must provide either `value` or `initialValue`
   * // `calculationValue` is optional.
   * const result = new RollResult({
   *   value: 6,
   *   initialValue: 4,
   *   calculationValue: 8,
   * });
   *
   * @example <caption>With modifiers</caption>
   * const result = new RollResult(4, ['explode', 'critical-success']);
   *
   * @param {number|{value: number, initialValue: number, calculationValue: number}} value The value
   * rolled
   * @param {number} [value.value] The value with modifiers applied
   * @param {number} [value.initialValue] The initial, unmodified value rolled
   * @param {number} [value.calculationValue] The value used in calculations
   * @param {string[]|Set<string>} [modifiers=[]] List of modifier names that affect this roll
   * @param {boolean} [useInTotal=true] Whether to include the roll value when calculating totals
   *
   * @throws {TypeError} Result value, calculation value, or modifiers are invalid
   */
  constructor(value, modifiers = [], useInTotal = true) {
    if (isNumeric(value)) {
      this[initialValueSymbol] = Number(value);

      this.modifiers = modifiers || [];
      this.useInTotal = useInTotal;
    } else if (value && (typeof value === 'object') && !Array.isArray(value)) {
      // ensure that we have a valid value
      const initialVal = isNumeric(value.initialValue) ? value.initialValue : value.value;
      if (!isNumeric(initialVal)) {
        throw new TypeError(`Result value is invalid: ${initialVal}`);
      }

      this[initialValueSymbol] = Number(initialVal);

      if (
        isNumeric(value.value)
        && (Number(value.value) !== this[initialValueSymbol])
      ) {
        this.value = value.value;
      }

      if (
        isNumeric(value.calculationValue)
        && (parseFloat(`${value.calculationValue}`) !== this.value)
      ) {
        this.calculationValue = value.calculationValue;
      }

      this.modifiers = value.modifiers || modifiers || [];
      this.useInTotal = (typeof value.useInTotal === 'boolean') ? value.useInTotal : (useInTotal || false);
    } else if (value === Infinity) {
      throw new RangeError('Result value must be a finite number');
    } else {
      throw new TypeError(`Result value is invalid: ${value}`);
    }
  }

  /**
   * The value to use in calculations.
   * This may be changed by modifiers.
   *
   * @returns {number}
   */
  get calculationValue() {
    return isNumeric(this[calculationValueSymbol])
      ? parseFloat(this[calculationValueSymbol])
      : this.value;
  }

  /**
   * Set the value to use in calculations.
   *
   * @param {number} value
   *
   * @throws {TypeError} value is invalid
   */
  set calculationValue(value) {
    const isValNumeric = isNumeric(value);
    if (value === Infinity) {
      throw new RangeError('Result calculation value must be a finite number');
    }
    if (value && !isValNumeric) {
      throw new TypeError(`Result calculation value is invalid: ${value}`);
    }

    this[calculationValueSymbol] = isValNumeric ? parseFloat(`${value}`) : null;
  }

  /**
   * The initial roll value before any modifiers.
   *
   * Not used for calculations and is just for reference.
   * You probably want `value` instead.
   *
   * @see {@link RollResult#value}
   *
   * @returns {number}
   */
  get initialValue() {
    return this[initialValueSymbol];
  }

  /**
   * The visual flags for the modifiers that affect the roll.
   *
   * @see {@link RollResult#modifiers}
   *
   * @returns {string}
   */
  get modifierFlags() {
    return getModifierFlags(...this.modifiers);
  }

  /**
   * The names of modifiers that affect the roll.
   *
   * @returns {Set<string>}
   */
  get modifiers() {
    return this[modifiersSymbol];
  }

  /**
   * Set the modifier names that affect the roll.
   *
   * @example
   * rollResult.modifiers = ['explode', 're-roll'];
   *
   * @param {string[]|Set<string>} value
   *
   * @throws {TypeError} modifiers must be a Set or array of modifier names
   */
  set modifiers(value) {
    if ((Array.isArray(value) || (value instanceof Set)) && [...value].every((item) => typeof item === 'string')) {
      this[modifiersSymbol] = new Set([...value]);

      return;
    }

    if (!value && (value !== 0)) {
      // clear the modifiers
      this[modifiersSymbol] = new Set();

      return;
    }

    throw new TypeError(`modifiers must be a Set or array of modifier names: ${value}`);
  }

  /**
   * Whether to use the value in total calculations or not.
   *
   * @returns {boolean}
   */
  get useInTotal() {
    return !!this[useInTotalSymbol];
  }

  /**
   * Set whether to use the value in total calculations or not.
   *
   * @param {boolean} value
   */
  set useInTotal(value) {
    this[useInTotalSymbol] = !!value;
  }

  /**
   * Value of the roll after modifiers have been applied.
   *
   * @returns {number}
   */
  get value() {
    return isNumeric(this[valueSymbol$1]) ? this[valueSymbol$1] : this[initialValueSymbol];
  }

  /**
   * Set the roll value.
   *
   * @param {number} value
   *
   * @throws {RangeError} value must be finite
   * @throws {TypeError} value is invalid
   */
  set value(value) {
    if (value === Infinity) {
      throw new RangeError('Result value must be a finite number');
    }
    if (!isNumeric(value)) {
      throw new TypeError(`Result value is invalid: ${value}`);
    }

    this[valueSymbol$1] = Number(value);
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{
   *  calculationValue: number,
   *  modifierFlags: string,
   *  modifiers: string[],
   *  type: string,
   *  initialValue: number,
   *  useInTotal: boolean,
   *  value: number
   * }}
   */
  toJSON() {
    const {
      calculationValue, initialValue, modifierFlags, modifiers, useInTotal, value,
    } = this;

    return {
      calculationValue,
      initialValue,
      modifierFlags,
      modifiers: [...modifiers],
      type: 'result',
      useInTotal,
      value,
    };
  }

  /**
   * Return the String representation of the object.
   *
   * This is called automatically when casting the object to a string.
   *
   * @returns {string}
   */
  toString() {
    return this.value + this.modifierFlags;
  }
}

const rollsSymbol = Symbol('rolls');

/**
 * A collection of die roll results
 *
 * ::: tip
 * You will probably not need to create your own `RollResults` instances, unless you're importing
 * rolls, but RollResults objects will be returned when rolling dice.
 * :::
 */
class RollResults {
  /**
   * Create a `RollResults` instance.
   *
   * @example <caption>`RollResult` objects</caption>
   * const results = new RollResults([
   *  new RollResult(4),
   *  new RollResult(3),
   *  new RollResult(5),
   * ]);
   *
   * @example <caption>Numerical results</caption>
   * const results = new RollResults([4, 3, 5]);
   *
   * @example <caption>A mix</caption>
   * const results = new RollResults([
   *  new RollResult(4),
   *  3,
   *  new RollResult(5),
   * ]);
   *
   * @param {Array.<RollResult|number>} [rolls=[]] The roll results
   *
   * @throws {TypeError} Rolls must be an array
   */
  constructor(rolls = []) {
    this.rolls = rolls;
  }

  /**
   * The number of roll results.
   *
   * @returns {number}
   */
  get length() {
    return this.rolls.length || 0;
  }

  /**
   * List of roll results.
   *
   * @returns {RollResult[]}
   */
  get rolls() {
    return [...this[rollsSymbol]];
  }

  /**
   * Set the rolls.
   *
   * @param {RollResult[]|number[]} rolls
   *
   * @throws {TypeError} Rolls must be an array
   */
  set rolls(rolls) {
    if (!rolls || !Array.isArray(rolls)) {
      // roll is not an array
      throw new TypeError(`rolls must be an array: ${rolls}`);
    }

    // loop through each result and add it to the rolls list
    this[rollsSymbol] = [];
    rolls.forEach((result) => {
      this.addRoll(result);
    });
  }

  /**
   * The total value of all the rolls after modifiers have been applied.
   *
   * @returns {number}
   */
  get value() {
    return this.rolls.reduce((v, roll) => v + (roll.useInTotal ? roll.calculationValue : 0), 0);
  }

  /**
   * Add a single roll to the list.
   *
   * @param {RollResult|number} value
   */
  addRoll(value) {
    const result = (value instanceof RollResult) ? value : new RollResult(value);

    this[rollsSymbol].push(result);
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{rolls: RollResult[], value: number}}
   */
  toJSON() {
    const { rolls, value } = this;

    return {
      rolls,
      type: 'roll-results',
      value,
    };
  }

  /**
   * Return the String representation of the object.
   *
   * This is called automatically when casting the object to a string.
   *
   * @returns {string}
   */
  toString() {
    return `[${this.rolls.join(', ')}]`;
  }
}

const onceSymbol = Symbol('once');

/**
 * A `ReRollModifier` re-rolls dice that match a given test, and replaces the new value with the old
 * one.
 *
 * @see {@link ExplodeModifier} if you want to keep the old value as well
 *
 * @extends ComparisonModifier
 */
class ReRollModifier extends ComparisonModifier {
  /**
   * Create a `ReRollModifier` instance.
   *
   * @param {boolean} [once=false] Whether to only re-roll once or not
   * @param {ComparePoint} [comparePoint=null] The comparison object
   */
  constructor(once = false, comparePoint = null) {
    super(comparePoint);

    this.once = !!once;

    // set the modifier's sort order
    this.order = 4;
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The name of the modifier.
   *
   * @returns {string} 're-roll'
   */
  get name() {
    return 're-roll';
  }
  /* eslint-enable class-methods-use-this */

  /**
   * The modifier's notation.
   *
   * @returns {string}
   */
  get notation() {
    return `r${this.once ? 'o' : ''}${super.notation}`;
  }

  /**
   * Whether the modifier should only re-roll once or not.
   *
   * @returns {boolean} `true` if it should re-roll once, `false` otherwise
   */
  get once() {
    return !!this[onceSymbol];
  }

  /**
   * Set whether the modifier should only re-roll once or not.
   *
   * @param {boolean} value
   */
  set once(value) {
    this[onceSymbol] = !!value;
  }

  /**
   * Run the modifier on the results.
   *
   * @param {RollResults} results The results to run the modifier against
   * @param {StandardDice|RollGroup} _context The object that the modifier is attached to
   *
   * @returns {RollResults} The modified results
   */
  run(results, _context) {
    // ensure that the dice can explode without going into an infinite loop
    if (_context.min === _context.max) {
      throw new DieActionValueError(_context, 're-roll');
    }

    results.rolls
      .map((roll) => {
        // re-roll if the value matches the compare point and we haven't reached the max iterations,
        // unless we're only rolling once and have already re-rolled
        for (let i = 0; (i < this.maxIterations) && this.isComparePoint(roll.value); i++) {
          // re-roll the dice
          const rollResult = _context.rollOnce();

          // update the roll value (Unlike exploding, the original value is not kept)
          // eslint-disable-next-line no-param-reassign
          roll.value = rollResult.value;

          // add the re-roll modifier flag
          roll.modifiers.add(`re-roll${this.once ? '-once' : ''}`);

          // stop the loop if we're only re-rolling once
          if (this.once) {
            break;
          }
        }

        return roll;
      });

    return results;
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{
   *  notation: string,
   *  name: string,
   *  type: string,
   *  comparePoint: (ComparePoint|undefined),
   *  once: boolean
   * }}
   */
  toJSON() {
    const { once } = this;

    return Object.assign(
      super.toJSON(),
      {
        once,
      },
    );
  }
}

const modifiersSymbol$1 = Symbol('modifiers');
const qtySymbol = Symbol('qty');
const sidesSymbol = Symbol('sides');
const minSymbol = Symbol('min-value');
const maxSymbol = Symbol('max-value');

/**
 * Represents a standard numerical die.
 */
class StandardDice {
  /**
   * Create a `StandardDice` instance.
   *
   * @param {number} sides The number of sides the die has (.e.g `6`)
   * @param {number} [qty=1] The number of dice to roll (e.g. `4`)
   * @param {Map<string, Modifier>|Modifier[]|{}|null} [modifiers] The modifiers that affect the die
   * @param {number|null} [min=1] The minimum possible roll value
   * @param {number|null} [max=null] The maximum possible roll value. Defaults to number of `sides`
   *
   * @throws {RequiredArgumentError} sides is required
   * @throws {TypeError} qty must be a positive integer, and modifiers must be valid
   */
  constructor(sides, qty = 1, modifiers = null, min = 1, max = null) {
    if (!sides && (sides !== 0)) {
      throw new RequiredArgumentError('sides');
    } else if (sides === Infinity) {
      throw new RangeError('numerical sides must be finite number');
    } else if (isNumeric(sides)) {
      if ((sides < 1) || !isSafeNumber(sides)) {
        throw new RangeError('numerical sides must be a positive finite number');
      }
    } else if (typeof sides !== 'string') {
      throw new TypeError('non-numerical sides must be a string');
    }

    if (!isNumeric(qty)) {
      throw new TypeError('qty must be a positive finite integer');
    } else if ((qty < 1) || (qty > 999)) {
      throw new RangeError('qty must be between 1 and 999');
    }

    if (!isNumeric(min)) {
      throw new TypeError('min must a finite number');
    } else if (!isSafeNumber(min)) {
      throw new RangeError('min must a finite number');
    }

    if (max && !isNumeric(max)) {
      throw new TypeError('max must a finite number');
    } else if (max && !isSafeNumber(max)) {
      throw new RangeError('max must a finite number');
    }

    this[qtySymbol] = parseInt(`${qty}`, 10);
    this[sidesSymbol] = sides;

    if (modifiers) {
      this.modifiers = modifiers;
    }

    this[minSymbol] = parseInt(min, 10);

    this[maxSymbol] = max ? parseInt(`${max}`, 10) : sides;
  }

  /**
   * The average value that the die can roll (Excluding modifiers).
   *
   * @returns {number}
   */
  get average() {
    return (this.min + this.max) / 2;
  }

  /**
   * The modifiers that affect this die roll.
   *
   * @returns {Map<string, Modifier>|null}
   */
  get modifiers() {
    if (this[modifiersSymbol$1]) {
      // ensure modifiers are ordered correctly
      return new Map([...this[modifiersSymbol$1]].sort((a, b) => a[1].order - b[1].order));
    }

    return null;
  }

  /**
   * Set the modifiers that affect this roll.
   *
   * @param {Map<string, Modifier>|Modifier[]|{}|null} value
   *
   * @throws {TypeError} Modifiers should be a Map, array of Modifiers, or an Object
   */
  set modifiers(value) {
    let modifiers;
    if (value instanceof Map) {
      modifiers = value;
    } else if (Array.isArray(value)) {
      // loop through and get the modifier name of each item and use it as the map key
      modifiers = new Map(value.map((modifier) => [modifier.name, modifier]));
    } else if (typeof value === 'object') {
      modifiers = new Map(Object.entries(value));
    } else {
      throw new TypeError('modifiers should be a Map, array, or an Object containing Modifiers');
    }

    if (
      modifiers.size
      && [...modifiers.entries()].some((entry) => !(entry[1] instanceof Modifier))
    ) {
      throw new TypeError('modifiers must only contain Modifier instances');
    }

    this[modifiersSymbol$1] = modifiers;

    // loop through each modifier and ensure that those that require it have compare points
    // @todo find a better way of defining compare point on modifiers that don't have them
    /* eslint-disable no-param-reassign */
    this[modifiersSymbol$1].forEach((modifier) => {
      if ((modifier instanceof ExplodeModifier) && !modifier.comparePoint) {
        modifier.comparePoint = new ComparePoint('=', this.max);
      } else if ((modifier instanceof ReRollModifier) && !modifier.comparePoint) {
        modifier.comparePoint = new ComparePoint('=', this.min);
      }
    });
    /* eslint-enable */
  }

  /**
   * The maximum value that can be rolled on the die, excluding modifiers.
   *
   * @returns {number}
   */
  get max() {
    return this[maxSymbol];
  }

  /**
   * The minimum value that can be rolled on the die, excluding modifiers.
   *
   * @returns {number}
   */
  get min() {
    return this[minSymbol];
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The name of the die.
   *
   * @returns {string} 'standard'
   */
  get name() {
    return 'standard';
  }
  /* eslint-enable class-methods-use-this */

  /**
   * The dice notation. e.g. `4d6!`.
   *
   * @returns {string}
   */
  get notation() {
    let notation = `${this.qty}d${this.sides}`;

    if (this.modifiers && this.modifiers.size) {
      notation += [...this.modifiers.values()].reduce((acc, modifier) => acc + modifier.notation, '');
    }

    return notation;
  }

  /**
   * The number of dice that should be rolled.
   *
   * @returns {number}
   */
  get qty() {
    return this[qtySymbol];
  }

  /**
   * The number of sides the die has.
   *
   * @returns {number}
   */
  get sides() {
    return this[sidesSymbol];
  }

  /**
   * Roll the dice for the specified quantity and apply any modifiers.
   *
   * @returns {RollResults} The result of the roll
   */
  roll() {
    // create a result object to hold the rolls
    const rollResult = new RollResults();

    // loop for the quantity and roll the die
    for (let i = 0; i < this.qty; i++) {
      // add the rolls to the list
      rollResult.addRoll(this.rollOnce());
    }

    // loop through each modifier and carry out its actions
    (this.modifiers || []).forEach((modifier) => {
      modifier.run(rollResult, this);
    });

    return rollResult;
  }

  /**
   * Roll a single die and return the value.
   *
   * @returns {RollResult} The value rolled
   */
  rollOnce() {
    return new RollResult(generator.integer(this.min, this.max));
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{
   *  average: number,
   *  min: number,
   *  max: number,
   *  notation: string,
   *  qty: number,
   *  name: string,
   *  sides: number,
   *  modifiers: (Map<string, Modifier>|null),
   *  type: string
   * }}
   */
  toJSON() {
    const {
      average, max, min, modifiers, name, notation, qty, sides,
    } = this;

    return {
      average,
      max,
      min,
      modifiers,
      name,
      notation,
      qty,
      sides,
      type: 'die',
    };
  }

  /**
   * Return the String representation of the object.
   *
   * This is called automatically when casting the object to a string.
   *
   * @see {@link StandardDice#notation}
   *
   * @returns {string}
   */
  toString() {
    return this.notation;
  }
}

/**
 * Represents a Fudge / Fate type die.
 *
 * @extends StandardDice
 */
class FudgeDice extends StandardDice {
  /**
   * Create a `FudgeDice` instance.
   *
   * @param {number} [nonBlanks=2] The number of sides each symbol should cover (`1` or `2`)
   * @param {number} [qty=1] The number of dice to roll (e.g. `4`)
   * @param {Map<string, Modifier>|Modifier[]|{}|null} [modifiers] The modifiers that affect the die
   *
   * @throws {RangeError} nonBlanks must be 1 or 2
   * @throws {TypeError} modifiers must be valid
   */
  constructor(nonBlanks = 2, qty = 1, modifiers = null) {
    let numNonBlanks = nonBlanks;

    if (!numNonBlanks && (numNonBlanks !== 0)) {
      numNonBlanks = 2;
    } else if ((numNonBlanks !== 1) && (numNonBlanks !== 2)) {
      throw new RangeError('nonBlanks must be 1 or 2');
    }

    super(numNonBlanks, qty, modifiers, -1, 1);
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The name of the die.
   *
   * @returns {string} 'fudge'
   */
  get name() {
    return 'fudge';
  }
  /* eslint-enable class-methods-use-this */

  /**
   * The number of sides that each symbol (+, -) covers.
   *
   * @returns {number} `1` or `2`
   */
  get nonBlanks() {
    return super.sides;
  }

  /**
   * The number of sides the die has.
   *
   * @returns {string} 'F.2' or 'F.1'
   */
  get sides() {
    return `F.${this.nonBlanks}`;
  }

  /**
   * Roll a single die and return the value.
   *
   * @returns {RollResult} The value rolled
   */
  rollOnce() {
    let total = 0;

    if (this.nonBlanks === 2) {
      // default fudge (2 of each non-blank) = 1d3 - 2
      total = generator.integer(1, 3) - 2;
    } else if (this.nonBlanks === 1) {
      // only 1 of each non-blank
      // on 1d6 a roll of 1 = -1, 6 = +1, others = 0
      const num = generator.integer(1, 6);
      if (num === 1) {
        total = -1;
      } else if (num === 6) {
        total = 1;
      }
    }

    return new RollResult(total);
  }
}

/**
 * Represents a percentile die.
 *
 * @extends StandardDice
 */
class PercentileDice extends StandardDice {
  /**
   * Create a `PercentileDice` instance.
   *
   * @param {number} [qty=1] The number of dice to roll (e.g. `4`)
   * @param {Map<string, Modifier>|Modifier[]|{}|null} [modifiers] The modifiers that affect the die
   * @param {boolean} [sidesAsNumber=false] Whether to show the sides as `%` (default) or `100`
   *
   * @throws {TypeError} qty must be a positive integer, and modifiers must be valid
   */
  constructor(qty = 1, modifiers = null, sidesAsNumber = false) {
    super(100, qty, modifiers);

    this.sidesAsNumber = !!sidesAsNumber;
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The name of the die.
   *
   * @returns {string} 'percentile'
   */
  get name() {
    return 'percentile';
  }
  /* eslint-enable class-methods-use-this */

  /**
   * The number of sides the die has
   *
   * @returns {number|string} `%` if `sidesAsNumber == false`, or `100` otherwise
   */
  get sides() {
    return this.sidesAsNumber ? super.sides : '%';
  }
}

var index$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  FudgeDice: FudgeDice,
  PercentileDice: PercentileDice,
  StandardDice: StandardDice
});

/**
 * A `CriticalFailureModifier` modifier flags values that match a comparison.
 *
 * Unlike most other modifiers, it doesn't affect the roll value, it simply "flags" matching rolls.
 *
 * @see {@link CriticalSuccessModifier} for the opposite of this modifier
 *
 * @extends ComparisonModifier
 */
class CriticalFailureModifier extends ComparisonModifier {
  /**
   * Create a `CriticalFailureModifier` instance.
   *
   * @param {ComparePoint} [comparePoint] The comparison object
   *
   * @throws {TypeError} comparePoint must be a `ComparePoint` object
   */
  constructor(comparePoint) {
    super(comparePoint);

    // set the modifier's sort order
    this.order = 9;
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The name of the modifier.
   *
   * @returns {string} 'critical-failure'
   */
  get name() {
    return 'critical-failure';
  }
  /* eslint-enable class-methods-use-this */

  /**
   * The modifier's notation.
   *
   * @returns {string}
   */
  get notation() {
    return `cf${super.notation}`;
  }

  /**
   * Run the modifier on the results.
   *
   * @param {RollResults} results The results to run the modifier against
   * @param {StandardDice|RollGroup} _context The object that the modifier is attached to
   *
   * @returns {RollResults} The modified results
   */
  run(results, _context) {
    results.rolls
      .forEach((roll) => {
        // add the modifier flag
        if (this.isComparePoint(roll.value)) {
          roll.modifiers.add('critical-failure');
        }

        return roll;
      });

    return results;
  }
}

/**
 * A `CriticalSuccessModifier` modifier flags values that match a comparison.
 *
 * Unlike most other modifiers, it doesn't affect the roll value, it simply "flags" matching rolls.
 *
 * @see {@link CriticalFailureModifier} for the opposite of this modifier
 *
 * @extends ComparisonModifier
 */
class CriticalSuccessModifier extends ComparisonModifier {
  /**
   * Create a `CriticalSuccessModifier` instance.
   *
   * @param {ComparePoint} comparePoint The comparison object
   *
   * @throws {TypeError} comparePoint must be a `ComparePoint` object
   */
  constructor(comparePoint) {
    super(comparePoint);

    // set the modifier's sort order
    this.order = 8;
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The name of the modifier.
   *
   * @returns {string} 'critical-success'
   */
  get name() {
    return 'critical-success';
  }
  /* eslint-enable class-methods-use-this */

  /**
   * The modifier's notation.
   *
   * @returns {string}
   */
  get notation() {
    return `cs${super.notation}`;
  }

  /**
   * Runs the modifier on the rolls.
   *
   * @param {RollResults} results The results to run the modifier against
   * @param {StandardDice|RollGroup} _context The object that the modifier is attached to
   *
   * @returns {RollResults}
   */
  run(results, _context) {
    // loop through each roll and see if it's a critical success
    results.rolls
      .forEach((roll) => {
        // add the modifier flag
        if (this.isComparePoint(roll.value)) {
          roll.modifiers.add('critical-success');
        }

        return roll;
      });

    return results;
  }
}

const calculationValueSymbol$1 = Symbol('calculation-value');
const isRollGroupSymbol = Symbol('is-roll-group');
const modifiersSymbol$2 = Symbol('modifiers');
const resultsSymbol = Symbol('results');
const useInTotalSymbol$1 = Symbol('use-in-total');

/**
 * A collection of results and expressions.
 * Usually used to represent the results of a `RollGroup` instance.
 *
 * This can contain `ResultGroup`, `RollResults`, operators, and plain numbers.
 *
 * ::: tip
 * You will probably not need to create your own `ResultGroup` instances, unless you're importing
 * rolls, but `ResultGroup` objects will be returned when rolling group rolls.
 * :::
 *
 * @since 4.5.0
 */
class ResultGroup {
  /**
   * Create a `ResultGroup` instance.
   *
   * @example <caption>Normal roll: `4d6+2d10`</caption>
   * const results = new ResultGroup([
   *  new RollResults([3, 5, 4, 2]),
   *  '+',
   *  new RollResults([4, 8]),
   * ]);
   *
   * @example <caption>Roll group: `{4d6+2d10/2, 5d6/2d%}`</caption>
   * const results = new ResultGroup([
   *  new ResultGroup([
   *    new RollResults([3, 5, 4, 2]),
   *    '+',
   *    new RollResults([4, 8]),
   *    '/',
   *    2,
   *  ]),
   *  new ResultGroup([
   *    new RollResults([3, 3, 5, 2, 4]),
   *    '/',
   *    new RollResults([87, 46]),
   *  ]),
   * ]);
   *
   * @param {Array.<ResultGroup|RollResults|number|string>} [results=[]] The results and expressions
   * @param {string[]|Set<string>} [modifiers=[]] List of modifier names that affect the group
   * @param {boolean} [isRollGroup=false] Whether the result group represents a roll group or not
   * @param {boolean} [useInTotal=true] Whether to include the group's value when calculating totals
   *
   * @throws {TypeError} Rolls must be an array
   */
  constructor(results = [], modifiers = [], isRollGroup = false, useInTotal = true) {
    this.isRollGroup = isRollGroup;
    this.modifiers = modifiers;
    this.results = results;
    this.useInTotal = useInTotal;
  }

  /**
   * The value to use in calculations.
   * This may be changed by modifiers.
   *
   * @returns {number}
   */
  get calculationValue() {
    return isNumeric(this[calculationValueSymbol$1])
      ? parseFloat(this[calculationValueSymbol$1])
      : this.value;
  }

  /**
   * Set the value to use in calculations.
   *
   * @param {number} value
   *
   * @throws {TypeError} value is invalid
   */
  set calculationValue(value) {
    const isValNumeric = isNumeric(value);
    if (value === Infinity) {
      throw new RangeError('Results calculation value must be a finite number');
    }
    if (value && !isValNumeric) {
      throw new TypeError(`Results calculation value is invalid: ${value}`);
    }

    this[calculationValueSymbol$1] = isValNumeric ? parseFloat(`${value}`) : null;
  }

  /**
   * Whether the result group represents a roll group or not.
   *
   * @returns {boolean} `true` if it is a roll group, `false` otherwise
   */
  get isRollGroup() {
    return this[isRollGroupSymbol];
  }

  /**
   * Set whether the result group represents a roll group or not.
   *
   * @param {boolean} value
   */
  set isRollGroup(value) {
    this[isRollGroupSymbol] = !!value;
  }

  /**
   * The number of results.
   *
   * @returns {number}
   */
  get length() {
    return this.results.length || 0;
  }

  /**
   * The visual flags for the modifiers that affect the group.
   *
   * @see {@link ResultGroup#modifiers}
   *
   * @returns {string}
   */
  get modifierFlags() {
    return getModifierFlags(...this.modifiers);
  }

  /**
   * The modifier names that affect the group.
   *
   * @returns {Set<string>}
   */
  get modifiers() {
    return this[modifiersSymbol$2];
  }

  /**
   * Set the modifier names that affect the group.
   *
   * @example
   * resultGroup.modifiers = ['drop', 'target-success'];
   *
   * @param {string[]|Set<string>} value
   *
   * @throws {TypeError} modifiers must be a Set or array of modifier names
   */
  set modifiers(value) {
    if ((Array.isArray(value) || (value instanceof Set)) && [...value].every((item) => typeof item === 'string')) {
      this[modifiersSymbol$2] = new Set([...value]);
    } else if (!value && (value !== 0)) {
      // clear the modifiers
      this[modifiersSymbol$2] = new Set();
    } else {
      throw new TypeError(`modifiers must be a Set or array of modifier names: ${value}`);
    }
  }

  /**
   * List of results.
   *
   * @returns {Array.<ResultGroup|RollResults|number|string>}
   */
  get results() {
    return [...this[resultsSymbol]];
  }

  /**
   * Set the results.
   *
   * @param {Array.<ResultGroup|RollResults|number|string>} results
   *
   * @throws {TypeError} Results must be an array
   */
  set results(results) {
    if (!results || !Array.isArray(results)) {
      // results is not an array
      throw new TypeError(`results must be an array: ${results}`);
    }

    // loop through each result and add it to the results list
    this[resultsSymbol] = [];
    results.forEach((result) => {
      this.addResult(result);
    });
  }

  /**
   * Whether to use the value in total calculations or not.
   *
   * @returns {boolean}
   */
  get useInTotal() {
    return !!this[useInTotalSymbol$1];
  }

  /**
   * Set whether to use the value in total calculations or not.
   *
   * @param {boolean} value
   */
  set useInTotal(value) {
    this[useInTotalSymbol$1] = !!value;
  }

  /**
   * The total value of all the results after modifiers have been applied.
   *
   * @returns {number}
   */
  get value() {
    if (!this.results.length) {
      return 0;
    }

    // loop through the results
    // - get the values of result objects and add any operators and plain numbers
    // we'll either end up with a numerical total (If all results are result objects or numbers)
    // or a string equation (If there are operators)
    const value = this.results.reduce((v, result) => {
      let val = result;

      if (result instanceof ResultGroup) {
        val = result.useInTotal ? result.calculationValue : 0;
      } else if (result instanceof RollResults) {
        val = result.value;
      }

      return v + val;
    }, (typeof this.results[0] === 'string') ? '' : 0);

    // if value is a string that means operators were included, so we need to evaluate the equation
    if (typeof value === 'string') {
      return evaluate(value);
    }

    return value;
  }

  /**
   * Add a single result to the list.
   *
   * @param {ResultGroup|RollResults|number|string} value
   *
   * @throws {TypeError} Value type is invalid
   */
  addResult(value) {
    let val;

    if ((value instanceof ResultGroup) || (value instanceof RollResults)) {
      // already a valid result object
      val = value;
    } else if ((typeof value === 'string') || isNumeric(value)) {
      // string operator (e.g. '+', '/', etc.), or plain number
      val = value;
    } else {
      throw new TypeError('value must be one of ResultGroup, RollResults, string, or number');
    }

    // add the result to the list
    this[resultsSymbol].push(val);
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{
   *  modifierFlags: string,
   *  modifiers: string[],
   *  results: Array<ResultGroup|RollResults|number|string>,
   *  type: string,
   *  useInTotal: boolean,
   *  value: number
   * }}
   */
  toJSON() {
    const {
      calculationValue, isRollGroup, modifierFlags, modifiers, results, useInTotal, value,
    } = this;

    return {
      calculationValue,
      isRollGroup,
      modifierFlags,
      modifiers: [...modifiers],
      results,
      type: 'result-group',
      useInTotal,
      value,
    };
  }

  /**
   * Return the String representation of the object.
   *
   * This is called automatically when casting the object to a string.
   *
   * @returns {string}
   */
  toString() {
    let output;

    if (this.isRollGroup) {
      output = `{${this.results.join(', ')}}`;
    } else {
      output = this.results.join('');
    }

    if (this.modifierFlags) {
      output = `(${output})${this.modifierFlags}`;
    }

    return output;
  }
}

const endSymbol = Symbol('end');
const qtySymbol$1 = Symbol('qty');

/**
 * A `KeepModifier` will "keep" dice from a roll, dropping (Remove from total calculations) all
 * others.
 *
 * @see {@link DropModifier} for the opposite of this modifier
 *
 * @extends Modifier
 */
class KeepModifier extends Modifier {
  /**
   * Create a `KeepModifier` instance
   *
   * @param {string} [end=h] Either `h|l` to keep highest or lowest
   * @param {number} [qty=1] The amount dice to keep
   *
   * @throws {RangeError} End must be one of 'h' or 'l'
   * @throws {TypeError} qty must be a positive integer
   */
  constructor(end = 'h', qty = 1) {
    super();

    this.end = end;
    this.qty = qty;

    // set the modifier's sort order
    this.order = 5;
  }

  /**
   * Which end the rolls should be kept ("h" = High, "l" = Low).
   *
   * @returns {string} 'h' or 'l'
   */
  get end() {
    return this[endSymbol];
  }

  /**
   * Set which end the rolls should be kept ("h" = High, "l" = Low).
   *
   * @param {string} value Either 'h' or 'l'
   *
   * @throws {RangeError} End must be one of 'h' or 'l'
   */
  set end(value) {
    if ((value !== 'h') && (value !== 'l')) {
      throw new RangeError('End must be "h" or "l"');
    }

    this[endSymbol] = value;
  }

  /**
   * The name of the modifier.
   *
   * @returns {string} 'keep-l' or 'keep-h'
   */
  get name() {
    return `keep-${this.end}`;
  }

  /**
   * The modifier's notation.
   *
   * @returns {string}
   */
  get notation() {
    return `k${this.end}${this.qty}`;
  }

  /**
   * The quantity of dice that should be kept.
   *
   * @returns {number}
   */
  get qty() {
    return this[qtySymbol$1];
  }

  /**
   * Set the quantity of dice that should be kept.
   *
   * @param {number} value
   *
   * @throws {TypeError} qty must be a positive finite integer
   */
  set qty(value) {
    if (value === Infinity) {
      throw new RangeError('qty must be a finite number');
    }
    if (!isNumeric(value) || (value < 1)) {
      throw new TypeError('qty must be a positive finite integer');
    }

    this[qtySymbol$1] = Math.floor(value);
  }

  /**
   * Determine the start and end (end exclusive) range of rolls to drop.
   *
   * @param {RollResults} _results The results to drop from
   *
   * @returns {number[]} The min / max range to drop
   */
  rangeToDrop(_results) {
    // we're keeping, so we want to drop all dice that are outside of the qty range
    if (this.end === 'h') {
      return [0, _results.length - this.qty];
    }

    return [this.qty, _results.length];
  }

  /**
   * Run the modifier on the results.
   *
   * @param {ResultGroup|RollResults} results The results to run the modifier against
   * @param {StandardDice|RollGroup} _context The object that the modifier is attached to
   *
   * @returns {ResultGroup|RollResults} The modified results
   */
  run(results, _context) {
    let modifiedRolls;
    let rollIndexes;

    if (results instanceof ResultGroup) {
      modifiedRolls = results.results;

      if ((modifiedRolls.length === 1) && (modifiedRolls[0] instanceof ResultGroup)) {
        // single sub-roll - get all the dice rolled and their 2d indexes
        rollIndexes = modifiedRolls[0].results.map((result, index) => {
          if (result instanceof RollResults) {
            return result.rolls.map((subResult, subIndex) => ({
              value: subResult.value,
              index: [index, subIndex],
            }));
          }

          return null;
        }).flat().filter(Boolean);
      } else {
        rollIndexes = [...modifiedRolls]
          // get a list of objects with roll values and original index
          .map((roll, index) => ({
            value: roll.value,
            index,
          }));
      }
    } else {
      modifiedRolls = results.rolls;

      rollIndexes = [...modifiedRolls]
        // get a list of objects with roll values and original index
        .map((roll, index) => ({
          value: roll.value,
          index,
        }));
    }

    // determine the indexes that need to be dropped
    rollIndexes = rollIndexes
      // sort the list ascending by value
      .sort((a, b) => a.value - b.value)
      .map((rollIndex) => rollIndex.index)
      // get the roll indexes to drop
      .slice(...this.rangeToDrop(rollIndexes));

    // loop through all of our dice to drop and flag them as such
    rollIndexes.forEach((rollIndex) => {
      let roll;

      if (Array.isArray(rollIndex)) {
        // array of indexes (e.g. single sub-roll in a group roll)
        roll = modifiedRolls[0].results[rollIndex[0]].rolls[rollIndex[1]];
      } else {
        roll = modifiedRolls[rollIndex];
      }

      roll.modifiers.add('drop');
      roll.useInTotal = false;
    });

    return results;
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{notation: string, name: string, type: string, qty: number, end: string}}
   */
  toJSON() {
    const { end, qty } = this;

    return Object.assign(
      super.toJSON(),
      {
        end,
        qty,
      },
    );
  }
}

/**
 * A `DropModifier` will "drop" (Remove from total calculations) dice from a roll.
 *
 * @see {@link KeepModifier} for the opposite of this modifier
 *
 * @extends KeepModifier
 */
class DropModifier extends KeepModifier {
  /**
   * Create a `DropModifier` instance.
   *
   * @param {string} [end=l] Either `h|l` to drop highest or lowest
   * @param {number} [qty=1] The amount of dice to drop
   *
   * @throws {RangeError} End must be one of 'h' or 'l'
   * @throws {TypeError} qty must be a positive integer
   */
  constructor(end = 'l', qty = 1) {
    super(end, qty);

    // set the modifier's sort order
    this.order = 6;
  }

  /**
   * The name of the modifier.
   *
   * @returns {string} 'drop-l' or 'drop-h'
   */
  get name() {
    return `drop-${this.end}`;
  }

  /**
   * The modifier's notation.
   *
   * @returns {string}
   */
  get notation() {
    return `d${this.end}${this.qty}`;
  }

  /**
   * Determine the start and end (end exclusive) range of rolls to drop.
   *
   * @param {RollResults} _results The results to drop from
   *
   * @returns {number[]} The min / max range to drop
   */
  rangeToDrop(_results) {
    // we're dropping, so we want to drop all dice that are inside of the qty range
    if (this.end === 'h') {
      return [_results.length - this.qty, _results.length];
    }

    return [0, this.qty];
  }
}

const maxSymbol$1 = Symbol('max');

/**
 * A `MaxModifier` causes die rolls over a maximum value to be treated as the maximum value.
 *
 * @since 4.3.0
 *
 * @see {@link MinModifier} for the opposite of this modifier
 *
 * @extends {Modifier}
 */
class MaxModifier extends Modifier {
  /**
   * Create a `MaxModifier` instance.
   *
   * @param {number} max The maximum value
   *
   * @throws {TypeError} max must be a number
   */
  constructor(max) {
    super();

    this.max = max;

    // set the modifier's sort order
    this.order = 2;
  }

  /**
   * The maximum value.
   *
   * @returns {Number}
   */
  get max() {
    return this[maxSymbol$1];
  }

  /**
   * Set the maximum value.
   *
   * @param {number} value
   *
   * @throws {TypeError} max must be a number
   */
  set max(value) {
    if (!isNumeric(value)) {
      throw new TypeError('max must be a number');
    }

    this[maxSymbol$1] = parseFloat(`${value}`);
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The name of the modifier.
   *
   * @returns {string} 'max'
   */
  get name() {
    return 'max';
  }
  /* eslint-enable class-methods-use-this */

  /**
   * The modifier's notation.
   *
   * @returns {string}
   */
  get notation() {
    return `max${this.max}`;
  }

  /**
   * Run the modifier on the results.
   *
   * @param {RollResults} results The results to run the modifier against
   * @param {StandardDice|RollGroup} _context The object that the modifier is attached to
   *
   * @returns {RollResults} The modified results
   */
  run(results, _context) {
    const parsedResults = results;

    parsedResults.rolls = results.rolls.map((roll) => {
      const parsedRoll = roll;

      if (roll.value > this.max) {
        parsedRoll.value = this.max;
        parsedRoll.modifiers.add('max');
      }

      return parsedRoll;
    });

    return parsedResults;
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{notation: string, name: string, type: string, max: Number}}
   */
  toJSON() {
    const { max } = this;

    return Object.assign(
      super.toJSON(),
      {
        max,
      },
    );
  }
}

const minSymbol$1 = Symbol('min');

/**
 * A `MinModifier` causes die rolls under a minimum value to be treated as the minimum value.
 *
 * @since 4.3.0
 *
 * @see {@link MaxModifier} for the opposite of this modifier
 *
 * @extends {Modifier}
 */
class MinModifier extends Modifier {
  /**
   * Create a `MinModifier` instance.
   *
   * @param {number} min The minimum value
   *
   * @throws {TypeError} min must be a number
   */
  constructor(min) {
    super();

    this.min = min;

    // set the modifier's sort order
    this.order = 1;
  }

  /**
   * The minimum value.
   *
   * @returns {Number}
   */
  get min() {
    return this[minSymbol$1];
  }

  /**
   * Set the minimum value.
   *
   * @param {number} value
   *
   * @throws {TypeError} min must be a number
   */
  set min(value) {
    if (!isNumeric(value)) {
      throw new TypeError('min must be a number');
    }

    this[minSymbol$1] = parseFloat(`${value}`);
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The name of the modifier.
   *
   * @returns {string} 'min'
   */
  get name() {
    return 'min';
  }
  /* eslint-enable class-methods-use-this */

  /**
   * The modifier's notation.
   *
   * @returns {string}
   */
  get notation() {
    return `min${this.min}`;
  }

  /**
   * Run the modifier on the results.
   *
   * @param {RollResults} results The results to run the modifier against
   * @param {StandardDice|RollGroup} _context The object that the modifier is attached to
   *
   * @returns {RollResults} The modified results
   */
  run(results, _context) {
    const parsedResults = results;

    parsedResults.rolls = results.rolls.map((roll) => {
      const parsedRoll = roll;

      if (roll.value < this.min) {
        parsedRoll.value = this.min;
        parsedRoll.modifiers.add('min');
      }

      return parsedRoll;
    });

    return parsedResults;
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{notation: string, name: string, type: string, min: Number}}
   */
  toJSON() {
    const { min } = this;

    return Object.assign(
      super.toJSON(),
      {
        min,
      },
    );
  }
}

const directionSymbol = Symbol('direction');

/**
 * A `SortingModifier` sorts roll results by their value, either ascending or descending.
 *
 * @extends ComparisonModifier
 */
class SortingModifier extends Modifier {
  /**
   * Create a `SortingModifier` instance.
   *
   * @param {string} [direction=a] The direction to sort in; 'a' (Ascending) or 'd' (Descending)
   *
   * @throws {RangeError} Direction must be 'a' or 'd'
   */
  constructor(direction = 'a') {
    super();

    this.direction = direction;

    // set the modifier's sort order
    this.order = 10;
  }

  /**
   * The sort direction.
   *
   * @returns {string} Either 'a' or 'd'
   */
  get direction() {
    return this[directionSymbol];
  }

  /**
   * Set the sort direction.
   *
   * @param {string} value Either 'a' (Ascending) or 'd' (Descending)
   *
   * @throws {RangeError} Direction must be 'a' or 'd'
   */
  set direction(value) {
    if ((value !== 'a') && (value !== 'd')) {
      throw new RangeError('Direction must be "a" (Ascending) or "d" (Descending)');
    }

    this[directionSymbol] = value;
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The name of the modifier.
   *
   * @returns {string} 'sorting'
   */
  get name() {
    return 'sorting';
  }
  /* eslint-enable class-methods-use-this */

  /**
   * The modifier's notation.
   *
   * @returns {string}
   */
  get notation() {
    return `s${this.direction}`;
  }

  /**
   * Run the modifier on the results.
   *
   * @param {RollResults} results The results to run the modifier against
   * @param {StandardDice|RollGroup} _context The object that the modifier is attached to
   *
   * @returns {RollResults} The modified results
   */
  run(results, _context) {
    let resultsKey;

    if (results instanceof ResultGroup) {
      resultsKey = 'results';
    } else {
      resultsKey = 'rolls';
    }

    /* eslint-disable no-param-reassign */
    results[resultsKey] = results[resultsKey].sort((a, b) => {
      if (this.direction === 'd') {
        return b.value - a.value;
      }

      return a.value - b.value;
    });

    // if result group, we also need to sort any die rolls in th sub-rolls
    if (results instanceof ResultGroup) {
      results[resultsKey] = results[resultsKey].map((subRoll) => {
        if ((subRoll instanceof ResultGroup) || (subRoll instanceof RollResults)) {
          return this.run(subRoll, _context);
        }

        return subRoll;
      });
    }
    /* eslint-enable */

    return results;
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{notation: string, name: string, type: string, direction: string}}
   */
  toJSON() {
    const { direction } = this;

    return Object.assign(
      super.toJSON(),
      {
        direction,
      },
    );
  }
}

const failureCPSymbol = Symbol('failure-cp');

/**
 * A `TargetModifier` determines whether rolls are classed as a success, failure, or neutral.
 *
 * This modifies the roll values, depending on the state;
 *
 * success = `1`, failure = `-1`, neutral = `0`.
 *
 * @extends ComparisonModifier
 */
class TargetModifier extends ComparisonModifier {
  /**
   * Create a `TargetModifier` instance.
   *
   * @param {ComparePoint} successCP The success comparison object
   * @param {ComparePoint} [failureCP=null] The failure comparison object
   *
   * @throws {TypeError} failure comparePoint must be instance of ComparePoint or null
   */
  constructor(successCP, failureCP = null) {
    super(successCP);

    // set the failure compare point
    this.failureComparePoint = failureCP;

    // set the modifier's sort order
    this.order = 7;
  }

  /**
   * The failure compare point for the modifier
   *
   * @returns {ComparePoint|null}
   */
  get failureComparePoint() {
    return this[failureCPSymbol];
  }

  /**
   * Set the failure compare point
   *
   * @param {ComparePoint|null} comparePoint
   *
   * @throws {TypeError} failure comparePoint must be instance of ComparePoint or null
   */
  set failureComparePoint(comparePoint) {
    if (comparePoint && !(comparePoint instanceof ComparePoint)) {
      throw new TypeError('failure comparePoint must be instance of ComparePoint or null');
    }

    this[failureCPSymbol] = comparePoint || null;
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The name of the modifier.
   *
   * @returns {string} 'target'
   */
  get name() {
    return 'target';
  }
  /* eslint-enable class-methods-use-this */

  /**
   * The modifier's notation.
   *
   * @returns {string}
   */
  get notation() {
    return `${super.notation}${this.failureComparePoint ? `f${this.failureComparePoint}` : ''}`;
  }

  /**
   * The success compare point for the modifier
   *
   * @returns {ComparePoint}
   */
  get successComparePoint() {
    return this.comparePoint;
  }

  /**
   * Set the success compare point for the modifier
   *
   * @param {ComparePoint} value
   */
  set successComparePoint(value) {
    super.comparePoint = value;
  }

  /**
   * Check if the value is a success/failure/neither and return the corresponding state value.
   *
   * @param {number} value The number to compare against
   *
   * @returns {number} success = `1`, failure = `-1`, neutral = `0`
   */
  getStateValue(value) {
    if (this.isSuccess(value)) {
      return 1;
    }

    if (this.isFailure(value)) {
      return -1;
    }

    return 0;
  }

  /**
   * Check if the `value` matches the failure compare point.
   *
   * A response of `false` does _NOT_ indicate a success.
   * A value is a success _ONLY_ if it passes the success compare point.
   * A value could be neither a failure or a success.
   *
   * @param {number} value The number to compare against
   *
   * @returns {boolean}
   */
  isFailure(value) {
    return this.failureComparePoint ? this.failureComparePoint.isMatch(value) : false;
  }

  /**
   * Check if the `value` is neither a success or a failure.
   *
   * @param {number} value The number to compare against
   *
   * @returns {boolean} `true` if the value doesn't match the success and failure compare points
   */
  isNeutral(value) {
    return !this.isSuccess(value) && !this.isFailure(value);
  }

  /**
   * Check if the `value` matches the success compare point.
   *
   * A response of `false` does _NOT_ indicate a failure.
   * A value is a failure _ONLY_ if it passes the failure compare point.
   * A value could be neither a failure or a success.
   *
   * @param {number} value The number to compare against
   *
   * @returns {boolean}
   */
  isSuccess(value) {
    return this.isComparePoint(value);
  }

  /**
   * Run the modifier on the results.
   *
   * @param {RollResults} results The results to run the modifier against
   * @param {StandardDice|RollGroup} _context The object that the modifier is attached to
   *
   * @returns {RollResults} The modified results
   */
  run(results, _context) {
    let rolls;

    if (results instanceof ResultGroup) {
      rolls = results.results;
    } else {
      rolls = results.rolls;
    }

    // loop through each roll and see if it matches the target
    rolls
      .forEach((roll) => {
        // add the modifier flag
        if (this.isSuccess(roll.value)) {
          roll.modifiers.add('target-success');
        } else if (this.isFailure(roll.value)) {
          roll.modifiers.add('target-failure');
        }

        // set the value to the success state value
        // eslint-disable-next-line no-param-reassign
        roll.calculationValue = this.getStateValue(roll.value);
      });

    return results;
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{
   *  notation: string,
   *  name: string,
   *  type: string,
   *  comparePoint: (ComparePoint|undefined),
   *  failureComparePoint: (ComparePoint|null),
   *  successComparePoint: ComparePoint
   * }}
   */
  toJSON() {
    const { failureComparePoint, successComparePoint } = this;

    // get the inherited object, but remove the comparePoint property
    const result = super.toJSON();
    delete result.comparePoint;

    return Object.assign(
      result,
      {
        failureComparePoint,
        successComparePoint,
      },
    );
  }
}

var index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ComparisonModifier: ComparisonModifier,
  CriticalFailureModifier: CriticalFailureModifier,
  CriticalSuccessModifier: CriticalSuccessModifier,
  DropModifier: DropModifier,
  ExplodeModifier: ExplodeModifier,
  KeepModifier: KeepModifier,
  MaxModifier: MaxModifier,
  MinModifier: MinModifier,
  Modifier: Modifier,
  ReRollModifier: ReRollModifier,
  SortingModifier: SortingModifier,
  TargetModifier: TargetModifier
});

var index$4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ResultGroup: ResultGroup,
  RollResult: RollResult,
  RollResults: RollResults
});

/**
 * Check if the value is a valid base64 encoded string.
 *
 * @param {string} val
 *
 * @returns {boolean} `true` if it is valid base64 encoded, `false` otherwise
 */
const isBase64 = (val) => {
  try {
    return !!(val && (btoa(atob(val)) === val));
  } catch (e) {
    return false;
  }
};

/**
 * Check if the value is a valid JSON encoded string.
 *
 * @param {string} val
 *
 * @returns {boolean} `true` if the value is valid JSON, `false` otherwise
 */
const isJson = (val) => {
  try {
    const parsed = val ? JSON.parse(val) : false;

    return !!(parsed && (typeof parsed === 'object'));
  } catch (e) {
    return false;
  }
};

const modifiersSymbol$3 = Symbol('modifiers');
const expressionsSymbol = Symbol('expressions');

/**
 * A `RollGroup` is a group of one or more "sub-rolls".
 *
 * A sub-roll is just simple roll notation (e.g. `4d6`, `2d10*3`, `5/10d20`)
 *
 * @example <caption>`{4d6+4, 2d%/5}k1`</caption>
 * const expressions = [
 *   [
 *     new StandardDice(6, 4),
 *     '+',
 *     4,
 *   ],
 *   [
 *     new PercentileDice(2),
 *     '/',
 *     5,
 *   ],
 * ];
 *
 * const modifiers = [
 *   new KeepModifier(),
 * ];
 *
 * const group = new RollGroup(expressions, modifiers);
 *
 * @since 4.5.0
 */
class RollGroup {
  /**
   * Create a `RollGroup` instance.
   *
   * @param {Array.<Array.<StandardDice|string|number>>} [expressions=[]] List of sub-rolls
   * @param {Map<string, Modifier>|Modifier[]|{}|null} [modifiers=[]] The modifiers that affect the
   * group
   */
  constructor(expressions = [], modifiers = []) {
    this.expressions = expressions;
    this.modifiers = modifiers;
  }

  /**
   * The sub-roll expressions in the group.
   *
   * @returns {Array.<Array.<StandardDice|string|number>>}
   */
  get expressions() {
    return [...(this[expressionsSymbol] || [])];
  }

  /**
   * Set the sub-roll expressions in the group.
   *
   * @param {Array.<Array.<StandardDice|string|number>>} expressions
   *
   * @throws {TypeError} Expressions must be an array of arrays
   * @throws {TypeError} Sub expressions cannot be empty
   * @throws {TypeError} Sub expression items must be Dice, numbers, or strings
   */
  set expressions(expressions) {
    if (!expressions) {
      throw new RequiredArgumentError('expressions');
    }

    if (!Array.isArray(expressions)) {
      throw new TypeError(`expressions must be an array: ${expressions}`);
    }

    // loop through each expression and add it to the list
    this[expressionsSymbol] = [];
    expressions.forEach((expression) => {
      if (!expression || !Array.isArray(expression)) {
        throw new TypeError(`Expressions must be an array of arrays: ${expressions}`);
      }

      if (expression.length === 0) {
        throw new TypeError(`Sub expressions cannot be empty: ${expressions}`);
      }

      if (!expression.every((value) => (value instanceof StandardDice) || (typeof value === 'string') || (typeof value === 'number'))) {
        throw new TypeError('Sub expression items must be Dice, numbers, or strings');
      }

      this[expressionsSymbol].push(expression);
    });
  }

  /**
   * The modifiers that affect the object.
   *
   * @returns {Map<string, Modifier>|null}
   */
  get modifiers() {
    if (this[modifiersSymbol$3]) {
      // ensure modifiers are ordered correctly
      return new Map([...this[modifiersSymbol$3]].sort((a, b) => a[1].order - b[1].order));
    }

    return null;
  }

  /**
   * Set the modifiers that affect this group.
   *
   * @param {Map<string, Modifier>|Modifier[]|{}|null} value
   *
   * @throws {TypeError} Modifiers should be a Map, array of Modifiers, or an Object
   */
  set modifiers(value) {
    let modifiers;
    if (value instanceof Map) {
      modifiers = value;
    } else if (Array.isArray(value)) {
      // loop through and get the modifier name of each item and use it as the map key
      modifiers = new Map(value.map((modifier) => [modifier.name, modifier]));
    } else if (typeof value === 'object') {
      modifiers = new Map(Object.entries(value));
    } else {
      throw new TypeError('modifiers should be a Map, array, or an Object containing Modifiers');
    }

    if (
      modifiers.size
      && [...modifiers.entries()].some((entry) => !(entry[1] instanceof Modifier))
    ) {
      throw new TypeError('modifiers must only contain Modifier instances');
    }

    this[modifiersSymbol$3] = modifiers;
  }

  /**
   * The group notation. e.g. `{4d6, 2d10+3}k1`.
   *
   * @returns {string}
   */
  get notation() {
    let notation = this.expressions
      .map((expression) => expression.reduce((acc, e) => acc + e, ''))
      .join(', ');

    notation = `{${notation}}`;

    if (this.modifiers && this.modifiers.size) {
      notation += [...this.modifiers.values()].reduce((acc, modifier) => acc + modifier.notation, '');
    }

    return notation;
  }

  /**
   * Run the sub-roll expressions for the group.
   *
   * @example <caption>`{4d6+4/1d6, 2d10/3}k1`</caption>
   * ResultGroup {
   *   results: [
   *     // sub-roll 1 - 4d6+4/1d6
   *     ResultGroup {
   *       results: [
   *         RollResults {
   *           rolls: [
   *             RollResult {
   *               value: 2
   *             },
   *             RollResult {
   *               value: 5
   *             },
   *             RollResult {
   *               value: 4
   *             },
   *             RollResult {
   *               value: 1
   *             }
   *           ]
   *         },
   *         '+',
   *         4,
   *         '/',
   *         RollResults {
   *           rolls: [
   *             RollResult {
   *               value: 4
   *             }
   *           ]
   *         }
   *       ]
   *     },
   *     // sub-roll 2 - 2d10/3
   *     ResultGroup {
   *       results: [
   *         RollResults {
   *           rolls: [
   *             RollResults {
   *               4
   *             },
   *             RollResults {
   *               9
   *             }
   *           ]
   *         },
   *         '/',
   *         3
   *       ]
   *     }
   *   ]
   * }
   *
   * @returns {ResultGroup} The results of the sub-rolls
   */
  roll() {
    // loop through each sub-roll expression and roll it
    // adding the results to a single RollResults object
    const rollResults = new ResultGroup(this.expressions.map((subRoll) => {
      const result = subRoll
        .map((expression) => {
          if (expression instanceof StandardDice) {
            // roll the object and return the value
            return expression.roll();
          }

          return expression;
        });

      return new ResultGroup(result);
    }));

    // flag it as roll group results
    rollResults.isRollGroup = true;

    // loop through each modifier and carry out its actions
    (this.modifiers || []).forEach((modifier) => {
      modifier.run(rollResults, this);
    });

    return rollResults;
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{
   *  notation: string,
   *  modifiers: (Map<string, Modifier>|null),
   *  type: string,
   *  expressions: Array.<Array.<StandardDice|string|number>>
   * }}
   */
  toJSON() {
    const { modifiers, notation, expressions } = this;

    return {
      expressions,
      modifiers,
      notation,
      type: 'group',
    };
  }

  /**
   * Return the String representation of the object.
   *
   * This is called automatically when casting the object to a string.
   *
   * @see {@link RollGroup#notation}
   *
   * @returns {string}
   */
  toString() {
    return this.notation;
  }
}

function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleFunctions = { Main: peg$parseMain },
      peg$startRuleFunction  = peg$parseMain,

      peg$c0 = "{",
      peg$c1 = peg$literalExpectation("{", false),
      peg$c2 = ",",
      peg$c3 = peg$literalExpectation(",", false),
      peg$c4 = "}",
      peg$c5 = peg$literalExpectation("}", false),
      peg$c6 = function(expr, exprs, modifiers) {
          return new RollGroup(
            [
              expr,
              ...exprs.map(v => v[3])
            ],
            Object.assign({}, ...modifiers.map(item => {
              return {[item.name]: item};
            }))
          );
        },
      peg$c7 = function(die, modifiers) {
        die.modifiers = Object.assign({}, ...modifiers.map(item => {
          return {[item.name]: item};
        }));

        return die;
      },
      peg$c8 = "d",
      peg$c9 = peg$literalExpectation("d", false),
      peg$c10 = function(qty, sides) {
          return new StandardDice(sides, qty || 1)
        },
      peg$c11 = "d%",
      peg$c12 = peg$literalExpectation("d%", false),
      peg$c13 = function(qty) {
          return new PercentileDice(qty || 1);
        },
      peg$c14 = "dF",
      peg$c15 = peg$literalExpectation("dF", false),
      peg$c16 = ".",
      peg$c17 = peg$literalExpectation(".", false),
      peg$c18 = /^[12]/,
      peg$c19 = peg$classExpectation(["1", "2"], false, false),
      peg$c20 = function(qty, sides) {
          return new FudgeDice(sides ? parseInt(sides[1], 10) : 2, qty || 1);
        },
      peg$c21 = "!",
      peg$c22 = peg$literalExpectation("!", false),
      peg$c23 = "p",
      peg$c24 = peg$literalExpectation("p", false),
      peg$c25 = function(compound, penetrate, comparePoint) {
          return new ExplodeModifier(comparePoint, !!compound, !!penetrate);
        },
      peg$c26 = function(successCP, failureCP) {
          return new TargetModifier(successCP, failureCP);
        },
      peg$c27 = /^[lh]/,
      peg$c28 = peg$classExpectation(["l", "h"], false, false),
      peg$c29 = function(end, qty) {
          return new DropModifier(end || 'l', qty);
        },
      peg$c30 = "k",
      peg$c31 = peg$literalExpectation("k", false),
      peg$c32 = function(end, qty) {
          return new KeepModifier(end || 'h', qty);
        },
      peg$c33 = "max",
      peg$c34 = peg$literalExpectation("max", false),
      peg$c35 = function(max) {
          return new MaxModifier(max);
        },
      peg$c36 = "min",
      peg$c37 = peg$literalExpectation("min", false),
      peg$c38 = function(min) {
          return new MinModifier(min);
        },
      peg$c39 = "r",
      peg$c40 = peg$literalExpectation("r", false),
      peg$c41 = "o",
      peg$c42 = peg$literalExpectation("o", false),
      peg$c43 = function(once, comparePoint) {
          return new ReRollModifier(!!once, comparePoint);
        },
      peg$c44 = "cs",
      peg$c45 = peg$literalExpectation("cs", false),
      peg$c46 = function(comparePoint) {
          return new CriticalSuccessModifier(comparePoint);
        },
      peg$c47 = "cf",
      peg$c48 = peg$literalExpectation("cf", false),
      peg$c49 = function(comparePoint) {
          return new CriticalFailureModifier(comparePoint);
        },
      peg$c50 = "s",
      peg$c51 = peg$literalExpectation("s", false),
      peg$c52 = "a",
      peg$c53 = peg$literalExpectation("a", false),
      peg$c54 = function(dir) {
          return new SortingModifier(dir || 'a');
        },
      peg$c55 = "f",
      peg$c56 = peg$literalExpectation("f", false),
      peg$c57 = function(comparePoint) { return comparePoint },
      peg$c58 = function(operator, value) {
          return new ComparePoint(operator, value);
        },
      peg$c59 = "!=",
      peg$c60 = peg$literalExpectation("!=", false),
      peg$c61 = "<=",
      peg$c62 = peg$literalExpectation("<=", false),
      peg$c63 = ">=",
      peg$c64 = peg$literalExpectation(">=", false),
      peg$c65 = "=",
      peg$c66 = peg$literalExpectation("=", false),
      peg$c67 = ">",
      peg$c68 = peg$literalExpectation(">", false),
      peg$c69 = "<",
      peg$c70 = peg$literalExpectation("<", false),
      peg$c71 = "(",
      peg$c72 = peg$literalExpectation("(", false),
      peg$c73 = ")",
      peg$c74 = peg$literalExpectation(")", false),
      peg$c75 = function(l, expr, r) { return evaluate(text()) },
      peg$c76 = function(head, tail) {
          head = Array.isArray(head) ? head : [head];

          return [
            ...head,
            ...tail
              .map(([, value, , factor]) => {
                return [
                  value,
                  factor
                ];
              }).flat(2)
          ]
        },
      peg$c77 = function(l, expr, r) { return [l, ...expr, r] },
      peg$c78 = "abs",
      peg$c79 = peg$literalExpectation("abs", false),
      peg$c80 = "ceil",
      peg$c81 = peg$literalExpectation("ceil", false),
      peg$c82 = "cos",
      peg$c83 = peg$literalExpectation("cos", false),
      peg$c84 = "exp",
      peg$c85 = peg$literalExpectation("exp", false),
      peg$c86 = "floor",
      peg$c87 = peg$literalExpectation("floor", false),
      peg$c88 = "log",
      peg$c89 = peg$literalExpectation("log", false),
      peg$c90 = "round",
      peg$c91 = peg$literalExpectation("round", false),
      peg$c92 = "sign",
      peg$c93 = peg$literalExpectation("sign", false),
      peg$c94 = "sin",
      peg$c95 = peg$literalExpectation("sin", false),
      peg$c96 = "sqrt",
      peg$c97 = peg$literalExpectation("sqrt", false),
      peg$c98 = "tan",
      peg$c99 = peg$literalExpectation("tan", false),
      peg$c100 = function(func, expr) {
          return [
            `${func}(`,
            ...expr,
            ')',
          ];
        },
      peg$c101 = "pow",
      peg$c102 = peg$literalExpectation("pow", false),
      peg$c103 = function(func, expr1, expr2) {
          return [
            `${func}(`,
            ...expr1,
            ',',
            ...expr2,
            ')',
          ];
        },
      peg$c104 = "-",
      peg$c105 = peg$literalExpectation("-", false),
      peg$c106 = /^[.]/,
      peg$c107 = peg$classExpectation(["."], false, false),
      peg$c108 = function() { return parseFloat(text()) },
      peg$c109 = /^[1-9]/,
      peg$c110 = peg$classExpectation([["1", "9"]], false, false),
      peg$c111 = /^[0-9]/,
      peg$c112 = peg$classExpectation([["0", "9"]], false, false),
      peg$c113 = function() { return parseInt(text(), 10) },
      peg$c114 = "**",
      peg$c115 = peg$literalExpectation("**", false),
      peg$c116 = function() { return "^" },
      peg$c117 = "*",
      peg$c118 = peg$literalExpectation("*", false),
      peg$c119 = "^",
      peg$c120 = peg$literalExpectation("^", false),
      peg$c121 = "%",
      peg$c122 = peg$literalExpectation("%", false),
      peg$c123 = "/",
      peg$c124 = peg$literalExpectation("/", false),
      peg$c125 = "+",
      peg$c126 = peg$literalExpectation("+", false),
      peg$c127 = peg$otherExpectation("whitespace"),
      peg$c128 = /^[ \t\n\r]/,
      peg$c129 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false),

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parseMain() {
    var s0;

    s0 = peg$parseExpression();

    return s0;
  }

  function peg$parseRollGroup() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c0;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c1); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseExpression();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$currPos;
          s6 = peg$parse_();
          if (s6 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s7 = peg$c2;
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c3); }
            }
            if (s7 !== peg$FAILED) {
              s8 = peg$parse_();
              if (s8 !== peg$FAILED) {
                s9 = peg$parseExpression();
                if (s9 !== peg$FAILED) {
                  s6 = [s6, s7, s8, s9];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$currPos;
            s6 = peg$parse_();
            if (s6 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 44) {
                s7 = peg$c2;
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c3); }
              }
              if (s7 !== peg$FAILED) {
                s8 = peg$parse_();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parseExpression();
                  if (s9 !== peg$FAILED) {
                    s6 = [s6, s7, s8, s9];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 125) {
                s6 = peg$c4;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c5); }
              }
              if (s6 !== peg$FAILED) {
                s7 = [];
                s8 = peg$parseModifier();
                while (s8 !== peg$FAILED) {
                  s7.push(s8);
                  s8 = peg$parseModifier();
                }
                if (s7 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c6(s3, s4, s7);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseDice() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseStandardDie();
    if (s1 === peg$FAILED) {
      s1 = peg$parsePercentileDie();
      if (s1 === peg$FAILED) {
        s1 = peg$parseFudgeDie();
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseModifier();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parseModifier();
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c7(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseStandardDie() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseIntegerOrExpression();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 100) {
        s2 = peg$c8;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c9); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseIntegerOrExpression();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c10(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsePercentileDie() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parseIntegerOrExpression();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      if (input.substr(peg$currPos, 2) === peg$c11) {
        s2 = peg$c11;
        peg$currPos += 2;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c12); }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c13(s1);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseFudgeDie() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseIntegerOrExpression();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      if (input.substr(peg$currPos, 2) === peg$c14) {
        s2 = peg$c14;
        peg$currPos += 2;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c15); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 46) {
          s4 = peg$c16;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c17); }
        }
        if (s4 !== peg$FAILED) {
          if (peg$c18.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c19); }
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c20(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseModifier() {
    var s0;

    s0 = peg$parseExplodeModifier();
    if (s0 === peg$FAILED) {
      s0 = peg$parseTargetModifier();
      if (s0 === peg$FAILED) {
        s0 = peg$parseDropModifier();
        if (s0 === peg$FAILED) {
          s0 = peg$parseKeepModifier();
          if (s0 === peg$FAILED) {
            s0 = peg$parseReRollModifier();
            if (s0 === peg$FAILED) {
              s0 = peg$parseCriticalSuccessModifier();
              if (s0 === peg$FAILED) {
                s0 = peg$parseCriticalFailureModifier();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseSortingModifier();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseMaxModifier();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parseMinModifier();
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseExplodeModifier() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 33) {
      s1 = peg$c21;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c22); }
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 33) {
        s2 = peg$c21;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c22); }
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 112) {
          s3 = peg$c23;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c24); }
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseComparePoint();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c25(s2, s3, s4);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseTargetModifier() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parseComparePoint();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseFailComparePoint();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c26(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseDropModifier() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 100) {
      s1 = peg$c8;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c9); }
    }
    if (s1 !== peg$FAILED) {
      if (peg$c27.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c28); }
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseIntegerNumber();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c29(s2, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseKeepModifier() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 107) {
      s1 = peg$c30;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c31); }
    }
    if (s1 !== peg$FAILED) {
      if (peg$c27.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c28); }
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseIntegerNumber();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c32(s2, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseMaxModifier() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c33) {
      s1 = peg$c33;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c34); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseFloatNumber();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c35(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseMinModifier() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c36) {
      s1 = peg$c36;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c37); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseFloatNumber();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c38(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseReRollModifier() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 114) {
      s1 = peg$c39;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c40); }
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 111) {
        s2 = peg$c41;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c42); }
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseComparePoint();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c43(s2, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseCriticalSuccessModifier() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c44) {
      s1 = peg$c44;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c45); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseComparePoint();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c46(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseCriticalFailureModifier() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c47) {
      s1 = peg$c47;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c48); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseComparePoint();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c49(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSortingModifier() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 115) {
      s1 = peg$c50;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c51); }
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 97) {
        s2 = peg$c52;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c53); }
      }
      if (s2 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 100) {
          s2 = peg$c8;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c9); }
        }
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c54(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseFailComparePoint() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 102) {
      s1 = peg$c55;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c56); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseComparePoint();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c57(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseComparePoint() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parseCompareOperator();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseFloatNumber();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c58(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseCompareOperator() {
    var s0;

    if (input.substr(peg$currPos, 2) === peg$c59) {
      s0 = peg$c59;
      peg$currPos += 2;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c60); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 2) === peg$c61) {
        s0 = peg$c61;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c62); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c63) {
          s0 = peg$c63;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c64); }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s0 = peg$c65;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c66); }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 62) {
              s0 = peg$c67;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c68); }
            }
            if (s0 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 60) {
                s0 = peg$c69;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c70); }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseIntegerOrExpression() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

    s0 = peg$parseIntegerNumber();
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c71;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c72); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parseFloatNumber();
          if (s4 !== peg$FAILED) {
            s5 = [];
            s6 = peg$currPos;
            s7 = peg$parse_();
            if (s7 !== peg$FAILED) {
              s8 = peg$parseOperator();
              if (s8 !== peg$FAILED) {
                s9 = peg$parse_();
                if (s9 !== peg$FAILED) {
                  s10 = peg$parseFloatNumber();
                  if (s10 !== peg$FAILED) {
                    s7 = [s7, s8, s9, s10];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
            } else {
              peg$currPos = s6;
              s6 = peg$FAILED;
            }
            if (s6 !== peg$FAILED) {
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                s6 = peg$currPos;
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseOperator();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parse_();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parseFloatNumber();
                      if (s10 !== peg$FAILED) {
                        s7 = [s7, s8, s9, s10];
                        s6 = s7;
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              }
            } else {
              s5 = peg$FAILED;
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 41) {
                s5 = peg$c73;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c74); }
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c75();
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parseExpression() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parseFactor();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 !== peg$FAILED) {
        s5 = peg$parseOperator();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          if (s6 !== peg$FAILED) {
            s7 = peg$parseFactor();
            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseOperator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseFactor();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c76(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseFactor() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$parseMathFunction();
    if (s0 === peg$FAILED) {
      s0 = peg$parseDice();
      if (s0 === peg$FAILED) {
        s0 = peg$parseFloatNumber();
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 40) {
            s1 = peg$c71;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c72); }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              s3 = peg$parseExpression();
              if (s3 !== peg$FAILED) {
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s5 = peg$c73;
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c74); }
                  }
                  if (s5 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c77(s1, s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$parseRollGroup();
          }
        }
      }
    }

    return s0;
  }

  function peg$parseMathFunction() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c78) {
      s1 = peg$c78;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c79); }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 4) === peg$c80) {
        s1 = peg$c80;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c81); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c82) {
          s1 = peg$c82;
          peg$currPos += 3;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c83); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c84) {
            s1 = peg$c84;
            peg$currPos += 3;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c85); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c86) {
              s1 = peg$c86;
              peg$currPos += 5;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c87); }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 3) === peg$c88) {
                s1 = peg$c88;
                peg$currPos += 3;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c89); }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 5) === peg$c90) {
                  s1 = peg$c90;
                  peg$currPos += 5;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c91); }
                }
                if (s1 === peg$FAILED) {
                  if (input.substr(peg$currPos, 4) === peg$c92) {
                    s1 = peg$c92;
                    peg$currPos += 4;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c93); }
                  }
                  if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 3) === peg$c94) {
                      s1 = peg$c94;
                      peg$currPos += 3;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c95); }
                    }
                    if (s1 === peg$FAILED) {
                      if (input.substr(peg$currPos, 4) === peg$c96) {
                        s1 = peg$c96;
                        peg$currPos += 4;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c97); }
                      }
                      if (s1 === peg$FAILED) {
                        if (input.substr(peg$currPos, 3) === peg$c98) {
                          s1 = peg$c98;
                          peg$currPos += 3;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c99); }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 40) {
        s2 = peg$c71;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c72); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseExpression();
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 41) {
                s6 = peg$c73;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c74); }
              }
              if (s6 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c100(s1, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c101) {
        s1 = peg$c101;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c102); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c33) {
          s1 = peg$c33;
          peg$currPos += 3;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c34); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c36) {
            s1 = peg$c36;
            peg$currPos += 3;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c37); }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c71;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c72); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseExpression();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 44) {
                  s6 = peg$c2;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c3); }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseExpression();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parse_();
                      if (s9 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                          s10 = peg$c73;
                          peg$currPos++;
                        } else {
                          s10 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c74); }
                        }
                        if (s10 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c103(s1, s4, s8);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parseFloatNumber() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 45) {
      s1 = peg$c104;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c105); }
    }
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseNumber();
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        if (peg$c106.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c107); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseNumber();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c108();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseIntegerNumber() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (peg$c109.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c110); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c111.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c112); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c111.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c112); }
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c113();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseNumber() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c111.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c112); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c111.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c112); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c113();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseOperator() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c114) {
      s1 = peg$c114;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c115); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c116();
    }
    s0 = s1;
    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 42) {
        s0 = peg$c117;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c118); }
      }
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 94) {
          s0 = peg$c119;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c120); }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 37) {
            s0 = peg$c121;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c122); }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 47) {
              s0 = peg$c123;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c124); }
            }
            if (s0 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 43) {
                s0 = peg$c125;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c126); }
              }
              if (s0 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 45) {
                  s0 = peg$c104;
                  peg$currPos++;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c105); }
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parse_() {
    var s0, s1;

    peg$silentFails++;
    s0 = [];
    if (peg$c128.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c129); }
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      if (peg$c128.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c129); }
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c127); }
    }

    return s0;
  }

  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

/**
 * The `Parser` takes a notation string and parses it into objects.
 *
 * It is used internally by the DiceRoll object when rolling notation, but can be used by itself if
 * necessary.
 *
 * @see {@link https://greenimp.github.io/rpg-dice-roller/guide/notation/}
 * @see {@link https://en.m.wikipedia.org/wiki/Dice_notation}
 */
class Parser {
  /**
   * Parses the given dice notation and returns a list of dice and modifiers found
   *
   * @param {string} notation The notation to parse
   *
   * @returns {Array}
   *
   * @throws {RequiredArgumentError} Notation is required
   * @throws {SyntaxError} The notation syntax is invalid
   * @throws {TypeError} Notation must be a string
   */
  static parse(notation) {
    if (!notation) {
      throw new RequiredArgumentError('notation');
    }

    if (typeof notation !== 'string') {
      throw new TypeError('Notation must be a string');
    }

    // parse the notation
    return peg$parse(notation);
  }
}

/**
 * Allowed formats for exporting dice data
 *
 * @readonly
 *
 * @type {Readonly<{BASE_64: number, JSON: number, OBJECT: number}>}
 *
 * @property {number} BASE_64
 * @property {number} JSON
 * @property {number} OBJECT
 */
const exportFormats = Object.freeze({
  BASE_64: 1,
  JSON: 0,
  OBJECT: 2,
});

/**
 * The notation
 *
 * @type {symbol}
 *
 * @private
 */
const notationSymbol = Symbol('notation');

/**
 * The maximum possible roll total
 *
 * @type {symbol}
 *
 * @private
 */
const maxTotalSymbol = Symbol('maxTotal');

/**
 * The minimum possible roll total
 *
 * @type {symbol}
 *
 * @private
 */
const minTotalSymbol = Symbol('minTotal');

/**
 * List of expressions to roll
 *
 * @type {symbol}
 *
 * @private
 */
const expressionsSymbol$1 = Symbol('expressions');

/**
 * Method for rolling dice
 *
 * @type {symbol}
 *
 * @private
 */
const rollMethodSymbol = Symbol('roll-method');

/**
 * List of rolls
 *
 * @type {symbol}
 *
 * @private
 */
const rollsSymbol$1 = Symbol('rolls');

/**
 * Set the rolls
 *
 * @private
 *
 * @type {symbol}
 */
const setRollsSymbol = Symbol('set-rolls');

/**
 * The roll total
 *
 * @type {symbol}
 *
 * @private
 */
const totalSymbol = Symbol('total');

/**
 * Calculate the total of all the results, fixed to a max of 2 digits after the decimal point.
 *
 * @private
 *
 * @param {ResultGroup} results
 *
 * @returns {Number} the results total
 */
const calculateTotal = (results) => toFixed(results.calculationValue, 2);

/**
 * A `DiceRoll` handles rolling of a single dice notation and storing it's result.
 *
 * @see {@link DiceRoller} if you need to keep a history of rolls
 */
class DiceRoll {
  /* eslint-disable max-len */
  /**
   * Create a DiceRoll, parse the notation and roll the dice.
   *
   * If `notation` is an object, it must contain a `notation` property that defines the notation.
   * It can also have an optional array of `RollResults`, in the `rolls` property.
   *
   * @example <caption>String notation</caption>
   * const roll = new DiceRoll('4d6');
   *
   * @example <caption>Object</caption>
   * const roll = new DiceRoll({
   *   notation: '4d6',
   *   rolls: ..., // RollResults object or array of roll results
   * });
   *
   * @param {string|{notation: string, rolls: ResultGroup|Array.<ResultGroup|RollResults|string|number>}} notation The notation to roll
   * @param {string} notation.notation If `notation is an object; the notation to roll
   * @param {ResultGroup|Array.<ResultGroup|RollResults|string|number>} [notation.rolls] If
   * `notation` is an object; the rolls to import
   *
   * @throws {NotationError} notation is invalid
   * @throws {RequiredArgumentError} notation is required
   * @throws {TypeError} Rolls must be a valid result object, or an array
   */
  constructor(notation) {
    if (!notation) {
      throw new RequiredArgumentError('notation');
    }

    // initialise the parsed dice array
    this[expressionsSymbol$1] = [];

    if ((notation instanceof Object) && !Array.isArray(notation)) {
      // validate object
      // @todo see if we can assert that the notation is valid
      if (!notation.notation) {
        // object doesn't contain a notation property
        throw new RequiredArgumentError('notation');
      } else if (typeof notation.notation !== 'string') {
        throw new NotationError(notation.notation);
      } else if (notation.rolls) {
        // we have rolls - store them
        this[setRollsSymbol](notation.rolls);
      }

      // store the notation
      this[notationSymbol] = notation.notation;

      // parse the notation
      this[expressionsSymbol$1] = Parser.parse(this.notation);

      if (!this.hasRolls()) {
        // no rolls - roll the dice
        this.roll();
      }
    } else if (typeof notation === 'string') {
      // @todo see if we can assert that the notation is valid
      // store the notation
      this[notationSymbol] = notation;

      // parse the notation
      this[expressionsSymbol$1] = Parser.parse(this.notation);

      // roll the dice
      this.roll();
    } else {
      throw new NotationError(notation);
    }
  }
  /* eslint-enable max-len */

  /**
   * The average possible total for the notation.
   *
   * @since 4.3.0
   *
   * @returns {number}
   */
  get averageTotal() {
    return (this.maxTotal + this.minTotal) / 2;
  }

  /**
   * The maximum possible total for the notation.
   *
   * @since 4.3.0
   *
   * @returns {number}
   */
  get maxTotal() {
    if (!this.hasExpressions()) {
      return 0;
    }

    // only calculate the total if it has not already been done
    if (!this[maxTotalSymbol]) {
      // roll the dice, forcing values to their maximum
      const rolls = this[rollMethodSymbol](engines.max);

      // calculate the total
      this[maxTotalSymbol] = calculateTotal(rolls);
    }

    // return the total
    return this[maxTotalSymbol];
  }

  /**
   * The minimum possible total for the notation.
   *
   * @since 4.3.0
   *
   * @returns {number}
   */
  get minTotal() {
    if (!this.hasExpressions()) {
      return 0;
    }

    // only calculate the total if it has not already been done
    if (!this[minTotalSymbol]) {
      // roll the dice, forcing values to their minimum
      const rolls = this[rollMethodSymbol](engines.min);

      // calculate the total
      this[minTotalSymbol] = calculateTotal(rolls);
    }

    // return the total
    return this[minTotalSymbol];
  }

  /**
   * The dice notation.
   *
   * @returns {string}
   */
  get notation() {
    return this[notationSymbol];
  }

  /**
   * String representation of the rolls
   *
   * @example
   * 2d20+1d6: [20,2]+[2] = 24
   *
   * @returns {string}
   */
  get output() {
    let output = `${this.notation}: `;

    if (this.hasRolls()) {
      output += `${this[rollsSymbol$1]} = ${this.total}`;
    } else {
      output += 'No dice rolled';
    }

    return output;
  }

  /**
   * The dice rolled for the notation
   *
   * @returns {Array.<ResultGroup|RollResults|string|number>}
   */
  get rolls() {
    return this[rollsSymbol$1] ? this[rollsSymbol$1].results : [];
  }

  /**
   * The roll total
   *
   * @returns {number}
   */
  get total() {
    // only calculate the total if it has not already been done
    if (!this[totalSymbol] && this.hasRolls()) {
      this[totalSymbol] = calculateTotal(this[rollsSymbol$1]);
    }

    // return the total
    return this[totalSymbol] || 0;
  }

  /**
   * Export the object in the given format.
   * If no format is specified, JSON is returned.
   *
   * @see {@link DiceRoll#toJSON}
   *
   * @param {exportFormats} [format=exportFormats.JSON] The format to export the data as
   *
   * @returns {string|null} The exported data, in the specified format
   *
   * @throws {TypeError} Invalid export format
   */
  export(format = exportFormats.JSON) {
    switch (format) {
      case exportFormats.BASE_64:
        // JSON encode then base64, else it exports the string representation of the roll output
        return btoa(this.export(exportFormats.JSON));
      case exportFormats.JSON:
        return JSON.stringify(this);
      case exportFormats.OBJECT:
        return JSON.parse(this.export(exportFormats.JSON));
      default:
        throw new TypeError(`Invalid export format "${format}"`);
    }
  }

  /**
   * Check whether the DiceRoll has expressions or not.
   *
   * @returns {boolean} `true` if the object has expressions, `false` otherwise
   */
  hasExpressions() {
    return this[expressionsSymbol$1] && (this[expressionsSymbol$1].length > 0);
  }

  /**
   * Check whether the object has rolled dice or not
   *
   * @returns {boolean} `true` if the object has rolls, `false` otherwise
   */
  hasRolls() {
    return this.hasExpressions() && (this.rolls.length > 0);
  }

  /**
   * Roll the dice for the stored notation.
   *
   * This is called in the constructor, so you'll only need this if you want to re-roll the
   * notation. However, it's usually better to create a new `DiceRoll` instance instead.
   *
   * @returns {RollResults[]} The results of the rolls
   */
  roll() {
    // reset the cached total
    this[totalSymbol] = 0;

    // save the rolls to the log
    this[rollsSymbol$1] = this[rollMethodSymbol]();

    // return the rolls;
    return this.rolls;
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{
   *  output: string,
   *  total: number,
   *  minTotal: number,
   *  maxTotal: number,
   *  notation: string,
   *  rolls: RollResults[],
   *  type: string
   * }}
   */
  toJSON() {
    const {
      averageTotal, maxTotal, minTotal, notation, output, rolls, total,
    } = this;

    return {
      averageTotal,
      maxTotal,
      minTotal,
      notation,
      output,
      rolls,
      total,
      type: 'dice-roll',
    };
  }

  /**
   * Return the String representation of the object.
   *
   * This is called automatically when casting the object to a string.
   *
   * @returns {string}
   *
   * @see {@link DiceRoll#output}
   */
  toString() {
    return this.output;
  }

  /**
   * Create a new `DiceRoll` instance with the given data.
   *
   * `data` can be an object of data, a JSON / base64 encoded string of such data.
   *
   * The object must contain a `notation` property that defines the notation and, optionally, an
   * array of RollResults, in the `rolls` property.
   *
   * @example <caption>Object</caption>
   * DiceRoll.import({
   *   notation: '4d6',
   *   rolls: ..., // ResultGroup object or array of roll results
   * });
   *
   * @example <caption>JSON</caption>
   * DiceRoll.import('{"notation":"4d6","rolls":[...]}');
   *
   * @example <caption>Base64</caption>
   * DiceRoll.import('eyJub3RhdGlvbiI6IjRkNiIsInJvbGxzIjpbXX0=');
   *
   * @param {{notation: string, rolls: RollResults[]}|string} data The data to import
   * @param {string} data.notation If `notation` is an object; the notation to import
   * @param {RollResults[]} [data.rolls] If `notation` is an object; the rolls to import
   *
   * @returns {DiceRoll} The new `DiceRoll` instance
   *
   * @throws {DataFormatError} data format is invalid
   */
  static import(data) {
    if (!data) {
      throw new RequiredArgumentError('data');
    } else if (isJson(data)) {
      // data is JSON format - parse and import
      return DiceRoll.import(JSON.parse(data));
    } else if (isBase64(data)) {
      // data is base64 encoded - decode and import
      return DiceRoll.import(atob(data));
    } else if (typeof data === 'object') {
      // if data is a `DiceRoll` return it, otherwise build it
      return new DiceRoll(data);
    } else {
      throw new DataFormatError(data);
    }
  }

  /**
   * Roll the dice and return the result.
   *
   * If the engine is passed, it will be used for the number generation for **this roll only**.
   * The engine will be reset after use.
   *
   * @private
   *
   * @param {{next(): number}} [engine] The RNG engine to use for die rolls
   *
   * @returns {ResultGroup} The result of the rolls
   *
   * @throws {TypeError} engine must have function `next()`
   */
  [rollMethodSymbol](engine) {
    let oEngine;
    if (engine) {
      // use the selected engine
      oEngine = generator.engine;
      generator.engine = engine;
    }

    // roll the dice
    const results = new ResultGroup(this[expressionsSymbol$1]
      .map((expression) => {
        if ((expression instanceof StandardDice) || (expression instanceof RollGroup)) {
          // roll the object and return the value
          return expression.roll();
        }

        return expression;
      })
      // filter out empty values (e.g. whitespace)
      .filter((value) => !!value || (value === 0)));

    if (engine) {
      // reset the engine
      generator.engine = oEngine;
    }

    return results;
  }

  /* eslint-disable max-len */
  /**
   * Set the rolls.
   *
   * @private
   *
   * @param {ResultGroup|Array.<ResultGroup|RollResults|string|number|{}|Array.<RollResult|number>>} rolls
   *
   * @throws {TypeError} Rolls must be a valid result object, or an array
   */
  [setRollsSymbol](rolls) {
    if (rolls instanceof ResultGroup) {
      this[rollsSymbol$1] = rolls;
    } else if (rolls instanceof RollResults) {
      this[rollsSymbol$1] = new ResultGroup([rolls]);
    } else if (Array.isArray(rolls)) {
      this[rollsSymbol$1] = new ResultGroup(rolls.map((roll) => {
        if ((roll instanceof ResultGroup) || (roll instanceof RollResults)) {
          // already a RollResults object
          return roll;
        }

        // @todo should this be a ResultGroup, or a RollResults?
        if (Array.isArray(roll)) {
          // array of values
          return new RollResults(roll);
        }

        if (typeof roll === 'object') {
          // a result group
          if (Array.isArray(roll.results)) {
            return new ResultGroup(
              roll.results,
              roll.modifiers || [],
              roll.isRollGroup || false,
              (typeof roll.useInTotal === 'boolean') ? roll.useInTotal : true,
            );
          }
          // roll results
          if (Array.isArray(roll.rolls)) {
            return new RollResults(roll.rolls);
          }
        }

        return roll;
      }));
    } else {
      throw new TypeError('Rolls must be a valid result object, or an array');
    }
  }
  /* eslint-enable max-len */
}

/**
 * history of log rolls
 *
 * @type {symbol}
 *
 * @private
 */
const logSymbol = Symbol('log');

/**
 * A `DiceRoller` handles dice rolling functionality, keeps a history of rolls and can output logs
 * etc.
 *
 * @see {@link DiceRoll} if you don't need to keep a log history of rolls
 */
class DiceRoller {
  /**
   * Create a DiceRoller.
   *
   * The optional `data` property should be either an array of `DiceRoll` objects, or an object with
   * a `log` property that contains the `DiceRoll` objects.
   *
   * @param {{log: DiceRoll[]}|DiceRoll[]} [data] The data to import
   * @param {DiceRoll[]} [data.log] If `data` is an object, it must contain an array of `DiceRoll`s
   *
   * @throws {TypeError} if data is an object, it must have a `log[]` property
   */
  constructor(data) {
    this[logSymbol] = [];

    if (data) {
      this.import(data);
    }
  }

  /**
   * The list of roll logs.
   *
   * @returns {DiceRoll[]}
   */
  get log() {
    return this[logSymbol] || [];
  }

  /**
   * String representation of the rolls in the log
   *
   * @example
   * 2d20+1d6: [20,2]+[2] = 24; 1d8: [6] = 6
   *
   * @returns {string}
   */
  get output() {
    return this.log.join('; ');
  }

  /**
   * The sum of all the rolls in the log
   *
   * @see {@link DiceRoller#log}
   *
   * @returns {number}
   */
  get total() {
    return this.log.reduce((prev, current) => prev + current.total, 0);
  }

  /**
   * Clear the roll history log.
   *
   * @see {@link DiceRoller#log}
   */
  clearLog() {
    this[logSymbol].length = 0;
  }

  /**
   * Export the object in the given format.
   * If no format is specified, JSON is returned.
   *
   * @see {@link DiceRoller#toJSON}
   *
   * @param {exportFormats} [format=exportFormats#JSON] The format to export the data as
   *
   * @returns {string|null} The exported data, in the specified format
   *
   * @throws {TypeError} Invalid export format
   */
  export(format = exportFormats.JSON) {
    switch (format) {
      case exportFormats.BASE_64:
        // JSON encode, then base64
        return btoa(this.export(exportFormats.JSON));
      case exportFormats.JSON:
        return JSON.stringify(this);
      case exportFormats.OBJECT:
        return JSON.parse(this.export(exportFormats.JSON));
      default:
        throw new TypeError(`Invalid export format "${format}"`);
    }
  }

  /**
   * Add the data to the existing [roll log]{@link DiceRoller#log}.
   *
   * `data` can be an array of `DiceRoll` objects, an object with a `log` property that contains
   * `DiceRoll` objects, or a JSON / base64 encoded representation of either.
   *
   * @see {@link DiceRoller#log}
   *
   * @param {string|{log: DiceRoll[]}|DiceRoll[]} data The data to import
   * @param {DiceRoll[]} [data.log] If `data` is an object, it must contain an array of `DiceRoll`s
   *
   * @returns {DiceRoll[]} The roll log
   *
   * @throws {DataFormatError} data format invalid
   * @throws {RequiredArgumentError} data is required
   * @throws {TypeError} log must be an array
   */
  import(data) {
    if (!data) {
      throw new RequiredArgumentError('data');
    } else if (isJson(data)) {
      // data is JSON - parse and import
      return this.import(JSON.parse(data));
    } else if (isBase64(data)) {
      // data is base64 encoded - decode an import
      return this.import(atob(data));
    } else if (typeof data === 'object') {
      let log = data.log || null;

      if (!data.log && Array.isArray(data) && data.length) {
        // if `log` is not defined, but data is an array, use it as the list of logs
        log = data;
      }

      if (log && Array.isArray(log)) {
        // loop through each log entry and import it
        log.forEach((roll) => {
          this[logSymbol].push(DiceRoll.import(roll));
        });
      } else if (log) {
        throw new TypeError('log must be an array');
      }

      return this.log;
    } else {
      throw new DataFormatError(data);
    }
  }

  /**
   * Roll the given dice notation(s) and return the corresponding `DiceRoll` objects.
   *
   * You can roll a single notation, or multiple at once.
   *
   * @example <caption>Single notation</caption>
   * diceRoller.roll('2d6');
   *
   * @example <caption>Multiple notations</caption>
   * roll('2d6', '4d10', 'd8+4d6');
   *
   * @param {...string} notations The notations to roll
   *
   * @returns {DiceRoll|DiceRoll[]} If a single notation is passed, a single `DiceRoll` is returned,
   * otherwise an array of `DiceRoll` objects is returned
   *
   * @throws {NotationError} notation is invalid
   * @throws {RequiredArgumentError} notation is required
   */
  roll(...notations) {
    const filteredNotations = notations.filter(Boolean);

    if (filteredNotations.length === 0) {
      throw new RequiredArgumentError('notations');
    }

    const rolls = filteredNotations.map((notation) => {
      const diceRoll = new DiceRoll(notation);

      // add the roll log to our global log
      this[logSymbol].push(diceRoll);

      // return the current DiceRoll
      return diceRoll;
    });

    return (rolls.length > 1) ? rolls : rolls[0];
  }

  /**
   * Return an object for JSON serialising.
   *
   * This is called automatically when JSON encoding the object.
   *
   * @returns {{output: string, total: number, log: DiceRoll[], type: string}}
   */
  toJSON() {
    const { log, output, total } = this;

    return {
      log,
      output,
      total,
      type: 'dice-roller',
    };
  }

  /**
   * Return the String representation of the object.
   *
   * This is called automatically when casting the object to a string.
   *
   * @returns {string}
   *
   * @see {@link DiceRoller#output}
   */
  toString() {
    return this.output;
  }

  /**
   * Create a new `DiceRoller` instance with the given data.
   *
   * `data` can be an array of `DiceRoll` objects, an object with a `log` property that contains the
   * `DiceRoll` objects, or a JSON / base64 encoded representation of either.
   *
   * @see instance method {@link DiceRoller#import}
   *
   * @param {string|{log: DiceRoll[]}|DiceRoll[]} data The data to import
   * @param {DiceRoll[]} [data.log] If `data` is an object, it must contain an array of `DiceRoll`s
   *
   * @returns {DiceRoller} The new `DiceRoller` instance
   *
   * @throws {DataFormatError} data format invalid
   * @throws {RequiredArgumentError} data is required
   * @throws {TypeError} log must be an array
   */
  static import(data) {
    // create a new DiceRoller object
    const diceRoller = new DiceRoller();

    // import the data
    diceRoller.import(data);

    // return the DiceRoller
    return diceRoller;
  }
}

export { ComparePoint, index$2 as Dice, DiceRoll, DiceRoller, index as Exceptions, index$3 as Modifiers, NumberGenerator$1 as NumberGenerator, Parser, index$4 as Results, RollGroup, exportFormats };

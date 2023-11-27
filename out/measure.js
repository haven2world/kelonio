"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMeasurement = exports.measure = exports.defaultMeasureOptions = exports.Measurement = exports.PerformanceError = void 0;
var browser_hrtime_1 = __importDefault(require("browser-hrtime"));
var mathjs = __importStar(require("mathjs"));
/**
 * Base error for benchmark failures, such as a function taking too long
 * to execute.
 */
var PerformanceError = /** @class */ (function (_super) {
    __extends(PerformanceError, _super);
    function PerformanceError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return PerformanceError;
}(Error));
exports.PerformanceError = PerformanceError;
/**
 * Performance measurement result from running a benchmark.
 */
var Measurement = /** @class */ (function () {
    /**
     *
     * @param durations - Durations measured, in milliseconds.
     *     The list must not be empty.
     * @param totalDuration - Duration of the entire measurement, in milliseconds.
     */
    function Measurement(durations, totalDuration) {
        this.durations = durations;
        /**
         * Optional name of the measurement, for use in reporting.
         */
        this.description = [];
        if (durations.length === 0) {
            throw new Error("The list of durations must not be empty");
        }
        this.totalDuration = totalDuration !== null && totalDuration !== void 0 ? totalDuration : mathjs.sum(durations);
    }
    Object.defineProperty(Measurement.prototype, "mean", {
        /**
         * Mean of all durations measured, in milliseconds.
         */
        get: function () {
            return mathjs.mean(this.durations);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Measurement.prototype, "min", {
        /**
         * Minimum duration measured, in milliseconds.
         */
        get: function () {
            return mathjs.min(this.durations);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Measurement.prototype, "max", {
        /**
         * Maximum duration measured, in milliseconds.
         */
        get: function () {
            return mathjs.max(this.durations);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Measurement.prototype, "standardDeviation", {
        /**
         * Standard deviation of all durations measured, in milliseconds.
         */
        get: function () {
            return mathjs.std.apply(mathjs, this.durations);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Measurement.prototype, "marginOfError", {
        /**
         * Margin of error at 95% confidence level, in milliseconds.
         */
        get: function () {
            return mathjs.sqrt(mathjs.variance.apply(mathjs, this.durations) / this.durations.length) * 1.96;
        },
        enumerable: false,
        configurable: true
    });
    return Measurement;
}());
exports.Measurement = Measurement;
/**
 * Default options for Benchmark.measure().
 */
exports.defaultMeasureOptions = {
    iterations: 100,
    serial: true,
    verify: true,
};
/**
 * Measure the time it takes for a function to execute.
 *
 * @param fn - Function to measure.
 * @param options - Options to customize the measurement.
 */
function measure(fn, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var mergedOptions, durations, calls, i, measureStart, _i, calls_1, call, _a, measureSec, measureNano, totalDuration, measurement;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    mergedOptions = __assign(__assign({}, exports.defaultMeasureOptions), options);
                    durations = [];
                    calls = [];
                    for (i = 0; i < mergedOptions.iterations; i++) {
                        calls.push(function () { return __awaiter(_this, void 0, void 0, function () {
                            var startTime, _a, durationSec, durationNano;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(mergedOptions.beforeEach !== undefined)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, maybePromise(mergedOptions.beforeEach)];
                                    case 1:
                                        _b.sent();
                                        _b.label = 2;
                                    case 2:
                                        startTime = (0, browser_hrtime_1.default)();
                                        return [4 /*yield*/, maybePromise(fn)];
                                    case 3:
                                        _b.sent();
                                        _a = (0, browser_hrtime_1.default)(startTime), durationSec = _a[0], durationNano = _a[1];
                                        durations.push(durationSec * 1e3 + durationNano / 1e6);
                                        if (!(mergedOptions.afterEach !== undefined)) return [3 /*break*/, 5];
                                        return [4 /*yield*/, maybePromise(mergedOptions.afterEach)];
                                    case 4:
                                        _b.sent();
                                        _b.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    measureStart = (0, browser_hrtime_1.default)();
                    if (!mergedOptions.serial) return [3 /*break*/, 5];
                    _i = 0, calls_1 = calls;
                    _b.label = 1;
                case 1:
                    if (!(_i < calls_1.length)) return [3 /*break*/, 4];
                    call = calls_1[_i];
                    return [4 /*yield*/, call()];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, Promise.all(calls.map(function (x) { return x(); }))];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    _a = (0, browser_hrtime_1.default)(measureStart), measureSec = _a[0], measureNano = _a[1];
                    totalDuration = measureSec * 1e3 + measureNano / 1e6;
                    measurement = new Measurement(durations, totalDuration);
                    verifyMeasurement(measurement, mergedOptions);
                    return [2 /*return*/, measurement];
            }
        });
    });
}
exports.measure = measure;
function verifyMeasurement(measurement, options) {
    if (!options.verify) {
        return;
    }
    if (options.meanUnder !== undefined) {
        if (measurement.mean > options.meanUnder) {
            throw new PerformanceError("Mean time of ".concat(measurement.mean, " ms exceeded threshold of ").concat(options.meanUnder, " ms"));
        }
    }
    if (options.minUnder !== undefined) {
        if (measurement.min > options.minUnder) {
            throw new PerformanceError("Minimum time of ".concat(measurement.min, " ms exceeded threshold of ").concat(options.minUnder, " ms"));
        }
    }
    if (options.maxUnder !== undefined) {
        if (measurement.max > options.maxUnder) {
            throw new PerformanceError("Maximum time of ".concat(measurement.max, " ms exceeded threshold of ").concat(options.maxUnder, " ms"));
        }
    }
    if (options.marginOfErrorUnder !== undefined) {
        if (measurement.marginOfError > options.marginOfErrorUnder) {
            throw new PerformanceError("Margin of error time of ".concat(measurement.marginOfError, " ms exceeded threshold of ").concat(options.marginOfErrorUnder, " ms"));
        }
    }
    if (options.standardDeviationUnder !== undefined) {
        if (measurement.standardDeviation > options.standardDeviationUnder) {
            throw new PerformanceError("Standard deviation time of ".concat(measurement.standardDeviation, " ms exceeded threshold of ").concat(options.standardDeviationUnder, " ms"));
        }
    }
}
exports.verifyMeasurement = verifyMeasurement;
function maybePromise(fn) {
    return __awaiter(this, void 0, void 0, function () {
        var ret;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ret = fn();
                    if (!(ret instanceof Promise)) return [3 /*break*/, 2];
                    return [4 /*yield*/, ret];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=measure.js.map
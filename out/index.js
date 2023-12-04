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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.benchmark = exports.Benchmark = exports.Criteria = exports.measure = exports.Measurement = exports.PerformanceError = exports.BenchmarkEventEmitter = void 0;
var browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
var events_1 = require("events");
var mathjs = __importStar(require("mathjs"));
var utils_1 = require("./reporters/utils");
var BenchmarkEventEmitter = /** @class */ (function (_super) {
    __extends(BenchmarkEventEmitter, _super);
    function BenchmarkEventEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BenchmarkEventEmitter;
}(events_1.EventEmitter));
exports.BenchmarkEventEmitter = BenchmarkEventEmitter;
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
var defaultMeasureOptions = {
    iterations: 100,
    serial: true,
    verify: true,
};
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
function round(value, places) {
    if (places === void 0) { places = 5; }
    return mathjs.round(value, places);
}
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
                    mergedOptions = __assign(__assign({}, defaultMeasureOptions), options);
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
                                        startTime = (0, browser_process_hrtime_1.default)();
                                        return [4 /*yield*/, maybePromise(fn)];
                                    case 3:
                                        _b.sent();
                                        _a = (0, browser_process_hrtime_1.default)(startTime), durationSec = _a[0], durationNano = _a[1];
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
                    measureStart = (0, browser_process_hrtime_1.default)();
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
                    _a = (0, browser_process_hrtime_1.default)(measureStart), measureSec = _a[0], measureNano = _a[1];
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
/**
 * Used for filtering benchmark data.
 */
var Criteria;
(function (Criteria) {
    Criteria[Criteria["Fastest"] = 0] = "Fastest";
    Criteria[Criteria["Slowest"] = 1] = "Slowest";
})(Criteria = exports.Criteria || (exports.Criteria = {}));
/**
 * Aggregator for performance results of various tests.
 */
var Benchmark = /** @class */ (function () {
    function Benchmark() {
        /**
         * Raw data collected from [[Benchmark.record]].
         */
        this.data = {};
        /**
         * Event emitter.
         *
         * * `record` is emitted after [[Benchmark.record]] finishes all iterations.
         *
         * Refer to [[BenchmarkEventEmitter.on]] for the event callback signatures.
         */
        this.events = new BenchmarkEventEmitter();
    }
    Benchmark.prototype.record = function (a, b, c) {
        return __awaiter(this, void 0, void 0, function () {
            var description, descriptionSpecified, fn, options, mergedOptions, measurement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        descriptionSpecified = false;
                        if (typeof a === "function") {
                            description = [];
                            fn = a;
                            options = b || {};
                        }
                        else {
                            description = a;
                            descriptionSpecified = true;
                            fn = b;
                            options = c || {};
                        }
                        mergedOptions = __assign(__assign({}, defaultMeasureOptions), options);
                        if ((descriptionSpecified && description.length === 0)) {
                            throw new Error("The description must not be empty");
                        }
                        if (typeof description === "string") {
                            description = [description];
                        }
                        return [4 /*yield*/, measure(fn, __assign(__assign({}, mergedOptions), { verify: false }))];
                    case 1:
                        measurement = _a.sent();
                        if (description.length > 0) {
                            this.incorporate(description, measurement);
                        }
                        this.events.emit("record", description, measurement);
                        verifyMeasurement(measurement, __assign(__assign({}, mergedOptions), { verify: true }));
                        return [2 /*return*/, measurement];
                }
            });
        });
    };
    /**
     * Add a measurement directly to [[Benchmark.data]].
     *
     * @param description - Name of what is being tested.
     *     Must not be empty.
     * @param measurement - Measurement to add to the benchmark data.
     */
    Benchmark.prototype.incorporate = function (description, measurement) {
        if ((description.length === 0)) {
            throw new Error("The description must not be empty");
        }
        this.addBenchmarkDurations(this.data, description, measurement.durations, measurement.totalDuration);
    };
    Benchmark.prototype.addBenchmarkDurations = function (data, categories, durations, totalDuration) {
        var _a;
        if (!(categories[0] in data)) {
            data[categories[0]] = { durations: [], children: {}, totalDuration: 0 };
        }
        if (categories.length === 1) {
            data[categories[0]].durations = data[categories[0]].durations.concat(durations);
            data[categories[0]].totalDuration = ((_a = data[categories[0]].totalDuration) !== null && _a !== void 0 ? _a : 0) + totalDuration;
        }
        else {
            this.addBenchmarkDurations(data[categories[0]].children, categories.slice(1), durations, totalDuration);
        }
    };
    Benchmark.prototype.reportLevel = function (level, depth) {
        var lines = [];
        for (var _i = 0, _a = Object.entries(level); _i < _a.length; _i++) {
            var _b = _a[_i], description = _b[0], info = _b[1];
            var showMeasurement = info.durations.length > 0;
            var showChildren = Object.keys(info.children).length > 0;
            lines.push("".concat("  ".repeat(depth)).concat(description, ":"));
            if (showMeasurement) {
                var measurement = new Measurement(info.durations, info.totalDuration);
                var mean = round(measurement.mean);
                var moe = round(measurement.marginOfError);
                var iterations = measurement.durations.length;
                var totalDuration = round(measurement.totalDuration);
                lines.push("".concat("  ".repeat(depth + 1)).concat(mean, " ms (+/- ").concat(moe, " ms) from ").concat(iterations, " iterations (").concat(totalDuration, " ms total)"));
            }
            if (showMeasurement && showChildren) {
                lines.push("");
            }
            if (showChildren) {
                lines = lines.concat(this.reportLevel(info.children, depth + 1));
            }
        }
        return lines;
    };
    /**
     * Create a report of all the benchmark results.
     */
    Benchmark.prototype.report = function () {
        var lines = this.reportLevel(this.data, 0);
        if (lines.length === 0) {
            return "";
        }
        else {
            return __spreadArray(__spreadArray([utils_1.HEADER], lines, true), [utils_1.FOOTER], false).join("\n");
        }
    };
    Benchmark.prototype.getMeasurementsAtLevel = function (level, descriptions) {
        var measurements = [];
        for (var _i = 0, _a = Object.entries(level); _i < _a.length; _i++) {
            var _b = _a[_i], description = _b[0], info = _b[1];
            var localDescriptions = __spreadArray(__spreadArray([], descriptions, true), [description], false);
            if (info.durations.length > 0) {
                var measurement = new Measurement(info.durations, info.totalDuration);
                measurement.description = localDescriptions;
                measurements.push(measurement);
            }
            measurements = measurements.concat(this.getMeasurementsAtLevel(info.children, localDescriptions));
        }
        return measurements;
    };
    Object.defineProperty(Benchmark.prototype, "measurements", {
        /**
         * Get a list of [[Measurement]] based on [[Benchmark.data]].
         */
        get: function () {
            return this.getMeasurementsAtLevel(this.data, []);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Find the measurement that meets some criteria.
     * In the case of a tie, the first one found wins.
     *
     * @param criteria - Criteria by which to select a measurement.
     * @param value - Callback to select a specific field of each measurement for comparison.
     *     The default uses the mean plus the margin of error.
     * @returns the matching measurement, or null if no measurements have been taken
     */
    Benchmark.prototype.find = function (criteria, value) {
        if (value === void 0) { value = function (m) { return m.mean + m.marginOfError; }; }
        var candidate = null;
        for (var _i = 0, _a = this.measurements; _i < _a.length; _i++) {
            var measurement = _a[_i];
            if (candidate === null) {
                candidate = measurement;
            }
            else if (criteria === Criteria.Fastest && value(measurement) < value(candidate)) {
                candidate = measurement;
            }
            else if (criteria === Criteria.Slowest && value(measurement) > value(candidate)) {
                candidate = measurement;
            }
        }
        return candidate;
    };
    return Benchmark;
}());
exports.Benchmark = Benchmark;
/**
 * Default [[Benchmark]] instance for shared usage throughout your tests.
 * Each instance stores its own state from measurement results, so if you
 * want to avoid global state, you can create additional instances as well.
 */
exports.benchmark = new Benchmark();
//# sourceMappingURL=index.js.map

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Benchmark = exports.Criteria = exports.BenchmarkEventEmitter = void 0;
var eventemitter3_1 = require("eventemitter3");
var etc_1 = require("./etc");
var measure_1 = require("./measure");
var mathjs = __importStar(require("mathjs"));
var BenchmarkEventEmitter = /** @class */ (function (_super) {
    __extends(BenchmarkEventEmitter, _super);
    function BenchmarkEventEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BenchmarkEventEmitter;
}(eventemitter3_1.EventEmitter));
exports.BenchmarkEventEmitter = BenchmarkEventEmitter;
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
                        mergedOptions = __assign(__assign({}, measure_1.defaultMeasureOptions), options);
                        if (descriptionSpecified && description.length === 0) {
                            throw new Error("The description must not be empty");
                        }
                        if (typeof description === "string") {
                            description = [description];
                        }
                        return [4 /*yield*/, (0, measure_1.measure)(fn, __assign(__assign({}, mergedOptions), { verify: false }))];
                    case 1:
                        measurement = _a.sent();
                        if (description.length > 0) {
                            this.incorporate(description, measurement);
                        }
                        this.events.emit("record", description, measurement);
                        (0, measure_1.verifyMeasurement)(measurement, __assign(__assign({}, mergedOptions), { verify: true }));
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
        if (description.length === 0) {
            throw new Error("The description must not be empty");
        }
        this.addBenchmarkDurations(this.data, description, measurement.durations, measurement.totalDuration);
    };
    Benchmark.prototype.addBenchmarkDurations = function (data, categories, durations, totalDuration) {
        var _a;
        if (!(categories[0] in data)) {
            data[categories[0]] = {
                durations: [],
                children: {},
                totalDuration: 0,
            };
        }
        if (categories.length === 1) {
            data[categories[0]].durations =
                data[categories[0]].durations.concat(durations);
            data[categories[0]].totalDuration =
                ((_a = data[categories[0]].totalDuration) !== null && _a !== void 0 ? _a : 0) + totalDuration;
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
                var measurement = new measure_1.Measurement(info.durations, info.totalDuration);
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
            return __spreadArray(__spreadArray([etc_1.HEADER], lines, true), [etc_1.FOOTER], false).join("\n");
        }
    };
    Benchmark.prototype.getMeasurementsAtLevel = function (level, descriptions) {
        var measurements = [];
        for (var _i = 0, _a = Object.entries(level); _i < _a.length; _i++) {
            var _b = _a[_i], description = _b[0], info = _b[1];
            var localDescriptions = __spreadArray(__spreadArray([], descriptions, true), [description], false);
            if (info.durations.length > 0) {
                var measurement = new measure_1.Measurement(info.durations, info.totalDuration);
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
            else if (criteria === Criteria.Fastest &&
                value(measurement) < value(candidate)) {
                candidate = measurement;
            }
            else if (criteria === Criteria.Slowest &&
                value(measurement) > value(candidate)) {
                candidate = measurement;
            }
        }
        return candidate;
    };
    return Benchmark;
}());
exports.Benchmark = Benchmark;
function round(value, places) {
    if (places === void 0) { places = 5; }
    return mathjs.round(value, places);
}
//# sourceMappingURL=Benchmark.js.map
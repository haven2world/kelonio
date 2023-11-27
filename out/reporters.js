"use strict";
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
exports.MochaReporter = exports.KarmaReporter = exports.JestReporter = void 0;
var _1 = require(".");
var etc_1 = require("./etc");
var MOCHA_EVENT_TEST_BEGIN = "test";
var MOCHA_EVENT_RUN_END = "end";
function handleExtraReports(lookups, benchmark, print) {
    var _a, _b;
    for (var _i = 0, _c = (lookups !== null && lookups !== void 0 ? lookups : []); _i < _c.length; _i++) {
        var lookup = _c[_i];
        var extension = (_a = require(lookup.module)) === null || _a === void 0 ? void 0 : _a[lookup.extension];
        var report = (_b = extension === null || extension === void 0 ? void 0 : extension.extraReport) === null || _b === void 0 ? void 0 : _b.call(extension, benchmark);
        if (report) {
            print(report);
        }
    }
}
var JestReporter = /** @class */ (function () {
    function JestReporter(testData, options) {
        this.options = { keepStateAtStart: false, keepStateAtEnd: false, printReportAtEnd: true };
        if (options) {
            this.options = __assign(__assign({}, this.options), options);
        }
    }
    JestReporter.initializeKelonio = function () {
        var state = new etc_1.BenchmarkFileState();
        _1.benchmark.events.on("record", function (description, measurement) {
            var b = new _1.Benchmark();
            if (state.exists()) {
                b.data = state.read();
            }
            b.incorporate(description, measurement);
            state.write(b.data);
        });
    };
    JestReporter.prototype.onRunStart = function () {
        var state = new etc_1.BenchmarkFileState();
        if (this.options.keepStateAtStart) {
            state.append({});
        }
        else {
            state.write({});
        }
    };
    JestReporter.prototype.onRunComplete = function () {
        var state = new etc_1.BenchmarkFileState();
        if (!state.exists()) {
            throw new Error("The Kelonio reporter for Jest requires benchmark serialization."
                + " Make sure to call `JestReporter.initializeKelonio()`.");
        }
        var b = new _1.Benchmark();
        b.data = state.read();
        if (this.options.printReportAtEnd) {
            console.log("\n".concat(b.report()));
            handleExtraReports(this.options.extensions, b, console.log);
        }
        if (!this.options.keepStateAtEnd) {
            state.delete();
        }
    };
    return JestReporter;
}());
exports.JestReporter = JestReporter;
var KarmaReporter = /** @class */ (function () {
    function KarmaReporter(baseReporterDecorator, config, logger, helper, formatError) {
        var _this = this;
        baseReporterDecorator(this);
        var activeConfig = __assign({ inferBrowsers: true, printReportAtEnd: true }, config.kelonioReporter);
        var b = new _1.Benchmark();
        this.onBrowserLog = function (browser, log, type) {
            if (type === "kelonio") {
                var parsed = JSON.parse(log.slice(1, -1));
                var browserDescription = activeConfig.inferBrowsers ? [browser] : [];
                b.incorporate(__spreadArray(__spreadArray([], browserDescription, true), parsed.description, true), new _1.Measurement(parsed.durations, parsed.totalDuration));
            }
        };
        this.onRunComplete = function () {
            if (activeConfig.printReportAtEnd) {
                _this.write("".concat(b.report(), "\n"));
                handleExtraReports(activeConfig.extensions, b, function (msg) { return _this.write("".concat(msg, "\n")); });
            }
        };
    }
    KarmaReporter.initializeKelonio = function () {
        _1.benchmark.events.on("record", function (description, measurement) {
            window.__karma__.log("kelonio", [JSON.stringify({ description: description, durations: measurement.durations, totalDuration: measurement.totalDuration })]);
        });
    };
    return KarmaReporter;
}());
exports.KarmaReporter = KarmaReporter;
var MochaReporter = /** @class */ (function () {
    function MochaReporter(runner, options) {
        var _a, _b, _c;
        var b = new _1.Benchmark();
        var baseDescription = [];
        var inferDescriptions = (_a = options.reporterOptions.inferDescriptions) !== null && _a !== void 0 ? _a : true;
        var printReportAtEnd = (_b = options.reporterOptions.printReportAtEnd) !== null && _b !== void 0 ? _b : true;
        var extensions = (_c = options.reporterOptions.extensions) !== null && _c !== void 0 ? _c : [];
        _1.benchmark.events.on("record", function (description, measurement) {
            b.incorporate(baseDescription.concat(description), measurement);
        });
        if (inferDescriptions) {
            runner.on(MOCHA_EVENT_TEST_BEGIN, function (test) {
                baseDescription = test.titlePath();
            });
        }
        runner.once(MOCHA_EVENT_RUN_END, function () {
            if (printReportAtEnd) {
                console.log("\n".concat(b.report()));
                handleExtraReports(extensions, b, console.log);
            }
        });
    }
    return MochaReporter;
}());
exports.MochaReporter = MochaReporter;
//# sourceMappingURL=reporters.js.map
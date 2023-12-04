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
exports.KarmaReporter = void 0;
var __1 = require("..");
var utils_1 = require("./utils");
var KarmaReporter = /** @class */ (function () {
    function KarmaReporter(baseReporterDecorator, config, logger, helper, formatError) {
        var _this = this;
        baseReporterDecorator(this);
        var activeConfig = __assign({ inferBrowsers: true, printReportAtEnd: true }, config.kelonioReporter);
        var b = new __1.Benchmark();
        this.onBrowserLog = function (browser, log, type) {
            if (type === "kelonio") {
                var parsed = JSON.parse(log.slice(1, -1));
                var browserDescription = activeConfig.inferBrowsers
                    ? [browser]
                    : [];
                b.incorporate(__spreadArray(__spreadArray([], browserDescription, true), parsed.description, true), new __1.Measurement(parsed.durations, parsed.totalDuration));
            }
        };
        this.onRunComplete = function () {
            if (activeConfig.printReportAtEnd) {
                _this.write("".concat(b.report(), "\n"));
                (0, utils_1.handleExtraReports)(activeConfig.extensions, b, function (msg) {
                    return _this.write("".concat(msg, "\n"));
                });
            }
        };
    }
    KarmaReporter.initializeKelonio = function () {
        __1.benchmark.events.on("record", function (description, measurement) {
            window.__karma__.log("kelonio", [
                JSON.stringify({
                    description: description,
                    durations: measurement.durations,
                    totalDuration: measurement.totalDuration,
                }),
            ]);
        });
    };
    return KarmaReporter;
}());
exports.KarmaReporter = KarmaReporter;
//# sourceMappingURL=karma.js.map

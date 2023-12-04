"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MochaReporter = void 0;
var __1 = require("..");
var utils_1 = require("./utils");
var MOCHA_EVENT_TEST_BEGIN = "test";
var MOCHA_EVENT_RUN_END = "end";
var MochaReporter = /** @class */ (function () {
    function MochaReporter(runner, options) {
        var _a, _b, _c;
        var b = new __1.Benchmark();
        var baseDescription = [];
        var inferDescriptions = (_a = options.reporterOptions.inferDescriptions) !== null && _a !== void 0 ? _a : true;
        var printReportAtEnd = (_b = options.reporterOptions.printReportAtEnd) !== null && _b !== void 0 ? _b : true;
        var extensions = (_c = options.reporterOptions.extensions) !== null && _c !== void 0 ? _c : [];
        __1.benchmark.events.on("record", function (description, measurement) {
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
                (0, utils_1.handleExtraReports)(extensions, b, console.log);
            }
        });
    }
    return MochaReporter;
}());
exports.MochaReporter = MochaReporter;
//# sourceMappingURL=mocha.js.map

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JestReporter = exports.BenchmarkFileState = exports.STATE_FILE = void 0;
var index_1 = require("../index");
var utils_1 = require("./utils");
exports.STATE_FILE = ".kelonio.state.json";
var fs;
var canUseFs = true;
try {
    fs = require("fs");
}
catch (_a) {
    canUseFs = false;
}
var BenchmarkFileState = /** @class */ (function () {
    function BenchmarkFileState() {
        if (!canUseFs) {
            throw new Error("Unable to access file system");
        }
    }
    BenchmarkFileState.prototype.exists = function () {
        return fs.existsSync(exports.STATE_FILE);
    };
    BenchmarkFileState.prototype.read = function () {
        return JSON.parse(fs.readFileSync(exports.STATE_FILE, "utf-8"));
    };
    BenchmarkFileState.prototype.write = function (data) {
        fs.writeFileSync(exports.STATE_FILE, JSON.stringify(data), "utf-8");
    };
    BenchmarkFileState.prototype.append = function (data) {
        var previousData;
        try {
            previousData = this.read();
        }
        catch (_a) {
            previousData = {};
        }
        this.write(__assign(__assign({}, previousData), data));
    };
    BenchmarkFileState.prototype.delete = function () {
        try {
            fs.unlinkSync(exports.STATE_FILE);
        }
        catch (_a) { }
    };
    return BenchmarkFileState;
}());
exports.BenchmarkFileState = BenchmarkFileState;
var JestReporter = /** @class */ (function () {
    function JestReporter(testData, options) {
        this.options = {
            keepStateAtStart: false,
            keepStateAtEnd: false,
            printReportAtEnd: true,
        };
        if (options) {
            this.options = __assign(__assign({}, this.options), options);
        }
    }
    JestReporter.initializeKelonio = function () {
        var state = new BenchmarkFileState();
        index_1.benchmark.events.on("record", function (description, measurement) {
            var b = new index_1.Benchmark();
            if (state.exists()) {
                b.data = state.read();
            }
            b.incorporate(description, measurement);
            state.write(b.data);
        });
    };
    JestReporter.prototype.onRunStart = function () {
        var state = new BenchmarkFileState();
        if (this.options.keepStateAtStart) {
            state.append({});
        }
        else {
            state.write({});
        }
    };
    JestReporter.prototype.onRunComplete = function () {
        var state = new BenchmarkFileState();
        if (!state.exists()) {
            throw new Error("The Kelonio reporter for Jest requires benchmark serialization." +
                " Make sure to call `JestReporter.initializeKelonio()`.");
        }
        var b = new index_1.Benchmark();
        b.data = state.read();
        if (this.options.printReportAtEnd) {
            console.log("\n".concat(b.report()));
            (0, utils_1.handleExtraReports)(this.options.extensions, b, console.log);
        }
        if (!this.options.keepStateAtEnd) {
            state.delete();
        }
    };
    return JestReporter;
}());
exports.JestReporter = JestReporter;
//# sourceMappingURL=jest.js.map

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
exports.BenchmarkFileState = exports.FOOTER = exports.HEADER = exports.STATE_FILE = void 0;
exports.STATE_FILE = ".kelonio.state.json";
var HEADER_SIDE = "- ".repeat(17).trim();
exports.HEADER = "".concat(HEADER_SIDE, " Performance ").concat(HEADER_SIDE);
exports.FOOTER = "- ".repeat(40).trim();
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
//# sourceMappingURL=etc.js.map
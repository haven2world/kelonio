"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleExtraReports = exports.FOOTER = exports.HEADER = void 0;
var HEADER_SIDE = "- ".repeat(17).trim();
exports.HEADER = "".concat(HEADER_SIDE, " Performance ").concat(HEADER_SIDE);
exports.FOOTER = "- ".repeat(40).trim();
function handleExtraReports(lookups, benchmark, print) {
    var _a, _b;
    for (var _i = 0, _c = lookups !== null && lookups !== void 0 ? lookups : []; _i < _c.length; _i++) {
        var lookup = _c[_i];
        var extension = (_a = require(lookup.module)) === null || _a === void 0 ? void 0 : _a[lookup.extension];
        var report = (_b = extension === null || extension === void 0 ? void 0 : extension.extraReport) === null || _b === void 0 ? void 0 : _b.call(extension, benchmark);
        if (report) {
            print(report);
        }
    }
}
exports.handleExtraReports = handleExtraReports;
//# sourceMappingURL=utils.js.map

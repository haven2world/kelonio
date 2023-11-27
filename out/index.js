"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.benchmark = exports.measure = exports.Measurement = exports.PerformanceError = exports.BenchmarkEventEmitter = exports.Criteria = exports.Benchmark = exports.MochaReporter = exports.KarmaReporter = exports.JestReporter = void 0;
var reporters_1 = require("./reporters");
Object.defineProperty(exports, "JestReporter", { enumerable: true, get: function () { return reporters_1.JestReporter; } });
Object.defineProperty(exports, "KarmaReporter", { enumerable: true, get: function () { return reporters_1.KarmaReporter; } });
Object.defineProperty(exports, "MochaReporter", { enumerable: true, get: function () { return reporters_1.MochaReporter; } });
var Benchmark_1 = require("./Benchmark");
var Benchmark_2 = require("./Benchmark");
Object.defineProperty(exports, "Benchmark", { enumerable: true, get: function () { return Benchmark_2.Benchmark; } });
Object.defineProperty(exports, "Criteria", { enumerable: true, get: function () { return Benchmark_2.Criteria; } });
Object.defineProperty(exports, "BenchmarkEventEmitter", { enumerable: true, get: function () { return Benchmark_2.BenchmarkEventEmitter; } });
var measure_1 = require("./measure");
Object.defineProperty(exports, "PerformanceError", { enumerable: true, get: function () { return measure_1.PerformanceError; } });
Object.defineProperty(exports, "Measurement", { enumerable: true, get: function () { return measure_1.Measurement; } });
Object.defineProperty(exports, "measure", { enumerable: true, get: function () { return measure_1.measure; } });
/**
 * Default [[Benchmark]] instance for shared usage throughout your tests.
 * Each instance stores its own state from measurement results, so if you
 * want to avoid global state, you can create additional instances as well.
 */
exports.benchmark = new Benchmark_1.Benchmark();
//# sourceMappingURL=index.js.map
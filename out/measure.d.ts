/**
 * Options for Benchmark.measure().
 */
export interface MeasureOptions {
    /**
     * The number of times to call the function and measure its duration.
     * @default 100
     */
    iterations: number;
    /**
     * Whether to wait for each iteration to finish before starting the next.
     * @default true
     */
    serial: boolean;
    /**
     * If the mean measured duration exceeds this many milliseconds,
     * throw a [[PerformanceError]].
     */
    meanUnder?: number;
    /**
     * If the minimum measured duration exceeds this many milliseconds,
     * throw a [[PerformanceError]].
     */
    minUnder?: number;
    /**
     * If the maximum measured duration exceeds this many milliseconds,
     * throw a [[PerformanceError]].
     */
    maxUnder?: number;
    /**
     * If the margin of error at 95% confidence level exceeds this many milliseconds,
     * throw a [[PerformanceError]].
     */
    marginOfErrorUnder?: number;
    /**
     * If the standard deviation of all durations measured exceeds this many milliseconds,
     * throw a [[PerformanceError]].
     */
    standardDeviationUnder?: number;
    /**
     * Callback to invoke before each iteration.
     */
    beforeEach?: () => any;
    /**
     * Callback to invoke after each iteration.
     */
    afterEach?: () => any;
    /**
     * Whether to make use of the options like `meanUnder` and `minUnder`.
     * @default true
     */
    verify: boolean;
}
/**
 * Base error for benchmark failures, such as a function taking too long
 * to execute.
 */
export declare class PerformanceError extends Error {
    constructor(message?: string);
}
/**
 * Performance measurement result from running a benchmark.
 */
export declare class Measurement {
    durations: Array<number>;
    /**
     * Optional name of the measurement, for use in reporting.
     */
    description: Array<string>;
    /**
     * Total duration of the benchmark, i.e. for throughput.
     * This includes time spent on any configured `beforeEach`/`afterEach` callbacks.
     * When `serial` is false, this number will be lower.
     */
    totalDuration: number;
    /**
     *
     * @param durations - Durations measured, in milliseconds.
     *     The list must not be empty.
     * @param totalDuration - Duration of the entire measurement, in milliseconds.
     */
    constructor(durations: Array<number>, totalDuration?: number);
    /**
     * Mean of all durations measured, in milliseconds.
     */
    get mean(): number;
    /**
     * Minimum duration measured, in milliseconds.
     */
    get min(): number;
    /**
     * Maximum duration measured, in milliseconds.
     */
    get max(): number;
    /**
     * Standard deviation of all durations measured, in milliseconds.
     */
    get standardDeviation(): number;
    /**
     * Margin of error at 95% confidence level, in milliseconds.
     */
    get marginOfError(): number;
}
/**
 * Default options for Benchmark.measure().
 */
export declare const defaultMeasureOptions: MeasureOptions;
/**
 * Measure the time it takes for a function to execute.
 *
 * @param fn - Function to measure.
 * @param options - Options to customize the measurement.
 */
export declare function measure(fn: () => any, options?: Partial<MeasureOptions>): Promise<Measurement>;
export declare function verifyMeasurement(measurement: Measurement, options: MeasureOptions): void;

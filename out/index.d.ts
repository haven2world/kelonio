/// <reference types="node" />
import { EventEmitter } from "events";
export declare interface BenchmarkEventEmitter {
    emit(event: "record", description: Array<string>, measurement: Measurement): boolean;
    on(event: "record", listener: (description: Array<string>, measurement: Measurement) => void): this;
    once(event: "record", listener: (description: Array<string>, measurement: Measurement) => void): this;
}
export declare class BenchmarkEventEmitter extends EventEmitter {
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
 * Raw data collected from [[Benchmark.record]].
 */
export interface BenchmarkData {
    /**
     * Description passed to [[Benchmark.record]].
     */
    [description: string]: {
        /**
         * Durations of all measured iterations, in milliseconds.
         */
        durations: Array<number>;
        /**
         * Total duration of the benchmark, i.e. for throughput.
         * This is nullable for compatibility with older serialized data from the Jest reporter.
         */
        totalDuration?: number;
        /**
         * Nested test data, such as when passing `["A", "B"]` as the
         * description to [[Benchmark.record]].
         */
        children: BenchmarkData;
    };
}
/**
 * Measure the time it takes for a function to execute.
 *
 * @param fn - Function to measure.
 * @param options - Options to customize the measurement.
 */
export declare function measure(fn: () => any, options?: Partial<MeasureOptions>): Promise<Measurement>;
/**
 * Used for filtering benchmark data.
 */
export declare enum Criteria {
    Fastest = 0,
    Slowest = 1
}
/**
 * Aggregator for performance results of various tests.
 */
export declare class Benchmark {
    /**
     * Raw data collected from [[Benchmark.record]].
     */
    data: BenchmarkData;
    /**
     * Event emitter.
     *
     * * `record` is emitted after [[Benchmark.record]] finishes all iterations.
     *
     * Refer to [[BenchmarkEventEmitter.on]] for the event callback signatures.
     */
    events: BenchmarkEventEmitter;
    /**
     * Measure the time it takes for a function to execute.
     * In addition to returning the measurement itself, this method also
     * stores the result in [[Benchmark.data]] for later use/reporting.
     *
     * With this overload, since no description is provided, the data will not
     * be recorded directly. However, a `record` event will still be emitted,
     * allowing any listeners (such as reporters) to act on it.
     *
     * @param fn - Function to measure. If it returns a promise,
     *     then it will be `await`ed automatically as part of the iteration.
     * @param options - Options to customize the measurement.
     */
    record(fn: () => any, options?: Partial<Omit<MeasureOptions, "verify">>): Promise<Measurement>;
    /**
     * Measure the time it takes for a function to execute.
     * In addition to returning the measurement itself, this method also
     * stores the result in [[Benchmark.data]] for later use/reporting,
     * and [[Benchmark.events]] emits a `record` event for any listeners.
     *
     * @param description - Name of what is being tested.
     *     This can be a series of names for nested categories.
     *     Must not be empty.
     * @param fn - Function to measure. If it returns a promise,
     *     then it will be `await`ed automatically as part of the iteration.
     * @param options - Options to customize the measurement.
     */
    record(description: string | Array<string>, fn: () => any, options?: Partial<Omit<MeasureOptions, "verify">>): Promise<Measurement>;
    /**
     * Add a measurement directly to [[Benchmark.data]].
     *
     * @param description - Name of what is being tested.
     *     Must not be empty.
     * @param measurement - Measurement to add to the benchmark data.
     */
    incorporate(description: Array<string>, measurement: Measurement): void;
    private addBenchmarkDurations;
    private reportLevel;
    /**
     * Create a report of all the benchmark results.
     */
    report(): string;
    private getMeasurementsAtLevel;
    /**
     * Get a list of [[Measurement]] based on [[Benchmark.data]].
     */
    get measurements(): Array<Measurement>;
    /**
     * Find the measurement that meets some criteria.
     * In the case of a tie, the first one found wins.
     *
     * @param criteria - Criteria by which to select a measurement.
     * @param value - Callback to select a specific field of each measurement for comparison.
     *     The default uses the mean plus the margin of error.
     * @returns the matching measurement, or null if no measurements have been taken
     */
    find(criteria: Criteria, value?: (m: Measurement) => number): Measurement | null;
}
/**
 * Default [[Benchmark]] instance for shared usage throughout your tests.
 * Each instance stores its own state from measurement results, so if you
 * want to avoid global state, you can create additional instances as well.
 */
export declare const benchmark: Benchmark;

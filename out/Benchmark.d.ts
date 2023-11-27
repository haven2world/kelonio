import { EventEmitter } from "eventemitter3";
import { MeasureOptions, Measurement } from "./measure";
export declare interface BenchmarkEventEmitter {
    emit(event: "record", description: Array<string>, measurement: Measurement): boolean;
    on(event: "record", listener: (description: Array<string>, measurement: Measurement) => void): this;
    once(event: "record", listener: (description: Array<string>, measurement: Measurement) => void): this;
}
export declare class BenchmarkEventEmitter extends EventEmitter<"record"> {
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

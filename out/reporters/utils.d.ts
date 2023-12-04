import { Benchmark } from "..";
export declare const HEADER: string;
export declare const FOOTER: string;
export declare type Extension = {
    extraReport?: (benchmark: Benchmark) => string | void;
};
export declare type ExtensionLookup = {
    module: string;
    extension: string;
};
export declare function handleExtraReports(lookups: Array<ExtensionLookup> | undefined, benchmark: Benchmark, print: (report: string) => void): void;

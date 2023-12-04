/// <reference types="jest" />
import { ExtensionLookup } from "./utils";
export declare const STATE_FILE = ".kelonio.state.json";
export declare class BenchmarkFileState {
    constructor();
    exists(): boolean;
    read(): any;
    write(data: object): void;
    append(data: object): void;
    delete(): void;
}
interface JestReporterOptions {
    keepStateAtStart?: boolean;
    keepStateAtEnd?: boolean;
    printReportAtEnd?: boolean;
    extensions?: Array<ExtensionLookup>;
}
export declare class JestReporter implements jest.Reporter {
    options: JestReporterOptions;
    constructor(testData?: any, options?: JestReporterOptions);
    static initializeKelonio(): void;
    onRunStart(): void;
    onRunComplete(): void;
}
export {};

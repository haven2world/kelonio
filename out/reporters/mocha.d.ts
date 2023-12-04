/// <reference types="mocha" />
import { ExtensionLookup } from "./utils";
interface MochaReporterOptions {
    reporterOptions: {
        inferDescriptions?: boolean;
        printReportAtEnd?: boolean;
        extensions?: Array<ExtensionLookup>;
    };
}
export declare class MochaReporter {
    constructor(runner: Mocha.Runner, options: MochaReporterOptions);
}
export {};

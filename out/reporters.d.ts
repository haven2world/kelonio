/// <reference types="jest" />
/// <reference types="mocha" />
declare type ExtensionLookup = {
    module: string;
    extension: string;
};
interface MochaReporterOptions {
    reporterOptions: {
        inferDescriptions?: boolean;
        printReportAtEnd?: boolean;
        extensions?: Array<ExtensionLookup>;
    };
}
interface KarmaReporterOptions {
    inferBrowsers?: boolean;
    printReportAtEnd?: boolean;
    extensions?: Array<ExtensionLookup>;
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
export declare class KarmaReporter {
    protected onBrowserLog: (browser: string, log: string, type: string) => void;
    protected onRunComplete: () => void;
    static initializeKelonio(): void;
    constructor(baseReporterDecorator: any, config: {
        kelonioReporter?: KarmaReporterOptions;
    }, logger: unknown, helper: unknown, formatError: unknown);
}
export declare class MochaReporter {
    constructor(runner: Mocha.Runner, options: MochaReporterOptions);
}
export {};

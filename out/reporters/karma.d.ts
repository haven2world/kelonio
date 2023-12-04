import { ExtensionLookup } from "./utils";
interface KarmaReporterOptions {
    inferBrowsers?: boolean;
    printReportAtEnd?: boolean;
    extensions?: Array<ExtensionLookup>;
}
export declare class KarmaReporter {
    protected onBrowserLog: (browser: string, log: string, type: string) => void;
    protected onRunComplete: () => void;
    static initializeKelonio(): void;
    constructor(baseReporterDecorator: any, config: {
        kelonioReporter?: KarmaReporterOptions;
    }, logger: unknown, helper: unknown, formatError: unknown);
}
export {};

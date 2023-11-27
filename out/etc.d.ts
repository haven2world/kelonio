export declare const STATE_FILE = ".kelonio.state.json";
export declare const HEADER: string;
export declare const FOOTER: string;
export declare class BenchmarkFileState {
    constructor();
    exists(): boolean;
    read(): any;
    write(data: object): void;
    append(data: object): void;
    delete(): void;
}

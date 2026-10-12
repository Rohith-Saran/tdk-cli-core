import { type SpawnOptions, spawn } from "node:child_process";
import { Command } from "commander";
/**
 * The importer lives in its own repo so it can ship without a CLI release, and is run from npm at a
 * pinned version so a push to its main branch cannot change what `tdk import` does. Move the pin
 * when a new importer is published. `TDK_IMPORT_PACKAGE` overrides the package spec.
 */
export declare const IMPORT_PACKAGE = "@tdk-landscape/tdk-import@0.2.1";
type SpawnFn = (command: string, args: string[], options: SpawnOptions) => ReturnType<typeof spawn>;
export declare function importInvocation(args: string[], env?: NodeJS.ProcessEnv, platform?: NodeJS.Platform): {
    command: string;
    args: string[];
    shell: boolean;
};
/** Runs tdk-import with the caller's terminal and resolves to its exit code. */
export declare function runImport(args: string[], spawnFn?: SpawnFn): Promise<number>;
export declare const importCommand: Command;
export {};

import { Command } from "commander";
export interface InstallInfo {
    method: "npm" | "bun" | "git" | "binary" | "unknown";
    path?: string;
    version?: string;
}
export declare function isStandaloneBinary(tdkPath: string): boolean;
export declare function classifyRunningInstall(execPath: string, scriptPath: string, platformName?: NodeJS.Platform): InstallInfo | null;
export declare function windowsNpmUpgradeMessage(platformName: string, installInfo: InstallInfo): string | null;
export declare function detectInstallation(): InstallInfo;
export declare function detectInstallationForPath(tdkPath: string): InstallInfo;
export declare function detectAllInstallations(): InstallInfo[];
export interface BinaryRelease {
    tag: string;
    assetName: string;
    downloadUrl: string;
    engineDownloadUrl: string;
    checksumsUrl: string;
}
/** Parses `shasum -a 256` / `sha256sum` output ("<hash>  <name>" or "<hash> *<name>"). */
export declare function parseChecksums(text: string): Map<string, string>;
export declare function getLatestBinaryRelease(): Promise<BinaryRelease | null>;
export declare function isPermissionError(err: unknown): boolean;
export declare function isWritable(path: string): boolean;
export declare function upgradeViaBinary(tdkPath: string, release: BinaryRelease): Promise<boolean>;
export declare function getCurrentVersion(): string;
export declare function getLatestVersion(): Promise<string | null>;
export declare function upgradeViaNpm(): Promise<boolean>;
export declare function upgradeViaBun(): Promise<boolean>;
export declare function upgradeAllInstallations(dryRun: boolean): Promise<boolean>;
export declare function upgradeViaGit(path: string): Promise<boolean>;
export declare function createUpgradeCommand(): Command;
export declare const upgradeCommand: Command;

// Copyright (c) 2026 TDK Landscape contributors
// SPDX-License-Identifier: MIT
import { type SpawnOptions, spawn } from "node:child_process";
import { Command } from "commander";

/**
 * The importer lives in its own repo so it can ship without a CLI release, and is run from npm at a
 * pinned version so a push to its main branch cannot change what `tdk import` does. Move the pin
 * when a new importer is published. `TDK_IMPORT_PACKAGE` overrides the package spec.
 */
export const IMPORT_PACKAGE = "@tdk-landscape/tdk-import@0.2.1";

type SpawnFn = (command: string, args: string[], options: SpawnOptions) => ReturnType<typeof spawn>;

export function importInvocation(
  args: string[],
  env: NodeJS.ProcessEnv = process.env,
  platform: NodeJS.Platform = process.platform,
): { command: string; args: string[]; shell: boolean } {
  const pkg = env.TDK_IMPORT_PACKAGE || IMPORT_PACKAGE;
  return {
    command: platform === "win32" ? "npx.cmd" : "npx",
    args: ["--yes", pkg, ...args],
    shell: platform === "win32",
  };
}

/** Runs tdk-import with the caller's terminal and resolves to its exit code. */
export function runImport(args: string[], spawnFn: SpawnFn = spawn): Promise<number> {
  const invocation = importInvocation(args);
  return new Promise((resolve) => {
    const child = spawnFn(invocation.command, invocation.args, {
      stdio: "inherit",
      shell: invocation.shell,
    });
    child.on("error", (err) => {
      console.error(
        `tdk import: could not run npx (${err.message}). Install Node.js/npm and retry.`,
      );
      resolve(127);
    });
    child.on("close", (code) => resolve(code ?? 1));
  });
}

export const importCommand = new Command("import")
  .description("Import the services in a directory's root docker-compose.yml (runs tdk-import)")
  .argument("[args...]", "Passed to tdk-import: [dir] --dry-run --yes --force")
  .allowUnknownOption()
  .helpOption(false)
  .action(async (args: string[]) => {
    process.exitCode = await runImport(args);
  });

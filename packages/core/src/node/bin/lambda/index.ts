#!/usr/bin/env node
import install from "./install";
import serve from "./serve";
import { join } from "path";
import chalk from "chalk";
import { removeSync, copySync, existsSync, watch } from "fs-extra";
import { exec, execSync, ExecException } from "child_process";
import { getEnv } from "../../utils";

const {
  LAMBDA_SRC,
  LAMBDA_DEST,
  LAMBDA_PORT,
  LAMBDA_TIMEOUT,
  LAMBDA_URL,
} = getEnv();

const getError = (err: ExecException) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
};

// build up on https://github.com/netlify/netlify-lambda

// todo: schauen ob netlify.toml => Vars daraus nehmen
// todo: env-Vars ermöglichen!

export const lambda = async ({
  "--src": srcDir = LAMBDA_SRC || "functions",
  "---dest": destDir = LAMBDA_DEST || ".lambda",
  "--port": port = LAMBDA_PORT || 9000,
  "--timeout": timeout = LAMBDA_TIMEOUT || 10,
  "--url": urlPrefix = LAMBDA_URL || ".netlify/functions",
  "--build": buildOnly = false,
}) => {
  const srcPath = join(process.cwd(), srcDir);
  const destPath = join(process.cwd(), destDir);
  const srcTsconfig = join(__dirname, "../../../..", "tsconfig.lambda.json");
  const destTsconfig = join(srcPath, "tsconfig.json");

  // only if there is a functions-folder
  if (!existsSync(srcDir)) return;

  // install dependecies
  await install(srcDir).catch(getError);

  // remove previous .lambda-folder & copy everything except .ts-files to dest-Folder
  removeSync(destPath);
  copySync(srcPath, destPath, {
    filter: (src: string) =>
      !src.includes(".ts") && src !== join(srcPath, "tsconfig.json"),
  });
  console.info(`  ${chalk.green("✔")} assets copied!`);

  // copy tsconfig.json, if not there
  if (!existsSync(destTsconfig)) {
    copySync(srcTsconfig, destTsconfig);
    console.info(`  ${chalk.green("✔")} tsconfig.json created!`);
  }

  // start server, watcher and clear cache if some .js-file changes
  if (!buildOnly) {
    const server = serve(port, destDir, timeout, urlPrefix);
    exec(
      "tsc --emitDecoratorMetadata --watch",
      { encoding: "utf8", cwd: srcPath },
      getError
    );
    watch(
      destPath,
      { encoding: "utf8", recursive: true, persistent: true },
      (event: string, file: string) => {
        if (file.includes(".js")) {
          console.info(`[ ${chalk.yellow(event)} ] ${file}`);
          server.clearCache(`/${file}`);
        }
      }
    );
  } else {
    // transpile tsc
    execSync("tsc", { encoding: "utf8", cwd: srcPath });
    console.info(`  ${chalk.green("✔")} typescript-files transpiled!`);
  }
};

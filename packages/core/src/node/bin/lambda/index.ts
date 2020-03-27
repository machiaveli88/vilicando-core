#!/usr/bin/env node
import build from "./build";
import install from "./install";
import serve from "./serve";
import { join } from "path";
import chalk from "chalk";
import { removeSync, copySync } from "fs-extra";
// import { exec, execSync } from 'child_process';

// build up on https://github.com/netlify/netlify-lambda

// todo: schauen ob netlify.toml => Vars daraus nehmen
// todo: env-Vars ermöglichen!
// todo: /graphql Beispiel geht nicht => liegt wohl an webpack, mit Typescript gehts!

export const lambda = async ({
  "--src": srcDir = "functions",
  "---dest": destDir = ".lambda",
  "--port": port = 9000,
  "--timeout": timeout = 10,
  "--url": urlPrefix = ".netlify/functions",
  "--build": buildOnly = false,
}) => {
  const srcPath = join(process.cwd(), srcDir);
  const destPath = join(process.cwd(), destDir);

  // remove previous .lambda-folder
  removeSync(destPath);
  console.info(`  ${chalk.green("✔")} .lambda-folder removed!`);

  // install dependecies
  await install(srcDir).catch((err: any) => {
    console.error(err);
    process.exit(1);
  });

  // copy everything except .ts-files to dest-Folder
  copySync(srcPath, destPath, {
    filter: (src: string) => !src.includes(".ts"),
  });
  console.info(`  ${chalk.green("✔")} assets copied!`);

  let server: any;
  build(srcDir, destDir, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    // console.log(stats.toString(stats.compilation.options.stats));

    if (!buildOnly) {
      if (!server) server = serve(port, destDir, timeout, urlPrefix);
      stats.compilation.chunks.forEach((chunk: any) =>
        server.clearCache(chunk.name || chunk.id.toString())
      );
    }
  });

  // build and move .ts-files
  /* exec(
    `tsc ${srcPath}\/**\/*.ts -m "CommonJS" -t "ES6" --outDir ${destPath} --skipLibCheck -w`,
    { encoding: 'utf8' }
  );
  serve(port, destDir, timeout, urlPrefix); */
};

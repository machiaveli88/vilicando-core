#!/usr/bin/env node
import { execSync } from "child_process";
import { join } from "path";
import { copyFiles, getEnv } from "../utils";
import chalk from "chalk";

// read env
const { PORT } = getEnv();
const env = getEnv();
const envKeys = Object.keys(env);
if (envKeys.length) {
  console.info(chalk.grey("  env-file detected!"));
  envKeys.forEach((e) => console.log(`  [${chalk.grey(e)}]: ${env[e]}`));
}

const buildDir = join(process.cwd(), ".next");
const serverSrc = join(__dirname, "../server.js");
const serverDist = join(buildDir, "server.js");

export const build = () => {
  copyFiles(buildDir, serverSrc, serverDist);
  execSync(
    `vilicando-core pwa -s && vilicando-core lambda -b && next build`,
    {}
  );
};

export const dev = ({ "--dev": dev = true, "--port": port = PORT || 3000 }) =>
  execSync(
    port
      ? `vilicando-core pwa -s && cross-env NODE_ENV=${
          dev ? "development" : "production"
        } PORT=${port} node '${serverSrc}'`
      : `vilicando-core pwa -s && cross-env NODE_ENV=${
          dev ? "development" : "production"
        } node '${serverSrc}'`,
    {
      stdio: "inherit",
    }
  );

export const exportStatic = () => {
  copyFiles(buildDir, serverSrc, serverDist);
  execSync(`next export`, { stdio: "inherit" });
};

export const start = ({
  "--dev": dev = false,
  "--port": port = PORT || 3000,
}) =>
  execSync(
    port
      ? `cross-env NODE_ENV=${
          dev ? "development" : "production"
        } PORT=${port} node '${serverDist}'`
      : `cross-env NODE_ENV=${
          dev ? "development" : "production"
        } node '${serverDist}'`,
    {
      stdio: "inherit",
    }
  );

export const up = ({ "--latest": latest = true }) =>
  execSync(
    latest ? "yarn upgrade-interactive --latest" : "yarn upgrade-interactive",
    { stdio: "inherit" }
  );

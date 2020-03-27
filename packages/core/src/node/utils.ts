#!/usr/bin/env node
import { join } from "path";
import { existsSync, readFileSync, mkdirSync, writeFileSync } from "fs";
import { config, parse, DotenvParseOutput } from "dotenv";
import chalk from "chalk";

export const copyFiles = (
  buildDir: string,
  serverSrc: string,
  serverDist: string
) => {
  mkdirSync(buildDir, { recursive: true });
  console.info(`  ${chalk.green("✔")} Folder created`);

  const data = readFileSync(serverSrc, "utf8").replace(
    '"./',
    '"vilicando-core/lib/node/'
  );
  writeFileSync(serverDist, data, "utf8");

  console.info(`  ${chalk.green("✔")} Files copied`);
};

export const setEnv = () => {
  const envPath = join(process.cwd(), ".env");
  if (existsSync(envPath)) {
    config({ path: envPath });
    if (process.env.EXTENDS) {
      const customEnvPath = join(process.cwd(), process.env.EXTENDS);
      if (existsSync(customEnvPath)) config({ path: customEnvPath });
    }
  }
};

export const getEnv = (): DotenvParseOutput => {
  let env: DotenvParseOutput = {};
  const envPath = join(process.cwd(), ".env");
  if (existsSync(envPath)) {
    env = parse(readFileSync(join(process.cwd(), ".env")));
    if (env.EXTENDS) {
      const customEnvPath = join(process.cwd(), env.EXTENDS);
      if (existsSync(customEnvPath)) {
        const envConfig = parse(readFileSync(customEnvPath));
        for (const k in envConfig)
          if (env[k] === undefined) env[k] = envConfig[k];
      }
    }
  }

  return env;
};

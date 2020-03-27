#!/usr/bin/env node
import arg from "arg";
import { CONFIG_FILE } from "next/dist/next-server/lib/constants";
import { watchFile } from "fs";

export default (
  scripts: {
    [command: string]: () => Promise<(argv?: object) => void>;
  },
  args: arg.Spec,
  defaultScript: string = "dev"
) => {
  const { _: commands, ..._args } = arg(args, {
    permissive: true,
  });
  const command = commands[0] || defaultScript;
  const foundCommand = Boolean(scripts[command]);

  /* SCRIPT */

  ["react", "react-dom"].forEach((dependency) => {
    try {
      require.resolve(dependency);
    } catch (err) {
      console.warn(
        `The module '${dependency}' was not found. Vilicando-core requires it as dependency of your 'package.json'. To add it, run 'yarn add ${dependency}'`
      );
    }
  });

  if (!foundCommand && !_args["--help"]) {
    console.warn("Command not found, run `vilicando-core --help` for help!");
    process.exit(0);
  } else if (_args["--help"]) {
    console.warn("No help found!");
    process.exit(0);
  }
  scripts[command]()
    .then((exec) => exec(_args))
    .catch((err) => console.error(err));

  // watch config in dev-mode
  if (command === "dev") {
    watchFile(`${process.cwd()}/${CONFIG_FILE}`, (cur: any, prev: any) => {
      if (cur.size > 0 || prev.size > 0) {
        console.warn(
          `\n> Found a change in ${CONFIG_FILE}. Restart the server to see the changes in effect.`
        );
      }
    });
  }
};

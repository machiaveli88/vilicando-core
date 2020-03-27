import { join } from "path";
import globby from "globby";
import { execSync } from "child_process";
import chalk from "chalk";

export default async function (dir: string) {
  const directory = join(process.cwd(), dir);
  const foldersWithDeps = await globby(
    ["**/package.json", "!node_modules", "!**/node_modules"],
    { cwd: directory }
  );
  await foldersWithDeps
    .map((fnFolder) => fnFolder.substring(0, fnFolder.indexOf("package.json")))
    .forEach((folder) => {
      execSync("yarn", { cwd: join(directory, folder) });
      console.info(`  ${chalk.green("✔")} ${folder} dependencies installed`);
    });
}

import { cac } from "cac";
import { resolve } from "path";
import { name, version } from "../package.json";
import { build } from "./index";
import { handleError } from "./errors";
import { arraify } from "./utils";

async function main() {
  const cli = cac(name);

  cli
    .command("[path]", 'Path to "assets" directory')
    .option("--ext <extension>", "Specify file extensions", {
      default: ["css", "js"],
    })
    .action(async (path: string, flags) => {
      await build({
        assetsDir: resolve(process.cwd(), path ?? "assets"),
        extensions: arraify(flags.ext),
      });
    });

  cli.help();

  cli.version(version);

  // Parse CLI args without running the command to
  // handle command errors globally
  cli.parse(process.argv, { run: false });
  await cli.runMatchedCommand();
}

main().catch(handleError);

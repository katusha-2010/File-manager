import * as path from "path";
import { stat } from "fs/promises";
import { stdout } from "process";
import { isExistPath } from "./helper.js";

export async function goToDirectory(argsAfterCommand) {
  if (await isExistPath(path.resolve(argsAfterCommand))) {
    if ((await stat(path.resolve(argsAfterCommand))).isDirectory()) {
      process.chdir(path.resolve(argsAfterCommand));
    } else {
      stdout.write("Operation failed");
    }
  } else {
    stdout.write("Operation failed");
  }
}

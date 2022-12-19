import * as path from "path";
import { stat } from "fs/promises";
import { stdout } from "process";
import { isDirectory, isExistPath } from "./helper.js";

export async function goToDirectory(argsAfterCommand) {
  if (await isExistPath(path.resolve(argsAfterCommand))) {
    if (await isDirectory(path.resolve(argsAfterCommand))) {
      if (argsAfterCommand.length === 2 && argsAfterCommand[1] === ":") {
        process.chdir(path.join(argsAfterCommand, "\\"));
      } else {
        process.chdir(path.resolve(argsAfterCommand));
      }
    } else {
      stdout.write("Operation failed");
    }
  } else {
    stdout.write("Operation failed");
  }
}

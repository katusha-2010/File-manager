import * as path from "path";
import { readFile } from "fs/promises";
import { createHash } from "crypto";

export async function hashFile(argsAfterCommand) {
  try {
    const pathToFile = path.resolve(argsAfterCommand);
    console.log(pathToFile);
    const text = await readFile(pathToFile, "utf8");

    // const hash = createHash("sha256").update(text).digest("hex");
    text.then((val) => process.stdout(val));
  } catch (error) {
    console.log("Operation failed");
  }
}

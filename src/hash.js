import * as path from "path";
import { readFile } from "fs/promises";
import { createHash } from "crypto";

export async function hashFile(argsAfterCommand) {
  try {
    const pathToFile = path.resolve(argsAfterCommand);
    const text = await readFile(pathToFile, "utf8");
    const hash = createHash("sha256").update(text).digest("hex");
    console.log(hash);
  } catch (error) {
    console.log("Operation failed");
  }
}

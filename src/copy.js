import * as path from "path";
import * as fs from "fs";
import { isExistPath } from "./helper.js";
import { unlink, access } from "fs/promises";

export async function copy(argsAfterCommand, flagRemove = false) {
  try {
    const pathToFile = path.resolve(argsAfterCommand[0]);
    const pathToNewDirectory = path.resolve(argsAfterCommand[1]);
    const pathToCopyFile = path.resolve(
      pathToNewDirectory,
      path.basename(pathToFile)
    );
    if (
      (await isExistPath(pathToFile)) === false ||
      (await isExistPath(pathToNewDirectory)) === false ||
      (await isExistPath(pathToCopyFile)) === true
    ) {
      console.log("Operation failed");
    } else {
      const nameFile = path.basename(pathToFile);
      const readableStream = fs.createReadStream(pathToFile);
      const writableStream = fs.createWriteStream(
        path.resolve(pathToNewDirectory, nameFile)
      );
      readableStream.pipe(writableStream);
      readableStream.on("end", async () => {
        writableStream.end();
        if (flagRemove) {
          await unlink(pathToFile);
        }
      });
    }
  } catch (err) {
    console.log("Operation failed");
  }
}

import * as fs from "fs";
import { createBrotliCompress } from "zlib";
import * as path from "path";
import { isDirectory, isExistPath } from "./helper.js";

export async function compress(argsAfterCommand) {
  try {
    const pathToFile = path.resolve(argsAfterCommand[0]);
    const pathToDestinationFolder = path.resolve(argsAfterCommand[1]);
    const pathToDestination = path.resolve(
      argsAfterCommand[1],
      `${pathToFile}.br`
    );

    if (
      (await isExistPath(pathToFile)) === false ||
      (await isExistPath(pathToDestinationFolder)) === false ||
      (await isDirectory(pathToDestinationFolder)) === false
    ) {
      throw new Error("There is no such file/directory");
    }

    const readableStream = fs.createReadStream(pathToFile);
    const writableStream = fs.createWriteStream(pathToDestination, {
      flags: "wx",
    });
    writableStream.on("error", (err) => {
      if (err) {
        console.log("Operation failed. Such file is exist!");
        console.log(`\nYou are currently in ${process.cwd()}\n`);
      }
    });
    const brotli = createBrotliCompress();
    readableStream.pipe(brotli).pipe(writableStream);
  } catch (error) {
    console.log("Operation failed");
  }
}

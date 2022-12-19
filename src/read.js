import * as fs from "fs";
import { exit, stdout } from "process";
import { isExistPath } from "./helper.js";

export async function read(pathToFile) {
  try {
    const readableStream = fs.createReadStream(pathToFile, { flags: "r" });
    let body = "";
    readableStream.on("data", (chunk) => (body += chunk));
    readableStream.on("end", () => {
      console.log(`${body}\n`);
      console.log(`\nYou are currently in ${process.cwd()}\n`);
    });
    readableStream.on("error", () => {
      console.log("Operation failed");
      console.log(`\nYou are currently in ${process.cwd()}\n`);
    });
  } catch (error) {
    console.log("Operation failed");
  }
}

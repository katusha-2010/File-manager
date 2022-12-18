import * as fs from "fs";
import { isExistPath } from "./helper.js";

export const read = async (pathToFile) => {
  try {
    if (!(await isExistPath(pathToFile))) {
      stdout.write("Operation failed");
    } else {
      const readableStream = fs.createReadStream(pathToFile);
      let body = "";
      readableStream.on("data", (chunk) => (body += chunk));
      readableStream.on("end", () => console.log(`${body}\n`));
    }
  } catch (error) {
    console.log(error);
  }
};

import { writeFile } from "fs/promises";
import { isExistPath } from "./helper.js";

export const create = async (pathToFile) => {
  try {
    if (await isExistPath(pathToFile)) {
      console.log("Operation failed");
    } else {
      await writeFile(pathToFile, "");
    }
  } catch (err) {
    console.log(err);
  }
};

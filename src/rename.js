import * as path from "path";
import { rename as renameAPI } from "fs/promises";
import { isExistPath } from "./helper.js";

export const rename = async (pathToFile, pathToRenamedFile) => {
  // const pathToFile = path.join(__dirname, "files", "wrongFilename.txt");
  // const pathToRenamedFile = path.join(__dirname, "files", "properFilename.md");

  try {
    if (
      (await isExistPath(pathToRenamedFile)) === true ||
      (await isExistPath(pathToFile)) === false
    ) {
      console.log("Operation failed");
    } else {
      await renameAPI(pathToFile, pathToRenamedFile);
    }
  } catch (error) {
    console.log(error);
  }
};

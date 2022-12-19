import * as path from "path";
import { rename as renameAPI } from "fs/promises";
import { isExistPath } from "./helper.js";

export const rename = async ([pathToFile, renamedFile]) => {
  const directory = path.parse(pathToFile).dir;
  const pathToRenamedFile = path.resolve(directory, renamedFile);

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

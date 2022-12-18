import { unlink } from "fs/promises";

export async function deleteFile(pathToFile) {
  try {
    return await unlink(pathToFile);
  } catch (error) {
    console.log("Operation failed");
  }
}

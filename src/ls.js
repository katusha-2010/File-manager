import { getObjectForList, sortFunc } from "./helper.js";
import { readdir } from "fs/promises";

export async function showList(argsAfterCommand) {
  try {
    const content = await readdir(process.cwd(), { withFileTypes: true });
    const promise1 = await Promise.all(content.map(getObjectForList));
    console.table(await Promise.all(promise1.sort((a, b) => sortFunc(a, b))));
  } catch (error) {
    console.log("Operation failed");
  }
}

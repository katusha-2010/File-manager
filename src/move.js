import { copy } from "./copy.js";

export async function move(argsAfterCommand) {
  try {
    await copy(argsAfterCommand, true);
  } catch (error) {
    console.log("Operation failed");
  }
}

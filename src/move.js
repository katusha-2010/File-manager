import { copy } from "./copy.js";

export async function move(arr) {
  try {
    await copy(arr, true);
  } catch (error) {
    console.log("Operation failed");
  }
}

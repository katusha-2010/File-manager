import { access, readdir, stat } from "fs/promises";
import { stdout } from "process";
import * as path from "path";

export function sayBye(userName) {
  process.stdout.write(
    `Thank you for using File Manager, ${userName}, goodbye!`
  );
  process.exit();
}

// export const isExist = async (pathToItem) => {
//   try {
//     await access(pathToItem);
//     return true;
//   } catch (err) {
//     if (err.code === "ENOENT") {
//       return false;
//     }
//     throw err;
//   }
// };

export async function isExistPath(pathToItem) {
  try {
    await access(pathToItem);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    }
    return false;
  }
}

export function isExistCommand(body) {
  const commandsArr = [
    ".exit",
    "up",
    "cd",
    "ls",
    "cat",
    "add",
    "rn",
    "cp",
    "mv",
    "rm",
    "os",
    "hash",
    "compress",
    "decompress",
  ];
  for (let command of commandsArr) {
    if (body.trim().startsWith(command)) {
      // const argsAfterCommand = path.join(body.replace(command, "").trim());
      const argsAfterCommand = body.replace(command, "").trim();
      body = command;
      return { argsAfterCommand, command };
    }
  }
  return false;
}

export function sortFunc(a, b) {
  return a.Type.localeCompare(b.Type);
}

export async function getObjectForList(el) {
  return {
    Name: el.name,
    Type: el.isDirectory() ? "directory" : "file",
  };
}

export async function isDirectory(el) {
  return (await stat(el)).isDirectory();
}

export function getUserName(consoleArgs) {
  let userName = "";
  const nameArr = consoleArgs.map((el) =>
    el.startsWith("--username")
      ? (userName = el.replace("--username=", ""))
      : (userName = el.replace("--username=", "Stranger"))
  );

  if (userName === "") {
    userName = "Stranger";
  }
  return userName;
}

export function getArrArguments(argsAfterCommand) {
  const reg = /("|')(\\.|[^("|')\\])*("|')/g;
  const arrArgs = argsAfterCommand.match(reg);
  return arrArgs.map((el) => el.slice(1, -1));
}

export function throwErrorAboutPath(arr) {
  if (arr.length !== 2) {
    throw new Error("2 path should be string");
  }
}

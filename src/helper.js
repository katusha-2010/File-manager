import { access, stat } from "fs/promises";
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
    throw err;
  }
}

export function isExistCommand(body) {
  const commandsArr = [
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
    Name: el,
    Type: (await stat(path.resolve(el))).isDirectory() ? "directory" : "file",
  };
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

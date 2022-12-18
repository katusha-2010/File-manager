import { stdin, stdout, exit } from "process";
import {
  isExistCommand,
  isExistPath,
  sayBye,
  sortFunc,
  getObjectForList,
  getUserName,
} from "./helper.js";
import os from "os";
import * as path from "path";
import { readdir, unlink } from "fs/promises";
import { goToDirectory } from "./cd.js";
import { read } from "./read.js";
import { create } from "./create.js";
import { rename } from "./rename.js";
import { copy } from "./copy.js";
import { move } from "./move.js";
import { deleteFile } from "./delete.js";
import { getInfoFromOs } from "./os.js";
import { hashFile } from "./hash.js";

let userName = "";
let userStartingDir = os.homedir();
process.chdir(userStartingDir);
const consoleArgs = process.argv.slice(2);

userName = getUserName(consoleArgs);

stdout.write(
  `Welcome to the File Manager, ${userName}!\n\nYou are currently in ${userStartingDir}\n`
);

stdin.on("data", async (data) => {
  try {
    let body = data.toString().trim();
    const objConsoleCommand = isExistCommand(body);
    body = objConsoleCommand ? objConsoleCommand.command : false;
    let argsAfterCommand = objConsoleCommand.argsAfterCommand;
    switch (body) {
      case ".exit":
        sayBye(userName);
        break;
      case "up":
        process.chdir(path.dirname(process.cwd()));
        break;
      case "cd":
        await goToDirectory(argsAfterCommand);
        break;
      case "ls":
        const content = await readdir(process.cwd());
        const promise1 = await Promise.all(content.map(getObjectForList));
        console.table(
          await Promise.all(promise1.sort((a, b) => sortFunc(a, b)))
        );
        break;
      case "cat":
        await read(path.resolve(argsAfterCommand));
        break;
      case "add":
        await create(path.resolve(argsAfterCommand));
        break;
      case "rn":
        const pathToFile = path.resolve(argsAfterCommand.split(" ")[0]);
        const pathToDirectory = path.dirname(pathToFile);
        const pathToRenamedFile = path.resolve(
          pathToDirectory,
          argsAfterCommand.split(" ")[1]
        );
        await rename(pathToFile, pathToRenamedFile);
        break;
      case "cp":
        const reg = /("|')(\\.|[^("|')\\])*("|')/g;
        const arrArgs = argsAfterCommand.match(reg);
        const arrArgs2 = arrArgs.map((el) => el.slice(1, -1));
        if (arrArgs2.length !== 2) {
          throw new Error("path should be string");
        } else {
          await copy([arrArgs2[0], arrArgs2[1]]);
        }
        break;
      case "mv":
        await move(argsAfterCommand);
        break;
      case "rm":
        await deleteFile(argsAfterCommand);
        break;
      case "os":
        await getInfoFromOs(argsAfterCommand);
        break;
      case "hash":
        await hashFile(argsAfterCommand);
        break;
      default:
        stdout.write("Invalid input");
    }
  } catch (error) {
    stdout.write("Invalid input");
  }

  stdout.write(`\nYou are currently in ${process.cwd()}\n`);
});

process.on("SIGINT", () => {
  sayBye(userName);
});

import { stdin, stdout, exit } from "process";
import {
  isExistCommand,
  isExistPath,
  sayBye,
  sortFunc,
  getObjectForList,
  getUserName,
  getArrArguments,
  throwErrorAboutPath,
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
import { compress } from "./compress.js";
import { decompress } from "./decompress.js";
import { showList } from "./ls.js";

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
        await showList();
        break;
      case "cat":
        await read(path.resolve(argsAfterCommand));
        break;
      case "add":
        await create(path.resolve(argsAfterCommand));
        break;
      case "rn":
        const arrArgsRename = getArrArguments(argsAfterCommand);
        throwErrorAboutPath(arrArgsRename);
        await rename([arrArgsRename[0], arrArgsRename[1]]);
        break;
      case "cp":
        const arrArgsCopy = getArrArguments(argsAfterCommand);
        throwErrorAboutPath(arrArgsCopy);
        await copy([arrArgsCopy[0], arrArgsCopy[1]]);
        break;
      case "mv":
        const arrArgsMove = getArrArguments(argsAfterCommand);
        throwErrorAboutPath(arrArgsMove);
        await move([arrArgsMove[0], arrArgsMove[1]]);
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
      case "compress":
        const arrArgsCompress = getArrArguments(argsAfterCommand);
        throwErrorAboutPath(arrArgsCompress);
        await compress([arrArgsCompress[0], arrArgsCompress[1]]);
        break;
      case "decompress":
        const arrArgsDecompress = getArrArguments(argsAfterCommand);
        throwErrorAboutPath(arrArgsDecompress);
        await decompress([arrArgsDecompress[0], arrArgsDecompress[1]]);
        break;
      default:
        stdout.write("Invalid input");
    }
  } catch (error) {
    stdout.write("Invalid input");
  }
  console.log(`\nYou are currently in ${process.cwd()}\n`);
});

process.on("SIGINT", () => {
  sayBye(userName);
});

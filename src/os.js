import { cpus, EOL, homedir, userInfo, arch } from "os";

export async function getInfoFromOs(argsAfterCommand) {
  switch (argsAfterCommand) {
    case "--EOL":
      console.log(JSON.stringify(EOL));
      break;
    case "--cpus":
      const result = cpus().map(({ model, speed }) => {
        return {
          model,
          speed: `${speed / 1000}GHz`,
        };
      });
      console.table(result);
      break;
    case "--homedir":
      console.log(homedir());
      break;
    case "--username":
      console.log(userInfo().username);
      break;
    case "--architecture":
      console.log(arch());
      break;
    default:
      console.log("Invalid input");
  }
}

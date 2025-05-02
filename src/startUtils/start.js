import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { EOL } from "node:os";
import { ERROR } from "../constants/constants.js";

async function start() {
  const commands = {
    up: (params) => console.log("up", params),
    cd: (params) => console.log("cd", params),
    ls: (params) => console.log("ls", params),
  };

  const rl = readline.createInterface(stdin, stdout);
  rl.on("SIGINT", () => {
    process.exit();
  });

  while (true) {
    const currentDirectory = "user";
    const answer = await rl.question(
      `\nYou are currently in ${currentDirectory}${EOL}${EOL}>`
    );

    if (answer.trim() === ".exit") {
      process.exit();
    }

    try {
      const [command, ...params] = answer.split(" ");
      commands[command](params);
    } catch {
      console.error(ERROR.INVALID_INPUT);
    }
  }
}

export { start };

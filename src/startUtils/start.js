import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { EOL } from "node:os";
import { ERROR } from "../constants/constants.js";
import { setData } from "./setData.js";
import { parseArgs } from "./parseArgs.js";

async function start() {
  const { nwd, commands } = setData();

  const rl = readline.createInterface(stdin, stdout);
  rl.on("SIGINT", () => {
    process.exit();
  });

  while (true) {
    const answer = await rl.question(
      `\nYou are currently in ${nwd.currentDirectory}${EOL}${EOL}>`
    );

    if (answer.trim() === ".exit") {
      process.exit();
    }

    try {
      const [command, ...params] = answer.split(" ");
      await commands[command](parseArgs(params));
    } catch (err) {
      console.error(
        err.message === ERROR.OPERATION_FAILED
          ? ERROR.OPERATION_FAILED
          : ERROR.INVALID_INPUT
      );
    }
  }
}

export { start };

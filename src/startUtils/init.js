import { PREFIX_USER_NAME } from "../constants/constants.js";
import { stdout, argv } from "node:process";
import { EOL } from "node:os";

function init() {
  let exit_message = `For start application you must pass your username.\nPlease run the application with the command:  npm run start -- ${PREFIX_USER_NAME}your_username`;

  process.on("exit", () => {
    stdout.write(`${EOL}${exit_message}${EOL}`);
  });

  process.on("SIGINT", () => {
    process.exit();
  });

  const argument = argv.slice(2);
  if (!argument.length) {
    process.exit();
  }

  exit_message = `Invalid arguments \nPlease run the application with the command:  npm run start -- ${PREFIX_USER_NAME}your_username`;
  const userNameInArgs = argument.filter((arg) =>
    arg.startsWith(PREFIX_USER_NAME)
  );
  if (userNameInArgs.length === 1) {
    const [user] = userNameInArgs;
    const userName = user.replace(PREFIX_USER_NAME, "");
    exit_message = `Thank you for using File Manager, ${userName}, goodbye!`;
    stdout.write(`Welcome to the File Manager, ${userName}!${EOL}${EOL}`);
  }
}

export { init };

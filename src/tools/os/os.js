import { homedir, EOL, cpus, userInfo, arch } from "node:os";
import { stdout } from "node:process";
import { ERROR } from "../../constants/constants.js";

class OsData {
  #homedir;
  constructor() {
    this.#homedir = homedir();
    this.commands = {
      EOL: this.getEOL,
      cpus: this.getCpus,
      homedir: this.getHomedir,
      username: this.getUsername,
      architecture: this.getArchitecture,
    };
  }
  get homedir() {
    return this.#homedir;
  }

  getOsData = async ([arg]) => {
    try {
      this.commands[arg.slice(2)]();
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };

  getEOL = () => {
    stdout.write(`${EOL}${JSON.stringify(EOL)}${EOL}`);
  };

  getCpus = () => {
    const cpusInfo = cpus().map(({ model, speed }) => ({
      Model: model,
      Speed: `${speed / 1000} GHz`,
    }));
    stdout.write(`${EOL}Machine has ${cpusInfo.length} CPUs.${EOL}`);
    console.table(cpusInfo);
  };

  getHomedir = () => {
    stdout.write(`${EOL}Home dir is: ${this.homedir}${EOL}`);
  };

  getUsername = () => {
    stdout.write(`${EOL}User name: ${userInfo().username}${EOL}`);
  };

  getArchitecture = () => {
    stdout.write(`${EOL}${arch()}${EOL}`);
  };
}

export { OsData };

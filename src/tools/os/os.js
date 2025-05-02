import { homedir } from "node:os";

class OsData {
  #homedir;
  constructor() {
    this.#homedir = homedir();
  }
  get homedir() {
    return this.#homedir;
  }
}

export { OsData };

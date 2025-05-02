class NWD {
  #currentDirectory;
  constructor(currentDirectory) {
    this.#currentDirectory = currentDirectory;
  }

  get currentDirectory() {
    return this.#currentDirectory;
  }
}

export { NWD };

import { resolve } from "node:path";
import { access, constants, readdir } from "node:fs/promises";
import { ERROR } from "../../constants/constants.js";

class NWD {
  #currentDirectory;
  constructor(currentDirectory) {
    this.#currentDirectory = currentDirectory;
  }

  get currentDirectory() {
    return this.#currentDirectory;
  }

  up = () => {
    this.#currentDirectory = resolve(this.#currentDirectory, "..");
  };

  cd = async (args) => {
    const newDir = this.getPathWithSpace(args);
    const isDirExist = await this.isPathExist(newDir);
    if (isDirExist) {
      this.#currentDirectory = newDir;
    } else {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };

  ls = async (...newPatch) => {
    try {
      const pathToDirectory = this.getPathWithSpace(newPatch);
      const filesList = await readdir(pathToDirectory, {
        withFileTypes: true,
      });

      const sortedList = filesList.sort((a, b) =>
        a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1
      );
      const [dirs, files] = sortedList.reduce(
        (acc, file) => {
          if (file.isDirectory()) {
            acc[0].push({ Name: file.name, Type: "directory" });
          } else if (file.isFile()) {
            acc[1].push({ Name: file.name, Type: "file" });
          }
          return acc;
        },
        [[], []]
      );
      console.table([...dirs, ...files]);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };

  getPathWithSpace = (newPatch) => {
    let resolvedPath = newPatch.join(" ");
    if (resolvedPath.endsWith(":")) {
      resolvedPath += "/";
    }
    return newPatch
      ? resolve(this.#currentDirectory, resolvedPath)
      : this.#currentDirectory;
  };

  isPathExist = async (pathToFile) => {
    try {
      await access(pathToFile, constants.F_OK);
      return true;
    } catch {
      return false;
    }
  };
}

export { NWD };

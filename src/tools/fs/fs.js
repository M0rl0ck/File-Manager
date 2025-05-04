import { createReadStream, createWriteStream } from "node:fs";
import { writeFile, mkdir as mkd, rename, rm as del } from "node:fs/promises";
import { stdout } from "node:process";
import { ERROR } from "../../constants/constants.js";
import { pipeline } from "node:stream/promises";
import { basename } from "node:path";

class FileSystem {
  constructor(nwd) {
    this.nwd = nwd;
  }

  cat = async (pathToFile) => {
    const pathToReadingFile = this.nwd.getPathWithSpace(pathToFile);

    try {
      const input = createReadStream(pathToReadingFile, { encoding: "utf-8" });
      stdout.write("\n");
      await pipeline(input, stdout, { end: false });
      stdout.write("\n");
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };

  add = async (pathToFile) => {
    const pathToNewFile = this.nwd.getPathWithSpace(pathToFile);
    try {
      await writeFile(pathToNewFile, "", { flag: "wx" });
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };

  mkdir = async (pathToDir) => {
    const pathToNewDir = this.nwd.getPathWithSpace(pathToDir);
    try {
      await mkd(pathToNewDir);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };

  rn = async ([pathToFile, pathToNewFile]) => {
    const pathToSourceFile = this.nwd.getPath(pathToFile);
    const pathToDestinationFile = this.nwd.getPath(pathToNewFile);
    try {
      if (await this.nwd.isPathExist(pathToDestinationFile)) {
        throw new Error();
      }
      await rename(pathToSourceFile, pathToDestinationFile);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };

  cp = async ([pathToFile, pathToNewDir]) => {
    try {
      const pathToSourceFile = this.nwd.getPath(pathToFile);
      const isFileExist = await this.nwd.isPathExist(pathToSourceFile);
      if (!isFileExist) {
        throw new Error();
      }
      const nameFile = basename(pathToSourceFile);
      const pathToDestinationFile = this.nwd.getPath(pathToNewDir, nameFile);

      const input = createReadStream(pathToSourceFile);
      const output = createWriteStream(pathToDestinationFile, { flags: "wx" });
      await pipeline(input, output);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };

  rm = async (pathToFile) => {
    try {
      const pathToDeletingFile = this.nwd.getPathWithSpace(pathToFile);
      await del(pathToDeletingFile);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };

  mv = async ([pathToFile, pathToNewDir]) => {
    try {
      await this.cp([pathToFile, pathToNewDir]);
      await this.rm([pathToFile]);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };
}

export { FileSystem };

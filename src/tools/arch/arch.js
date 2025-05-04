import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { ERROR } from "../../constants/constants.js";
import { pipeline } from "node:stream/promises";

class Arch {
  constructor(nwd) {
    this.nwd = nwd;
  }

  compress = async ([pathToFile, pathToNewFile]) => {
    try {
      const { input, output } = await this.getStreams(
        pathToFile,
        pathToNewFile
      );
      await pipeline(input, createBrotliCompress(), output);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };

  decompress = async ([pathToFile, pathToNewFile]) => {
    try {
      const { input, output } = await this.getStreams(
        pathToFile,
        pathToNewFile
      );
      await pipeline(input, createBrotliDecompress(), output);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };

  getStreams = async (pathToFile, pathToNewFile) => {
    const pathToSourceFile = this.nwd.getPath(pathToFile);
    const isFileExist = await this.nwd.isPathExist(pathToSourceFile);
    if (!isFileExist) {
      throw new Error();
    }
    const pathToDestinationFile = this.nwd.getPath(pathToNewFile);
    const input = createReadStream(pathToSourceFile);
    const output = createWriteStream(pathToDestinationFile, { flags: "wx" });
    return { input, output };
  };
}

export { Arch };

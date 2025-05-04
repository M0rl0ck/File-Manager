import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { stdout } from "node:process";
import { ERROR } from "../../constants/constants.js";
import { pipeline } from "node:stream/promises";
import { EOL } from "node:os";

class Crypto {
  constructor(nwd) {
    this.nwd = nwd;
  }

  calculateHash = async (pathToFile) => {
    try {
      const pathToCalculatingFile = this.nwd.getPathWithSpace(pathToFile);
      const hash = createHash("sha256");
      const input = createReadStream(pathToCalculatingFile);
      stdout.write(`${EOL} File ${pathToFile.join(" ")} hash: `);
      await pipeline(input, hash.setEncoding("hex"), stdout, { end: false });
      stdout.write(EOL);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };
}

export { Crypto };

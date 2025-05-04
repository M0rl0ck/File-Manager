import { OsData, NWD, FileSystem, Crypto, Arch } from "../tools/index.js";

function setData() {
  const osData = new OsData();
  const nwd = new NWD(osData.homedir);
  const fs = new FileSystem(nwd);
  const crypto = new Crypto(nwd);
  const arch = new Arch(nwd);

  const commands = {
    up: nwd.up,
    cd: nwd.cd,
    ls: nwd.ls,
    cat: fs.cat,
    add: fs.add,
    mkdir: fs.mkdir,
    rn: fs.rn,
    cp: fs.cp,
    mv: fs.mv,
    rm: fs.rm,
    os: osData.getOsData,
    hash: crypto.calculateHash,
    compress: arch.compress,
    decompress: arch.decompress,
  };
  return { nwd, commands };
}

export { setData };

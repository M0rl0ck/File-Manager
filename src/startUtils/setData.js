import { OsData, NWD, FileSystem } from "../tools/index.js";

function setData() {
  const osData = new OsData();
  const nwd = new NWD(osData.homedir);
  const fs = new FileSystem(nwd);

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
  };
  return { nwd, commands };
}

export { setData };

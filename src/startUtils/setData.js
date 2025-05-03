import { OsData, NWD } from "../tools/index.js";

function setData() {
  const osData = new OsData();
  const nwd = new NWD(osData.homedir);

  const commands = {
    up: nwd.up,
    cd: nwd.cd,
    ls: nwd.ls,
  };
  return { nwd, commands };
}

export { setData };

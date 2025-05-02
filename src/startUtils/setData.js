import { OsData, NWD } from "../tools/index.js";

function setData() {
  const osData = new OsData();
  const nwd = new NWD(osData.homedir);

  const commands = {
    up: (params) => console.log("up", params),
    cd: (params) => console.log("cd", params),
    ls: (params) => console.log("ls", params),
  };
  return { nwd, commands };
}

export { setData };

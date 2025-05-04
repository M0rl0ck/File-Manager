function parseArgs(args) {
  const argsStr = args.join(" ");
  const regex = /"([^"]+)"|'([^']+)'|(\S+)/g;
  let newArgs = [];
  let match;

  while ((match = regex.exec(argsStr)) !== null) {
    const arg = match[1] || match[2] || match[3];
    newArgs.push(arg);
  }

  return newArgs;
}

export { parseArgs };

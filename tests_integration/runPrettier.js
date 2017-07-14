/*
 * runPrettier – spawns `prettier` process.
 * Adopted from Jest's integration tests suite.
 */
"use strict";

const path = require("path");
const spawnSync = require("cross-spawn").sync;

const PRETTIER_PATH = path.resolve(__dirname, "../bin/prettier.js");

// return the result of the spawned process:
//  [ 'status', 'signal', 'output', 'pid', 'stdout', 'stderr',
//    'envPairs', 'options', 'args', 'file' ]
function runPrettier(dir, args, options, consoleLog) {
  const isRelative = dir[0] !== "/";

  if (isRelative) {
    dir = path.resolve(__dirname, dir);
  }

  consoleLog && console.log('before spawnSync', dir, args, options);
  const result = spawnSync(
    'node',
    [PRETTIER_PATH].concat(args || []),
    Object.assign({}, options, { cwd: dir })
  );

  result.stdout = result.stdout && result.stdout.toString();
  result.stderr = result.stderr && result.stderr.toString();

  consoleLog && console.log('after spawnSync', {
    status: result.status,
    stdout: result.stdout,
    stderr: result.stderr,
    envPairsLength: result.envPairs.length,
    options: {
      cwd: result.options.cwd,
      file: result.options.file,
      args: result.options.args,
      envPairsLength: result.options.envPairs.length,
      stdio: result.options.stdio
    },
    args: result.args,
    file: result.file,
    error: result.error
  });
  return result;
}

module.exports = runPrettier;

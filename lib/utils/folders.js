var fs      = require('fs'),
    shell   = require('shelljs'),
    strings = require('./strings');

module.exports = {
  create    : create,
  exists    : exists,
};

function exists(folderPath){
  try {
    fs.accessSync(folderPath);
  } catch (ex) {
    return false;
  }
  var stats = fs.statSync(folderPath);
  return (!stats.isFile() && stats.isDirectory());
}

function create(folderPath){
  if (exists(folderPath)){ return true; }
  try {
    shell.mkdir('-p', folderPath);
  } catch (ex) {

  }
  return exists(folderPath);
}

var folders = require('./folders'),
    fs      = require('fs'),
    path    = require('path'),
    os      = require('os'),
    strings = require('./strings');

module.exports = {
  contents    : contents,
  exists      : exists,
  remove      : remove,
  write       : write
};

function contents(filePath, options){
  if (!exists(filePath)) { return undefined; }
  options = options || 'utf8';
  return fs.readFileSync(filePath, options);
}
function remove(filePath) {
  if (!exists(filePath)) { return true; }
  try {
    fs.unlinkSync(filePath);
  } catch (ex) {
  }
  return (!exists(filePath));
}
function exists(filePath, accessMode){
  try {
    fs.accessSync(filePath, accessMode);
  } catch (ex) {
    return false;
  }
  var stats = fs.statSync(filePath);
  return (stats.isFile() && !stats.isDirectory());
}
function write(textOrLines, filePath, overwrite) {
  if (exists(filePath) && !overwrite) { return false; }
  if (typeof textOrLines === 'undefined') { return false; }
  if (typeof textOrLines === 'object' && textOrLines instanceof Array) {
    textOrLines = textOrLines.join(os.EOL);
  }
  if (typeof textOrLines !== 'string') { return false; }
  if (exists(filePath)) { remove(filePath); }
  if (exists(filePath)) { return false; }
  if (!folders.create(path.dirname(filePath))) { return false; }
  fs.writeFileSync(filePath, textOrLines);
  var test = contents(filePath);
  return (test.length > 0);
}

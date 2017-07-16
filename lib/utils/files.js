var fs      = require('fs'),
    strings = require('./strings');

module.exports = {
  contents  : contents,
  exists    : exists,
};

function contents(filePath, options){
  if (!exists(filePath)) { return undefined; }
  options = options || 'utf8';
  return fs.readFileSync(filePath, options);
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

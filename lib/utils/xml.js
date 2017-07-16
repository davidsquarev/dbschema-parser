var booleans  = require('./booleans'),
    files     = require('./files'),
    objects   = require('./objects'),
    strings   = require('./strings'),
    xml       = require('xml2json');

module.exports = {
  toJson  : toJson
};

function toJson(pathOrXml, options){
  options = getOptions(options);
  if (!strings.isValid(pathOrXml)){ return undefined; }
  if (files.exists(pathOrXml)) {
    pathOrXml = files.contents(pathOrXml);
  }
  return xml.toJson(pathOrXml, options);
}

function getOptions(options) {
  options = objects.ifValid(options, {});
  return {
    object            : booleans.ifValid(options.object, false),
    reversible        : booleans.ifValid(options.reversible, false),
    coerce            : booleans.ifValid(options.coerce, false),
    sanitize          : booleans.ifValid(options.sanitize, true),
    trim              : booleans.ifValid(options.trim, true),
    arrayNotation     : booleans.ifValid(options.arrayNotation, false),
    alternateTextNode : booleans.ifValid(options.alternateTextNode, false)
  };
}

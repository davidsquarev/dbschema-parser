var _       = require('../utils'),
    Schema  = require('./schema');

module.exports = Database;

function Database(rawProject, parser){
  this.parser   = parser;
  this.project  = rawProject;

  this.name     = rawProject.name;
  this.id       = rawProject.id;
  this.template = rawProject.template;
  this.type     = rawProject.database;

  var _schemas = [];
  this.schemas = _schemas;
  this.schema  = function(name){
    return _schemas.find(function(item){
      return (item.name.toLowerCase() === name.toLowerCase());
    });
  };

  var parent = this;

  [].concat(rawProject.schema).filter(function(item){
    return (typeof item !== 'undefined');
  }).forEach(function(rawSchema){
    var schema = new Schema(rawSchema, parent);
    if (schema) { _schemas.push(schema); }
  });

  // Print
  this.print = function (length, spacing) {
    var prefix = _.strings.spaces(length);
    console.log(prefix + 'Database: ' + this.name);
    length = length + spacing;
    this.schemas.forEach(function(schema){
      schema.print(length, spacing);
    });
  }
}

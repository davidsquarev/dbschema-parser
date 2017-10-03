var _       = require('../utils'),
    Schema  = require('./schema');

module.exports = Database;

function Database(rawProject, parser){

  var me = this;

  me.parser   = parser;
  me.project  = rawProject;

  me.name     = rawProject.name;
  me.fullName = rawProject.name;
  me.id       = rawProject.id;
  me.template = rawProject.template;
  me.type     = rawProject.database;
  me.schemas  = [];

  // Accessors ---------------------------------------------------------

  me.schema = function(name){
    return me.schemas.find(function(item){
      return (item.name.toLowerCase() === name.toLowerCase());
    });
  };
  
  // Load Children -----------------------------------------------------

  [].concat(rawProject.schema).filter(function(item){
    return (typeof item !== 'undefined');
  }).forEach(function(rawSchema){
    var schema = new Schema(rawSchema, me);
    if (schema) { me.schemas.push(schema); }
  });

  // Utility -----------------------------------------------------------

  me.print = function (length, spacing) {
    var prefix = _.strings.spaces(length);
    console.log(prefix + 'Database: ' + me.name);
    length = length + spacing;
    this.schemas.forEach(function(schema){
      schema.print(length, spacing);
    });
  };
}

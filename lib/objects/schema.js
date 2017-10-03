var _       = require('../utils'),
    Table   = require('./table');

module.exports = Schema;

function Schema(rawSchema, database){

  var me = this;

  me.database = database;
  me.schema   = rawSchema;
  me.name     = rawSchema.name;
  me.fullName = database.name + '.' + rawSchema.name;
  me.tables   = [];
  me.views    = [];

  // Accessors ---------------------------------------------------------

  me.table = function(name){
    return me.tables.find(function(item){
      return (item.name.toLowerCase() === name.toLowerCase());
    });
  };

  me.view = function(name){
    return me.views.find(function(item){
      return (item.name.toLowerCase() === name.toLowerCase());
    });
  };
  
  // Load Children -----------------------------------------------------

  [].concat(rawSchema.table).filter(function(item){
    return (typeof item !== 'undefined');
  }).forEach(function(rawTable){
    var table = new Table(rawTable, me, true);
    if (table) { me.tables.push(table); }
  });

  [].concat(rawSchema.view).filter(function(item){
    return (typeof item !== 'undefined');
  }).forEach(function(rawView){
    var view = new Table(rawView, me, false);
    if (view) { me.views.push(view); }
  });

  // Utility -----------------------------------------------------------

  me.print = function (length, spacing) {
    var prefix = _.strings.spaces(length);
    console.log(prefix + 'Schema: ' + me.name);
    length = length + spacing;
    me.tables.forEach(function(table){
      table.print(length, spacing);
    });
    me.views.forEach(function(view){
      view.print(length, spacing);
    });
  };
}

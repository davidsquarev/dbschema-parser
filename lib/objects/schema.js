var _       = require('../utils'),
    Table   = require('./table');

module.exports = Schema;

function Schema(rawSchema, database){
  this.database = database;
  this.schema   = rawSchema;

  this.name     = rawSchema.name;

  var _tables = [];
  this.tables = _tables;
  this.table  = function(name){
    return _tables.find(function(item){
      return (item.name.toLowerCase() === name.toLowerCase());
    });
  };

  var _views = [];
  this.views = _views;
  this.view  = function(name){
    return _views.find(function(item){
      return (item.name.toLowerCase() === name.toLowerCase());
    });
  };

  var parent = this;

  [].concat(rawSchema.table).filter(function(item){
    return (typeof item !== 'undefined');
  }).forEach(function(rawTable){
    var table = new Table(rawTable, parent, true);
    if (table) { _tables.push(table); }
  });

  [].concat(rawSchema.view).filter(function(item){
    return (typeof item !== 'undefined');
  }).forEach(function(rawView){
    var view = new Table(rawView, parent, false);
    if (view) { _views.push(view); }
  });

  // Print
  this.print = function (length, spacing) {
    var prefix = _.strings.spaces(length);
    console.log(prefix + 'Schema: ' + this.name);
    length = length + spacing;
    this.tables.forEach(function(table){
      table.print(length, spacing);
    });
    this.views.forEach(function(view){
      view.print(length, spacing);
    });
  }
}

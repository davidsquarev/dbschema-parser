var _ = require('../utils');

var UNIQUE = 'UNIQUE';
var PRIMARY_KEY = 'PRIMARY_KEY';
var UNIQUE_TYPES = [ UNIQUE, PRIMARY_KEY ];

module.exports = TableIndex;

function TableIndex(rawIndex, table){

  var me = this;

  me.table      = table;
  me.index      = rawIndex;
  me.name       = rawIndex.name;
  me.fullName   = table.fullName + '.' + rawIndex.name;
  me.type       = rawIndex.unique;
  me.isUnique   = (UNIQUE_TYPES.indexOf(rawIndex.unique) >= 0);
  me.isPrimary  = (rawIndex.unique === PRIMARY_KEY);
  me.columns    = [];

  // Accessors ---------------------------------------------------------

  me.column = function(name){
    return me.columns.find(function(item){
      return (item.name.toLowerCase() === name.toLowerCase());
    });
  };
  
  /// Load Children ----------------------------------------------------

  [].concat(rawIndex.column).filter(function(item){
    return (typeof item !== 'undefined');
  }).forEach(function(item){
    var column = table.column(item.name);
    column.isPrimary = me.isPrimary;
    me.columns.push(column);
  });

  // Utility -----------------------------------------------------------

  me.print = function (length, spacing) {
    var prefix = _.strings.spaces(length);
    var suffix = ' (' + me.type + ')';
    console.log(prefix + 'Index: ' + me.name + suffix);
    length = length + spacing;
    me.columns.forEach(function(column){
      column.print(length, spacing);
    });
  };
}

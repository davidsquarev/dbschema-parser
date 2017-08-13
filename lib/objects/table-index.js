var _ = require('../utils');

var UNIQUE = 'UNIQUE';
var PRIMARY_KEY = 'PRIMARY_KEY';
var UNIQUE_TYPES = [ UNIQUE, PRIMARY_KEY ];

module.exports = TableIndex;

function TableIndex(rawIndex, table){
  this.table = table;
  this.index = rawIndex;

  this.name  = rawIndex.name;
  this.type  = rawIndex.unique;
  this.isUnique = (UNIQUE_TYPES.indexOf(rawIndex.unique) >= 0);
  this.isPrimary = (rawIndex.unique === PRIMARY_KEY);

  var _columns = [];
  this.columns = _columns;
  this.column = function(name){
    return _columns.find(function(item){
      return (item.name.toLowerCase() === name.toLowerCase());
    });
  };

  var me = this;

  [].concat(rawIndex.column).filter(function(item){
    return (typeof item !== 'undefined');
  }).forEach(function(item){
    var column = table.column(item.name);
    column.isPrimary = me.isPrimary;
    _columns.push(column);
  });

  // Print
  this.print = function (length, spacing) {
    var prefix = _.strings.spaces(length);
    var suffix = ' (' + this.type + ')';
    console.log(prefix + 'Index: ' + this.name + suffix);
    length = length + spacing;
    this.columns.forEach(function(column){
      column.print(length, spacing);
    });
  };
}

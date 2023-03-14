var _       = require('../utils'),
    Column  = require('./column'),
    TableIndex  = require('./table-index');

module.exports = Table;

function Table(rawTable, schema, isView){

  var me = this;

  me.schema     = schema;
  me.table      = rawTable;
  me.name       = rawTable.name;
  me.fullName   = schema.fullName + '.' + rawTable.name;
  me.isView     = (isView === true || isView === false) ? isView : false;
  me.columns    = [];
  me.indexes    = [];
  me.keyColumns = [];

  // Accessors ---------------------------------------------------------

  me.column = function(name){
    return me.columns.find(function(item){
      return (item.name.toLowerCase() === name.toLowerCase());
    });
  };

  me.index = function(name){
    return me.indexes.find(function(item){
      return (item.name.toLowerCase() === name.toLowerCase());
    });
  };
  
  // Load Children -----------------------------------------------------

  [].concat(rawTable.column).filter(function(item){
    return (typeof item !== 'undefined');
  }).forEach(function(rawColumn){
    var column = new Column(rawColumn, me);
    if (column) { me.columns.push(column); }
  });

  [].concat(rawTable.index).filter(function(item){
    return (typeof item !== 'undefined');
  }).forEach(function(rawIndex){
    var index = new TableIndex(rawIndex, me);
    if (index) { me.indexes.push(index); }
  });

  [].concat(rawTable.fk).filter(function(item){
    return (typeof item !== 'undefined');
  }).forEach(function(fk){
    var col = me.columns.find(function(item){
      return (item.name === fk.fk_column.name);
    });
    if(col){
      col.primary = {
        key: {
          name: fk.name
        },
        schema: {
          name: fk.to_schema
        },
        table: {
          name: fk.to_table
        },
        column: {
          name: (fk.fk_column || {}).pk
        }
      };
    }
  });

  me.indexes.filter(function(item){
    return item.isPrimary;
  }).forEach(function(item){
    item.columns.forEach(function(col){
      col.isPrimary = true;
      me.keyColumns.push(col);
    });
  });

  // Utility -----------------------------------------------------------

  me.print = function (length, spacing) {
    var prefix = _.strings.spaces(length);
    console.log(prefix + 'Table: ' + me.name);
    length = length + spacing;
    me.columns.forEach(function(column){
      column.print(length, spacing, true);
    });
    me.indexes.forEach(function(index){
      index.print(length, spacing);
    });
  };
}

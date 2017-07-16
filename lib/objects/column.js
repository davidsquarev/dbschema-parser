var _       = require('../utils');

module.exports = Column;

function Column(rawColumn, table){
  this.table  = table;
  this.column = rawColumn;

  this.name       = rawColumn.name;
  this.type       = rawColumn.type;
  this.length     = _.numbers.parse(rawColumn.length);
  this.jt         = _.numbers.parse(rawColumn.jt);
  this.mandatory  = _.booleans.parse(rawColumn.mandatory);

  // Print
  this.print = function (length, spacing, printRelationships) {
    var prefix = _.strings.spaces(length);
    console.log(prefix + 'Column: ' + this.name);

    var origLength = length;

    length = length + spacing;
    if (this.primary) {
        prefix = _.strings.spaces(length);
        console.log(prefix + 'Primary:');

        length = length + spacing;
        prefix = _.strings.spaces(length);
        console.log(prefix + 'Schema: ' + this.primary.schema.name);
        console.log(prefix + 'Table:  ' + this.primary.table.name);
        console.log(prefix + 'Column: ' + this.primary.column.name);
    }

    if (printRelationships && this.relationships && this.relationships.length > 0) {
      length = origLength;
      length = length + spacing;

      prefix = _.strings.spaces(length);
      console.log(prefix + 'Relationships:');

      length = length + spacing;
      prefix = _.strings.spaces(length);

      this.relationships.forEach(function(column){
        console.log(prefix + [
          column.table.schema.database.name,
          column.table.schema.name,
          column.table.name,
          column.name,
        ].join('.'));
      });
    }
  }
}

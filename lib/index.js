var _   = require('./utils'),
    obj = require('./objects');

var DEFAULT_SPACING = 4;
var MAX_SPACING = 10;

module.exports = {
  Parser : Parser
};

function Parser(path){
  this.path   = path;
  this.xml    = _.files.contents(this.path);
  this.object = _.xml.toJson(this.xml, { object: true });
  this.json   = JSON.stringify(this.object, null, 2);

  var _databases = [];
  this.databases = _databases;
  this.database = function(name){
    return _databases.find(function(item){
      return (item.name.toLowerCase() === name.toLowerCase());
    });
  };

  var parent = this;

  [].concat(this.object.project).filter(function(item){
    return (typeof item !== 'undefined');
  }).forEach(function(rawProject){
    var database = new obj.Database(rawProject, parent);
    if (database) { _databases.push(database); }
  });

  // Wire foreign key items
  _databases.forEach(function(db){
    db.schemas.forEach(function(schema){
      schema.tables.forEach(function(table){
        table.columns.filter(function(column){
          return (typeof column.primary !== 'undefined');
        }).forEach(function(column){

          var p = column.primary;
          p.schema.item = db.schema(p.schema.name);
          p.table.item  = p.schema.item ? p.schema.item.table(p.table.name) : undefined;
          p.column.item = p.table.item ? p.table.item.column(p.column.name) : undefined;

          if (p.column.item){
            p.column.item.relationships = p.column.item.relationships || [];
            if (p.column.item.relationships.indexOf(column) < 0) {
              p.column.item.relationships.push(column);
            }
          }
        });
      });
      schema.views.forEach(function(views){
        views.columns.filter(function(column){
          return (typeof column.primary !== 'undefined');
        }).forEach(function(column){

          var p = column.primary;
          p.schema.item = db.schema(p.schema.name);
          p.table.item  = p.schema.item ? p.schema.item.table(p.table.name) : undefined;
          p.column.item = p.table.item ? p.table.item.column(p.column.name) : undefined;

          if (p.column.item){
            p.column.item.relationships = p.column.item.relationships || [];
            if (p.column.item.relationships.indexOf(column) < 0) {
              p.column.item.relationships.push(column);
            }
          }
        });
      });
    });
  });

  // Print
  this.print = function (spacing) {
    spacing = _.numbers.ifValid(spacing) ? _.numbers.parse(spacing) : DEFAULT_SPACING;
    if (spacing < 1 || spacing > MAX_SPACING) { spacing = MAX_SPACING; }
    _databases.forEach(function(db){
      db.print(0, spacing);
    });
  }
}

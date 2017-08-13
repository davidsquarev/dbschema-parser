var _   = require('./utils'),
    obj = require('./objects');

var DEFAULT_SPACING = 4;
var MAX_SPACING = 10;

module.exports = {
  _       : _,
  Parser  : Parser
};

function Parser(path){
  var me = this;

  me._      = _;
  me.path   = path;
  me.xml    = _.files.contents(me.path);
  me.object = _.xml.toJson(me.xml, { object: true });
  me.json   = JSON.stringify(me.object, null, 2);

  me.databases = [];
  me.database = function(name){
    return me.databases.find(function(item){
      return (item.name.toLowerCase() === name.toLowerCase());
    });
  };

  [].concat(me.object.project).filter(function(item){
    return (typeof item !== 'undefined');
  }).forEach(function(rawProject){
    var database = new obj.Database(rawProject, me);
    if (database) { me.databases.push(database); }
  });

  // Wire foreign key items
  me.databases.forEach(function(db){
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
            if (p.column.item.relationships.indexOf(column) < 0) {
              p.column.item.relationships.push(column);
            }
          }
        });
      });
    });
  });

  // Print
  me.print = function (spacing) {
    spacing = _.numbers.ifValid(spacing) ? _.numbers.parse(spacing) : DEFAULT_SPACING;
    if (spacing < 1 || spacing > MAX_SPACING) { spacing = MAX_SPACING; }
    me.databases.forEach(function(db){
      db.print(0, spacing);
    });
  };
}

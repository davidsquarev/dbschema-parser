var moment = require('moment');

module.exports = {
  blockdate : blockdate,
  ifValid   : ifValid,
  isValid   : isValid
};

function isValid(value) {
  if (typeof value === 'undefined') { return false; }
  return (Object.prototype.toString.call(value) === '[object Date]');
}
function ifValid(value, defaultValue) {
  return isValid(value) ? value : defaultValue;
}

function blockdate(value){
  value = ifValid(value, (new Date()));
  var result = moment(value).format('YYYYMMDDHHmmss');
  return '' + result;
}

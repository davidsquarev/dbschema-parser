var booleans  = require('./booleans'),
    numbers   = require('./numbers');

module.exports = {
  ifValid : ifValid,
  isValid : isValid,
  repeat  : repeat,
  spaces  : spaces
};

// -----------------------------------------------------------------------------

function isValid(value, isEmptyOkay) {
  if (typeof value !== 'string') { return false; }
  isEmptyOkay = (isEmptyOkay === true || isEmptyOkay === false) ? isEmptyOkay : false;
  return (isEmptyOkay || value.trim().length > 0);
}

function ifValid(value, defaultValue, isEmptyOkay) {
  return isValid(value, isEmptyOkay) ? value : defaultValue;
}

function repeat(char, length){
  if (typeof char !== 'string') { char = ' '; }
  length = numbers.ifValid(length) ? numbers.parse(length) : 0;
  var result = '';
  while(result.length < length){
    result += char;
  }
  return result;
}
function spaces(length){
  return repeat(' ', length);
}

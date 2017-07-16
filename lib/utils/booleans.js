var TRUE_STINGS   = ['yes', 'y', 'true', 't', 'on', '1', 'valid'];
var FALSE_STINGS  = ['no', 'n', 'false', 'f', 'off', '0', '-1', 'invalid'];
var TRUE_VALUES   = TRUE_STINGS.concat(1, true);
var FALSE_VALUES  = FALSE_STINGS.concat(0, -1, false);
var VALID_STRINGS = [].concat(TRUE_STINGS, FALSE_STINGS);
var VALID_VALUES  = [].concat(TRUE_VALUES, FALSE_VALUES);

var objects = require('./objects');

module.exports = {
  ifValid : ifValid,
  isValid : isValid,
  parse   : parse,
};

// -----------------------------------------------------------------------------

function isValid(value, strict) {
  if (value === true || value === false) { return true; }
  strict = (strict === false || strict === true) ? strict : true;
  if (strict) { return false; }
  if (typeof value === 'string') {
    return (VALID_STRINGS.indexOf(value.trim().toLowerCase()) >= 0);
  } else {
    return (VALID_VALUES.indexOf(value) >= 0);
  }
}
function ifValid(value, defaultValue, strict) {
  return isValid(value, strict) ? value : defaultValue;
}

function parse(value, strict) {
  if (!isValid(value, strict)) { return undefined; }
  if (typeof value === 'string') {
    return (TRUE_STINGS.indexOf(value.trim().toLowerCase()) >= 0);
  } else {
    return (TRUE_VALUES.indexOf(value) >= 0);
  }
}

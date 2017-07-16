module.exports = {
  ifValid : ifValid,
  isValid : isValid,
  parse   : parse
};

function isValid(value) {
  try {
    return (value - 0) == value && ('' + value).trim().length > 0;
  } catch (ex) {
    return false;
  }
}
function ifValid(value, defaultValue){
  return isValid(value) ? value : defaultValue;
}

function parse(value) {
  if (!isValid(value)) { return undefined; }
  return (value - 0);
}

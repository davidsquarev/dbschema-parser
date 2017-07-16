module.exports = {
  ifValid : ifValid,
  isValid : isValid,
};

// -----------------------------------------------------------------------------

function isValid(value) {
  if (typeof value === 'undefined') { return false; }
  if (typeof value !== 'object') { return false; }
  if (value instanceof Array) { return false; }
  return true;
}
function ifValid(value, defaultValue) {
  return isValid(value) ? value : defaultValue;
}

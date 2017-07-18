var booleans  = require('./booleans'),
    numbers   = require('./numbers');

var DIGITS = '0123456789';
var LOWER = 'abcdefghijklmnopqrstuvwxyz';
var UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = {

  DIGITS  : DIGITS,
  LOWER   : LOWER,
  UPPER   : UPPER,

  ifValid : ifValid,

  isDigit     : isDigit,
  isLower     : isLower,
  isSameCase  : isSameCase,
  isSameClass : isSameClass,
  isUpper     : isUpper,
  isValid     : isValid,

  repeat        : repeat,
  spaces        : spaces,
  toCamelCase   : toCamelCase,
  toPascalCase  : toPascalCase,
  toWords       : toWords
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

// -----------------------------------------------------------------------------

function isLower(value, strict) {
  if (typeof value !== 'string') { return false; }
  if (typeof strict === 'undefined') { strict = true; }
  if (strict) {
    return (value === value.split('').filter(function(ch){
      return (LOWER.indexOf(ch) >= 0);
    }).join(''));
  } else {
    return (value === value.toLowerCase());
  }
}
function isUpper(value, strict) {
  if (typeof value !== 'string') { return false; }
  if (typeof strict === 'undefined') { strict = true; }
  if (strict) {
    return (value === value.split('').filter(function(ch){
      return (UPPER.indexOf(ch) >= 0);
    }).join(''));
  } else {
    return (value === value.toUpperCase());
  }
}
function isDigit(value) {
  if (typeof value !== 'string') { return false; }
  return (value === value.split('').filter(function(ch){
    return (DIGITS.indexOf(ch) >= 0);
  }).join(''));
}
function isChar(value){
  return (isLower(value) || isUpper(value) || isDigit(value));
}
function isSameCase(source, target) {
  if (!source || !target) { return false; }
  return ((isUpper(source) && isUpper(target)) ||
          (isLower(source) && isLower(target)) ||
          (isDigit(source) && isDigit(target)));
}
function isSameClass(source, target){
  if (!source || !target) { return false; }
  return ((isDigit(source) && isDigit(target)) ||
          ((isLower(source) || isUpper(source)) && (isLower(target) || isUpper(target))));
}

function toWords(value) {
  var words = [];
  var cur;
  var nnext;
  var last;
  var word = '';
  var chars = value.split('');
  for (var i = 0; i < chars.length; i += 1) {

    cur = value.charAt(i);
    next = value.charAt(i + 1);
    nnext = value.charAt(1 + 2);

    // Delimeter or Invalid
    if (!isChar(cur)) {
      if (word) { words.push(word); }
      last  = '';
      word  = '';
      continue;
    }

    if (!isSameClass(last, cur) ||            // Digits vs Letters
        (isLower(last) && isUpper(cur))) {    // Camel Case separation
      if (word) { words.push(word); }
      last = cur;
      word = cur;
      continue;
    }

    if ((isLower(last) && isLower(cur)) ||
        (isDigit(last) && isDigit(cur)) ||
        (isUpper(last) && isUpper(cur) && (!next || isUpper(next)) && (!nnext || isUpper(nnext)))) {
          last = cur;
          word += cur;
          continue;
        }
  }
  if (word){ words.push(word); }

  return words;
}
function toCamelCase(value){
  var words = toWords(value);
  if (typeof words === 'undefined') { return undefined; }
  if (!(words instanceof Array)) { return undefined; }
  var result = '';
  words.forEach(function(word){
    if (result.length < 1) { result = word.toLowerCase(); }
    else {
      result += word.substr(0, 1).toUpperCase();
      if (word.length > 1) {
        result += word.substr(1).toLowerCase();
      }
    }
  });
  return result;
}
function toPascalCase(value){
  var words = toWords(value);
  if (typeof words === 'undefined') { return undefined; }
  if (!(words instanceof Array)) { return undefined; }
  var result = '';
  words.forEach(function(word){
    result += word.substr(0, 1).toUpperCase();
    if (word.length > 1) {
      result += word.substr(1).toLowerCase();
    }
  });
  return result;
}

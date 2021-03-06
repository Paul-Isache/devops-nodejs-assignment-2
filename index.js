const os = require("os");
const http = require("http");
const url = require("url");

// Write a function that takes a roman numeral as input,
// and returns the number as an integer
// Don't remember roman numerals? Check https://www.mathsisfun.com/roman-numerals.html
const romanNumeralTranslator = (str) => {
  if(!str){
    return 'Invalid number';
  }
  const romanNumbers = new Map();
  romanNumbers.set('M', 1000);
  romanNumbers.set('D', 500);
  romanNumbers.set('C', 100);
  romanNumbers.set('L', 50);
  romanNumbers.set('X', 10);
  romanNumbers.set('V', 5);
  romanNumbers.set('I', 1);

  let currentNumber;
  let nextNumber;

  return str.toUpperCase().split('').reduce((acc, currentDigit, index, numbers) => {
    currentNumber = romanNumbers.get(currentDigit);
    nextNumber = romanNumbers.get(numbers[index + 1]);

    return acc + (((currentNumber >= nextNumber) || (currentNumber && !nextNumber)) ? currentNumber : currentNumber * -1)
  }, 0);
};

const handleRequest = (req, res) => {
  const { roman } = url.parse(req.url, true).query;
  res.write(`Hi there! I'm being served from ${os.hostname()} \n\n`);

  res.write(roman ? `The result of ${roman} conversion is ${romanNumeralTranslator(roman)}` : `Please provide a roman number`);
  
  res.end();
};

http.createServer(handleRequest).listen(3000);

module.exports = romanNumeralTranslator;

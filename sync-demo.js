fs = require('fs');

data = fs.readdirSync('/Users/gbenga/Downloads/');
console.log('data:', data);

console.log("this comes after");
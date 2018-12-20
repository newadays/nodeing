fs = require('fs');

function phoneNumber(err, data){
    console.log('data:', data);
}

fs.readdir('/Users/gbenga/Downloads/', phoneNumber);

console.log("this comes after");
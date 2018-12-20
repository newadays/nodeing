var fs = require('fs');

var data = require("./data.json");

console.log(data.name);

// fs.readFile("./data.json", function(err,data){

// })

fs.readFile("./data.json",'utf-8', (err, data) => {
    var Data = JSON.parse(data); 
    console.log(Data.name);
});
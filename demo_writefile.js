var fs = require("fs");

var data = {
    "name": "Bob"
}

fs.writeFile("datawrite.json", JSON.stringify(data), (err) =>{
    console.log('write finished', err);
});
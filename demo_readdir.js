var fs = require("fs");

fs.readdir("/Users/gbenga/Downloads/", (err,data) =>{
    console.log(data);
});
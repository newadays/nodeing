var express = require('express')
var bodyParser = require('body-parser')
var Request = require('request')
var app = express()


app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.get('/traffic', (req,res) =>{
    Request.get('https://data.cityofchicago.org/resource/m65n-ux8y.json', (err, resp, body)=>{
        if(err){
            return console.dir(error)
        }
            // console.log(resp.body)
            // return resp.body
            res.send(JSON.parse(resp.body))
    })
})

var server = app.listen(3000, () =>{
    console.log('server is listening on port', server.address().port)
})
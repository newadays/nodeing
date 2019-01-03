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
            return console.dir(err)
        }
            // console.log(resp.body)
            // return resp.body
            res.send(JSON.parse(resp.body))
    })
})

app.post('/trafficstats', (req, res) =>{
    Request.get(`https://data.cityofchicago.org/resource/m65n-ux8y.json?$where=region_id=${resp.body._region_id}`,{"headers":{"X-App-Token": "baRUbRLnaRUQk8RGJXpA2ezoV"}}, (err, resp, body)=>{
        if(err){
            return console.dir(err)
        }

        console.log(JSON.parse(resp.body))
    })
    console.log(req.body)
    res.sendStatus(200)
})

var server = app.listen(3000, () =>{
    console.log('server is listening on port', server.address().port)
})
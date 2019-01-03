var express = require('express')
var bodyParser = require('body-parser')
var Request = require('request')
var app = express()


app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

var message = []

var apiReq = Request.get('https://data.cityofchicago.org/resource/m65n-ux8y.json', message, (err, resp, body)=>{
    if(err){
        return console.dir(err)
    }
        (JSON.parse(resp.body)).forEach(element => {
            message.push(element)
        });
})

app.get('/traffic', (req,res) =>{
   res.send(message)
})

app.post('/traffic', (req, res) =>{
    // console.log(req.body)
    // res.sendStatus(200)
    message.forEach(element =>{
            if(element._region_id==req.body.region_id){
                console.log([element])
                res.send([element])

            } else if(element._description==req.body.description){
                res.send([element])
            }
        })
})

var server = app.listen(3000, () =>{
    console.log('server is listening on port', server.address().port)
})
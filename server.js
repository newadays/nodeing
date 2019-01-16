var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

var whitelist = ['http://localhost:8080/','http://localhost:8080/messages', 'https://gbenga-cloud.appspot.com/messages', 'wss://gbenga-cloud.appspot.com/socket.io/']

var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

var messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'}
]

app.get('/messages', cors(corsOptions), (req, res) =>{
    res.send(messages)
})

app.post('/messages', (req,res) =>{
    messages.push(req.body)
    // console.log(req.body)
    io.emit("message",req.body)
    res.sendStatus(200)
})

io.on("connection" ,(socket)=>{
    console.log("a user connected")

})
var server = http.listen(process.env.PORT || 8080, () => {
    console.log('server is listening on port', server.address().port)
})
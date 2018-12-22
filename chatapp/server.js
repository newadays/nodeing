var express = require('express');
var bodyParser = require("body-parser");
var app = express();

var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.Promise = Promise

var dbUrl = 'mongodb://newadays1:newgben1@ds145828.mlab.com:45828/gbenga-node'

var Message = mongoose.model('Message',{
    'name' : String,
    'message' : String
})
var messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'}
]

app.get('/messages', (req, res) =>{
    res.send(messages)

});

app.post('/messages', (req, res) =>{
    // console.log(req.body)
    var message = new Message(req.body)

    message.save().then(() => {
        console.log('saved')
        return  Message.findOne({message: 'badword'})
    })
    .then( censored =>{
        if (censored){
            console.log('censored words found', censored)
            return Message.remove({_id: censored.id})
    }
        // messages.push(req.body)
        io.emit('message', req.body)
        res.sendStatus(200)
    })
    .catch((err)=>{
        res.sendStatus(500)
        return console.error(err)

    })
})


io.on('connection', (socket) =>{
    console.log("user connected")

})

mongoose.connect(dbUrl,{ useNewUrlParser: true }, (err) =>{
    console.log('a user connected', err)
})
var server = http.listen(3000,() => {
    console.log('server is listening on port', server.address().port)
});



// Message.findOne({message: 'badword'},(err, censored) => {
//     if(censored){
//         console.log('censored words found', censored)
//         Message.remove({_id: censored.id}, (err) => {
//             console.log('removed censored message')
//         })
//     }
// })
// messages.push(req.body)
// io.emit('message', req.body)
// res.sendStatus(200)
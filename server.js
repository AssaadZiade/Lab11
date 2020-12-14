var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fs = require('fs');
const webSocket = require("ws");
const globalChat = [];


app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

var server = app.listen(8080, function(){
    let address = server.address().address; 
    let port = server.address().port;
    console.log("Listen on port 8080");
})

app.get("/", function(req, res){
    res.sendFile(__dirname+"/public/user.html");
})

app.post("/adduser", function(req,res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let gender = req.body.gender;
    let description = req.body.description;
    let newObj = {};
    globalChat.forEach((val) => {
        if(firstName === val.firstName && lastName === val.lastName){
            res.redirect("/userExists");
        } 
    });
    newObj.firstName = firstName;
    newObj.lastName = lastName;
    newObj.gender = gender;
    newObj.description = description;
    globalChat.push(newObj);
})

app.get('/admin', function(req, res) {
    res.sendFile(__dirname + "/public/admin.html");
})
let ws = new webSocket.server({port:8080});

ws.on("connection", function(thisWs){
    ws.on("message", function(thisMsg) {
        if(thisMsg === "loadUsers"){
            thisWs.send(JSON.stringify(globalChat));
        }
    })
})

const mysql = require("mysql");
const http = require("http")
const express = require("express");
const bodyParser = require("body-parser");

const app = new express()
app.use(bodyParser.json());
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // YOUR DIFFERENT CONFIG GOES HERE
    password: '1234',
    database: 'nodemysql'
});
conn.connect((err)=>{
    if(err) throw err;
    console.log("Connection successful");
});

var server = http.createServer(function(req,res){
    res.write("Hello world");
    res.end();
})
server.listen(3000)
console.log("listening on http://localhost:3000/")


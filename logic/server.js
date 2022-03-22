const mysql = require("mysql");
const http = require("http")
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = new express()
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // YOUR DIFFERENT CONFIG GOES HERE
    password: '1234',
    database: 'notec'
});
conn.connect((err)=>{
    if(err) throw err;
    console.log("Connection successful");
});

app.listen(3000,function(err){
    if(typeof(err) == "undefined"){
        console.log("we're good");
    }
})
console.log("listening on http://localhost:3000/")
app.post('/signin',function(req,res){
    document.cookie = "name="+(req.body.firstName+req.body.lastName);
    document.cookie = "email="+req.body.email;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(req);
    request = req.body
    var val = [
        request.firstName,
        request.lastName,
        request.email,
        request.password,
        request.phone,
        date
    ];
    console.log(request);
    console.log(date);
    conn.query(`INSERT INTO users(fName,lName,emailID,password,phone,dateCreated) VALUES (?) `,[val],function(err,result){
        if(err) throw err;
        res.send('200')
        console.log("Data added "+result.affectedRows+" rows(s) affected");
    });
})
app.post('/login',function(req,res){
    request = req.body
    console.log(request);
    conn.query(`SELECT * FROM users WHERE emailID = ? AND password = ? `,[request.email,request.password],function(err,result){
        if(err) throw err;
        else if (result.length == 0){
            res.status(300).send(result);
        }
        else{
            res.status(200).send(result);
        }
    });
});
app.post('/new',function(req,res){
    request = req.body
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var data = {
        title: request.title,
        body: request.body,
        dateCreated: date,
    }
});
// app.get('/sandbox',function(req,res){
//     response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8081");
//     var request = req
//     console.log(request);
// });
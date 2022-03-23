const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

var userEmail = "";
const app = new express()
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
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
app.get('/',function(req,res){
    var email = req.cookies.email;
    console.log(email);
})
app.post('/signin',function(req,res){
    // document.cookie = "name="+(req.body.firstName+req.body.lastName);
    // document.cookie = "email="+req.body.email;
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
            res.status(300)
        }
        else{
            res.cookie("emailID",result[0].emailID);
            console.log("cookie set");
            var email = result[0].emailID;
            res.status(200).send(result);
        }
    });
});
app.get('/check',function(req,res){
    console.log("HELLO WORLD");
});
app.get('/setcookie',(req,res)=>{
    // res.cookie("email","nilay0160@gmail.com");
    res.send("Cookies....")
    console.log(req.cookies.email);
})
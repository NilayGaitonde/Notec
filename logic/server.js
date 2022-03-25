const mongoose = require("mongoose");
const Notes = require("../model/note");
const express = require("express");
const bodyParser = require("body-parser")
const MongoClient = require("mongodb");
const cors = require("cors")
const cookieParser = require("cookie-parser");
// const { request } = require("http");

const app = new express()
app.listen(3001,function(err){
    if(typeof(err) == "undefined"){
        console.log("we're good");
    }
})
console.log("listening on http://localhost:3001/")
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());
app.post('/new',function(req,res){
    console.log(req.body);
    mongoose.connect("mongodb://localhost:27017/college");
    var db = mongoose.connection;
    db.on('error',console.error.bind(console,'connection error:'));
    db.once('open',function(){console.log("Connection succeeded");});
    request = req.body
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var data = {
        title: request.title,
        author: request.author,
        dateCreated: date,
        shared: request.shared,
        unedited: request.unedited,
        shared_id:request.shared_id
    }
    console.log(data)
    db.collection('notec').insertOne(data,function(err,result){
        if(err) throw err;
        console.log("Data added "+result.insertedCount+" rows(s) affected");
        res.send('200')
    });
});
app.get('/view/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    mongoose.connect("mongodb://localhost:27017/college");
    var db = mongoose.connection;
    db.on('error',console.error.bind(console,'connection error:'));
    db.once('open',function(){console.log("Connection succeeded");});
    var oID = new MongoClient.ObjectID(id);
    db.collection('notec').findOne({_id:oID},function(err,result){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.post('/update/:id',function(req,res){
    console.log("update");
    mongoose.connect("mongodb://localhost:27017/college");
    var db = mongoose.connection;
    db.on('error',console.error.bind(console,'connection error:'));
    db.once('open',function(){console.log("Connection succeeded");});
    db.collection("notec").updateOne({_id:new MongoClient.ObjectID(req.params.id)},{$set:{title:req.body.title,unedited:req.body.unedited,shared:req.body.shared,shared_id:req.body.shared_id}},function(err,result){
        if(err) throw err;
        console.log(result);
        res.send('200')
    });
});

app.get('/index/:email',async(req,res)=> {
    MongoClient.MongoClient.connect("mongodb://localhost:27017/college",function(err,db){
        email = req.params.email;
        console.log(req.params.email);
        if (err) throw err
        dbo = db.db("college");
        // $or:[{author:window.localStorage.getItem("email")},{shared_id:{$in:[localStorage.getItem("email")]}}]
        dbo.collection("notec").find({$or:[{author:email},{shared_id:{$in:[email]}}]}).toArray(function(err,result){
            if (err) throw err
            console.log(result)
            res.send(result)
        });
    });
});
app.get('/delete/:id',function(req,res){
    console.log("delete");
    mongoose.connect("mongodb://localhost:27017/college");
    var db = mongoose.connection;
    db.on('error',console.error.bind(console,'connection error:'));
    db.once('open',function(){console.log("Connection succeeded");});
    db.collection("notec").deleteOne({_id:new MongoClient.ObjectId(req.params.id)},function(err,result){
        if(err) throw err;
        console.log(result);
        res.send('200')
    })
});
// app.get('/sandbox',function(req,res){
//     response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8081");
//     var request = req
//     console.log(request);
// });
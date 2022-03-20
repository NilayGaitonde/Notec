var express = require('express'); //including express   
var app = new express(); // Creating instance   
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to support JSON bodies


var port = 3000; // setting port for the application   
//Following function is starts sockets and start listen from particular port. In following code I have given call back which contains err. So when port willbe start and listen function will be fire then this function will be execute.   
app.listen(port, function(err) {  
    if (typeof(err) == "undefined") {  
        console.log('Your application is running on : ' + port + ' port');  
    }  
});

	app.post('/submit', function (req, res) {
    	var name = req.body.firstName + ' ' + req.body.lastName+ ' '+req.body.optradio;
    res.send(name +' Submitted Successfully!');
    
});

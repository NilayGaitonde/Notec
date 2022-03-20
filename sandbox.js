var http =  require("http");

var server = http.createServer(function(req,res){
    res.write("Hello World!"+"\n");
    var a=10,b=2
    var i=0
    res.write("a:"+a+"\nb:"+b+"\n")
    res.end();
})
server.listen(3000);
console.log("listening on http://localhost:3000/")
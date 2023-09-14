const http = require('http');
const port = 8000;
const fs = require('fs');
function msg(req, res){
    console.log(req.url);
    res.writeHead(200, {'content-type': 'text/html'});
    fs.readFile('./index.html', function(err, data){
        if(err){
            console.log(err);
            res.end("error displaying data")
        }
        res.end(data);
    })
    // res.end( " textdata is HELLOWORLD ");
}

const server = http.createServer(msg);

server.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    } 
    console.log("server activated");
})
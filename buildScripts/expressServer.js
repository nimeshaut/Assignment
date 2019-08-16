var express = require('express'); // variable to hold express
var path = require('path'); // variable to hold path
var open = require('open'); // variable to hold open

var port = 3000; // var to hold port from which express is going to use and serve

var app = new express(); // create instance of express

// tell express which routes it is going to handle
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, '../src/index.html'))
});


// now tell express to listen to port which we have defined

app.listen(port, function (err) {
    if (err) {
        console.log('an error occured while listening to port')
    } else {
        open('http://localhost:' + port);
    }
});
// import config from '../config';
// import apiRouter from '../api';

// import express from 'express';
// const server = express();

// server.get('/', (req, res) => {
//   res.send('Hello Express');
// });

// server.use('/api', apiRouter);
// server.use(express.static('public'));

// server.listen(config.port, (err) => {
// //   console.info('Express listening on port', config.port);
//     if (err) {
//         console.log('an error occured while listening to port')
//     } else {
//         open('http://localhost:' + config.port);
//     }
// });

import config from '../config'
import apiRouter from '../api';
var express = require('express'); // variable to hold express
var path = require('path'); // variable to hold path
var open = require('open'); // variable to hold open
import serverRender from './serverRender';

var port = config.port; // var to hold port from which express is going to use and serve

var app = new express(); // create instance of express

app.set('view engine','ejs');
// tell express which routes it is going to handle
// app.get('/', function (request, response) {
//     //response.sendFile(path.join(__dirname, '../public/index.html'))
//     response.render('index');
// });
// app.get('/', (req, res) => {
//     res.render('index', {
//       content: 'Hello Express and <em>EJS</em>'
//     });
//   });


app.get('/', (req, res) => {
  serverRender()
    .then(({ initialMarkup, initialData }) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(console.error);
});

app.use('/api', apiRouter);
app.use(express.static('public'));

// now tell express to listen to port which we have defined

app.listen(port, function (err) {
    if (err) {
        console.log('an error occured while listening to port')
    } else {
        open('http://localhost:' + port);
    }
});
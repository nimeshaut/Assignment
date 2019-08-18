
import config from '../config';
import apiRouter from '../api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import serverRender from './serverRender';
import express from 'express';

const server = express();

server.use(sassMiddleware({
  src: path.join(__dirname, '../sass'),
  dest: path.join(__dirname, '../public')
}));

server.set('view engine', 'ejs');

server.get(['/', '/contest/:contestId'], (req, res) => {
  serverRender(req.params.contestId)
    .then(({ initialMarkup, initialData }) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(console.error);
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});

// import config from '../config'
// import apiRouter from '../api';
// import sassMiddleWare from 'node-sass-middleware';

// var express = require('express'); // variable to hold express
// var path = require('path'); // variable to hold path
// var open = require('open'); // variable to hold open
// import serverRender from './serverRender';

// var port = config.port; // var to hold port from which express is going to use and serve

// var app = new express(); // create instance of express


// // tell express which routes it is going to handle
// // app.get('/', function (request, response) {
// //     //response.sendFile(path.join(__dirname, '../public/index.html'))
// //     response.render('index');
// // });
// // app.get('/', (req, res) => {
// //     res.render('index', {
// //       content: 'Hello Express and <em>EJS</em>'
// //     });
// //   });
// app.use(sassMiddleWare({
//   src: path.join(__dirname, 'sass'),
//   dest: path.join(__dirname, 'public')
// }));
// app.set('view engine','ejs');

// app.get('/', (req, res) => {
//   serverRender()
//     .then(({ initialMarkup, initialData }) => {
//       res.render('index', {
//         initialMarkup,
//         initialData
//       });
//     })
//     .catch(console.error);
// });

// app.use('/api', apiRouter);
// app.use(express.static('public'));

// // now tell express to listen to port which we have defined

// // app.listen(port, function (err) {
// //     if (err) {
// //         console.log('an error occured while listening to port')
// //     } else {
// //         open('http://localhost:' + port);
// //     }
// // });

// app.listen(port, config.host, () => {
//   console.info('Express listening on port', config.port);
// });
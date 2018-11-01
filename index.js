const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authentifizierung = require('./routes/authentifizierung');
const nachrichten = require('./routes/nachrichten');
const socket = require('socket.io');
const cors = require('cors');

app.use(morgan('dev'));
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());






app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true')

  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PATCH, PUT');
    return res.status(200).json({});
  }

  next();

});


app.use(express.static('public'));



app.use('/api', authentifizierung);
app.use('/api/nachrichten', nachrichten);

app.use((req, res, next) => {
  
  const error = new Error('Not found');
  error.status = 404;
  next(error);

});

app.use((error, req, res, next) => {
  
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message 
    }
  });

});



let server = app.listen(port, () => {
  console.log('listening to port: 3000');
});

// const sckt = require('./sockets/message');

let io = socket(server);
io.on('connection', (socket) => {
  console.log('connection has been made');
});

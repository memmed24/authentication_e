const express = require('express'),
  app = express(),
  router = express.Router(),
  authguard = require('../guards/auth'),
  http = require('http'),
  cors = require('cors');


router.post('/senden', authguard.isAuth, (req, res) => {

  res.send('Hello WOrld');

});

router.get('/', (req, res) => {
  

  

  res.send('Hellos')

});



module.exports = router;
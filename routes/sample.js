const express = require('express');
const router = express.Router();



router.get('/', (req, res, next) => {

  res.status(200).json({

    message: 'Get request has been sent',
    params : req.body

  });

});

router.get('/:id', (req, res, next) => {

  res.status(200).json({
    params: req.params.id
  })

});

router.post('/', (req, res, next) => {

  res.status(200).json({

    message: 'Post request has been sent'

  }); 

});



module.exports = router;
const express = require('express');
const router = express.Router();
let Bisection = require('../model/Bisection.model');

router.get('/Bisection', (req, res) => {
    res.send('Get API');
});

router.post('/Bisection', (req, res) => {
   console.log('Post to database')
      var xl = parseFloat(req.body.xl);
      var xr = parseFloat(req.body.xr);
      var equation = req.body.equation;
      const result = "POST TO DATABSE (Bisection)"
    res.json({
      result: result
    })

});



module.exports = router;
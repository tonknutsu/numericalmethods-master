const express = require('express');
const router = express.Router();

router.get('/FalsePosition', (req, res) => {
    res.send('Get API');
});

router.post('/FalsePosition', (req, res) => {
    console.log('Post to database')
      var xl = parseFloat(req.body.xl);
      var xr = parseFloat(req.body.xr);
      var equation = req.body.equation;
      const result = "POST TO DATABSE (FalsePosition)"
    res.json({
      result: result
    })

});

module.exports = router;
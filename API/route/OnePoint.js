const express = require('express');
const router = express.Router();

router.get('/OnePoint', (req, res) => {
    res.send('Get API');
});

router.post('/OnePoint', (req, res) => {
    console.log('Post to database')
      var xl = parseFloat(req.body.x0);
      var equation = req.body.equation;
      const result = "POST TO DATABSE (OnePoint)"
    res.json({
      result: result
    })

});

module.exports = router;
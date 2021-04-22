const express = require('express');
const router = express.Router();

//เมื่อมีการเรียกใช้ฟาย นิวตั้น จะส่งget apiไปในดาต้าเบส 
router.get('/NewtonRaphson', (req, res) => {
    res.send('Get API');
});


//เป็นการนำค่าไปใส่ในเดต้าเบส ส่งผ่านตัว axios  ถ้าใช้งานได้จะโชวข้อความ โพสทูเดต้าเบส
router.post('/NewtonRaphson', (req, res) => {
    console.log('Post to database')
      var xl = parseFloat(req.body.xl);
      var equation = req.body.equation;
      const result = "POST TO DATABSE (NewtonRaphson)"
    res.json({
      result: result
    })

});

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const app = express();  
const bodyparser = require('body-parser')
app.use(bodyparser.json())
const cors = require("cors")
app.use(cors());

//routes
app.get('/',(req, res) => {

});
//จะเป็นการประกาศพาทที่อยู่ของ api ที่เราต้องการเรียกใช้
const Bisection = require('./route/Bisection')
const FalsePosition = require('./route/FalsePosition')
const OnePoint = require('./route/OnePoint')
const NewtonRaphson = require('./route/NewtonRaphson')




//การเรียกใช้พาทตั้งต่างนี้อยู่
app.use('/Bisection',Bisection);
app.use('/FalsePosition',FalsePosition);
app.use('/OnePoint',OnePoint);
app.use('/NewtonRaphson',NewtonRaphson);


//เป็นการคอนเน็คกับดาต้าเบสของเรา และกำหนดพอทให้เท่ากับ8000
mongoose.connect('mongodb+srv://tnss345:qazwsx123@cluster0.ieglu.mongodb.net/numer-db?retryWrites=true&w=majority',{useNewUrlParser:true,userMongoClient:true}) 
console.log('Connected Database')

app.listen(8000);
const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const db = require('../db/index.js');
const session = require('express-session');

router.get('/',(req,res)=>{
  var myCallback = function(data) {
    console.log("myorder ROUTE  " +data);
    console.log(req.session.message.UserInfo.email);
    res.render('myorders',{data:data});
  };
db.request(`SELECT * FROM Cart WHERE email='${req.session.message.UserInfo.email}';`,myCallback);
});

module.exports = router;





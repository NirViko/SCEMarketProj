const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const session = require('express-session');


router.get('/',(req,res)=>{
  var localdata = req.session.message.UserCache.paymentSuccess;
  res.render('ordermsg',{paymentSuccess:localdata});
});

module.exports = router;





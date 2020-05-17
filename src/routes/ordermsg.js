const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const session = require('express-session');


router.get('/',(req,res)=>{
  res.render('ordermsg',{paymentSuccess:req.session.message.UserCache.paymentSuccess});
});

module.exports = router;





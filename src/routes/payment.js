const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
var session = require('express-session')
const payment = require('../helpers/payment.js');
const {check,validationResult} = require('express-validator');



router.get('/',(req,res)=>{

  if(req.session.message.UserInfo.type == "Student"){
    req.session.message = payment.StudentDiscount(req.session.message);
    console.log("in "+req.session.message.Total);
  }

  console.log("out  " +req.session.message.Total);
  res.render('payment',{data:req.session.message});
});

router.post('/checkstudentdiscount',(req,res)=>{
  req.session.message.UserCache.openDiscount=true;
  res.render('payment',{data:req.session.message});
});


//define router
router.post('/requirevalidation', [
  check('nameOnCard', 'Name on Card is required').not().isEmpty(),
  check('cardNumber', 'Card Number is required').not().isEmpty(),
  check('cardNumber', 'Card Number length must be 18 numbers').isLength({ min: 18, max:18 }),
  check('CVC', 'CVC is required').not().isEmpty(),
  check('CVC', 'CVC length must be 3 numbers').isLength({ min: 3, max:3 }),
  check('emonth', 'Expiration month is required').not().isEmpty(),
  check('emonth', 'Expiration month is required').not().isEmpty(),
  check('eyear', 'Expiration Year is required').not().isEmpty(),
], async function(req, res, next) {
    //check validate data
    const result= validationResult(req);
    var errors = result.errors;

    if (!result.isEmpty()) {
       res.render('payment', {
        errors: errors,
        data:req.session.message
      })
    }
    else {
      (async () => {
          console.log("req.session.message.UserInfo.email   "+ req.session.message.UserInfo.email);
        if(await payment.UpdatePurchaseBD(req.session.message)){
          req.session.message.UserCache.paymentSuccess=true;
        }
        res.redirect('ordermsg');
      })()
    }
  });
    
module.exports = router;


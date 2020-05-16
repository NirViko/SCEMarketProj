const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const db = require('../db/index.js');
const cart = require('../helpers/cart.js');
const session = require('express-session')


router.get('/',(req,res)=>{
  var datap = { 
    Products:
    [ {Pname: 'Apple',
      productAmount: 1,
      totalPrice: 1,
      email: 'd@d',
      PID: '1' }
    ],
      UserInfo:{
      userType:"gosha",
      email:"d@d"}}

    
  var fdata= cart.DateModified(cart.Summery(datap));
  req.session.message = fdata;

  res.render('shoppingcart',{data:req.session.message});
});

router.post('/topayment',(req,res)=>{
  res.redirect("/payment");
});

router.post('/removeprod',(req,res)=>{
  var lessdata = cart.RemoveProduct(req.session.message, req.body.removeid);
  console.log(lessdata);
  res.render('shoppingcart',{data:lessdata});
});

router.get('/:id',(req,res)=>{
  if(req.query.quantity<11)
  {
    req.session.message.Products[req.params.id].productAmount=req.query.quantity;
    cart.Summery(req.session.message)
  }
  res.render('shoppingcart',{data:req.session.message});
});

module.exports = router;





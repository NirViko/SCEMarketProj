const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const db = require('../db/index.js');
const cart = require('../helpers/cart.js');
const session = require('express-session');



router.get('/',(req,res)=>{





    // var fdata= cart.DateModified(cart.Summery(cart.AddQuantity(req.session.message)));
    req.session.message = cart.DateModified(cart.Summery(cart.AddQuantity(req.session.message)));
    console.log(req.session.message.UserInfo.type );
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
    console.log(req.query.quantity);
    console.log(req.session.message.Products[req.params.id].Pamount);

    if(req.query.quantity<11 && req.query.quantity<=req.session.message.Products[req.params.id].Pamount)
    {
        req.session.message.Products[req.params.id].Pquantity=req.query.quantity;
        req.session.message = cart.Summery(req.session.message);

    }
    res.render('shoppingcart',{data:req.session.message});
});

module.exports = router;





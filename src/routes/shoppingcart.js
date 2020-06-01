const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const db = require('../db/index.js');
const cart = require('../helpers/cart.js');
const session = require('express-session');




router.get('/',(req,res)=>{
    db.request(" select product.* from product, (select top 3 PID,count(PID) as AmountPID from Cart group by PID order by count(PID) desc) d where product.PID=d.PID;",(select) => {
        console.log(req.session.message);
        var localdata = req.session.message = cart.DateModified(cart.Summery(cart.AddQuantity(req.session.message)));
            console.log(localdata);
            res.render('shoppingcart', {data: localdata, best: select});
    });
});



router.post('/removeprod/:id',(req,res)=>{
    console.log(req.params.id);

    var lessdata = cart.RemoveProduct(req.session.message, req.params.id);
    db.request(" select product.* from product, (select top 3 PID,count(PID) as AmountPID from Cart group by PID order by count(PID) desc) d where product.PID=d.PID;",(select) => {
        res.render('shoppingcart', {data: lessdata, best:select});
    });
});

router.post('/addtocart/:obj',(req,res)=>{
    console.log("req.param.obj");

    console.log(req.params.obj);
    // req.session.message.Products.forEach(product => {
    //     if(product.)
    // })

    db.request(`Select * from Product where PID=${req.params.obj}`,(product)=> {

        req.session.message.Products.push(product[0]);
        res.redirect("/shoppingcart");
    });
    // res.render('shoppingcart',{data:lessdata});
});

router.get('/:id',(req,res)=>{
    console.log(req.query.quantity);
    console.log(req.session.message.Products[req.params.id].Pamount);

    if(req.query.quantity<11 && req.query.quantity<=req.session.message.Products[req.params.id].Pamount)
    {
        req.session.message.Products[req.params.id].Pquantity=req.query.quantity;
        req.session.message = cart.Summery(req.session.message);

    }
    db.request(" select product.* from product, (select top 3 PID,count(PID) as AmountPID from Cart group by PID order by count(PID) desc) d where product.PID=d.PID;",(select) => {
        var localdata = req.session.message;
        res.render('shoppingcart', {data: localdata,best:select});
    });
});

module.exports = router;





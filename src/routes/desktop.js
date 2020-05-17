const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const db=require('../db/index.js');
const session = require('express-session')
const Remove=require('../Remove');
const user = require('../user');



  router.get('/',(req,res)=>{
    db.request("SELECT * from Product;",(select)=>{
      console.log(user.userInf.type);
      res.render('desktop',{data:select, user:user.userInf,
              });
    });
  });

  router.get('/filter',(req,res)=>{
    db.request("SELECT * from Product ORDER BY Pprice;",(filtered)=>{
      res.render('desktop',{data:filtered,user:user.userInf,});
    });
  });

  router.get('/filter2',(req,res)=>{
    db.request("SELECT * from Product ORDER BY Pprice DESC;",(filtered)=>{
      console.log(filtered);
      res.render('desktop',{data:filtered,user:user.userInf,});
    });
  });

  router.get('/filter3',(req,res)=>{
    db.request("SELECT * from Product ORDER BY Pdate ;",(filtered)=>{
      console.log(filtered);
      res.render('desktop',{data:filtered,user:user.userInf,});
    });
  });

  router.get('/filter4',(req,res)=>{
    db.request("SELECT * from Product ORDER BY Pdate desc ;",(filtered)=>{
      console.log(filtered);
      res.render('desktop',{data:filtered,user:user.userInf,});
    });
  });

  router.get('/1',(req,res)=>{
    db.request("SELECT * from Product where Pcategory='Vegetable' or Pcategory='Fruit';",(filtered)=>{
      console.log(filtered);
      res.render('desktop',{data:filtered,user:user.userInf,});
    });
  });

  router.get('/2',(req,res)=>{
    db.request("SELECT * from Product where Pcategory='Eggs' or Pcategory='Salat' or Pcategory='Dairy';",(filtered)=>{
      console.log(filtered);
      res.render('desktop',{data:filtered,user:user.userInf,});
    });
  });
  router.get('/3',(req,res)=>{
    db.request("SELECT * from Product where Pcategory='Meat' or Pcategory='Fish';",(filtered)=>{
      console.log(filtered);
      res.render('desktop',{data:filtered,user:user.userInf,});
    });
  });
  router.get('/4',(req,res)=>{
    db.request("SELECT * from Product where Pcategory='Snack';",(filtered)=>{
      console.log(filtered);
      res.render('desktop',{data:filtered,user:user.userInf,});
    });
  });
  router.get('/5',(req,res)=>{
    db.request("SELECT * from Product where Pcategory='Drinks';",(filtered)=>{
      console.log(filtered);
      res.render('desktop',{data:filtered,user:user.userInf,});
    });

  });
  router.get('/6',(req,res)=>{
    db.request("SELECT * from Product where Pcategory='Pastries';",(filtered)=>{
      console.log(filtered);
      res.render('desktop',{data:filtered,user:user.userInf,});
    });
    
  });
  
  router.post('/Search',(req,res)=>{
    db.request("SELECT * from Product where Pcompany='"+req.body.Company+"';",(filtered)=>{
      console.log(filtered);
      res.render('desktop',{data:filtered,user:user.userInf,});
    });
    
  });

  router.post('/range',(req,res)=>{
    db.request(" SELECT * from Product where Pprice BETWEEN "+ req.body.MIN +" and "+ req.body.MAX+";",(filtered)=>{
      console.log(filtered);
      res.render('desktop',{data:filtered,user:user.userInf,});
    });
    
  });

  router.get('/cart/:id',(req,res)=>{
    console.log(req.params.id)// call create function. to create a new user. if there is no error this function will return it's id.
    db.request("SELECT * from Product where PID =" + req.params.id,(select) => {
      if(select.length != 0){
        Remove.cartArr(select[0]);
        res.redirect("/desktop");
      }
    });
  });

  router.get('/toCart',(req,res) => {
    req.session.message = {Products:(Remove.sendToCart()),user:user.userInf};
    console.log(Remove.sendToCart());
    res.redirect("/shoppingcart");
  })
module.exports = router;




const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const Remove=require('../Remove');
var products=[];


  router.get('/',(req,res)=>{
      console.log("StartRemove");
    res.render('Remove',{title:'Add Product'});
  });

  router.post('/',(req,res)=>{
    // call create function. to create a new user. if there is no error this function will return it's id.
    Remove.deleteData(req.body.PID);
    res.redirect("/desktop");
  });


  module.exports = router;
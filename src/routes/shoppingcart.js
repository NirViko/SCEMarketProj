const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

router.get('/',(req,res)=>{
  res.render('shoppingcart');
});


module.exports = router;
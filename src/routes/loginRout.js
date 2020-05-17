const express = require('express');
const path = require('path');
const User =require('../user')
const app = express();
const router = express.Router();

var err=0;


router.get('/',(req,res)=>{
    res.render("loginViews",{err:err});//put here the ejs
});

router.post('/',(req,res,next) =>{

    let userInput = {
        email : req.body.email,
        password : req.body.password}
    
    User.executeStatement(userInput,function(result)
    {

            if(result[0])
            {
                err=0;

            res.redirect('/desktop');
            }

            else {
                err=1;
                res.render("loginViews",{err:err});
            }

    })

});




module.exports = router;
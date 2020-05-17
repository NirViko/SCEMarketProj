const express = require('express');
const path = require('path');
const User =require('../user')
const app = express();
const router = express.Router();
const usererr={};

router.get('/',(req,res)=>{
    res.render("loginErrorConnected");//put here the ejs
});

router.post('/',(req,res,next) =>{
    var fullname,email,type,studentID,password
    let userInput = {
        email : req.body.email,
        password : req.body.password}

    User.executeStatement(userInput,function(result)
    {
        console.log(result)
        if(result[0])
        {
            usererr.fullname=result[1];
            usererr.email=result[2];
            usererr.type=result[3];
            usererr.studentID=result[4];
            usererr.password=result[5];
            res.redirect('/desktop');
        }

        else
            res.redirect('/loginError')
    })

})
exports.usererr=usererr;


module.exports = router;
const express = require('express');
const path = require('path');
const User =require('../user')
const app = express();
const router = express.Router();

router.get('/',(req,res)=>{
    res.render("loginViews");//put here the ejs 
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
            fullname=result[1]
            email=result[2]
            type=result[3]
            studentID=result[4]
            password=result[5]
            res.render('desktop',{user:{fullname,email,type,studentID,password}})//Home page 
            }
            else
            res.redirect('/loginError')
    })

})



module.exports = router;
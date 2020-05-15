const express = require('express');
const path = require('path');
const User =require('../user')
const app = express();
const router = express.Router();
app.set('view-engine','ejs')
const users = [];
//const user = new User();
app.use(express.urlencoded({ extended: false}))

router.get('/',(req,res)=>{
    res.render("registerViews");//put here the ejs 
});



router.post('/', (req, res) => {
    // prepare an object containing all user inputs.
    var typeofuser= 'user' 
    var checkType = req.body.StudentID
    var checkEmail = req.body.email
    User.CheckValidEmail(checkEmail,function(result){
        if(result)
        {
            res.redirect('/registerError')
        }
        else
        {
            if(checkType != '0' )
            {
                typeofuser ='Student'
            }
            let userInput = {
                    FullName: req.body.FullName,
                     email: req.body.email,
                     StudentID: req.body.StudentID,
                     userType:  typeofuser,
                     password: req.body.password,
                     password_confirm: req.body.password_confirm
            };
            
            console.log(userInput)
            // call create function. to create a new user. if there is no error this function will return it's id.
            User.executeStatement1(userInput)
            res.redirect('/login');
        }
    });




});

module.exports = router;
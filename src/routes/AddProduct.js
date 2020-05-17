const express = require('express');
const path = require('path');
const AddP =require('../AddP')
const app = express();
const router = express.Router();
app.set('view-engine','ejs');
const users = [];
//const user = new User();
app.use(express.urlencoded({ extended: false}))

router.get('/',(req,res)=>{
    console.log("Add/get")
    res.render("AddProduct");//put here the ejs 
});



router.post('/', (req, res) => {
    // prepare an object containing all user inputs.
    console.log("Post");
    let userInput = {
             PID: req.body.PID,
             PName: req.body.PName,
             Pcategory: req.body.Pcategory,
             Pprice:  req.body.Pprice,
             Pcompany: req.body.Pcompany,
             Pamount: req.body.Pamount,
            
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    AddP.executeStatement1(userInput);
});

module.exports = router;
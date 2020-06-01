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



router.post('/addP', (req, res) => {
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

    AddP.executeStatement1(userInput);
});

module.exports = router;
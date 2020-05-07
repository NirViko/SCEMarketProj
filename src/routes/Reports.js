const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const salesReports = require("../salesReports");


router.get('/', function(req,res){
    console.log("in get");
    salesReports.getSalesReport( function(result){ //במקום 12 צריך להיות פונקציה שלוקחת את הת.ז של בעל הדירה שמחובר!
        res.render('Reports' ,{rows:result});
    });
});


// router.post("/Reports", function(req,res){
//     console.log("in post");
//     const unitID =req.body.unitID;
//     const startDate = req.body.startDate;
//     const endDate = req.body.endDate;
//     const location = "'"+req.body.Location+"'"; //default empty
//     const numberOfRooms = parseFloat(req.body.numberOfRooms); //default empty
//     const fromPrice = req.body.totalPrice;
//     const unitTypes = "'"+req.body.Unittype+"'";
//     const orderNumber = req.body.orderNumber;

// //    console.log("unitid:"+unitID+", startdate:" +startDate+ ",enddate:" +endDate+", location:" +location+ ", numberOfRooms: " +numberOfRooms+", fromPrice:" +fromPrice+", unitTypes:" +unitTypes+", orderNumber: " +orderNumber);
// salesReports.getFilteredTable( 12, unitID, startDate, endDate, location, numberOfRooms, fromPrice, unitTypes, orderNumber ,function(result){ //במקום 12 צריך להיות פונקציה שלוקחת את הת.ז של בעל הדירה שמחובר!
//         res.render('Reports',{rows:result});
//     });

// });

// router.get('/',(req,res)=>{
//   res.render('Reports');
// });


module.exports = router;
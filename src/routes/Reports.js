const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const salesReports = require("../salesReports");
const { Connection, Request } = require("tedious");




router.get('/', function(req,res){
    console.log("in get");
    salesReports.getSalesReport( function(result){ 
        res.render('Reports' ,{rows:result});
    });
});

router.post('/', function(req,res) {
  console.log(req.body.reportType)  
if( req.body.reportType == "date")
{   console.log("in post date");
    const fromDate = req.body.fromDate;
    const toDate =  req.body.toDate;
    salesReports.giveByDate(fromDate, toDate,function(result){ 
        res.render('Reports' ,{rows:result});
    });
}
else if(req.body.reportType == "email")
{
    console.log("in post email");
        const emailFilter = req.body.emailFilter;
        salesReports.filterByEmail(emailFilter,function(result){ 
            res.render('Reports' ,{rows:result});
        });
}
else if(req.body.reportType == "product")
{
    console.log("in post product");
    const filterProduct = req.body.filterProduct;
    salesReports.filterByProdName(filterProduct,function(result){ 
        res.render('Reports' ,{rows:result});
    });
}
});
module.exports = router;
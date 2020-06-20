/* eslint-disable no-unused-vars */
const { Connection, Request } = require("tedious");
const salesReport = require("./salesReport")
const db=require('./db/index.js');
// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "scemarket",
      password: "Pmic1234"
    },
    type: "default"
  },
  server: "scemarket.database.windows.net",
  options: {
    database: "SCEMarket",
    encrypt: true,
    enableArithAbort: true,
    rowCollectionOnRequestCompletion:true,
    trustServerCertificate: true,
  }
};
class salesReports
{
  constructor(PID, PName, Pamount)
  {
    console.log("constractor");
    this.PID = PID;
    this.PName = PName;
    this.Pamount = Pamount;
  }
  static getSalesReport(callback){
    console.log("in salesReports class");
    console.log("in getSalesReport func");

    let connection = new Connection(config);
    connection.on("connect", err => {
      if (err) {
        console.error(err.message);
      } else {
        const request = new Request(
            `SELECT c.cartID, c.PID, p.Pname, c.productAmount, c.totalPrice, c.cDate, c.email, u.fullName
            FROM [dbo].[Cart] AS c , [dbo].[Product] AS p, [dbo].[Usernames] AS u
            WHERE c.PID = p.PID AND c.email = u.email`,
            (err, rowCount,rows) => {
              if (err) {
                console.error(err.message);
                return callback(false);
              }
              else {
                console.log(`${rowCount} row(s) returned`);
                connection.close();
                var salesReports =[];
                rows.forEach(element => {
                  var cartID, PID, Pname, Pamount, totalPrice, cDate, customerName, customerEmail;
                  element.forEach(column =>{
                    switch(column.metadata.colName)
                    {
                      case 'cartID':
                      {
                        cartID = column.value;
                        break;
                      }
                      case 'PID':
                      {
                        PID = column.value;
                        break;
                      }
                      case 'Pname':
                      {
                        Pname = column.value;
                        break;
                      }
                      case 'productAmount':
                      {
                        Pamount = column.value;
                        break;
                      }
                      case 'totalPrice':
                      {
                        totalPrice = column.value;
                        break;
                      }
                      case 'cDate':
                      {
                        cDate = column.value
                        cDate.setMonth(column.value.getMonth()+1) ;
                        break;
                      }
                      case 'fullName':
                      {
                        customerName = column.value ;
                        break;
                      }
                      case 'email':
                      {
                        customerEmail = column.value;
                        break;
                      }
                    }// end of switch
                  });
                  // console.log(cartID, PID, Pname, Pamount, totalPrice, cDate, customerName, customerEmail);

                  var salesReport1 = new salesReport(cartID, PID, Pname, Pamount, totalPrice, cDate, customerName, customerEmail);
                  salesReports.push(salesReport1);
                });
                return callback(salesReports);
              }
            }
        );
        connection.execSql(request);
      }
    });
  }//end of getSalesReport function



  static giveByDate(fromDate, toDate,callback){
    console.log("in Date filter class");
    db.request(`SELECT c.cartID, c.PID, p.Pname, c.productAmount, c.totalPrice, c.cDate, c.email, u.fullName
      FROM [dbo].[Cart] AS c , [dbo].[Product] AS p, [dbo].[Usernames] AS u
      WHERE c.PID = p.PID AND c.email = u.email AND c.cDate >= '`+fromDate+`' AND c.cDate <= '`+toDate+`'`,(products)=>{
      var salesReports =[];
      console.log(products);
      products.forEach(product => {
        var salesReport1 = new salesReport(product.cartID, product.PID, product.Pname, product.productAmount, product.totalPrice, product.cDate, product.fullName, product.email);
        salesReports.push(salesReport1);
      });
      return callback(salesReports);
    });
  }//end of filterbydate function


  static filterByEmail(emailFilter,callback){
    console.log("in email filter class");
    db.request(`SELECT c.cartID, c.PID, p.Pname, c.productAmount, c.totalPrice, c.cDate, c.email, u.fullName
    FROM [dbo].[Cart] AS c , [dbo].[Product] AS p, [dbo].[Usernames] AS u
    WHERE c.PID = p.PID AND c.email = u.email AND c.email =`+"'"+emailFilter+`'`,(products)=>{
      var salesReports =[];
      console.log(products);
      products.forEach(product => {
        var salesReport1 = new salesReport(product.cartID, product.PID, product.Pname, product.productAmount, product.totalPrice, product.cDate, product.fullName, product.email);
        salesReports.push(salesReport1);
      });
      return callback(salesReports);
    });
  }//end of filterbyEmail function


  static filterByProdName(filterProduct,callback){
    console.log("in product filter class");
    db.request(`SELECT c.cartID, c.PID, p.Pname, c.productAmount, c.totalPrice, c.cDate, c.email, u.fullName
  FROM [dbo].[Cart] AS c , [dbo].[Product] AS p, [dbo].[Usernames] AS u
  WHERE c.PID = p.PID AND c.email = u.email AND p.Pname =`+"'"+filterProduct+`'`,(products)=>{
      var salesReports =[];
      console.log(products);
      products.forEach(product => {
        var salesReport1 = new salesReport(product.cartID, product.PID, product.Pname, product.productAmount, product.totalPrice, product.cDate, product.fullName, product.email);
        salesReports.push(salesReport1);
      });
      return callback(salesReports);
    });
  }//end of filterbyEmail function
  static getInventory(callback)
  {
    console.log("in inventory");
    db.request(`SELECT PName, PID, Pamount
  FROM [dbo].[Product]`,(products)=>{
      var inventory =[];
      products.forEach(product => {
        var salesReport1 = new salesReports(product.PID, product.PName, product.Pamount);
        inventory.push(salesReport1);
      });
      return callback(inventory);
    });
  }// inventory table


}//end of class
module.exports = salesReports;
/* eslint-disable no-unused-vars */
const { Connection, Request } = require("tedious");
const salesReport = require("./salesReport")
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

    }//end of function
}//end of class
module.exports = salesReports;
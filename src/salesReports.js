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
      console.log(fromDate);
      console.log("in Date filter class");
      let connection = new Connection(config);
    connection.on("connect", err => {
      if (err) {
        console.error(err.message);
      } else {
      const request = new Request( 
          `SELECT c.cartID, c.PID, p.Pname, c.productAmount, c.totalPrice, c.cDate, c.email, u.fullName
          FROM [dbo].[Cart] AS c , [dbo].[Product] AS p, [dbo].[Usernames] AS u
          WHERE c.PID = p.PID AND c.email = u.email AND c.cDate >= '`+fromDate+`' AND c.cDate <= '`+toDate+`'`,
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

  }//end of filterbydate function
  static filterByEmail(emailFilter,callback){
    console.log(emailFilter);
    console.log("in email filter class");
    let connection = new Connection(config);
  connection.on("connect", err => {
    if (err) {
      console.error(err.message);
    } else {
    const request = new Request( 
        `SELECT c.cartID, c.PID, p.Pname, c.productAmount, c.totalPrice, c.cDate, c.email, u.fullName
        FROM [dbo].[Cart] AS c , [dbo].[Product] AS p, [dbo].[Usernames] AS u
        WHERE c.PID = p.PID AND c.email = u.email AND c.email =`+"'"+emailFilter+`'`,
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

              var salesReport2 = new salesReport(cartID, PID, Pname, Pamount, totalPrice, cDate, customerName, customerEmail);
              salesReports.push(salesReport2); 
          });
          return callback(salesReports);
        }
      }
    );
    connection.execSql(request);
  }
}); 

}//end of filterbyEmail function
static filterByProdName(filterProduct,callback){
  console.log(filterProduct);
  console.log("in product filter class");
  let connection = new Connection(config);
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
  const request = new Request( 
      `SELECT c.cartID, c.PID, p.Pname, c.productAmount, c.totalPrice, c.cDate, c.email, u.fullName
      FROM [dbo].[Cart] AS c , [dbo].[Product] AS p, [dbo].[Usernames] AS u
      WHERE c.PID = p.PID AND c.email = u.email AND p.Pname =`+"'"+filterProduct+`'`,
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

            var salesReport3 = new salesReport(cartID, PID, Pname, Pamount, totalPrice, cDate, customerName, customerEmail);
            salesReports.push(salesReport3); 
        });
        return callback(salesReports);
      }
    }
  );
  connection.execSql(request);
}
}); 

}//end of filterbyEmail function
static getInventory(callback)
{
  console.log("in inventory");
  let connection = new Connection(config);
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
  const request = new Request( 
      `SELECT PName, PID, Pamount
      FROM [dbo].[Product]`,
    (err, rowCount,inventoryRows) => {
      if (err) {
        console.error(err.message);
        return callback(false);
      } 
      else {
        console.log(`${rowCount} inventoryRows(s) returned`);
        connection.close();
        var inventory =[];
        inventoryRows.forEach(element => {
          var PID, PName, Pamount;
          element.forEach(column =>{
            switch(column.metadata.colName)
            {
              
              case 'PID': 
              {
                  PID = column.value;
                break;
              }
              case 'PName': 
              {
                PName = column.value;
                break;
              }
              case 'Pamount': 
              {
                  Pamount = column.value;
                break;
              }
                 
            }// end of switch 
          });
           console.log( PID, PName, Pamount);

            var salesReport4 = new salesReports(PID, PName, Pamount);
            inventory.push(salesReport4); 
        });
        return callback(inventory);
      }
    }
  );
  connection.execSql(request);
}
}); 

}// inventory table
}//end of class
module.exports = salesReports;
const { Connection, Request, TYPES } = require("tedious");

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


var connection = new Connection(config);
connection.on('connect', function(err) {
  if(err) {
    console.log(err);
    return;
  }
});

function StudentDiscount(data){
  var fullprice = data.Total;
  return { 
    Products : data.products,
    Total : data.Total * 0.9,
    UserInfo : data.UserInfo,
    UserCache : {
      fullPrice : fullprice,
      openDiscount : false
     }
  };
}

async function UpdatePurchaseBD(data)
{
  return await UpdateCartTable(data) && await UpdateProductsTable(data)
}

async function UpdateCartTable(data)
{
  try {
    for(var i=0; i<data.Products.length; i++)
    {
      const user = await new Promise((resolve, reject) => {
          var insert =  new Request('INSERT INTO [dbo].[Cart] (cartID, productAmount, totalPrice, cDate, email, PID) VALUES (@cartID, @productAmount, @totalPrice, @cDate, @email, @PID)', 
          function(err, rows, rowCount) {
            if(err)
              return reject(err);
            resolve(true);
          });
          insert.addParameter('cartID', TYPES.VarChar, Math.floor(Math.pow(10, 8) + Math.random() * 9 * Math.pow(10, 8)));
          insert.addParameter('productAmount', TYPES.Int, data.Products[i].productAmount);
          insert.addParameter('totalPrice', TYPES.Float, data.Products[i].totalPrice);
          insert.addParameter('cDate', TYPES.DateTime, new Date(Date.now()));
          insert.addParameter('email', TYPES.VarChar, data.Products[i].email);
          insert.addParameter('PID', TYPES.VarChar, data.Products[i].PID);
          connection.execSql(insert); 
          }
        );
    }
    return true;
  } catch (error) {
    throw error;
  }
}

async function UpdateProductsTable(data)
{
  try {
    for(var i=0; i<data.Products.length; i++)
    {
      const user = await new Promise((resolve, reject) => {
          var insert =  new Request(`UPDATE [dbo].[Product] SET Pamount=Pamount -'${data.Products[i].productAmount}' WHERE PID=${data.Products[i].PID};`, 
          function(err, rows, rowCount) {
            if(err)
              return reject(err);
            resolve(true);
          });
          connection.execSql(insert); 
          }
        );
    }
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = { StudentDiscount, UpdatePurchaseBD }

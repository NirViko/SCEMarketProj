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
  var fullPrice = data.Total;
  return { 
    Products : data.Products,
    Total : data.Total * 0.9,
    UserInfo : data.UserInfo,
    UserCache : {
      fullPrice : fullPrice,
      openDiscount : false,
      paymentSuccess : true
     }
  };
}

async function UpdatePurchaseBD(data)
{
  return await UpdateCartTable(data) && await UpdateProductsTable(data)
}
var date_p = new Date().toJSON().slice(0,10).replace(/-/g,'/');
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
          console.log("data.Products[i].email   " +data.UserInfo.email);
          insert.addParameter('cartID', TYPES.VarChar, Math.floor(Math.pow(10, 8) + Math.random() * 9 * Math.pow(10, 8)));
          insert.addParameter('productAmount', TYPES.Int, data.Products[i].Pquantity);
          insert.addParameter('totalPrice', TYPES.Float, data.Products[i].Pprice);
          insert.addParameter('cDate', TYPES.VarChar, date_p);
          insert.addParameter('email', TYPES.VarChar, data.UserInfo.email);
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
          var insert =  new Request(`UPDATE [dbo].[Product] SET Pamount=Pamount -'${data.Products[i].Pquantity}' WHERE PID=${data.Products[i].PID};`,
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

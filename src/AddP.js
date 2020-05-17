
var { Connection, Request } = require("tedious");

var config = {
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


connection.on('connect', function(err)
 { console.log("Connected");  
});  

var Request = require('tedious').Request  
var TYPES = require('tedious').TYPES;  

var date_p = new Date().toJSON().slice(0,10).replace(/-/g,'/');
function executeStatement1(body) {  
    request = new Request("INSERT [dbo].[Product](PID, PName, Pcategory, Pprice, Pcompany, Pamount,Pdate) OUTPUT INSERTED.PID VALUES (@PID,@PName, @Pcategory, @Pprice,@Pcompany,@Pamount,@Pdate);", function(err) {  
        if (err) {  
           console.log(err);}  
       });  
       request.addParameter('PID', TYPES.Int,body.PID);
       request.addParameter('Pname', TYPES.NVarChar ,body.PName);  
       request.addParameter('Pcategory', TYPES.NVarChar, body.Pcategory);  
       request.addParameter('Pprice', TYPES.Int,body.Pprice);  
       request.addParameter('PCompany', TYPES.NVarChar,body.Pcompany);
       request.addParameter('Pamount', TYPES.NVarChar,body.Pamount);
       request.addParameter('Pdate', TYPES.NVarChar,date_p);
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value == null) {  
            console.log('NULL');  
          } else {  
            console.log("Product id of inserted item is " + column.value);  
          }  
        });  
    });       
    connection.execSql(request);  
}  

module.exports.executeStatement1=executeStatement1;

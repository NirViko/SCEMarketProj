
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
var cart=[];
    function cartArr(data) {
        if (data.Pamount == 0)
            return;

        if (cart.length != 0)
        {
            for (var i = 0; i < cart.length; i++) {
                if(i==cart.length-1 && cart[i].PID != data.PID){
                    cart.push(data);
                }
                if (cart[i].PID == data.PID)
                {
                    break;
                }
            }
        }
        else
        {
            cart.push(data);
        }

}

    function deleteData(PID) { 
        console.log("start delete") ;
        request = new Request("DELETE FROM [dbo].[Product] WHERE PID ='"+PID+"'", function(err) {  
            if (err) {  
               console.log(err);}  
           });  
          
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value ==null) {  
                console.log('NULL');  
              } else {  
                console.log("Product id deleted succssesfully " + column.value);  
              }  
            });  
        });       
        connection.execSql(request);  

}

function sendToCart(){
        return cart;
}

module.exports.sendToCart=sendToCart;
module.exports.cartArr=cartArr;
module.exports.deleteData=deleteData;
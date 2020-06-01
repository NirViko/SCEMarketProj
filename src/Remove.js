
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

    function removeProduct(p) {
        console.log(p);

        for(var i=0;i<cart.length;i++){
            console.log("forr");
            if(cart[i].PID==p){
                console.log("if");
                cart.pop();
            }
        }

    }
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
 function MayLike(data) {
     var cart2=[];

        for(var i=0;i<cart.length;i++){
            for (var j=0;j<data.length;j++){
                if(data[j].Pcategory==cart[i].Pcategory && data[j].PName!=cart[i].PName && data[j].Pamount>0){
                    cart2.push(data[j]);
                    break;
                }
            }
        }
    return cart2;
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


module.exports.Maylike=MayLike;
module.exports.removeProduct=removeProduct;
module.exports.sendToCart=sendToCart;
module.exports.cartArr=cartArr;
module.exports.deleteData=deleteData;
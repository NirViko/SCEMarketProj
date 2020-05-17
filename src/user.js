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
    connectionTimeout: 30000,
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
var userInf = {};

function executeStatement1(body) {  
    request = new Request("INSERT [dbo].[Usernames](fullName, email, userType , studentID,userPassword) OUTPUT INSERTED.email VALUES (@fullName, @email, @userType, @studentID,@userPassword);", function(err) {  
     if (err) 
     {  
        console.log(err);}  
    });
    console.log(body.StudentID)
    request.addParameter('fullName', TYPES.VarChar,body.FullName);  
    request.addParameter('email', TYPES.VarChar ,body.email); 
    request.addParameter('userType', TYPES.VarChar,body.userType);  
    request.addParameter('StudentID', TYPES.Int,body.StudentID);  
    request.addParameter('userPassword',TYPES.Int,body.password);

    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {
            console.log('NULL');  
          } else {  
            console.log("Product id of inserted item is " + column.value);  
          }  
        });  
    });       
    connection.execSql(request);  
}  


//check if email is vaild
function CheckValidEmail(email,callback)
{
  var count =false
  request = new Request("SELECT email FROM [dbo].[Usernames] WHERE email='"+email+"'", function(err) {  
  if(request.rowCount==0)
  callback(false)
    if (err) {  
      console.log(err);} 
  });  
  var result = "";  
  request.on('row', function(columns) {  
      columns.forEach(function(column) {
        console.log(column.value);
        let result = false ;
        if (column.value === null) {  
          console.log('NULL');// go to login-page Error 
          result = false  
        } 
        else
            if(column.value == email)
            {
              result = true
            }
          callback(result)
      }); 
          
  });  

  request.on('done', function(rowCount, more) {  
  console.log(rowCount + ' rows returned');
    
  });  

  connection.execSql(request); 

}



function executeStatement(body,callback) { 
  var count =false
  var i=1;
  var arr = []
  arr[0]=false
  request = new Request("SELECT fullName,email,userType,studentID,userPassword FROM [dbo].[Usernames] WHERE  userPassword='"+body.password+"'AND email='"+body.email+"'", function(err,result) {  
    
    if (err) {  
      console.log(err);} 
      if(result==0)
      callback(arr)
  });   
  request.on('row', function(columns) {  
      arr[0]=true
      columns.forEach(function(column) {
      arr[i]=column.value
      i++
      if(column.value == body.password)
      {
          userInf.fullname=arr[1];
          userInf.email=arr[2];
          userInf.type=arr[3];
          userInf.studentID=arr[4];
          userInf.password=arr[5];
        callback(arr)
      }
      }); 
          
  });
  
  request.on('done', function(rowCount, more) {  
  console.log(rowCount + ' rows returned');
    
  });  

  connection.execSql(request); 
}  
exports.userInf = userInf;
module.exports.executeStatement1 = executeStatement1; 
module.exports.executeStatement = executeStatement;
module.exports.CheckValidEmail=CheckValidEmail;










const { Connection, Request } = require("tedious");

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

function request(sqlrequest, callback){
  var connection = new Connection(config);
  connection.on('connect', function (err) {
  // If no error, then good to proceed.
  console.log("Connected");
  // connection.on('debug', function (err) { console.log('debug:', err); });

  request = new Request(sqlrequest, (err, rowCount,rows) => {
    if (err) {
      console.error(err.message);
      return callback(false);
    } else {
      console.log(`${rowCount} row(s) returned`);
      connection.close();
      // return callback(rows);
    }
  }
);
  
  _rows = [];
  request.on("row", columns => {
    var _item = {};
    // Converting the response row to a JSON formatted object: [property]: value
    for (var name in columns) {
      _item[columns[name].metadata.colName] = columns[name].value;
    }
    _rows.push(_item);
  });

    // We return the set of rows after the query is complete, instead of returing row by row
    request.on("doneInProc", (rowCount, more, rows) => {
      callback(_rows);
    });

  connection.execSql(request);
  });
}

module.exports = { request };
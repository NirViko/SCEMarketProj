const express  = require('express')
const bodyParser = require("body-parser");
const app_port = process.env.PORT || 3000;
const app = express()
const path = require('path');
const session = require('express-session')
const url = require('url');   
const db = require('./db/index.js');
var querystring = require('querystring');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+ '/public'));
app.use(express.static("public"));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

//Routes
const shoppingcartRoute = require('./routes/shoppingcart.js');
const ReportRoute = require('./routes/Reports');
const paymentRoute = require('./routes/payment.js');
const myordersRoute = require('./routes/myorders.js');
const ordermsgRoute = require('./routes/ordermsg.js');

//Middleware - Import routers;
app.use('/shoppingcart', shoppingcartRoute);
app.use('/Reports', ReportRoute);
app.use('/payment', paymentRoute);
app.use('/myorders', myordersRoute);
app.use('/payment/requirevalidation/ordermsg', ordermsgRoute);

app.get('/', (req, res) => {
  res.send('Digital Store SCE');
});

app.listen(app_port, () => {
  console.log(`app is running. port: ${app_port}`);
});

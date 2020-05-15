const express  = require('express')
const bodyParser = require("body-parser");
const app_port = process.env.PORT || 3000;
const app = express()

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

const shoppingcartRoute = require('./routes/shoppingcart.js');
const ReportRoute = require('./routes/Reports');

app.use(express.static(__dirname+ '/public'));
//Middleware - Import routers;
app.use(bodyParser.urlencoded({extended:true}));
app.use('/shoppingcart', shoppingcartRoute);
app.use('/Reports', ReportRoute);
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.send('Digital Store SCE');
  })

app.listen(app_port, () => {
  console.log(`app is running. port: ${app_port}`);
});

const express  = require('express')
const bodyParser = require("body-parser");
const app_port = process.env.PORT || 3000;
const app = express()
const session = require('express-session')
const path = require('path');

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

const ReportRoute = require('./src/routes/Reports');
const loginRoutes = require('./src/routes/loginRout.js');
const registerRoutes = require('./src/routes/registerRout.js');
const loginError = require('./src/routes/loginError.js')
const ErrorRegis = require('./src/routes/registerError.js')
const desktopRoute = require('./src/routes/desktop.js');
const AddProductRoute =require('./src/routes/AddProduct.js');
const RemoveRoute =require('./src/routes/RemoveP.js');
const shoppingcartRoute = require('./src/routes/shoppingcart.js');
const paymentRoute = require('./src/routes/payment.js');
const myordersRoute = require('./src/routes/myorders.js');
const ordermsgRoute = require('./src/routes/ordermsg.js');

//Middleware - Import routers;
app.use(bodyParser.urlencoded({extended:true}));
app.use('/Reports', ReportRoute);
//log-in and register
app.use('/Login', loginRoutes);
app.use('/Register', registerRoutes);
app.use('/loginError',loginError);
app.use('/registerError',ErrorRegis);
app.use('/desktop', desktopRoute);
app.use('/AddProduct', AddProductRoute);
app.use('/RemoveP', RemoveRoute);
app.use('/shoppingcart', shoppingcartRoute);
app.use('/Reports', ReportRoute);
app.use('/payment', paymentRoute);
app.use('/payment/requirevalidation/ordermsg', ordermsgRoute);
app.use('/myorders', myordersRoute);

app.use(express.static("public"));


app.get('/', (req, res) => {
    res.redirect('/desktop');
})

//Error status
app.use((req,res,next)=> {
    var err = Error('Page not found');
    err.status = 404;
    next(err);
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send(err.message);
})

// app.get('/', (req, res) => {
//     res.send('Digital Store SCE');
// })

app.listen(app_port, () => {
    console.log(`app is running. port: ${app_port}`);
});

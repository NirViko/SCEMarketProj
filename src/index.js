const express  = require('express')
const bodyParser = require("body-parser");
const app_port = process.env.PORT || 3000;
const app = express()

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

const shoppingcartRoute = require('./routes/shoppingcart.js');
const ReportRoute = require('./routes/Reports');

const loginRoutes = require('./routes/loginRout.js');
const registerRoutes = require('./routes/registerRout.js');
const loginError = require('./routes/loginError.js')
const ErrorRegis = require('./routes/registerError.js')

app.use(express.static(__dirname+ '/public'));
//Middleware - Import routers;
app.use(bodyParser.urlencoded({extended:true}));
app.use('/shoppingcart', shoppingcartRoute);
app.use('/Reports', ReportRoute);
//log-in and register
app.use('/Login', loginRoutes);
app.use('/Register', registerRoutes);
app.use('/loginError',loginError);
app.use('/registerError',ErrorRegis);

app.use(express.static("public"));

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

app.get('/', (req, res) => {
    res.send('Digital Store SCE');
})

app.listen(app_port, () => {
    console.log(`app is running. port: ${app_port}`);
});

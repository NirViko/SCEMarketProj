const express  = require('express')
const app_port = process.env.PORT || 3000;
const app = express()

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

const shoppingcartRoute = require('./routes/shoppingcart.js');

//Middleware - Import routers;
app.use('/shoppingcart', shoppingcartRoute);

app.get('/', (req, res) => {
    res.send('Digital Store SCE');
  })


app.listen(app_port, () => {
  console.log(`app is running. port: ${app_port}`);
});

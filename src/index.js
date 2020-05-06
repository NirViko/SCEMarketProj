const express  = require('express')
const app_port = process.env.PORT || 3000;
const app = express()

app.get('/', (req, res) => {
    res.send('Digital Store SCE');
  })


app.listen(app_port, () => {
  console.log(`app is running. port: ${app_port}`);
});

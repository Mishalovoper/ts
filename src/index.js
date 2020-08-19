const express = require('express');
const app = express();
const mongoUri = 'mongodb+srv://admin:admin@cluster0.z61eg.azure.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const appRoute = require('./routes/appRoute');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(appRoute);
mongoose.connect(mongoUri,{
  useUnifiedTopology:true,
  useNewUrlParser:true
});
mongoose.connection.on('connected', ()=>{
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.log('Err connected to mongo', err);
});

app.get('/', (req,res) => {
  res.send("Hi");
});



app.listen(3000, ()=>console.log("Server listening on port 3000"));

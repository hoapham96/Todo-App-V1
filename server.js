const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config();


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
const routes = require('./routes');

app.use(routes);

const environment = process.env.NODE_ENV || 'developement';

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index'));
  });
}


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT} and ${environment}`));
});
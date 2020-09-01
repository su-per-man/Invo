let express = require('express');
let mongoose = require('mongoose');
// let cors = require('cors');
// let bodyParser = require('body-parser');

// Express Route
const warehouseRoute = require('./routes/warehouses.route')

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
require('./config/ConnectMongo');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/warehouses', warehouseRoute)


// PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
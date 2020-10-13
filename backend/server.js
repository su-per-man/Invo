let express = require('express')

// let cors = require('cors');

// Express Route
const apiRoute = require('./routes/RouteAPI')

// Connecting mongoDB Database
require('./config/ConnectMongo');


const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// app.use(cors());
app.use('/invo-api', apiRoute)


// PORT
const port = process.env.PORT || 4000;
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
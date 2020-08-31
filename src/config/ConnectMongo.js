const mongoose = require('mongoose')
require('dotenv').config();

class ConnectMongo {
    constructor() {
        mongoose.connect(process.env.CS, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('Successful')
            })
            .catch(e =>
                console.error('Error connecting to ' + process.env.CONNECTION_STRING)
            )
    }
}
module.exports = new ConnectMongo
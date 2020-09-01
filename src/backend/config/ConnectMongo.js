const mongoose = require('mongoose')
require('dotenv').config();

class ConnectMongo {
    constructor() {
        mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
            .then(() => {
                console.log('Connection Successful')
            })
            .catch(e =>
                console.error('Could not connect to database :' + e)
            )
    }
}
module.exports = new ConnectMongo()
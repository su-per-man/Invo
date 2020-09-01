const db = require('./ConnectMongo')
const mongoose = require('mongoose')
const scm = require('../models/Warehouse')

// let tempDoc = new scm({
//     FirstName: 'Kumar',
//     Location: 'Kolkata',
//     Description: 'First Entry'
// })

// tempDoc.save()
//     .then(doc => console.log(doc))
//     .catch(err => console.log('ERROR:', err));

scm
    .find({
        Location: 'Kolkata'
    })
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })

const express = require('express')
const router = express.Router()

schemas = {
    warehouse: require('../models/Warehouse'),
    item: require('../models/Item'),
    contact: require('../models/Contact')
}

for (const sch in schemas) {
    //create
    router.route('/create-' + sch.toString()).post((req, res, next) => {
        schemas[sch].create(req.body, (err, data) => {
            if (err) {
                return next(err)
            } else {
                fetchAll(req, res, next, sch.toString())
            }
        })
    })

    //edit
    router.route('/update-' + sch.toString()).post((req, res, next) => {
        schemas[sch].findByIdAndUpdate(req.body.id, req.body.data, (err, data) => {
            if (err) {
                return next(err)
            } else {
                fetchAll(req, res, next, sch.toString())
            }
        })
    })

    //delete
    router.route('/delete-' + sch.toString()).post((req, res, next) => {
        schemas[sch].findByIdAndDelete(req.body.id, (err, data) => {
            if (err) next(err);
            else {
                fetchAll(req, res, next, sch.toString())
            }
        })
    })

    //read
    router.route('/' + sch.toString()).get((req, res, next) => {
        fetchAll(req, res, next, sch.toString())
    })
}

fetchAll = (req, res, next, schemaName) => {
    schemas[schemaName].find((err, data) => {
        if (err)
            return next(err)
        else
            return res.json(data)
    })
}

module.exports = router
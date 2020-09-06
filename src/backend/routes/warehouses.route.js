const express = require('express')
const router = express.Router()

const warehouseSchema = require('../models/Warehouse')

//create
router.route('/create').post((req, res, next) => {
    warehouseSchema.create(req.body, (err, data) => {
        if (err) {
            return next(err)
        } else {
            fetchAll(req, res)
        }
    })
})

//read
router.route('/').get((req, res, next) => {
    fetchAll(req, res, next)
})
//edit
router.route('/update').post((req, res, next) => {
    warehouseSchema.findByIdAndUpdate(req.body.id, req.body.data, (err, data) => {
        if (err) {
            return next(err)
        } else {
            fetchAll(req, res, next)
        }
    })
})

//delete
router.route('/delete').post((req, res, next) => {
    warehouseSchema.findByIdAndDelete(req.body.id, (err, data) => {
        if (err) next(err);
        else {
            fetchAll(req, res, next)
        }
    })
})

fetchAll = (req, res, next) => {
    warehouseSchema.find((err, data) => {
        if (err)
            return next(err)
        else
            return res.json(data)
    })
}

module.exports = router
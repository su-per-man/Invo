const mongoose = require('mongoose'),
const express = require('express'),
const router = express.Router()

const warehouseSchema = require('../models/Warehouse')

//create-warehouse
router.route('/create-warehouse').post((req, res, next) => {
    warehouseSchema.create(req.body, (err, data) => {
        if (err) {
            return next(err)
        } else {
            console.log(data)
            res.json(data)
        }
    })
})

router.route('/').get((req, res) => {
    warehouseSchema.find((err, data) => {
        if (err)
            return next(err)
        else
            return res.json(data)
    })
})

module.exports = router
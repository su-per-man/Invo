const express = require('express')
const router = express.Router()

const warehouseSchema = require('../models/Warehouse')
const { getAllByAltText } = require('@testing-library/react')

//create-warehouse
router.route('/create').post((req, res, next) => {
    warehouseSchema.create(req.body, (err, data) => {
        if (err) {
            return next(err)
        } else {
            res.json(data)
        }
    })
})
//Delete
router.route('/delete').post((req, res, next) => {
    warehouseSchema.findByIdAndDelete(req.body.id, (err, data) => {
        if (err) return next(error);
        else {
            fetchAll(req, res)
        }
    })
})

router.route('/').get((req, res) => {
    fetchAll(req, res)
})

fetchAll = (req, res) => {
    warehouseSchema.find((err, data) => {
        if (err)
            return next(err)
        else
            return res.json(data)
    })
}

module.exports = router
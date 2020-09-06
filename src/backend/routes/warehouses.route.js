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
router.route('/').get((req, res) => {
    fetchAll(req, res)
})
//edit
router.route('/edit').post((req, res) => {

})

//delete
router.route('/delete').post((req, res, next) => {
    warehouseSchema.findByIdAndDelete(req.body.id, (err, data) => {
        if (err) return next(error);
        else {
            fetchAll(req, res)
        }
    })
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
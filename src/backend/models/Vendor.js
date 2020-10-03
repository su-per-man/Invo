const mongoose = require('mongoose')

let VendorSchema = new mongoose.Schema({
    Vendor: {
        type: String,
        required: true,
        unique:true
    },
    Responsible: {
        type: String,
        required: true,
    },
    Location: {
        type: String,
        required: true
    },
    Phone: String,
}, { timestamps: true })

VendorSchema.index({
    Vendor: 1,
    Responsible: 1,
    Location: 1
}, { unique: true })
module.exports = mongoose.model('vendors', VendorSchema)
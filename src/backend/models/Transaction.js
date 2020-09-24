const mongoose = require('mongoose')

let TransactionSchema = mongoose.Schema({
    TransactionDate: Date,
    Warehouse: String,
    Contact: String,
    TotalUnits: Number,
    Unit: String,
    CostPerUnit: Number,
    Item: String,
    TransactionType: {
        type: String,
        enum: ["Buy", "Sell"]
    }
}, { timestamps: true })
module.exports = mongoose.model('Transactions', TransactionSchema)
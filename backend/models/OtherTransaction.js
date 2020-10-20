const mongoose = require('mongoose')

let OtherTransactionSchema = mongoose.Schema({
    TransactionDate: Date,
    Vendor: String,
    Amount: Number,
    Notes: String,
    TransactionType: {
        type: String,
        enum: ["Income", "Expenditure"]
    }
}, { timestamps: true })

module.exports = mongoose.model('OtherTransactions', OtherTransactionSchema)
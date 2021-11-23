const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema({
    from: String,
    to: String,
    content: [{
        fruit: String,
        quantity: Number,
    }],
    createdAt: { type: Date, default: Date.now }
})

const Transaction = mongoose.model('Transaction', TransactionSchema)
module.exports = Transaction
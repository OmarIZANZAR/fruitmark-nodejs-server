const mongoose = require('mongoose')

const StoreSchema = mongoose.Schema({
    name: String,
    stock: [{
        fruit: String,
        quantity: Number,
    }],
    createdAt: { type: Date, default: Date.now }
})

const Store = mongoose.model('Store', StoreSchema)
Store.createIndexes([{ name: "text" }])

module.exports = Store
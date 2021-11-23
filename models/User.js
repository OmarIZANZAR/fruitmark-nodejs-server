const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    image: String,
    createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', UserSchema)
User.createIndexes([{ username: "text" }])

module.exports = User

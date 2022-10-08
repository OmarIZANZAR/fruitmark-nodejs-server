const express = require('express')
const cors = require('cors')
const ConnectDB = require("./config/db.js")

// server and database launch:
ConnectDB()
const app = express()

// BODY PARSERS:
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// ROUTERS:
const storesRouter = require('./routes/stores.js')
app.use('/stores', storesRouter)

const transactionsRouter = require('./routes/transactions.js')
app.use('/transactions', transactionsRouter)

const usersRouter = require('./routes/users.js')
app.use('/users', usersRouter)

// SERVER:
app.get('/', (req, res) => {
    res.send("hello")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}...`))
const express = require('express')
const mongoose = require("mongoose")
const Transaction = require('../models/Transaction.js')
const Store = require('../models/Store')

const router = express.Router()

// Get all transactions:
// GET /transactions/
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 })
        res.status(200).json({isError: false, message: "all transactions fetched", transactions})
    } catch (err) {
        res.status(500).json({isError: true, message: "transactions not fetched", info: err})
    }
})

// Get a single transaction by id:
// GET /transactions/:id
router.get('/:id', async (req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "transaction not found"})

    try {
        const transaction = await Transaction.findById(id)

        if(transaction === null){
            return res.status(404).json({isError: true, message: "transaction not found"})
        }

        res.status(200).json({isError: false, message: "transaction fetched", transaction})
    } catch (err) {
        res.status(500).json({isError: true, message: "transaction not found", info: err})
    }
})

// Create new transaction:
// POST /transactions/
// req.body = { from, to, content: [{ fruit, quantity }] }
router.post('/', async (req, res) => {
    let transaction = req.body
    
    try {
        if( 
            transaction.from.length == 0 || 
            transaction.to.length == 0 ||
            transaction.content.length == 0 
        ){
            res.status(400).json({isError: true, message: "transaction is not valid", transaction})
        }

        const store = await Store.findOne({ name: req.body.from })

        let invalid = false
        let newStock = store.stock
        newStock = store.stock.map( element => {
            let updated

            transaction.content.map( newElement => {
                if( newElement.fruit === element.fruit ){
                    // console.log(newElement.fruit)

                    if( element.quantity < newElement.quantity ){
                        invalid = true
                    }

                    updated = { fruit: element.fruit, quantity: element.quantity - newElement.quantity }
                } else {
                    updated = { fruit: element.fruit, quantity: element.quantity }
                }
            })

            return updated
        })

        if(invalid)
            return res.status(400).json({isError: true, message: "transaction is not valid", transaction})

        const newStore = {
            stock: newStock,
        }

        const updatedStore = await Store.findByIdAndUpdate( store._id, newStore, { new: true } )

        const newTransaction = new Transaction(transaction)
        await newTransaction.save()
        res.status(201).json({isError: false, message: "transaction saved successfully", newTransaction})
    } catch (err) {
        res.status(400).json({isError: true, message: "transaction not saved", info: err})
    }
})

// Update a single transaction by id:
// PUT /transactions/:id
// req.body = { from, to, content: [{ fruit, quantity }] }
router.put('/:id', async (req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "transaction not found"})

    try {
        const transaction = await Transaction.findById(id)

        if( transaction === null ){
            return res.status(404).json({isError: true, message: "transaction not found"})
        }

        let newContent = transaction.content
        if(req.body.content){
            newContent = transaction.content.map( element => {
                let val
                req.body.content.map( newElement => {
                    if( newElement.fruit === element.fruit ){
                        val = newElement
                    } else {
                        val = { fruit: element.fruit , quantity: element.quantity }
                    }
                })
    
                return val
            })
        }

        const newTransaction = {
            from: req.body.from ? req.body.from : transaction.from ,
            to: req.body.to ? req.body.to : transaction.to,
            content: newContent,
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate( transaction._id, newTransaction, { new: true} )
        
        res.status(200).json({isError: false, message: "transaction updated", updatedTransaction})
    } catch (err) {
        res.status(500).json({isError: true, message: "transaction not updated", info: err})
    }
})

// Delete a single transaction by id:
// DELETE /transactions/:id
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "transaction not found"})

    try {
        const transaction = await Transaction.findByIdAndDelete(id)

        if(transaction === null){
            return res.status(404).json({isError: true, message: "transaction not found"})
        }

        res.status(200).json({isError: false, message: "transaction deleted", transaction})
    } catch (err) {
        res.status(500).json({isError: true, message: "transaction not found", info: err})
    }
})

module.exports = router;
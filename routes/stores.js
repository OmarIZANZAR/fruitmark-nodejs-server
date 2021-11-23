const express = require('express')
const mongoose = require("mongoose")
const Store = require('../models/Store.js')

const router = express.Router()
    
// Get all stores:
// GET /stores/
router.get('/', async (req, res) => {
    try {
        const stores = await Store.find()

        res.status(200).json({isError: false, message: "all stores fetched", stores})
    } catch (err) {
        res.status(500).json({isError: true, message: "stores not fetched try reloading", info: err})
    }
})

// Get a single store by id:
// GET /stores/:id
router.get('/:id', async (req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "store not found"})

    try {
        const store = await Store.findById(id)

        if(store === null){
            return res.status(404).json({isError: true, message: "store not found"})
        }

        res.status(200).json({isError: false, message: "store fetched", store})
    } catch (err) {
        res.status(500).json({isError: true, message: "store not found", info: err})
    }
})

// Create new store:
// POST /stores/
// req.body = { name, stock: [{ fruit, quantity }] }
router.post('/', async (req, res) => {
    try {
        const newStore = new Store(req.body)
        await newStore.save()
        res.status(201).json({isError: false, message: "store saved successfully", newStore})
    } catch (err) {
        res.status(400).json({isError: true, message: "store not saved", info: err})
    }
})

// Update a single store by id:
// PUT /stores/:id
// req.body = { name, stock: [{ fruit, quantity }] }
router.put('/:id', async (req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "store not found"})

    try {
        const store = await Store.findById(id)

        if( store === null ){
            return res.status(404).json({isError: true, message: "store not found"})
        }
   
        let newStock = store.stock
        if(req.body.stock){
            newStock = store.stock.map( element => {
                let val
                req.body.stock.map( newElement => {
                    if( newElement.fruit === element.fruit ){
                        val = newElement
                    } else {
                        val = { fruit: element.fruit , quantity: element.quantity }
                    }
                })
    
                return val
            })
        }
            
        const newStore = {
            name: req.body.name ? req.body.name : store.name,
            stock: newStock,
        }

        const updatedStore = await Store.findByIdAndUpdate( store._id, newStore, { new: true } )
        
        res.status(200).json({isError: false, message: "store updated", updatedStore})
    } catch (err) {
        res.status(500).json({isError: true, message: "store not updated", info: err})
    }
})

// Delete a single store by id:
// DELETE /stores/:id
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "store not found"})

    try {
        const store = await Store.findByIdAndDelete( id )

        if(store === null){
            return res.status(404).json({isError: true, message: "store not found"})
        }

        res.status(200).json({isError: false, message: "store deleted", store})
    } catch (err) {
        res.status(500).json({isError: true, message: "store not found", info: err})
    }
})

module.exports = router;
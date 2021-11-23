const express = require('express')
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const User = require('../models/User.js')

const router = express.Router()
    
// Get all users:
// GET /users/
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({isError: false, message: "all users fetched", users})
    } catch (err) {
        res.status(500).json({isError: true, message: "users not fetched", info: err})
    }
})

// Get a single user by id:
// GET /users/:id
router.get('/:id', async (req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "user not found"})

    try {
        const user = await User.findById(id)

        if(user === null){
            return res.status(404).json({isError: true, message: "user not found"})
        }

        res.status(200).json({isError: false, message: "user fetched", user})
    } catch (err) {
        res.status(500).json({isError: true, message: "user not found", info: err})
    }
})

// Create new user:
// POST /users/
// req.body = { username, image, password }
router.post('/', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        let user = {
            username: req.body.username,
            image: req.body.image
        }

        const newUser = new User({ ...user, password: hashedPassword })
        await newUser.save()

        res.status(201).json({isError: false, message: "user registred successfully", user})
    } catch (err) {
        res.status(400).json({isError: true, message: "user not registred", info: err})
    }
})

// Log in a user:
// POST /users/login/
// req.body = { username, password }
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        const match = await bcrypt.compare( req.body.password, user.password )

        if(match){
            let loggedUser = {
                username: user.username,
                image: user.image,
                createdAt: user.createdAt,
            }

            res.status(200).json({isError: false, message: "user logged in", user: loggedUser })
        } else {
            res.status(401).json({isError: false, message: "unauthorized" })
        }

    } catch (err) {
        res.status(500).json({isError: true, message: "cannot log in", info: err})
    }
})

// Update a single user by id:
// PUT /users/:id
// req.body = { username, image }
router.put('/:id', async (req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "user not found"})

    try {
        const user = await User.findById(id)

        if( user === null ){
            return res.status(404).json({isError: true, message: "user not found"})
        }

        const newUser = {
            username: req.body.username ? req.body.username : user.username,
            // password: req.body.password ? req.body.password : user.password,
            image: req.body.image ? req.body.image : user.image,
        }

        const updatedUser = await User.findByIdAndUpdate( user._id, newUser, { new: true} )
        
        res.status(200).json({isError: false, message: "user updated", updatedUser})
    } catch (err) {
        res.status(500).json({isError: true, message: "user not updated", info: err})
    }
})

// Delete a single user by id:
// DELETE /users/:id
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "user not found"})

    try {
        const user = await User.findByIdAndDelete(id)

        if(user === null){
            return res.status(404).json({isError: true, message: "user not found"})
        }

        res.status(200).json({isError: false, message: "user deleted", user})
    } catch (err) {
        res.status(500).json({isError: true, message: "user not found", info: err})
    }
})

module.exports = router;
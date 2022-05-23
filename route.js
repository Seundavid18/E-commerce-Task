const express = require('express')
const router = express.Router()
const { User, validateUser } = require('./userSchema')
const validateMiddleWare = require('./validateMiddleWare')
const JProduct = require('./productSchema')
const bcrypt = require('bcrypt')


router.get('/router', (req, res) => {
    res.send('Hello from The Other Side Router')
})


// USER

// CREATE A USER
router.post('/adduser', [validateMiddleWare(validateUser)], async (req, res) => {
    
    try{

        // Salt Password
        let saltPassword = await bcrypt.genSalt(10)
        // Hash Password
        let securePassword = await bcrypt.hash(req.body.password, saltPassword)
        password = securePassword


        const {firstName, lastName, storeName, email, phoneNumber} = req.body
        const newUser = await User.create({firstName, lastName, storeName, email, phoneNumber, password})
        const saveUser = await newUser.save()

        res.status(201).json({
            success: true,
            msg: 'successfully added user to the database',
            data: saveUser
        })
    } catch(error) {
        res.status(400).json({
            success: false,
            message : "Email already exist"
        })
    }
})

// GET ALL USERS FROM DATABASE
router.get('/alluser', async (req, res) => {
    const users = await User.find({})
    res.status(200).json({
        success: true,
        msg: "successfully retrieved all users from the database",
        data: users
    })
})

// READ ONE USER RECORD FROM THE DATABASE
router.get('/oneuser/:id', async (req, res) => {
    const id = req.params.id
    const oneUser = await User.findOne({_id: id})
    res.status(200).json({
        success: true,
        msg: 'successfully retrieved a user record from the database',
        data: oneUser
    })
})

// UPDATE A USER RECORD IN THE DATABASE
router.put('/edituser/:id', async (req, res) => {
    const id = req.params.id
    const payload = req.body
    const updateUser = await User.findByIdAndUpdate({_id: id}, payload, {new: true})
    res.status(200).json({
        success: true,
        msg: 'successfully updated a user record in the database',
        data: updateUser
    })
})

// REMOVE A RECORD FROM THE DATABASE
router.delete('/removeuser/:id', async (req, res) => {
    const id = req.params.id
    await User.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        msg: 'successfully deleted a user record from the database',
    })
})

// PRODUCT
// CREATE A PRODUCT RECORD (CREATE)
router.post('/addproduct', async (req, res) => {
    try{
    const {name, price, description, size, quantity} = req.body
    const newProduct = await JProduct.create({name, price, description, size, quantity})
    const saveProduct = await newProduct.save()

    res.status(201).json({
        success: true,
        msg: 'successfully added one data to the database',
        data: saveProduct
    })
    } catch(error) {
        res.status(500).json({
            success: false,
            data: error
        })
    }
})

// READ A PRODUCT RECORD FROM DATABASE
router.get('/allproduct', async (req, res) => {
    const products = await JProduct.find({})
    res.status(200).json({
        success: true,
        msg: "successfully retrieved data from the database",
        data: products
    })
})

// READ ONE PRODUCT RECORD FROM THE DATABASE
router.get('/oneproduct/:id', async (req, res) => {
    const id = req.params.id
    const oneProduct = await JProduct.findOne({_id: id})
    res.status(200).json({
        success: true,
        msg: 'successfully retrieved one data from the database',
        data: oneProduct
    })
})

// UPDATE A PRODUCT RECORD IN THE DATABASE
router.put('/editproduct/:id', async (req, res) => {
    const id = req.params.id
    const payload = req.body
    const updateProduct = await JProduct.findByIdAndUpdate({_id: id}, payload, {new: true})
    res.status(200).json({
        success: true,
        msg: 'successfully updated a document in the database',
        data: updateProduct
    })
})

// REMOVE A PRODUCT RECORD FROM THE DATABASE
router.delete('/removeproduct/:id', async (req, res) => {
    const id = req.params.id
    await JProduct.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        msg: 'successfully deleted a record from the database',
    })
})


// LOGIN
router.post('/login', async (req, res) => {
    const {email, password} = req.body

    // CHECK IF LOGIN FORM IS EMPTY
    if(!email || !password){
        return res.status(200).json({
            success : false,
            message : `Enter your login details`
        })
    }

    // CHECK IF USER EXISTS IN DATABASE
    let users = await User.findOne({email})
    if(!users){
        return res.status(400).json({
            success : false,
            message : `Email Address Not found`
        })
    } 

    // CHECK AND COMPARE PASSWORD
    bcrypt.compare(req.body.password, users.password, (err, result) => {
        if(err){
            throw(err)
        }
        if(result){
            return res.status(200).json({
                success : true,
                message : `correct password`
            })
        } else {
            return res.status(400).json({
                success: false,
                message : `Incorrect Password`
            })
        }
    })

})

module.exports = router
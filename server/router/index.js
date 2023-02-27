const express = require('express')
const router = express.Router()
require("../config")
const user = require('../models/user')
router.get('/', (req, res) => {
    res.send('Mobigic API')
})


//User Register
router.post('/register', async (req, res) => {
    let response = {
        status: 200,
        msg: ''
    }
    const { username, password } = req.body

    try {

        if (username && password) {
            const saveUser = new user({ username, password })
            const saved = await saveUser.save()
            if (saved) {

                res.cookie('token', username);
                response.msg = "User registred."

            } else {

                response.msg = "Technical error.",
                    response.status = 400

            }
        } else {
            response.msg = "Username or passord missing.",
                response.status = 400
        }

        res.send(response)

    } catch (err) {
        console.log(err)
    }

})

//user Login
router.post('/login', async (req, res) => {
    let response = {
        status: 200,
        msg: ''
    }

    const { username, password } = req.body

    try {
      
        const verifyUser = await user.findOne({ username })
        if (verifyUser) {
            if (verifyUser.password == password) {
                response.msg = 'User verified'
            } else {
                response.status = 400
                response.msg = 'Wrong password'
            }
        } else {
            response.status = 400
            response.msg = 'User not found'
        }

        res.send(response)
    } catch (err) {
        console.log(err)
    }

})

module.exports = router
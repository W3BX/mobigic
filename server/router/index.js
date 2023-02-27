const express = require('express')
const router = express.Router()
require("../config")
const user = require('../models/user')
const multer = require('multer');
const fs = require('fs')

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 500 * 1024, // 500KB
        files: 1 // maximum 1 file
    }
});

//user Auth
router.post('/auth', async (req, res) => {
    let response = {
        status: 200,
        msg: ''
    }

    const { username, password } = req.body

    try {

        const verifyUser = await user.findOne({ username })

        //if user is found login
        if (verifyUser) {
            if (verifyUser.password == password) {
                res.cookie('token', username);
                response.msg = 'User verified'
            } else {
                response.status = 400
                response.msg = 'Wrong password'
            }

            // if user is not found register and login     
        } else {

            if (username && password) {
                const saveUser = new user({ username, password })
                const saved = await saveUser.save()
                if (saved) {

                    res.cookie('token', username);
                    response.msg = "User registred and logged in"

                } else {

                    response.msg = "Technical error.",
                        response.status = 400

                }
            } else {
                response.msg = "Username or passord missing.",
                    response.status = 400
            }
        }

        res.send(response)
    } catch (err) {
        console.log(err)
    }

})

//user Logout
router.post('/logout', async (req, res) => {

    let response = {
        status: 200,
        msg: ''
    }

    try {
        res.clearCookie('token')
        response.msg = 'User logged out'
        res.send(response)
    } catch (err) {
        console.log(err)
    }



})

//upload file
router.post('/upload', upload.single('file'), async (req, res) => {

    let response = {
        status: 200,
        msg: ''
    }

    if (req.file) {
        
        const file = req.file.originalname
        const token = req.cookies['token']
        const code = Math.floor(100000 + Math.random() * 900000)
        const imgUpdated = await user.updateOne({ username: token },
            { $push: { 'files': { flName: file, code: code } } })

        if (imgUpdated.acknowledged) {
            const User = await user.findOne({ username: token })
            response.User = User
            res.send(response)
        }

    }

})

module.exports = router
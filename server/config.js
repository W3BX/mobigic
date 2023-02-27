const mongoose = require('mongoose')
require('dotenv').config();
const uri = process.env.MONGOCREDS
const db = mongoose.connection

try {
    mongoose.connect(uri, {

    }).then(() => {
        console.log('connected to MONGO ATLAS')
    }).catch((err) => {
        console.log('MONGO ERR', err)
    })


} catch (err) {

    console.log(err)
}
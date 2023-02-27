const express = require('express')
const app = express()
const port = 5000
const MainRouter = require('./router/index')

app.use(express.json())

app.use('/', MainRouter)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
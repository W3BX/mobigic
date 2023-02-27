const express = require('express')
const app = express()
const port = 5000
const MainRouter = require('./router/index')
const cors = require('cors')
const cookieParser = require('cookie-parser')

//setting up cros
app.use(cors({ credentials: true, origin: true }))
//cookie parser
app.use(cookieParser())

app.use(express.json())

app.use('/', MainRouter)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
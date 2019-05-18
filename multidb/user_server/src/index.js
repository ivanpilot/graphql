const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.send({welcome: "On User Server"})
})

app.listen(4000, () => {
    console.log('server:user currently listening on port 4000')
})
const express = require('express')
const expressGraphQL = require('express-graphql')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const schema = require('./schema/schema')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))


// app.get('/', (req, res) => {
//     res.send({welcome: "On User Server"})
// })
const PORT = 3000
app.listen(PORT, () => {
    console.log(`server:user currently listening on port ${PORT}`)
})
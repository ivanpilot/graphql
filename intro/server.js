const express = require('express');
const expressGrapQL = require('express-graphql');
const schema = require('./schema/schema');


const app = express();

// this middleware is purely for development purpose
app.use('/graphql', expressGrapQL({
    schema: schema,
    graphiql: true
}))

app.get('/', (req, res) => {
    res.send('Hello World!!')
})

app.listen(4000, () => console.log('Listening on port 4000'))
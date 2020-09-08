const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
require('dotenv').config()

const schema = require('./graphql/schema.gql')
const resolvers = require('./graphql/resolvers.js')
const {DB} = require('./config/config')

const app = express()

mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db connected'))

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen(8081, () => console.log('listen 8081'))
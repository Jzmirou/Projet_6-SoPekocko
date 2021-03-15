const express = require('express')
const app = express()
const mongoose = require('mongoose')
const url = 'mongodb+srv://jzmirou:openclassroom@cluster0.dwo1r.mongodb.net/SoPekocko?retryWrites=true&w=majority'

const authRoute = require('./routes/authRoute')


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('connection mongodb ok'))
    .catch(() => console.log('connection pas ok'))

app.use(express.json())

app.use('/api/auth', authRoute)

module.exports = app
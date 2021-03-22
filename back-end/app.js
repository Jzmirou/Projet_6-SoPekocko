const express = require('express')
const app = express()
const mongoose = require('mongoose')
const errorHandling = require('./middleware/errorHandling')
const url = 'mongodb+srv://jzmirou:openclassroom@cluster0.dwo1r.mongodb.net/SoPekocko?retryWrites=true&w=majority'
const authRoute = require('./routes/authRoute')
const saucesRoute = require('./routes/saucesRoute')
const cors = require('cors')
const { isAuth } = require('./middleware/auth')

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('connection mongodb ok'))
.catch(() => console.log('connection pas ok'))
//Autorisation des cors
app.use(cors())
app.use(express.json())

//Route
app.use('/api/auth', authRoute)
app.use('/api/sauces', isAuth, saucesRoute)
// Gestion des erreurs 
app.use(errorHandling)

module.exports = app
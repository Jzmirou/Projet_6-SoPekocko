const express = require('express')
const { getAllSauce, getSauceById } = require('../controllers/sauceCtrl')
const router = express.Router()

router.get('/', getAllSauce)

router.get('/:id', getSauceById)

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router
const express = require('express')
const router = express.Router()
const { loginCtrl, signupCtrl } = require('../controllers/authCtrl')


router.post('/login', loginCtrl)

router.post('/signup', signupCtrl)

module.exports = router
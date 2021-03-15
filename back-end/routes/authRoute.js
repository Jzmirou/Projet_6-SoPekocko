const express = require('express')
const router = express.Router()
const Users = require('../models/Users')
const bcrypt = require('bcryptjs')

router.post('/login', async (req, res) => {
    // Vérifie que l'email est bien enregistré 
    const user = await Users.findOne({ email: req.body.email }).lean();
    if (!emailExist) return res.status(400).send('Invalid email');
    // Vérifie si le mot de passe est correct
    const validatePassword =  await bcrypt.compare(req.body.password,user.password)
    if (!validatePassword) return res.status(400).send('Invalid password')

})

router.post('/signup', async (req, res) => {
    const { email, password} = req.body
    // Verifie que l'email n'est pas déja enregistré
    const emailExist = await Users.findOne({ email: email}).lean();
    if (emailExist) return res.status(400).send('Email already exists');
    // Cryptage du mot de passe
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // Création d'un nouvel utilisateur
    try {
        const savedUser = await Users.create({
            email: email,
            password: hashedPassword     
        })
        res.send({ user: savedUser, message: 'user save' })
    } catch (err) {
        res.status(400).send({ error: err, message: 'user not save' })
    }
})

module.exports = router
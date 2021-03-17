const Users = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = "S3CR3TE"
const GeneralError = require('../untils/error')
const schemasSignup = require('../untils/validation')

exports.loginCtrl =  async (req, res, next) => {
    // Vérifie que l'email est bien enregistré 
    try {
        const user = await Users.findOne({ email: req.body.email }).lean()
        if (!user) throw new GeneralError('Email invalid', 401)
        // Vérifie si le mot de passe est correct
        const validatePassword = await bcrypt.compare(req.body.password, user.password)
        if (!validatePassword) throw new GeneralError('Email or Password invalid', 401)   
        // Creation du token 
        const token = jwt.sign({ _id: user._id }, SECRET, {expiresIn: '10h'})   
        res.json({
            success: true,
            userId: user._id,
            token: token 
        })  

    } catch (error) {
        next(error)
    }
}

exports.signupCtrl = async (req, res, next) => {
    try {
        const { error, value } = schemasSignup.validate(req.body)
        if (error) throw new GeneralError(error.details[0].message, 401)
        // Verifie que l'email n'est pas déja enregistré
        const emailExist = await Users.findOne({ email: req.body.email }).lean();
        if (emailExist) throw new GeneralError('Email already exists', 401);
        // Cryptage du mot de passe
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        // Création d'un nouvel utilisateur
        const savedUser = await Users.create({
            email: req.body.email,
            password: hashedPassword
        })
        res.json({ 
            success: true,
            message: 'user save' 
        })
    } catch (error) {
        next(error)
    }
}
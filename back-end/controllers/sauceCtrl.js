const Sauces = require('../models/Sauces')

exports.getAllSauce = async (req, res, next) => {
    try {
        const sauces = await Sauces.find()
        res.json(sauces)
    } catch (error) {
        next(error)
    }

}
exports.getSauceById = async (req, res, next) => {
    try {
        const sauce  = await Sauces.findOne({
            _id: req.params.id
        })
        if(!sauce) throw new Error('Sauce not found')
        res.json(sauce)
    } catch (error) {
        next(error)
    }
}

exports.addSauce = async (req, res, next) => {
    try {
        const sauce = await Sauces.create({
            
        })
    } catch (error) {
        
    }
}
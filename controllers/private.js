const Affiliate = require('../models/Affiliate');

exports.getPrivateData = (req, res, next) => {
    res.send('private data');
}

exports.affilatelist = async (req, res, next) => {
    const { type } = req.params;
    try {
        const affilate = await Affiliate.find({ type });
        res.status(201).json({
            success: true,
            data: affilate
        });
    }catch (err) {
        next(err);
    }
}
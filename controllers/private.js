const Affiliate = require('../models/Affiliate');
const Work = require('../models/Work');
const User = require('../models/User');

exports.getPrivateData = (req, res, next) => {
    res.send('private data');
}

exports.affilatelist = async (req, res, next) => {
    const { type } = req.params;
    try {
        const affilate = await Affiliate.findUser({ type });
        res.status(201).json({
            success: true,
            data: affilate
        });
    }catch (err) {
        next(err);
    }
}

exports.workentry = async (req, res, next) => {
    const { name, type, username } = req.body;
    console.log(req.body);
    const userId = await User.findOne({ username });

    const work = new Work({
        name,
        type,
        user: userId._id
    });
    try {
        const newWork = await work.save();
        res.status(201).json({
            success: true,
            data: newWork
        });
    } catch (err) {
        next(err);
    }
}

exports.worklist = async (req, res, next) => {
    const { username } = req.body;
    const userId = await User.findOne({ username });
    const work = await Work.find({ user: userId._id });
    res.status(201).json({
        success: true,
        data: work
    });
}

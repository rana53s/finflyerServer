const Affiliate = require('../models/Affiliate');
exports.affilate = async (req, res, next) => {
    const { name, description, link, whatsappUrl, type, catagory, campaignType, payment } = req.body;
    try {
        const affilate = new Affiliate({
            name,
            description,
            link,
            whatsappUrl,
            type,
            catagory,
            campaignType,
            payment
        });
        await affilate.save();
        res.status(201).json({
            success: true,
            data: affilate
        });
    }catch (err) {
        next(err);
    }
}

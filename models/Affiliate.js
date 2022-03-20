const mongoose = require('mongoose');

const AffiliateSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Please Provide Affiliate Name'] },
    description: {type: String, required: [false, 'Please Provide Affiliate Description'] },
    link: {type: String, required: [true, 'Please Provide Affiliate Link'] },
    whatsappUrl: {type: String, required: [false, 'Please Provide Affiliate Whatsapp Url'] },
    type: {type: String, enum:['finance','product'], default:'finance', required: [true, 'Please Provide Affiliate Type'] },
    catagory: {type: String, required: [false, 'Please Provide Affiliate Catagory'] },
    campaignType: {type: String, required: [false, 'Please Provide Affiliate Campaign Type'] },
    payment: {type: String, required: [false, 'Please Provide Affiliate Payment'] },
    createdAt: { type: Date, default: Date.now },
    lastModifiedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
});


const Affiliate = mongoose.model('Affiliate', AffiliateSchema);

module.exports = Affiliate;
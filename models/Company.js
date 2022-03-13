const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Please Provide Company Name'] },
    createdAt: { type: Date, default: Date.now },
    lastModifiedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
});

CompanySchema.static('findOneOrCreate', async function findOneOrCreate(condition, doc) {
    const one = await this.findOne(condition);
  
    return one || this.create(doc);
  });

const Lab = mongoose.model('Company', CompanySchema);

module.exports = Lab;
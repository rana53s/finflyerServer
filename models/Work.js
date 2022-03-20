const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Please Provide Work Name'] },
    type: {type: String, required: [true, 'Please Provide Work Type'] },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Please Provide User'] },
    isApproved: {type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    lastModifiedAt: { type: Date, default: Date.now }
});

const Work = mongoose.model('Work', WorkSchema);

module.exports = Work;
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const Company = require('./Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    firstname: { type: String, required: [true, 'Please add a firstname'], default: 'InValidFastName' },
    lastname: { type: String, required: [true, 'Please add a lastname'], default: 'InValidLastName' },
    username:{
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Please fill a valid email address"
        ]
    },
    phone:{
        type: String,
        required: [true, 'Phone is required'],
        trim: true,
        match: [
            /^[0-9]{10}$/, "Please fill a valid phone number"
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false
    },
    createdAt: { type: Date, default: Date.now },
    lastModifiedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    userType: {
        type: String,
        enum : ['superadmin','admin','user'],
        default: 'admin'
    },
    companyId: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

UserSchema.pre('save', async function (next) {
    now = new Date();
    this.lastModifiedAt = now;
    if(!this.createdAt){
        this.createdAt = now;
    }
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
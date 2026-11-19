const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateToken } = require('../utils/token.util');

const login = async (email, password) => {
    const user = await User.findOne({email}).select('+password');

    if(!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken(user._id);

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token
    };
};

module.exports = {
    login
};
const User = require('../models/User');
const { model } = require('../models/User');
const user = require('../models/User');
const createUser = (req, res) => {
    const data = req.body;
    user.create(data);
};



const getUserByEmail = async (email) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        return undefined;
    } else {
        return {
            _id: user.get('id'),
            email: user.get('email'),
            password: user.get('password'),
            token: user.get('accessToken')
        }

    }

}

module.exports = {
    createUser,
    getUserByEmail
}
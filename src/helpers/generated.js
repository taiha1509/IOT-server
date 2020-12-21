const jwt = require('jsonwebtoken');
const { config } = require('./configs');

const generateAccessToken = async function (userId) {

    const accessToken = await jwt.sign({_id: userId.toString()}, config.JWT_SECRET_KEY, {
        expiresIn: config.JWT_EXPIRE_TIME
    });
    return accessToken;
}

module.exports = {
    generateAccessToken,
}
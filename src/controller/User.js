var mongoose = require('mongoose');
var User = require('../models/User');
const validator = require('../helpers/validate');
const e = require('express');
const dateTime = require('../helpers/dateTime');
const bcrypt = require('bcrypt');
const UserServices = require('../services/UserServices');
const genToken = require('../helpers/generated');

const addUser = async (req, res) => {
    const test = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        description: '123'
    });

    const result = await test.save();
    return res.send({ status: 1, result: { result } });
}

const getUserById = async (req, res) => {
    const userId = req.params.userId;
    const userResult = await User.findById(userId);

    return res.send({ status: 200, result: { userResult } });
}

const signup = async (req, res) => {
    const { email, password } = req.body;
    const now = dateTime();
    const salt = bcrypt.genSaltSync(10);
    const id = mongoose.Types.ObjectId()
    const token = await genToken.generateAccessToken(id);
    const newUser = {
        _id: id,
        email: email,
        password: bcrypt.hashSync(password, salt),
        accessToken: token,
        createdDate: now,
        modifiedDate: now
    }

    const user = new User(newUser);
    const userExist = await UserServices.getUserByEmail(email);
    if (userExist) {
        return res.status(400).send({
            success: false,
            message: 'this email has already exist'
        })
    }
    user.save((err) => {
        if (err) {
            return res.status(412).send({
                success: false,
                message: err
            })
        }
        return res.status(200).json({
            success: true,
            message: "signup successful"
        });
    });
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserServices.getUserByEmail(email);
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const idForToken = mongoose.Types.ObjectId();
            const newToken = await genToken.generateAccessToken(idForToken);
            await User.findOne({ _id: user._id }, function (err, doc) {
                const newUser = new User(doc._doc);
                newUser.updateOne({_id: user._id}, {$set: {'accessToken': newToken}});
            });
            return res.status(200).send({
                success: true,
                result: {
                    email: user.email,
                    accessToken: newToken,
                    _id: user._id
                },
                message: "welcome"
            })
        }
        return res.send({
            success: false,
            message: "authenticate failure"
        })
    }

    return res.status(400).send({
        success: false,
        message: "this email is no longer exist"
    })
}

module.exports = {
    addUser,
    getUserById,
    signup,
    signin
}
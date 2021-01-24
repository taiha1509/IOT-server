var mongoose = require('mongoose');
var User = require('../models/User');
var mqttService = require('../services/MqttService');
var userServices = require('../services/UserServices');
var constants = require('../constants/index');

const turnOnLed = async (req, res) => {
    console.log(req.body.email);
    const { email, token } = req.body;
    const user = await userServices.getUserByEmail(email);
    if (user) {
        if (user.token == token) {
            mqttService.turnOnLed(constants.topic.LED_CONTROL, constants.message.TURN_ON_LED);
            return res.status(200).send({
                status: 1,
                message: 'ok'
            });
        }

        return res.status(401).send({ status: 0, message: 'authorized' });
    }


    return res.status(403).send({ status: 0, message: 'forbidden' });
}

const turnOffLed = async (req, res) => {
    const { email, token } = req.body;
    const user = await userServices.getUserByEmail(email);
    if (user) {
        if (user.token == token) {
            mqttService.turnOfLed(constants.topic.LED_CONTROL, constants.message.TURN_OFF_LED);
            return res.status(200).send({
                status: 1,
                message: 'ok'
            });
        }

        return res.status(401).send({ status: 0, message: 'anAuthorized' });
    }


    return res.status(403).send({ status: 0, message: 'forbidden' });
}


const getInfoByDate = async (req, res) => {
    const { email, token, date } = req.body;
    const user = await userServices.getUserByEmail(email);
    if (user) {
        if (user.token == token) {
            const result = await mqttService.getInfoByDate(date);

            return res.status(200).send({
                status: 1,
                message: 'ok',
                data: result
            });
        }

        return res.status(401).send({ status: 0, message: 'anAuthorized' });
    }


    return res.status(403).send({ status: 0, message: 'forbidden' });
}

const getCurrentInfo = async (req, res) => {
    const { email, token, date } = req.body;
    const user = await userServices.getUserByEmail(email);
    if (user) {
        if (user.token == token) {
            const result = await mqttService.getCurrentInfo();

            return res.status(200).send({
                status: 1,
                message: 'ok',
                data: result
            });
        }

        return res.status(401).send({ status: 0, message: 'anAuthorized' });
    }


    return res.status(403).send({ status: 0, message: 'forbidden' });
}

module.exports = {
    turnOnLed,
    turnOffLed,
    getInfoByDate,
    getCurrentInfo
}
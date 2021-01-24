var express = require('express');
var router = express.Router();
var mqttService = require('../services/MqttService');
var sensorController = require('../controller/Sensor');

router.post('/handle/led/on', sensorController.turnOnLed)

router.post('/handle/led/off', sensorController.turnOffLed);

router.post('/data/average', sensorController.getInfoByDate);

router.post('/data/current', sensorController.getCurrentInfo);

module.exports = router;

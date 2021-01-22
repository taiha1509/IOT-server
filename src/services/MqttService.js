var { url, topic } = require('../constants/index');

var mqtt = require('mqtt')
var client = mqtt.connect(url.MQTT_HOST);
const Figures = require('../models/Figures');
var mongoose = require('mongoose');



const getAndSave = async () => {
  client.on('connect', function () {
    client.subscribe(topic.TEMPERATURE_HUMIDITY, function (err) {
      console.log('connected to mqtt');
      if (err) {
        console.log('subcribe topic error');
      }
    })
  })



  client.on('message', function (topic, message) {

    console.log(message.toString())
    const messJson = JSON.parse(message.toString());

    if (!isNaN(messJson.Tem) && !isNaN(messJson.Hum)) {
      const date_now = new Date();
      const figure = new Figures({
        _id: mongoose.Types.ObjectId(),
        temperature: messJson.Tem,
        humidity: messJson.Hum,
        createdDate: date_now,
        modifiedDate: date_now
      })

      figure.save();
    }
  })



}


module.exports = {
  getAndSave,
}
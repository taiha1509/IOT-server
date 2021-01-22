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

//format date is like 12-12-2020 (day-month-year)
const getInfoByDate = async (date) => {
  try {
    const dateStringArr = date.split('-');
    const day = Number.parseInt(dateStringArr[0]),
      month = Number.parseInt(dateStringArr[1]),
      year = Number.parseInt(dateStringArr[2]);
    const today = new Date(year, month - 1, day, 0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const data = await Figures.find({ $and: [{ createdDate: { $gte: today } }, { createdDate: { $lte: tomorrow } }] });

    if (data.length > 0) {
      let total_temp = 0;
      let total_humidity = 0;
      data.forEach((item, index) => {
        total_temp += item._doc.temperature;
        total_humidity += item._doc.humidity;
      })

      const temperature = total_temp / data.length;
      const humidity = total_humidity / data.length;

      return {
        average_temperature: temperature,
        average_humidity: humidity,
        status: 1
      }
    }


    return {
      status: 0,
      message: "that date has no data",
    };
  } catch (e) {
    return {
      status: 0,
      message: 'invalid date'
    }
  }
}


const turnOnLed = (topic, message) => {
  client.publish(topic, message);
}

module.exports = {
  getAndSave,
  getInfoByDate,
  turnOnLed
}
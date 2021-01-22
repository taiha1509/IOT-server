const url = {
    MQTT_HOST: "mqtt://broker.hivemq.com",
}

const topic = {
    TEMPERATURE_HUMIDITY: "ESP8266/home/TempHumd",
    LED_CONTROL: 'ESP8266/LED/status',
    
}


const message = {
    TURN_ON_LED: 'ON',
    TURN_OFF_LED: 'OFF',
}

module.exports = {
    url, 
    topic,
    message,
}
const request = require('request')

const doc = 'https://openweathermap.org/current#geo'

const forecast = (latitude, langitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+langitude+'&appid=06134032a4eebd2b65433bdcb856cd19'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.cod != 200) {
            callback('unable to find location', undefined)
        }
        else {
            callback(undefined, body.cod)
        }
    })
}

module.exports = forecast
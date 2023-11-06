const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiczMyMyIsImEiOiJjbG1xa3kzc3owNmIxMnFwaXBrcDlqZ3JlIn0._8nJDeHlRoG2cefC2VbrKw'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (!body.features) {
            callback('unable to find location!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                langitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })

}

module.exports = geocode
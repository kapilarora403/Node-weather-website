const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoia2FwaWwtMDMwNyIsImEiOiJjank4eW92bHIwNnJsM29wYWIwN3phN2c4In0.GLQQu9wJJo9ZQJ9xhxOP1g'

    request({url, json: true}, (error, {body})=> {
        if(error) {
            callback('Unable to connect to location services')
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

const forecast = (lat, long, callback) => {
    const forecastUrl ='https://api.darksky.net/forecast/2bc3039a03f902b7abc89ce9e8a95bd6/' + lat + ',' + long + '?units=si'

    request({url: forecastUrl, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to forecast services')
        } else if(body.error) {
            callback('Location not found')
        } else {
            
            callback(undefined, [`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. 
            There is ${body.currently.precipProbability * 100}% chances of rain.`,
            `Tomorrow, there will be ${body.hourly.data[0].summary} and it will be ${body.hourly.data[0].temperature} degrees out.
            There will be ${body.hourly.data[0].precipProbability * 100}% chances of rain.
            `])
        }
    })

}

console.log('geocode is running')

module.exports = {
    geoCode: geoCode,
    forecast: forecast

}

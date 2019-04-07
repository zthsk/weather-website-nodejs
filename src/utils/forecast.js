const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9119ea2a61aacb52f71e61c6a95f66ea/'+latitude+','+longitude+'?units=si'
    
    request({url, json:true}, (error, {body}={}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.eror){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,{
                summary: body.daily.data[0].summary,
                temp: body.currently.temperature,
                rainChance: body.currently.precipProbability,
                minTemp: body.daily.data[0].temperatureMin,
                maxTemp: body.daily.data[0].temperatureMax
            })
        }
    })

}

module.exports = forecast
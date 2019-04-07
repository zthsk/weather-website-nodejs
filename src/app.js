const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Defining our express application
const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kshitiz Tiwari'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Kshitiz Tiwari'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kshitiz Tiwari',
        message: 'This is message for help.'
    })
})
// {latitude, longitude, location}
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })        
    }
    const location = req.query.address
    geocode(location, (error, {latitude, longitude, location} = {} ) => {
        if(error){
            console.log(error)
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, {summary,temp,rainChance} = {}) => {
            if (error){
                console.log(error)
                return res.send({ error })
            }
            res.send({
                location,
                forecast: summary,
                rainChance,
                temp,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 'Help',
        errorMessage: 'Help article not found!'
    })

})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Error',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})
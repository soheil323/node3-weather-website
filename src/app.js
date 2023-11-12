const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve

app.use(express.static(publicDirectoryPath))

//Routs

app.get('', (req, res) => {
    res.render('index', {
        title : "Weather App",
        name : "Soheil"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name : "Soheil"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: "Call 911 For Help! ;)",
        title: "Help",
        name : "Soheil"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please add some address!'
        })
    }
    geocode(req.query.address, (error, { latitude, langitude, location } = {}) => {
        if (error) {
     
            return res.send({ error })
        }
        else {
            forecast(latitude, langitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    result: forecastData,
                    location: req.query.address
                })
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help Article Not Found!',
        name: 'Soheil'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        message: 'Page Not Found!',
        name: 'Soheil'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})
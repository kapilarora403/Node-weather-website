const path = require('path')
const express = require('express')
const chalk = require('chalk')
const app = express()
const hbs = require('hbs') //To set views path
const geoCode = require('./utils/geoCode')

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directories location
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Andrew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        Name: 'Kapil Arora'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help resources',
        help: 'Type the issue'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send( {
            error: 'No address provided'
        })
    }

    geoCode.geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        geoCode.forecast(latitude, longitude, (error, foreCastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                location,
                foreCast: foreCastData,
                address: req.query.address
                


            })
        })
    })
    /*res.send({
        forecast: 'dnwd',
        address: req.query.address
    })*/
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } else {

    console.log(req.query.search)
    res.send( {
        products: []
    })
}
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'My 404 page title'
    })
})

//app.com
//ap.com/help
//app.com/admin

app.listen(3000, () => {
    console.log(chalk.green('Server is up on 3000'))
})
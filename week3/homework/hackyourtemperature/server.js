const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
const API_KEY = require('./sources/keys.json').API_KEY;

app.get('/', (req, res) => {
    res.render('index', { layout: 'main' });
});

app.post('/weather', (req, res) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName}&appid=${API_KEY}&units=metric`)
        .then(response => {
            res.status(200);
            res.render('index', {
                temperature: `In ${req.body.cityName} currently ${response.data.main.temp}°`,
                description: `${response.data.weather[0].main}`,
                windSpeed: `Wind Speed is ${response.data.wind.speed} m/s`
            })
        })
        .catch(error => {
            res.status(404);
            res.render('index', {
                temperature: `${req.body.cityName} is not found`
            })
        })
});

app.get('*', (req, res) => {
    res.render('404', { layout: 'error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });

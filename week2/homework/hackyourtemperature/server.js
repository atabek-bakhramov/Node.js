const express = require('express');
const handlebars  = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars({
  layoutsDir: __dirname + '/views',
}));

app.use(express.static('css'));

app.get('/', (req, res) => {
  res.render('index', {layout : 'index'});
});

app.post('/weather', function (req, res) { 
  const { cityName } = req.body;
  res.type('application/json');
  res.send(JSON.stringify(cityName));
  res.status(201);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });
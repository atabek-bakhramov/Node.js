const express = require('express');
const handlebars  = require('express-handlebars');

const app = express();

app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars({
  layoutsDir: __dirname + '/views',
}));

app.use(express.static('css'));

app.get('/', (req, res) => {
  res.render('main', {layout : 'main'});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });
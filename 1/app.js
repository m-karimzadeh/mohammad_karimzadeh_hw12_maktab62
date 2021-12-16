const express = require('express');
const app = express();

const siteController = require('./controllers/site');

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/file', express.static(path.join(__dirname, 'public')));

app.get('/', siteController.index);
app.get('/product/:id', siteController.product);
app.get('/contact', siteController.contact);
app.get('/about', siteController.about);

app.use(function(req, res){
    return res.redirect('/');
});

app.listen(3003)
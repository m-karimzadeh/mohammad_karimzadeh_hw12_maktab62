const express = require('express');
const app = express();

const path = require('path');

const userRouter = require('./routes/user')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/file', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.send('login application');
})

app.use('/user', userRouter);

app.use(function(req, res){
    res.send('page not found :(')
})

app.listen(3003)
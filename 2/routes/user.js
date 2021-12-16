const express = require('express');
const router = express.Router();

const userController = require('../controller/user')

const path = require('path');


router.get('/', function (req, res) {
    return res.redirect('user/login');
})

router.get('/login', function (req, res) {
    res.render('user/login');
})

router.post('/login', userController.login)

router.get('/register', function (req, res) {
    res.render('user/register');
})
router.post('/register', userController.register)

router.get('/profile/:username', 
    [userController.checkLogin],
    function (req, res) {
        res.render('user/profile');
    })
router.post('/profile/:username', [userController.checkLogin, userController.update])

router.get('/logout/:username', [userController.logout])

router.get('/forget', function (req, res) {
    res.render('user/forget');
})
router.post('/forget', [userController.forget])

router.use(function (req, res){
    return res.status(400).redirect('/user');
})





module.exports = router;
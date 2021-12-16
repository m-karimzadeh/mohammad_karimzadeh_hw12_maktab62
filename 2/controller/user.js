const fs = require('fs');
const validationFu = require('../tools/validation');

const path = require('path');

function register(req, res, next) {
    let users = [];
    if (fs.existsSync(path.join(__dirname, '../public/usersData.json'))) {
        users = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/usersData.json')));

    }

    let user = null;
    if (users.length > 0) {
        user = users.find(x => x.username == req.body.username);

    }

    if (user) {
        res.locals.errMsg = "Information Is Duplicate"
        return res.render('user/register');

    }

    users.push(
        {
            "username": req.body.username,
            "password": req.body.password,
            "email": req.body.email,
            "gender": req.body.gender,
            "isLoggedIn": false
        }
    )

    fs.writeFileSync(path.join(__dirname, '../public/usersData.json'), JSON.stringify(users))

    res.locals.resultMsg = "Registration completed successfully"
    return res.render('user/login');
}

function login(req, res, next) {
    let users = [];
    if (fs.existsSync(path.join(__dirname, '../public/usersData.json'))) {
        users = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/usersData.json')));

    }

    if (users.length > 0) {
        for (key in users) {
            if(users[key].username === req.body.username && users[key].password === req.body.password){
                users[key].isLoggedIn = true;

                fs.writeFileSync(path.join(__dirname, '../public/usersData.json'), JSON.stringify(users))

                return res.redirect(`/user/profile/${req.body.username}`);
            }
        }

    }

    res.locals.errMsg = "The login information is incorrect";
    return res.render('user/login');
}

function checkLogin(req, res, next) {
    let users = [];
    if (fs.existsSync(path.join(__dirname, '../public/usersData.json'))) {
        users = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/usersData.json')));
    }

    if (users.length > 0) {
        for (key in users) {
            if(users[key].username === req.params.username && users[key].isLoggedIn === true){
                res.locals.userInfo = users[key];
                return next();
            }
        }

    }

    return res.redirect('/user/login');
}

function update(req, res, next) {
    let users = [];
    if (fs.existsSync(path.join(__dirname, '../public/usersData.json'))) {
        users = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/usersData.json')));
    }

    if (users.length > 0) {
        for (key in users) {
            if(users[key].username === req.params.username){
                if (req.body.oldUsername !== req.body.username) {
                    let dublicateUser = users.find(x => x.username == req.body.username);
                    if(dublicateUser){
                        res.locals.errMsg = "Username is already registered";
                        return res.render('user/profile');
                    }
                    users[key].username = req.body.username;
                }
                users[key].password = req.body.password;
                users[key].email = req.body.email;
                users[key].gender = req.body.gender;
                users[key].isLoggedIn = false;
                
                fs.writeFileSync(path.join(__dirname, '../public/usersData.json'), JSON.stringify(users))

                return res.redirect('/user/login');
            }
        }

    }

    return res.redirect('/user/login');
}

function logout(req, res, next) {
    let users = [];
    if (fs.existsSync(path.join(__dirname, '../public/usersData.json'))) {
        users = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/usersData.json')));

    }

    if (users.length > 0) {
        for (key in users) {
            if(users[key].username === req.params.username && users[key].isLoggedIn === true){
                users[key].isLoggedIn = false;

                fs.writeFileSync(path.join(__dirname, '../public/usersData.json'), JSON.stringify(users))

                return res.redirect('/user/login');
            }
        }

    }

    return res.redirect('/user/login');
}

function forget(req, res, next) {
    let users = [];
    if (fs.existsSync(path.join(__dirname, '../public/usersData.json'))) {
        users = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/usersData.json')));
    }

    if (users.length > 0) {
        for (key in users) {
            if(users[key].username === req.body.username && users[key].email === req.body.email){
                users[key].isLoggedIn = true;

                fs.writeFileSync(path.join(__dirname, '../public/usersData.json'), JSON.stringify(users))

                return res.redirect(`/user/profile/${req.body.username}`);
            }
        }

    }

    res.locals.errMsg = "The user information is incorrect";
    return res.render('user/forget');
}



module.exports = {
    register,
    login,
    checkLogin,
    update,
    logout,
    forget
}
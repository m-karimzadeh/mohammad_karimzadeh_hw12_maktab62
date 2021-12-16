const fs = require('fs');
const path = require('path');


function index(req, res, next){
    let products = [];
    if (fs.existsSync(path.join(__dirname, '../public/productList.json'))) {
        products = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/productList.json')));

    }
    
    if(req.query.key){
        products = products.filter(x => (x.name.includes(req.query.key) || x.size.toString().includes(req.query.key) || x.color.includes(req.query.key) || x.price.toString().includes(req.query.key) || x.body.includes(req.query.key)));
    }
    
    return res.render('index', {products});

}

function product(req, res, next){
    let products = [];
    if (fs.existsSync(path.join(__dirname, '../public/productList.json'))) {
        products = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/productList.json')));

    }

    let product = products.find(x => x.id === (+req.params.id));
    if(!product){
        return res.redirect('/');
    }
    
    return res.render('product', {product});

}

function contact(req, res, next){    
    return res.render('contact');

}

function about(req, res, next){    
    return res.render('about');

}


module.exports = {
    index,
    product,
    contact,
    about
}
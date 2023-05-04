// Модули
const axios = require('axios')
const express = require('express')
const app = express()
// app.use(express.static('public'))
// Создание сервера

const PORT = 3000

const mongoose = require('mongoose');
require('dotenv').config();
const MongoClient    = require('mongodb').MongoClient;
const { MONGODB } = process.env;
const {Schema,model} = require('mongoose');

// Подключение БД
const db = 'mongodb+srv://kosse96:Essok69@cluster1.ggqkxrp.mongodb.net/?retryWrites=true&w=majority';


mongoose
.connect(db)
.then((res) => console.log('Connect to db'));

// Схема БД
const schema = new mongoose.Schema({
    login : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
});

// Схема товаров
const products = new mongoose.Schema({
    product_id : {
        type: String,
        required: true,
    },
    product : {
        type: String,
        required: true
    }
});

// Схема корзины
const carts = new mongoose.Schema ({
    productID : {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    UserId: {
        type:String,
        required:true
    }
});



const prod = mongoose.model('Products', products);
const users = mongoose.model('Users' , schema);
const cart = mongoose.model('Carts',carts);



app.listen(3000, () => {
    console.log(`Server started: http://localhost:${PORT}`)
})

// Главная страница



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});


app.get('/test', (req, res) => {
    let data = 1;
    res.send(data);
});
// Страница с числом

app.get('/Number',function(req,res){
    res.type('text/plain');
    let randomnumber=Math.floor(Math.random() * 100);
    res.json({data:randomnumber.toString()});
    console.log(randomnumber)
});




// Регистрация пользователя
app.get('/new',function(req,res){
    let login = req.query.login;
    let password = req.query.password;
    let name = req.query.name;
    users.create({
        login: login,
        password: password,
        name: name
    })
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
    console.log(req.query);
});






// Проверка логина и пароля

app.get('/check', async function (req, res) {
    let login = req.query.login;
    let password = req.query.password;
    let fail = "Неверный логин или пароль";
    const data = await users.find({login:login,password:password});
        res.json(data[0]);
        
    });


// Добавление товара в базу
    app.get('/prod',function(req,res){
        let productID = req.query.productID;
        let product = req.query.product;
        prod.create({
            product_id: productID,
            product: product,
        })
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
        console.log(req.query);
    });


// Добавление товара в корзину

app.get('/cart', async function(req,res){
    let productId = req.query.productId;
    let product = req.query.product;
    let userId = req.query.UserId;
    let produ = await prod.find({product_id:productId,product:product});
    cart.create({
        productID :produ[0].product_id,
        product:produ[0].product,
        UserId:userId
        });
    res.send("Добавлено в корзину:" + produ[0].product);
    console.log(produ);
    });
    






 
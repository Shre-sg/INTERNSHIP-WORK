//start
const Joi = require('joi');
const express = require('express');
const mysql = require('mysql');
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');

//all the route->created
const loginRoutes = require('./module/login');
const registerRouter = require("./module/register");
const categoriesRouter = require('./categories');
const productsRouter = require('./products');
const productDetailsRouter = require('./productDetails');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const orderHistoryRouter = require('./orderHistory'); 
const orderDetailsRouter = require('./orderDetails'); 

//start up with express
const app = express()
app.use(express.json());   //for post-express call
app.use(cors());
app.use(cookieParser());

app.use(session({
    secret: 'whatttsupppDawggggg',
    resave: false,
    saveUninitialized: true,
}));



//content
app.get('/', (req, res)=> {
    res.send('Hello World');
});

//content.login
app.use('/login', loginRoutes);
app.use('/register', registerRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter); 
app.use('/product-details', productDetailsRouter); 
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/order-history', orderHistoryRouter);
app.use('/order-details', orderDetailsRouter); 

app.post('/logout', (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error during logout' });
        }

        // Clear localStorage on the client side
        res.json({ message: 'Logout successful', clearLocalStorage: true });
    });
});



//end
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening to PORT', port));
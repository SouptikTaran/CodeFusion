const express = require('express')
const app = express();
const PORT = 8000
const colors = require('colors');
const PATH = require('path')
const userRoutes = require('./routes/user')
const compilerRoutes = require('./routes/compile')
const { validateToken } = require('./Services/authentication')
const cookieParser = require('cookie-parser');

//setting ejs 
app.set('view engine', 'ejs')
app.set('views', PATH.resolve('./views'))
app.use(express.static(__dirname + '/assets'));


//Database Connection
const db = require('./configs/mongoose')

//middlewares inbuilt
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//middlewares 
const { validateTokenCheck } = require("./middlewares/authenication")

//Routes
app.use('/user', userRoutes);
app.use('/compile', validateTokenCheck, compilerRoutes);

app.get('/', (req, res) => {
    var isLoggedIn = false;
    if (req.cookies.token) {
        isLoggedIn = true;
    }
    res.render('Home', { isLoggedIn: isLoggedIn });
});

//Error on page finding
app.use((req, res, next) => {
    res.status(404).render('error');
});


//Internal Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('internalError');
});
app.listen(PORT, () => {
    console.log(`SERVER STARTED : http://localhost:${PORT}/`.bgGreen.black)
})
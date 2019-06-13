const express = require('express');
const morgan = require('morgan');
const app = express();

const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
    next();
});

// Routes
app.use('/api/users',require('./routes/user.routes'));

// Strating the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});

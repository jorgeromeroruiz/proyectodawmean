const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const multer = require('multer');

const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin:'http://localhost:4200'}))
app.use(multer({
    dest: 'frontend/src/assets/images' 
}).single('photo'));

// Routes
app.use('/api/users',require('./routes/user.routes'));
app.use('/api/items',require('./routes/item.routes'));

// Strating the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});

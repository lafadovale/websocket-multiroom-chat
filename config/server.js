// Import the Express framework module
let express = require('express');

// Import consign module
let consign = require('consign');

// Import express-validator module
let expressValidator = require('express-validator');

// Start the Express object
let app = express();

// Set EJS 'view engine' and 'views' variables on Express
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Set up the express.static middleware
app.use(express.static('./app/public'));

// Set up the body parser middleware
app.use(express.urlencoded({extended: true}));

// Set up the express-validator middleware
app.use(expressValidator());

// Autoload routes, models and controllers to the app object
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

// Export the app object
module.exports = app;
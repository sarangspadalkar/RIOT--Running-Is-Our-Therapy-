var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');

var dbUser = process.env.DBUSER;
var dbPassword = process.env.DBPASSWORD;
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//set the path for static resources to be accessible
app.use('/assets', express.static(__dirname + '/assets'));

//setting secret for express session
var session = require('express-session');

app.use(
    session({
        secret: 'MySecretId',
        proxy: true,
        resave: true,
        saveUninitialized: true
    })
);
//Database Connection.
var initializeDb = async function () {
    try {
        mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.fy5hu.mongodb.net/runner-db?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            // we're connected!
            console.log("We're connected to runner-db!");
        });
    } catch (error) {
        console.log('Error while establishing database connection : ' + error);
    }
};

//Establish DB connection.
initializeDb();

// Below we are importing all the routing configurations into different variables.
var index = require(__dirname + '/routes/index');
var login = require(__dirname + '/routes/login');
var signup = require(__dirname + '/routes/signup');
var connection = require(__dirname + '/routes/connection');
var connections = require(__dirname + '/routes/connections');
var contact = require(__dirname + '/routes/contact');
var about = require(__dirname + '/routes/about');
var postreq = require(__dirname + '/routes/post_handler');

//Below we are routing the requests towards corresponding routes.
app.use('/postreq', postreq); //This route is used to handle all the post requests(RSVP(YES,NO,MAYBE), UPDATE and DELETE buttons).
app.use('/', index); //This route is used for home page.
app.use('/login', login); //This route is used for login page.
app.use('/signup', signup); //This route is used for signup page.
app.use('/connection', connection); //This route is used for connection page.
app.use('/connections', connections); //This route is used for connections page.
app.use('/about', about); //This route is used for about page.
app.use('/contact', contact); //This route is used for contact page.

app.listen(process.env.PORT || 3000, function () {
    console.log(`App running`);
});

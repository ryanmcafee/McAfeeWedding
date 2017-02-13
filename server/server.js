var express = require('express');
var path = require('path');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

//Require the postmark client sdk
var postmark = require("postmark");

const postmark_api_key = process.env.POSTMARK_API_KEY;

console.log(postmark_api_key);

//Create the postmark client
var postmarkclient = new postmark.Client(postmark_api_key);



//Get the port the app should be hosted on
var port = process.env.port ? process.env.port : 3000;

//Determine if app is running in production mode
var isProduction = (process.env.NODE_ENV === 'production');

//Instantiate express app
var app = express();
//Instantiate handlebars
var hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: 'server/views/layouts/',
    partialsDir: 'server/views/partials/'
});

//Allows express to parse body payloads from forms
app.use(bodyParser());

app.set('views', 'server/views');
//Set up the view engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//Serve resources from the client directory
app.use(express.static(path.resolve('client')));

//Deliver the view
app.get('/', function (req, res) {
  res.render('home');
});

app.get('/home', function (req, res) {
  res.render('home');
});

app.get('/our-story', function (req, res) {
  res.render('our-story');
});

app.get('/contact-us', function (req, res) {
  res.render('contact');
});

app.post('/contact-us', function (req, res) {
  const body = req.body;

  console.log(body);

  postmarkclient.sendEmail({
    "From": "info@mcafeewedding.com",
    "To": "admin@ryanmcafee.com",
    "Subject": "New Wedding Website Message!",
    "TextBody": body.message,
  }, function(error, result) {
    if(error) {
      console.error("Unable to send via postmark: " + error.message);
      return;
    }
    console.info("Sent to postmark for delivery")
  });


  res.render('contact');
});

app.get('/wheretostay', function (req, res) {
  res.render('wheretostay');
});

app.get('/thingstodo', function (req, res) {
  res.render('thingstodo');
});

app.get('/rsvp', function (req, res) {
  res.render('rsvp');
});

app.get('/engage', function (req, res) {
  res.render('engage');
});

app.get('/directions', function (req, res) {
  res.render('directions');
});

app.get('/registry', function (req, res) {
  res.render('registry');
});

//Turn on view cache when in production mode
if(isProduction){
  app.enable('view cache');
}

//Listen and serve requests
app.listen(port, function () {
  console.log(`Listening for requests on port ${port}!`)
});

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
  res.render('home', {
    active: {
      home: true
    }
  });
});

app.get('/home', function (req, res) {
  res.render('home', {
    active: {
      home: true
    }
  });
});

app.get('/our-story', function (req, res) {
  res.render('our-story', {
    active: {
      ourstory: true
    }
  });
});

app.get('/contact-us', function (req, res) {
  res.render('contact', {
    active: {
      contactus: true
    }
  });
});

app.post('/contact-us', function (req, res) {
  res.render('contact', {
    active: {
      contactus: true
    }
  });
});

app.get('/wheretostay', function (req, res) {
  res.render('wheretostay', {
    active: {
      wheretostay: true
    }
  });
});

app.get('/thingstodo', function (req, res) {
  res.render('thingstodo', {
    active: {
      thingstodo: true
    }
  });
});

app.get('/rsvp', function (req, res) {
  res.render('rsvp', {
    active: {
      rsvp: true
    }
  });
});

app.get('/engage', function (req, res) {
  res.render('engage', {
    active: {
      engage: true
    }
  });
});

app.get('/directions', function (req, res) {
  res.render('directions', {
    active: {
      directions: true
    }
  });
});

app.get('/registry', function (req, res) {
  res.render('registry', {
    active: {
      registry: true
    }
  });
});

//API
app.post('/api/contact', function (req, res) {

  const body = req.body;

  const htmlBody = "<html><div><h3>Subject: </h3><span>" + body.subject + "</span></div>" +
                    "<div><h3>Name: </h3><span>" + body.firstname + " " + body.lastname + "</span></div>" +
                    "<div><h3>Email Address: </h3><span>" + body.email + "</span></div>" +
                    "<div><h3>Phone Number: </h3><span>" + body.phone + "</span></div>" +
                    "<div><h3>Message: </h3><p>" + body.message + "</p></div>" +
                    "<div><span>----------------------------------------------------</span></div>" +
                    "<div><span>Message sent from contact form on meetthemcafees.com</span></div>" +
    "</html>";

  postmarkclient.sendEmail({
    "From": "noreply@meetthemcafees.com",
    "To": "admin@ryanmcafee.com",
    "ReplyTo": body.email,
    "Subject": body.subject,
    "HtmlBody": htmlBody
  }, function(error, result) {

    if(error !== null) {
      console.log("Error", error);
      res.status(500).json({
        status: false,
        message: "Error",
        description: 'Unable to send email, email server down! Please try again later.',
        code: 500,
        error: error
      })
    } else {
      console.log("Email delivery result", result);
      console.info("Sent to postmark for delivery");
      res.json({
        status: true,
        message: "Success",
        description: 'Message was sent for delivery!',
        code: 200
      })
    }

  });

});


//Turn on view cache when in production mode
if(isProduction){
  app.enable('view cache');
}

//Listen and serve requests
app.listen(port, function () {
  console.log(`Listening for requests on port ${port}!`)
});

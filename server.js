// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/timestamp/:date_string?", function (req, res) {
  let date, date_string = req.params.date_string;
  console.log(Number.isInteger(date_string));
  if (typeof date_string == 'undefined') {
    // set date to current date
    date = new Date();
  } else if (isNaN(date_string)) {
    // parse passed in date
    date = new Date(date_string);
  } else {
    // convert to number and then parse date
    date = new Date(Number.parseInt(date_string));
  }

  res.json({unix: date.getTime(), utc: date.toUTCString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

"use strict";

const util = require("util");

const express = require('express');
const app = express();
const path = require('path');

const waitASecond = function(f) {
    setTimeout(f, 1000);
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// set the view engine to ejs
app.set('view engine', 'ejs'); // http://expressjs.com/api.html#app.set

var expressLayouts = require('express-ejs-layouts');
app.set('layout', 'layout'); // defaults to 'layout'  '

const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(fileUpload());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));
app.use(expressLayouts);


app.post("/", (req, resp) => {
  // See https://www.npmjs.com/package/express-fileupload
	const getFile = function() {
    if (!req.files || Object.keys(req.files).length === 0) return "No files were uploaded";
    console.log("req.files = \n"+util.inspect(req.files));

    let sampleFile = req.files.somefile;
    sampleFile.mv(__dirname+'/trash/'+req.files.somefile.name, function(err) {
        if (err) return "Error: "+err;
      });
    return 'File uploaded!\n'+util.inspect(req.files);
  };

  console.log(req.body);
  waitASecond(function() { /* Let's simulate a slow network */
		resp.render('result', 
      {
        title: "Result", 
        reqbody: util.inspect(req.body), 
        fileInfo: getFile()
      }
    );
	});
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});


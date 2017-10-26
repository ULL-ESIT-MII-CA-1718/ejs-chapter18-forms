"use strict";

const util = require("util");

const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(fileUpload());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));


app.post("/", (req, resp) => {
  // See https://www.npmjs.com/package/express-fileupload
	const getFile = function() {
    if (!req.files || Object.keys(req.files).length === 0) return "No files were uploaded";
    console.log("req.files = \n"+util.inspect(req.files));

    let someFile = req.files.somefile;
    someFile.mv(__dirname+'/trash/'+req.files.somefile.name, function(err) {
        if (err) return "Error: "+err;
      });
    return 'File uploaded!\n'+util.inspect(req.files);
  };

  console.log(req.body);
  resp.send(
      {
        reqbody: util.inspect(req.body), 
        fileInfo: getFile()
      }
    );
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});


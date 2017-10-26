"use strict";

const util = require("util");

const express = require('express');
const app = express();
const path = require('path');

const waitASecond = function(f) {
    setTimeout(f, 1000);
};

const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(fileUpload());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));


app.post("/", (req, resp) => {
	const getFile = function() {
    if (!req.files) return "No files were uploaded";
    console.log("req.files = \n"+util.inspect(req.files));
    let sampleFile = req.files.somefile;
    sampleFile.mv(__dirname+'/trash/'+req.files.somefile.name, function(err) {
        if (err) return "Error: "+err;
      });
    return 'File uploaded!';
  };

  console.log(req.body);
  waitASecond(function() { /* Let's simulate a slow network */
    resp.send(`
        Response from server: <b>Hello dear client!</b><br/>
        <p>
        The <b>name</b> attribute of a form field determines the way its value
        will be identified in the server when the request from the form arrives. </br>
        <b>req.body</b> is an object containing the values of the attributes 
        sumitted.
        </p>
        Here is how your form has arrived to me:<br/>
        <pre>
        req.body = 
        ${util.inspect(req.body)}
       </pre>
       The file on the server side: ${getFile()}
      `);
	});
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});


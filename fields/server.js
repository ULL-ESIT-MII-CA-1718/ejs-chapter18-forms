"use strict";

const util = require("util");

const express = require('express');
const app = express();
const path = require('path');

const waitASecond = function(f) {
    setTimeout(f, 1000);
};

const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

app.post("/", (req, resp) => {
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
      `);
	});
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});


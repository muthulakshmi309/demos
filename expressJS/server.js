var express = require("express"),
    bodyParser = require("body-parser"),
    path = require('path'),
    app = express(),
    service = require('./rest-api-services');

const port = process.env.PORT || 4000;

// Absolute path
// app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/static', express.static('public'));

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

//An error handling middleware
app.use(function (err, req, res, next) {
    res.status(500);
    res.send("Oops, something went wrong...")
});

app.get("/", (req, res) => res.redirect('/index'));

app.get("/index", (req, res) => {
    // give absolute path or set root directory
    res.sendFile(path.join(__dirname + '\\index.html'));

    //or set the root directory
    // res.sendFile('index.html', {
    //     root: __dirname
    // });
});
app.get("/first", (req, res) => {
    console.log(res);
    res.send(`first page is loaded`);
});

// RESTful API - select table
app.get("/getVendor", service.getVendor);
// RESTful API - call a Stored procedure
app.get("/getScenario/:batchName", service.getScenario);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
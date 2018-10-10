var express = require("express"),
    bodyParser = require("body-parser"),
    path = require('path'),
    mysql = require('mysql'),
    app = express();

    global.connection = null;

const port = process.env.PORT || 4000;

// Connect to mySQL database
global.connection = mysql.createConnection({
    host: '192.168.1.30',
    user: 'dbadmin',
    password: 'ca1490c58c',
    database: 'keplercms_debug'
});

app.set('view engine', 'html');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(function (err, req, res, next) {
    console.log("There is some error...");
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

// RESTful API 
app.get("/getVendor", (req, res) => {
    global.connection.connect();
    global.connection.query('SELECT * FROM tblvendor', function (err, rows, fields) {
        global.connection.end();

        if (err) {            
            res.status(403).send(err);
        } else {
            res.status(200).json(rows);
        }        
    })   

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
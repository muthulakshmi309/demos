var express = require("express"),
    bodyParser = require("body-parser"),
    path = require('path'),
    app = express();

const port = process.env.PORT || 4000;

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
    res.sendFile(path.join(__dirname + '\\index.html'));

    //or set the root folder
    // res.sendFile('index.html', {
    //     root: __dirname
    // });
});
app.get("/first", (req, res) => {
    console.log(res);
    res.send(`first page is loaded`);
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
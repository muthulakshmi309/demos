var express = require("express"),
    bodyParser = require("body-parser");
app = express();

const port = 4000;

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
    console.log("There is some error...");
});
app.get("/", (req, res) => res.send("Server has started... It is running on port " + port));
app.get("/first", (req, res) => {   
    console.log(req.baseUrl);
    res.send("first page is loaded");  
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// Stock Market Portfolio App By Taylor Laird
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;


// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API KEY pk_287eca80dc0b4a4d9fcd86c268844876
// create call api function 
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote/?token=pk_287eca80dc0b4a4d9fcd86c268844876', { json: true }, (err, res, body) => {
        if (err) {return console.log(err);}
        if (res.statusCode === 200){
            // console.log(body);
            finishedAPI(body);
        };
    });  
};






// Set Handlebars Middle ware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherStuff = "hello there, this is other stuff!"

// Set handlebars index GET route
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
            res.render('home', {
            stock: doneAPI
        });
    }, 'fb');

});

// // Set home page route
// app.get('/homepage.html', function (req, res) {
// });


// Set handlebars index POST route
app.post('/', function (req, res) {
    call_api(function(doneAPI) {
            // posted_stuff = req.body.stock_ticker;
            res.render('home', {
            stock: doneAPI,
        });
    }, req.body.stock_ticker);

});

// Set about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));

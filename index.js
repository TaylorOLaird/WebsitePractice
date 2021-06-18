// Stock Market Portfolio App By Taylor Laird
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');

const PORT = process.env.PORT || 5000;


// API KEY pk_287eca80dc0b4a4d9fcd86c268844876
// create call api function 
function call_api(finishedAPI) {
    request('https://cloud.iexapis.com/stable/stock/fb/quote/?token=pk_287eca80dc0b4a4d9fcd86c268844876', { json: true }, (err, res, body) => {
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

// Set handlebars routes
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
            res.render('home', {
            stock: doneAPI
        });
    });

});

// Set about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));

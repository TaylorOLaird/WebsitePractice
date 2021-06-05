const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Set Handlebars Middle ware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherStuff = "hello there, this is other stuff!"

// Set handlebars routes
app.get('/', function (req, res) {
    res.render('home', {
    	stuff: otherStuff
    });
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));

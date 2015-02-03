var express = require('express');
var app = express();

app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.set('views', require('path').join(__dirname, 'views'));
app.use(express.static(require('path').join(__dirname, 'public')));


app.get('/', function(req, res) {
	// res.send('Hello World');
	res.render('register');
});

app.listen(80);
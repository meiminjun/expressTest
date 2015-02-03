var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

var router = require('./routes/index.js');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(multer());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 10 //过期时间设置(单位毫秒)
	}
}));
app.use(function(req, res, next) {
	res.locals.user = req.session.user;
	var err = req.session.error;
	res.locals.message = '';
	if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
	next();
});
router(app);
app.listen(app.get('port'), function() {
	console.log('Express server listening on port' + app.get('port'));
});
// app.get('/', function(req, res) {
// 	res.render('index');
// });

// app.get('/login', function(req, res) {
// 	res.render('login');
// });
// app.post('/login', function(req, res) {
// 	// console.log(req);
// 	// console.log(req.body);
// 	console.log("用户名称为：" + req.body.username);
// 	var test = "dfdfd";

// 	var user = {
// 		username: 'admin',
// 		password: 'admin'
// 	};
// 	if (req.body.username == user.username && req.body.password == user.password) {
// 		res.session.user = user;
// 		res.sendStatus(200);
// 	} else {
// 		res.sendStatus(404);
// 	}

// });

// app.get('/home', function(req, res) {
// 	res.render('home');
// });


// app.listen(8000);
var User = require('../models/user');
var debug = require('debug')('mysql:routes:index');
module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index');
	});
	app.get('/index', function(req, res) {
		res.render('index');
	});

	app.get('/login', function(req, res) {
		res.render('login');
	});
	app.post('/login', function(req, res) {
		User.get(req.body.username, function(err, data) {
			if (err) {
				console.log("回调的" + err);
			}
			if (Array.isArray(data) && data.length >= 1) {
				req.session.user = data[0];
				res.sendStatus(200);
			} else {
				req.session.error = "用户名或密码不正确";
				res.sendStatus(404);
			}
		});
	});
	app.get('/home', function(req, res) {
		if (req.session.user) {
			res.render('home');
		} else {
			req.session.error = "请先登录";
			res.redirect('login');
		}
	});

	app.get('/logout', function(req, res) {
		req.session.user = null;
		req.session.error = null;
		res.redirect('index');
	});
};
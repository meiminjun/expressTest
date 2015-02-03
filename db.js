var mysql = require('mysql');
var express = require('express');
var app = express();


app.set('view engine', 'ejs');
app.set('views', __dirname);
app.engine('.html', require('ejs').__express);
app.use(express.static(require('path').join(__dirname, 'public')));

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'test'
});
connection.connect();
app.get('*', function(req, res) {


	connection.query('SELECT * from testnode', function(err, rows, fields) {
		if (err) throw err;
		res.send(rows);
		console.log('The solution is: ', rows);
		// console.log(results)
	});

	// connection.end();
});



// var name = '冯黎亚';
// var sql    = 'SELECT * FROM testnode WHERE name = ' + connection.escape(name);
// connection.query(sql, function(err, results) {
//   // console.log(results);
// });

// var name2 = "冯黎亚";
// var age = 13;
// var sql2 = 'SELECT * FROM testnode WHERE name = ? and age = ?';
// connection.query(sql2, [name2,age], function(err, results) {
//   console.log(results);
// });

// 
app.listen(8000);
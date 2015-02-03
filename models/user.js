var db = require('./db').db;

function User(user) {
	this.username = user.username;
	// this.password = user.password;
}

module.exports = User;
User.get = function(username, callback) {
	var sql = 'select * from testnode where name = ?';
	db.query(sql, [username], function(err, data) {
		// console.log(err);		
		if (err) {
			return callback(err); //失败！返回 err 信息
		}
		callback(null, data);
		// if (Array.isArray(data) && data.length >= 1) {
		// 	console.log("回调之前数据" + data);
		// 	callback(null, data); //成功！返回查询的用户信息
		// }
	});
};
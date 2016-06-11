/**
 * Created by tommy on 2016/6/11.
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'quiz_engine'
});

connection.connect();

connection.query('SELECT * from token where token = "1ab9a253815da1cfbd43fab52ab096b4"', function(err, rows, fields) {
    if (!err)
        console.log('The solution is: ', rows);
    else
        console.log('Error while performing Query.');
});

connection.end();
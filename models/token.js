/**
 * Created by tommy on 2016/6/18.
 */
var db = require('./db.js');

exports.create = function(userId, text, done) {
    var values = [userId, text, new Date().toISOString()];

    db.get().query('INSERT INTO token (user_id, token, date) VALUES(?, ?, ?)', values, function(err, result) {
        if (err) return done(err);
        done(null, result.insertId)
    })
};

exports.getByToken = function(token, done) {
    db.get().query('SELECT * FROM token WHERE token = ?', token, function (err, rows) {
        if (err) return done(err);
        done(null, rows)
    })
};
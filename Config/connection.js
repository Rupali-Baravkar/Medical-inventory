// giving mysql connection export

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'demo',
    user: 'root',
    password: 'password',
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connection established');
});

module.exports = connection;

require('dotenv').config()
const { dbConfig } = require('./config/config');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: dbConfig.host,
    database: dbConfig.database,
    user: dbConfig.user,
    password: dbConfig.password,
    port: dbConfig.port
});


connection.connect(err => {
    if (err) throw err
    console.log('DB esta conectada')
});

module.exports = connection;
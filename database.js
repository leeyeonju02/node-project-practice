// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     port: 3306,
//     user: 'root',
//     password: 'leeyj4603',
//     database: 'lyj_database',
// });

// module.exports = connection;

const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'leeyj4603',
    database: 'lyj_database',
});

module.exports = connection;
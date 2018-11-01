const mysql = require('mysql');
const verbindung = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'todo'
});

module.exports = verbindung;
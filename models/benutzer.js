const mysqlModel = require('mysql-model');
var myModel = mysqlModel.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo'
}) 



module.exports = myModel;
const mysql = require('mysql')
const db = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "", 
    database: "crud_nodejs"
})

module.exports = db
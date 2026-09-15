const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "biodata"
});

db.connect((err) => {

    if (err) {
        console.error("DB Error:", err.message);
    } else {
        console.log("Connected to MySQL Database!");
    }

});

module.exports = db;
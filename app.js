const express = require("express");
const db = require("./main");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {

    const sql = "SELECT * FROM biodata ORDER BY id DESC";

    db.query(sql, (err, results) => {

        if (err) {
            console.error("SELECT ERROR:", err);
            return res.status(500).send("Database error");
        }

        res.render("bio_data", {
            biodata: results
        });

    });

});



app.post("/add", (req, res) => {

    console.log("FORM DATA:", req.body);

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const gender = req.body.gender;
    const address = req.body.address;
    const email = req.body.email;
    const phone = req.body.phone;

    const sql = `
        INSERT INTO biodata
        (firstname, lastname, age, gender, address, email, phone)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        firstname,
        lastname,
        age,
        gender,
        address,
        email,
        phone
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.error("INSERT ERROR:", err);
            return res.status(500).send(
                "Failed to save biodata: " + err.message
            );
        }

        console.log("Information saved!");
        console.log("New ID:", result.insertId);

        res.redirect("/");

    });

});



app.get("/delete/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM biodata WHERE id = ?";

    db.query(sql, [id], (err) => {

        if (err) {
            console.error("DELETE ERROR:", err);
            return res.status(500).send("Delete failed");
        }

        res.redirect("/");

    });

});



app.listen(9004, () => {

    console.log("Server running at http://localhost:9004");

});
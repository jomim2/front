const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

require('dotenv').config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error('db접속 실패!', err)
    } else {
        console.log('db접속 성공!');
    }
});

// 보여달라고 할꺼야! get
app.get('/guest', (req, res) => {
    db.query(`SELECT * FROM guest ORDER BY created_at DESC`, (err, results) => {
        res.json(results);
    })
});

// post 방식
app.post('/guest', (req, res) => {
    const { name, message } = req.body;
    db.query(`insert into guest (name , message) values (? , ?)`, [name, message],
        (err) => {
            if (err) return res.status(500).send(err);
        }
    )
});

app.listen(8080, () => {
    console.log('8080 포드에서 대기중 ');
})

const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "nodejs",
  port: "3307"
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "logout 되었습니다." });
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const pw = req.body.pw;
  var sql = `SELECT * FROM members WHERE email = '${email}' && pw = '${pw}'`;
  con.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      res.json({ message: false });
    } else {
      if (result[0]) {
        req.session.no = result[0].no;
        req.session.email = result[0].email;
        req.session.name = result[0].name;

        console.log(email + "로그인");

        res.json({
          message: result[0].name + "님 로그인 환영합니다.",
          email: req.session.email,
          no: req.session.no,
          name: req.session.name
        });
      } else {
        console.log(err);
        res.json({ message: false });
      }
    }
  });
});
router.post("/insert", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const pw = req.body.pw;
  const comments = req.body.comments;

  var sql = `INSERT INTO members (name,email,pw,comments) VALUES (?, ?,?,?)`;
  con.query(sql, [name, email, pw, comments], function(err, result) {
    if (err) {
      console.log(err);
      res.json({ message: false });
    } else {
      console.log("1 record inserted");
      res.json({ message: name + "님 회원가입 환영합니다." });
    }
  });
});

module.exports = router;

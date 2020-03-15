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

router.get("/view", (req, res) => {
  var sql = `SELECT * FROM members INNER JOIN board ON members.no = board.m_no ORDER BY createdAt DESC`;
  con.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      res.json({ message: false });
    } else {
      res.json({ posts: result });
    }
  });
});

router.post("/insert",(req, res) => {
  const no = req.body.no;
  const title = req.body.title;
  const comments = req.body.comments;
  var sql = `INSERT INTO board (m_no,title,content) VALUES (?, ?,?)`;
  con.query(sql, [no, title, comments], function(err, result) {
    if (err) {
      console.log(err);
      res.json({ message: false });
    } else {
      console.log("1 record inserted");
      res.json({ message: "작성완료" });
    }
  });
});

router.post("/delete", (req, res) => {
  const board_no = req.body.board_no;
  var sql = `DELETE FROM board WHERE b_no = ?`;
  con.query(sql, [board_no], function(err, result) {
    if (err) {
      console.log(err);
      res.json({ message: false });
    } else {
      console.log("1 record deleted");
      res.json({ message: "제거완료" });
    }
  });
});

module.exports = router;

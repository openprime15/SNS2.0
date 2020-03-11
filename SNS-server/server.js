const memberRouter = require("./routes/memberRouter");
const boardRouter = require("./routes/boardRouter");
const express = require("express");
const cors = require("cors");
const session = require("express-session");

const corsOptions = {
  origin: true,
  credentials: true
};

const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "킹--민--철",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

app.use("/member", memberRouter);
app.use("/board", boardRouter);

const server=app.listen(8080, () => {
  console.log("8080 server ready..");
});

const a = require("./socket");
a(server);
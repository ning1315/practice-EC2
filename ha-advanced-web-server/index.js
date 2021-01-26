const express = require("express");
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const session = require('express-session');
require("./models");

// TODO : express-session, cors 등 필요한 middleware를 추가하세요.

const mainController = require("./controllers");

const app = express();

const port = 4000;

// TODO : express-session, cors 등 필요한 middleware를 적용하세요.
app.use(
  session({
    secret: '@apple!!',
    resave: true,
    saveUninitialized: true,
    cookie: {
      domain: "localhost",
      path: "/",
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: "None",
      httpOnly: true,
      secure: true,
    },
  })
);
app.use(express.json());
app.use(cors({
  origin: "https://localhost:3000",
  method: "GET, POST, OPTION",
  credentials: true,
}));

app.get("/user", mainController.userController);
app.post("/signin", mainController.signInController);
app.post("/signup", mainController.signUpController);
app.post("/signout", mainController.signOutController);

// TODO : http 프로토콜 대신 https 프로토콜을 사용하는 서버를 작성하세요.

const server = https
  .createServer(
    {
      key: fs.readFileSync('../key.pem', 'utf-8'),
      cert: fs.readFileSync('../cert.pem', 'utf-8'),
    },
    app
  )
  .listen(port);

  module.exports = server
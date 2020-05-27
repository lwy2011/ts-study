const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const CookieParser = require("cookie-parser");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(CookieParser());
const router = express.Router();

const cors = {
  "Access-Control-Allow-Origin": "http://localhost:8081",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Methods": "POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
router.post("/more/server2", (req, res) => {  //跨域发送完options之后再发送原本的请求。
  res.set(cors);
  res.json(req.cookies);
});
router.options("/more/server2", (req, res) => {  //跨域先发送options
  res.set(cors);
  res.end();
});


app.use(router);

const port =  8088;

module.exports = app.listen(port, () => {
  console.log(`${port} listening`);
});


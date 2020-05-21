const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config");
const express = require("express");
const app = express();
const compiler = webpack(webpackConfig);
const bodyParser = require("body-parser");
app.use(webpackDevMiddleware(compiler, {
  publicPath: "/__build__/",
  stats: {
    colors: true,
    chunks: false
  }
}));

app.use(webpackDevMiddleware(compiler));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const router = express.Router();
router.get("/simple/get", (req, res) => {
  res.json({
    msg: "hello!!"
  });
});
router.get("/base/get", (req, res) => {
  res.json(req.query);
});
router.post("/base/post", (req, res) => {
  res.json(req.body);
});
router.post("/base/buffer", (req, res) => {
  const msg = [];
  req.on("data", chunk => {
    chunk && msg.push(chunk);
  });
  req.on("end", () => {
    let buf = Buffer.concat(msg);
    res.json(buf.toJSON());
  });
});
router.get("/error/get", (req, res) => {
  res.json(req.query);
});
router.get("/error/timeout", (req, res) => {
  setTimeout(
    () => {
      res.json(req.query);
    }, 2100
  );
});
router.get("/error/responseFailed", (req, res) => {
  res.status(500);
  res.end();
});
app.use(router);

const port = process.env.PORT || 8081;

module.exports = app.listen(port, () => {
  console.log(`${port} listening`);
});

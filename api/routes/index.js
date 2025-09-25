const fs = require("fs");
var express = require('express');
var router = express.Router();


let routes = fs.readdirSync(__dirname);

for (let route of routes) {
  if (route.includes(".js") && route != "index.js") {
    router.use("/" + route.replace(".js", ""), require('./'+route));
  }
}

module.exports = router;

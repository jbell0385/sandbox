var express = require('express');
var bodyParser  = require("body-parser");
var axios = require('axios');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



module.exports = router;

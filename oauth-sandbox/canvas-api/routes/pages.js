var express = require('express');
var bodyParser  = require("body-parser");
var axios = require('axios');
var router = express.Router();


/* GET home page. */
// router.get('/:id', function(req, res, next) {
//     var courses = [];
//     var baseUrl = "https://emspmg.instructure.com";
//     var endpoint = '/api/v1/courses';
//     var accessToken = "?access_token=11002~zCEbqRxEFiuAmw4eU6kNuzj4vtiMFfGlPMFL1tUnWTFsrI6T7h5zZeXYhxP6SvCd";
//     axios.get(baseUrl + endpoint + accessToken)
//     .then(function (response) {
//       courses = response.data;
//       res.render('pages', { courses: courses });
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });



module.exports = router;

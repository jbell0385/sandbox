var express = require('express');
var bodyParser  = require("body-parser");
var axios = require('axios');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var courses = [];
  var baseUrl = "https://emspmg.instructure.com";
  var endpoint = '/api/v1/courses';
  var accessToken = "?access_token=11002~zCEbqRxEFiuAmw4eU6kNuzj4vtiMFfGlPMFL1tUnWTFsrI6T7h5zZeXYhxP6SvCd&per_page=40";
  axios.get(baseUrl + endpoint + accessToken)
  .then(function (response) {
    courses = response.data;
    res.render('courses', { courses: courses });
  })
  .catch(function (error) {
    console.log(error);
  });
});

router.get('/:id', (req,res)=>{
    var courseId = req.params.id;
    var pages = [];
    var baseUrl = "https://emspmg.instructure.com";
    var endpoint = '/api/v1/courses/' + courseId + '/pages';
    var accessToken = "?access_token=11002~zCEbqRxEFiuAmw4eU6kNuzj4vtiMFfGlPMFL1tUnWTFsrI6T7h5zZeXYhxP6SvCd&per_page=40";
    axios.get(baseUrl + endpoint + accessToken)
    .then(function (response) {
        pages = response.data;
        res.render('pages', { pages: pages, courseId:courseId });
    })
    .catch(function (error) {
        console.log(error);
    });
})

router.get('/:id/pages/:url', (req,res)=>{
    var courseId = req.params.id;
    var pageUrl = req.params.url;
    var page = [];
    var baseUrl = "https://emspmg.instructure.com";
    var endpoint = '/api/v1/courses/' + courseId + '/pages/' + pageUrl;
    var accessToken = "?access_token=11002~zCEbqRxEFiuAmw4eU6kNuzj4vtiMFfGlPMFL1tUnWTFsrI6T7h5zZeXYhxP6SvCd&per_page=40";
    axios.get(baseUrl + endpoint + accessToken)
    .then(function (response) {
        page = response.data;
        res.render('page-show', { page: page, courseId:courseId, pageUrl:pageUrl });
    })
    .catch(function (error) {
        console.log(error);
    });
})



module.exports = router;

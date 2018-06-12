var express = require('express');
var router = express.Router();
// const Nightmare = require('nightmare');

const vo = require('vo');
let html;

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index',{htmlData:html});
});

// Use nightmare for this action
var Nightmare = require('nightmare');

function scrape(url) {
	let promise = new Promise((resolve, reject) => {
		// you don't have to create a variable,
		// and I believe you can create a new Object by calling new
		// show will show electron doing its thing... helps for debugging
		let nightmare = Nightmare({ show: true });

		// utilize the variable
		nightmare
      .goto('https://emspmg.instructure.com/login/canvas')
      .wait()
      .type('#pseudonym_session_unique_id','jbell0385@gmail.com')
      .type('#pseudonym_session_password', 'Timtpfc1')
      .click('button.Button--login')
      .wait(2000)
      .goto('https://emspmg.instructure.com/courses/68/gradebook/speed_grader?assignment_id=1455#%7B%22student_id%22%3A%22152%22%7D')
      .wait('#submissions_container')
      .evaluate(() => {
        console.log(document.body.querySelector('#submissions_container'))
        return document.body.querySelector('#submissions_container')
      })

		// instantiate
		nightmare.run((err, result) => {
      if (err) reject(err);
      resolve(result);
		});
	});
	return promise;
}

// call the function
scrape('https://emspmg.instructure.com/login/canvas')
	.then(res => {
    html = res;
    console.log(html);
  })
  .catch(err => console.log(err));
  



module.exports = router;

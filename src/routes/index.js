var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
//   console.log(1);
// });


router.get('/', (req, res, next) => {
  console.log(1);
  res.sendFile('wget-log.txt');
});


module.exports = router;

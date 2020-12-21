var express = require('express');
var router = express.Router();
var userService = require('../services/UserServices');
var userController = require('../controller/User');
const validation = require('../middleware/validation-user-middleware');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/test', (req, res) => {
  res.send(res.req.body);
  console.log(res.req.body);
})

// router.post('/add', (req, res) => {
//   userService.createUser(req, res);
//   res.send('success');
// })

router.get('/user/:userId', userController.getUserById)

router.post('/add', userController.addUser);

router.post('/signup', validation.signup, userController.signup);

router.post('/signin', validation.signup, userController.signin);

module.exports = router;

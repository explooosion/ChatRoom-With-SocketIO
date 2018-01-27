var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'ChatRoom-With-SocketIO'
  });
});

// router.get('/ws', function (req, res, next) {
//   res.render('index', {
//     title: 'ws'
//   });
// });

module.exports = router;
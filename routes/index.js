var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: '聊天室範例 | Tocas UI'
  });
});

// router.get('/ws', function (req, res, next) {
//   res.render('index', {
//     title: 'ws'
//   });
// });

module.exports = router;
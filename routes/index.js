var express = require('express');
var router = express.Router();
var Word = require("./word/word.model")
/* GET home page. */
router.get('/', function(req, res, next) {
  Word.find(function (err, words) {
    res.render('index', { title: 'Express' , words: words});
    console.log(words)
  })
});

module.exports = router;

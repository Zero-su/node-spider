var app = require('express')();
var http = require('http').createServer(app);
var cheerio = require('cheerio');
var superagent = require('superagent');

//cheerio 用于解析html，用法和jquery一样
//superagent 轻量级ajax API


app.get('/', function (req, res, next) {
  superagent.get('http://news.baidu.com/')
    .end(function (err, sres) {

      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var items = [];
      $('#pane-news ul li a').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $element.text(),
          href: $element.attr('href')
        });
      });

      res.send(items);
    });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

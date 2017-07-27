var app = require('express')();
var http = require('http').createServer(app);
var cheerio = require('cheerio');
var superagent = require('superagent');



app.get('/', function (req, res, next) {
  superagent.get('http://news.baidu.com/')
    .end(function (err, sres) {

      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      console.log($)
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
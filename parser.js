var cheerio = require('cheerio'),
  needle = require('needle'),
  tress = require('tress'),
  resolve = require('url'),
  fs = require('fs');

var targetURL = 'https://icobench.com/icos?page=',
  results = [],
  get_data = function(url, callback) {
    needle.get(url, function(err, res) {
      if (err) throw err;
      var $ = cheerio.load(res.body);
      $('.image_box>a').each(function() {
        results.push('https://icobench.com' + $(this).attr('href'));
      });
      $('.num>a').each(function() {
        q.push(resolve(targetURL, $(this).attr('href')));
      });
      callback();
    });
  };

q = tress(get_data, 1);

q.drain = function() {
  fs.writeFileSync('./icos301-442pages.json', JSON.stringify(results, null, 4));
};

var i = 301;
q.push(targetURL);
while (i <= 442) {
  var new_url = targetURL + i;
  console.log(new_url);
  q.push(new_url);
  i = i + 1;
}

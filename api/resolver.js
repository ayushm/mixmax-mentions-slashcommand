//var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();

  var matches = term.match(/@@@(.+)@@@(.+)@@@/);

  var name = matches[1];
  var email = matches[2];

  console.log("name to mention: " + matches);

  var html = '\
\
<div style="margin: 5px;">\
  <span id="mention-' + email + '" style="background: #8C1EA5; color: #fff; padding: 5px 10px; border-radius: 5px;font-family: \'proxima-nova\', \'Avenir Next\', \'Segoe UI\', \'Calibri\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-weight: 600; font-size: 10pt;" title="' + email + '"/>\
    ' + name + '\
  </span>\
</div>\
 ';

  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });

};


module.exports = function(callback) {
  // For formatting strings.
  var format = require('util').format;

  // The body of the request.
  var body = {
    username: this.username,
    password: this.password
  };

  var opts = {
    rejectUnauthorized: false // @TODO: remove this.
  };

  this.client.post(format('/%s/auth/login/', this.version), body, opts, function(err, res, body) {
    console.log('JSON', body);
  });
};
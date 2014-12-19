module.exports = function(callback) {

  // Get the request json.
  var request = require('request-json');

  // For formatting strings.
  var format = require('util').format;

  // The body of the request.
  var body = {
    username: this.username,
    password: this.password
  };

  // Post to the login endpoint.
  this.client.post(format('/%s/auth/login/', this.version), body, function(err, res, body) {
    // If there was an error, send it to the callback.
    if (err) {
      callback.call(this, err);
    }

    // Re-Create the client.
    this.client = request.newClient(format('%s://%s', this.protocol, this.controller), {
      rejectUnauthorized: false, // @TODO: remove this.
      headers: {
        Authorization: format('token %s', body.token)
      }
    });

    // There was no token, it failed to login.
    if (!body.token) {
      callback.call(this, Error('Incorrect Deis login details'));
    } else {
      // If not, it was fine.
      callback.call(this, null);
    }
  }.bind(this));
};
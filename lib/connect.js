module.exports = function(callback) {
  // Get the request library.
  var http = require(this.protocol);

  // For formatting strings.
  var format = require('util').format;

  // The body to send to log in.
  var body = JSON.stringify({
    username: this.username,
    password: this.password
  });

  // Create the request.
  var request = http.request({
    host: this.controller,
    path: format('/%s/auth/login/', this.version),
    port: this.protocol === 'https' ? 443 : 80,
    method: 'POST',
    rejectUnauthorized: false, // @TODO: Remove this.
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body.length
    }
  });

  // When we get a response, handle it.
  request.on('response', function handleLoginResponse(response) {
    // The response is actually a stream.
    response.on('data', function(body_buffer) {
      // Get the body and convert from Buffer to String.
      var body = body_buffer.toString();

      // Try to parse it as JSON,
      // if it's not JSON it's probably a MIM attack.
      try {
        body = JSON.parse(body);
      } catch(error) {
        throw new TypeError('Did not reply with JSON. Check for a man-in-the-middle attack NOW.');
      }

      // Set the token.
      this.token = body.token;

      // Fire the callback.
      callback && callback.apply(this);
    }.bind(this));
  }.bind(this));

  // Send our request body on it's way.
  request.write(body);

  // End the request and shut up shop.
  request.end();
};
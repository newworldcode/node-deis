/**
 * Prepare the interface.
 *
 * @author Dave Mackintosh
 * @version 1.0.0
 * @since   1.0.0
 */


function NodeDeis(configuration) {
  'use strict';

  // Always create an instance.
  if (!(this instanceof NodeDeis)) {
    return new NodeDeis(configuration);
  }

  // The auth token is private.
  var _token = null;

  // Get the request json.
  var request = require('request-json');

  // For formatting strings.
  var format = require('util').format;

  // Check for configuration.
  if (!configuration) {
    throw new ReferenceError('Node Deis requires configuration to work.');
  }

  // Check we got required config properties.
  if (!configuration.hasOwnProperty('controller')) {
    throw ReferenceError('Node Deis configuration requires controller property.');
  }

  if (!configuration.hasOwnProperty('username')) {
    throw ReferenceError('Node Deis configuration requires username property.');
  }

  if (!configuration.hasOwnProperty('password')) {
    throw ReferenceError('Node Deis configuration requires password property.');
  }

  // If we explicitely set it to a secure then we'll https it.
  this.protocol = configuration.secure ? 'https' : 'http';

  // Set the controller, we haven't errored if we got here.
  this.controller = configuration.controller.toString();

  // Support future (and previous) versions.
  this.version = configuration.version ? 'v' + configuration.version.toString() : 'v1';

  // Create a client.
  this.client = request.newClient(format('%s://%s', this.protocol, this.controller), {
    rejectUnauthorized: false // @TODO: remove this.
  });

  // We don't ever want to set the username or password to anything
  // set up getters to get the values from the config argument.
  this.__defineGetter__('username', function() {
    return configuration.username;
  });

  this.__defineGetter__('password', function() {
    return configuration.password;
  })

  // Do some checking on the virtual token property
  // to make sure we're secured.
  this.__defineGetter__('token', function() {
    if (_token) {
      return _token;
    } else {
      return null;
    }
  });

  this.__defineSetter__('token', function(new_value) {
    if (new_value && new_value !== null) {
      _token = new_value;
    } else {
      throw TypeError('Cannot set token to null.');
    }
  });

}

// Add the extra methods.
// If we log in correctly, more methods will be added.
NodeDeis.prototype = {
  connect: require('./lib/connect'),
  addDomain: require('./lib/domain').add,
  removeDomain: require('./lib/domain').remove
};

// Export.
module.exports = NodeDeis;
var format = require('util').format;

module.exports = {
  /**
   * Add a domain to an app registered with the Deis controller.
   *
   * @param {String}   domain to register.
   * @param {Function} callback executed when request finishes.
   */
  add: function nodeDeisAddDomain(domain, callback) {
    // Create the endpoint string.
    var endpoint = format('/%s/apps/%s/domains/', this.version, this.appname);

    // Create the body to send to it.
    var body     = {
      domain: domain.toString()
    };

    // Perform the request.
    this.client.post(endpoint, body, function(err, res, body) {
      callback.call(this, err);
    }.bind(this));
  },

  remove: function nodeDeisRemoveDomain(domain, callback) {
    var endpoint = format('/%s/apps/%s/domains/%s', this.version, this.appname, domain);

    this.client.del(endpoint, function(err, res, body) {
      callback.call(this, err);
    }.bind(this));
  }
}
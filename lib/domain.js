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

  /**
   * Remove a domain registered on an application.
   *
   * @param  {String}   domain to remove.
   * @param  {Function} callback to fire with results.
   * @return {void}
   */
  remove: function nodeDeisRemoveDomain(domain, callback) {
    var endpoint = format('/%s/apps/%s/domains/%s', this.version, this.appname, domain);

    this.client.del(endpoint, function(err, res, body) {
      callback.call(this, err);
    }.bind(this));
  },

  /**
   * Get all the domains for this application.
   *
   * @param  {Function} callback to execute with results
   * @return {void}
   */
  getAll: function nodeDeisGetAllDomains(callback) {
    var endpoint = format('/%s/apps/%s/domains/', this.version, this.appname);

    this.client.get(endpoint, function(err, res, body) {
      callback.call(this, err, body);
    });
  },

  /**
   * Get a domain by it's name.
   *
   * @param  {String}   domain to get
   * @param  {Function} callback to fire with results.
   * @return {void}
   */
  get: function nodeDeisGetDomain(domain, callback) {
    // There's no endpoint to get a single domain,
    // get all of them and we'll filter instead.
    this.getAllDomains(function(err, domains) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, domains.results.filter(function(domain_obj) {
          return domain_obj.domain == domain;
        })[0]);
      }
    });
  }
}
node-deis
=========

Manage Deis from your Node apps.

`npm install node-deis --save`

Create your client first of all.

```js
var NodeDeis = require('./index');

var client = new NodeDeis({
    controller : 'deis.yourdomain.com',
    secure     : true, // Optional
    version    : 1, // Optional
    username   : 'awesome_user',
    password   : 'sup3r5str3ng7h!1!1',
    appname    : 'myAwesomeDeisApp'
});
```

All of the properties that aren't marked optional will throw an error if they are missing.

Once you have a client you can connect and start managing your Deis apps right from Node.

```js
client.connect(function(err) {
  assert.equal(err, null, 'Bad login details');
});
```

Once you have connected you will be able to run any of the below commands (provided you have access)
rights to perform the below.

### `NodeDeis.addDomain(String domain, Function callback);`
Create a new domain for the application in the client configuration and fire the callback once
it has completed with an error (if any).

```js
NodeDeis.addDomain('node-deis-test.yourdomain.com', function(err) {
    assert.equal(err, null, 'Something bad happened.');
});
```

### `NodeDeis.removeDomain(String domain, Function callback);`
Remove a domain from the application in the client configuration and fire the callback once
it has completed with an error (if any).

```js
NodeDeis.removeDomain('node-deis-test.yourdomain.com', function(err) {
    assert.equal(err, null, 'Something bad happened.');
});
```

### Things still to do

-  Create api for
- [*] logging in
- [*] adding domains
- [*] removing domains
- [ ] logging out
- [ ] registering
- [ ] account cancelation
- [ ] list applications
- [ ] create application
- [ ] destroy application
- [ ] list app details
- [ ] get application logs
- [ ] run remote commands
- [ ] list all containers
- [ ] list containers by type
- [ ] scale containers
- [ ] show app config
- [ ] create app config
- [ ] unset config
- [ ] list app domains
- [ ] list app builds
- [ ] create app build
- [ ] list app releases
- [ ] show release details
- [ ] rollback release
- [ ] list keys
- [ ] add key to user
- [ ] remove key from user
- [ ] list app permissions
- [ ] create application permission
- [ ] remove app permission
- [ ] grant user admin rights
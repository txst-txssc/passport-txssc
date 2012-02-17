/**
 * Module dependencies.
 */
var util = require('util'),
    OAuth2Strategy = require('passport-oauth').OAuth2Strategy;


/**
 * `Strategy` constructor.
 *
 * The TxSSC authentication strategy authenticates requests by delegating to
 * TxSSC SSO using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your TxSSC application's App ID
 *   - `clientSecret`  your TxSSC application's App Secret
 *   - `callbackURL`   URL to which TxSSC will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new txsscStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/txssc/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://33.33.33.10:3000/oauth2/authorize';
  options.tokenURL = options.tokenURL || 'https://33.33.33.10:3000/oauth2/access_token';
  options.scopeSeparator = options.scopeSeparator || ',';
  
  OAuth2Strategy.call(this, options, verify);
  this.name = 'txssc';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from TxSSC SSO.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `txssc`
 *   - `id`               the user's TxSSC ID
 *   - `name`             the user's full name
 *   - `username`         the user's TxState username
 *   - `email`            the user's TxState email address
 *   - `role`             the user's TxSSC role
 *   - `avatar`           the URL of the user's profile avatar
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  var profile = { provider: 'txssc' };
  this._oauth2.getProtectedResource('https://33.33.33.10:3000/me', accessToken, function (err, body, res) {
    if (err) { return done(err); }
    
    try {
      o = JSON.parse(body);
      
      var profile = { provider: 'txssc' };
      profile.id = o.id;
      profile.name = o.name;
      profile.username = o.username;
      profile.email = o.email;
      profile.role = o.role;
      profile.avatar = o.avatar;
      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;

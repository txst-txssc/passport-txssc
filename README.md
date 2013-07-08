# Passport-TxSSC

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with TxSSC SSO using the OAuth 2.0 API.

## Installation

    npm install passport-txssc

## Usage

#### Configure Strategy

The TxSSC authentication strategy authenticates users using a TxState
account and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a app ID, app secret, and callback URL.

    passport.use(new txsscStrategy({
        clientID: TXSSC_APP_ID,
        clientSecret: TXSSC_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/txssc/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ id: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'txssc'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/txssc',
      passport.authenticate('txssc'),
      function(req, res){
        // The request will be redirected to TxSSC SSO for authentication, so
        // this function will not be called.
      });

    app.get('/auth/txssc/callback', 
      passport.authenticate('txssc', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });
      
#### Extended Permissions

If you need extended permissions from the user, the permissions can be requested
via the `scope` option to `passport.authenticate()`.

For example, this authorization requests write permissions for an app:

    app.get('/auth/txssc',
      passport.authenticate('txssc', { scope: ['read', 'write'] }),
      function(req, res){
        // The request will be redirected to TxSSC SSO for authentication, with
        // extended permissions.
      });


## Credits

  - [Cody Stoltman](http://github.com/particlebanana)

## License

(The MIT License)

Copyright (c) 2011 Cody Stoltman

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

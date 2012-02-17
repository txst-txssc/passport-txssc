var vows = require('vows');
var assert = require('assert');
var util = require('util');
var txsscStrategy = require('passport-txssc/strategy');


vows.describe('txsscStrategy').addBatch({
  
  'strategy': {
    topic: function() {
      return new txsscStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
    },
    
    'should be named txssc': function (strategy) {
      assert.equal(strategy.name, 'txssc');
    },
  },
  
  'strategy when loading user profile': {
    topic: function() {
      var strategy = new txsscStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth2.getProtectedResource = function(url, accessToken, callback) {
        var body = '{"id":"123","name":"Cody Stoltman","username":"cs62","email":"particlebanana@gmail.com","role":"admin","avatar":"http:\\/\\/www.lolcats.com\\/cat"}';
        
        callback(null, body, undefined);
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('access-token', done);
        });
      },
      
      'should not error' : function(err, req) {
        assert.isNull(err);
      },
      'should load profile' : function(err, profile) {
        assert.equal(profile.provider, 'txssc');
        assert.equal(profile.id, '123');
        assert.equal(profile.name, 'Cody Stoltman');
        assert.equal(profile.username, 'cs62');
        assert.equal(profile.email, 'particlebanana@gmail.com');
        assert.equal(profile.role, 'admin');
        assert.equal(profile.avatar, 'http://www.lolcats.com/cat');
      },
    },
  },
  
  'strategy when loading user profile and encountering an error': {
    topic: function() {
      var strategy = new txsscStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth2.getProtectedResource = function(url, accessToken, callback) {
        callback(new Error('something-went-wrong'));
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('access-token', done);
        });
      },
      
      'should error' : function(err, req) {
        assert.isNotNull(err);
      },
      'should not load profile' : function(err, profile) {
        assert.isUndefined(profile);
      },
    },
  },
  
}).export(module);

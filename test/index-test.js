var vows = require('vows');
var assert = require('assert');
var util = require('util');
var txssc = require('passport-txssc');


vows.describe('passport-txssc').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(txssc.version);
    },
  },
  
}).export(module);

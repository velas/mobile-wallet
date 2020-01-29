// Generated by LiveScript 1.5.0
(function(){
  var ref$, map, split, find, head, filter, isValid, verify, toString$ = {}.toString;
  ref$ = require('prelude-ls'), map = ref$.map, split = ref$.split, find = ref$.find, head = ref$.head, filter = ref$.filter;
  isValid = function(coin, network){
    return function(address){
      var ref$, type, addr;
      if (address == null) {
        return false;
      }
      if (toString$.call(address).slice(8, -1) !== 'String') {
        return false;
      }
      ref$ = address.split(':'), type = ref$[0], addr = ref$[1];
      if (coin.type === type) {
        return false;
      }
      return address.length === network.mask.length;
    };
  };
  verify = function(verifyRecord, coin, network, to, cb){
    if (isValid(coin, network)(to)) {
      return cb(null, to);
    }
    return verifyRecord(to, cb);
  };
  module.exports = function(web3t, to, coin, network, cb){
    var isName, verifyRecord;
    isName = to.indexOf('.') !== -1 || to.indexOf('@') !== -1;
    if (!isName) {
      return cb(null, to);
    }
    verifyRecord = web3t.naming.verifyRecord;
    return verify(verifyRecord, coin, network, to, function(err, data){
      var address;
      if (err != null) {
        return cb(err);
      }
      if (data === "") {
        return cb("Address not found");
      }
      address = head(
      map(function(it){
        return it[1];
      })(
      filter(function(it){
        return it[0] === coin.token;
      })(
      map(function(it){
        return it.split(':');
      })(
      function(it){
        return it.split(',');
      }(
      data)))));
      if (address == null) {
        return cb("Address not found");
      }
      return cb(null, address);
    });
  };
}).call(this);

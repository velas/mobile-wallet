// Generated by LiveScript 1.6.0
(function(){
  var find, getDefaultRecipientAddress, out$ = typeof exports != 'undefined' && exports || this;
  find = require('prelude-ls').find;
  out$.getDefaultRecipientAddress = getDefaultRecipientAddress = function(store){
    var chosenNetwork, token, wallet;
    chosenNetwork = store.current.send.chosenNetwork;
    token = chosenNetwork.referTo;
    wallet = find(function(it){
      return it.coin.token === token;
    })(
    store.current.account.wallets);
    if (wallet == null) {
      return "";
    }
    return wallet.address;
  };
}).call(this);
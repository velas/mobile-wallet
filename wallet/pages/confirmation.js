// Generated by LiveScript 1.5.0
(function(){
  var react, getPrimaryInfo, getLang, confirmationModal, state, confirm, prompt, toString$ = {}.toString, out$ = typeof exports != 'undefined' && exports || this;
  react = require('react');
  getPrimaryInfo = require('../get-primary-info.js');
  getLang = require('../get-lang.js');
  /*
  .confirmation
      position: absolute
      z-index: 999999
      height: 100vh
      top: 0
      left: 0
      width: 100%
      box-sizing: border-box
      background: rgba(black, 0.8)
      >.confirmation-body
          background: white
          text-align: center
          >.header
              padding: 15px 0 0
              font-size: 17px
              font-weight: bold
              margin-bottom: 10px
          >.text
              padding: 10px
              input
                  border-radius: 5px
          >.buttons
              text-align: center
              >.button
                  display: inline-block
                  cursor: pointer
                  width: auto
                  font-weight: 300
                  font-size: 14px
                  border-radius: 5px
                  border: 1px solid #CCC
                  margin: 15px 5px
                  padding: 5px 10px
                  line-height: 14px
  */
  confirmationModal = function(store){
    var confirm, cancel, style, confirmationStyle, confirmationStyle2, buttonStyle, confirmation, lang, onClick;
    if (toString$.call(store.current.confirmation).slice(8, -1) !== 'String') {
      return null;
    }
    confirm = function(){
      store.current.confirmation = true;
      if (toString$.call(state.callback).slice(8, -1) === 'Function') {
        state.callback(true);
      }
      return state.callback = null;
    };
    cancel = function(){
      store.current.confirmation = false;
      if (toString$.call(state.callback).slice(8, -1) === 'Function') {
        state.callback(false);
      }
      return state.callback = null;
    };
    style = getPrimaryInfo(store);
    confirmationStyle = {
      background: style.app.background,
      color: style.app.text
    };
    confirmationStyle2 = {
      color: style.app.text
    };
    buttonStyle = {
      color: style.app.text
    };
    confirmation = {
      background: style.app.background,
      color: style.app.text
    };
    return lang = getLang(store).pug.confirmation.pug.confirmationBody(style = confirmation).pug.header(style = confirmationStyle).pug.text(style = confirmationStyle2).pug.buttons.pug.button(onClick = confirm(style = buttonStyle)).pug.button(onClick = cancel(style = buttonStyle));
  };
  /*
  prompt-modal = (store)->
      return null if typeof! store.current.prompt isnt \String
      confirm = ->
          store.current.prompt = yes
          state.callback store.current.prompt-answer if typeof! state.callback is \Function
          state.callback = null
          store.current.prompt-answer = ""
      cancel = ->
          store.current.prompt = no
          state.callback null if typeof! state.callback is \Function
          state.callback = null
          store.current.prompt-answer = ""
      change-input = (e)->
          store.current.prompt-answer = e.target.value
      style = get-primary-info store
      confirmation-style =
          background: style.app.background
          color: style.app.text
      input-style =
          background: style.app.wallet
          color: style.app.text
          border: "0"
      button-style=
          color: style.app.text
      confirmation=
          background: style.app.background
          color: style.app.text
      lang = get-lang store
      .pug.confirmation
          .pug.confirmation-body(style=confirmation)
              .pug.header(style=style=confirmation-style) #{lang.confirmation}
              .pug.text(style=style=confirmation-style) #{store.current.prompt}
              .pug
                  input.pug(on-change=change-input value="#{store.current.prompt-answer}" style=input-style)
              .pug.buttons
                  .pug.button(on-click=confirm style=button-style) #{lang.confirm}
                  .pug.button(on-click=cancel style=button-style) #{lang.cancel}
  
  export confirmation-control = (store)->
      .pug
          confirmation-modal store
          prompt-modal store
  */
  state = {
    callback: null
  };
  out$.confirm = confirm = function(store, text, cb){
    store.current.confirmation = text;
    return state.callback = cb;
  };
  out$.prompt = prompt = function(store, text, cb){
    store.current.prompt = text;
    return state.callback = cb;
  };
}).call(this);

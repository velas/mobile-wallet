import "./global.js";

import * as React from "react";
import { View, StatusBar, SafeAreaView } from "react-native";
import { observable } from "mobx";
import { observer } from "mobx-react";
//import Store from "./Store.js";
import pages from "./Pages.js";
import styles from "./Styles.js";
import StartPage from "./pages/StartPage";
//import web3t from './web3t.js';
import Store from './wallet/data-scheme.js';
import { saved } from './wallet/seed.js';
import web3 from './wallet/web3.js'; 

//console.log(web3);



const store = observable(Store);

web3t = web3(store);

const Main = observer(({ store }) => {
  return pages[store.current.page]({ store, web3t });
});

const footerVisible = () => {
  store.footerVisible = false;
};


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: true
    };
  }

  componentDidMount() {  


      store.current.page = saved === true ? "locked" : "register";


      if (true)  { // debug

        store.signUpInputMailField = "a.stegno@gmail.com";
        store.signUpInputPasswordField = "asdfasdf234234WWW";

      }

  }
  

  render() {
    if (this.state.ready === false) {
      return <StartPage store={store} />;
    }
    return (
      <Main store={store} />
    );
  }
}

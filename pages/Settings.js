import React, {useState} from "react";
import {
  Content,
  ListItem,
  Left,
  Body,
  Right,
  Text,
  View,
  Title,
  Icon,
  Header,
  Separator,
  Button
} from "native-base";
import { Linking, Platform } from "react-native";
import styles from "../Styles.js";
import Footer from "./Footer.js";
import StatusBar from "../components/StatusBar.js";
import getLang from "../wallet/get-lang.js";
import PickerSetLang from "../components/PickerSetLang.js";
import PickerAccountIndex from "../components/PickerAccountIndex.js";
import * as LocalAuthentication from 'expo-local-authentication';

const LocalAuthListView = ({store}) => {
  // const [localAuthEnabled, setLocalAuthEnabled] = useState(null);
  // if (localAuthEnabled === null) {
  //   console.log("Requesting LocalAuthentication params");
  //   Promise.all([
  //     LocalAuthentication.hasHardwareAsync(),
  //     LocalAuthentication.supportedAuthenticationTypesAsync(),
  //     LocalAuthentication.isEnrolledAsync()
  //   ]).then(([hasHardware, supportedAuthTypes, isEnrolled]) => {
  //     console.log("LocalAuthentication params", hasHardware, supportedAuthTypes, isEnrolled);
  //     setLocalAuthEnabled(hasHardware && isEnrolled && supportedAuthTypes.length > 0);
  //   });
  // }
  // if (!localAuthEnabled) {
  //   return null;
  // }
  const touchFinger = () => {
    if (Platform.OS === 'android') {
      return <Text style={styles.txtSettings}>Use Touch ID</Text>;
    }
    else if (Platform.OS === 'ios') {
      return <Text style={styles.txtSettings}>Use Touch ID or FaceID</Text>;
    }
  }
  
  return ( 
    <ListItem
      icon
      onPress={() => {
        store.current.page = "LocalAuthenticationSettings";
      }}
      style={styles.heightListItem}
    >
      <Left>
        <Icon name="finger-print" style={styles.styleTxtSettings}/>
      </Left>
      <Body style={styles.heightListItem}>
        {touchFinger()}
      </Body>
      <Right style={styles.heightListItem}>
        <Icon name="ios-arrow-forward" />
      </Right>
    </ListItem>
  );
};

export default ({ store, web3t }) => {
  const logoutBtn = async () => {
    store.current.page = "locked";
  };
  const lang = getLang(store);

  const termsBtn = async () => {
    store.current.page = "terms";
  };


  return (
    <View style={styles.container}>
      <View style={styles.viewFlex}>
        <StatusBar />
        <Header style={styles.mtAndroid}>
          <Left style={styles.viewFlexHeader} />
          <Body style={styles.viewFlexHeader}>
            <Title style={[styles.titleBlack, {color: "#563688"}]}>{lang.settings}</Title>
          </Body>
          <Right style={styles.viewFlexHeader} />
        </Header>

        <Content>
          <Separator bordered>
            <Text style={styles.styleTxtSettings}>{lang.help}</Text>
          </Separator>
          <ListItem
            icon
            onPress={() => {
              Linking.openURL(`https://t.me/VelasDevelopers`);
            }}
            style={styles.heightListItem}
          >
            <Left>
              <Icon name="ios-text" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              <Text style={styles.txtSettings}>{lang.support}</Text>
            </Body>
            <Right style={styles.heightListItem}>
              <Icon name="ios-arrow-forward" />
            </Right>
          </ListItem>

          <ListItem
            icon
            onPress={() => {
              Linking.openURL(`https://velas.com/privacy.html`);
            }}
            style={styles.heightListItem}
          >
            <Left>
              <Icon name="md-document" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              <Text style={styles.txtSettings}>{lang.privacyPolicy}</Text>
            </Body>
            <Right style={styles.heightListItem}>
              <Icon name="ios-arrow-forward" />
            </Right>
          </ListItem>

          <ListItem
            icon
            onPress={() => {
              Linking.openURL(
                `https://raw.githubusercontent.com/velas/JsWallet/master/TERMS.md`
              );
            }}
            style={styles.heightListItem}
          >
            <Left>
              <Icon name="md-document" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              <Text style={styles.txtSettings}>{lang.termsOfUse}</Text>
            </Body>
            <Right style={styles.heightListItem}>
              <Icon name="ios-arrow-forward" />
            </Right>
          </ListItem>

          <Separator bordered>
            <Text style={styles.styleTxtSettings}>{lang.profile}</Text>
          </Separator>
          <ListItem icon style={styles.heightListItem} last>
            <Left>
              <Icon name="md-wallet" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              {PickerAccountIndex({ store, web3t })}
            </Body>
            <Right style={styles.heightListItem} />
          </ListItem>
          <ListItem icon style={styles.heightListItem} last>
            <Left>
              <Icon name="md-globe" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              {PickerSetLang({ store })}
            </Body>
            <Right style={styles.heightListItem} />
          </ListItem>
          <LocalAuthListView store={store}/>


          <Separator bordered>
            <Text style={styles.styleTxtSettings}>{lang.security}</Text>
          </Separator>

          <ListItem icon style={styles.heightListItem} last onPress={logoutBtn}>
            <Left>
              <Icon name="ios-log-out" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
          <Text style={styles.txtSettings}>{lang.logOut}</Text>
            </Body>
            <Right style={styles.heightListItem} />
          </ListItem>
        </Content>
      </View>
      <Footer store={store}></Footer>
    </View>
  );
};

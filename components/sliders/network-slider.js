// Generated by LiveScript 1.6.0
import React, {Component, useEffect} from "react";
import {View} from "react-native";
import styles from "../../Styles";
import icons from '../../wallet/icons.js';
import tokenNetworks from '../../wallet/swapping/networks.js'
import {map,objToPairs, filter, pairsToObj} from 'prelude-ls';
import {Button, Icon, Input} from "native-base";
import Images from "../../Images.js"


export default ({store, wallet}) => {
	var networkLabels, getNetworkById, displayValue, go, goback, goForw;
	if (!(store.current.send.isSwap != null && store.current.send.isSwap === true)) {
		return null;
	}
	if (wallet.network.networks == null || Object.keys(wallet.network.networks).length === 0) {
		return null;
	}
	if (store.current.send.chosenNetwork == null) return null;

	const wallets = pairsToObj(
			map(function(it){
				return [it.coin.token, it];
			})(
					store.current.account.wallets));

	let availableNetworks = pairsToObj(
			filter(function(it){
				return wallets[it[1].referTo] != null && (it[1].disabled == null || it[1].disabled === false);
			})(
					objToPairs(
							wallet.network.networks)));
	networkLabels = Object.keys(availableNetworks);
	getNetworkById = function(id){
		return availableNetworks[id + ""];
	};
	displayValue = store.current.send.chosenNetwork.name.toUpperCase();
	go = function(inc){
		return function(){
			var current, lenght, index, chosenNetworkId;
			current = networkLabels.indexOf(store.current.send.chosenNetwork.id);
			lenght = networkLabels.length;
			index = current + inc;
			if (current + inc >= lenght) {
				index = 0;
			} else if (current + inc < 0) {
				index = lenght - 1;
			}
			chosenNetworkId = networkLabels[index];
			store.current.send.chosenNetwork = getNetworkById(chosenNetworkId);
			store.current.send.to = tokenNetworks.getDefaultRecipientAddress(store);
			store.current.send.error = '';
			return store.current.send.data = null;
		};
	};
	goback = go(-1);
	goForw = go(1);

	const containerStyles = {
		display: "flex",
		flexDirection: "row"
	}
	const buttonStyles = {
		padding: 5,
		backgroundColor: Images.colorBlue,
		flex: 1,
		textAlign: "center"
	}
	const inputStyle = {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
		paddingLeft: 0,
		fontFamily: "Fontfabric-NexaBold",
		flex: 4,
		textAlign: "center"
	}

	return (
			<View style={containerStyles}>
				<Button
						transparent
						style={buttonStyles}
						onPress={goback}
				>
					<Icon
							name="ios-arrow-back"
							style={[styles.arrowHeaderIconBlack, { color: "#fff" }]}
					/>
				</Button>
				<Input
						disabled={true}
						returnKeyType="done"
						selectionColor={"#fff"}
						keyboardAppearance="dark"
						placeholder={wallet.network.mask.substring(25, wallet.network.mask.length - 255 ) + "..."}
						style={inputStyle}
						value={displayValue}
						placeholderTextColor="rgba(255,255,255,0.60)"
				/>
				<Button
						transparent
						style={buttonStyles}
						onPress={goForw}
				>
					<Icon
							name="ios-arrow-forward"
							style={[styles.arrowHeaderIconBlack, { color: "#fff" }]}
					/>
				</Button>
			</View>
	)

}
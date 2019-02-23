import React, { Component } from "react";
import { requireNativeComponent, StyleSheet, Text } from "react-native";

const BgScrollView = requireNativeComponent("BgScrollView");

class BridgeScrollViewScreen extends Component {
  render() {
    return (
      <BgScrollView style={styles.root} bgColor="#e12ca9">
        <Text style={{width: 300, heigth: 500}}>BridgeScrollViewScreen Screen</Text>
        <Text style={{width: 300, heigth: 500}}>BridgeScrollViewScreen Screen222</Text>
        <Text style={{width: 300, heigth: 500}}>BridgeScrollViewScreen Screen333</Text>
        <Text style={{width: 300, heigth: 500}}>BridgeScrollViewScreen Screen444</Text>
      </BgScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});

export default BridgeScrollViewScreen;
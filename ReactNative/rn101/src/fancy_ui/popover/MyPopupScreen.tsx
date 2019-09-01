import React from "react";
import { View, ViewProps, Text, StyleSheet } from "react-native";
import { MyPopupView } from "./MyPopupView";

export const MyPopupScreen = () => {

  return (
    <View style={styles.container}>
      <Text> Hello Popup View</Text>
      <MyPopupView isVisible={true} onClose={() => console.log("szw close")}>
        <Text> I'm context menu~ </Text>
      </MyPopupView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {}
});
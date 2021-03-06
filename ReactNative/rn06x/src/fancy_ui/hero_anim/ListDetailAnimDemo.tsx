import React, { useState } from "react";
import {
  Image,
  View,
  ViewProps,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import { useSelector } from "react-redux";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const images = [
  require("../../../res/images/wallpaper01.jpg"),
  require("../../../res/images/wallpaper02.jpg"),
  require("../../../res/images/wallpaper03.jpg"),
  require("../../../res/images/wallpaper04.jpg")
];


export const ListDetailAnimDemo = () => {
  const [detail, setDetail] = useState(-1);

  const imageViews = images.map((image, index) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => openDetail(index)} key={index + ""}>
        <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 150, paddingBottom: 15 }}>
          <Image source={image} style={{ flex: 1, resizeMode: "cover" }}/>
        </View>
      </TouchableWithoutFeedback>
    );
  });

  const openDetail = (index: number) => {
    console.log(`szw openDetail, ${index}`);
    setDetail(index);
  };

  const closeDetail = () => {
    setDetail(-1);
  };

  return (
    <View style={styles.container}>

      {/*List*/}
      <ScrollView style={{ flex: 1, padding: 20 }}>
        {imageViews}
      </ScrollView>

      {/*Detail*/}
      <View style={StyleSheet.absoluteFill} pointerEvents={detail !== -1 ? "auto" : "none"}>

        <View style={{ flex: 2, opacity: detail !== -1 ? 1 : 0 }}>
          <Image source={images[detail]} style={{ flex: 1 }} resizeMode={"cover"}/>
        </View>

        <View style={{ opacity: detail !== -1 ? 1 : 0, backgroundColor: "green", flex: 1 }}
              pointerEvents={detail !== -1 ? "auto" : "none"}>
          <Text style={{ fontSize: 44, color: "#f00" }} onPress={closeDetail}>This is the Detail popup : index
            = {detail}</Text>
        </View>
      </View>


    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1 }
});
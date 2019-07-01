import React, { Component } from "react";
import { Text, StyleSheet, FlatList, ListRenderItemInfo, ViewProps, View } from "react-native";

interface IProps extends ViewProps {
  dataSize: number

}

export const Scrubber = (props: IProps) => {

  const data = [];
  for (let i = 0; i < props.dataSize; i++) {
    data.push(i);
  }

  const renderItem = (info: ListRenderItemInfo<number>) => {
    const text = "|";
    const index = info.index;
    const style = index % 5 === 0 ? [styles.itemCommon, styles.itemLong] : [styles.itemCommon, styles.itemShort];
    return (
      <View style={{ justifyContent: "center" }}>
        <Text style={style}>  {text} </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index + ""}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ justifyContent: "center" }}
    />
  );
};


const styles = StyleSheet.create({
  container: {},
  itemCommon: {
    width: 50,
    textAlign: "center"
  },
  itemLong: {
    height: 150,
    backgroundColor: "red"
  },
  itemShort: {
    height: 50,
    backgroundColor: "grey"
  }
});


import React from "react";
import { AppRegistry, Text, TextInput } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

// 全局定制字体1: 不让字体大小跟随手机字体设置的变化
const TextRender = Text.render;
Text.render = function(...args) {
  const originalText = TextRender.apply(this, args);
  return React.cloneElement(originalText, { allowFontScaling: false });
};

const TextInputRender = TextInput.render;
TextInput.render = function(...args) {
  const originalTextInput = TextInputRender.apply(this, args);
  return React.cloneElement(originalTextInput, { allowFontScaling: false });
};

AppRegistry.registerComponent(appName, () => App);

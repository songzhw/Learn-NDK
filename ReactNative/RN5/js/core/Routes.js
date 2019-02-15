import React from "react";
import {TouchableOpacity, Image} from 'react-native'
import {createStackNavigator} from 'react-navigation'
import HomeScreen from "../screen/HomeScreen";
import {commonStyles} from "./theme/CommonStyles";
import AxiosScreen from "../screen/third_party/AxiosScreen";
import ContextDemo from "../screen/rn_tutorial/ContextDemo";
import GestureAnimScreen from "../screen/rn_tutorial/GestureAnimScreen";
import SetStatePitfallScreen from "../screen/rn_tutorial/SetStatePitfallScreen";

const HomeStack = createStackNavigator(
  {
    HomeScreen, AxiosScreen, ContextDemo, GestureAnimScreen, SetStatePitfallScreen
  },
  {
    headerMode: 'screen',
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: '#1b5e20'},
      headerTitleStyle: {color: 'white'},
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/icon_back.png')} resizeMode='center' style={commonStyles.imgBack}/>
        </TouchableOpacity>
      )
    }),
  }
)

export default HomeStack

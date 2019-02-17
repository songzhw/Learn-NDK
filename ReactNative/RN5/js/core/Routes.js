import React from "react";
import {TouchableOpacity, Image, Button} from 'react-native'
import {createStackNavigator} from 'react-navigation'
import HomeScreen from "../screen/HomeScreen";
import {commonStyles} from "./theme/CommonStyles";
import AxiosScreen from "../screen/third_party/AxiosScreen";
import ContextDemo from "../screen/rn_tutorial/ContextDemo";
import GestureAnimScreen from "../screen/rn_tutorial/GestureAnimScreen";
import SetStatePitfallScreen from "../screen/rn_tutorial/SetStatePitfallScreen";
import DynamicTitleScreen from "../screen/rn_tutorial/DynamicTitleScreen";
import ActionSheetDemo from "../screen/custom_view/ActionSheetDemo";

const HomeStack = createStackNavigator(
  {
    HomeScreen, AxiosScreen, ContextDemo, GestureAnimScreen, SetStatePitfallScreen,
    ActionSheetDemo,
    DynamicTitleScreen: {
      screen: DynamicTitleScreen,
      navigationOptions: (props) => {
        const {navigation} = props
        const {params} = navigation.state
        return {
          title: params.title ? params.title : "Static Title",
          headerRight: (
            <Button
              title={params.mode === 'edit' ? "save" : "edit"}
              onPress={() => navigation.setParams({mode: params.mode === 'edit' ? "" : "edit"})}
            />
          )
        }
      }
    },
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

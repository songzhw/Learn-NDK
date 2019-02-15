import React, {Component} from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'

class HomeScreen extends Component {
  render() {
    const {navigation} = this.props
    return (
      <View style={styles.root}>

        <View style={{height: 20}}/>
        <Text style={styles.title}>3rd library demos</Text>
        <HomeButton title="3rd-Axios" onPress={navigation.navigate("AxiosScreen")}/>
      </View>
    )
  }
}


class HomeButton extends Component {
  render() {
    return (
      <View style={styles.aButton}>
        <Button title={this.props.title} onPress={this.props.onPress}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  aButton: {
    fontSize: 30,
    color: 'red',
    margin: 4
  },
  title: {
    height: 25,
    fontSize: 21,
    textAlign: 'center',
    color: 'black'
  }
})

export default HomeScreen
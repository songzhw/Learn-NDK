import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {connect} from 'react-redux'

class CategoryDetailScreen extends Component{
  render(){
    return (
      <View style={styles.root}>
        <Text>CategoryDetailScreen Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})

const mapStateToProps = (state: any) => {
  return {

  }
}

export default connect(mapStateToProps)(CategoryDetailScreen)
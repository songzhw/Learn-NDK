/*
The most simple Fela demo for React Native
( App.js also use <RendererProvider> )
 */

import React, {PureComponent, useContext} from 'react'
import {View, Text, Button} from 'react-native'
import {StyleSheet} from 'fela-tools'
import {connect as connectFela, FelaRenderer, ThemeContext} from 'react-fela'
import {connect as connectRedux} from "react-redux";

const rules = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  size: props => ({
    color: 'blue',
    fontSize: props.num
  }) // props只是名字, 其值也可以是component的state. 它其实来自于renderRule()的第二参.
})

class FelaDemo2 extends PureComponent {
  state = {
    id: 100,
    num: 18
  }

  render() {
    // this.props是 { navigation: {...}, styles: {..}, rules: {...} }
    console.log(`render1 = ${JSON.stringify(this.props)}`)
    return (
      <FelaRenderer>
        {renderer =>
          <View style={renderer.renderRule(rules.root)}>
            <Text style={[renderer.renderRule(rules.size, {num: this.state.num}), this.props.styles.basicText]}>
              {this.state.num}
            </Text>
            <Button title="+ 1" onPress={this.onPlusOne}/>
          </View>
        }
      </FelaRenderer>
    )
  }

  onPlusOne = () => {
    this.setState({num: this.state.num + 6})
  }
}

// 参数是{ navigation: {...}, theme: {...} }
const mapThemeToProps = (top) => {
  console.log(`map2 theme2 = ${JSON.stringify(top)}`)
  return {...top.theme}
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connectRedux(mapStateToProps)(
  connectFela(mapThemeToProps)(FelaDemo2)
)


// const mapStateToProps = (state) => {
//   return {}
// }
//
// export default connect(mapStateToProps)(FelaDemo)
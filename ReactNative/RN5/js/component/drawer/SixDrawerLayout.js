import React from 'react'
import {View, StyleSheet, TouchableWithoutFeedback, Animated, PanResponder} from 'react-native'

class SixDrawerLayout extends React.Component {
  MIN_SWIPE_DISTANCE = 5
  lastExpandRatio = 0

  state = {
    isOpen: false,
    valueForAnim: new Animated.Value(0)
  }

  componentWillMount() {
    const {valueForAnim} = this.state
    valueForAnim.addListener(({value}) => {
      const isDrawerOpen = value > 0
      if (isDrawerOpen !== this.state.isOpen) {
        this.setState({...this.state, isOpen: isDrawerOpen})
      }
    })

    // 注意onStartShouldSetPanResponder 与 onMoveShouldSetPanResponder 不能共存, 不然后者就不会被响应
    this.panResponder = PanResponder.create({
      //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
      onMoveShouldSetPanResponder: this.onShouldMove,


      //开始手势操作，也可以说按下去。给用户一些视觉反馈，让他们知道发生了什么事情！（如：可以修改颜色）
      onPanResponderGrant: this.onPanResponderGrant,

      //最近一次的移动距离.如:(获取x轴y轴方向的移动距离 gestureState.dx,gestureState.dy)
      onPanResponderMove: this.onPanResponderMove,

      //用户放开了所有的触摸点，且此时视图已经成为了响应者。
      onPanResponderRelease: this.onPanResponderRelease,


      //另一个组件已经成为了新的响应者，所以当前手势将被取消。
      onPanResponderTerminate: () => { },
      onPanResponderTerminationRequest: () => false,
    })
  }


  render() {
    let {drawerWidth} = this.props
    const translate = this.getAnimStyle([-drawerWidth, 0])
    const animatedTranslate = {transform: [{translateX: translate}]}
    const opacity = this.getAnimStyle([0, 0.7])
    const animatedOpacity = {opacity: opacity}

    const clickableStatus = this.state.isOpen ? "auto" : "none"
    console.log(`szw render() : ${clickableStatus}`)

    return (
      <View style={styles.root} {...this.panResponder.panHandlers}>
        {/*content*/}
        <View style={styles.contentRoot}>
          {this.props.children}
        </View>

        {/*drawer*/}
        <TouchableWithoutFeedback pointerEvents={clickableStatus} onPress={this.toggle}>
          <Animated.View pointerEvents={clickableStatus}
                         style={[styles.drawerShadow, animatedOpacity]}/>
        </TouchableWithoutFeedback>

        <View style={styles.drawerRoot}>
          <Animated.View style={[styles.drawerContainer,
            {width: this.props.drawerWidth},
            animatedTranslate]}>
            {this.props.renderDrawer()}
          </Animated.View>
        </View>

      </View>

    )
  }

  getAnimStyle = (outputRange) => {
    let {valueForAnim} = this.state
    const animStyle = valueForAnim.interpolate({
      inputRange: [0, 1],
      outputRange: outputRange,
      extrapolate: 'clamp'
    })
    return animStyle
  }


  toggle = () => {
    if (this.state.isOpen) {
      this.closeDrawer()
    } else {
      this.openDrawer()
    }
  }

  closeDrawer = () => {
    Animated.timing(this.state.valueForAnim,
      {toValue: 0, duration: 300})
      .start()
  }

  openDrawer = () => {
    console.log(`szw open drawer`)
    Animated.timing(this.state.valueForAnim,
      {toValue: 1, duration: 300})
      .start()
  }

  // = = = = = = = = = = = = PanResponder = = = = = = = = = = = = =

  onShouldStart = (ev, {x0}) => {
    return true
  }

  // moveX相当于安卓中的ev.getX(), 当前位置
  onShouldMove = (ev, {moveX, dx, dy}) => {
    if (Math.abs(dx) < this.MIN_SWIPE_DISTANCE) {
      return false
    }
    if (moveX < 35 && dx > 0) {
      return true
    }
    return false
  }

  onPanResponderGrant = () => {
  }

  onPanResponderMove = (ev, {moveX}) => {
    let ratio = this.getRatio(moveX)
    this.state.valueForAnim.setValue(ratio)
    this.lastExpandRatio = ratio
    console.log(`szw onMove: ${moveX} ; ratio = ${ratio}`)
  }

  // vx : velocityX
  onPanResponderRelease = () => {
    if (this.lastExpandRatio > 0.5) {
      this.openDrawer()
      this.lastExpandRatio = 1
    } else {
      this.closeDrawer()
      this.lastExpandRatio = 0
    }

  }

  getRatio(x) {
    return x / this.props.drawerWidth
  }

  // = = = = = = = = = = = = PanResponder = = = = = = = = = = = = =

}

const styles = StyleSheet.create({
  root: {
    flex: 1,

  },
  contentRoot: {
    flex: 1,
    zIndex: 0
  },
  drawerRoot: {
    // backgroundColor: '#0000007e',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  drawerContainer: {
    flex: 1
  },
  drawerShadow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#000'
  }
})

export default SixDrawerLayout
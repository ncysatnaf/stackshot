import React, {PropTypes, Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {Avatar} from '../components'
import {connect} from 'react-redux'

@connect(
  state => {
    const {theme: {activeTheme}} = state
    return {
      activeTheme
    }
  }
)
export default class SliderScreen extends Component {
  static propTypes = {
    navigator: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  handleSelected = (index) => {
    const {navigator} = this.props
    this.setState({ activeIndex: index })
  }

  render() {
    const {activeIndex} = this.state
    const {activeTheme} = this.props
    return (
      <ScrollView>
      <View style={styles.Container}>
        <View style={styles.SliderHD}>
          <Avatar source={{uri: 'http://p1.bpimg.com/4851/e7e901c31ded46ed.jpg'}} size={100} style={{marginTop: 50}}/>
          <Text>Miku</Text>
        </View>
        <View style={styles.SliderMD}>
          <Item icon='favorite' text="我的图槽" handleSelected={this.handleSelected} activeIndex={activeIndex} index={0} activeTheme={activeTheme}/>
          <Item icon='person' text="资料设置" handleSelected={this.handleSelected} activeIndex={activeIndex} index={1} activeTheme={activeTheme}/>
          <Item icon='color-lens' text="主题切换" handleSelected={this.handleSelected} activeIndex={activeIndex} index={2} activeTheme={activeTheme}/>
          <Item icon='settings' text="系统设置" handleSelected={this.handleSelected} activeIndex={activeIndex} index={3} activeTheme={activeTheme}/>
          <Item icon='info' text="关于图槽" handleSelected={this.handleSelected} activeIndex={activeIndex} index={4} activeTheme={activeTheme}/>
        </View>
        <View style={styles.SliderFT}>
          <Text style={{color: `rgb(${activeTheme})`}}>登出</Text>
        </View>
      </View>
      </ScrollView>
    )
  }
}

class Item extends Component {

  onPress = () => {
    const {index, handleSelected} = this.props
    handleSelected(index)
  }

  render() {
    const {icon, text, ouTouch, index, activeIndex, activeTheme} = this.props
    return (
      <TouchableNativeFeedback
        delayPressIn={50}
        background={TouchableNativeFeedback.Ripple(`rgb(${activeTheme})`)}
        style={[styles.TouchItem]}
        onPress={() => this.onPress()}>
        <View style={[styles.ItemView,{backgroundColor: activeIndex === index ? `rgba(${activeTheme}, 0.1)` : 'transparent'}]}>
          <Icon name={icon} size={20} color={activeIndex === index ? `rgb(${activeTheme})` : 'rgb(151,176,200)'}/>
          <Text style={[styles.ItemText, { color: activeIndex === index ? `rgb(${activeTheme})` : 'rgb(151,176,200)'}]}>{text}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}




const styles = StyleSheet.create({
  Container:{
    flex: 1,
  },
  SliderHD:{
    flexDirection: 'column',
    alignItems: 'center'
  },
  SliderMD: {
    flexDirection: 'column',
    marginTop: 20
  },
  SliderFT:{
    padding: 15,
    flexDirection: 'column',
    marginTop: 150
  },
  TouchItem: {
    flex: 1,
		height: 45,
		justifyContent: "center"
  },
  ItemView:{
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  ItemText: {
    marginLeft: 10
  }
})
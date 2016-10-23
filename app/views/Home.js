import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {handleActionChange} from '../actions'
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'


// Components
import {HomeShots, StatusBar, FloatButton, ToolBar, ShotModal, CommentModal} from '../components';

const screen = Dimensions.get('window')

@connect(
  state => {
    const {
      theme: {activeTheme},
      shot: {isShot},
      comment: {isComment}
    } = state
    return {
      activeTheme,
      isComment,
      isShot
    }
  },
  dispatch => bindActionCreators({handleActionChange},dispatch)
)

export default class Home extends Component {

  handleToggle(){
    const {handleActionChange, isShot} = this.props
    LayoutAnimation.configureNext( LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleXY ) )
    handleActionChange('shot', {isShot: !isShot})
  }

  render() {
    const {activeTheme, isShot, isComment} = this.props
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={(isShot || isComment) ? 'rgba(0,0,0,0.6)' : '#fff'} animated={"animated"}/>
        <ToolBar />
        <HomeShots />
        <ShotModal />
        <CommentModal />
        {(!isShot && !isComment) &&  <FloatButton icon={<Icon name="add" color={'white'} size={30}/>} bottom={20} right={20} size={60} color={`rgb(${activeTheme})`} onPress={::this.handleToggle}/>}
      </View>
    );
  }
}

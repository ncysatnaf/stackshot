import React, {PropTypes} from 'react'
import {
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native'

export default class LazyList extends React.Component {
  static propTypes = {
    datas: PropTypes.array.isRequired,
    loadmoreLabel: PropTypes.string,
    limit: PropTypes.number,
    children: PropTypes.node,
  }
  static defaultProps = {
    datas: [],
    limit: 3,
    loadmoreLabel: '更多评论'
  }

  constructor(props) {
    super(props)
    this.state = {
      page: 1,
    }
  }

  nextPage = () => {
    this.setState({page: ++this.state.page})
  }

  renderItem = () => {
    const {page} = this.state
    const {children, datas, limit} = this.props
    if(React.isValidElement(children)) {
      return datas.map((o,i) => {
        if(i < page * limit) {
          return React.cloneElement(children, {item: o, key: i})
        }
      })
    } else {
      throw new Error('children must be a valid Component')
    }
  }

  render() {
    const {page} = this.state
    const {datas, limit, loadMore, loadmoreLabel} = this.props
    const overCount = datas.length - limit * page
    return (
      <View style={[styles.container,{...this.props.style}]}>
        {this.renderItem()}
        {overCount > 0 && ( loadMore ? loadMore({overCount, next: this.nextPage}) :
          <View stlye={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: this.props.style.backgroundColor}}>
            <Text style={{paddingVertical: 10, color:"rgb(153, 157, 175)"}} onPress={() => this.nextPage()}>{loadmoreLabel}({overCount})</Text>
          </View>)
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
})

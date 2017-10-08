import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  Slider,
  Dimensions
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
// TODO: Update actions for home screen
import { clearLikedJobs } from '../actions';

import Slides from '../components/Slides';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    tabBarIcon: ({ tintColor }) => {
        return <Icon name="home" size={30} color={tintColor} />
    }
  }

  constructor(props) {
    super(props)
    this.state = { mood: 18 }
  }

  getVal(val){
    console.warn(val);
  }

  render() {
    return (
      <View>
        <Slider
          style={{ height: SCREEN_HEIGHT }}
          step={1}
          minimumValue={18}
          maximumValue={71}
          value={this.state.age}
          onValueChange={val => this.setState({ mood: val })}
          onSlidingComplete={ val => this.getVal(val)}
        />
        <Text style={styles.welcome}>
          {this.state.age}
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

export default connect(null, { clearLikedJobs })(HomeScreen);

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

import Moods from '../components/Moods';

const SLIDE_DATA = [
  { text: 'Ecstatic', color: 'rgba(255, 248 ,12, 1)' },
  { text: 'Triumphant', color: 'rgba(255, 241 ,0, 1)' },
  { text: 'Jubilant', color: 'rgba(255, 234 ,14, 1)' },
  { text: 'Vivacious', color: 'rgba(255, 209 ,5, 1)' },
  { text: 'Elated', color: '#FFC513' },
  { text: 'Delighted', color: '#FFB125' },
  { text: 'Joyful', color: '#FF9A00' },
  { text: 'Lighthearted', color: '#FFAF3F' },
  { text: 'Happy', color: '#FFAB54' },
  { text: 'Pleased', color: '#FFB674' },
  { text: 'Satisfied', color: '#FFC513' },
  { text: 'Encouraged', color: '#FFC513' },
  { text: 'Cheerful', color: '#FFC513' },
  { text: 'Purposeful', color: '#FFC513' },
  { text: 'Determined', color: '#FFC513' },
  { text: 'Anxious', color: '#FFC513' },
  { text: 'Worried', color: '#FFC513' },
  { text: 'Lonely', color: '#FFC513' },
  { text: 'Frustrated', color: '#FFC513' },
  { text: 'Upset', color: '#FFC513' },
  { text: 'Disillusioned', color: '#FFC513' },
  { text: 'Downcast', color: '#FFC513' },
  { text: 'Gloomy', color: '#FFC513' },
  { text: 'Downhearted', color: '#FFC513' },
  { text: 'Discouraged', color: '#FFC513' },
  { text: 'Disgusted', color: '#FFC513' },
  { text: 'Depressed', color: '#FFC513' },
  { text: 'Desperate', color: '#FFC513' },
  { text: 'Despairing', color: '#FFC513' },
  { text: 'Miserable', color: '#FFC513' }

];

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
    // this.state = { mood: 18 }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Moods data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      </View>
    );
  }
}

export default connect(null, { clearLikedJobs })(HomeScreen);

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
  { id: 1, text: 'Ecstatic', color: 'rgba(255, 248 ,12, 1)' },
  { id: 2, text: 'Triumphant', color: 'rgba(255, 241 ,0, 1)' },
  { id: 3, text: 'Jubilant', color: 'rgba(255, 234 ,14, 1)' },
  { id: 4, text: 'Vivacious', color: 'rgba(255, 209 ,5, 1)' },
  { id: 5, text: 'Elated', color: '#FFC513' },
  { id: 6, text: 'Delighted', color: '#FFB125' },
  { id: 7, text: 'Joyful', color: '#FF9A00' },
  { id: 8, text: 'Lighthearted', color: '#FFAF3F' },
  { id: 9, text: 'Happy', color: '#FFAB54' },
  { id: 10, text: 'Pleased', color: '#FFB674' },
  { id: 11, text: 'Satisfied', color: '#FFC513' },
  { id: 12, text: 'Encouraged', color: '#FFC513' },
  { id: 13, text: 'Cheerful', color: '#FFC513' },
  { id: 14, text: 'Purposeful', color: '#FFC513' },
  { id: 15, text: 'Determined', color: '#FFC513' },
  { id: 16, text: 'Anxious', color: '#FFC513' },
  { id: 17, text: 'Worried', color: '#FFC513' },
  { id: 18, text: 'Lonely', color: '#FFC513' },
  { id: 19, text: 'Frustrated', color: '#FFC513' },
  { id: 20, text: 'Upset', color: '#FFC513' },
  { id: 21, text: 'Disillusioned', color: '#FFC513' },
  { id: 22, text: 'Downcast', color: '#FFC513' },
  { id: 23, text: 'Gloomy', color: '#FFC513' },
  { id: 24, text: 'Downhearted', color: '#FFC513' },
  { id: 25, text: 'Discouraged', color: '#FFC513' },
  { id: 26, text: 'Disgusted', color: '#FFC513' },
  { id: 27, text: 'Depressed', color: '#FFC513' },
  { id: 28, text: 'Desperate', color: '#FFC513' },
  { id: 29, text: 'Despairing', color: '#FFC513' },
  { id: 30, text: 'Miserable', color: '#FFC513' }
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

  onSelectMood = () => {
    this.props.navigation.navigate('new');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Moods data={SLIDE_DATA} onComplete={this.onSelectMood} />
      </View>
    );
  }
}

export default connect(null, { clearLikedJobs })(HomeScreen);

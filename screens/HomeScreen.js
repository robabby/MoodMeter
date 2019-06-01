import React, { Component } from 'react';
import {
  View,
  AsyncStorage,
  Dimensions
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { setCurrentMood } from '../actions';

import Moods from '../components/Moods';

const SLIDE_DATA = [
  { id: 1, name: 'Ecstatic', color: 'rgba(255, 248 ,12, 1)' },
  { id: 2, name: 'Triumphant', color: 'rgba(255, 241 ,0, 1)' },
  { id: 3, name: 'Jubilant', color: 'rgba(255, 234 ,14, 1)' },
  { id: 4, name: 'Vivacious', color: 'rgba(255, 209 ,5, 1)' },
  { id: 5, name: 'Elated', color: '#FFC513' },
  { id: 6, name: 'Delighted', color: '#FFB125' },
  { id: 7, name: 'Joyful', color: '#FF9A00' },
  { id: 8, name: 'Lighthearted', color: '#FFAF3F' },
  { id: 9, name: 'Happy', color: '#FFAB54' },
  { id: 10, name: 'Pleased', color: '#FFB674' },
  { id: 11, name: 'Satisfied', color: '#FFC513' },
  { id: 12, name: 'Encouraged', color: '#FFC513' },
  { id: 13, name: 'Cheerful', color: '#FFC513' },
  { id: 14, name: 'Purposeful', color: '#FFC513' },
  { id: 15, name: 'Determined', color: '#FFC513' },
  { id: 16, name: 'Anxious', color: '#FFC513' },
  { id: 17, name: 'Worried', color: '#FFC513' },
  { id: 18, name: 'Lonely', color: '#FFC513' },
  { id: 19, name: 'Frustrated', color: '#FFC513' },
  { id: 20, name: 'Upset', color: '#FFC513' },
  { id: 21, name: 'Disillusioned', color: '#FFC513' },
  { id: 22, name: 'Downcast', color: '#FFC513' },
  { id: 23, name: 'Gloomy', color: '#FFC513' },
  { id: 24, name: 'Downhearted', color: '#FFC513' },
  { id: 25, name: 'Discouraged', color: '#FFC513' },
  { id: 26, name: 'Disgusted', color: '#FFC513' },
  { id: 27, name: 'Depressed', color: '#FFC513' },
  { id: 28, name: 'Desperate', color: '#FFC513' },
  { id: 29, name: 'Despairing', color: '#FFC513' },
  { id: 30, name: 'Miserable', color: '#FFC513' }
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

  async componentDidMount() {
    // await AsyncStorage.removeItem('fb_token');
    // await AsyncStorage.clear();
    let token = await AsyncStorage.getItem("token");

    if (!token) {
      this.props.navigation.navigate("Welcome");
    }
  }

  onSelectMood = (mood) => {
    this.props.setCurrentMood(mood);
    this.props.navigation.navigate("New");
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Moods data={SLIDE_DATA} onComplete={this.onSelectMood} />
      </View>
    );
  }
}

function mapStateToProps({ moods }) {
  return { currentMood: moods.currentMood };
}

export default connect(mapStateToProps, { setCurrentMood })(HomeScreen);

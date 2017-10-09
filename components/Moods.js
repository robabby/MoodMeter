import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Moods extends Component {

  renderSlides() {
    const moodData = this.props.data;

    return moodData.map((slide, index) => {
      return (
        <TouchableOpacity
          key={slide.text}
          onPress={this.props.onComplete}
          style={ (index === 0) ? {marginTop: 24} : {} }
        >
          <LinearGradient style={styles.buttonStyle} colors={['#00D2FF', '#3A7BD5']}>
            <Text style={styles.textStyle}>
              {slide.text}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <ScrollView
        snapToAlignment='end'
        snapToInterval={1}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        style={{flex:1, backgroundColor: '#333'}}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const buttonMargin = 5;
const styles = {
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: buttonMargin,
    marginRight: buttonMargin,
    marginBottom: buttonMargin * 2,
    width: SCREEN_WIDTH - (buttonMargin * 2),
    height: (SCREEN_HEIGHT - 54) / 8,
    opacity: 0.9,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  textStyle: {
    fontSize: 20,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    textShadowColor: 'rgba(0, 0, 0, .5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3
  }
};

export default Moods;

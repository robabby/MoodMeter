import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo';
import Chroma from 'chroma-js';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const TOP_COLORS = ['#FFD53D', '#4B9FFF', '#1BD170', '#F26F92', '#FFB44C'];
const BOTTOM_COLORS = ['#2D1408', '#131E4C', '#051326', '#062B11', '#350909'];
const GRADIENT_COLOR_LENGTH = 600;
const TOP_COLORS_SPECTRUM = Chroma.scale(TOP_COLORS).colors(GRADIENT_COLOR_LENGTH);
const BOTTOM_COLORS_SPECTRUM = Chroma.scale(BOTTOM_COLORS).colors(GRADIENT_COLOR_LENGTH);
const INTERVAL = 50;

class Moods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topIndex: 0,
      bottomIndex: 0,
      colorTop: TOP_COLORS_SPECTRUM[0],
      colorBottom: BOTTOM_COLORS_SPECTRUM[0]
    };
  }

  setMood(mood) {
    this.props.onComplete(mood)
  }

  onMoodScroll = (event) => {
    let { topIndex, bottomIndex } = this.state

    topIndex++
    if (topIndex === TOP_COLORS_SPECTRUM.length) {
      topIndex = 0
    }

    bottomIndex++
    if (bottomIndex === BOTTOM_COLORS_SPECTRUM.length) {
      bottomIndex = 0
    }

    this.setState({
      topIndex: topIndex,
      bottomIndex: bottomIndex,
      colorTop: TOP_COLORS_SPECTRUM[topIndex],
      colorBottom: BOTTOM_COLORS_SPECTRUM[bottomIndex]
    })
  }

  renderSlides() {
    const moodData = this.props.data;

    return moodData.map((mood, index) => {
      return (
        <View
          key={mood.id}
        >
          <TouchableOpacity
            onPress={() => this.setMood(mood)}
            style={[styles.buttonStyle, (index === 0) ? {marginTop: 24} : {}] }
          >
            <Text style={styles.textStyle}>
              {mood.name}
            </Text>
          </TouchableOpacity>
        </View>
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
        style={styles.scrollViewStyle}
        onScroll={this.onMoodScroll}
        scrollEventThrottle={INTERVAL}
      >
        <LinearGradient
          colors={[this.state.colorTop, this.state.colorBottom]}
        >
          {this.renderSlides()}
        </LinearGradient>
      </ScrollView>
    );
  }
}

const buttonMargin = 5;
const styles = {
  scrollViewStyle: {
    flex: 1,
    backgroundColor: '#fff'
  },
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
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 5
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

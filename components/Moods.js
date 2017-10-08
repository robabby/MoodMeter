import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Moods extends Component {
  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        <View
          key={slide.text}
          style={[styles.slideStyle, { backgroundColor: slide.color }]}
        >
          <Text style={styles.textStyle}>{slide.text}</Text>
          <Icon
            name='play-arrow'
            iconStyle={[styles.buttonStyle, { backgroundColor: slide.color }]}
            onPress={this.props.onComplete}
          />
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
        style={{flex:1, backgroundColor: '#333'}}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    width: SCREEN_WIDTH,
    height: (SCREEN_HEIGHT - 54) / 6,
    opacity: 0.9
  },
  textStyle: {
    fontSize: 20,
    color: 'white'
  },
  buttonStyle: {
    color:'#fff',
    borderRadius: 20
  }
};

export default Moods;

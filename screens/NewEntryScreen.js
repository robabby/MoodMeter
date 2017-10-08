import { MapView } from 'expo';
import React, { Component } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { clearLikedJobs } from '../actions';

class NewEntryScreen extends Component {
  static navigationOptions = {
    headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
    }
  }

  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09,
      error: null
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          region: {
            latitude: position.coords.latitude,
            latitudeDelta: 0.09,
            longitude: position.coords.longitude,
            longitudeDelta: 0.04,
            error: null
          }
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    this.setState({ mapLoaded: true });
  }

  onGoBack = () => {
    this.props.navigation.navigate('home');
  }

  onAddPhotos = () => {
    this.props.navigation.navigate('camera');
  }

  onRegionChangeComplete = (region) => {
    console.log(region)
    this.setState({ region });
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View>
        <View style={{height: 200}}>
          <MapView
            region={this.state.region}
            style={{ flex: 1 }}
            onRegionChangeComplete={this.onRegionChangeComplete}
          />
        </View>
        <Button
          onPress={this.onAddPhotos}
          icon={{ name: 'attachment' }}
          title="Add Photos"
        />
        <Button
          onPress={this.onGoBack}
          title="Go Back"
        />
      </View>
    );
  }
}

export default connect(null, { clearLikedJobs })(NewEntryScreen);

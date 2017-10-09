import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView, Contacts } from 'expo';

import { setCurrentMood } from '../actions';

class NewEntryScreen extends Component {
  static navigationOptions = (props) => ({
    title: 'Current Mood',
    headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
    }
  })

  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
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
  }

  onGoBack = () => {
    this.props.navigation.navigate('home');
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  showFirstContactAsync = async () => {
    // Ask for permission to query contacts.
    const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
    if (permission.status !== 'granted') {
      // Permission was denied...
      return;
    }
    const contacts = await Expo.Contacts.getContactsAsync({
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
        Expo.Contacts.EMAILS,
      ],
      pageSize: 10,
      pageOffset: 0,
    });
    if (contacts.total > 0) {
      console.log(contacts);
    }
  }

  render() {
    console.log("/render/ NewEntryScreen: ", this.props);
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
          onPress={this.showFirstContactAsync}
          title="Contacts"
        />
        <Button
          onPress={this.onGoBack}
          title="Go Back"
        />
      </View>
    );
  }
}

function mapStateToProps({ moods }) {
  return { currentMood: moods.currentMood };
}

export default connect(mapStateToProps, { setCurrentMood })(NewEntryScreen);

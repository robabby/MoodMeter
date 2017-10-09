import React, { Component } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { Button, FormLabel, FormInput, Icon, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView, Contacts } from 'expo';

import { setCurrentMood } from '../actions';

class NewEntryScreen extends Component {
  static navigationOptions = (props) => ({
    title: 'Home',
    tabBarIcon: ({ tintColor }) => {
        return <Icon name="home" size={30} color={tintColor} />
    }
  })

  state = {
    mapLoaded: false,
    notes: null,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await this.setState({
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

  onNotesInput = (text) => {
    this.setState({ notes: text });
    console.log(this.state);
  }

  render() {
    const { goBack } = this.props.navigation;
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
        <Divider style={{ height: 7, backgroundColor: '#00D2FF' }} />
        <Button
          onPress={this.showFirstContactAsync}
          title="Contacts"
        />
        <Button
          onPress={this.onGoBack}
          title="Go Back"
        />
        <FormLabel>Notes</FormLabel>
        <FormInput
          style={styles.notesStyles}
          multiline={true}
          numberOfLines={5}
          onChangeText={(text) => this.onNotesInput(text)}
          value={this.state.notes} />
      </View>
    );
  }
}

const styles = {
  notesStyles: {
    marginBottom: 10
  }
}

function mapStateToProps({ moods }) {
  return { currentMood: moods.currentMood };
}

export default connect(mapStateToProps, { setCurrentMood })(NewEntryScreen);

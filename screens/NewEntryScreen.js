import React, { Component } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import {
  Button,
  FormLabel,
  FormInput,
  Icon,
  Divider,
  Badge,
  List,
  ListItem
} from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView, Contacts } from 'expo';

import { setCurrentMood } from '../actions';

class NewEntryScreen extends Component {
  static navigationOptions = ({ navigation, screenprops }) => ({
    title: 'New Entry',
    headerLeft: (
      <Icon
        name="chevron-left"
        onPress={() => navigation.navigate('home')}
        color="rgba(0, 122, 255, 1)"
      />
    )
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

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onNotesInput = (text) => {
    this.setState({ notes: text });
    console.log(this.state);
  }

  onAddPeople = () => {
    this.props.navigation.navigate('addPeople');
  }

  render() {
    const { currentMood } = this.props;

    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View>
        <View style={{height: 150}}>
          <MapView
            region={this.state.region}
            style={{ flex: 1 }}
            onRegionChangeComplete={this.onRegionChangeComplete}
          />
        </View>
        <Divider style={{ height: 7, backgroundColor: '#00D2FF' }} />
        <Badge
          value={currentMood.name}
          containerStyle={[styles.moodBadgeContainerStyle, { backgroundColor: currentMood.color }]}
          textStyle={styles.moodBadgeTextStyle}
        />

        <List containerStyle={{marginBottom: 20}}>
          <ListItem
            title="Add People"
            leftIcon={{name: 'face'}}
            onPress={this.onAddPeople}
          />
          <ListItem
            title="Add Photos"
            leftIcon={{name: 'add-a-photo'}}
          />
          <ListItem
            title="Add Links"
            leftIcon={{name: 'attachment'}}
          />
        </List>

        <FormLabel>Notes</FormLabel>
        <FormInput
          style={styles.notesStyles}
          multiline={true}
          numberOfLines={5}
          onChangeText={(text) => this.onNotesInput(text)}
          value={this.state.notes} />

        <Button
          title="Save"
          icon={{name: 'done'}}
          backgroundColor='#00D2FF'
          style={styles.contactButtonStyles}
          raised={true}
        />
      </View>
    );
  }
}

const styles = {
  notesStyles: {
    marginBottom: 10
  },
  contactButtonStyles: {
    marginTop:10
  },
  moodBadgeContainerStyle: {
    marginTop: 5,
    marginRight: 10,
    marginBottom: 0,
    marginLeft: 10
  },
  moodBadgeTextStyle: {
    textShadowColor: 'rgba(0, 0, 0, .5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3
  }
}

function mapStateToProps({ moods }) {
  return { currentMood: moods.currentMood };
}

export default connect(mapStateToProps, { setCurrentMood })(NewEntryScreen);

import React, { Component } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import {
  Button,
  FormLabel,
  FormInput,
  Divider,
  Badge,
} from 'react-native-elements';
import { Icon, List } from '@ant-design/react-native';
import { connect } from 'react-redux';
import { MapView, Contacts } from 'expo';

import { setCurrentMood } from '../actions';

const ListItem = List.Item;
const Brief = ListItem.Brief;

class NewEntryScreen extends Component {
  static navigationOptions = ({ navigation, screenprops }) => ({
    title: 'New Entry',
    headerLeft: (
      <Icon
        name="left"
        onPress={() => navigation.navigate('Home')}
        color="rgba(0, 0, 0, 1)"
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
    this.props.navigation.navigate('AddPeople');
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
            arrow="horizontal"
            onPress={this.onAddPeople}
          >
            Add People
          </ListItem>
          <ListItem
            arrow="horizontal"
          >
            Add Photos
          </ListItem>
          <ListItem
            arrow="horizontal"
          >
            Add Links
          </ListItem>
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

import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import {
  Button,
  FormLabel,
  FormInput,
  Icon,
  Divider
} from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AddPeopleScreen extends Component {
  static navigationOptions = {
    headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
    }
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
    return (
      <View>
        <Text>Add People</Text>
        <Button
          title='Add Contacts'
          onPress={this.showFirstContactAsync}
        ></Button>
      </View>
    );
  }
}

export default connect(null, actions)(AddPeopleScreen);

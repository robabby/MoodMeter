import { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
// Provider is the root tag then hosts the state for the entire application
import { Provider } from 'react-redux';

import registerForNotifications from './services/push_notifications';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import NewEntryScreen from  './screens/NewEntryScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from  './screens/ReviewScreen';
import CameraScreen from  './screens/CameraScreen';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification
      Alert.alert(
        'New Push Notification',
        text,
        [{ text: 'Ok.' }]
      )
    });
  }
  render() {
    const MainNavigator = TabNavigator({
      // Route config object
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      new: { screen: NewEntryScreen },
      camera: { screen: CameraScreen },
      main: {
        screen: TabNavigator({
          home: { screen: HomeScreen },
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, {
          tabBarPosition: 'bottom',
          // swipeEnabled: false  // Android specific functionality we could turn off
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
      // Config options for initial Navigator
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    return (
      // Every component now has access to the store using the
      // Connect helper from react-redux library
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

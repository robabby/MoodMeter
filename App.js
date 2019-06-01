import { API_URL } from "react-native-dotenv";
import { AppLoading, Font, Notifications } from 'expo';
import React from 'react';
import { Alert, Text, View } from 'react-native';
import { 
  createStackNavigator, 
  createDrawerNavigator, 
  createBottomTabNavigator, 
  createAppContainer,
  createSwitchNavigator 
} from 'react-navigation';
import { Provider } from 'react-redux';
import { Provider as GraphQLProvider, createClient } from 'urql';

const client = createClient({
  url: `${API_URL}/graphql`
})

// import registerForNotifications from './services/push_notifications';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import NewEntryScreen from  './screens/NewEntryScreen';
import AddPeopleScreen from  './screens/AddPeopleScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from  './screens/ReviewScreen';

const InitialStack = createStackNavigator({
  Home: { screen: HomeScreen },
  New: { screen: NewEntryScreen }
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
});

const AuthStack = createStackNavigator({ 
  Welcome: WelcomeScreen,
  Auth: AuthScreen
}, {
  initialRouteName: 'Auth',
  headerMode: 'none'
});

const AppNavigator = createBottomTabNavigator({
  App: {
    screen: createDrawerNavigator({
      Home: {
        screen: HomeScreen,
      },
      Map: {
        screen: MapScreen,
      },
      Deck: {
        screen: DeckScreen
      },
      New: {
        screen: createStackNavigator({
          New: {
            screen: NewEntryScreen
          },
          AddPeople: {
            screen: AddPeopleScreen
          }
        })
      },
      Review: {
        screen: createStackNavigator({
          Review: {
            screen: ReviewScreen
          },
          Settings: {
            screen: SettingsScreen
          }
        })
      }
    }, {
      // swipeEnabled: false  // Android specific functionality we could turn off
      tabBarOptions: {
        labelStyle: { fontSize: 12 }
      }
    })
  }
}, {
  defaultNavigationOptions: {
    tabBarVisible: false
  },
  lazy: true
});

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    App: AppNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
));

class App extends React.Component {
  state = {
    isReady: false,
  };

  async componentDidMount() {
    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );

    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
    // eslint-disable-next-line
    this.setState({ isReady: true });

    // registerForNotifications();
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
    const { isReady } = this.state;

    if (!isReady) {
      return <AppLoading />;
    }

    return (
      // Every component now has access to the store using the
      // Connect helper from react-redux library
      <GraphQLProvider value={client}>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </GraphQLProvider>
    );
  }
}

export default App;